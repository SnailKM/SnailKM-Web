import React, {Component} from 'react';
import styled from 'styled-components';

import {
  getRGBPrime,
  toDegrees,
  calcRadialHue,
  calcRadialMagnitude,
} from '../../utils/color-math';

type Color = {
  hue: number;
  sat: number;
};

type Props = {
  color: Color;
  setColor: (hue: number, sat: number) => void;
};

type State = {
  lensTransform: string;
  showPicker: boolean;
};

const ColorLens = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid black;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  box-sizing: border-box;
  transform: translate3d(195px, 195px, 0);
`;
const ColorInner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, white, rgba(0, 0, 0, 0));
`;

const ColorOuter = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    red,
    yellow,
    lime,
    aqua,
    blue,
    magenta,
    red
  );
`;

export const ColorThumbnail = styled.div`
  display: inline-block;
  height: 20px;
  width: 30px;
  border-radius: 2px;
  border: 2px solid var(--color_dark-grey);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  border: 4px solid var(--color_dark-grey);
  width: 180px;
  height: 180px;
  position: relative;
`;

const PickerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.11) 0 1px 1px 1px;
  position: absolute;
  transform: translate3d(-205px, 47px, 0);

  &::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    border: 11px solid var(--color_dark-grey);
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    right: -22px;
    top: 50px;
  }
`;

const ColorPreview = styled.div`
  width: 180px;
  height: 24px;
  border: 4px solid var(--color_dark-grey);
  border-bottom: none;
`;

export class ColorPicker extends Component<Props, State> {
  ref: HTMLDivElement | null = null;
  refWidth: number = 0;
  refHeight: number = 0;
  mouseDown: boolean = false;

  state = {
    lensTransform: '',
    showPicker: false,
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  componentDidUpdate({color}: {color: Color}, state: State) {
    if (
      this.ref &&
      this.state.showPicker &&
      (!state.showPicker || color !== this.props.color)
    ) {
      const {width, height} = this.ref.getBoundingClientRect();
      this.refWidth = width;
      this.refHeight = height;
      const {hue, sat} = this.props.color;
      const offsetX = (width * hue) / 255;
      const offsetY = height * (1 - sat / 255);
      const lensTransform = `translate3d(${offsetX - 5}px, ${
        offsetY - 5
      }px, 0)`;
      this.setState({lensTransform});
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  // For the color picker uses a conical gradient
  getRadialHueSat(evt: React.MouseEvent<Element>) {
    const {offsetX, offsetY} = evt.nativeEvent;
    const hue = toDegrees(calcRadialHue(offsetX, offsetY) ?? 0);
    const sat = Math.min(1, calcRadialMagnitude(offsetX, offsetY) ?? 0);
    return {hue, sat};
  }

  // For standard color picker uses a conical gradient
  getLinearHueSat(evt: React.MouseEvent<Element>) {
    // calculate later
    const width = this.refWidth;
    const height = this.refHeight;
    const {offsetX, offsetY} = evt.nativeEvent;
    const [x, y] = [Math.max(0, offsetX), Math.max(0, offsetY)];
    const hue = 360 * Math.min(1, x / width);
    const sat = 1 - Math.min(1, y / height);
    return {hue, sat};
  }

  onMouseMove: React.MouseEventHandler = (evt) => {
    if (this.mouseDown) {
      const {offsetX, offsetY} = evt.nativeEvent;
      const lensTransform = `translate3d(${offsetX - 5}px, ${
        offsetY - 5
      }px, 0)`;

      const {hue, sat} = this.getLinearHueSat(evt);
      this.props.setColor(Math.round(255 * (hue / 360)), Math.round(255 * sat));
      this.setState({
        lensTransform,
      });
    }
  };

  onMouseDown: React.MouseEventHandler = (evt) => {
    this.mouseDown = true;
    this.onMouseMove(evt);
    if (this.ref) {
      this.ref.style.cursor = 'pointer';
    }
  };

  onMouseUp: React.MouseEventHandler = (evt) => {
    this.mouseDown = false;
    if (this.ref) {
      this.ref.style.cursor = 'auto';
    }
  };

  getRGB({hue, sat}: {hue: number; sat: number}) {
    sat = sat / 255;
    hue = Math.round(360 * hue) / 255;
    const c = sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = 1 - c;
    const [r, g, b] = getRGBPrime(hue, c, x).map((n) =>
      Math.round(255 * (m + n)),
    );
    return `rgba(${r},${g},${b},1)`;
  }

  onThumbnailClick = () => {
    this.setState({showPicker: true});
  };

  pickerContainer = React.createRef<HTMLDivElement>();
  colorThumbnail = React.createRef<HTMLDivElement>();

  onDocumentClick = (evt: MouseEvent) => {
    if (
      this.state.showPicker &&
      this.pickerContainer.current &&
      !this.pickerContainer.current.contains(evt.target as HTMLDivElement) &&
      this.colorThumbnail.current &&
      !this.colorThumbnail.current.contains(evt.target as HTMLDivElement)
    ) {
      this.setState({showPicker: false});
    }
  };

  render() {
    const color = this.getRGB(this.props.color);
    return (
      <>
        <ColorThumbnail
          ref={this.colorThumbnail}
          onClick={this.onThumbnailClick}
          style={{background: color}}
        />
        {this.state.showPicker && (
          <PickerContainer
            ref={this.pickerContainer}
            onMouseUp={this.onMouseUp}
          >
            <ColorPreview style={{background: this.getRGB(this.props.color)}} />
            <Container>
              <ColorOuter
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                ref={(ref) => (this.ref = ref)}
              >
                <ColorInner>
                  <ColorLens style={{transform: this.state.lensTransform}} />
                </ColorInner>
              </ColorOuter>
            </Container>
          </PickerContainer>
        )}
      </>
    );
  }
}

export const ArrayColorPicker: React.VFC<{
  color: [number, number];
  setColor: Props['setColor'];
}> = (props) => {
  const {color, setColor} = props;
  return (
    <ColorPicker color={{hue: color[0], sat: color[1]}} setColor={setColor} />
  );
};

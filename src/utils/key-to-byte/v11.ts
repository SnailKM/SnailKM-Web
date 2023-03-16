// Keycodes starting with _ are not real keycodes.
// They are used to version constants used in
// advanced keycodes.
export default {
  _QK_MODS: 0x0100,
  _QK_MODS_MAX: 0x1fff,
  _QK_MOD_TAP: 0x2000,
  _QK_MOD_TAP_MAX: 0x3fff,
  _QK_LAYER_TAP: 0x4000,
  _QK_LAYER_TAP_MAX: 0x4fff,
  _QK_LAYER_MOD: 0x5000,
  _QK_LAYER_MOD_MAX: 0x51ff,
  _QK_TO: 0x5200,
  _QK_TO_MAX: 0x521f,
  _QK_MOMENTARY: 0x5220,
  _QK_MOMENTARY_MAX: 0x523f,
  _QK_DEF_LAYER: 0x5240,
  _QK_DEF_LAYER_MAX: 0x525f,
  _QK_TOGGLE_LAYER: 0x5260,
  _QK_TOGGLE_LAYER_MAX: 0x527f,
  _QK_ONE_SHOT_LAYER: 0x5280,
  _QK_ONE_SHOT_LAYER_MAX: 0x529f,
  _QK_ONE_SHOT_MOD: 0x52a0,
  _QK_ONE_SHOT_MOD_MAX: 0x52bf,
  _QK_LAYER_TAP_TOGGLE: 0x52c0,
  _QK_LAYER_TAP_TOGGLE_MAX: 0x52df,
  _QK_LAYER_MOD_MASK: 0x1f,
  _QK_MACRO: 0x7702,
  _QK_MACRO_MAX: 0x7711,
  _QK_KB: 0x7f00,
  _QK_KB_MAX: 0x7fff,
  KC_NO: 0x0000,
  KC_TRNS: 0x0001,
  KC_A: 0x0004,
  KC_B: 0x0005,
  KC_C: 0x0006,
  KC_D: 0x0007,
  KC_E: 0x0008,
  KC_F: 0x0009,
  KC_G: 0x000a,
  KC_H: 0x000b,
  KC_I: 0x000c,
  KC_J: 0x000d,
  KC_K: 0x000e,
  KC_L: 0x000f,
  KC_M: 0x0010,
  KC_N: 0x0011,
  KC_O: 0x0012,
  KC_P: 0x0013,
  KC_Q: 0x0014,
  KC_R: 0x0015,
  KC_S: 0x0016,
  KC_T: 0x0017,
  KC_U: 0x0018,
  KC_V: 0x0019,
  KC_W: 0x001a,
  KC_X: 0x001b,
  KC_Y: 0x001c,
  KC_Z: 0x001d,
  KC_1: 0x001e,
  KC_2: 0x001f,
  KC_3: 0x0020,
  KC_4: 0x0021,
  KC_5: 0x0022,
  KC_6: 0x0023,
  KC_7: 0x0024,
  KC_8: 0x0025,
  KC_9: 0x0026,
  KC_0: 0x0027,
  KC_ENT: 0x0028,
  KC_ESC: 0x0029,
  KC_BSPC: 0x002a,
  KC_TAB: 0x002b,
  KC_SPC: 0x002c,
  KC_MINS: 0x002d,
  KC_EQL: 0x002e,
  KC_LBRC: 0x002f,
  KC_RBRC: 0x0030,
  KC_BSLS: 0x0031,
  KC_NUHS: 0x0032,
  KC_SCLN: 0x0033,
  KC_QUOT: 0x0034,
  KC_GRV: 0x0035,
  KC_COMM: 0x0036,
  KC_DOT: 0x0037,
  KC_SLSH: 0x0038,
  KC_CAPS: 0x0039,
  KC_F1: 0x003a,
  KC_F2: 0x003b,
  KC_F3: 0x003c,
  KC_F4: 0x003d,
  KC_F5: 0x003e,
  KC_F6: 0x003f,
  KC_F7: 0x0040,
  KC_F8: 0x0041,
  KC_F9: 0x0042,
  KC_F10: 0x0043,
  KC_F11: 0x0044,
  KC_F12: 0x0045,
  KC_PSCR: 0x0046,
  KC_SLCK: 0x0047,
  KC_PAUS: 0x0048,
  KC_INS: 0x0049,
  KC_HOME: 0x004a,
  KC_PGUP: 0x004b,
  KC_DEL: 0x004c,
  KC_END: 0x004d,
  KC_PGDN: 0x004e,
  KC_RGHT: 0x004f,
  KC_LEFT: 0x0050,
  KC_DOWN: 0x0051,
  KC_UP: 0x0052,
  KC_NLCK: 0x0053,
  KC_PSLS: 0x0054,
  KC_PAST: 0x0055,
  KC_PMNS: 0x0056,
  KC_PPLS: 0x0057,
  KC_PENT: 0x0058,
  KC_P1: 0x0059,
  KC_P2: 0x005a,
  KC_P3: 0x005b,
  KC_P4: 0x005c,
  KC_P5: 0x005d,
  KC_P6: 0x005e,
  KC_P7: 0x005f,
  KC_P8: 0x0060,
  KC_P9: 0x0061,
  KC_P0: 0x0062,
  KC_PDOT: 0x0063,
  KC_NUBS: 0x0064,
  KC_APP: 0x0065,
  KC_POWER: 0x0066,
  KC_PEQL: 0x0067,
  KC_F13: 0x0068,
  KC_F14: 0x0069,
  KC_F15: 0x006a,
  KC_F16: 0x006b,
  KC_F17: 0x006c,
  KC_F18: 0x006d,
  KC_F19: 0x006e,
  KC_F20: 0x006f,
  KC_F21: 0x0070,
  KC_F22: 0x0071,
  KC_F23: 0x0072,
  KC_F24: 0x0073,
  KC_EXECUTE: 0x0074,
  KC_HELP: 0x0075,
  KC_MENU: 0x0076,
  KC_SELECT: 0x0077,
  KC_STOP: 0x0078,
  KC_AGAIN: 0x0079,
  KC_UNDO: 0x007a,
  KC_CUT: 0x007b,
  KC_COPY: 0x007c,
  KC_PASTE: 0x007d,
  KC_FIND: 0x007e,
  KC_LCAP: 0x0082,
  KC_LNUM: 0x0083,
  KC_LSCR: 0x0084,
  KC_PCMM: 0x0085,
  KC_KP_EQUAL_AS400: 0x0086,
  KC_RO: 0x0087,
  KC_KANA: 0x0088,
  KC_JYEN: 0x0089,
  KC_HENK: 0x008a,
  KC_MHEN: 0x008b,
  KC_INT6: 0x008c,
  KC_INT7: 0x008d,
  KC_INT8: 0x008e,
  KC_INT9: 0x008f,
  KC_HAEN: 0x0090,
  KC_HANJ: 0x0091,
  KC_LANG3: 0x0092,
  KC_LANG4: 0x0093,
  KC_LANG5: 0x0094,
  KC_LANG6: 0x0095,
  KC_LANG7: 0x0096,
  KC_LANG8: 0x0097,
  KC_LANG9: 0x0098,
  KC_ERAS: 0x0099,
  KC_SYSREQ: 0x009a,
  KC_CANCEL: 0x009b,
  KC_CLR: 0x009c,
  KC_CLEAR: 0x009c,
  KC_PRIOR: 0x009d,
  KC_OUT: 0x00a0,
  KC_OPER: 0x00a1,
  KC_CLEAR_AGAIN: 0x00a2,
  KC_CRSEL: 0x00a3,
  KC_EXSEL: 0x00a4,
  KC_PWR: 0x00a5,
  KC_SLEP: 0x00a6,
  KC_WAKE: 0x00a7,
  KC_MUTE: 0x00a8,
  KC_VOLU: 0x00a9,
  KC_VOLD: 0x00aa,
  KC_MNXT: 0x00ab,
  KC_MPRV: 0x00ac,
  KC_MSTP: 0x00ad,
  KC_MPLY: 0x00ae,
  KC_MSEL: 0x00af,
  KC_EJCT: 0x00b0,
  KC_MAIL: 0x00b1,
  KC_CALC: 0x00b2,
  KC_MYCM: 0x00b3,
  KC_WWW_SEARCH: 0x00b4,
  KC_WWW_HOME: 0x00b5,
  KC_WWW_BACK: 0x00b6,
  KC_WWW_FORWARD: 0x00b7,
  KC_WWW_STOP: 0x00b8,
  KC_WWW_REFRESH: 0x00b9,
  KC_WWW_FAVORITES: 0x00ba,
  KC_MFFD: 0x00bb,
  KC_MRWD: 0x00bc,
  KC_BRIU: 0x00bd,
  KC_BRID: 0x00be,
  KC_MS_UP: 0x00cd,
  KC_MS_DOWN: 0x00ce,
  KC_MS_LEFT: 0x00cf,
  KC_MS_RIGHT: 0x00d0,
  KC_MS_BTN1: 0x00d1,
  KC_MS_BTN2: 0x00d2,
  KC_MS_BTN3: 0x00d3,
  KC_MS_BTN4: 0x00d4,
  KC_MS_BTN5: 0x00d5,
  KC_MS_BTN6: 0x00d6,
  KC_MS_BTN7: 0x00d7,
  KC_MS_BTN8: 0x00d8,
  KC_MS_WH_UP: 0x00d9,
  KC_MS_WH_DOWN: 0x00da,
  KC_MS_WH_LEFT: 0x00db,
  KC_MS_WH_RIGHT: 0x00dc,
  KC_MS_ACCEL0: 0x00dd,
  KC_MS_ACCEL1: 0x00de,
  KC_MS_ACCEL2: 0x00df,
  KC_LCTL: 0x00e0,
  KC_LSFT: 0x00e1,
  KC_LALT: 0x00e2,
  KC_LGUI: 0x00e3,
  KC_RCTL: 0x00e4,
  KC_RSFT: 0x00e5,
  KC_RALT: 0x00e6,
  KC_RGUI: 0x00e7,
  RESET: 0x7c00,
  DEBUG: 0x7c02,
  MAGIC_TOGGLE_NKRO: 0x7013,
  KC_GESC: 0x7c16,
  KC_ASUP: 0x7c11,
  KC_ASDN: 0x7c10,
  KC_ASRP: 0x7c12,
  KC_ASTG: 0x7c15,
  KC_ASON: 0x7c13,
  KC_ASOFF: 0x7c14,
  AU_ON: 0x7480,
  AU_OFF: 0x7481,
  AU_TOG: 0x7482,
  CLICKY_TOGGLE: 0x748a,
  CLICKY_ENABLE: 0x748b,
  CLICKY_DISABLE: 0x748c,
  CLICKY_UP: 0x748d,
  CLICKY_DOWN: 0x748e,
  CLICKY_RESET: 0x748f,
  MU_ON: 0x7490,
  MU_OFF: 0x7491,
  MU_TOG: 0x7492,
  MU_MOD: 0x7493,
  MI_ON: 0x7100,
  MI_OFF: 0x7101,
  MI_TOG: 0x7102,
  MI_C: 0x7110,
  MI_Cs: 0x7111,
  MI_D: 0x7112,
  MI_Ds: 0x7113,
  MI_E: 0x7114,
  MI_F: 0x7115,
  MI_Fs: 0x7116,
  MI_G: 0x7117,
  MI_Gs: 0x7118,
  MI_A: 0x7119,
  MI_As: 0x711a,
  MI_B: 0x711b,
  MI_C_1: 0x7120,
  MI_Cs_1: 0x7121,
  MI_D_1: 0x7122,
  MI_Ds_1: 0x7123,
  MI_E_1: 0x7124,
  MI_F_1: 0x7125,
  MI_Fs_1: 0x7126,
  MI_G_1: 0x7127,
  MI_Gs_1: 0x7128,
  MI_A_1: 0x7129,
  MI_As_1: 0x712a,
  MI_B_1: 0x712b,
  MI_C_2: 0x7130,
  MI_Cs_2: 0x7131,
  MI_D_2: 0x7132,
  MI_Ds_2: 0x7133,
  MI_E_2: 0x7134,
  MI_F_2: 0x7135,
  MI_Fs_2: 0x7136,
  MI_G_2: 0x7137,
  MI_Gs_2: 0x7138,
  MI_A_2: 0x7139,
  MI_As_2: 0x713a,
  MI_B_2: 0x713b,
  MI_C_3: 0x7140,
  MI_Cs_3: 0x7141,
  MI_D_3: 0x7142,
  MI_Ds_3: 0x7143,
  MI_E_3: 0x7144,
  MI_F_3: 0x7145,
  MI_Fs_3: 0x7146,
  MI_G_3: 0x7147,
  MI_Gs_3: 0x7148,
  MI_A_3: 0x7149,
  MI_As_3: 0x714a,
  MI_B_3: 0x714b,
  MI_C_4: 0x7150,
  MI_Cs_4: 0x7151,
  MI_D_4: 0x7152,
  MI_Ds_4: 0x7153,
  MI_E_4: 0x7154,
  MI_F_4: 0x7155,
  MI_Fs_4: 0x7156,
  MI_G_4: 0x7157,
  MI_Gs_4: 0x7158,
  MI_A_4: 0x7159,
  MI_As_4: 0x715a,
  MI_B_4: 0x715b,
  MI_C_5: 0x7160,
  MI_Cs_5: 0x7161,
  MI_D_5: 0x7162,
  MI_Ds_5: 0x7163,
  MI_E_5: 0x7164,
  MI_F_5: 0x7165,
  MI_Fs_5: 0x7166,
  MI_G_5: 0x7167,
  MI_Gs_5: 0x7168,
  MI_A_5: 0x7169,
  MI_As_5: 0x716a,
  MI_B_5: 0x716b,
  MI_OCT_N2: 0x7170,
  MI_OCT_N1: 0x7171,
  MI_OCT_0: 0x7172,
  MI_OCT_1: 0x7173,
  MI_OCT_2: 0x7174,
  MI_OCT_3: 0x7175,
  MI_OCT_4: 0x7176,
  MI_OCT_5: 0x7177,
  MI_OCT_6: 0x7178,
  MI_OCT_7: 0x7179,
  MI_OCTD: 0x717a,
  MI_OCTU: 0x717b,
  MI_TRNS_N6: 0x7180,
  MI_TRNS_N5: 0x7181,
  MI_TRNS_N4: 0x7182,
  MI_TRNS_N3: 0x7183,
  MI_TRNS_N2: 0x7184,
  MI_TRNS_N1: 0x7185,
  MI_TRNS_0: 0x7186,
  MI_TRNS_1: 0x7187,
  MI_TRNS_2: 0x7188,
  MI_TRNS_3: 0x7189,
  MI_TRNS_4: 0x718a,
  MI_TRNS_5: 0x718b,
  MI_TRNS_6: 0x718c,
  MI_TRNSD: 0x718d,
  MI_TRNSU: 0x718e,
  MI_VEL_0: 0x7190,
  MI_VEL_1: 0x7191,
  MI_VEL_2: 0x7192,
  MI_VEL_3: 0x7193,
  MI_VEL_4: 0x7194,
  MI_VEL_5: 0x7195,
  MI_VEL_6: 0x7196,
  MI_VEL_7: 0x7197,
  MI_VEL_8: 0x7198,
  MI_VEL_9: 0x7199,
  MI_VEL_10: 0x719a,
  MI_VELD: 0x719b,
  MI_VELU: 0x719c,
  MI_CH1: 0x71a0,
  MI_CH2: 0x71a1,
  MI_CH3: 0x71a2,
  MI_CH4: 0x71a3,
  MI_CH5: 0x71a4,
  MI_CH6: 0x71a5,
  MI_CH7: 0x71a6,
  MI_CH8: 0x71a7,
  MI_CH9: 0x71a8,
  MI_CH10: 0x71a9,
  MI_CH11: 0x71aa,
  MI_CH12: 0x71ab,
  MI_CH13: 0x71ac,
  MI_CH14: 0x71ad,
  MI_CH15: 0x71ae,
  MI_CH16: 0x71af,
  MI_CHD: 0x71b0,
  MI_CHU: 0x71b1,
  MI_ALLOFF: 0x71c0,
  MI_SUST: 0x71c1,
  MI_PORT: 0x71c2,
  MI_SOST: 0x71c3,
  MI_SOFT: 0x71c4,
  MI_LEG: 0x71c5,
  MI_MOD: 0x71c6,
  MI_MODSD: 0x71c7,
  MI_MODSU: 0x71c8,
  MI_BENDD: 0x71c9,
  MI_BENDU: 0x71ca,
  BL_ON: 0x7800,
  BL_OFF: 0x7801,
  BL_DEC: 0x7803,
  BL_INC: 0x7804,
  BL_TOGG: 0x7802,
  BL_STEP: 0x7805,
  BL_BRTG: 0x7806,
  RGB_TOG: 0x7820,
  RGB_MOD: 0x7821,
  RGB_RMOD: 0x7822,
  RGB_HUI: 0x7823,
  RGB_HUD: 0x7824,
  RGB_SAI: 0x7825,
  RGB_SAD: 0x7826,
  RGB_VAI: 0x7827,
  RGB_VAD: 0x7828,
  RGB_SPI: 0x7829,
  RGB_SPD: 0x782a,
  RGB_M_P: 0x782b,
  RGB_M_B: 0x782c,
  RGB_M_R: 0x782d,
  RGB_M_SW: 0x782e,
  RGB_M_SN: 0x782f,
  RGB_M_K: 0x7830,
  RGB_M_X: 0x7831,
  RGB_M_G: 0x7832,
  RGB_MODE_RGBTEST: 0x7833,
  VLK_TOG: 0x7c17,
  KC_LSPO: 0x7c1a,
  KC_RSPC: 0x7c1b,
  KC_SFTENT: 0x7c1e,
  OUT_AUTO: 0x7c20,
  OUT_USB: 0x7c21,
  QK_CLEAR_EEPROM: 0x7c03,
  HPT_ON: 0x7c40,
  HPT_OFF: 0x7c41,
  HPT_TOG: 0x7c42,
  HPT_RST: 0x7c43,
  HPT_FBK: 0x7c44,
  HPT_BUZ: 0x7c45,
  HPT_MODI: 0x7c46,
  HPT_MODD: 0x7c47,
  HPT_CONT: 0x7c48,
  HPT_CONI: 0x7c49,
  HPT_COND: 0x7c4a,
  HPT_DWLI: 0x7c4b,
  HPT_DWLD: 0x7c4c,
  KC_LCPO: 0x7c18,
  KC_RCPC: 0x7c19,
  KC_LAPO: 0x7c1c,
  KC_RAPC: 0x7c1d,
  CMB_ON: 0x7c50,
  CMB_OFF: 0x7c51,
  CMB_TOG: 0x7c52,
  MAGIC_SWAP_LCTL_LGUI: 0x7017,
  MAGIC_SWAP_RCTL_RGUI: 0x7019,
  MAGIC_UNSWAP_LCTL_LGUI: 0x7018,
  MAGIC_UNSWAP_RCTL_RGUI: 0x701a,
  MAGIC_SWAP_CTL_GUI: 0x701b,
  MAGIC_UNSWAP_CTL_GUI: 0x701c,
  MAGIC_TOGGLE_CTL_GUI: 0x701d,
  MAGIC_EE_HANDS_LEFT: 0x701e,
  MAGIC_EE_HANDS_RIGHT: 0x701f,
  DYN_REC_START1: 0x7c53,
  DYN_REC_START2: 0x7c54,
  DYN_REC_STOP: 0x7c55,
  DYN_MACRO_PLAY1: 0x7c56,
  DYN_MACRO_PLAY2: 0x7c57,
  FN_MO13: 0x7700,
  FN_MO23: 0x7701,
};

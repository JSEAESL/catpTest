/**
*   @author mx
*   @date 2015.2.25
*   @desc 常量，静态表名，数据接口
**/
var mx;
(function (mx) {
    mx.MX_COMMON = {
        "MAIN_TAB": ["risk", "palace", "story", "xuxiu", "shop"],
        "MAIN_VIEW": ["fszmian", "jlqun", "shequn", "sign", "item"],
        "MAIN_ACTYTIME": ["huyao", "user_jijin", "open", "user_sc|2", "last_pay", "zlcb_flag", "open"],
        "MAIN_ACTYALERT": ["YHJSScreen", "KFJJView", "NvHuangKaQuanView", "ShouChongAlert", "ShouChongLastAlert", "ZLCBPaiHangAlert", "YbxnliView"],
        "MX_CREATED": "MX_CREATED",
        "MX_EFOVER": "MX_EFOVER",
        "MX_MLS_KEY": "MX_MLS_KEY",
        "MX_MELS_KEY": "MX_MELS_KEY",
        "MX_JINJIE": "MX_JINJIE",
        "MX_JYFB": "MX_JYFB",
        "MX_VERSION": "MX_VERSION",
        "MX_LS_SC": "MX_LS_SC",
        "MX_TJ_ZM": "MX_TJ_ZM",
        "MX_ZY_LOG": "MX_ZY_LOG",
        "MX_XXG_LOG": "MX_XXG_LOG",
        "MX_LS_QQCW": "MX_LS_QQCW",
        "MX_SLGXXIU": "MX_SLGXXIU",
        "MAX_DJS_BUY": 300,
        "MAX_JND_BUY": 30,
        "MAX_FB_RESET": 30,
        "MAX_VIP_LV": 15,
        "MAX_FZ_NUM": 100,
        "MX_ARARD_NUM": 8,
        "MX_SPERDIS": 1,
        "MX_SEND_LV": 15,
        "MX_DC_OPEN": true,
        "MUSIC_PLAY": true,
        "MUSIC_EFFECT_PLAY": true,
        "IN_GUIDE": 0,
        "GUIDE_SHARE": true,
        "GS_HEIGHT": 1280,
        "DFT_FONT": "微软雅黑",
        "TIME_DAY": "mx_day",
        "TIME_NIGHT": "mx_night",
        "CTYPE_YINBI": 1,
        "CTYPE_YBAO": 2,
        "CTYPE_TILI": 3,
        "CTYPE_ITEM": 4,
        "CTYPE_NWJY": 5,
        "CTYPE_SCJY": 6,
        "CTYPE_HERO": 7,
        "CTYPE_SKILL": 8,
        "CTYPE_CLOTH": 9,
        "CTYPE_HICON": 10,
        "CTYPE_ZIJIN": 11,
        "SHOW_WB_GIFT": true,
        "NEW_ROLE": false,
        "START_TD": true,
        "RONGHE_CHICUN": 400,
        "JIAQUN_YOUJIAN": 15,
        "SC_LH_BASE": 9000,
        "SC_LH_MAX": 11000,
        "SC_MID_BASE": 900,
        "SC_TX_W": 110,
        "VM_ALL_ALERT": "VM_ALL_ALERT",
        "BUY_N_MAX": 999,
        "HP_LEVEL": 7,
        "JUQING_TASK": 154,
        "MUSIC_STATE": 0,
        "MX_CS_KEY": "qmycznhbx2307",
    };
    //灰色矩阵
    mx.MX_GRAY_MATRIX = [
        //R,G,B,alpha,off
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0 //alpha
    ];
    //黑色
    mx.MX_BLACK_MATRIX = [
        //R,G,B,alpha,off
        0.33, 0.59, 0.11, 0, 0,
        0.33, 0.59, 0.11, 0, 0,
        0.33, 0.59, 0.11, 0, 0,
        0, 0, 0, 1, 0
    ];
    mx.MX_BLACK_MATRIX2 = [
        //R,G,B,alpha,off
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0.8, 0
    ];
    //红色
    mx.MX_RED_MATRIX = [
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ];
    /*----接口相关----end----*/
})(mx || (mx = {}));
//# sourceMappingURL=mxCommon.js.map
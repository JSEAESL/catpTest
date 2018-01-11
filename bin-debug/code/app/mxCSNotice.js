/**
 * mx
 * CS交互接口号
 * 2015/1/27.
 */
var mx;
(function (mx) {
    mx.MX_NETS = {
        "CS_SERVER_INFO": "1001",
        "SC_SERVER_INFO": "1001_1",
        "CS_USER_INFO": "1002",
        "SC_USER_INFO": "1002_1",
        "CS_CREATE_ROLE": "1003",
        "SC_CREATE_ROLE": "1003_1",
        "CS_SIGN_INFO": "1004",
        "SC_SIGN_INFO": "1004_1",
        "CS_SIGN": "1005",
        "SC_SIGN": "1005_1",
        "CS_PLAYER_INFO": "1006",
        "SC_PLAYER_INFO": "1006_1",
        "CS_QIANMING": "1007",
        "SC_QIANMING": "1007_1",
        "CS_BUQIAN": "1008",
        "SC_BUQIAN": "1008_1",
        "CS_CHANGE_TOUXIANG": "1009",
        "SC_CHANGE_TOUXIANG": "1009_1",
        "CS_CHECK_AVATAR": "1010",
        "CS_SIGN_BOX": "1011",
        "SC_SIGN_BOX": "1011_1",
        "CS_RENAME": "1101",
        "SC_RENAME": "1101_1",
        "CS_GUIDE_STEP": "1102",
        "CS_FLAG_STATE": "1103",
        "SC_FLAG_STATE": "1103_1",
        "CS_QQ_RECORD": "1104",
        "CS_INIT_SHIHE": "1106",
        "SC_INIT_SHIHE": "1106_1",
        "CS_QUCHU_SHIHE": "1107",
        "SC_QUCHU_SHIHE": "1107_1",
        "CS_FANGRU_SHIHE": "1108",
        "SC_FANGRU_SHIHE": "1108_1",
        "CS_HEARTBEAT": "1111",
        "CS_LIXIAN_DATA": "1115",
        "SC_LIXIAN_DATA": "1115_1",
        "CS_LIXIAN_LQ": "1116",
        "SC_LIXIAN_LQ": "1116_1",
        "CS_JUBAO_INFO": "1117",
        "SC_JUBAO_INFO": "1117_1",
        "CS_GETHMD_INFO": "1118",
        "SC_GETHMD_INFO": "1118_1",
        "CS_GET_RANK_INFO": "1119",
        "SC_GET_RANK_INFO": "1119_1",
        //购买相关
        "CS_BUY_INFO": "1201",
        "SC_BUY_INFO": "1201_1",
        "CS_BUY_TILI": "1202",
        "SC_BUY_TILI": "1202_1",
        "CS_BUY_DJS": "1203",
        "SC_BUY_DJS": "1203_1",
        "CS_BUY_SKILLPOINT": "1204",
        "SC_BUY_SKILLPOINT": "1204_1",
        "CS_BUY_ITEM": "1205",
        "SC_BUY_ITEM": "1205_1",
        "CS_SHOP_INFO": "1210",
        "SC_SHOP_INFO": "1210_1",
        "CS_SHOP_FRESH": "1211",
        "SC_SHOP_FRESH": "1211_1",
        "CS_SHOP_BUY": "1212",
        "SC_SHOP_BUY": "1212_1",
        "CS_TEGONG_SHOP": "1213",
        "SC_TEGONG_SHOP": "1213_1",
        "CS_TEGONG_BUY": "1214",
        "SC_TEGONG_BUY": "1214_1",
        //背包相关
        "CS_PACK_TYPE_ITEM": "1301",
        "SC_PACK_TYPE_ITEM": "1301_1",
        "CS_PACK_SELL_ITEM": "1302",
        "SC_PACK_SELL_ITEM": "1302_1",
        "CS_PACK_USE_TILI_ITEM": "1303",
        "SC_PACK_USE_TILI_ITEM": "1303_1",
        "CS_PACK_USE_EXP_ITEM": "1304",
        "SC_PACK_USE_EXP_ITEM": "1304_1",
        "CS_PACK_EQUIP_HECHENG": "1305",
        "SC_PACK_EQUIP_HECHENG": "1305_1",
        "CS_GETWAY_CISHU": "1306",
        "SC_GETWAY_CISHU": "1306_1",
        "CS_PACK_LIBAO_USE": "1307",
        "SC_PACK_LIBAO_USE": "1307_1",
        //副本相关
        "CS_FUBEN_CHAPTER_OPEN": "1401",
        "SC_FUBEN_CHAPTER_OPEN": "1401_1",
        "CS_FUBEN_STAGE_LIST": "1402",
        "SC_FUBEN_STAGE_LIST": "1402_1",
        "CS_FUBEN_CHUZHAN": "1403",
        "SC_FUBEN_CHUZHAN": "1403_1",
        "CS_FUBEN_SAODANG": "1404",
        "SC_FUBEN_SAODANG": "1404_1",
        "CS_FUBEN_CHONGZHI": "1405",
        "SC_FUBEN_CHONGZHI": "1405_1",
        "CS_FUBEN_BUY_SAODANG": "1406",
        "SC_FUBEN_BUY_SAODANG": "1406_1",
        "CS_FUBEN_GET_ENERMY": "1407",
        "SC_FUBEN_GET_ENERMY": "1407_1",
        "CS_FUBEN_GET_AWARD": "1408",
        "SC_FUBEN_GET_AWARD": "1408_1",
        "CS_FUBEN_GET_NEW_ENERMY": "1409",
        "SC_FUBEN_GET_NEW_ENERMY": "1409_1",
        "CS_JUQING_INFO": "1420",
        "SC_JUQING_INFO": "1420_1",
        "CS_JUQING_YLI_LQ": "1421",
        "SC_JUQING_YLI_LQ": "1421_1",
        "CS_JUQING_STAR_LQ": "1422",
        "SC_JUQING_STAR_LQ": "1422_1",
        "CS_JUQING_SSHOU_LQ": "1423",
        "SC_JUQING_SSHOU_LQ": "1423_1",
        //美男约会相关
        "CS_HERO_YUEHUI_STATE": "1501",
        "SC_HERO_YUEHUI_STATE": "1501_1",
        "CS_ALL_JUQING": "1502",
        "SC_ALL_JUQING": "1502_1",
        "CS_HERO_PASS_JUQING": "1503",
        "SC_HERO_PASS_JUQING": "1503_1",
        "CS_HOUGONG_WEIFEN": "1504",
        "SC_HOUGONG_WEIFEN": "1504_1",
        "CS_CEFENG_WEIFEN": "1505",
        "SC_CEFENG_WEIFEN": "1505_1",
        "CS_USE_PJCYD": "1506",
        "SC_USE_PJCYD": "1506_1",
        "CS_SHOURU": "1507",
        "SC_SHOURU": "1507_1",
        //服装相关
        "CS_CLOTH_GET_BY_TYPE": "1601",
        "SC_CLOTH_GET_BY_TYPE": "1601_1",
        "CS_CLOTH_GET_DRESSED": "1602",
        "SC_CLOTH_GET_DRESSED": "1602_1",
        "CS_CLOTH_REPLACE_DRESSED": "1603",
        "SC_CLOTH_REPLACE_DRESSED": "1603_1",
        "CS_CLOTH_QIANGHUA": "1604",
        "SC_CLOTH_QIANGHUA": "1604_1",
        "CS_CLOTH_JINJIE": "1605",
        "SC_CLOTH_JINJIE": "1605_1",
        "CS_CLOTH_ZHIZUO": "1606",
        "SC_CLOTH_ZHIZUO": "1606_1",
        "CS_CLOTH_DATE_TUIJIAN": "1607",
        "SC_CLOTH_DATE_TUIJIAN": "1607_1",
        "CS_CLOTH_BUY": "1608",
        "SC_CLOTH_BUY": "1608_1",
        //后宫养心殿相关
        "CS_YXD_INFO": "1701",
        "SC_YXD_INFO": "1701_1",
        "CS_YXD_SHIQIN": "1703",
        "SC_YXD_SHIQIN": "1703_1",
        "CS_YXD_SQ_EVENT": "1704",
        "SC_YXD_SQ_EVENT": "1704_1",
        "CS_YXD_HG_MSG": "1705",
        "SC_YXD_HG_MSG": "1705_1",
        "CS_YXD_PF_CIZI": "1706",
        "SC_YXD_PF_CIZI": "1706_1",
        "CS_YXD_CHILDREN": "1707",
        "SC_YXD_CHILDREN": "1707_1",
        "CS_YXD_LENGGONG": "1708",
        "SC_YXD_LENGGONG": "1708_1",
        "CS_YXD_PF_XIAOZI": "1709",
        "SC_YXD_PF_XIAOZI": "1709_1",
        "CS_FZ_NANCHAN": "1710",
        "SC_FZ_NANCHAN": "1710_1",
        "CS_HG_SHIJIAN": "1711",
        "SC_HG_SHIJIAN": "1711_1",
        "CS_FZ_SCDJ": "1713",
        "SC_FZ_SCDJ": "1713_1",
        "CS_CFZ_INFO": "1714",
        "SC_CFZ_INFO": "1714_1",
        "CS_SHIJIAN": "1715",
        "SC_SHIJIAN": "1715_1",
        "CS_SJ_SBING_CLEAR": "1716",
        "SC_SJ_SBING_CLEAR": "1716_1",
        "CS_HOUGONG_PROPERTY": "1742",
        "SC_HOUGONG_PROPERTY": "1742_1",
        "CS_HOUGONG_LEVELUP": "1743",
        "SC_HOUGONG_LEVELUP": "1743_1",
        //省亲相关
        "CS_YXD_FZ_XQ": "1720",
        "SC_YXD_FZ_XQ": "1720_1",
        "CS_YXD_XQ_FZDATA": "1721",
        "SC_YXD_XQ_FZDATA": "1721_1",
        "CS_YXD_XQ_ZINV": "1722",
        "SC_YXD_XQ_ZINV": "1722_1",
        "CS_YXD_XQ_ZINV_GIFT": "1723",
        "SC_YXD_XQ_ZINV_GIFT": "1723_1",
        "CS_YXD_XQ_FRESH_CD": "1724",
        "SC_YXD_XQ_FRESH_CD": "1724_1",
        // "CS_YXD_XQ_ZINV_GUIXING" : "1725",//id 领取子女归省礼物
        // "SC_YXD_XQ_ZINV_GUIXING" : "1725_1",//
        "CS_YXD_FZ_LQ_GIFT": "1727",
        "SC_YXD_FZ_LQ_GIFT": "1727_1",
        "CS_YXD_XQ_ZINV_GUIXING_ALL": "1728",
        "SC_YXD_XQ_ZINV_GUIXING_ALL": "1728_1",
        "CS_YXD_XQ_HUIGONG_ALL": "1729",
        "SC_YXD_XQ_HUIGONG_ALL": "1729_1",
        "CS_YXD_XQ_CJZN": "1731",
        "SC_YXD_XQ_CJZN": "1731_1",
        "CS_YXD_ZN_XQ": "1732",
        "SC_YXD_ZN_XQ": "1732_1",
        "CS_XQ_ADD_MC": "1733",
        "SC_XQ_ADD_MC": "1733_1",
        "CS_XQ_CD_COSTALL": "1734",
        "SC_XQ_CD_COSTALL": "1734_1",
        "CS_XQ_CD_CLEARALL": "1735",
        "SC_XQ_CD_CLEARALL": "1735_1",
        "CS_RENLIAN_RONGHE": "1736",
        "SC_RENLIAN_RONGHE": "1736_1",
        "CS_RENLIAN_REVERT": "1737",
        "SC_RENLIAN_REVERT": "1737_1",
        "CS_GUIZU_GUITAI": "1738",
        "SC_GUIZU_GUITAI": "1738_1",
        "CS_GUIZU_HUAPI": "1739",
        "SC_GUIZU_HUAPI": "1739_1",
        "CS_LENGGONG_NUM": "1741",
        "SC_LENGGONG_NUM": "1741_1",
        "CS_MAIN_LH": "1744",
        "SC_MAIN_LH": "1744_1",
        //皇子所
        "CS_HZS_DATA": "1801",
        "SC_HZS_DATA": "1801_1",
        "CS_HZS_CEFENG": "1802",
        "SC_HZS_CEFENG": "1802_1",
        "CS_HZS_NAME": "1803",
        "SC_HZS_NAME": "1803_1",
        "CS_HZS_SPEED": "1804",
        "SC_HZS_SPEED": "1804_1",
        "CS_HZS_LIANYIN": "1805",
        "SC_HZS_LIANYIN": "1805_1",
        "CS_HZS_LIANYIN_NWF": "1806",
        "SC_HZS_LIANYIN_NWF": "1806_1",
        "CS_HZS_KUOJIAN": "1807",
        "SC_HZS_KUOJIAN": "1807_1",
        "CS_HZS_LIANYIN_STOP": "1808",
        "SC_HZS_LIANYIN_STOP": "1808_1",
        "CS_HZS_LIANYIN_JUJUE": "1809",
        "SC_HZS_LIANYIN_JUJUE": "1809_1",
        "CS_CXG_DATA": "1820",
        "SC_CXG_DATA": "1820_1",
        "CS_FZ_INFO": "1821",
        "SC_FZ_INFO": "1821_1",
        "CS_BUY_FEIZI": "1822",
        "SC_BUY_FEIZI": "1822_1",
        "CS_CHAT_ZINV": "1823",
        "SC_CHAT_ZINV": "1823_1",
        "CS_HZS_PINGJIA": "3301",
        "SC_HZS_PINGJIA": "3301_1",
        "CS_HZS_TANWANG": "3302",
        "SC_HZS_TANWANG": "3302_1",
        "CS_HZS_HYZJ": "3303",
        "SC_HZS_HYZJ": "3303_1",
        "CS_HZS_XINGGE_SELECT": "3305",
        "SC_HZS_XINGGE_SELECT": "3305_1",
        "CS_BUZHEN_INFO": "2129",
        "SC_BUZHEN_INFO": "2129_1",
        // 皇子教室
        "CS_HZC_DATA": "4403",
        "SC_HZC_DATA": "4403_1",
        //冷宫
        "CS_YXD_LGFZINFO": "1901",
        "SC_YXD_LGFZINFO": "1901_1",
        //选秀相关
        "CS_XXIU_INFO": "2001",
        "SC_XXIU_INFO": "2001_1",
        "CS_XXIU_TYPE": "2002",
        "SC_XXIU_TYPE": "2002_1",
        "CS_XXIU_GSWS": "2003",
        "SC_XXIU_GSWS": "2003_1",
        //英雄相关
        "CS_HERO_LIST": "2101",
        "SC_HERO_LIST": "2101_1",
        "CS_CHERO_INFO": "2102",
        "SC_CHERO_INFO": "2102_1",
        "CS_HERO_EQUIP": "2103",
        "SC_HERO_EQUIP": "2103_1",
        "CS_HERO_UPPZ": "2105",
        "SC_HERO_UPPZ": "2105_1",
        "CS_HERO_UPXX": "2106",
        "SC_HERO_UPXX": "2106_1",
        "CS_SAVE_QUEUE": "2107",
        "SC_SAVE_QUEUE": "2107_1",
        "CS_CHANGE_QUEUE": "2108",
        "SC_CHANGE_QUEUE": "2108_1",
        "CS_QUEUE_INFO": "2109",
        "SC_QUEUE_INFO": "2109_1",
        "CS_HERO_UPLV": "2110",
        "SC_HERO_UPLV": "2110_1",
        "CS_INIT_SKILL": "2111",
        "SC_INIT_SKILL": "2111_1",
        "CS_SKILL_LEVELUP": "2112",
        "SC_SKILL_LEVELUP": "2112_1",
        "CS_CHERO_LHSDH": "2113",
        "SC_CHERO_LHSDH": "2113_1",
        "CS_HERO_YUEHUI": "2116",
        "SC_HERO_YUEHUI": "2116_1",
        "CS_INIT_XUYUUAN": "2125",
        "SC_INIT_XUYUUAN": "2125_1",
        "CS_XUYUUAN": "2126",
        "SC_XUYUUAN": "2126_1",
        "CS_JINLI": "2127",
        "SC_JINLI": "2127_1",
        "CS_HERO_YUEHUIVIEW": "2117",
        "SC_HERO_YUEHUIVIEW": "2117_1",
        "CS_CHERO_FYUP": "2114",
        "SC_CHERO_FYUP": "2114_1",
        "CS_JIUZI_UP": "2115",
        "SC_JIUZI_UP": "2115_1",
        "CS_ACT_SHENGXING": "2120",
        "SC_ACT_SHENGXING": "2120_1",
        "CS_ACT_SHENGXING_AWARD": "2121",
        "SC_ACT_SHENGXING_AWARD": "2121_1",
        "CS_ACT_SHENGXING_ALL": "2122",
        "SC_ACT_SHENGXING_ALL": "2122_1",
        "CS_HUNPO_ZHUANHUA": "2128",
        "SC_HUNPO_ZHUANHUA": "2128_1",
        "CS_ZLCB_RANK": "2130",
        "SC_ZLCB_RANK": "2130_1",
        "CS_ZLCB_FRESH": "2131",
        "SC_ZLCB_FRESH": "2131_1",
        //邮件相关
        "CS_MAIL_INFO": "2201",
        "SC_MAIL_INFO": "2201_1",
        "CS_READ_MAIL": "2202",
        "SC_READ_MAIL": "2202_1",
        "CS_DELETE_MAIL": "2203",
        "SC_DELETE_MAIL": "2203_1",
        "CS_MAIL_REWARD": "2204",
        "SC_MAIL_REWARD": "2204_1",
        "CS_CDKEY": "2205",
        "SC_CDKEY": "2205_1",
        "CS_LINGQU_ALL": "2206",
        "SC_LINGQU_ALL": "2206_1",
        "CS_CLEAR_READ": "2207",
        "SC_CLEAR_READ": "2207_1",
        "CS_RECHARGE": "2401",
        "SC_RECHARGE": "2401_1",
        "CS_FRECHARGE": "2402",
        "SC_FRECHARGE": "2402_1",
        "CS_RECHARGE_INFO": "2403",
        "SC_RECHARGE_INFO": "2403_1",
        "CS_VIP_LIBAOSTATE": "2404",
        "SC_VIP_LIBAOSTATE": "2404_1",
        "CS_VIP_LIBAO": "2405",
        "SC_VIP_LIBAO": "2405_1",
        "CS_LINGQU_SC": "2407",
        "SC_LINGQU_SC": "2407_1",
        "CS_ZGLB_SHOW": "2408",
        "CS_GET_AVATAR": "2409",
        "SC_GET_AVATAR": "2409_1",
        "CS_WX_RECHARGE": "2410",
        "SC_WX_RECHARGE": "2410_1",
        "CS_WX_BUY_YBAO": "2411",
        "SC_WX_BUY_YBAO": "2411_1",
        //每日任务-主线任务
        "CS_DAYTASK_INFO": "2501",
        "SC_DAYTASK_INFO": "2501_1",
        "CS_DAYTASK_AWARD": "2502",
        "SC_DAYTASK_AWARD": "2502_1",
        "CS_MAINTASK_INFO": "2503",
        "SC_MAINTASK_INFO": "2503_1",
        "CS_MAINTASK_AWARD": "2504",
        "SC_MAINTASK_AWARD": "2504_1",
        "CS_TASK_STORY": "2505",
        "SC_TASK_STORY": "2505_1",
        "CS_NHKQ_INFO": "2506",
        "SC_NHKQ_INFO": "2506_1",
        "CS_NHKQ_LQ": "2507",
        "SC_NHKQ_LQ": "2507_1",
        "CS_WEEK_ACT": "2510",
        "SC_WEEK_ACT": "2510_1",
        "CS_WEEK_LQ": "2511",
        "SC_WEEK_LQ": "2511_1",
        //好友
        "CS_FRIEND_DATA": "2601",
        "SC_FRIEND_DATA": "2601_1",
        "CS_FRIEND_VISIT": "2602",
        "SC_FRIEND_VISIT": "2602_1",
        "CS_FRIEND_GIFT": "2603",
        "SC_FRIEND_GIFT": "2603_1",
        "CS_FRIEND_ADD": "2604",
        "SC_FRIEND_ADD": "2604_1",
        "CS_FRIEND_SEARCH": "2605",
        "SC_FRIEND_SEARCH": "2605_1",
        "CS_FRIEND_REMOVE": "2606",
        "SC_FRIEND_REMOVE": "2606_1",
        "CS_FRIEND_SQING": "2607",
        "SC_FRIEND_SQING": "2607_1",
        "CS_FRIEND_SQ_DATA": "2608",
        "SC_FRIEND_SQ_DATA": "2608_1",
        "CS_FRIEND_ACCEPT": "2609",
        "SC_FRIEND_ACCEPT": "2609_1",
        "CS_FREIEND_SHOULI": "2610",
        "SC_FREIEND_SHOULI": "2610_1",
        "CS_FREIEND_YJBAIF": "2611",
        "SC_FREIEND_YJBAIF": "2611_1",
        "CS_FREIEND_YJSL": "2612",
        "SC_FREIEND_YJSL": "2612_1",
        "CS_CHECK_YJSL": "2613",
        "SC_CHECK_YJSL": "2613_1",
        //太庙
        "CS_TEMPLE_JIBAI": "2701",
        "SC_TEMPLE_JIBAI": "2701_1",
        "CS_JIBAI_AWARD": "2702",
        "SC_JIBAI_AWARD": "2702_1",
        "CS_TEMPLE_HZHUANG": "2703",
        "SC_TEMPLE_HZHUANG": "2703_1",
        "CS_GET_TEMPLE_FIGHT": "2704",
        "SC_GET_TEMPLE_FIGHT": "2704_1",
        "CS_CHECK_TEMPLE_FIGHT": "2705",
        "SC_CHECK_TEMPLE_FIGHT": "2705_1",
        "CS_TEMPLE_HZHUANG_TJ": "2706",
        "SC_TEMPLE_HZHUANG_TJ": "2706_1",
        "CS_TEMPLE_JINJI": "2707",
        "SC_TEMPLE_JINJI": "2707_1",
        //活动
        "CS_GET_OPEN_ACTY": "2801",
        "SC_GET_OPEN_ACTY": "2801_1",
        "CS_ACTY_SIGN_DATA": "2802",
        "SC_ACTY_SIGN_DATA": "2802_1",
        "CS_ACTY_SIGN": "2803",
        "SC_ACTY_SIGN": "2803_1",
        "CS_ACTY_DATA": "2804",
        "SC_ACTY_DATA": "2804_1",
        "CS_ACTY_AWARD": "2805",
        "SC_ACTY_AWARD": "2805_1",
        "CS_BUG_JIJIN": "2807",
        "SC_BUG_JIJIN": "2807_1",
        "CS_LQ_JIJIN": "2808",
        "SC_LQ_JIJIN": "2808_1",
        "CS_HUYAO_TISHI": "2809",
        "SC_HUYAO_TISHI": "2809_1",
        "CS_LQ_ZAIXIAN": "2810",
        "SC_LQ_ZAIXIAN": "2810_1",
        "CS_HUYAO_DAY_DATA": "2811",
        "SC_HUYAO_DAY_DATA": "2811_1",
        "CS_HUYAO_FY_ACT": "2812",
        "SC_HUYAO_FY_ACT": "2812_1",
        "CS_HUYAO_DAY_AWARD": "2813",
        "SC_HUYAO_DAY_AWARD": "2813_1",
        "CS_HUYAO_FINAL_AWARD": "2814",
        "SC_HUYAO_FINAL_AWARD": "2814_1",
        "CS_GUIZU_ACT": "2818",
        "SC_GUIZU_ACT": "2818_1",
        "CS_GUIZU_YOUHUI": "2819",
        "SC_GUIZU_YOUHUI": "2819_1",
        "CS_GUIZU_BOX": "2820",
        "SC_GUIZU_BOX": "2820_1",
        "CS_GUIZU_WEITUO": "2821",
        "SC_GUIZU_WEITUO": "2821_1",
        "CS_GUIZU_FENXIANG": "2822",
        "SC_GUIZU_FENXIANG": "2822_1",
        "CS_GUIZU_ADD_HOUGONG": "2823",
        "SC_GUIZU_ADD_HOUGONG": "2823_1",
        "CS_YONGJIU_PAY": "2824",
        "SC_YONGJIU_PAY": "2824_1",
        "CS_YONGJIU_PAY_AWARD": "2825",
        "SC_YONGJIU_PAY_AWARD": "2825_1",
        "CS_LAST_PAY": "2829",
        "SC_LAST_PAY": "2829_1",
        "CS_LAST_PAY_BOX": "2830",
        "SC_LAST_PAY_BOX": "2830_1",
        "CS_ACTY_CAT": "2835",
        "SC_ACTY_CAT": "2835_1",
        "CS_ACTY_CAT_INPUT": "2836",
        "SC_ACTY_CAT_INPUT": "2836_1",
        "CS_ACTY_LEIJISIGN": "2837",
        "SC_ACTY_LEIJISIGN": "2837_1",
        "CS_ACTY_LEIJISIGN_AWARD": "2838",
        "SC_ACTY_LEIJISIGN_AWARD": "2838_1",
        "CS_CZ_LOOP_INFO": "2839",
        "SC_CZ_LOOP_INFO": "2839_1",
        "CS_CZ_LOOP_BOX": "2840",
        "SC_CZ_LOOP_BOX": "2840_1",
        "CS_LIANDAN_INFO": "2841",
        "SC_LIANDAN_INFO": "2841_1",
        "CS_LIANDAN": "2842",
        "SC_LIANDAN": "2842_1",
        "CS_LIANDAN_AWARD": "2843",
        "SC_LIANDAN_AWARD": "2843_1",
        "CS_QIFU_LOG": "2845",
        "SC_QIFU_LOG": "2845_1",
        "CS_QIFU": "2846",
        "SC_QIFU": "2846_1",
        "CS_QIFU_MAIN": "2847",
        "SC_QIFU_MAIN": "2847_1",
        "CS_ACT_WS_MAIN": "2850",
        "SC_ACT_WS_MAIN": "2850_1",
        "CS_ACT_WS_BUY": "2851",
        "SC_ACT_WS_BUY": "2851_1",
        "CS_ACT_WS_DUIHUAN": "2852",
        "SC_ACT_WS_DUIHUAN": "2852_1",
        "CS_ACT_CYGG_MAIN": "2855",
        "SC_ACT_CYGG_MAIN": "2855_1",
        "CS_ACT_CYGG_BUY": "2856",
        "SC_ACT_CYGG_BUY": "2856_1",
        "CS_ACT_CYGG_CHOU": "2857",
        "SC_ACT_CYGG_CHOU": "2857_1",
        //女王外交
        "CS_FRIEND_HGONG": "2901",
        "SC_FRIEND_HGONG": "2901_1",
        "CS_TIAOXI": "2902",
        "SC_TIAOXI": "2902_1",
        "CS_CHECK_TIAOXI_FIGHT": "2903",
        "SC_CHECK_TIAOXI_FIGHT": "2903_1",
        "CS_TX_FRIEND_DATA": "2904",
        "SC_TX_FRIEND_DATA": "2904_1",
        "CS_TX_FRIEND_TUIJIAN": "2905",
        "SC_TX_FRIEND_TUIJIAN": "2905_1",
        //教坊司
        "CS_WAIJIAO_DATA": "3001",
        "SC_WAIJIAO_DATA": "3001_1",
        "CS_DR_JFS": "3002",
        "SC_DR_JFS": "3002_1",
        "CS_JIAOFANGSI_DATA": "3003",
        "SC_JIAOFANGSI_DATA": "3003_1",
        "CS_JFSTYPE": "3009",
        "SC_JFSTYPE": "3009_1",
        "CS_JFSPC": "3004",
        "SC_JFSPC": "3004_1",
        "CS_JFS_FIGHT": "3005",
        "SC_JFS_FIGHT": "3005_1",
        "CS_JFS_CHECK_FIGHT": "3006",
        "SC_JFS_CHECK_FIGHT": "3006_1",
        "CS_JFS_SS": "3007",
        "SC_JFS_SS": "3007_1",
        "CS_JFS_EK": "3008",
        "SC_JFS_EK": "3008_1",
        //掠夺相关
        "CS_LUEDUO_MINE": "3101",
        "SC_LUEDUO_MINE": "3101_1",
        "CS_LUEDUO_USEBHL": "3102",
        "SC_LUEDUO_USEBHL": "3102_1",
        "CS_LUEDUO_OTHER": "3103",
        "SC_LUEDUO_OTHER": "3103_1",
        "CS_OTHER_ZINV": "3104",
        "SC_OTHER_ZINV": "3104_1",
        "CS_LUEDUO_QJYZ": "3105",
        "SC_LUEDUO_QJYZ": "3105_1",
        "CS_LUEDUO_TRXQ": "3106",
        "SC_LUEDUO_TRXQ": "3106_1",
        "CS_LUEDUO_CHZHFL": "3107",
        "SC_LUEDUO_CHZHFL": "3107_1",
        "CS_LUEDUO_GMLDD": "3108",
        "SC_LUEDUO_GMLDD": "3108_1",
        "CS_LUEDUO_SSDR": "3109",
        "SC_LUEDUO_SSDR": "3109_1",
        "CS_LUEDUO_LDDZT": "3110",
        "SC_LUEDUO_LDDZT": "3110_1",
        "CS_LUEDUO_FIGHT": "3111",
        "SC_LUEDUO_FIGHT": "3111_1",
        "CS_LUEDUO_RESULT": "3112",
        "SC_LUEDUO_RESULT": "3112_1",
        "CS_LUEDUO_QINGJIA": "3113",
        "SC_LUEDUO_QINGJIA": "3113_1",
        "CS_LUEDUO_XIANGQ": "3114",
        "SC_LUEDUO_XIANGQ": "3114_1",
        "CS_LUEDUO_CHECK": "3115",
        "SC_LUEDUO_CHECK": "3115_1",
        "CS_LUEDUO_CHECKHG": "3116",
        "SC_LUEDUO_CHECKHG": "3116_1",
        "CS_LUEDUO_QUE": "3117",
        "SC_LUEDUO_QUE": "3117_1",
        "CS_LUEDUO_BGSG": "3118",
        "SC_LUEDUO_BGSG": "3118_1",
        //囚凤宫
        "CS_QFG_DATA": "3201",
        "SC_QFG_DATA": "3201_1",
        "CS_QFG_USE_ITEM": "3202",
        "SC_QFG_USE_ITEM": "3202_1",
        "CS_QFG_MOVE_HG": "3203",
        "SC_QFG_MOVE_HG": "3203_1",
        "CS_QFG_MOVE_JFS": "3204",
        "SC_QFG_MOVE_JFS": "3204_1",
        "CS_QFG_BACK_HUIGUO": "3205",
        "SC_QFG_BACK_HUIGUO": "3205_1",
        //竞技场
        "CS_JJC_FRESH": "3401",
        "SC_JJC_FRESH": "3401_1",
        "CS_JJC_FIGHT": "3402",
        "SC_JJC_FIGHT": "3402_1",
        "CS_JJC_CLEARCD": "3403",
        "SC_JJC_CLEARCD": "3403_1",
        "CS_JJC_LOG": "3404",
        "SC_JJC_LOG": "3404_1",
        "CS_JJC_CISHU": "3405",
        "SC_JJC_CISHU": "3405_1",
        "CS_JJC_SETTEAM": "3406",
        "SC_JJC_SETTEAM": "3406_1",
        "CS_JJC_FIGHT_CHECK": "3407",
        "SC_JJC_FIGHT_CHECK": "3407_1",
        "CS_JJC_LINGQU": "3408",
        "SC_JJC_LINGQU": "3408_1",
        "CS_JJC_JLZT": "3409",
        "SC_JJC_JLZT": "3409_1",
        "CS_JJC_DETAIL": "3410",
        "SC_JJC_DETAIL": "3410_1",
        "CS_JJC_SHOP": "3411",
        "SC_JJC_SHOP": "3411_1",
        "CS_JJC_SHOPFRESH": "3412",
        "SC_JJC_SHOPFRESH": "3412_1",
        "CS_JJC_DUIHUAN": "3413",
        "SC_JJC_DUIHUAN": "3413_1",
        "CS_JJC_PAIHANG": "3414",
        "SC_JJC_PAIHANG": "3414_1",
        "CS_JJC_XIANGQING": "3415",
        "SC_JJC_XIANGQING": "3415_1",
        //家族
        "CS_UNION_BUILD": "3501",
        "SC_UNION_BUILD": "3501_1",
        "CS_UNION_INIT": "3502",
        "SC_UNION_INIT": "3502_1",
        "CS_UNION_SHENQ": "3503",
        "SC_UNION_SHENQ": "3503_1",
        "CS_UNION_SQLIST": "3504",
        "SC_UNION_SQLIST": "3504_1",
        "CS_UNION_AGREE": "3505",
        "SC_UNION_AGREE": "3505_1",
        "CS_UNION_REFUSE": "3506",
        "SC_UNION_REFUSE": "3506_1",
        "CS_UNION_REFUSES": "3507",
        "SC_UNION_REFUSES": "3507_1",
        "CS_UNION_QUIT": "3508",
        "SC_UNION_QUIT": "3508_1",
        "CS_UNION_SEARCH": "3509",
        "SC_UNION_SEARCH": "3509_1",
        "CS_UNION_TIREN": "3510",
        "SC_UNION_TIREN": "3510_1",
        "CS_UNION_RENMIN": "3511",
        "SC_UNION_RENMIN": "3511_1",
        "CS_UNION_GONGGAO": "3512",
        "SC_UNION_GONGGAO": "3512_1",
        "CS_UNION_CHEXIAO": "3513",
        "SC_UNION_CHEXIAO": "3513_1",
        "CS_UNION_LIST": "3514",
        "SC_UNION_LIST": "3514_1",
        "CS_UNION_LOG": "3515",
        "SC_UNION_LOG": "3515_1",
        "CS_UNION_RENAME": "3516",
        "SC_UNION_RENAME": "3516_1",
        "CS_UNION_MAIN": "3517",
        "SC_UNION_MAIN": "3517_1",
        "CS_UNION_RIZHI": "3518",
        "SC_UNION_RIZHI": "3518_1",
        "CS_UNION_MLIST": "3519",
        "SC_UNION_MLIST": "3519_1",
        "CS_UNION_RULER": "3520",
        "SC_UNION_RULER": "3520_1",
        "CS_UNION_RANDTEN": "3521",
        "SC_UNION_RANDTEN": "3521_1",
        "CS_UNION_DONATE": "3522",
        "SC_UNION_DONATE": "3522_1",
        "CS_UNION_SHOP": "3523",
        "SC_UNION_SHOP": "3523_1",
        "CS_UNION_DUIHUAN": "3524",
        "SC_UNION_DUIHUAN": "3524_1",
        "CS_UNION_FRESH": "3525",
        "SC_UNION_FRESH": "3525_1",
        "CS_UNION_RANK": "3526",
        "SC_UNION_RANK": "3526_1",
        "CS_UNION_DONATES": "3527",
        "SC_UNION_DONATES": "3527_1",
        "CS_SHENQING_LIST": "3528",
        "SC_SHENQING_LIST": "3528_1",
        "CS_UNION_KSJR": "3529",
        "SC_UNION_KSJR": "3529_1",
        "CS_INIT_JZXF": "3530",
        "SC_INIT_JZXF": "3530_1",
        "CS_GOUM_JZXF": "3531",
        "SC_GOUM_JZXF": "3531_1",
        "CS_PAIH_JZXF": "3532",
        "SC_PAIH_JZXF": "3532_1",
        //相国寺
        "CS_XGS_FEIZI": "3901",
        "SC_XGS_FEIZI": "3901_1",
        "CS_XGS_ZHUIFENG": "3904",
        "SC_XGS_ZHUIFENG": "3904_1",
        "CS_XGS_CIFENG": "3902",
        "SC_XGS_CIFENG": "3902_1",
        "CS_XGS_ZINV": "3903",
        "SC_XGS_ZINV": "3903_1",
        "CS_XGS_YQZF": "3906",
        "SC_XGS_YQZF": "3906_1",
        "CS_XGS_ZSTT": "3905",
        "SC_XGS_ZSTT": "3905_1",
        "CS_OLD_NAME": "3907",
        "SC_OLD_NAME": "3907_1",
        "CS_XGS_RENAME": "3908",
        "SC_XGS_RENAME": "3908_1",
        //分享接口
        "CS_ADD_TABLE_REWARD": "3701",
        "SC_ADD_TABLE_REWARD": "3701_1",
        "CS_SHARE_WEEK": "3702",
        "SC_SHARE_WEEK": "3702_1",
        "CS_SHARE_YBNLI": "3703",
        "SC_SHARE_YBNLI": "3703_1",
        "CS_SHARE_YAZHAYB": "3704",
        "SC_SHARE_YAZHAYB": "3704_1",
        "CS_WANBA_GIFT": "3705",
        "SC_WANBA_GIFT": "3705_1",
        "CS_SHARE_FZ": "3706",
        "SC_SHARE_FZ": "3706_1",
        "CS_JJC_PAIHANG_QQ": "3707",
        "SC_JJC_PAIHANG_QQ": "3707_1",
        "SC_WB_MSG": "3708",
        "CS_WB_JJC_SHARE": "3709",
        "SC_WB_JJC_SHARE": "3709_1",
        "CS_WB_SJ_SHARE": "3710",
        "SC_WB_SJ_SHARE": "3710_1",
        "CS_WB_SJ_SHARE_LQ": "3711",
        "SC_WB_SJ_SHARE_LQ": "3711_1",
        "CS_WB_YBNL_LQ": "3712",
        "SC_WB_YBNL_LQ": "3712_1",
        "CS_WB_YBNL_YQJL": "3713",
        "SC_WB_YBNL_YQJL": "3713_1",
        "CS_WB_YBNL_YQTHHD": "3714",
        "SC_WB_YBNL_YQTHHD": "3714_1",
        "CS_CLIENT_SHARE": "3715",
        "SC_CLIENT_SHARE": "3715_1",
        "CS_WANBA_COVER": "3716",
        "SC_WANBA_COVER": "3716_1",
        "CS_LQ_COVER": "3717",
        "SC_LQ_COVER": "3717_1",
        "CS_WANBA_VIP": "3718",
        "SC_WANBA_VIP": "3718_1",
        "CS_WANBA_LQVIP": "3719",
        "SC_WANBA_LQVIP": "3719_1",
        "CS_WANBA_PET": "3720",
        "SC_WANBA_PET": "3720_1",
        "CS_WANBA_PETLQ": "3721",
        "SC_WANBA_PETLQ": "3721_1",
        //聊天结缘砍价相关接口
        "CS_CHAT_KANJIA": "3801",
        "SC_CHAT_KANJIA": "3801_1",
        "CS_CHAT_KANJIA_AGREE": "3802",
        "SC_CHAT_KANJIA_AGREE": "3802_1",
        "CS_CHAT_KANJIA_JUJUE": "3803",
        "SC_CHAT_KANJIA_JUJUE": "3803_1",
        "CS_SHIJIAN_LY_DEAL": "3804",
        "SC_SHIJIAN_LY_DEAL": "3804_1",
        "CS_SHIJIAN_CHECHA": "3805",
        "SC_SHIJIAN_CHECHA": "3805_1",
        //玩吧-特定消息
        "CS_FACE_MERGE": "4001",
        "SC_FACE_MERGE": "4001_1",
        "CS_FACE_MERGES": "4002",
        "SC_FACE_MERGES": "4002_1",
        //黑市消息
        "CS_GET_HEISHIBI": "4201",
        "SC_GET_HEISHIBI": "4201_1",
        "CS_HSB_DH": "4202",
        "SC_HSB_DH": "4202_1",
        "CS_HS_GET_ZN": "4203",
        "SC_HS_GET_ZN": "4203_1",
        "CS_HS_SHANGJIA_ZN": "4204",
        "SC_HS_SHANGJIA_ZN": "4204_1",
        "CS_HS_BUY_DATA": "4205",
        "SC_HS_BUY_DATA": "4205_1",
        "CS_HS_BUY_ZN": "4206",
        "SC_HS_BUY_ZN": "4206_1",
        "CS_HS_SELL_ZN": "4207",
        "SC_HS_SELL_ZN": "4207_1",
        "CS_HS_XYEND": "4208",
        "SC_HS_XYEND": "4208_1",
        //翰林院
        "CS_HLY_FEIZI": "4401",
        "SC_HLY_FEIZI": "4401_1",
        "CS_XUANZE_TAIFU": "4402",
        "SC_XUANZE_TAIFU": "4402_1",
        //上龙国选秀
        "CS_XXG_XXIU": "4303",
        "SC_XXG_XXIU": "4303_1",
        "CS_XXG_INITXXIU": "4304",
        "SC_XXG_INITXXIU": "4304_1",
        "CS_XXG_LQJL": "4305",
        "SC_XXG_LQJL": "4305_1",
        "CS_XXG_QCCD": "4306",
        "SC_XXG_QCCD": "4306_1",
        //
        "CS_TUJIAN_MAIN": "4501",
        "SC_TUJIAN_MAIN": "4501_1",
        "CS_TUJIAN_DETAIL": "4502",
        "SC_TUJIAN_DETAIL": "4502_1",
        "CS_TUJIAN_ZAN": "4503",
        "SC_TUJIAN_ZAN": "4503_1",
        "CS_TUJIAN_PINL": "4504",
        "SC_TUJIAN_PINL": "4504_1",
        "CS_TUJIAN_PZAN": "4505",
        "SC_TUJIAN_PZAN": "4505_1",
        //红包接口
        "CS_HONGBAO_SENDINFO": "4601",
        "SC_HONGBAO_SENDINFO": "4601_1",
        "CS_HONGBAO_SENDDETAIL": "4602",
        "SC_HONGBAO_SENDDETAIL": "4602_1",
        "CS_HONGBAO_RECINFO": "4603",
        "SC_HONGBAO_RECINFO": "4603_1",
        "CS_HONGBAO_GET": "4604",
        "SC_HONGBAO_GET": "4604_1",
        "CS_HONGBAO_LQ": "4605",
        "SC_HONGBAO_LQ": "4605_1",
        //手Qsdk
        "CS_SDK_AWARD": "4701",
        "SC_SDK_AWARD": "4701_1",
        "CS_SDK_TWINFO": "4702",
        "SC_SDK_TWINFO": "4702_1",
        "CS_SDK_TWZS": "4703",
        "SC_SDK_TWZS": "4703_1",
        "CS_SDK_TWSL": "4704",
        "SC_SDK_TWSL": "4704_1",
        "CS_SDK_TWYJ": "4705",
        "SC_SDK_TWYJ": "4705_1",
        "CS_SDK_TWSQ": "4706",
        "SC_SDK_TWSQ": "4706_1",
        //数据变化小接口
        "SC_DATA_TILI": "10001_1",
        "SC_DATA_UEXP": "10002_1",
        "SC_DATA_CLOTH": "10123_1",
        "SC_TISHI_STATE": "10128_1",
        "SC_TASK_OPEN": "11001_1",
        "SC_CHECK_AVATAR": "30001_1",
        "SC_ZAIXIAN_TIME": "10129_1",
        //通用奖励弹窗，awards:奖励组，type:[wait:等待,其他立刻显示]
        "SC_DATA_REWARD": "10125_1",
        "SC_DATA_JYB": "10126_1",
        "SC_DATA_YB": "10127_1",
        "SC_DATA_ZJB": "10003_1",
        //开启新副本{"chapter":"1","stage":"10001","cishu":"3","max":"3","state":0,"difficult":"2"}
        "SC_NEW_FBS": "14001_1",
        "SC_ADD_LENGGONG": "17001_1",
        "SC_ADD_HERO": "21001_1",
        "SC_HERO_SHARE_EXP": "21002_1",
        //发系统消息
        "SC_SYS_MESSAGE": "22000_1",
    };
})(mx || (mx = {}));
//# sourceMappingURL=mxCSNotice.js.map
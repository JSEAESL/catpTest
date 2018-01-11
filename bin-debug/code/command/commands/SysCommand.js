/**
 * mx
 * mx
 * 系统通用命令处理
 * 2016/12/20.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mx;
(function (mx) {
    var SysCommand = (function (_super) {
        __extends(SysCommand, _super);
        function SysCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SysCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_TISHI_STATE, SysCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FLAG_STATE, SysCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ADD_TABLE_REWARD, SysCommand); //添加到桌面
            this.facade.registerCommand(mx.MX_NETS.SC_SHARE_WEEK, SysCommand); //周分享
            this.facade.registerCommand(mx.MX_NETS.SC_SHARE_YAZHAYB, SysCommand); //领取小奴隶元宝奖励     
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_GIFT, SysCommand); //玩吧礼包领取
            this.facade.registerCommand(mx.MX_NETS.SC_WB_SJ_SHARE, SysCommand); //玩吧事件分享
            this.facade.registerCommand(mx.MX_NETS.SC_WB_SJ_SHARE_LQ, SysCommand); //玩吧事件奖励
            this.facade.registerCommand(mx.MX_NETS.SC_FACE_MERGE, SysCommand); //人脸识别
            this.facade.registerCommand(mx.MX_NETS.SC_FACE_MERGES, SysCommand); //人脸识别
            this.facade.registerCommand(mx.MX_NOTICE.CHOOSE_CHECK, SysCommand);
            this.facade.registerCommand(mx.MX_NOTICE.CHECK_HERO_INFO, SysCommand);
            this.facade.registerCommand(mx.MX_NOTICE.CHECK_RECHARGE, SysCommand);
            this.facade.registerCommand(mx.MX_NOTICE.GAME_TS_MSG, SysCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HONGBAO_RECINFO, SysCommand); //收到的红包记录
            this.facade.registerCommand(mx.MX_NETS.SC_HONGBAO_SENDINFO, SysCommand); //送出的红包记录
            this.facade.registerCommand(mx.MX_NETS.SC_HONGBAO_SENDDETAIL, SysCommand); //送出的红包详情
            this.facade.registerCommand(mx.MX_NETS.SC_HONGBAO_GET, SysCommand); //红包模式 
            this.facade.registerCommand(mx.MX_NETS.SC_HONGBAO_LQ, SysCommand); //领取红包到游戏内
        };
        SysCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var n_name = notification.getName();
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            switch (n_name) {
                case mx.MX_NETS.SC_FLAG_STATE://主界面小红点消息初始化
                    gproxy.init_tishi_data(data);
                    break;
                case mx.MX_NETS.SC_TISHI_STATE://10128 小接口，心跳返回。刷新 邮件 任务 每日任务提示、好友奖励
                    for (var k in data.flags) {
                        gproxy.set_tishi(k, data.flags[k]);
                    }
                    var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    gproxy.set_tishi('mnan', hproxy.check_hero_tishi()); //侍从操作提示：技能，装备，升星
                    mx.Tools.check_version(data.version);
                    break;
                case mx.MX_NETS.SC_ADD_TABLE_REWARD://添加到桌面
                    if (data.state) {
                        gproxy.tishi_data.desktop = false;
                        this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT, "tjzm");
                        this.sendNotification(mx.MX_NOTICE.CHECK_MAIN_ALERT); //主动关闭时检查下一个弹窗
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sys001 });
                    }
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AddTableView.S_NAME);
                    break;
                case mx.MX_NETS.SC_SHARE_WEEK://周分享
                    this.share_week(data);
                    break;
                case mx.MX_NETS.SC_SHARE_YAZHAYB://领取小元宝奖励
                    this.get_ybxnl_reward(data);
                    break;
                case mx.MX_NETS.SC_WANBA_GIFT://玩吧礼包弹窗
                    var gameProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    gameProxy.set_wanbalibao(data);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.WanBaLiBaoAlert.S_NAME });
                    break;
                case mx.MX_NOTICE.CHOOSE_CHECK://询问玩家是否进行某项操作
                    this.choose_check(notification.getType());
                    break;
                case mx.MX_NOTICE.CHECK_HERO_INFO://检查如何显示侍从详情
                    this.check_hero_info(data);
                    break;
                case mx.MX_NOTICE.CHECK_RECHARGE://充值预处理
                    this.check_recharge(data);
                    break;
                case mx.MX_NOTICE.GAME_TS_MSG:
                    this.check_ts_msg(data);
                    break;
                case mx.MX_NETS.SC_WB_SJ_SHARE:
                    this.wb_share_sj(data);
                    break;
                case mx.MX_NETS.SC_WB_SJ_SHARE_LQ:
                    this.wb_share_sj_lq(data);
                    break;
                case mx.MX_NETS.SC_FACE_MERGE:
                case mx.MX_NETS.SC_FACE_MERGES:
                    var fx = n_name == mx.MX_NETS.SC_FACE_MERGES;
                    this.face_merge_cb(data, fx);
                    break;
                case mx.MX_NETS.SC_HONGBAO_RECINFO:
                    this.receive_hb_log(data);
                    break;
                case mx.MX_NETS.SC_HONGBAO_SENDINFO:
                    this.send_hb_log(data);
                    break;
                case mx.MX_NETS.SC_HONGBAO_SENDDETAIL:
                    this.send_hb_detail(data);
                    break;
                case mx.MX_NETS.SC_HONGBAO_GET:
                    this.hongbao_mode(data);
                    break;
                case mx.MX_NETS.SC_HONGBAO_LQ:
                    this.hongbao_lq(data);
                    break;
            }
        };
        SysCommand.prototype.receive_hb_log = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.rec_hb = null;
            if (Number(data.state) == 1) {
                gproxy.rec_hb = data.data;
            }
            if (!gproxy.hb_flag) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HongbaoJiluView.S_NAME });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
            }
        };
        SysCommand.prototype.send_hb_log = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.send_hb = null;
            if (Number(data.state) == 1) {
                gproxy.send_hb = data.data;
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
        };
        SysCommand.prototype.send_hb_detail = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.send_hb_detail = null;
            if (Number(data.state) == 1) {
                gproxy.send_hb_detail = data;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_HB_DETAIL);
        };
        SysCommand.prototype.hongbao_mode = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.hb_mode_data = null;
            gproxy.hb_mode_data = data;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HongbaoXQView.S_NAME });
        };
        SysCommand.prototype.hongbao_lq = function (data) {
            var str = "";
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.hb005;
                    break;
                case 1:
                    str = mx.Lang.hb006;
                    break;
                case 2:
                    str = mx.Lang.hb007;
                    break;
                case 3:
                    str = mx.Lang.hb008;
                    break;
            }
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (gproxy.hongbao_create) {
                gproxy.hongbao_create = false;
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        SysCommand.prototype.face_merge_cb = function (data, fx) {
            var cd = data.back;
            if (cd) {
                var ret = cd.code;
                switch (Number(ret)) {
                    case 0://成功
                        if (fx) {
                            if (window && window["share_face"]) {
                                window["share_face"](Main.USER_ID, cd.img_url_200);
                            }
                        }
                        else {
                            var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
                            pproxy.temp_ronghe = cd.img_url_400;
                            this.sendNotification(mx.MX_NOTICE.RENLIANRONGHE, "no");
                        }
                        break;
                    case 1: //参数错误或失败
                    case -1000: //参数错误
                    case -1002: //读写CKV出错
                    case -1003: //读写REDIS出错
                    case -1004: //保存结果图片出错
                    case -1005: //下载用户图片出错
                    case -1007: //服务器内部逻辑出错
                    case -2101: //签名串鉴权失败
                    case -2102: //图片处理功能不存在
                    case -2103://图片操作功能无权限
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.renl01 });
                        break;
                    case 1000: //无人脸
                    case -1008://人脸检测失败
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.renl02 });
                        break;
                    default:
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.renl01 });
                        break;
                }
            }
        };
        SysCommand.prototype.wb_share_sj = function (data) {
            var spt = mx.AppConfig.check_not_support("share");
            if (!spt) {
                var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
                pproxy.wb_share_sj = [];
                pproxy.wb_share_sj = data.sj;
            }
        };
        SysCommand.prototype.wb_share_sj_lq = function (data) {
            var spt = mx.AppConfig.check_not_support("share");
            if (!spt) {
                var str = void 0;
                switch (data.state) {
                    case 4:
                    case 3://领取成功
                        var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
                        pproxy.wb_share_sj = [];
                        pproxy.wb_share_sj = null;
                        this.sendNotification(mx.MX_NOTICE.FRESH_WB_SHARE);
                        return;
                    case 2://分享冷却时间未到
                        str = mx.Lang.wbshare01;
                        break;
                    case 1://已领取
                        str = mx.Lang.p0014;
                        break;
                    case 0://参数错误
                        str = mx.Lang.err01;
                        break;
                    default:
                        str = mx.Lang.p0007;
                        break;
                }
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        SysCommand.prototype.check_ts_msg = function (data) {
            if (mx.AppConfig.MXTag == "wb") {
                var qua = "V1_IPH_QZ_7.3.5_1_APP_A";
                if (window && window["mx_qua"]) {
                    qua = window["mx_qua"];
                }
                var cd = {
                    "friend_id": data.uid,
                    "msgtype": data.mtype || 3,
                    "content": data.str,
                    "qua": qua,
                    "t": mx.MX_NETS.SC_WB_MSG
                };
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
            }
        };
        SysCommand.prototype.share_week = function (data) {
            var str;
            switch (data.state) {
                case 1://成功,分享成功后直接调用
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    gproxy.tishi_data.w_share = false;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.WeekShareView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    return;
                case 0://本周已领取
                    str = mx.Lang.fx003;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        SysCommand.prototype.get_ybxnl_reward = function (data) {
            var str;
            var proxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            switch (data.state) {
                case 0:
                    proxy.total_dang_id = Number(data.data.dangwei_id) + 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 1://没有小奴路
                    str = mx.Lang.r0032;
                    break;
                case 2://没有充值记录
                    str = mx.Lang.r0033;
                    break;
                case 3://奖励已全部领完
                    str = mx.Lang.r0034;
                    break;
                case 4://不够
                    str = mx.Lang.r0035;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        SysCommand.prototype.check_recharge = function (data) {
            switch (mx.AppConfig.MXTag) {
                case "wb"://玩吧直接使用星星币兑换
                    var proxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    proxy.check_wb_recharge(data);
                    var zid = window["OPEN_DATA"] ? window["OPEN_DATA"].platform : 1;
                    var wbapi = mx.ApiTool.getAPINode(mx.MX_APINAME.WBPAYINFO, "recharge_id", data, "zoneid", zid);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_RECHARGE,
                        "item_id": wbapi.item_id,
                    });
                    break;
                case "wxgame":
                    var api_wxgame = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE2, "id", data);
                    var num_wxgame = api_wxgame.RMB;
                    var pay_info = {};
                    pay_info['money'] = num_wxgame;
                    window['pay'](pay_info);
                    break;
                case "h5":
                case "h5_dev":
                    var api_h5 = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE2, "id", data);
                    var num_h5 = api_h5.RMB;
                    var pay_info = {};
                    pay_info['money'] = num_h5; //num从数据表中获取
                    pay_info['openKey'] = window["paytoken"];
                    pay_info['plat'] = window['pinfo']['platform'];
                    pay_info['os'] = window['get_os']();
                    window['pay'](pay_info);
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_RECHARGE,
                        "id": data
                    });
                    break;
            }
        };
        SysCommand.prototype.check_hero_info = function (hid) {
            var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var hero = hproxy.get_hero_by_mid(hid);
            this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HeroInfoView.S_NAME,
                "param": {
                    "hero": hero || hid,
                    "type": hero ? 'haveget' : "not",
                    "xxiu": true
                },
            });
        };
        SysCommand.prototype.choose_check = function (type) {
            switch (type) {
                case "ybi":
                    var proxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var lv = proxy.user_lv;
                    if (lv >= 12) {
                        var a_d2 = {
                            "notice_ok": mx.MX_NOTICE.SHOW_BUY_TILI,
                            "sdata_ok": "ybi",
                            "param": mx.Lang.p0109
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0009 });
                    }
                    break;
            }
        };
        SysCommand.NAME = "SysCommand";
        return SysCommand;
    }(puremvc.SimpleCommand));
    mx.SysCommand = SysCommand;
    __reflect(SysCommand.prototype, "mx.SysCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=SysCommand.js.map
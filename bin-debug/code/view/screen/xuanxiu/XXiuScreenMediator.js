/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 选秀主界面Mediator
 **/
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
    var XXiuScreenMediator = (function (_super) {
        __extends(XXiuScreenMediator, _super);
        function XXiuScreenMediator(viewComponent) {
            var _this = _super.call(this, XXiuScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(XXiuScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XXiuScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.ybi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (view.ybs_b) {
                view.ybs_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        XXiuScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        XXiuScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var ntype = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    if (ntype == "xxiu") {
                        this.view.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (ntype == mx.XXiuScreen.S_NAME) {
                        this.view.fresh_view();
                    }
                default:
                    break;
            }
        };
        XXiuScreenMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
            switch (gkey) {
                case "s_xx_ppjz"://打开翩翩君子弹窗                    
                    view.ybi_b.dispatchEvent(evt);
                    break;
                case "v_xxh_qd"://获得英雄
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuHeroAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, null, mx.XXiuResAlert.S_NAME);
                    break;
                case "v_xxr_qd":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuResAlert.S_NAME);
                    break;
                case "v_xxr_qd2":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuResAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
                case "s_xx_flmn":
                    view.ybao_b.dispatchEvent(evt);
                    break;
            }
        };
        XXiuScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.ybi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (view.ybs_b) {
                view.ybs_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            view.fresh_view();
            if (mx.MX_COMMON.IN_GUIDE) {
                var xproxy = (this.facade.retrieveProxy(mx.XXiuProxy.NAME));
                var record = xproxy.xxrecord;
                if (record && Number(record.coin)) {
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_xx", "touch": "v_xxr_qd", "gid": mx.MX_COMMON.IN_GUIDE == 2 ? 39 : 0
                    });
                }
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    view.g_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
            var aproxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            var server_time = now_time - gProxy.client_day_time + gProxy.server_day_time; //服务端当前时间戳
            if (aproxy.gsws_flag) {
                var p_d = { "name": mx.XXiuAlert.S_NAME, "param": {
                        "type": "gsws",
                        "one": 400,
                        "ten": 4000,
                        "param": { "t": mx.MX_NETS.CS_XXIU_GSWS },
                    } };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                aproxy.gsws_flag = false;
            }
            if (aproxy.flcj_flag) {
                var p_d = {
                    "name": mx.ActyBaiHuaXXiuAlert.S_NAME, "param": {
                        "type": "flcj",
                        "one": 288,
                        "ten": 2590,
                        "param": { "t": mx.MX_NETS.CS_XXIU_TYPE },
                    }
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                aproxy.flcj_flag = false;
            }
        };
        XXiuScreenMediator.prototype.mx_test = function (event) {
            this.view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        XXiuScreenMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var zg = new mx.GeneralEffect("djmrgx");
            view.ef_g.addChild(zg);
            zg.x = evt.stageX;
            zg.y = evt.stageY - 106;
            var p_d;
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (evt.currentTarget) {
                case view.ybi_b://银币购买
                    p_d = { "name": mx.XXiuAlert.S_NAME, "param": {
                            "type": "ppjz",
                            "one": 10000,
                            "ten": 90000,
                            "param": { "t": mx.MX_NETS.CS_XXIU_TYPE },
                        } };
                    break;
                case view.ybao_b://元宝购买
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var aproxy = this.facade.retrieveProxy(mx.ActyProxy.NAME);
                    var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
                    var server_time = now_time - gproxy.client_day_time + gproxy.server_day_time; //服务端当前时间戳
                    if (!mx.MX_COMMON.IN_GUIDE && aproxy.acty_time[18] && server_time < aproxy.acty_time[18].end) {
                        //ActyBaiHuaXXiuAlert
                        p_d = { "name": mx.XXiuAlert.S_NAME, "param": {
                                "type": "flcj",
                                "one": 288,
                                "ten": 2590,
                                "param": { "t": mx.MX_NETS.CS_XXIU_TYPE },
                            } };
                    }
                    else {
                        p_d = { "name": mx.XXiuAlert.S_NAME, "param": {
                                "type": "flcj",
                                "one": 288,
                                "ten": 2590,
                                "param": { "t": mx.MX_NETS.CS_XXIU_TYPE },
                            } };
                    }
                    break;
                case view.ybs_b://大量元宝购买
                    if (gProxy.user_vip < 11) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xx000 });
                        return;
                    }
                    else {
                        p_d = { "name": mx.XXiuAlert.S_NAME, "param": {
                                "type": "gsws",
                                "one": 400,
                                "ten": 4000,
                                "param": { "t": mx.MX_NETS.CS_XXIU_GSWS },
                            } };
                    }
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        XXiuScreenMediator.NAME = "XXiuScreenMediator";
        return XXiuScreenMediator;
    }(puremvc.Mediator));
    mx.XXiuScreenMediator = XXiuScreenMediator;
    __reflect(XXiuScreenMediator.prototype, "mx.XXiuScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuScreenMediator.js.map
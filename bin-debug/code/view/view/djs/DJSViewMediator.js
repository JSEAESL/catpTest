/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var DJSViewMediator = (function (_super) {
        __extends(DJSViewMediator, _super);
        function DJSViewMediator(viewComponent) {
            var _this = _super.call(this, DJSViewMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(DJSViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        DJSViewMediator.prototype.onRemove = function () {
            var view = this.view;
            view.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qbuy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        DJSViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_DJS,
            ];
        };
        DJSViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_DJS:
                    this.add_msg(data);
                    this.fresh_view();
                    break;
                default:
                    break;
            }
        };
        DJSViewMediator.prototype.add_msg = function (log) {
            var view = this.view;
            view.msg_g.visible = true;
            if (!this.c_t_flow) {
                this.c_t_flow = [];
            }
            var _loop_1 = function (i, ln) {
                var c_log = log[i];
                if (!c_log) {
                    return "break";
                }
                var c_s = mx.Tools.setStrColor(mx.Lang.d0000, [this_1.huafei_yuanbao, Math.floor(c_log.seliver)], [0x72ad1c, 0xf564b7]);
                var c_r = Math.floor(c_log.rate);
                if (c_r > 1) {
                    c_s.push({
                        "text": " " + mx.Lang.d0002 + "x" + c_r,
                        "style": {
                            "textColor": 0xe90570,
                            "stroke": 2,
                            "strokeColor": 0xfff600,
                        }
                    });
                }
                c_s.push({ "text": "\n" });
                this_1.c_t_flow = this_1.c_t_flow.concat(c_s);
                view.msg_t.textFlow = this_1.c_t_flow;
                var yy = Math.max(view.msg_t.height - 180, 0);
                view.msg_scroll.viewport.scrollV = yy;
                view.xian_p.visible = true;
                view.di_p.height = 636;
                var str = "" + Math.floor(c_log.seliver);
                var idTimeout = egret.setTimeout(function (arg) {
                    egret.clearTimeout(idTimeout);
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "type": "djs",
                        "text": str,
                    });
                }, this_1, 400 * i, "egret");
                if (c_r > 1) {
                    var idTimeout2_1 = egret.setTimeout(function (arg) {
                        egret.clearTimeout(idTimeout2_1);
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                            "type": "djs",
                            "text": c_r,
                            "bg": "bji_png",
                            "font": "red23_31_fnt",
                        });
                    }, this_1, 200 + 400 * i, "egret");
                }
            };
            var this_1 = this;
            for (var i = 0, ln = log.length; i < ln; i++) {
                var state_1 = _loop_1(i, ln);
                if (state_1 === "break")
                    break;
            }
        };
        DJSViewMediator.prototype.fresh_view = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var cd = dproxy.djs_d;
            var proxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            view.csn_t.text = cd.res + "/" + cd.total; //剩余购买次数
            this.goumai_yinbi = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', proxy.user_lv).MidasMoney;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GOLDHAND, 'id', Number(cd.buy) + 1) || { "Price": 800, "Yield1": 2.7237 };
            this.goumai_yinbi = Math.floor(Number(this.goumai_yinbi) * Number(api.Yield1));
            view.gmn_t.text = "" + this.goumai_yinbi; //购买银币数目
            this.huafei_yuanbao = api.Price;
            view.ybn_t.text = "" + this.huafei_yuanbao; //花费元宝数目
        };
        DJSViewMediator.prototype.init_view = function () {
            var view = this.view;
            view.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qbuy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_view();
        };
        DJSViewMediator.prototype.check_buy = function (ismore) {
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var cd = dproxy.djs_d;
            if (!Number(cd.res)) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0012 });
                return;
            }
            var buy_id = Math.min(mx.MX_COMMON.MAX_DJS_BUY, Number(cd.buy) + 1);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GOLDHAND, 'id', buy_id);
            var t = Number(api.Price);
            var cishu = 1;
            if (ismore) {
                var temp = mx.ApiTool.getAPINodes(mx.MX_APINAME.GOLDHAND, 'Price', this.huafei_yuanbao);
                var max_id = temp[temp.length - 1].id;
                cishu = Number(max_id) - Number(cd.buy);
                t = t * cishu;
            }
            var have = (dproxy.get_currency("ybao") || 0);
            if (t > have) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                    "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                    "sdata_exit": mx.AlertView.S_NAME,
                    "param": mx.Lang.a0006
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return;
            }
            if (ismore) {
                var a_d = {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": { "t": mx.MX_NETS.CS_BUY_DJS, "num": 256 },
                    "param": {
                        "n": cishu,
                        "jyb": this.huafei_yuanbao,
                        "yb": this.goumai_yinbi,
                    }
                };
                var p_d = { "name": mx.QBuyYbiView.S_NAME, "param": a_d };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_BUY_DJS });
            }
        };
        DJSViewMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.buy_b://购买
                    this.check_buy(false);
                    break;
                case view.qbuy_b://连续购买
                    this.check_buy(true);
                    break;
                case view.bg_rect:
                case view.close_b:
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.DJSView.S_NAME);
                    break;
            }
        };
        DJSViewMediator.NAME = "DJSViewMediator";
        return DJSViewMediator;
    }(puremvc.Mediator));
    mx.DJSViewMediator = DJSViewMediator;
    __reflect(DJSViewMediator.prototype, "mx.DJSViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DJSViewMediator.js.map
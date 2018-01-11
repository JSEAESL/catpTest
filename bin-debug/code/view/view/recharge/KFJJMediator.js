/**
 *   @author mx
 *   @date 2017.10.18
 *   @desc 开服基金mediator
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
    var KFJJMediator = (function (_super) {
        __extends(KFJJMediator, _super);
        function KFJJMediator(viewComponent) {
            var _this = _super.call(this, KFJJMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(KFJJMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        KFJJMediator.prototype.onRemove = function () {
            var view = this.view;
            egret.Tween.removeTweens(view.buy_b);
            view.reward_list.dataProvider = null;
            view.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
        };
        KFJJMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        KFJJMediator.prototype.handleNotification = function (notification) {
            //let data : any = notification.getBody();
            var name = notification.getName();
            var type = notification.getType();
            //let view = this.view;
            switch (name) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    if (type == mx.KFJJView.S_NAME) {
                        this.fresh_view();
                    }
                    break;
            }
        };
        KFJJMediator.prototype.init_view = function (data) {
            var view = this.view;
            view.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.reward_list.itemRenderer = mx.KFJJRender;
            this.fresh_view();
        };
        KFJJMediator.prototype.fresh_view = function () {
            var view = this.view;
            var arr = [298, 398, 498, 598, 698, 798, 998];
            var lv_arr = [15, 20, 30, 45, 60, 70, 80];
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var arr2 = [];
            var state = 0; //未领取
            view.buy_b.set_ssres("lqflhui_png");
            view.stateflag = 1; //按钮状态
            egret.Tween.removeTweens(view.buy_b);
            view.buycontent_g.visible = false;
            if (gproxy.user_jijin == -1) {
                view.buycontent_g.visible = true;
                view.buy_b.set_ssres("jjljgmai_png");
                view.buy_b.touchEnabled = true;
                view.stateflag = 3;
            }
            for (var k in arr) {
                if (gproxy.user_jijin > Number(k)) {
                    state = 1; //已领取
                }
                else if (gproxy.user_jijin == Number(k) && lv_arr[k] <= gproxy.user_lv) {
                    view.buy_b.set_ssres("lqfli_png");
                    state = 2; //可领取
                    mx.TweenTool.getInstance().get_tween(view.buy_b, "wqj", true);
                    view.stateflag = 2;
                }
                if (lv_arr[k] > gproxy.user_lv) {
                    state = 3; //等级不足
                }
                if (gproxy.user_jijin == -1) {
                    state = 4; //未买
                }
                arr2.push({
                    "id": Number(k),
                    "bg": "ybao_png",
                    "str": arr[k],
                    "state": state,
                    "need_arr": lv_arr[k]
                });
            }
            view.reward_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        KFJJMediator.prototype.buy_jijin = function () {
            var view = this.view;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            var ybao = dproxy.get_currency("ybao");
            if (gproxy.user_vip < 3) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                    "param": mx.Lang.hd025
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else if (ybao < 998) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                    "param": mx.Lang.a0006
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else if (gproxy.user_jijin >= 0) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd017 });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_BUG_JIJIN
                });
            }
        };
        KFJJMediator.prototype.tap_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.buy_b:
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var id = void 0;
                    var arr = [298, 398, 498, 598, 698, 798, 998];
                    for (var k in arr) {
                        if (gproxy.user_jijin == Number(k)) {
                            id = Number(k);
                        }
                    }
                    if (view.stateflag == 3) {
                        this.buy_jijin();
                    }
                    else if (view.stateflag == 2) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LQ_JIJIN,
                            "key_id": id + 1
                        });
                    }
                    else if (view.stateflag == 1) {
                        this.facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0077 });
                    }
                    break;
                default:
                    break;
            }
        };
        KFJJMediator.NAME = "KFJJMediator";
        return KFJJMediator;
    }(puremvc.Mediator));
    mx.KFJJMediator = KFJJMediator;
    __reflect(KFJJMediator.prototype, "mx.KFJJMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=KFJJMediator.js.map
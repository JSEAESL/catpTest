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
/**
 * @cy/2017.3.15
 *  无图片的购买弹窗
 */
var mx;
(function (mx) {
    var BuyAlertView2 = (function (_super) {
        __extends(BuyAlertView2, _super);
        function BuyAlertView2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuyAlertView2.mx_support = function () {
            return ["assets.buy_alert2"];
        };
        BuyAlertView2.prototype.init_view_by_type = function () {
            this.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.edit_et.addEventListener(egret.Event.CHANGE, this.check_str, this);
            this.edit_et.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.edit_et.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.cost_t.text = mx.Lang.a0005;
            var cd = this.adata.param; //{"item",购买物品id,"res_n":剩余购买次数,"max_n":购买上限}
            switch (cd.item) {
                case "jjc_point":
                    this.name_t.text = mx.Lang.jjc14;
                    this.num_t.text = mx.Lang.jjc15;
                    this.left_b.visible = this.right_b.visible = false;
                    break;
                default:
                    break;
            }
            this.c_n = 5;
            this.res_n = typeof cd.res_n != "undefined" ? cd.res_n : mx.MX_COMMON.BUY_N_MAX;
            this.fresh_price();
        };
        BuyAlertView2.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.edit_et.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            this.edit_et.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.edit_et.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
        };
        BuyAlertView2.prototype.fresh_price = function () {
            var c_n = Math.min(this.c_n, mx.MX_COMMON.BUY_N_MAX);
            this.gmn_t.text = "" + c_n;
            this.total_price = 0;
            var cd = this.adata.param;
            var facade = mx.ApplicationFacade.getInstance();
            switch (cd.item) {
                case "jjc_point":
                    var jProxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
                    var cishu = Math.min(Number(jProxy.has_buy + 1), 18);
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JJCCOST, 'id', cishu);
                    this.total_price = api.cost;
                    api = null;
                    break;
                default:
                    this.total_price = this.c_price * c_n;
                    break;
            }
            this.ybn_t.text = "" + this.total_price;
        };
        BuyAlertView2.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.right_b:
                    if (!this.adata.param.max_n || this.c_n < this.res_n) {
                        this.c_n++;
                        this.fresh_price();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0017 });
                    }
                    break;
                case view.left_b:
                    if (--this.c_n) {
                        this.fresh_price();
                    }
                    else {
                        this.c_n++;
                    }
                    break;
                case view.ok_b://確定
                    var c_d = this.adata;
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    var have = dproxy.get_currency("ybao");
                    if (this.total_price > have) {
                        var a_d2 = {
                            "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                            "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                            "sdata_exit": mx.QBuyYbiView.S_NAME,
                            "param": mx.Lang.a0006
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        break;
                    }
                    else {
                        var csd = c_d.sdata_ok;
                        csd.num = this.c_n;
                        facade.sendNotification(c_d.notice_ok, csd);
                    }
                case view.bg_rect:
                case view.exit_b:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, BuyAlertView2.S_NAME);
                    break;
            }
        };
        BuyAlertView2.prototype.check_str = function (e) {
            var str = this.edit_et.text;
            this.edit_et.text = mx.Tools.check_num_str(str);
            this.ok_b.touchEnabled = false;
        };
        BuyAlertView2.prototype.init_str = function (e) {
            this.gmn_t.text = "";
        };
        BuyAlertView2.prototype.check_end = function (e) {
            var pattern = /[0-9]+/g;
            var str = this.edit_et.text;
            this.edit_et.text = "";
            if (str == "" || !pattern.test(str)) {
                str = 1;
            }
            else if (this.res_n > 0 && Number(str) > this.res_n) {
                str = 1;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.p0017
                });
            }
            this.c_n = Number(str);
            this.ok_b.touchEnabled = true;
            this.fresh_price();
        };
        BuyAlertView2.S_NAME = "BuyAlertView2";
        return BuyAlertView2;
    }(mx.AlertView));
    mx.BuyAlertView2 = BuyAlertView2;
    __reflect(BuyAlertView2.prototype, "mx.BuyAlertView2");
})(mx || (mx = {}));
//# sourceMappingURL=BuyAlertView2.js.map
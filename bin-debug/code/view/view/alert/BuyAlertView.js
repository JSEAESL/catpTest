/**
 *   @author mx
 *   @date 2015.1.3
 *   @desc 购买通用彈窗
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
    var BuyAlertView = (function (_super) {
        __extends(BuyAlertView, _super);
        function BuyAlertView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuyAlertView.mx_support = function () {
            return ["assets.buy_alert"];
        };
        BuyAlertView.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.BuyAlertViewMediator(this));
            this.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            this.edit_et.addEventListener(egret.Event.CHANGE, this.check_str, this);
            this.edit_et.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.edit_et.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.c_n = 1;
            var cd = this.adata.param; //{"item",购买物品id,"res_n":剩余购买次数,"max_n":购买上限}
            this.res_n = typeof cd.res_n != "undefined" ? cd.res_n : mx.MX_COMMON.BUY_N_MAX;
            if (cd.item == "tili") {
                this.tili_g.visible = true;
                this.name_t.text = "120" + mx.Lang.tili;
                this.gmtt_p.source = "gmtltt_png";
                this.item.source = "tl_png";
                this.c_price = cd.price;
            }
            else {
                this.tili_g.visible = true;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item);
                this.name_t.text = api.name;
                this.gmtt_p.source = "gmtt_png";
                this.item.source = mx.Tools.get_item_res(4, cd.item);
                this.c_price = cd.item == 2013 ? cd.price : Number(api.Buyprice2);
                this.adata.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                if (!this.adata.sdata_ok) {
                    this.adata.sdata_ok = { "t": mx.MX_NETS.CS_BUY_ITEM, "num": 0, "item_id": cd.item };
                }
            }
            if (cd.max_n && cd.item != 2013) {
                this.sycs_t.textFlow = [
                    { "text": mx.Lang.a0003 },
                    { "text": this.res_n + "/" + cd.max_n, "style": { "textColor": 0xE05C5C } }
                ];
            }
            else {
                this.sycs_t.text = mx.Tools.format(mx.Lang.a0008, this.name_t.text);
            }
            this.fresh_price();
        };
        BuyAlertView.prototype.fresh_cishu = function (data) {
            this.res_n = data.res;
            this.sycs_t.textFlow = [
                { "text": mx.Lang.a0003 },
                { "text": this.res_n + "/" + data.total, "style": { "textColor": 0xE05C5C } }
            ];
            if (this.adata.param.item == "tili") {
                var papi = mx.ApiTool.getAPINode(mx.MX_APINAME.TILIPRICE, "id", data.buy + 1);
                if (papi) {
                    this.c_price = papi.jiage;
                    this.fresh_price();
                }
            }
        };
        BuyAlertView.prototype.fresh_price = function () {
            var c_n = Math.min(this.c_n, mx.MX_COMMON.BUY_N_MAX);
            this.gmn_t.text = "" + c_n;
            this.ybn_t.text = "" + this.c_price * c_n;
        };
        BuyAlertView.prototype.showTips = function (e) {
            var cd = this.adata.param;
            var point = this.content_g.localToGlobal(this.item.x, this.item.y);
            var p_d;
            if (cd.item != "tili") {
                p_d = {
                    "x": point.x,
                    "y": point.y,
                    "w": this.item.width,
                    "h": this.item.height,
                    "id": cd.item,
                    "type": "4",
                };
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
            }
        };
        BuyAlertView.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var c_d = this.adata;
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
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    var have = dproxy.get_currency("ybao");
                    if (this.c_price * this.c_n > have) {
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
                        var cd = this.adata.param;
                        if (cd.item == 'tili') {
                            break;
                        }
                    }
                case view.bg_rect:
                case view.exit_b:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, BuyAlertView.S_NAME);
                    if (c_d.param.notice_exit) {
                        facade.sendNotification(c_d.param.notice_exit, c_d.param.sdata_exit);
                    }
                    break;
            }
        };
        BuyAlertView.prototype.check_str = function (e) {
            var str = this.edit_et.text;
            this.edit_et.text = mx.Tools.check_num_str(str);
            this.ok_b.touchEnabled = false;
        };
        BuyAlertView.prototype.init_str = function (e) {
            this.gmn_t.text = "";
        };
        BuyAlertView.prototype.check_end = function (e) {
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
        BuyAlertView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.item.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showTips, this);
            this.edit_et.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            this.edit_et.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.edit_et.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.BuyAlertViewMediator.NAME);
        };
        BuyAlertView.S_NAME = "BuyAlertView";
        return BuyAlertView;
    }(mx.AlertView));
    mx.BuyAlertView = BuyAlertView;
    __reflect(BuyAlertView.prototype, "mx.BuyAlertView");
})(mx || (mx = {}));
//# sourceMappingURL=BuyAlertView.js.map
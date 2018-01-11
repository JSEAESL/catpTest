/**
 *   @author qianjun
 *   @date 2017.1.9
 *   @desc 黑市入口
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
    var HeiShiScreen = (function (_super) {
        __extends(HeiShiScreen, _super);
        function HeiShiScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiScreen.mx_support = function () {
            return ["assets.market_main", "data.4201"];
        };
        HeiShiScreen.prototype.init_view = function () {
            var view = this;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeiShiScreenMediator(view));
            view.r_name_t.text = mx.Lang.hs0002;
            view.con_t.text = mx.Lang.hs0001;
            view.fresh_hsb();
            view.fresh_ybao();
            view.dh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sellrk_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.buyrk_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hsb_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckjqing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        HeiShiScreen.prototype.fresh_ybao = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var cur_ybao = dproxy.get_currency("ybao");
            view.ybao_t.text = mx.Tools.num2str(cur_ybao);
        };
        HeiShiScreen.prototype.fresh_hsb = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            view.hsb_t.text = hproxy.cur_hsb + "";
        };
        HeiShiScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            switch (e.currentTarget) {
                case view.dh_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                case view.sellrk_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_SELL_ZN,
                    });
                    //facade.sendNotification(MX_NOTICE.SCENE_CHANGE,HeiShiSellScreen.S_NAME);
                    break;
                case view.buyrk_b:
                    hproxy.init_buy_data = true;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_GET_HEISHIBI
                    });
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_BUY_DATA,
                        'page_id': 1
                    });
                    break;
                case view.ckjqing_b:
                    //播放avg剧情
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "heishi",
                        }
                    });
                    break;
                case view.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    break;
                case view.ybao_add:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case view.hsb_add:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
            }
        };
        HeiShiScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.dh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sellrk_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.buyrk_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hsb_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckjqing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.removeMediator(mx.HeiShiScreenMediator.NAME);
        };
        HeiShiScreen.S_NAME = "HeiShiScreen";
        return HeiShiScreen;
    }(mx.AlertView));
    mx.HeiShiScreen = HeiShiScreen;
    __reflect(HeiShiScreen.prototype, "mx.HeiShiScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiScreen.js.map
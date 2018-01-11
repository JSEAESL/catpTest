/**
 *   @author cy
 *   @date 2017.9.23
 *   @desc 特供render
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
    var ActybaihuaShopRender = (function (_super) {
        __extends(ActybaihuaShopRender, _super);
        function ActybaihuaShopRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActybaihuaShopRender.prototype.init_render = function () {
            this.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ActybaihuaShopRender.prototype.btn_click = function (e) {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            if (d.mulity) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": {
                        "param": {
                            "item": d.id,
                            "price": d.price
                        },
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_TEGONG_BUY,
                            "id": d.index,
                            "act_id": aproxy.acty_shop_id,
                            "order": this.itemIndex,
                        }
                    }
                });
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_TEGONG_BUY,
                "id": d.index,
                "act_id": aproxy.acty_shop_id,
                "order": this.itemIndex,
            });
        };
        ActybaihuaShopRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ActybaihuaShopRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.price_t.text = "" + d.price;
            this.item.data = {
                "chicun": 60,
                "itembg": "",
                "type": 4,
                "id": d.id,
                "str": d.num,
            };
            this.csyw_p.visible = d.csyw;
        };
        return ActybaihuaShopRender;
    }(mx.BasicRender));
    mx.ActybaihuaShopRender = ActybaihuaShopRender;
    __reflect(ActybaihuaShopRender.prototype, "mx.ActybaihuaShopRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActybaihuaShopRender.js.map
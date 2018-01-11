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
 * @author cy
 * @date 2017.9.23
 * 特供商店主页
 */
var mx;
(function (mx) {
    var ActybaihuaShopAlert = (function (_super) {
        __extends(ActybaihuaShopAlert, _super);
        function ActybaihuaShopAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActybaihuaShopAlert.mx_support = function () {
            return ["assets.acty_shop", "api.ACTYSHOP"];
        };
        ActybaihuaShopAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.award_list.itemRenderer = mx.ActybaihuaShopRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActybaihuaShopAlertMediator(this));
            this.fresh_view();
        };
        ActybaihuaShopAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var arr = [];
            var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTYSHOP, "shop_type", aproxy.acty_shop_id);
            view.num_t.text = "" + apis[0].goumai_limit;
            for (var k in apis) {
                var api = apis[k];
                var glimit = Number(api.goumai_limit);
                arr.push({
                    "num": api.num,
                    "id": api.item_id,
                    "index": api.id,
                    "price": api.price,
                    "csyw": glimit != -1 && glimit <= Number(aproxy.acty_goumai[k]),
                    "sycs": glimit == -1 ? mx.MX_COMMON.BUY_N_MAX : glimit - Number(aproxy.acty_goumai[k]),
                    "mulity": aproxy.acty_shop_id == 20,
                });
            }
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
            if (aproxy.acty_shop_id == 20) {
                view.num_t.visible = false;
                view.di_p.source = "tgdban_png";
            }
        };
        ActybaihuaShopAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.award_list.dataProvider = null;
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.ActybaihuaShopAlertMediator.NAME);
        };
        ActybaihuaShopAlert.S_NAME = "ActybaihuaShopAlert";
        return ActybaihuaShopAlert;
    }(mx.AlertView));
    mx.ActybaihuaShopAlert = ActybaihuaShopAlert;
    __reflect(ActybaihuaShopAlert.prototype, "mx.ActybaihuaShopAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActybaihuaShopAlert.js.map
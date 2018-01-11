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
 * @cy/2016.11.23
 *  商城alert
 */
var mx;
(function (mx) {
    var ShopAlert = (function (_super) {
        __extends(ShopAlert, _super);
        function ShopAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShopAlert.mx_support = function () {
            return ["assets.recharge", "assets.shop", "api.SHOP", "api.SHOP_REFRESH", "api.JJCSHOP", "api.JJCREFRESH", "api.GHSHOP", "api.GHREFRESH", "api.CHARGELIBAO", "data.2403"];
        };
        ShopAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ShopAlertMediator(this));
        };
        ShopAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ShopAlertMediator.NAME);
        };
        ShopAlert.S_NAME = "ShopAlert";
        return ShopAlert;
    }(mx.AlertView));
    mx.ShopAlert = ShopAlert;
    __reflect(ShopAlert.prototype, "mx.ShopAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShopAlert.js.map
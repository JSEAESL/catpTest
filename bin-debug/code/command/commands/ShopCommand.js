/**
 * cy
 * 商城相关
 * 2016/11/23.
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
    var ShopCommand = (function (_super) {
        __extends(ShopCommand, _super);
        function ShopCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShopCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_SHOP_INFO, ShopCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHOP_FRESH, ShopCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHOP_BUY, ShopCommand);
        };
        ShopCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var sProxy = (this.facade.retrieveProxy(mx.ShopProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_SHOP_INFO:
                    sProxy.init_shop_info(data);
                    break;
                case mx.MX_NETS.SC_SHOP_FRESH:
                    sProxy.fresh_cb(data);
                    break;
                case mx.MX_NETS.SC_SHOP_BUY:
                    sProxy.buy_cb(data);
                    break;
                default:
                    break;
            }
        };
        ShopCommand.NAME = "ShopCommand";
        return ShopCommand;
    }(puremvc.SimpleCommand));
    mx.ShopCommand = ShopCommand;
    __reflect(ShopCommand.prototype, "mx.ShopCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShopCommand.js.map
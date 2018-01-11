/**
 * mx
 * 背包网络请求
 * 2015/1/27.
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
    var PackCommand = (function (_super) {
        __extends(PackCommand, _super);
        function PackCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PackCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_TYPE_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_SELL_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_EQUIP_HECHENG, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_USE_TILI_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_USE_EXP_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PACK_LIBAO_USE, PackCommand);
        };
        PackCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_PACK_TYPE_ITEM:
                    pProxy.init_pack_item(data);
                    break;
                case mx.MX_NETS.SC_PACK_SELL_ITEM:
                    pProxy.sell_item_cb(data);
                    break;
                case mx.MX_NETS.SC_PACK_EQUIP_HECHENG:
                    pProxy.hecheng_eqiup(data);
                    break;
                case mx.MX_NETS.SC_PACK_USE_TILI_ITEM:
                    pProxy.use_tili_cb(data);
                    break;
                case mx.MX_NETS.SC_PACK_USE_EXP_ITEM:
                    pProxy.use_exp_cb(data);
                    break;
                case mx.MX_NETS.SC_BUY_ITEM:
                    pProxy.buy_item_cb(data);
                    break;
                case mx.MX_NETS.SC_PACK_LIBAO_USE:
                    pProxy.use_libao_cb(data);
                    break;
                default:
                    break;
            }
        };
        PackCommand.NAME = "PackCommand";
        return PackCommand;
    }(puremvc.SimpleCommand));
    mx.PackCommand = PackCommand;
    __reflect(PackCommand.prototype, "mx.PackCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PackCommand.js.map
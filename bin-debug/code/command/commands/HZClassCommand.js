/**
 * wxw
 * 皇子教室网络请求
 * 2017/10/25.
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
    var HZClassCommand = (function (_super) {
        __extends(HZClassCommand, _super);
        function HZClassCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HZClassCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_HZC_DATA, HZClassCommand);
        };
        HZClassCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var Proxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_HZC_DATA:
                    Proxy.init_hzc_item(data);
                    break;
                default:
                    break;
            }
        };
        HZClassCommand.NAME = "HZClassCommand";
        return HZClassCommand;
    }(puremvc.SimpleCommand));
    mx.HZClassCommand = HZClassCommand;
    __reflect(HZClassCommand.prototype, "mx.HZClassCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HZClassCommand.js.map
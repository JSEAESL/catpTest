/**
 * mx
 * 选秀相关
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
    var XXiuCommand = (function (_super) {
        __extends(XXiuCommand, _super);
        function XXiuCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_XXIU_INFO, XXiuCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXIU_TYPE, XXiuCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXIU_GSWS, XXiuCommand);
        };
        XXiuCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var xProxy = (this.facade.retrieveProxy(mx.XXiuProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_XXIU_INFO:
                    xProxy.init_xxiu_info(data);
                    break;
                case mx.MX_NETS.SC_XXIU_TYPE:
                    xProxy.xxiu_type_cb(data);
                    break;
                case mx.MX_NETS.SC_XXIU_GSWS:
                    xProxy.xxiu_gsws_cb(data);
                    break;
                default:
                    break;
            }
        };
        XXiuCommand.NAME = "XXiuCommand";
        return XXiuCommand;
    }(puremvc.SimpleCommand));
    mx.XXiuCommand = XXiuCommand;
    __reflect(XXiuCommand.prototype, "mx.XXiuCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuCommand.js.map
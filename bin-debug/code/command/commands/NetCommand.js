/**
 * mx
 * 网络请求
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
    var NetCommand = (function (_super) {
        __extends(NetCommand, _super);
        function NetCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NetCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NOTICE.CS_GET_DATA, NetCommand);
        };
        NetCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.CS_GET_DATA:
                    var l_d = {
                        "type": "net",
                        "param": data
                    };
                    var mx_loader = mx.NetLoader.GET_MX_LOADER();
                    mx_loader.reset_loader(l_d);
                    break;
            }
        };
        NetCommand.NAME = "NetCommand";
        return NetCommand;
    }(puremvc.SimpleCommand));
    mx.NetCommand = NetCommand;
    __reflect(NetCommand.prototype, "mx.NetCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=NetCommand.js.map
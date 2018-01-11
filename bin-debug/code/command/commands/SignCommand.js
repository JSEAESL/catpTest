/**
 * mx
 * 签到相关
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
    var SignCommand = (function (_super) {
        __extends(SignCommand, _super);
        function SignCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SignCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_SIGN_INFO, SignCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SIGN, SignCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUQIAN, SignCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SIGN_BOX, SignCommand);
        };
        SignCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var sProxy = (this.facade.retrieveProxy(mx.SignProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_SIGN_INFO:
                    sProxy.init_sign_info(data);
                    break;
                case mx.MX_NETS.SC_SIGN:
                    sProxy.sign_cb(data);
                    break;
                case mx.MX_NETS.SC_BUQIAN:
                    sProxy.buqian_cb(data);
                    break;
                case mx.MX_NETS.SC_SIGN_BOX:
                    sProxy.sign_box_cb(data);
                    break;
                default:
                    break;
            }
        };
        SignCommand.NAME = "SignCommand";
        return SignCommand;
    }(puremvc.SimpleCommand));
    mx.SignCommand = SignCommand;
    __reflect(SignCommand.prototype, "mx.SignCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=SignCommand.js.map
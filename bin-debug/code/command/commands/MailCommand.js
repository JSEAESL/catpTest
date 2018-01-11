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
    var MailCommand = (function (_super) {
        __extends(MailCommand, _super);
        function MailCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_MAIL_INFO, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_READ_MAIL, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DELETE_MAIL, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_MAIL_REWARD, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CDKEY, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LINGQU_ALL, MailCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLEAR_READ, MailCommand);
        };
        MailCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var mProxy = (this.facade.retrieveProxy(mx.MailProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_MAIL_INFO:
                    mProxy.init_mail_info(data);
                    break;
                case mx.MX_NETS.SC_READ_MAIL:
                    mProxy.read_mail_cb(data);
                    break;
                case mx.MX_NETS.SC_DELETE_MAIL:
                    mProxy.del_mail_cb(data);
                    break;
                case mx.MX_NETS.SC_MAIL_REWARD:
                    mProxy.mail_reward_cb(data);
                    break;
                case mx.MX_NETS.SC_CDKEY:
                    mProxy.cdkey_cb(data);
                    break;
                case mx.MX_NETS.SC_LINGQU_ALL:
                    mProxy.lingqu_all(data);
                    break;
                case mx.MX_NETS.SC_CLEAR_READ:
                    mProxy.clear_read(data);
                    break;
                default:
                    break;
            }
        };
        MailCommand.NAME = "MailCommand";
        return MailCommand;
    }(puremvc.SimpleCommand));
    mx.MailCommand = MailCommand;
    __reflect(MailCommand.prototype, "mx.MailCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=MailCommand.js.map
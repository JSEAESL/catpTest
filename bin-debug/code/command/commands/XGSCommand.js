/**
 * hxj
 * 相国寺网络请求
 * 2017/7/5.
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
    var XGSCommand = (function (_super) {
        __extends(XGSCommand, _super);
        function XGSCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_FEIZI, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_ZHUIFENG, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_CIFENG, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_ZINV, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_YQZF, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_ZSTT, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_OLD_NAME, XGSCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XGS_RENAME, XGSCommand);
        };
        XGSCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var xproxy = (this.facade.retrieveProxy(mx.XGSProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_XGS_FEIZI:
                    //0，妃子
                    xproxy.set_page(data, 0);
                    break;
                case mx.MX_NETS.SC_XGS_ZHUIFENG:
                    xproxy.zfwf_cb(data);
                    break;
                case mx.MX_NETS.SC_XGS_CIFENG:
                    xproxy.cfsh_cb(data);
                    break;
                case mx.MX_NETS.SC_XGS_ZINV:
                    //1，未婚；2，离宫
                    xproxy.set_page(data, 2 - Number(data.type));
                    break;
                case mx.MX_NETS.SC_XGS_YQZF:
                    xproxy.yqzf_cb(data);
                    break;
                case mx.MX_NETS.SC_XGS_ZSTT:
                    xproxy.zstt_cb(data);
                    break;
                case mx.MX_NETS.SC_OLD_NAME:
                    xproxy.init_oldName(data);
                    break;
                case mx.MX_NETS.SC_XGS_RENAME:
                    xproxy.rename_cb(data);
                    break;
            }
        };
        XGSCommand.NAME = "XGSCommand";
        return XGSCommand;
    }(puremvc.SimpleCommand));
    mx.XGSCommand = XGSCommand;
    __reflect(XGSCommand.prototype, "mx.XGSCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XGSCommand.js.map
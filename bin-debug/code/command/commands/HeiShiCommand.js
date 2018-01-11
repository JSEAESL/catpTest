/**
 * qianjun
 * 黑市 command
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
    var HeiShiCommand = (function (_super) {
        __extends(HeiShiCommand, _super);
        function HeiShiCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_GET_HEISHIBI, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HSB_DH, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_SELL_ZN, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_SELL_ZN, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_GET_ZN, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_SHANGJIA_ZN, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_XYEND, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_BUY_DATA, HeiShiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HS_BUY_ZN, HeiShiCommand);
        };
        HeiShiCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var hProxy = (this.facade.retrieveProxy(mx.HeiShiProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_GET_HEISHIBI:
                    hProxy.get_heishibi(data);
                    break;
                case mx.MX_NETS.SC_HSB_DH:
                    hProxy.dh_hsb_cb(data);
                    break;
                case mx.MX_NETS.SC_HS_SELL_ZN:
                    hProxy.hs_sell_zn(data);
                    break;
                case mx.MX_NETS.SC_HS_GET_ZN:
                    hProxy.hs_weihun_zn(data);
                    break;
                case mx.MX_NETS.SC_HS_SHANGJIA_ZN:
                    hProxy.hs_gua_zn(data);
                    break;
                case mx.MX_NETS.SC_HS_XYEND:
                    hProxy.hs_xy_end(data);
                    break;
                case mx.MX_NETS.SC_HS_BUY_DATA:
                    hProxy.hs_buy_data(data);
                    break;
                case mx.MX_NETS.SC_HS_BUY_ZN:
                    hProxy.hs_buy_zn(data);
                    break;
                default:
                    break;
            }
        };
        HeiShiCommand.NAME = "HeiShiCommand";
        return HeiShiCommand;
    }(puremvc.SimpleCommand));
    mx.HeiShiCommand = HeiShiCommand;
    __reflect(HeiShiCommand.prototype, "mx.HeiShiCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiCommand.js.map
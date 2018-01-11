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
    var XqinCommand = (function (_super) {
        __extends(XqinCommand, _super);
        function XqinCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XqinCommand.prototype.register = function () {
            //this.facade.registerCommand(MX_NETS.SC_PACK_TYPE_ITEM, PackCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_FZ_XQ, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_XQ_FZDATA, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_XQ_FRESH_CD, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_XQ_ZINV_GUIXING_ALL, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_FZ_LQ_GIFT, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XQ_ADD_MC, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_XQ_HUIGONG_ALL, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XQ_CD_COSTALL, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_XQ_CJZN, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_ZN_XQ, XqinCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XQ_CD_CLEARALL, XqinCommand);
        };
        XqinCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XqinProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_YXD_FZ_XQ:
                    pProxy.xingqin_gift(data);
                    break;
                case mx.MX_NETS.SC_YXD_XQ_FZDATA:
                    pProxy.fz_xq_data(data);
                    break;
                case mx.MX_NETS.SC_YXD_XQ_FRESH_CD:
                    pProxy.xingqin_fresh_cd(data);
                    break;
                case mx.MX_NETS.SC_YXD_XQ_ZINV_GUIXING_ALL:
                    pProxy.xingqin_zinv_guixing_all(data);
                    break;
                case mx.MX_NETS.SC_YXD_FZ_LQ_GIFT:
                    pProxy.xingqin_fz_lq_gift(data);
                    break;
                case mx.MX_NETS.SC_XQ_ADD_MC:
                    pProxy.xingqin_xq_add_mc(data);
                    break;
                case mx.MX_NETS.SC_YXD_XQ_HUIGONG_ALL:
                    pProxy.xingqin_xq_huigong_all(data);
                    break;
                case mx.MX_NETS.SC_YXD_XQ_CJZN:
                    pProxy.xq_cjzn_info(data);
                    break;
                case mx.MX_NETS.SC_YXD_ZN_XQ:
                    pProxy.zn_xq_data(data);
                    break;
                case mx.MX_NETS.SC_XQ_CD_COSTALL:
                    pProxy.xq_cost_add(data);
                    break;
                case mx.MX_NETS.SC_XQ_CD_CLEARALL:
                    pProxy.xq_clear_cd_all(data);
                    break;
                default:
                    break;
            }
        };
        XqinCommand.NAME = "XqinCommand";
        return XqinCommand;
    }(puremvc.SimpleCommand));
    mx.XqinCommand = XqinCommand;
    __reflect(XqinCommand.prototype, "mx.XqinCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XqinCommand.js.map
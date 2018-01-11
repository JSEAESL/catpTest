/**
 * mx
 * 养心殿相关
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
    var CxgCommand = (function (_super) {
        __extends(CxgCommand, _super);
        function CxgCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CxgCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_CXG_DATA, CxgCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_FEIZI, CxgCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_LIANYIN_JUJUE, CxgCommand);
            this.facade.registerCommand(mx.MX_NOTICE.CXG_JN_SLT, CxgCommand);
        };
        CxgCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var cProxy = (this.facade.retrieveProxy(mx.CXGongProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_CXG_DATA:
                    cProxy.init_cxgong(data);
                    break;
                case mx.MX_NETS.SC_BUY_FEIZI:
                    cProxy.buy_feizi_cb(data);
                    break;
                case mx.MX_NOTICE.CXG_JN_SLT://储秀宫筛选技能
                    cProxy.cxg_jn_slt = data;
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_CXG_DATA,
                        'type': 1,
                        'page': 1,
                        'paixu': cProxy.cxg_paixu || null,
                        "skill": data || 0 //子女技能
                    });
                    break;
                case mx.MX_NETS.SC_HZS_LIANYIN_JUJUE:
                    cProxy.lianyin_jujue(data);
                    break;
                default:
                    break;
            }
        };
        CxgCommand.NAME = "CxgCommand";
        return CxgCommand;
    }(puremvc.SimpleCommand));
    mx.CxgCommand = CxgCommand;
    __reflect(CxgCommand.prototype, "mx.CxgCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=CxgCommand.js.map
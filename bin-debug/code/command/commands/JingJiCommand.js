/**
 * cy
 * 商城相关
 * 2016/11/23.
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
    var JingJiCommand = (function (_super) {
        __extends(JingJiCommand, _super);
        function JingJiCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JingJiCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_CLEARCD, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_SETTEAM, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_CISHU, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_FRESH, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_FIGHT, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_LINGQU, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_FIGHT_CHECK, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_LOG, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_DETAIL, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_SHOP, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_SHOPFRESH, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_DUIHUAN, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_PAIHANG, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_XIANGQING, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JJC_PAIHANG_QQ, JingJiCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WB_JJC_SHARE, JingJiCommand);
        };
        JingJiCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var jProxy = (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_JJC_CLEARCD:
                    jProxy.clear_cd(data);
                    break;
                case mx.MX_NETS.SC_JJC_SETTEAM:
                    jProxy.set_team(data);
                    break;
                case mx.MX_NETS.SC_JJC_CISHU:
                    jProxy.buy_cishu_cb(data);
                    break;
                case mx.MX_NETS.SC_JJC_FRESH:
                    jProxy.fresh_enemy_cb(data);
                    break;
                case mx.MX_NETS.SC_JJC_FIGHT:
                    jProxy.init_jjc_fight(data);
                    break;
                case mx.MX_NETS.SC_JJC_LINGQU:
                    jProxy.lq_jjc_cb(data);
                    break;
                case mx.MX_NETS.SC_JJC_FIGHT_CHECK:
                    jProxy.check_jjc_fight(data);
                    break;
                case mx.MX_NETS.SC_JJC_LOG:
                    jProxy.init_jjc_log(data);
                    break;
                case mx.MX_NETS.SC_JJC_DETAIL:
                    jProxy.init_jjc_detail(data);
                    break;
                case mx.MX_NETS.SC_JJC_SHOP:
                    jProxy.init_jjc_shop(data);
                    break;
                case mx.MX_NETS.SC_JJC_SHOPFRESH:
                    jProxy.fresh_jjc_shop(data);
                    break;
                case mx.MX_NETS.SC_JJC_DUIHUAN:
                    jProxy.duihuan_jjc_shop(data);
                    break;
                case mx.MX_NETS.SC_JJC_PAIHANG:
                    jProxy.init_jjc_paihang(data);
                    break;
                case mx.MX_NETS.SC_JJC_XIANGQING:
                    jProxy.xq_jjc_cb(data);
                    break;
                case mx.MX_NETS.SC_JJC_PAIHANG_QQ:
                    jProxy.jjc_qq_paiming(data);
                    break;
                case mx.MX_NETS.SC_WB_JJC_SHARE:
                    jProxy.wb_jjc_share(data);
                    break;
                default:
                    break;
            }
        };
        JingJiCommand.NAME = "JingJiCommand";
        return JingJiCommand;
    }(puremvc.SimpleCommand));
    mx.JingJiCommand = JingJiCommand;
    __reflect(JingJiCommand.prototype, "mx.JingJiCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JingJiCommand.js.map
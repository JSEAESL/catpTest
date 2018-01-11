/**
 * qianjun 副本相关
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
    var FubenCommand = (function (_super) {
        __extends(FubenCommand, _super);
        function FubenCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_CHAPTER_OPEN, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_STAGE_LIST, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_SAODANG, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_BUY_SAODANG, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_CHUZHAN, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_CHONGZHI, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_GET_ENERMY, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_GET_AWARD, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GETWAY_CISHU, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GET_TEMPLE_FIGHT, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FUBEN_GET_NEW_ENERMY, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JUQING_INFO, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JUQING_STAR_LQ, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JUQING_SSHOU_LQ, FubenCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JUQING_YLI_LQ, FubenCommand);
            this.facade.registerCommand(mx.MX_NOTICE.FUBEN_SAODANG, FubenCommand);
        };
        FubenCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var fProxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_FUBEN_CHAPTER_OPEN:
                    fProxy.init_chapter_info(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_STAGE_LIST:
                    fProxy.init_stage_info(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_SAODANG:
                    fProxy.init_saodang_info(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_BUY_SAODANG:
                    fProxy.init_buy_saodang(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_CHUZHAN:
                    fProxy.init_fuben_chuzhan(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_CHONGZHI:
                    fProxy.init_fuben_chongzhi(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_GET_ENERMY:
                case mx.MX_NETS.SC_FUBEN_GET_NEW_ENERMY:
                    fProxy.init_enermy_info(data);
                    break;
                case mx.MX_NETS.SC_FUBEN_GET_AWARD:
                    fProxy.init_award_info(data);
                    break;
                case mx.MX_NETS.SC_GETWAY_CISHU:
                    fProxy.get_way_cishu(data);
                    break;
                case mx.MX_NETS.SC_GET_TEMPLE_FIGHT:
                    fProxy.init_temple_fight(data);
                    break;
                case mx.MX_NOTICE.FUBEN_SAODANG://副本扫荡
                    fProxy.fuben_saodang(data);
                    break;
                case mx.MX_NETS.SC_JUQING_INFO:
                    fProxy.init_juqing_info(data);
                    break;
                case mx.MX_NETS.SC_JUQING_STAR_LQ:
                    fProxy.lq_juqing_star(data);
                    break;
                case mx.MX_NETS.SC_JUQING_SSHOU_LQ:
                    fProxy.lq_juqing_sshou(data);
                    break;
                case mx.MX_NETS.SC_JUQING_YLI_LQ:
                    fProxy.lq_yli(data);
                    break;
                default:
                    break;
            }
        };
        FubenCommand.NAME = "FubenCommand";
        return FubenCommand;
    }(puremvc.SimpleCommand));
    mx.FubenCommand = FubenCommand;
    __reflect(FubenCommand.prototype, "mx.FubenCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FubenCommand.js.map
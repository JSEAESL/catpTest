/**
 * wf
 * 女王外交相关网络请求
 * 2017/1/5.
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
    var WaiJiaoCommand = (function (_super) {
        __extends(WaiJiaoCommand, _super);
        function WaiJiaoCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WaiJiaoCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_HGONG, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TIAOXI, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHECK_TIAOXI_FIGHT, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NOTICE.START_TIAOXI_FIGHT, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JIAOFANGSI_DATA, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFSTYPE, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFSPC, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFS_FIGHT, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFS_CHECK_FIGHT, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFS_SS, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JFS_EK, WaiJiaoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DR_JFS, WaiJiaoCommand);
        };
        WaiJiaoCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var wproxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_FRIEND_HGONG:
                    wproxy.enter_friend_hgong(data);
                    break;
                case mx.MX_NETS.SC_TIAOXI:
                    wproxy.tiaoxi_cb(data);
                    break;
                case mx.MX_NETS.SC_CHECK_TIAOXI_FIGHT:
                    wproxy.check_tx_fight_cb(data);
                    break;
                case mx.MX_NOTICE.START_TIAOXI_FIGHT:
                    wproxy.start_fight(data);
                    break;
                case mx.MX_NETS.SC_JIAOFANGSI_DATA:
                    wproxy.init_jfs_cb(data);
                    break;
                case mx.MX_NETS.SC_JFSTYPE:
                    wproxy.jfs_type_cb(data);
                    break;
                case mx.MX_NETS.SC_JFSPC:
                    wproxy.jfs_pc_cb(data);
                    break;
                case mx.MX_NETS.SC_JFS_FIGHT:
                    wproxy.jfs_fight_cb(data);
                    break;
                case mx.MX_NETS.SC_JFS_CHECK_FIGHT:
                    wproxy.jfs_fight_check(data);
                    break;
                case mx.MX_NETS.SC_JFS_SS:
                    wproxy.jfs_ss_cb(data);
                    break;
                case mx.MX_NETS.SC_JFS_EK:
                    wproxy.jfs_ek_cb(data);
                    break;
                case mx.MX_NETS.SC_DR_JFS:
                    wproxy.jfs_dr_cb(data);
                    break;
            }
        };
        WaiJiaoCommand.NAME = "WaiJiaoCommand";
        return WaiJiaoCommand;
    }(puremvc.SimpleCommand));
    mx.WaiJiaoCommand = WaiJiaoCommand;
    __reflect(WaiJiaoCommand.prototype, "mx.WaiJiaoCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WaiJiaoCommand.js.map
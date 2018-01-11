/**
 * wf
 * 皇子所网络请求
 * 2016/10/11.
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
    var HzsuoCommand = (function (_super) {
        __extends(HzsuoCommand, _super);
        function HzsuoCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzsuoCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_DATA, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_NAME, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_CEFENG, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_SPEED, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_LIANYIN, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_LIANYIN_NWF, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_LIANYIN_STOP, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_KUOJIAN, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SET_PINLI, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SET_HZ_DATA, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TUJIAN_MAIN, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TUJIAN_DETAIL, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TUJIAN_ZAN, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TUJIAN_PINL, HzsuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TUJIAN_PZAN, HzsuoCommand);
        };
        HzsuoCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var proxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_HZS_DATA:
                    proxy.init_hzs_data(data);
                    break;
                case mx.MX_NETS.SC_HZS_NAME:
                    proxy.hz_cm_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_CEFENG:
                    proxy.cefeng_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_SPEED:
                    proxy.speed_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_LIANYIN:
                    proxy.lianyin_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_LIANYIN_NWF:
                    proxy.lianyin_nwf_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_LIANYIN_STOP:
                    proxy.lianyin_stop_cb(data);
                    break;
                case mx.MX_NETS.SC_HZS_KUOJIAN:
                    proxy.kuojian_cb(data);
                    break;
                case mx.MX_NOTICE.SET_PINLI:
                    proxy.curr_gift = data;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_PINLI);
                    break;
                case mx.MX_NOTICE.SET_HZ_DATA:
                    proxy.set_hz_data(data);
                    break;
                case mx.MX_NETS.SC_TUJIAN_MAIN:
                    proxy.init_tujian(data);
                    break;
                case mx.MX_NETS.SC_TUJIAN_DETAIL:
                    proxy.init_lihui(data);
                    break;
                case mx.MX_NETS.SC_TUJIAN_ZAN:
                    proxy.tujian_zan_cb(data);
                    break;
                case mx.MX_NETS.SC_TUJIAN_PINL:
                    proxy.tujian_pinlun_cb(data);
                    break;
                case mx.MX_NETS.SC_TUJIAN_PZAN:
                    proxy.pinlun_zan_cb(data);
                    break;
            }
        };
        HzsuoCommand.NAME = "HzsuoCommand";
        return HzsuoCommand;
    }(puremvc.SimpleCommand));
    mx.HzsuoCommand = HzsuoCommand;
    __reflect(HzsuoCommand.prototype, "mx.HzsuoCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HzsuoCommand.js.map
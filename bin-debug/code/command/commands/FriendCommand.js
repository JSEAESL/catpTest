/**
 * wf
 * 好友网络请求
 * 2016/11/29.
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
    var FriendCommand = (function (_super) {
        __extends(FriendCommand, _super);
        function FriendCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_DATA, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_SQ_DATA, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_VISIT, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_GIFT, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_SQING, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_SEARCH, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_REMOVE, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRIEND_ACCEPT, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TX_FRIEND_TUIJIAN, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TX_FRIEND_DATA, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FREIEND_SHOULI, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FREIEND_YJBAIF, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FREIEND_YJSL, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHECK_YJSL, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_TWINFO, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_TWSL, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_TWZS, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_TWSQ, FriendCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_TWYJ, FriendCommand);
        };
        FriendCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_FRIEND_DATA:
                    fproxy.init_friend_data(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_SQ_DATA:
                    fproxy.init_friend_sq_data(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_VISIT:
                    fproxy.friend_visit_cb(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_GIFT:
                    fproxy.friend_gift_cb(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_SQING:
                case mx.MX_NETS.SC_FRIEND_SEARCH:
                    fproxy.friend_sq_cb(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_REMOVE:
                    fproxy.friend_remove_cb(data);
                    break;
                case mx.MX_NETS.SC_FRIEND_ACCEPT:
                    fproxy.friend_accept_cb(data);
                    break;
                case mx.MX_NETS.SC_TX_FRIEND_TUIJIAN:
                    fproxy.init_tx_tj_data(data);
                    break;
                case mx.MX_NETS.SC_TX_FRIEND_DATA:
                    fproxy.init_tx_friend_data(data);
                    break;
                case mx.MX_NETS.SC_FREIEND_SHOULI:
                    fproxy.shouli_cb(data);
                    break;
                case mx.MX_NETS.SC_FREIEND_YJBAIF:
                    fproxy.yjbaifang_cb(data);
                    break;
                case mx.MX_NETS.SC_FREIEND_YJSL:
                    fproxy.yjshouli_cb(data);
                    break;
                case mx.MX_NETS.SC_CHECK_YJSL:
                    fproxy.check_yjsl_cb(data);
                    break;
                case mx.MX_NETS.SC_SDK_TWINFO:
                    fproxy.init_twinfo(data);
                    break;
                case mx.MX_NETS.SC_SDK_TWSL:
                    fproxy.twshouli_cb(data);
                    break;
                case mx.MX_NETS.SC_SDK_TWZS:
                    fproxy.twzengsong_cb(data);
                    break;
                case mx.MX_NETS.SC_SDK_TWSQ:
                    fproxy.twsuoqu_cb(data);
                    break;
                case mx.MX_NETS.SC_SDK_TWYJ:
                    fproxy.twyjlq_cb(data);
                    break;
            }
        };
        FriendCommand.NAME = "FriendCommand";
        return FriendCommand;
    }(puremvc.SimpleCommand));
    mx.FriendCommand = FriendCommand;
    __reflect(FriendCommand.prototype, "mx.FriendCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FriendCommand.js.map
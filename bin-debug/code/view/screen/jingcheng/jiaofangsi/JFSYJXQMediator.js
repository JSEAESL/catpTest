/**
 @author cy
 *   @date 2017.1.13
 *   @desc 教坊司首页mediator
 **/
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
    var JFSYJXQMediator = (function (_super) {
        __extends(JFSYJXQMediator, _super);
        function JFSYJXQMediator(viewComponent) {
            var _this = _super.call(this, JFSYJXQMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JFSYJXQMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JFSYJXQMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JFSYJXQMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.JFS_SSCG
            ];
        };
        JFSYJXQMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.JFS_SSCG:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jfs40 });
                    var proxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    var msg = void 0;
                    switch (proxy.jfs_tab) {
                        case 0:
                            msg = {
                                "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                            };
                            break;
                        case 1:
                        case 2:
                            msg = {
                                "t": mx.MX_NETS.CS_JFSTYPE,
                                "type": proxy.jfs_tab == 1 ? 0 : 1
                            };
                            break;
                    }
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, msg);
                    break;
            }
        };
        JFSYJXQMediator.prototype.init_view = function () {
        };
        JFSYJXQMediator.NAME = "JFSYJXQMediator";
        return JFSYJXQMediator;
    }(puremvc.Mediator));
    mx.JFSYJXQMediator = JFSYJXQMediator;
    __reflect(JFSYJXQMediator.prototype, "mx.JFSYJXQMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JFSYJXQMediator.js.map
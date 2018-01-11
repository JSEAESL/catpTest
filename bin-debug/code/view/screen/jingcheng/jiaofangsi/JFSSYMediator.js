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
    var JFSSYMediator = (function (_super) {
        __extends(JFSSYMediator, _super);
        function JFSSYMediator(viewComponent) {
            var _this = _super.call(this, JFSSYMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JFSSYMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JFSSYMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JFSSYMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.JFS_SSCG
            ];
        };
        JFSSYMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2011) {
                        view.set_ftp();
                    }
                    break;
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
        JFSSYMediator.prototype.init_view = function () {
        };
        JFSSYMediator.NAME = "JFSSYMediator";
        return JFSSYMediator;
    }(puremvc.Mediator));
    mx.JFSSYMediator = JFSSYMediator;
    __reflect(JFSSYMediator.prototype, "mx.JFSSYMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JFSSYMediator.js.map
/**
 *   @author wf
 *   @date 2016.11.11
 *   @desc 储秀宫主界面mediator
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
    var CXGongScreenMediator = (function (_super) {
        __extends(CXGongScreenMediator, _super);
        function CXGongScreenMediator(viewComponent) {
            var _this = _super.call(this, CXGongScreenMediator.NAME, viewComponent) || this;
            if (mx.MX_COMMON.IN_GUIDE) {
                _this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            return _this;
        }
        Object.defineProperty(CXGongScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        CXGongScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        CXGongScreenMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    var type = notification.getType();
                    if (type == mx.CXGongScreen.S_NAME) {
                        this.view.show_list();
                    }
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(notification.getBody());
                    break;
            }
        };
        CXGongScreenMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_zxd_fh"://储秀宫随意操作
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
                case "s_zxd_sy":
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "s_zxd_zd":
                    this.view.tab_list.selectedIndex = 1;
                    this.view.do_tab_click(1);
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
            }
        };
        CXGongScreenMediator.NAME = "CXGongScreenMediator";
        return CXGongScreenMediator;
    }(puremvc.Mediator));
    mx.CXGongScreenMediator = CXGongScreenMediator;
    __reflect(CXGongScreenMediator.prototype, "mx.CXGongScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=CXGongScreenMediator.js.map
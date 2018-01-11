/**
 @author hxj
 *   @date 2017.7.4
 *   @desc 相国寺（水月庵）子女谥号
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
    var XGSAllChildMediator = (function (_super) {
        __extends(XGSAllChildMediator, _super);
        function XGSAllChildMediator(viewComponent) {
            return _super.call(this, XGSAllChildMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(XGSAllChildMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XGSAllChildMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_FZ_LIST,
            ];
        };
        XGSAllChildMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    view.fresh_screen();
                    break;
            }
        };
        XGSAllChildMediator.NAME = "XGSAllChildMediator";
        return XGSAllChildMediator;
    }(puremvc.Mediator));
    mx.XGSAllChildMediator = XGSAllChildMediator;
    __reflect(XGSAllChildMediator.prototype, "mx.XGSAllChildMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XGSAllChildMediator.js.map
/**
 @author hxj
 *   @date 2017.7.4
 *   @desc 相国寺（水月庵）妃嫔谥号
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
    var XGSAllQueenMediator = (function (_super) {
        __extends(XGSAllQueenMediator, _super);
        function XGSAllQueenMediator(viewComponent) {
            return _super.call(this, XGSAllQueenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(XGSAllQueenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XGSAllQueenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_FZ_LIST,
            ];
        };
        XGSAllQueenMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    view.fresh_screen();
                    break;
            }
        };
        XGSAllQueenMediator.NAME = "XGSAllQueenMediator";
        return XGSAllQueenMediator;
    }(puremvc.Mediator));
    mx.XGSAllQueenMediator = XGSAllQueenMediator;
    __reflect(XGSAllQueenMediator.prototype, "mx.XGSAllQueenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XGSAllQueenMediator.js.map
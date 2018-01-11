/**
 *   @author cy
 *   @date 2017.9.28
 *   @desc 开始界面Mediator
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
    var StartScreenMediator = (function (_super) {
        __extends(StartScreenMediator, _super);
        function StartScreenMediator(viewComponent) {
            return _super.call(this, StartScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(StartScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        StartScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.SELECT_SERD,
                mx.MX_NOTICE.CLOSE_NOTICE
            ];
        };
        StartScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.SELECT_SERD:
                    this.view.selec_serd(data);
                    break;
                case mx.MX_NOTICE.CLOSE_NOTICE:
                    this.view.check_yaoqing();
                    break;
                default:
                    break;
            }
        };
        StartScreenMediator.NAME = "StartScreenMediator";
        return StartScreenMediator;
    }(puremvc.Mediator));
    mx.StartScreenMediator = StartScreenMediator;
    __reflect(StartScreenMediator.prototype, "mx.StartScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=StartScreenMediator.js.map
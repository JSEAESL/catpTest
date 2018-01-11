/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 引导界面Mediator
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
    var GuideMediator = (function (_super) {
        __extends(GuideMediator, _super);
        function GuideMediator(viewComponent) {
            return _super.call(this, GuideMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(GuideMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GuideMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_POS_CB
            ];
        };
        GuideMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_POS_CB:
                    this.view.reset_pos(data);
                    break;
                default:
                    break;
            }
        };
        GuideMediator.NAME = "GuideMediator";
        return GuideMediator;
    }(puremvc.Mediator));
    mx.GuideMediator = GuideMediator;
    __reflect(GuideMediator.prototype, "mx.GuideMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GuideMediator.js.map
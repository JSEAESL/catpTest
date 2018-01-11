/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 副本挑战弹窗
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
    var SaoDangMediator = (function (_super) {
        __extends(SaoDangMediator, _super);
        function SaoDangMediator(viewComponent) {
            return _super.call(this, SaoDangMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(SaoDangMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        SaoDangMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        SaoDangMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = notification.getType();
                    if (type == mx.SaoDangPop.S_NAME) {
                        var data = notification.getBody();
                        this.view.fresh_cview(data);
                    }
                    break;
                default:
                    break;
            }
        };
        SaoDangMediator.NAME = "SaoDangMediator";
        return SaoDangMediator;
    }(puremvc.Mediator));
    mx.SaoDangMediator = SaoDangMediator;
    __reflect(SaoDangMediator.prototype, "mx.SaoDangMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=SaoDangMediator.js.map
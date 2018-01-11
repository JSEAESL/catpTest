/**
 @author cy
 *   @date 2016.11.3
 *   @desc 养心殿-一览
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
    var YXDCiZiMediator = (function (_super) {
        __extends(YXDCiZiMediator, _super);
        function YXDCiZiMediator(viewComponent) {
            return _super.call(this, YXDCiZiMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(YXDCiZiMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YXDCiZiMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED
            ];
        };
        YXDCiZiMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2005) {
                        this.view.fresh_cpop();
                    }
                    break;
            }
        };
        YXDCiZiMediator.NAME = "YXDCiZiMediator";
        return YXDCiZiMediator;
    }(puremvc.Mediator));
    mx.YXDCiZiMediator = YXDCiZiMediator;
    __reflect(YXDCiZiMediator.prototype, "mx.YXDCiZiMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDCiZiMediator.js.map
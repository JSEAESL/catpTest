/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var HeroZBMediator = (function (_super) {
        __extends(HeroZBMediator, _super);
        function HeroZBMediator(viewComponent) {
            return _super.call(this, HeroZBMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeroZBMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroZBMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.FRESH_CHERO,
            ];
        };
        HeroZBMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    view.fresh_pop();
                    break;
                case mx.MX_NOTICE.FRESH_CHERO:
                    var data = notification.getBody();
                    if (data.type == "zb") {
                        if (mx.MX_COMMON.IN_GUIDE) {
                            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroZBAlert.S_NAME);
                        }
                        else {
                            view.fresh_pop();
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        HeroZBMediator.NAME = "HeroZBMediator";
        return HeroZBMediator;
    }(puremvc.Mediator));
    mx.HeroZBMediator = HeroZBMediator;
    __reflect(HeroZBMediator.prototype, "mx.HeroZBMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroZBMediator.js.map
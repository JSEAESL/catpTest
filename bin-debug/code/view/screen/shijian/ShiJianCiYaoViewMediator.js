/**
 @author qianjun
 *   @date 2016.10.9
 *   @desc
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
    var ShiJianCiYaoViewMediator = (function (_super) {
        __extends(ShiJianCiYaoViewMediator, _super);
        function ShiJianCiYaoViewMediator(viewComponent) {
            return _super.call(this, ShiJianCiYaoViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ShiJianCiYaoViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ShiJianCiYaoViewMediator.prototype.onRemove = function () {
            var view = this.view;
        };
        ShiJianCiYaoViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.SJ_SBING_UPDATE
            ];
        };
        ShiJianCiYaoViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.SJ_SBING_UPDATE:
                    this.view.fresh_pop();
                    break;
                default:
                    break;
            }
        };
        Object.defineProperty(ShiJianCiYaoViewMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ShiJianCiYaoViewMediator.NAME = "ShiJianCiYaoViewMediator";
        return ShiJianCiYaoViewMediator;
    }(puremvc.Mediator));
    mx.ShiJianCiYaoViewMediator = ShiJianCiYaoViewMediator;
    __reflect(ShiJianCiYaoViewMediator.prototype, "mx.ShiJianCiYaoViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianCiYaoViewMediator.js.map
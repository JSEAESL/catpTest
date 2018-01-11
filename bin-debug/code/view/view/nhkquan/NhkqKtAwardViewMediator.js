/**
 *   @author qianjun
 *   @date 2017.3.13
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
    var NhkqKtAwardViewMediator = (function (_super) {
        __extends(NhkqKtAwardViewMediator, _super);
        function NhkqKtAwardViewMediator(viewComponent) {
            return _super.call(this, NhkqKtAwardViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(NhkqKtAwardViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        NhkqKtAwardViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.NHKQ_CZ_SUC
            ];
        };
        NhkqKtAwardViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.NHKQ_CZ_SUC:
                    view.fresh_view();
                    break;
            }
        };
        NhkqKtAwardViewMediator.NAME = "NhkqKtAwardViewMediator";
        return NhkqKtAwardViewMediator;
    }(puremvc.Mediator));
    mx.NhkqKtAwardViewMediator = NhkqKtAwardViewMediator;
    __reflect(NhkqKtAwardViewMediator.prototype, "mx.NhkqKtAwardViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=NhkqKtAwardViewMediator.js.map
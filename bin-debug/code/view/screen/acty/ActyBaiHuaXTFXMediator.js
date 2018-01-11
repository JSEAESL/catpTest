/**
 *   @author cy
 *   @date 2017.9.21
 *   @desc mediator
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
    var ActyBaiHuaXTFXMediator = (function (_super) {
        __extends(ActyBaiHuaXTFXMediator, _super);
        function ActyBaiHuaXTFXMediator(viewComponent) {
            return _super.call(this, ActyBaiHuaXTFXMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyBaiHuaXTFXMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyBaiHuaXTFXMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.BAIHUA_XTFX,
            ];
        };
        ActyBaiHuaXTFXMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view(data);
                    break;
                case mx.MX_NOTICE.BAIHUA_XTFX:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyBaiHuaMainAlert.S_NAME });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ActyBaiHuaXTFX.S_NAME);
                    break;
            }
        };
        ActyBaiHuaXTFXMediator.NAME = "ActyBaiHuaXTFXMediator";
        return ActyBaiHuaXTFXMediator;
    }(puremvc.Mediator));
    mx.ActyBaiHuaXTFXMediator = ActyBaiHuaXTFXMediator;
    __reflect(ActyBaiHuaXTFXMediator.prototype, "mx.ActyBaiHuaXTFXMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaXTFXMediator.js.map
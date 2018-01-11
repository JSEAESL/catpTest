/**
 *   @author cy
 *   @date 2017.10.17
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
    var ActyXXGXXiuScreenMediator = (function (_super) {
        __extends(ActyXXGXXiuScreenMediator, _super);
        function ActyXXGXXiuScreenMediator(viewComponent) {
            return _super.call(this, ActyXXGXXiuScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyXXGXXiuScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyXXGXXiuScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.HEISHI_SELECT_ZN
            ];
        };
        ActyXXGXXiuScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
                case mx.MX_NOTICE.HEISHI_SELECT_ZN:
                    var aproxy = this.facade.retrieveProxy(mx.ActyProxy.NAME);
                    aproxy.xxg_zi_tempdata = data;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_XXG_XXIU,
                        "type": 1,
                        "zinv_id": data.id
                    });
                    break;
            }
        };
        ActyXXGXXiuScreenMediator.NAME = "ActyXXGXXiuScreenMediator";
        return ActyXXGXXiuScreenMediator;
    }(puremvc.Mediator));
    mx.ActyXXGXXiuScreenMediator = ActyXXGXXiuScreenMediator;
    __reflect(ActyXXGXXiuScreenMediator.prototype, "mx.ActyXXGXXiuScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyXXGXXiuScreenMediator.js.map
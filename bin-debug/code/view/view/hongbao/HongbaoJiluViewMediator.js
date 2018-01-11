/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var HongbaoJiluViewMediator = (function (_super) {
        __extends(HongbaoJiluViewMediator, _super);
        function HongbaoJiluViewMediator(viewComponent) {
            return _super.call(this, HongbaoJiluViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HongbaoJiluViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HongbaoJiluViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.SHOW_HB_DETAIL,
                mx.MX_NOTICE.HONGBAO_FRESH
            ];
        };
        HongbaoJiluViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.show_list();
                    break;
                case mx.MX_NOTICE.SHOW_HB_DETAIL:
                    view.show_hb();
                    break;
                case mx.MX_NOTICE.HONGBAO_FRESH:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HONGBAO_SENDINFO });
                    break;
            }
        };
        HongbaoJiluViewMediator.NAME = "HongbaoJiluViewMediator";
        return HongbaoJiluViewMediator;
    }(puremvc.Mediator));
    mx.HongbaoJiluViewMediator = HongbaoJiluViewMediator;
    __reflect(HongbaoJiluViewMediator.prototype, "mx.HongbaoJiluViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HongbaoJiluViewMediator.js.map
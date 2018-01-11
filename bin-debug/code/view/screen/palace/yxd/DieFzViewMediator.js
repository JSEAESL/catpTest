/**
 *   @author qianuun
 *   @date 2017.8.23
 *   @desc  Mediator
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
    var DieFzViewMediator = (function (_super) {
        __extends(DieFzViewMediator, _super);
        function DieFzViewMediator(viewComponent) {
            return _super.call(this, DieFzViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(DieFzViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DieFzViewMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        DieFzViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        DieFzViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    //已去世妃子
                    view.fresh_view();
                    break;
            }
        };
        DieFzViewMediator.NAME = "DieFzViewMediator";
        return DieFzViewMediator;
    }(puremvc.Mediator));
    mx.DieFzViewMediator = DieFzViewMediator;
    __reflect(DieFzViewMediator.prototype, "mx.DieFzViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DieFzViewMediator.js.map
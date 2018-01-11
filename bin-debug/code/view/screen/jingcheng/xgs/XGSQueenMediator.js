/**
 @author hxj
 *   @date 2017.7.6
 *   @desc 相国寺 过世妃嫔
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
    var XGSQueenMediator = (function (_super) {
        __extends(XGSQueenMediator, _super);
        function XGSQueenMediator(viewComponent) {
            return _super.call(this, XGSQueenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(XGSQueenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XGSQueenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSQueenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        XGSQueenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    view.fresh_shihao();
                    view.fresh_jianjie();
                    break;
            }
        };
        XGSQueenMediator.NAME = "XGSQueenMediator";
        return XGSQueenMediator;
    }(puremvc.Mediator));
    mx.XGSQueenMediator = XGSQueenMediator;
    __reflect(XGSQueenMediator.prototype, "mx.XGSQueenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XGSQueenMediator.js.map
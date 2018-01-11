/**
 *   @author wf
 *   @date 2017.10.28
 *   @desc 翰林院主页mediator
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
    var HLYScreenMediator = (function (_super) {
        __extends(HLYScreenMediator, _super);
        function HLYScreenMediator(viewComponent) {
            return _super.call(this, HLYScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HLYScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HLYScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        HLYScreenMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.view.fresh_list();
                    break;
            }
        };
        HLYScreenMediator.NAME = "HLYScreenMediator";
        return HLYScreenMediator;
    }(puremvc.Mediator));
    mx.HLYScreenMediator = HLYScreenMediator;
    __reflect(HLYScreenMediator.prototype, "mx.HLYScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HLYScreenMediator.js.map
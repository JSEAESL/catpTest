/**
 *   @author wf
 *   @date 2017.1.5
 *   @desc 调戏主界面mediator
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
    var TiaoXiMediator = (function (_super) {
        __extends(TiaoXiMediator, _super);
        function TiaoXiMediator(viewComponent) {
            return _super.call(this, TiaoXiMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(TiaoXiMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TiaoXiMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_FRIEND
            ];
        };
        TiaoXiMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_FRIEND:
                    this.view.update_list();
                    break;
            }
        };
        TiaoXiMediator.NAME = "TiaoXiMediator";
        return TiaoXiMediator;
    }(puremvc.Mediator));
    mx.TiaoXiMediator = TiaoXiMediator;
    __reflect(TiaoXiMediator.prototype, "mx.TiaoXiMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TiaoXiMediator.js.map
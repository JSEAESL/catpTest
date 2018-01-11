/**
 *   @author cy
 *   @date 2017.7.4
 *   @desc 服装详情 Mediator
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
    var ClothDetailViewMediator = (function (_super) {
        __extends(ClothDetailViewMediator, _super);
        function ClothDetailViewMediator(viewComponent) {
            return _super.call(this, ClothDetailViewMediator.NAME, viewComponent) || this;
        }
        ClothDetailViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.OPEN_TASK,
            ];
        };
        ClothDetailViewMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.OPEN_TASK:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskView.S_NAME,
                        "param": { "type": "main" },
                    });
                    break;
            }
        };
        ClothDetailViewMediator.NAME = "ClothDetailViewMediator";
        return ClothDetailViewMediator;
    }(puremvc.Mediator));
    mx.ClothDetailViewMediator = ClothDetailViewMediator;
    __reflect(ClothDetailViewMediator.prototype, "mx.ClothDetailViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ClothDetailViewMediator.js.map
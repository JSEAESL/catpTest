/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var EquipHchMediator = (function (_super) {
        __extends(EquipHchMediator, _super);
        function EquipHchMediator(viewComponent) {
            return _super.call(this, EquipHchMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(EquipHchMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        EquipHchMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
            ];
        };
        EquipHchMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = notification.getType();
                    if (type == mx.EquipHechengAlert.S_NAME) {
                        this.view.fresh_cview("hc");
                    }
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    this.view.fresh_cview();
                    break;
                default:
                    break;
            }
        };
        EquipHchMediator.NAME = "EquipHchMediator";
        return EquipHchMediator;
    }(puremvc.Mediator));
    mx.EquipHchMediator = EquipHchMediator;
    __reflect(EquipHchMediator.prototype, "mx.EquipHchMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=EquipHchMediator.js.map
/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 副本挑战弹窗
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
    var GetWayMediator = (function (_super) {
        __extends(GetWayMediator, _super);
        function GetWayMediator(viewComponent) {
            return _super.call(this, GetWayMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(GetWayMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GetWayMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.ITEM_NUM_CHANGED
            ];
        };
        GetWayMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = notification.getType();
                    if (type == mx.GetWayView.S_NAME) {
                        this.view.fresh_list();
                    }
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    var data = notification.getBody();
                    if (data == this.view.adata.item_id) {
                        this.view.fresh_num();
                    }
                    break;
                default:
                    break;
            }
        };
        GetWayMediator.NAME = "GetWayMediator";
        return GetWayMediator;
    }(puremvc.Mediator));
    mx.GetWayMediator = GetWayMediator;
    __reflect(GetWayMediator.prototype, "mx.GetWayMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GetWayMediator.js.map
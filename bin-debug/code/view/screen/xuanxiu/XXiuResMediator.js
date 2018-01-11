/**
 *   @author mx
 *   @date 2016.12.15
 *   @desc 选秀结果
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
    var XXiuResMediator = (function (_super) {
        __extends(XXiuResMediator, _super);
        function XXiuResMediator(viewComponent) {
            var _this = _super.call(this, XXiuResMediator.NAME, viewComponent) || this;
            _this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuAlert.S_NAME);
            _this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ActyBaiHuaXXiuAlert.S_NAME);
            return _this;
        }
        Object.defineProperty(XXiuResMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XXiuResMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        XXiuResMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = notification.getType();
                    if (type == mx.XXiuResAlert.S_NAME) {
                        this.view.fresh_view();
                    }
                    break;
            }
        };
        XXiuResMediator.NAME = "XXiuResMediator";
        return XXiuResMediator;
    }(puremvc.Mediator));
    mx.XXiuResMediator = XXiuResMediator;
    __reflect(XXiuResMediator.prototype, "mx.XXiuResMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuResMediator.js.map
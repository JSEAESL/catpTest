/**
 *   @author mx
 *   @date 2016.12.15
 *   @desc 选秀主界面Mediator
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
    var XXiuAlertMediator = (function (_super) {
        __extends(XXiuAlertMediator, _super);
        function XXiuAlertMediator(viewComponent) {
            var _this = _super.call(this, XXiuAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(XXiuAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XXiuAlertMediator.prototype.onRemove = function () {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        XXiuAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        XXiuAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    var ntype = notification.getType();
                    if (ntype == "xxiu") {
                        this.view.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        XXiuAlertMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            var cd = view.adata.param;
            switch (gkey) {
                case "v_xxa_one"://选秀一次
                    cd.type = 3;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                    break;
                case "v_xxa_one2"://选秀一次
                    cd.type = 1;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                    break;
                default:
                    break;
            }
        };
        XXiuAlertMediator.prototype.init_view = function () {
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                this.view.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            }
        };
        XXiuAlertMediator.prototype.mx_test = function (event) {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        XXiuAlertMediator.NAME = "XXiuAlertMediator";
        return XXiuAlertMediator;
    }(puremvc.Mediator));
    mx.XXiuAlertMediator = XXiuAlertMediator;
    __reflect(XXiuAlertMediator.prototype, "mx.XXiuAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuAlertMediator.js.map
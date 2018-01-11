/**
 *   @author wf
 *   @date 2016.10.25
 *   @desc 结缘弹框Mediator
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
    var HzEditPopMediator = (function (_super) {
        __extends(HzEditPopMediator, _super);
        function HzEditPopMediator(viewComponent) {
            var _this = _super.call(this, HzEditPopMediator.NAME, viewComponent) || this;
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    _this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    _this.view.c_g.addEventListener(eui.UIEvent.MOVE, _this.mx_test, _this);
                }
            }
            return _this;
        }
        HzEditPopMediator.prototype.mx_test = function (event) {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        Object.defineProperty(HzEditPopMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HzEditPopMediator.prototype.onRemove = function () {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        HzEditPopMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        HzEditPopMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        HzEditPopMediator.prototype.show_guide = function (gkey) {
            var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
            var view = this.view;
            var tar;
            switch (gkey) {
                case "v_cm_sj": //随机名字
                case "v_cf_sj"://随机册封
                    tar = view.rand_b;
                    tar.dispatchEvent(evt);
                    break;
                case "v_cm_qr": //确定
                case "v_cf_qr"://册封确定
                    tar = view.ok_b;
                    tar.dispatchEvent(evt);
                    break;
            }
        };
        HzEditPopMediator.NAME = "HzEditPopMediator";
        return HzEditPopMediator;
    }(puremvc.Mediator));
    mx.HzEditPopMediator = HzEditPopMediator;
    __reflect(HzEditPopMediator.prototype, "mx.HzEditPopMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HzEditPopMediator.js.map
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
/**
 * @author qianjun
 * @date 2017.11.8
 *
 */
var mx;
(function (mx) {
    var JqsmingAlert = (function (_super) {
        __extends(JqsmingAlert, _super);
        function JqsmingAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JqsmingAlert.mx_support = function () {
            return ["assets.jq_sming"];
        };
        JqsmingAlert.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        Object.defineProperty(JqsmingAlert.prototype, "proxy", {
            get: function () {
                return mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        JqsmingAlert.prototype.init_view = function () {
            var view = this;
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        JqsmingAlert.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, JqsmingAlert.S_NAME);
        };
        JqsmingAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        JqsmingAlert.S_NAME = "JqsmingAlert";
        return JqsmingAlert;
    }(mx.BasicView));
    mx.JqsmingAlert = JqsmingAlert;
    __reflect(JqsmingAlert.prototype, "mx.JqsmingAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JqsmingAlert.js.map
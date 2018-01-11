/**
*   @author cy
*   @date 2017.8.22
*   @desc 人脸融合
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
    var RenLianAlert = (function (_super) {
        __extends(RenLianAlert, _super);
        function RenLianAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RenLianAlert.mx_support = function () {
            return ["assets.rlrh"];
        };
        RenLianAlert.prototype.init_view_by_type = function () {
            if (window && window["mx_debug"]) {
                var debug_arr = window["mx_debug"];
                if (debug_arr.indexOf("face") > -1) {
                    var label = new eui.EditableText();
                    label.width = 90;
                    label.size = 32;
                    label.textColor = 0x000000;
                    label.top = 20;
                    label.left = 60;
                    label.text = "0.0";
                    label.addEventListener(eui.UIEvent.CHANGE, this.test, this);
                    this.addChild(label);
                }
            }
            mx.ApplicationFacade.getInstance().registerMediator(new mx.RenLianAlertMediator(this));
        };
        RenLianAlert.prototype.test = function (evt) {
            var str = evt.currentTarget.text;
            var arr = str.split(".");
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.alpha_blend = Number(arr[1] || 0) / 10;
            pproxy.alpha_position = Number(arr[0] || 0) / 10;
        };
        RenLianAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.RenLianAlertMediator.NAME);
        };
        RenLianAlert.S_NAME = "RenLianAlert";
        RenLianAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return RenLianAlert;
    }(mx.AlertView));
    mx.RenLianAlert = RenLianAlert;
    __reflect(RenLianAlert.prototype, "mx.RenLianAlert");
})(mx || (mx = {}));
//# sourceMappingURL=RenLianAlert.js.map
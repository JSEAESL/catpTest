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
*   @author mx
*   @date 2017.10.26
*   @desc 通用（文本）说明弹窗
**/
var mx;
(function (mx) {
    var GeneralShuoMingAlert = (function (_super) {
        __extends(GeneralShuoMingAlert, _super);
        function GeneralShuoMingAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GeneralShuoMingAlert.mx_support = function () {
            return ["assets.shuoming"];
        };
        GeneralShuoMingAlert.prototype.init_view_by_type = function () {
            var data = this.adata || {};
            this.shuoming_t.text = data.text;
        };
        GeneralShuoMingAlert.S_NAME = "GeneralShuoMingAlert";
        return GeneralShuoMingAlert;
    }(mx.AlertView));
    mx.GeneralShuoMingAlert = GeneralShuoMingAlert;
    __reflect(GeneralShuoMingAlert.prototype, "mx.GeneralShuoMingAlert");
})(mx || (mx = {}));
//# sourceMappingURL=GeneralShuoMingAlert.js.map
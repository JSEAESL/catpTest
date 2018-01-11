/**
*   @author cy
*   @date 2017.8.18
*   @desc 英雄信息说明弹窗
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
    var HeroInfoSMAlert = (function (_super) {
        __extends(HeroInfoSMAlert, _super);
        function HeroInfoSMAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroInfoSMAlert.S_NAME = "HeroInfoSMAlert";
        return HeroInfoSMAlert;
    }(mx.AlertView));
    mx.HeroInfoSMAlert = HeroInfoSMAlert;
    __reflect(HeroInfoSMAlert.prototype, "mx.HeroInfoSMAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroInfoSMAlert.js.map
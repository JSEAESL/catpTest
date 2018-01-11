/**
 *   @author daiqi
 *   @date 2017.6.2
 *   @desc 在GeneralSltRender的基础上，添加选中框
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
    var GeneralSltRender = (function (_super) {
        __extends(GeneralSltRender, _super);
        function GeneralSltRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GeneralSltRender;
    }(mx.GeneralRender));
    mx.GeneralSltRender = GeneralSltRender;
    __reflect(GeneralSltRender.prototype, "mx.GeneralSltRender");
})(mx || (mx = {}));
//# sourceMappingURL=GeneralSltRender.js.map
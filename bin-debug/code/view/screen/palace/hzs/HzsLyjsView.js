/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 结缘交涉
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
    var HzsLyjsView = (function (_super) {
        __extends(HzsLyjsView, _super);
        function HzsLyjsView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzsLyjsView.mx_support = function () {
            return ["assets.palace_hzsuo_lyjs"];
        };
        HzsLyjsView.S_NAME = "HzsLyjsView";
        return HzsLyjsView;
    }(mx.AlertView));
    mx.HzsLyjsView = HzsLyjsView;
    __reflect(HzsLyjsView.prototype, "mx.HzsLyjsView");
})(mx || (mx = {}));
//# sourceMappingURL=HzsLyjsView.js.map
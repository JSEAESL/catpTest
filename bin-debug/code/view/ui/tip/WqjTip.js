/**
*   @author mx
*   @date 2015.1.3
*   @温情酒tip提示
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
    var WqjTip = (function (_super) {
        __extends(WqjTip, _super);
        function WqjTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WqjTip.prototype.init_view = function () {
            var cd = this.adata;
            //Label
            var str = mx.Tools.format(mx.Lang.hgwqj, cd.name);
            this.tip_t.textFlow = mx.Tools.setKeywordColor2(str, [cd.namecolor, 0xffe328]);
        };
        return WqjTip;
    }(mx.HeroTip));
    mx.WqjTip = WqjTip;
    __reflect(WqjTip.prototype, "mx.WqjTip");
})(mx || (mx = {}));
//# sourceMappingURL=WqjTip.js.map
/**
*   @author mx
*   @date 2015.1.3
*   @物品tip提示
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
    var TextTip = (function (_super) {
        __extends(TextTip, _super);
        function TextTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextTip.prototype.init_view = function () {
            if (this.adata.flow) {
                this.desc_t.textFlow = this.adata.flow;
            }
            else {
                this.desc_t.text = this.adata.text;
            }
            this.tip_g.width = Math.min(343 * 1.5, this.tip_g.width);
        };
        return TextTip;
    }(mx.HeroTip));
    mx.TextTip = TextTip;
    __reflect(TextTip.prototype, "mx.TextTip");
})(mx || (mx = {}));
//# sourceMappingURL=TextTip.js.map
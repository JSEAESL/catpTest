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
    var TouXiangTip = (function (_super) {
        __extends(TouXiangTip, _super);
        function TouXiangTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TouXiangTip.prototype.init_view = function () {
            var cd = this.adata.id;
            this.tx_p.source = mx.Tools.get_item_res(110, cd);
            this.name_t.text = mx.Tools.get_item_info(110, cd).name;
            this.des_t.text = mx.Lang["tx_" + cd + "_0"] || "";
            this.tip_g.height = Math.max(this.des_t.textHeight + 78, 112) * 1.5;
        };
        return TouXiangTip;
    }(mx.HeroTip));
    mx.TouXiangTip = TouXiangTip;
    __reflect(TouXiangTip.prototype, "mx.TouXiangTip");
})(mx || (mx = {}));
//# sourceMappingURL=TouXiangTip.js.map
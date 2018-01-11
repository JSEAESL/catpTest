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
    var ItemTip = (function (_super) {
        __extends(ItemTip, _super);
        function ItemTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ItemTip.prototype.init_view = function () {
            var cd = this.adata;
            this.item.data = {
                "id": cd.id,
                "type": cd.type,
                "chicun": 90,
            };
            var item = mx.Tools.get_item_info(cd.type, cd.id);
            this.name_t.text = item.name;
            this.desc_t.text = item.Description || mx.Lang.p0099;
            if (item.LevelRequirement) {
                this.atr_t.text = mx.Lang.p0038 + item.LevelRequirement;
            }
            else {
                this.atr_t.text = "";
            }
            if (item.Sellprice) {
                this.price_t.text = mx.Lang.p0083 + item.Sellprice;
                this.yinbi_p.visible = true;
            }
            else {
                this.price_t.text = "";
                this.yinbi_p.visible = false;
                ;
            }
        };
        return ItemTip;
    }(mx.HeroTip));
    mx.ItemTip = ItemTip;
    __reflect(ItemTip.prototype, "mx.ItemTip");
})(mx || (mx = {}));
//# sourceMappingURL=ItemTip.js.map
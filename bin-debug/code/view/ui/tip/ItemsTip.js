/**
*   @author cy
*   @date 2017.8.24
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
    var ItemsTip = (function (_super) {
        __extends(ItemsTip, _super);
        function ItemsTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ItemsTip.prototype.init_view = function () {
            var cd = this.adata;
            this.name_t.text = cd.name;
            var jiangli = [];
            for (var k in cd.items) {
                jiangli.push({
                    "id": cd.items[k].item_id,
                    "type": cd.items[k].award_type,
                    "chicun": 69,
                    "num": cd.items[k].num,
                    "no_num": true,
                    "top": 72,
                    "di_cor": 0xffffff,
                    "height": 93,
                    "width": 69,
                });
            }
            this.item_list.itemRenderer = mx.GNumRender;
            this.item_list.dataProvider = new eui.ArrayCollection(jiangli);
        };
        ItemsTip.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
        };
        return ItemsTip;
    }(mx.HeroTip));
    mx.ItemsTip = ItemsTip;
    __reflect(ItemsTip.prototype, "mx.ItemsTip");
})(mx || (mx = {}));
//# sourceMappingURL=ItemsTip.js.map
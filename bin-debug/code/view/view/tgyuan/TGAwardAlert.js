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
 * @author dingyunfeng
 * @date 2018.1.2
 * 抽奖获奖界面
 */
var mx;
(function (mx) {
    var TGAwardAlert = (function (_super) {
        __extends(TGAwardAlert, _super);
        function TGAwardAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TGAwardAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.item_list.itemRenderer = mx.GNumRender;
            var item = [];
            var award = this.adata.award;
            item.push({
                "bg": "tgitemkuang_png",
                "id": award.item_id,
                "type": award.type,
                "num": award.num,
                "di": true,
                "no_num": true,
                "chicun": 90,
                "top": 94,
                "di_cor": 0xFFEBDD,
                "di_size": 20,
                "width": 90,
                "icon": award.icon
            });
            view.item_list.dataProvider = new eui.ArrayCollection(item);
            if (award.icon == "ipx_png") {
                this.ipx_g.visible = true;
                this.item_list.visible = false;
            }
            view.tip_t.textFlow = mx.Tools.setStrColor(mx.Lang.tgy004, [this.adata.name, mx.Lang.tgy003 + this.adata.lv, mx.Lang.tgy002], [0x64F3E7, 0x64F3E7, 0x59E777]);
        };
        TGAwardAlert.S_NAME = "TGAwardAlert";
        return TGAwardAlert;
    }(mx.AlertView));
    mx.TGAwardAlert = TGAwardAlert;
    __reflect(TGAwardAlert.prototype, "mx.TGAwardAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TGAwardAlert.js.map
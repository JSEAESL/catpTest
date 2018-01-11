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
 * @qj/17.3.13
 * 排行榜render
 */
var mx;
(function (mx) {
    var ZLCBPaiHangRender = (function (_super) {
        __extends(ZLCBPaiHangRender, _super);
        function ZLCBPaiHangRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZLCBPaiHangRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.rank_bt.text = data.id;
            view.award_list.itemRenderer = mx.GenTipRender;
            var layout = view.award_list.layout;
            layout.gap = Number(data.type) == 1 ? 37 : 33;
            view.fgxian_p.source = Number(data.type) == 2 ? "zlzdlfgxian2_png" : "zlzdlfgxian_png";
            view.award_scro.visible = view.rank_g.visible = view.rankinfo_g.visible = view.zl_g.visible = false;
            var chicun = {};
            switch (Number(data.type)) {
                case 1:
                    view.award_scro.visible = view.rank_g.visible = true;
                    view.award_scro.left = 201;
                    chicun = { '4': 0.55, '7': 0.54, '1': 0.55, '2': 0.55 };
                    break;
                case 2:
                    view.zlneed_t.text = data.zl;
                    view.award_scro.visible = view.zl_g.visible = true;
                    view.award_scro.left = 220;
                    chicun = { '4': 0.48, '7': 0.47, '1': 0.48, '2': 0.48 };
                    break;
                case 3:
                    view.rank_g.visible = view.rankinfo_g.visible = true;
                    view.zl_t.text = "战斗力：" + data.zhanli;
                    view.myvip_t.text = data.vip;
                    view.name_t.text = data.name;
                    view.lv_t.text = "Lv." + data.level;
                    view.avatar_p.source = "tx70_" + data.avatar + "_png";
                    break;
            }
            var arr = [];
            if (data.awards) {
                for (var i in data.awards) {
                    var unit = data.awards[i];
                    var obj = {
                        "type": unit.award_type,
                        "id": unit.item_id,
                        "num": unit.num,
                        "no_num_font": true,
                        "di": true,
                        "chicun": 120 * chicun[unit.award_type],
                    };
                    if (Number(unit.award_type) == 7) {
                        obj.mid = unit.item_id;
                        obj.star_type = 'ph';
                        obj.quality = 1;
                        obj.star = unit.init_star;
                    }
                    arr.push(obj);
                }
                view.award_list.dataProvider = new eui.ArrayCollection(arr);
            }
        };
        return ZLCBPaiHangRender;
    }(mx.BasicRender));
    mx.ZLCBPaiHangRender = ZLCBPaiHangRender;
    __reflect(ZLCBPaiHangRender.prototype, "mx.ZLCBPaiHangRender");
})(mx || (mx = {}));
//# sourceMappingURL=ZLCBPaiHangRender.js.map
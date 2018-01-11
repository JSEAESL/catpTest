/**
 *   @author cy
 *   @date 2017.11.29
 *   @desc render
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
    var ActyCYGGRender = (function (_super) {
        __extends(ActyCYGGRender, _super);
        function ActyCYGGRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyCYGGRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            egret.Tween.removeTweens(this.item_list);
        };
        ActyCYGGRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var zg = new mx.GeneralEffect("cyggfpai1");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.x = 0;
            zg.y = 0;
        };
        ActyCYGGRender.prototype.show_award = function (id) {
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CYGGAWARD, "id", id);
            var arr = [{
                    "id": api.item_id,
                    "type": api.type,
                    "num": api.num,
                    "chicun": 76,
                    "width": 76,
                    "di_cor": 0x4E496F,
                    "di_size": 20,
                    "top": 86,
                    "itembg": "",
                    "no_num": true
                }];
            this.item_list.itemRenderer = mx.GNumRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
            this.item_list.alpha = 0;
            this.ef_g.removeChildren();
            var zg = new mx.GeneralEffect("cyggfpai2");
            this.ef_g.addChild(zg);
            zg.set_retain(true);
            zg.x = 59;
            zg.y = 79;
            var timeid1 = egret.setTimeout(function (arg) {
                egret.Tween.get(this.item_list).to({ "alpha": 1 }, 300);
            }, this, 600, "egret");
        };
        return ActyCYGGRender;
    }(mx.BasicRender));
    mx.ActyCYGGRender = ActyCYGGRender;
    __reflect(ActyCYGGRender.prototype, "mx.ActyCYGGRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActyCYGGRender.js.map
/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 装备render
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
    var EquipRender = (function (_super) {
        __extends(EquipRender, _super);
        function EquipRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EquipRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.etype);
        };
        EquipRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.icon.source = "";
            this.etype.source = "";
            this.etype.alpha = 1;
            egret.Tween.removeTweens(this.etype);
            this.bg.source = "itembg_png";
            switch (data.etype) {
                case 0://已装备
                    var api = mx.Tools.get_item_info(4, data.id);
                    this.bg.source = "itembg" + api.Quality + "_png";
                    this.icon.source = mx.Tools.get_item_res(4, data.id);
                    break;
                case 1: //无装备&装备本身可合成-显示合成路径
                case 4://无&不可合成装备-显示获取途径
                    this.etype.source = "wzbei_png";
                    break;
                case 2://可装备(美男等级高)
                    this.etype.source = "kzbei_png";
                    egret.Tween.get(this.etype, { "loop": true }).to({ "alpha": 0.3 }, 600).to({ "alpha": 1 }, 600);
                    break;
                case 3://可合成
                    this.etype.source = "khcheng_png";
                    egret.Tween.get(this.etype, { "loop": true }).to({ "alpha": 0.3 }, 600).to({ "alpha": 1 }, 600);
                    break;
                case 5: //等级不足，可合成
                case 6://等级不足，不可合成
                    this.etype.source = "djbzu_png";
                default:
                    break;
            }
        };
        return EquipRender;
    }(mx.BasicRender));
    mx.EquipRender = EquipRender;
    __reflect(EquipRender.prototype, "mx.EquipRender");
})(mx || (mx = {}));
//# sourceMappingURL=EquipRender.js.map
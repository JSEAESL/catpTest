/**
*   @author cy
*   @date 2016.11.15
*   @desc 点金手提示(图片)
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
    var DJSUI = (function (_super) {
        __extends(DJSUI, _super);
        function DJSUI(data, m, f) {
            return _super.call(this, data) || this;
        }
        DJSUI.prototype.pre_init = function () {
            this.tip_g.y = 0;
            this.tip_g.alpha = 1;
            var c_d = this.adata;
            this.label_bt.text = c_d.text;
            if (c_d.bg) {
                this.bg_p.source = c_d.bg;
                this.bg_p.left = 160;
            }
            else {
                this.bg_p.left = 140;
                this.bg_p.source = "hdybi_png";
            }
            if (c_d.font) {
                this.label_bt.font = c_d.font;
            }
            else {
                this.label_bt.font = "orange19_25_fnt";
            }
            this.show_move();
        };
        DJSUI.prototype.show_move = function () {
            this.tip_g.visible = true;
            this.tip_g.y = -70;
            egret.Tween.get(this.tip_g).to({ "y": -150, "alpha": 0.0 }, 800).call(this.on_remove, this);
        };
        DJSUI.prototype.on_remove = function (need) {
            if (need === void 0) { need = true; }
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.tip_g);
            this.parent.removeChild(this);
        };
        return DJSUI;
    }(mx.BasicView));
    mx.DJSUI = DJSUI;
    __reflect(DJSUI.prototype, "mx.DJSUI");
})(mx || (mx = {}));
//# sourceMappingURL=DJSUI.js.map
/**
*   @author mx
*   @date 2015.2.11
*   @desc toast提示
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
    var ToastUI = (function (_super) {
        __extends(ToastUI, _super);
        function ToastUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ToastUI.prototype.pre_init = function () {
            this.tip_g.y = 0;
            this.tip_g.alpha = 1;
            var c_d = this.adata;
            if (c_d.style) {
                this.label_t.textFlow = [{ "text": c_d.text, "style": c_d.style }];
            }
            else {
                this.label_t.textFlow = mx.Tools.setKeywordColor2(c_d.text, [0xFFA12F]);
            }
            if (c_d.nobg) {
                this.bg_p.visible = false;
            }
            this.show_move();
        };
        ToastUI.prototype.show_move = function () {
            this.tip_g.visible = true;
            egret.Tween.get(this.tip_g).to({ "y": -60 }, 800).wait(50).to({ "alpha": 0.0 }, 200)
                .call(this.on_remove, this);
        };
        ToastUI.prototype.on_remove = function (need) {
            if (need === void 0) { need = true; }
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.tip_g);
            this.parent.removeChild(this);
        };
        return ToastUI;
    }(mx.BasicUI));
    mx.ToastUI = ToastUI;
    __reflect(ToastUI.prototype, "mx.ToastUI");
})(mx || (mx = {}));
//# sourceMappingURL=ToastUI.js.map
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
/*
*
*/
var mx;
(function (mx) {
    var HeroAwardExpRender = (function (_super) {
        __extends(HeroAwardExpRender, _super);
        function HeroAwardExpRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroAwardExpRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.exp_bar) {
                return;
            }
            this.hero.data = data;
            if (typeof data.exp == 'undefined') {
                return;
            }
            var param = {
                'num': data.xingji,
                'res': 'pinzhixing',
                'gap': (90 - mx.MX_COMMON.HP_LEVEL * 24 * 0.8) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            this.hero_xingji.init_multiui(param);
            this.exp_bar.set_res({ "up": "mnjdtiao_png", "down": "mnjdtdchen_png" });
            this.exp_t.text = "+" + data.exp.add;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', data.exp.level);
            this.exp_bar.value = Math.round(parseInt(data.exp.exp) / parseInt(api.hero_exp) * 100);
        };
        return HeroAwardExpRender;
    }(mx.BasicRender));
    mx.HeroAwardExpRender = HeroAwardExpRender;
    __reflect(HeroAwardExpRender.prototype, "mx.HeroAwardExpRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeroAwardExpRender.js.map
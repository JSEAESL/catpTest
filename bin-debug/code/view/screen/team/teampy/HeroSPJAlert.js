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
 *  cy、mx
 *  2016.9.6
 *  升品成功alert
 */
/**
 *  gaojing
 *  2017.12.12
 *  升品成功alert
 */
var mx;
(function (mx) {
    var HeroSPJAlert = (function (_super) {
        __extends(HeroSPJAlert, _super);
        function HeroSPJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroSPJAlert.mx_support = function () {
            return ["assets.hero_spj"];
        };
        HeroSPJAlert.prototype.init_view_by_type = function () {
            var view = this;
            var zg = new mx.GeneralEffect("rwjl");
            view.ef_g.addChild(zg);
            zg.play_by_times(-1);
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var hero = hproxy.get_chero_info();
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hero.mid);
            var tupian;
            switch (api.HeroType) {
                case "STRENGTH"://攻击
                    tupian = "li_png";
                    break;
                case "AGILITY"://守御
                    tupian = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    tupian = "zhi_png";
                    break;
                default:
                    break;
            }
            this.oldart_p.source = this.newart_p.source = tupian;
            var arr = ["prev", "next"];
            var star = hero.star;
            var quality = hero.quality - 1;
            var next_quality = hero.quality;
            for (var i in arr) {
                var s = arr[i];
                this[s + "_hero"].data = {
                    "quality": s == "prev" ? quality : next_quality,
                    "mid": hero.mid
                };
                var param = {
                    'num': star,
                    'res': 'wjxshi',
                    'gap': (120 - mx.MX_COMMON.HP_LEVEL * 19) / (mx.MX_COMMON.HP_LEVEL - 1),
                    'align': egret.HorizontalAlign.LEFT
                };
                this[s + "_level"].init_multiui(param);
            }
            view.oldhp_t.text = Math.floor(this.adata.oldhp) + "";
            view.oldzl_t.text = Math.floor(this.adata.oldzl) + "";
            view.newhp_t.text = Math.floor(this.adata.newhp) + "";
            view.newzl_t.text = Math.floor(this.adata.newzl) + "";
        };
        HeroSPJAlert.S_NAME = "HeroSPJAlert";
        return HeroSPJAlert;
    }(mx.AlertView));
    mx.HeroSPJAlert = HeroSPJAlert;
    __reflect(HeroSPJAlert.prototype, "mx.HeroSPJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroSPJAlert.js.map
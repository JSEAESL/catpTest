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
 * @author daiqi
 * @date 2017.5.19
 * 奖励一览显示的render，参照TeamHeroRender,
 */
var mx;
(function (mx) {
    var XXiuYiLanRender = (function (_super) {
        __extends(XXiuYiLanRender, _super);
        function XXiuYiLanRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuYiLanRender.prototype.set_skinname = function () {
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["TeamHeroRenderSkin"];
            }
            else {
                this.skinName = RES.getRes("TeamHeroRenderSkin_exml");
            }
        };
        XXiuYiLanRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var mid = this.data;
            if (!mid || !this.skin) {
                return;
            }
            this.tishi.visible = false;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", mid);
            var data = { "mid": mid, "quality": 1 };
            this.hero.data = data;
            var param = {
                'num': api.InitialStars,
                'res': "pinzhixing",
                'gap': (84 - mx.MX_COMMON.HP_LEVEL * 16) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            this.hero_xingji.init_multiui(param);
            this.htype.visible = true;
            switch (api.HeroType) {
                case "STRENGTH"://攻击
                    this.htype.source = "li_png";
                    break;
                case "AGILITY"://守御
                    this.htype.source = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    this.htype.source = "zhi_png";
                    break;
                default:
                    break;
            }
            this.hero_lv.text = api.hero_name;
            this.hero_lv.textColor = 0x7a6589;
            this.hero_lv.size = 21;
        };
        return XXiuYiLanRender;
    }(mx.BasicRender));
    mx.XXiuYiLanRender = XXiuYiLanRender;
    __reflect(XXiuYiLanRender.prototype, "mx.XXiuYiLanRender");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuYiLanRender.js.map
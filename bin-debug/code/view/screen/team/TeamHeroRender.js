/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 团队展示英雄render,增加了上阵、提示光效
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
    var TeamHeroRender = (function (_super) {
        __extends(TeamHeroRender, _super);
        function TeamHeroRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamHeroRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.hero.data = data;
            var param = {
                'num': data.star,
                'res': "pinzhixing",
                'gap': (126 - mx.MX_COMMON.HP_LEVEL * 24) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            this.hero_xingji.init_multiui(param);
            if (data.star_top) {
                this.hero_xingji.top = data.star_top;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
            this.htype.visible = true;
            if (!data.htype) {
                data.htype = api ? api.HeroType : "STRENGTH";
            }
            switch (data.htype) {
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
            }
            this.hero_lv.text = mx.Tools.format(mx.Lang.bh001, data.level) + (api ? api.hero_name : "mx");
            this.hero_lv.textColor = 0x6B549E;
            this.hero_lv.size = 21;
            if (data.di_cor) {
                this.hero_lv.textColor = data.di_cor;
            }
            if (data.di_size) {
                this.hero_lv.size = data.di_size;
            }
            if (data.di_bottom) {
                this.hero_lv.bottom = data.di_bottom;
            }
            this.tishi.visible = false;
            /*先注释红点
            if(data.ef){
                let cef = data.ef.join("");
                this.tishi.visible = cef != "000";
            }else{
                this.tishi.visible = false;
            }
            */
            if (data.width) {
                this.scaleX = this.scaleY = data.width / 128;
                this.hero_lv.size /= this.scaleX;
            }
            if (data.noxingji) {
                this.hero_xingji.visible = false;
            }
            if (data.nolv) {
                this.hero_lv.visible = false;
            }
            //类型可以不显示
            if (data.notype) {
                this.htype.visible = false;
                return;
            }
            this.jjccz_p.visible = data.jjc_cz;
            this.xz_p.visible = this.xzdi_p.visible = data.team_xz;
            if (data.tuijian) {
                this.tj_g.visible = false;
                this.hero_lv.text = mx.Tools.format(mx.Lang.bh001, data.level) + " " + (api ? api.hero_name : "mx");
                this.hero_tj_lv.text = data.level; //Tools.format(Lang.bh001, data.level);
            }
        };
        return TeamHeroRender;
    }(mx.BasicRender));
    mx.TeamHeroRender = TeamHeroRender;
    __reflect(TeamHeroRender.prototype, "mx.TeamHeroRender");
})(mx || (mx = {}));
//# sourceMappingURL=TeamHeroRender.js.map
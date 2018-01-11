/**
 *   @author wf
 *   @date 2016.12.6
 *   @desc 出战界面英雄列表render,包含星级和等级
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
    var TeamHeroRender2 = (function (_super) {
        __extends(TeamHeroRender2, _super);
        function TeamHeroRender2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamHeroRender2.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.hero.data = data;
            if (data.star) {
                var param = {
                    'num': data.star,
                    'res': data.pzxing ? data.pzxing : "pinzhixing",
                    'gap': (120 - mx.MX_COMMON.HP_LEVEL * 24 * 0.8) / (mx.MX_COMMON.HP_LEVEL - 1),
                    'align': egret.HorizontalAlign.LEFT
                };
                this.hero_xingji.init_multiui(param);
            }
            var rtype = data.rtype;
            if (rtype) {
                if (rtype == "tzpop") {
                    this.hero_lv.textColor = 0x9588B9;
                    this.hero_lv.size = 22;
                    this.hero_lv.top = 94.5;
                    this.hero_xingji.top = 78;
                }
                return;
            }
            if (data.level) {
                this.hero_lv.text = mx.Tools.format(mx.Lang.bh001, data.level);
                if (mx.AppConfig.CURR_SCENE_ID == mx.LDMainScreen.S_NAME) {
                    this.hero_lv.textColor = 0xffffff;
                    this.hero_lv.size = 22;
                    this.hero_lv.top = 94.5;
                }
            }
            else {
                this.hero_lv.text = "";
            }
            if (data.cor) {
                this.hero_lv.textColor = data.cor;
            }
            if (data.size) {
                this.hero_lv.size = data.size;
            }
            this.tishi.visible = false;
            /*先注释小红点
            if(data.hongdian){
                let cef = data.hongdian.join("");
                this.tishi.visible = cef != "000";
            }else{
                this.tishi.visible = false;
            }
            */
            this.tj_g.visible = false;
            if (data.hero_name) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
                this.hero_lv.text += api.hero_name;
            }
            if (data.tuijian) {
                this.tj_g.visible = false;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
                this.hero_lv.textColor = 0x6B549E;
                this.hero_lv.text += " " + api.hero_name;
                this.hero_tj_lv.text = data.level; //Tools.format(Lang.bh001, data.level);
            }
        };
        return TeamHeroRender2;
    }(mx.BasicRender));
    mx.TeamHeroRender2 = TeamHeroRender2;
    __reflect(TeamHeroRender2.prototype, "mx.TeamHeroRender2");
})(mx || (mx = {}));
//# sourceMappingURL=TeamHeroRender2.js.map
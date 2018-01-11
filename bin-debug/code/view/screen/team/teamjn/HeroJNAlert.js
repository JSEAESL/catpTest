/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 英雄技能弹窗
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
    var HeroJNAlert = (function (_super) {
        __extends(HeroJNAlert, _super);
        function HeroJNAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroJNAlert.mx_support = function () {
            return ["assets.teamjn", "api.SKILLNEW", "api.VIP", "api.SKILLUPCOST", "api.SKILLNEWGROUP", "api.SKILLPOINTPRICE"];
        };
        HeroJNAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_jn_l1":
                    tar = this.skill_list.getChildAt(0);
                    tar = tar.levelup_b;
                    break;
            }
            return tar;
        };
        HeroJNAlert.prototype.init_view = function () {
            this.skill_list.itemRenderer = mx.SkillLevelUpRender;
            this.buy_b.set_ssres("gmaniu_png");
            this.mrjn_t.text = mx.Lang.mnjn;
            this.yy_t.text = mx.Lang.yyou;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeroJNAlertMediator(this));
        };
        HeroJNAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroJNAlertMediator.NAME);
        };
        HeroJNAlert.S_NAME = "HeroJNAlert";
        return HeroJNAlert;
    }(mx.BasicView));
    mx.HeroJNAlert = HeroJNAlert;
    __reflect(HeroJNAlert.prototype, "mx.HeroJNAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroJNAlert.js.map
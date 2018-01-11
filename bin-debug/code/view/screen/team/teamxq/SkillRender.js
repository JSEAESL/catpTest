/**
 *   @author qianjun、mx
 *   @date 2016.8.29
 *   @desc 技能render
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
    var SkillRender = (function (_super) {
        __extends(SkillRender, _super);
        function SkillRender() {
            return _super.call(this) || this;
        }
        SkillRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.skill_icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        };
        SkillRender.prototype.init_render = function () {
            this.skill_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            this.dataChanged();
        };
        SkillRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', data.skill_id);
            var lv = Number(data.level) - Number(api.InitLevel) + 1;
            this.skill_icon.source = "skill" + data.skill_id + "_png";
            this.skill_icon.scaleX = this.skill_icon.scaleY = 60 / this.skill_icon.width;
            if (data.kaiqi) {
                this.desc_t.text = mx.Tools.format(mx.Lang.j0016, api.SC_name, lv);
                mx.Tools.mx_grayfy(this.skill_icon, true);
            }
            else {
                // let arr = [1, 2, 4, 7];
                // let index = arr.indexOf(Number(data.unlock));
                var str2 = mx.Tools.format(mx.Lang.j0021, api.SC_name, data.unlock);
                mx.Tools.mx_grayfy(this.skill_icon);
                this.desc_t.textFlow = mx.Tools.setKeywordColor2(str2, [0xf84345]);
            }
        };
        SkillRender.prototype.showTips = function (e) {
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": this.width,
                "h": this.height,
                "type": "tip_skill",
                "args": this.data,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        return SkillRender;
    }(mx.BasicRender));
    mx.SkillRender = SkillRender;
    __reflect(SkillRender.prototype, "mx.SkillRender");
})(mx || (mx = {}));
//# sourceMappingURL=SkillRender.js.map
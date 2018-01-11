/**
*   @author mx
*   @date 2016.8.29
*   @desc 技能tip提示
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
    var SkillTip = (function (_super) {
        __extends(SkillTip, _super);
        function SkillTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillTip.prototype.format_skill_desc = function (api, str, lv) {
            for (var i = 1; i < 5; i++) {
                var c_summary = api["Growth" + i + "Summary2"];
                if (!c_summary || c_summary == "") {
                    break;
                }
                var xs = api["Growth" + i + "Multiplier"] * api["Growth" + i + "Value"];
                var num = i != 1 ? xs * (lv - api.InitLevel + 1) :
                    Number(api.BasicGrowth) + xs * (lv - api.InitLevel + 1);
                num = Number(num.toFixed(2));
                var ctr = c_summary.replace(/#+/g, "" + num);
                if (str != "") {
                    str += "\n";
                }
                str += ctr;
            }
            return str;
        };
        SkillTip.prototype.init_view = function () {
            var data = this.adata.args;
            //读取技能成长表中的数据，表名拼写错误应为SKILLGROWTH     
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', data.skill_id);
            //名字及描述
            var arr = [
                { "text": api.SC_name + "：", "style": { "textColor": 0x11db1f } },
                { "text": api.Description || "skill" },
            ];
            this.desc_t.textFlow = arr;
            //技能效果
            var lv = Number(data.level);
            this.damage_t.text = this.format_skill_desc(api, "", lv);
            this.next_t.text = this.format_skill_desc(api, mx.Lang.j0020, lv + 1);
            //技能属性
            if (api.SkillTags != "") {
                this.tab_g.height = 24;
                this.tab_g.visible = true;
                this.tab_t.text = mx.Lang.j0015;
                var art = api.SkillTags.split("|");
                var ln = art.length;
                for (var i = 1; i <= ln; i++) {
                    var ui = new eui.Image(art[i - 1] + "_png");
                    ui.x = 40 * i;
                    this.tab_g.addChild(ui);
                }
            }
            else {
                this.tab_g.visible = false;
                this.tab_g.height = 0;
            }
        };
        return SkillTip;
    }(mx.HeroTip));
    mx.SkillTip = SkillTip;
    __reflect(SkillTip.prototype, "mx.SkillTip");
})(mx || (mx = {}));
//# sourceMappingURL=SkillTip.js.map
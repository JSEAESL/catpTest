/**
 *   @author cy
 *   @date 2017.11.8
 *   @desc render
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
    var TeamZhenYanRender = (function (_super) {
        __extends(TeamZhenYanRender, _super);
        function TeamZhenYanRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamZhenYanRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.zy_p.source = "jzzy" + data.id + "_png";
            var param = {
                'num': 5,
                "total": 5,
                'res': 'gouyu',
                "gap": 6,
                'align': egret.HorizontalAlign.LEFT
            };
            this.xji.init_multiui(param);
            var kaiqi_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIKAIQI, "hero_id", data.hero_id, "jiuzi", data.id);
            var add_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIADD, "type", data.id);
            this.skill_p.source = "";
            this.sx_g.left = 240;
            switch (Number(kaiqi_api.leixing)) {
                case 4://技能
                    this.skill_p.source = "skill" + kaiqi_api.add_skill + "_png";
                    var skill_api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", kaiqi_api.add_skill);
                    this.sx_t.text = skill_api.SC_name + mx.Lang.h0110;
                    this.ms_t.textFlow = [
                        { "text": mx.Tools.format(kaiqi_api.desc, "", skill_api.SC_name) },
                        { "text": kaiqi_api.extra_add_num + "", "style": { "textColor": 0x779959 } },
                    ];
                    break;
                default:
                    this.sx_g.left = 178;
                    this.sx_t.text = mx.Lang.h0109;
                    var desc = kaiqi_api.desc;
                    if (Number(kaiqi_api.leixing) == 1 || Number(kaiqi_api.leixing) == 2) {
                        desc = desc.replace("{0}%", "{0{0}%0}");
                    }
                    this.ms_t.textFlow = mx.Tools.setKeywordColor2(mx.Tools.format(desc, kaiqi_api.extra_add_num), [0x779959]);
                    break;
            }
            var att = Number(add_api.EffectValue1) + Number(add_api.GrowthValue1) * Number(add_api.max_level);
            var hp = Number(add_api.EffectValue2) + Number(add_api.GrowthValue2) * Number(add_api.max_level);
            this.att_t.textFlow = [
                { "text": mx.Lang.h0058[1] + "+" },
                { "text": att + "", "style": { "textColor": 0x779959 } },
            ];
            this.hp_t.textFlow = [
                { "text": mx.Lang.h0058[0] + "+" },
                { "text": hp + "", "style": { "textColor": 0x779959 } },
            ];
        };
        return TeamZhenYanRender;
    }(mx.BasicRender));
    mx.TeamZhenYanRender = TeamZhenYanRender;
    __reflect(TeamZhenYanRender.prototype, "mx.TeamZhenYanRender");
})(mx || (mx = {}));
//# sourceMappingURL=TeamZhenYanRender.js.map
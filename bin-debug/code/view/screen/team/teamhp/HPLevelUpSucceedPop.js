/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 英雄魂魄升星成功弹窗
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
    var HPLevelUpSucceedPop = (function (_super) {
        __extends(HPLevelUpSucceedPop, _super);
        function HPLevelUpSucceedPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HPLevelUpSucceedPop.mx_support = function () {
            return ["assets.hpupsucceess"];
        };
        HPLevelUpSucceedPop.prototype.init_view_by_type = function () {
            var zg = new mx.GeneralEffect("rwjl");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1;
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var hero = mx.FightTools.object_clone(hProxy.get_chero_info());
            var s, s1, key = "";
            var arr = ["prev", "next"];
            var arr_type = ["ll", "zl", "mj"];
            this.shengxing_g.height = 410;
            this.newjineng_g.visible = false;
            if (hero.star < mx.MX_COMMON.HP_LEVEL) {
                var jineng = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "CasterID", hero.mid, "Unlock", hero.star);
                if (jineng) {
                    this.newjineng_g.visible = true;
                    this.jinengming_t.text = jineng.SC_name;
                    this.miaoshu_t.text = jineng.Description;
                    this.shengxing_g.height = 565;
                    this.jineng_p.source = "skill" + jineng.skill_id + "_png";
                }
            }
            //星级已+1故要减去1
            var newsx = mx.FightTools.cal_hero_prop(hero, 1);
            var star = hero.star - 1;
            var next_star = Math.min(hero.star, mx.MX_COMMON.HP_LEVEL);
            hero.star -= 1;
            var oldsx = mx.FightTools.cal_hero_prop(hero, 1);
            //获取升星前后数据
            var h = mx.FightTools.get_hero(hero.mid);
            var obj = ['AD', "ARM", 'HP'];
            var cd = {
                "prev": { "ll": oldsx[obj[0]], "zl": oldsx[obj[1]], "mj": oldsx[obj[2]], "level": star },
                "next": { "ll": newsx[obj[0]], "zl": newsx[obj[1]], "mj": newsx[obj[2]], "level": next_star }
            };
            //初始化界面 
            s = s1 = key = "";
            for (var i in arr) {
                s = arr[i];
                //属性
                for (var j in arr_type) {
                    s1 = arr_type[j];
                    key = s + "_" + s1 + "_t";
                    if (s == "prev") {
                        this[key].textFlow = [
                            { text: cd[s][s1], style: { "textColor": 0xaa9cd7 } },
                        ];
                    }
                    else {
                        this[key].textFlow = [
                            { text: cd[s][s1], style: { "textColor": 0xff7f0d } },
                        ];
                    }
                }
                //星级
                this[s + "_hero"].data = {
                    "quality": hero.quality,
                    "mid": hero.mid
                };
                var param = {
                    'num': s == "prev" ? star : next_star,
                    'res': 'wjxshi',
                    'gap': (120 - mx.MX_COMMON.HP_LEVEL * 19) / (mx.MX_COMMON.HP_LEVEL - 1),
                    'align': egret.HorizontalAlign.LEFT
                };
                this[s + "_level"].init_multiui(param);
            }
            var tupian;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hero.mid);
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
            this.pre_art.source = this.next_art.source = tupian;
        };
        HPLevelUpSucceedPop.S_NAME = "HPLevelUpSucceedPop";
        return HPLevelUpSucceedPop;
    }(mx.AlertView));
    mx.HPLevelUpSucceedPop = HPLevelUpSucceedPop;
    __reflect(HPLevelUpSucceedPop.prototype, "mx.HPLevelUpSucceedPop");
})(mx || (mx = {}));
//# sourceMappingURL=HPLevelUpSucceedPop.js.map
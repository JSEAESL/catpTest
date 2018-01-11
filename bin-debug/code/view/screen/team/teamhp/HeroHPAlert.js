/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 英雄魂魄升星弹窗
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
    var HeroHPAlert = (function (_super) {
        __extends(HeroHPAlert, _super);
        function HeroHPAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroHPAlert.mx_support = function () {
            return ["assets.teamhp", "api.EQUIP"];
        };
        HeroHPAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_tp_ok":
                    tar = this.ok_b;
                    break;
            }
            return tar;
        };
        HeroHPAlert.prototype.init_view_by_type = function () {
            // this.ok_b.set_ssres("sxing_png");
            // this.exit_b.set_ssres("tygbbtn_png");
            this.mrsx_t.text = mx.Lang.mnshx;
            this.hpo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hunpo_click, this);
            //      this.smhp_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hunpo_click, this);
            var cdata = mx.FightTools.object_clone(this.adata.args);
            var obj2 = {
                "mid": cdata.mid,
                "quality": cdata.quality
            };
            this.prehero.data = this.nexthero.data = obj2;
            this.set_hp_num();
            var tupian;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cdata.mid);
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
            api = null;
            this.pre_art.source = this.next_art.source = tupian;
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', cdata.mid);
            var item_id = parseInt(hero.equip_id);
            this.hpo.data = {
                "type": 4,
                "id": item_id,
                "chicun": 90
            };
            //属性显示先后
            var star = parseInt(cdata.star);
            var next_star = Math.min(star + 1, mx.MX_COMMON.HP_LEVEL);
            //旧属性 新属性MX_COMMON
            var oldsx = mx.FightTools.cal_hero_prop(cdata, 1);
            cdata.star = next_star;
            var newsx = mx.FightTools.cal_hero_prop(cdata, 1);
            var cd = { "prev": star, "next": next_star };
            var obj = ['AD', "ARM", 'HP'];
            var shuxingname = { 'AD': mx.Lang.hp000, "ARM": mx.Lang.hp001, 'HP': mx.Lang.hp002 };
            for (var k1 in cd) {
                var c_d = cd[k1];
                var t_arr = [];
                var color = k1 == "prev" ? 0xaa9cd7 : 0xff7f0d;
                for (var k in obj) {
                    var k2 = obj[k];
                    var str = k1 == "prev" ? oldsx[k2] : newsx[k2];
                    t_arr.push({ "text": shuxingname[obj[k]], style: { "textColor": "0x6C559D" } });
                    t_arr.push({ "text": str, style: { "textColor": color } });
                    t_arr.push({ "text": "\n" });
                }
                this[k1 + "_t"].textFlow = t_arr;
                var param = {
                    'num': c_d,
                    'res': 'wjxshi',
                    'gap': (84 - mx.MX_COMMON.HP_LEVEL * 19) / (mx.MX_COMMON.HP_LEVEL - 1),
                    'align': egret.HorizontalAlign.LEFT
                };
                this[k1 + "_level"].init_multiui(param);
            }
            hero = null;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.HeroHPMediator(this));
        };
        HeroHPAlert.prototype.set_hp_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var cdata = this.adata.args;
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', cdata.mid);
            var item_id = parseInt(hero.equip_id);
            hero = null;
            var has = pProxy.get_item_num(item_id);
            var star = parseInt(cdata.star);
            var next_star = Math.min(star + 1, mx.MX_COMMON.HP_LEVEL);
            this.need = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, 'ID', next_star);
            this.num_t.text = has + "/" + this.need.Up_Fragments;
            this.has = has;
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var has_ybi = dproxy.get_currency("ybi");
            var need_ybi = Number(this.need.coin_price);
            this.ybi_t.text = need_ybi + "";
            this.ybi_t.textColor = Number(has_ybi) >= need_ybi ? 0x715AA3 : 0xff4345;
            this.can_up = star < mx.MX_COMMON.HP_LEVEL && has >= Number(this.need.Up_Fragments) && has_ybi >= need_ybi;
        };
        HeroHPAlert.prototype.hunpo_click = function (evt) {
            var cd = this.adata.args;
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', cd.mid);
            var item_id = parseInt(hero.equip_id);
            hero = null;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.hpo:
                    var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    fproxy.set_sd_tar_info(item_id, this.need.Up_Fragments);
                    break;
                case this.smhp_b:
                    var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                    var smhp_num = pProxy.get_item_num(617);
                    ////console.log(smhp_num)
                    ////console.log(cd.star)
                    ////console.log(this.need.Up_Fragments )
                    ////console.log(this.has)
                    var need = Number(cd.star) < mx.MX_COMMON.HP_LEVEL ? this.need.Up_Fragments - this.has : smhp_num;
                    ////console.log(need)
                    if (need > 0 || Number(cd.star) == mx.MX_COMMON.HP_LEVEL) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.HunpoZhuanhuaAlert.S_NAME,
                            "param": {
                                "mid": cd.mid,
                                "max": Math.min(need, smhp_num),
                            }
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0193 });
                    }
                    break;
            }
        };
        HeroHPAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hpo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hunpo_click, this);
            // this.smhp_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hunpo_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroHPMediator.NAME);
        };
        HeroHPAlert.S_NAME = "HeroHPAlert";
        return HeroHPAlert;
    }(mx.AlertView));
    mx.HeroHPAlert = HeroHPAlert;
    __reflect(HeroHPAlert.prototype, "mx.HeroHPAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroHPAlert.js.map
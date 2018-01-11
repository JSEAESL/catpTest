/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var TeamZhenYanAlertMediator = (function (_super) {
        __extends(TeamZhenYanAlertMediator, _super);
        function TeamZhenYanAlertMediator(viewComponent) {
            var _this = _super.call(this, TeamZhenYanAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TeamZhenYanAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TeamZhenYanAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        TeamZhenYanAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.yl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tp_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.smhp_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.jh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.tab_list.dataProvider = null;
            view.xiaohao_list.dataProvider = null;
            view.kq_list.dataProvider = null;
        };
        TeamZhenYanAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        TeamZhenYanAlertMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    this.fresh_pop();
                    break;
                default:
                    break;
            }
        };
        TeamZhenYanAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.yl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tp_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.smhp_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.jh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.xiaohao_list.itemRenderer = mx.GNumRender;
            this.fresh_pop();
        };
        TeamZhenYanAlertMediator.prototype.fresh_pop = function () {
            var view = this.view;
            var proxy = this.proxy;
            var cd = proxy.get_chero_info();
            this.hero = cd;
            var jiuzi_arr = [];
            for (var k = cd.nine_word.length - 1; k >= 0; k--) {
                var zi = Number(cd.nine_word[k]);
                jiuzi_arr.push({
                    "di": zi > 0 ? "jzzy" + (Number(k) + 1) + "_png" : "jzzyhui" + (Number(k) + 1) + "_png",
                    "suo": zi > 0 ? false : true,
                    "id": Number(k),
                });
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(jiuzi_arr);
            if (view.tab_list.selectedIndex < 0) {
                view.tab_list.selectedIndex = 8;
            }
            var layout = new mx.MXCircleLayout({
                "ww": 30,
                "hh": 30,
                "sa": 1 / 9 * Math.PI,
            });
            view.tab_list.layout = layout;
            view.zl_t.text = "" + mx.FightTools.cal_fight_power(cd);
            view.avatar.source = mx.Tools.get_mn_res(cd.mid, "lh");
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(172, 172, 172);
            shape.graphics.endFill();
            view.avatar_g.addChild(shape);
            shape.x = 0;
            view.avatar.mask = shape;
            switch (Number(cd.mid)) {
                case 57://莱斯特
                    view.avatar.scaleY = view.avatar.scaleX = 0.6;
                    view.avatar.top = -80;
                    break;
                case 55://百花仙子
                    view.avatar.top = 10;
                    view.avatar.horizontalCenter = 0;
                    break;
            }
            //品质
            var color = mx.Tools.cal_quality_cor(Number(cd.quality));
            // view.name_t.textColor = color;
            view.name_t.textColor = 0x3FB2EE;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
            view.name_t.text = api.hero_name + mx.Lang.j0024[cd.quality - 1];
            this.fresh_index(jiuzi_arr[view.tab_list.selectedIndex].id);
        };
        TeamZhenYanAlertMediator.prototype.cal_res = function (target) {
            var arr = [];
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIKAIQI, "id", target);
            if (!api) {
                return;
            }
            var jiuzi = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIADD, "type", api.jiuzi);
            if (Number(jiuzi.is_open) == 0) {
                arr.push({
                    "bq": "wdcfkuai_png",
                    "flow": [{ "text": mx.Lang.h0105, "style": { "textColor": 0xFFFEFE } }]
                });
                return arr;
            }
            var hproxy = this.proxy;
            var hero = hproxy.get_hero_by_mid(api.hero_id);
            var hero_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", api.hero_id);
            var need_hero = String(api.open_hero).split("|");
            var need_star = String(api.open_star).split("|");
            var need_quality = String(api.open_quality).split("|");
            var need_jiuzi = String(api.open_jiuzi_type).split("|");
            var need_jiuzilv = String(api.jiuzi_level).split("|");
            var need_fy = Number(api.open_fenyin);
            var cor;
            if (need_fy) {
                var fyin = String(hero_info.fyin).split('|');
                var now_fy = 0;
                for (var i in fyin) {
                    //封印详细数据
                    var unit = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", fyin[i]);
                    if (Number(hero.quality) >= Number(unit.condition)) {
                        if (hero.fy_skill[unit.id]) {
                            now_fy += Number(hero.fy_skill[unit.id].level);
                        }
                        else {
                            now_fy++;
                        }
                    }
                }
                // cor = now_fy < need_fy ? 0x969696 : 0x6B549E;
                cor = 0xFFFFFF;
                arr.push({
                    "bq": now_fy < need_fy ? "wdcfkuai_png" : "ydcfkuai_png",
                    "flow": [{ "text": mx.Lang.h0101, "style": { "textColor": cor } },
                        { "text": "【" + hero_info.hero_name + "】", "style": { "textColor": cor } },
                        { "text": mx.Tools.format(mx.Lang.h0106, need_fy), "style": { "textColor": cor } }
                    ]
                });
            }
            var flow1, flow2, flow3, res1, res2, res3;
            flow1 = [];
            flow2 = [];
            flow3 = [];
            res1 = res2 = res3 = true;
            for (var k in need_hero) {
                var n_hero = Number(need_hero[k]) == 0 ? hero : hproxy.get_hero_by_mid(need_hero[k]);
                var n_hero_api = void 0;
                if (!n_hero) {
                    res1 = res2 = res3 = false;
                    n_hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", need_hero[k]);
                    if (need_star[need_star.length - 1] != "0") {
                        flow1.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                    }
                    if (need_quality[need_quality.length - 1] != "0") {
                        flow2.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                    }
                    if (need_jiuzi[need_jiuzi.length - 1] != "0") {
                        flow3.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                    }
                    continue;
                }
                n_hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", n_hero.mid);
                if (Number(n_hero.mid) == Number(hero.mid)) {
                    var res = true;
                    if (Number(need_star[k]) > 0) {
                        res = Number(need_star[k]) > Number(n_hero.star);
                        cor = res ? 0x969696 : 0x6B549E;
                        arr.push({
                            "bq": res ? "wdcfkuai_png" : "ydcfkuai_png",
                            "flow": [{ "text": mx.Lang.h0101, "style": { "textColor": cor } },
                                { "text": "【" + hero_info.hero_name + "】", "style": { "textColor": cor } },
                                { "text": mx.Tools.format(mx.Lang.h0103, need_star[k]) + "【", "style": { "textColor": cor } },
                                { "text": n_hero.star + "", "style": { "textColor": res ? 0xFF4B4B : 0x6B549E } },
                                { "text": "/" + need_star[k] + "】", "style": { "textColor": cor } },
                            ]
                        });
                    }
                    if (Number(need_quality[k]) > 0) {
                        //品质
                        var color = mx.Tools.cal_quality_cor(Number(need_quality[k]));
                        res = Number(need_quality[k]) > Number(n_hero.quality);
                        cor = res ? 0x969696 : 0x6B549E;
                        arr.push({
                            "bq": res ? "wdcfkuai_png" : "ydcfkuai_png",
                            "flow": [{ "text": mx.Lang.h0101, "style": { "textColor": cor } },
                                { "text": "【" + hero_info.hero_name + "】", "style": { "textColor": cor } },
                                { "text": mx.Lang.h0102, "style": { "textColor": cor } },
                                { "text": mx.Lang.j0022[Number(need_quality[k]) - 1], "style": { "textColor": color } },
                            ]
                        });
                    }
                    if (Number(need_jiuzi[k]) != 0) {
                        res = Number(need_jiuzilv[k]) > Number(n_hero.nine_word[Number(need_jiuzi[k]) - 1]) - 1;
                        cor = res ? 0x969696 : 0x6B549E;
                        var t_t = Number(need_jiuzilv[k]) == 0 ? mx.Lang.h0107 : mx.Lang.h0104;
                        arr.push({
                            "bq": res ? "wdcfkuai_png" : "ydcfkuai_png",
                            "flow": [{ "text": mx.Lang.h0101, "style": { "textColor": cor } },
                                { "text": "【" + hero_info.hero_name + "】", "style": { "textColor": cor } },
                                { "text": mx.Tools.format(t_t, mx.Lang.h0092[Number(need_jiuzi[k]) - 1], need_jiuzilv[k]) + "【", "style": { "textColor": cor } },
                                { "text": Math.max(0, Number(n_hero.nine_word[Number(need_jiuzi[k]) - 1]) - 1) + "", "style": { "textColor": res ? 0xFF4B4B : 0x6B549E } },
                                { "text": "/" + Number(need_jiuzilv[k]) + "】", "style": { "textColor": cor } },
                            ]
                        });
                    }
                    continue;
                }
                if (Number(need_star[k]) > Number(n_hero.star)) {
                    res1 = false;
                    flow1.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                }
                else if (Number(k) <= need_star.length - 1 && Number(need_star[k]) > 0) {
                    flow1.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x6B549E } });
                }
                if (Number(need_quality[k]) > Number(n_hero.quality)) {
                    res2 = false;
                    flow2.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                }
                else if (Number(k) <= need_quality.length - 1 && Number(need_quality[k]) > 0) {
                    flow2.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x6B549E } });
                }
                if (Number(need_jiuzi[k]) != 0 && Number(need_jiuzilv[k]) > Number(n_hero.nine_word[Number(need_jiuzi[k]) - 1]) - 1) {
                    res3 = false;
                    flow3.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x969696 } });
                }
                else if (Number(need_jiuzi[k]) != 0) {
                    flow3.push({ "text": "【" + n_hero_api.hero_name + "】", "style": { "textColor": 0x6B549E } });
                }
            }
            if (flow1.length) {
                cor = res1 ? 0x6B549E : 0x969696;
                flow1.unshift({ "text": mx.Lang.h0101, "style": { "textColor": cor } });
                flow1.push({ "text": mx.Tools.format(mx.Lang.h0103, need_star[need_star.length - 1]), "style": { "textColor": cor } });
                arr.push({
                    "bq": res1 ? "ydcfkuai_png" : "wdcfkuai_png",
                    "flow": flow1,
                });
            }
            if (flow2.length) {
                cor = res2 ? 0x6B549E : 0x969696;
                var color = mx.Tools.cal_quality_cor(Number(need_quality[need_quality.length - 1]));
                flow2.unshift({ "text": mx.Lang.h0101, "style": { "textColor": cor } });
                flow2.push({ "text": mx.Lang.h0102, "style": { "textColor": cor } });
                flow2.push({ "text": mx.Lang.j0022[Number(need_quality[need_quality.length - 1]) - 1], "style": { "textColor": color } });
                arr.push({
                    "bq": res2 ? "ydcfkuai_png" : "wdcfkuai_png",
                    "flow": flow2,
                });
            }
            if (flow3.length) {
                cor = res3 ? 0x6B549E : 0x969696;
                flow3.unshift({ "text": mx.Lang.h0101, "style": { "textColor": cor } });
                var t_t = Number(need_jiuzilv[need_jiuzilv.length - 1]) == 0 ? mx.Lang.h0107 : mx.Lang.h0104;
                flow3.push({ "text": mx.Tools.format(t_t, mx.Lang.h0092[Number(need_jiuzi[need_jiuzi.length - 1]) - 1], need_jiuzilv[need_jiuzilv.length - 1]), "style": { "textColor": cor } });
                arr.push({
                    "bq": res3 ? "ydcfkuai_png" : "wdcfkuai_png",
                    "flow": flow3,
                });
            }
            return arr;
        };
        TeamZhenYanAlertMediator.prototype.fresh_index = function (id) {
            var cd = this.hero;
            var view = this.view;
            this.target = id + 1;
            view.xiaohao_g.visible = view.jh_g.visible = view.mj_g.visible = false;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIKAIQI, "hero_id", cd.mid, "jiuzi", id + 1);
            var target_id = Number(api.id);
            if (cd.nine_word[id] <= 0) {
                view.jh_g.visible = true;
                view.sx_p.source = "jzzyhui" + (Number(id) + 1) + "_png";
                if (mx.Tools.check_jiuzi(target_id)) {
                    view.jh_b.set_ssres("jzjhuo_png");
                }
                else {
                    view.jh_b.set_ssres("jzjhuohui_png");
                }
                view.att_t.text = "+0";
                view.hp_t.text = "+0";
                var res_arr = this.cal_res(target_id);
                view.kq_list.dataProvider = new eui.ArrayCollection(res_arr);
                var param = {
                    'num': 0,
                    "total": 5,
                    'res': 'gyse',
                    "gap": -6,
                    'align': egret.HorizontalAlign.LEFT
                };
                view.xji.init_multiui(param);
            }
            else {
                view.sx_p.source = "jzzy" + (Number(id) + 1) + "_png";
                var param = {
                    'num': cd.nine_word[id] - 1,
                    "total": 5,
                    'res': 'gyse',
                    "gap": -6,
                    'align': egret.HorizontalAlign.LEFT
                };
                view.xji.init_multiui(param);
                var add_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIADD, "type", id + 1);
                var add_lv = Math.min(add_api.max_level, cd.nine_word[id] - 1);
                view.att_t.text = "+" + (Number(add_api.EffectValue1) + add_lv * Number(add_api.GrowthValue1));
                view.hp_t.text = "+" + (Number(add_api.EffectValue2) + add_lv * Number(add_api.GrowthValue2));
                if (cd.nine_word[id] >= 6) {
                    view.mj_g.visible = true;
                    view.bq_p.source = "jzzybq" + (Number(id) + 1) + "_png";
                    if (Number(api.add_skill)) {
                        var skill_api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", api.add_skill);
                        view.skill_t.text = mx.Tools.format(api.desc, 0, skill_api.SC_name) + api.extra_add_num;
                        view.skill_p.source = "skill" + api.add_skill + "_png";
                        view.ts_t.left = view.skill_t.left = 90;
                    }
                    else {
                        view.skill_t.text = mx.Tools.format(api.desc, api.extra_add_num);
                        view.skill_p.source = "";
                        view.ts_t.left = view.skill_t.left = 18;
                    }
                }
                else {
                    view.xiaohao_g.visible = true;
                    var hero_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", api.hero_id);
                    var award_info = mx.ApiTool.getAPINodes(mx.MX_APINAME.JIUZICOST, "talent", hero_info.Talent, "type", id + 1);
                    var award = award_info[0];
                    for (var k in award_info) {
                        if (award_info[k].level == cd.nine_word[id]) {
                            award = award_info[k];
                            break;
                        }
                    }
                    var arr = [];
                    var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                    var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    var ybi = dproxy.get_currency("ybi");
                    view.ybi_t.text = award.yinbi_cost;
                    view.ybi_t.textColor = ybi >= Number(award.yinbi_cost) ? 0x6A539D : 0xFF4B4B;
                    arr.push({
                        "chicun": 60,
                        "di_size": 14,
                        "top": 62,
                        "width": 60,
                        "type": 4,
                        "id": hero_info.equip_id,
                        "shuliang": award.soul_cost,
                        "di_cor": 0x6A539D,
                        "no_num": true,
                        "show_getway": true,
                        "di_flow": [
                            { "text": "" + pproxy.get_item_num(hero_info.equip_id), "style": { "textColor": (pproxy.get_item_num(hero_info.equip_id) || 0) >= Number(award.soul_cost) ? 0x6A539D : 0xFF4B4B } },
                            { "text": "/" + award.soul_cost }
                        ]
                    });
                    var need_zb = award.equip_cost.split("|");
                    var need_num = award.equip_cost_num.split("|");
                    for (var t in need_zb) {
                        arr.push({
                            "chicun": 60,
                            "di_size": 14,
                            "top": 62,
                            "width": 60,
                            "type": 4,
                            "id": need_zb[t],
                            "shuliang": (need_num[t] || 0),
                            "di_cor": 0x6A539D,
                            "no_num": true,
                            "show_getway": true,
                            "getway_ctype": 3,
                            "di_flow": [
                                { "text": "" + pproxy.get_item_num(need_zb[t]), "style": { "textColor": pproxy.get_item_num(need_zb[t]) >= Number(need_num[t]) ? 0x6A539D : 0xFF4B4B } },
                                { "text": "/" + need_num[t] }
                            ]
                        });
                    }
                    view.xiaohao_list.dataProvider = new eui.ArrayCollection(arr);
                }
            }
        };
        TeamZhenYanAlertMediator.prototype.fun_click = function (e) {
            var view = this.view;
            switch (e.currentTarget) {
                case view.yl_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TeamZhenYanYLAlert.S_NAME, "param": this.hero.mid });
                    break;
                case view.tp_b:
                case view.jh_b:
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JIUZI_UP,
                        "id": this.target,
                        "h_id": this.hero.id
                    });
                    break;
                case view.smhp_b:
                    /*this.facade.sendNotification(MX_NOTICE.POP_VIEW, {
                        "name": HunpoZhuanhuaAlert.S_NAME,
                        "param": {
                            "mid": this.hero.mid,
                        }
                    });*/
                    break;
            }
        };
        TeamZhenYanAlertMediator.prototype.onTabChange = function (e) {
            this.fresh_index(e.item.id);
        };
        TeamZhenYanAlertMediator.NAME = "TeamZhenYanAlertMediator";
        return TeamZhenYanAlertMediator;
    }(puremvc.Mediator));
    mx.TeamZhenYanAlertMediator = TeamZhenYanAlertMediator;
    __reflect(TeamZhenYanAlertMediator.prototype, "mx.TeamZhenYanAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TeamZhenYanAlertMediator.js.map
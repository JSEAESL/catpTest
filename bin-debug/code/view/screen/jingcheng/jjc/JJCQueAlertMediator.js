/**
 *   @author cy
 *   @date 2017.3.13
 *   @desc jjc编队 Mediator
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
    var JJCQueAlertMediator = (function (_super) {
        __extends(JJCQueAlertMediator, _super);
        function JJCQueAlertMediator(viewComponent) {
            var _this = _super.call(this, JJCQueAlertMediator.NAME, viewComponent) || this;
            _this.type = "all";
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JJCQueAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JJCQueAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_QUE,
                mx.MX_NOTICE.HERO_SORT,
            ];
        };
        JJCQueAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_QUE:
                    if (data == "notype") {
                        this.set_fangyu();
                    }
                    break;
                case mx.MX_NOTICE.HERO_SORT:
                    view.hero_s.viewport.scrollV = 0;
                    this.fresh_data(data, "revert");
                    break;
            }
        };
        Object.defineProperty(JJCQueAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JJCQueAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.type_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.shangzhen, this);
            view.mine_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.xiazhen, this);
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwei_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_screen();
        };
        JJCQueAlertMediator.prototype.fresh_screen = function () {
            var view = this.view;
            var arr = [];
            var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var heros = hProxy.get_heroes_by_type("all", "team");
            switch (view.type) {
                case 1:
                    var lProxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
                    var lenemy_zl = 0;
                    for (var j = 0; j < heros.length; j++) {
                        if (lProxy.fangyu_que.indexOf(Number(heros[j].id)) >= 0) {
                            var t = heros[j];
                            var obj = {
                                "mid": t.mid,
                                "quality": t.quality,
                                "level": t.level,
                                "star": t.star,
                                "notype": true,
                                "di_cor": 0x6e57a3,
                                "di_size": 16,
                                "width": 90
                            };
                            arr.push(obj);
                            lenemy_zl += mx.FightTools.cal_fight_power(t);
                        }
                    }
                    arr.reverse();
                    view.zli_t0.text = "" + lenemy_zl;
                    view.target.source = "yybdzli_png";
                    view.tzdl_b.label = "bdqding_png";
                    this.team_id = 12;
                    break;
                case 2:
                    var fenemy_zl = 0;
                    for (var j = 0; j < heros.length; j++) {
                        if (this.proxy.fangyu_que.indexOf(Number(heros[j].id)) >= 0) {
                            var t = heros[j];
                            var obj = {
                                "mid": t.mid,
                                "quality": t.quality,
                                "level": t.level,
                                "star": t.star,
                                "notype": true,
                                "di_cor": 0x6e57a3,
                                "di_size": 16,
                                "width": 90
                            };
                            arr.push(obj);
                            fenemy_zl += mx.FightTools.cal_fight_power(t);
                        }
                    }
                    arr.reverse();
                    view.zli_t0.text = "" + fenemy_zl;
                    view.target.source = "yybdzli_png";
                    view.tzdl_b.label = "bdqding_png";
                    view.zwei_b.visible = true;
                    this.team_id = 11;
                    break;
                case 3:
                    var proxy = this.proxy;
                    var enemy = proxy.cur_enemy.query;
                    var enemy_zl = this.calculate_zhanli(proxy.cur_enemy);
                    for (var k in enemy) {
                        var temp = enemy[k].hero_info;
                        var obj = {};
                        obj.mid = temp.did;
                        obj.quality = temp.quality;
                        obj.level = temp.level;
                        obj.star = temp.star;
                        obj.notype = true;
                        obj.di_cor = 0x6e57a3;
                        obj.di_size = 16;
                        obj.width = 90;
                        arr.push(obj);
                    }
                    view.zli_t0.text = "" + enemy_zl;
                    view.target.source = "dfbdzli_png";
                    view.tzdl_b.label = "jjbdzdou_png";
                    view.zwei_b.visible = true;
                    this.team_id = 1;
                    break;
            }
            view.enemy_list.dataProvider = new eui.ArrayCollection(arr);
            view.sort_g.visible = view.sort_g.touchEnabled = view.rect.touchEnabled = view.rect.visible = false;
            var buzhen = hProxy.get_buzhen(this.team_id);
            if (!buzhen) {
                buzhen = {};
                var proxy = this.proxy;
                var hProxy_1 = this.facade.retrieveProxy(mx.HeroProxy.NAME);
                var heros_1 = hProxy_1.get_heroes_by_type("all", "team");
                var arr_1 = [];
                var zli = 0;
                var c_team = [];
                switch (view.type) {
                    case 1:
                        var lProxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
                        c_team = lProxy.fangyu_que;
                        break;
                    case 2:
                        c_team = proxy.fangyu_que;
                        break;
                    case 3:
                        c_team = hProxy_1.teams[hProxy_1.fight_id];
                        break;
                }
                for (var i in c_team) {
                    var hero = hProxy_1.get_chero_info(c_team[i]);
                    buzhen[Number(i) + 1] = hero.mid;
                }
                buzhen[6] = null;
                hProxy_1.set_buzhen(buzhen, this.team_id);
            }
            this.set_fangyu();
            this.fresh_data("ALL");
        };
        JJCQueAlertMediator.prototype.set_fangyu = function () {
            var view = this.view;
            var proxy = this.proxy;
            var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var heros = hProxy.get_heroes_by_type("all", "team");
            var arr = [];
            var zli = 0;
            var c_team = [];
            switch (view.type) {
                case 1:
                    var lProxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
                    c_team = lProxy.fangyu_que;
                    break;
                case 2:
                    c_team = proxy.fangyu_que;
                    break;
                case 3:
                    c_team = hProxy.teams[hProxy.fight_id];
                    break;
            }
            for (var j = 0; j < heros.length; j++) {
                var obj = {};
                if (c_team.indexOf(Number(heros[j].id)) >= 0) {
                    obj.mid = heros[j].mid;
                    obj.id = heros[j].id;
                    obj.quality = heros[j].quality;
                    obj.level = heros[j].level;
                    obj.star = heros[j].star;
                    obj.notype = true;
                    obj.skill_level = heros[j].skill_level;
                    obj.equip = heros[j].equip;
                    obj.exp = heros[j].exp;
                    obj.skills = heros[j].skills;
                    obj.di_cor = 0x6e57a3;
                    obj.di_size = 16;
                    obj.width = 90;
                    obj.fy_skill = heros[j].fy_skill;
                    arr.push(obj);
                    var d = arr[arr.length - 1];
                    if (typeof d.equip == 'string') {
                        d.equip = JSON.parse(d.equip);
                    }
                    var cd = heros[j];
                    if (typeof cd.skills == "undefined") {
                        var skills = [];
                        var skill = {};
                        if (cd.skill_level != "") {
                            skill = JSON.parse(cd.skill_level);
                        }
                        var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, "CasterID", cd.mid);
                        for (var m in apis) {
                            if (cd.star >= Number(apis[m].Unlock) || skill[Number(apis[m].skill_id)]) {
                                var skill_id = Number(apis[m].skill_id);
                                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", skill_id);
                                var skill_level = Number(api.InitLevel);
                                for (var k in skill) {
                                    if (Number(k) == skill_id) {
                                        skill_level += Number(skill[k]);
                                        break;
                                    }
                                }
                                skills.push({
                                    "skill_id": skill_id,
                                    "skill_level": skill_level
                                });
                            }
                        }
                        var ln = skills.length;
                        if (typeof skills[ln - 1].wake == "undefined") {
                            skills[ln - 1].wake = 0;
                        }
                        cd.skills = mx.Tools.arr2obj(skills, "skill_id");
                    }
                    zli += mx.FightTools.cal_fight_power(d);
                }
            }
            view.zli_t.text = zli + '';
            arr.reverse();
            view.mine_list.dataProvider = new eui.ArrayCollection(arr);
            this.mine_team = arr;
        };
        JJCQueAlertMediator.prototype.fresh_data = function (type, style) {
            var view = this.view;
            this.type = type;
            //view.type_b.set_ssres("qbscong_png");
            var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_arr = hProxy.get_heroes_by_type(type, "team");
            var arr2 = [];
            for (var j in c_arr) {
                var obj = {};
                for (var t in c_arr[j]) {
                    obj[t] = c_arr[j][t];
                }
                obj.jjc_cz = false;
                obj.di_cor = 0x6e57a3;
                obj.di_size = 16;
                obj.width = 90;
                for (var k in this.mine_team) {
                    if (Number(this.mine_team[k].mid) == Number(c_arr[j].mid)) {
                        obj.jjc_cz = true;
                        break;
                    }
                }
                arr2.push(obj);
            }
            var scrollV = style ? 0 : view.hero_s.viewport.scrollV;
            view.hero_list.dataProvider = new eui.ArrayCollection(arr2);
            view.hero_list.validateNow();
            view.hero_s.viewport.scrollV = Math.max(0, scrollV);
            view.num_t.text = mx.Lang.jjc16 + this.mine_team.length + "/" + c_arr.length;
            var arr = ["ALL", "STRENGTH", "AGILITY", "INTELLIGENCE"];
            var aid = arr.indexOf(type);
            var source = ["qbscong_png", "qpscong_png", "zpscong_png", "hpscong_png"];
            view.shicong_t.text = mx.Lang.te004[aid];
        };
        JJCQueAlertMediator.prototype.shangzhen = function (e) {
            var view = this.view;
            var hero = e.item;
            for (var k in this.mine_team) {
                if (Number(this.mine_team[k].mid) == Number(hero.mid)) {
                    this.xiazhen(e);
                    return;
                }
            }
            if (this.mine_team.length < 5) {
                var obj = {};
                obj.mid = hero.mid;
                obj.id = hero.id;
                obj.quality = hero.quality;
                obj.level = hero.level;
                obj.star = hero.star;
                obj.notype = true;
                obj.skill_level = hero.skill_level;
                obj.equip = hero.equip;
                obj.exp = hero.exp;
                obj.skills = hero.skills;
                obj.di_cor = 0x6e57a3;
                obj.di_size = 16;
                obj.width = 90;
                this.mine_team.push(obj);
                this.mine_team = this.mine_team.sort(function (a, b) {
                    var x = a.mid;
                    if (a.mid) {
                        x = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", a.mid).enmity_priority;
                    }
                    var y = b.mid;
                    if (b.mid) {
                        y = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", b.mid).enmity_priority;
                    }
                    return x - y; //按层级关系排序
                });
                view.mine_list.dataProvider = new eui.ArrayCollection(this.mine_team);
                var zli = 0;
                for (var k in this.mine_team) {
                    zli += mx.FightTools.cal_fight_power(this.mine_team[k]);
                }
                view.zli_t.text = zli + '';
                this.fresh_data(this.type);
                var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                var buzhen = hproxy.get_buzhen(this.team_id);
                for (var i in buzhen) {
                    if (!buzhen[i]) {
                        buzhen[i] = hero.mid;
                        break;
                    }
                }
                for (var i = 1; i < 7; ++i) {
                    if (!buzhen[i]) {
                        buzhen[i] = null;
                    }
                }
                hproxy.set_buzhen(buzhen, this.team_id);
            }
        };
        JJCQueAlertMediator.prototype.xiazhen = function (e) {
            var view = this.view;
            var hero = e.item;
            var zli = 0;
            for (var k in this.mine_team) {
                if (Number(this.mine_team[k].mid) == Number(hero.mid)) {
                    this.mine_team.splice(k, 1);
                    break;
                }
            }
            for (var i in this.mine_team) {
                zli += mx.FightTools.cal_fight_power(this.mine_team[i]);
            }
            view.mine_list.dataProvider = new eui.ArrayCollection(this.mine_team);
            view.zli_t.text = zli + '';
            var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var buzhen = hproxy.get_buzhen(this.team_id);
            for (var i in buzhen) {
                if (Number(buzhen[i]) == Number(hero.mid)) {
                    buzhen[i] = null;
                    break;
                }
            }
            for (var i = 1; i < 7; ++i) {
                if (!buzhen[i]) {
                    buzhen[i] = null;
                }
            }
            hproxy.set_buzhen(buzhen, this.team_id);
            this.fresh_data(this.type);
        };
        JJCQueAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.type_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.mine_list.dataProvider = null;
            view.hero_list.dataProvider = null;
            view.enemy_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.shangzhen, this);
            view.mine_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.xiazhen, this);
            view.zwei_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCQueAlertMediator.prototype.calculate_zhanli = function (data) {
            var zli = 0;
            var obj = {};
            for (var k in data.query) {
                var hero = data.query[k];
                obj.equip = hero.equip;
                obj.level = hero.hero_info.level;
                obj.mid = hero.hero_info.did;
                obj.quality = hero.hero_info.quality;
                obj.star = hero.hero_info.star;
                obj.skills = hero.skill;
                for (var t in hero.battle_soul) {
                    if (typeof hero.battle_soul[t].level == "undefined") {
                        hero.battle_soul[t] = { "level": hero.battle_soul[t] };
                    }
                }
                obj.fy_skill = hero.battle_soul;
                var nine_word = hero.nine_word || [0, 0, 0, 0, 0, 0, 0, 0, 0];
                zli += mx.FightTools.cal_fight_power(obj, null, data.dress, data.all_mid, nine_word);
            }
            return zli;
        };
        JJCQueAlertMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.rect:
                    view.sort_g.visible = view.sort_g.touchEnabled = view.rect.touchEnabled = view.rect.visible = false;
                    break;
                case view.type_b://
                    view.sort_g.visible = view.sort_g.touchEnabled = view.rect.touchEnabled = view.rect.visible = !view.sort_g.visible;
                    break;
                case view.tzdl_b://
                    var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
                    var arr = [];
                    if (this.mine_team.length) {
                        for (var k in this.mine_team) {
                            arr.push(this.mine_team[k].id);
                        }
                        if (mx.AppConfig.MXTag == 'wb') {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_PAIHANG_QQ });
                        }
                        var buzhen = hProxy.get_buzhen(this.team_id);
                        for (var i = 1; i < 7; ++i) {
                            if (!buzhen[i]) {
                                buzhen[i] = null;
                            }
                        }
                        var facade = mx.ApplicationFacade.getInstance();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_BUZHEN_INFO,
                            "team_id": this.team_id,
                            "zhanwei": JSON.stringify(buzhen)
                        });
                        switch (view.type) {
                            case 1:
                                var lproxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
                                if (lproxy.lueduo_flag) {
                                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                        "t": mx.MX_NETS.CS_JJC_SETTEAM,
                                        "team_id": 12,
                                        "team": arr.join("|"),
                                        "muban": lproxy.fangyu_que_muban,
                                        "type": 1
                                    });
                                }
                                break;
                            case 2:
                                var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
                                if (jproxy.jj_flag) {
                                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                        "t": mx.MX_NETS.CS_JJC_SETTEAM,
                                        "team_id": hProxy.s_id,
                                        "team": arr.join("|"),
                                        "muban": jproxy.fangyu_que_muban
                                    }); //发送网络请求
                                }
                                break;
                            case 3:
                                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_SAVE_QUEUE,
                                    "team_id": hProxy.fight_id,
                                    "team": arr.join("|"),
                                }); //发送网络请求
                                break;
                        }
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "param": mx.Lang.h00350,
                            },
                        });
                    }
                    break;
                case view.zwei_b:
                    var temp = [];
                    for (var i in this.mine_team) {
                        temp.push(this.mine_team[i].id);
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FightBuzhenView.S_NAME, "param": { "team": temp, "team_id": this.team_id } });
                    break;
            }
        };
        JJCQueAlertMediator.NAME = "JJCQueAlertMediator";
        return JJCQueAlertMediator;
    }(puremvc.Mediator));
    mx.JJCQueAlertMediator = JJCQueAlertMediator;
    __reflect(JJCQueAlertMediator.prototype, "mx.JJCQueAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JJCQueAlertMediator.js.map
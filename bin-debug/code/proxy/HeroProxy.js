/**
*   @author mx
*   @date 2015.2.25
*   @desc 英雄(美男)-团队管理
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
    var HeroProxy = (function (_super) {
        __extends(HeroProxy, _super);
        function HeroProxy() {
            var _this = _super.call(this, HeroProxy.NAME) || this;
            _this.chuzhan_zl = 0;
            _this.teams = [];
            _this.s_id = 1;
            _this.fight_id = 0;
            //许愿
            _this.jinli_num = 0;
            _this.xuyuan_lv = 1;
            _this.xuyuan_exp = 0;
            _this.xuyuan_energe = 0;
            _this.pjcy_flag = false;
            _this._buzhen = {};
            return _this;
        }
        HeroProxy.prototype.init_hero_list = function (data) {
            this.fight_ids = data.fight;
            this.heroes = mx.Tools.arr2obj(data.data, "id");
            for (var i in this.heroes) {
                this.init_fy_skill(i);
            }
        };
        HeroProxy.prototype.cal_chuzhan_zhanli = function () {
            var old_zl = this.chuzhan_zl;
            if (this.teams[1]) {
                this.chuzhan_zl = this.get_fightPower(this.teams[1]);
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH, 'zl': this.chuzhan_zl });
        };
        HeroProxy.prototype.init_fy_skill = function (id) {
            return;
            var unit = this.heroes[id];
            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", unit.mid);
            if (!info) {
                console.log(mx.Lang.h0011);
                return;
            }
            var fyin = info.fyin.split('|');
            this.heroes[id].fy_skill = {};
            this.heroes[id].battle_soul = unit.battle_soul == "" ? "" : JSON.parse(unit.battle_soul);
            for (var i in fyin) {
                var arr = [];
                if (unit.battle_soul[fyin[i]]) {
                    arr = unit.battle_soul[fyin[i]].split('|');
                    arr[0] = Number(arr[0]) + 1;
                }
                else {
                    var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", fyin[i]);
                    arr = Number(unit.quality) < Number(temp.condition) ? [0, 0] : [1, 0];
                }
                this.heroes[id].fy_skill[fyin[i]] = { "level": Number(arr[0]), "jindu": Number(arr[1]) };
            }
        };
        HeroProxy.prototype.check_fy_skill = function (id) {
            var unit = this.heroes[id];
            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", unit.mid);
            var fyin = info.fyin.split('|');
            this.heroes[id].fy_skill = {};
            for (var i in fyin) {
                var arr = [];
                if (unit.battle_soul[fyin[i]]) {
                    arr = unit.battle_soul[fyin[i]].split('|');
                    arr[0] = Number(arr[0]) + 1;
                }
                else {
                    var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", fyin[i]);
                    arr = Number(unit.quality) < Number(temp.condition) ? [0, 0] : [1, 0];
                }
                this.heroes[id].fy_skill[fyin[i]] = { "level": Number(arr[0]), "jindu": Number(arr[1]) };
            }
        };
        //只需初始化一次，避免数据拥挤，延迟至打开团队时处理
        HeroProxy.prototype.init_team_info = function () {
            if (!this.heroes) {
                return;
            }
            for (var k in this.heroes) {
                var c_h = this.heroes[k];
                if (c_h.ef) {
                    break;
                }
                if (typeof c_h.equip == "string") {
                    c_h.equip = JSON.parse(c_h.equip);
                }
                else {
                    c_h.equip = c_h.equip;
                }
                this.check_hero_ef(c_h); //检查是否需要动画提示,num
            }
        };
        //检查英雄是否有可操作功能，id:英雄id，type：需要校验的类型
        HeroProxy.prototype.check_hero_ef = function (c_hero, type) {
            var ret = [0, 0, 0];
            var check = true;
            if (typeof type != "undefined") {
                ret = c_hero.ef;
                ret[type] = 0;
                check = false;
            }
            if (check || type == 0) {
                var arr = c_hero.equip_info;
                var epnum = 0;
                var flag = true;
                var target = 0;
                var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                var user_lv = gProxy.user_lv;
                for (var k in arr) {
                    var c_item = arr[k];
                    if (c_item.etype == 2 || c_item.etype == 3) {
                        epnum = 10;
                        break;
                    }
                    else if (c_item.etype == 0) {
                        epnum++;
                    }
                    else if (c_item.etype == 5 || c_item.etype == 6) {
                        // epnum++;
                        var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", c_item.id);
                        var zblv = zb ? Number(zb.LevelRequirement) : 100;
                        if (target < zblv) {
                            target = zblv;
                        }
                    }
                }
                if (user_lv < target) {
                    flag = false;
                }
                else if (target >= 2) {
                    var b_exp = [60, 300, 1500, 7500]; //道具经验值
                    var b_ids = [169, 218, 290, 440]; //道具id
                    var b_item = []; //自己拥有数量
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    for (var a = 0; a < 4; a++) {
                        b_item[a] = pProxy.get_item_num(b_ids[a]);
                    }
                    var cd = c_hero;
                    var level = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", target - 1);
                    var need = Number(level.hero_exp) - Number(cd.exp); //需要的经验值
                    var need_l = need; //缺少的经验值
                    var pre = [];
                    //预计算需要哪些物品
                    for (var i = 0; i < 4; i++) {
                        need_l -= b_exp[i] * b_item[i];
                        pre.push(b_item[i]);
                        if (need_l <= 0) {
                            break;
                        }
                    }
                    if (need_l > 0) {
                        flag = false;
                    }
                }
                if (epnum >= 10 || (epnum >= 6 && flag)) {
                    ret[0] = epnum;
                }
            }
            if (check || type == 1) {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                if (gproxy.user_lv >= 7 && this.c_skill_info.num) {
                    var cskills = c_hero.skills;
                    if (cskills) {
                        for (var k in cskills) {
                            var cskill = cskills[k];
                            var hlv = Number(c_hero.level);
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", cskill.skill_id);
                            if (api) {
                                var stype = api.SkillName.split("_")[1];
                                if (stype == 'atk') {
                                    continue;
                                }
                                if (Number(cskill.skill_level) > hlv || api.Unlock > Number(c_hero.star)) {
                                    continue;
                                }
                                //过滤没开启的觉醒技能
                                if (typeof cskill.wake != "undefined" && !Number(cskill.wake)) {
                                    continue;
                                }
                                var skill_level = Number(cskill.skill_level) + Number(api.InitLevel) - 1;
                                if (skill_level < hlv) {
                                    ret[1] = 1;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (check || type == 2) {
                var c_star = Number(c_hero.star);
                if (c_star < mx.MX_COMMON.HP_LEVEL) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", c_star + 1);
                    var need = Number(api.Up_Fragments || 0);
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", c_hero.mid);
                    if (api2) {
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        var now = pProxy.get_item_num(api2.equip_id);
                        if (now >= need) {
                            ret[2] = 1;
                        }
                    }
                }
            }
            /*if (check || type == 3) {//检查九字真言
                let jiuzi = c_hero.nine_word;
                let jiuzi_api;
                for (let k in jiuzi) {
                    if (Number(jiuzi[k]) == 0) {
                        jiuzi_api = ApiTool.getAPINode(MX_APINAME.JIUZIKAIQI, "hero_id", c_hero.mid, "jiuzi", Number(k) + 1);
                        if (Tools.check_jiuzi(jiuzi_api.id)) {
                            ret[3] = 1;
                            break;
                        }
                    }
                }

            }*/
            ret = [0, 0, 0, 0];
            c_hero.ef = ret;
        };
        HeroProxy.prototype.check_equip_state = function (temp, mnlv) {
            var zbei = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", temp);
            var zblv = zbei ? zbei.LevelRequirement : 100;
            var zbhc = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", String(temp));
            if (zblv > mnlv) {
                return zbhc ? 5 : 6; //5:可合成装备，但不满足合成条件,6:不可合成装备
            }
            else {
                var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                var xx = pProxy.get_item_num(temp);
                if (xx) {
                    return 2;
                }
                else {
                    if (this.check_hecheng(temp)) {
                        return 3; //可合成装备，并且满足合成条件。
                    }
                    else {
                        return zbhc ? 1 : 4; //1:可合成装备，但不满足合成条件,4:不可合成装备
                    }
                }
            }
        };
        HeroProxy.prototype.check_hecheng = function (x) {
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", String(x));
            var res = false;
            if (!zb) {
                return false;
            }
            else {
                for (var i = 1; i <= 4; i++) {
                    var component = Number(zb["Component" + i]);
                    var num = Number(zb["Component" + i + "Count"]);
                    if (component == 0) {
                        continue;
                    }
                    if (num == 0) {
                        if (pProxy.get_item_num(component) < 1) {
                            res = this.check_hecheng(component);
                        }
                        else {
                            res = true;
                        }
                    }
                    else {
                        if (pProxy.get_item_num(component) < num) {
                            res = this.check_hecheng(component);
                            if (!res) {
                                break;
                            }
                        }
                        else {
                            res = true;
                        }
                    }
                }
            }
            return res;
        };
        HeroProxy.prototype.add_new_hero = function (data) {
            var c_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
            var c_h = {
                "id": data.id,
                "mid": data.mid + "",
                "exp": data.exp,
                "star": data.star,
                "level": data.level,
                "quality": data.quality,
                "equip": data.equip,
                "skills": mx.Tools.arr2obj(data.skill, "skill_id"),
                "battle_soul": data.battle_soul,
                "nine_word": [0, 0, 0, 0, 0, 0, 0],
                //追加的客户端需要的2个属性
                "equip_info": [],
                "ef": [0, 0, 0],
                "new": true,
            };
            this.heroes[data.id] = c_h;
            this.init_fy_skill(data.id);
            //发系统消息
            var obj = {
                "type": 2,
                "mid": data.mid
            };
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH });
            mx.WebTool.getInstance().web_msg(obj, mx.MX_WEB_CONST.MX_WEB_CT_SYS);
            var num = mx.Tools.obj2arr(this.heroes).length;
            mx.DataTool.getInstance().set_QQ_Score(1005, num);
            //加到后宫
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.add_new_fz(data.feizi);
        };
        HeroProxy.prototype.get_heroes_by_type = function (type, screen) {
            if (screen) {
                this._teamtype = type;
            }
            var heroes = this.heroes;
            var arr = [];
            for (var k in heroes) {
                var c_h = heroes[k];
                c_h.chicun = 120;
                var c_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", c_h.mid);
                switch (type) {
                    case "INTELLIGENCE": //辅助
                    case "STRENGTH": //攻击
                    case "AGILITY"://守御
                        if (c_base.HeroType != type) {
                            continue;
                        }
                        break;
                    case "FRONT_ROW": //前方
                    case "REAR_ROW": //后方
                    case "MIDDLE_ROW"://中方
                        if (c_base.PositionType != type) {
                            continue;
                        }
                        break;
                    default:
                        break;
                }
                arr.push(c_h);
            }
            arr = this.sort_hero(arr);
            return arr;
        };
        HeroProxy.prototype.sort_hero = function (c_arr) {
            var team = this.teams[1];
            var arr2 = []; //未上阵
            var team_arr = []; //已上阵
            var new_arr = []; //新获得
            var arr;
            for (var k in c_arr) {
                arr = arr2;
                var obj = c_arr[k];
                if (obj.new) {
                    arr = new_arr;
                }
                for (var j in team) {
                    if (Number(team[j]) == Number(c_arr[k].id)) {
                        arr = team_arr;
                        break;
                    }
                }
                arr.push(obj);
            }
            arr = team_arr.sort(function (a, b) {
                var x = a.mid;
                if (a.mid) {
                    x = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", a.mid).enmity_priority;
                }
                var y = b.mid;
                if (b.mid) {
                    y = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", b.mid).enmity_priority;
                }
                return y - x;
            });
            arr = arr.concat(new_arr);
            arr2 = arr2.sort(function (a, b) {
                var x = Number(a.level);
                var y = Number(b.level);
                if (x == y) {
                    x = Number(a.quality);
                    y = Number(b.quality);
                }
                return y - x;
            });
            arr = arr.concat(arr2);
            return arr;
        };
        //获取编队候选英雄，过滤已在当前编队的英雄
        HeroProxy.prototype.get_heroes_except = function (list) {
            var heroes = this.heroes;
            var arr = [];
            for (var k in heroes) {
                var c_h = heroes[k];
                if (list.indexOf(Number(k)) < 0) {
                    arr.push(c_h);
                }
            }
            return arr;
        };
        HeroProxy.prototype.get_chero_info = function (hid) {
            var id = hid || this._chid;
            return this.heroes[id] || null;
        };
        HeroProxy.prototype.next_hero_mid = function (num) {
            var arr = this.get_heroes_by_type(this._teamtype);
            var ln = arr.length;
            var cd = this.get_chero_info();
            var index = arr.indexOf(cd);
            var now = (index + num + ln) % ln;
            return arr[now].mid;
        };
        HeroProxy.prototype.fresh_hero = function (num) {
            var arr = this.get_heroes_by_type(this._teamtype);
            var ln = arr.length;
            var cd = this.get_chero_info();
            var index = arr.indexOf(cd);
            var now = (index + num + ln) % ln;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_CHERO_INFO,
                "id": arr[now].id,
            });
        };
        HeroProxy.prototype.init_chero_info = function (data) {
            var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
            if (jproxy.jj_flag) {
                var h_info = data.hero_info;
                var c_hero = {
                    "id": data.id,
                    "mid": h_info.did,
                    "star": h_info.star,
                    "level": Number(h_info.level),
                    "quality": h_info.quality,
                    "exp": data.exp,
                    "equip": data.equip,
                    "skills": mx.Tools.arr2obj(data.skill, "skill_id"),
                    "la": Number(data.yuehui),
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeroInfoView.S_NAME,
                    "param": {
                        "hero": c_hero,
                        "type": 'haveget',
                        "need": 0,
                        "now": 0
                    },
                });
            }
            else {
                if (data.state = 1) {
                    this._chid = data.id;
                    var h_info = data.hero_info;
                    var c_hero = {
                        "id": data.id,
                        "mid": h_info.did,
                        "star": h_info.star,
                        "level": Number(h_info.level),
                        "quality": h_info.quality,
                        "exp": data.exp,
                        "equip": data.equip,
                        "skills": mx.Tools.arr2obj(data.skill, "skill_id"),
                        "la": Number(data.yuehui),
                        "battle_soul": h_info.battle_soul,
                        "nine_word": h_info.nine_word,
                    };
                    var old_info = this.heroes[c_hero.id];
                    if (old_info.zb_record) {
                        c_hero["zb_record"] = old_info.zb_record;
                    }
                    this.check_hero_ef(c_hero); //检查是否需要动画提示,num
                    this.heroes[c_hero.id] = c_hero;
                    this.heroes[c_hero.id].new = false;
                    this.init_fy_skill(data.id);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeroTrainScreen.S_NAME);
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0007 });
                }
            }
        };
        //灵魂石兑换新英雄
        HeroProxy.prototype.chero_lhsdh_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://已經擁有英雄
                    str = mx.Lang.h0020;
                    break;
                case 1://不存在這個英雄
                    str = mx.Lang.h0021;
                    break;
                case 2://靈魂石不足
                    str = mx.Lang.h0008;
                    break;
                case 3://銀幣不足
                    str = mx.Lang.h0009;
                    break;
                case 4://data.mid//显示新英雄 
                    //扣除消耗的碎片
                    var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
                    var need = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", hero.InitialStars);
                    var xiaohao = [{ "item_id": hero.equip_id, "num": need.Summon_Fragments }];
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.xiaohao_item(xiaohao);
                    //刷新兌換界面   
                    if (data.mid == 57 && mx.AppConfig.CURR_SCENE_ID == mx.MainScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CEFENG_WEIFEN,
                            "mid": 57,
                            "weifen": 13,
                            "tab": 1,
                            "type": 1
                        });
                        return;
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XXiuHeroAlert.S_NAME,
                        "param": {
                            "id": data.mid,
                        }
                    });
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.TeamDHScreen.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroInfoView.S_NAME);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.reset_dh_info = function () {
            var can = false;
            var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            var h_hero = this.heroes;
            var arr = [];
            for (var k in h_hero) {
                arr.push(h_hero[k].mid);
            }
            var arr2 = [];
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.HERO);
            for (var k in api) {
                var c_a = api[k];
                if (arr.indexOf(c_a.id + "") > -1 || !c_a.equip_id) {
                    continue;
                }
                var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", c_a.InitialStars);
                var now = pproxy.get_item_num(c_a.equip_id);
                var need = Number(api2.Summon_Fragments || 0);
                arr2.push({
                    "id": c_a.id,
                    "name": c_a.hero_name,
                    "htype": c_a.HeroType,
                    "eid": c_a.equip_id,
                    "now": now,
                    "need": need,
                    "coin": api2.Summon_Price,
                });
                if (!can && now >= need) {
                    can = true;
                }
            }
            arr2.sort(function (a, b) {
                var x; //a
                var y; //b
                x = a.id;
                y = b.id;
                var des1 = a.need - a.now;
                var des2 = b.need - b.now;
                if (des1 <= 0 && des2 <= 0) {
                    return x - y;
                }
                else if (des1 > 0 && des2 > 0) {
                    return b.now - a.now;
                }
                else {
                    return des1 <= 0 ? -1 : 1;
                }
            });
            this.dh_info = arr2;
            return can;
        };
        //穿戴装备回调
        HeroProxy.prototype.chero_equip_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://无指定英雄
                    str = mx.Lang.h0000;
                    break;
                case 1://无指定物品
                    str = mx.Lang.h0001;
                    break;
                case 2://不可以装备
                    str = mx.Lang.h0002;
                    break;
                case 3://成功
                    str = mx.Lang.h0003;
                    break;
                case 4:
                    var chero = this.heroes[data.id];
                    chero.equip = data.has_equip;
                    //消耗一件装备
                    var xiaohao = [{ "item_id": data.equip, "num": 1 }];
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.xiaohao_item(xiaohao);
                    //刷新界面
                    this.check_hero_ef(chero, 0);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "zb" });
                    if (mx.MX_COMMON.IN_GUIDE == 1) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    return;
                case 5://等级不足
                    str = mx.Lang.h0016;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.chero_uppz_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://无指定英雄
                    str = mx.Lang.h0000;
                    break;
                case 1://已经到达最高品质
                    str = mx.Lang.h0005;
                    break;
                case 2://装备未集满
                    str = mx.Lang.h0006;
                    break;
                case 3://成功
                    var chero = this.heroes[data.id];
                    var xiaohao = [];
                    var need = data.need;
                    var oldshuxing = mx.FightTools.cal_hero_prop(this.get_chero_info(), 1);
                    var oldhp = oldshuxing["HP"];
                    var oldzl = mx.FightTools.cal_fight_power(this.get_chero_info());
                    if (need) {
                        if (data.hero_info.exp) {
                            chero.exp = data.hero_info.exp;
                        }
                        chero.level = data.hero_info.level;
                        for (var k in need) {
                            if (k == "yinbi") {
                                var Dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                                var ybi = Dproxy.get_currency("ybi");
                                Dproxy.set_currency("ybi", ybi - need[k]);
                            }
                            else {
                                xiaohao.push({
                                    "item_id": k,
                                    "num": need[k],
                                });
                            }
                        }
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        pProxy.xiaohao_item(xiaohao);
                    }
                    chero.quality = data.hero_info.quality;
                    //chero.skills = Tools.arr2obj(data.skill, "skill_id");
                    chero.equip = data.equip;
                    chero.zb_weizhi = -1;
                    chero.zb_record = null;
                    this.check_hero_ef(chero);
                    var newshuxing = mx.FightTools.cal_hero_prop(this.get_chero_info(), 1);
                    var newhp = newshuxing["HP"];
                    var newzl = mx.FightTools.cal_fight_power(this.get_chero_info());
                    this.check_fy_skill(data.id);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, {
                        "type": "sjie",
                        "param": {
                            "oldhp": oldhp,
                            "oldzl": oldzl,
                            "newhp": newhp,
                            "newzl": newzl
                        },
                    });
                    return;
                case 4://女王等级不足
                    str = mx.Lang.h0077;
                    break;
                case 5://升级道具不足
                    str = mx.Lang.h0078;
                    break;
                case 6://银币不足
                    str = mx.Lang.p0036;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        //英雄升星回调
        HeroProxy.prototype.chero_upxx_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://无指定英雄
                    str = mx.Lang.h0000;
                    break;
                case 1://已经到达最高星级
                    str = mx.Lang.h0007;
                    break;
                case 2://没有足够灵魂石
                    str = mx.Lang.h0008;
                    break;
                case 3://没有足够银币
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    return;
                case 4://成功
                    var chero = this.heroes[data.id];
                    this.heroes[data.id].star = parseInt(chero.star) + 1;
                    this.heroes[data.id].skills = mx.Tools.arr2obj(data.skill, "skill_id");
                    //扣除消耗的灵魂石
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", chero.star);
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", chero.mid);
                    var xiaohao = [{
                            "item_id": api2.equip_id,
                            "num": api.Up_Fragments || 0,
                        }];
                    api = null;
                    api2 = null;
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.xiaohao_item(xiaohao);
                    this.check_hero_ef(chero, 2);
                    this.check_hero_ef(chero, 3);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "sx" });
                    if (mx.MX_COMMON.IN_GUIDE == 2) {
                        this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.chero_uplv_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://无指定英雄
                    str = mx.Lang.h0000;
                    break;
                case 1://level参数错误
                    str = mx.Lang.h0018;
                    break;
                case 2://没有足够经验道具
                    str = mx.Lang.h0019;
                    break;
                case 3://成功，扣除消耗的物品，刷新界面
                    str = mx.Lang.h0071;
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.xiaohao_item(data.xiaohao);
                    var chero = this.heroes[this._chid];
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 6, "add": data.hero_info.level - chero.level });
                    chero.level = data.hero_info.level;
                    chero.exp = data.hero_info.exp;
                    this.check_hero_ef(chero);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "sj" });
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.save_queue_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://沒有指定英雄
                    str = mx.Lang.h0010;
                    break;
                case 1://不是自己的英雄
                    str = mx.Lang.h0011;
                    break;
                case 2://超过最大出战人数
                    str = mx.Lang.h0012;
                    break;
                case 3://team_id参数错误
                    str = mx.Lang.h0013;
                    break;
                case 4://成功
                    this.fight_id = data.team_id;
                    this.teams[data.team_id] = data.team;
                    this.fight_ids = data.team; //修正引导
                    this.muban_obj[data.team_id] = data.muban;
                    str = mx.Lang.fz018;
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    if (mx.AppConfig.PREV_SCENE_ID == mx.LDMainScreen.S_NAME) {
                        var net = [{
                                "t": mx.MX_NETS.CS_LUEDUO_MINE
                            }];
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.LDMainScreen.S_NAME,
                            "param": { "net": net }
                        });
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME) {
                        var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
                        this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JJC_FIGHT,
                            "to_id": jproxy.cur_enemy.user_id,
                            "type": jproxy.cur_enemy.type
                        });
                    }
                    else if (mx.AppConfig.PREV_SCENE_ID == mx.FubenScreen.S_NAME && fproxy.stage_id) {
                        var stage_id = fproxy.stage_id;
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stage_id);
                        var obj = {
                            "1402": {
                                "t": mx.MX_NETS.CS_FUBEN_STAGE_LIST,
                                "chapter": api.ChapterID,
                                "difficult": api.Difficulty,
                            }
                        };
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.FubenScreen.S_NAME,
                            "param": { "net": obj }
                        });
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID != mx.TeamScreen.S_NAME) {
                        this.facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.TeamScreen.S_NAME);
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.get_cqu_data = function (id) {
            var res = [];
            var c_id = typeof id != "undefined" ? id : this.s_id;
            res = this.teams[c_id] ? this.teams[c_id] : res;
            return res;
        };
        HeroProxy.prototype.change_queue_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://无队列
                    str = mx.Lang.h0013;
                    break;
                case 1://已经出战了
                    str = mx.Lang.h0015;
                    break;
                case 2:
                    this.fight_id = data.team_id;
                    this.fight_ids = data.team;
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FUBEN_CHUZHAN, "stage": fproxy.cur_stage
                    });
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.set_queue_info = function (data) {
            this.muban_obj = {};
            var qs = data.data;
            for (var i in qs) {
                this.muban_obj[qs[i].team_id] = qs[i].muban;
            }
            var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
            var lproxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
            var qs0 = qs[0];
            if (jproxy.jj_flag) {
                if (qs0.team_id == "11") {
                    jproxy.fangyu_que = qs0.team.concat();
                    jproxy.fangyu_temp = qs0.team.concat();
                    jproxy.fangyu_que_muban = qs0.muban;
                    //this.sendNotification(MX_NOTICE.SCENE_CHANGE, JJCMainScreen.S_NAME);
                }
                else {
                    jproxy.fangyu_temp = [];
                    for (var k in jproxy.fangyu_que) {
                        jproxy.fangyu_temp.push(Number(jproxy.fangyu_que[k]));
                    }
                }
                // return;
            }
            else if (lproxy.lueduo_flag) {
                if (Number(qs0.team_id) == 12) {
                    lproxy.fangyu_que = qs0.team.concat();
                    lproxy.fangyu_temp = qs0.team.concat();
                    lproxy.fangyu_que_muban = qs0.muban;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.JJCQueAlert.S_NAME,
                        "param": 1
                    });
                }
                else {
                    lproxy.fangyu_temp = [];
                    for (var k in lproxy.fangyu_que) {
                        lproxy.fangyu_temp.push(Number(lproxy.fangyu_que[k]));
                    }
                }
            }
            for (var i = 0, ln = qs.length; i < ln; i++) {
                var c_q = qs[i];
                this.teams[c_q.team_id] = c_q.team;
                if (Number(c_q.fight)) {
                    this.fight_id = c_q.team_id;
                }
                var buzhen = c_q.buzhen;
                if (!buzhen) {
                    buzhen = {};
                    for (var i_1 in c_q.team) {
                        var hero = this.get_chero_info(c_q.team[i_1]);
                        buzhen[Number(i_1) + 1] = hero.mid;
                    }
                    for (var i_2 = 1; i_2 < 7; ++i_2) {
                        if (!buzhen[i_2]) {
                            buzhen[i_2] = null;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_BUZHEN_INFO,
                        "team_id": c_q.team_id,
                        "zhanwei": JSON.stringify(buzhen)
                    });
                }
                this.set_buzhen(buzhen, c_q.team_id);
            }
        };
        HeroProxy.prototype.init_skill = function (data) {
            this.c_skill_info = data;
            this.init_team_info();
        };
        HeroProxy.prototype.buy_skill = function () {
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            if (gproxy.user_vip >= 2) {
                var buy = this.c_skill_info.buy;
                var buy_id = Math.min(buy + 1, mx.MX_COMMON.MAX_JND_BUY);
                var buff_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLPOINTPRICE, 'id', buy_id);
                var p_d2 = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_BUY_SKILLPOINT },
                        "param": mx.Tools.format(mx.Lang.j0011, buff_info.price, buy)
                    }
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
            }
            else {
                gproxy.vip_flag = 2;
                var p_d2 = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_VIP_LIBAOSTATE },
                        "param": mx.Lang.j0026
                    }
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
            }
        };
        //提升技能等级回调
        HeroProxy.prototype.skill_levelup = function (data) {
            var str;
            switch (data.state) {
                case 0://不存在该英雄
                    str = mx.Lang.h0000;
                    break;
                case 1://技能未解锁
                    str = mx.Lang.j0006;
                    break;
                case 2://普攻不能升级
                    str = mx.Lang.j0010;
                    break;
                case 3://已经达到最大等级
                    str = mx.Lang.j0007;
                    break;
                case 4://没有剩余技能点
                    this.buy_skill();
                    return;
                case 5://银币不足
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    return;
                case 6://成功
                    str = mx.Lang.j0009;
                    this.c_skill_info.num = data.num;
                    var chero = this.heroes[data.id];
                    var cskill = chero.skills[data.skill_id];
                    cskill.skill_level = data.skill_level;
                    this.check_hero_ef(chero, 1); //每次修改提示信息,但不刷新界面
                    this.sendNotification(mx.MX_NOTICE.HERO_SKILL_LVUP, data.skill_id);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 7 });
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 11, "add": 1 });
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.buy_skillpoint = function (data) {
            var str;
            switch (data.state) {
                case 0://vip不足
                    str = mx.Lang.p0021;
                    break;
                case 1://元宝不足
                    str = mx.Lang.p0008;
                    break;
                case 2://成功
                    str = mx.Lang.p0020;
                    this.c_skill_info.num = data.num;
                    this.c_skill_info.buy = data.buy;
                    this.sendNotification(mx.MX_NOTICE.BUY_SKILLPOINT_SUCCESS);
                    //刷新技能提示状态-但不刷新界面，关闭技能界面时统一刷新。因为技能有mediator
                    var chero = this.get_chero_info();
                    this.check_hero_ef(chero, 1);
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.init_xuyuan = function (data) {
            this.jinli_num = Number(data.item_num);
            this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
            this.xuyuan_lv = Number(data.data.level);
            this.xuyuan_exp = Number(data.data.exp);
            this.xuyuan_energe = Number(data.data.energy);
        };
        HeroProxy.prototype.xuyuan_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0: //不存在该英雄
                case 4://
                    str = mx.Lang.xy00003;
                    break;
                case 1://
                    str = mx.Lang.hg014;
                    break;
                case 2://能量不足
                    str = mx.Lang.xy00005;
                    break;
                case 3://
                    this.xuyuan_energe = Number(data.energy);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.jinli_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://
                    str = mx.Lang.xy00006;
                    break;
                case 1://
                    str = mx.Lang.xy00007;
                    break;
                case 2://
                    this.jinli_num = Number(data.item_num);
                    this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
                    this.xuyuan_exp = Number(data.up.exp);
                    if (data.up.level) {
                        this.xuyuan_lv = Number(data.up.level);
                    }
                    if (data.up.energy) {
                        this.xuyuan_energe = Number(data.up.energy);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.save_yuehui_cb = function (data) {
            var cproxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            cproxy.set_date_task(false);
            this.yuehui = data.data;
            this.tishi = data.tip;
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YueHuiScreen.S_NAME);
        };
        HeroProxy.prototype.save_juqing_cb = function (data) {
            var cd = data.data;
            this.juqing = [];
            for (var k in cd) {
                this.juqing.push({
                    "id": Number(k) + 1,
                    "mid": Number(cd[k].mid),
                    "status": Number(cd[k].status)
                });
            }
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.AllJuqingScreen.S_NAME);
        };
        HeroProxy.prototype.juqing_pass = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://成功
                    var cProxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
                    cProxy.huanzhuang_score = data.score;
                    return;
                case 2://剧情未解锁
                    str = mx.Lang.fz019;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.use_pjcyd = function (data) {
            var str;
            switch (data.state) {
                case 0://不是死亡状态，不能使用
                    str = mx.Lang.h0063;
                    break;
                case 1://数量不足
                    str = mx.Lang.h0064;
                    break;
                case 2://使用成功
                    var c_hero = this.get_chero_info();
                    c_hero.la = data.status;
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    var arr = [{ "item_id": 2004, "num": 1 }];
                    this.pjcy_flag = false;
                    pProxy.xiaohao_item(arr);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "yh" });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.check_hero_tishi = function () {
            var c_arr = this.get_heroes_by_type('all', "team");
            if (!c_arr[0] || !c_arr[0].ef) {
                return false;
            }
            for (var i = 0; i < c_arr.length; i++) {
                if (c_arr[i].ef) {
                    var tishi = c_arr[i].ef.join("") != "000";
                    if (tishi) {
                        return true;
                    }
                }
            }
            return false;
        };
        HeroProxy.prototype.get_hero_by_mid = function (mid) {
            for (var i in this.heroes) {
                if (Number(this.heroes[i].mid) == Number(mid)) {
                    return this.heroes[i];
                }
            }
            return null;
        };
        HeroProxy.prototype.init_yuehui = function (data) {
            var pproxy = this.facade.retrieveProxy(mx.PackProxy.NAME);
            this.xsd_num = pproxy.get_item_num(3054);
            if (data) {
                this.initlove = data.love;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YueHuiScreen.S_NAME);
            }
        };
        //刷新约会数据
        HeroProxy.prototype.fresh_yuehui = function (data) {
            var cproxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            cproxy.set_date_task(false);
            switch (data.state) {
                case -1:
                    ////console.log("没有这个英雄");
                    break;
                case -2:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0061 });
                    ////console.log("检查英雄状态");
                    break;
                case -3:
                    this.love = this.initlove;
                    this.cost = 0;
                    this.sendNotification(mx.MX_NOTICE.FRESH_YUEHUI);
                    ////console.log("相思豆不足");
                    break;
                case 1:
                    this.initlove = data.love - 10 * data.cost;
                    this.love = data.love;
                    this.cost = data.cost;
                    var pproxy = this.facade.retrieveProxy(mx.PackProxy.NAME);
                    pproxy.set_item_num(3054, pproxy.get_item_num(3054) - Number(this.cost));
                    this.sendNotification(mx.MX_NOTICE.FRESH_YUEHUI);
                    break;
                default:
            }
        };
        //收入后宫 
        // public srhg(data: any) {
        //     if (data.state == 1) {
        //         this.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.h0061 })
        //         this.sendNotification(MX_NOTICE.FRESH_FZ_LIST);
        //     } else {
        //         this.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": "未知错误" })
        //     }
        // }
        HeroProxy.prototype.check_time_tick = function (data) {
            var info = this.c_skill_info;
            if (data.delay && info) {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
                if (info.num < Number(api.MaxSkillPoints)) {
                    var cold = Number(info.cold);
                    if (cold > 0) {
                        info.cold -= data.delay;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        });
                    }
                }
                api = null;
                this.sendNotification(mx.MX_NOTICE.FRESH_TIME, null, "skill");
            }
        };
        HeroProxy.prototype.check_hero_sj = function (lv) {
            var b_exp = [60, 300, 1500, 7500]; //道具经验值
            var b_ids = [169, 218, 290, 440]; //道具id
            var b_item = []; //自己拥有数量
            var add_zb = {};
            var need_zb = [];
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            for (var a = 0; a < 4; a++) {
                b_item[a] = pProxy.get_item_num(b_ids[a]);
            }
            var cd = this.get_chero_info();
            var level = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", lv - 1);
            var need = Number(level.hero_exp) - Number(cd.exp); //需要的经验值
            var need_l = need; //缺少的经验值
            var pre = [];
            //预计算需要哪些物品
            for (var i = 0; i < 4; i++) {
                need_l -= b_exp[i] * b_item[i];
                pre.push(b_item[i]);
                if (need_l <= 0) {
                    break;
                }
            }
            var res = true;
            if (need_l > 0) {
                res = false;
                for (var j = 0; j < 4; j++) {
                    var cid = b_ids[j];
                    var capi = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cid);
                    var cmax = capi.MaxAmount; //999
                    capi = null;
                    if (need_l <= b_exp[j] * cmax) {
                        need_zb[cid] = Math.ceil(need_l / b_exp[j]);
                        break;
                    }
                    else {
                        need_l -= b_exp[j] * cmax;
                    }
                }
            }
            else if (need_l < 0) {
                var add = 0;
                for (var k = 0, kn = pre.length; k < kn; k++) {
                    add += b_exp[k] * b_item[k];
                    if (add > need) {
                        var extra = add - need;
                        for (var m = k; m >= 0; m--) {
                            if (extra > b_exp[m] && pre[m]) {
                                var reduse = Math.min(pre[m], Math.floor(extra / b_exp[m]));
                                pre[m] -= reduse;
                                extra -= reduse * b_exp[m];
                            }
                        }
                        break;
                    }
                }
            }
            //转化为物品格式
            for (var j = 0, ln = pre.length; j < ln; j++) {
                if (pre[j]) {
                    add_zb[b_ids[j]] = pre[j];
                }
            }
            var result = {
                "res": res,
                "need_zb": need_zb,
                "add_zb": add_zb
            };
            return result;
        };
        HeroProxy.prototype.get_fightPower = function (team) {
            var zl = 0; //战力
            for (var k in team) {
                var cd = this.get_chero_info(this.heroes[team[k]].id);
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
                            for (var j in skill) {
                                if (Number(j) == skill_id) {
                                    skill_level += Number(skill[j]);
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
                zl += mx.FightTools.cal_fight_power(cd);
            }
            return zl;
        };
        //封印之力升级成功
        HeroProxy.prototype.hero_fyup = function (data) {
            var str = '';
            switch (data.state) {
                case 0://成功
                    str = mx.Lang.fz012;
                    var c_hero = this.get_chero_info();
                    var fy = data.soul.split('|');
                    c_hero.fy_skill[data.soul_id].level = Number(fy[0]) + 1;
                    c_hero.fy_skill[data.soul_id].jindu = Number(fy[1]);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    if (Number(data.type) == 2) {
                        pProxy.xiaohao_item(data.items);
                    }
                    this.check_hero_ef(c_hero, 3);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": 'fy' });
                    break;
                case 1://英雄不存在
                    str = mx.Lang.h0000;
                    break;
                case 2://物品数量不足
                    str = mx.Lang.h0001;
                    break;
                case 3:
                    str = mx.Lang.scfy004;
                    break;
                case 4:
                    str = mx.Lang.scfy005;
                    break;
                case 5:
                    str = mx.Lang.scfy006;
                    break;
                case 6:
                    if (Number(data.type) == 1) {
                        this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                "param": mx.Lang.a0006,
                            }
                        });
                    }
                    else {
                        str = mx.Tools.format(mx.Lang.scfy007, mx.Lang.ybi);
                    }
                    break;
                case 7:
                    str = mx.Lang.scfy008;
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        HeroProxy.prototype.jiuzi_up_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0: //升级成功
                case 10://激活成功
                    var cd = this.get_chero_info();
                    cd.nine_word = data.nine_word;
                    this.check_hero_ef(cd, 3);
                    if (data.cost) {
                        var xiaohao = [];
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        for (var k in data.cost.cailiao) {
                            xiaohao.push({
                                "item_id": data.cost.cailiao[k].equip_id,
                                "num": data.cost.cailiao[k].num
                            });
                        }
                        pProxy.xiaohao_item(xiaohao);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": 'jz' });
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    var temp_str = data.state == 0 ? mx.Lang.h0112 : mx.Lang.h0111;
                    str = mx.Tools.format(temp_str, mx.Lang.h0092[Number(data.id) - 1]);
                    break;
                case 1://参数错误
                    str = mx.Lang.err01;
                    break;
                case 2: //没有该英雄
                case 15://
                    str = mx.Lang.h0093;
                    break;
                case 3://超过最大等级
                    str = mx.Lang.h0094;
                    break;
                case 4://银币不足
                    str = mx.Lang.p0036;
                    break;
                case 5://魂魄不足
                    str = mx.Lang.h0008;
                    break;
                case 6://装备不足
                    str = mx.Lang.h0095;
                    break;
                case 7://未开启
                    str = mx.Lang.h0105;
                    break;
                case 11://星级不满足条件
                    str = mx.Lang.h0097;
                    break;
                case 12://品质不满足条件
                    str = mx.Lang.h0098;
                    break;
                case 13://封印等级不满足条件
                    str = mx.Lang.h0099;
                    break;
                case 14://其他九字真言等级不足
                    str = mx.Lang.h0100;
                    break;
            }
            if (str != "") {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        HeroProxy.prototype.hp_zhuanhua_cb = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1://没有这个侍从
                    str = mx.Lang.h0000;
                    break;
                case 2://碎片不足
                    str = mx.Lang.h0191;
                    break;
                case 3:
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HunpoZhuanhuaAlert.S_NAME);
                    var res = data.res;
                    var pProxy = facade.retrieveProxy(mx.PackProxy.NAME);
                    pProxy.set_item_num(617, res);
                    this.sendNotification(mx.MX_NOTICE.ITEM_NUM_CHANGED);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    str = mx.Lang.h0192;
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        HeroProxy.prototype.get_buzhen = function (team_id) {
            if (this._buzhen[team_id]) {
                return this._buzhen[team_id];
            }
            return null;
        };
        HeroProxy.prototype.set_buzhen = function (data, team_id) {
            this._buzhen[team_id] = {};
            this._buzhen[team_id] = data;
        };
        HeroProxy.prototype.get_hero_num_by_type = function (type, need) {
            var num = 0;
            for (var i in this.heroes) {
                if (Number(this.heroes[i][type]) >= Number(need)) {
                    ++num;
                }
            }
            return num;
        };
        HeroProxy.NAME = "HeroProxy";
        return HeroProxy;
    }(puremvc.Proxy));
    mx.HeroProxy = HeroProxy;
    __reflect(HeroProxy.prototype, "mx.HeroProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroProxy.js.map
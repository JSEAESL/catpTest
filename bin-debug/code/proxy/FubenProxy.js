/**
*   @author qianjun
*   @date 2015.2.25
*   @desc 副本数据管理
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
    var FubenProxy = (function (_super) {
        __extends(FubenProxy, _super);
        function FubenProxy() {
            var _this = _super.call(this, FubenProxy.NAME) || this;
            /*------------已开启的副本章节信息--------------*/
            _this._easy_chapter_list = [];
            _this._hard_chapter_list = [];
            _this.hongdian_flag = [];
            _this.unlock_chapter = false;
            /*------------某一章节下的所有关卡信息--------------*/
            _this._stage_list = [];
            _this._saodang_num = 0;
            _this._sdang_type = 0;
            //目标关卡
            _this._stage_id = 0;
            _this._stage_type = 1;
            /*-----------------副本出战-----------------*/
            _this._user_hero_info = {}; //己方英雄战斗信息
            _this._enermy_hero_info = {}; //敌方英雄战斗信息
            _this._wave_id = 1; //第几波
            _this._team_id = 1; //当前选择队列
            _this._result = 0; //战斗结果
            _this._curr_fuben = {}; //当前选择副本数据
            _this._jump = false; //是否副本场景复原
            _this._pop_jump = false; //是否副本弹框复原
            _this._yindao_fight = 0;
            /*----------------副本累计奖励-------------------*/
            _this._ybi = 0;
            _this._bxiang = 0;
            _this.tar_jq_stage = 0; //目标剧情关卡任务id
            _this.now_task = 0; //当前最高可看的剧情关卡id
            //当前关卡
            _this.cur_stage = 0;
            _this.cur_chapter = 0;
            _this.juqing_info = {};
            return _this;
        }
        Object.defineProperty(FubenProxy.prototype, "easy_chapter_list", {
            get: function () {
                return this._easy_chapter_list;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FubenProxy.prototype, "hard_chapter_list", {
            get: function () {
                return this._hard_chapter_list;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.init_chapter_info = function (data) {
            if (this.unlock_chapter) {
                this.unlock_chapter = false;
                this.sendNotification(mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER);
            }
            this._easy_chapter_list = data.normal;
            this._hard_chapter_list = data.elite;
            this.hongdian_flag = data.fb_arr;
            this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN_STAGE);
        };
        Object.defineProperty(FubenProxy.prototype, "stage_list", {
            get: function () {
                return this._stage_list;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_stage_list = function (arr) {
            var obj = mx.Tools.arr2obj(this.juqing_info.data, 'stage');
            if (!obj[arr.stage]) {
                this.juqing_info.data.push({
                    "stage": arr.stage,
                    "state": 0
                });
                if (arr.chapter) {
                    var old = Number(this.juqing_info.max);
                    this.juqing_info.max = arr.chapter;
                    if (old < Number(arr.chapter)) {
                        this.sendNotification(mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER);
                    }
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN_STAGE);
        };
        Object.defineProperty(FubenProxy.prototype, "saodang_num", {
            get: function () {
                return this._saodang_num;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.stage_info = function (id) {
            var arr = mx.Tools.arr2obj(this._stage_list, "stage");
            if (arr[id]) {
                return arr[id];
            }
            return null;
        };
        FubenProxy.prototype.init_stage_info = function (data) {
            if (data.data) {
                this._stage_list = data.data;
                this._saodang_num = data.saodang;
                this._stage_list.sort(function (a, b) {
                    return parseInt(b.stage) - parseInt(a.stage);
                });
                this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
            }
        };
        FubenProxy.prototype.set_stage_type = function (type) {
            this._stage_type = type;
        };
        Object.defineProperty(FubenProxy.prototype, "stage_type", {
            get: function () {
                return this._stage_type;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_stage_id = function (id) {
            this._stage_id = id;
            var dproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
            if (dproxy.new_stage == id) {
                dproxy.set_new_stage(0);
            }
        };
        FubenProxy.prototype.check_open_byid = function (id) {
            id = Number(id);
            var open = false;
            var carr;
            if (id > 10000) {
                carr = this._hard_chapter_list;
            }
            else {
                carr = this._easy_chapter_list;
            }
            var last = carr[carr.length - 1];
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', id);
            if (Number(api.ChapterID) <= last) {
                open = true;
            }
            return open;
        };
        FubenProxy.prototype.check_open_id = function (id, type) {
            var carr;
            if (type != 1) {
                carr = this._hard_chapter_list;
            }
            else {
                carr = this._easy_chapter_list;
            }
            var last = carr[carr.length - 1];
            return Math.min(id, last);
        };
        Object.defineProperty(FubenProxy.prototype, "stage_id", {
            get: function () {
                return this._stage_id;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.init_saodang_info = function (data) {
            var str;
            switch (data.state) {
                case 1://体力不足
                    str = mx.Lang.p0018;
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "tili");
                    return;
                case 2://vip不足
                    str = mx.Tools.format(mx.Lang.fb006, this._sdang_type, this._sdang_type == 1 ? 1 : 4);
                    break;
                case 3://成功
                    this._saodang_num = this._saodang_num - data.type;
                    this.set_fuben_cishu(this.cur_stage, data.cishu);
                    this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data, mx.FBTZhanAlert.S_NAME);
                    if (data.fresh) {
                        this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data, mx.SaoDangPop.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SaoDangPop.S_NAME, "param": data });
                    }
                    if (this.astate && this.astate[this.cur_stage]) {
                        this.astate[this.cur_stage].cishu = data.cishu;
                        this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data, mx.GetWayView.S_NAME);
                    }
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', this.cur_stage);
                    if (api) {
                        this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                            'id': 5,
                            'num': Number(data.type)
                        });
                        if (Number(api.difficulty) == 2) {
                            this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                                'id': 6,
                                'num': Number(data.type)
                            });
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, {
                        "act_id": Number(api.difficulty) == 2 ? 14 : 13,
                        "add": Number(data.type),
                    });
                    return;
                case 4://扫荡券不足
                    str = mx.Lang.fb007;
                    var need = (this._sdang_type - this._saodang_num) * 1;
                    var param = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_FUBEN_BUY_SAODANG, "num": need },
                            "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                            "sdata_exit": mx.AlertView.S_NAME,
                            "param": mx.Tools.format(mx.Lang.fb007, need),
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, param);
                    return;
                case 5://挑战次数不足
                    str = mx.Lang.fb009;
                    break;
                case 6://未三星通过
                    str = mx.Lang.fb021;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        /*--------------------购买扫荡卷---------------------*/
        FubenProxy.prototype.init_buy_saodang = function (data) {
            var str;
            var msg = "";
            var param = {};
            switch (data.state) {
                case 1://元宝不足
                    msg = mx.MX_NOTICE.POP_VIEW;
                    param = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                            "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                            "sdata_exit": mx.AlertView.S_NAME,
                            "param": mx.Lang.p0008,
                        }
                    };
                    break;
                case 2://购买次数超过上限
                    msg = mx.MX_NOTICE.SHOW_TOP_UI;
                    param = { "text": mx.Lang.p0012 };
                    break;
                case 3://成功
                    this._saodang_num = data.num;
                    msg = mx.MX_NOTICE.CS_GET_DATA;
                    param = {
                        "t": mx.MX_NETS.CS_FUBEN_SAODANG,
                        "stage": this.cur_stage,
                        "type": this._sdang_type
                    };
                    break;
                default:
                    msg = mx.MX_NOTICE.SHOW_TOP_UI;
                    param = { "text": mx.Lang.p0007 };
                    break;
            }
            this.sendNotification(msg, param);
        };
        Object.defineProperty(FubenProxy.prototype, "jump", {
            get: function () {
                return this._jump;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_jump = function (flag) {
            this._jump = flag;
        };
        Object.defineProperty(FubenProxy.prototype, "pop_jump", {
            get: function () {
                return this._pop_jump;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_pop_jump = function (flag) {
            this._pop_jump = flag;
        };
        Object.defineProperty(FubenProxy.prototype, "curr_fuben", {
            get: function () {
                return this._curr_fuben;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_curr_fuben = function (data) {
            this._curr_fuben = data;
        };
        Object.defineProperty(FubenProxy.prototype, "curr_team", {
            get: function () {
                return this._team_id;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_curr_team = function (team) {
            this._team_id = team;
        };
        FubenProxy.prototype.setWaveid = function (id) {
            this._wave_id = id;
        };
        FubenProxy.prototype.setResult = function (id) {
            this._result = id;
        };
        Object.defineProperty(FubenProxy.prototype, "wave_id", {
            get: function () {
                return this._wave_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FubenProxy.prototype, "result", {
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FubenProxy.prototype, "user_hero_info", {
            get: function () {
                return this._user_hero_info;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_user_hero_info = function (obj) {
            this._user_hero_info = null;
            this._user_hero_info = obj;
        };
        Object.defineProperty(FubenProxy.prototype, "enermy_hero_info", {
            get: function () {
                return this._enermy_hero_info;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.save_hero_data = function (data) {
            var temp;
            var order = 1;
            for (var key in this._user_hero_info) {
                if (key == 'zhanwei') {
                    continue;
                }
                if (data.indexOf(Number(key)) == -1) {
                    this._user_hero_info[key].state = 'dead';
                    this._user_hero_info[key].wave_hp = 0;
                    this._user_hero_info[key].wave_mp = 0;
                }
                else {
                    var hero = mx.Combat.stage._arr_hero[key];
                    if (hero && !hero.huxiang && hero.is_hero) {
                        temp = this._user_hero_info[hero.hero_id];
                        temp.order = order++;
                        temp.wave_hp = hero.fighter.hp;
                        temp.wave_mp = hero.fighter.mp;
                    }
                    hero = null;
                    temp = null;
                }
            }
        };
        FubenProxy.prototype.init_fuben_chuzhan = function (data) {
            var str;
            switch (data.state) {
                case 0://关卡未开启或者不可重复通关
                    str = mx.Lang.fb008;
                    break;
                case 1://关卡剩余次数不足
                    str = mx.Lang.fb009;
                    break;
                case 2://体力不足-打开购买弹窗
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.SHOW_BUY_TILI,
                            "sdata_ok": "tili",
                            "param": mx.Lang.p0027,
                        }
                    });
                    return;
                case 3://未选择出战队伍
                    str = mx.Lang.fb010;
                    break;
                case 4://成功
                    var arr = [];
                    for (var i in data.user_info) {
                        if (i != 'zhanwei') {
                            arr.push(data.user_info[i]);
                        }
                    }
                    arr.sort(function (a, b) {
                        return a.order - b.order;
                    });
                    this._user_hero_info = mx.Tools.arr2obj(arr, "order");
                    this._user_hero_info.zhanwei = data.user_info.zhanwei;
                    this.setWaveid(1);
                    //获取怪物属性
                    this.copy_user_info = null;
                    this.copy_user_info = mx.FightTools.object_clone(this.user_hero_info);
                    this._enermy_hero_info = this.get_monster_info(this.cur_stage);
                    this.copy_enermy_info = null;
                    this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
                    //英雄数据
                    var fight_data = {
                        "1": mx.FightTools.object_clone(this.user_hero_info),
                        "2": this.enermy_hero_info,
                    };
                    //战斗数据
                    var bat_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', this.cur_stage);
                    var wave = Number(bat_api.wave);
                    var p_d = {
                        "name": mx.FightView.S_NAME,
                        "param": {
                            "hero_data": fight_data,
                            "process": wave //FightCore.start_fight(fight_data)
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FBTZhanAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": this.stage_type == 1 ? 13 : 14, "add": 1 });
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FubenProxy.prototype.get_monster_info = function (stage_id) {
            // let battle = ApiTool.getAPINode(MX_APINAME.STAGE, 'id', this.stage_info.id);;
            var result = {};
            var bat_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', stage_id);
            var wave = Number(bat_api.wave);
            for (var j = 1; j <= wave; j++) {
                var data = mx.ApiTool.getAPINode(mx.MX_APINAME.BATTLE, 'stageid', stage_id, "waveid", j);
                var all_info = {};
                for (var i = 1; i < 6; i++) {
                    var mid = data['monster' + i + 'id'];
                    if (mid > 0) {
                        var quality = Math.floor((data['level' + i] + 9) / 10);
                        var UnLock_skill = this.GetUnlockSkill(mid, quality, data['level' + i]);
                        var info = { "dragon_id": mid, "dragon_quality": quality, "dragon_star": data['stars' + i], "skill_list": UnLock_skill, "dragon_level": data['level' + i] };
                        var back_info = this.cal_dragon_new_fight_prop(info, []);
                        back_info['order'] = i;
                        all_info[-i] = back_info;
                    }
                    else {
                        break;
                    }
                }
                //被动技能加成
                var monsters = { "1": all_info };
                this._add_passive_skill_attr(monsters);
                result[j] = monsters[1];
            }
            return result;
        };
        //这里的dragon参数是服务器ud.dragon[did]的数据。
        //因为每次对龙的星级，品质，等级产生影响之后，所有的战斗属性数值都要重新计算。
        //add_prop,其他数据对战斗数据的加成影响
        FubenProxy.prototype.cal_dragon_new_fight_prop = function (dragon, add_prop) {
            var new_prop;
            new_prop = this.copy_dragon_attri(dragon);
            new_prop = this.cal_dragon_fight_prop(new_prop, new_prop['dragon_id'], add_prop);
            //4.龙的品质对 攻击，辅助，守御的属性加成
            new_prop = this.cal_fight_prop_quality(new_prop, new_prop['dragon_quality']);
            //5.装备对战斗数据的影响, 因为装备会有对技能的等级加成
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip1']);
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip2']);
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip3']);
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip4']);
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip5']);
            new_prop = this.cal_fight_prop_item(new_prop, new_prop['equip6']);
            //检查是否有负数
            new_prop = this.check_fight_info(new_prop);
            new_prop = this.final_cal_fight_info(new_prop['dragon_id'], new_prop);
            return new_prop;
        };
        //所有的战斗属性计算之后，这个函数都必须被调用，并且在最后被调用
        FubenProxy.prototype.final_cal_fight_info = function (did, prop) {
            var d_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', did);
            //主属性
            var p_attri = d_info['MainAttrib'];
            prop["HIT"] = 100;
            prop["HP"] = prop["HP"] + (prop["STR"] - d_info["STR"]) * 18;
            prop["AD"] = prop["AD"] + (prop[p_attri] - d_info[p_attri]) + (prop["AGI"] - d_info["AGI"]) * 0.4;
            prop["AP"] = prop["AP"] + (prop["INT"] - d_info["INT"]) * 2.4;
            prop["ARM"] = prop["ARM"] + (prop["STR"] - d_info["STR"]) * 0.15 + (prop["AGI"] - d_info["AGI"]) * 0.08;
            prop["MR"] = prop["MR"] + (prop["INT"] - d_info["INT"]) / 10;
            prop["CRIT"] = prop["CRIT"] + (prop["AGI"] - d_info["AGI"]) * 0.4;
            return prop;
        };
        //检查属性值
        FubenProxy.prototype.check_fight_info = function (prop) {
            if (prop["STR"] && prop["STR"] < 0) {
                prop["STR"] = 0;
            }
            if (prop["INT"] && prop["INT"] < 0) {
                prop["INT"] = 0;
            }
            if (prop["AGI"] && prop["AGI"] < 0) {
                prop["AGI"] = 0;
            }
            if (prop["HP"] && prop["HP"] < 0) {
                prop["HP"] = 0;
            }
            if (prop["AD"] && prop["AD"] < 0) {
                prop["AD"] = 0;
            }
            if (prop["AP"] && prop["AP"] < 0) {
                prop["AP"] = 0;
            }
            if (prop["ARM"] && prop["ARM"] < 0) {
                prop["ARM"] = 0;
            }
            if (prop["MR"] && prop["MR"] < 0) {
                prop["MR"] = 0;
            }
            if (prop["CRIT"] && prop["CRIT"] < 0) {
                prop["CRIT"] = 0;
            }
            if (prop["ARMP"] && prop["ARMP"] < 0) {
                prop["ARMP"] = 0;
            }
            if (prop["MCRIT"] && prop["MCRIT"] < 0) {
                prop["MCRIT"] = 0;
            }
            if (prop["HIT"] && prop["HIT"] < 0) {
                prop["HIT"] = 0;
            }
            if (prop["LFS"] && prop["LFS"] < 0) {
                prop["LFS"] = 0;
            }
            if (prop["DODG"] && prop["DODG"] < 0) {
                prop["DODG"] = 0;
            }
            if (prop["HPS"] && prop["HPS"] < 0) {
                prop["HPS"] = 0;
            }
            if (prop["MPS"] && prop["MPS"] < 0) {
                prop["MPS"] = 0;
            }
            if (prop["HEAL"] && prop["HEAL"] < 0) {
                prop["HEAL"] = 0;
            }
            if (prop["CDR"] && prop["CDR"] < 0) {
                prop["CDR"] = 0;
            }
            return prop;
        };
        //计算装备对龙战斗属性的加成
        FubenProxy.prototype.cal_fight_prop_item = function (prop, item_id) {
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', item_id);
            if (!item) {
                return prop;
            }
            prop['STR'] = prop['STR'] + item['STR'];
            prop['AGI'] = prop['AGI'] + item['AGI'];
            prop['INT'] = prop['INT'] + item['INT'];
            prop['HP'] = prop['HP'] + item['HP'];
            prop['AD'] = prop['AD'] + item['AD'];
            prop['AP'] = prop['AP'] + item['Ap'];
            prop['ARM'] = prop['ARM'] + item['ARM'];
            prop['MR'] = prop['MR'] + item['MR'];
            prop['CRIT'] = prop['CRIT'] + item['CRIT'];
            prop['ARMP'] = prop['ARMP'] + item['ARMP'];
            prop['MCRIT'] = prop['MCRIT'] + item['MCRIT'];
            prop['MRI'] = prop['MRI'] + item['MRI'];
            prop['LFS'] = prop['LFS'] + item['LFS'];
            prop['HIT'] = prop['HIT'] + item['HIT'];
            prop['DODG'] = prop['DODG'] + item['DODG'];
            prop['HPS'] = prop['HPS'] + item['HPS'];
            prop['MPS'] = prop['MPS'] + item['MPs'];
            prop['HEAL'] = prop['HEAL'] + item['HEAL'];
            prop['CDR'] = prop['CDR'] + item['CDR'];
            for (var i in prop['skill_list']) {
                prop['skill_list'][i]['skill_level'] = Number(prop['skill_list'][i]['skill_level']) + Number(item['SKL']);
            }
            return prop;
        };
        //计算龙的品质对战斗属性的加成
        FubenProxy.prototype.cal_fight_prop_quality = function (prop, quality) {
            var did = prop['dragon_id'];
            var add = mx.ApiTool.getAPINode(mx.MX_APINAME.QUALITYADD, 'hero_id', did, "quality", 1); //quality);
            for (var i in add) {
                add[i] = Number(add[i]);
            }
            prop['STR'] = prop['STR'] + add['STR'];
            prop['AGI'] = prop['AGI'] + add['AGI'];
            prop['INT'] = prop['INT'] + add['INT'];
            prop['HP'] = prop['HP'] + add['HP'];
            prop['AD'] = prop['AD'] + add['AD'];
            prop['AP'] = prop['AP'] + add['AP'];
            prop['ARM'] = prop['ARM'] + add['ARM'];
            prop['MR'] = prop['MR'] + add['MR'];
            prop['CRIT'] = prop['CRIT'] + add['CRIT'];
            prop['ARMP'] = prop['ARMP'] + add['ARMP'];
            prop['MCRIT'] = prop['MCRIT'] + add['MCRIT'];
            prop['MRI'] = prop['MRI'] + add['MRI'];
            prop['LFS'] = prop['LFS'] + add['LFS'];
            prop['HIT'] = prop['HIT'] + add['HIT'];
            prop['DODG'] = prop['DODG'] + add['DODG'];
            prop['HPS'] = prop['HPS'] + add['HPS'];
            prop['MPS'] = prop['MPS'] + add['MPS'];
            prop['HEAL'] = prop['HEAL'] + add['HEAL'];
            prop['CDR'] = prop['CDR'] + add['CDR'];
            return prop;
        };
        FubenProxy.prototype.copy_dragon_attri = function (prop) {
            var add = {};
            add['dragon_id'] = Number((prop['dragon_id']));
            add['dragon_quality'] = Number((prop['dragon_quality']));
            //add['name']			= prop['name'];
            add['dragon_exp'] = Number((prop['dragon_exp']));
            add['dragon_level'] = Number((prop['dragon_level']));
            add['dragon_star'] = Number((prop['dragon_star']));
            add['equip1'] = Number((prop['equip1']));
            add['equip2'] = Number((prop['equip2']));
            add['equip3'] = Number((prop['equip3']));
            add['equip4'] = Number((prop['equip4']));
            add['equip5'] = Number((prop['equip5']));
            add['equip6'] = Number((prop['equip6']));
            add['skill_list'] = prop['skill_list'];
            if (prop['skylanders']) {
                add['skylanders'] = prop['skylanders'];
            }
            if (prop['master']) {
                add['master'] = prop['master'];
            }
            return add;
        };
        //创建斗龙的初始战斗属性
        FubenProxy.prototype.create_dragon_fight_prop = function (prop) {
            prop["STR"] = 0; //攻击
            prop["INT"] = 0; //辅助
            prop["AGI"] = 0; //守御
            prop["HP"] = 0; //生命值
            prop["AD"] = 0; //物理攻击
            prop["AP"] = 0; //魔法攻击
            prop["ARM"] = 0; //物理防御
            prop["MR"] = 0; //魔法防御
            prop["CRIT"] = 0; //物理暴击
            prop["ARMP"] = 0; //穿透物理防御
            prop["MCRIT"] = 0; //魔法暴击
            prop["MRI"] = 0; //忽视魔法防御
            prop["LFS"] = 0; //吸血
            prop['HIT'] = 0; //命中
            prop["DODG"] = 0; //闪避
            prop["HPS"] = 0; //生命回复
            prop["MPS"] = 0; //能量回复
            prop["HEAL"] = 0; //治疗效果
            prop['CDR'] = 0; //冷却缩减
            prop['WalkSpeed'] = 0; //步行速度
            //prop["de_energy_cost"]	= 0;
            //prop["de_silence"]		= 0;
            //prop["de_control_time"] = 0;
            //prop["de_phy_damage"]	= 0;
            //prop["de_magic_damage"] = 0;
            //prop["skill_level"]		= 0;
            return prop;
        };
        //计算龙的裸妆战斗属性+龙的等级属性加成+龙的星级加成
        FubenProxy.prototype.cal_dragon_fight_prop = function (prop, did, add_prop) {
            var d_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', did);
            d_info["STR"] = Number(d_info["STR"]);
            d_info["AGI"] = Number(d_info["AGI"]);
            d_info["INT"] = Number(d_info["INT"]);
            prop = this.create_dragon_fight_prop(prop);
            var AGI = "AGI" + prop['dragon_star'];
            var INT = "INT" + prop['dragon_star'];
            var STR = "STR" + prop['dragon_star'];
            d_info[STR] = Number(d_info[STR]);
            d_info[AGI] = Number(d_info[AGI]);
            d_info[INT] = Number(d_info[INT]);
            if (add_prop && add_prop["STR"]) {
                prop["STR"] = d_info['STR'] + (prop['dragon_level'] - 1) * d_info[STR] + add_prop["STR"];
            }
            else {
                prop["STR"] = d_info['STR'] + (prop['dragon_level'] - 1) * d_info[STR];
            }
            if (add_prop && add_prop["INT"]) {
                prop["INT"] = d_info['INT'] + (prop['dragon_level'] - 1) * d_info[INT] + add_prop["INT"];
            }
            else {
                prop["INT"] = d_info['INT'] + (prop['dragon_level'] - 1) * d_info[INT];
            }
            if (add_prop && add_prop["AGI"]) {
                prop["AGI"] = d_info['AGI'] + (prop['dragon_level'] - 1) * d_info[AGI] + add_prop["AGI"];
            }
            else {
                prop["AGI"] = d_info['AGI'] + (prop['dragon_level'] - 1) * d_info[AGI];
            }
            if (add_prop && add_prop["HP"]) {
                prop["HP"] = Number(d_info['HP']) + Number(add_prop["HP"]);
            }
            else {
                prop["HP"] = d_info['HP'];
            }
            if (add_prop && add_prop["AD"]) {
                prop["AD"] = Number(d_info['AD']) + Number(add_prop["AD"]);
            }
            else {
                prop["AD"] = Number(d_info['AD']);
            }
            if (add_prop && add_prop["AP"]) {
                prop["AP"] = d_info['AP'] + add_prop["AP"];
            }
            else {
                prop["AP"] = d_info['AP'];
            }
            if (add_prop && add_prop["ARM"]) {
                prop["ARM"] = Number(d_info['ARM']) + Number(add_prop["ARM"]);
            }
            else {
                prop["ARM"] = Number(d_info['ARM']);
            }
            if (add_prop && add_prop["MR"]) {
                prop["MR"] = Number(d_info['MR']) + Number(add_prop["MR"]);
            }
            else {
                prop["MR"] = d_info['MR'];
            }
            if (add_prop && add_prop["CRIT"]) {
                prop["CRIT"] = Number(d_info['CRIT']) + Number(add_prop["CRIT"]);
            }
            else {
                prop["CRIT"] = d_info['CRIT'];
            }
            if (add_prop && add_prop["ARMP"]) {
                prop["ARMP"] = add_prop["ARMP"];
            }
            if (add_prop && add_prop["MCRIT"]) {
                prop["MCRIT"] = add_prop["MCRIT"];
            }
            if (add_prop && add_prop["MRI"]) {
                prop["MRI"] = add_prop["MRI"];
            }
            if (add_prop && add_prop["LFS"]) {
                prop["LFS"] = add_prop["LFS"];
            }
            /*if( add_prop && add_prop["shoot"] ){
            
                prop["shoot"] = add_prop["shoot"];
            }*/
            if (add_prop && add_prop["DODG"]) {
                prop["DODG"] = add_prop["DODG"];
            }
            if (add_prop && add_prop["HPS"]) {
                prop["HPS"] = add_prop["HPS"];
            }
            if (add_prop && add_prop["MPS"]) {
                prop["MPS"] = add_prop["MPS"];
            }
            if (add_prop && add_prop["HEAL"]) {
                prop["HEAL"] = add_prop["HEAL"];
            }
            if (add_prop && add_prop["CDR"]) {
                prop["CDR"] = add_prop["CDR"];
            }
            /*if( add_prop && add_prop["de_silence"] ){
            
                prop["de_silence"] = add_prop["de_silence"];
            }*/
            /*if( add_prop && add_prop["skill_level"]){
            
                prop["skill_level"] = add_prop["skill_level"];
            }*/
            if (add_prop && add_prop["WalkSpeed"]) {
                prop["WalkSpeed"] = d_info['WalkSpeed'] + add_prop["WalkSpeed"];
            }
            else {
                prop["WalkSpeed"] = d_info['WalkSpeed'];
            }
            return prop;
        };
        FubenProxy.prototype.GetUnlockSkill = function (did, quality, level) {
            var dragons = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', did);
            var skills = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, 'CasterID', did);
            var all_skill = [];
            for (var i in skills) {
                if (dragons['UnitType'] == 'hero') {
                    if (Number(skills[i].Unlock) <= Number(quality)) {
                        all_skill.push(skills[i]);
                    }
                }
                else {
                    if (Number(skills[i].UnlockForMonster) <= Number(quality)) {
                        all_skill.push(skills[i]);
                    }
                }
            }
            var skill_list = [];
            for (var i in all_skill) {
                var value = all_skill[i];
                var str = value['SkillName'].substr(-3);
                var arr = {};
                arr['skill_id'] = value['skill_id'];
                arr["skill_level"] = value['InitLevel'];
                if (str == 'ult') {
                    arr['big'] = 1;
                }
                if (value['Awake'] == 'TRUE') {
                    arr['wake'] = 0;
                }
                skill_list.push(arr);
            }
            return skill_list;
        };
        //增加被动技能属性加成
        FubenProxy.prototype._add_passive_skill_attr = function (monsters) {
            var attr_value = 0;
            var i;
            for (i = 1; i <= 2; i = i + 1) {
                for (var k in monsters[i]) {
                    var val = monsters[i][k];
                    for (var j in val['skill_list']) {
                        var val_skill = val['skill_list'][j];
                        if (val_skill['wake'] === 0) {
                        }
                        else {
                            var dragon_skill = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEW, 'id', val_skill['skill_id']);
                            var skill_type = dragon_skill['ActiveType'];
                            if (skill_type == 'passive' || skill_type == 'aura') {
                                attr_value = dragon_skill['BasicNum'] + (val_skill['skill_level'] - 1) * dragon_skill['PlusRatio'];
                                //判断目标时敌方还是己方
                                if (dragon_skill['TargetCamp'] == 1) {
                                    for (var key in monsters[i]) {
                                        var val2 = monsters[i][key];
                                        monsters[i][key] = this._add_passive_attr(val2, dragon_skill['PlusAttr'], attr_value);
                                    }
                                }
                                else if (dragon_skill['TargetCamp'] == 0) {
                                    monsters[i][k] = this._add_passive_attr(val, dragon_skill['PlusAttr'], attr_value);
                                }
                            }
                        }
                    }
                }
            }
            //重新回炉计算加成后的属性值
            for (i = 1; i <= 2; i = i + 1) {
                for (var key in monsters[i]) {
                    var val = monsters[i][key];
                    if (val['add_prop']) {
                        monsters[i][key] = this.cal_dragon_new_fight_prop(val, val['add_prop']);
                        monsters[i][key]['order'] = val['order'];
                    }
                }
            }
        };
        //加被动属性
        FubenProxy.prototype._add_passive_attr = function (monster, attr_type, attr_value) {
            if (!monster['add_prop']) {
                monster['add_prop'] = {};
            }
            //增加相应属性
            if (attr_type == 'STR') {
                if (!monster['add_prop']['STR']) {
                    monster['add_prop']['STR'] = 0;
                }
                monster['add_prop']['STR'] = monster['add_prop']['STR'] + attr_value;
            }
            else if (attr_type == 'INT') {
                if (!monster['add_prop']['INT']) {
                    monster['add_prop']['INT'] = 0;
                }
                monster['add_prop']['INT'] = monster['add_prop']['INT'] + attr_value;
            }
            else if (attr_type == 'AD') {
                if (!monster['add_prop']['AD']) {
                    monster['add_prop']['AD'] = 0;
                }
                monster['add_prop']['AD'] = monster['add_prop']['AD'] + attr_value;
            }
            else if (attr_type == 'AP') {
                if (!monster['add_prop']['AP']) {
                    monster['add_prop']['AP'] = 0;
                }
                monster['add_prop']['AP'] = monster['add_prop']['AP'] + attr_value;
            }
            else if (attr_type == 'ARM') {
                if (!monster['add_prop']['ARM']) {
                    monster['add_prop']['ARM'] = 0;
                }
                monster['add_prop']['ARM'] = monster['add_prop']['ARM'] + attr_value;
            }
            else if (attr_type == 'ARMP') {
                if (!monster['add_prop']['ARMP']) {
                    monster['add_prop']['ARMP'] = 0;
                }
                monster['add_prop']['ARMP'] = monster['add_prop']['ARMP'] + attr_value;
            }
            else if (attr_type == 'CRIT') {
                if (!monster['add_prop']['CRIT']) {
                    monster['add_prop']['CRIT'] = 0;
                }
                monster['add_prop']['CRIT'] = monster['add_prop']['CRIT'] + attr_value;
            }
            else if (attr_type == 'DODG') {
                if (!monster['add_prop']['DODG']) {
                    monster['add_prop']['DODG'] = 0;
                }
                monster['add_prop']['DODG'] = monster['add_prop']['DODG'] + attr_value;
            }
            else if (attr_type == 'HP') {
                if (!monster['add_prop']['HP']) {
                    monster['add_prop']['HP'] = 0;
                }
                monster['add_prop']['HP'] = monster['add_prop']['HP'] + attr_value;
            }
            else if (attr_type == 'MR') {
                if (!monster['add_prop']['MR']) {
                    monster['add_prop']['MR'] = 0;
                }
                monster['add_prop']['MR'] = monster['add_prop']['MR'] + attr_value;
            }
            else if (attr_type == 'AGI') {
                if (!monster['add_prop']['AGI']) {
                    monster['add_prop']['AGI'] = 0;
                }
                monster['add_prop']['AGI'] = monster['add_prop']['AGI'] + attr_value;
            }
            else if (attr_type == 'MCRIT') {
                if (!monster['add_prop']['MCRIT']) {
                    monster['add_prop']['MCRIT'] = 0;
                }
                monster['add_prop']['MCRIT'] = monster['add_prop']['MCRIT'] + attr_value;
            }
            else if (attr_type == 'LFS') {
                if (!monster['add_prop']['LFS']) {
                    monster['add_prop']['LFS'] = 0;
                }
                monster['add_prop']['LFS'] = monster['add_prop']['LFS'] + attr_value;
            }
            else if (attr_type == 'MRI') {
                if (!monster['add_prop']['MRI']) {
                    monster['add_prop']['MRI'] = 0;
                }
                monster['add_prop']['MRI'] = monster['add_prop']['MRI'] + attr_value;
            }
            else if (attr_type == 'HOLY') {
                if (!monster['add_prop']['HOLY']) {
                    monster['add_prop']['HOLY'] = 1;
                }
                monster['add_prop']['HOLY'] = monster['add_prop']['HOLY'] + attr_value;
            }
            return monster;
        };
        FubenProxy.prototype.init_enermy_info = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.p0034;
                    break;
                case 1://成功
                    this._enermy_hero_info = data.monsters;
                    //英雄数据
                    var fight_data = {
                        "1": mx.FightTools.object_clone(this.user_hero_info),
                        "2": this.enermy_hero_info[1],
                    };
                    //战斗数据
                    var p_d = {
                        "name": mx.FightView.S_NAME,
                        "param": {
                            "hero_data": fight_data,
                            "process": 0 //FightCore.start_fight(fight_data)
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FubenProxy.prototype.init_temple_fight = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.tm014;
                    break;
                case 1:
                    msg = mx.Lang.tm015;
                    break;
                case 2:
                    var arr = [];
                    for (var i in data.user_info) {
                        if (i != 'zhanwei') {
                            arr.push(data.user_info[i]);
                        }
                    }
                    arr.sort(function (a, b) {
                        return a.order - b.order;
                    });
                    this._user_hero_info = mx.Tools.arr2obj(arr, "order");
                    this._user_hero_info.zhanwei = data.user_info.zhanwei;
                    this._jump = true;
                    this.setWaveid(1);
                    this.copy_user_info = null;
                    this.copy_user_info = mx.FightTools.object_clone(this.user_hero_info);
                    this._enermy_hero_info = data.monsters;
                    this.copy_enermy_info = null;
                    this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
                    this.copy_enermy_info = null;
                    this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
                    var fight_data = {
                        "1": mx.FightTools.object_clone(this.user_hero_info),
                        "2": this.enermy_hero_info,
                    };
                    //战斗数据
                    var p_d = {
                        "name": mx.FightView.S_NAME,
                        "param": {
                            "hero_data": fight_data,
                            "process": 0 //FightCore.start_fight(fight_data)
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    this.sendNotification(mx.MX_NOTICE.UPDATE_TEMPLE);
                    break;
                case 3:
                    msg = mx.Lang.tm010;
                    break;
                case 4:
                    msg = mx.Lang.p0036;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FubenProxy.prototype.init_tiaoxi_fight = function (data) {
            var arr = [];
            for (var i in data.ud) {
                if (i != 'zhanwei') {
                    arr.push(data.ud[i]);
                }
            }
            arr.sort(function (a, b) {
                return a.order - b.order;
            });
            this._user_hero_info = mx.Tools.arr2obj(arr, "order");
            this._user_hero_info.zhanwei = data.ud.zhanwei;
            this._jump = true;
            this.setWaveid(1);
            this.copy_user_info = null;
            this.copy_user_info = mx.FightTools.object_clone(this.user_hero_info);
            this._enermy_hero_info = data.ed;
            this.copy_enermy_info = null;
            this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
            var fight_data = {
                "1": mx.FightTools.object_clone(this.user_hero_info),
                "2": this.enermy_hero_info,
            };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.FightView.S_NAME,
                "param": {
                    "hero_data": fight_data,
                    "process": 0,
                    "enermy_xianpin": data.xianpin
                }
            });
        };
        FubenProxy.prototype.init_jfs_fight = function (data) {
            var arr = [];
            for (var i in data.user_info) {
                if (i != 'zhanwei') {
                    arr.push(data.user_info[i]);
                }
            }
            arr.sort(function (a, b) {
                return a.order - b.order;
            });
            this._user_hero_info = mx.Tools.arr2obj(arr, "order");
            this._user_hero_info.zhanwei = data.user_info.zhanwei;
            this._jump = true;
            this.setWaveid(1);
            this.copy_user_info = null;
            this.copy_user_info = mx.FightTools.object_clone(this.user_hero_info);
            this._enermy_hero_info = data.enemy;
            this.copy_enermy_info = null;
            this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
            var fight_data = {
                "1": mx.FightTools.object_clone(this.user_hero_info),
                "2": this.enermy_hero_info,
            };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.FightView.S_NAME,
                "param": {
                    "hero_data": fight_data,
                    "process": 0,
                    "enermy_xianpin": data.xianpin
                }
            });
        };
        FubenProxy.prototype.init_jjc_fight = function (data) {
            var arr = [];
            for (var i in data.user_battle) {
                if (i != 'zhanwei') {
                    arr.push(data.user_battle[i]);
                }
            }
            arr.sort(function (a, b) {
                return a.order - b.order;
            });
            this._user_hero_info = mx.Tools.arr2obj(arr, "order");
            this._user_hero_info.zhanwei = data.user_battle.zhanwei;
            this._jump = true;
            this.setWaveid(1);
            this.copy_user_info = null;
            this.copy_user_info = mx.FightTools.object_clone(this.user_hero_info);
            this._enermy_hero_info = data.enemy_battle;
            this.copy_enermy_info = null;
            this.copy_enermy_info = mx.FightTools.object_clone(this._enermy_hero_info);
            var fight_data = {
                "1": mx.FightTools.object_clone(this.user_hero_info),
                "2": this.enermy_hero_info,
            };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.FightView.S_NAME,
                "param": {
                    "hero_data": fight_data,
                    "process": 0,
                    "enermy_xianpin": data.xianpin
                }
            });
        };
        FubenProxy.prototype.init_award_info = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.p0034;
                    break;
                case 1:
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', this.cur_stage);
                    var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    // if (Number(this.cur_stage) == Number(this.stage_list[0].stage) && Number(api.difficulty) == 2) {
                    //     if (this._easy_chapter_list.length == this._hard_chapter_list.length) {
                    //         gProxy.juqing_flag = 0;
                    //     }
                    // }
                    if (data.up) {
                        for (var i in this.juqing_info.data) {
                            if (Number(this.juqing_info.data[i].stage) == Number(data.up.stage)) {
                                this.juqing_info.data[i].state = data.up.state;
                                break;
                            }
                        }
                    }
                    if (mx.AppConfig.CURR_SCENE_ID == mx.JuqingScreen.S_NAME) {
                        //data.notice = MX_NOTICE.CS_GET_DATA;
                        //data.sdata = { "t": MX_NETS.CS_JUQING_INFO};
                        if (api && Number(data.sl)) {
                            this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 5 });
                            if (Number(api.difficulty) == 2) {
                                this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 6 });
                            }
                        }
                    }
                    else {
                        data.notice = mx.MX_NOTICE.SCENE_CHANGE;
                        data.sdata = mx.JuqingScreen.S_NAME;
                    }
                    //不是剧情关卡
                    if (Number(api.type) == 1) {
                        var p_d = { "name": mx.FightResultView.S_NAME, "param": data };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
                    // let id = Number(api2.difficulty) == 1 ? 5 : 6;
                    return;
                case 2://奖励已经结算
                    str = mx.Lang.fb015;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        /*-----------------副本重置------------------*/
        FubenProxy.prototype.init_fuben_chongzhi = function (data) {
            var str;
            switch (data.state) {
                case 1://参数错误
                    str = mx.Lang.p0034;
                    break;
                case 2://不是精英副本
                    str = mx.Lang.fb013;
                    break;
                case 3://副本重置已达上限
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    if (gproxy.user_vip < 15) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                "param": mx.Lang.fb005,
                            }
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "param": mx.Lang.fb033,
                            }
                        });
                    }
                    return;
                case 4://元宝不足
                    var param = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                            "param": mx.Lang.p0008,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, param);
                    return;
                case 5://还有剩余次数
                    str = mx.Lang.fb014;
                    break;
                case 6://成功
                    str = mx.Lang.fb031;
                    var cd = data.data;
                    var arr = mx.Tools.arr2obj(this._stage_list, "stage");
                    if (arr[this.cur_stage]) {
                        arr[this.cur_stage].purchase = cd.purchase;
                        arr[this.cur_stage].cishu = cd.cishu;
                        this._stage_list = mx.Tools.obj2arr(arr);
                    }
                    this._stage_list.sort(function (a, b) {
                        return parseInt(b.stage) - parseInt(a.stage);
                    });
                    this.set_fuben_cishu(this.cur_stage, cd.cishu);
                    this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data, mx.FBTZhanAlert.S_NAME);
                    if (this.astate) {
                        this.astate[cd.stage] = cd; //直接覆盖数据
                        this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data, mx.GetWayView.S_NAME);
                    }
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FubenProxy.prototype.get_way_cishu = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0034;
                    break;
                case 1:
                    var style = void 0;
                    if (data.data) {
                        this.astate = mx.Tools.arr2obj(data.data, "stage");
                    }
                    var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", data.item_id).Category;
                    switch (temp) {
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                            style = "equip";
                            break;
                        case 4:
                            style = "hunpo";
                            break;
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.GetWayView.S_NAME,
                        "param": {
                            "item_id": data.item_id,
                            "style": style,
                        }
                    });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        Object.defineProperty(FubenProxy.prototype, "yindao_fight", {
            get: function () {
                return this._yindao_fight;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.set_yindao_fight = function (flag) {
            return this._yindao_fight = flag;
        };
        FubenProxy.prototype.set_award = function (n1, n2) {
            this._ybi += n1;
            this._bxiang += n2;
        };
        Object.defineProperty(FubenProxy.prototype, "ybi", {
            get: function () {
                return this._ybi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FubenProxy.prototype, "bxiang", {
            get: function () {
                return this._bxiang;
            },
            enumerable: true,
            configurable: true
        });
        FubenProxy.prototype.clear_award = function () {
            this._ybi = this._bxiang = 0;
        };
        FubenProxy.prototype.set_fuben_cishu = function (id, num) {
            for (var k in this._stage_list) {
                var obj = this._stage_list[k];
                if (obj.stage == id) {
                    obj.cishu = num;
                    break;
                }
            }
        };
        FubenProxy.prototype.get_dyn_arr = function (obj) {
            var arr = [];
            var stage = obj.param.stage;
            //boss q版头像
            var stage_info = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', stage);
            var battle = mx.ApiTool.getAPINode(mx.MX_APINAME.BATTLE, "stageid", stage, "waveid", 1);
            var res = "monster1_png";
            var boss_pos = battle.BossPosition;
            if (Number(boss_pos) > 0) {
                var boss_id = battle["monster" + boss_pos + "id"];
                res = mx.Tools.get_mn_res(boss_id, "monster");
            }
            //this.arr_push_res(arr,res);
            //敌方头像
            for (var j = 1; j <= 5; ++j) {
                var monster_id = parseInt(battle["monster" + j + "id"]);
                if (monster_id) {
                    this.arr_push_res(arr, mx.Tools.get_mn_res(monster_id, "monstx"));
                }
            }
            //奖励物品
            // for (let i = 0; i < 7; ++i) {
            //     let item_id = parseInt(stage_info["UIreward" + i]);
            //     let item = Tools.get_item_info(4, item_id);
            //     if (item) {
            //         this.arr_push_res(arr, Tools.get_item_res(4, item_id));
            //     }
            // }
            return arr;
        };
        FubenProxy.prototype.arr_push_res = function (arr, png) {
            if (RES.hasRes(png) && arr.indexOf(png) == -1) {
                arr.push(png);
            }
        };
        FubenProxy.prototype.fuben_saodang = function (data) {
            var obj = mx.Tools.arr2obj(this._stage_list, "stage");
            var stage_info = obj[this.cur_stage] || this.astate[this.cur_stage];
            if (!stage_info) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb004 });
                return;
            }
            data = data || this.sdtype;
            if (data && data == 1) {
                this._sdang_type = 1;
                this.sdtype = 1;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_FUBEN_SAODANG, "stage": this.cur_stage, "type": 1
                });
            }
            else {
                var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', this.cur_stage);
                var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                var now_tl = dproxy.get_currency("tili");
                var need = Number(stage.VitalityCost);
                if (need > now_tl) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.SHOW_BUY_TILI,
                            "sdata_ok": "tili",
                            "param": mx.Lang.p0027,
                        }
                    });
                    return;
                }
                var cshu = void 0;
                if (Number(stage.difficulty) == 1) {
                    cshu = Math.min(10, Math.floor(now_tl / need));
                    this.sdtype = 10;
                }
                else {
                    cshu = Math.min(Number(stage_info.cishu), Math.floor(now_tl / need));
                    this.sdtype = stage_info.cishu;
                }
                this._sdang_type = cshu;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_FUBEN_SAODANG, "stage": this.cur_stage, "type": cshu
                });
            }
        };
        FubenProxy.prototype.set_sd_tar_info = function (id, need) {
            this.sd_tar_info = {
                "tar_id": id,
                "tar_need": need || 0
            };
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_GETWAY_CISHU,
                "item_id": id,
            });
        };
        FubenProxy.prototype.get_stageOrder_by_stageID = function (stageID) {
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stageID);
            var chapter = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "ChapterID", stage.ChapterID);
            for (var i in chapter) {
                if (chapter[i].id == stageID) {
                    return Number(i) + 1;
                }
            }
            return 0;
        };
        FubenProxy.prototype.init_juqing_info = function (data) {
            if (Number(data.state)) {
                this.juqing_info = data;
                if (mx.AppConfig.CURR_SCENE_ID == mx.JuqingScreen.S_NAME) {
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JuqingScreen.S_NAME);
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb023 });
            }
        };
        //领取星级奖励
        FubenProxy.prototype.lq_juqing_star = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.hd026;
                    break;
                case 2:
                    str = mx.Lang.p0045;
                    break;
                case 3:
                    this.juqing_info.star_lq.push(data.star);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 4:
                    str = mx.Lang.err01;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        //领取税收
        FubenProxy.prototype.lq_juqing_sshou = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.fb039;
                    break;
                case 2:
                    str = mx.Lang.p0045;
                    break;
                case 3:
                    this.juqing_info.daily = 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_JQ_SS);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        //领取游历
        FubenProxy.prototype.lq_yli = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.fb040;
                    break;
                case 1:
                    this.juqing_info.has = 0;
                    this.sendNotification(mx.MX_NOTICE.JUBEN_YLI_LQ);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FubenProxy.NAME = "FubenProxy";
        return FubenProxy;
    }(puremvc.Proxy));
    mx.FubenProxy = FubenProxy;
    __reflect(FubenProxy.prototype, "mx.FubenProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FubenProxy.js.map
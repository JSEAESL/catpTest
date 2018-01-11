/**
*   @author mx,qianjun
*   @date 2015.2.11
*   @desc toast提示
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
    var FightView = (function (_super) {
        __extends(FightView, _super);
        function FightView(data) {
            var _this = _super.call(this, data) || this;
            _this._mxtweens = []; //所有的tween，
            _this.atk_arr = []; //攻击行为脚本数组
            _this.cur_wave = 0;
            _this.cur_round = 0;
            _this.fight_result = -1; //当前战斗结果
            _this.time = 90; //一个回合90s
            _this.skip_fight = false;
            _this.can_zanting = true;
            _this.role_index = {};
            _this.chushou_arr = [];
            _this.die_arr = [];
            _this.isPVP = false;
            _this.display_mode = false;
            _this.speed = 1;
            _this.total_wave = 1;
            _this.round_max = 0;
            _this.my_zl = 0;
            _this.enermy_zl = 0;
            _this.cur_idx = 0;
            _this.pause = false;
            _this.fight_round = {};
            _this.fight_wave = 1;
            _this.per_round_hp_mp = {};
            _this.fight_wave_result = {};
            /*
            
            
            *     *    *     *
            
            *     *    *     *
            
            *     *    *     *
            
            
            
            
            
            
            
            */
            _this.hero_pos = [120, 60, 180, 0, 240]; //按照高度300排列
            _this.heroes = {};
            _this.monsters = {};
            _this.heroes_id = [];
            _this.monsters_id = [];
            _this.hero_num = 0;
            _this.enermy_num = 0;
            _this.has_get_pos = [];
            _this.finish_wave_flag = false;
            _this.next_wave = 0;
            _this.stop_touch = false;
            _this.huanxiang_num = 0;
            _this.adata = data;
            return _this;
        }
        FightView.mx_support = function () {
            return ["assets.fight", "api.SKILLNEW", "api.HERONEW", "api.SKILLNEWWX", "api.BUFFNEWWX", "api.SKILLNEWGROUP", "api.BATTLE"];
        };
        FightView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_jn1"://第四个英雄放技能
                    tar = this.hero_g.getChildAt(3);
                    break;
                case "v_jn2"://第三个英雄放技能
                    tar = this.hero_g.getChildAt(2);
                    break;
                case "v_jn3"://第二个英雄放技能
                    tar = this.hero_g.getChildAt(1);
                    break;
                case "v_jn4"://第一个英雄放技能
                    tar = this.hero_g.getChildAt(0);
                    break;
                case "v_ft_n1"://下一关
                    //tar = this.next_b;
                    break;
            }
            // if(tar && tar != this.next_b){
            //     let t_p = tar.parent.localToGlobal(tar.x, tar.y);
            //     return {"x" : t_p.x, "y" : t_p.y, "width" : tar.width, "height" : 80};
            // }
            return tar;
        };
        Object.defineProperty(FightView.prototype, "fproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FightView.prototype, "wproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.WaiJiaoProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FightView.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, { "name": "fight" });
            facade.registerMediator(new mx.FightViewMediator(this));
            this.init_fight_view();
        };
        FightView.prototype.init_fight_view = function () {
            var fProxy = this.fproxy;
            var speed = egret.localStorage.getItem("play_speed");
            if (!speed) {
                speed = 1;
                egret.localStorage.setItem("play_speed", "1");
            }
            speed = Number(speed);
            this.speed_b.source = speed == 1 ? "fgcsu_png" : "fg2bsu_png";
            this.speed = speed;
            FightView.L2T = 600 / speed;
            FightView.FLASH_DESC = 40 / speed;
            this.stop_touch = false;
            this.fdata = mx.FightTools.object_clone(this.adata.hero_data);
            this.finish_wave_flag = false;
            this.time = 0;
            this.huihe_bt.text = fProxy.wave_id + (fProxy.yindao_fight > 0 ? " x 1" : (" x " + this.total_wave));
            this.yinbi_t.text = fProxy.ybi + "";
            this.skip_b.visible = false;
            this.skip_fight_b.visible = this.speed_b.visible = false;
            this.can_zanting = true;
            var wave = 1;
            switch (mx.AppConfig.CURR_SCENE_ID) {
                case mx.YXDianScreen.S_NAME: //调戏别人妃子
                case mx.FriendScreen.S_NAME:
                case mx.JFSSYScreen.S_NAME: //教坊司调戏乐姬
                case mx.JFSYJXQScreen.S_NAME:
                    this.bg.source = "hgzdbg_jpg";
                    this.isPVP = true;
                    mx.Combat.skip_fighter = false;
                    break;
                case mx.LDOtherScreen.S_NAME: //掠夺他人
                case mx.ChatScreen.S_NAME:
                    this.bg.source = "ldzdbg_jpg";
                    this.isPVP = true;
                    this.can_zanting = false;
                    mx.Combat.skip_fighter = false;
                    break;
                case mx.JJCMainScreen.S_NAME://jjc
                    if (mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME) {
                        this.can_zanting = false;
                    }
                    else {
                        FightView.L2T = 600;
                        FightView.FLASH_DESC = 40;
                    }
                    mx.Combat.skip_fighter = false;
                    this.bg.source = "jjczdbg_jpg";
                    this.isPVP = true;
                    break;
                default:
                    this.isPVP = false;
                    FightView.L2T = 600;
                    FightView.FLASH_DESC = 40;
                    if (fProxy.yindao_fight > 0) {
                        if (fProxy.yindao_fight == 1) {
                            this.bg.source = "hgzdbg_jpg";
                            this.skip_b.visible = true;
                        }
                        else {
                            this.bg.source = "zdbg_jpg";
                        }
                        mx.Combat.skip_fighter = false;
                    }
                    else {
                        var bat_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', this.fproxy.cur_stage);
                        wave = Number(bat_api.wave);
                        this.total_wave = wave;
                        this.bg.source = "zdbg_jpg";
                    }
                    break;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var jjcproxy = facade.retrieveProxy(mx.LueDuoProxy.NAME);
            if (jjcproxy.huifang) {
                //回放
                this.fproxy.setWaveid(1);
                this.cur_wave = 1;
                this.fdata = this.adata.hero_data;
                this.fight_process = this.adata.huifang;
                var count = 0;
                for (var i in this.fight_process[1]) {
                    if (this.fight_process[1][i]) {
                        ++count;
                    }
                }
                this.fight_round[this.cur_wave] = count;
                this.show_fight_result();
                return;
            }
            if (!this.display_mode) {
                mx.Combat.skip_fighter = true;
                this.display_mode = false;
                this.skip_pve_fight(wave);
            }
        };
        FightView.prototype.init_zhanwei = function (type, data) {
            var flag = false;
            var c_d = this.fdata;
            var c_my = data;
            var my_zw = {};
            if (typeof c_my.zhanwei == 'undefined') {
                flag = true;
            }
            else {
                var count = 0;
                for (var i in c_my.zhanwei) {
                    if (c_my.zhanwei[i]) {
                        ++count;
                    }
                }
                if (count == 0) {
                    flag = true;
                }
            }
            if (flag) {
                var id = 1;
                for (var i in c_my) {
                    if (i != 'zhanwei') {
                        my_zw[id] = c_my[i].dragon_id;
                        ++id;
                    }
                }
                for (var i = 1; i < 7; ++i) {
                    if (!my_zw[i]) {
                        my_zw[i] = null;
                    }
                }
            }
            else {
                for (var i = 1; i < 7; ++i) {
                    if (!c_my.zhanwei[i]) {
                        my_zw[i] = null;
                    }
                    else {
                        my_zw[i] = c_my.zhanwei[i];
                    }
                }
            }
            this.buzhen[type == 1 ? "my" : "enermy"] = my_zw;
        };
        FightView.prototype.show_fight_result = function () {
            this.display_mode = true;
            //this.leavefight_b.source = this.isPVP ? "baoxiang_png" : "kszdbg_png";
            var c_d = this.fdata;
            var c_my = (c_d[1]); //使用数字key，并且不是从0开始
            var c_e = (c_d[2]); //obj格式
            this.finish_wave_flag = false;
            this.next_wave = this.fproxy.wave_id + 1;
            this.time = 0;
            this.huihe_bt.text = this.fproxy.wave_id + (this.fproxy.yindao_fight > 0 ? " x 1" : (" x " + this.total_wave));
            //战前排位布阵
            var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            this.buzhen = {};
            this.init_zhanwei(1, c_my);
            this.init_zhanwei(2, c_e);
            //this.fight_result = c_d.winner;
            this._arr_hero = {}; //hero_id:role
            this._l_d_hero = []; //hero_id:hero_data
            this._mxtweens = []; //role_tween
            this.heroes_id = [];
            this.monsters_id = [];
            this.chushou_arr = [];
            this.init_hero(c_my, -1);
            this.has_get_pos = [];
            this.init_hero(c_e, 1);
            this.has_get_pos = [];
            // if(!Combat.skip_fighter){
            //     this.init_hero_list(c_my);//初始化底部hero列表
            // }
            this.iswait = false;
            this.combat = mx.Combat.init(this);
            this.stop_touch = false;
            if (this.isPVP) {
                mx.Combat.auto_fight = true;
                //this.auto_lock.visible = true;
                this.huihe_bt.text = "1 x 1";
                this._timeout = egret.setTimeout(function () {
                    egret.clearTimeout(this._timeout);
                    this._timeout = null;
                    var eid = "zdkshi";
                    if (!this.efs_g.getChildByName(eid)) {
                        var new_ef = new mx.GeneralEffect(eid);
                        new_ef.name = eid;
                        new_ef.change_framerate(24, 1);
                        new_ef.set_event("ruchang");
                        new_ef.addEventListener("ruchang", this.ruchang_end, this);
                        new_ef.scaleX = new_ef.scaleY = 1.5;
                        new_ef.verticalCenter = 25;
                        new_ef.horizontalCenter = 0;
                        this.efs_g.addChild(new_ef);
                    }
                }, this, 10 * FightView.FLASH_DESC); //长按0.75秒
                return;
            }
            var fProxy = this.fproxy;
            //this.round_list = c_d.process;
            //入场动画 
            var eid = "";
            if (fProxy.yindao_fight == 0) {
                //敌人头像
                this.big_g.visible = true;
                eid = "ruchang" + fProxy.wave_id;
            }
            else {
                this.big_g.visible = true;
                eid = "zdkshi";
            }
            if (!this.efs_g.getChildByName(eid)) {
                var new_ef = new mx.GeneralEffect(eid);
                new_ef.name = eid;
                new_ef.change_framerate(24, 1);
                new_ef.set_event("ruchang");
                new_ef.addEventListener("ruchang", this.ruchang_end, this);
                new_ef.scaleX = new_ef.scaleY = 3;
                new_ef.verticalCenter = 25;
                new_ef.horizontalCenter = 0;
                this.efs_g.addChild(new_ef);
            }
        };
        FightView.prototype.ruchang_end = function () {
            var fProxy = this.fproxy;
            this.big_g.visible = false;
            var eid = "";
            if (!this.isPVP) {
                eid = "ruchang" + fProxy.wave_id;
            }
            else {
                eid = "zdkshi";
            }
            var ef = this.efs_g.getChildByName(eid);
            if (ef) {
                ef.removeEventListener("ruchang", this.ruchang_end, this);
            }
            this.efs_g.removeChildren();
            //挂上脚本
            mx.Combat.startCombat();
            //pvp排下序 默认己方优先
            if (this.isPVP) {
                //计算下敌我的战斗力
                var c_d = this.fdata;
                var c_my = c_d[1]; //使用数字key，并且不是从0开始
                var c_e = c_d[2]; //obj格式
                for (var i in c_my) {
                    if (i != 'zhanwei') {
                        this.my_zl += mx.FightTools.cal_fight_power(c_my[i], true);
                    }
                }
                for (var i in c_e) {
                    if (i != 'zhanwei') {
                        this.enermy_zl += mx.FightTools.cal_fight_power(c_e[i], true);
                    }
                }
            }
            this.round_num = this.fight_round[fProxy.wave_id]; //本地数据从1开始
            this.round_max = mx.FightTools.kMaxStep;
            this.cur_round = 1;
            this.cur_idx = 0;
            //播放第一次有效回合的动画
            var view = this;
            view.time_t.text = this.cur_round + ""; //Tools.format(Lang.huihe,this.cur_round);
            this.cur_wave = fProxy.wave_id;
            var process = this.fight_process[this.cur_wave];
            if (process) {
                for (var j in process) {
                    var unit = process[j];
                    //当前回合下的第一个侍从的动画
                    if (unit.length) {
                        this.cur_round = Number(j);
                        view.time_t.text = this.cur_round + "";
                        this.show_round_result(this.cur_wave, j, 0);
                        break;
                    }
                }
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                if (fProxy.yindao_fight == 1) {
                    this.stop_fight();
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
            }
        };
        FightView.prototype.continue_fight = function () {
            this.pause = false;
            this.show_round_result(this.cur_wave, this.cur_round, this.cur_idx);
        };
        FightView.prototype.show_round_result = function (wave, round, idx) {
            if (this.skip_fight) {
                if (!this.isPVP) {
                    this.fproxy.setWaveid(this.total_wave);
                    this.cur_wave = this.total_wave;
                }
                this.display_over();
                return;
            }
            if (this.pause) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FightZantingView.S_NAME });
                return;
            }
            if (round <= this.fight_round[this.cur_wave]) {
                this.time_t.text = this.cur_round + "";
                var unit = this.fight_process[wave][round][idx];
                if (unit) {
                    this.show_round(wave, round, idx);
                }
                else {
                    ++this.cur_round;
                    this.cur_idx = 0;
                    this.show_round_result(this.cur_wave, this.cur_round, this.cur_idx);
                }
            }
            else {
                //演示完毕
                this.display_over();
            }
        };
        FightView.prototype.display_over = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SET_WAIT, false);
            //this.round_num += 1;
            this.fight_result = this.fight_wave_result[this.cur_wave];
            if (this.fight_result != -1) {
                this.finish_wave_flag = true;
                this.stop_touch = true;
                this._timeout = egret.setTimeout(this.finish_wave, this, FightView.L2T * 1.5); //长按0.75秒
            }
            else {
                this.fight_result = -1;
                this.finish_wave_flag = true;
                this.finish_wave();
            }
        };
        FightView.prototype.chushou_sort = function (a, b) {
            var a_info = mx.Combat.stage._arr_hero[a].hero_info;
            var b_info = mx.Combat.stage._arr_hero[b].hero_info;
            var star = Number(b_info.dragon_star) - Number(a_info.dragon_star);
            if (star != 0) {
                return star;
            }
            else {
                var quality = Number(b_info.dragon_quality) - Number(a_info.dragon_quality);
                if (quality != 0) {
                    return quality;
                }
                else {
                    var level = Number(b_info.dragon_level) - Number(a_info.dragon_level);
                    if (level != 0) {
                        return level;
                    }
                    else {
                        if (a > 0 && b > 0) {
                            return a - b;
                        }
                        else if (a > 0 && b < 0) {
                            return -1;
                        }
                        else if (a < 0 && b > 0) {
                            return 1;
                        }
                        else if (a < 0 && b < 0) {
                            return b - a;
                        }
                    }
                }
            }
            //女王 仙品等级
            //英雄 等级 品质 星级
        };
        FightView.prototype.skip_pve_fight = function (wave) {
            if (wave === void 0) { wave = this.total_wave; }
            this.fight_process = {};
            //按战斗力概率算 ----（）
            if (this.isPVP) {
                this.chushou_arr = [];
                var count = this.my_zl + this.enermy_zl;
                var rand = Math.floor(Math.random() * count) + 1;
                if (rand <= this.my_zl) {
                    //我方全体优先
                    for (var i in this.heroes_id) {
                        this.chushou_arr.push(this.heroes_id[i]);
                    }
                    for (var i in this.monsters_id) {
                        this.chushou_arr.push(this.monsters_id[i]);
                    }
                }
                else {
                    //敌方 全体优先
                    for (var i in this.monsters_id) {
                        this.chushou_arr.push(this.monsters_id[i]);
                    }
                    for (var i in this.heroes_id) {
                        this.chushou_arr.push(this.heroes_id[i]);
                    }
                }
            }
            for (var k = 1; k <= wave; ++k) {
                var c_d = this.fdata;
                var c_my = this.fproxy.user_hero_info; //使用数字key，并且不是从0开始
                var c_e = this.isPVP ? this.fproxy.enermy_hero_info : this.fproxy.enermy_hero_info[k]; //obj格式
                //战前排位布阵
                var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
                this.buzhen = {};
                this.init_zhanwei(1, c_my);
                this.init_zhanwei(2, c_e);
                //战前输出信息
                // //console.log("================布阵信息==================");
                // for(let i in this.buzhen){
                //     //console.log((i == 'my' ? "己方布阵\n" : "敌方布阵\n"));
                //     for(let j in this.buzhen[i]){
                //         let unit = this.buzhen[i][j];
                //         if(unit){
                //             let hero = ApiTool.getAPINode(MX_APINAME.HERO,'id',unit);
                //             //console.log("位置" + j + "上侍从：" + hero.hero_name + "\n");
                //         }
                //     }
                // }
                // //console.log("=============================================");
                //this.fight_result = c_d.winner;
                this._arr_hero = {}; //hero_id:role
                this._l_d_hero = []; //hero_id:hero_data
                this._mxtweens = []; //role_tween
                this.heroes_id = [];
                this.monsters_id = [];
                this.init_hero(c_my, -1);
                this.has_get_pos = [];
                this.init_hero(c_e, 1);
                this.has_get_pos = [];
                this.iswait = false;
                this.combat = mx.Combat.init(this);
                this.fight_wave = k;
                this.fight_process[k] = {};
                this.per_round_hp_mp[k] = {};
                mx.Combat.startCombat();
                if (this.isPVP) {
                    //初始化战报
                    for (var i in this._arr_hero) {
                        var unit = this._arr_hero[i];
                        if (typeof mx.Combat.fight_info[unit.hero_id] == 'undefined') {
                            mx.Combat.fight_info[unit.hero_id] = {
                                "damage": 0,
                                "alive": true,
                                "dragon_id": unit.hero_info.dragon_id,
                                "quality": unit.hero_info.dragon_quality,
                                "level": unit.hero_info.dragon_level,
                                "star": unit.hero_info.dragon_star,
                                "hero_id": unit.hero_info.id
                            };
                        }
                    }
                }
                for (var i = 1; i < 1000; i++) {
                    if (this.fight_result != -1) {
                        break;
                    }
                    this.fight_round[k] = i;
                    this.cur_wave = k;
                    if (!this.fight_process[k][this.fight_round[k]]) {
                        this.fight_process[k][this.fight_round[k]] = [];
                    }
                    this.per_round_hp_mp[k][this.fight_round[k]] = {};
                    //this.update_frame(this.atk_arr);
                    if (this.isPVP) {
                        this.update_frame(this.chushou_arr);
                    }
                    else {
                        this.update_frame(this.heroes_id);
                        this.update_frame(this.monsters_id);
                    }
                    //this.update_frame(this.monsters_id);
                    for (var i_1 in this._arr_hero) {
                        var role = this._arr_hero[i_1];
                        this.per_round_hp_mp[k][this.fight_round[k]][i_1] = {
                            "hp": role ? role.fighter.hp : 0,
                            "mp": role ? role.fighter.mp : 0
                        };
                    }
                }
                //回合结束后回复
                for (var key in this.heroes_id) {
                    var unit = this._arr_hero[this.heroes_id[key]];
                    if (unit && !unit.fighter.die) {
                        //回复能量和生命
                        if (unit.fighter.hps) {
                            unit.fighter.hp = Math.min(unit.fighter.maxHp, unit.fighter.hp + unit.fighter.hps);
                        }
                        if (unit.fighter.mps) {
                            unit.fighter.mp = Math.min(1000, unit.fighter.mp + unit.fighter.mps);
                        }
                    }
                    unit = null;
                }
                this.fproxy.save_hero_data(this.heroes_id);
                //演算结束
                if (k == wave) {
                    this.fight_wave_result[k] = this.fight_result;
                    //开始动画播放
                    this.save_skip_fight_result();
                    this.fproxy.setWaveid(1);
                    this.cur_wave = 1;
                    this.fproxy.set_user_hero_info(this.fproxy.copy_user_info);
                    this.fdata = {
                        "1": mx.FightTools.object_clone(this.fproxy.user_hero_info),
                        "2": this.isPVP ? this.fproxy.enermy_hero_info : this.fproxy.enermy_hero_info[this.cur_wave] //obj格式this.fproxy.copy_enermy_info[this.fproxy.wave_id],
                    };
                    var str = "";
                    switch (this.fight_result) {
                        case 1:
                            str = "我方胜利！";
                            break;
                        case 2:
                            str = "敌方胜利！";
                            break;
                        case -1:
                            str = "胜负未分！";
                            break;
                        case 0:
                            str = "同归于尽！";
                            break;
                    }
                    this.show_fight_result();
                    return;
                }
                //0 同归于尽 1胜利 2失败 -1未来分胜负
                //只有胜利才能继续
                if (this.fight_result == 1) {
                    //当前数据存储,用作下一关的起始
                    this.fight_wave_result[k] = this.fight_result;
                    this.fight_result = -1;
                }
                else {
                    //失败直接退出演算
                    this.fight_wave_result[k] = this.fight_result;
                    this.fproxy.setWaveid(1);
                    this.cur_wave = 1;
                    this.fproxy.set_user_hero_info(this.fproxy.copy_user_info);
                    this.fdata = {
                        "1": mx.FightTools.object_clone(this.fproxy.user_hero_info),
                        "2": wave == this.total_wave ? this.fproxy.enermy_hero_info[this.cur_wave] : this.fproxy.enermy_hero_info //obj格式this.fproxy.copy_enermy_info[this.fproxy.wave_id],
                    };
                    this.save_skip_fight_result();
                    this.show_fight_result();
                    break;
                }
            }
        };
        FightView.prototype.save_skip_fight_result = function () {
            var view = this;
            //战斗伤害数据
            for (var i in mx.Combat.fight_info) {
                var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', mx.Combat.fight_info[i].dragon_id);
                mx.Combat.fight_info[i].alive = (this.die_arr.indexOf(Number(i)) == -1);
                mx.Combat.fight_info[i].damage = 0 - mx.Combat.fight_info[i].damage;
            }
            //剩余人数
            var die_num = 0;
            var info = this.fproxy.user_hero_info;
            for (var k in info) {
                if (k == 'zhanwei') {
                    continue;
                }
                if (info[k].state == 'dead') {
                    ++die_num;
                }
            }
            mx.Combat.skip_result = {
                "die_num": die_num,
                "result": this.fight_result,
                "fight_info": mx.FightTools.object_clone(mx.Combat.fight_info)
            };
            mx.Combat.skip_fighter = false;
        };
        FightView.prototype.get_pos = function (mid, my) {
            var buzhen = my ? this.buzhen.my : this.buzhen.enermy;
            for (var i in buzhen) {
                if (this.has_get_pos.indexOf(i) > -1) {
                    continue;
                }
                if (buzhen[i] == mid) {
                    return i;
                }
            }
        };
        FightView.prototype.init_hero = function (obj, pos) {
            var i = 0;
            var count = 0;
            //获取阵列排阵位置
            for (var k in obj) {
                if (k == 'zhanwei') {
                    continue;
                }
                var d = obj[k];
                var pos_id = this.get_pos(d.dragon_id, pos == -1);
                var role_g = this[(pos == -1 ? ("m" + pos_id + "_g") : ("e" + pos_id + "_g"))];
                if (d.state != "dead") {
                    var cid = mx.Tools.get_mn_res(d.dragon_id, "role");
                    this.has_get_pos.push(pos_id);
                    d.pos_id = pos_id;
                    var role = new mx.GameRole(cid, 0 - pos, mx.GameRole.ROLE_STAND, d, k, this.isPVP); //英雄与英雄模板相关联
                    if (d.dragon_id == '25') {
                        mx.Combat.yingmo_id = parseInt(k);
                    }
                    role.hero_id = parseInt(k);
                    if (this.display_mode) {
                        role_g.addChild(role);
                    }
                    this._arr_hero[role.hero_id] = role;
                    this._l_d_hero.push(role.hero_id);
                    this.chushou_arr.push(role.hero_id);
                    pos == -1 ? this.heroes_id.push(role.hero_id) : this.monsters_id.push(role.hero_id);
                    ++count;
                    role = null;
                }
                ++i;
            }
            pos == -1 ? this.hero_num = count : this.enermy_num = count;
        };
        FightView.prototype.show_round = function (wave, round, idx) {
            var unit = this.fight_process[wave][round];
            var hero_data = unit[idx];
            var hero_id = hero_data.hero_id;
            var role = mx.Combat.stage._arr_hero[hero_id];
            if (!role) {
                ++this.cur_idx;
                this.show_round_result(this.cur_wave, this.cur_round, this.cur_idx);
                return;
            }
            FightView.L2T = 600 / this.speed;
            FightView.FLASH_DESC = 40 / this.speed;
            //buff结算导致血量变化
            if (hero_data.hp_change) {
                for (var i in hero_data.hp_change) {
                    var hp = hero_data.hp_change[i].hp;
                    if (hp < 0) {
                        role.buff_play("eff_poison");
                    }
                    role.fighter.cal_hp(hp);
                    //自己阵亡
                    if (role.fighter.die) {
                        //攻击者加200能量奖励
                        var from = mx.Combat.stage._arr_hero[hero_data.hp_change[i].from];
                        if (from) {
                            from.fighter.add_mp(200);
                            //聂隐娘杀的就加盾
                        }
                        from = null;
                        mx.Combat.onDie(hero_id);
                    }
                }
            }
            //buff结算导致能量变化
            if (hero_data.add_mp) {
                var add_mp = hero_data.add_mp.add_num;
                role.fighter.add_mp(add_mp);
            }
            //挂上buff
            if (hero_data.add_buff) {
                //增益还是减益
                var buff_eff = ["buff_damage", "buff_dispel", "buff_energyback", "buff_enhance", "buff_immunecontrol", "buff_revive", "buff_shield", "buff_speedup", "buff_undead"];
                for (var i in hero_data.add_buff) {
                    var info = mx.FightTools.get_buff_info(hero_data.add_buff[i]);
                    var icon = info.icon;
                    var ef = info.effect;
                    if (icon) {
                        role.add_buff(icon, buff_eff.indexOf(icon) > -1);
                    }
                    if (ef) {
                        role.buff_play(ef);
                    }
                }
            }
            //移除buff
            if (hero_data.remove_buff) {
                for (var i in hero_data.remove_buff) {
                    var buff = hero_data.remove_buff[i];
                    role.remove_buff(buff);
                }
            }
            //cd到了释放技能 包含命中的敌方英雄血量减少 命中后自己的吸血
            if (hero_data.skill) {
                var temp = hero_data.skill;
                if (temp.type == 'skill') {
                    var role_1 = mx.Combat.stage._arr_hero[hero_id];
                    if (role_1) {
                        role_1.change_state(mx.GameRole.ROLE_ATTACK1);
                        role_1.CommonAttack(unit);
                        // if(temp.info.action_s == 'atk'){
                        //     //普攻
                        //     role.before_attack(unit);
                        // }
                        // else{
                        //     //技能攻击
                        //     role.before_skill_attack(unit);
                        // }
                    }
                }
                else if (temp.type == 'big') {
                    if (role) {
                        role.change_state(mx.GameRole.ROLE_ATTACK1);
                        role.BigAttack(unit);
                        // role.before_big_attack(unit);
                    }
                }
            }
            //cd没到就下一个轮询
            if (!hero_data.skill) {
                ++this.cur_idx;
                this.show_round_result(this.cur_wave, this.cur_round, this.cur_idx);
            }
            role = null;
        };
        FightView.prototype.update_frame = function (data) {
            for (var k in data) {
                var temp = null;
                if (typeof data[k] == 'object') {
                    temp = data[k];
                    if (temp) {
                        temp.update();
                    }
                }
                else {
                    temp = this._arr_hero[data[k]];
                    if (temp) {
                        temp.fighter.update();
                    }
                }
                temp = null;
            }
        };
        FightView.prototype.set_index = function (name) {
            var view = this;
            var idx1 = view.stage_g.getChildIndex(view.hero_g);
            var idx2 = view.stage_g.getChildIndex(view.enermy_g);
            view.stage_g.setChildIndex(view[name], idx2 > idx1 ? idx2 : idx1);
            // arr.sort(this.sort_func);
            // for(let i in arr){
            //     let role = this._arr_hero[arr[i]];//角色
            //     if(!role){
            //         break;
            //     }
            //     this.roles_g.setChildIndex(role,parseInt(i));
            //     role = null;
            // }
        };
        FightView.prototype.sort_func = function (a_id, b_id) {
            var a = this._arr_hero[a_id];
            var b = this._arr_hero[b_id];
            if (a && b) {
                var com = a.fighter.pos_y - b.fighter.pos_y;
                var com1 = b.fighter.pos_x - a.fighter.pos_x;
                a = null;
                b = null;
                if (com > 0) {
                    return 1;
                }
                else if (com < 0) {
                    return -1;
                }
                else {
                    if (a_id > 0 && b_id < 0) {
                        return 1;
                    }
                    else if (a_id < 0 && b_id > 0) {
                        return -1;
                    }
                    else {
                        return com1;
                    }
                }
            }
            else if (a) {
                return -1;
            }
            else {
                return 1;
            }
        };
        FightView.prototype.finish_wave = function () {
            var fProxy = this.fproxy;
            if (fProxy.yindao_fight == 1) {
                return;
            }
            var params;
            if (this._timeout) {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
            }
            var finish = this.isPVP ? fProxy.wave_id == 1 : fProxy.wave_id == this.total_wave;
            this.fight_result = this.fight_wave_result[this.cur_wave];
            var facade = mx.ApplicationFacade.getInstance();
            var jjcproxy = facade.retrieveProxy(mx.LueDuoProxy.NAME);
            if (jjcproxy.huifang) {
                //回放
                jjcproxy.huifang = false;
                this.clear_fight_view();
                fProxy.setResult(this.adata.result);
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FightView.S_NAME);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.FightResultView.S_NAME,
                    "param": {
                        "awards": [],
                        "sl": Number(this.adata.result) == 1,
                        "huifang": true
                    }
                });
                return;
            }
            fProxy.setResult(this.fight_result);
            if (mx.MX_COMMON.IN_GUIDE) {
                if (fProxy.yindao_fight == 2) {
                    this.fight_result = 2;
                    var p_d = { "name": mx.FightResultView.S_NAME, "param": { "sl": 0 } };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                }
                else if (fProxy.yindao_fight == 3) {
                    var p_d = { "name": mx.FightResultView.S_NAME, "param": { "sl": 1 } };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                }
            }
            //回合结束后回复
            for (var key in this.heroes_id) {
                var unit = this._arr_hero[this.heroes_id[key]];
                if (unit && !unit.fighter.die) {
                    //回复能量和生命
                    if (unit.fighter.hps) {
                        unit.fighter.hp = Math.min(unit.fighter.maxHp, unit.fighter.hp + unit.fighter.hps);
                    }
                    if (unit.fighter.mps) {
                        unit.fighter.mp = Math.min(1000, unit.fighter.mp + unit.fighter.mps);
                    }
                }
                unit = null;
            }
            //当前数据存储,用作下一关的起始
            fProxy.save_hero_data(this.heroes_id);
            //失败
            if (this.fight_result != 1) {
                this.send_finish_msg();
                return;
            }
            //如果全部通关，发送数据获取奖励处理
            if (finish) {
                this.send_finish_msg();
            }
            else {
                if (mx.Combat.auto_fight) {
                    if (fProxy.wave_id >= this.next_wave)
                        return;
                    var _loop_1 = function (k) {
                        var role = this_1._arr_hero[k];
                        if (role) {
                            var wm = { "x": 800 };
                            this_1._mxtweens.push(egret.Tween.get(role).to(wm, 1000).call(function () {
                                //加载界面
                                if (k == this.heroes_id.length) {
                                    this.clear_wave_view();
                                    fProxy.setWaveid(Math.min(fProxy.wave_id + 1, this.total_wave));
                                    //英雄数据
                                    var fight_data = {
                                        "1": mx.FightTools.object_clone(fProxy.user_hero_info),
                                        "2": fProxy.enermy_hero_info[fProxy.wave_id],
                                    };
                                    //战斗数据
                                    var p_d = {
                                        "name": FightView.S_NAME,
                                        "param": {
                                            "hero_data": fight_data,
                                            "process": 0
                                        }
                                    };
                                    this.fdata = fight_data;
                                    this.show_fight_result();
                                }
                            }, this_1));
                        }
                    };
                    var this_1 = this;
                    //敌方消失
                    for (var k = 1; k <= this.heroes_id.length; ++k) {
                        _loop_1(k);
                    }
                }
            }
        };
        FightView.prototype.clear_wave_view = function () {
            egret.Tween.removeTweens(this.stage_g);
            //ApplicationFacade.getInstance().sendNotification(MX_NOTICE.CLOSE_MUSIC);
            for (var k in this._arr_hero) {
                var role = this._arr_hero[k];
                if (role) {
                    mx.Combat.enableUlt(k, false);
                    egret.Tween.removeTweens(role);
                    role.on_remove();
                    this._arr_hero[k] = null;
                }
                role = null;
            }
            for (var i in this._mxtweens) {
                if (this._mxtweens[i]) {
                    var temp = void 0;
                    temp = this._mxtweens[i];
                    egret.Tween.removeTweens(temp._target);
                    this._mxtweens[i] = null;
                }
            }
            this._mxtweens = [];
            this._mxtweens = null;
            for (var i = 0; i < this.efs_g.numChildren; i++) {
                var ef = this.efs_g.getChildAt(i);
                if (ef) {
                    ef.on_remove();
                }
                ef = null;
            }
            this.heroes = [];
            this.monsters = [];
            this.fight_result = -1;
            this.round_num = 0;
            this.next_wave = 0;
            this.iswait = false;
            mx.Combat.ult = false;
            this.skip_fight_b.removeChildren();
            this.skip_fight_b.visible = this.speed_b.visible = false;
            for (var i = 1; i < 7; ++i) {
                var role_g = this["m" + i + "_g"];
                if (role_g.numChildren) {
                    var ui = role_g.getChildAt(0);
                    ui.on_remove();
                    ui = null;
                    role_g.removeChildren();
                }
            }
            for (var i = 1; i < 7; ++i) {
                var role_g = this["e" + i + "_g"];
                if (role_g.numChildren) {
                    var ui = role_g.getChildAt(0);
                    ui.on_remove();
                    ui = null;
                    role_g.removeChildren();
                }
            }
            this.cur_wave = 1;
            this.buzhen = {};
            mx.Combat.stage = null;
        };
        FightView.prototype.send_finish_msg = function () {
            var fProxy = this.fproxy;
            var wProxy = this.wproxy;
            mx.Combat.auto_fight = true;
            var lproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.LueDuoProxy.NAME));
            var jproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.JingJiProxy.NAME));
            var sl = this.fight_result == 1 ? "succ" : "fail";
            var tiaoxi = mx.AppConfig.CURR_SCENE_ID == mx.YXDianScreen.S_NAME;
            var jfs = mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME || mx.AppConfig.CURR_SCENE_ID == mx.JFSYJXQScreen.S_NAME;
            var ld = lproxy.isLD;
            var jjc = mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME;
            var stage_id = tiaoxi ? 0 : fProxy.cur_stage;
            var cmd;
            var id = 0;
            var type = 0;
            //剩余人数
            var die_num = 0;
            var result_info = 0;
            var info = this.fproxy.user_hero_info;
            var huifang = 0;
            for (var k in info) {
                if (k == 'zhanwei') {
                    continue;
                }
                if (info[k].state == 'dead') {
                    ++die_num;
                }
            }
            if (tiaoxi) {
                id = wProxy.curr_fz.id;
                cmd = mx.MX_NETS.CS_CHECK_TIAOXI_FIGHT;
            }
            else if (jfs) {
                var mn = wProxy.get_cur_mn();
                id = mn.id;
                cmd = mx.MX_NETS.CS_JFS_CHECK_FIGHT;
                type = wProxy.jfs_type;
            }
            else if (ld) {
                var mn = lproxy.get_cur_user();
                id = mn.user_id;
                cmd = mx.MX_NETS.CS_LUEDUO_RESULT;
            }
            else if (jjc) {
                var enemy = jproxy.cur_enemy;
                id = enemy.user_id;
                type = enemy.type;
                cmd = mx.MX_NETS.CS_JJC_FIGHT_CHECK;
                die_num = mx.Combat.skip_result.die_num;
                result_info = JSON.stringify(mx.FightTools.object_clone(mx.Combat.skip_result.fight_info));
                huifang = JSON.stringify({ "result": this.fight_result, "base_info": this.adata.hero_data, "process": mx.FightTools.object_clone(this.fight_process) });
            }
            else {
                cmd = mx.MX_NETS.CS_FUBEN_GET_AWARD;
            }
            fProxy.clear_award();
            var sign = mx.Tools.jiami(sl, die_num, stage_id);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": cmd,
                "sign": JSON.stringify(sign),
                "id": id,
                "type": type,
                "result_info": result_info,
                "huifang": huifang,
            });
            mx.Combat.clear_fight_info();
            this.clear_fight_view();
        };
        FightView.prototype.show_result = function () {
            var fProxy = this.fproxy;
            this.rect.visible = false; //
            for (var k in this._arr_hero) {
                var role = this._arr_hero[k];
                if (role) {
                    if (role.huanxiang) {
                        role.change_state(mx.GameRole.ROLE_DIE);
                    }
                    else {
                        role.change_state(mx.GameRole.ROLE_WIN);
                    }
                    role = null;
                }
            }
        };
        FightView.prototype.clear_big_end = function (heroid) {
            //釋放動畫效果
            egret.Tween.removeTweens(this.big_lh);
            egret.Tween.removeTweens(this.big_name_g);
            this.big_g.visible = false;
            this.big_lh.visible = false;
            this.big_lh.source = this.big_name.source = null;
            this.big_lh.scaleX = this.big_lh.scaleY = 0.85;
            this.big_lh.alpha = 1;
            this.big_name_g.visible = false;
            this.big_name_g.alpha = 1;
            this.big_name_g.scaleX = this.big_name_g.scaleY = 1.5;
            //矩阵渐变消失
            var view = this;
            view.hero_rect.visible = view.enermy_rect.visible = false;
            view.hero_rect.alpha = view.enermy_rect.alpha = 1;
            //层级正常
            var temp = [1, 2, 3, 4, 5, 6];
            var index = 0;
            var group = mx.Combat.stage[Number(heroid) > 0 ? "hero_g" : "enermy_g"];
            for (var i in temp) {
                var unit = mx.Combat.stage[(Number(heroid) > 0 ? "m" : "e") + temp[i] + "_g"];
                group.setChildIndex(unit, index);
                ++index;
            }
        };
        FightView.prototype.clear_skill_end = function () {
            //釋放動畫效果
            egret.Tween.removeTweens(this.my_lh);
            egret.Tween.removeTweens(this.enermy_lh);
            egret.Tween.removeTweens(this.big_name_g);
            this.rect.visible = this.big_g.visible = false;
            this.my_lh.source = null;
            this.my_lh.visible = false;
            this.my_lh.x = -345;
            this.my_lh.scaleX = this.my_lh.scaleY = 0.72;
            this.my_lh.alpha = 1;
            this.enermy_lh.source = null;
            this.enermy_lh.visible = false;
            this.enermy_lh.x = 480;
            this.enermy_lh.scaleX = this.enermy_lh.scaleY = 0.72;
            this.enermy_lh.alpha = 1;
        };
        FightView.prototype.role_tuchu = function (role_id) {
            //自己人物突出
            var role = this._arr_hero[role_id];
            this.role_index = {};
            var index = 0;
            // for(let key in this._arr_hero){
            //     let r = this._arr_hero[key];//角色
            //     if(r){
            //        this.roles_g.getChildIndex(r);
            //     }
            //     r = null;
            // }
            // for(let key in this._arr_hero){
            //     let r = this._arr_hero[key];//角色
            //     if(r){ 
            //         if(role == r){
            //             this.roles_g.setChildIndex(role,this.roles_g.numChildren - 1);
            //             this.roles_g.setChildIndex(this.rect,this.roles_g.numChildren - 2);
            //         }
            //         else{
            //             this.roles_g.setChildIndex(r,0);
            //         }
            //     }
            //     r = null;
            // }
            role = null;
        };
        FightView.prototype.shake_screen = function () {
            var view = this;
            this.xuehong.visible = true;
            egret.Tween.get(this.stage_g).
                to({ "top": 9, "bottom": 9 }, 1 * FightView.FLASH_DESC).
                to({ "top": 0, "bottom": 0 }, 1 * FightView.FLASH_DESC).
                to({ "top": 6, "bottom": 6 }, 1 * FightView.FLASH_DESC).
                to({ "top": 0, "bottom": 0 }, 1 * FightView.FLASH_DESC).
                to({ "top": 3, "bottom": 3 }, 1 * FightView.FLASH_DESC).
                to({ "top": 0, "bottom": 0 }, 1 * FightView.FLASH_DESC).
                wait(4 * FightView.FLASH_DESC).
                call(function () {
                this.xuehong.visible = false;
                egret.Tween.removeTweens(this.stage_g);
            }, this);
            //c_t.to({ "x": xx + 10 }, 100).to({ "x": xx - 10 }, 200).to({ "x": xx + 10 }, 200).to({ "x": xx }, 100);
        };
        FightView.prototype.fresh_list = function (id, damage, hp, energy, mp) {
            if (energy === void 0) { energy = 0; }
            if (mp === void 0) { mp = 0; }
            var item_data;
            for (var i = 0, l = this.item_arr.length; i < l; ++i) {
                item_data = this.item_arr.getItemAt(i);
                if (item_data.id == id) {
                    if (damage) {
                        item_data.cur_hp = Math.max(0, hp);
                    }
                    if (energy) {
                        item_data.cur_energy = Math.max(0, mp);
                    }
                    this.item_arr.replaceItemAt(item_data, i);
                    break;
                }
            }
        };
        FightView.prototype.stop_fight = function () {
            if (this.round_timer) {
                this.stop_ing = true;
                this.round_timer.stop();
            }
        };
        FightView.prototype.goon_fight = function () {
            if (mx.Combat.skip_fighter)
                return;
            if (this.stop_ing) {
                this.round_timer.start();
            }
        };
        FightView.prototype.clear_fight_view = function () {
            //ApplicationFacade.getInstance().sendNotification(MX_NOTICE.CLOSE_MUSIC);
            if (this.round_timer) {
                this.round_timer.stop();
                this.round_timer.removeEventListener(egret.TimerEvent.TIMER, this.show_round, this);
            }
            egret.Tween.removeTweens(this.stage_g);
            egret.Tween.removeTweens(this);
            dragonBones.WorldClock.clock.clear();
            for (var k in this._arr_hero) {
                var role = this._arr_hero[k];
                if (role) {
                    mx.Combat.enableUlt(k, false);
                    egret.Tween.removeTweens(role);
                    role.on_remove();
                    this._arr_hero[k] = null;
                }
                role = null;
            }
            for (var i in this._mxtweens) {
                if (this._mxtweens[i]) {
                    var temp = void 0;
                    temp = this._mxtweens[i];
                    egret.Tween.removeTweens(temp._target);
                    this._mxtweens[i] = null;
                }
            }
            this._mxtweens = [];
            this._mxtweens = null;
            for (var i = 0; i < this.efs_g.numChildren; i++) {
                var ef = this.efs_g.getChildAt(i);
                if (ef) {
                    ef.on_remove();
                }
                ef = null;
            }
            for (var k in this.atk_arr) {
                var unit = this.atk_arr[k];
                if (unit) {
                    this.atk_arr[k] = null;
                }
                unit = null;
            }
            this.heroes = [];
            this.monsters = [];
            this.fight_result = -1;
            this.round_num = 0;
            this.next_wave = 0;
            this.skip_fight = false;
            this.iswait = false;
            mx.Combat.ult = false;
            this.skip_fight_b.removeChildren();
            this.skip_fight_b.visible = this.speed_b.visible = false;
            for (var i = 1; i < 7; ++i) {
                var role_g = this["m" + i + "_g"];
                if (role_g.numChildren) {
                    var ui = role_g.getChildAt(0);
                    ui.on_remove();
                    ui = null;
                    role_g.removeChildren();
                }
            }
            for (var i = 1; i < 7; ++i) {
                var role_g = this["e" + i + "_g"];
                if (role_g.numChildren) {
                    var ui = role_g.getChildAt(0);
                    ui.on_remove();
                    ui = null;
                    role_g.removeChildren();
                }
            }
            this.cur_wave = 1;
            this.buzhen = {};
            mx.Combat.stage = null;
        };
        FightView.prototype.on_remove = function () {
            this.clear_fight_view();
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.FightViewMediator.NAME);
            facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, { "name": "base" });
        };
        FightView.prototype.fresh_cpop = function (data) {
            this.adata = data;
            this.clear_fight_view();
            this.init_fight_view();
        };
        FightView.prototype.show_effect = function (first) {
            if (!this.display_mode) {
                return;
            }
            var atk_ef = new mx.GeneralEffect(first.id);
            atk_ef.change_framerate(first.type == 'big' ? 20 : 24, 1);
            atk_ef.horizontalCenter = 0;
            atk_ef.verticalCenter = 0;
            //atk_ef.rotation = middle ? 10 : 0; 
            atk_ef.scaleX = atk_ef.scaleY = 2; //type == 'big' ? 2 : 1;
            atk_ef.name = first.id;
            var group;
            if (first.from_hero) {
                group = first.self ? this.hero_g : this.enermy_g;
            }
            else {
                group = first.self ? this.enermy_g : this.hero_g;
            }
            if (first.middle) {
                group = this.efs_g;
            }
            if (!group.getChildByName(first.id)) {
                group.addChild(atk_ef);
            }
        };
        FightView.prototype.rect_change = function (mid, heroid) {
            //flag true 0->1 false 1->0 
            var view = this;
            var rect = Number(heroid) > 0 ? view.hero_rect : view.enermy_rect;
            var role = mx.Combat.stage._arr_hero[heroid];
            var group = mx.Combat.stage[Number(heroid) > 0 ? "hero_g" : "enermy_g"];
            var role_g = mx.Combat.stage[(Number(heroid) > 0 ? "m" : "e") + role.fighter.pos_id + "_g"];
            var pos_id = role.fighter.pos_id;
            var temp = [1, 2, 3, 4, 5, 6];
            temp.splice(temp.indexOf(Number(role.fighter.pos_id)), 1);
            var index = 0;
            for (var i in temp) {
                var unit = mx.Combat.stage[(Number(heroid) > 0 ? "m" : "e") + temp[i] + "_g"];
                group.setChildIndex(unit, index);
                ++index;
            }
            group.setChildIndex(rect, 5);
            group.setChildIndex(role_g, 6);
            rect.alpha = 0;
            rect.visible = true;
            egret.Tween.get(rect).to({ "alpha": 1 }, 10 * FightView.FLASH_DESC).call(function () {
                this.show_big_lihui(mid, heroid);
            }, this).wait(35 * FightView.FLASH_DESC).to({ "alpha": 0 }, 20 * FightView.FLASH_DESC).call(function () {
                this.clear_big_end(heroid);
            }, this);
        };
        FightView.prototype.big_over = function () {
            var ef1 = this.bg_g.getChildByName("big1");
            var ef2 = this.bg_g.getChildByName("big2");
            if (ef1) {
                this.bg_g.removeChild(ef1);
                ef1 = null;
            }
            if (ef2) {
                this.bg_g.removeChild(ef2);
                ef2 = null;
            }
        };
        FightView.prototype.show_skill_lihui = function (mid, hero_id, target_id) {
            var view = this;
            var flag = Number(hero_id) > 0;
            var lihui_start = flag ? -345 : 480;
            var skill_start = flag ? -535 : 480;
            this.big_g.visible = true;
            //运动背景
            view.rect.visible = false;
            //背景
            egret.Tween.get(this.rect).wait(21 * FightView.FLASH_DESC).call(function () {
                this.rect.visible = true;
            }, this).wait(21 * FightView.FLASH_DESC).call(function () {
                this.clear_skill_end();
            }, this);
            //aoe target_id && (Number(target_id) * Number(hero_id) < 0)
            if (0) {
                var target = this._arr_hero[target_id];
                this.my_lh.source = mx.Tools.get_mn_res(flag ? mid : target.hero_info.dragon_id, "lh");
                this.enermy_lh.source = mx.Tools.get_mn_res(flag ? target.hero_info.dragon_id : mid, "lh");
                //先手立绘
                //-550  -316 -284 -290 -290 -252 -316  攻击方
                //232   -53   -53  11  3   11  3  11           被打方
                var lihui = flag ? this.my_lh : this.enermy_lh;
                lihui.x = lihui_start;
                lihui.visible = true;
                this._mxtweens.push(egret.Tween.get(lihui).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 274 : -274) }, 6 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 306 : -306) }, 6 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 300 : -300) }, 5 * FightView.FLASH_DESC).
                    //to({"verticalCenter" : 50,"x" : lihui_start + (flag ? 1 : -1) * 328},12 * FightView.FLASH_DESC).
                    wait(4 * FightView.FLASH_DESC).
                    call(function () {
                    var role = this._arr_hero[hero_id];
                    if (role) {
                        role.continue_skill_atk(true);
                        role = null;
                    }
                }, this).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 338 : -338) }, 3 * FightView.FLASH_DESC).
                    // to({"verticalCenter" : 50,"x" : lihui_start + (flag ? 1 : -1) * 298},3 * FightView.FLASH_DESC).
                    // wait(6 * FightView.FLASH_DESC).
                    //攻击动作
                    //to({"verticalCenter" : 50,"x" : lihui_start + (flag ? 1 : -1) * 328},3 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 274 : -274) }, 6 * FightView.FLASH_DESC).
                    //to({"verticalCenter" : 50,"x" : lihui_start + (flag ? 1 : -1) * 258},6 * FightView.FLASH_DESC).
                    to({ "alpha": 0 }, 7 * FightView.FLASH_DESC));
                //次要立绘 //232   -53   -53  11  3   11  3  11           被打方
                var cyao_lh = flag ? this.enermy_lh : this.my_lh;
                var cyao_start = flag ? 480 : -345;
                cyao_lh.x = cyao_start;
                cyao_lh.visible = true;
                this._mxtweens.push(egret.Tween.get(cyao_lh).
                    wait(6 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 285 }, 6 * FightView.FLASH_DESC).
                    //to({"verticalCenter" : 50,"x" : cyao_start + (flag ? -1 : 1) * 195},9 * FightView.FLASH_DESC).
                    wait(12 * FightView.FLASH_DESC).
                    //wait(9 * FightView.FLASH_DESC).
                    // to({"verticalCenter" : 50,"x" : cyao_start + (flag ? -1 : 1) * 186},2 * FightView.FLASH_DESC).
                    // to({"verticalCenter" : 50,"x" : cyao_start + (flag ? -1 : 1) * 258},2 * FightView.FLASH_DESC).
                    // to({"verticalCenter" : 50,"x" : cyao_start + (flag ? -1 : 1) * 186},2 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 229 }, 2 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 221 }, 2 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 229 }, 2 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 221 }, 2 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": cyao_start + (flag ? -1 : 1) * 229 }, 2 * FightView.FLASH_DESC).
                    to({ "alpha": 0 }, 7 * FightView.FLASH_DESC));
            }
            else {
                //人物avatar移动
                var lihui = flag ? this.my_lh : this.enermy_lh;
                lihui.x = lihui_start;
                lihui.source = mx.Tools.get_mn_res(mid, "lh");
                lihui.visible = true;
                this._mxtweens.push(egret.Tween.get(lihui).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 1 : -1) * 200 }, 6 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 1 : -1) * 328 }, 6 * FightView.FLASH_DESC).
                    to({ "verticalCenter": 50, "x": lihui_start + (flag ? 1 : -1) * 308 }, 7 * FightView.FLASH_DESC).
                    wait(2 * FightView.FLASH_DESC).
                    call(function () {
                    var role = this._arr_hero[hero_id];
                    if (role) {
                        role.continue_skill_atk();
                        role = null;
                    }
                }, this).
                    to({ "scaleX": 1.3, "scaleY": 1.3, "verticalCenter": 0, "alpha": 0 }, 5 * FightView.FLASH_DESC));
            }
        };
        //我方从左到右 敌方从右到左
        FightView.prototype.show_big_lihui = function (mid, hero_id) {
            var flag = Number(hero_id) > 0;
            var lihui_start = flag ? -612 : 720;
            var skill_start = flag ? 770 : -620;
            this.big_g.visible = true;
            //添加运动背景 大招背景 1200ms
            //人物avatar移动
            this.big_lh.scaleX = this.big_lh.scaleY = 0.85;
            this.big_lh.x = lihui_start;
            this.big_lh.source = mx.Tools.get_mn_res(mid, "lh");
            this.big_lh.visible = true;
            //lihui_start + 612 * (flag ? 1 : -1)
            this._mxtweens.push(egret.Tween.get(this.big_lh).to({ "bottom": 0, "x": flag ? -100 : 208 }, 10 * FightView.FLASH_DESC)
                .wait(16 * FightView.FLASH_DESC).to({ "scaleX": 2, "scaleY": 2, "x": (flag ? 720 : -612), "bottom": 0, "alpha": 0 }, 7 * FightView.FLASH_DESC).
                call(function () {
                this.big_over();
            }, this).call(function () {
                var role = this._arr_hero[hero_id];
                if (role) {
                    role.continue_big_atk();
                    role = null;
                }
            }, this));
            //技能名称移动
            this.big_name_g.scaleX = this.big_name_g.scaleY = 1.5;
            this.big_name_g.x = skill_start;
            this.big_dc.source = "ss0_png";
            this.big_name.source = "ss" + mid + "_png";
            this.big_name_g.visible = true;
            this._mxtweens.push(egret.Tween.get(this.big_name_g).to({ "x": 50, "verticalCenter": 100 }, 10 * FightView.FLASH_DESC)
                .wait(16 * FightView.FLASH_DESC).to({ "x": flag ? -620 : 770, "verticalCenter": 100, "alpha": 0 }, 7 * FightView.FLASH_DESC));
        };
        FightView.S_NAME = "FightView";
        FightView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        FightView.L2S = 0.5; //逻辑距离转化为屏幕距离
        FightView.L2T = 800; //逻辑时间单位500ms
        FightView.FLASH_DESC = 40; //动画一个时间帧为40ms
        return FightView;
    }(mx.BasicView));
    mx.FightView = FightView;
    __reflect(FightView.prototype, "mx.FightView");
})(mx || (mx = {}));
//# sourceMappingURL=FightView.js.map
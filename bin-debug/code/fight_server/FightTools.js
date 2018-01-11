/**
 *   @author qianjun
 *   @date 2016.8.2
 *   @desc 战斗辅助工具。
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var FightTool = (function () {
        function FightTool() {
            /*---------------定义一些战斗常量----------------*/
            this.kWidth = 960; //逻辑宽度
            this.kLoopnumbererval = 1000; //每轮时间 单位ms
            this.kTotalTime = 90; //战斗一共多长时间 单位s
            this.kMaxStep = Math.ceil(this.kTotalTime * 1000 / this.kLoopnumbererval); //战斗最多多少回合
            this.kEachResultStep = 50; //每次计算多少回合战斗
            this.kSpeedUpRate = 2; //加速倍数
            this.kInitSpeed = 96; //120;  	//初始速度
            this.kFirstSkillSpeed = 96; //先手技能进场速度
            this.kReadyFightnumbererval = 96; //备战进场时两个order站位间隔
            this.kyReadyFightnumbererval = 72; //y站位间隔
            this.kActionPlayFps = 15; //默认怪物动作播放帧率
            this.kTurnBigTime = 500; //放大招变大时间 单位ms
            this.kBigSkillSlowRate = 1; //大招动作播放减慢倍数
        }
        FightTool.getInstance = function () {
            if (!FightTool.instance) {
                FightTool.instance = new FightTool();
            }
            return FightTool.instance;
        };
        FightTool.prototype.get_hero_by_id = function (hero_data, id) {
            for (var i = 1; i <= 2; i++) {
                if (hero_data[i][id]) {
                    return hero_data[i][id];
                }
            }
            return null;
        };
        /**
         * 根据实际坐标转换成网格
         */
        FightTool.prototype.coordinateToCheck = function (x, y) {
            var _x = Math.ceil(x / this.kReadyFightnumbererval);
            var _y = Math.ceil(y / this.kyReadyFightnumbererval);
            return { 'x': _x, 'y': _y };
        };
        /*---------------------战斗相关接口------------------------------ */
        //伤害计算
        FightTool.prototype.cal_hurt = function (from_id, target_id, skill_id, atk_id) {
            var skill = this.get_skill_info(skill_id);
            var damage_temp = 0;
            var storm_prob = 0;
            var damage = 0;
            var attack, hujia, chuantou, baoji, defence, immunity, holya, holyb, criteff, dodg, dodgeff = 0;
            var from = mx.Combat.stage._arr_hero[from_id].hero_info;
            var target = mx.Combat.stage._arr_hero[target_id].hero_info;
            attack = Math.max(Number(from.AD), 0);
            hujia = Math.max(Number(target.ARM), 0);
            chuantou = Math.max(Number(from.ARMP), 0);
            baoji = Math.max(Number(from.CRIT), 0);
            immunity = Math.max(Number(target.PIMU) || 0, 0);
            holya = Math.max(Number(from.HOLY), 0);
            holyb = Math.max(Number(target.HOLY), 0);
            criteff = Math.max(Number(from.CRITEFF), 0);
            dodg = Math.max(Number(from.DODG), 0);
            dodgeff = Math.max(Number(from.DODGEFF), 0);
            var atk = attack * (1 - Math.max((hujia - chuantou) / (hujia + 1000), 0));
            if (skill_id == 0) {
                //普攻
                damage_temp = 0 - atk;
            }
            else if (skill) {
                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', skill.damageid);
                if (!info) {
                    //只是挂buff
                    return { "damage": 0, "suck": 0, "type": "AD", "miss": false };
                }
                var basic = 0;
                switch (Number(info.basic)) {
                    case 1:
                        basic = atk;
                        break;
                    case 2:
                        basic = from.fighter.hp;
                        break;
                    case 3:
                        basic = target.hero_info.AD;
                        break;
                    case 4:
                        basic = target.fighter.hp;
                        break;
                }
                //基准值*万分率+固定值
                var skill_level = this.get_skill_level(from_id, skill_id);
                damage_temp = basic * ((Number(info.basispoint) + Number(info.growth_basispoint) * skill_level) / 10000) + (Number(info.basicnum) + Number(info.growth_basicnum) * skill_level);
            }
            //伤害
            if (damage_temp < 0) {
                //吸血		
                var lfs = Number(from.LFS);
                var from_suck = 0;
                if (lfs > 0) {
                    //A吸血效果=A.DAM*A.LFS/(150+A.LFS）
                    from_suck = Math.ceil(Math.abs(damage_temp) * lfs / (150 + lfs));
                }
                //暴击率
                storm_prob = baoji / (800 + baoji + hujia);
                //判读是否暴击
                if (storm_prob > 0) {
                    //判断几率
                    var storm = Math.random();
                    if (storm_prob >= storm) {
                        damage_temp = damage_temp * (1.5 + criteff);
                    }
                }
                //神圣值的伤害计算=0.5*(A.HOLY-B.HOLY)/(A.HOLY+B.HOLY),神圣值伤害最低加成为0，不会为负
                var holy_damage = Math.max((holya - holyb), 0) / 5 / 100;
                damage_temp *= (1 + holy_damage);
                //格挡率
                var rand = this.rand_prob(100);
                var gedang = false;
                if (1) {
                    //rand <= dodg
                    gedang = true;
                    var eff = 0.2 + dodgeff;
                    damage_temp *= (1 - eff);
                }
                //破盾一击造成的翻倍数伤害
                var xishu = 1;
                var role = mx.Combat.stage._arr_hero[from];
                if (role) {
                    var idx = role.fighter.state.indexOf("shield_damage_add");
                    xishu = idx > -1 ? 2 : 1;
                }
                if (target.SHIELD > 0) {
                    if ((Math.abs(damage_temp * xishu)) <= target.SHIELD) {
                        damage_temp *= xishu;
                    }
                    else {
                        damage_temp = 0 - (Math.abs(damage_temp) - target.SHIELD / xishu + target.SHIELD);
                    }
                }
                return { "damage": Math.round(damage_temp), "suck": from_suck, "type": "AD", "gedang": gedang };
            }
            else if (damage_temp > 0) {
                //治疗
                damage_temp *= (1 + Math.max(Number(from.HEAL), 0));
                return { "damage": Math.round(damage_temp), "suck": 0, "type": "HEAL", "gedang": false };
            }
            //return {"damage" : heal , "suck" : 0,"type": "HEAL","miss" : false};
        };
        //治疗计算公式
        FightTool.prototype.cal_heal = function (from, target, skill_id, type) {
            if (type === void 0) { type = 'Heal'; }
            //获取技能的信息
            var skill_info = this.get_skill_info(skill_id);
            var skill_group = this.get_skill_group(skill_id);
            //伤害
            var damage = 0;
            var damage_temp = 0;
            var storm_prob = 0;
            var attack, hujia, chuantou, baoji, defence, immunity, holya, holyb = 0;
            //A的攻击力=A.AD*(1-(B.ARM-A.MR)/(M+B.ARM)
            attack = Number(from.AD);
            hujia = Number(target.ARM);
            chuantou = Number(from.ARMP);
            baoji = Number(from.CRIT);
            immunity = Number(target.PIMU) || 0;
            holya = Number(from.HOLY);
            holyb = Number(target.HOLY);
            var atk = attack * (1 - (hujia - chuantou) / (hujia + 1000));
            var skill_level = 0;
            for (var k in from.skill_list) {
                var unit = from.skill_list[k];
                if (parseInt(unit.skill_id) == skill_id) {
                    skill_level = parseInt(unit.skill_level);
                    skill_level = skill_level - parseInt(skill_group.initlevel) + 1;
                    break;
                }
            }
            var extra = 0;
            var attr = "";
            switch (skill_group["skill_id"]) {
                case "4203":
                case "4303":
                    attr = "Script Arg1";
                    break;
                default:
                    attr = "BasicNum";
                    break;
            }
            for (var i = 1; i <= 5; ++i) {
                if (skill_group["Growth" + i + "Field"] == attr) {
                    extra = Number(skill_group.BasicGrowth) + Number(skill_group["Growth" + i + "Multiplier"]) * Number(skill_group["Growth" + i + "Value"]) * skill_level;
                    break;
                }
            }
            var heal = Math.round((atk * Number(skill_info.ratio) + extra + Number(skill_info.basicnum)) * (1 + Number(from.HEAL) / 100));
            return heal;
        };
        //根据龙id，当前龙技能解锁到哪一等级，技能用到第几个step获取当前技能id
        FightTool.prototype.get_skill_order = function (hero_id) {
            var hero = mx.Combat.stage._arr_hero[hero_id];
            if (!hero) {
                return 0;
            }
            //怒气满 放大招
            if ((!hero.is_hero || (hero.is_hero && (mx.Combat.auto_fight || mx.Combat.skip_fighter))) && hero.fighter.bigSkill && hero.fighter.mp >= 1000) {
                var big = hero.fighter.bigSkill;
                hero = null;
                return big;
            }
            //概率计算 释放技能
            var sel_skill = 0;
            for (var i in hero.fighter.skills) {
                var skill = hero.fighter.skills[i];
                var info = this.get_skill_info(skill.skill_id);
                //非满怒
                if (Number(info.state) == 2) {
                    //计算概率
                    var percent = Number(info.percent); // + skill.level * Number(info.growth_percent)
                    var suc = this.rand_prob(100) < (percent / 100);
                    if (suc) {
                        sel_skill = skill.skill_id;
                        break;
                    }
                }
            }
            hero = null;
            return sel_skill;
        };
        /*---------------------获取数据接口------------------------------ */
        //object深度复制，规避js原有的引用传递
        FightTool.prototype.object_clone = function (source) {
            var data = {};
            for (var key in source) {
                if (source[key] == null) {
                    continue;
                }
                if (this.getType(source[key]) == 'object') {
                    data[key] = this.object_clone(source[key]);
                }
                else if (this.getType(source[key]) == "array") {
                    data[key] = this.arr_clone(source[key]);
                }
                else {
                    data[key] = source[key];
                }
            }
            return data;
        };
        //arr深度复制,对所有复杂arr均有效，规避js原有的引用传递
        FightTool.prototype.arr_clone = function (source) {
            var destination = [];
            for (var key in source) {
                var p = parseInt(key);
                if (this.getType(source[p]) == "array") {
                    destination[p] = [];
                    arguments.callee(destination[p], source[p]);
                }
                else if (this.getType(source[p]) == "object") {
                    destination[p] = {};
                    destination[p] = this.object_clone(source[p]);
                }
                else {
                    destination[p] = source[p];
                }
            }
            return destination;
        };
        FightTool.prototype.getType = function (o) {
            var _t;
            return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
        };
        /**
         * 获得skill详细信息
         * @param	skill_id
         * @return  skill_info
         */
        //
        FightTool.prototype.get_skill_info = function (skill_id) {
            var skill = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWWX, 'id', skill_id);
            return skill;
        };
        FightTool.prototype.get_skill_group = function (skill_id) {
            var skill = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', skill_id);
            return skill;
        };
        FightTool.prototype.get_hero = function (hero_id) {
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', hero_id);
            return hero;
        };
        FightTool.prototype.get_buff_info = function (buff_id) {
            var buff = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', buff_id);
            return buff;
        };
        //随机max内数字
        FightTool.prototype.rnd = function (seed) {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / (233280.0);
        };
        FightTool.prototype.rand_prob = function (max) {
            var today = new Date();
            var seed = today.getTime();
            var bas = this.rnd(seed);
            return Math.ceil(bas * max);
        };
        FightTool.prototype.get_quality_add = function (hero_id, hero_pinzhi) {
            var t = mx.ApiTool.getAPINode(mx.MX_APINAME.QUALITYADD, 'hero_id', hero_id, 'quality', 6); //hero_pinzhi);
            return t;
        };
        //根据英雄的品质，等级计算属性+装备加成
        //新加后宫属性加成
        FightTool.prototype.cal_hero_prop = function (hero, type, dress, hero_arr, jiuzi) {
            if (type === void 0) { type = 0; }
            var hero_info = this.get_hero(hero.mid);
            if (!hero_info) {
                return null;
            }
            var quality_add = this.get_quality_add(hero.mid, hero.quality);
            if (!quality_add) {
                return null;
            }
            //字段
            var arr = ["HP", "AD", "ARM", "CRIT", "ARMP", "LFS", "HIT", "DODG", "HOLY", "HEAL", "HPS", "MPS", "CDR", "PIMU", "STR", "AGI", "INT"];
            var prop = {};
            //初始化
            var index;
            for (var i in arr) {
                index = arr[i];
                prop[index + "_add"] = 0;
            }
            //装备属性加成
            var equips = hero.equip;
            if (typeof equips == "string") {
                equips = JSON.parse(equips);
            }
            if (equips.length) {
                for (var i in equips) {
                    var e = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', equips[i]);
                    for (var j in arr) {
                        var attr = arr[j];
                        if (!prop[arr[j] + "_equip_add"]) {
                            prop[arr[j] + "_equip_add"] = 0;
                        }
                        prop[arr[j] + "_equip_add"] += parseInt(e[attr]) || 0;
                    }
                }
            }
            //服装属性加成
            var cproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ClothesProxy.NAME));
            if (!dress) {
                dress = cproxy.dressed_data;
            }
            var obj = {};
            for (var d in dress) {
                var c_id = dress[d].cloth_id;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", c_id);
                var qh = Number(dress[d].qianghua) || 0;
                var xx = Math.min(6, (Number(dress[d].jinjie) + Number(api.level)) || 1);
                var t_obj = cproxy.cal_shuxing(c_id, qh, xx);
                for (var m in t_obj) {
                    if (obj[m]) {
                        obj[m] += t_obj[m];
                    }
                    else {
                        obj[m] = t_obj[m];
                    }
                }
            }
            for (var m in obj) {
                if (!prop[m + "_cloth_add"]) {
                    prop[m + "_cloth_add"] = 0;
                }
                prop[m + "_cloth_add"] += obj[m] || 0;
            }
            //三维属性成长星级加成	
            var AGI = "AGI" + hero.star;
            var INT = "INT" + hero.star;
            var STR = "STR" + hero.star;
            prop["STR_add"] = (hero.level - 1) * hero_info[STR];
            prop["AGI_add"] = (hero.level - 1) * hero_info[AGI];
            prop["INT_add"] = (hero.level - 1) * hero_info[INT];
            hero_info["HIT"] = 100;
            //星级加成
            var star_add = mx.ApiTool.getAPINode(mx.MX_APINAME.STARADD, 'hero_id', hero.mid, 'star', hero.star);
            if (star_add) {
                for (var i_1 in star_add) {
                    if (arr.indexOf(i_1) > -1) {
                        prop[i_1 + "_add"] += Number(star_add[i_1]);
                    }
                }
            }
            //皇宫属性加成
            var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            var place_add = mx.ApiTool.getAPINode(mx.MX_APINAME.HOUGONGBUFF, "level", pproxy.level);
            if (place_add) {
                for (var i_2 in place_add) {
                    if (arr.indexOf(i_2) > -1) {
                        prop[i_2 + "_add"] += Number(place_add[i_2]);
                    }
                }
            }
            //品质属性加成
            for (var k in arr) {
                var a = arr[k];
                if (parseInt(quality_add[a]) > 0) {
                    if (!prop[a + "_quality_add"]) {
                        prop[a + "_quality_add"] = 0;
                    }
                    prop[a + "_quality_add"] += quality_add[a]; // + quality_add["E_" + a];
                }
            }
            // if(!jiuzi){
            // 	let hproxy = <HeroProxy><any> (ApplicationFacade.getInstance().retrieveProxy(HeroProxy.NAME));
            // 	let t_hero = hproxy.get_hero_by_mid(hero_info.id);
            // 	if(t_hero && t_hero.nine_word){
            // 		jiuzi = t_hero.nine_word;
            // 	}else{
            // 		jiuzi = [0,0,0,0,0,0,0,0,0];
            // 	}
            // }
            // let add_api;
            // for(let k in jiuzi){
            // 	if(Number(jiuzi[k]) > 0){
            // 		add_api = ApiTool.getAPINode(MX_APINAME.JIUZIADD, "type", Number(k) + 1);
            // 		let add_lv = Math.min(add_api.max_level, jiuzi[k] - 1); 
            // 		if(!prop["AD" + "_jiuzilv_add"]){
            // 			prop["AD" + "_jiuzilv_add"] = 0;
            // 		}
            // 		if(!prop["HP" + "_jiuzilv_add"]){
            // 			prop["HP" + "_jiuzilv_add"] = 0;
            // 		}
            // 		prop["AD" + "_jiuzilv_add"] += (Number(add_api.EffectValue1) + add_lv * Number(add_api.GrowthValue1));
            // 		prop["HP" + "_jiuzilv_add"] += (Number(add_api.EffectValue2) + add_lv * Number(add_api.GrowthValue2));
            // 	}
            // }
            //被动属性加成
            if (hero.skills) {
                for (var j_1 in hero.skills) {
                    var skill = hero.skills[j_1];
                    var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEW, 'id', skill.skill_id);
                    var skill_group = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', skill.skill_id);
                    if (skill_info && skill_group && skill_info.type == 'passive') {
                        if (arr.indexOf(skill_info.skilltype) > -1) {
                            if (!prop[skill_info.skilltype + "_pass"]) {
                                prop[skill_info.skilltype + "_pass"] = 0;
                            }
                            // let jiuzi_add = 0;
                            // let pass_jiuzi = ApiTool.getAPINode(MX_APINAME.JIUZIKAIQI, "add_skill", skill.skill_id);
                            // if(pass_jiuzi && jiuzi[Number(pass_jiuzi.jiuzi) - 1] >= 6){
                            // 	jiuzi_add = Number(pass_jiuzi.extra_add_num);
                            // }
                            prop[skill_info.skilltype + "_pass"] += (Number(skill.skill_level) * Number(skill_group.Growth1Multiplier) * (Number(skill_group.Growth1Value)));
                        }
                    }
                }
            }
            //部分属性的额外加成
            var str_init = Number(hero_info.STR) + prop["STR_add"];
            var agi_init = Number(hero_info.AGI) + prop["AGI_add"];
            var int_init = Number(hero_info.INT) + prop["INT_add"];
            var str_equip_add = (prop["STR_equip_add"] ? prop["STR_equip_add"] : 0) + (prop["STR_pass"] || 0);
            var agi_equip_add = (prop["AGI_equip_add"] ? prop["AGI_equip_add"] : 0) + (prop["AGI_pass"] || 0);
            var int_equip_add = (prop["INT_equip_add"] ? prop["INT_equip_add"] : 0) + (prop["INT_pass"] || 0);
            prop["STR_quality_add"] = prop["STR_quality_add"] ? prop["STR_quality_add"] : 0;
            prop["AGI_quality_add"] = prop["AGI_quality_add"] ? prop["AGI_quality_add"] : 0;
            prop["INT_quality_add"] = prop["INT_quality_add"] ? prop["INT_quality_add"] : 0;
            var str = str_init + str_equip_add + prop["STR_quality_add"];
            var agi = agi_init + agi_equip_add + prop["AGI_quality_add"];
            var int = int_init + int_equip_add + prop["INT_quality_add"];
            //主属性加AD
            var p_attri;
            var hp_fate = 1;
            var ad_fate = 1;
            var arm_fate = 1;
            var fate_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HEROFATE, "h_id", hero.mid);
            for (var k_1 in fate_apis) {
                if (mx.Tools.check_fate(fate_apis[k_1].id, hero_arr)) {
                    switch (fate_apis[k_1].Add_type) {
                        case "HP":
                            hp_fate += Number(fate_apis[k_1].Add_num) / 100;
                            break;
                        case "AD":
                            ad_fate += Number(fate_apis[k_1].Add_num) / 100;
                            break;
                    }
                }
            }
            // let jiuzi_apis = ApiTool.getAPINodes(MX_APINAME.JIUZIKAIQI, "hero_id", hero.mid, "leixing", 2);
            // let jiuzi_apis2 = ApiTool.getAPINodes(MX_APINAME.JIUZIKAIQI, "hero_id", hero.mid, "leixing", 3);
            // for(let k in jiuzi_apis){//九字百分比
            // 	if(jiuzi[Number(jiuzi_apis[k].jiuzi) - 1] >= 6){
            // 		switch(jiuzi_apis[k].extra_add_type){
            // 			case "HP":
            // 				hp_fate += Number(jiuzi_apis[k].extra_add_num) / 100;
            // 				break;
            // 			case "AD":
            // 				ad_fate += Number(jiuzi_apis[k].extra_add_num) / 100;
            // 				break;
            // 			case "ARM":
            // 				arm_fate += Number(jiuzi_apis[k].extra_add_num) / 100;
            // 				break;
            // 		}
            // 	}
            // }
            // for(let k in jiuzi_apis2){//九字固定值
            // 	if(jiuzi[Number(jiuzi_apis2[k].jiuzi) - 1] >= 6){
            // 		if(!prop[jiuzi_apis2[k].extra_add_type + "_jiuzilv_add"]){
            // 			prop[jiuzi_apis2[k].extra_add_type + "_jiuzilv_add"] = 0;
            // 		}
            // 		prop[jiuzi_apis2[k].extra_add_type + "_jiuzilv_add"] += Number(jiuzi_apis2[k].extra_add_num);
            // 	}
            // }
            switch (hero_info['MainAttrib']) {
                case 'STR':
                    p_attri = str;
                    prop["AD_add"] += (((agi_init * ad_fate + agi_equip_add + prop["AGI_quality_add"]) * 0.4 + (str_init * ad_fate + str_equip_add + prop["STR_quality_add"]) + (int_init * ad_fate + int_equip_add + prop["INT_quality_add"]) * 0.2) * 1.5);
                    break;
                case 'AGI':
                    p_attri = agi;
                    prop["AD_add"] += (((agi_init * ad_fate + agi_equip_add + prop["AGI_quality_add"]) * 0.4 + (agi_init * ad_fate + agi_equip_add + prop["AGI_quality_add"]) + (int_init * ad_fate + int_equip_add + prop["INT_quality_add"]) * 0.2) * 1.5);
                    break;
                case 'INT':
                    p_attri = int;
                    prop["AD_add"] += (((agi_init * ad_fate + agi_equip_add + prop["AGI_quality_add"]) * 0.4 + (int_init * ad_fate + int_equip_add + prop["INT_quality_add"]) + (int_init * ad_fate + int_equip_add + prop["INT_quality_add"]) * 0.2) * 1.5);
                    break;
            }
            prop["HP_add"] += (str_init * hp_fate + str_equip_add + prop["STR_quality_add"]) * 18;
            prop["ARM_add"] += (str_init * arm_fate + str_equip_add + prop["STR_quality_add"]) * 0.15 + (agi_init * arm_fate + agi_equip_add + prop["AGI_quality_add"]) * 0.04 + (int_init * arm_fate + int_equip_add + prop["INT_quality_add"]) * 0.04;
            prop["CRIT_add"] += agi * 0.4;
            // //封印之力加成
            // for(let i in hero.fy_skill){
            // 	let unit = ApiTool.getAPINode(MX_APINAME.SOUL, "id", i);
            // 	if(hero.fy_skill[i].level){
            // 		let value1 = Number(unit.EffectValue1) + Number(unit.GrowthValue1) * (Number(hero.fy_skill[i].level) - 1);
            // 		switch(Number(i)){
            // 			case 6:
            // 				prop['HIT_add'] += (100 * value1 / 100);
            // 				break;
            // 			case 7:
            // 				prop['HP_add'] += value1;
            // 				break;
            // 		}
            // 	}
            // 	else{
            // 		continue;
            // 	}
            // }
            //返回结果
            var result = {};
            for (var k in arr) {
                index = arr[k];
                if (typeof hero_info[index] == 'undefined') {
                    hero_info[index] = 0;
                }
                var basic_sx = Number(hero_info[index]);
                if (index == "HP") {
                    basic_sx *= hp_fate;
                }
                else if (index == "AD") {
                    basic_sx *= ad_fate;
                }
                var num = (basic_sx + prop[index + "_add"] + (prop[index + "_pass"] || 0) + (prop[index + "_cloth_add"] || 0) + (prop[index + "_quality_add"] || 0) + (prop[index + "_jiuzilv_add"] || 0));
                num = num.toFixed(0);
                if (prop[index + "_equip_add"]) {
                    if (mx.Lang.h0058[k]) {
                        result[mx.Lang.h0058[k]] = num + "+" + prop[index + "_equip_add"];
                    }
                    if (type) {
                        result[index] = Number(num) + prop[index + "_equip_add"];
                    }
                }
                else {
                    if (mx.Lang.h0058[k]) {
                        result[mx.Lang.h0058[k]] = num.toString();
                    }
                    if (type) {
                        result[index] = Number(num);
                    }
                }
            }
            return result;
        };
        FightTool.prototype.gcd = function (n, m) {
            if (m == 0)
                return n;
            return this.gcd(m, n % m);
        };
        //计算真实战斗力
        FightTool.prototype.cal_real_power = function (hero, skip) {
            var d = hero;
            if (!skip) {
                d = this.cal_hero_prop(hero, 1);
            }
            var attr;
            //字段
            var arr = ["HP", "AD", "ARM", "ARMP", "CRIT", "HPS", "MPS", "DODG", "HIT", "LFS", "CDR", "HOLY", "HEAL", "PIMU"];
            //技能战斗力
            var cd1 = 0;
            var cd2 = 0;
            if (hero.skills) {
                for (var j in hero.skills) {
                    var skill = hero.skills[j];
                    var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEW, 'id', skill.skill_id);
                    if (skill_info) {
                        if (skill_info.action_s == 'atk') {
                            cd1 = Number(skill_info.CD) + Number(skill_info.globalcd);
                        }
                        else if (skill_info.action_s == 'atk2') {
                            cd2 = Number(skill_info.CD) + Number(skill_info.globalcd);
                        }
                    }
                }
            }
            //最大公约
            var num = this.gcd(cd2 - 1, cd1);
            //最小公倍
            var lcm = cd1 * (cd2 - 1) / num;
            if (num == 0) {
                lcm = 1;
            }
            var cd = (cd1 - 1) / lcm;
            if (cd < 0) {
                cd = 1;
            }
            var power = d.HP + d.AD * 0.4 * (d.LFS || 1) * d.AD * (1000 + d.ARM) * (500 + (d.HIT || 100)) * (800 + 2 * (d.CRIT) || 0) * (1000 + (d.ARMP || 0)) * (500 + (d.DODG || 0)) * (d.HOLY || 1) * (1 - (d.PIMU || 0)) / ((150 + (d.LFS || 0)) * cd * (1 - (d.CDR || 0)) * (800 + (d.CRIT || 0)) * cd * (1 - (d.CDR || 0)));
            power = Math.pow(power, 1 / 3);
            return Math.round(power);
        };
        //计算显示战斗力
        FightTool.prototype.cal_fight_power = function (hero, skip, dress, hero_arr, jiuzi) {
            var d = hero;
            if (!skip) {
                d = this.cal_hero_prop(hero, 1, dress, hero_arr, jiuzi);
            }
            if (!d) {
                return 0;
            }
            var zl = 0;
            var big_skill_level = 1;
            if (hero.skills) {
                for (var j in hero.skills) {
                    var skill = hero.skills[j];
                    var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', skill.skill_id);
                    var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEW, 'id', skill.skill_id);
                    if (skill_info) {
                        zl += (Number(skill.skill_level) * (Number(skill_info["LevelupGS"] || 3)) * 100);
                    }
                    if (temp) {
                        if (temp.action_s == 'ult') {
                            big_skill_level = Number(skill.skill_level);
                        }
                    }
                }
            }
            //字段
            var arr = ["HP", "AD", "ARM", "ARMP", "CRIT", "HPS", "MPS", "DODG", "HIT", "LFS", "CDR", "HOLY", "HEAL", "PIMU"];
            var xishu = { "HP": 4, "AD": 150, "ARM": 100, "CRIT": 125, "HPS": 6, "MPS": 15, "DODG": 100, "HIT": 100, "ARMP": 100, "LFS": 60, "CDR": 125, "HEAL": 120, "PIMU": 200, "HOLY": 200 };
            //(HP+AD*0.4*LFS*AD*(M+ARM)*(N+HIT)*(X+2*CRIT)*(M+ARMP)*(N+DODG)*A.HOLY*(1-PIMU)/((150+LFS)*CD*(1-CDR)*(X+CRIT)*CD*(1-CDR))
            for (var i in arr) {
                if (typeof d[arr[i]] == 'undefined') {
                    d[arr[i]] = 0;
                }
                zl += (Number(d[arr[i]]) * (xishu[arr[i]]));
            }
            zl /= 100;
            //封印之力技能战力加成
            // if(hero.fy_skill && ((typeof hero.fy_skill.length != "undefined" && hero.fy_skill.length) || typeof hero.fy_skill.length == "undefined")){ 
            // 	let fy = ApiTool.getAPINode(MX_APINAME.SOULZLADD,'hero_id',hero.mid);
            // 	let xishu = fy.jc.split('|');
            // 	if(hero.fy_skill[xishu[0]]){
            // 		zl += (big_skill_level * Number(hero.fy_skill[xishu[0]].level) * Number(xishu[1]));
            // 	}
            // }
            return Math.round(zl);
        };
        //引导战斗初始化
        FightTool.prototype.init_yindao_fight = function (round) {
            //英雄数据
            var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            var fight_data;
            proxy.set_yindao_fight(round);
            switch (round) {
                case 1:
                    fight_data = {
                        "1": {
                            "1": { "dragon_id": "10002", "HP": 900, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "1501", "skill_level": 1, "big": 1 }, { "skill_id": "1002", "skill_level": 1 }], 'order': 1 },
                            "2": { "dragon_id": "104", "HP": 900, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "3801", "skill_level": 1, "big": 1 }, { "skill_id": "1202", "skill_level": 1 }], 'order': 2 },
                            "3": { "dragon_id": "10001", "HP": 2000, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "3701", "skill_level": 1, "big": 1 }, { "skill_id": "3002", "skill_level": 1 }], 'order': 3 },
                        },
                        "2": {
                            "-1": { "dragon_id": "114", "HP": 3000, "dragon_quality": 4, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "10805", "skill_level": 1 }], 'order': 1 },
                            "-2": { "dragon_id": "10003", "HP": 5000, "dragon_quality": 12, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "10705", "skill_level": 1 }], 'order': 2 },
                            "-3": { "dragon_id": "115", "HP": 1500, "dragon_quality": 2, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "11105", "skill_level": 1 }], 'order': 3 },
                        }
                    };
                    break;
                case 2:
                    fight_data = {
                        "1": {
                            "1": { "dragon_id": "1", "HP": 500, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "101", "skill_level": 1, "big": 1 }, { "skill_id": "102", "skill_level": 1 }], 'order': 1 },
                        },
                        "2": {
                            "-1": { "dragon_id": "107", "HP": 400, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "10705", "skill_level": 1 }], 'order': 1 },
                            "-2": { "dragon_id": "108", "HP": 400, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "10805", "skill_level": 1 }], 'order': 2 },
                            "-3": { "dragon_id": "111", "HP": 400, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "11105", "skill_level": 1 }], 'order': 3 },
                            "-4": { "dragon_id": "112", "HP": 400, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "11205", "skill_level": 1 }], 'order': 4 },
                        }
                    };
                    break;
                case 3:
                    fight_data = {
                        "1": {
                            "1": { "dragon_id": "1", "HP": 2000, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "101", "skill_level": 1, "big": 1 }, { "skill_id": "102", "skill_level": 1 }], 'order': 1 },
                            "2": { "dragon_id": "2", "HP": 1500, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "201", "skill_level": 1, "big": 1 }, { "skill_id": "202", "skill_level": 1 }], 'order': 2 },
                            "3": { "dragon_id": "3", "HP": 1500, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "301", "skill_level": 1, "big": 1 }, { "skill_id": "302", "skill_level": 1 }], 'order': 3 },
                        },
                        "2": {
                            "-1": { "dragon_id": "107", "HP": 300, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "13005", "skill_level": 1 }], 'order': 1 },
                            "-2": { "dragon_id": "108", "HP": 300, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "13005", "skill_level": 1 }], 'order': 2 },
                            "-3": { "dragon_id": "111", "HP": 300, "dragon_quality": 1, "dragon_star": 1, "state": "prepare", "skill_list": [{ "skill_id": "13005", "skill_level": 1 }], 'order': 3 },
                        }
                    };
                    break;
            }
            //战斗数据
            var p_d = {
                "name": mx.FightView.S_NAME,
                "param": {
                    "hero_data": fight_data,
                    "process": 0 //FightCore.start_fight(fight_data)
                }
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        //获取技能等级
        FightTool.prototype.get_skill_level = function (from_id, skill) {
            var from = mx.Combat.stage._arr_hero[from_id];
            var skill_info = mx.FightTools.get_skill_info(skill);
            for (var k in from.hero_info.skill_list) {
                var unit = from.hero_info.skill_list[k];
                if (Number(unit.skill_id) == skill) {
                    var skill_level = Number(unit.skill_level);
                    skill_level = skill_level - Number(skill_info.initlevel) + 1;
                    from = null;
                    return skill_level;
                }
            }
            from = null;
            return null;
        };
        //回合外触发攻击
        FightTool.prototype.atk_at_once = function (from_id, skill) {
            var atk = new mx.CommonAttack(skill, from_id, mx.Combat.stage.atk_arr.length);
            mx.Combat.stage.atk_arr.push(atk);
            // 抽取攻击目标
            var target = [];
            var role = mx.Combat.stage._arr_hero[from_id];
            var ret = mx.FightTargets.find_target_in_range(from_id, skill);
            if (ret.ret == 1) {
                var targets = ret.skill_target;
                for (var i in targets) {
                    var temp = mx.Combat.stage._arr_hero[targets[i]];
                    if (!temp || temp.fighter.die) {
                        temp = null;
                        continue;
                    }
                    target.push(targets[i]);
                    temp = null;
                }
                role = null;
                if (!target.length) {
                    return;
                }
                atk.play(target, true);
                atk = null;
            }
        };
        return FightTool;
    }());
    mx.FightTool = FightTool;
    __reflect(FightTool.prototype, "mx.FightTool");
    mx.FightTools = FightTool.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=FightTools.js.map
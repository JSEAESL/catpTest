var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *   @author qianjun
 *   @date 2016.8.1
 *   @desc 战斗控制脚本 负责控制角色属性信息，战斗对象，攻击技能和移动目标位置
 **/
var mx;
(function (mx) {
    var Fighter = (function () {
        function Fighter(s, is_hero, order, id) {
            this.log_t = false;
            // 血量、伤害值、攻击频率、大招冷却时间
            this.id = 0;
            this.MAX_VALUE = 999999999999;
            this.maxHp = 0;
            this.maxMp = 1000;
            this.hp = this.maxHp;
            this.mp = 0;
            this.step = 0;
            this.state = [];
            this.defensers = [];
            this.wave_hp = 0;
            this.wave_mp = 0;
            this.hps = 0;
            this.mps = 0;
            //复活相关
            this.fuhuo_hp = 0;
            this.fuhuo_hp_max = 88888888;
            this.fuhuo_count = 0; //复活倒计时
            this.fuhuo_flag = false; //只可复活一次
            //buff
            this.buff = [];
            // 普通攻击的技能
            this.skills = [];
            // 使用的大招
            this.bigSkill = null;
            //游戏角色
            this.hero_id = 0;
            this.pos_id = 0;
            this.wait_update = false;
            this.blood_skill = false;
            this.basic_attri_num = {};
            //额外伤害
            this.mimu = 1;
            this.renew = false;
            var self = this;
            //备份
            this.basic_info = mx.FightTools.object_clone(s);
            ;
            //基础信息
            self.hero_id = id;
            self.maxHp = Number(s.HP);
            self.mp = s.MP || 0; //1000;//
            self.defensers = [];
            self.wave_hp = s.wave_hp;
            self.wave_mp = s.wave_mp;
            self.hps = parseInt(s.HPS) || 0;
            self.mps = parseInt(s.MPS) || 0;
            self.state = [];
            self.state[0] = "prepare";
            self.renew = false;
            this.pos_id = s.pos_id;
            this.init_skill(s);
        }
        //初始化技能表
        Fighter.prototype.init_skill = function (hero_info) {
            var skill_list = []; //hero_info.skill_list;
            var self = this;
            self.skills = [];
            //作假数据
            var skill = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWWX, 'heroid', hero_info.dragon_id);
            for (var i in skill) {
                if (Number(skill[i].type) == 1) {
                    skill_list.push({
                        "skill_id": skill[i].id,
                        "skill_level": 100
                    });
                }
            }
            hero_info.skill_list = skill_list;
            for (var i in skill_list) {
                var unit = skill_list[i];
                var skill_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWWX, 'id', skill_list[i].skill_id);
                if (skill_1) {
                    if (Number(skill_1.state == 1)) {
                        self.bigSkill = skill_1.id;
                    }
                    self.skills.push({
                        "level": unit.skill_level,
                        "skill_id": unit.skill_id
                    });
                }
            }
            //主动技能排序
            self.skills.sort(function (a, b) {
                return a.priority - b.priority;
            });
        };
        // 重置处理
        Fighter.prototype.reset = function () {
            var self = this;
            // 重置下血量，能量
            self.hp = self.wave_hp ? self.wave_hp : self.maxHp;
            self.mp = self.wave_mp ? self.wave_mp : self.mp;
            // 令其出现
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (role.hero_info.battle_soul) {
                //封印之力
                var fy = role.hero_info.battle_soul['2'];
                if (fy) {
                    //战斗开始时，额外拥有{0}点能量
                    var info = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '2');
                    if (info) {
                        var value1 = Number(info.EffectValue1) + Number(info.GrowthValue1) * (Number(fy) - 1);
                        this.add_mp(value1);
                    }
                }
            }
            self.state[0] = "stand";
            self.step = 1;
            this.cur_skill = mx.FightTools.get_skill_order(this.hero_id);
            role.isPlaying = true;
            role.paused = false;
            self.resumeIdle();
            if (mx.Combat.stage.display_mode) {
                if (this.fProxy.yindao_fight == 0 && !mx.Combat.is_click_skip) {
                    mx.Combat.is_click_skip = true;
                    mx.Combat.stage.skip_fight_b.visible = true;
                    var new_ef = new mx.GeneralEffect("jszdou");
                    new_ef.change_framerate(24, 1);
                    new_ef.x = 60;
                    new_ef.y = -64;
                    new_ef.set_retain(true);
                    mx.Combat.stage.skip_fight_b.addChild(new_ef);
                    mx.Combat.stage.speed_b.visible = true;
                }
            }
        };
        Object.defineProperty(Fighter.prototype, "fProxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        //帧调度，自动出招
        Fighter.prototype.update = function () {
            var self = this;
            if (self.state.indexOf('prepare') > -1) {
                return;
            }
            // Combat.stage.show_effect("big_impact", Number(this.hero_id) > 0 ,"");
            // return;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (self.die && !role.isdealing) {
                mx.Combat.onDie(role.hero_id);
                return;
            }
            // 大招播放时不允许出招
            if (mx.Combat.ult || !mx.Combat._combating) {
                return;
            }
            ++self.step;
            var stage = mx.Combat.stage;
            if (self.state.indexOf('fuhuo') > -1) {
                if (self.fuhuo_count > 0) {
                    --self.fuhuo_count;
                    return;
                }
                else {
                    if (stage.display_mode) {
                        role.fuhuo_com();
                    }
                    self.fuhuo_count = 0;
                    self.hp = self.fuhuo_hp;
                    self.fuhuo_hp_max = 88888888;
                    self.resumeIdle();
                    self.state.splice(self.state.indexOf('fuhuo'), 1);
                    if (role.hero_info.dragon_id == '52') {
                        self.fuhuo_flag = true;
                    }
                }
            }
            //执行buff效果
            self.do_buff_effect();
            //检测数值是否异常
            //self.check_attr();
            //处理buff带来的效果
            var state_arr = ['stun', 'frozen'];
            for (var i in state_arr) {
                if (self.state.indexOf(state_arr[i]) > -1) {
                    return;
                }
            }
            //筛选当前回合技能
            if (self.state.indexOf('SILENCE') > -1) {
                this.cur_skill = 0;
            }
            else {
                this.cur_skill = mx.FightTools.get_skill_order(this.hero_id);
            }
            // 对象不处于idle状态，不能出招
            if (self.die || role.paused || !role.isPlaying)
                return;
            //怪物调度
            if (this.skill_ok() && this.cur_skill == self.bigSkill && (!role.is_hero || (role.is_hero && (mx.Combat.auto_fight || mx.Combat.skip_fighter)))) {
                // 怪物出大招
                var retb = mx.FightTargets.find_target_in_range(this.hero_id, this.bigSkill);
                if (retb.ret == 1) {
                    self.defensers = [];
                    self.defensers = retb.skill_target;
                    self.bigAttack();
                    this.reset_mp();
                }
                return;
            }
            if (this.skill_ok()) {
                var ret = mx.FightTargets.find_target_in_range(this.hero_id, this.cur_skill);
                if (ret.ret == 1) {
                    if (self.skill_ok()) {
                        self.defensers = [];
                        self.defensers = ret.skill_target;
                        self.commonAttack();
                        return;
                    }
                }
            }
            role = null;
        };
        Fighter.prototype.commonAttack = function () {
            var self = this;
            // 使用的技能
            var atk;
            atk = new mx.CommonAttack(this.cur_skill, self.hero_id, mx.Combat.stage.atk_arr.length);
            mx.Combat.stage.atk_arr.push(atk);
            // 抽取攻击目标
            var target = [];
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (this.fProxy.yindao_fight == 1) {
                var rid = this.hero_id % 5 ? this.hero_id : 1;
                target.push(0 - Number(rid));
            }
            else {
                for (var i in self.defensers) {
                    var temp = mx.Combat.stage._arr_hero[self.defensers[i]];
                    if (!temp || temp.fighter.die) {
                        temp = null;
                        continue;
                    }
                    target.push(self.defensers[i]);
                    temp = null;
                }
            }
            role = null;
            if (!target.length) {
                return;
            }
            atk.play(target);
            atk = null;
        };
        Fighter.prototype.add_mp = function (num) {
            var self = this;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var stage = mx.Combat.stage;
            if (role && !self.die) {
                self.mp = Math.min(self.mp + num, 1000);
                if (stage.display_mode) {
                    //让list对应的能量数据发生变化
                    role.set_mp((self.mp / self.maxMp) * 100);
                }
            }
            role = null;
        };
        Fighter.prototype.cal_hp = function (num) {
            var self = this;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (role && !self.die) {
                num = Math.round(num);
                if (self.state.indexOf('fuhuo') > -1) {
                    self.fuhuo_hp_max = Math.max(self.fuhuo_hp_max + num, 0);
                    if (!mx.Combat.skip_fighter) {
                        role.set_blood(self.fuhuo_hp_max / self.maxHp * 100, num);
                    }
                }
                else {
                    //播放飘血动画
                    self.hp = num > 0 ? Math.min(self.hp + num, self.maxHp) : Math.max(self.hp + num, 0);
                    if (!mx.Combat.skip_fighter) {
                        role.set_blood(self.hp / self.maxHp * 100, num);
                    }
                    if (!mx.Combat.stage.display_mode) {
                        //血量低于30%释放一次
                        if (self.hp <= (self.maxHp * 0.3) && !this.blood_skill) {
                            //角色阵亡时候 有特殊技能
                            for (var i in this.skills) {
                                var skill = this.skills[i];
                                var info = mx.FightTools.get_skill_info(skill.skill_id);
                                if (Number(info.state) == 5) {
                                    this.blood_skill = true;
                                    ////console.log("============第"+ Combat.stage.fight_round[1]+ "回合============");
                                    ////console.log((Number(this.hero_id) > 0 ? "我方" : "敌方")+ "阵列" + this.pos_id + "血量低于30% 发动技能" + skill.skill_id);
                                    mx.FightTools.atk_at_once(this.hero_id, skill.skill_id);
                                }
                            }
                        }
                    }
                }
            }
            role = null;
        };
        Fighter.prototype.reset_mp = function () {
            var self = this;
            if (!self.die) {
                this.add_mp(-1000);
            }
        };
        // 播放大招
        Fighter.prototype.bigAttack = function () {
            var self = this;
            // 如果对手都死亡了，别出招了
            var win = true;
            if (self.hero_id > 0) {
                win = mx.Combat.stage.monsters_id.length == 0 ? true : false;
            }
            else {
                win = mx.Combat.stage.heroes_id.length == 0 ? true : false;
            }
            if (!win) {
                var big_atk = null;
                big_atk = new mx.ComBigAttack(this.bigSkill, self.hero_id, mx.Combat.stage.atk_arr.length);
                mx.Combat.stage.atk_arr.push(big_atk);
                //放大
                big_atk.play(self.defensers);
                big_atk = null;
            }
        };
        Fighter.prototype.do_buff_effect = function () {
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (!this.buff.length) {
                role = null;
                this.renew = false;
                return;
            }
            var stage = mx.Combat.stage;
            var dodg = true;
            var pimu = true;
            //先检测自身是否有去除负面buff
            if (this.renew) {
                this.clear_debuff();
                this.renew = false;
            }
            for (var i in this.buff) {
                var buff = this.buff[i];
                if (!buff)
                    continue;
                //buff移除 还原各种属性
                var from = mx.Combat.stage._arr_hero[buff.from_id];
                if (!from || buff.cur_step >= buff.total_step) {
                    this.remove_buff(buff);
                    this.buff[i] = null;
                    pimu = dodg = false;
                    continue;
                }
                else {
                    if (buff.cur_step < buff.total_step) {
                        //数值效果
                        if (buff.cur_step == 0) {
                            //计算数值
                            this.cal_buff_value(buff);
                            //生效
                            this.jiesuan_buff_value(buff);
                        }
                        else if (buff.cur_step > 0) {
                            var buff_info = mx.FightTools.get_buff_info(buff.id);
                            //生效频率
                            var rate = Number(buff_info.rate);
                            if ((buff.cur_step % rate) == 0) {
                                //生效
                                this.jiesuan_buff_value(buff);
                            }
                        }
                    }
                }
                if (this.die) {
                    return;
                }
                ++buff.cur_step;
            }
            role = null;
        };
        Fighter.prototype.check_die = function (from_id) {
            var self = this;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var target = mx.Combat.stage._arr_hero[from_id];
            //攻击者加200能量奖励
            if (target && !target.huanxiang) {
                target.fighter.add_mp(200);
                var all_die = true;
                for (var k in target.fighter.defensers) {
                    var unit = mx.Combat.stage._arr_hero[target.fighter.defensers[k]];
                    if (unit && !unit.fighter.die) {
                        unit = null;
                        all_die = false;
                        break;
                    }
                    unit = null;
                }
            }
            // 死亡了
            mx.Combat.onDie(role.hero_id);
            role = null;
            target = null;
        };
        // 受创
        Fighter.prototype.receiveDamage = function (com_atk, remove, first) {
            var self = this;
            if (self.die)
                return;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (!role) {
                role = null;
                return;
            }
            if (self.state.indexOf("UNTARGETABLE") > -1) {
                role = null;
                return;
            }
            var target = mx.Combat.stage._arr_hero[com_atk.hero_id];
            var damage = com_atk.damage[role.hero_id].damage;
            var type = damage > 0 ? "heal" : "damage";
            var gedang = com_atk.damage[role.hero_id].gedang;
            var point = com_atk.pointeff;
            var impact = com_atk.impacteff;
            //攻击者 增加能量值
            if (target) {
                //封印之力
                var add = 0;
                if (target.hero_info.battle_soul) {
                    var fy = target.hero_info.battle_soul['3'];
                    if (fy) {
                        //每次攻击时，额外回复{0}点能量
                        var info = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '3');
                        if (info) {
                            add = Number(info.EffectValue1) + Number(info.GrowthValue1) * (Number(fy) - 1);
                        }
                    }
                }
                target.fighter.add_mp(100 + add);
            }
            //记录战斗信息
            if (type == 'damage' && mx.Combat.fight_info[com_atk.hero_id]) {
                mx.Combat.fight_info[com_atk.hero_id].damage += Number(damage);
            }
            // 播放飘血动画
            if (type == 'damage') {
                //受击加能量
                var shield = Number(role.hero_info["ShieldValue"]);
                if (com_atk.damage[role.hero_id].type == 'AD' && shield > 0) {
                    if (shield + damage < 0) {
                        this.cal_hp(damage + shield);
                        role.hero_info["ShieldValue"] = 0;
                        var stage = mx.Combat.stage;
                        var idx = -1;
                        for (var i in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]) {
                            if (stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i].hero_id == this.hero_id) {
                                idx = Number(i);
                                break;
                                ;
                            }
                        }
                        if (idx == -1) {
                            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                                "hero_id": this.hero_id
                            });
                            idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                        }
                        if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp) {
                            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp = {};
                        }
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp[com_atk.atk_id] = {
                            "cur_hp": self.hp,
                            "add_num": shield + damage,
                            "from": com_atk.hero_id
                        };
                        //this.shield_impact();
                    }
                    else {
                        this.add_shield(damage);
                    }
                }
                else {
                    this.cal_hp(damage);
                    //受到攻击 反伤伤害
                    for (var i in this.skills) {
                        var skill = this.skills[i];
                        var info = mx.FightTools.get_skill_info(skill.skill_id);
                        if (Number(info.state) == 6) {
                            this.blood_skill = true;
                            ////console.log("============第"+ Combat.stage.fight_round[1]+ "回合============");
                            ////console.log((Number(this.hero_id) > 0 ? "我方" : "敌方")+ "阵列" + this.pos_id + "受到攻击 发动技能" + skill.skill_id);
                            mx.FightTools.atk_at_once(this.hero_id, skill.skill_id);
                        }
                    }
                    //格挡成功
                    if (gedang) {
                        for (var i in this.skills) {
                            var skill = this.skills[i];
                            var info = mx.FightTools.get_skill_info(skill.skill_id);
                            if (Number(info.state) == 7) {
                                ////console.log("============第"+ Combat.stage.fight_round[1]+ "回合============");
                                ////console.log((Number(this.hero_id) > 0 ? "我方" : "敌方")+ "阵列" + this.pos_id + "格挡成功 发动技能" + skill.skill_id);
                                mx.FightTools.atk_at_once(this.hero_id, skill.skill_id);
                            }
                        }
                    }
                    var stage = mx.Combat.stage;
                    var idx = -1;
                    for (var i in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]) {
                        if (stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i].hero_id == this.hero_id) {
                            idx = Number(i);
                            break;
                            ;
                        }
                    }
                    if (idx == -1) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                            "hero_id": this.hero_id
                        });
                        idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                    }
                    if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp = {};
                    }
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp[com_atk.atk_id] = {
                        "cur_hp": self.hp,
                        "add_num": damage,
                        "from": com_atk.hero_id
                    };
                    //受伤增加
                    var num = 1000 * (damage / this.maxHp);
                    var add = 0;
                    if (role.hero_info.battle_soul) {
                        var fy = role.hero_info.battle_soul['4'];
                        if (fy) {
                            //每次受攻击时，额外回复{0}点能量
                            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '4');
                            if (info) {
                                add = Number(info.EffectValue1) + Number(info.GrowthValue1) * (Number(fy) - 1);
                            }
                        }
                    }
                    this.add_mp(Math.abs(num) + add);
                }
            }
            else if (type == 'heal') {
                if (com_atk.damage[role.hero_id].type == 'HEAL') {
                    this.cal_hp(damage);
                    var stage = mx.Combat.stage;
                    var idx = -1;
                    for (var i in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]) {
                        if (stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i].hero_id == this.hero_id) {
                            idx = Number(i);
                            break;
                            ;
                        }
                    }
                    if (idx == -1) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                            "hero_id": this.hero_id
                        });
                        idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                    }
                    if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp = {};
                    }
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_hp[com_atk.atk_id] = {
                        "cur_hp": self.hp,
                        "add_num": damage,
                        "from": com_atk.hero_id
                    };
                }
                else if (com_atk.damage[role.hero_id].type == 'HealMP') {
                    this.add_mp(damage);
                }
            }
            if (self.die) {
                //攻击者加200能量奖励
                if (target && !role.huanxiang) {
                    target.fighter.add_mp(200);
                    var all_die = true;
                    for (var k in target.fighter.defensers) {
                        var unit = mx.Combat.stage._arr_hero[target.fighter.defensers[k]];
                        if (unit && !unit.fighter.die) {
                            unit = null;
                            all_die = false;
                            break;
                        }
                        unit = null;
                    }
                }
                target = null;
                // 死亡了
                mx.Combat.onDie(role.hero_id);
            }
            role = null;
            if (remove) {
                mx.Combat.stage.atk_arr[com_atk.atk_id] = null;
            }
        };
        Fighter.prototype.cal_buff_value = function (buff) {
            var buff_info = mx.FightTools.get_buff_info(buff.id);
            //buff 影响数值
            buff.value = {};
            //属性变化
            if (Number(buff_info.type) == 1) {
                var attr = "";
                //作用对象
                switch (Number(buff_info.target_attr)) {
                    case 1:
                        attr = "HPR";
                        break;
                    case 2:
                        attr = "AD";
                        break;
                    case 3:
                        attr = "ARM";
                        break;
                    case 4:
                        attr = "ARMP";
                        break;
                    case 5:
                        attr = "CRIT";
                        break;
                    case 6:
                        attr = "CRITEFF";
                        break;
                    case 7:
                        attr = "DODG";
                        break;
                    case 8:
                        attr = "DODGEFF";
                        break;
                    case 9:
                        attr = "HEAL";
                        break;
                    case 10:
                        attr = "HOLY";
                        break;
                    case 11:
                        attr = "LFS";
                        break;
                    case 12:
                        attr = "SPEED";
                        break;
                    case 13:
                        attr = "SHIELD";
                        break;
                }
                buff.attr = attr;
                //基准值 0 无基准值 1 施法者ad 2施法者hp 3目标ad 4目标hp 5最终伤害
                var temp_damage1 = 0;
                var from = mx.Combat.stage._arr_hero[buff.from_id];
                var role = mx.Combat.stage._arr_hero[this.hero_id];
                switch (Number(buff_info.basic)) {
                    case 1:
                        temp_damage1 = from.hero_info.AD;
                        break;
                    case 2:
                        temp_damage1 = from.hero_info.HP;
                        break;
                    case 3:
                        temp_damage1 = role.hero_info.AD;
                        break;
                    case 4:
                        temp_damage1 = role.hero_info.HP;
                        break;
                    case 5:
                        temp_damage1 = buff.skill_damage;
                        break;
                }
                //基准值*万分率+固定值
                var value = temp_damage1 * (Number(buff_info.basispoint) + Number(buff_info.growth_basispoint) * buff.skill_level) / 10000 + (Number(buff_info.basicnum) + Number(buff_info.growth_basicnum) * buff.skill_level);
                buff.value[attr] = value * buff.diejia_num;
            }
        };
        //增加buff
        Fighter.prototype.add_buff = function (buff) {
            var self = this;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var stage = mx.Combat.stage;
            if (role) {
                //延迟生效
                var buff_have = false;
                for (var j in self.buff) {
                    var unit = self.buff[j];
                    if (unit) {
                        if (Number(unit.id) == Number(buff.id) && Number(unit.from_id) == Number(buff.from_id)) {
                            //有叠加次数限制 buff相同 则叠加伤害 生效回合取最长
                            buff_have = true;
                            var info = mx.FightTools.get_buff_info(unit.id);
                            if (Number(unit.diejia_num) <= Number(info.composion)) {
                                unit.diejia_num = Number(unit.diejia_num) + 1;
                                unit.cur_step = 0;
                            }
                            break;
                        }
                    }
                }
                //buff.right_now
                if (buff.right_now) {
                    //数值影响
                    this.cal_buff_value(buff);
                    //立即生效
                    this.jiesuan_buff_value(buff);
                    buff.cur_step = 1;
                }
                if (!buff_have) {
                    self.buff.push(mx.FightTools.object_clone(buff));
                    buff_have = false;
                }
            }
            role = null;
        };
        Fighter.prototype.clear_debuff = function () {
            for (var i in this.buff) {
                var buff = this.buff[i];
                if (!buff)
                    continue;
                var flag = (Number(buff.from_id) * Number(this.hero_id)) < 0;
                if (flag) {
                    this.remove_buff(buff);
                    this.buff[i] = null;
                }
            }
        };
        Fighter.prototype.remove_buff = function (buff) {
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var stage = mx.Combat.stage;
            var buff_info = mx.FightTools.get_buff_info(buff.id);
            if (buff_info.icon) {
                //移除图标
                if (!mx.Combat.skip_fighter) {
                    role.remove_buff(buff_info.icon);
                }
            }
            var idx = -1;
            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                "hero_id": this.hero_id
            });
            idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
            if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].remove_buff) {
                stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].remove_buff = [];
            }
            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].remove_buff.push(buff.id);
            //还原基础属性值
            if (Number(buff_info.type) == 1) {
                for (var key in buff.value) {
                    if (key == 'HPR' || key == 'MPR') {
                        role.hero_info[key] -= buff.value[key];
                    }
                    else {
                        var count = 0;
                        for (var i in buff.leiji_value) {
                            var unit = buff.leiji_value[i];
                            count += unit[key];
                        }
                        role.hero_info[key] -= count;
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响，属性" + key + "变化了" + count + "现在已恢复到" + role.hero_info[key]);
                    }
                }
            }
            else {
                var state = "";
                switch (Number(buff_info.type)) {
                    case 2:
                        state = 'stun';
                        break;
                    case 3:
                        state = 'frozen';
                        break;
                    case 4:
                        state = 'renew';
                        break;
                    case 5:
                        state = 'shield_damage_add';
                        break;
                }
                var idx_1 = this.state.indexOf(state);
                if (idx_1 > -1) {
                    this.state.splice(idx_1, 1);
                    ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响状态" + state + "已回复到正常");
                }
            }
        };
        //结算buff生效数值
        Fighter.prototype.jiesuan_buff_value = function (buff) {
            var stage = mx.Combat.stage;
            var role = stage._arr_hero[this.hero_id];
            var buff_info = mx.FightTools.get_buff_info(buff.id);
            //属性变化
            if (Number(buff_info.type) == 1) {
                var attr = buff.attr;
                //影响字段及数值
                if ((attr == 'HPR' || attr == 'MPR')) {
                    if (buff.cur_step == 0) {
                        role.hero_info[attr] += buff.value[attr];
                    }
                }
                else {
                    for (var i in buff.value) {
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响," + i + "属性改变" + buff.value[i] + "原属性" + role.hero_info[attr]);
                        role.hero_info[i] += buff.value[i];
                        buff.leiji_value.push(buff.value);
                    }
                }
                //生命或怒气影响生效
                if (attr == 'HPR') {
                    var hpr = Number(buff.value[attr]) || 0;
                    if (hpr != 0) {
                        if (hpr < 0 && mx.Combat.fight_info[buff.from_id]) {
                            mx.Combat.fight_info[buff.from_id].damage += Number(hpr);
                        }
                        if (Math.abs(hpr) < 1) {
                            hpr = this.maxHp * hpr;
                        }
                        if (role) {
                            ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响,当前回合血量变化" + hpr);
                        }
                        this.cal_hp(hpr);
                        var idx = -1;
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                            "hero_id": this.hero_id
                        });
                        idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                        if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].hp_change) {
                            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].hp_change = [];
                        }
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].hp_change.push({
                            "hp": hpr,
                            "from": buff.from_id,
                            "cur_hp": this.hp,
                        });
                        if (this.die) {
                            this.check_die(buff.from_id);
                            role = null;
                            return;
                        }
                    }
                }
                else if (attr == 'MPR') {
                    var mpr = Number(buff.value[attr]) || 0;
                    if (mpr != 0) {
                        if (Math.abs(mpr) < 1) {
                            mpr = this.maxHp * mpr;
                        }
                        this.add_mp(mpr);
                        if (!stage.display_mode) {
                            var stage_1 = mx.Combat.stage;
                            var idx = -1;
                            for (var i in stage_1.fight_process[stage_1.fight_wave][stage_1.fight_round[stage_1.cur_wave]]) {
                                if (stage_1.fight_process[stage_1.fight_wave][stage_1.fight_round[stage_1.cur_wave]][i].hero_id == this.hero_id) {
                                    idx = Number(i);
                                    break;
                                    ;
                                }
                            }
                            stage_1.fight_process[stage_1.fight_wave][stage_1.fight_round[stage_1.cur_wave]].push({
                                "hero_id": this.hero_id
                            });
                            idx = stage_1.fight_process[stage_1.fight_wave][stage_1.fight_round[stage_1.cur_wave]].length - 1;
                            stage_1.fight_process[stage_1.fight_wave][stage_1.fight_round[stage_1.cur_wave]][idx].add_mp = {
                                "cur_mp": this.mp,
                                "add_num": mpr
                            };
                        }
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响,当前回合能量变化" + mpr);
                    }
                }
            }
            else {
                //2 晕眩 3 冰冻 4 净化 5 增加对护盾伤害
                var state = "";
                switch (Number(buff_info.type)) {
                    case 2:
                        state = 'stun';
                        break;
                    case 3:
                        state = 'frozen';
                        break;
                    case 4:
                        state = 'renew';
                        this.renew = true;
                        break;
                    case 5:
                        state = 'shield_damage_add';
                        break;
                }
                if (this.state.indexOf("UNCONTROLLABLE") == -1) {
                    if (this.state.indexOf(state) == -1) {
                        this.state.push(state);
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id + "受buff" + buff.id + "影响" + state);
                    }
                }
            }
            //播放buff动画效果
            buff_info.icon = Number(this.hero_id) * Number(buff.from_id) < 0 ? 'buff_stone' : "buff_energyback";
            if (buff_info.icon) {
                if (buff.cur_step == 0) {
                    //buff执行光效
                    // let buff_eff = ["buff_damage","buff_dispel","buff_energyback","buff_enhance","buff_immunecontrol","buff_revive","buff_shield","buff_speedup","buff_undead"];
                    // if(Combat.skip_fighter){
                    //     role.add_buff(buff.info.icon , buff_eff.indexOf(buff.info.icon) > -1);
                    // }
                    var idx = -1;
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                        "hero_id": this.hero_id
                    });
                    idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                    if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_buff) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_buff = [];
                    }
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_buff.push(buff.id);
                }
            }
        };
        //加盾
        Fighter.prototype.add_shield = function (num) {
            //加护盾buff
            var self = this;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (role) {
                role.hero_info["SHIELD"] = Math.max(0, num + role.hero_info["SHIELD"]);
            }
        };
        Object.defineProperty(Fighter.prototype, "die", {
            //是否挂了
            get: function () {
                var role = mx.Combat.stage._arr_hero[this.hero_id];
                var flag;
                if (this.state.indexOf('fuhuo') > -1) {
                    flag = this.fuhuo_hp_max <= 0;
                }
                else {
                    flag = this.hp <= 0;
                }
                return flag;
            },
            enumerable: true,
            configurable: true
        });
        // 回到idle状态
        Fighter.prototype.resumeIdle = function () {
            var self = this;
            if (self.die)
                return;
            //切回站立状态
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            role.change_state(mx.GameRole.ROLE_STAND);
            self.state[0] = "stand";
            self.mimu = 1;
            role = null;
        };
        Fighter.prototype.skill_ok = function () {
            var self = this;
            return self.isIdle() || self.state.indexOf('UNCONTROLLABLE') > -1;
        };
        // 当前是否表示处于idle状态
        Fighter.prototype.isIdle = function () {
            if (this.die)
                return false;
            var state_arr = ['stun', 'frozen'];
            for (var i in state_arr) {
                if (this.state.indexOf(state_arr[i]) > -1) {
                    return false;
                }
            }
            return (this.state[0] == 'stand');
        };
        //销毁
        Fighter.prototype.onremove = function () {
            //egret.Tween.removeTweens(this.role);            
        };
        //检测异常数值
        Fighter.prototype.check_attr = function () {
            var self = this;
            if (self.die) {
                return;
            }
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (role) {
                var hero_info = role.hero_info;
                for (var i in hero_info) {
                    var num = Number(hero_info[i]);
                    if (i == 'DODG' && role.hero_info[i] > 100000) {
                        role.hero_info[i] -= 9999999;
                    }
                    if (i == 'PIMU' && role.hero_info[i] > 100) {
                        role.hero_info[i] -= 100;
                    }
                }
            }
        };
        return Fighter;
    }());
    mx.Fighter = Fighter;
    __reflect(Fighter.prototype, "mx.Fighter");
})(mx || (mx = {}));
//# sourceMappingURL=Fighter.js.map
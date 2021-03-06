var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//英雄通用普通攻击
/**
 *   @author qianjun
 *   @date 2016.8.1
 *   @desc 战斗控制脚本 负责控制角色属性信息，战斗对象，攻击技能和移动目标位置
 **/
var mx;
(function (mx) {
    var ComBigAttack = (function () {
        function ComBigAttack(skill, from_id, id) {
            this.attackAni = "";
            this.pointeff = "";
            this.flyEffect = "";
            this.impacteff = "";
            this.flyEffectTime = 0;
            this.flytype = "";
            this.hitTime = 0;
            this._hitCountDown = 0;
            this.hadHit = false;
            this.enable = false;
            this.damage = {};
            this.targets = [];
            this._timeout = null;
            this.atk_id = 0;
            var self = this;
            self.atk_id = id;
            // 攻击时播放的动作
            // self.attackAni = data.attackAni;
            // 释放攻击的对象
            self.hero_id = from_id;
            var from = mx.Combat.stage._arr_hero[from_id];
            this.skill = skill;
            var skill_info = mx.FightTools.get_skill_info(skill);
            // 命中的特效
            // if(skill_info.pointeff != ""){
            //     // var str = skill_info.pointeff.split(".");
            //     // self.pointeff = str[0];
            //     self.pointeff = "";
            // }
            //爆炸特效
            // if(skill_info.impacteff != ""){
            //     // var str=skill_info.impacteff.split(".");
            //     // self.impacteff = str[0];
            //     ;
            // }
            // self.impacteff = skill_info.effect;
            self.flyEffectTime = 1;
            // 从开始到命中的时间
            self.hitTime = Math.random();
            self._hitCountDown = 9999999;
            self.hadHit = true;
            self.enable = false;
            //buff效果
            self.buff = [];
            if (skill == 0) {
                this.skill_level = 100;
            }
            else {
                var from_1 = mx.Combat.stage._arr_hero[from_id];
                this.skill_level = mx.FightTools.get_skill_level(this.hero_id, skill);
                var buffid = skill_info.buffid + "";
                var buff_arr = buffid.split("|");
                if (buff_arr.length) {
                    for (var i in buff_arr) {
                        var buff = {};
                        var buff_info = mx.FightTools.get_buff_info(buff_arr[i]);
                        if (buff_info) {
                            buff.id = buff_arr[i];
                            buff.from_id = from_1.hero_id;
                            buff.skill_id = skill;
                            buff.cur_step = 0;
                            buff.diejia_num = 1;
                            buff.leiji_value = [];
                            buff.skill_level = this.skill_level;
                            //buff.info = buff_info;
                            //生效时间 延迟一回合还是即时
                            if (Number(buff_info.delay) == 0) {
                                //即时生效
                                buff.right_now = true;
                            }
                            buff.total_step = Number(buff_info.continue);
                            buff.value = {};
                            self.buff.push(buff);
                        }
                    }
                }
                from_1 = null;
            }
        }
        // 帧调度，看是否命中了
        ComBigAttack.prototype.update = function () {
            var self = this;
            var role = mx.Combat.stage._arr_hero[self.hero_id];
            if (self.hadHit || !role || role.paused || !self.enable) {
                role = null;
                return;
            }
            role = null;
            self._hitCountDown -= mx.FightView.L2T;
            if (self._hitCountDown <= 0) {
                // 命中的处理
                self.onHit();
            }
        };
        //计算伤害
        ComBigAttack.prototype.cal_damage = function () {
            var self = this;
            var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            var xishu = 1;
            for (var k in self.targets) {
                var unit = mx.Combat.stage._arr_hero[self.targets[k]];
                if (unit) {
                    var unit_info = unit.hero_info;
                    var role = mx.Combat.stage._arr_hero[self.hero_id];
                    var role_info = role.hero_info;
                    if (unit) {
                        self.damage[unit.hero_id] = proxy.yindao_fight == 1 ? { "damage": -900, "suck": 0 } : mx.FightTools.cal_hurt(this.hero_id, self.targets[k], this.skill, this.atk_id);
                        self.damage[unit.hero_id].damage /= xishu;
                    }
                    unit = null;
                    role = null;
                }
            }
        };
        // 开始对目标（可能多个）进行攻击
        ComBigAttack.prototype.play = function (targets) {
            var self = this;
            self.targets = targets;
            var skill_info = mx.FightTools.get_skill_info(this.skill);
            this.cal_damage();
            //播放攻击动作
            self.enable = true;
            self.hadHit = false;
            // 战场和其他参展者全部暂停动作一段时间
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var stage = mx.Combat.stage;
            this.big_end();
            for (var i in self.targets) {
                var target = mx.Combat.stage._arr_hero[self.targets[i]];
                if (target) {
                    if (this.damage[self.targets[i]].damage < 0) {
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id +"用技能" + this.skill +  "攻击了" + (Number(self.targets[i]) > 0 ? "我方" : "敌方") + "阵列" + target.fighter.pos_id + "造成伤害" + this.damage[self.targets[i]].damage);
                    }
                    else if (this.damage[self.targets[i]].damage > 0) {
                        ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id +"用技能" + this.skill +"奶了" + (Number(self.targets[i]) > 0 ? "我方" : "敌方") + "阵列" + target.fighter.pos_id + "一口血" + this.damage[self.targets[i]].damage);
                    }
                    // else{
                    //     //console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id +"给" + (Number(self.targets[i]) > 0 ? "我方" : "敌方") + "阵列" + target.fighter.pos_id + "挂上buff" + skill_info.buffid);
                    // }
                }
            }
        };
        ;
        ComBigAttack.prototype.big_end = function () {
            var self = this;
            if (!mx.Combat.stage) {
                return;
            }
            var stage = mx.Combat.stage;
            var idx = -1;
            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                "hero_id": this.hero_id
            });
            idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
            stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].skill = {
                "id": this.atk_id,
                "target_id": this.targets,
                "damage": this.damage,
                "type": "big",
                "skill_id": this.skill
            };
            this.start = null;
            for (var k in self.targets) {
                if (self.targets[k]) {
                    this.start = self.targets[k];
                    break;
                }
            }
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            var target = mx.Combat.stage._arr_hero[this.start];
            if (!mx.Combat.skip_fighter) {
                if (target && !target.fighter.die) {
                    if (role) {
                        role.change_state(mx.GameRole.ROLE_ATTACK2);
                        role.before_big_attack(self.atk_id);
                    }
                }
            }
            else {
                if (target && !target.fighter.die) {
                    self.enable = true;
                    self.hadHit = false;
                    self.onHit();
                }
            }
            target = null;
            role = null;
        };
        ComBigAttack.prototype.start_effect = function () {
            var self = this;
            egret.clearTimeout(self._timeout);
            self._timeout = null;
            self.enable = true;
            self.hadHit = false;
            if (!mx.Combat._combating)
                return;
            // 计算命中的倒计时
            var target = mx.Combat.stage._arr_hero[this.start];
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            self._hitCountDown = mx.FightView.L2T;
            if (target && role && !mx.Combat.skip_fighter) {
                var x_distance = Math.abs((target.x - role.x));
                var y_distance = (target.y - role.y);
                var id = self.hero_id;
            }
            target = null;
            role = null;
        };
        ComBigAttack.prototype.get_buff_targets = function (id) {
            var arr = [];
            var targets = [];
            var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', id);
            if (!skill_info) {
                return targets;
            }
            var target_hero_id = [];
            //affectedcamp 1己方 0自身 -1 敌方
            var hero_data = [];
            var hero_id = this.hero_id;
            //skill_info.TargetCamp 1 敌方 2 我方 3自己 4当前(目标随伤害目标) 5攻击者(反击)
            //布阵站位
            var buzhen;
            var buzhen_type;
            var flag = Number(hero_id) > 0;
            switch (Number(skill_info.sel_enermy)) {
                case 1:
                    hero_data = flag ? mx.Combat.stage.monsters_id : mx.Combat.stage.heroes_id;
                    buzhen = flag ? mx.Combat.stage.buzhen.enermy : mx.Combat.stage.buzhen.my;
                    buzhen_type = flag ? "enermy" : "my";
                    break;
                case 2:
                    hero_data = flag ? mx.Combat.stage.heroes_id : mx.Combat.stage.monsters_id;
                    buzhen = flag ? mx.Combat.stage.buzhen.my : mx.Combat.stage.buzhen.enermy;
                    buzhen_type = flag ? "my" : "enermy";
                    break;
                case 3:
                    hero_data.push(hero_id);
                    buzhen = flag ? mx.Combat.stage.buzhen.my : mx.Combat.stage.buzhen.enermy;
                    buzhen_type = flag ? "my" : "enermy";
                    break;
                case 4:
                    hero_data = mx.FightTools.arr_clone(this.targets);
                    buzhen = Number(this.targets[0]) > 0 ? mx.Combat.stage.buzhen.my : mx.Combat.stage.buzhen.enermy;
                    buzhen_type = Number(this.targets[0]) > 0 ? "my" : "enermy";
                    break;
            }
            var temp1 = [];
            //布阵站位let temp1 = [];
            //位置选取 0 不按位置选取 1 前排 2后排 3 全体
            switch (Number(skill_info.sel_pos)) {
                case 1:
                    for (var i = 1; i < 4; ++i) {
                        if (buzhen[i]) {
                            temp1.push(mx.FightTargets.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                case 2:
                    for (var i = 4; i < 7; ++i) {
                        if (buzhen[i]) {
                            temp1.push(mx.FightTargets.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                case 3:
                    for (var i = 1; i < 7; ++i) {
                        if (buzhen[i]) {
                            temp1.push(mx.FightTargets.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                default:
                    temp1 = mx.FightTools.arr_clone(hero_data);
                    break;
            }
            //选取数目
            var num = Number(skill_info.num);
            //按属性索敌 1：atk最高 2：atk最低 3：hp最高 4：hp最低 5：arm最高 6：arm最低 7：spd最高 8：spd最低
            var temp2 = [];
            if (Number(skill_info.aim_attr)) {
                var attr = "";
                var sort = "";
                switch (Number(skill_info.aim_attr)) {
                    case 1:
                        attr = "AD";
                        sort = "DESC";
                        break;
                    case 2:
                        attr = "AD";
                        sort = "ASC";
                        break;
                    case 3:
                        attr = "cur_hp";
                        sort = "DESC";
                        break;
                    case 4:
                        attr = "cur_hp";
                        sort = "ASC";
                        break;
                    case 5:
                        attr = "ARM";
                        sort = "DESC";
                        break;
                    case 6:
                        attr = "ARM";
                        sort = "ASC";
                        break;
                    case 7:
                        attr = "SPD";
                        sort = "DESC";
                        break;
                    case 8:
                        attr = "SPD";
                        sort = "ASC";
                        break;
                    default:
                        break;
                }
                temp2 = mx.FightTargets.sort_target_dragons(hero_id, temp1, attr, sort);
            }
            else {
                temp2 = mx.FightTools.arr_clone(temp1);
            }
            //额外范围 无范围索敌 1 列 2周围
            var suodi = Number(skill_info.aoerange);
            if (suodi) {
                var temp3 = [];
                var start_id = mx.FightTargets.get_buzhen_posbyhero_id(temp2[0], buzhen);
                //按阵列索敌
                temp3 = mx.FightTargets.get_targets_byrange(start_id, suodi);
                for (var i in temp3) {
                    target_hero_id.push(mx.FightTargets.mid2heroid(buzhen[temp3[i]], buzhen_type));
                }
            }
            else {
                //正常按数量
                var count = 0;
                for (var i = 0; i < temp2.length; ++i) {
                    if (temp2[i]) {
                        ++count;
                        target_hero_id.push(temp2[i]);
                    }
                    if (count == num) {
                        break;
                    }
                }
            }
            return target_hero_id;
        };
        // 命中的处理
        ComBigAttack.prototype.onHit = function (middle) {
            if (middle === void 0) { middle = false; }
            var self = this;
            self.hadHit = true;
            self.enable = false;
            var stage = mx.Combat.stage;
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            //添加攻击附带buff
            if (this.buff.length) {
                var buff_arr = this.buff;
                for (var i_1 in buff_arr) {
                    var buff = buff_arr[i_1];
                    var buff_have = false;
                    //affectedcamp 1己方 0自身 -1 敌方
                    var targets = [];
                    targets = this.get_buff_targets(buff.id);
                    for (var i_2 in targets) {
                        var target = mx.Combat.stage._arr_hero[targets[i_2]];
                        if (target) {
                            buff.skill_damage = this.damage[targets[i_2]] ? this.damage[targets[i_2]].damage : 0;
                            var buff_info = mx.FightTools.get_buff_info(buff.id);
                            if (buff_info.type == 'Renew') {
                                target.fighter.renew = true;
                            }
                            else {
                                ////console.log("第" + Combat.stage.fight_round[stage.cur_wave] + "回合,"+ (Number(this.hero_id) > 0 ? "我方" : "敌方") + "阵列" + role.fighter.pos_id +"给" + (Number(targets[i]) > 0 ? "我方" : "敌方") + "阵列" + target.fighter.pos_id + "挂上buff" + buff.id);
                                target.fighter.add_buff(mx.FightTools.object_clone(buff));
                            }
                        }
                    }
                }
            }
            // 目标播放受创动作
            for (var i in self.targets) {
                var role_1 = mx.Combat.stage._arr_hero[self.targets[i]];
                if (!role_1)
                    continue;
                var first = null;
                if (Number(i) == 0) {
                    if (!mx.Combat.skip_fighter) {
                        //爆炸特效 "skill_impact"
                        if (!mx.Combat.skip_fighter && self.impacteff != '') {
                            first = {
                                "id": self.impacteff,
                                "from_hero": Number(this.hero_id) > 0,
                                "self": (Number(self.targets[0]) * Number(this.hero_id)) > 0,
                                "type": 'big',
                                "middle": false
                            };
                        }
                        // Combat.stage.show_effect(self.impacteff, Number(this.hero_id) > 0 ,(Number(self.targets[0]) *  Number(this.hero_id)) > 0,"big");
                    }
                }
                this.hit_ef(self.targets[i], i, first);
                role_1 = null;
            }
        };
        //命中后效果
        ComBigAttack.prototype.hit_ef = function (hero_id, i, first) {
            var target = mx.Combat.stage._arr_hero[hero_id];
            var role = mx.Combat.stage._arr_hero[this.hero_id];
            if (target) {
                //自己回血
                if (this.damage[target.hero_id].suck > 0 && role) {
                    role.fighter.cal_hp(this.damage[target.hero_id].suck);
                    var stage = mx.Combat.stage;
                    var idx = -1;
                    for (var i_3 in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]) {
                        if (stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i_3].hero_id == this.hero_id) {
                            idx = Number(i_3);
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
                    if (!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_suck) {
                        stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_suck = 0;
                    }
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].add_suck += this.damage[target.hero_id].suck;
                }
                //目标扣血
                target.fighter.receiveDamage(this, parseInt(i) == this.targets.length - 1, first);
            }
            target = null;
            role = null;
        };
        return ComBigAttack;
    }());
    mx.ComBigAttack = ComBigAttack;
    __reflect(ComBigAttack.prototype, "mx.ComBigAttack");
})(mx || (mx = {}));
//# sourceMappingURL=ComBigAttack.js.map
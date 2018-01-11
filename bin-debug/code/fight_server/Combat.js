var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *   @author qianjun
 *   @date 2016.8.1
 *   @desc 战斗开始脚本
 **/
var mx;
(function (mx) {
    var MXCombat = (function () {
        function MXCombat() {
            // 战斗的时间
            this.duration = 0;
            // 是不是正在播大招？
            this.ult = false;
            // 当前是否战斗中
            this._combating = false;
            this.auto_fight = true;
            // 遮罩的混合色
            // 大招预备的特效
            this.prepareEffect = null;
            //强行结算
            this.cal_skip = false;
            this.prepare = true;
            // 我方和敌人当前的位置，每次前进1格就加1
            this.myPos = 0;
            this.oppPos = 0;
            //战斗直接跳过出结果
            this.skip_fighter = true;
            this.fight_info = {};
            this.is_click_skip = false;
            this.die_my_num = 0;
            this.die_enermy_num = 0;
            this.yingmo_id = 0;
        }
        MXCombat.prototype.init = function (data) {
            if (data) {
                this.stage = null;
                this.stage = data;
            }
        };
        //单例
        MXCombat.getInstance = function () {
            if (!MXCombat.instance) {
                MXCombat.instance = new MXCombat();
            }
            return MXCombat.instance;
        };
        // 开始战斗的处理
        MXCombat.prototype.startCombat = function () {
            var self = this;
            self._combating = true;
            self.duration = 0;
            self.myPos = 0;
            self.oppPos = 0;
            self.die_my_num = 0;
            self.die_enermy_num = 0;
            // 所有怪物回到出生点，然后向中间集结
            // 血量等回满、状态清除等
            this.is_click_skip = false;
            for (var i in self.stage.chushou_arr) {
                var unit = self.stage._arr_hero[self.stage.chushou_arr[i]];
                if (unit) {
                    var fighter = unit.fighter;
                    if (fighter)
                        fighter.reset();
                    fighter = null;
                }
                unit = null;
            }
        };
        MXCombat.prototype.clear_fight_info = function () {
            this.fight_info = null;
            this.fight_info = {};
            this.skip_result = null;
            this.skip_result = {};
        };
        MXCombat.prototype.check_win = function () {
            var my_num = this.stage.hero_num;
            var enermy_num = this.stage.enermy_num;
            var result = 0;
            //都死光了 平局
            if (this.die_my_num == my_num && this.die_enermy_num == enermy_num) {
                result = 0;
            }
            else if (this.die_my_num < my_num && this.die_enermy_num == enermy_num) {
                result = 1;
            }
            else if (this.die_my_num == my_num && this.die_enermy_num < enermy_num) {
                result = 2;
            }
            else {
                result = -1;
            }
            //还没分出胜负
            return result;
        };
        // 开始/停止播放大招
        MXCombat.prototype.enableUlt = function (role_id, enable) {
            var self = this;
            var role = this.stage._arr_hero[role_id];
            if (!role && !self.ult) {
                role = null;
                return;
            }
            enable = enable === undefined ? true : enable;
            self.ult = enable;
            // 其他怪物或宠物变色
            for (var i in self.stage._arr_hero) {
                var o = self.stage._arr_hero[i];
                if (!o)
                    continue;
                if (o === role)
                    continue;
                o.paused = enable;
                o = null;
            }
            if (!this.skip_fighter) {
                //背景动画
                mx.Combat.stage.stop_touch = true;
            }
            role = null;
        };
        //封印之力技能生效
        MXCombat.prototype.fy_effect = function (type, die_id) {
            if (die_id === void 0) { die_id = 0; }
            var self = this;
            switch (type) {
                case "die":
                    for (var i in mx.Combat.stage._arr_hero) {
                        var role = mx.Combat.stage._arr_hero[i];
                        if (role) {
                            if (!role.hero_info.battle_soul) {
                                continue;
                            }
                            var fy = role.hero_info.battle_soul['1'];
                            if (fy) {
                                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '1');
                                if (info) {
                                    //队友阵亡时，回复{0}点能量，敌方阵亡时，回复{1}点能量
                                    var value1 = Number(info.EffectValue1) + Number(info.GrowthValue1) * (Number(fy) - 1);
                                    var value2 = Number(info.EffectValue2) + Number(info.GrowthValue2) * (Number(fy) - 1);
                                    if (Number(i) * die_id < 0) {
                                        //敌方阵亡
                                        role.fighter.add_mp(value2);
                                    }
                                    else {
                                        //己方阵亡
                                        role.fighter.add_mp(value1);
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        };
        //检测是否有人挂了
        MXCombat.prototype.onDie = function (target_id) {
            var target = this.stage._arr_hero[target_id];
            if (!target || target.isdealing) {
                return;
            }
            target.isdealing = true;
            //不在展示模式下  
            if (!mx.Combat.stage.display_mode) {
                var stage = mx.Combat.stage;
                var idx = -1;
                for (var i in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]) {
                    if (stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i].hero_id == target_id) {
                        idx = Number(i);
                        break;
                    }
                }
                if (idx == -1) {
                    stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
                        "hero_id": target_id
                    });
                    idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
                }
                stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].die = true;
                stage.die_arr.push(target_id);
                //角色阵亡时候 有特殊技能
                for (var i in target.fighter.skills) {
                    var skill = target.fighter.skills[i];
                    var info = mx.FightTools.get_skill_info(skill.skill_id);
                    if (Number(info.state) == 4) {
                        ////console.log("============第"+ this.stage.fight_round[1]+ "回合============");
                        ////console.log((Number(target_id) > 0 ? "我方" : "敌方")+ "阵列" + target.fighter.pos_id + "阵亡 阵亡者发动技能" + skill.skill_id);
                        mx.FightTools.atk_at_once(target_id, skill.skill_id);
                    }
                }
                //对于敌对方 也有技能触发
                var arr = Number(target_id) > 0 ? this.stage.monsters_id : this.stage.heroes_id;
                for (var i in arr) {
                    var role = this.stage._arr_hero[arr[i]];
                    for (var j in role.fighter.skills) {
                        var skill = role.fighter.skills[j];
                        var info = mx.FightTools.get_skill_info(skill.skill_id);
                        if (Number(info.state) == 8) {
                            ////console.log("============第"+ this.stage.fight_round[1]+ "回合============");
                            ////console.log((Number(arr[i]) > 0 ? "我方" : "敌方")+ "阵列" + role.fighter.pos_id + "在敌方阵列" + target.fighter.pos_id +"阵亡时 发动技能" + skill.skill_id);
                            mx.FightTools.atk_at_once(arr[i], skill.skill_id);
                        }
                    }
                }
                //封印之力生效
                this.fy_effect('die', target_id);
                if (target.is_hero) {
                    target.huanxiang ? "" : ++this.die_my_num;
                }
                else {
                    target.huanxiang ? "" : ++this.die_enermy_num;
                }
                target.go_die();
                target.change_state(mx.GameRole.ROLE_DIE);
                target = null;
                if (!this._combating) {
                    return;
                }
                var self = this;
                self.stage.fight_result = self.check_win();
                if (self.stage.fight_result != -1) {
                    self._combating = false;
                    this.die_my_num = 0;
                    this.die_enermy_num = 0;
                    this.yingmo_id = 0;
                    if (mx.Combat.stage.stop_ing) {
                        mx.Combat.stage.goon_fight();
                    }
                    return;
                }
            }
            else {
                var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'id', target.hero_info.dragon_id);
                //封印之力生效
                this.fy_effect('die', target_id);
                ////console.log((Number(target_id) > 0 ? "我方" : "敌方") + "英雄" + hero.hero_name + "阵亡");
                target.go_die();
                target.change_state(mx.GameRole.ROLE_DIE);
            }
        };
        return MXCombat;
    }());
    mx.MXCombat = MXCombat;
    __reflect(MXCombat.prototype, "mx.MXCombat");
    mx.Combat = MXCombat.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=Combat.js.map
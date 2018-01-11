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
/*
*author qianjun
*/
var mx;
(function (mx) {
    var EnermyItemRender = (function (_super) {
        __extends(EnermyItemRender, _super);
        function EnermyItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.jinzhan = false;
            return _this;
        }
        EnermyItemRender.prototype.init_render = function () {
            this.fg_flag = false;
            //this.eid = Tools.get_mn_res(this.data.mid,"arole");
            this.eid = mx.Tools.get_mn_res(this.data.mid, "role");
            this.dataChanged();
        };
        EnermyItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this._timeout) {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
            }
            if (this.mcDataFactory) {
                this.mcDataFactory.animation.stop();
                this.mcDataFactory.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.changemc, this);
                dragonBones.WorldClock.clock.remove(this.mcDataFactory);
            }
            this.mc_g.removeChildren();
            this.mcDataFactory = null;
            for (var i = 0; i < this.ef_g.numChildren; ++i) {
                var ui = this.ef_g.getChildAt(i);
                if (ui) {
                    ui.on_remove();
                    this.ef_g.removeChild(ui);
                }
                ui = null;
            }
            egret.Tween.removeTweens(this); //释放tween
            // egret.Tween.removeTweens(this.move_g);//释放tween
            // egret.Tween.removeTweens(this.die_p);//释放tween
        };
        EnermyItemRender.prototype.role_die = function () {
            var view = this;
            // "rotation" : -40
            this.currentState = mx.GameRole.ROLE_DIE;
            for (var i = 0; i < this.ef_g.numChildren; ++i) {
                var ui = this.ef_g.getChildAt(i);
                if (ui) {
                    ui.on_remove();
                    this.ef_g.removeChild(ui);
                }
                ui = null;
            }
            this.ef_g.removeChildren();
            view.ef_g.visible = view.debuff_g.visible = view.buff_g.visible = this.debuff_g.visible = this.buff_g.visible = this.hp_bar.visible = this.energy_bar.visible = false;
            this.hp_bar.value = this.energy_bar.value = 0;
            //播放阵亡语音
            var music = mx.Tools.get_mn_res(this.data.mid, 'role_die');
            var facade = mx.ApplicationFacade.getInstance();
            if (music) {
                facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                    "name": music, "type": "yuyin"
                });
            }
            egret.Tween.get(this.mc_g).to({ "y": -20 }, 10 * mx.FightView.FLASH_DESC).to({ "y": 20, "alpha": 0 }, 10 * mx.FightView.FLASH_DESC).to({ "y": -20 }, 10 * mx.FightView.FLASH_DESC).to({ "y": 20, "alpha": 0 }, 10 * mx.FightView.FLASH_DESC).to({ "y": 0, "alpha": 0 }, 10 * mx.FightView.FLASH_DESC).call(function () {
                this.visible = false;
            }, this);
        };
        EnermyItemRender.prototype.changemc = function (evt) {
            switch (this.curr_state) {
                case mx.GameRole.ROLE_ATTACK1:
                    this.mcDataFactory.animation.play(mx.GameRole.ROLE_STAND, 0);
                    //this.hero_receivedamage('skill');
                    //给自己加能量
                    var id = this.data.id;
                    var role = mx.Combat.stage._arr_hero[id];
                    if (this.round_data[this.get_round_data(this.data.id, "skill")]) {
                        var info = this.round_data[this.get_round_data(this.data.id, "skill")].skill;
                        if (info && role) {
                            if (!info.extra) {
                                //封印之力
                                var add = 0;
                                if (role.hero_info.battle_soul) {
                                    var fy = role.hero_info.battle_soul['3'];
                                    if (fy) {
                                        //每次攻击时，额外回复{0}点能量
                                        var info_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '3');
                                        if (info_1) {
                                            add = Number(info_1.EffectValue1) + Number(info_1.GrowthValue1) * (Number(fy) - 1);
                                        }
                                    }
                                }
                                role.fighter.add_mp(100 + add);
                            }
                        }
                    }
                    else {
                        if (1) {
                        }
                    }
                    break;
            }
        };
        //技能蓄力之后
        EnermyItemRender.prototype.after_skill_launch = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var info = this.round_data[this.get_round_data(this.data.id, "skill")].skill;
            var ef = this.ef_g.getChildByName("skill_launch");
            if (ef) {
                this.ef_g.removeChild(ef);
                ef.removeEventListener("after_skill_launch", this.after_skill_launch, this);
            }
            ef = null;
            var ef_id;
            var hero_id = this.data.id;
            var my_role = mx.Combat.stage._arr_hero[hero_id];
            //近战英雄做一次位移 自己释放近战技能光效enmity_priority
            if (this.jinzhan) {
                //位移目标
                var target_id = info.target_id[0];
                var target_role = mx.Combat.stage._arr_hero[target_id];
                var distance_x = 0;
                if (target_role) {
                    var target_pos = target_role.fighter.pos_id;
                    ;
                    var my_pos = my_role.fighter.pos_id;
                    //位移距离
                    var target_g = mx.Combat.stage[(Number(target_id) > 0 ? "m" : "e") + (Math.abs(target_pos) + "_g")];
                    var my_g = mx.Combat.stage["e" + (Math.abs(my_pos) + "_g")];
                    mx.Combat.stage.enermy_g.addChild(my_g);
                    //调整层级
                    mx.Combat.stage.set_index("enermy_g");
                    if (Number(hero_id) * Number(target_id) < 0) {
                        distance_x = my_g.x + 360 - target_g.x - 80;
                    }
                    if (distance_x > 0) {
                        var distance_y = target_g.y - my_g.y;
                        this.curr_state = mx.GameRole.ROLE_ATTACK1;
                        this.mcDataFactory.animation.play(this.curr_state, 1);
                        this._timeout = egret.setTimeout(function () {
                            egret.clearTimeout(this._timeout);
                            this._timeout = null;
                            this.hero_receivedamage('skill');
                        }, this, 7 * mx.FightView.FLASH_DESC);
                        var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWWX, 'id', info.skill_id);
                        egret.Tween.get(this).to({ "x": 0 - distance_x, "y": distance_y }, 7 * mx.FightView.FLASH_DESC).call(function () {
                            var skill_info = mx.FightTools.get_skill_info(info.skill_id);
                            //近战挥刀特效
                            ef_id = skill_info ? "enermy_big_ready" : ("eff_pg_" + (Number(my_role.hero_info.dragon_id) > 9 ? my_role.hero_info.dragon_id : ("0" + my_role.hero_info.dragon_id))); //"my_big_ready";
                            var atk_ef1 = new mx.GeneralEffect(ef_id);
                            atk_ef1.change_framerate(18, 1);
                            atk_ef1.horizontalCenter = 5;
                            atk_ef1.verticalCenter = skill_info ? 125 : 90;
                            atk_ef1.scaleX = -2;
                            atk_ef1.scaleY = 2;
                            atk_ef1.name = ef_id;
                            var ef_sound = skill_info ? "jzskill_sound" : "jzatk_sound";
                            if (!this.ef_g.getChildByName(ef_id)) {
                                this.ef_g.addChild(atk_ef1);
                                facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                                    "name": ef_sound, "type": "ef"
                                });
                            }
                        }, this);
                    }
                    else {
                        this.curr_state = mx.GameRole.ROLE_ATTACK1;
                        this.mcDataFactory.animation.play(this.curr_state, 1);
                        this._timeout = egret.setTimeout(function () {
                            egret.clearTimeout(this._timeout);
                            this._timeout = null;
                            this.hero_receivedamage('skill');
                        }, this, 7 * mx.FightView.FLASH_DESC);
                    }
                }
                else {
                    this.curr_state = mx.GameRole.ROLE_ATTACK1;
                    this.mcDataFactory.animation.play(this.curr_state, 1);
                    this._timeout = egret.setTimeout(function () {
                        egret.clearTimeout(this._timeout);
                        this._timeout = null;
                        this.hero_receivedamage('skill');
                    }, this, 7 * mx.FightView.FLASH_DESC);
                }
            }
            else {
                this.curr_state = mx.GameRole.ROLE_ATTACK1;
                this.mcDataFactory.animation.play(this.curr_state, 1);
                this._timeout = egret.setTimeout(function () {
                    egret.clearTimeout(this._timeout);
                    this._timeout = null;
                    this.hero_receivedamage('skill');
                }, this, 7 * mx.FightView.FLASH_DESC);
            }
        };
        EnermyItemRender.prototype.init_dragon = function (state) {
            var armature = mx.TweenTool.getInstance().get_dragon(this.eid);
            armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.changemc, this);
            this.curr_state = state;
            armature.animation.play(state, 0);
            armature.display.anchorOffsetY = 0 - this.height;
            armature.display.scaleX = -1;
            armature.display.scaleY = 1;
            this.mc_g.addChild(armature.display);
            this.mcDataFactory = armature;
        };
        EnermyItemRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.man_g.visible = false;
            if (data.empty) {
                this.man_g.visible = false;
            }
            else {
                //this.eid = Tools.get_mn_res(this.data.mid,"arole");
                this.eid = mx.Tools.get_mn_res(this.data.mid, "role");
                this.init_dragon(mx.GameRole.ROLE_STAND);
                if ((Number(this.data.mid) > 54 && Number(this.data.mid) <= 57) || (Number(this.data.mid) > 300)) {
                    var atk_ef = new mx.GeneralEffect("spe_fguang");
                    atk_ef.change_framerate(18, -1);
                    atk_ef.horizontalCenter = 0;
                    atk_ef.bottom = 0;
                    atk_ef.name = "spe_fguang";
                    if (!this.ef_g.getChildByName("spe_fguang")) {
                        this.ef_g.addChild(atk_ef);
                    }
                }
                if (data.hp) {
                    this.hp_bar.set_res({ "up": "bloodbar_png", "down": "blooddchen_png" });
                    this.hp_bar.value = data.hp;
                    this.hp_bar.change_hp_pos();
                }
                else {
                    //this.role_die();
                }
                this.energy_bar.set_res({ "up": "nltiao_png", "down": "blooddchen_png" });
                this.energy_bar.value = data.mp;
                this.energy_bar.change_mp_pos();
                if (data.mp == 100) {
                    this.energy_bar.set_res({ "up": "nltman_png", "down": "blooddchen_png" });
                    //this.fguang();
                }
                var hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERONEW, "id", data.mid);
                this.jinzhan = Number(hero_api.enmity_priority) == 1;
            }
        };
        //能量变化
        EnermyItemRender.prototype.set_mp = function (percent) {
            var energy_bar = this.energy_bar;
            energy_bar.value = percent;
            if (percent >= 100) {
                var heroid = parseInt(this.data.id);
                var role = mx.Combat.stage._arr_hero[heroid];
                if (role) {
                    this.energy_bar.set_res({ "up": "nltman_png", "down": "blooddchen_png" });
                    // let ret = role.fighter.find_target().ret;
                    // if(!this.fg_flag && ret!=0 ){
                    //     this.fg_flag = true;
                    //     this.fguang();
                    // }  
                }
                else {
                    this.fg_flag = false;
                    this.energy_bar.set_res({ "up": "nltiao_png", "down": "blooddchen_png" });
                }
                role = null;
            }
            else {
                this.fg_flag = false;
                this.energy_bar.set_res({ "up": "nltiao_png", "down": "blooddchen_png" });
            }
        };
        EnermyItemRender.prototype.fguang = function () {
            var id = "enermy_big_ready";
            var fguang_ef1 = new mx.GeneralEffect(id);
            fguang_ef1.change_framerate(24, -1);
            fguang_ef1.horizontalCenter = 3;
            fguang_ef1.bottom = 0;
            fguang_ef1.name = id;
            if (!this.ef_g.getChildByName(id)) {
                this.ef_g.addChild(fguang_ef1);
            }
        };
        /*----------外部接口-----------------*/
        //出手动画展示
        EnermyItemRender.prototype.CommonAttack = function (data) {
            this.round_data = null;
            this.round_data = data; //Tools.arr2obj(data, "hero_id");
            var info = this.round_data[this.get_round_data(this.data.id, "skill")].skill;
            if (!info.extra && (Number(info.skill_id) > 0)) {
                var atk_ef = new mx.GeneralEffect("skill_impact");
                atk_ef.change_framerate(18, 1);
                atk_ef.horizontalCenter = 0;
                atk_ef.verticalCenter = 100;
                atk_ef.name = "skill_launch";
                atk_ef.set_event("after_skill_launch");
                atk_ef.addEventListener("after_skill_launch", this.after_skill_launch, this);
                if (!this.ef_g.getChildByName("skill_impact")) {
                    this.ef_g.addChild(atk_ef);
                }
            }
            else {
                this.after_skill_launch();
            }
        };
        EnermyItemRender.prototype.BigAttack = function (data) {
            this.round_data = null;
            this.round_data = data;
            //大招launch 
            var atk_ef = new mx.GeneralEffect("big_launch");
            atk_ef.change_framerate(18, 1);
            atk_ef.horizontalCenter = 0;
            atk_ef.verticalCenter = 100;
            atk_ef.name = "big_launch";
            atk_ef.set_event("after_big_launch");
            atk_ef.addEventListener("after_big_launch", this.launch_over, this);
            if (!this.ef_g.getChildByName("big_launch")) {
                this.ef_g.addChild(atk_ef);
            }
            //调整层级
            mx.Combat.stage.set_index("enermy_g");
            //人物角色变大
            egret.Tween.get(this).to({ "scaleX": 1.3, "scaleY": 1.3, "anchorOffsetY": 40 }, 7 * mx.FightView.FLASH_DESC).call(function () {
                //场景rect渐变
                mx.Combat.stage.rect_change(this.data.mid, this.data.id);
            }, this);
        };
        EnermyItemRender.prototype.continue_big_attack = function () {
            this.curr_state = mx.GameRole.ROLE_ATTACK1;
            this.mcDataFactory.animation.play(this.curr_state, 1);
            var id = this.data.id;
            var role = mx.Combat.stage._arr_hero[id];
            role.fighter.reset_mp();
            this._timeout = egret.setTimeout(function () {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
                mx.Combat.stage.shake_screen();
                this.hero_receivedamage('big');
            }, this, 7 * mx.FightView.FLASH_DESC);
        };
        EnermyItemRender.prototype.hero_receivedamage = function (type1, middle) {
            if (middle === void 0) { middle = false; }
            var hero_id = Number(this.data.id);
            var data = this.round_data;
            if (!data) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var info = this.round_data[this.get_round_data(this.data.id, "skill")].skill;
            var skill_info = mx.FightTools.get_skill_info(info.skill_id);
            var targets = info.target_id;
            var type = info.type;
            //远程英雄 受击英雄播放受击光效
            var ef_id = null;
            var ef_sound;
            if (this.jinzhan) {
                egret.Tween.get(this).wait(13 * mx.FightView.FLASH_DESC).to({ "x": 0, "y": 0, "scaleX": 1, "scaleY": 1, "anchorOffsetY": 0 }, 3 * mx.FightView.FLASH_DESC);
            }
            else {
                //人物角色变回
                if (this.scaleX > 1) {
                    egret.Tween.get(this).to({ "scaleX": 1, "scaleY": 1, "anchorOffsetY": 0 }, 1 * mx.FightView.FLASH_DESC);
                }
                ef_id = skill_info ? "enermy_atk" : "my_atk";
                ef_sound = skill_info ? 'ycskill_sound' : 'ycatk_sound';
            }
            if (info.type == 'big') {
                var id = this.data.id;
                var role = mx.Combat.stage._arr_hero[id];
                ef_id = mx.Tools.get_mn_res(this.data.mid, "big_ef");
                ef_sound = mx.Tools.get_mn_res(this.data.mid, "bigsound");
                //ef_sound = 'big1_sound';//''
            }
            // 目标播放受创动作
            for (var i in targets) {
                if (mx.Combat.stage._arr_hero) {
                    var role = mx.Combat.stage._arr_hero[targets[i]];
                    if (!role)
                        continue;
                    var first = null;
                    //爆炸特效 "skill_impact"
                    if (mx.Combat.stage.display_mode) {
                        var skill_info_1 = mx.FightTools.get_skill_info(info.skill_id);
                        if (skill_info_1 && Number(skill_info_1.effectaoe) == 3) {
                            if (Number(i) == 0) {
                                var role_g = void 0;
                                if (Number(targets[i]) > 0) {
                                    role_g = mx.Combat.stage.hero_g;
                                }
                                else {
                                    role_g = mx.Combat.stage.enermy_g;
                                }
                                var atk_ef = new mx.GeneralEffect(ef_id);
                                atk_ef.change_framerate(18, 1);
                                atk_ef.horizontalCenter = 0;
                                atk_ef.bottom = 409;
                                atk_ef.scaleX = atk_ef.scaleY = 4;
                                atk_ef.name = ef_id;
                                if (!role_g.getChildByName(ef_id)) {
                                    role_g.addChild(atk_ef);
                                    facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                                        "name": ef_sound, "type": "ef"
                                    });
                                }
                            }
                        }
                        else {
                            first = {
                                "id": ef_id,
                                "from_hero": hero_id > 0,
                                "self": (Number(targets[0]) * hero_id) > 0,
                                "type": type,
                                "middle": middle,
                                "sound": Number(i) == 0 ? ef_sound : null
                            };
                        }
                    }
                    //伤害数字
                    if (info.damage) {
                        var target_id = targets[i];
                        if (info.damage[target_id]) {
                            var target = mx.Combat.stage._arr_hero[target_id];
                            if (!target)
                                continue;
                            var temp = info.damage[target_id];
                            //敌方扣血
                            target.on_hit(temp.damage > 0 ? "heal" : "damage", first, temp, this.data.id);
                            //受伤增加
                            if (temp.damage < 0) {
                                var num = 1000 * (Math.abs(temp.damage) / target.fighter.maxHp);
                                var add = 0;
                                if (target.hero_info.battle_soul) {
                                    var fy = target.hero_info.battle_soul['4'];
                                    if (fy) {
                                        //每次受攻击时，额外回复{0}点能量
                                        if (info) {
                                            var info_2 = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", '4');
                                            add = Number(info_2.EffectValue1) + Number(info_2.GrowthValue1) * (Number(fy) - 1);
                                        }
                                    }
                                }
                                target.fighter.add_mp(Math.abs(num) + add);
                            }
                            var hp_data = data[this.get_round_data(target_id, "add_hp")];
                            if (hp_data) {
                                if (hp_data.add_hp && hp_data.add_hp[info.id]) {
                                    target.fighter.cal_hp(hp_data.add_hp[info.id].add_num);
                                    //目标阵亡
                                    if (target.fighter.die) {
                                        //攻击者加200能量奖励
                                        var role_1 = mx.Combat.stage._arr_hero[this.data.id];
                                        if (role_1) {
                                            role_1.fighter.add_mp(200);
                                        }
                                        role_1 = null;
                                        mx.Combat.onDie(target_id);
                                    }
                                }
                                8;
                            }
                            target = null;
                        }
                    }
                    //role.fighter.receiveDamage(this,parseInt(i) == this.targets.length - 1,first);
                    // this.hit_ef(targets[i],i,first);
                    role = null;
                }
            }
            var stage = mx.Combat.stage;
            this._timeout = egret.setTimeout(function () {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
                ++stage.cur_idx;
                stage.show_round_result(stage.cur_wave, stage.cur_round, stage.cur_idx);
            }, this, 18 * mx.FightView.FLASH_DESC); //长按0.75秒
        };
        EnermyItemRender.prototype.get_round_data = function (id, ziduan) {
            var view = this;
            var data = this.round_data;
            if (ziduan == 'skill') {
                var cur_idx = mx.Combat.stage.cur_idx;
                return cur_idx;
            }
            else {
                for (var i in data) {
                    if (Number(data[i].hero_id) == Number(id) && data[i][ziduan]) {
                        return i;
                    }
                }
            }
        };
        EnermyItemRender.prototype.launch_over = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var id = "big_launch";
            var fg1 = this.ef_g.getChildByName(id);
            if (fg1) {
                fg1.removeEventListener("after_big_launch", this.launch_over, this);
                this.ef_g.removeChild(fg1);
            }
            //播放大招语音
            var music = mx.Tools.get_mn_res(this.data.mid, 'big_yuyin');
            if (music) {
                facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                    "name": music, "type": "yuyin"
                });
            }
        };
        //敌方技能爆炸光效后
        EnermyItemRender.prototype.after_point = function () {
            //let role_g = Combat.stage[Number(this.data.id) > 0 ? "m" : "e" + Math.abs(this.data.id) + "_g"];
            var role_g = mx.Combat.stage.efs_g;
            var ef = role_g.getChildByName(this.onhit_ef);
            if (ef) {
                ef.removeEventListener("after_point", this.after_point, this);
                role_g.removeChild(ef);
            }
            this.onhit_ef = null;
            //被挂上buff
            if (this.buff_info) {
                this.buff_start();
            }
        };
        //掉血或者加血
        EnermyItemRender.prototype.set_blood = function (percent, value) {
            value = Math.round(value);
            if (value != 0) {
                this.hp_bar.value = percent;
                var type = void 0, pos = void 0;
                if (value < 0) {
                    type = "vertical";
                    pos = { "ex": 30 };
                }
                else {
                    type = "zx";
                    pos = { "ey": -40 };
                }
                var mxd = {
                    "o_type": "blabel",
                    "o_param": value,
                    "t_type": type,
                    "t_param": pos
                };
                var mxto_1 = new mx.mxTweenObj(mxd);
                var px = this.man_g.localToGlobal();
                mxto_1.x = value > 0 ? px.x + 10 : px.x - 10;
                ; //blood_bar.x + blood_bar.width/2 - 20;
                mxto_1.y = value > 0 ? px.y : px.y + 60; //blood_bar.y;
                if (value < 0) {
                    egret.Tween.get(this.mc_g).call(function () {
                        mx.Tools.mx_grayfy(this.mc_g, false, mx.MX_RED_MATRIX);
                    }, this).to({ "x": 67 }, 1 * mx.FightView.FLASH_DESC).to({ "x": 73 }, 1 * mx.FightView.FLASH_DESC).to({ "x": 80 }, 1 * mx.FightView.FLASH_DESC).to({ "x": 73 }, 1 * mx.FightView.FLASH_DESC).call(function () {
                        mx.Tools.mx_grayfy(this.mc_g, true);
                        mx.Combat.stage.efs_g.addChild(mxto_1);
                    }, this);
                }
                else {
                    //加血特效
                    var atk_ef1 = new mx.GeneralEffect("eff_blood");
                    atk_ef1.change_framerate(18, 1);
                    atk_ef1.horizontalCenter = 0;
                    atk_ef1.verticalCenter = 80;
                    atk_ef1.scaleX = 1;
                    atk_ef1.name = "eff_blood";
                    if (!this.ef_g.getChildByName("eff_blood")) {
                        this.ef_g.addChild(atk_ef1);
                    }
                    mx.Combat.stage.efs_g.addChild(mxto_1);
                }
            }
        };
        //受创动画
        EnermyItemRender.prototype.on_hit = function (pointef, first, temp, from_id) {
            //默认受创
            var facade = mx.ApplicationFacade.getInstance();
            var damage = temp.damage;
            if (pointef == 'damage') {
                //爆炸特效 "skill_impact"
                if (mx.Combat.stage.display_mode) {
                    //
                    if (first && first.id) {
                        var role = mx.Combat.stage._arr_hero[this.data.id];
                        var p_x = mx.Combat.stage["e" + role.fighter.pos_id + "_g"].right;
                        var p_y = mx.Combat.stage["e" + role.fighter.pos_id + "_g"].bottom;
                        var role_g = mx.Combat.stage.efs_g;
                        var atk_ef = new mx.GeneralEffect(first.id);
                        atk_ef.change_framerate(18, 1);
                        atk_ef.right = p_x + 65;
                        atk_ef.bottom = p_y;
                        atk_ef.scaleX = atk_ef.scaleY = first.type == 'big' ? 4 : 2;
                        atk_ef.name = first.id + this.data.id;
                        this.onhit_ef = atk_ef.name;
                        // atk_ef.set_event("after_point");
                        // atk_ef.addEventListener("after_point", this.after_point, this);
                        if (!role_g.getChildByName(atk_ef.name)) {
                            role_g.addChild(atk_ef);
                            if (first.sound) {
                                facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                                    "name": first.sound, "type": "ef"
                                });
                            }
                        }
                    }
                    //受击动画
                    var atk_ef1 = new mx.GeneralEffect("my_hit");
                    atk_ef1.change_framerate(18, 1);
                    atk_ef1.horizontalCenter = 0;
                    atk_ef1.verticalCenter = 85;
                    atk_ef1.scaleX = 1;
                    atk_ef1.name = "my_hit";
                    if (!this.ef_g.getChildByName("my_hit")) {
                        this.ef_g.addChild(atk_ef1);
                    }
                    //命中后自己的血量加减和能量加减
                    if (temp.suck) {
                        var num = temp.suck;
                        var role = mx.Combat.stage._arr_hero[from_id];
                        role.fighter.cal_hp(num);
                        role = null;
                    }
                }
            }
        };
        EnermyItemRender.prototype.init_buff = function (info) {
            this.buff_info = info;
        };
        //buff生效光效
        EnermyItemRender.prototype.buff_start = function () {
            var id = this.data.id;
            var role = mx.Combat.stage._arr_hero[id];
            if (role) {
                var fighter = role.fighter;
                if (fighter.buff.length) {
                    if (fighter.buff[fighter.buff.length - 1]) {
                        var atk_ef = new mx.GeneralEffect(this.buff_info.ef + "_enermy");
                        atk_ef.change_framerate(24, 1);
                        atk_ef.horizontalCenter = 0;
                        atk_ef.verticalCenter = 0;
                        atk_ef.name = id;
                    }
                }
                fighter = null;
            }
            this.buff_info = null;
        };
        //播放效果
        EnermyItemRender.prototype.show_effect = function (id, state, self) {
            var atk_ef = new mx.GeneralEffect(id);
            atk_ef.change_framerate(24, 1);
            atk_ef.horizontalCenter = 0;
            atk_ef.verticalCenter = 0;
            atk_ef.name = id;
            var group = self == 'self' ? mx.Combat.stage.enermy_g : mx.Combat.stage.hero_g;
            if (!group.getChildByName(id)) {
                group.addChild(atk_ef);
            }
        };
        EnermyItemRender.prototype.add_buff = function (buff_info, buff) {
            //buff 还是debuff
            var view = this;
            var buff_g = buff ? this.buff_g : this.debuff_g;
            if (!buff_g.getChildByName(buff_info)) {
                var name_1 = (buff ? "buff" : "debuff") + "_my";
                if (!this.ef_g.getChildByName(name_1)) {
                    var atk_ef = new mx.GeneralEffect(name_1);
                    atk_ef.change_framerate(18, 1);
                    atk_ef.horizontalCenter = 0;
                    atk_ef.verticalCenter = 80;
                    atk_ef.name = name_1;
                    this.ef_g.addChild(atk_ef);
                }
                var buff_p = new eui.Image(buff_info);
                buff_p.name = buff_info;
                buff_g.addChild(buff_p);
                buff_p.alpha = 0;
                buff_p.scaleX = buff_p.scaleY = 1.5;
                buff_g.addChild(buff_p);
                egret.Tween.get(buff_p).to({ "horizontalCenter": 0, "scaleX": 1, "scaleY": 1, "alpha": 1 }, 6 * mx.FightView.FLASH_DESC);
            }
        };
        EnermyItemRender.prototype.buff_play = function (name) {
            var arr = { "eff_burning": 90, "eff_frozen": 80, "eff_poison": 80, "eff_shield": 80, "eff_stun": 80 };
            var attr = "";
            var atk_ef = new mx.GeneralEffect(name);
            atk_ef.change_framerate(18, (name == "eff_stun" || name == "eff_frozen") ? -1 : 1);
            atk_ef.horizontalCenter = 10;
            atk_ef.verticalCenter = arr[name];
            atk_ef.name = name;
            if (!this.ef_g.getChildByName(name)) {
                this.ef_g.addChild(atk_ef);
            }
            // for(let i in arr){
            //     let unit = arr[i]
            //     let name = "buff_" + unit + "_png";
            //     if(this.debuff_g.getChildByName(name)){
            //         let atk_ef = new GeneralEffect("eff_" + unit);
            //         atk_ef.change_framerate(24,1);
            //         atk_ef.horizontalCenter = 0;  
            //         atk_ef.verticalCenter = 0;  
            //         atk_ef.name = "eff_" + unit;
            //         if(!this.ef_g.getChildByName("eff_" + unit)){
            //             this.addChild(atk_ef);
            //         }
            //         //buff 掉血
            //         let stage = Combat.stage;
            //         if(!stage.display_mode){
            //             let idx = -1;
            //             let hero_id = this.data.id;
            //             for(let i in stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]]){
            //                 if(stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][i].hero_id == hero_id){
            //                     idx = Number(i);
            //                     break;;
            //                 }
            //             }
            //             if(idx == -1){
            //                 stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].push({
            //                     "hero_id" : hero_id
            //                 });
            //                 idx = stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]].length - 1;
            //             }
            //             if(!stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].hp_buff){
            //                 stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].hp_buff = [];
            //             }
            //             stage.fight_process[stage.fight_wave][stage.fight_round[stage.cur_wave]][idx].push("eff_" + unit);
            //         }
            //         break;
            //     }
            // }
        };
        EnermyItemRender.prototype.fuhuo_ing = function () {
            var view = this;
            var buff_g = this.buff_g;
            if (!buff_g.getChildByName("buff_revive_png")) {
                var buff_p = new eui.Image("buff_revive_png");
                buff_p.name = "buff_revive_png";
                buff_g.addChild(buff_p);
            }
            this.hp_bar.visible = false;
        };
        EnermyItemRender.prototype.fuhuo_com = function () {
            var view = this;
            var buff_g = this.buff_g;
            var ui = buff_g.getChildByName("buff_revive_png");
            if (ui) {
                buff_g.removeChild(ui);
            }
            this.hp_bar.visible = true;
        };
        EnermyItemRender.prototype.remove_buff = function (buffid) {
            var view = this;
            var buff_g = this.buff_g;
            var buff_info = mx.FightTools.get_buff_info(buffid);
            var icon = buff_info.icon + "_png";
            var eff = buff_info.effect;
            var ui = buff_g.getChildByName(icon);
            if (ui) {
                egret.Tween.removeTweens(ui); //释放tween
                buff_g.removeChild(ui);
            }
            ui = null;
            buff_g = null;
            buff_g = this.debuff_g;
            ui = buff_g.getChildByName(icon);
            if (ui) {
                egret.Tween.removeTweens(ui); //释放tween
                buff_g.removeChild(ui);
            }
            ui = null;
            buff_g = null;
            ui = this.ef_g.getChildByName(eff);
            if (ui) {
                ui.on_remove();
            }
            ui = null;
        };
        return EnermyItemRender;
    }(mx.BasicRender));
    mx.EnermyItemRender = EnermyItemRender;
    __reflect(EnermyItemRender.prototype, "mx.EnermyItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=EnermyItemRender.js.map
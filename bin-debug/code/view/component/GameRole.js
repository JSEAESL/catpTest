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
 * Author: mx
 * Date: 2016-07-23
 * 游戏角色（英雄、怪物） 动画锚点右下角，参考坐标（274，442）
 */
var mx;
(function (mx) {
    var GameRole = (function (_super) {
        __extends(GameRole, _super);
        function GameRole(rid, scale, dir, hero_info, hero_id, pvp) {
            if (scale === void 0) { scale = 1; }
            if (dir === void 0) { dir = GameRole.ROLE_STAND; }
            if (hero_info === void 0) { hero_info = null; }
            if (hero_id === void 0) { hero_id = null; }
            if (pvp === void 0) { pvp = false; }
            var _this = _super.call(this) || this;
            _this.hero_id = 0;
            _this.paused = false;
            _this.isdealing = false;
            if (hero_info) {
                if (dir != GameRole.ROLE_DIE && dir != "empty") {
                    for (var i in mx.Lang.attr) {
                        if (!hero_info[mx.Lang.attr[i]]) {
                            hero_info[mx.Lang.attr[i]] = 0;
                        }
                    }
                    _this.hero_info = hero_info;
                    var arr = [];
                    _this.hero_info["HPR"] = 0;
                    _this.hero_info["MPR"] = 0;
                    _this.hero_id = hero_id;
                    _this.set_fighter(hero_info);
                    _this.is_hero = scale == 1;
                    _this.eid = rid;
                    _this.curr_state = dir;
                }
            }
            if (mx.Combat.skip_fighter)
                return _this;
            //ui模型
            var role_ui = scale == 1 ? new mx.HeroItemRender() : new mx.EnermyItemRender();
            if (dir == "empty") {
                role_ui.data = {
                    "empty": true
                };
            }
            else {
                role_ui.data = {
                    "id": hero_id,
                    "mid": hero_info.dragon_id,
                    "quality": hero_info.dragon_quality,
                    "hp": (typeof (hero_info.wave_hp) == 'undefined' ? hero_info.HP : hero_info.wave_hp) / hero_info.HP * 100,
                    "mp": (typeof (hero_info.wave_mp) == 'undefined' ? 0 : hero_info.wave_mp) / 1000 * 100,
                    "init": 1,
                    "pvp": pvp
                };
            }
            _this.addChild(role_ui);
            _this.role_ui = role_ui;
            return _this;
        }
        GameRole.prototype.set_fighter = function (data) {
            this._fighter = null;
            this._fighter = new mx.Fighter(data, this.is_hero, this.hero_info.order, this.hero_id);
        };
        Object.defineProperty(GameRole.prototype, "fighter", {
            get: function () {
                return this._fighter;
            },
            enumerable: true,
            configurable: true
        });
        GameRole.prototype.set_blood = function (percent, value) {
            if (mx.Combat.skip_fighter)
                return;
            this.role_ui.set_blood(percent, value);
        };
        GameRole.prototype.set_mp = function (percent) {
            if (mx.Combat.skip_fighter)
                return;
            this.role_ui.set_mp(percent);
        };
        GameRole.prototype.change_state = function (dir) {
            if (mx.Combat.stage.display_mode)
                return;
            if (this.curr_state == GameRole.ROLE_DIE) {
                return;
            }
            this.curr_state = dir;
        };
        GameRole.prototype.show_effect = function (id, state, self) {
            if (state === void 0) { state = 'attack_ready'; }
            if (mx.Combat.skip_fighter)
                return;
            this.role_ui.show_effect(id, state, self);
        };
        GameRole.prototype.on_remove = function () {
            egret.Tween.removeTweens(this); //释放tweenCommonAttack
            this.role_ui = null;
        };
        /*-----------------------外部接口----------------------*/
        //攻击（普攻和技能出手）
        GameRole.prototype.CommonAttack = function (data) {
            this.role_ui.CommonAttack(data);
        };
        //大招
        GameRole.prototype.BigAttack = function (data) {
            this.role_ui.BigAttack(data);
        };
        GameRole.prototype.on_hit = function (pointef, first, damage, from_id) {
            if (this.curr_state != GameRole.ROLE_DIE) {
                this.role_ui.on_hit(pointef, first, damage, from_id);
            }
        };
        GameRole.prototype.buff_play = function (name) {
            this.role_ui.buff_play(name);
        };
        GameRole.prototype.add_buff = function (buff_info, buff) {
            this.role_ui.add_buff(buff_info + "_png", buff);
        };
        GameRole.prototype.remove_buff = function (buff_info) {
            this.role_ui.remove_buff(buff_info);
        };
        GameRole.prototype.continue_big_atk = function () {
            this.role_ui.continue_big_attack();
        };
        GameRole.prototype.fuhuo_ing = function () {
            this.role_ui.fuhuo_ing();
        };
        GameRole.prototype.fuhuo_com = function () {
            this.role_ui.fuhuo_com();
        };
        //死亡
        GameRole.prototype.go_die = function () {
            if (!mx.Combat.skip_fighter) {
                egret.Tween.removeTweens(this); //释放tween
                if (mx.Combat.ult) {
                    mx.Combat.enableUlt(this.hero_id, false);
                    mx.Combat.stage.goon_fight();
                }
                this.role_ui.role_die();
                this._fighter = null;
            }
            if (this.is_hero) {
                var index = mx.Combat.stage.heroes_id.indexOf(this.hero_id);
                if (index != -1) {
                    mx.Combat.stage.heroes_id.splice(index, 1);
                }
            }
            else {
                var index2 = mx.Combat.stage.monsters_id.indexOf(this.hero_id);
                if (index2 != -1) {
                    mx.Combat.stage.monsters_id.splice(index2, 1);
                }
            }
            mx.Combat.stage._l_d_hero.splice(mx.Combat.stage._l_d_hero.indexOf(this.hero_id), 1);
            mx.Combat.stage.chushou_arr.splice(mx.Combat.stage.chushou_arr.indexOf(this.hero_id), 1);
            mx.Combat.stage._arr_hero[this.hero_id] = null; //解除引用 
        };
        GameRole.prototype.init_buff = function (info) {
            if (!mx.Combat.skip_fighter) {
                this.role_ui.init_buff(info);
            }
        };
        GameRole.ROLE_ATTACK1 = "attack"; //摇摆
        GameRole.ROLE_ATTACK2 = "attack2"; //攻击
        GameRole.ROLE_BUFF = "buff"; //处于BUFF状态
        GameRole.ROLE_DIE = "die"; //死亡
        GameRole.ROLE_HIT = "hit"; //被攻击
        GameRole.ROLE_STAND = "idle"; //站立
        GameRole.ROLE_WIN = "win"; //胜利
        return GameRole;
    }(egret.DisplayObjectContainer));
    mx.GameRole = GameRole;
    __reflect(GameRole.prototype, "mx.GameRole");
})(mx || (mx = {}));
//# sourceMappingURL=GameRole.js.map
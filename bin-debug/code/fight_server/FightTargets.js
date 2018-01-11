/**
 *   @author qianjun
 *   @date 2016.8.2
 *   @desc 战斗查找目标的工具。
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var MXFightTargets = (function () {
        function MXFightTargets() {
        }
        MXFightTargets.getInstance = function () {
            if (!MXFightTargets.instance) {
                MXFightTargets.instance = new MXFightTargets();
            }
            return MXFightTargets.instance;
        };
        /**
         * 技能释放范围内是否有目标
         * @return
         * -1 : 技能配置错误
         * 0  : 不能释放技能 （指向性技能 找到目标但是距离不足）
         * 1  : 可以释放技能 （指向性技能找到目标且距离满足或者是非指向性技能）
         */
        //主要索敌选取
        MXFightTargets.prototype.find_target_in_range = function (hero_id, skill_id) {
            var skill_target = this.get_skill_target(hero_id, skill_id);
            if (skill_target.arr.length) {
                return { 'ret': 1, 'skill_target': skill_target.arr };
            }
            else {
                return { 'ret': 0, "distance": skill_target.distance };
            }
        };
        /**
         * 根据目标类型和数量获取目标数组
         * @param self 自己
         * @param dragon_data 所有龙
         * @param skill_id 技能id
         * @param target_type OWN或者OPPO
         * @return  目标龙id数组
         */
        MXFightTargets.prototype.get_buzhen_posbyhero_id = function (hero_id, buzhen) {
            var mid = this.heroid2mid(hero_id);
            for (var i in buzhen) {
                if (Number(buzhen[i]) == Number(mid)) {
                    return Number(i);
                }
            }
        };
        /*
        6 3
        5 2
        4 1
        */
        MXFightTargets.prototype.get_targets_byrange = function (start_id, range) {
            var arr = [];
            //按行
            if (range == 1) {
                switch (start_id) {
                    case 1:
                    case 4:
                        arr = [1, 4];
                        break;
                    case 2:
                    case 5:
                        arr = [2, 5];
                        break;
                    case 3:
                    case 6:
                        arr = [3, 6];
                        break;
                }
            }
            else if (range = 2) {
                //按周围
                switch (start_id) {
                    case 1:
                        arr = [1, 2, 4];
                        break;
                    case 2:
                        arr = [1, 2, 3, 5];
                        break;
                    case 3:
                        arr = [2, 3, 6];
                        break;
                    case 4:
                        arr = [1, 4, 5];
                        break;
                    case 5:
                        arr = [2, 4, 5, 6];
                        break;
                    case 6:
                        arr = [3, 5, 6];
                        break;
                }
            }
            return arr;
        };
        MXFightTargets.prototype.get_skill_target = function (hero_id, skill_id) {
            var target_hero_id = [];
            if (skill_id == 0) {
                //普攻 随机取一个
                var stage_1 = mx.Combat.stage;
                var temp = void 0;
                if (Number(hero_id < 0)) {
                    temp = stage_1.heroes_id;
                }
                else {
                    temp = stage_1.monsters_id;
                }
                var rid = Math.floor(Math.random() * temp.length);
                return { "arr": [temp[rid]], "distance": 0 };
            }
            //获取目标 目标类型 目标数量
            var target_heroes;
            var target_type;
            var target_num;
            var sort_temp;
            var skillapi = mx.FightTools.get_skill_info(skill_id);
            var skill_info;
            //打伤害
            if (Number(skillapi.damageid)) {
                skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', skillapi.damageid);
            }
            else {
                skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', skillapi.buffid);
            }
            //skill_info.TargetCamp 1 敌方 2 我方 3自己 4当前(目标随伤害目标) 5攻击者(反击)
            var hero_data = [];
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
            }
            var temp1 = [];
            //位置选取 0 不按位置选取 1 前排 2后排 3 全体
            switch (Number(skill_info.sel_pos)) {
                case 1:
                    for (var i = 1; i < 4; ++i) {
                        if (buzhen[i]) {
                            temp1.push(this.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                case 2:
                    for (var i = 4; i < 7; ++i) {
                        if (buzhen[i]) {
                            temp1.push(this.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                case 3:
                    for (var i = 1; i < 7; ++i) {
                        if (buzhen[i]) {
                            temp1.push(this.mid2heroid(buzhen[i], buzhen_type));
                        }
                    }
                    break;
                default:
                    temp1 = mx.FightTools.arr_clone(hero_data);
                    break;
            }
            if (Number(skill_info.sel_pos) > 0 && !temp1.length) {
                temp1 = mx.FightTools.arr_clone(hero_data);
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
                temp2 = this.sort_target_dragons(hero_id, temp1, attr, sort);
            }
            else {
                temp2 = mx.FightTools.arr_clone(temp1);
            }
            //额外范围 无范围索敌 1 列 2周围
            var suodi = Number(skill_info.aoerange);
            if (suodi) {
                var temp3_1 = [];
                var start_id = this.get_buzhen_posbyhero_id(temp2[0], buzhen);
                //按阵列索敌
                temp3_1 = this.get_targets_byrange(start_id, suodi);
                for (var i in temp3_1) {
                    target_hero_id.push(this.mid2heroid(buzhen[temp3_1[i]], buzhen_type));
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
            var stage = mx.Combat.stage;
            var temp3 = [];
            for (var i in target_hero_id) {
                var role = stage._arr_hero[target_hero_id[i]];
                if (role) {
                    temp3.push(target_hero_id[i]);
                }
                role = null;
            }
            return { "arr": temp3, "distance": 0 };
        };
        /**
         * 获得两条龙之间直线距离
         * @param	from
         * @param	target
         * @return
         */
        MXFightTargets.prototype.heroid2mid = function (hero_id) {
            var from = mx.Combat.stage._arr_hero[hero_id];
            var mid = from.hero_info.dragon_id;
            from = null;
            return mid;
        };
        MXFightTargets.prototype.mid2heroid = function (mid, flag) {
            var arr = flag == "enermy" ? mx.Combat.stage.monsters_id : mx.Combat.stage.heroes_id;
            var hero_id = 0;
            for (var i in arr) {
                var role = mx.Combat.stage._arr_hero[arr[i]];
                if (role) {
                    if (Number(role.hero_info.dragon_id) == Number(mid)) {
                        hero_id = arr[i];
                        break;
                    }
                }
                role = null;
            }
            return hero_id;
        };
        MXFightTargets.prototype.get_distance = function (from_id, target_id) {
            //返回格子数
            var from = mx.Combat.stage._arr_hero[from_id];
            var target = mx.Combat.stage._arr_hero[target_id];
            // var f = FightTools.coordinateToCheck(from.role.is_hero ? from.pos_x : FightTools.kWidth - from.pos_x,from.pos_y);
            // var t = FightTools.coordinateToCheck(target.role.is_hero ? target.pos_x : FightTools.kWidth - target.pos_x;,target.pos_y);
            var x1 = from.is_hero ? from.fighter.pos_x : mx.FightTools.kWidth - from.fighter.pos_x + mx.FightTools.kReadyFightnumbererval;
            var x2 = target.is_hero ? target.fighter.pos_x : mx.FightTools.kWidth - target.fighter.pos_x + mx.FightTools.kReadyFightnumbererval;
            var distance = Math.abs(x2 - x1);
            //var distance=Math.abs(960/FightTools.kReadyFightnumbererval-f.x-t.x-1)*FightTools.kReadyFightnumbererval;
            from = null;
            target = null;
            return distance;
        };
        MXFightTargets.prototype.get_distance_xy = function (from_id, target_id) {
            //返回格子数
            var from = mx.Combat.stage._arr_hero[from_id];
            var target = mx.Combat.stage._arr_hero[target_id];
            var x1 = from.is_hero ? from.fighter.pos_x : mx.FightTools.kWidth - from.fighter.pos_x + mx.FightTools.kReadyFightnumbererval;
            var x2 = target.is_hero ? target.fighter.pos_x : mx.FightTools.kWidth - target.fighter.pos_x + mx.FightTools.kReadyFightnumbererval;
            var y1 = from.fighter.pos_y;
            var y2 = target.fighter.pos_y;
            var xdiff = Math.abs(x2 - x1); // 计算两个点的横坐标之差
            var ydiff = Math.abs(y2 - y1); // 计算两个点的纵坐标之差
            from = null;
            target = null;
            return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        };
        //检查目标是否有效
        MXFightTargets.prototype.check_target = function (target_id) {
            var target = mx.Combat.stage._arr_hero[target_id];
            var flag = target && !target.fighter.die;
            target = null;
            return flag;
        };
        //给目标排序
        MXFightTargets.prototype.sort_target_dragons = function (self_id, target_dragons, key, order) {
            if (order === void 0) { order = 'ASC'; }
            var sort_arr = [];
            for (var i in target_dragons) {
                var hero = mx.Combat.stage._arr_hero[target_dragons[i]];
                if (!hero || hero.fighter.die) {
                    hero = null;
                    continue;
                }
                var data = {};
                data.id = hero.hero_id;
                switch (key) {
                    case "AD":
                        data[key] = Number(hero.hero_info.AD);
                        break;
                    case "cur_hp":
                        data[key] = Number(hero.fighter.hp);
                        break;
                    case "ARM":
                        data[key] = Number(hero.hero_info.ARM);
                        break;
                    case "SPD":
                        data[key] = Number(hero.hero_info.SPPED);
                        break;
                }
                sort_arr.push(data);
                hero = null;
            }
            if (order == 'ASC') {
                sort_arr.sort(function (a, b) {
                    return a[key] - b[key];
                });
            }
            else if (order == 'DESC') {
                sort_arr.sort(function (a, b) {
                    return b[key] - a[key];
                });
            }
            var temp = [];
            for (var i_1 in sort_arr) {
                temp.push(sort_arr[i_1].id);
            }
            return temp;
        };
        return MXFightTargets;
    }());
    mx.MXFightTargets = MXFightTargets;
    __reflect(MXFightTargets.prototype, "mx.MXFightTargets");
    mx.FightTargets = MXFightTargets.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=FightTargets.js.map
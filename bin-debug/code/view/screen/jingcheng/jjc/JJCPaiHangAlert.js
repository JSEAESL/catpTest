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
/**
 * @cy/2017.3.24
 *  jjc排行榜
 */
var mx;
(function (mx) {
    var JJCPaiHangAlert = (function (_super) {
        __extends(JJCPaiHangAlert, _super);
        function JJCPaiHangAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_type = 1;
            return _this;
        }
        JJCPaiHangAlert.mx_support = function () {
            return ["assets.jjc_paihang", "data.2109"];
        };
        JJCPaiHangAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JJCPaiHangAlertMediator(this));
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_PAIHANG });
            //type
            //view.bg.source = AppConfig.MXTag == "wb" ? "phbbjing_png" : "phbbjing1_png";
            this.cur_type = 1;
            this.typename = mx.AppConfig.MXTag == "wb" ? ["女皇排名", "QQ好友排名"] : ["女皇排名"];
            //this.zduan_p.visible = AppConfig.MXTag == "wb";
            if (mx.AppConfig.MXTag == "wb") {
                view.tab_g.visible = true;
                var item_arr = [];
                for (var k in this.typename) {
                    if (this.typename[k] != "") {
                        item_arr.push({
                            "up": "phbtab_png",
                            "down": "phbtab_png",
                            "type": Number(k) + 1,
                            "word": this.typename[k]
                        });
                    }
                }
                view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
                view.tab_list.selectedIndex = 0;
                view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            }
            else {
                view.tab_g.visible = false;
            }
        };
        JJCPaiHangAlert.prototype.init_friend_data = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var jProxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
            var arr = [];
            for (var k in data) {
                var temp = data[k];
                var di = "";
                var rank = temp.rank;
                if (Number(temp.rank) <= 1) {
                    di = "pm" + Number(temp.rank) + "_png";
                    rank = "";
                }
                var zli_1 = 0;
                var obj = {};
                for (var k_1 in temp.query) {
                    var hero = temp.query[k_1];
                    obj.equip = hero.equip;
                    obj.level = hero.hero_info.level;
                    obj.mid = hero.hero_info.did;
                    obj.quality = hero.hero_info.quality;
                    obj.star = hero.hero_info.star;
                    obj.skills = hero.skill;
                    for (var t in hero.battle_soul) {
                        if (typeof hero.battle_soul[t].level == "undefined") {
                            hero.battle_soul[t] = { "level": hero.battle_soul[t] };
                        }
                    }
                    obj.fy_skill = hero.battle_soul;
                    var nine_word = hero.nine_word || [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    zli_1 += mx.FightTools.cal_fight_power(obj, null, data.dress, data.all_mid, nine_word);
                }
                arr.push({
                    "rank": rank,
                    "name": this.cur_type == 1 ? temp.name : temp.nick,
                    "zli": this.cur_type == 1 ? zli_1 : 25000 - Number(temp.score),
                    "avatar": this.cur_type == 1 ? "tx70_" + temp.avatar + "_png" : temp.avatar,
                    "di": di,
                    "x2": this.cur_type == 2 ? 98 : 98,
                    "x3": this.cur_type == 2 ? 0 : 0,
                    "scale": this.cur_type == 1 ? 0.675 : 1.5,
                    "type": this.cur_type
                });
            }
            this.rank_list.itemRenderer = mx.JJCPaiHangRender;
            this.rank_list.dataProvider = new eui.ArrayCollection(arr);
            // this.zduan2_p.source = this.cur_type == 1 ? "phbjsming_png" : "phbhyou_png";
            // this.zduan3_p.source = this.cur_type == 1 ? "phbzdli_png" : "phblszgpming_png";
            // this.zduan3_p.right = this.cur_type == 1 ? 63 : 30;
            // let layout : any = this.rank_list.layout;
            // layout.gap = 0;
            // this.rank_list.layout = layout;
            var hProxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME);
            var heros = hProxy.get_heroes_by_type("all", "team");
            var c_team = [];
            var zli = 0;
            c_team = hProxy.teams[hProxy.fight_id];
            var arr_my = [];
            for (var j = 0; j < heros.length; j++) {
                var obj = {};
                if (c_team.indexOf(Number(heros[j].id)) >= 0) {
                    obj.mid = heros[j].mid;
                    obj.id = heros[j].id;
                    obj.quality = heros[j].quality;
                    obj.level = heros[j].level;
                    obj.star = heros[j].star;
                    obj.notype = true;
                    obj.skill_level = heros[j].skill_level;
                    obj.equip = heros[j].equip;
                    obj.exp = heros[j].exp;
                    obj.skills = heros[j].skills;
                    obj.di_cor = 0x6e57a3;
                    obj.di_size = 16;
                    obj.width = 90;
                    obj.fy_skill = heros[j].fy_skill;
                    arr_my.push(obj);
                    var d = arr_my[arr_my.length - 1];
                    if (typeof d.equip == 'string') {
                        d.equip = JSON.parse(d.equip);
                    }
                    var cd = heros[j];
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
                                for (var k in skill) {
                                    if (Number(k) == skill_id) {
                                        skill_level += Number(skill[k]);
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
                    zli += mx.FightTools.cal_fight_power(d);
                }
            }
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            this.myrank_t.text = this.cur_type == 1 ? jProxy.my_rank + "" : (Number(jProxy.jjc_paiming_qq.selfrank) == 0 ? "未上榜" : jProxy.jjc_paiming_qq.selfrank);
            var str = this.cur_type == 1 ? gProxy.user_name : jProxy.jjc_paiming_qq.self_nick;
            if (str.length > 8) {
                str = str.substr(0, 5);
                str += "...";
            }
            this.myname_t.text = str;
            this.myzli_t.text = this.cur_type == 1 ? "" + zli : (25000 - Number(jProxy.jjc_paiming_qq.selfrank_score)) + "";
            if (this.cur_type == 2) {
                RES.getResByUrl(jProxy.jjc_paiming_qq.self_avatar, function (e) {
                    this.myqq_avatar.source = e;
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(0xff0000);
                    shape.graphics.drawCircle(11.5, 11.5, 11.5);
                    shape.graphics.endFill();
                    this.my_avatar_g.addChild(shape);
                    this.myqq_avatar.mask = shape;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.myqq_avatar.source = "tx70_" + gProxy.user_avatar + "_png";
            }
        };
        JJCPaiHangAlert.prototype.tab_click = function (e) {
            var type = e.item.type;
            if (type == this.cur_type) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var jProxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
            this.cur_type = type;
            if (type == 1) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_PAIHANG });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_PAIHANG_QQ });
            }
        };
        JJCPaiHangAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.tab_list.dataProvider = null;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JJCPaiHangAlertMediator.NAME);
        };
        JJCPaiHangAlert.S_NAME = "JJCPaiHangAlert";
        return JJCPaiHangAlert;
    }(mx.AlertView));
    mx.JJCPaiHangAlert = JJCPaiHangAlert;
    __reflect(JJCPaiHangAlert.prototype, "mx.JJCPaiHangAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCPaiHangAlert.js.map
/**
 *   @author CY、MX
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var JJCMainMediator = (function (_super) {
        __extends(JJCMainMediator, _super);
        function JJCMainMediator(viewComponent) {
            var _this = _super.call(this, JJCMainMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JJCMainMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JJCMainMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.FRESH_QUE,
                mx.MX_NOTICE.JJC_CISHU_CHANGED,
                mx.MX_NOTICE.JJC_AWARD,
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.CURRENCY_CHANGED,
            ];
        };
        JJCMainMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (notification.getType() == mx.JJCMainScreen.S_NAME) {
                        this.fresh_screen();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_TIME:
                    if (notification.getType() == "jjc") {
                        this.set_djs(data);
                    }
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    this.fresh_currency();
                    break;
                case mx.MX_NOTICE.JJC_CISHU_CHANGED:
                    this.set_cishu();
                    break;
                case mx.MX_NOTICE.JJC_AWARD:
                    this.set_award();
                    break;
                case mx.MX_NOTICE.FRESH_QUE:
                    if (data == "jjc" || data == "notype") {
                        this.set_fangyu();
                    }
                    break;
            }
        };
        Object.defineProperty(JJCMainMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JJCMainMediator.prototype.init_view = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.coin_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rank_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.log_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.duihuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.award_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chongzhi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.set_fangyu();
            this.fresh_screen();
        };
        JJCMainMediator.prototype.fresh_screen = function () {
            var view = this.view;
            view.rank_t.text = this.proxy.my_rank;
            if (Number(this.proxy.my_rank) > 20000) {
                view.rank_t.text = "";
                view.rank_t.visible = false;
                view.wsb_p.visible = true;
                view.wsb_p.width = 105;
            }
            else {
                view.rank_t.visible = true;
                view.wsb_p.visible = false;
                view.wsb_p.width = 0;
            }
            this.set_cishu();
            this.set_djs();
            this.fresh_currency();
            this.set_enemy();
            this.set_award();
        };
        JJCMainMediator.prototype.set_award = function () {
            var lq_state = this.proxy.lq_state;
            this.view.award_b.set_tsres("");
            if (lq_state > 1) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JJCAWARD, "id", lq_state - 1);
                var target_rank = Number(api.rank);
                if (target_rank >= this.proxy.max_rank) {
                    this.view.award_b.set_tsres("tishi_png", { "top": -15, "right": -12 });
                }
            }
        };
        JJCMainMediator.prototype.set_enemy = function () {
            var proxy = this.proxy;
            var view = this.view;
            view.target_list.dataProvider = new eui.ArrayCollection(proxy.target);
        };
        JJCMainMediator.prototype.set_cishu = function () {
            var proxy = this.proxy;
            var view = this.view;
            view.res_t.text = mx.Lang.jjc15 + proxy.my_chance + "/5";
            if (Number(proxy.my_chance) > 0) {
                view.res_g.width = 190;
                view.buy_b.visible = false;
            }
            else {
                view.res_g.width = 222;
                view.buy_b.visible = true;
            }
        };
        JJCMainMediator.prototype.set_djs = function (data) {
            var proxy = this.proxy;
            var view = this.view;
            if (proxy.res_time > 0) {
                view.price_g.visible = true;
                view.enemy_s.top = 702;
            }
            else {
                view.price_g.visible = false;
                view.enemy_s.top = 650;
            }
            var str = mx.Tools.format(mx.Lang.jjc17, mx.Tools.format_second(proxy.res_time));
            view.time_t.textFlow = mx.Tools.setKeywordColor2(str, [0x64c73a]);
        };
        JJCMainMediator.prototype.fresh_currency = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            view.ybao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
            view.coin_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
        };
        JJCMainMediator.prototype.set_fangyu = function () {
            var view = this.view;
            var proxy = this.proxy;
            var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var heros = hProxy.get_heroes_by_type("all", "team");
            var arr = [];
            var zli = 0;
            for (var j = 0; j < heros.length; j++) {
                var obj = {};
                if (proxy.fangyu_que.indexOf(Number(heros[j].id)) >= 0) {
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
                    obj.star_top = 100;
                    obj.di_bottom = 30;
                    obj.di_cor = 0x6E57A3;
                    obj.di_size = 16;
                    obj.chicun = 96;
                    obj.fy_skill = heros[j].fy_skill;
                    arr.push(obj);
                    var d = arr[arr.length - 1];
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
                        if (ln >= 1 && typeof skills[ln - 1].wake == "undefined") {
                            skills[ln - 1].wake = 0;
                        }
                        cd.skills = mx.Tools.arr2obj(skills, "skill_id");
                        d.skills = mx.Tools.arr2obj(skills, "skill_id");
                    }
                    zli += mx.FightTools.cal_fight_power(d);
                }
            }
            view.zli_t.text = zli + '';
            arr.reverse();
            view.hero_list.dataProvider = new eui.ArrayCollection(arr);
        };
        JJCMainMediator.prototype.onRemove = function () {
            var view = this.view;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.coin_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybao_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rank_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.log_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.award_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.duihuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chongzhi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.target_list.dataProvider = null;
            view.hero_list.dataProvider = null;
        };
        JJCMainMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var p_d;
            switch (evt.currentTarget) {
                case view.back_b://
                    this.proxy.jj_flag = false;
                    var p_name = mx.JJCMainScreen.P_NAME;
                    if (p_name) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                        mx.JJCMainScreen.P_NAME = null;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.AppConfig.PREV_SCENE_ID == mx.MainScreen.S_NAME ? mx.MainScreen.S_NAME : mx.JingChengScreen.S_NAME);
                    }
                    break;
                case view.help_b://
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCExplainAlert.S_NAME });
                    break;
                case view.coin_add_b://买银币
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
                case view.ybao_add_b://买元宝
                    this.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case view.tzdl_b://调整阵容
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.JJCQueAlert.S_NAME,
                        "param": 2
                    });
                    break;
                case view.award_b://排名奖励
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCRewardAlert.S_NAME });
                    break;
                case view.change_b://换一批
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JJC_FRESH
                    });
                    break;
                case view.buy_b://买次数
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_JJC_CISHU, "num": 5 },
                        "param": {
                            "item": "jjc_point",
                        }
                    };
                    p_d = { "name": mx.BuyAlertView2.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.chongzhi_b://重置
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_JJC_CLEARCD },
                        "param": mx.Lang.jjc18
                    };
                    p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.log_b://对战记录
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JJC_LOG
                    });
                    break;
                case view.duihuan_b://兑换奖励
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_SHOP });
                    break;
                case view.rank_b://排行榜
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCPaiHangAlert.S_NAME });
                    break;
            }
        };
        JJCMainMediator.NAME = "JJCMainMediator";
        return JJCMainMediator;
    }(puremvc.Mediator));
    mx.JJCMainMediator = JJCMainMediator;
    __reflect(JJCMainMediator.prototype, "mx.JJCMainMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JJCMainMediator.js.map
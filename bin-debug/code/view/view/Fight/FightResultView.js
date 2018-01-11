/**
*   @author qianjun
*   @date 2016.8.17
*   @desc 战斗结果弹窗
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
    var FightResultView = (function (_super) {
        __extends(FightResultView, _super);
        function FightResultView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.flag = false;
            _this.qq_arr = [];
            _this.qq_pm_arr = [];
            _this.qq_start = 0;
            _this.tween_arr = [];
            return _this;
        }
        FightResultView.mx_support = function () {
            return ["assets.f_result"];
        };
        FightResultView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            mx.Combat.skip_fighter = true;
            mx.Combat.clear_fight_info();
            var dianji = view.bg_rect;
            dianji.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.gsu_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.send_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cancel_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qqbg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hero_exp_list.dataProvider = null;
            view.item_list.dataProvider = null;
            egret.Tween.removeTweens(view.tishi);
            for (var i = 1; i < 4; ++i) {
                egret.Tween.removeTweens(view["xx" + i]);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.FightResultMediator.NAME);
            egret.Tween.removeTweens(this.pro_bt);
            egret.Tween.removeTweens(this.lszg_p);
            if (Number(this.fproxy.cur_stage) == Number(this.fproxy.stage_id)) {
                this.fproxy.set_stage_id(0);
            }
            for (var i = 0; i < this.qq_arr.length; ++i) {
                var ef_1 = this.jjc_g.getChildByName("pmbhcd" + i);
                if (ef_1) {
                    //ef.removeEventListener("mc_over", this.mc_over, this);
                    ef_1.on_remove();
                }
                ef_1 = null;
            }
            var ef = this.jjc_g.getChildByName("gstangxiao");
            if (ef) {
                //ef.removeEventListener("mc_over", this.mc_over, this);
                ef.on_remove();
            }
            ef = null;
            egret.Tween.removeTweens(this.qq_before_g);
            egret.Tween.removeTweens(this.qq_after_g);
            egret.Tween.removeTweens(this.qq_ts_g);
            for (var i in this.tween_arr) {
                this.tween_arr[i] = null;
            }
        };
        Object.defineProperty(FightResultView.prototype, "fproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FightResultView.prototype.init_view = function () {
            var view = this;
            var data = view.adata;
            view.exp_bar.set_res({ "up": "zdjgjdtiaon_png", "down": "zdjgjdtdchen_png" });
            view.item_list.itemRenderer = mx.GenTipRender;
            view.hero_exp_list.itemRenderer = mx.HeroAwardExpRender;
            var dianji = view.bg_rect;
            dianji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.FightResultMediator(this));
            view.bg_rect1.touchEnabled = false;
            view.bg_rect2.touchEnabled = false;
            var res = "";
            var shanzi = "";
            var huaban = "";
            var fproxy = this.fproxy;
            //结果
            switch (fproxy.result) {
                case 0:
                    res = "tgyj";
                    break;
                case 1:
                    res = "huosheng";
                    shanzi = "shanzi";
                    huaban = "huaban";
                    break;
                case 2:
                    res = "baibei";
                    shanzi = "sbshanzi";
                    huaban = "sbhuaban";
                    break;
                default:
                    res = "chaoshi";
                    shanzi = "sbshanzi";
                    huaban = "sbhuaban";
                    break;
            }
            view.result.source = res + "_png";
            view.huaban.source = huaban + "_png";
            view.shanzi.source = shanzi + "_png";
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            if (fproxy.yindao_fight > 0
                || mx.AppConfig.CURR_SCENE_ID == mx.YXDianScreen.S_NAME
                || mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME
                || mx.AppConfig.CURR_SCENE_ID == mx.JFSYJXQScreen.S_NAME
                || lproxy.isLD
                || mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME) {
                this.flag = true;
                view.pass_g.visible = false;
                view.win_g.visible = false;
                view.lose_g.visible = false;
                view.tishi.source = "tsjxu_png";
                view.tishi_move();
                view.xdz_g.visible = false;
                view.xdz_p.source = fproxy.result == 1 ? 'zdwin_png' : 'zdlose_png';
                if (mx.AppConfig.CURR_SCENE_ID == mx.YXDianScreen.S_NAME) {
                    view.txresult.source = fproxy.result == 1 ? 'txwin_png' : 'txfail_png';
                    view.xdz_g.visible = true;
                }
                else if (mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME ||
                    mx.AppConfig.CURR_SCENE_ID == mx.JFSYJXQScreen.S_NAME) {
                    view.txresult.source = fproxy.result == 1 ? 'jfswin_png' : 'jfsfail_png';
                    view.xdz_g.visible = true;
                }
                else if (lproxy.isLD) {
                    if (lproxy.fight_type == "help") {
                        view.txresult.source = fproxy.result == 1 ? 'qjfchsdchen_png' : 'qjfchsheng_png';
                        view.xdz_g.visible = true;
                        view.lose_g.visible = false;
                    }
                    else {
                        view.txresult.source = fproxy.result == 1 ? 'ldhsheng_png' : '';
                        view.xdz_g.visible = fproxy.result == 1;
                        view.lose_g.visible = fproxy.result != 1 ? true : false;
                        if (fproxy.result != 1) {
                            view.lose_g.touchEnabled = false;
                            view.skillup_b.set_ssres("tsjneng_png");
                            view.tzzrong_b.set_ssres("tsxingji_png");
                            view.heroup_b.set_ssres("mrjinjie_png");
                            view.zbfmo_b.set_ssres("sjfengyin_png");
                            view.tzzrong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                            view.skillup_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                            view.heroup_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                            view.zbfmo_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                        }
                    }
                }
                else if (mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME) {
                    var jjcproxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
                    if (fproxy.result == 1) {
                        if (!this.adata.huifang) {
                            this.show_jjc();
                        }
                        else {
                            //view.txresult.source = fproxy.result == 1 ? 'ldhsheng_png' : '';
                            view.lose_g.visible = fproxy.result != 1 ? true : false;
                        }
                    }
                }
                return;
            }
            var max = data.up ? parseInt(data.up.state) : 0;
            var die_num = mx.Combat.skip_result.die_num;
            // for(let i in fproxy.user_hero_info){
            //     if(fproxy.user_hero_info[i].state){
            //         if(fproxy.user_hero_info[i].state == 'dead'){
            //             ++ die_num;
            //         }
            //     }
            // }
            if (die_num == 0) {
                max = 3;
            }
            else if (die_num == 1) {
                max = 2;
            }
            else if (die_num > 2) {
                max = 1;
            }
            //播放动画     
            for (var i = 1; i <= 3; i++) {
                if (data.sl) {
                    if (i <= max) {
                        view["xx" + i].source = "tgxx_png";
                        view["xx" + i].left = (i - 1) * 62 - 24;
                        view["xx" + i].verticalCenter = 0;
                    }
                }
            }
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', fproxy.cur_stage);
            if (Number(stage.KeyStage) == 0) {
                view.pass_g.visible = false;
            }
            if (data.sl && max > 0) {
                this.star_move(1, max);
            }
            else if (data.sl && max == -1) {
                this.fresh_succ();
                view.win_bg.source = "tzyccgddang_png";
            }
            else {
                view.win_g.visible = false;
                view.lose_g.visible = true;
                view.skillup_b.set_ssres("tsjneng_png");
                view.tzzrong_b.set_ssres("tsxingji_png");
                view.heroup_b.set_ssres("mrjinjie_png");
                view.zbfmo_b.set_ssres("sjfengyin_png");
                view.tzzrong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                view.skillup_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                view.heroup_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                view.zbfmo_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                this.flag = true;
                this.timeout = egret.setTimeout(this.tishi_move, this, 500);
            }
            if (max == 0) {
                this.flag = true;
            }
        };
        //点击
        FightResultView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var net = [];
            switch (e.currentTarget) {
                case view.skillup_b://升级技能
                    net = [
                        {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        }, {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "1|2|3|4|5|6",
                        }
                    ];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TeamScreen.S_NAME,
                        "param": { "net": net }
                    });
                    // net = [{
                    //     "t": MX_NETS.CS_PACK_TYPE_ITEM,
                    //     "type": "1|2|3|4|5|6",
                    // }];
                    // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname": "",
                    //     "param": { "net": net }
                    // });
                    break;
                case view.heroup_b: //提升星级
                case view.tzzrong_b: //美人进阶
                case view.zbfmo_b://升级封印
                    var user_hero = this.fproxy.copy_user_info;
                    if (user_hero[1].id != 0) {
                        mx.HeroTrainScreen.P_NAME = mx.TeamScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CHERO_INFO,
                            "id": user_hero[1].id,
                        });
                    }
                    // net = [
                    //     {
                    //         "t": MX_NETS.CS_INIT_SKILL
                    //     }, {
                    //         "t": MX_NETS.CS_PACK_TYPE_ITEM,
                    //         "type": "1|2|3|4|5|6",
                    //     }
                    // ];
                    // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname": TeamScreen.S_NAME,
                    //     "param": { "net": net }
                    // });
                    break;
                case view.gsu_rect:
                    var jproxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
                    view.str_t.text = mx.Tools.format(mx.Lang.wbqqjjc, jproxy.my_rank);
                    view.qqbg_rect.visible = view.qqbg_rect.touchEnabled = view.qq_alert_g.visible = true;
                    break;
                case view.cancel_b:
                case view.qqbg_rect:
                    view.qqbg_rect.visible = view.qqbg_rect.touchEnabled = view.qq_alert_g.visible = false;
                    break;
                case view.send_b:
                    var temp = this.qq_arr[this.qq_arr.length - 1];
                    //玩吧消息
                    var rid = Math.floor(Math.random() * 3) + 1;
                    facade.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        "openid": temp.openid,
                        "mtype": 3,
                        "str": mx.Lang['wbgshy00' + rid]
                    });
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_WB_JJC_SHARE
                    });
                    view.qqbg_rect.visible = view.qqbg_rect.touchEnabled = view.qq_alert_g.visible = false;
                    break;
            }
        };
        /*---------关闭---------*/
        FightResultView.prototype.close_self = function () {
            if (!this.flag)
                return;
            if (this.qq_arr.length) {
                //下一个
                var ef = this.jjc_g.getChildByName("pmbhcd" + this.qq_start);
                if (ef) {
                    ef.removeEventListener("play_over", this.play_over, this);
                    ef.on_remove();
                }
                ef = null;
                ef = this.jjc_g.getChildByName("gstangxiao");
                if (ef) {
                    ef.on_remove();
                }
                ef = null;
                ++this.qq_start;
                this.qq_arr.splice(this.qq_arr.length - 1, 1);
                if (this.qq_arr.length) {
                    this.paiming_mc();
                    return;
                }
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FightResultView.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
            if (mx.MX_COMMON.IN_GUIDE == 1) {
                var proxy = this.fproxy;
                if (proxy.yindao_fight) {
                    proxy.set_yindao_fight(0);
                    facade.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                    return;
                }
            }
            var data = this.adata;
            if (data.notice) {
                facade.sendNotification(data.notice, data.sdata);
            }
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            dproxy.check_lv_up('fight');
        };
        /*------------胜利界面-------------*/
        FightResultView.prototype.fresh_succ = function () {
            var view = this;
            var data = view.adata;
            view.win_g.visible = true;
            view.lose_g.visible = false;
            view.tishi.source = "tsjxu_png";
            //奖励
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var cur_exp = dproxy.get_currency('uexp');
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var level_info = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', gproxy.user_lv);
            var next_exp = cur_exp;
            if (level_info) {
                next_exp = Math.max(parseInt(level_info.Sum), cur_exp);
            }
            view.next_exp_t.text = next_exp - cur_exp + "";
            var lvapi = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', gproxy.user_lv - 1);
            var uexp = cur_exp - (lvapi ? lvapi.Sum : 0);
            view.exp_bar.value = Math.min(Math.round(uexp / Number(level_info.Exp) * 100), 100);
            view.exp_bar.change_gross_bar(3, Math.round(uexp / Number(level_info.Exp) * 100), 100);
            //上阵英雄经验
            var exp_arr = [];
            // let share_exp = Tools.arr2obj(dproxy.hero_share_exp, 'id');
            var user_hero = this.fproxy.copy_user_info;
            for (var key in user_hero) {
                if (key == 'zhanwei') {
                    continue;
                }
                var temp = user_hero[key];
                exp_arr.push({
                    "id": temp.id,
                    "mid": temp.dragon_id,
                    "quality": temp.dragon_quality,
                    "xingji": temp.dragon_star,
                    "style": 'exp',
                    "notype": true,
                    "exp": 0,
                    "chicun": 94
                });
            }
            //view.hero_exp_list.dataProvider = new eui.ArrayCollection(exp_arr);
            //物品奖励
            var award = [];
            var exp, ybi = 0;
            for (var i = 0, l = data.awards.length; i < l; ++i) {
                var temp = data.awards[i];
                switch (Number(temp.type)) {
                    case 5:
                        exp = temp.shuliang || 0;
                        break;
                    case 1:
                        ybi = temp.shuliang || 0;
                        break;
                    case 4:
                        var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", temp.id);
                        if (item) {
                            award.push({
                                "id": temp.id,
                                "type": 4,
                                "num": temp.shuliang,
                                "no_tip": true,
                                "chicun": 88
                            });
                        }
                        break;
                    case 2:
                        award.push({
                            "id": 0,
                            "type": 2,
                            "num": temp.shuliang,
                            "no_tip": true,
                            "chicun": 88
                        });
                        break;
                }
            }
            view.yinliang_t.text = "+" + ybi;
            view.cur_exp_t.text = "+" + exp;
            if (award.length < 5) {
                view.item_list.layout["requestedColumnCount"] = award.length;
            }
            else {
                view.item_list.layout["requestedColumnCount"] = 5;
            }
            view.item_list.dataProvider = new eui.ArrayCollection(award); //物品掉落
            this.flag = true;
            this.timeout = egret.setTimeout(this.tishi_move, this, 500); //长按0.75秒
        };
        FightResultView.prototype.show_jjc = function () {
            var data = this.adata;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var jproxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
            this.result.visible = this.shanzi.visible = false;
            this.jjc_g.visible = true;
            this.lszg_p.visible = this.pro_bt.visible = false;
            this.pm_bt.text = jproxy.my_rank + "";
            this.pro_bt.text = data.add_rank + "";
            var c_team = hproxy.teams[hproxy.fight_id];
            var heros = hproxy.get_heroes_by_type("all", "team");
            var arr = [];
            for (var j = 0; j < heros.length; j++) {
                var obj = {};
                if (c_team.indexOf(Number(heros[j].id)) >= 0) {
                    obj.mid = heros[j].mid;
                    obj.id = heros[j].id;
                    obj.quality = heros[j].quality;
                    obj.level = heros[j].level;
                    obj.star = heros[j].star;
                    obj.notype = true;
                    obj.di_cor = 0xe7d7e7;
                    obj.di_size = 13;
                    obj.chicun = 90;
                    arr.push(obj);
                }
            }
            this.jhero_list.itemRenderer = mx.TeamHeroRender2;
            this.jhero_list.dataProvider = new eui.ArrayCollection(arr);
            if (data.add_rank) {
                this.lszg_p.scaleX = this.pro_bt.scaleX = this.lszg_p.scaleY = this.pro_bt.scaleY = 2;
                var idTimeout = egret.setTimeout(function (arg) {
                    this.lszg_p.visible = this.pro_bt.visible = true;
                    egret.Tween.get(this.lszg_p).to({ "scaleX": 1, "scaleY": 1 }, 100).wait(50);
                    egret.Tween.get(this.pro_bt).to({ "alpha": 1, "scaleX": 0.9, "scaleY": 0.9 }, 200);
                }, this, 500, "egret");
            }
            var zg = new mx.GeneralEffect("xxgxiao");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1.42;
            var zg2 = new mx.GeneralEffect("jjslxz");
            this.ef2_g.addChild(zg2);
            zg2.play_by_times(-1);
            view.jjc_g.top = 203;
            view.jjc_g.verticalCenter = null;
            //qq好友特殊处理
            if (mx.AppConfig.MXTag == 'wb') {
                this.qq_pm_arr = [];
                var cnt = 0;
                for (var i in jproxy.qq_friend_rank_before) {
                    var unit = jproxy.qq_friend_rank_before[i].data;
                    if (25000 - Number(unit.score) > Number(jproxy.my_rank)) {
                        this.qq_pm_arr.push(unit);
                        ////console.log("\n你的当前排名是" + jproxy.my_rank + "你的昵称是" + jproxy.jjc_paiming_qq.self_nick +"你超过了" + unit.nick + "\n好友中的" + unit.rank + "\n好友排名" + (25000 - Number(unit.score) + ""));
                    }
                }
                //取前五
                for (var i in this.qq_pm_arr) {
                    if (cnt < 10) {
                        this.qq_arr.push(this.qq_pm_arr[i]);
                        ++cnt;
                    }
                }
                //有超过的好友 弹出动画以及通知框
                if (this.qq_arr.length) {
                    this.jjc_g.verticalCenter = -65;
                    view.jjc_g.top = null;
                    view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
                    view.bg_rect1.touchEnabled = true;
                    view.bg_rect2.touchEnabled = true;
                    view.bg_rect1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
                    view.bg_rect2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
                    this.flag = false;
                    this.qq_start = 0;
                    view.gsu_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                    view.send_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                    view.cancel_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                    view.qqbg_rect.touchEnabled = false;
                    view.qqbg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                    this.paiming_mc();
                }
            }
        };
        FightResultView.prototype.paiming_mc = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
            this.jhero_list.visible = this.qq_before_g.visible = this.qq_after_g.visible = this.qq_ts_g.visible = false;
            this.qqbg_rect.visible = this.qqbg_rect.touchEnabled = this.qq_alert_g.visible = false;
            this.qq_before_g.top = 206;
            this.qq_after_g.top = 396;
            this.qq_before_g.horizontalCenter = this.qq_after_g.horizontalCenter = 0;
            this.jl_ts.visible = Number(jproxy.jjc_qq_lq) == 0;
            //最后一名数据
            var temp = this.qq_arr[this.qq_arr.length - 1];
            this.init_qq_info(temp, "before");
            //自己
            if (this.qq_pm_arr.length > 10) {
                var unit = this.qq_pm_arr[10];
                jproxy.jjc_paiming_qq.selfrank = unit.rank;
            }
            this.init_qq_info({
                "avatar": jproxy.jjc_paiming_qq.self_avatar,
                "rank": jproxy.jjc_paiming_qq.selfrank,
                "nick": jproxy.jjc_paiming_qq.self_nick,
                "score": 25000 - Number(jproxy.my_rank)
            }, "after");
            var gx = new mx.GeneralEffect("pmbhcd");
            gx.set_event("play_over");
            gx.play_by_times(1);
            gx.set_retain(true);
            gx.touchEnabled = false;
            gx.addEventListener("play_over", this.play_over, this);
            gx.verticalCenter = 95;
            gx.horizontalCenter = 0;
            gx.name = "pmbhcd" + this.qq_start;
            this.jjc_g.addChild(gx);
        };
        FightResultView.prototype.play_over = function () {
            this.qq_before_g.visible = this.qq_after_g.visible = true;
            //开始动起来
            this.tween_arr.push(egret.Tween.get(this.qq_before_g).to({ top: 301, horizontalCenter: -108 }, 300).call(function () {
                //动完之后
                var temp = this.qq_rank_before_t.text;
                this.qq_rank_before_t.text = this.qq_rank_after_t.text;
                this.qq_rank_after_t.text = temp;
                var facade = mx.ApplicationFacade.getInstance();
                var jproxy = (facade.retrieveProxy(mx.JingJiProxy.NAME));
                var qq_info = this.qq_arr[this.qq_arr.length - 1];
                jproxy.jjc_paiming_qq.selfrank = Number(qq_info.rank);
            }, this).to({ top: 396, horizontalCenter: 0 }, 300));
            this.tween_arr.push(egret.Tween.get(this.qq_after_g).to({ top: 301, horizontalCenter: 108 }, 300).to({ top: 206, horizontalCenter: 0 }, 300).wait(500).call(function () {
                //显示告诉按钮
                this.qq_ts_g.alpha = 0;
                //this.qq_ts_g.scaleX = this.qq_ts_g.scaleY = 0;
                this.qq_ts_g.visible = true;
                this.tween_arr.push(egret.Tween.get(this.qq_ts_g).to({ alpha: 1 }, 400).call(function () {
                    this.flag = true;
                    if (this.jl_ts.visible) {
                        var gx = new mx.GeneralEffect("gstangxiao");
                        gx.play_by_times(-1);
                        gx.left = 372;
                        gx.top = 561;
                        gx.name = "gstangxiao";
                        gx.touchEnabled = false;
                        this.jjc_g.addChild(gx);
                    }
                }, this));
            }, this));
        };
        FightResultView.prototype.init_qq_info = function (data, ziduan) {
            //avatar
            RES.getResByUrl(data.avatar, function (e) {
                this["avatar_" + ziduan].source = e;
                var shape = new egret.Shape();
                shape.graphics.beginFill(0xff0000);
                shape.graphics.drawCircle(22 + 23, 9, 23);
                shape.graphics.endFill();
                this["qq_" + ziduan + "_g"].addChild(shape);
                this["avatar_" + ziduan].mask = shape;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            //好友中排名
            this["qq_rank_" + ziduan + "_t"].text = "第" + data.rank + "名";
            //昵称
            this["nick_" + ziduan + "_t"].text = data.nick;
            //竞技场排名
            this["qq_score_" + ziduan + "_t"].text = (25000 - Number(data.score)) + "";
        };
        FightResultView.prototype.tishi_move = function () {
            var view = this;
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            view.tishi.alpha = 0.7;
            egret.Tween.get(view.tishi, { "loop": true }).to({ "alpha": 0.4 }, 1000).to({ "alpha": 0.7 }, 1000);
        };
        FightResultView.prototype.star_move = function (index, max) {
            var view = this;
            var data = this.adata;
            egret.Tween.get(view["xx" + index]).wait(100).to({ "left": (index - 1) * 62 * 1.5, "verticalCenter": 0, "scaleX": 1, "scaleY": 1, "alpha": 1 }, 170).call(function () {
                //播放动画
                var eid = "zdxxdcgxiao";
                var new_ef = new mx.GeneralEffect(eid);
                new_ef.change_framerate(24, 1);
                new_ef.x = (index - 1) * 62 * 1.5 + 21;
                new_ef.y = 22;
                new_ef.name = eid;
                this.pass_g.addChild(new_ef);
            }, this).wait(100).call(function () {
                if (index == max && data.sl) {
                    this.fresh_succ();
                }
                else if (index < max) {
                    this.star_move(++index, max);
                }
            }, this);
        };
        FightResultView.S_NAME = "FightResultView";
        return FightResultView;
    }(mx.BasicView));
    mx.FightResultView = FightResultView;
    __reflect(FightResultView.prototype, "mx.FightResultView");
})(mx || (mx = {}));
//# sourceMappingURL=FightResultView.js.map
/**
*   @author cy
*   @date 2017.3.13
*   @desc 竞技场数据管理
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
    var JingJiProxy = (function (_super) {
        __extends(JingJiProxy, _super);
        function JingJiProxy() {
            var _this = _super.call(this, JingJiProxy.NAME) || this;
            _this.jj_flag = false; //竞技flag
            _this.qq_friend_rank_before = [];
            _this.huifang = false;
            return _this;
        }
        JingJiProxy.prototype.clear_cd = function (data) {
            switch (data.state) {
                case 0://没有cd
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jjc02 });
                    break;
                case 1://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2://成功
                    this.res_time = 0;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.JJCMainScreen.S_NAME);
                    break;
            }
        };
        JingJiProxy.prototype.set_team = function (data) {
            var str;
            switch (data.state) {
                case 0://空队列
                    str = mx.Lang.h0010;
                    break;
                case 1://不是自己的
                    str = mx.Lang.jjc05;
                    break;
                case 2://超过最大出战人数
                    str = mx.Lang.jjc06;
                    break;
                case 3://
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JJCQueAlert.S_NAME);
                    var hproxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
                    if (Number(data.type) == 1) {
                        var lproxy = this.facade.retrieveProxy(mx.LueDuoProxy.NAME);
                        lproxy.fangyu_que = [];
                        lproxy.fangyu_temp = [];
                        lproxy.fangyu_que_muban = data.muban;
                        hproxy.teams[12] = [];
                        for (var k in data.team) {
                            lproxy.fangyu_que.push(Number(data.team[k]));
                            lproxy.fangyu_temp.push(Number(data.team[k]));
                            hproxy.teams[12].push(Number(data.team[k]));
                        }
                        this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, mx.LDMainScreen.S_NAME);
                    }
                    else {
                        this.fangyu_que = [];
                        this.fangyu_temp = [];
                        this.fangyu_que_muban = data.muban;
                        hproxy.teams[11] = [];
                        for (var k in data.team) {
                            this.fangyu_que.push(Number(data.team[k]));
                            this.fangyu_temp.push(Number(data.team[k]));
                            hproxy.teams[11].push(Number(data.team[k]));
                        }
                        this.sendNotification(mx.MX_NOTICE.FRESH_QUE, "jjc");
                    }
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.buy_cishu_cb = function (data) {
            if (Number(data.state)) {
                this.has_buy = Number(data.has_buy) || 0;
                this.my_chance = Number(data.total);
                this.sendNotification(mx.MX_NOTICE.JJC_CISHU_CHANGED);
            }
            else {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                    "param": mx.Lang.a0006
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        JingJiProxy.prototype.check_time_tick = function (data) {
            if (data && typeof this.res_time != "undefined" && this.res_time > -1) {
                this.res_time -= data.delay;
                this.sendNotification(mx.MX_NOTICE.FRESH_TIME, null, "jjc");
            }
        };
        JingJiProxy.prototype.fresh_enemy_cb = function (data) {
            this.target = data.enemy;
            this.my_rank = data.rank;
            this.res_time = data.cold_time;
            this.my_chance = data.total;
            this.has_buy = Number(data.has_buy) || 0;
            this.max_rank = Number(data.best_rank) || 20001;
            this.lq_state = Number(data.lq);
            this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.JJCMainScreen.S_NAME);
        };
        JingJiProxy.prototype.init_jjc_fight = function (data) {
            var str;
            switch (data.state) {
                case 0://没有剩余挑战次数
                    str = mx.Lang.jjc07;
                    break;
                case 1://冷却时间没到（返回冷却时间）
                    this.res_time = data.cold_time;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.JJCMainScreen.S_NAME);
                    str = mx.Lang.jjc08;
                    break;
                case 2://该对手已经不在排行榜
                    str = mx.Lang.jjc09;
                    break;
                case 3://改对手正在被战斗
                    str = mx.Lang.jjc10;
                    break;
                case 4://
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JJCQueAlert.S_NAME);
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    fproxy.init_jjc_fight(data);
                    this.res_time = data.cold_time;
                    this.my_chance = Number(data.total);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.check_jjc_fight = function (data) {
            var str;
            switch (data.state) {
                case 1://战斗超时
                    str = mx.Lang.jjc19;
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 13,
                    });
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 12, "add": 1 });
                    //上报当日PK次数
                    return;
                case 2://该对手与别人战斗中
                    str = mx.Lang.jjc20;
                    break;
                case 0: //战斗失败
                case 3: //胜利的对手排名比自己低（排名不变）
                case 4://排名改变
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': this.cur_enemy.user_id,
                        "mtype": 3,
                        "str": mx.Lang.wbjjc
                    });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JJCLogAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JJCDetailAlert.S_NAME);
                    var pass = data.state != 0;
                    var add_rank = data.add_rank ? data.add_rank : 0;
                    this.my_rank = data.rank || this.my_rank;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FightResultView.S_NAME,
                        "param": {
                            "notice": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata": { "t": mx.MX_NETS.CS_JJC_FRESH },
                            "add_rank": add_rank,
                            "sl": pass
                        }
                    });
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 13,
                    });
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 12, "add": 1 });
                    mx.DataTool.getInstance().set_QQ_Score(18, data.rank);
                    //上报当日PK次数
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.lq_jjc_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://所有奖励已领取
                    str = mx.Lang.jjc11;
                    break;
                case 1://排名要求未达到（返回要领取的id）
                    str = mx.Lang.jjc12;
                    break;
                case 2://超过最大出战人数
                    this.lq_state = Number(data.jl_id);
                    this.sendNotification(mx.MX_NOTICE.JJC_AWARD);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, null, mx.JJCRewardAlert.S_NAME);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.init_jjc_log = function (data) {
            this.jjc_log = data.data;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCLogAlert.S_NAME });
        };
        JingJiProxy.prototype.init_jjc_detail = function (data) {
            this.cur_enemy.query = data.info;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCDetailAlert.S_NAME });
        };
        JingJiProxy.prototype.init_jjc_shop = function (data) {
            this.wuxun = Number(data.wuxun);
            this.wupin = data.wupin;
            this.goumai = data.goumai;
            this.shop_has_buy = Number(data.has_buy);
            this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 5 });
        };
        JingJiProxy.prototype.fresh_jjc_shop = function (data) {
            if (data.state) {
                this.wupin = data.wupin;
                this.goumai = data.goumai;
                this.shop_has_buy = Number(data.has_buy);
                this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
            }
            else {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                    "param": mx.Lang.a0006
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        JingJiProxy.prototype.duihuan_jjc_shop = function (data) {
            var str;
            switch (data.state) {
                case 0://可购买物品中没有此物品
                    str = mx.Lang.jjc24;
                    break;
                case 1://物品已购买
                    str = mx.Lang.jjc22;
                    break;
                case 2://武勋不足
                    str = mx.Lang.jjc23;
                    break;
                case 3://
                    this.wuxun = Number(data.wuxun);
                    this.goumai = data.goumai;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.init_jjc_paihang = function (data) {
            this.jjc_paiming = data.paiming;
            this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data.paiming);
        };
        JingJiProxy.prototype.jjc_qq_paiming = function (data) {
            this.jjc_paiming_qq = data.data;
            this.jjc_qq_lq = data.lq;
            this.qq_friend_rank_before = [];
            for (var i in data.data.ranklist) {
                var unit = data.data.ranklist[i];
                if ((25000 - Number(unit.score)) < Number(this.my_rank) && unit.nick != data.data.self_nick) {
                    this.qq_friend_rank_before.push({
                        "idx": i,
                        "data": unit
                    });
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data.data.ranklist);
        };
        JingJiProxy.prototype.wb_jjc_share = function (data) {
            var str;
            switch (data.state) {
                case 0://已经领取过了
                    str = mx.Lang.wbgshy004;
                    break;
                case 1:
                    this.jjc_qq_lq = 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.prototype.xq_jjc_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCXiangQingAlert.S_NAME, "param": data });
                    return;
                case 2://无记录
                    str = mx.Lang.jjc25;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        JingJiProxy.NAME = "JingJiProxy";
        return JingJiProxy;
    }(puremvc.Proxy));
    mx.JingJiProxy = JingJiProxy;
    __reflect(JingJiProxy.prototype, "mx.JingJiProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JingJiProxy.js.map
/**
 *   @author wf
 *   @date 2016.12.20
 *   @desc 活动相关数据管理
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
    var ActyProxy = (function (_super) {
        __extends(ActyProxy, _super);
        function ActyProxy() {
            var _this = _super.call(this, ActyProxy.NAME) || this;
            _this.acty_list = {};
            //[签到次数，今日是否签到]，当前等级，累计充值(用于界面显示),每日充值。累计消耗
            _this.acty_data = { 'sign_count': 0, 'has_sign': false, 'level': 1, 'total_pay': 0, "pay_daily": 0, "total_use": 0 };
            _this.target_acty = 0;
            _this.weekend_flag = 0;
            //解除封印、主界面说明两个倒计时 只用其一
            _this.fy_day = 0;
            _this.fy_lq = [];
            _this.day2_lq = 0;
            _this.daylast_lq = 0;
            _this.huyao_final_award_type = 1; //1最终 2分身      
            _this.yiwei_yaohu = false;
            _this.yaohu_shicong_id = 0;
            _this.yaohu_tiaozhuan = false;
            _this.yongjiu_pay = 0;
            _this.five_flag = 1; //0今日五点后1今日五点前2算作累计充值
            _this.cat_try_count = -1;
            _this.cat_vip = [];
            _this.cat_vip_tip = "";
            _this.single_sign_num = 0; //单签天数
            _this.leiji_sign_award = []; //可领取的奖励
            _this.baoxiang_log = []; //所有的累签奖励（宝箱）记录
            _this.leiji_sign_total = 0; //总天数
            _this.lixian_lq = false;
            _this.lixian_view = 0;
            _this.gsws_flag = false;
            _this.flcj_flag = false;
            _this.acty_hero_flag = false;
            _this.xxg_xxiu_tab = 1; //1初选2复选3殿选
            _this.cz_loop_data = {};
            _this.liandan_shuliandu = 0;
            _this.liandan_baoxiang_log = []; //所有的炼丹奖励（宝箱）记录
            _this.wsb_num = 0;
            _this.ws_duihuan = {};
            _this.tar_cygg_index = 0; //
            _this.cygg_award = 1; //本次抽奖id
            _this.cygg_award_arr = []; //本次抽奖奖品
            _this.free_cygg = 0; //财源滚滚滚免费次数
            _this.res_cygg = 0; //财源滚滚剩余抽奖次数
            _this.ybi_cygg = 0; //银币抽奖次数
            _this.huyao_tishi = {};
            _this.huyao_param = {};
            return _this;
        }
        ActyProxy.prototype.init_acty = function (data) {
            this.acty_time = {};
            var now = Math.floor(new Date().getTime() / 1000);
            if (data.already_open) {
                for (var i in data.already_open) {
                    var unit = data.already_open[i];
                    if (unit.end < now) {
                        this.acty_time[unit.id] = unit;
                    }
                }
                this.acty_time = mx.Tools.arr2obj(data.already_open, "id");
                this.acty_time2 = mx.Tools.arr2obj(data.already_open, "id");
            }
            if (data.show) {
                for (var i in data.show) {
                    var unit = data.show[i];
                    if (!this.acty_time[unit.id] && unit.show_end < now) {
                        this.acty_time[unit.id] = unit;
                    }
                }
                this.acty_time_show = mx.Tools.arr2obj(data.show, "id");
            }
        };
        Object.defineProperty(ActyProxy.prototype, "acty_tishi", {
            get: function () {
                var tishi = this.get_acty_tishi();
                var temp = {
                    "sign": '1',
                    "level": '2',
                    "recharge": '3',
                    "daily_pay": '4',
                    "total_use": '5',
                    "cat": '15',
                    "leiji_sign": '16',
                    "yongjiu_pay": '997',
                    "huyao": '1000'
                };
                for (var k in tishi) {
                    var id = Number(temp[k]);
                    if (id < 100) {
                        if (tishi[k] && this.judge_time(temp[k], "show_start", "show_end")) {
                            return true;
                        }
                    }
                    else {
                        if (tishi[k]) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ActyProxy.prototype.judge_time = function (ctype, start_ziduan, end_ziduan) {
            var now = new Date().getTime(); //ms
            if (!this.acty_time[ctype]) {
                return false;
            }
            if (Number(ctype) == 16) {
                var opensid = 999;
                if (window && window["mx_opensid"]) {
                    opensid = window["mx_opensid"];
                }
                if (Main.SER_ID > opensid) {
                    return false;
                }
            }
            var start = Number(this.acty_time[ctype][start_ziduan]) * 1000;
            var end = Number(this.acty_time[ctype][end_ziduan]) * 1000;
            if (now >= start && now < end) {
                return true;
            }
            else {
                return false;
            }
        };
        ActyProxy.prototype.get_acty_tishi = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var flags = gproxy.tishi_data.kf_act;
            var tishi = {
                "sign": false,
                "level": false,
                "recharge": false,
                "daily_pay": false,
                "total_use": false,
                "yongjiu_pay": false,
                "cat": false,
                "leiji_sign": false,
                "huyao": false
            };
            if (!flags || 1) {
                return tishi;
            }
            tishi.sign = flags.kf_sign;
            if (!flags.level) {
                return tishi;
            }
            var group = {};
            for (var i = 1; i < 5; ++i) {
                group[i + 1] = this.init_acty_group(i);
            }
            group["15"] = [this.cat_try_count];
            group["16"] = [{
                    "log": this.leiji_sign_lq,
                    "today": this.cur_leiji_sign
                }];
            group["997"] = this.acty_list["997"]; //永久累充
            for (var i in group) {
                var flag = false;
                for (var j in group[i]) {
                    var unit = group[i][j];
                    switch (Number(i)) {
                        case 2:
                            flag = tishi.level = unit <= gproxy.user_lv && flags.kf_level.indexOf(unit + '') < 0;
                            break;
                        case 3:
                            flag = tishi.recharge = unit <= gproxy.total_pay && flags.kf_pay.indexOf(unit + '') < 0;
                            break;
                        case 4:
                            flag = tishi.daily_pay = unit <= gproxy.daily_pay && flags.kf_daily_pay.indexOf(unit + '') < 0;
                            break;
                        case 5:
                            flag = tishi.total_use = unit <= gproxy.total_use && flags.kf_use.indexOf(unit + '') < 0;
                            break;
                        case 15:
                            var vip = mx.ApiTool.getAPINode(mx.MX_APINAME.CATVIP, "id", gproxy.user_vip);
                            if (unit >= vip.num) {
                                flag = tishi.cat = false;
                                break;
                            }
                            var count = mx.ApiTool.getAPINode(mx.MX_APINAME.CATZHAOCAI, "id", unit + 1);
                            if (count) {
                                var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
                                flag = tishi.cat = (unit < vip.num) && (dproxy.get_currency("ybao") >= count.price);
                            }
                            else {
                                flag = tishi.cat = false;
                            }
                            break;
                        case 16:
                            flag = tishi.leiji_sign = true;
                            if (this.leiji_sign_lq) {
                                flag = tishi.leiji_sign = this.leiji_sign_award.length > 0 ? true : false;
                            }
                            break;
                        case 997:
                            flag = tishi.yongjiu_pay = unit.group <= this.yongjiu_pay && !unit.log;
                            break;
                    }
                    if (flag) {
                        break;
                    }
                }
            }
            for (var i in this.huyao_tishi) {
                if (this.huyao_tishi[i]) {
                    for (var j in this.huyao_tishi[i]) {
                        if (this.huyao_tishi[i][j]) {
                            tishi.huyao = true;
                            break;
                        }
                    }
                    if (tishi.huyao) {
                        break;
                    }
                }
            }
            return tishi;
        };
        ActyProxy.prototype.init_acty_group = function (key_id) {
            var groups = [];
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUODONG, 'type', key_id + 1);
            for (var i in api) {
                if (api[i]) {
                    if (groups.indexOf(api[i].group) < 0) {
                        groups.push(Number(api[i].group));
                    }
                }
            }
            return groups;
            // for (let i: number = 1; i < 1000; i++) {
            //     let api: any = ApiTool.getAPINode(this.acty_api[key_id], 'id', i);
            //     if (!api) {
            //         break;
            //     } else if (groups.indexOf(api.group) < 0) {
            //         groups.push(Number(api.group));
            //     }
            // }
        };
        ActyProxy.prototype.init_acty_sign = function (data) {
            this.acty_data.sign_count = Number(data.count);
            this.acty_data.has_sign = data.has_sign == 1;
            this.init_acty_list(0);
            this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
        };
        ActyProxy.prototype.acty_sign_cb = function (data) {
            var msg;
            switch (data.state) {
                case 2:
                    msg = mx.Lang.hd007;
                    break;
                case 3:
                    this.acty_data.sign_count++;
                    this.acty_data.has_sign = true;
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var flags = gproxy.tishi_data.kf_act;
                    flags.kf_sign = false;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
                    //let gproxy : GameProxy = <GameProxy><any>this.facade.retrieveProxy(GameProxy.NAME);
                    //let flags : any = gproxy.tishi_data.kf_act;
                    //flags.kf_sign = false;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //其他开服活动数据
        ActyProxy.prototype.init_acty_data = function (data) {
            var msg;
            switch (data.state) {
                case 2:
                    msg = mx.Lang.err01;
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
                    break;
                case 0:
                case 1:
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    this.acty_data.level = gproxy.user_lv;
                    for (var k in this.acty_data) {
                        if (data[k]) {
                            this.acty_data[k] = data[k];
                        }
                    }
                    if (!data.log) {
                        data.log = [];
                    }
                    this.init_acty_list(data.key_id, data.log);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.WxActyAlert.S_NAME,
                        "param": {
                            "type": Number(data.key_id) + 1
                        }
                    });
                    //this.sendNotification(MX_NOTICE.UPDATE_ACTY, Number(data.key_id) + 1);
                    break;
            }
        };
        ActyProxy.prototype.acty_lv_change = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            this.acty_data.level = gproxy.user_lv;
            this.facade.sendNotification(mx.MX_NOTICE.NEW_TISHI_MSG);
            this.fresh_week_act({ "act_id": 1, "jindu": gproxy.user_lv });
        };
        ActyProxy.prototype.acty_pay_change = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            this.acty_data.total_pay = gproxy.total_pay;
            this.acty_data.pay_daily = gproxy.daily_pay;
            this.yongjiu_pay = gproxy.user_payall;
            this.facade.sendNotification(mx.MX_NOTICE.NEW_TISHI_MSG);
            this.facade.sendNotification(mx.MX_NOTICE.UPDATE_ACTY); //刷新永久累充
            this.facade.sendNotification(mx.MX_NOTICE.FRESH_CAT); //刷新招财猫
        };
        ActyProxy.prototype.acty_use_change = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            this.acty_data.total_use = gproxy.total_use;
            this.facade.sendNotification(mx.MX_NOTICE.NEW_TISHI_MSG);
        };
        ActyProxy.prototype.init_acty_list = function (key_id, log) {
            if (key_id === void 0) { key_id = 0; }
            if (log === void 0) { log = null; }
            key_id = Number(key_id);
            var groups = this.init_acty_group(key_id);
            this.acty_list[(key_id + 1).toString()] = [];
            for (var i = 0; i < groups.length; i++) {
                var awards = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUODONG, 'type', key_id + 1, 'group', groups[i]);
                this.acty_list[(key_id + 1).toString()].push({
                    'type': key_id + 1,
                    'awards': awards,
                    'group': groups[i],
                    'log': log,
                    'open': this.judge_time(key_id + 1, "start", "end")
                });
            }
        };
        //其他开服活动领取奖励
        ActyProxy.prototype.acty_award_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hd008; //当前不在活动时间
                    break;
                /*
                case 1:
                    msg = Lang.hd009;
                    break;
                    */
                case 2:
                    msg = mx.Lang.err01;
                    break;
                /*
                case 3:
                    msg = Lang.hd010;
                    break;
                case 4:
                    msg = Lang.hd011;
                    break;*/
                case 5:
                    var list = this.acty_list[(Number(data.key_id) + 1)];
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var flags = gproxy.tishi_data.kf_act;
                    for (var i in list) {
                        if (list[i].log.indexOf(data.act_id) == -1) {
                            list[i].log.push(data.act_id);
                            switch (Number(data.key_id) + 1) {
                                case 2:
                                    flags.kf_level.push(data.act_id);
                                    break;
                                case 3:
                                    flags.kf_pay.push(data.act_id);
                                    break;
                                case 4:
                                    flags.kf_daily_pay.push(data.act_id);
                                    break;
                                case 5:
                                    flags.kf_use.push(data.act_id);
                                    break;
                            }
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
                    /*let gproxy : GameProxy = <GameProxy><any>this.facade.retrieveProxy(GameProxy.NAME);
                    let flags : any = gproxy.tishi_data.kf_act;
                    let typename : any = ['kf_level', 'kf_pay'];
                    let type : string = typename[Number(data.key_id) - 1];
                    if (!flags[type]) {
                        flags[type] = [];
                    }
                    flags[type].push(data.act_id);*/
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        ActyProxy.prototype.init_huyao_act = function (data) {
            this.yhu_res = data.res;
            this.fy_lq = [];
            this.fy_lq = data.lq;
            this.day2_lq = data.fenshen;
            this.daylast_lq = data.last;
        };
        ActyProxy.prototype.check_time_tick = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (gproxy.huyao) {
                var cd = data.delay;
                var cold = this.yhu_res;
                if (cd && typeof cold != "undefined" && cold != null) {
                    if (cold > 0) {
                        this.yhu_res -= cd;
                    }
                    else if (cold == 0) {
                        this.yhu_res = -1;
                        if (cold < 0) {
                            return;
                        }
                        if (mx.AppConfig.CURR_SCENE_ID == mx.YHJSScreen.S_NAME) {
                            this.huyao_final_award_type = 1;
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_HUYAO_FINAL_AWARD,
                                "type": 1 //最终
                            });
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_TIME, null, "hyjs");
                }
            }
        };
        ActyProxy.prototype.init_huyao_day_data = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hd026;
                    break;
                case 2:
                    msg = mx.Tools.format(mx.Lang.yhu002, this.fy_day);
                    break;
                case 3:
                    this.fy_data = [];
                    this.fy_data = data.data;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JCFYView.S_NAME, "param": this.fy_day });
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        ActyProxy.prototype.huyao_day_award = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.p0045;
                    break;
                case 2:
                    msg = mx.Lang.t0006;
                    break;
                case 3:
                    this.fy_lq.push(data.act_id);
                    var info = mx.ApiTool.getAPINode(mx.MX_APINAME.ACTHUYAOTASK, "id", data.act_id);
                    var tasks = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUYAOTASK, "type", info.type);
                    this.huyao_tishi[info.day][info.type] = false;
                    for (var j in tasks) {
                        var unit = tasks[j];
                        if (this.judge_hy_canshu(unit) && this.fy_lq.indexOf(unit.id + "") == -1) {
                            this.huyao_tishi[unit.day][unit.type] = true;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_YHJINDU);
                    this.sendNotification(mx.MX_NOTICE.FRESH_YHTASKLIST);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        ActyProxy.prototype.huyao_final_award = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1://已领取
                    //分身
                    if (this.huyao_final_award_type == 2) {
                        this.huyao_final_award_type = 0;
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HUYAO_DAY_DATA,
                            "kaiqi": this.fy_day
                        });
                        return;
                    }
                    else {
                        //最终奖励
                        msg = mx.Lang.p0014;
                    }
                    break;
                case 2:
                    msg = mx.Lang.yhu001;
                    break;
                case 3:
                    // let pproxy: PalaceProxy = <><any>(this.facade.retrieveProxy(PalaceProxy.NAME));
                    // if (data.feizi && pproxy.mn_d) {
                    //     if (pproxy.mn_d[data.feizi.id]) {
                    //         for (let i in data.feizi) {
                    //             pproxy.mn_d[data.feizi.id][i] = data.feizi[i];
                    //         }
                    //     }
                    //     else {
                    //         pproxy.add_new_fz(data.feizi);
                    //     }
                    // }
                    if (Number(data.type) == 1) {
                        this.daylast_lq = 1;
                        // this.sendNotification(MX_NOTICE.POP_VIEW, {
                        //     "name": AVGView.S_NAME,
                        //     "param": {
                        //         "type": "huyao",
                        //         "day": 6
                        //     }
                        // });
                        // let gameProxy = <GameProxy><any>(this.facade.retrieveProxy(GameProxy.NAME));
                        // gameProxy.huyao = 0;
                        // this.yhu_res = -1;
                        //this.sendNotification(MX_NOTICE.SCENE_CHANGE, MainScreen.S_NAME);
                    }
                    else if (Number(data.type) == 2) {
                        this.day2_lq = 1;
                        if (this.huyao_final_award_type == 2) {
                            this.yiwei_yaohu = true;
                            this.huyao_final_award_type = 0;
                            this.yaohu_shicong_id = data.id;
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_HUYAO_DAY_DATA,
                                "kaiqi": this.fy_day
                            });
                        }
                        //this.sendNotification(MX_NOTICE.YIWEI_YAOHU);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_YHJINDU);
                    break;
            }
            if (msg && mx.AppConfig.CURR_SCENE_ID != mx.WxActyScreen.S_NAME) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        ActyProxy.prototype.init_yongjiu_pay_list = function () {
            this.acty_list["997"] = [];
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.CHARGELEIJIAWARD);
            var type = -1;
            var awards = [];
            for (var i in api) {
                var ctype = api[i].baoxiang;
                if (ctype != type && type != -1) {
                    this.acty_list["997"].push({
                        'type': 997,
                        'awards': awards,
                        'group': awards[0].jindu,
                        'log': this.yongjiu_lq.indexOf(type + "") > -1,
                        'open': true,
                    });
                    awards = [];
                }
                if (api[i].award_type == 10) {
                    awards = [api[i]].concat(awards);
                }
                else {
                    awards.push(api[i]);
                }
                type = ctype;
            }
            this.acty_list["997"].push({
                'type': 997,
                'awards': awards,
                'group': awards[0].jindu,
                'log': this.yongjiu_lq.indexOf(type + "") > -1,
                'open': true,
            });
        };
        ActyProxy.prototype.yongjiu_pay_info = function (data) {
            this.yongjiu_pay = Number(data.total);
            this.yongjiu_lq = data.lq;
            this.init_yongjiu_pay_list();
        };
        ActyProxy.prototype.yongjiu_pay_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.gz0002;
                    break;
                case 2:
                    str = mx.Lang.hd026;
                    break;
                case 3://成功
                    this.yongjiu_lq.push("" + data.act_id);
                    this.init_yongjiu_pay_list();
                    this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
                    str = mx.Lang.p0016;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.last_pay_info = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0://成功
                    this.last_pay_award = data.award.split('|');
                    this.last_time = { "start": data.starttime, "end": data.endtime };
                    this.five_flag = Number(data.five);
                    break;
                case 1://不在活动时间
                    str = mx.Lang.p0013;
            }
        };
        ActyProxy.prototype.last_pay_box = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0://成功
                    this.last_pay_award[Number(data.id) - 1] = 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
                case 1://不在活动时间
                    str = mx.Lang.p0013;
                    break;
                case 2://参数错误
                    str = mx.Lang.err01;
                    break;
                case 3://奖励已领取
                    str = mx.Lang.qf0009;
                    break;
                case 4://无法领取
                    str = mx.Lang.hd026;
                    break;
            }
            if (str != '' && mx.AppConfig.CURR_SCENE_ID != mx.WxActyScreen.S_NAME) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.init_cat = function (data) {
            var str;
            switch (data.state) {
                case 0://不在活动时间
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    this.cat_try_count = Number(data.count);
                    this.cat_record = data.log;
                    //为使聚宝次数增加，当前VIP等级所需的变化情况
                    if (!this.cat_vip.length) {
                        var apis = mx.ApiTool.getAPI(mx.MX_APINAME.CATVIP);
                        var vip = apis.concat();
                        vip.reverse();
                        var id0 = 0;
                        var num0 = 0;
                        var last_id = 0;
                        var last_num = 0;
                        var tip_arr = [];
                        for (var k in vip) {
                            var api = vip[k];
                            if (api.num != last_num && last_num != 0) {
                                id0 = last_id;
                                num0 = last_num;
                                tip_arr.push(mx.Tools.format(mx.Lang.hd036, id0, num0));
                            }
                            if (id0) {
                                this.cat_vip[api.id] = id0;
                            }
                            last_id = api.id;
                            last_num = api.num;
                        }
                        tip_arr.push(mx.Tools.format(mx.Lang.hd036, 0, vip[vip.length - 1].num));
                        tip_arr.reverse();
                        for (var i in tip_arr) {
                            if (Number(i) < tip_arr.length - 1) {
                                this.cat_vip_tip += tip_arr[i] + "\n";
                            }
                            else {
                                this.cat_vip_tip += tip_arr[i];
                            }
                        }
                    }
                    if (data.type == "log") {
                        this.sendNotification(mx.MX_NOTICE.FRESH_CAT);
                    }
                    break;
            }
            if (data.type == "log" && str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.cat_input_cb = function (data) {
            var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    var cat_vip_max = this.cat_vip.length;
                    if (gproxy.user_vip < cat_vip_max) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                "param": mx.Tools.format(mx.Lang.hd034, gproxy.user_vip, this.cat_vip[gproxy.user_vip]),
                            }
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "param": mx.Lang.hd035,
                            }
                        });
                    }
                    break;
                case 2:
                    str = mx.Lang.jfs18;
                    break;
                case 3:
                    this.cat_try_count = data.count;
                    this.cat_record.reverse();
                    this.cat_record.shift();
                    this.cat_record.push({
                        "name": gproxy.user_name,
                        "num": data.awards[0].shuliang,
                    });
                    this.cat_record.reverse();
                    this.sendNotification(mx.MX_NOTICE.FRESH_CAT, "input");
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.init_leiji_sign_list = function () {
            this.acty_list["16"] = [];
            var leiji_api = mx.ApiTool.getAPI(mx.MX_APINAME.LEIJISIGNACT);
            var type = -1;
            var awards = [];
            for (var k in leiji_api) {
                var api = leiji_api[k];
                var ctype = api.act_id;
                var ob = void 0;
                switch (api.leixing) {
                    case 1:
                        if (ctype != type && type != -1) {
                            ob = {
                                'type': 16,
                                'awards': awards,
                                'group': awards[0].tianshu,
                                'log': this.leiji_sign_lq.indexOf(awards[0].act_id + "") > -1,
                                'open': this.judge_time(16, "start", "end"),
                            };
                            this.acty_list["16"].push(ob);
                            if (awards[0].tianshu == this.cur_leiji_sign && !ob.log) {
                                this.leiji_sign_award.push(awards);
                            }
                            else if (ob.log) {
                                this.single_sign_num++;
                            }
                            awards = [];
                        }
                        awards.push(api);
                        type = ctype;
                        this.leiji_sign_total = api.tianshu;
                        if (leiji_api[Number(k) + 1].leixing == 2) {
                            ob = {
                                'type': 16,
                                'awards': awards,
                                'group': awards[0].tianshu,
                                'log': this.leiji_sign_lq.indexOf(awards[0].act_id + "") > -1,
                                'open': this.judge_time(16, "start", "end"),
                            };
                            this.acty_list["16"].push(ob);
                            if (awards[0].tianshu == this.cur_leiji_sign && !ob.log) {
                                this.leiji_sign_award.push(awards);
                            }
                            else if (ob.log) {
                                this.single_sign_num++;
                            }
                            awards = [];
                        }
                        break;
                    case 2:
                        if (ctype != type && leiji_api[Number(k) - 1].leixing != 1) {
                            ob = {
                                'log': this.leiji_sign_lq.indexOf(awards[0].act_id + "") > -1,
                                'open': awards[0].tianshu <= this.single_sign_num //达到天数
                            };
                            if (ob.open && !ob.log) {
                                this.leiji_sign_award.push(awards);
                                this.baoxiang_log.push({ "awards": awards, "state": 1 }); //可领取
                            }
                            else if (!ob.open) {
                                this.baoxiang_log.push({ "awards": awards, "state": 0 }); //不符条件
                            }
                            else {
                                this.baoxiang_log.push({ "awards": awards, "state": 2 }); //领取过
                            }
                            awards = [];
                        }
                        awards.push(api);
                        type = ctype;
                        if (Number(k) == leiji_api.length - 1) {
                            ob = {
                                'log': this.leiji_sign_lq.indexOf(awards[0].act_id + "") > -1,
                                'open': awards[0].tianshu <= this.single_sign_num //达到天数
                            };
                            if (ob.open && !ob.log) {
                                this.leiji_sign_award.push(awards);
                                this.baoxiang_log.push({ "awards": awards, "state": 1 }); //可领取
                            }
                            else if (!ob.open) {
                                this.baoxiang_log.push({ "awards": awards, "state": 0 }); //不符条件
                            }
                            else {
                                this.baoxiang_log.push({ "awards": awards, "state": 2 }); //领取过
                            }
                            awards = [];
                        }
                        break;
                }
            }
        };
        ActyProxy.prototype.init_leiji_sign = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    if (!this.baoxiang_log.length) {
                        this.leiji_sign_lq = data.data;
                        this.cur_leiji_sign = Math.ceil((new Date().getTime() / 1000 - this.acty_time[16].start) / 86400);
                        this.init_leiji_sign_list();
                    }
                    break;
            }
            if (0 && str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.leiji_sign_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    str = mx.Lang.hd006;
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
                case 3:
                    str = mx.Lang.hd026;
                    break;
                case 4:
                    var arr = [];
                    for (var i in this.leiji_sign_award) {
                        var api = this.leiji_sign_award[i][0];
                        if (api.act_id == data.act_id) {
                            this.leiji_sign_lq.push(data.act_id);
                            if (api.leixing == 2) {
                                for (var j in this.baoxiang_log) {
                                    if (this.baoxiang_log[j].awards[0].act_id == data.act_id) {
                                        this.baoxiang_log[j].state = 2;
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var k in this.acty_list["16"]) {
                                    var render = this.acty_list["16"][k];
                                    if (render.group == api.tianshu) {
                                        render.log = true;
                                        break;
                                    }
                                }
                                this.single_sign_num++;
                                for (var j in this.baoxiang_log) {
                                    if (this.baoxiang_log[j].awards[0].tianshu == this.single_sign_num) {
                                        this.baoxiang_log[j].state = 1;
                                        arr.push(this.baoxiang_log[j].awards);
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            arr.push(this.leiji_sign_award[i]);
                        }
                    }
                    this.leiji_sign_award = [];
                    this.leiji_sign_award = arr;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        Object.defineProperty(ActyProxy.prototype, "lixian_data", {
            get: function () {
                return this._lixian_data;
            },
            enumerable: true,
            configurable: true
        });
        ActyProxy.prototype.init_lixian_data = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0:
                    //奖励已过期
                    //str = Lang.hs0030;
                    this.lixian_lq = false;
                    this.lixian_view = 0;
                    this._lixian_data = {};
                    break;
                case 1:
                    this._lixian_data = {};
                    var time = Number(data.res);
                    this.check_lixian_ts(time, data.lq);
                    if (this.lixian_view == 1) {
                        this._lixian_data['lq'] = data.lq;
                        this._lixian_data['res'] = time;
                        this._lixian_data['awards'] = data.awards;
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LixianView.S_NAME });
                    }
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.check_lixian_ts = function (time, lq_arr) {
            this.lixian_lq = false;
            var new_day = 1;
            if (time < 259200 && time >= 172800) {
                new_day = 1;
            }
            else if (time < 172800 && time >= 86400) {
                new_day = 2;
            }
            else if (time < 86400) {
                new_day = 3;
            }
            for (var i = 0; i < new_day; ++i) {
                if (Number(lq_arr[i]) == 0) {
                    this.lixian_lq = true;
                    break;
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
        };
        ActyProxy.prototype.init_lixian_lq = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0:
                    //奖励已过期
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    str = mx.Lang.qf0009;
                    break;
                case 2:
                    this._lixian_data['lq'] = data.lq;
                    this.check_lixian_ts(this._lixian_data.res, data.lq);
                    this.sendNotification(mx.MX_NOTICE.FRESH_LIXIAN_LQ);
                    break;
                case 3:
                    str = mx.Tools.format(mx.Lang.hs0030, data.day);
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.init_baihuashop = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    this.acty_goumai = data.goumai.split("|");
                    this.acty_shop_id = Number(data.act_id);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActybaihuaShopAlert.S_NAME });
                    return;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.bhhd040;
                    break;
                case 3:
                    str = mx.Lang.err01;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.baihuashop_buy = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    this.acty_goumai[Number(data.id) - 1]++;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
                case 3:
                    str = mx.Lang.bhhd047;
                    break;
                case 4:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 5:
                    str = mx.Lang.p0017;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.get_acty_hero = function () {
            if (this.acty_hero_flag) {
                return;
            }
            var hproxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
            if (hproxy.get_hero_by_mid(57)) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CEFENG_WEIFEN,
                    "mid": 57,
                    "weifen": 13,
                    "tab": 1,
                    "type": 1
                });
            }
            else {
                var a_d = {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": {
                        "t": mx.MX_NETS.CS_CHERO_LHSDH,
                        "mid": 57,
                    },
                    "param": mx.Tools.format(mx.Lang.h0056, 200000),
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AlertView.S_NAME,
                    "param": a_d,
                });
            }
        };
        ActyProxy.prototype.init_xxg_xxiu = function (data) {
            this.xxg_xxiu_info = data.data;
            this.xxg_xxiu_tab = Number(data.type);
            this.xxg_temp_time = Math.floor(new Date().getTime() / 1000);
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ActyXXGXXiuScreen.S_NAME);
        };
        ActyProxy.prototype.xxg_lqjl_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://
                    str = mx.Lang.p0013;
                    break;
                case 1://
                    str = mx.Lang.xxg16;
                    break;
                case 2://
                    str = mx.Lang.xxg17;
                    break;
                case 3://
                    str = mx.Lang.hd009;
                    break;
                case 4://
                    for (var k in this.xxg_xxiu_info) {
                        if (this.xxg_xxiu_info[k].zinv_id == data.zinv_id) {
                            this.xxg_xxiu_info[k].state = 1;
                            if (Number(this.xxg_xxiu_info[k].cd) <= 0 && this.xxg_xxiu_tab != 3) {
                                this.xxg_xxiu_info.splice(k, 1);
                            }
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.xxg_qccd_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://
                    str = mx.Lang.p0013;
                    break;
                case 1://
                    str = mx.Lang.xxg16;
                    break;
                case 2://
                    str = mx.Lang.jjc02;
                    break;
                case 3://
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 4://
                    for (var k in this.xxg_xxiu_info) {
                        if (this.xxg_xxiu_info[k].zinv_id == data.zinv_id) {
                            this.xxg_xxiu_info[k].cd = 0;
                            if (Number(this.xxg_xxiu_info[k].state) == 1) {
                                this.xxg_xxiu_info.splice(k, 1);
                            }
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.xxg_xxiu_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://
                    str = mx.Lang.p0013;
                    break;
                case 1://
                    str = mx.Lang.err01;
                    break;
                case 2://
                    str = mx.Lang.xxg01;
                    break;
                case 3://
                    str = mx.Lang.xxg01;
                    break;
                case 4://
                    str = mx.Lang.xxg02;
                    break;
                case 5://
                    str = mx.Lang.hs0009;
                    break;
                case 6://
                    str = mx.Lang.hs0010;
                    break;
                case 7://
                    str = mx.Lang.xxg03;
                    break;
                case 8://
                    str = mx.Lang.xxg04;
                    break;
                case 9://
                    str = mx.Lang.xxg05;
                    break;
                case 10://
                    str = mx.Lang.xxg06;
                    break;
                case 11://
                    str = mx.Lang.err01;
                    break;
                case 12://
                    var d = {
                        "zinv_id": data.zinv_id,
                        "name": (this.xxg_zi_tempdata.xing || "") + this.xxg_zi_tempdata.name,
                        "meili": this.xxg_zi_tempdata.meili,
                        "avatar": this.xxg_zi_tempdata.avatar,
                        "xingge": this.xxg_zi_tempdata.xingge,
                        "xihao": this.xxg_zi_tempdata.xihao,
                        "sex": this.xxg_zi_tempdata.sex,
                        "result": Number(data.up.result),
                        "state": this.xxg_xxiu_tab == 3 ? data.up.state : Number(data.up.result) - 1,
                        "cd": Number(data.cd) || 0,
                    };
                    var type = void 0, yuanyin = void 0;
                    var xihao = this.xxg_zi_tempdata.xihao;
                    if (this.xxg_xxiu_tab == 1) {
                        this.xxg_xxiu_info.push(d);
                    }
                    else {
                        for (var k in this.xxg_xxiu_info) {
                            if (this.xxg_xxiu_info[k].zinv_id == d.zinv_id) {
                                this.xxg_xxiu_info[k] = d;
                                break;
                            }
                        }
                    }
                    if ((Number(data.up.result) == 1 && this.xxg_xxiu_tab != 3) || (this.xxg_xxiu_tab == 3 && Number(data.up.result) >= 60)) {
                        switch (this.xxg_xxiu_tab) {
                            case 1:
                                type = "cxtg";
                                break;
                            case 2:
                                type = "fxcg";
                                break;
                            case 3:
                                type = "dxcg";
                                break;
                        }
                    }
                    else {
                        switch (this.xxg_xxiu_tab) {
                            case 1:
                                if (Number(d.meili) < 60 && Number(this.xxg_zi_tempdata.shengri) < Number(this.acty_time[19].start)) {
                                    type = "cxycyl";
                                }
                                else if (Number(d.meili) >= 60) {
                                    type = "cxzdl";
                                }
                                else {
                                    type = "cxdml";
                                }
                                break;
                            case 2:
                                if (Number(d.meili) < 70 && Number(this.xxg_zi_tempdata.guanxi) < 50) {
                                    type = "fxycyx";
                                }
                                else if (Number(d.meili) >= 70) {
                                    type = "fxgxd";
                                }
                                else {
                                    type = "fxdml";
                                }
                                break;
                            case 3:
                                type = "fxsb";
                                yuanyin = data.yuanyin;
                                break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": type,
                            "yuanyin": yuanyin,
                            "xihao": xihao,
                            "cd": this.xxg_zi_tempdata,
                        }
                    });
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 13://
                    str = mx.Lang.xxg07;
                    break;
                case 14:
                    str = mx.Lang.xxg21;
                    break;
                case 15:
                    str = mx.Lang.xxg22;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.init_cz_loop = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.p0013;
                    this.cz_loop_data = {};
                    break;
                case 1:
                    this.cz_loop_data = {};
                    this.cz_loop_data['pay'] = data.pay;
                    this.cz_loop_data['lq'] = data.lq;
                    this.cz_loop_data['time'] = data.time;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShouChongLoopAlert.S_NAME });
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.lq_loop_box = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0://不在活动时间内
                    str = mx.Lang.p0013;
                    break;
                case 1://key_id参数错误
                    str = mx.Lang.err01;
                    break;
                case 2://该奖励已领取
                    str = mx.Lang.qf0009;
                    break;
                case 3://充值天数不足
                    str = mx.Lang.cz001;
                    break;
                case 4://充值金额不足
                    str = mx.Lang.cz002;
                    break;
                case 5:
                    this.cz_loop_data['lq'].push(Number(data.key_id));
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.set_liandan_baoxiang = function () {
            this.liandan_baoxiang_log = [];
            this.liandan_award = [];
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.ACTLIANDANAWARD);
            var type = -1;
            var awards = [];
            for (var k in apis) {
                var api = apis[k];
                var ctype = api.baoxiang;
                var ob = void 0;
                if (ctype != type && type != -1) {
                    ob = {
                        'log': Number(this.liandan_lq[awards[0].baoxiang - 1]),
                        'open': this.liandan_shuliandu >= awards[0].jindu //达到熟练度
                    };
                    if (ob.open && !ob.log) {
                        this.liandan_award.push(awards);
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 1, "type": "liandan" }); //可领取
                    }
                    else if (!ob.open) {
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 0, "type": "liandan" }); //不符条件
                    }
                    else {
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 2, "type": "liandan" }); //领取过
                    }
                    awards = [];
                }
                awards.push(api);
                type = ctype;
                if (Number(k) == apis.length - 1) {
                    ob = {
                        'log': Number(this.liandan_lq[awards[0].baoxiang - 1]),
                        'open': this.liandan_shuliandu >= awards[0].jindu //达到熟练度
                    };
                    if (ob.open && !ob.log) {
                        this.liandan_award.push(awards);
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 1, "type": "liandan" }); //可领取
                    }
                    else if (!ob.open) {
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 0, "type": "liandan" }); //不符条件
                    }
                    else {
                        this.liandan_baoxiang_log.push({ "awards": awards, "state": 2, "type": "liandan" }); //领取过
                    }
                    awards = [];
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_YHJINDU);
        };
        ActyProxy.prototype.init_liandan = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    if (this.liandan_baoxiang_log.length) {
                        return;
                    }
                    this.liandan_shuliandu = Number(data.data.shu);
                    this.liandan_lq = data.data.box.split('|');
                    this.set_liandan_baoxiang();
                    break;
                case 1:
                    str = mx.Lang.p0013;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.liandan_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Tools.format(mx.Lang.hd056, Number(data.shuliandu) - this.liandan_shuliandu);
                    this.liandan_shuliandu = Number(data.shuliandu);
                    this.set_liandan_baoxiang();
                    var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
                    for (var i = 1; i <= 3; i++) {
                        var id = data.cailiao["cailiao" + i + "_id"];
                        var num = data.cailiao["cailiao" + i + "_num"];
                        if (id) {
                            pProxy.set_item_num(id, num);
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST); //清空配方
                    this.sendNotification(mx.MX_NOTICE.FRESH_YHJINDU); //刷新进度
                    break;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
                case 3:
                    str = mx.Lang.hd051;
                    break;
                case 4:
                    str = mx.Lang.hd052;
                    break;
                case 5:
                    str = mx.Lang.hd053;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.liandan_award_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    this.liandan_lq[Number(data.id) - 1] = 1;
                    this.set_liandan_baoxiang();
                    this.sendNotification(mx.MX_NOTICE.FRESH_YHJINDU); //刷新进度
                    break;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
                case 3:
                    str = mx.Lang.hd053;
                    break;
                case 4:
                    str = mx.Lang.hd009;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.fresh_week_act_list = function () {
            this.acty_list["22"] = [];
            var lq = []; //可领取
            var arr = []; //未达成
            var log = []; //已完成
            for (var i in this.week_act_data) {
                for (var j in this.week_act_data[i]) {
                    var award = this.week_act_data[i][j];
                    switch (award.lq) {
                        case 0:
                            arr.push(award);
                            break;
                        case 1:
                            lq.push(award);
                            break;
                        case 2:
                            log.push(award);
                            break;
                    }
                }
            }
            this.acty_list["22"] = lq.concat(arr.concat(log));
        };
        ActyProxy.prototype.format_awards = function (rewards) {
            var res = [];
            rewards = rewards.split("|");
            for (var i in rewards) {
                var reward = rewards[i];
                var type = reward.split(":")[0];
                var id_num = reward.split(":")[1];
                var id = id_num.split("*")[0];
                var num = id_num.split("*")[1];
                res.push({
                    "award_type": type,
                    "item_id": id,
                    "num": num,
                });
            }
            return res;
        };
        ActyProxy.prototype.init_week_act = function (data) {
            switch (data.state) {
                case 0://不在活动时间
                    this.week_act_state = 0;
                    break;
                case 1://等级不够
                    this.week_act_state = -1;
                    break;
                case 2:
                    this.week_act_state = 1;
                    break;
            }
            if (!this.week_act_data) {
                this.week_act_data = [];
                this.week_act_id2type = [];
                //整理活动数据表
                var apis = mx.ApiTool.getAPI(mx.MX_APINAME.WEEKLYACT);
                var type = 0;
                var group = [];
                for (var i in apis) {
                    var api = apis[i];
                    if (api.released) {
                        this.week_act_id2type[api.id] = api.type; //记录id到type的映射
                        if (api.type != type && type != 0) {
                            this.week_act_data[type] = group;
                            group = [];
                        }
                        //数据格式
                        api.act_id = api.type;
                        api.type = 22;
                        if (api.act_id == 1) {
                            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                            api.cond = gproxy.user_lv;
                        }
                        else {
                            api.cond = 0; //进度默认0
                        }
                        api.awards = this.format_awards(api.reward);
                        api.lq = 0; //0：不可领取；1：可领取；2：已领取
                        api.open = !!this.week_act_state;
                        group[api.id] = api;
                        type = api.act_id;
                    }
                }
                //收尾
                this.week_act_data[type] = group;
            }
            if (data.data) {
                for (var j in data.data) {
                    var d = data.data[j];
                    var id = d.id;
                    var type = this.week_act_id2type[id];
                    var award = this.week_act_data[type][id];
                    award.cond = Number(d.cond);
                    award.lq = Number(d.lq);
                }
            }
            this.fresh_week_act_list();
        };
        ActyProxy.prototype.week_act_lq = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.hd008;
                    break;
                case 1:
                    str = mx.Lang.h0077;
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
                case 3:
                    str = mx.Lang.p0021;
                    break;
                case 4:
                    str = mx.Lang.qf0009;
                    break;
                case 5:
                    str = mx.Lang.hd026;
                    break;
                case 6:
                    var id = data.act_id;
                    var type = this.week_act_id2type[id];
                    this.week_act_data[type][id].lq = 2;
                    this.fresh_week_act_list();
                    this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        ActyProxy.prototype.fresh_week_act = function (data) {
            if (this.week_act_state == 0) {
                return;
            }
            var act_id = data.act_id;
            var jindu = data.jindu;
            var add = data.add;
            if (act_id) {
                var acts = this.week_act_data[act_id];
                if (acts) {
                    for (var j in acts) {
                        if (add) {
                            acts[j].cond += add;
                        }
                        else {
                            acts[j].cond = jindu;
                        }
                        if (acts[j].cond >= acts[j].finish_cond && acts[j].lq == 0) {
                            acts[j].lq = 1;
                        }
                    }
                }
            }
            else {
                var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                for (var i in this.week_act_data) {
                    for (var j in this.week_act_data[i]) {
                        var act = this.week_act_data[i][j];
                        if (act.vip && jindu == act.vip) {
                            if (act.cond - act.finish_cond >= 0) {
                                act.lq = 1;
                            }
                            else {
                                act.lq = 0;
                            }
                        }
                    }
                }
            }
            this.fresh_week_act_list();
            if (data.fresh) {
                this.sendNotification(mx.MX_NOTICE.UPDATE_ACTY);
            }
            if (act_id == 14) {
                data.act_id = 13;
                this.fresh_week_act(data);
            }
        };
        ActyProxy.prototype.init_ws = function (data) {
            if (data.state) {
                this.wsb_num = Number(data.wus_num);
                this.ws_duihuan = data.duihuan;
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyWSMainAlert.S_NAME });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0013 });
            }
        };
        ActyProxy.prototype.ws_buy_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2:
                    this.wsb_num = Number(data.wus_num);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    var p_d2 = {
                        "name": mx.XXiuResAlert.S_NAME,
                        "param": {
                            "items": data.awards,
                            "type": data.awards.length == 1 ? 7 : 8,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.ws_duihuan_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    str = mx.Lang.err01;
                    break;
                case 2:
                    str = mx.Lang.p0147;
                    break;
                case 3:
                    str = mx.Lang.p0146;
                    break;
                case 4:
                    this.ws_duihuan[data.id] = Number(data.cishu);
                    this.wsb_num = Number(data.wus_num);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ActyWSDHAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.init_cygg = function (data) {
            if (data.state) {
                this.free_cygg = 3 - Number(data.free_num);
                this.res_cygg = Number(data.fanpai_total_num);
                this.ybi_cygg = Number(data.num);
            }
        };
        ActyProxy.prototype.cygg_buy_cb = function (data) {
            var str = "";
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1://免费购买成功
                    this.free_cygg--;
                case 5://消耗银币购买成功
                    this.res_cygg++;
                    if (data.state == 5) {
                        this.ybi_cygg++;
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyCYGGAwardAlert.S_NAME });
                    return;
                case 2://今日购买次数用完
                    str = mx.Lang.cygg006;
                    break;
                case 3://次数用完，提示提高vip等级
                    gproxy.vip_data = {
                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                        "sdata_ok": {
                            "name": mx.ActyCYGGMainAlert.S_NAME,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_VIP_LIBAOSTATE },
                            "param": mx.Tools.format(mx.Lang.cygg007, gproxy.user_vip),
                            "ok_b": "ckviptq_png",
                            "btn_n": 1
                        }
                    });
                    return;
                case 4://没有免费购买机会，使用金币购买，金币不足
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.cygg_cj_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0013;
                    break;
                case 1:
                    str = mx.Lang.cygg008;
                    break;
                case 2:
                    this.cygg_award_arr = data.awards;
                    this.cygg_award = data.id || 1;
                    this.res_cygg--;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ActyProxy.prototype.init_huyao_ts = function (data) {
            if (Number(data.state) == 1) {
                //任务详情 等级 侍从 竞技场 掠夺 服装 
                var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                this.huyao_tishi = {};
                this.huyao_param = data.data;
                for (var i = 1; i < 14; ++i) {
                    var tasks = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUYAOTASK, "type", i);
                    for (var j in tasks) {
                        var unit = tasks[j];
                        if (!this.huyao_tishi[unit.day]) {
                            this.huyao_tishi[unit.day] = {};
                        }
                        if (this.judge_hy_canshu(unit) && this.fy_lq.indexOf(unit.id + "") == -1 && gproxy.huyao >= Number(unit.day)) {
                            this.huyao_tishi[unit.day][unit.type] = true;
                            break;
                        }
                    }
                }
            }
            else {
                this.huyao_tishi = null;
            }
        };
        Object.defineProperty(ActyProxy.prototype, "hy_huodong_ts", {
            get: function () {
                var ts = { 'ts': false, 'ts_day': 0, 'ts_type': 0 };
                for (var i in this.huyao_tishi) {
                    if (this.huyao_tishi[i]) {
                        for (var j in this.huyao_tishi[i]) {
                            if (this.huyao_tishi[i][j]) {
                                ts = { 'ts': true, 'ts_day': Number(i), 'ts_type': Number(j) };
                                break;
                            }
                        }
                    }
                }
                ts.lq = (this.fy_lq.length == 100);
                return ts;
            },
            enumerable: true,
            configurable: true
        });
        ActyProxy.prototype.get_hy_huodong_ts_day = function (day) {
            if (this.huyao_tishi[day]) {
                for (var j in this.huyao_tishi[day]) {
                    if (this.huyao_tishi[day][j]) {
                        return true;
                    }
                }
            }
            return false;
        };
        ActyProxy.prototype.get_hy_complete = function (ziduan, param) {
            var tasks = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUYAOTASK, ziduan, param);
            for (var i in tasks) {
                if (this.fy_lq.indexOf(tasks[i]) == -1) {
                    return false;
                }
            }
            return true;
        };
        ActyProxy.prototype.get_hy_huodong_ts_type = function (type) {
            for (var i in this.huyao_tishi) {
                if (this.huyao_tishi[i]) {
                    if (this.huyao_tishi[i][type]) {
                        return true;
                    }
                }
            }
            return false;
        };
        ActyProxy.prototype.get_cur_hycanshu = function (data) {
            var num;
            var hproxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
            var canshu = (data.canshu + "").split('|');
            var param = this.huyao_param;
            switch (Number(data.type)) {
                case 1:
                    num = gproxy.user_lv;
                    break;
                case 2:
                    //cur_pt_stage
                    num = Number(param.stage1) || 0;
                    break;
                case 3:
                    //cur_jy_stage
                    num = Number(param.stage2) || 0;
                    break;
                case 4:
                    num = hproxy.get_hero_num_by_type("quality", canshu[1]) || 0;
                    break;
                case 5:
                    num = hproxy.get_hero_num_by_type("star", canshu[1]) || 0;
                    break;
                case 6:
                    num = pproxy.get_fznum_by_type("weifen", canshu[1]) || 0;
                    break;
                case 7:
                    var meili = Number(canshu[1]);
                    if (meili == 60) {
                        num = param.rank_1 || 0;
                    }
                    else if (meili == 70) {
                        num = param.rank_2 || 0;
                    }
                    else if (meili == 80) {
                        num = param.rank_3 || 0;
                    }
                    else if (meili == 90) {
                        num = param.rank_4 || 0;
                    }
                    break;
                case 8:
                    num = Number(param.enke) || 0;
                    break;
                case 9:
                    num = Number(param.tiaoxi) || 0;
                    break;
                case 10:
                    num = Number(param.paiming) || 0;
                    break;
                case 11:
                    num = Number(param.challenge) || 0;
                    break;
                case 12:
                    num = Number(param.lueduo) || 0;
                    break;
                case 13:
                    num = Number(param.shps) || 0;
                    break;
            }
            return num;
        };
        ActyProxy.prototype.judge_hy_canshu = function (data) {
            var canshu = (data.canshu + "").split('|');
            var cur_canshu = this.get_cur_hycanshu(data);
            switch (Number(data.type)) {
                case 1:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 11:
                case 12:
                case 13:
                    return cur_canshu >= canshu[0];
                case 2:
                case 3:
                    return cur_canshu >= canshu[1];
                case 10:
                    return cur_canshu == 0 ? false : (cur_canshu <= canshu[0]);
            }
        };
        ActyProxy.prototype.init_zlcb_rank = function (data) {
            this.zlcb_info = null;
            if (Number(data.state) == 0) {
                this.zlcb_info = data;
            }
            this.sendNotification(mx.MX_NOTICE.ZLCB_RANK_FRESH);
        };
        ActyProxy.NAME = "ActyProxy";
        return ActyProxy;
    }(puremvc.Proxy));
    mx.ActyProxy = ActyProxy;
    __reflect(ActyProxy.prototype, "mx.ActyProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyProxy.js.map
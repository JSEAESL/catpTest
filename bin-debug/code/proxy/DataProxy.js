/**
*   @author mx
*   @date 2015.2.25
*   @desc 游戏货币，道具数据管理
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
    var DataProxy = (function (_super) {
        __extends(DataProxy, _super);
        function DataProxy() {
            var _this = _super.call(this, DataProxy.NAME) || this;
            _this.shihe_flag = true; //从体力食盒取出体力不需询问
            _this.lvup_info = [];
            _this.kaiqi = [];
            _this._new_stage = 0;
            _this.jijin = {
                "298": '15',
                "398": '20',
                "498": '30',
                "598": '45',
                "698": '60',
                "798": '70',
                "998": '80',
            };
            _this.shijian_type = 0;
            _this.jujue = false;
            _this.ybnli_info = []; //
            _this.miyou_info = {};
            _this.ybnli_pop = false;
            _this.ybnl_hongdian = false;
            return _this;
        }
        DataProxy.prototype.set_sc_time = function (timestr) {
            var now = Math.round(new Date().getTime() / 1000);
            var sc_time = timestr - now;
            if (typeof this._sc_time != "undefined") {
                if (Math.abs(this._sc_time - sc_time) > 16) {
                    this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Lang.timeerror1
                        }
                    }); //致命弹窗提示，每次
                }
            }
            else if (Math.abs(sc_time) > 16) {
                this.facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.timeerror }); //非致命，飘字提示，仅一次
            }
            this._sc_time = sc_time;
        };
        DataProxy.prototype.set_currency = function (type, num, add) {
            num = Number(num);
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (type) {
                case "ybao"://元宝
                    this.ud_dia = num;
                    break;
                case "tili"://体力
                    this.ud_tili = num;
                    if (add && this.ud_tili > (60 + gProxy.user_lv) && this.shihe_flag && mx.AppConfig.CURR_SCENE_ID != mx.FriendScreen.S_NAME) {
                        var fangru_num = Math.min(add, this.ud_tili - (60 + gProxy.user_lv));
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_FANGRU_SHIHE, "num": fangru_num },
                                "param": mx.Lang.p0130,
                            }
                        });
                    }
                    this.shihe_flag = true;
                    break;
                case "ybi":
                    if (typeof (this.ud_coin) != "undefined") {
                        var delta = this.ud_coin - num;
                        if (delta > 0) {
                            this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 10, "add": delta });
                        }
                    }
                    this.ud_coin = num;
                    break;
                case "uexp":
                    this.ud_uexp = num;
                    break;
                case "zjb":
                    this.ud_zjb = num;
                    mx.DataTool.getInstance().set_QQ_Score(2, num);
                    break;
                default:
                    console.log("no currency id of : " + type);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.CURRENCY_CHANGED, num, type);
            if (add) {
                this.sendNotification(mx.MX_NOTICE.CURRENCY_ADDED, num, type);
            }
        };
        DataProxy.prototype.exp_up = function (data) {
            if (data.level) {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                if (this.lvup_info.length) {
                    this.lvup_info[0].newlv = Number(data.level);
                    this.lvup_info[0].newtl = Number(data.tili);
                }
                else {
                    this.lvup_info.push({
                        "oldlv": gproxy.user_lv,
                        "newlv": Number(data.level),
                        "oldtl": this.ud_tili,
                        "newtl": data.tili
                    });
                }
                this.set_currency("tili", data.tili);
                gproxy.user_lv = Number(data.level);
                this.sendNotification(mx.MX_NOTICE.USER_LV_CHANGE); //等级变化
                mx.DataTool.getInstance().set_dl_info(mx.MX_DL_CONST.DL_IT_LEVEL, gproxy.user_lv);
                this.check_lv_tishi();
                mx.DataTool.getInstance().set_QQ_Score(1, data.level);
            }
            this.set_currency("uexp", data.exp, data.num);
            mx.DataTool.getInstance().set_QQ_Score(4, data.exp);
        };
        DataProxy.prototype.check_lv_tishi = function () {
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var tproxy = (this.facade.retrieveProxy(mx.TempleProxy.NAME));
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            //主线任务等级任务检查
            var maintask = gproxy.main_task_info;
            for (var k in maintask) {
                var task = maintask[k];
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", k);
                if (Number(api.step2_type) == 2) {
                    if (Number(gproxy.user_lv) >= Number(api.finish_parameter)) {
                        task.state = 1;
                    }
                    break;
                }
            }
            //剧情小红点,升级是检查level，如果有新章节开启，flag置为true
            var info = this.lvup_info[this.lvup_info.length - 1];
            var level = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", info.newlv);
            if (Number(level.Chapter)) {
                gproxy.juqing_flag = 1;
            }
            //太庙可以祭拜或者考核,用于内部显示
            var tflag = false;
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.TAIMIAO);
            if (Number(gproxy.user_xlv) < apis.length && Number(gproxy.user_xlv) < 12) {
                var need_lv = Number(apis[Number(gproxy.user_xlv)].limit);
                if (need_lv <= Number(gproxy.user_lv)) {
                    tflag = true; //有可以进行的考核
                }
            }
            tproxy.temple_flag = tflag || tproxy.can_jibai || pproxy.tujian_tishi;
            this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
        };
        DataProxy.prototype.check_lv_up = function (mode) {
            if (mode === void 0) { mode = null; }
            if (this.lvup_info && this.lvup_info.length) {
                var info = this.lvup_info.shift();
                for (var i = info.oldlv + 1; i <= info.newlv; i++) {
                    var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.OPEN, "type", 2, "param", i);
                    for (var k in api) {
                        this.kaiqi.push(api[k].id);
                    }
                }
                this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                if (Number(info.oldlv) < Number(info.newlv)) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.UserLVUpAlert.S_NAME,
                        "param": { "info": info, "mode": mode }
                    });
                }
                else {
                    if (mode == 'fight') {
                        //有后续剧情
                        this.sendNotification(mx.MX_NOTICE.SHOW_ALERT);
                    }
                }
            }
            else {
                if (mode == 'fight') {
                    //有后续剧情
                    this.sendNotification(mx.MX_NOTICE.SHOW_ALERT);
                }
                this.sendNotification(mx.MX_NOTICE.CHECK_NEWMODULAR);
            }
        };
        DataProxy.prototype.get_currency = function (type) {
            switch (type) {
                case "ybao"://元宝
                    return this.ud_dia || 0;
                case "tili"://体力
                    return this.ud_tili || 0;
                case "ybi":
                    return this.ud_coin || 0;
                case "uexp":
                    return this.ud_uexp || 0;
                case "zjb":
                    return this.ud_zjb || 0;
                default:
                    console.log("no currency id of : " + type);
                    break;
            }
        };
        DataProxy.prototype.ud_reward_cb = function (data) {
            var arr = [];
            var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            var cawards = data.awards;
            if (!cawards.length) {
                cawards = [cawards];
            }
            for (var k in cawards) {
                var item = cawards[k];
                if (Number(item.type) == 4) {
                    arr.push({
                        "item_id": item.id,
                        "num": item.shuliang
                    });
                }
                if (Number(item.id) == 2033) {
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    lproxy.lueduo += Number(item.shuliang);
                    this.sendNotification(mx.MX_NOTICE.LLD_NUM_CHANGED);
                }
            }
            pproxy.add_item(arr);
            if (data.type == "add") {
                return;
            }
            if (data.type == "weizi") {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                gproxy.wenzi_award.awards = data.awards;
                return;
            }
            this.ud_reward = data.awards;
            this.xq_reward = mx.FightTools.arr_clone(data.awards);
            if (data.type != "wait") {
                this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
            }
        };
        DataProxy.prototype.get_xq_reward = function () {
            return this.xq_reward;
        };
        DataProxy.prototype.get_preward = function () {
            if (!this.ud_reward || !this.ud_reward.length) {
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PRewardAlert.S_NAME);
                var n_d = this.n_d;
                if (n_d) {
                    this.sendNotification(n_d.notice, n_d.sdata);
                    this.n_d = null;
                }
                // let pproxy = <PalaceProxy><any>(this.facade.retrieveProxy(PalaceProxy.NAME));
                // let spt = AppConfig.check_not_support("share");
                // if (pproxy.wb_share_chufa && !spt) {
                // 	pproxy.wb_share_chufa = false;
                // 	this.sendNotification(MX_NOTICE.POP_VIEW, {
                // 		"name": ShareShijianView.S_NAME
                // 	});
                // }
                return;
            }
            if (typeof this.ud_reward.length == "undefined") {
                this.ud_reward = [this.ud_reward];
            }
            var ln = Math.min(mx.MX_COMMON.MX_ARARD_NUM, this.ud_reward.length);
            var arr = this.ud_reward.splice(0, ln);
            this.cur_reward = arr;
            this.sendNotification(mx.MX_NOTICE.GET_AWARD);
        };
        DataProxy.prototype.check_preward = function (data) {
            this.set_close_PRA_nd(data);
            if (!this.ud_reward || !this.ud_reward.length) {
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PRewardAlert.S_NAME);
            }
            else {
                if (typeof this.ud_reward.length == "undefined") {
                    this.ud_reward = [this.ud_reward];
                }
                var ln = Math.min(mx.MX_COMMON.MX_ARARD_NUM, this.ud_reward.length);
                var arr = this.ud_reward.splice(0, ln);
                this.cur_reward = arr;
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.PRewardAlert.S_NAME });
            }
        };
        DataProxy.prototype.set_close_PRA_nd = function (data) {
            if (data) {
                this.n_d = data;
            }
        };
        DataProxy.prototype.check_currency_info = function (ctype) {
            if (ctype === void 0) { ctype = "tili"; }
            this.c_info_type = ctype;
            if (!this.tili_d) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_BUY_INFO });
            }
            else {
                this.show_buy_alert();
            }
        };
        //VIP等级变化后，体力够买上限，银币购买上限刷新（下次打开界面是刷线）
        DataProxy.prototype.reset_vip_dproxy = function () {
            this.tili_d = this.djs_d = null;
        };
        DataProxy.prototype.init_buy_info = function (data) {
            this.tili_d = data.tili_res;
            this.djs_d = data.seliver_res;
            this.show_buy_alert();
        };
        DataProxy.prototype.show_buy_alert = function () {
            switch (this.c_info_type) {
                case "tili"://体力
                    this.show_buy_tili();
                    break;
                case "ybi"://银币12级以上可以购买
                    var proxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var lv = proxy.user_lv;
                    if (lv >= 12) {
                        var p_d = { "name": mx.DJSView.S_NAME };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0093 });
                    }
                    break;
            }
        };
        DataProxy.prototype.show_buy_tili = function () {
            var t_d = this.tili_d;
            if (!t_d.res) {
                var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                if (gproxy.user_vip < 15) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                            "param": mx.Lang.p0119,
                        }
                    });
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Lang.p0012,
                        }
                    });
                }
                return;
            }
            var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.TILIPRICE, "id", Number(t_d.buy) + 1);
            var a_d = {
                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                "sdata_ok": { "t": mx.MX_NETS.CS_BUY_TILI, "num": 1 },
                "param": {
                    "res_n": t_d.res,
                    "max_n": t_d.total,
                    "item": "tili",
                    "price": Number(temp.jiage),
                }
            };
            var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        DataProxy.prototype.buy_tili_cb = function (data) {
            var str;
            switch (data.state) {
                case 1://成功
                    str = mx.Lang.p0053;
                    this.tili_d = data.tili_res;
                    this.sendNotification(mx.MX_NOTICE.BUY_NUM_FRESH, data.tili_res);
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 15, "add": data.num, "fresh": true });
                    break;
                case 2://沒有足夠的元宝
                    str = mx.Lang.p0008;
                    break;
                case 0://购买已达次数上限
                    str = mx.Lang.p0012;
                    break;
                case 3://购买体力溢出，不能购买。
                    str = mx.Lang.p00120;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.buy_djs_cb = function (data) {
            var str;
            switch (data.state) {
                case 1://成功
                    this.djs_d = data.server_res;
                    this.sendNotification(mx.MX_NOTICE.FRESH_DJS, data.log);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 15 });
                    return;
                case 2://沒有足夠的元宝
                    str = mx.Lang.p0008;
                    break;
                case 0://购买已达上限
                    str = mx.Lang.p0012;
                    break;
                case 3:
                    str = mx.Lang.p0097;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.set_hero_share_exp = function (data) {
            this._hero_share_exp = [];
            this._hero_share_exp = data.data;
            var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            if (this._hero_share_exp.length) {
                for (var k in this._hero_share_exp) {
                    var data_1 = this._hero_share_exp[k];
                    if (hproxy.heroes[data_1.id]) {
                        hproxy.heroes[data_1.id].exp = data_1.exp;
                        if (Number(hproxy.heroes[data_1.id].level) < Number(data_1.level)) {
                            hproxy.heroes[data_1.id].level = data_1.level;
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH });
                        }
                    }
                }
            }
        };
        Object.defineProperty(DataProxy.prototype, "hero_share_exp", {
            get: function () {
                return this._hero_share_exp;
            },
            enumerable: true,
            configurable: true
        });
        DataProxy.prototype.set_new_stage = function (new_stage) {
            var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
            if (new_stage) {
                this._new_stage = parseInt(new_stage.stage);
                fproxy.set_stage_list(new_stage);
            }
        };
        Object.defineProperty(DataProxy.prototype, "new_stage", {
            get: function () {
                return this._new_stage;
            },
            enumerable: true,
            configurable: true
        });
        DataProxy.prototype.sys_message = function (data) {
            mx.WebTool.getInstance().web_msg(data, mx.MX_WEB_CONST.MX_WEB_CT_SYS);
        };
        DataProxy.prototype.init_chat_zinv = function (data) {
            if (data.data.length) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.ChatLyznView.S_NAME,
                    "param": data.data
                });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kj05 });
            }
        };
        DataProxy.prototype.init_kanjia_cb = function (data) {
            var str;
            /*
            0  该孩子不在和亲状态
            1  单独给别人的和亲，不能砍价
            2   pinli参数错误（选了相等或更高）
            3  自己的孩子不能下聘
            4 礼盒不足
            5  成功
            6  已经砍价
            7  当前结缘已过时
            8  事件不存在*/
            var cproxy = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
            var cd = cproxy.chat_lyzn_data;
            switch (Number(data.state)) {
                case 0://该孩子不在和亲状态
                    str = mx.Lang.kj08;
                    break;
                case 1://指定结缘，不能砍价哦
                    str = mx.Lang.kj09;
                    break;
                case 2://pinli参数错误（选了相等或更高）
                    str = mx.Lang.kj010;
                    break;
                case 3://自己的孩子不能下聘
                    str = mx.Lang.kj011;
                    break;
                case 4://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 5://成功
                    var pinli = Number(data.pinli_id);
                    var rid = Math.floor(Math.random() * 4) + 1;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", pinli);
                    str = mx.Tools.format(mx.Lang["kj0" + rid], cd.user_name, api.name, cd.other.hname);
                    var obj = {
                        "kjia_id": data.id,
                        "type": "lyin_kjia",
                        "user_name": cd.user_name,
                        "fz_name": cd.other.hname,
                        'zinv_id': data.zinv_id,
                        "pinli": Number(data.pinli_id),
                        "meili": cd.other.meili
                    };
                    var arr2 = [];
                    for (var k in obj) {
                        arr2.push(obj[k]);
                    }
                    mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_YIN, arr2);
                    str = mx.Lang.kj07;
                    //消耗
                    var paproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    var id = void 0, num = void 0;
                    for (var i in data.pinli) {
                        id = i;
                        num = data.pinli[i];
                    }
                    paproxy.set_item_num(id, num);
                    if (this.sjian_ly_info) {
                        var cd_1 = this.sjian_ly_info;
                        var param1 = cd_1.name;
                        var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", cd_1.pinli);
                        var param2 = api_1.name;
                        var a_d2_1 = {
                            "notice_ok": mx.MX_NOTICE.SHOW_AWARD,
                            "param": mx.Tools.format(mx.Lang.sjian018, param1, param2),
                            "btn_n": 1
                        };
                        var p_d_1 = { "name": mx.AlertView.S_NAME, "param": a_d2_1 };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d_1);
                        //删除消息
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        for (var i in pproxy.sjian_info.data) {
                            var unit = pproxy.sjian_info.data[i];
                            if (unit.id == this.sjian_ly_info.id) {
                                pproxy.sjian_info.data.splice(i, 1);
                                break;
                            }
                        }
                        this.sendNotification(mx.MX_NOTICE.UPDATE_SJIAN_LYIN);
                        return;
                    }
                    break;
                case 6://已经砍价
                    str = mx.Lang.kj013;
                    break;
                case 7://当前结缘已过时
                    str = mx.Lang.kj022;
                    break;
                case 8://事件不存在
                    str = mx.Lang.sjian015;
                    break;
                case 9://不是自己服务器的不能砍价
                    str = mx.Lang.cxg021;
                    break;
                case 10:
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    str = Number(gproxy.user_vip) < mx.MX_COMMON.MAX_VIP_LV ? mx.Lang.p0142 : mx.Lang.p0143;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.kanjia_jujue_cb = function (data) {
            var str;
            /*
            0 参数错误
            1  已被拒绝
            2  已经同意
            3  砍价的孩子不是自己皇子所的，无权拒绝
            4  成功*/
            var cproxy = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
            var cd = cproxy.kanjia_lyzn_data;
            switch (Number(data.state)) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://已被拒绝
                    str = mx.Lang.kj014;
                    break;
                case 2://已经同意
                    str = mx.Lang.kj015;
                    break;
                case 3://砍价的孩子不是自己皇子所的，无权拒绝
                    str = mx.Lang.kj016;
                    break;
                case 4:
                    //拒绝对方，该消息的同意拒绝按钮都灰色显示，点击飘字提示
                    var arr = cproxy.get_web_type_msg(mx.MX_WEB_CONST.MX_WEB_CT_YIN, 0);
                    for (var i in arr) {
                        var msg = arr[i];
                        if (msg.other && msg.other.type == 'lyin_kjia' && cd.other.zinv_id == msg.other.zinv_id && cd.user_name == msg.user_name) {
                            msg.other.shixiao = -1;
                        }
                    }
                    str = mx.Lang.kj017;
                    this.sendNotification(mx.MX_NOTICE.CHAT_LIANYIN_FRESH, null, mx.MX_WEB_CONST.MX_WEB_CT_YIN);
                    break;
                case 5:
                    str = mx.Lang.kj023;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.kanjia_agree_cb = function (data) {
            var str;
            /*
            State
            0 参数错误
            1  已被拒绝
            2  已经同意
            3  砍价的孩子不是自己皇子所的，无权同意
            4  孩子已出嫁
            5   用户已取消和亲
            6  成功
            7  对方已取消出价*/
            var cproxy = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
            var cd = cproxy.kanjia_lyzn_data;
            switch (Number(data.state)) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://已被拒绝
                    str = mx.Lang.kj014;
                    break;
                case 2://已经同意
                    str = mx.Lang.kj015;
                    break;
                case 3://砍价的孩子不是自己皇子所的，无权同意
                    str = mx.Lang.kj018;
                    break;
                case 4://孩子已出嫁
                    str = mx.Lang.kj019;
                    break;
                case 5://用户已取消和亲
                    str = mx.Lang.kj020;
                    break;
                case 6:
                    var arr = cproxy.get_web_type_msg(mx.MX_WEB_CONST.MX_WEB_CT_YIN, 0);
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                        "user_id": data.feizi.user_id,
                        "feizi": data.feizi,
                        "sltype": mx.MX_WEB_CONST.WEB_PRI_ADD_FZ,
                    });
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': data.feizi.user_id,
                        "mtype": 3,
                        "str": mx.Lang.wblyhz
                    });
                    //按对方礼盒出价达成结缘，弹出获得礼盒弹窗，该消息的同意拒绝按钮都灰色显示，点击飘字提示
                    for (var i in arr) {
                        var other = arr[i].other;
                        if (other && other.type == 'lyin_kjia' && cd.other.user_name == gproxy.user_name && cd.other.zinv_id == other.zinv_id) {
                            if (cd.user_id == arr[i].user_id) {
                                arr[i].other.shixiao = 1;
                            }
                            else {
                                arr[i].other.shixiao = -1;
                            }
                        }
                    }
                    str = mx.Lang.kj021;
                    this.sendNotification(mx.MX_NOTICE.CHAT_LIANYIN_FRESH, null, mx.MX_WEB_CONST.MX_WEB_CT_YIN);
                    break;
                case 7:
                    str = mx.Lang.kj023;
                    break;
                case 8:
                    str = mx.Lang.p0144;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.shijian_ly_deal_cb = function (data) {
            var str = null;
            var cd = this.sjian_ly_info;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (cd) {
                switch (Number(cd.msg_id)) {
                    case 3:
                        if (this.jujue) {
                            str = mx.Lang.cxg019;
                        }
                        break;
                    case 5://删除消息并接收“世界结缘被下聘娶走”的事件，弹窗提示已同意该砍价并拒绝了其他女王的砍价
                        //添加妃子
                        if (typeof data.feizi != 'undefined') {
                            mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                                "user_id": data.feizi.user_id,
                                "feizi": data.feizi,
                                "sltype": mx.MX_WEB_CONST.WEB_PRI_ADD_FZ,
                            });
                            //玩吧消息
                            this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                                'uid': data.feizi.user_id,
                                "mtype": 3,
                                "str": mx.Lang.wblyhz
                            });
                            str = mx.Lang.kj021;
                        }
                        if (this.jujue) {
                            str = mx.Lang.kj017;
                        }
                        break;
                    case 7:
                        var cproxy = (this.facade.retrieveProxy(mx.CXGongProxy.NAME));
                        if (cproxy.re_kanjia) {
                            cproxy.re_kanjia = false;
                            this.n_d = {
                                "notice": mx.MX_NOTICE.POP_VIEW,
                                "sdata": {
                                    "name": mx.AVGView.S_NAME,
                                    "param": {
                                        "type": "sj_ly_yingqin",
                                        "sj_id": cd.id,
                                        "mid": Number(cd.zinv_id) + 1000,
                                        "avatar": cd.avatar,
                                        "name": cd.name,
                                        "re_kanjia": true,
                                        "cd": cd
                                    }
                                }
                            };
                        }
                        break;
                    default:
                        //str = Lang.sjian014;
                        break;
                }
            }
            else {
                cd = data;
            }
            //删除消息
            for (var i in pproxy.sjian_info.data) {
                var unit = pproxy.sjian_info.data[i];
                if (unit.id == cd.id) {
                    pproxy.sjian_info.data.splice(i, 1);
                    break;
                }
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_SJIAN_LYIN);
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        DataProxy.prototype.init_ybnli_info = function (data) {
            this.ybnli_info = [];
            this.ybnli_info = data.data;
            this.ybnli_type = "";
            this.ybnli_page = Number(data.page);
            this.ybnli_cztotal = Number(data.total);
            this.total_dang_id = data.total_dang_id;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.YQTHAlert.S_NAME,
            });
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            // for (let i in data.data) {
            // 	let unit = data.data[i];
            // 	if (Number(unit.new) > 0) {
            // 		gproxy.yb_biaoji.arr[1] = 1;
            // 		break;
            // 	}
            // }
            if (gproxy.yb_biaoji && gproxy.yb_biaoji.arr) {
                gproxy.yb_biaoji.arr[1] = 0;
            }
            if (typeof data.nuli_total == 'undefined') {
                data.nuli_total = 1;
            }
            this.ybnli_total = Math.ceil(Number(data.nuli_total) / 20) || 1;
            this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
        };
        DataProxy.prototype.init_share_fz = function (data) {
            this.share_fz_info = [];
            this.share_fz_info = data;
        };
        DataProxy.prototype.init_ybnl_yqjl = function (data) {
            this.ybnlyqjl_info = [];
            this.ybnlyqjl_info = data.data;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            gproxy.yb_biaoji.arr[0] = data.red;
            if (!this.ybnli_pop) {
                if (window && window["getBosomFriends"]) {
                    window["getBosomFriends"]();
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.YbxnliView.S_NAME,
                    });
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
            }
        };
        DataProxy.prototype.init_ybnl_hongdian = function (data) {
            this.ybnl_hongdian = Number(data.red) == 1;
        };
        DataProxy.prototype.init_ybnl_jllq = function (data) {
            var str;
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (Number(data.state)) {
                case 0://今日已经没有剩余次数
                    str = mx.Lang.fx007;
                    break;
                case 1://cd没到
                    str = mx.Lang.fx008;
                    break;
                case 2://分享奖励领取成功（减次数，加cd客户端默认修改？或加传返回）
                    gProxy.yb_biaoji.nuli[0] = Number(gProxy.yb_biaoji.nuli[0]) + 1;
                    gProxy.yb_biaoji.nuli[1] = 90 * 60;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 3://没有这个奴隶
                    str = mx.Lang.fx009;
                    break;
                case 4://这个奴隶已经领取过奖励
                    str = mx.Lang.fx010;
                    break;
                case 5://只能领取前40个奴隶的奖励哦
                    str = mx.Lang.fx011;
                    break;
                case 6:
                    var flag = false;
                    for (var i in this.ybnlyqjl_info) {
                        var unit = this.ybnlyqjl_info[i];
                        if (unit.to_id == data.to_id) {
                            this.ybnlyqjl_info[i].lq = 2;
                        }
                        if (Number(unit.lq) == 1) {
                            flag = true;
                        }
                    }
                    gProxy.yb_biaoji.arr[0] = flag ? 1 : 0;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                default:
                    str = mx.Lang.err01;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.prototype.init_shihe = function (data) {
            this.shihe_res = Number(data.res);
            this.shihe_max = Number(data.max);
            this.shihe_tili = Number(data.tili);
            this.sendNotification(mx.MX_NOTICE.FRESH_SHIHE);
        };
        DataProxy.prototype.quchu_shihe = function (data) {
            if (data.state) {
                this.shihe_res = Number(data.res);
                this.shihe_max = Number(data.max);
                var quchu = this.shihe_tili - Number(data.tili);
                this.shihe_tili = Number(data.tili);
                this.sendNotification(mx.MX_NOTICE.FRESH_SHIHE, "quchu");
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.p0134, quchu) });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0132 });
            }
        };
        DataProxy.prototype.fangru_shihe = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0051;
                    break;
                case 1:
                    str = mx.Lang.p0133;
                    break;
                case 2:
                    this.shihe_res = Number(data.res);
                    this.shihe_max = Number(data.max);
                    this.shihe_tili = Number(data.tili);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        DataProxy.NAME = "DataProxy";
        return DataProxy;
    }(puremvc.Proxy));
    mx.DataProxy = DataProxy;
    __reflect(DataProxy.prototype, "mx.DataProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DataProxy.js.map
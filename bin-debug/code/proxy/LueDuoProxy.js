/**
*   @author mx wf
*   @date 2015.2.25
*   @desc 掠夺相关数据管理
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
    var LueDuoProxy = (function (_super) {
        __extends(LueDuoProxy, _super);
        function LueDuoProxy() {
            var _this = _super.call(this, LueDuoProxy.NAME) || this;
            _this._isLD = false;
            _this.ldd_price_data = [50, 80, 120, 150, 200]; //掠夺点价格
            _this.lueduo_flag = false;
            _this.qfg_list = [];
            _this.qfg_page = 0;
            _this.lueduo_target = {};
            _this.qiuyuan_target = 0;
            _this.ldlist1 = {}; //陌生人列表，不分页
            _this.ldlist2 = {}; //仇人列表，分页
            _this.ldlist3 = {}; //被掠夺记录
            _this.ldpage1 = 1;
            _this.ldpage2 = 1;
            _this.ldpage3 = 1;
            _this.ldtot1 = 0;
            _this.ldtot2 = 0;
            _this.ldtot3 = 0;
            _this.ld_type = 0;
            _this.ldxq_flag = false;
            _this.ss_data = {};
            _this.ss_page = 1;
            _this.ss_tot = 0;
            _this.qf_add = 0;
            return _this;
        }
        LueDuoProxy.prototype.setLD = function (b) {
            this._isLD = b;
        };
        Object.defineProperty(LueDuoProxy.prototype, "isLD", {
            get: function () {
                return this._isLD;
            },
            enumerable: true,
            configurable: true
        });
        LueDuoProxy.prototype.init_ld_mine = function (data) {
            if (Number(data.state)) {
                this._isLD = true;
                this.fangyu = data.fangyu;
                this.lueduo = data.lueduo;
                this.xiuyang = Number(data.xiuyang);
                this.avatar = data.avatar;
                this.avatar_time = data.avatar_time;
                this.baohu = Number(data.baohu);
                this.bgsg = Number(data.jinji);
                this.bhl_num = data.bhl_num;
                var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                pProxy.set_item_num(2012, this.bhl_num);
                this.guoku = data.guoku;
                this.fl_data = data.data;
                this.zinv_num = Number(data.z_num) + Number(data.f_num); //进掠夺有可能没有拿到后宫数据
                this.user_battle = data.user_battle; //当前防守队列
                var hproxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
                hproxy.teams[12] = [];
                for (var i in this.user_battle) {
                    if (i != 'zhanwei') {
                        hproxy.teams[12].push(i);
                    }
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kq001 });
            }
        };
        LueDuoProxy.prototype.ld_fight_checkhg = function (data) {
            this.fl_data = data.data;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.res_hzs = data.hz_kongwei;
        };
        LueDuoProxy.prototype.check_fl = function () {
            if (this.fl_data && this.fl_data.length) {
                var p_d = void 0;
                var notice = void 0;
                var data = this.fl_data.pop();
                if (Number(data.type) == -1) {
                    notice = mx.MX_NOTICE.SHOW_AWARD;
                    p_d = {};
                }
                else if (Number(data.type) == 2 || Number(data.type) == 4) {
                    this.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': data });
                    notice = mx.MX_NOTICE.POP_VIEW;
                    p_d = {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "user": { "name": data.b_lueduo_name },
                            "type": "ldzn",
                            "res": Number(data.type),
                            "info": data
                        }
                    };
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': data });
                    notice = mx.MX_NOTICE.POP_VIEW;
                    p_d = {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "user": { "name": data.b_lueduo_name },
                            "type": "ld",
                            "res": Number(data.type),
                            "info": data
                        }
                    };
                    var id = Number(data.mid);
                    this.fl = {
                        "id": id,
                        "res": Number(data.type)
                    };
                }
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else if (mx.AppConfig.CURR_SCENE_ID == mx.CXGongFzScreen.S_NAME) {
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
            }
        };
        LueDuoProxy.prototype.ld_use_bhl = function (data) {
            switch (data.state) {
                case 0://保护令不足
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld004 });
                    break;
                case 1://使用成功
                    this.baohu = Number(data.baohu);
                    this.bhl_num = Math.max(this.bhl_num - 1, 0);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2012, this.bhl_num);
                    break;
                case 2://小于地阶五品
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld097 });
                    break;
            }
        };
        LueDuoProxy.prototype.bgsg_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://成功
                    var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var tProxy = (this.facade.retrieveProxy(mx.TempleProxy.NAME));
                    tProxy.user_xlv_max = gProxy.user_xlv;
                    gProxy.user_xlv = 8;
                    this.sendNotification(mx.MX_NOTICE.FRESH_BHL_STATE); //其实是刷新 掠夺状态
                    str = mx.Lang.xq030;
                    break;
                case 1://未到地阶五品
                    str = mx.Lang.ld094;
                    break;
                case 2://近期进行过帝品晋级操作
                    str = mx.Lang.ld095;
                    break;
                case 3://没有使用保护令
                    str = mx.Lang.ld100;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.init_ld_other = function (data) {
            data.page1 = 1;
            for (var i = 1; i <= 3; i++) {
                if (data['list' + i]) {
                    this['ldpage' + i] = Number(data['page' + i]);
                    this['ldlist' + i][data['page' + i]] = data['list' + i];
                }
                if (data['tot' + i]) {
                    this['ldtot' + i] = Number(data['tot' + i]);
                }
            }
            this.fight_time = Math.floor(new Date().getTime() / 1000);
            this.sendNotification(mx.MX_NOTICE.FRESH_LUEDUO_LIST);
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherScreen.S_NAME);
        };
        LueDuoProxy.prototype.set_cur_user = function (data) {
            this.cur_ld_user = data;
        };
        LueDuoProxy.prototype.get_cur_user = function () {
            var mn = this.cur_ld_user;
            return mn;
        };
        LueDuoProxy.prototype.init_other_zinv = function (data) {
            this.c_other_zn_total = Number(data.tot);
            if (Number(data.tot)) {
                this.c_other_zn = data.zinv;
                this.c_other_zn_page = data.page;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherZNScreen.S_NAME);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld043 });
            }
        };
        LueDuoProxy.prototype.ld_qinjia_cb = function (data) {
            this.qingjia = data.friend;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LDQJAlert.S_NAME, "param": this.qingjia });
        };
        LueDuoProxy.prototype.ld_xiangq_cb = function (data) {
            this.ldxq_flag = true;
            this.ldxq = data.data;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LDXQAlert.S_NAME, "param": data.data });
        };
        LueDuoProxy.prototype.ld_trxq_cb = function (data) {
            switch (data.state) {
                case 0://参数错误
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
                    break;
                case 1://没有开启掠夺
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld034 });
                    break;
                case 2://成功
                    var target = void 0;
                    var now_time = Math.floor(new Date().getTime() / 1000);
                    var arr = this["ldlist" + (this.ld_type + 1)][this["ldpage" + (this.ld_type + 1)]];
                    for (var k in arr) {
                        if (arr[k].user_id == this.cur_ld_user.user_id) {
                            target = arr[k];
                            target.baohu = data.data.baohu;
                            target.fangyu = data.data.fangyu;
                            target.guoku = data.data.guoku;
                            target.xiuyang = data.data.xiuyang;
                            target.guishu.name = data.data.guishu.name;
                            target.guishu.time = Number(data.data.guishu.time) + (now_time - this.fight_time); //render里计算再减去
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_LUEDUO_LIST);
                    this.lueduo_target = data.data;
                    if (mx.AppConfig.CURR_SCENE_ID == mx.ChatScreen.S_NAME && now_time <= data.data.xiuyang) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld092 });
                        return;
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LDDRAlert.S_NAME, "param": data });
                    break;
            }
        };
        LueDuoProxy.prototype.ld_qjyzh_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不存在该掠夺记录
                    str = mx.Lang.ld005;
                    break;
                case 1://亲家和掠夺自己的是同一个人
                    str = mx.Lang.ld006;
                    break;
                case 2://已复仇
                    str = mx.Lang.ld007;
                    break;
                case 3://不存在亲家关系
                    str = mx.Lang.ld008;
                    break;
                case 4://亲家今日已经援助过自己
                    str = mx.Lang.ld009;
                    break;
                case 5://显示战斗
                    this.lueduo -= 20;
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    var obj = {
                        "user_info": data.qingjia,
                        "enemy": data.enemy
                    };
                    fproxy.init_jfs_fight(obj);
                    this.sendNotification(mx.MX_NOTICE.LLD_NUM_CHANGED);
                    for (var k in this.qingjia) {
                        if (this.qingjia[k].user_id == this.qingjia_id) {
                            this.qingjia[k].yuanzhu = 1;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.LDQJAlert.S_NAME);
                    break;
                case 6://自己掠夺点数不足
                    str = mx.Lang.ld031;
                    break;
                case 7://修养生息时间内，不能被复仇
                    str = mx.Lang.ld060;
                    break;
                case 8://没有子女，山河破碎，不能被复仇
                    str = mx.Lang.ld032;
                    break;
                case 9://二代妃子数量不足，山河破碎，不能被复仇
                    str = mx.Lang.ld033;
                    break;
                case 10://太庙等级差距过大
                    str = mx.Lang.ld067;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        LueDuoProxy.prototype.ld_chzhfl_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://该俘虏已处理
                    str = mx.Lang.ld010;
                    break;
                case 2://处置成功
                    var type = void 0;
                    var notice_exit = mx.MX_NOTICE.CS_GET_DATA;
                    var sdata_exit = {
                        't': mx.MX_NETS.CS_LUEDUO_OTHER,
                        'type': this.ld_type + 1,
                        'page': this["ldpage" + (this.ld_type + 1)]
                    };
                    if (mx.AppConfig.PREV_SCENE_ID == mx.ChatScreen.S_NAME) {
                        notice_exit = mx.MX_NOTICE.SCENE_CHANGE;
                        sdata_exit = mx.ChatScreen.S_NAME;
                    }
                    switch (Number(data.type)) {
                        case 1:
                            type = 9;
                            break;
                        case 2:
                            type = 6;
                            notice_exit = mx.MX_NOTICE.SHOW_AWARD;
                            sdata_exit = "";
                            break;
                        case 4:
                            type = 8;
                            break;
                        case 3:
                            type = 7;
                            var spt = mx.AppConfig.check_not_support("share");
                            if (!spt) {
                                var pproxy_1 = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                                if (data.sj) {
                                    pproxy_1.wb_share_sj = data.sj;
                                }
                                else {
                                    pproxy_1.wb_share_sj = [];
                                    pproxy_1.wb_share_sj = null;
                                    pproxy_1.wb_share_chufa = false;
                                }
                            }
                            break;
                    }
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var fz = pproxy.cur_cxgfz.data;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": type,
                            "name": fz.name,
                            "notice_exit": notice_exit,
                            "sdata_exit": sdata_exit,
                        }
                    });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.ld_buy_ldd = function (data) {
            switch (data.state) {
                case 0://元宝不足
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0008 });
                    break;
                case 1://购买成功
                    this.lueduo = data.lueduo;
                    this.ldd_buy_num = data.buy_num;
                    this.sendNotification(mx.MX_NOTICE.LLD_NUM_CHANGED);
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld019 });
                    break;
            }
        };
        LueDuoProxy.prototype.ld_ssdr_cb = function (data) {
            if (data.data.length > 0) {
                //搜索成功
                if (data.page == 1) {
                    this.ss_data = {};
                }
                this.ss_page = Number(data.page);
                this.ss_tot = Number(data.total);
                if (!this.ss_data[data.page]) {
                    this.ss_data[data.page] = data.data;
                }
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LDSearchAlert.S_NAME, "param": data });
            }
            else {
                //没有查到玩家
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld011 });
            }
        };
        LueDuoProxy.prototype.init_ld_ldd = function (data) {
            this.ldd_res_time = data.res_time ? Math.floor(new Date().getTime() / 1000) + 600 - Number(data.res_time) : 0;
            this.ldd_buy_num = Number(data.buy_num) || 0;
            this.lueduo = Number(data.lueduo) || 0;
        };
        Object.defineProperty(LueDuoProxy.prototype, "ldd_price", {
            //掠夺点单价
            get: function () {
                var len = this.ldd_price_data.length;
                return this.ldd_price_data[Math.min(len - 1, this.ldd_buy_num)];
            },
            enumerable: true,
            configurable: true
        });
        LueDuoProxy.prototype.send_yuanzhu = function (data) {
            var uproxy = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            if (Number(uproxy.union_id)) {
                var uproxy_1 = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
                var now_time = Math.floor(new Date().getTime() / 1000);
                if (now_time < uproxy_1.union_chat_cd[1] + 300) {
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz206 });
                    return;
                }
                uproxy_1.union_chat_cd[1] = now_time;
                this.yuanzhu_target = data;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_LUEDUO_QUE,
                    "id": data.from_id
                });
                //发送请求获取防御队列
            }
            else {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AlertView.S_NAME, "param": {
                        "param": mx.Lang.jz201,
                        "btn_n": 1,
                        "ok_b": "jjgmtszdle_png"
                    } });
            }
        };
        LueDuoProxy.prototype.yuanzhu_info_cb = function (d) {
            var dress = d.dress;
            var data = d.data;
            var all_mid = d.all_mid;
            if (this.yuanzhu_target) {
                var uproxy = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
                var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                var d_1 = {
                    "name": this.yuanzhu_target.name,
                    "avatar": this.yuanzhu_target.avatar,
                    "level": this.yuanzhu_target.level,
                    "user_id": this.yuanzhu_target.from_id
                };
                var zli = 0;
                for (var j in data) {
                    if (j == "zhanwei") {
                        continue;
                    }
                    var obj = {};
                    var hero = data[j];
                    obj.equip = hero.equip;
                    obj.level = hero.hero_info.level;
                    obj.mid = hero.hero_info.did;
                    obj.quality = hero.hero_info.quality;
                    obj.star = hero.hero_info.star;
                    obj.skills = hero.skill_list;
                    for (var t in hero.battle_soul) {
                        if (typeof hero.battle_soul[t].level == "undefined") {
                            hero.battle_soul[t] = { "level": hero.battle_soul[t] };
                        }
                    }
                    obj.fy_skill = hero.battle_soul;
                    var nine_word = hero.nine_word || [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    zli += mx.FightTools.cal_fight_power(obj, null, dress, all_mid, nine_word);
                }
                var obj2 = {
                    "time": Math.floor(new Date().getTime() / 1000),
                    "type": "qiuyuan",
                    "union_id": uproxy.union_id,
                    "target_zhanli": zli,
                    "target": d_1
                };
                var arr = [];
                for (var k in obj2) {
                    arr.push(obj2[k]);
                }
                mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_FAM, arr);
                this.yuanzhu_target = null;
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz210 });
            }
        };
        LueDuoProxy.prototype.ld_fight_check = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://正在被其他人掠夺，无法战斗
                    str = mx.Lang.ld081;
                    break;
                case 2://归属权是其他人
                    str = mx.Lang.ld082;
                    this.sendNotification(mx.MX_NOTICE.LUEDUO_GUISHU, { "name": data.name, "time": data.time });
                    this._isLD = true;
                    var sdata = void 0;
                    if (this.fight_type == "help") {
                        sdata = {
                            "t": mx.MX_NETS.CS_LUEDUO_QJYZ,
                            "qj": this.qingjia_id,
                            "id": this.fuchou_id
                        };
                    }
                    else if (this.fight_type == "revenge") {
                        sdata = {
                            "t": mx.MX_NETS.CS_LUEDUO_FIGHT,
                            "id": data.id,
                            "fuchou": this.fuchou_id
                        };
                    }
                    else {
                        sdata = {
                            "t": mx.MX_NETS.CS_LUEDUO_FIGHT,
                            "id": data.id
                        };
                    }
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": sdata,
                        "param": mx.Tools.format(mx.Lang.ld082, data.name)
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 5, "add": 1 });
                    return;
                case 3://
                    this._isLD = true;
                    if (this.fight_type == "help") {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_QJYZ,
                            "qj": this.qingjia_id,
                            "id": this.fuchou_id
                        });
                    }
                    else if (this.fight_type == "revenge") {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_FIGHT,
                            "id": data.id,
                            "fuchou": this.fuchou_id
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_FIGHT,
                            "id": data.id
                        });
                    }
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 5, "add": 1 });
                    return;
                case 4://玩家修养生息，不能被战斗
                    str = mx.Lang.ld002;
                    break;
                case 5://是自己不能获取战斗数据开始战斗
                    str = mx.Lang.ld035;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.init_ld_fight = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误，玩家不存在或者掠夺未开启
                    str = mx.Lang.err01;
                    break;
                case 1://玩家修养生息时间内，不能被掠夺
                    str = mx.Lang.ld029;
                    break;
                case 2://没有子女，山河破碎
                    str = mx.Lang.ld032;
                    break;
                case 3://二代妃子数量不足3，山河破碎
                    str = mx.Lang.ld033;
                    break;
                case 4://自己掠夺点数不足
                    str = mx.Lang.ld031;
                    break;
                case 5://参数错误，战斗数据错误
                    str = mx.Lang.err01;
                    break;
                case 6://获取成功
                    this.lueduo -= 20;
                    if (this.lueduo < 100 && this.lueduo >= 80) {
                        this.ldd_res_time = Math.floor(new Date().getTime() / 1000) + 600;
                    }
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    var obj = {
                        "user_info": data.self_data,
                        "enemy": data.data,
                        "xianpin": data.xianpin
                    };
                    fproxy.init_jfs_fight(obj);
                    this.sendNotification(mx.MX_NOTICE.LLD_NUM_CHANGED);
                    return;
                case 7://玩家没有开启掠夺
                    str = mx.Lang.ld034;
                    break;
                case 8://掠夺自己
                    str = mx.Lang.ld035;
                    break;
                case 9://复仇记录已复仇
                    str = mx.Lang.ld007;
                    break;
                case 10://太庙等级差距过大
                    str = mx.Lang.ld067;
                    break;
                case 11://正在被其他玩家掠夺
                    str = mx.Lang.ld081;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.ld_fight_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0: //参数错误
                case 1://参数错误，没有战斗开始记录
                    str = data.state == 0 ? mx.Lang.err01 : mx.Lang.jjc26;
                    mx.Combat.skip_fighter = true;
                    mx.Combat.clear_fight_info();
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    break;
                case 2://
                    var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var fd = fproxy.get_curr_tx_friend();
                    var pass = data.sl == 'succ';
                    var name_1 = "";
                    var target = void 0;
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': this.cur_ld_user.user_id,
                        "mtype": 3,
                        "str": mx.Lang.wbld
                    });
                    var arr = this["ldlist" + (this.ld_type + 1)][this["ldpage" + (this.ld_type + 1)]];
                    for (var k in arr) {
                        if (arr[k].user_id == this.cur_ld_user.user_id && data.b_user) {
                            var now_time = Math.floor(new Date().getTime() / 1000);
                            target = arr[k];
                            target.baohu = data.b_user.baohu;
                            target.fangyu = data.b_user.fangyu;
                            target.guoku = data.b_user.guoku;
                            target.shijian = data.b_user.shijian;
                            target.xiuyang = data.b_user.xiuyang;
                            target.guishu = data.b_user.guishu;
                            target.guishu.time = Number(target.guishu.time) + (now_time - this.fight_time); //render里计算再减去
                            name_1 = target.name;
                            break;
                        }
                    }
                    if (!target) {
                        target = data.b_user;
                    }
                    var notice = void 0;
                    var p_d = void 0;
                    var qinmi = 10;
                    if (!pass) {
                        notice = "";
                        p_d = {};
                        qinmi = 0;
                        if (this.fight_type == "revenge" || this.fight_type == "help") {
                            notice = mx.MX_NOTICE.CS_GET_DATA;
                            p_d = {
                                "t": mx.MX_NETS.CS_LUEDUO_OTHER,
                                'type': this.ld_type + 1,
                                'page': this["ldpage" + (this.ld_type + 1)]
                            };
                        }
                    }
                    else if (Number(data.zhyj) && Number(data.type) == -1) {
                        var str3 = void 0;
                        if (Number(target.baohu) > Math.floor(new Date().getTime() / 1000)) {
                            str3 = mx.Tools.format(mx.Lang.ld090, name_1);
                        }
                        else if (!Number(data.guishu.flag)) {
                            str3 = mx.Tools.format(mx.Lang.ld084, data.guishu.name, name_1);
                        }
                        else {
                            str3 = mx.Tools.format(mx.Lang.ld085, name_1);
                        }
                        notice = mx.MX_NOTICE.POP_VIEW;
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": { "param": mx.Tools.setKeywordColor2(str3, [mx.Tools.num2color(200), mx.Tools.num2color(200)]) }
                        };
                    }
                    else if (Number(data.type) == -1) {
                        notice = mx.MX_NOTICE.SHOW_AWARD;
                        p_d = {};
                    }
                    else if (!Number(data.guishu.flag)) {
                        var str2 = mx.Tools.format(mx.Lang.ld083, data.guishu.name, name_1);
                        notice = mx.MX_NOTICE.POP_VIEW;
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": { "param": mx.Tools.setKeywordColor2(str2, [mx.Tools.num2color(200), mx.Tools.num2color(200)]) }
                        };
                    }
                    else if (Number(data.type) == 2 || Number(data.type) == 4) {
                        qinmi = 100;
                        data.info.ldjl_id = data.ldjl_id;
                        this.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': data.info });
                        notice = mx.MX_NOTICE.POP_VIEW;
                        p_d = {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "user": this.cur_ld_user,
                                "type": "ldzn",
                                "res": Number(data.type),
                                "info": data.info
                            }
                        };
                    }
                    else {
                        qinmi = 100;
                        data.info.ldjl_id = data.ldjl_id;
                        this.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': data.info });
                        notice = mx.MX_NOTICE.POP_VIEW;
                        p_d = {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "user": this.cur_ld_user,
                                "type": "ld",
                                "res": Number(data.type),
                                "info": data.info
                            }
                        };
                        var id = Number(data.type) == 0 ? Number(data.l_id) + 1000 : Number(data.info.mid);
                        this.fl = {
                            "id": id,
                            "res": Number(data.type)
                        };
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FightResultView.S_NAME,
                        "param": {
                            "notice": notice,
                            "sdata": p_d,
                            "awards": data.awards,
                            "sl": pass
                        }
                    });
                    if (target) {
                        target.qinmi = Number(target.qinmi) - qinmi;
                    }
                    else {
                        for (var i in this.ss_data) {
                            for (var j in this.ss_data[i]) {
                                if (this.ss_data[i][j].user_id == this.cur_ld_user.user_id) {
                                    this.ss_data[i][j].qinmi = Number(this.ss_data[i][j].qinmi) - qinmi;
                                    break;
                                }
                            }
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_LUEDUO_LIST);
                    //好友本地更新
                    var frproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                    var param = ['1', '2', '4'];
                    for (var i in param) {
                        for (var j in frproxy["list" + param[i]]) {
                            for (var k in frproxy["list" + param[i]][j]) {
                                if (frproxy["list" + param[i]][j][k].user_id == this.cur_ld_user.user_id) {
                                    frproxy["list" + param[i]][j][k].qinmi = Number(frproxy["list" + param[i]][j][k].qinmi) - qinmi;
                                    break;
                                }
                            }
                        }
                    }
                    var spt = mx.AppConfig.check_not_support("share");
                    if (!spt) {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        if (data.sj) {
                            if (Number(data.sj[0]) == 5) {
                                pproxy.wb_share_sj = data.sj;
                                pproxy.wb_share_chufa = true;
                            }
                        }
                        else {
                            pproxy.wb_share_sj = [];
                            pproxy.wb_share_sj = null;
                            pproxy.wb_share_chufa = false;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 25
                    });
                    return;
                case 3://被打的已经山河破碎
                    this.lueduo += 10;
                    this.sendNotification(mx.MX_NOTICE.LLD_NUM_CHANGED);
                    str = mx.Lang.ld066;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        //囚凤宫
        LueDuoProxy.prototype.qfg_init_data = function (data) {
            if (!data.data) {
                return;
            }
            this.qfg_list = data.data;
            if (this.qfg_list.length > 0) {
                this.qfg_page = 1;
            }
            for (var i = 0; i < this.qfg_list.length; i++) {
                this.qfg_list[i].isFlu = true;
                var meili = Number(this.qfg_list[i].meili);
                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.QIUFENGKOUCHU, 'id', meili < 60 ? 1 : Math.ceil((meili - 50) / 10));
                this.qfg_list[i].qfz_max = info.dj4;
            }
            this.qfg_sort();
            this.sendNotification(mx.MX_NOTICE.UPDATE_QFG);
        };
        LueDuoProxy.prototype.qfg_swap = function (i, j) {
            var i_t = this.qfg_list[i];
            this.qfg_list[i] = this.qfg_list[j];
            this.qfg_list[j] = i_t;
        };
        LueDuoProxy.prototype.qfg_sort = function () {
            var size = this.qfg_list.length;
            var cur_p = 0;
            for (var i = 0; i < size; i++) {
                var qufu = Number(this.qfg_list[i].qufu);
                var max = Number(this.qfg_list[i].qfz_max);
                if (qufu >= max) {
                    if (i != cur_p) {
                        this.qfg_swap(i, cur_p);
                    }
                    cur_p++;
                }
            }
            for (var i = 1; i < size - cur_p; i++) {
                for (var j = cur_p; j < size - 1; j++) {
                    var q1 = Number(this.qfg_list[j].qufu);
                    var q2 = Number(this.qfg_list[j + 1].qufu);
                    if (q1 < q2) {
                        this.qfg_swap(j, j + 1);
                    }
                    else if (q1 == q2) {
                        var m1 = Number(this.qfg_list[j].meili);
                        var m2 = Number(this.qfg_list[j + 1].meili);
                        if (m1 < m2) {
                            this.qfg_swap(j, j + 1);
                        }
                    }
                }
            }
        };
        LueDuoProxy.prototype.qfg_item_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误，玩家不存在或者掠夺未开启
                    str = mx.Lang.err01;
                    break;
                case 1://屈服已经达到最高
                    str = mx.Lang.qfg04;
                    break;
                case 2://道具剩余不足
                    // str = Lang.xq006;
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_BUY_ITEM, "item_id": data.item_id, "num": 1 },
                        "param": {
                            "item": data.item_id,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                    ;
                case 3://成功
                    //消耗
                    var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pproxy.xiaohao_item([{ "item_id": data.item_id, "num": 1 }]);
                    for (var i in this.qfg_list) {
                        var unit = this.qfg_list[i];
                        if (this.qfg_currfz.id == unit.id) {
                            this.qf_add = data.qufu - this.qfg_list[i].qufu;
                            this.qfg_list[i].qufu = data.qufu;
                            break;
                        }
                    }
                    this.qfg_sort();
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG);
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG_QUFU, { "qufu": Number(data.qufu), "item_num": data.item_num, "item_id": data.item_id, "baoji": data.baoji });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.qfg_hg_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误，玩家不存在或者掠夺未开启
                    str = mx.Lang.err01;
                    break;
                case 1://屈服没有达到最高
                    str = mx.Lang.qfg05;
                    break;
                case 3://后宫数量超出限制
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    str = Number(gproxy.user_vip) < mx.MX_COMMON.MAX_VIP_LV ? mx.Lang.p0142 : mx.Lang.p0143;
                    break;
                case 2://成功
                    //删除俘虏
                    for (var i in this.qfg_list) {
                        var unit = this.qfg_list[i];
                        if (this.qfg_currfz.id == unit.id) {
                            this.qfg_list.splice(Number(i), 1);
                            break;
                        }
                    }
                    //增加妃子
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    pproxy.add_new_fz(data.feizi);
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG);
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", data.feizi.weifen);
                    var weifen = Number(data.feizi.sex) == 1 ? api.weifeng : api.weifenb;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 1,
                            "name": this.qfg_currfz.name,
                            "weifen": weifen,
                        }
                    });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.qfg_jfs_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误，玩家不存在或者掠夺未开启
                    str = mx.Lang.err01;
                    break;
                case 1://成功
                    for (var i in this.qfg_list) {
                        var unit = this.qfg_list[i];
                        if (this.qfg_currfz.id == unit.id) {
                            this.qfg_list.splice(Number(i), 1);
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 6,
                            "name": this.qfg_currfz.name,
                            "notice_exit": mx.MX_NOTICE.SHOW_AWARD,
                            "sdata_exit": "",
                        }
                    });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.qfg_huiguo_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误，玩家不存在或者掠夺未开启
                    str = mx.Lang.err01;
                    break;
                case 1://成功
                    str = mx.Lang.qfg09;
                    //删除俘虏
                    for (var i in this.qfg_list) {
                        var unit = this.qfg_list[i];
                        if (this.qfg_currfz.id == unit.id) {
                            this.qfg_list.splice(Number(i), 1);
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        LueDuoProxy.prototype.set_curr_fz = function (data) {
            this.qfg_currfz = data;
        };
        LueDuoProxy.NAME = "LueDuoProxy";
        return LueDuoProxy;
    }(puremvc.Proxy));
    mx.LueDuoProxy = LueDuoProxy;
    __reflect(LueDuoProxy.prototype, "mx.LueDuoProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LueDuoProxy.js.map
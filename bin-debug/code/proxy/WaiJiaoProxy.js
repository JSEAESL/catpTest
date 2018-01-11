/**
 *   @author wf,cy
 *   @date 2016.1.5
 *   @desc 女王外交相关数据管理
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
    var WaiJiaoProxy = (function (_super) {
        __extends(WaiJiaoProxy, _super);
        function WaiJiaoProxy() {
            var _this = _super.call(this, WaiJiaoProxy.NAME) || this;
            _this._isTx = false;
            _this._hgEnter = 'tiaoxi';
            _this.hg_data = {};
            _this.txcshu = 0; //可调戏次数
            _this.hg_num = 0;
            _this.hg_page = 1;
            _this.hg_total = 1;
            _this.hg_pagenum = 8;
            _this.rateup = false; //调戏档位提升
            _this.jfs_tab = 0; //当前tab；
            _this.jfs_paixu = 0; //排序
            _this.jfs_page = [1, 1, 1]; //教坊司页码
            _this.ss_flag = 0;
            _this.jfs_type = 0;
            _this.shushen_have_avg = [];
            return _this;
        }
        WaiJiaoProxy.prototype.init_waijiao = function (data) {
        };
        WaiJiaoProxy.prototype.init_jfs_cb = function (data) {
            this.jfs_info = data.data;
            this.ftp_num = Number(data.fentoupai);
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            pProxy.set_item_num(2011, this.ftp_num);
            this.jfs_total = Number(data.total);
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSSYScreen.S_NAME);
        };
        WaiJiaoProxy.prototype.jfs_type_cb = function (data) {
            this.jfs_info = data.data;
            this.jfs_total = Number(data.total);
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSSYScreen.S_NAME);
        };
        WaiJiaoProxy.prototype.set_cur_mn = function (data) {
            this.cur_jfs_mn = data;
        };
        WaiJiaoProxy.prototype.get_cur_mn = function (id) {
            var mn = this.cur_jfs_mn;
            if (id) {
                for (var k in this.jfs_info) {
                    if (Number(this.jfs_info[k].id) == Number(id)) {
                        mn = this.jfs_info[k];
                        break;
                    }
                }
            }
            return mn;
        };
        WaiJiaoProxy.prototype.jfs_pc_cb = function (data) {
            switch (Number(data.state)) {
                case 0://拒绝接客
                    if (data.jinzhu) {
                        this.cur_jfs_mn.jinzhu = data.jinzhu;
                    }
                    if (data.jinzhu_name) {
                        this.cur_jfs_mn.jinzhu_name = data.jinzhu_name;
                    }
                    if (mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSSYScreen.S_NAME);
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID == mx.JFSYJXQScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSYJXQScreen.S_NAME);
                    }
                    this.jfs_type = Number(data.type);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_jfs_mn,
                            "type": "jfs",
                            "kind": 2,
                            "child": 0
                        }
                    });
                    break;
                case 1://粉头牌不足
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jfs07 });
                    break;
                case 2://成功
                    var up = data.up.add_renqi;
                    this.cur_jfs_mn.renqi = data.up.renqi;
                    if (data.up.jinzhu) {
                        this.cur_jfs_mn.jinzhu = data.up.jinzhu;
                    }
                    if (data.up.youhui) {
                        this.cur_jfs_mn.youhui = data.up.youhui;
                    }
                    if (data.up.jinzhu == Main.USER_ID) {
                        var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                        this.cur_jfs_mn.jinzhu_name = gproxy.user_name;
                    }
                    this.ftp_num = Math.max(0, this.ftp_num - 1);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2011, this.ftp_num);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_jfs_mn,
                            "type": "jfs",
                            "up": up,
                            "kind": 1,
                            "child": 0
                        }
                    });
                    if (mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSSYScreen.S_NAME);
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID == mx.JFSYJXQScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSYJXQScreen.S_NAME);
                    }
                    var spt = mx.AppConfig.check_not_support("share");
                    if (!spt) {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        if (data.sj) {
                            pproxy.wb_share_sj = data.sj;
                            pproxy.wb_share_chufa = true;
                        }
                        else {
                            pproxy.wb_share_sj = [];
                            pproxy.wb_share_sj = null;
                            pproxy.wb_share_chufa = false;
                        }
                    }
                    break;
                case 3://是自己的孩子
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_jfs_mn,
                            "type": "jfs",
                            "kind": this.shushen_have_avg.indexOf(this.cur_jfs_mn.zinv_id) == -1 ? 5 : 6,
                            "child": 1
                        }
                    });
                    break;
                case 4://已经被赎身
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jfs38 });
                    break;
            }
        };
        WaiJiaoProxy.prototype.jfs_fight_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://无金主
                    str = mx.Lang.jfs12;
                    break;
                case 1://自己就是金主
                    str = mx.Lang.jfs13;
                    break;
                case 2://24小时内已战胜
                    str = mx.Lang.jfs14;
                    break;
                case 3://
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AVGView.S_NAME);
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    fproxy.init_jfs_fight(data);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        WaiJiaoProxy.prototype.jfs_fight_check = function (data) {
            switch (data.state) {
                case 0://无金主
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jfs43 });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    break;
                case 1: //战斗失败
                case 2://成功
                    var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var fd = fproxy.get_curr_tx_friend();
                    var pass = data.state == 2;
                    var up = 0;
                    if (data.state == 2) {
                        up = data.up.add_renqi;
                        this.cur_jfs_mn.renqi = data.up.renqi;
                        if (data.up.jinzhu) {
                            this.cur_jfs_mn.jinzhu = data.up.jinzhu;
                        }
                        if (data.up.jinzhu == Main.USER_ID) {
                            this.cur_jfs_mn.jinzhu_name = gproxy.user_name;
                        }
                        this.ftp_num = Number(data.fentoupai);
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        pProxy.set_item_num(2011, this.ftp_num);
                    }
                    var api = void 0;
                    if (pass) {
                        var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSDIALOG, "result", 3);
                        api = apis[Math.floor(Math.random() * apis.length)];
                    }
                    else {
                        var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSDIALOG, "result", 4);
                        api = apis[Math.floor(Math.random() * apis.length)];
                    }
                    var str = api.content;
                    var p_d = {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_jfs_mn,
                            "type": "jfs_over",
                            "pass": pass,
                            "content": str,
                            "up": up
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FightResultView.S_NAME,
                        "param": {
                            "notice": mx.MX_NOTICE.POP_VIEW,
                            "sdata": p_d,
                            "awards": [],
                            "sl": pass
                        }
                    });
                    break;
            }
        };
        WaiJiaoProxy.prototype.jfs_ss_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://已被其他人买走
                    str = mx.Lang.jfs17;
                    break;
                case 4://后宫数量超出限制
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    str = Number(gproxy.user_vip) < mx.MX_COMMON.MAX_VIP_LV ? mx.Lang.p0142 : mx.Lang.p0143;
                    break;
                case 1://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": mx.QBuyYbiView.S_NAME,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2://成功
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var info = data.info;
                    info.zongzu_name = this.cur_jfs_mn.zongzu_name;
                    info.zongzu_id = this.cur_jfs_mn.zongzu_id;
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': this.cur_jfs_mn.zongzu_id,
                        "mtype": 3,
                        "str": mx.Lang.wbjfshz
                    });
                    pproxy.add_new_fz(info);
                    if (this.ss_flag) {
                        this.ss_flag = 0;
                        var jg = void 0;
                        var meili = Number(this.cur_jfs_mn.meili);
                        if (meili < 50) {
                            jg = 60;
                        }
                        else if (meili < 60) {
                            jg = 60;
                        }
                        else if (meili < 70) {
                            jg = 108;
                        }
                        else if (meili < 80) {
                            jg = 150;
                        }
                        else if (meili < 90) {
                            jg = 198;
                        }
                        else {
                            jg = 288;
                        }
                        var jibie = 1;
                        var renqi = Number(this.cur_jfs_mn.renqi);
                        var arr = [0, 30, 60, 90, 120, 180, 240, 300, 360, 420, 600, 900, 99999999];
                        for (var k in arr) {
                            if (renqi >= arr[k] && renqi < arr[Number(k) + 1]) {
                                jibie = Math.min(Number(k) + 1, 9);
                                break;
                            }
                        }
                        var arr2 = [600, 300, 180, 150, 120, 90, 60, 45, 30, 15, 10, 0];
                        jg += arr2[12 - jibie];
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "cd": this.cur_jfs_mn,
                                "type": "jfs_sscg",
                                "jg": jg
                            }
                        });
                    }
                    else {
                        switch (this.jfs_tab) {
                            case 0:
                                var net = [{
                                        "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                                        "type": 0,
                                        "page": this.jfs_page[this.jfs_tab]
                                    }, {
                                        "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                        "type": "11",
                                    }];
                                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                    "sname": mx.JFSSYScreen.S_NAME,
                                    "param": { "net": net }
                                });
                                break;
                            case 1:
                            case 2:
                                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_JFSTYPE,
                                    "type": this.jfs_tab == 1 ? 0 : 1
                                });
                                break;
                        }
                        str = mx.Lang.jfs21;
                    }
                    break;
                case 3://自己的子女赎身
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_jfs_mn,
                            "type": "jfs_sscg",
                        }
                    });
                    return;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        WaiJiaoProxy.prototype.jfs_ek_cb = function (data) {
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.EnKeAlert.S_NAME,
                "param": data.data
            });
        };
        WaiJiaoProxy.prototype.jfs_dr_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://成功
                    str = mx.Lang.jfs34;
                    this.dr_flag = true;
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    /*let arr = pproxy.hzs_list1[1];
                    let c_d = arr[0];
                    for(let k in arr){
                        if(arr[k].id == data.id){
                            c_d = arr[k];
                            break;
                        }
                    }*/
                    pproxy.res_hzs++;
                    var idx = pproxy.get_hz_idx({ id: data.id });
                    pproxy.update_hzs_list();
                    var c_d = {};
                    if (idx >= 0) {
                        c_d = pproxy.hzs_list1[pproxy.hzs_page1][idx];
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 5,
                            "name": c_d.name,
                            "weifen": c_d.fenghao || mx.Lang.wu
                        }
                    });
                    //this.sendNotification(MX_NOTICE.CS_GET_DATA, {t : MX_NETS.CS_HZS_DATA, type : 1, page : 1});
                    return;
                case 2://未成年
                    str = mx.Lang.jfs30;
                    break;
                case 3://无赐名
                    str = mx.Lang.jfs31;
                    break;
                case 4://未册封
                    str = mx.Lang.jfs32;
                    break;
                case 5://黑市中不能打入教坊司
                    str = mx.Lang.jfs44;
                    break;
                case 6:
                    str = mx.Lang.hzs85;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        WaiJiaoProxy.prototype.setTx = function (b) {
            this._isTx = b;
        };
        Object.defineProperty(WaiJiaoProxy.prototype, "isTx", {
            get: function () {
                return this._isTx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaiJiaoProxy.prototype, "hgEnter", {
            get: function () {
                return this._hgEnter;
            },
            enumerable: true,
            configurable: true
        });
        WaiJiaoProxy.prototype.enter_friend_hgong = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.tx002;
                    break;
                case 1:
                    if (mx.AppConfig.CURR_SCENE_ID == mx.LDOtherScreen.S_NAME) {
                        msg = mx.Lang.ld057;
                    }
                    else {
                        msg = mx.Lang.tx003;
                    }
                    break;
                case 2://成功
                    var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                    if (mx.AppConfig.CURR_SCENE_ID == mx.TiaoXiScreen.S_NAME ||
                        mx.AppConfig.PREV_SCENE_ID == mx.TiaoXiScreen.S_NAME) {
                        this._hgEnter = 'tiaoxi';
                    }
                    else if (mx.AppConfig.PREV_SCENE_ID == mx.FriendScreen.S_NAME ||
                        mx.AppConfig.CURR_SCENE_ID == mx.FriendScreen.S_NAME) {
                        this._hgEnter = 'friend';
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID != mx.YXDianScreen.S_NAME) {
                        this._hgEnter = mx.AppConfig.PREV_SCENE_ID;
                    }
                    var fd = fproxy.get_curr_tx_friend();
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    if (lproxy.isLD && mx.AppConfig.CURR_SCENE_ID == mx.FriendScreen.S_NAME) {
                        lproxy.setLD(false);
                    }
                    if (!lproxy.isLD) {
                        this._isTx = true;
                    }
                    else {
                        var user = lproxy.get_cur_user();
                        user.user_id = data.other_id;
                        fd = { "user_id": user.user_id };
                    }
                    this.friend_kw = Number(data.kongwei);
                    this.txcshu = Number(data.wqj);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2037, this.txcshu);
                    if (!this.hg_data[fd.user_id]) {
                        this.hg_data[fd.user_id] = {};
                    }
                    for (var k in data.feizi) {
                        var d = data.feizi[k];
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", d.weifen);
                        d.weifen = d.sex == 1 ? api.weifeng : api.weifenb;
                        d.namedi = true;
                        if (Number(d.mid) == 308 && d.huapi != '') {
                            d.avatar = d.huapi;
                        }
                        if (Number(d.mid) > 1000 || (Number(d.mid == 308) && d.huapi != '')) {
                            d.hero = mx.Tools.get_zn_res(d.avatar, "jq");
                        }
                        else {
                            d.hero = mx.Tools.get_mn_res(d.mid, "dh");
                        }
                    }
                    this.hg_data[fd.user_id][data.page] = data.feizi;
                    this.hg_num = Number(data.num);
                    this.hg_page = Number(data.page);
                    this.hg_total = Math.ceil(Number(data.num) / this.hg_pagenum);
                    var net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.YXDianScreen.S_NAME,
                        "param": { "net": net }
                    });
                    this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        WaiJiaoProxy.prototype.get_curr_hg = function (page) {
            if (page === void 0) { page = 0; }
            var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
            var fd = fproxy.get_curr_tx_friend();
            var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            if (lproxy.isLD) {
                var user = lproxy.get_cur_user();
                fd = { "user_id": user.user_id };
            }
            if (page > 0) {
                return this.hg_data[fd.user_id][page];
            }
            return this.hg_data[fd.user_id][this.hg_page] || [];
        };
        WaiJiaoProxy.prototype.setCurrFz = function (fz) {
            this.curr_fz = fz;
        };
        WaiJiaoProxy.prototype.tiaoxi_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.tx004;
                    break;
                case 2:
                    msg = mx.Lang.tx005;
                    break;
                case 3:
                    msg = mx.Lang.tx006;
                    break;
                case 4://调戏亲子
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AVGView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.curr_fz,
                            "type": "tiaoxi_result",
                            "result": 3
                        }
                    });
                    break;
                case 5:
                    msg = mx.Lang.tx008;
                    break;
                case 6://完成调戏
                    this.rateup = Number(data.rate) > this.curr_fz.rate;
                    if (this.rateup) {
                        this.update_rate(data.rate);
                    }
                    this.txcshu = Math.max(0, this.txcshu - 1);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2037, this.txcshu);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AVGView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.curr_fz,
                            "type": "tiaoxi_result",
                            "rateup": data.tiaoxi == 1 ? this.rateup : false,
                            "result": data.tiaoxi == 1 ? 1 : 2 //1-调戏成功 2-调戏失败（触发战斗）
                        }
                    });
                    //玩吧消息
                    if (data.tiaoxi != 1) {
                        this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                            'uid': this.curr_fz.zongzu_id,
                            "mtype": 3,
                            "str": mx.Lang.wbtx
                        });
                    }
                    if (data.user_battle) {
                        this.tx_fight = { 'ud': data.user_battle, 'ed': data.enemy_battle };
                    }
                    else if (this.rateup) {
                        this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST);
                    }
                    if (data.huaiyun) {
                        mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                            "sltype": mx.MX_WEB_CONST.WEB_PRI_T_FZ,
                            "id": this.curr_fz.id,
                            "name": this.curr_fz.name,
                            "fztype": "hy",
                            "user_id": this.tar_uid,
                        });
                    }
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 26,
                    });
                    break;
                case 7://24小时内再次调戏战斗，默认成功
                    this.rateup = Number(data.rate) > this.curr_fz.rate;
                    this.txcshu = Math.max(0, this.txcshu - 1);
                    var pProxy2 = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy2.set_item_num(2037, this.txcshu);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AVGView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.curr_fz,
                            "type": "tiaoxi_result",
                            "skip": true,
                            "rateup": this.rateup,
                            "result": 2 //调戏失败默认战斗成功
                        }
                    });
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': this.curr_fz.zongzu_id,
                        "mtype": 3,
                        "str": mx.Lang.wbtx
                    });
                    if (this.rateup) {
                        this.update_rate(data.rate);
                        this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST);
                    }
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 26,
                    });
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        WaiJiaoProxy.prototype.update_rate = function (rate) {
            var list = this.get_curr_hg();
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == this.curr_fz.id) {
                    list[i].rate = Number(rate);
                    this.curr_fz.rate = Number(rate);
                }
            }
        };
        //調戲動畫后跳轉AVG小德子说話
        WaiJiaoProxy.prototype.show_tiaoxi_avg = function () {
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "cd": this.curr_fz,
                    "type": "tiaoxi_xdz",
                    "result": 1
                }
            });
        };
        //开始调戏战斗
        WaiJiaoProxy.prototype.start_fight = function (data) {
            if (!this.tx_fight) {
                return;
            }
            var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
            fproxy.init_tiaoxi_fight(this.tx_fight);
        };
        //战斗结束调用
        WaiJiaoProxy.prototype.check_tx_fight_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.tx010;
                    break;
                case 3:
                    msg = mx.Lang.tx006;
                    break;
                case 4:
                    msg = mx.Lang.tx007;
                    break;
                case 5://成功
                    var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var fd = fproxy.get_curr_tx_friend();
                    var pass = data.sl == 'succ';
                    var str = void 0;
                    var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.TIAOXIJQYH, 'result', pass ? 2 : 3, 'sort', this.curr_fz.rate);
                    ;
                    if (apis && apis[0]) {
                        var con = apis[0].content;
                        if (pass) {
                            con = con.replace('{5}', '{0}');
                            str = mx.Tools.setStrColor(con, [fd.name], [0xFF0000]);
                        }
                        else {
                            str = mx.Tools.setStrColor(con + '\n{0}', [mx.Tools.format(mx.Lang.tx015, fd.name)], [0xFF0000]);
                            gproxy.set_avatar({ 'time': 3590, 'type': '1' });
                            fd.qinmi = Number(fd.qinmi) - 50;
                            fproxy.set_curr_tx_friend(fd);
                        }
                        if (this.rateup) {
                            str.push({ text: mx.Tools.format(mx.Lang.tx014, this.curr_fz.name), style: { textColor: 0xFF0000 } });
                        }
                    }
                    var p_d = str ? {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.curr_fz,
                            "type": "tiaoxi_over",
                            "pass": pass,
                            "content": str
                        }
                    } : null;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FightResultView.S_NAME,
                        "param": {
                            "notice": p_d ? mx.MX_NOTICE.POP_VIEW : null,
                            "sdata": p_d,
                            "tiaoxi": true,
                            "awards": [],
                            "sl": pass
                        }
                    });
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        WaiJiaoProxy.NAME = "WaiJiaoProxy";
        return WaiJiaoProxy;
    }(puremvc.Proxy));
    mx.WaiJiaoProxy = WaiJiaoProxy;
    __reflect(WaiJiaoProxy.prototype, "mx.WaiJiaoProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WaiJiaoProxy.js.map
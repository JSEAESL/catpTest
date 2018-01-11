/**
*   @author mx
*   @date 2015.2.25
*   @desc 游戏通用数据处理
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
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            var _this = _super.call(this, GameProxy.NAME) || this;
            _this.juqing_flag = 0; //剧情小红点flag
            _this.tishi_data = {}; //模块提示数据
            _this.huyao = 0;
            _this.qz_cover = 1; //空间cover 0  没有领取过    1 已领取过
            _this.cover_duang = true; //cover 龙骨, 有没有设置过
            _this.cover_hongdian = false; //cover 红点， 可否领取奖励
            _this.zlcb_flag = 0;
            _this.zlcb_res = 0;
            _this.vip_flag = 0; //指定跳转vip
            _this.recharge_move = 1; //仅在每次游戏的第一次打开时进行滑动展示
            _this.charge_id = 0;
            _this.new_cloth = [];
            //0 1单个 2所有
            _this.prev_mail = 0;
            _this.taozhuang = [];
            //添加到桌面成功后回调 仅本次登录中可用
            _this.sweek_cb = false;
            _this.wenzi_award = {};
            _this.wbpet_lq = [];
            _this.wbpet_hongdian = {
                "1": 2,
                "2": 2,
                "3": 2
            };
            _this.qifu_hongdian = false;
            _this.qifu_log = [];
            _this.qifu_award = [];
            _this.show_nhkq = true;
            _this.nhkq_flag = false;
            _this.rec_hb = null;
            _this.send_hb = null;
            _this.send_hb_detail = null;
            _this.hb_mode_data = null;
            _this.hb_flag = false;
            _this.hongbao_create = false;
            return _this;
        }
        GameProxy.prototype.init_server_data = function (cd) {
            this.last_ser = cd.last || 0;
            this.nickname = cd.nickname || "";
            this.serd_list = cd.server_list;
            this.user_info = cd.user_info;
        };
        GameProxy.prototype.init_user_data = function (data) {
            if (!data.state) {
                return;
            }
            else if (data.state == 2) {
                var end_time = mx.Tools.format_time(data.endtime, "nyrsfm");
                var a_d2 = {
                    "param": mx.Tools.format(mx.Lang.fherror, data.reason, end_time),
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return;
            }
            Main.USER_ID = data.user_id;
            this.user_avatar = data.avatar; //用户头像
            this.ex_avatar = data.ex_avatar;
            this.user_name = data.name; //用户昵称
            this.user_sex = Number(data.xingbie); //用户性別，true为女
            this.user_lv = Number(data.level); //用户等级
            this.user_xlv = Number(data.xian_level); //用户仙级。
            this.user_lilian = Number(data.lilian); //???  
            var uProxy = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            uProxy.union_id = Number(data.gh_id); //公会id      	
            this.user_payall = Number(data.pay_total) || 0; //用户累计充值。
            this.user_vip = Number(data.vip); //用户VIP等级。
            this.user_sc = data.schong; //首充奖励。
            this.user_jijin = data.jijin; //开服基金  
            this.user_kq = data.kaiqi || []; //模块开启状态
            this.huyao = data.huyao; //huyao参数，表示第几天，，大于8天返回0，不显示
            this.juqing_flag = Number(data.fuben);
            this.last_pay = Number(data.dchong) == 0; //0开启 1未开
            this.zlcb_flag = data.zlcb_flag;
            this.zlcb_res = data.zlcb_endtime;
            this.main_lh = data.y_id;
            this.online_today = data.daily_online;
            if (data.cover) {
                this.qz_cover = Number(data.cover);
            }
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            dproxy.set_currency("uexp", data.exp); //女王经验
            dproxy.set_currency("ybi", data.coin); //银币
            dproxy.set_currency("ybao", data.diamond); //元宝
            dproxy.set_currency("tili", data.tili); //体力
            dproxy.set_currency("zjb", data.zijingbi); //体力
            mx.DataTool.getInstance().init_datatool(); //开启统计数据
            if (mx.MX_COMMON.NEW_ROLE) {
                mx.DataTool.getInstance().data_tool(mx.MX_DL_CONST.DL_EVT_GUIDE + "1");
                if (window && window["reportRegister"]) {
                    window["reportRegister"]();
                }
            }
            else {
                mx.DataTool.getInstance().data_tool("ENTER_GAME"); //统计日活
            }
            if (window && window["set_share_info"]) {
                window["set_share_info"](Main.USER_ID);
            }
            if (data.jiaqun && data.jiaqun != "") {
                if (window && window["mx_qq_link"]) {
                    window["mx_qq_link"] = data.jiaqun;
                }
            }
            this.new_ver = data.version;
            var gProxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
            var ydn = Number(data.yd_id);
            if (ydn == 1) {
                ydn = 50;
            }
            gProxy.init_guide_info(ydn, data.slt);
            if (ydn < 50) {
                var net = [{ "t": mx.MX_NETS.CS_GUIDE_STEP, "yd_id": 64 }];
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                    "sname": mx.MainScreen.S_NAME,
                    "param": { "net": net }
                });
            }
            else if (ydn < 54) {
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.GuideSelectScreen.S_NAME);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
            }
            //this.sendNotification(MX_NOTICE.SCENE_CHANGE, MainScreen.S_NAME);
            var cProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            cProxy.key = data.key; //聊天验证
            var datatool = mx.DataTool.getInstance();
            //登录时间
            datatool.set_QQ_Score(8, new Date().getTime());
            //大区
            datatool.set_QQ_Score(26, Main.PLATFORM || 1);
            //服务器
            datatool.set_QQ_Score(27, Main.SER_ID);
            //角色ID
            datatool.set_QQ_Score(28, Main.USER_ID, true);
            //角色名
            datatool.set_QQ_Score(29, data.name, true);
            //公会
            datatool.set_QQ_Score(30, data.gh_id || 1);
            //会长上线时上报QQ群
        };
        GameProxy.prototype.player_info_cb = function (data) {
            this.info = data.info;
            if (data.info.name == this.user_name) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.MyInfoView.S_NAME
                });
            }
            else {
                this.pre_other_scene = mx.AppConfig.CURR_SCENE_ID;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.OtherScreen.S_NAME);
            }
        };
        GameProxy.prototype.rename_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0008;
                    break;
                case 1:
                    this.sendNotification(mx.MX_NOTICE.NAME_CHANGED);
                    str = mx.Lang.st013;
                    break;
                case 4://含有敏感字
                    str = mx.Lang.st006 + mx.Lang.st005;
                    break;
                case 2://重名
                    str = mx.Lang.st007 + mx.Lang.st005;
                    break;
                case 3://长度超过7个
                    str = mx.Lang.st008 + mx.Lang.st005;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.init_recharge_info = function (data) {
            this.recharge_info = data.data;
            this.zhigou_libao = data.libao;
            var old_vip = this.user_vip; //检查VIP是否有变化
            this.user_vip = Number(data.vip);
            if (Number(data.chongzhi) - this.user_payall > 0) {
                mx.DataTool.getInstance().set_QQ_Score(43, Number(this.user_payall) / 10);
            }
            this.user_payall = Number(data.chongzhi);
            this.recharge_yueka = Number(data.yueka);
            //紫晶币
            if (Number(this.charge_id) >= 14 && Number(this.charge_id) <= 18) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    't': mx.MX_NETS.CS_GET_HEISHIBI
                });
            }
            //卡券充值
            /*if(Number(this.charge_id) == 1 || Number(this.charge_id) == 19 || Number(this.charge_id) == 9){
                this.nhkq_flag = true;
                this.sendNotification(MX_NOTICE.CS_GET_DATA,{
                    't': MX_NETS.CS_NHKQ_INFO
                });
                let dproxy = <DataProxy><any> (this.facade.retrieveProxy(DataProxy.NAME));
                let award = {
                    "1" :   [{type: 2, shuliang: 250}],
                    "9" :   [{type: "4", shuliang: 20, id: 2000},{type: "4", shuliang: 1, id: 2010},{type: "4", shuliang: 1, id: 2018}],
                    "19":   [{type: 2, shuliang: 3680}]
                }
                dproxy.ud_reward_cb({
                    awards: award[this.charge_id]
                });
            }*/
            if (data.skip) {
                this.sendNotification(mx.MX_NOTICE.USER_PAY_CHANGE); //充值变化
                if (this.user_vip > old_vip) {
                    this.sendNotification(mx.MX_NOTICE.FRESH_VIP);
                    mx.DataTool.getInstance().set_QQ_Score(45, this.user_vip);
                }
                if (this.check_zglb()) {
                    if (Number(data.schong) == 1) {
                        if (this.user_sc < 1) {
                            this.user_sc = 1;
                            /*this.sendNotification(MX_NOTICE.SHOW_AWARD, {
                                "notice": MX_NOTICE.POP_VIEW,
                                "sdata": { "name": ShouChongAlert.S_NAME },
                            });*/
                            return;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
                    return;
                }
                /*
                if (Number(data.schong) == 1) {//首充可领取,充值金额>=9，打开首充弹窗，会关闭其他所有弹窗
                    if (this.user_sc < 1) {//首充达成
                        this.user_sc = 1;
                    }
                    this.sendNotification(MX_NOTICE.POP_VIEW, { "name": ShouChongAlert.S_NAME });
                } else {//充值成功显示弹窗
                    this.sendNotification(MX_NOTICE.POP_VIEW, { "name": RechargeCGView.S_NAME });
                }
                */
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.RechargeCGView.S_NAME });
                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, 1, mx.ShopAlert.S_NAME); //刷新充值界面
                this.sendNotification(mx.MX_NOTICE.HONGBAO_FRESH); //刷新红包
                //this.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_QIFU_MAIN });//屏蔽
            }
        };
        GameProxy.prototype.check_zglb = function () {
            var res = false;
            var reward = [];
            var info = this.zhigou_libao;
            for (var i = 9; i < 12; i++) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE, "id", i);
                var key = api.money;
                if (info[key] == 2) {
                    info[key] = i == 10 ? 1 : 0; //置为已购买且已领取                    
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_ZGLB_SHOW,
                        "money": api.money,
                    });
                    var apis = mx.Tools.get_c_zllb(i);
                    for (var k in apis) {
                        var capi = apis[k];
                        reward.push({
                            "type": capi.award_type,
                            "id": capi.item_id,
                            "shuliang": capi.num,
                        });
                    }
                    reward.reverse();
                    var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
                    dproxy.ud_reward_cb({ "awards": reward });
                    res = true;
                    break;
                }
            }
            return res;
        };
        GameProxy.prototype.buy_ybao_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                        "sdata_ok": { "name": mx.ShopAlert.S_NAME, "param": 1 },
                        "param": mx.Lang.r0039
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2:
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE, "id", data.id);
                    var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                    if (Number(data.id) != 10) {
                        var num = Number(api.num);
                        if (this.recharge_info[api.money]) {
                            num += Number(api.extra);
                        }
                        dproxy.ud_reward_cb({
                            "awards": [{ type: 2, shuliang: num }],
                        });
                    }
                    else {
                        dproxy.ud_reward_cb({
                            "awards": [{ type: 4, shuliang: 1, id: 606 }],
                        });
                    }
                    this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
                    this.recharge_info = data.data;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, 2, mx.ShopAlert.S_NAME); //刷新充值界面
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.check_wb_recharge = function (id) {
            if (id) {
                this.wb_r_record = id;
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CHECK_RECHARGE, this.wb_r_record);
            }
        };
        GameProxy.prototype.channel_rcharge = function (data) {
            this.charge_id = data.id;
            switch (mx.AppConfig.MXTag) {
                case "dev": //本地pc
                case "test": //本地手机测试
                case "wxdev": //微信开发版
                case "wxdevp": //微信手机版
                case "wxgame": //微信小游戏
                case "h5": //h5线上测试
                case "h5_dev"://h5线上测试开发版
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_RECHARGE_INFO,
                        "skip": true,
                    });
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_DAYTASK_INFO,
                        "skip": true
                    });
                    mx.DataTool.getInstance().set_QQ_Score(44, Number(data.num) / 10);
                    mx.DataTool.getInstance().set_QQ_Score(46, Math.floor(new Date().getTime() / 1000));
                    break;
                case "wb"://玩吧，兑换成功
                    if (window && window["mx_ptid"] == "QzGameApp") {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE2, "id", data.id);
                        window["de_payment"](api.RMB); //统计消费数据
                    }
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_RECHARGE_INFO,
                        "skip": true,
                    });
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_DAYTASK_INFO,
                        "skip": true
                    });
                    break;
                default:
                    /*let rid = data.id;//充值档
                    let api = ApiTool.getAPINode(MX_APINAME.RECHARGE, "id", rid);
                    let name = api.num + Lang.ybao;//25元宝
                    if (!api.num) {
                        name = api.num + Lang.zglb;
                    }
                    let desc = name;
                    if (api.money == 25 && Number(this.recharge_yueka) < 331) {//还可以购买月卡
                        name = Lang.yueka;
                        desc = Lang.r0013;
                    } else if (api.money == 9) {//首充人员礼包
                        name = Lang.r0022;
                        desc = Lang.r0023;
                    } else if (api.extra && this.recharge_info[api.money]) {//额外赠送还生效
                        desc += Tools.format(Lang.r0014, api.extra);
                    }
                    let cd: any = {
                        "user_id": Main.USER_ID,
                        "order_id": data.order_id,
                        "num": api.money,//所需金额（单位元）
                        "openid": Main.OPEN_ID,
                        "subject": name,//商品标题
                        "detail": desc,//商品内容
                        "ext": "",//透传参数
                        "rid": rid,//充值档id
                        "paySafecode": data.paySafecode,//1758平台
                    };

                    window["ptest_pay"](cd);*/
                    break;
            }
        };
        GameProxy.prototype.recharge_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://没有对应的充值档
                    str = mx.Lang.p0010;
                    break;
                case 1://充值成功
                    this.daily_pay += Number(data.num);
                    this.total_pay += Number(data.num);
                    this.channel_rcharge(data);
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 2, "add": Number(data.num), "fresh": true });
                    return;
                case 3://限购一次
                    str = mx.Lang.p0011;
                    break;
                case 4://不在时间内
                    str = mx.Lang.p0013;
                    break;
                case 5://余额不足，玩吧需要购买星星
                    if (mx.AppConfig.MXTag == "wb") {
                        var num = Number(data.cost) - Number(data.score);
                        window["ptest_pay"](num);
                    }
                    else if (mx.AppConfig.MXTag == "wxgame") {
                        var hd_num = this.get_chongzhi_num(data.d);
                        var pay_info = {};
                        pay_info['balance'] = data.balance;
                        pay_info['money'] = hd_num / 10;
                        pay_info['id'] = data.id;
                        window['pay'](pay_info);
                    }
                    return;
                case 2://生成订单失败
                    str = mx.Lang.r0037;
                    break;
                case -1://玩吧token过期
                    if (mx.AppConfig.MXTag == "wb") {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.GAME_LOGOUT,
                                "sdata_ok": true,
                                "param": mx.Lang.neterror5
                            }
                        });
                    }
                    break;
                case 6:
                    str = mx.Lang.nhkq005;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.frecharge_cb = function (data) {
            var str;
            switch (data.state) {
                case 4://成功，给首充礼包
                    return;
                case 1://不是首充
                    str = mx.Lang.p0045;
                    break;
                case 2://充值成功，钻没加上
                    str = mx.Lang.p0046;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.init_vip_libao = function (data) {
            this.user_vip_libao = data.lq;
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ShopAlert.S_NAME);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.VIPTeQuanView.S_NAME });
        };
        GameProxy.prototype.vip_libao_cb = function (data) {
            var str;
            switch (data.state) {
                case 3://成功
                    this.user_vip_libao.push(data.vip);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.VIPTeQuanView.S_NAME });
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIPLIBAO, "id", data.vip);
                    var arr = [];
                    arr.push({
                        "type": 2,
                        "id": 1,
                        "shuliang": Number(api.reward2)
                    });
                    arr.push({
                        "type": 1,
                        "id": 1,
                        "shuliang": Number(api.reward3)
                    });
                    this.new_cloth = [];
                    if (String(api.reward1) != "0") {
                        var cloth = String(api.reward1).split("|");
                        for (var j in cloth) {
                            arr.push({
                                "type": 9,
                                "id": Number(cloth[j]),
                                "shuliang": 1
                            });
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.PRewardAlert.S_NAME,
                        "param": arr
                    });
                    return;
                case 1://等级不够
                    str = mx.Lang.p0021;
                    break;
                case 2://已经领取过了
                    str = mx.Lang.p0014;
                    break;
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.lingqu_sc_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://未充值
                    str = mx.Lang.r0015;
                    break;
                case 1:
                    this.user_sc = 2;
                    this.last_pay = true;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT, "scry");
                    if (data.feizi) {
                        var reward = [{ "item_id": 2018, "num": 1 }]; //速孕丹
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        pProxy.add_item(reward);
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        pproxy.add_new_fz(data.feizi); //伴读
                        if (pproxy.res_ltp) {
                            pproxy.res_ltp.num += 10;
                            pProxy.set_item_num(2000, pproxy.res_ltp.num);
                        }
                        var awards = [];
                        var rewards = data.awards;
                        for (var inx in data.awards) {
                            if (data.awards[inx]['type'] == 7) {
                                awards = data.awards[inx];
                                break;
                            }
                        }
                        rewards.splice(3, 1); //去掉侍从
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.XXiuHeroAlert.S_NAME,
                            "param": {
                                "id": awards.id,
                                "type": awards.type,
                                "num": awards.shuliang,
                                "notice": mx.MX_NOTICE.POP_VIEW,
                                "senddata": {
                                    "name": mx.AVGView.S_NAME,
                                    "param": {
                                        "type": "ry2",
                                        "awards": rewards,
                                    }
                                },
                            }
                        });
                    }
                    else {
                        var hero = data.awards[0];
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.XXiuHeroAlert.S_NAME,
                            "param": {
                                "id": hero.id,
                                "type": hero.type,
                                "num": hero.shuliang,
                            }
                        });
                    }
                    return;
                case 2://已领取
                    str = mx.Lang.p0014;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.buy_jijin_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://vip  没有达到3
                    str = mx.Lang.hd018;
                    break;
                case 1://已经购买过基金
                    str = mx.Lang.hd017;
                    break;
                case 2://元宝不足
                    str = mx.Lang.p0008;
                    break;
                case 3://购买成功
                    str = mx.Lang.hd023;
                    this.user_jijin = 0;
                    this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.KFJJView.S_NAME });
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kk004 });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.lq_jijin_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://等级未达到
                    str = mx.Lang.hd024;
                    break;
                case 2://没有购买基金
                    str = mx.Lang.hd019;
                    break;
                case 3://该等级已经领取过
                    str = mx.Lang.hd020;
                    break;
                case 4://之前有未领取的礼包
                    str = mx.Lang.hd021;
                    break;
                case 5://成功
                    this.user_jijin = Number(data.key_id);
                    if (this.user_jijin == 7) {
                        this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT, "kfjz");
                    }
                    this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.KFJJView.S_NAME });
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.KFJJAlert.S_NAME, "param": { "state": "success", "id": this.user_jijin - 1 } });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.check_new = function () {
            if (this.new_cloth.length) {
                var cloth = this.new_cloth.shift();
                var obj = {
                    "id": Number(cloth),
                    "next": true
                };
                var p_d = {
                    "name": mx.ClothDetailView.S_NAME,
                    "param": obj
                };
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        GameProxy.prototype.init_daytask_info = function (data) {
            this.day_task_info = mx.Tools.arr2obj(data.list, "id");
            this.server_day_time = Number(data.time);
            this.client_day_time = Math.floor(new Date().getTime() / 1000); //当前时间戳,只要不手动调时间，获取的时间戳和时区无关
            this.check_task_lq();
        };
        GameProxy.prototype.daytask_award_cb = function (data) {
            var str;
            switch (data.state) {
                case 3://成功
                    if (data.act_id < 4) {
                        var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
                        this.server_day_time = this.server_day_time + now_time - this.client_day_time;
                        this.client_day_time = now_time;
                        this.day_task_info[1].lq = 1; //修改当前任务为已完成
                    }
                    else {
                        this.day_task_info[data.act_id].lq = 1; //修改当前任务为已完成
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskReward.S_NAME,
                        "param": {
                            "type": "day",
                            "id": data.act_id,
                        }
                    });
                    this.check_task_lq();
                    return;
                case 1://任务未达成
                    str = mx.Lang.t0006;
                    break;
                case 2://已经领取过了
                    str = mx.Lang.p0014;
                    if (data.act_id < 4) {
                        this.day_task_info[1].lq = 1; //修改当前任务为已完成
                    }
                    else {
                        this.day_task_info[data.act_id].lq = 1; //修改当前任务为已完成
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        //检测未领取每日任务
        GameProxy.prototype.check_task_lq = function () {
            for (var k in this.day_task_info) {
                var d = this.day_task_info[k];
                if (d.lq == 2 && Number(d.id) != 4) {
                    this.set_tishi('daytask', true);
                    return;
                }
            }
            this.set_tishi('daytask', false);
        };
        //每日任务完成检测
        GameProxy.prototype.daytask_finish = function (id, num) {
            if (num === void 0) { num = 1; }
            var info = this.day_task_info;
            if (!info || !info[id]) {
                return;
            }
            if (info[id].lq > 0) {
                return;
            }
            if (id == 4) {
                info[id].lq = 2;
                this.set_tishi('daytask', true);
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", id);
                if (info[id].cond >= 0) {
                    info[id].cond = Number(info[id].cond) + num;
                    if (api && api.finish_cond > 0 && api.finish_cond <= info[id].cond) {
                        info[id].lq = 2;
                        this.set_tishi('daytask', true);
                    }
                }
            }
        };
        GameProxy.prototype.init_maintask_info = function (data) {
            this.main_task_info = mx.Tools.arr2obj(data.info, "task_id");
            var task_data = { "task": this.tishi_data.task };
            this.sendNotification(mx.MX_NOTICE.OPEN_TASK, task_data, mx.MainScreen.S_NAME);
            var spt = mx.AppConfig.check_not_support("share");
            if (!spt) {
                var pproxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
                if (data.sj) {
                    pproxy.wb_share_sj = data.sj;
                }
                else {
                    pproxy.wb_share_sj = [];
                    pproxy.wb_share_sj = null;
                    pproxy.wb_share_chufa = false;
                }
                //元宝相关提示
                this.yb_biaoji = {
                    'nuli': data.nuli,
                    'arr': data.arr
                };
            }
        };
        GameProxy.prototype.task_story_cb = function (data) {
            if (data.state == 1) {
                this.task_id = 1;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_MAINTASK_INFO, "skip": true });
            }
        };
        GameProxy.prototype.maintask_award_cb = function (data) {
            var str;
            switch (data.state) {
                case 4://成功
                    delete this.main_task_info[data.act_id];
                    var cd = data.task;
                    if (cd) {
                        this.main_task_info[cd.task_id] = cd;
                    }
                    var gproxy = this.facade.retrieveProxy(GameProxy.NAME);
                    var k0 = void 0;
                    var klq = false;
                    for (var k in this.main_task_info) {
                        if (!k0) {
                            k0 = k;
                        }
                        var tsk = this.main_task_info[k];
                        if (tsk.state == 1) {
                            klq = true;
                            gproxy.set_tishi('task', [tsk.task_id, tsk.state]);
                            break;
                        }
                    }
                    if (!klq) {
                        var tsk = k0 ? this.main_task_info[k0] : null;
                        gproxy.set_tishi('task', [tsk.task_id, tsk.state]);
                    }
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.OPEN, "type", 1, "param", data.act_id);
                    if (api) {
                        var modular = api.fun;
                        if (this.user_kq.indexOf(modular) < 0) {
                            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                            dproxy.kaiqi.push(Number(api.id));
                            this.user_kq.push(modular);
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskReward.S_NAME,
                        "param": {
                            "type": "main",
                            "id": data.act_id,
                        }
                    });
                    var task_data = { "task": this.tishi_data.task };
                    this.sendNotification(mx.MX_NOTICE.OPEN_TASK, task_data, mx.MainScreen.S_NAME); //刷新主线任务图标
                    if (mx.MX_COMMON.IN_GUIDE && Number(data.act_id) == 1) {
                        this.sendNotification(mx.MX_NOTICE.COMP_GUIDE); //debug
                    }
                    return;
                case 3://任务未达成
                    str = mx.Lang.t0006;
                    break;
                case 2://已经领取过了
                    str = mx.Lang.p0014;
                    break;
                case 1://未开启
                    str = mx.Lang.t0007;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.set_task_id = function (num) {
            this.task_id = num;
        };
        GameProxy.prototype.check_task_id = function () {
            if (this.task_id) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.TaskView.S_NAME,
                    "param": { "type": "main" },
                });
                this.set_task_id(0);
            }
        };
        ;
        //提示数据处理
        GameProxy.prototype.init_tishi_data = function (data) {
            for (var k in data.flags) {
                this.tishi_data[k] = data.flags[k];
            }
            if (this.tishi_data.qqqun && Number(this.user_lv) >= mx.MX_COMMON.JIAQUN_YOUJIAN) {
                this.tishi_data.mail = true;
            }
            var aproxy = this.facade.retrieveProxy(mx.ActyProxy.NAME);
            this.daily_pay = Number(data.flags.kf_act.daily_pay) || 0;
            this.total_use = Number(data.flags.kf_act.total_use) || 0;
            this.total_pay = Number(data.flags.kf_act.total_pay) || 0;
            this.tishi_data.acty = aproxy.acty_tishi;
            this.facade.sendNotification(mx.MX_NOTICE.NEW_TISHI_MSG);
            if (Number(this.tishi_data['lixian']) == 1) {
                this.facade.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
            }
        };
        GameProxy.prototype.set_tishi = function (type, state) {
            if (type == "shouli") {
                var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                fproxy.shouli_flag = state;
                this.tishi_data[type] = state;
                return;
            }
            this.tishi_data[type] = state;
            if (this.tishi_data.qqqun && Number(this.user_lv) >= mx.MX_COMMON.JIAQUN_YOUJIAN) {
                this.tishi_data.mail = true;
            }
            this.facade.sendNotification(mx.MX_NOTICE.NEW_TISHI_MSG);
        };
        GameProxy.prototype.fresh_menu_tishi = function () {
            var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var xproxy = (this.facade.retrieveProxy(mx.XXiuProxy.NAME));
            var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
            var tproxy = (this.facade.retrieveProxy(mx.TempleProxy.NAME));
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            var tishi = this.tishi_data;
            tishi['mnan'] = hproxy.check_hero_tishi();
            if (typeof xproxy.ybcd != "undefined") {
                tishi['xuxiu'] = xproxy.ybcd <= 0 || (xproxy.ybicd <= 0 && xproxy.ybimf > 0);
            }
            var gift_flag = false;
            for (var i in fproxy.shouli_flag) {
                if (fproxy.shouli_flag[i]) {
                    if (Number(i) != 1) {
                        gift_flag = true;
                    }
                    break;
                }
            }
            tishi['shequn'] = this.tishi_data['f_apply'] || gift_flag; //fproxy.list5[1] && fproxy.list5[1][0];
            var tflag = false;
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.TAIMIAO);
            if (Number(this.user_xlv) < apis.length && Number(this.user_xlv) < 12) {
                var need_lv = Number(apis[Number(this.user_xlv)].limit);
                if (need_lv <= Number(this.user_lv)) {
                    tflag = true; //有可以进行的考核
                }
            }
            tproxy.temple_flag = tishi['risk'] = false; //tflag || tproxy.can_jibai || pproxy.tujian_tishi;
        };
        GameProxy.prototype.change_touxiang = function (data) {
            var str;
            switch (data.state) {
                case 0://该头像未解锁
                    str = mx.Lang.tx022;
                    break;
                case 1://替换成功
                    str = mx.Lang.tx023;
                    if (this.user_avatar == "ztou" || this.user_avatar == "shps") {
                        // view.tx.source = "tx78_" + gProxy.user_avatar + "_png";
                    }
                    else {
                        this.user_avatar = data.avatar_id;
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_AVATAR);
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.get_avatar = function (data) {
            //this.ex_avatar = data.ex_avatar || [];
        };
        GameProxy.prototype.set_wanbalibao = function (data) {
            this.wanbalibao_data = data;
        };
        GameProxy.prototype.get_wanbalibao = function () {
            return this.wanbalibao_data;
        };
        GameProxy.prototype.check_time_tick = function (data) {
            if (this.yb_biaoji) {
                if (this.yb_biaoji.nuli[1] > 0) {
                    this.yb_biaoji.nuli[1] -= data.delay;
                }
            }
            if (this.avatime_over) {
                this.check_avatar();
            }
            if (this.nhkq_data) {
                for (var i = 0; i < 3; ++i) {
                    if (this.nhkq_data.res[i] > 0) {
                        this.nhkq_data.res[i] -= data.delay;
                    }
                }
            }
            if (this.zlcb_flag) {
                var cd = data.delay;
                var cold = this.zlcb_res;
                if (cd && typeof cold != "undefined" && cold != null) {
                    if (cold > 0) {
                        this.zlcb_res -= cd;
                    }
                    else if (cold == 0) {
                        this.zlcb_res = -1;
                        if (cold < 0) {
                            return;
                        }
                    }
                }
                this.sendNotification(mx.MX_NOTICE.FRESH_TIME, null, "zlcb");
            }
        };
        GameProxy.prototype.check_avatar = function () {
            var now_time = Math.ceil(new Date().getTime() / 1000);
            if (now_time >= this.avatime_over) {
                this.user_avatar = this.user_avatar0;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CHECK_AVATAR
                });
                this.avatime_over = NaN;
                this.sendNotification(mx.MX_NOTICE.FRESH_TIME, 0, "avatar");
            }
            else {
                this.sendNotification(mx.MX_NOTICE.FRESH_TIME, this.avatime_over - now_time, "avatar");
            }
        };
        GameProxy.prototype.set_avatar = function (data) {
            if (typeof data.time == "undefined") {
            }
            else {
                var now_time = Math.ceil(new Date().getTime() / 1000);
                this.avatime_over = now_time + data.time;
                switch (data.type) {
                    case '1':
                        if (this.user_avatar != 'ztou') {
                            this.user_avatar0 = this.user_avatar;
                            this.user_avatar = 'ztou';
                        }
                        break;
                    case '2':
                        if (this.user_avatar != 'shps') {
                            this.user_avatar0 = this.user_avatar;
                            this.user_avatar = 'shps';
                        }
                        break;
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_AVATAR);
        };
        GameProxy.prototype.share_succ = function (data) {
            this.sendNotification(mx.MX_NOTICE.SHARE_SUCC);
        };
        GameProxy.prototype.init_cover = function (data) {
            if (data.isUsed) {
                this.cover_duang = false;
                this.cover_hongdian = true;
            }
            else {
                this.cover_duang = true;
                this.cover_hongdian = false;
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
        };
        GameProxy.prototype.lq_cover = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0014;
                    break;
                case 1:
                    str = mx.Lang.p0136;
                    break;
                case 2:
                    this.qz_cover = 1;
                    this.cover_duang = false;
                    this.cover_hongdian = false;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.init_wb_vip = function (data) {
            this.user_wanba_vip = Number(data.wanba_vip) || 0;
            this.user_wanba_vip_lq = Number(data.lq);
            this.user_wanba_vip_goumai = data.goumai || [];
        };
        GameProxy.prototype.lq_wb_vip = function (data) {
            var str;
            switch (data.state) {
                case 0://
                    str = mx.Lang.wbvip01;
                    break;
                case 1://
                    str = mx.Lang.err01;
                    break;
                case 2://
                    str = mx.Lang.wbvip03;
                    break;
                case 3://
                    str = mx.Lang.p0021;
                    break;
                case 4://
                    str = mx.Lang.wbvip02;
                    break;
                case 5://
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 6://
                    this.user_wanba_vip_goumai.push(Number(data.key_id));
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.WANBAVIP, "leixing", 2, "vip", this.user_wanba_vip);
                    if (Number(api.key_id) == Number(data.key_id)) {
                        this.user_wanba_vip_lq = 1;
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameProxy.prototype.init_hmdan_info = function (data) {
            this.hmd_info = [];
            this.hmd_info = data.black_user;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HmdanView.S_NAME,
            });
        };
        GameProxy.prototype.delete_hmd_info = function (user_id) {
            var idx = -1;
            for (var i in this.hmd_info) {
                var unit = this.hmd_info[i];
                if (Number(unit.user_id) == Number(user_id)) {
                    idx = Number(i);
                    break;
                }
            }
            this.hmd_info.splice(idx, 1);
            this.sendNotification(mx.MX_NOTICE.HEIMINGDAN);
        };
        GameProxy.prototype.jubao_cb = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0: //成功
                case 3:
                    mx.Tools.add_hmdan(data.to_id, mx.Lang.hmdan11);
                    this.sendNotification(mx.MX_NOTICE.PINGBI_NEWS);
                    break;
                case 1://不存在该用户
                    str = mx.Lang.hmdan08;
                    break;
                case 2://举报内容为空
                    str = mx.Lang.hmdan09;
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        GameProxy.prototype.init_wanba_pet = function (data) {
            for (var k in data.lq) {
                this.wbpet_lq.push(Number(data.lq[k]));
            }
            this.check_wbpet();
        };
        GameProxy.prototype.wanba_pet_lq = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.p0045;
                    break;
                case 2:
                    str = mx.Lang.hd026;
                    break;
                case 3:
                    this.wbpet_lq.push(Number(data.act_id));
                    this.check_wbpet();
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Lang.wbpet04
                        }
                    });
                    return;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        GameProxy.prototype.check_wbpet = function () {
            var info = this.day_task_info;
            for (var k = 1; k <= 3; k++) {
                if (this.wbpet_lq.indexOf(k) >= 0) {
                    this.wbpet_hongdian[k] = 2;
                }
                else {
                    switch (k) {
                        case 1:
                            this.wbpet_hongdian[1] = 1;
                            break;
                        case 2:
                            this.wbpet_hongdian[2] = !info[5] || Number(info[5].cond) >= 10 ? 1 : 0;
                            break;
                        case 3:
                            this.wbpet_hongdian[3] = !info[23] || Number(info[23].cond) >= 3 ? 1 : 0;
                            break;
                    }
                }
            }
        };
        GameProxy.prototype.check_qifu = function (data) {
            this.qifu_hongdian = false;
            this.qifu_data = data;
            var qifu_api = mx.ApiTool.getAPI(mx.MX_APINAME.QIFULEVEL);
            if (Number(data.qifu) <= qifu_api.length - 1) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.QIFULEVEL, "level", Number(data.qifu) + 1);
                if (Number(data.pay_today) >= Number(api.pay_num)) {
                    this.qifu_hongdian = true;
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
        };
        GameProxy.prototype.qifu_cb = function (data) {
            if (Number(data.state)) {
                this.qifu_data.qifu = Number(data.qifu);
                this.check_qifu(this.qifu_data);
                this.qifu_log.unshift({
                    "qifu": Number(data.qifu),
                    "name": this.user_name,
                    "vip": this.user_vip,
                    "lable": data.lable,
                });
                if (this.qifu_log.length > 8) {
                    this.qifu_log.pop();
                }
                this.check_qianyu(1);
                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                this.qifu_award = data.awards;
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.QiFuResAlert.S_NAME });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.qifu004 });
            }
        };
        GameProxy.prototype.init_qifu = function (data) {
            this.qifu_log = data.data || [];
            this.check_qianyu();
        };
        GameProxy.prototype.check_qianyu = function (flag) {
            var rand_arr = [1, 1, 2, 3, 5];
            for (var k in this.qifu_log) {
                if (!this.qifu_log[k].qianyu) {
                    var laber_arr = this.qifu_log[k].lable.split("|");
                    this.qifu_log[k].qianyu = "qianyu" + rand_arr[laber_arr[0]] + "_" + laber_arr[1] + "_png";
                    this.qifu_log[k].res = "fuqian" + rand_arr[laber_arr[0]] + "_png";
                    if (flag) {
                        this.target_log = this.qifu_log[k];
                    }
                }
            }
        };
        GameProxy.prototype.init_nhkq_info = function (data) {
            this.nhkq_data = null;
            this.nhkq_data = {
                'res': data.res,
                'lq': data.lq,
                'next': data.next
            };
            if (this.show_nhkq) {
                this.show_nhkq = false;
                for (var i = 0; i < 3; ++i) {
                    if (Number(this.nhkq_data.res[i]) > 0) {
                        if (i != 2) {
                            var day = mx.Tools.format_second2(data.deadline).split('天')[0];
                            if (Number(day) < (i == 0 ? 330 : 30)) {
                                this.show_nhkq = true;
                                break;
                            }
                        }
                    }
                    else {
                        this.show_nhkq = true;
                        break;
                    }
                }
            }
            if (this.nhkq_flag) {
                this.sendNotification(mx.MX_NOTICE.NHKQ_CZ_SUC);
                this.nhkq_flag = false;
            }
        };
        GameProxy.prototype.lq_nhkq_award = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.nhkq003;
                    break;
                case 1:
                    str = mx.Lang.p0045;
                    break;
                case 2:
                    if (typeof data.next != 'undefined' && Number(data.key_id) == 2) {
                        this.nhkq_data.next = data.next;
                    }
                    this.nhkq_data.lq[Number(data.key_id) - 1] = 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        //获取应充值的最小档位
        GameProxy.prototype.get_chongzhi_num = function (d) {
            var pay_arr = [60, 300, 600, 980, 1980, 3280, 6480, 19980];
            var num = 0;
            for (var i = 0; i < pay_arr.length; i++) {
                if (pay_arr[i] > d) {
                    num = pay_arr[i];
                    break;
                }
            }
            if (!num) {
                num = 19980;
            }
            return num;
        };
        GameProxy.prototype.sdk_lq = function (data) {
            var str;
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.p0014;
                    break;
                case 1:
                    switch (Number(data.key_id)) {
                        case 1:
                            this.tishi_data.desktop = false;
                            break;
                        case 2:
                            this.tishi_data.shouqi = false;
                            break;
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, null, mx.AddTableView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    break;
                case 2:
                    str = mx.Lang.err01;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        GameProxy.prototype.report_zhanli = function (data) {
            //console.log(data);
        };
        GameProxy.NAME = "GameProxy";
        return GameProxy;
    }(puremvc.Proxy));
    mx.GameProxy = GameProxy;
    __reflect(GameProxy.prototype, "mx.GameProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GameProxy.js.map
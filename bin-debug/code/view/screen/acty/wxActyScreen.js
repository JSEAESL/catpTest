/**
 *   @author wxw qianjun
 *   @date 2017.11.7
 *   @desc 新活动界面
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
    var WxActyScreen = (function (_super) {
        __extends(WxActyScreen, _super);
        function WxActyScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.typename = ["tuijian", "xianshi", "changqi", "libao"]; //活动类型名称
            _this.c_type = [1, 2, 3, 4]; //类型按钮组
            _this.curr_type = 1;
            //长期活动 
            _this.changqiname = ["qrlogin_png", "actylevel_png", "actyyongjiu_png", "nhkaquan_png", "miyouzhengji_png"];
            _this.changqipop = ['', '', '', mx.NvHuangKaQuanView.S_NAME];
            _this.changqitype = [1, 2, 997, 0, 6];
            _this.changqicolor = { '1': 0x4C416A, '2': 0x7559A6, '997': 0x4C416A };
            //限时活动
            _this.xianshiname = [];
            _this.xianshitype = [];
            _this.xianshipop = [];
            //推荐活动
            //暂时屏蔽女皇祈福，归朝奉贡
            // private tuijianname: string[] = ["kfjijin_png", "nhkaquan_png", "nhqifu_png", "scjiangli_png", "gcfenggong_png", "hyaojshi_png", "ryxeczhi_png"];
            _this.tuijianname = []; // "scjiangli_png", null "hyaojshi_png", "ryxeczhi_png" nhkaquan_png hyaojshi_png
            _this.tuijianpop = []; //[, NvHuangKaQuanView.S_NAME, QiFuAlert.S_NAME, ShouChongAlert.S_NAME, , YHJSScreen.S_NAME, ShouChongLastAlert.S_NAME];
            return _this;
        }
        WxActyScreen.mx_support = function () {
            return ["assets.wxacty", "api.ACTHUODONG", "data.2812", "data.2829", "data.2802"];
        };
        //活动 1七日登录 2等级冲榜 3累计充值 4每日充值
        WxActyScreen.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        Object.defineProperty(WxActyScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        WxActyScreen.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.tab_list.selectedIndex = this.curr_type - 1;
            view.dhm_et.text = mx.Lang.hd012;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dhm_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.dhm_et.addEventListener(egret.Event.CHANGE, this.check_str, this);
            view.dhm_et.addEventListener(egret.Event.FOCUS_OUT, this.check_end, this);
            view.dhmlqu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lqshihe_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.registerMediator(new mx.WxActyScreenMediator(this));
            this.fresh_view();
            this.fresh_tab();
        };
        WxActyScreen.prototype.check_end = function (e) {
            var _this = this;
            var text = e.currentTarget.text;
            var facade = mx.ApplicationFacade.getInstance();
            if (text != '') {
                mx.MGTool.get_str(6, text).then(function (value) {
                    _this.dhm_et.text = value;
                }, function () {
                    _this.dhm_et.text = '';
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc001 });
                });
            }
        };
        WxActyScreen.prototype.check_str = function (e) {
            var text = e.currentTarget.text;
        };
        WxActyScreen.prototype.fresh_view = function (data) {
            if (this.curr_type == 1) {
                this.fresh_tuijian();
            }
            else if (this.curr_type == 2) {
                this.fresh_xianshi();
            }
            else if (this.curr_type == 3) {
                this.fresh_changqi();
            }
            this.fresh_list();
        };
        WxActyScreen.prototype.fresh_tuijian = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = this.proxy;
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            /*=======================推荐活动 需要及时刷新======================*/
            this.tuijianname = [];
            this.tuijianpop = [];
            //开服基金
            if (Number(gproxy.user_jijin) < 7) {
                this.tuijianname.push("kfjijin_png");
                this.tuijianpop.push(mx.KFJJView.S_NAME);
            }
            //首充
            if (Number(gproxy.user_sc) != 2) {
                this.tuijianname.push("scjiangli_png");
                this.tuijianpop.push(mx.ShouChongAlert.S_NAME);
            }
            //狐妖
            if (gproxy.huyao) {
                this.tuijianname.push("hyaojshi_png");
                this.tuijianpop.push(mx.YHJSScreen.S_NAME);
            }
            //战力冲榜
            if (gproxy.zlcb_flag) {
                this.tuijianname.push("zlcbhdong_png");
                this.tuijianpop.push(mx.ZLCBPaiHangAlert.S_NAME);
            }
            //周末双倍活动(五种形式)
            if (aproxy.weekend_flag >= 1) {
                //暂无资源
            }
            //小额充值
            if (gproxy.last_pay) {
                this.tuijianname.push("ryxeczhi_png");
                this.tuijianpop.push(mx.ShouChongLastAlert.S_NAME);
            }
            //归朝纳贡
            if (Number(gproxy.tishi_data['lixian']) == 1) {
                this.tuijianname.push("gcfenggong_png");
                this.tuijianpop.push(mx.LixianView.S_NAME);
            }
        };
        WxActyScreen.prototype.fresh_xianshi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = this.proxy;
            this.xianshiname = [];
            this.xianshitype = [];
            /*=======================限时活动 只需刷新一次======================*/
            //累计充值
            if (aproxy.acty_time['3']) {
                //无资源
                // this.xianshiname.push();
                // this.xianshitype.push();
            }
            //每日充值
            if (aproxy.acty_time['4']) {
                this.xianshiname.push("mrchongzhi_png");
                this.xianshitype.push('4');
            }
            //累积消耗
            if (aproxy.acty_time['5']) {
                this.xianshiname.push("ljxiaohao_png");
                this.xianshitype.push('5');
            }
            //上龙国选秀
            if (aproxy.acty_time['19']) {
            }
            //封印有礼
            if (aproxy.acty_time['21']) {
            }
            //家族消费
            if (aproxy.acty_time['23']) {
            }
            //无双兑换
            if (aproxy.acty_time['25']) {
            }
            //财源滚滚
            if (aproxy.acty_time['27']) {
            }
            //多宝祥云伞
            if (aproxy.acty_time['28']) {
            }
        };
        WxActyScreen.prototype.fresh_changqi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = this.proxy;
            /*=======================长期活动 领取完全部奖励后消失======================*/
            //待服务端告知后对接
        };
        WxActyScreen.prototype.fresh_tab = function () {
            var view = this;
            var item_arr = [];
            for (var k in this.typename) {
                var type = this.c_type[k];
                if (this.typename[k] != "") {
                    item_arr.push({
                        "type": type,
                        "word": this.typename[k] + '_png',
                        "word2": this.typename[k] + '2_png',
                    });
                }
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
        };
        WxActyScreen.prototype.tab_click = function (e) {
            this.curr_type = e.itemIndex + 1;
            this.fresh_view();
        };
        WxActyScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
            switch (e.currentTarget) {
                case view.dhmlqu_b:
                    var key = view.dhm_et.text;
                    if (key.length == 0 || key == mx.Lang.hd012) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                            "text": key = mx.Lang.hd013
                        });
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_CDKEY, 'code': key
                    });
                    break;
                // case view.gongting_p:
                //     facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
                //         "t": MX_NETS.CS_INIT_SHIHE
                //     });
                //     break;
                case view.lqshihe_b:
                    var now_tl = dproxy.get_currency("tili");
                    ////console.log(now_tl);
                    dproxy.shihe_flag = false;
                    if (!view.tl_sp.value) {
                        if (dproxy.shihe_tili == 0) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                                "text": key = mx.Lang.p0135
                            });
                        }
                        return;
                    }
                    if (view.tl_sp.value + now_tl <= 2000) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_QUCHU_SHIHE, 'num': view.tl_sp.value
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { 't': mx.MX_NETS.CS_QUCHU_SHIHE, 'num': view.tl_sp.value },
                                "param": mx.Tools.format(mx.Lang.p0131, now_tl),
                            }
                        });
                    }
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        WxActyScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dhm_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.dhmlqu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lqshihe_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dhm_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.dhm_et.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            view.dhm_et.removeEventListener(egret.Event.FOCUS_OUT, this.check_end, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.WxActyScreenMediator.NAME);
        };
        WxActyScreen.prototype.start_edit = function (e) {
            if (e.currentTarget.text == mx.Lang.hd012) {
                e.currentTarget.text = '';
            }
        };
        WxActyScreen.prototype.check_acty_time = function (act_id) {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            if (aproxy.acty_time[act_id]) {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, WxActyScreen.S_NAME);
            }
            else {
                aproxy.target_acty = 0;
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0013 });
            }
        };
        WxActyScreen.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var view = this;
            var item_arr = [];
            var name;
            var type;
            switch (this.curr_type) {
                case 1:
                    this.dh_g.visible = false;
                    name = this.tuijianname;
                    for (var i = 0; i < name.length; i++) {
                        if (name && name[i]) {
                            var obj = {
                                "popname": this.tuijianpop[i],
                                "curr_type": this.curr_type,
                                "bg": name[i],
                                "desc": mx.Lang.hd004[i],
                                'name': name[i]
                            };
                            if (name[i] == "ryxeczhi_png") {
                                obj['textcolor'] = "0x347420";
                            }
                            item_arr.push(obj);
                        }
                    }
                    break;
                case 2:
                    //由于限时活动为空，为了暂时显示方便，绕过在活动时间内的判断
                    this.dh_g.visible = false;
                    name = this.xianshiname;
                    type = this.xianshitype;
                    for (var i = 0; i < name.length; i++) {
                        if (name && name[i] && name[i] != '') {
                            item_arr.push({
                                "curr_type": this.curr_type,
                                "bg": name[i],
                                "time": mx.Lang.hd008,
                                "acty_type": Number(type[i]),
                                "desc": mx.Lang.hd004[Number(type[i]) - 1],
                                'name': name[i]
                            });
                        }
                    }
                    break;
                case 3:
                    this.dh_g.visible = false;
                    name = this.changqiname;
                    type = this.changqitype;
                    for (var i = 0; i < name.length; i++) {
                        if (name && name[i] && name[i] != '') {
                            item_arr.push({
                                "curr_type": this.curr_type,
                                "bg": name[i],
                                "acty_type": Number(type[i]),
                                "desc": mx.Lang.hd004[Number(type[i]) - 1],
                                'name': name[i],
                                "textcolor": this.changqicolor[type[i]],
                                "popname": this.changqipop[i]
                            });
                        }
                    }
                    // let temp = this.proxy.acty_time;
                    // for (let i in temp) {
                    //     let unit = temp[i];
                    //     if (unit.id <= 5 || unit.id >= 15) {
                    //         let type = Number(unit.id);
                    //         let opensid = 999;
                    //         if (Number(unit.id) == 16) {//国庆签到特殊处理
                    //             if (window && window["mx_opensid"]) {
                    //                 opensid = window["mx_opensid"];
                    //             }
                    //             if (Main.SER_ID > opensid) {//后开服务器不开活动
                    //                 continue;
                    //             }
                    //         }
                    //         if (name && name[type - 1] && name[type - 1] != '') {
                    //             item_arr.push({
                    //                 "curr_type": this.curr_type,
                    //                 "bg": name[type - 1],
                    //                 "type": type,
                    //                 "time": Lang.hd005,
                    //                 "desc": Lang.hd004[type - 1],
                    //                 "textcolor": this.changqicolor[type - 1]
                    //             });
                    //         }
                    //         else {
                    //             continue;
                    //         }
                    //     }
                    // }
                    // if (this.curr_type == 3) {
                    //     item_arr.push({
                    //         "curr_type": this.curr_type,
                    //         "bg": this.changqiname[2],
                    //         "type": 997,
                    //         "time": Lang.hd005,
                    //         "desc": Lang.hd027
                    //     })
                    // }
                    break;
                case 4:
                    this.dh_g.visible = true;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_INIT_SHIHE
                    });
                    break;
                default:
                    break;
            }
            if (this.curr_type == 4) {
                view.ac_scro.visible = false;
            }
            else {
                view.ac_scro.visible = true;
            }
            if (item_arr.length != 0) {
                view.ac_list.itemRenderer = mx.ActyRender;
                view.ac_list.dataProvider = new eui.ArrayCollection(item_arr);
            }
            else {
                view.ac_list.itemRenderer = mx.ActyRender;
                view.ac_list.dataProvider = null;
            }
        };
        WxActyScreen.S_NAME = "WxActyScreen";
        return WxActyScreen;
    }(mx.BasicView));
    mx.WxActyScreen = WxActyScreen;
    __reflect(WxActyScreen.prototype, "mx.WxActyScreen");
})(mx || (mx = {}));
//# sourceMappingURL=wxActyScreen.js.map
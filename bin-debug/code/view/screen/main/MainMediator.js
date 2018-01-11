/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var MainMediator = (function (_super) {
        __extends(MainMediator, _super);
        function MainMediator(viewComponent) {
            var _this = _super.call(this, MainMediator.NAME, viewComponent) || this;
            _this.need_guide_g = false;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(MainMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        MainMediator.prototype.onRemove = function () {
            var view = this.view;
            egret.Tween.removeTweens(view.qryu_b);
            view.yd_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            view.shouqi_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.juqing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.palace_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.mnan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.task_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.task_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.view_list.dataProvider = null;
            view.view_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.view_click, this);
            view.acty_list.dataProvider = null;
            view.acty_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.view_click, this);
            // if (view.task_g.numChildren) {
            //     let task_ui: any = view.task_g.getChildAt(0);
            //     task_ui.on_remove();
            // }
            //this.clear_rui_g();
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
        };
        // private clear_rui_g() {
        //     let ui_g = this.view.rui_g;
        //     let ui_ln = ui_g.numChildren;
        //     for (let i = 0; i < ui_ln; i++) {
        //         let cui: any = ui_g.getChildAt(i);
        //         if (cui.on_remove) {
        //             cui.on_remove();
        //         }
        //         cui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.right_click, this);
        //     }
        //     let mf_g = this.view.mf_g;
        //     let mf_ln = mf_g.numChildren;
        //     for (let i = 0; i < mf_ln; i++) {
        //         let cui: any = mf_g.getChildAt(i);
        //         if (cui.on_remove) {
        //             cui.on_remove();
        //         }
        //         cui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.right_click, this);
        //     }
        // }
        MainMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.REMOVE_GUIDE,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.CHECK_NEWMODULAR,
                mx.MX_NOTICE.NEW_TISHI_MSG,
                //MX_NOTICE.FRESH_RIGHT,
                mx.MX_NOTICE.TABMENU_CREATED,
                mx.MX_NOTICE.WB_GIFT_SHOW,
                mx.MX_NOTICE.OPEN_TASK,
                mx.MX_NOTICE.NEW_XIAOHONGDIAN,
                mx.MX_NOTICE.FRESH_WB_SHARE,
                mx.MX_NOTICE.CHECK_MAIN_ALERT,
                mx.MX_NOTICE.PACK_ITEMS_BACK,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        MainMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    if (this.new_msg) {
                        this.new_msg = false;
                        this.init_top_list(); //刷新顶部和左部列表
                        this.init_left_list();
                    }
                    break;
                case mx.MX_NOTICE.CHECK_NEWMODULAR:
                    this.check_kaiqi();
                    break;
                case mx.MX_NOTICE.NEW_TISHI_MSG://新的提示消息
                    this.new_msg = true;
                    break;
                // case MX_NOTICE.FRESH_RIGHT:
                //     if (data == "tjzm") {
                //         if (window && window["OPEN_DATA"]) {
                //             let opd = window["OPEN_DATA"];
                //             if (opd.platform && opd.platform == 2) {//ios 收不到回调，暂时处理
                //                 this.tid = egret.setTimeout(() => {
                //                     if (window && window["create_shortcut"]) {
                //                         window["create_shortcut"](true);
                //                     }
                //                 }, this, 500);
                //             }
                //         }
                //     }
                //     break;
                case mx.MX_NOTICE.TABMENU_CREATED:
                    this.main_check_guide();
                    break;
                case mx.MX_NOTICE.WB_GIFT_SHOW://已打开玩吧礼包，检查引导和其他弹窗
                    this.main_check_guide();
                    this.check_alert();
                    break;
                case mx.MX_NOTICE.CHECK_MAIN_ALERT:
                    this.check_alert();
                    break;
                case mx.MX_NOTICE.OPEN_TASK:
                    var type = notification.getType();
                    if (type == mx.MainScreen.S_NAME) {
                        this.check_task_tishi();
                    }
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    gproxy.check_task_id();
                    break;
                case mx.MX_NOTICE.NEW_XIAOHONGDIAN:
                    this.check_tishi();
                    this.check_jijin();
                    break;
                case mx.MX_NOTICE.FRESH_WB_SHARE:
                    this.wb_show();
                    break;
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    if (data == "acty_hero") {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyBaiHuaMainAlert.S_NAME });
                    }
                    else if (data == "acty_yxd") {
                        var net1 = [
                            {
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11"
                            }
                        ];
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.YXDianScreen.S_NAME,
                            "param": { "net": net1 }
                        });
                    }
                    else if (data == "acty_xq") {
                        var proxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                        var lv = proxy.user_lv;
                        if (lv >= 20) {
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XQBYuanScreen.S_NAME);
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0098 });
                        }
                    }
                    else if (data == "acty_hzs") {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    }
                    break;
                case mx.MX_NOTICE.REMOVE_GUIDE:
                    this.init_top_list();
                    this.init_left_list();
                    this.check_tishi();
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.init_top_list();
                    this.init_left_list();
                    this.check_tishi();
                    break;
                default:
                    break;
            }
        };
        MainMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_m_hg":
                    var net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }, {
                            "t": mx.MX_NETS.CS_HG_SHIJIAN,
                            "type": 1
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case "s_m_rw":
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    gproxy.task_story_cb({ "state": 1 });
                    break;
                case "s_m_zs"://跳转到换装,重新包装消息
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
                    break;
                case "j_clx"://获得楚留香，打开英雄获得界面
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XXiuHeroAlert.S_NAME,
                        "param": {
                            "id": 1,
                        }
                    });
                    break;
                case "v_xxh_qd"://关闭获得英雄弹窗,并跳转到主页
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuHeroAlert.S_NAME);
                    break;
            }
        };
        MainMediator.prototype.init_left_list = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var tishi = gproxy.tishi_data;
            var view = this.view;
            var arr = mx.MX_COMMON.MAIN_VIEW.concat();
            var c_arr = [];
            view.main_show_tishi = false;
            for (var i = 0, ln = arr.length; i < ln; i++) {
                var cd = { "bg": arr[i] + "_png" };
                var show_tishi = false;
                switch (arr[i]) {
                    case "fszmian":
                        cd["ts"] = tishi.desktop ? "tishi_png" : null;
                        cd["pos"] = { "top": 0, "right": -20 };
                        show_tishi = tishi.desktop;
                        break;
                    case "sign":
                        cd["ts"] = tishi.qdao ? "tishi_png" : null;
                        cd["pos"] = { "top": 0, "right": -20 };
                        show_tishi = tishi.qdao;
                        break;
                    default:
                        cd["ts"] = tishi[arr[i]] ? "tishi_png" : null;
                        cd["pos"] = { "top": 0, "right": -20 };
                        show_tishi = tishi[arr[i]];
                        break;
                }
                if (show_tishi) {
                    view.main_show_tishi = true;
                }
                c_arr.push(cd);
            }
            if (view.show_b.rotation == 0 && view.main_show_tishi) {
                view.show_b.set_tsres("tishi_png", { "scaleY": -1, "top": 30, "right": -20 });
            }
            this.check_tishi();
            if (!mx.MX_COMMON.IN_GUIDE) {
                view.view_list.dataProvider = new eui.ArrayCollection(c_arr);
            }
            else {
                var guideproxy = this.facade.retrieveProxy(mx.GuideProxy.NAME);
                if (guideproxy.check_guide_by_key("m_bd")) {
                }
            }
        };
        // private fresh_task(task_data) {//主线任务图标
        //     let gproxy: GameProxy = <GameProxy><any>this.facade.retrieveProxy(GameProxy.NAME);
        //     let task_all_data = gproxy.main_task_info;
        //     let task_avg = task_all_data;
        //     task_data["task_data"] = task_avg;
        //     let view = this.view.task_g;
        //     let exist: any = view.getChildByName("task")
        //     if (exist) {
        //         exist.set_mdata_ui(task_data);
        //         exist.fresh_task_ui();
        //     } else {
        //         let rui = new MainrRUI("task", task_data);
        //         view.addChild(rui);
        //     }
        // }
        MainMediator.prototype.check_jijin = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (Number(gproxy.user_jijin) >= 7) {
                return;
            }
            var lv_arr = [15, 20, 30, 45, 60, 70, 80];
            var user_lv = gproxy.user_lv;
            var ts = user_lv >= lv_arr[Number(gproxy.user_jijin)];
            //let view = this.view.rui_g;
            //let num = view.numChildren;
            // for (let k = 0; k < num; k++) {
            //     let ssb: any = view.getChildAt(k);
            //     if (ssb.name == "kfjz") {
            //         ssb.set_tsres(ts ? 'tishi_png' : null,20);
            //         break;
            //     }
            // }
        };
        MainMediator.prototype.check_daytask = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.check_task_lq();
        };
        MainMediator.prototype.init_view = function () {
            var view = this.view;
            view.shouqi_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.juqing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.palace_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.mnan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.task_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.task_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.acty_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.view_click, this);
            view.view_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.view_click, this);
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            //let cproxy = <ClothesProxy><any>(this.facade.retrieveProxy(ClothesProxy.NAME));
            if (!gproxy.main_lh) {
                //let c_aid = cproxy.xxkid || 1001;
                var gdproxy = this.facade.retrieveProxy(mx.GuideProxy.NAME);
                var sinfo = gdproxy.slt_info || { "res": 41402 };
                view.xx_ui.set_lh(sinfo.res);
                view.xx_ui.bottom = 0;
            }
            else {
                view.xx_ui.bottom = 0;
                view.xx_ui.set_lh(gproxy.main_lh);
            }
            //let c_bid = cproxy.bjkid ||2009;
            //view.bj_ui.set_bjk(c_bid);
            gproxy.check_task_id();
            mx.Tools.check_version(gproxy.new_ver);
            var scoket = mx.WebTool.getInstance(); //打开聊天连接
            // this.check_daytask();
            // this.check_kaiqi();
            // this.init_left_list();
            // this.init_top_list();
            // this.show_wb();
            // this.check_tishi();
            if (mx.MX_COMMON.START_TD) {
                mx.MX_COMMON.START_TD = false;
                if (Main.TD_SHARE) {
                    mx.DataTool.getInstance().data_tool("FENXIANG_CLICK", {
                        "type": Main.TD_SHARE,
                        "new": "false"
                    });
                }
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.need_guide_g = true;
                    this.main_check_guide();
                }
                else {
                    view.yd_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
                }
            }
            this.check_daytask();
            this.check_kaiqi();
            this.init_left_list();
            this.init_top_list();
            this.show_wb();
            this.check_tishi();
            if (window && window["mx_gid"] && mx.MX_COMMON.SHOW_WB_GIFT) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_WANBA_GIFT,
                    "libao": window["mx_gid"]
                });
            }
            else {
                this.check_alert();
            }
        };
        MainMediator.prototype.show_wb = function () {
            var spt = mx.AppConfig.check_not_support("share");
            if (!spt) {
                this.wb_show();
                if (this.view.qryu_b.visible) {
                    mx.TweenTool.getInstance().get_tween(this.view.qryu_b, "btnshake", true);
                }
                this.view.qryu_b.addEventListener(egret.TouchEvent.TOUCH_END, this.btn_click, this);
            }
        };
        MainMediator.prototype.wb_show = function () {
            // let pproxy: PalaceProxy = <PalaceProxy><any>(this.facade.retrieveProxy(PalaceProxy.NAME));
            // if (pproxy.wb_share_sj) {
            //     this.view.qryu_b.visible = true;
            // } else {
            //     this.view.qryu_b.visible = false;
            // }
        };
        MainMediator.prototype.check_alert = function () {
            var debug = true;
            if (mx.MX_COMMON.IN_GUIDE || debug) {
                return;
            }
            //首充弹窗 - 没有领取过 && 支持本地存储
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (Number(gproxy.user_sc) != 2) {
                if (mx.Tools.check_user_locals(mx.MX_COMMON.MX_LS_SC)) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShouChongAlert.S_NAME });
                    return;
                }
            }
            //直购礼包 - 兼容充值跳出游戏其他充值没有单独界面和标记，不处理
            if (gproxy.check_zglb()) {
                this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
                return;
            }
            //添加到桌面 - 支持功能 && 没有添加过 && 支持本地存储
            if (!mx.AppConfig.check_not_support("addtable") && gproxy.tishi_data.desktop && mx.Tools.check_user_locals(mx.MX_COMMON.MX_TJ_ZM)) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AddTableView.S_NAME });
                return;
            }
            //QQ宠物专属任务 - 
            if (window && window["isQQCW"] && mx.Tools.check_user_locals(mx.MX_COMMON.MX_LS_QQCW)) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.WanBaPetAlert.S_NAME });
            }
        };
        MainMediator.prototype.main_check_guide = function () {
            if (mx.MX_COMMON.IN_GUIDE && this.need_guide_g && mx.MainTabMenuMediator.TAB_CREATED) {
                if (window && window["mx_gid"] && mx.MX_COMMON.SHOW_WB_GIFT) {
                }
                else {
                    ////console.log("main mediator get guide");
                    this.sendNotification(mx.MX_NOTICE.CHECK_GUIDE);
                }
            }
        };
        MainMediator.prototype.mx_test2 = function (event) {
            this.view.yd_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            this.need_guide_g = true;
            this.main_check_guide();
        };
        MainMediator.prototype.check_task_tishi = function () {
            var view = this.view;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var tishi = gproxy.tishi_data;
            var day_task_tishi = tishi['daytask'];
            var main_task_tishi = false;
            var tasks = gproxy.main_task_info;
            for (var i in tasks) {
                var task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", tasks[i].task_id);
                if (tasks[i].state == 1) {
                    if (task.step1_id == 0 || tasks[i].juqing == 1) {
                        main_task_tishi = true;
                        break;
                    }
                }
            }
            view.task_b.set_tsres(day_task_tishi || main_task_tishi ? "tishi_png" : null, { "top": 0, "right": -20 });
        };
        MainMediator.prototype.check_tishi = function () {
            var view = this.view;
            view.show_b.visible = view.banner_g.visible = !mx.MX_COMMON.IN_GUIDE;
            view.banner_g.visible = false;
            // if (MX_COMMON.IN_GUIDE) {
            //     let gproxy = <GuideProxy><any>this.facade.retrieveProxy(GuideProxy.NAME);
            //     if (gproxy.check_guide_by_key('xzwc')) {
            //         view.palace_b.visible = true;
            //     }
            //     if (gproxy.check_guide_by_key('m_xx')) {
            //         view.mnan_b.visible = true;
            //     }
            //     if (gproxy.check_guide_by_key('m_sczw')) {
            //         view.task_b.visible = true;
            //     }
            // }
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            //let hproxy: HeroProxy = <HeroProxy><any>(this.facade.retrieveProxy(HeroProxy.NAME));
            var tishi = gproxy.tishi_data;
            this.check_task_tishi();
            if (tishi['shouqi']) {
                if (!view.shouqi_g.numChildren) {
                    var shouqi = new mx.MainrRUI("sqtchu");
                    view.shouqi_g.addChild(shouqi);
                }
            }
            else {
                if (view.shouqi_g.numChildren) {
                    view.shouqi_g.removeChildren();
                }
                var shouqi = new mx.MainrRUI("sqtchu", null, { "type": false });
                view.shouqi_g.addChild(shouqi);
            }
        };
        MainMediator.prototype.init_top_list = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var tishi = gproxy.tishi_data;
            var aproxy = this.facade.retrieveProxy(mx.ActyProxy.NAME);
            tishi.acty = aproxy.acty_tishi;
            var c_arr3 = [
                //{ "bg": "sjian_btn_png" },
                //{ "bg": "sign_png", "ts": tishi.qdao ? 'tishi_png' : null },
                //{ "bg": "recharge_png" },
                //{ "bg": "acty_png", "ts": tishi.acty ? 'tishi_png' : (gproxy.huyao > 0 ? (aproxy.hy_huodong_ts.lq ? null : "tishi3_png") : null), "pos": { "top": 0, "right": -20 } },
                { "bg": "mail_png", "ts": tishi.mail ? 'tishi_png' : null, "pos": { "top": 0, "right": -20 } },
            ];
            view.acty_list.dataProvider = new eui.ArrayCollection(c_arr3);
        };
        MainMediator.prototype.check_kaiqi = function () {
            return;
            var proxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            var kaiqi = proxy.kaiqi;
            if (kaiqi.length) {
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskView.S_NAME);
                var id = kaiqi.shift();
                var icon = void 0;
                var pos = {};
                var height = mx.Tools.screen_height;
                switch (id) {
                    case 3://升级ok                        
                        this.sendNotification(mx.MX_NOTICE.COMP_GUIDE, { "yd_id": 119 });
                        icon = "kqscsji_png";
                        pos.x = 80 * 2 + 68 / 2;
                        pos.y = height - 66 / 2;
                        break;
                    case 5://jjcok
                        icon = "kqjjchang_png";
                        pos.x = 80 * 4 + 68 / 2;
                        pos.y = height - 66 / 2;
                        break;
                    case 6://精英副本解锁
                        icon = "kqjyfben_png";
                        pos.x = 480 - 122 / 2;
                        pos.y = height - 80 - 119 / 2;
                        break;
                    case 7://点金手ok
                        icon = "kqybgmai_png";
                        pos.x = 337;
                        pos.y = 20;
                        break;
                    case 11://省亲
                        //this.sendNotification(MX_NOTICE.COMP_GUIDE, { "yd_id": 200 });
                        icon = "kqxqin_png";
                        pos.x = 80 + 68 / 2;
                        pos.y = height - 66 / 2;
                        break;
                    case 12://制作
                        icon = "kqfzzzuo_png";
                        pos.x = 35;
                        pos.y = 160 + 4 + 71 * 2 + 10 * 2 + 35;
                        break;
                    case 15://强化
                        icon = "kqfzqhua_png";
                        pos.x = 35;
                        pos.y = 160 + 4 + 67 * 2 + 10 * 2 + 33;
                        break;
                    case 16://进阶
                        icon = "kqfzjjie_png";
                        pos.x = 35;
                        pos.y = 160 + 4 + 67 * 2 + 10 * 2 + 33;
                        break;
                    /*case 26://侍从兑换
                        //this.sendNotification(MX_NOTICE.COMP_GUIDE, { "yd_id": 109 });
                        icon = "kqscdhuan_png";
                        pos.x = 80 * 2 + 68 / 2;
                        pos.y = height - 66 / 2;
                        break;*/
                    /*case 27://约会引导
                        this.sendNotification(MX_NOTICE.COMP_GUIDE, { "yd_id": 99 });
                        this.sendNotification(MX_NOTICE.OPEN_GUIDE, "m_yh");
                        return;*/
                    case 28://太庙考核2
                        this.sendNotification(mx.MX_NOTICE.COMP_GUIDE, { "yd_id": 129 });
                        this.sendNotification(mx.MX_NOTICE.OPEN_GUIDE, "m_yt");
                        return;
                    default:
                        this.check_kaiqi();
                        return;
                }
                var data = {
                    "icon": icon,
                    "pos": pos,
                    "id": id
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.NewModular.S_NAME, "param": data });
            }
        };
        MainMediator.prototype.view_click = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var zg = new mx.GeneralEffect("cfxguo");
            this.view.g_g.addChild(zg);
            var tar = e.itemRenderer;
            var pos = tar.parent.localToGlobal(tar.x, tar.y);
            zg.x = pos.x;
            zg.y = pos.y;
            var c_n = e.item.bg;
            var net;
            switch (c_n) {
                case "recharge_png"://充值
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                case "item_png"://背包需要先请求x消耗品和碎片
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "4|5|6",
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PackageScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case "daytask_png"://每日任务
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskView.S_NAME,
                        "param": { "type": "day" },
                    });
                    break;
                case "cloth_png"://装扮
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
                    break;
                case "shop_png"://商店
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SHOP_INFO });
                    break;
                case "mail_png"://邮件
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_MAIL_INFO });
                    break;
                case "sign_png"://签到
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SIGN_INFO });
                    break;
                case "shequn_png"://好友
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SocialView.S_NAME });
                    break;
                case "setting_png"://设置
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": Main.USER_ID,
                    });
                    break;
                case "acty_png"://活动
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.WxActyScreen.S_NAME);
                    break;
                case "sjian_btn_png"://事件，先屏蔽事件
                    /*let dproxy = <DataProxy><any>(this.facade.retrieveProxy(DataProxy.NAME));
                    dproxy.shijian_type = 0;
                    net = [{
                        "t": MX_NETS.CS_PACK_TYPE_ITEM,
                        "type": "11"
                    }];
                    this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                        "sname": ShiJianScreen.S_NAME,
                        "param": { "net": net }
                    });*/
                    break;
                case "fszmian_png"://发送桌面
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AddTableView.S_NAME, });
                    break;
                case "task_png"://活动
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskView.S_NAME,
                        "param": { "type": "main" },
                    });
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
            }
        };
        MainMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            var net = [];
            switch (evt.currentTarget) {
                case view.juqing_b:
                    var fProxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.cur_chapter = 1;
                    fProxy.cur_stage = 1;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_INFO,
                        'chapter': fProxy.cur_chapter
                    });
                    // fProxy.set_stage_id(0);
                    // this.sendNotification(MX_NOTICE.SCENE_CHANGE, FubenScreen.S_NAME);
                    break;
                case view.task_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.TaskView.S_NAME,
                        "param": { "type": "main" },
                    });
                    break;
                // case view.palace_b:
                //     net = [{
                //         "t": MX_NETS.CS_HG_SHIJIAN,
                //         "type": 1
                //     }, {
                //         "t": MX_NETS.CS_PACK_TYPE_ITEM,
                //         "type": "11"
                //     }];
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                //         "sname": PalaceScreen.S_NAME,
                //         "param": { "net": net }
                //     });
                //     break;
                // case view.mnan_b://需要先请求道具，然后处理提示信息，在打开团队界面
                //     net = [{
                //         "t": MX_NETS.CS_INIT_SKILL
                //     }, {
                //         "t": MX_NETS.CS_PACK_TYPE_ITEM,
                //         "type": "1|2|3|4|5|6"
                //     }];
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                //         "sname": TeamScreen.S_NAME,
                //         "param": { "net": net }
                //     });
                //     break;
                // case view.task_g://打开任务弹窗
                //     this.sendNotification(MX_NOTICE.POP_VIEW, {
                //         "name": TaskView.S_NAME,
                //         "param": { "type": "main" },
                //     });
                //     break;
                case view.qryu_b:
                    // let pproxy = <PalaceProxy><any>this.facade.retrieveProxy(PalaceProxy.NAME);
                    // pproxy.wb_share_chufa = false;
                    // this.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name": ShareShijianView.S_NAME
                    // });
                    break;
                case view.hb_b:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HONGBAO_RECINFO });
                    break;
                case view.shouqi_g:
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    if (gproxy.tishi_data['shouqi']) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.ShouqiAlert.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": {
                                    "t": mx.MX_NETS.CS_SDK_AWARD,
                                    "key_id": 2
                                }
                            }
                        });
                    }
                    else {
                        if (window && window["switchToMsgList"]) {
                            window["switchToMsgList"]();
                        }
                    }
                    break;
            }
        };
        MainMediator.NAME = "MainMediator";
        return MainMediator;
    }(puremvc.Mediator));
    mx.MainMediator = MainMediator;
    __reflect(MainMediator.prototype, "mx.MainMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=MainMediator.js.map
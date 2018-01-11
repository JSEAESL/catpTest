/**
 *   @author mx wf
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
    var LDOtherMediator = (function (_super) {
        __extends(LDOtherMediator, _super);
        function LDOtherMediator(viewComponent) {
            var _this = _super.call(this, LDOtherMediator.NAME, viewComponent) || this;
            _this.ctype = 0;
            _this.init_view();
            return _this;
        }
        LDOtherMediator.prototype.init_view = function () {
            var view = this.view;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sousuo_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fresh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.ctype = this.proxy.ld_type;
            view.tab_list.selectedIndex = this.ctype;
            var usr = this.proxy.lueduo_target;
            if (usr && this.proxy.ld_type != 2 && (mx.AppConfig.PREV_SCENE_ID == mx.YXDianScreen.S_NAME || mx.AppConfig.PREV_SCENE_ID == mx.LDOtherZNScreen.S_NAME)) {
                //this.proxy.lueduo_target = {};
                this.proxy.fight_type = "fight";
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                    "id": usr.user_id,
                });
            }
            this.fresh_tab(this.ctype);
            this.check_ldd();
            this.fresh_num();
        };
        LDOtherMediator.prototype.check_ldd = function () {
            var proxy = this.proxy;
            var view = this.view;
            var c_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            view.time_g.visible = proxy.lueduo < 100;
            var gap = mx.Tools.format_second(proxy.ldd_res_time - c_time);
            view.time_t.text = mx.Tools.format(mx.Lang.ld091, gap);
            if (c_time >= proxy.ldd_res_time) {
                if (proxy.lueduo < 100) {
                    proxy.lueduo++;
                    this.fresh_num();
                }
                proxy.ldd_res_time += 10 * 60;
            }
        };
        LDOtherMediator.prototype.fresh_num = function () {
            var view = this.view;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var proxy = this.proxy;
            var xlv = gproxy.user_xlv;
            var base = 40 + 40 * xlv; //基础值和权重都是40
            view.fyd_t.text = mx.Tools.format(mx.Lang.ld001, proxy.fangyu + '', base);
            view.ldd_t.text = mx.Tools.format(mx.Lang.ld000, proxy.lueduo + '', 100); //掠夺点上限固定为100
        };
        LDOtherMediator.prototype.tab_click = function (e) {
            this.fresh_tab(e.itemIndex);
        };
        LDOtherMediator.prototype.fresh_tab = function (type) {
            var view = this.view;
            this.proxy.ld_type = this.ctype = type;
            view.fresh_b.visible = type == 0;
            view.page_g.visible = type > 0;
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            this.fresh_list();
        };
        LDOtherMediator.prototype.fresh_list = function () {
            var view = this.view;
            var proxy = this.proxy;
            var type = this.ctype + 1;
            var num_page = type <= 2 ? 5 : 4;
            var totpage = Math.max(1, Math.ceil(proxy['ldtot' + type] / num_page));
            view.hero_list.itemRenderer = type <= 2 ? mx.LueDuoRender : mx.LDRecordRender;
            var arr = proxy['ldlist' + type][proxy['ldpage' + type]];
            view.hero_list.dataProvider = new eui.ArrayCollection(arr);
            var layout = new eui.VerticalLayout();
            layout.gap = type <= 2 ? 12 : 26;
            view.hero_list.layout = layout;
            var height = type <= 2 ? 278 : 284;
            view.hero_scroll.top = height;
            var bottom_arr = [84, 65, 93];
            var bottom = bottom_arr[this.ctype];
            view.hero_scroll.bottom = bottom;
            if (!arr.length) {
                if (this.ctype == 1) {
                    //掠夺-仇人界面：
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME,
                        "param": {
                            "shijian": { 'msg_id': 3004 },
                        }
                    });
                }
                else if (this.ctype == 2) {
                    //掠夺-记录界面：
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME,
                        "param": {
                            "shijian": { 'msg_id': 3005 },
                        }
                    });
                }
                else if (this.ctype == 0) {
                    //掠夺-记录界面：
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME,
                        "param": {
                            "shijian": { 'msg_id': 3009 },
                        }
                    });
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            }
            view.page_t.text = proxy['ldpage' + type] + '/' + totpage;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            var spt = mx.AppConfig.check_not_support("share");
            // if (!spt && pproxy.wb_share_sj) {//分享事件
            //     if(Number(pproxy.wb_share_sj[0]) == 5 || Number(pproxy.wb_share_sj[0]) == 6){
            //         pproxy.wb_share_chufa = false;
            //         this.facade.sendNotification(MX_NOTICE.POP_VIEW , {
            //             "name" : ShareShijianView.S_NAME
            //         });
            //     }
            // }
        };
        LDOtherMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.back_b://返回
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDMainScreen.S_NAME);
                    break;
                case view.help_b://玩法说明
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.Pic2Alert.S_NAME,
                        "param": {
                            "title": "hlysmbti_png",
                            "wenzi": "ldsming_png",
                        }
                    });
                    break;
                case view.add_b://购买掠夺点
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.BuyAlertView.S_NAME,
                        "param": {
                            "param": {
                                "item": 2013,
                                "max_n": 1,
                                "res_n": 1,
                                "price": this.proxy.ldd_price
                            },
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_LUEDUO_GMLDD
                            }
                        }
                    });
                    break;
                case view.sousuo_b://搜索掠夺对象
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.LDSearchAlert.S_NAME });
                    break;
                case view.fresh_b://刷新陌生人
                    if (this.ctype == 0) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_LUEDUO_OTHER,
                            'type': 1,
                            "skip": true
                        });
                    }
                    break;
            }
        };
        LDOtherMediator.prototype.set_page = function (e) {
            var view = this.view;
            var proxy = this.proxy;
            var type = this.ctype + 1;
            var newpage = 1;
            var num_page = type <= 2 ? 5 : 4;
            switch (e.currentTarget) {
                case view.sye_b: //首页
                case view.prev_b://前一页
                    var sye = e.currentTarget == view.sye_b;
                    if (proxy['ldpage' + type] > 1) {
                        newpage = sye ? 1 : proxy['ldpage' + type] - 1;
                    }
                    break;
                case view.wye_b: //尾页
                case view.next_b://后一页
                    var wye = e.currentTarget == view.wye_b;
                    if (proxy['ldpage' + type] <= Math.ceil(proxy['ldtot' + type] / num_page)) {
                        newpage = wye ? Math.ceil(proxy['ldtot' + type] / num_page) : proxy['ldpage' + type] + 1;
                        newpage = Math.min(newpage, Math.ceil(proxy['ldtot' + type] / num_page));
                    }
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                't': mx.MX_NETS.CS_LUEDUO_OTHER,
                'page': newpage,
                'type': type,
                "skip": true
            });
        };
        Object.defineProperty(LDOtherMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LDOtherMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        LDOtherMediator.prototype.onRemove = function () {
            var view = this.view;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sousuo_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fresh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.hero_list.dataProvider = null;
            view.tab_list.dataProvider = null;
        };
        LDOtherMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_LUEDUO_LIST,
                mx.MX_NOTICE.LLD_NUM_CHANGED,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.SHOW_ALERT,
                mx.MX_NOTICE.PACK_ITEMS_BACK,
            ];
        };
        LDOtherMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_LUEDUO_LIST:
                    this.fresh_list();
                    break;
                case mx.MX_NOTICE.LLD_NUM_CHANGED:
                    this.fresh_num();
                    break;
                case mx.MX_NOTICE.TIME_TICK://刷新时间
                    this.check_ldd();
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    this.czfl();
                    break;
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    if (data == "fight_result") {
                        return;
                    }
                    if (data == "mnan") {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamScreen.S_NAME);
                    }
                    break;
            }
        };
        LDOtherMediator.prototype.czfl = function () {
            var cd = this.proxy.fl;
            if (!cd) {
                if (this.proxy.fight_type == "revenge" || this.proxy.fight_type == "help") {
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LUEDUO_OTHER,
                        'type': this.proxy.ld_type + 1,
                        'page': this.proxy["ldpage" + (this.proxy.ld_type + 1)]
                    });
                }
                return;
            }
            var mid = cd.id;
            this.proxy.fl = null;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": mid,
                "type": 8
            });
        };
        LDOtherMediator.NAME = "LDOtherMediator";
        return LDOtherMediator;
    }(puremvc.Mediator));
    mx.LDOtherMediator = LDOtherMediator;
    __reflect(LDOtherMediator.prototype, "mx.LDOtherMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LDOtherMediator.js.map
/**
 @cy/2016.11.23
 *  商城
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
    var ShopAlertMediator = (function (_super) {
        __extends(ShopAlertMediator, _super);
        function ShopAlertMediator(viewComponent) {
            var _this = _super.call(this, ShopAlertMediator.NAME, viewComponent) || this;
            _this.cur_type = 1; //1充值 2紫晶店 3元宝店 4家族 5 竞技
            _this.last_index = 0;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(ShopAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.ShopProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ShopAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_SHOP,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.PACK_ITEMS_BACK,
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        ShopAlertMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_SHOP:
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    this.fresh_list();
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    this.fresh_time();
                    break;
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    if (data == "shop_union") {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_UNION_INIT,
                        });
                    }
                    break;
                case mx.MX_NOTICE.FRESH_CPOP:
                    if (type == mx.ShopAlert.S_NAME) {
                        this.cur_type = data;
                        view.tab_list.selectedIndex = this.cur_type - 1;
                        if (this.cur_type == 1) {
                            view.vip_g.visible = true;
                        }
                        else if (this.cur_type == 3) {
                            view.type_g.visible = true;
                        }
                        this.fresh_list();
                    }
                    this.fresh_vip();
                    break;
            }
        };
        ShopAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fresh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.item_list.itemRenderer = mx.ShopRender;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = view.type_g.visible = false;
            this.page = 1;
            view.jjc_g.visible = false;
            view.price_p.source = "ybao_20_png";
            if (view.adata) {
                this.cur_type = view.adata;
            }
            view.tab_list.selectedIndex = this.cur_type - 1;
            view.type_list.selectedIndex = 0;
            if (this.cur_type == 1) {
                view.vip_g.visible = true;
            }
            else if (this.cur_type == 3) {
                view.type_g.visible = true;
            }
            this.init_vip();
            this.fresh_list();
            this.fresh_time();
        };
        ShopAlertMediator.prototype.fresh_time = function () {
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            var start = new Date();
            start.setHours(5);
            start.setMinutes(0);
            start.setSeconds(0);
            start.setMilliseconds(0);
            var five_time = Math.floor(start.getTime() / 1000); //5点时间戳
            var res_time = 0;
            if (five_time > now_time) {
                res_time = five_time - now_time;
            }
            else {
                res_time = five_time - now_time + 24 * 3600;
            }
            this.view.time_t.text = mx.Tools.format_second(res_time) + mx.Lang.p0151;
        };
        ShopAlertMediator.prototype.init_vip = function () {
            var view = this.view;
            view.vip_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ckvip_click, this);
            view.vip_bar.set_res({ "up": "jdtiao1_png", "down": "jdtiao2_png" });
            this.fresh_vip();
        };
        ShopAlertMediator.prototype.fresh_vip = function (d) {
            var view = this.view;
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var now = gproxy.user_vip;
            view.vip_t.text = mx.Tools.format(mx.Lang.bh000, now);
            var api;
            var ljy = gproxy.user_payall;
            if (now >= mx.MX_COMMON.MAX_VIP_LV) {
                view.vip_bar.value = 100;
                view.res_t.text = "";
                view.res_p.visible = true;
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", 15);
                view.pro_t.text = ljy + "/" + api.Recharge;
            }
            else {
                view.res_p.visible = false;
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", now + 1);
                var add = Number(api.Recharge) - ljy;
                var str = mx.Tools.format(mx.Lang.r0001, add, (now + 1));
                view.res_t.textFlow = mx.Tools.setKeywordColor2(str, [0xfe74b1, 0xfe74b1]);
                view.pro_t.text = ljy + "/" + api.Recharge;
                view.vip_bar.value = ljy / api.Recharge * 100;
            }
            api = null;
        };
        ShopAlertMediator.prototype.ckvip_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this.view;
            switch (evt.currentTarget) {
                case view.vip_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_VIP_LIBAOSTATE });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CHECK_MAIN_ALERT); //检查下一个弹窗
                    if (view.adata == "nhqfu") {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.QiFuAlert.S_NAME });
                    }
                    break;
            }
        };
        ShopAlertMediator.prototype.type_click = function (e) {
            var view = this.view;
            if (this.cur_type == 3) {
                this.page = 1;
                view.type_p.source = e.itemIndex == 0 ? "rmxzzhong_png" : "bgxzhong_png";
                this.fresh_list();
            }
        };
        ShopAlertMediator.prototype.tab_click = function (e) {
            var view = this.view;
            this.page = 1;
            if (e.item == "jzuhui_png") {
                view.tab_list.selectedIndex = this.last_index;
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz226 });
                return;
            }
            this.last_index = e.itemIndex;
            this.cur_type = e.itemIndex + 1;
            switch (this.cur_type) {
                case 1:
                    this.fresh_list();
                    break;
                case 2:
                    this.fresh_list();
                    break;
                case 3:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SHOP_INFO });
                    break;
                case 4:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SHOP
                    });
                    break;
                case 5:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_JJC_SHOP });
                    break;
            }
        };
        ShopAlertMediator.prototype.push_arr = function (arr, tab, jiangli, api, state) {
            arr.push({
                "tab": tab,
                "jiangli": jiangli,
                "type": api.type,
                "id": api.item_id,
                "num": api.num,
                "price": api.price || api.cost,
                "price_type": api.p_type || tab - 1,
                "state": state
            });
        };
        ShopAlertMediator.prototype.fresh_list = function () {
            var view = this.view;
            view.time_t.visible = false;
            view.time_t.top = 265;
            view.time_t.right = 190;
            view.jjc_g.visible = false;
            view.vip_g.visible = false;
            view.type_g.visible = false;
            view.jjc_g.left = 65;
            view.jjc_g.right = NaN;
            view.item_scr.height = 449;
            var cishu, price_api;
            var arr = [];
            var item_api, items, goumai;
            var uproxy = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            var tab_arr = ["cz", "zjdian", "ybdian", "jzu", "jji"];
            for (var k in tab_arr) {
                if (Number(k) == view.tab_list.selectedIndex) {
                    tab_arr[k] += "2_png";
                }
                else {
                    tab_arr[k] += "1_png";
                }
                if (Number(k) == 3) {
                    if (!uproxy.union_id) {
                        tab_arr[k] = "jzuhui_png";
                    }
                }
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(tab_arr);
            var layout = view.item_list.layout;
            layout.horizontalGap = 22;
            switch (this.cur_type) {
                case 1:
                    arr = [1, 2, 3, 4, 5, 6, 7, 8];
                    layout.horizontalGap = 25;
                    view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = false;
                    view.vip_g.visible = true;
                    this.fresh_vip();
                    break;
                case 2:
                    var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
                    view.jjcprice_t.text = "" + dproxy.get_currency("zjb");
                    arr = [10, 2, 12, 3, 4, 5, 6, 7, 8];
                    layout.horizontalGap = 26;
                    view.item_scr.height = 503;
                    view.jjc_g.visible = true;
                    view.jjc_g.left = NaN;
                    view.jjc_g.right = 67;
                    view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = false;
                    view.jjcprice_p.source = "zjb36_png";
                    break;
                case 3:
                    view.time_t.visible = view.fresh_b.visible = view.price_p.visible = view.fcost_t.visible = view.type_list.selectedIndex == 0;
                    view.time_t.top = 310;
                    view.time_t.right = 63;
                    cishu = Math.min(this.proxy.fresh_num, 14);
                    price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.SHOP_REFRESH, "id", cishu + 1);
                    if (view.type_list.selectedIndex == 0) {
                        var temai = this.proxy.temai;
                        var tmcishu = this.proxy.tmcishu;
                        for (var k in temai) {
                            item_api = mx.ApiTool.getAPINode(mx.MX_APINAME.SHOP, "kind", 1, "id", temai[k]);
                            this.push_arr(arr, 1, temai[k], item_api, tmcishu[k]);
                        }
                    }
                    else {
                        items = mx.ApiTool.getAPINodes(mx.MX_APINAME.SHOP, "kind", 2);
                        for (var k in items) {
                            item_api = items[k];
                            this.push_arr(arr, 2, item_api.id, item_api, 0);
                        }
                    }
                    view.item_scr.height = 503;
                    //view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = true;
                    view.type_g.visible = true;
                    view.price_p.source = "ybao_20_png";
                    break;
                case 4:
                    view.time_t.visible = true;
                    var uproxy_1 = this.facade.retrieveProxy(mx.UnionProxy.NAME);
                    cishu = Math.min(uproxy_1.shop_has_buy, 7);
                    price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GHREFRESH, "id", cishu + 1);
                    view.jjcprice_t.text = uproxy_1.user_jiazubi + "";
                    items = uproxy_1.wupin;
                    goumai = uproxy_1.goumai;
                    for (var k in items) {
                        item_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GHSHOP, "id", items[k]);
                        this.push_arr(arr, 4, items[k], item_api, goumai[k]);
                    }
                    view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = true;
                    view.jjc_g.visible = true;
                    view.item_scr.height = 503;
                    view.jjcprice_p.source = "jzbix_png";
                    view.price_p.source = "jzbix_png";
                    break;
                case 5:
                    view.time_t.visible = true;
                    var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
                    cishu = Math.min(jproxy.shop_has_buy, 7);
                    price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JJCREFRESH, "id", cishu + 1);
                    view.jjcprice_t.text = jproxy.wuxun;
                    items = jproxy.wupin;
                    goumai = jproxy.goumai;
                    for (var k in items) {
                        item_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JJCSHOP, "id", items[k]);
                        this.push_arr(arr, 5, items[k], item_api, goumai[k]);
                    }
                    view.fresh_b.visible = view.fcost_t.visible = view.price_p.visible = true;
                    view.item_scr.height = 503;
                    view.jjc_g.visible = true;
                    view.jjcprice_p.source = "jjdhwxun_png";
                    view.price_p.source = "ybao_20_png";
                    break;
            }
            view.item_list.layout = layout;
            view.fcost_t.text = price_api ? price_api.price || price_api.cost : "";
            this.max_page = Math.max(Math.ceil(arr.length / 6), 1);
            var arr2 = arr.slice((this.page - 1) * 6, Math.min(this.page * 6, arr.length));
            view.page_t.text = this.page + "/" + this.max_page;
            view.item_list.dataProvider = new eui.ArrayCollection(arr2);
            if (this.cur_type == 2) {
                var carr = [10, 2, 12, 3, 4, 5, 6, 7, 8];
                var carr2 = carr.slice((this.page - 1) * 6, Math.min(this.page * 6, arr.length));
                view.item_list.dataProvider = new eui.ArrayCollection(carr2);
                view.item_list.itemRenderer = mx.RechargeRender;
            }
            else if (this.cur_type == 1) {
                var carr = [1, 2, 3, 4, 5, 6, 7, 8];
                var carr2 = carr.slice((this.page - 1) * 6, Math.min(this.page * 6, arr.length));
                view.item_list.dataProvider = new eui.ArrayCollection(carr2);
                view.item_list.itemRenderer = mx.WXRechargeRender;
            }
            else {
                view.item_list.dataProvider = new eui.ArrayCollection(arr2);
                view.item_list.itemRenderer = mx.ShopRender;
            }
            view.item_scr.viewport.scrollV = 0;
        };
        ShopAlertMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.fresh_b:
                    var cishu = void 0;
                    var price_api = void 0;
                    var notice = mx.MX_NETS.CS_SHOP_FRESH;
                    var tips = mx.Lang.p0078;
                    var huobi = mx.Lang.ybao;
                    switch (this.cur_type) {
                        case 3:
                            cishu = Math.min(this.proxy.fresh_num, 14);
                            price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.SHOP_REFRESH, "id", cishu + 1);
                            break;
                        case 5:
                            var jproxy = this.facade.retrieveProxy(mx.JingJiProxy.NAME);
                            cishu = Math.min(jproxy.shop_has_buy, 7);
                            price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.JJCREFRESH, "id", cishu + 1);
                            notice = mx.MX_NETS.CS_JJC_SHOPFRESH;
                            tips = mx.Lang.p0113;
                            break;
                        case 4:
                            var uproxy = this.facade.retrieveProxy(mx.UnionProxy.NAME);
                            cishu = Math.min(uproxy.shop_has_buy, 7);
                            price_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GHREFRESH, "id", cishu + 1);
                            notice = mx.MX_NETS.CS_UNION_FRESH;
                            tips = mx.Lang.p0113;
                            huobi = mx.Lang.jz059;
                            break;
                    }
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": notice
                        },
                        "param": mx.Tools.format(tips, price_api.price || price_api.cost, huobi)
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.add_b:
                    switch (this.cur_type) {
                        case 2:
                            this.last_index = 0;
                            this.cur_type = 1;
                            view.tab_list.selectedIndex = 0;
                            this.fresh_list();
                            break;
                        case 4:
                            var pproxy = this.facade.retrieveProxy(mx.PackProxy.NAME);
                            pproxy.check_pack_type_item("11", "shop_union");
                            break;
                        case 5:
                            // let gproxy = <GameProxy><any> this.facade.retrieveProxy(GameProxy.NAME);
                            // let c_lv = gproxy.user_lv;
                            // if(c_lv >= 10){//跳竞技场
                            //     let jproxy : JingJiProxy = <JingJiProxy><any>this.facade.retrieveProxy(JingJiProxy.NAME);
                            //     jproxy.jj_flag = true;
                            //     let net = [{
                            //         "t": MX_NETS.CS_QUEUE_INFO,
                            //         "team_id": 11
                            //     }];
                            //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                            //         "sname" : JJCMainScreen.S_NAME,
                            //         "param" : {"net" : net}
                            //     });
                            // }else{//10级开启竞技场
                            //     let str = Tools.format(Lang.p0110, 10, Lang.jjc);
                            //     this.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : str});
                            // }
                            break;
                    }
                    break;
                case view.first_b:
                    this.page = 1;
                    this.fresh_list();
                    break;
                case view.pre_b:
                    this.page = Math.max(1, this.page - 1);
                    this.fresh_list();
                    break;
                case view.next_b:
                    this.page = Math.min(this.page + 1, this.max_page);
                    this.fresh_list();
                    break;
                case view.last_b:
                    this.page = this.max_page;
                    this.fresh_list();
                    break;
                case view.close_b:
                    //console.log("asd");
                    break;
            }
        };
        ShopAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.fresh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tab_list.dataProvider = null;
            view.type_list.dataProvider = null;
            view.item_list.dataProvider = null;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
        };
        ShopAlertMediator.NAME = "ShopAlertMediator";
        return ShopAlertMediator;
    }(puremvc.Mediator));
    mx.ShopAlertMediator = ShopAlertMediator;
    __reflect(ShopAlertMediator.prototype, "mx.ShopAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShopAlertMediator.js.map
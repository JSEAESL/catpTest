/**
 *   @author cy
 *   @date 2017.1.9
 *   @desc 教坊司首页
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
    var JFSSYScreen = (function (_super) {
        __extends(JFSSYScreen, _super);
        function JFSSYScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JFSSYScreen.mx_support = function () {
            return ["assets.jfs_main"];
        };
        JFSSYScreen.prototype.init_view = function () {
            var view = this;
            view.paixu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.lbtj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.paixu_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.paixu_click, this);
            view.jfs_list.itemRenderer = mx.JFSRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JFSSYMediator(this));
            this.page = 1;
            this.type = 0;
            this.paixu_g.visible = false;
            var arr = [
                {
                    "up": "syyji2_png",
                    "down": "syyji_png"
                },
                {
                    "up": "wsjz2_png",
                    "down": "wsjzhu_png"
                },
                {
                    "up": "wdznv2_png",
                    "down": "wdznv_png"
                }
            ];
            view.tab_list.dataProvider = new eui.ArrayCollection(arr);
            var arr2 = mx.Lang.jfs06;
            view.paixu_list.dataProvider = new eui.ArrayCollection(arr2);
            this.set_ftp();
            this.fresh_screen();
        };
        JFSSYScreen.prototype.set_ftp = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            this.ftp_t.text = proxy.ftp_num;
        };
        JFSSYScreen.prototype.fresh_screen = function () {
            var view = this;
            var tab = view.tab_list.selectedIndex;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            view.yjs_t.text = mx.Lang.jfs03 + ":" + proxy.jfs_total;
            view.max_page = Math.max(Math.ceil(proxy.jfs_total / 4), 1);
            view.tab_list.selectedIndex = proxy.jfs_tab;
            this.page = proxy.jfs_page[proxy.jfs_tab];
            if (this.page > this.max_page) {
                this.page = proxy.jfs_page[proxy.jfs_tab] = this.max_page;
            }
            this.page_t.text = this.page + "/" + this.max_page;
            var arr = [];
            if (proxy.jfs_info.length <= 4) {
                arr = proxy.jfs_info;
            }
            else {
                for (var i = -4 + 4 * this.page; i < 0 + 4 * this.page && i < proxy.jfs_info.length; i++) {
                    arr.push(proxy.jfs_info[i]);
                }
            }
            this.jfs_list.dataProvider = new eui.ArrayCollection(arr);
            if (!arr.length) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME,
                    "param": {
                        "shijian": { 'msg_id': 3000 + proxy.jfs_tab },
                    }
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            }
        };
        JFSSYScreen.prototype.tab_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            this.page = 1;
            this.paixu_g.visible = false;
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            this.type = proxy.jfs_paixu;
            proxy.jfs_tab = e.itemIndex;
            switch (e.itemIndex) {
                case 0:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                        "type": this.type,
                        "page": proxy.jfs_page[0]
                    });
                    break;
                case 1:
                case 2:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JFSTYPE,
                        "type": e.itemIndex == 1 ? 0 : 1,
                        "page": proxy.jfs_page[proxy.jfs_tab]
                    });
                    break;
            }
        };
        JFSSYScreen.prototype.paixu_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var jfs_info = proxy.jfs_info;
            this.type = proxy.jfs_paixu = e.itemIndex;
            this.page = 1;
            if (this.tab_list.selectedIndex) {
                var lx_1 = this.type == 1 ? "id" : "renqi";
                jfs_info.sort(function (a, b) {
                    var x = Number(a[lx_1]);
                    var y = Number(b[lx_1]);
                    return y - x; //按层级关系排序
                });
                proxy.jfs_page[proxy.jfs_tab] = 1;
                this.fresh_screen();
            }
            else {
                proxy.jfs_page[0] = 1;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                    "page": 1,
                    "type": this.type
                });
            }
            this.paixu_g.visible = false;
        };
        JFSSYScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            switch (e.currentTarget) {
                case this.back_b:
                    var cs = JFSSYScreen.P_NAME;
                    if (cs) {
                        JFSSYScreen.P_NAME = null;
                        if (cs == mx.PalaceScreen.S_NAME) {
                            var net = [
                                {
                                    "t": mx.MX_NETS.CS_HG_SHIJIAN,
                                    "type": 1
                                }, {
                                    "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                    "type": "11"
                                }
                            ];
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                "sname": mx.PalaceScreen.S_NAME,
                                "param": {
                                    "net": net,
                                    "pop": proxy.back_pop
                                }
                            });
                            if (proxy.back_pop) {
                                proxy.back_pop = null;
                            }
                        }
                        else {
                            proxy.jfs_page = [1, 1, 1];
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, cs);
                        }
                    }
                    else {
                        var proxy_1 = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                        proxy_1.jfs_page = [1, 1, 1];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSScreen.S_NAME);
                    }
                    break;
                case this.help_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.Pic2Alert.S_NAME, "param": { "wenzi": "jfswfsm_png", "title": "hlysmbti_png" }
                    });
                    break;
                case this.add_b://购买
                    var a_d = {
                        "param": {
                            "item": 2011,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case this.paixu_b://排序
                    this.paixu_g.visible = !this.paixu_g.visible;
                    break;
                case this.lbtj_b://推荐
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "type": 6
                    });
                    break;
            }
        };
        JFSSYScreen.prototype.fanye = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            this.paixu_g.visible = false;
            switch (e.currentTarget) {
                case this.first_b:
                    this.page = 1;
                    break;
                case this.prev_b:
                    if (this.page > 1) {
                        this.page -= 1;
                    }
                    break;
                case this.next_b:
                    if (this.page < this.max_page) {
                        this.page += 1;
                    }
                    break;
                case this.last_b:
                    this.page = this.max_page;
                    break;
            }
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            proxy.jfs_page[proxy.jfs_tab] = this.page;
            this.page_t.text = this.page + "/" + this.max_page;
            if (!this.tab_list.selectedIndex) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                    "type": this.type,
                    "page": this.page
                });
            }
            else {
                this.fresh_screen();
            }
        };
        JFSSYScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.paixu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fanye, this);
            view.lbtj_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tab_list.dataProvider = null;
            view.jfs_list.dataProvider = null;
            view.paixu_list.dataProvider = null;
            view.paixu_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.paixu_click, this);
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JFSSYMediator.NAME);
        };
        JFSSYScreen.S_NAME = "JFSSYScreen";
        JFSSYScreen.M_NAME = "JFSScreen";
        return JFSSYScreen;
    }(mx.AlertView));
    mx.JFSSYScreen = JFSSYScreen;
    __reflect(JFSSYScreen.prototype, "mx.JFSSYScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JFSSYScreen.js.map
/**
 *   @author cy
 *   @date 2017.4.19
 *   @desc 家族主界面 Mediator
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
    var UnionMainScreenMediator = (function (_super) {
        __extends(UnionMainScreenMediator, _super);
        function UnionMainScreenMediator(viewComponent) {
            var _this = _super.call(this, UnionMainScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionMainScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionMainScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UNION_HUIZHANG,
                mx.MX_NOTICE.FRESH_CSCREEN
            ];
        };
        UnionMainScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.UNION_HUIZHANG:
                    this.set_huizhang();
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.fresh_screen();
                    break;
            }
        };
        Object.defineProperty(UnionMainScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionMainScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.quit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.paihang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.name_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.edit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chat_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fun_list.itemRenderer = mx.SSButtonRender;
            view.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
            view.name_b.visible = view.edit_b.visible = this.proxy.my_zhiwu == 1;
            this.proxy.set_lv3(3);
            this.fresh_screen();
            this.set_huizhang();
        };
        UnionMainScreenMediator.prototype.btn_click = function (e) {
            var view = this.view;
            switch (e.currentTarget) {
                case view.huan_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionHuiZhangAlert.S_NAME, "param": 2 });
                    break;
                case view.back_b:
                    var p_name = mx.UnionMainScreen.P_NAME;
                    if (p_name) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                        mx.UnionMainScreen.P_NAME = null;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    }
                    break;
                case view.paihang_b:
                    this.proxy.rank_page = 0;
                    this.proxy.rank_list = [];
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionRankAlert.S_NAME });
                    break;
                case view.edit_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionHuiZhangAlert.S_NAME, "param": 4 });
                    break;
                case view.name_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionHuiZhangAlert.S_NAME, "param": 3 });
                    break;
                case view.chat_b:
                    var cproxy = this.facade.retrieveProxy(mx.ChatProxy.NAME);
                    cproxy.selected_index = 1;
                    mx.ChatScreen.P_NAME = mx.UnionMainScreen.S_NAME;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ChatScreen.S_NAME);
                    break;
                case view.quit_b:
                    var p_d = void 0;
                    if (this.proxy.my_zhiwu == 1) {
                        if (this.proxy.union_member == 1) {
                            p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": { "t": mx.MX_NETS.CS_UNION_QUIT },
                                    "param": mx.Lang.jz065
                                }
                            };
                        }
                        else {
                            p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "param": mx.Lang.jz066
                                }
                            };
                        }
                    }
                    else {
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_UNION_QUIT },
                                "param": mx.Lang.jz053
                            }
                        };
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.jq_b:
                    switch (view.jq_b.res_name) {
                        case "qqqbangding_png"://绑定
                            break;
                        case "qqqjiaru_png"://加入
                            break;
                        case "qqqjiebang_png"://解绑
                            break;
                    }
                    break;
            }
        };
        UnionMainScreenMediator.prototype.fun_click = function (e) {
            switch (e.item.bg) {
                case "jzcyaniu_png":
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_MLIST
                    });
                    break;
                case "jzdhaniu_png":
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SHOP
                    });
                    break;
                case "jzjxaniu_png":
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_DONATES
                    });
                    break;
                case "jzrzaniu_png":
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_RIZHI
                    });
                    break;
            }
        };
        UnionMainScreenMediator.prototype.set_huizhang = function () {
            var source = "jzhz" + this.proxy.cur_huizhang + "_png";
            this.view.huan_b.set_ssres(source);
        };
        UnionMainScreenMediator.prototype.fresh_screen = function () {
            var view = this.view;
            var proxy = this.proxy;
            if (typeof proxy.zhiwei_info != "undefined" && proxy.zhiwei_info && proxy.zhiwei_info.zhiwu) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionZWAlert.S_NAME, "param": 4 });
            }
            view.gongao_t.text = proxy.gonggao;
            view.lv_t.text = mx.Tools.format(mx.Lang.bh001, proxy.union_lv);
            ;
            view.paiming_t.text = mx.Lang.jz060 + "：" + proxy.union_rank;
            view.name_t.text = mx.Lang.jz011 + "：" + proxy.union_name;
            view.id_t.text = "ID：" + proxy.union_id;
            view.zuzhang_t.text = mx.Lang.jz009 + "：" + proxy.union_zuzhang;
            view.member_t.text = mx.Lang.jz012 + "：" + proxy.union_member + "/" + proxy.union_max;
            var lv3 = proxy.lv3;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GHZHIWEI, "level", lv3);
            view.fuzuzhang_t.text = mx.Lang.jz024 + "：" + proxy.union_fuzuzhang + "/" + api.name1;
            view.name_b.left = view.name_t.left + view.name_t.width + 10;
            var height = mx.Tools.screen_height;
            var gap = height - view.di_p.top - 562 - 34;
            view.fun_list.top = view.di_p.top + Math.floor(gap / 3) + 34;
            view.chat_b.top = view.fun_list.top + 4;
            view.fun_list.itemRenderer = mx.SSButtonRender;
            var arr = [
                { "bg": "jzcyaniu_png" },
                { "bg": "jzdhaniu_png" },
                { "bg": "jzjxaniu_png" },
                { "bg": "jzrzaniu_png" },
            ];
            view.fun_list.dataProvider = new eui.ArrayCollection(arr);
        };
        UnionMainScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.quit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.paihang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.name_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.edit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chat_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fun_list.dataProvider = null;
            view.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
        };
        UnionMainScreenMediator.NAME = "UnionMainScreenMediator";
        return UnionMainScreenMediator;
    }(puremvc.Mediator));
    mx.UnionMainScreenMediator = UnionMainScreenMediator;
    __reflect(UnionMainScreenMediator.prototype, "mx.UnionMainScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionMainScreenMediator.js.map
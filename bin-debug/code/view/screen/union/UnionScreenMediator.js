/**
 *   @author cy
 *   @date 2017.4.18
 *   @desc 无家族主界面 Mediator
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
    var UnionScreenMediator = (function (_super) {
        __extends(UnionScreenMediator, _super);
        function UnionScreenMediator(viewComponent) {
            var _this = _super.call(this, UnionScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UNION_HUIZHANG,
                mx.MX_NOTICE.UNION_APPLY,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        UnionScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.UNION_HUIZHANG:
                    this.set_huizhang();
                    break;
                case mx.MX_NOTICE.UNION_APPLY:
                    this.set_libiao();
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.set_libiao(true);
                    break;
            }
        };
        Object.defineProperty(UnionScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.name_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            view.name_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            view.gonggao_ed.addEventListener(egret.Event.CHANGE, this.check_str2, this);
            view.gonggao_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str2, this);
            view.gonggao_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end2, this);
            view.sousuo_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str3, this);
            view.sousuo_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end3, this);
            view.huan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.search_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ksjr_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chuangjian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huanyihuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.jzlb_s.addEventListener(eui.UIEvent.CHANGE_END, this.check_new, this);
            this.content = mx.Lang.jz004;
            this.jz_name = "";
            this.search_id = "";
            view.num_t.text = "0/50";
            var rand = Math.floor(16 * Math.random()) + 1;
            this.proxy.cur_huizhang = rand;
            this.set_huizhang();
            view.type_list.selectedIndex = 0;
            this.set_type(0);
        };
        UnionScreenMediator.prototype.check_str = function () {
            var _this = this;
            var view = this.view;
            var str = view.name_ed.text;
            if (str.length > 7) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz002 });
                return;
            }
            if (str.length == 0) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz002 });
                return;
            }
            str = mx.Tools.check_str_str(str);
            mx.MGTool.get_str(1, str).then(function (value) {
                view.name_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                _this.jz_name = value.str;
                if (value.str != '') {
                    var gonggao = view.gonggao_ed.text;
                    mx.MGTool.get_str(6, gonggao).then(function (value) {
                        view.gonggao_ed.text = value.str;
                        if (value.mg) {
                            return;
                        }
                        _this.content = value.str;
                        if (mx.Tools.check_name_form(_this.jz_name)) {
                            _this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_UNION_BUILD,
                                "name": _this.jz_name,
                                "logo": _this.proxy.cur_huizhang,
                                "content": _this.content
                            });
                        }
                        view.num_t.text = view.gonggao_ed.text.length + "/50";
                    }, function () {
                        view.gonggao_ed.text = '';
                        view.num_t.text = view.gonggao_ed.text.length + "/50";
                        _this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
                    });
                }
            }, function () {
                view.name_ed.text = '';
                _this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        UnionScreenMediator.prototype.init_str = function (e) {
            var view = this.view;
            if (this.jz_name == "") {
                view.name_ed.text = "";
            }
        };
        UnionScreenMediator.prototype.check_end = function (e) {
            var view = this.view;
            // let str = view.name_ed.text;
            // str = Tools.check_msg(str, "name");
            // str = Tools.check_str_str(str);
            // this.jz_name = view.name_ed.text = str;
        };
        UnionScreenMediator.prototype.check_str2 = function (e) {
            var view = this.view;
            view.num_t.text = view.gonggao_ed.text.length + "/50";
        };
        UnionScreenMediator.prototype.init_str2 = function (e) {
            var view = this.view;
            if (this.content == mx.Lang.jz004) {
                view.gonggao_ed.text = "";
            }
        };
        UnionScreenMediator.prototype.check_end2 = function (e) {
            var view = this.view;
            // let str = view.gonggao_ed.text;
            // view.gonggao_ed.text = Tools.check_msg(str, "name");
            // this.content = view.gonggao_ed.text;
            view.num_t.text = view.gonggao_ed.text.length + "/50";
        };
        UnionScreenMediator.prototype.check_str3 = function () {
            var _this = this;
            var view = this.view;
            var facade = mx.ApplicationFacade.getInstance();
            var str = view.sousuo_ed.text;
            mx.MGTool.get_str(1, str).then(function (value) {
                view.sousuo_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str != '') {
                    view.xian_p.source = "jzssjgfgxian_png";
                    view.huanyihuan_b.visible = false;
                    _this.proxy.key_word = value.str;
                    _this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SEARCH,
                        "name": value.str
                    });
                }
            }, function () {
                view.sousuo_ed.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        UnionScreenMediator.prototype.init_str3 = function (e) {
            var view = this.view;
            if (this.search_id == "") {
                view.sousuo_ed.text = "";
            }
        };
        UnionScreenMediator.prototype.check_end3 = function (e) {
            var view = this.view;
            // let str = view.sousuo_ed.text;
            // view.sousuo_ed.text = Tools.check_msg(str, "name");
            // this.search_id = view.sousuo_ed.text;
        };
        UnionScreenMediator.prototype.btn_click = function (e) {
            var view = this.view;
            switch (e.currentTarget) {
                case view.huan_b:
                    this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionHuiZhangAlert.S_NAME, "param": 1 });
                    break;
                case view.back_b:
                    var p_name = mx.UnionScreen.P_NAME;
                    if (p_name) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                        mx.UnionScreen.P_NAME = null;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    }
                    break;
                case view.chuangjian_b:
                    this.check_str();
                    break;
                case view.huanyihuan_b:
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_RANDTEN,
                    });
                    break;
                case view.search_b:
                    this.check_str3();
                    break;
                case view.ksjr_b:
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_KSJR,
                    });
                    break;
            }
            return;
        };
        UnionScreenMediator.prototype.type_click = function (e) {
            this.set_type(e.itemIndex);
        };
        UnionScreenMediator.prototype.set_type = function (tab) {
            var view = this.view;
            view.jzlb_s.visible = view.cjjz_g.visible = view.ssjz_g.visible = view.ksjr_b.visible = false;
            switch (tab) {
                case 0:
                    view.jzlb_s.visible = view.ksjr_b.visible = true;
                    view.jzlb_s.top = 204;
                    view.jzlb_s.bottom = 187;
                    break;
                case 1:
                    view.ssjz_g.visible = view.jzlb_s.visible = true;
                    view.jzlb_s.top = 412;
                    view.jzlb_s.bottom = 20;
                    break;
                case 2:
                    view.cjjz_g.visible = true;
                    break;
            }
            this.set_libiao();
        };
        UnionScreenMediator.prototype.set_huizhang = function () {
            this.view.jzhz_p.source = "jzhz" + this.proxy.cur_huizhang + "_png";
        };
        UnionScreenMediator.prototype.set_libiao = function (state) {
            var view = this.view;
            view.jzlb_list.itemRenderer = mx.UnionRender;
            var arr = [this.proxy.union_list, this.proxy.randten_list, []];
            var dataProvider = view.jzlb_list.dataProvider;
            if (this.proxy.jzlb_index >= 0 && view.type_list.selectedIndex == 0) {
                var newdata2 = this.proxy.union_list[this.proxy.jzlb_index];
                dataProvider.replaceItemAt(newdata2, this.proxy.jzlb_index);
                this.proxy.jzlb_index = -1;
                this.proxy.rand_index = -1;
            }
            else if (this.proxy.rand_index >= 0 && view.type_list.selectedIndex == 1) {
                var newdata2 = this.proxy.randten_list[this.proxy.rand_index];
                dataProvider.replaceItemAt(newdata2, this.proxy.rand_index);
                this.proxy.jzlb_index = -1;
                this.proxy.rand_index = -1;
            }
            else {
                view.jzlb_list.dataProvider = new eui.ArrayCollection(arr[view.type_list.selectedIndex]);
            }
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            if (arr[view.type_list.selectedIndex].length == 0 && view.type_list.selectedIndex == 1) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME, "param": { "shijian": { 'msg_id': 4011 } }
                });
            }
            else if (arr[view.type_list.selectedIndex].length == 0 && view.type_list.selectedIndex == 0) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME, "param": { "shijian": { 'msg_id': 4012 } }
                });
            }
            if (state && view.type_list.selectedIndex == 0 && this.proxy.screen_page != 1) {
                var scrollV = view.jzlb_list.scrollV;
                view.jzlb_list.validateNow();
                if (scrollV) {
                    view.jzlb_s.viewport.scrollV = scrollV;
                    var num = Math.min(4, this.proxy.screen_gap);
                    egret.Tween.get(view.jzlb_s.viewport, { "loop": false }).to({ "scrollV": scrollV + num * 121 }, 400);
                }
            }
        };
        UnionScreenMediator.prototype.check_new = function (data) {
            var view = this.view;
            var proxy = this.proxy;
            if (proxy.screen_flag && proxy.screen_total > proxy.union_list.length) {
                proxy.screen_flag = false;
                proxy.screen_gap = proxy.union_list.length;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_UNION_RANK,
                    "page": proxy.screen_page + 1
                });
            }
        };
        UnionScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.name_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            view.name_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            view.gonggao_ed.removeEventListener(egret.Event.CHANGE, this.check_str2, this);
            view.gonggao_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str2, this);
            view.gonggao_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end2, this);
            view.sousuo_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str3, this);
            view.sousuo_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end3, this);
            view.huan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.search_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ksjr_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.chuangjian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huanyihuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jzlb_s.removeEventListener(eui.UIEvent.CHANGE_END, this.check_new, this);
            view.type_list.dataProvider = null;
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.jzlb_list.dataProvider = null;
        };
        UnionScreenMediator.NAME = "UnionScreenMediator";
        return UnionScreenMediator;
    }(puremvc.Mediator));
    mx.UnionScreenMediator = UnionScreenMediator;
    __reflect(UnionScreenMediator.prototype, "mx.UnionScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionScreenMediator.js.map
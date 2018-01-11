/**
 *   @author qianjun
 *   @date 2015.1.3 2016.10.9
 *   @desc 黑市买家主界面
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
    var HeiShiBuyScreen = (function (_super) {
        __extends(HeiShiBuyScreen, _super);
        function HeiShiBuyScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiBuyScreen.mx_support = function () {
            return ["assets.market_buy_sell", "assets.market_buy_main", "api.ZINVSKILL"];
        };
        HeiShiBuyScreen.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.hz_list.itemRenderer = mx.HSDsznRender;
            facade.registerMediator(new mx.HeiShiBuyScreenMediator(view));
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sort_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sortbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort1_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort2_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort3_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sxuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sxuanbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.mli_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.mli_click, this);
            view.xt_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.xt_click, this);
            view.skill_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.skill_click, this);
            view.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cancel_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.meili_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.xuetong_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.skill_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.sx_close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xuetongbg_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.skillbg_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.meilibg_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.hsb_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hproxy.sxuan_guize = {
                "meili": 0,
                "xuetong": 0,
                "skill": 0
            };
            view.sort_g.visible = view.sxuan_g.visible = view.xuetong_g.visible = view.meili_g.visible = view.skill_g.visible = false;
            view.guize_g.height = 200;
            view.fresh_sxuan();
            this.show_items();
            // view.ybao_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add_pos, this);
        };
        Object.defineProperty(HeiShiBuyScreen.prototype, "hproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeiShiBuyScreen.prototype, "dproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.DataProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeiShiBuyScreen.prototype.fresh_hsb = function () {
            var view = this;
            view.hsb_t.text = view.hproxy.cur_hsb + "";
        };
        HeiShiBuyScreen.prototype.set_page = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var page = this.hproxy.buy_page.cur_page;
            var total = this.hproxy.buy_page.total_page;
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                case view.prev_b:
                    newpage = e.currentTarget == view.sye_b ? 1 : Math.max(1, page - 1);
                    break;
                case view.wye_b:
                case view.next_b:
                    newpage = e.currentTarget == view.wye_b ? total : Math.min(total, page + 1);
                    break;
            }
            if (newpage != page) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    't': mx.MX_NETS.CS_HS_BUY_DATA,
                    'page_id': newpage,
                    "paixu": this.hproxy.paixu_guize,
                    "meili": this.hproxy.sxuan_guize.meili,
                    "wenhua": this.hproxy.sxuan_guize.xuetong,
                    "jineng": this.hproxy.sxuan_guize.skill,
                });
            }
        };
        HeiShiBuyScreen.prototype.close_self = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeiShiScreen.S_NAME);
        };
        HeiShiBuyScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (e.currentTarget != view.sort_b) {
                view.sort_g.visible = false;
            }
            if (e.currentTarget != view.sxuan_b) {
                view.sxuan_g.visible = false;
                view.guize_g.height = 200;
                view.meili_g.visible = view.xuetong_g.visible = view.skill_g.visible = false;
                view.mli_list.selectedIndex = view.skill_list.selectedIndex = view.skill_list.selectedIndex = -1;
                //     view.meili.text = "魅力下限";
                //   view.xuetong.text = "血统";
                // view.skill.text = "技能";
                if (e.currentTarget != view.ok_b) {
                    view.hproxy.sxuan_guize = {
                        "meili": 0,
                        "xuetong": 0,
                        "skill": 0
                    };
                }
                if (view.meili.text.length == 0)
                    view.meili_p.visible = true;
                if (view.xuetong.text.length == 0)
                    view.xuetong_p.visible = true;
                if (view.skill.text.length == 0)
                    view.skill_p.visible = true;
            }
            switch (e.currentTarget) {
                case view.sort_b:
                    view.sort_g.visible = !view.sort_g.visible;
                    break;
                case view.sort1_t:
                    // this.xz_p.top = 20;
                    this.send_sort_data(0);
                    break;
                case view.sort2_t://从高到低
                    // this.xz_p.top = 80;
                    this.send_sort_data(2);
                    break;
                case view.sort3_t://从低到高
                    //  this.xz_p.top = 140;
                    this.send_sort_data(1);
                    break;
                case view.sxuan_b:
                    view.hproxy.sxuan_guize = {
                        "meili": 0,
                        "xuetong": 0,
                        "skill": 0
                    };
                    view.sxuan_g.visible = !view.sxuan_g.visible;
                    break;
                case view.ok_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_BUY_DATA,
                        'page_id': 1,
                        "paixu": this.hproxy.paixu_guize,
                        //"meili(魅力下限) wenhua jieng"
                        "meili": this.hproxy.sxuan_guize.meili,
                        "wenhua": this.hproxy.sxuan_guize.xuetong,
                        "jineng": this.hproxy.sxuan_guize.skill,
                    });
                    break;
                case view.sxuanbg:
                case view.sx_close_b:
                case view.cancel_b:
                    view.sxuan_g.visible = false;
                    view.mli_list.selectedIndex = view.skill_list.selectedIndex = view.skill_list.selectedIndex = -1;
                    view.guize_g.height = 200;
                    view.meili_g.visible = view.xuetong_g.visible = view.skill_g.visible = false;
                    ///    view.meili.text = "魅力下限";
                    //   view.xuetong.text = "血统";
                    //   view.skill.text = "技能";
                    if (view.meili.text.length != 0)
                        view.meili_p.visible = false;
                    if (view.xuetong.text.length != 0)
                        view.xuetong_p.visible = false;
                    if (view.skill.text.length != 0)
                        view.skill_p.visible = false;
                    view.hproxy.sxuan_guize = {
                        "meili": 0,
                        "xuetong": 0,
                        "skill": 0
                    };
                    break;
                case view.hsb_add:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
            }
        };
        HeiShiBuyScreen.prototype.sxuan_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.meilibg_p:
                case view.meili_p:
                    view.guize_g.height = view.meili_g.visible ? 200 : 370;
                    view.sxbg_p.height = view.meili_g.visible ? 324 : 494;
                    view.xuetong_g.visible = view.skill_g.visible = false;
                    view.meili_g.visible = !view.meili_g.visible;
                    if (view.meili_g.visible) {
                        view.meilistate_p.source = "sxon_png";
                        view.skillstate_p.source = view.xuetongstate_p.source = "sxclose_png";
                    }
                    else
                        view.meilistate_p.source = "sxclose_png";
                    break;
                case view.xuetongbg_p:
                case view.xuetong_p:
                    this.guize_g.height = view.xuetong_g.visible ? 200 : 370;
                    view.sxbg_p.height = view.xuetong_g.visible ? 324 : 494;
                    view.meili_g.visible = view.skill_g.visible = false;
                    view.xuetong_g.visible = !view.xuetong_g.visible;
                    if (view.xuetong_g.visible) {
                        view.xuetongstate_p.source = "sxon_png";
                        view.skillstate_p.source = view.meilistate_p.source = "sxclose_png";
                    }
                    else
                        view.xuetongstate_p.source = "sxclose_png";
                    break;
                case view.skillbg_p:
                case view.skill_p:
                    this.guize_g.height = view.skill_g.visible ? 200 : 370;
                    view.sxbg_p.height = view.skill_g.visible ? 324 : 494;
                    view.meili_g.visible = view.xuetong_g.visible = false;
                    view.skill_g.visible = !view.skill_g.visible;
                    if (view.skill_g.visible) {
                        view.skillstate_p.source = "sxon_png";
                        view.meilistate_p.source = view.xuetongstate_p.source = "sxclose_png";
                    }
                    else
                        view.skillstate_p.source = "sxclose_png";
                    break;
            }
        };
        HeiShiBuyScreen.prototype.fresh_sxuan = function () {
            var view = this;
            // view.xuetong.text = this.hproxy.;
            // view.meili.text = ;
            // view.skill.text =;
            var xuetong_arr = mx.Lang.fzxt2;
            var arr = [];
            arr = [{ "type": "无视", "wenhua": 0 }];
            for (var i in xuetong_arr) {
                if (xuetong_arr[i] != '') {
                    arr.push({
                        "type": xuetong_arr[i],
                        "wenhua": Number(i) + 1
                    });
                }
            }
            view.xt_list.dataProvider = new eui.ArrayCollection(arr);
            var meili_arr = ["100", "90", "80", "0"];
            arr = [];
            arr = [{ "type": "无视", "mli": 0 }];
            for (var i in meili_arr) {
                arr.push({
                    "type": meili_arr[i],
                    "mli": meili_arr[i]
                });
            }
            view.mli_list.dataProvider = new eui.ArrayCollection(arr);
            //let skill_arr = [10,11,12,13,14,21,24,28,29,33,34,45,46,47,48,49];
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.ZINVSKILL);
            arr = [];
            arr = [{ "type": "无视", "skill": 0 }];
            for (var i in api) {
                arr.push({
                    "type": api[i].name,
                    "skill": api[i].id
                });
            }
            view.skill_list.dataProvider = new eui.ArrayCollection(arr);
        };
        HeiShiBuyScreen.prototype.send_sort_data = function (sid) {
            var proxy = this.hproxy;
            var facade = mx.ApplicationFacade.getInstance();
            proxy.paixu_guize = sid;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                't': mx.MX_NETS.CS_HS_BUY_DATA,
                'page_id': 1,
                "paixu": this.hproxy.paixu_guize,
                "meili": this.hproxy.sxuan_guize.meili,
                "wenhua": this.hproxy.sxuan_guize.xuetong,
                "jineng": this.hproxy.sxuan_guize.skill,
            });
        };
        /*--------------皇子列表-------------*/
        HeiShiBuyScreen.prototype.show_items = function (settime) {
            if (settime === void 0) { settime = false; }
            var view = this;
            this.fresh_hsb();
            if (view.hproxy.hs_buy_arr.length) {
                view.empty_g.visible = false;
                view.bg_p.source = "listBG_jpg";
                view.gmyfdban_p.visible = false;
                view.full_g.visible = true;
                var arr = view.hproxy.hs_buy_arr;
                view.hz_list.dataProvider = new eui.ArrayCollection(arr);
                this.page_t.text = view.hproxy.buy_page.cur_page + "/" + view.hproxy.buy_page.total_page;
            }
            else {
                view.empty_g.visible = true;
                view.bg_p.source = "hshi_bg_png";
                view.gmyfdban_p.visible = true;
                view.full_g.visible = false;
                view.con_t.text = mx.Lang.hs0018;
                view.man_p.source = "hssell_hyren_png";
                for (var i in view.hproxy.sxuan_guize) {
                    if (Number(view.hproxy.sxuan_guize[i]) > 0) {
                        view.man_p.source = "xdzi-pu_png";
                        view.con_t.text = mx.Lang.hs0029;
                        break;
                    }
                }
            }
        };
        HeiShiBuyScreen.prototype.mli_click = function (e) {
            var view = this;
            var proxy = this.hproxy;
            view.meili.text = e.item.type;
            view.meili_p.visible = false;
            proxy.sxuan_guize["meili"] = Number(e.item.mli);
            view.meili_g.visible = false;
            view.guize_g.height = 200;
            view.meilistate_p.source = "sxclose_png";
        };
        HeiShiBuyScreen.prototype.xt_click = function (e) {
            var view = this;
            var proxy = this.hproxy;
            view.xuetong.text = e.item.type;
            view.xuetong_p.visible = false;
            proxy.sxuan_guize["xuetong"] = Number(e.item.wenhua);
            view.xuetong_g.visible = false;
            view.guize_g.height = 200;
            view.xuetongstate_p.source = "sxclose_png";
        };
        HeiShiBuyScreen.prototype.skill_click = function (e) {
            var view = this;
            var proxy = this.hproxy;
            view.skill.text = e.item.type;
            view.skill_p.visible = false;
            proxy.sxuan_guize["skill"] = Number(e.item.skill);
            view.skill_g.visible = false;
            view.guize_g.height = 200;
            view.skillstate_p.source = "sxclose_png";
        };
        HeiShiBuyScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            // view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add_pos, this);
            view.sort_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sortbg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort1_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort2_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort3_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sxuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sxuanbg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.mli_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.mli_click, this);
            view.xt_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.xt_click, this);
            view.skill_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.skill_click, this);
            view.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cancel_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.meili_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.xuetong_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.skill_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.sx_close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xuetongbg_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.skillbg_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.meilibg_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sxuan_click, this);
            view.hsb_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.removeMediator(mx.HeiShiBuyScreenMediator.NAME);
        };
        HeiShiBuyScreen.S_NAME = "HeiShiBuyScreen";
        return HeiShiBuyScreen;
    }(mx.BasicView));
    mx.HeiShiBuyScreen = HeiShiBuyScreen;
    __reflect(HeiShiBuyScreen.prototype, "mx.HeiShiBuyScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiBuyScreen.js.map
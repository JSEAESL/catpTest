/**
 *   @author wf
 *   @date 2016.11.11
 *   @desc 储秀宫主界面
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
    var CXGongScreen = (function (_super) {
        __extends(CXGongScreen, _super);
        function CXGongScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.typename = ["sjxxiu", "lyqqiu"];
            return _this;
        }
        CXGongScreen.mx_support = function () {
            return ["assets.palace_cxg", "assets.palace_render"];
        };
        CXGongScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_zxd_fh":
                    tar = this.back_b;
                    tar.x -= 10;
                    break;
                case "s_zxd_sy":
                    tar = this.tab_list.getChildAt(0);
                    break;
                case "s_zxd_zd":
                    tar = this.tab_list.getChildAt(1);
                    break;
            }
            return tar;
        };
        CXGongScreen.prototype.init_view = function () {
            var view = this;
            var item_arr = [];
            view.fz_list.itemRenderer = mx.FzItemRender;
            view.cur_type = 1; //不保存type 默认为世界选秀
            for (var i = 0; i < this.typename.length; i++) {
                if (this.typename[i] != "") {
                    item_arr.push({
                        "word": this.typename[i] + '0_png',
                        "word2": this.typename[i] + '1_png',
                    });
                }
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.tab_list.selectedIndex = 0;
            for (var i = 1; i <= 3; i++) {
                view['sort' + i + '_t'].text = mx.Lang.cxg007[i - 1];
            }
            view.fz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sort_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sortbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort1_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort2_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort3_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jn_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.select_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.select_b.set_ssres("jnsxbtn_png", "jnsxwben_png");
            this.show_list();
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.CXGongScreenMediator(this));
        };
        Object.defineProperty(CXGongScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.CXGongProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        CXGongScreen.prototype.tab_click = function (e) {
            this.do_tab_click(e.itemIndex);
        };
        CXGongScreen.prototype.do_tab_click = function (item_inx) {
            var proxy = this.proxy;
            proxy.cxg_page1 = 1; //切换tab后，页数重置1
            proxy.cxg_page2 = 1;
            this.cur_type = item_inx + 1;
            this.show_select(); //帅新筛选显示，指定不显示技能技能筛选。
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                't': mx.MX_NETS.CS_CXG_DATA,
                'type': this.cur_type,
                'page': 1,
                'paixu': proxy.cxg_paixu || null,
                "skill": proxy.cxg_type == 1 ? proxy.cxg_jn_slt || 0 : 0 //子女技能
            });
        };
        CXGongScreen.prototype.show_select = function () {
            var view = this;
            if (view.cur_type == 2) {
                view.select_b.visible = false;
                view.jn_g.visible = false;
                return;
            }
            var proxy = this.proxy;
            if (proxy.cxg_jn_slt) {
                view.select_b.visible = false;
                view.jn_g.visible = true;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", proxy.cxg_jn_slt);
                var jn_t = {
                    "text": api.name,
                    "size": 22,
                    "textColor": 0x8B6EC2,
                    "textAlign": "center",
                    "horizontalCenter": 0,
                    "verticalCenter": 0,
                    "verticalAlign": "middle"
                };
                this.jn_b.set_ssres("jnsxbtn_png", jn_t);
                api = null;
            }
            else {
                view.select_b.visible = true;
                view.jn_g.visible = false;
            }
        };
        CXGongScreen.prototype.set_page = function (e) {
            var view = this;
            var proxy = this.proxy;
            var type = this.cur_type;
            var page = proxy["cxg_page" + type];
            var total = proxy['cxg_total' + type];
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                    newpage = 1;
                    break;
                case view.wye_b:
                    newpage = total;
                    break;
                case view.prev_b:
                    newpage = Math.max(1, page - 1);
                    break;
                case view.next_b:
                    newpage = Math.min(total, page + 1);
                    break;
            }
            if (page == newpage) {
                return;
            }
            proxy["cxg_page" + type] = newpage;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                't': mx.MX_NETS.CS_CXG_DATA,
                'type': type,
                'page': newpage,
                'paixu': proxy.cxg_paixu || null,
                "skill": proxy.cxg_type == 1 ? proxy.cxg_jn_slt || 0 : 0 //子女技能
            });
        };
        CXGongScreen.prototype.send_sort_data = function (sid) {
            var proxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            proxy.cxg_paixu = sid;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                't': mx.MX_NETS.CS_CXG_DATA,
                'type': proxy.cxg_type,
                "page": 1,
                "paixu": proxy.cxg_paixu,
                "skill": proxy.cxg_type == 1 ? proxy.cxg_jn_slt || 0 : 0 //子女技能
            });
        };
        CXGongScreen.prototype.btn_click = function (e) {
            var view = this;
            var proxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            if (e.currentTarget != view.sort_b) {
                view.sort_g.visible = false;
            }
            switch (e.currentTarget) {
                case view.sort_b:
                    view.sort_g.visible = !view.sort_g.visible;
                    break;
                case view.sort1_t:
                    this.send_sort_data(0);
                    break;
                case view.sort2_t:
                    this.send_sort_data(1);
                    break;
                case view.sort3_t:
                    this.send_sort_data(2);
                    break;
                case view.back_b:
                    proxy.clear_proxy_data(); //退出模块后清除模块数据，仅用于不做数据保存的模块
                    //4.0引导中，直接跳转主页进行下一步引导
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MX_COMMON.IN_GUIDE == 2 ? mx.MainScreen.S_NAME : mx.PalaceScreen.S_NAME);
                    break;
                case view.select_b: //打开筛选弹窗
                case view.jn_g:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.CxgSelectAlert.S_NAME,
                        "param": proxy.cxg_jn_slt
                    });
                    break;
            }
        };
        CXGongScreen.prototype.list_click = function (e) {
            var item = e.item;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': item });
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": item.mid,
                "type": this.cur_type == 1 ? 2 : 13
            });
        };
        CXGongScreen.prototype.show_list = function () {
            this.show_select();
            var view = this;
            var proxy = this.proxy;
            var type = view.cur_type;
            var cpage = proxy["cxg_page" + type]; //当前页
            var listdata = proxy['cxg_list' + type][cpage]; //应显示的数据
            if (!listdata || !listdata.length) {
                if (cpage > 1) {
                    cpage--;
                    return;
                }
                else {
                    this.show_tips();
                }
            }
            else {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
                for (var i = 0; i < listdata.length; i++) {
                    listdata[i].idx = i + 1;
                }
            }
            view.fz_list.dataProvider = new eui.ArrayCollection(listdata);
            var ctotal = proxy['cxg_total' + type];
            view.sort_b.visible = view.page_g.visible = !(ctotal < 2 && listdata.length < 2);
            view.page_t.text = cpage + '/' + ctotal;
        };
        CXGongScreen.prototype.show_tips = function () {
            var sj = 0;
            var type = this.cur_type;
            var proxy = this.proxy;
            if (type == 1) {
                if (proxy.cxg_jn_slt) {
                    sj = -103;
                }
                else {
                    sj = 103;
                }
            }
            else {
                sj = 104;
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HouGongSJView.S_NAME, "param": {
                    "shijian": {
                        'msg_id': sj, "jn_id": proxy.cxg_jn_slt
                    }
                }
            });
        };
        CXGongScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.fz_list.dataProvider = null;
            view.tab_list.dataProvider = null;
            view.fz_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sort_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sortbg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort1_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort2_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sort3_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jn_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.select_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.CXGongScreenMediator.NAME);
        };
        CXGongScreen.S_NAME = "CXGongScreen";
        return CXGongScreen;
    }(mx.BasicView));
    mx.CXGongScreen = CXGongScreen;
    __reflect(CXGongScreen.prototype, "mx.CXGongScreen");
})(mx || (mx = {}));
//# sourceMappingURL=CXGongScreen.js.map
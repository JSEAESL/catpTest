/**
*   @author qianjun
*   @date 2017.10.28
*   @desc 选择太傅
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
    var SelectTaiFuView = (function (_super) {
        __extends(SelectTaiFuView, _super);
        function SelectTaiFuView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.title_arr = ["jsbti1_png", "jsbti2_png", "jsbti3_png", "jsbti4_png", "jsbti5_png", "jsbti6_png"];
            _this.page_size = 8;
            return _this;
        }
        SelectTaiFuView.mx_support = function () {
            return ["assets.palace_hly_xztf", "assets.palace_render"];
        };
        Object.defineProperty(SelectTaiFuView.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        SelectTaiFuView.prototype.init_view = function () {
            var view = this;
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.hero_list.itemRenderer = mx.FzItemRender;
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.hero_arr = this.proxy.get_taifu_list();
            this.cur_page = 1;
            //标题
            this.title.source = this.title_arr[this.proxy.taifu_type - 1];
            //小德子提示语
            var i = (this.proxy.taifu_type - 1) * 2;
            this.ts_t.text = mx.Tools.format(mx.Lang.hg117, mx.Lang.hgcaiyi[i], mx.Lang.hgcaiyi[i + 1]);
            //待选总数
            this.mache_num_t.text = mx.Tools.format(mx.Lang.hg122, this.hero_arr.length);
            this.mache_dchen.width = this.mache_num_t.width + 16;
            this.fresh_screen();
        };
        SelectTaiFuView.prototype.fresh_screen = function () {
            var page = this.cur_page;
            var hero_arr = this.hero_arr.splice((page - 1) * 8, page * 8);
            if (hero_arr.length) {
                this.hero_list.dataProvider = new eui.ArrayCollection(hero_arr);
                var total = this.hero_arr.length;
                this.max_num = Math.max(Math.ceil(total / this.page_size), 1);
                this.page_t.text = this.cur_page + "/" + this.max_num;
            }
            else {
                var i = (this.proxy.taifu_type - 1) * 2;
                this.no_tip = new mx.EmptyTip({
                    "xdz": "tshi",
                    "text": mx.Tools.format(mx.Lang.hg118, mx.Lang.hgcaiyi[i], mx.Lang.hgcaiyi[i + 1]),
                });
                this.addChild(this.no_tip);
                this.tishi_g.visible = false;
                this.fanye_g.visible = false;
            }
        };
        SelectTaiFuView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.hero_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.SelectFZViewMediator.NAME);
        };
        SelectTaiFuView.prototype.hero_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str;
            switch (Number(e.item.status)) {
                case 1:
                    str = mx.Lang.hg125;
                    break;
                case 2:
                case 3:
                case 4:
                    str = mx.Lang.hg126;
                    break;
                case 6:
                    str = mx.Lang.hg127;
                    break;
                case 0:
                case -1:
                case 7:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_XUANZE_TAIFU,
                        "id": this.proxy.taifu_type,
                        "feizi_id": e.item.id,
                    });
                    break;
            }
            if (str) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        SelectTaiFuView.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var page = this.cur_page;
            switch (e.currentTarget) {
                case this.first_b:
                    page = 1;
                    break;
                case this.pre_b:
                    page = Math.max(1, page - 1);
                    break;
                case this.next_b:
                    page = Math.min(this.max_num, page + 1);
                    break;
                case this.last_b:
                    page = this.max_num;
                    break;
            }
            if (this.cur_page == page) {
                return;
            }
            this.cur_page = page;
            this.fresh_screen();
        };
        SelectTaiFuView.prototype.back_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            this.proxy.taifu_type = null;
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, SelectTaiFuView.S_NAME);
        };
        SelectTaiFuView.S_NAME = "SelectTaiFuView";
        SelectTaiFuView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return SelectTaiFuView;
    }(mx.BasicView));
    mx.SelectTaiFuView = SelectTaiFuView;
    __reflect(SelectTaiFuView.prototype, "mx.SelectTaiFuView");
})(mx || (mx = {}));
//# sourceMappingURL=SelectTaiFuView.js.map
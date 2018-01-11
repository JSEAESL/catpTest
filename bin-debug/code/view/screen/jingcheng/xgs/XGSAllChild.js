/**
 *   @author hxj
 *   @date 2017.7.10
 *   @desc 相国寺 子女谥号
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
    var XGSAllChild = (function (_super) {
        __extends(XGSAllChild, _super);
        function XGSAllChild() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.typename = ["whssznv", "lgssznv"];
            return _this;
        }
        XGSAllChild.mx_support = function () {
            return ["assets.xgs_znsh", "api.JINJI", "api.GUANXI", "api.XINGGE"];
        };
        XGSAllChild.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.zinv_list.itemRenderer = mx.XGSChildRender;
            var item_arr = [];
            for (var i = 0; i < this.typename.length; i++) {
                if (this.typename[i] != "") {
                    item_arr.push({
                        "word": this.typename[i] + '_png',
                        "word2": this.typename[i] + '2_png',
                    });
                }
            }
            this.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.type_list.dataProvider = new eui.ArrayCollection(item_arr);
            this.type_list.selectedIndex = 0;
            this.fresh_screen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XGSAllChildMediator(this));
        };
        Object.defineProperty(XGSAllChild.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSAllChild.prototype.fresh_screen = function () {
            var proxy = this.proxy;
            this.type = proxy.cur_xgs_type;
            //this.type_list.selectedIndex = this.type - 1;
            var zinv_arr = proxy["xgs_list" + this.type];
            if (this.proxy.total_len == 0 && this.type > 0) {
                if (this.no_tip) {
                    this.removeChildAt(this.numChildren - 1);
                    this.no_tip = null;
                }
                this.no_tip = new mx.EmptyTip({
                    "xdz": "pu",
                    "text": mx.Tools.format(mx.Lang.xgs08, this.type == 1 ? mx.Lang.wh : mx.Lang.lg)
                });
                this.addChild(this.no_tip);
                this.page_g.visible = false;
                this.zinv_list.dataProvider = null;
            }
            else {
                if (this.no_tip) {
                    this.removeChildAt(this.numChildren - 1);
                    this.no_tip = null;
                }
                this.zinv_list.dataProvider = new eui.ArrayCollection(zinv_arr);
                ////console.log(zinv_arr);
                this.page_g.visible = true;
                this.page_t.text = proxy.cur_page[this.type] + "/" + proxy.total_page;
            }
        };
        XGSAllChild.prototype.type_click = function (e) {
            this.type = e.itemIndex + 1;
            this.proxy.new_page = true;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_XGS_ZINV,
                "page": this.proxy.cur_page[this.type],
                "type": this.type
            });
        };
        XGSAllChild.prototype.set_page = function (e) {
            var cur_page = this.proxy.cur_page[this.type];
            var total_page = this.proxy.total_page;
            var new_page;
            switch (e.currentTarget) {
                case this.sye_b:
                    new_page = 1;
                    break;
                case this.prev_b:
                    new_page = Math.max(1, cur_page - 1);
                    break;
                case this.wye_b:
                    new_page = total_page;
                    break;
                case this.next_b:
                    new_page = Math.min(total_page, cur_page + 1);
                    break;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (new_page != cur_page) {
                this.proxy.new_page = true;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_XGS_ZINV,
                    "page": new_page,
                    "type": 2 - this.type
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs04 });
            }
        };
        XGSAllChild.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.back_b:
                    this.proxy.reset();
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSScreen.S_NAME);
                    break;
            }
        };
        XGSAllChild.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.zinv_list.dataProvider = null;
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.XGSAllChildMediator.NAME);
        };
        XGSAllChild.S_NAME = "XGSAllChild";
        return XGSAllChild;
    }(mx.BasicView));
    mx.XGSAllChild = XGSAllChild;
    __reflect(XGSAllChild.prototype, "mx.XGSAllChild");
})(mx || (mx = {}));
//# sourceMappingURL=XGSAllChild.js.map
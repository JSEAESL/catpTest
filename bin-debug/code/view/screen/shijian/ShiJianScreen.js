/**
 *   @author qianjun、cy、mx
 *   @date 2015.1.3 2016.10.9
 *   @desc 事件主界面
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
    var ShiJianScreen = (function (_super) {
        __extends(ShiJianScreen, _super);
        function ShiJianScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_type = 0; //
            return _this;
        }
        ShiJianScreen.mx_support = function () {
            return ["assets.sjian", "api.JINJI", "api.PINLI"];
        };
        ShiJianScreen.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.sjian_list.itemRenderer = mx.ShiJianRender;
            var arr = [];
            //let png_arr = ["sjsbing_btn_png","sjlyin_btn_png","sjbfang_btn_png","sjlduo_btn_png","sjgdou_btn_png","sjtxi_btn_png","sjqjia_btn_png","sjzshi_btn_png","sjhyzji_btn_png"];
            var png_arr = ["sjsbing_btn_png", "sjlyin_btn_png", "sjgdou_btn_png"];
            for (var i in png_arr) {
                arr.push({
                    "bg": png_arr[i],
                    "click": true,
                });
            }
            view.type_list.dataProvider = new eui.ArrayCollection(arr);
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            view.type_list.selectedIndex = this.cur_type = dproxy.shijian_type;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            facade.registerMediator(new mx.ShiJianScreenMediator(this));
            if (this.cur_type == 0) {
                this.show_list();
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_SHIJIAN,
                    "type": this.cur_type
                });
            }
        };
        Object.defineProperty(ShiJianScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ShiJianScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.back_b:
                    this.proxy.sjian_ly_info = null;
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    dproxy.sjian_ly_info = null;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.AppConfig.PREV_SCENE_ID == mx.PalaceScreen.S_NAME ? mx.PalaceScreen.S_NAME : mx.MainScreen.S_NAME);
                    break;
            }
        };
        ShiJianScreen.prototype.page_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var cur_type = this.cur_type;
            switch (e.currentTarget) {
                case view.prev_b:
                    --cur_type;
                    break;
                case view.next_b:
                    ++cur_type;
                    break;
            }
            if (cur_type > 2 || cur_type < 0) {
                return;
            }
            var obj = view.type_list.dataProvider.getItemAt(cur_type);
            if (obj.lock) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0067 });
                this.type_list.selectedIndex = this.cur_type;
                return;
            }
            view.type_list.selectedIndex = view.cur_type = cur_type;
            view.type_scro.viewport.scrollH = 138 * cur_type;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_SHIJIAN,
                "type": this.cur_type
            });
        };
        ShiJianScreen.prototype.type_click = function (e) {
            var view = this;
            view.sjian_scro.stopAnimation();
            view.sjian_list.scrollV = 0;
            //选择
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.lock) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0067 });
                this.type_list.selectedIndex = this.cur_type;
                return;
            }
            if (this.cur_type == e.itemIndex) {
                return;
            }
            this.cur_type = e.itemIndex;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_SHIJIAN,
                "type": this.cur_type
            });
        };
        ShiJianScreen.prototype.show_list = function () {
            var view = this;
            var data = this.proxy.sjian_info;
            var arr = [];
            if (this.cur_type == 0) {
                for (var i in data.sb) {
                    arr.push(data.sb[i]);
                }
                for (var i in data.siwang) {
                    arr.push(data.siwang[i]);
                }
            }
            else {
                arr = data.data || [];
            }
            if (arr) {
                for (var i in arr) {
                    arr[i].type = this.cur_type;
                }
                if (arr.length) {
                    switch (this.cur_type) {
                        case 0: //生病
                        case 1://结缘
                            this.sjian_list.itemRenderer = mx.ShiJianRender;
                            break;
                        default://后宫事件
                            this.sjian_list.itemRenderer = mx.ShiJianRender2;
                            break;
                    }
                    var old = view.sjian_scro.viewport.scrollV;
                    view.sjian_list.dataProvider = new eui.ArrayCollection(arr);
                    view.sjian_list.validateNow();
                    view.sjian_scro.viewport.scrollV = old;
                    if (this.no_tip) {
                        this.removeChildAt(this.numChildren - 1);
                        this.no_tip = null;
                    }
                }
                else {
                    this.sjian_list.dataProvider = null;
                    if (this.no_tip) {
                        this.removeChildAt(this.numChildren - 1);
                        this.no_tip = null;
                    }
                    this.no_tip = new mx.EmptyTip({
                        "xdz": "xiao",
                        "text": mx.Lang.sjian016[this.cur_type]
                    });
                    this.addChild(this.no_tip);
                }
            }
        };
        ShiJianScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.ShiJianScreenMediator.NAME);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            this.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            this.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.type_list.dataProvider = null;
            this.sjian_list.dataProvider = null;
        };
        ShiJianScreen.S_NAME = "ShiJianScreen";
        return ShiJianScreen;
    }(mx.BasicView));
    mx.ShiJianScreen = ShiJianScreen;
    __reflect(ShiJianScreen.prototype, "mx.ShiJianScreen");
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianScreen.js.map
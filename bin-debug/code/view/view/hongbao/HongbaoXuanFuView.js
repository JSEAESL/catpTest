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
/**
 * @qianjun 2017-7-4
 * 2016.9.6
 *  红包alert
 */
var mx;
(function (mx) {
    var HongbaoXuanFuView = (function (_super) {
        __extends(HongbaoXuanFuView, _super);
        function HongbaoXuanFuView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HongbaoXuanFuView.mx_support = function () {
            return ["assets.hbxf"];
        };
        Object.defineProperty(HongbaoXuanFuView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return facade.retrieveProxy(mx.GameProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        HongbaoXuanFuView.prototype.init_view = function () {
            var view = this;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.rect_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.jtou_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.role_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cjian_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ser_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ser_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.ser_click, this);
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.role_t.textFlow = [{ "text": "找不到角色？", "style": { "underline": true } }];
            this.fresh_view();
        };
        HongbaoXuanFuView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.jtou_p:
                case view.ser_p:
                    view.ser_g.visible = view.rect.touchEnabled = !view.ser_g.visible;
                    break;
                case view.rect:
                    view.ser_g.visible = view.rect.touchEnabled = false;
                    break;
                case view.cjian_p:
                    facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP, view.ser_info);
                    view.close_self();
                    break;
            }
        };
        HongbaoXuanFuView.prototype.ser_click = function (e) {
            var item = e.item;
            var view = this;
            view.ser_info = item;
            view.ser_g.visible = view.rect.touchEnabled = false;
            view.ser_t.text = item.ser;
            view.name_t.text = item.name;
        };
        HongbaoXuanFuView.prototype.fresh_view = function () {
            var view = this;
            //游戏服
            view.ser_g.visible = false;
            view.rect.touchEnabled = false;
            var arr = [];
            var data = this.gproxy.hb_mode_data.fuwuqi;
            for (var i in data) {
                var unit = data[i];
                arr.push({
                    "ser": "游戏" + (unit.sid) + "服",
                    "sid": unit.sid,
                    "user_id": unit.user_id,
                    "name": unit.name
                });
            }
            view.ser_list.dataProvider = new eui.ArrayCollection(arr);
            view.ser_list.selectedIndex = 0;
            view.ser_info = arr[0];
            view.ser_t.text = arr[0].ser;
            view.name_t.text = arr[0].name;
        };
        HongbaoXuanFuView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.ser_list.dataProvider = null;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.jtou_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.role_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ser_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cjian_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ser_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.ser_click, this);
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rect_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        HongbaoXuanFuView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HongbaoXuanFuView.S_NAME);
        };
        HongbaoXuanFuView.S_NAME = "HongbaoXuanFuView";
        return HongbaoXuanFuView;
    }(mx.BasicView));
    mx.HongbaoXuanFuView = HongbaoXuanFuView;
    __reflect(HongbaoXuanFuView.prototype, "mx.HongbaoXuanFuView");
})(mx || (mx = {}));
//# sourceMappingURL=HongbaoXuanFuView.js.map
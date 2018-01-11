/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 背包使用物品弹窗
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
    var PackUseItemView = (function (_super) {
        __extends(PackUseItemView, _super);
        function PackUseItemView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PackUseItemView.mx_support = function () {
            return ["assets.pack_use"];
        };
        PackUseItemView.prototype.init_view = function () {
            var cd = this.adata;
            var view = this;
            view.num = 1;
            view.add_b.set_ssres("csjiahao_png");
            view.sub_b.set_ssres("csjhao_png");
            view.max_b.set_ssres("djcszda_png");
            //物品图标
            view.icon.data = {
                "id": cd.item_id,
                "type": 4,
                "no_tip": true,
                "chicun": 90
            };
            //获取物品信息
            this.item_info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            var item = this.item_info;
            //物品名+拥有数量文本
            var font = mx.MX_COMMON.DFT_FONT;
            var text = mx.Tools.format(mx.Lang.h0037, cd.has);
            this.item_name_t.text = item.name;
            this.item_desc_t.text = item.Description;
            //卖出和使用的界面切换
            view.title.source = "titile_useitem";
            view.select_num_t.text = mx.Lang.p0048;
            view.has_t.text = mx.Tools.format(mx.Lang.p0059, cd.has);
            ;
            view.sell_b.set_ssres("qrsyong_png");
            //显示数目
            this.show_num();
            view.init_listener();
        };
        PackUseItemView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, PackUseItemView.S_NAME);
        };
        PackUseItemView.prototype.init_listener = function () {
            var view = this;
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sub_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.max_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sell_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sell_click, this);
            view.num_ed.addEventListener(egret.Event.CHANGE, this.check_str, this);
            view.num_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            view.num_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
        };
        PackUseItemView.prototype.check_str = function (e) {
            var str = this.num_ed.text;
            this.num_ed.text = mx.Tools.check_num_str(str);
            this.sell_b.touchEnabled = false;
        };
        PackUseItemView.prototype.init_str = function (e) {
        };
        PackUseItemView.prototype.check_end = function (e) {
            var pattern = /[0-9]+/g;
            var str = this.num_ed.text;
            this.num_ed.text = "";
            if (str == "" || !pattern.test(str)) {
                str = 1;
            }
            else if (this.adata.has > 0 && Number(str) > this.adata.has) {
                str = 1;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.p0017
                });
            }
            this.num = Number(str);
            this.sell_b.touchEnabled = true;
            this.show_num();
        };
        PackUseItemView.prototype.num_click = function (e) {
            var view = this;
            var cd = this.adata;
            switch (e.currentTarget) {
                case view.add_b:
                    ++this.num;
                    break;
                case view.sub_b:
                    --this.num;
                    break;
                case view.max_b:
                    this.num = cd.has;
                    break;
            }
            this.show_num();
        };
        PackUseItemView.prototype.show_num = function () {
            var view = this;
            var cd = this.adata;
            if (this.num < 1) {
                this.num = 1;
            }
            if (this.num > cd.has) {
                this.num = cd.has;
            }
            view.num_ed.text = this.num + "";
            var item = this.item_info;
        };
        PackUseItemView.prototype.sell_click = function () {
            var cd = this.adata;
            var c_t;
            switch (cd.style) {
                case "sell":
                    c_t = mx.MX_NETS.CS_PACK_SELL_ITEM;
                    break;
                case "use":
                    c_t = mx.MX_NETS.CS_PACK_USE_TILI_ITEM;
                    break;
                case "uselb":
                    c_t = mx.MX_NETS.CS_PACK_LIBAO_USE;
                    break;
            }
            var param = {
                "t": c_t,
                "num": this.num,
                "item_id": cd.item_id,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
        };
        PackUseItemView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sub_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.max_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sell_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sell_click, this);
            view.num_ed.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            view.num_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            view.num_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
        };
        PackUseItemView.S_NAME = "PackUseItemView";
        return PackUseItemView;
    }(mx.BasicView));
    mx.PackUseItemView = PackUseItemView;
    __reflect(PackUseItemView.prototype, "mx.PackUseItemView");
})(mx || (mx = {}));
//# sourceMappingURL=PackUseItemView.js.map
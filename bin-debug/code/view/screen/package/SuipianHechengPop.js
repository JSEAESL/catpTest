/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 背包卖出物品弹窗
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
    var SuipianHechengPop = (function (_super) {
        __extends(SuipianHechengPop, _super);
        function SuipianHechengPop() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 1;
            return _this;
        }
        SuipianHechengPop.mx_support = function () {
            return ["assets.pack_sphc"];
        };
        Object.defineProperty(SuipianHechengPop.prototype, "packProxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        SuipianHechengPop.prototype.init_view = function () {
            var cd = this.adata;
            var view = this;
            view.cost_price.text = mx.Lang.hchf + "：";
            //获取物品信息
            this.item_info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "Component1", cd.suipian_id);
            var item = this.item_info;
            var euip_id = item.id;
            var suipian = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.suipian_id);
            var equip = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", euip_id);
            view.suipian.data = {
                "id": cd.suipian_id,
                "type": 4,
                "notip": true,
                "chicun": 120,
            };
            view.spian_has_t.text = mx.Tools.format(mx.Lang.p0059, cd.has.toString() + "/" + item.Component1Count);
            view.equip.data = {
                "id": euip_id,
                "type": 4,
                "notip": true,
                "chicun": 120,
            };
            view.equip_has_t.text = mx.Tools.format(mx.Lang.p0059, this.packProxy.get_item_num(euip_id).toString());
            //view.title_t.text = Lang.hecheng + equip.name;
            view.suipian_name_t.text = suipian.name;
            view.equip_name_t.text = equip.name;
            view.num = 1;
            this.show_num();
            view.init_listener();
        };
        SuipianHechengPop.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, SuipianHechengPop.S_NAME);
        };
        SuipianHechengPop.prototype.init_listener = function () {
            var view = this;
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sub_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.max_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.hcheng_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hecheng_click, this);
        };
        SuipianHechengPop.prototype.num_click = function (e) {
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
        SuipianHechengPop.prototype.show_num = function () {
            var view = this;
            var cd = this.adata;
            var item = this.item_info;
            var total = Math.floor(cd.has / parseInt(item.Component1Count));
            if (this.num > total) {
                this.num = total;
            }
            if (this.num < 1) {
                this.num = 1;
            }
            var font = mx.MX_COMMON.DFT_FONT;
            view.num_t.text = this.num + "/" + total;
            view.spian_has_t.text = mx.Tools.format(mx.Lang.p0059, cd.has.toString() + "/" + item.Component1Count * this.num);
            view.cost_price_t.text = (this.num * parseInt(item.Expense)).toString();
        };
        SuipianHechengPop.prototype.hecheng_click = function () {
            var cd = this.adata;
            var item = this.item_info;
            var app = mx.ApplicationFacade.getInstance();
            this.packProxy.set_hcheng_num(this.num);
            app.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_PACK_EQUIP_HECHENG, "id": item.id, "num": this.num
            });
        };
        SuipianHechengPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sub_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.max_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.hcheng_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hecheng_click, this);
        };
        SuipianHechengPop.S_NAME = "SuipianHechengPop";
        return SuipianHechengPop;
    }(mx.BasicView));
    mx.SuipianHechengPop = SuipianHechengPop;
    __reflect(SuipianHechengPop.prototype, "mx.SuipianHechengPop");
})(mx || (mx = {}));
//# sourceMappingURL=SuipianHechengPop.js.map
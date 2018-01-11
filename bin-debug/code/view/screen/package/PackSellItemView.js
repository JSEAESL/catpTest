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
    var PackSellItemView = (function (_super) {
        __extends(PackSellItemView, _super);
        function PackSellItemView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 1;
            _this.move_mode = false;
            return _this;
        }
        PackSellItemView.mx_support = function () {
            return ["assets.pack_sell"];
        };
        PackSellItemView.prototype.init_view = function () {
            var cd = this.adata;
            var flag = cd.style == "sell";
            var view = this;
            //view.pro_bar.set_res({"up" : "djcsjdtdchen_png","down" : "djcsjdtiao_png"});
            /*   view.num = 1;
               view.hdong_sli.minimum = 1;//定义最小值
               view.hdong_sli.maximum = Number(cd.has);//定义最大值
               view.hdong_sli.value = 1;//定义默认值
               let sli_obj = {
                   "up": "djcsjdtiao_png",
                   "down": "djcsjdtdchen_png",
                   "middle": "djcshkuai_png",
               }
               view.hdong_sli.set_res(sli_obj);
               view.hdong_sli.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);*/
            //物品图标
            view.icon.data = {
                "id": cd.item_id,
                "type": 4,
                "no_tip": true,
            };
            //获取物品信息
            this.item_info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            var item = this.item_info;
            //物品名+拥有数量文本
            this.item_name_t.text = item.name;
            //显示数目
            this.show_num(1);
            view.init_listener();
            this.init_splider();
        };
        PackSellItemView.prototype.init_splider = function () {
            var cd = this.adata;
            var sli_obj = {
                "up": "sellbar_png",
                "down": "djcsjdtdchen_png",
                "middle": "djcshkuai_png",
                "jiugong_up": [4, 4, 215, 7],
                "jiugong_down": [4, 4, 215, 7],
                "thumbposition": -24,
                "highlightstartx": 71,
                "highlightheight": 12,
                "trackwidth": 368,
                "highlightwidth": 368,
            };
            this.hdong_sli.set_res(sli_obj);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_END, this.remove_move, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.hdong_sli.minimum = 0;
            this.hdong_sli.maximum = cd.has;
            ////console.log(cd.has)
            this.hdong_sli.init_value(0);
            this.hdong_sli.width = 368;
        };
        PackSellItemView.prototype.pre_move = function (evt) {
            var view = this;
            this.start_x = evt.stageX;
            var target = view.hdong_sli;
            target.thumb.horizontalCenter = this.start_x - 360;
            target.set_value();
            target.set_mask();
            this.show_num(target.value);
            this.move_mode = true;
        };
        PackSellItemView.prototype.remove_move = function (evt) {
            this.move_mode = false;
        };
        PackSellItemView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, PackSellItemView.S_NAME);
        };
        PackSellItemView.prototype.changeHandler = function (evt) {
            var view = this;
            var target = view.hdong_sli;
            if (this.move_mode && Math.abs(target.thumb.horizontalCenter) <= target.width / 2) {
                var newx = evt.stageX;
                var mv = newx - this.start_x;
                this.start_x = evt.stageX;
                target.thumb.horizontalCenter += mv;
                target.set_value();
                target.set_mask();
            }
            this.show_num(target.value);
        };
        PackSellItemView.prototype.init_listener = function () {
            var view = this;
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.plus_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.minus_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sell_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sell_click, this);
        };
        PackSellItemView.prototype.num_click = function (e) {
            var view = this;
            var cd = this.adata;
            switch (e.currentTarget) {
                case view.minus_b:
                    this.num = Math.max(this.num - 1, 1);
                    this.hdong_sli.init_value(this.num);
                    break;
                case view.plus_b:
                    this.num = Math.min(this.num + 1, Number(cd.has));
                    this.hdong_sli.init_value(this.num);
                    break;
            }
            /*  this.hdong_sli.value = this.num;*/
            this.show_num(this.num);
        };
        PackSellItemView.prototype.show_num = function (n1) {
            var view = this;
            var cd = this.adata;
            var item = this.item_info;
            view.sell_t1.text = n1;
            view.sell_t2.text = "/" + Number(cd.has);
            view.total_price_t.text = Number(this.item_info.Sellprice) * n1 + "";
            this.num = n1;
        };
        PackSellItemView.prototype.sell_click = function () {
            var cd = this.adata;
            var item = this.item_info;
            var app = mx.ApplicationFacade.getInstance();
            var flag = cd.style == "sell";
            var param = {
                "t": flag ? mx.MX_NETS.CS_PACK_SELL_ITEM : mx.MX_NETS.CS_PACK_USE_TILI_ITEM,
                "num": this.hdong_sli.value,
                "item_id": this.adata.item_id,
            };
            app.sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
        };
        PackSellItemView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.minus_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.plus_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            view.sell_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sell_click, this);
            view.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            view.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            view.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_END, this.remove_move, this);
            view.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
        };
        PackSellItemView.S_NAME = "PackSellItemView";
        return PackSellItemView;
    }(mx.BasicView));
    mx.PackSellItemView = PackSellItemView;
    __reflect(PackSellItemView.prototype, "mx.PackSellItemView");
})(mx || (mx = {}));
//# sourceMappingURL=PackSellItemView.js.map
/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 生病事件赐药弹窗
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
    var ShiJianCiYaoView = (function (_super) {
        __extends(ShiJianCiYaoView, _super);
        function ShiJianCiYaoView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //培元丹 续命丹 九转还魂丹
            _this.arr = ["2026", "2027", "2028", "2029"];
            _this.qmdu = ['3', '7', '30', '0'];
            return _this;
        }
        ShiJianCiYaoView.mx_support = function () {
            return ["assets.sjciyao", "api.EQUIP"];
        };
        ShiJianCiYaoView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            view.title.text = mx.Lang.sjian009; //Tools.format(Lang.hy033, cd.name);
            this.id = cd.user_id;
            this.price = [];
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            for (var i = 0; i <= 3; ++i) {
                var item_id = this.arr[i];
                view["item" + i].source = "item" + item_id + "_png";
                var item = mx.Tools.get_item_info(4, item_id);
                view["name" + i + '_t'].text = item.name;
                view["qmdu" + i + '_t'].text = i < 3 ? mx.Tools.format(mx.Lang.sjian007, this.qmdu[i]) : mx.Lang.sjian008;
                var num = pProxy.get_item_num(parseInt(item_id));
                view['num' + i + '_t'].text = num + '';
                var numstr = num + '';
                view['tshi' + i].width = 24 + Math.max(0, numstr.length - 2) * 10;
                view['tshi' + i].visible = view['num' + i + '_t'].visible = num > 0;
                view["item" + i + "_b"].set_ssres(num ? "sjysjjsbsci_png" : "hygmai_png");
                view["item" + i + "_b"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.send_gift, this);
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", item_id);
                view["price" + i + "_t"].text = api.Buyprice2 + '';
                this.price.push(item.Buyprice2);
            }
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ShiJianCiYaoViewMediator(this));
        };
        ShiJianCiYaoView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ShiJianCiYaoView.S_NAME);
        };
        ShiJianCiYaoView.prototype.fresh_pop = function () {
            var view = this;
            //this.id = data.user_id;
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            for (var i = 0; i <= 3; ++i) {
                var item_id = this.arr[i];
                var item = mx.Tools.get_item_info(4, item_id);
                var num = pProxy.get_item_num(parseInt(item_id));
                view["name" + i + "_t"].text = item.name;
                view['num' + i + '_t'].text = num + '';
                var numstr = num + '';
                view['tshi' + i].width = 24 + Math.max(0, numstr.length - 2) * 10;
                view['tshi' + i].visible = view['num' + i + '_t'].visible = num > 0;
                view["item" + i + "_b"].set_ssres(num ? "sjysjjsbsci_png" : "hygmai_png");
            }
        };
        ShiJianCiYaoView.prototype.send_gift = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var idx = 0;
            for (var i = 0; i <= 3; ++i) {
                if (e.currentTarget == view['item' + i + '_b']) {
                    idx = i;
                    break;
                }
            }
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            var num = pProxy.get_item_num(parseInt(this.arr[idx]));
            if (num > 0) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_FZ_SCDJ,
                    "id": this.adata.id,
                    "item_id": this.arr[idx],
                    "zinv_id": this.adata.zinv_id
                });
            }
            else {
                var a_d = {
                    "param": {
                        "item": this.arr[idx],
                        "price": this.price[idx]
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ShiJianCiYaoView.S_NAME);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": a_d
                });
            }
        };
        ShiJianCiYaoView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            for (var i = 0; i <= 3; ++i) {
                view["item" + i + "_b"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.send_gift, this);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.ShiJianCiYaoViewMediator.NAME);
        };
        ShiJianCiYaoView.S_NAME = "ShiJianCiYaoView";
        return ShiJianCiYaoView;
    }(mx.BasicView));
    mx.ShiJianCiYaoView = ShiJianCiYaoView;
    __reflect(ShiJianCiYaoView.prototype, "mx.ShiJianCiYaoView");
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianCiYaoView.js.map
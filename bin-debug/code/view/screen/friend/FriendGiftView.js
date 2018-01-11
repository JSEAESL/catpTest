/**
 *   @author wf
 *   @date 2017.2.22
 *   @desc 好友送礼弹窗
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
    var FriendGiftView = (function (_super) {
        __extends(FriendGiftView, _super);
        function FriendGiftView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.arr = ["2007", "2008", "2009", "2021"];
            _this.qmdu = [1, 5, 10, 50];
            return _this;
        }
        FriendGiftView.mx_support = function () {
            return ["assets.friend_hd"];
        };
        FriendGiftView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            view.title.text = mx.Tools.format(mx.Lang.hy033, cd.name);
            this.id = cd.user_id;
            this.price = [];
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            for (var i = 0; i <= 3; ++i) {
                var item_id = this.arr[i];
                view["item" + i].source = "item" + item_id + "_png";
                var item = mx.Tools.get_item_info(4, item_id);
                view["name" + i + '_t'].text = item.name;
                view["qmdu" + i + '_t'].text = mx.Lang.qmdu + '+' + this.qmdu[i];
                var num = pProxy.get_item_num(parseInt(item_id));
                view['num' + i + '_t'].text = num + '';
                var numstr = num + '';
                view['tshi' + i].width = 36 + Math.max(0, numstr.length - 2) * 15;
                view['tshi' + i].visible = view['num' + i + '_t'].visible = num > 0;
                view["item" + i + "_b"].set_ssres(num ? "hyzsong_png" : "hygmai_png");
                view["item" + i + "_b"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.send_gift, this);
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", item_id);
                view["price" + i + "_t"].text = api.Buyprice2 + '';
                this.price.push(item.Buyprice2);
            }
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        FriendGiftView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, FriendGiftView.S_NAME);
        };
        FriendGiftView.prototype.fresh_pop = function (data) {
            var view = this;
            this.adata = data;
            this.id = data.user_id;
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
            for (var i = 0; i <= 3; ++i) {
                var item_id = this.arr[i];
                var item = mx.Tools.get_item_info(4, item_id);
                var num = pProxy.get_item_num(parseInt(item_id));
                view["name" + i + "_t"].text = item.name;
                view['num' + i + '_t'].text = num + '';
                var numstr = num + '';
                view['tshi' + i].width = 36 + Math.max(0, numstr.length - 2) * 15;
                view['tshi' + i].visible = view['num' + i + '_t'].visible = num > 0;
                view["item" + i + "_b"].set_ssres(num ? "hyzsong_png" : "hygmai_png");
            }
        };
        FriendGiftView.prototype.send_gift = function (e) {
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
                    "t": mx.MX_NETS.CS_FRIEND_GIFT,
                    "liwu": idx + 1,
                    "to_id": this.id
                });
            }
            else {
                var a_d = {
                    "param": {
                        "item": this.arr[idx],
                        "price": this.price[idx],
                        "notice_exit": mx.MX_NOTICE.POP_VIEW,
                        "sdata_exit": {
                            "name": FriendGiftView.S_NAME,
                            "param": this.adata
                        }
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FriendGiftView.S_NAME);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": a_d
                });
            }
        };
        FriendGiftView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            for (var i = 0; i <= 3; ++i) {
                view["item" + i + "_b"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.send_gift, this);
            }
        };
        FriendGiftView.S_NAME = "FriendGiftView";
        return FriendGiftView;
    }(mx.BasicView));
    mx.FriendGiftView = FriendGiftView;
    __reflect(FriendGiftView.prototype, "mx.FriendGiftView");
})(mx || (mx = {}));
//# sourceMappingURL=FriendGiftView.js.map
/**
*   @author cy
*   @date 2016.11.23
*   @desc 商城数据管理
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
    var ShopProxy = (function (_super) {
        __extends(ShopProxy, _super);
        function ShopProxy() {
            return _super.call(this, ShopProxy.NAME) || this;
        }
        ShopProxy.prototype.init_shop_info = function (data) {
            this.temai = data.temai;
            this.tmcishu = data.goumai;
            this.clo_arr = data.clo_arr;
            this.fresh_num = Number(data.shuaxin);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 3 });
            //this.sendNotification(MX_NOTICE.SCENE_CHANGE, {"sname" : mx.ClothShopScreen.S_NAME});
        };
        ShopProxy.prototype.fresh_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2:
                    this.temai = data.temai;
                    for (var k in this.temai) {
                        this.tmcishu[k] = 0;
                    }
                    this.fresh_num = data.shuaxin;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
                    str = mx.Lang.p0079;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ShopProxy.prototype.buy_cb = function (data) {
            var str = "";
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.p0070;
                    break;
                case 2:
                    str = mx.Lang.p0020;
                    for (var k in this.temai) {
                        if (Number(this.temai[k]) == Number(data.id)) {
                            this.tmcishu[k] = 1;
                            break;
                        }
                    }
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SHOP, "id", data.id);
                    if (Number(api.type) == 9) {
                        this.clo_arr[api.item_id] = 1;
                    }
                    this.sendNotification(mx.MX_NOTICE.CLOTH_QHZZSJ_SUCC);
                    this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
                    break;
                case 3:
                    str = mx.Lang.p0071;
                    break;
                case 4:
                    str = mx.Lang.p0072;
                    break;
                case 5:
                    str = mx.Lang.p0073;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ShopProxy.NAME = "ShopProxy";
        return ShopProxy;
    }(puremvc.Proxy));
    mx.ShopProxy = ShopProxy;
    __reflect(ShopProxy.prototype, "mx.ShopProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShopProxy.js.map
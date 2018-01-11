/**
*   @author cy
*   @date 2017.3.30
*   @desc 直购弹窗
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
    var BuyZhiGouAlert = (function (_super) {
        __extends(BuyZhiGouAlert, _super);
        function BuyZhiGouAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuyZhiGouAlert.mx_support = function () {
            return ["assets.recharge_gift", "api.CHARGELIBAO"];
        };
        BuyZhiGouAlert.prototype.init_view_by_type = function () {
            this.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_zhigou, this);
            var apis = mx.Tools.get_c_zllb(this.adata);
            this.item_list.itemRenderer = mx.ZhiGouRender;
            apis[apis.length - 1].noxian = true;
            this.item_list.dataProvider = new eui.ArrayCollection(apis);
            this.limit_t.text = mx.Lang["r00" + (23 + Number(apis[0].limit))];
            this.limit_t.visible = this.adata != 10;
            this.title_t.text = mx.Lang["r00" + (19 + this.adata)] + mx.Lang.r0027;
            this.price_t.text = this.adata == 10 ? "680" : "880";
        };
        BuyZhiGouAlert.prototype.buy_zhigou = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var info = gproxy.zhigou_libao;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE, "id", this.adata);
            var cd = info[api.money];
            if (Number(cd) == 1 || this.adata == 10) {
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, BuyZhiGouAlert.S_NAME);
                var key = this.adata;
                var str = key == 10 || key == 11 ? mx.Lang["r00" + (19 + key)] + mx.Lang.zglb : api.num + mx.Lang.ybao;
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": { "t": mx.MX_NETS.CS_WX_BUY_YBAO, "id": key },
                    "param": mx.Tools.format(mx.Lang.r0038, Number(api.money) * 10, str)
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.r0026 });
            }
        };
        BuyZhiGouAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_zhigou, this);
        };
        BuyZhiGouAlert.S_NAME = "BuyZhiGouAlert";
        return BuyZhiGouAlert;
    }(mx.AlertView));
    mx.BuyZhiGouAlert = BuyZhiGouAlert;
    __reflect(BuyZhiGouAlert.prototype, "mx.BuyZhiGouAlert");
})(mx || (mx = {}));
//# sourceMappingURL=BuyZhiGouAlert.js.map
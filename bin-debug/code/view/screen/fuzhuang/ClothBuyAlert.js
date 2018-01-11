/**
 * @author wxw
 * @date 2017.11.1
 * @desc 购买服装提示弹窗
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
    var ClothBuyAlert = (function (_super) {
        __extends(ClothBuyAlert, _super);
        function ClothBuyAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClothBuyAlert.prototype.init_view_by_type = function () {
            var view = this;
            var c_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", this.adata.id);
            this.obtain = c_info.obtain;
            this.price = c_info.price;
            view.buytshi_t.text = mx.Tools.format(mx.Lang["fz04" + c_info.obtain], mx.Tools.num2str(c_info.price));
            view.queding_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ClothBuyAlert.prototype.btn_click = function (evt) {
            var view = this;
            switch (evt.currentTarget) {
                case view.queding_b:
                    var facade = mx.ApplicationFacade.getInstance();
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    var have = dproxy.get_currency("ybao");
                    var type = void 0;
                    switch (Number(view.obtain)) {
                        case 1:
                            type = "ybi";
                            break;
                        case 2:
                            type = "ybao";
                            break;
                        default:
                            type = mx.Lang.fz038;
                            break;
                    }
                    //已有服装
                    var cproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ClothesProxy.NAME));
                    var myclothes = cproxy.all_clothes["1"];
                    if (myclothes[view.adata.id]) {
                        type = mx.Lang.fz015;
                    }
                    //发送信息
                    var csd = {
                        "t": mx.MX_NETS.CS_CLOTH_BUY,
                        "cloth_id": view.adata.id,
                        "type": type,
                        "price": view.price,
                    };
                    facade.sendNotification(mx.MX_NOTICE.ALL_BUY_CLOTH, csd);
                    //facade.sendNotification(MX_NOTICE.CS_GET_DATA, csd);
                    break;
                default:
                    break;
            }
            view.close_self();
        };
        ClothBuyAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.queding_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ClothBuyAlert.S_NAME = "ClothBuyAlert";
        return ClothBuyAlert;
    }(mx.AlertView));
    mx.ClothBuyAlert = ClothBuyAlert;
    __reflect(ClothBuyAlert.prototype, "mx.ClothBuyAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ClothBuyAlert.js.map
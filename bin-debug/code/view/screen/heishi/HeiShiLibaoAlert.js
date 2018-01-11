/**
*   @author gaojing、mx
*   @date 2017.12.25
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
    var HeiShiLibaoAlert = (function (_super) {
        __extends(HeiShiLibaoAlert, _super);
        function HeiShiLibaoAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiLibaoAlert.mx_support = function () {
            return ["assets.market_dh_alert", "api.RECHARGE"];
        };
        HeiShiLibaoAlert.prototype.init_view_by_type = function () {
            var view = this;
            this.adata = this.adata || {};
            var unit = this.adata;
            view.icon_p.source = "hsdh_" + unit.item[0].jiawei + "0_png";
            view.name_t.text = unit.item[0].name;
            var arr = [];
            for (var i in unit.item) {
                arr.push({
                    "name": unit.item[i].sm
                });
            }
            view.item_list.dataProvider = new eui.ArrayCollection(arr);
            arr = null;
            view.buy_t.text = unit.item[0].jiawei + "元";
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE, "money", unit.jiawei);
            unit.notice_ok = mx.MX_NOTICE.CHECK_RECHARGE;
            unit.sdata_ok = api.id;
        };
        HeiShiLibaoAlert.S_NAME = "HeiShiLibaoAlert";
        return HeiShiLibaoAlert;
    }(mx.AlertView));
    mx.HeiShiLibaoAlert = HeiShiLibaoAlert;
    __reflect(HeiShiLibaoAlert.prototype, "mx.HeiShiLibaoAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiLibaoAlert.js.map
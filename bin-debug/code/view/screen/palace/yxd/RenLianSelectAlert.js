/**
*   @author cy
*   @date 2017.8.22
*   @desc 人脸融合选择
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
    var RenLianSelectAlert = (function (_super) {
        __extends(RenLianSelectAlert, _super);
        function RenLianSelectAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RenLianSelectAlert.mx_support = function () {
            return ["assets.rlrhxz"];
        };
        RenLianSelectAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var muban = pproxy.renlian_muban;
            var sex = Number(this.adata);
            var arr = [];
            for (var k in muban) {
                var c_m = muban[k];
                if (c_m.sex == sex) {
                    arr.push({
                        "di": "xzlhjs" + (Number(k) % 3 + 1) + "_png",
                        "fz": "znjq" + c_m.lihui + "_png",
                        "id": c_m.muban
                    });
                }
            }
            for (var i = 0; i < 6; ++i) {
                if (!arr[i]) {
                    arr[i] = { "di": "zwkfjse_png", "fz": "", "empty": true };
                }
            }
            this.lihui_list.dataProvider = new eui.ArrayCollection(arr);
            this.lihui_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        RenLianSelectAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.lihui_list.dataProvider = null;
            this.lihui_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        RenLianSelectAlert.prototype.onTabChange = function (e) {
            if (e.item.empty) {
                return;
            }
            this.close_self();
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP, e.item.id);
        };
        RenLianSelectAlert.S_NAME = "RenLianSelectAlert";
        return RenLianSelectAlert;
    }(mx.AlertView));
    mx.RenLianSelectAlert = RenLianSelectAlert;
    __reflect(RenLianSelectAlert.prototype, "mx.RenLianSelectAlert");
})(mx || (mx = {}));
//# sourceMappingURL=RenLianSelectAlert.js.map
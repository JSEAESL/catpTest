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
/**
 * @cy/2017.11.13
 *  图鉴封面
 */
var mx;
(function (mx) {
    var TuJianSelectAlert = (function (_super) {
        __extends(TuJianSelectAlert, _super);
        function TuJianSelectAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianSelectAlert.mx_support = function () {
            return ["assets.tujian_select"];
        };
        TuJianSelectAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var wenhua_arr = pproxy.xuetong_arr;
            var type = this.adata;
            this.title_p.source = type == 1 ? "titile2_png" : "titile_png";
            var info = type == 1 ? pproxy.hz_tujian_info : pproxy.feizi_tujian_info;
            var arr = [];
            for (var k in wenhua_arr) {
                var tishi = false;
                var wenhua_info = info[wenhua_arr[k]];
                for (var k_1 in wenhua_info.info) {
                    if (Number(wenhua_info.info[k_1]) == 0) {
                        tishi = true;
                        break;
                    }
                }
                arr.push({
                    "tjtx": "tjtx" + wenhua_arr[k] + "_png",
                    "tjwz": "tjtxwz" + wenhua_arr[k] + "_png",
                    "jindu": wenhua_info.jindu || "0",
                    "tishi": tishi
                });
            }
            this.xt_list.dataProvider = new eui.ArrayCollection(arr);
            this.xt_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        TuJianSelectAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TuJianMainAlert.S_NAME,
                "param": { "type": this.adata, "index": e.itemIndex }
            });
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, TuJianSelectAlert.S_NAME);
        };
        TuJianSelectAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.xt_list.dataProvider = null;
            this.xt_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        TuJianSelectAlert.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TuJianShouYeAlert.S_NAME,
            });
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, TuJianSelectAlert.S_NAME);
        };
        TuJianSelectAlert.S_NAME = "TuJianSelectAlert";
        return TuJianSelectAlert;
    }(mx.AlertView));
    mx.TuJianSelectAlert = TuJianSelectAlert;
    __reflect(TuJianSelectAlert.prototype, "mx.TuJianSelectAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianSelectAlert.js.map
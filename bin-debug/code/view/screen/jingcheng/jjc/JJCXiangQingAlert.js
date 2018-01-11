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
 * @cy/2017.3.296
 *  jjc战报详情alert
 */
var mx;
(function (mx) {
    var JJCXiangQingAlert = (function (_super) {
        __extends(JJCXiangQingAlert, _super);
        function JJCXiangQingAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCXiangQingAlert.mx_support = function () {
            return ["assets.jjc_xq"];
        };
        JJCXiangQingAlert.prototype.init_view_by_type = function () {
            var data = this.adata.detail;
            var arr1 = [];
            var arr2 = [];
            var max_demage1 = 0, max_demage2 = 0;
            for (var k in data) {
                // > max_demage ? Number(data[k].damage) : max_demage;
                var damage = Math.abs(Number(data[k].damage));
                data[k].damage = damage;
                if (Number(k) > 0) {
                    max_demage1 += damage;
                    data[k].state = "att";
                    arr1.push(data[k]);
                }
                else {
                    max_demage2 += damage;
                    data[k].state = "def";
                    arr2.push(data[k]);
                }
            }
            for (var k in arr1) {
                arr1[k].total = max_demage1;
            }
            for (var j in arr2) {
                arr2[j].total = max_demage2;
            }
            this.att_list.itemRenderer = this.def_list.itemRenderer = mx.JJCXiangQingRender;
            this.att_list.dataProvider = new eui.ArrayCollection(arr1);
            this.def_list.dataProvider = new eui.ArrayCollection(arr2);
            this.dzhfang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.huifang, this);
        };
        JJCXiangQingAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.dzhfang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.huifang, this);
        };
        JJCXiangQingAlert.prototype.huifang = function () {
            var huifang = this.adata.huifang;
            var facade = mx.ApplicationFacade.getInstance();
            var jjcproxy = facade.retrieveProxy(mx.LueDuoProxy.NAME);
            jjcproxy.huifang = true;
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.FightView.S_NAME,
                "param": {
                    "hero_data": huifang.base_info,
                    "process": 0,
                    "huifang": huifang.process,
                    "result": huifang.result
                }
            });
        };
        JJCXiangQingAlert.S_NAME = "JJCXiangQingAlert";
        return JJCXiangQingAlert;
    }(mx.AlertView));
    mx.JJCXiangQingAlert = JJCXiangQingAlert;
    __reflect(JJCXiangQingAlert.prototype, "mx.JJCXiangQingAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCXiangQingAlert.js.map
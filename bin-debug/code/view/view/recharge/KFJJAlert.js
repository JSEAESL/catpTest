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
    var KFJJAlert = (function (_super) {
        __extends(KFJJAlert, _super);
        function KFJJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KFJJAlert.prototype.init_view_by_type = function () {
            var data = this.adata;
            var arr = [298, 398, 498, 598, 698, 798, 998];
            var lv_arr = [15, 20, 30, 45, 60, 70, 80];
            this.skin.currentState = "success";
            var donghua = new mx.GeneralEffect("rwjl");
            donghua.play_by_times(-1);
            donghua.horizontalCenter = 0;
            this.alert_g.addChildAt(donghua, 0);
            this.success_t.textFlow = mx.Tools.setStrColor(mx.Lang.kk001, [lv_arr[data.id], arr[data.id]], [0xF55BAD, 0xD3950D]);
        };
        KFJJAlert.S_NAME = "KFJJAlert";
        return KFJJAlert;
    }(mx.AlertView));
    mx.KFJJAlert = KFJJAlert;
    __reflect(KFJJAlert.prototype, "mx.KFJJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=KFJJAlert.js.map
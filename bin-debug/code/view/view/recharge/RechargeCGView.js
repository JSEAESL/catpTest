/**
*   @author cy
*   @date 2015.1.3
*   @desc 充值彈窗
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
    var RechargeCGView = (function (_super) {
        __extends(RechargeCGView, _super);
        function RechargeCGView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RechargeCGView.mx_support = function () {
            return ["assets.recharge_cg"];
        };
        RechargeCGView.prototype.init_view_by_type = function () {
            var zg = new mx.GeneralEffect("rwjl");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1.5;
            var zg2 = new mx.GeneralEffect("xxgxiao");
            this.ef2_g.addChild(zg2);
            zg2.play_by_times(-1);
            zg2.scaleX = zg2.scaleY = 1;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        RechargeCGView.S_NAME = "RechargeCGView";
        return RechargeCGView;
    }(mx.AlertView));
    mx.RechargeCGView = RechargeCGView;
    __reflect(RechargeCGView.prototype, "mx.RechargeCGView");
})(mx || (mx = {}));
//# sourceMappingURL=RechargeCGView.js.map
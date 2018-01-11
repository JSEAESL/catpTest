/**
 *   @author cy
 *   @date 2017.8.25
 *   @desc 累计签到奖励宝箱render
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
    var HeiShiLiaboRender = (function (_super) {
        __extends(HeiShiLiaboRender, _super);
        function HeiShiLiaboRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiLiaboRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            view.icon_p.source = "hsdh_" + cd.jiawei + "0_png";
            view.name_t.text = cd.item[0].name;
            view.price_t.text = cd.jiawei;
        };
        return HeiShiLiaboRender;
    }(mx.BasicRender));
    mx.HeiShiLiaboRender = HeiShiLiaboRender;
    __reflect(HeiShiLiaboRender.prototype, "mx.HeiShiLiaboRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiLiaboRender.js.map
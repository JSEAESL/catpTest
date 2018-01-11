/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 後宮使用，增大点击区域
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
    var PalaceRender = (function (_super) {
        __extends(PalaceRender, _super);
        function PalaceRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PalaceRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.b_b.x = data.bx || 0;
            this.b_b.y = data.by || 0;
            this.b_b.set_ssres(data.bg);
            this.b_b.set_tsres(data.ts, { "right": -15 });
        };
        return PalaceRender;
    }(mx.BasicRender));
    mx.PalaceRender = PalaceRender;
    __reflect(PalaceRender.prototype, "mx.PalaceRender");
})(mx || (mx = {}));
//# sourceMappingURL=PalaceRender.js.map
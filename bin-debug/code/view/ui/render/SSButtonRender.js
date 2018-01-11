/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 基本的XY定位render
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
    var SSButtonRender = (function (_super) {
        __extends(SSButtonRender, _super);
        function SSButtonRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isPlay = false;
            return _this;
        }
        SSButtonRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.b_b.set_ssres(data.bg);
            view.b_b.set_tsres(data.ts, data.pos);
        };
        return SSButtonRender;
    }(mx.BasicRender));
    mx.SSButtonRender = SSButtonRender;
    __reflect(SSButtonRender.prototype, "mx.SSButtonRender");
})(mx || (mx = {}));
//# sourceMappingURL=SSButtonRender.js.map
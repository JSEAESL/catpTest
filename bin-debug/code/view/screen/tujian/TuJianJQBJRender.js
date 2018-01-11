/**
 *   @author cy
 *   @date 2017.11.14
 *   @desc tujian render
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
    var TuJianJQBJRender = (function (_super) {
        __extends(TuJianJQBJRender, _super);
        function TuJianJQBJRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianJQBJRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.di_b.set_ssres(data.di);
        };
        return TuJianJQBJRender;
    }(mx.BasicRender));
    mx.TuJianJQBJRender = TuJianJQBJRender;
    __reflect(TuJianJQBJRender.prototype, "mx.TuJianJQBJRender");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianJQBJRender.js.map
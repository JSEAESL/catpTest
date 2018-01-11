/**
 * @author mx
 * @date 2017.5.19
 */
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
    var XXiugswsRender = (function (_super) {
        __extends(XXiugswsRender, _super);
        function XXiugswsRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiugswsRender.prototype.set_skinname = function () {
        };
        XXiugswsRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var xx = [140, 0, 140];
            var c_idx = this.itemIndex;
            this.x = xx[c_idx];
            this.y = c_idx * 130;
            //this.bg.source = "gswsrd" + c_idx + "_png";
            // this.hero.data = Tools.get_mn_res(data, "lh");
            this.hero.data = data;
            // this.hero.mask = this.hmask_rect;
        };
        return XXiugswsRender;
    }(mx.BasicRender));
    mx.XXiugswsRender = XXiugswsRender;
    __reflect(XXiugswsRender.prototype, "mx.XXiugswsRender");
})(mx || (mx = {}));
//# sourceMappingURL=XXiugswsRender.js.map
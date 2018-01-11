/**
*   @author hxj
*   @date 2017.8.1
*   @内容为空时，小德子tip提示
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
    var EmptyTip = (function (_super) {
        __extends(EmptyTip, _super);
        function EmptyTip(cd) {
            return _super.call(this, cd) || this;
        }
        EmptyTip.prototype.pre_init = function () {
            var cd = this.adata;
            this.xdz_p.source = "xdzi-" + cd.xdz + "_png";
            this.no_t.text = cd.text;
            if (this.no_t.height <= 58) {
                this.sc.height = 100;
            }
        };
        return EmptyTip;
    }(mx.BasicUI));
    mx.EmptyTip = EmptyTip;
    __reflect(EmptyTip.prototype, "mx.EmptyTip");
})(mx || (mx = {}));
//# sourceMappingURL=EmptyTip.js.map
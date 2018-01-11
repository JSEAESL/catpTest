/**
 *   @author cy
 *   @date 2018.1.2
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
    var YbmyRender = (function (_super) {
        __extends(YbmyRender, _super);
        function YbmyRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YbmyRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            if (cd.avatar && cd.avatar.indexOf("http") > -1) {
                mx.Tools.url_image(cd.avatar, { "width": 128, "view": this.avatar });
            }
            else {
                this.avatar.source = "tx70_1_png";
            }
        };
        return YbmyRender;
    }(mx.BasicRender));
    mx.YbmyRender = YbmyRender;
    __reflect(YbmyRender.prototype, "mx.YbmyRender");
})(mx || (mx = {}));
//# sourceMappingURL=YbmyRender.js.map
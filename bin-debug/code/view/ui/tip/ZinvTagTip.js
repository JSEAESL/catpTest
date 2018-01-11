/**
*   @author hxj
*   @date 2017.7.11
*   @子女身份tip提示
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
    var ZinvTagTip = (function (_super) {
        __extends(ZinvTagTip, _super);
        function ZinvTagTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZinvTagTip.prototype.init_view = function () {
            var cd = this.adata;
            var str;
            switch (cd.zinvType) {
                case 1://亲生
                    str = "qssfen_png";
                    break;
                case 2://私生
                    str = "sszsfen_png";
                    break;
                case 3://野种
                    str = "yzsfen_png";
                    break;
                case 4://转世
                    str = "zssfen_png";
                    break;
            }
            this.tishi.source = str || cd.str;
        };
        return ZinvTagTip;
    }(mx.HeroTip));
    mx.ZinvTagTip = ZinvTagTip;
    __reflect(ZinvTagTip.prototype, "mx.ZinvTagTip");
})(mx || (mx = {}));
//# sourceMappingURL=ZinvTagTip.js.map
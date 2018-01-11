/**
*   @author cy
*   @date 2017.9.11
*   @desc 微信分享弹窗
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
    var WXShareAlert = (function (_super) {
        __extends(WXShareAlert, _super);
        function WXShareAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WXShareAlert.mx_support = function () {
            return ["assets.wx_share"];
        };
        WXShareAlert.prototype.init_view_by_type = function () {
            var height = mx.Tools.screen_height;
            this.role_p.top = Math.max(4, height - 752);
            this.ef_g.height = height;
            var zg = new mx.GeneralEffect("wx_share");
            this.ef_g.addChild(zg);
            zg.y = 0;
            zg.x = 430;
            zg.play_by_times(-1);
            //玩吧分享到QQ微信，248只能分享到微信。
            this.role_p.source = mx.AppConfig.MXTag == "wb" ? "wxfxnrong_png" : "wxfxnrong2_png";
        };
        WXShareAlert.S_NAME = "WXShareAlert";
        return WXShareAlert;
    }(mx.AlertView));
    mx.WXShareAlert = WXShareAlert;
    __reflect(WXShareAlert.prototype, "mx.WXShareAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WXShareAlert.js.map
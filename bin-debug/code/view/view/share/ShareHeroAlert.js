/**
*   @author hxj
*   @date 2017.12.25
*   @desc 分享——侍从
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
    var ShareHeroAlert = (function (_super) {
        __extends(ShareHeroAlert, _super);
        function ShareHeroAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareHeroAlert.mx_support = function () {
            return ["assets.share_hero"];
        };
        ShareHeroAlert.prototype.init_view = function () {
            var _this = this;
            var hid = this.adata.hid;
            if (!RES.hasRes("share_hero" + hid + "_png")) {
                hid = 1;
            }
            this.hero_p.source = mx.Tools.get_mn_res(hid, "lh");
            this.herodesc_p.source = "share_herodesc" + hid + "_png";
            this.hname_p.source = "share_hero" + hid + "_png";
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hid);
            this.talent_p.source = "share_talent" + hero.Talent + "_png";
            RES.getResAsync("share_heroword" + hid + "_png", this.onGetRes, this);
            this.timeout = egret.setTimeout(function () {
                if (window && window["shareScreenshot"]) {
                    window["shareScreenshot"]();
                }
                _this.close_self();
            }, this, 500);
        };
        ShareHeroAlert.prototype.onGetRes = function (texture) {
            var view = this.word_p;
            if (view && texture) {
                view.source = "share_heroword" + this.adata.hid + "_png";
                if (texture.textureHeight < 150) {
                    this.worddchen_p.source = "yqydceng1_png";
                }
                else {
                    this.worddchen_p.source = "yqydceng2_png";
                }
            }
        };
        ShareHeroAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.clearTimeout(this.timeout);
        };
        ShareHeroAlert.S_NAME = "ShareHeroAlert";
        return ShareHeroAlert;
    }(mx.AlertView));
    mx.ShareHeroAlert = ShareHeroAlert;
    __reflect(ShareHeroAlert.prototype, "mx.ShareHeroAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShareHeroAlert.js.map
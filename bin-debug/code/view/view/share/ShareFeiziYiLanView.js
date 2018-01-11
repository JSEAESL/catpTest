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
/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 妃子一览
 **/
/**
 *   @author gaojing
 *   @date 2017.12.11
 *   @desc 妃子一览
 **/
var mx;
(function (mx) {
    var ShareFeiziYiLanView = (function (_super) {
        __extends(ShareFeiziYiLanView, _super);
        function ShareFeiziYiLanView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareFeiziYiLanView.mx_support = function () {
            return ["assets.share_feizi_yilan"];
        };
        /*--------------组件---------------*/
        ShareFeiziYiLanView.prototype.init_view_by_type = function () {
            var view = this;
            mx.TweenTool.getInstance().breath_tween(this.mn1);
            mx.TweenTool.getInstance().breath_tween(this.mn2, false);
        };
        ShareFeiziYiLanView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            egret.Tween.removeTweens(this.mn1);
            egret.Tween.removeTweens(this.mn2);
        };
        ShareFeiziYiLanView.S_NAME = "ShareFeiziYiLanView";
        return ShareFeiziYiLanView;
    }(mx.AlertView));
    mx.ShareFeiziYiLanView = ShareFeiziYiLanView;
    __reflect(ShareFeiziYiLanView.prototype, "mx.ShareFeiziYiLanView");
})(mx || (mx = {}));
//# sourceMappingURL=ShareFeiziYiLanView.js.map
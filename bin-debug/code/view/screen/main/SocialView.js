/**
 *   @author gaojing
 *   @date 2017.12.26
 *   @desc 社交弹窗
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
    var SocialView = (function (_super) {
        __extends(SocialView, _super);
        function SocialView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SocialView.mx_support = function () {
            return ["assets.main_alert_sjtchuang"];
        };
        SocialView.prototype.init_view_by_type = function () {
            this.adata = this.adata || {};
            var cdata = this.adata;
            this.sjjzbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sjjzbtn_click, this);
            cdata.notice_ok = mx.MX_NOTICE.SCENE_CHANGE;
            cdata.sdata_ok = mx.FriendScreen.S_NAME;
            this.init_xren();
        };
        SocialView.prototype.sjjzbtn_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_UNION_INIT });
        };
        SocialView.prototype.init_xren = function () {
            var view = this;
            var bs = 1.2;
            var xren1_2 = new mx.GeneralEffect("xren1");
            xren1_2.scaleX = xren1_2.scaleY = bs;
            xren1_2.play_by_times(-1);
            view.addChild(xren1_2);
        };
        SocialView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sjjzbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sjjzbtn_click, this);
        };
        SocialView.S_NAME = "SocialView";
        return SocialView;
    }(mx.AlertView));
    mx.SocialView = SocialView;
    __reflect(SocialView.prototype, "mx.SocialView");
})(mx || (mx = {}));
//# sourceMappingURL=SocialView.js.map
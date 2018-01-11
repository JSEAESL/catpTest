/**
 *   @author wf
 *   @date 2017.2.22
 *   @desc 好友关系升级弹窗
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
    var FriendGXUPView = (function (_super) {
        __extends(FriendGXUPView, _super);
        function FriendGXUPView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendGXUPView.mx_support = function () {
            return ["assets.friend_gxup"];
        };
        FriendGXUPView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            view.sming_t.textFlow = mx.Tools.setStrColor(mx.Lang.hy034, [cd.name, cd.gxi], [0xDB709F, 0x5C9966]);
            var ef = new mx.GeneralEffect("rwjl");
            ef.play_by_times(-1);
            ef.x = 285;
            ef.y = 0;
            var ef2 = new mx.GeneralEffect("xxgxiao");
            ef2.play_by_times(-1);
            ef2.x = 195;
            ef2.y = 100;
            view.ef_g.addChild(ef);
            view.ef2_g.addChild(ef2);
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        FriendGXUPView.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FriendGXUPView.S_NAME);
            var fproxy = facade.retrieveProxy(mx.FriendProxy.NAME);
            if (fproxy.gift_state) {
                fproxy.gift_state = false;
                var cd = fproxy.get_curr_friend();
                if (cd) {
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { 'name': mx.FriendGiftView.S_NAME, 'param': cd });
                }
            }
        };
        FriendGXUPView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.ef_g.removeChildren();
            view.ef2_g.removeChildren();
            view.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        FriendGXUPView.S_NAME = "FriendGXUPView";
        return FriendGXUPView;
    }(mx.BasicView));
    mx.FriendGXUPView = FriendGXUPView;
    __reflect(FriendGXUPView.prototype, "mx.FriendGXUPView");
})(mx || (mx = {}));
//# sourceMappingURL=FriendGXUPView.js.map
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
*   @date 2015.1.3
*   @desc 战斗布阵
**/
var mx;
(function (mx) {
    var FightZantingView = (function (_super) {
        __extends(FightZantingView, _super);
        function FightZantingView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.buzhen = {};
            return _this;
        }
        //英雄列表站位
        FightZantingView.mx_support = function () {
            return ["assets.fg_zting"];
        };
        ;
        Object.defineProperty(FightZantingView.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FightZantingView.prototype.init_view_by_type = function () {
            var view = this;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SET_WAIT, false);
            view.quit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quit_fight, this);
            view.jxzd_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            //view.scaleX = view.scaleY = 2/3;
        };
        FightZantingView.prototype.quit_fight = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.FIGHT_QUIT);
        };
        FightZantingView.prototype.close_self = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.FIGHT_CONTINUE);
        };
        FightZantingView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.quit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quit_fight, this);
            view.jxzd_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        FightZantingView.S_NAME = "FightZantingView";
        return FightZantingView;
    }(mx.AlertView));
    mx.FightZantingView = FightZantingView;
    __reflect(FightZantingView.prototype, "mx.FightZantingView");
})(mx || (mx = {}));
//# sourceMappingURL=FightZantingView.js.map
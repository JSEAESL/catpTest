/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var HeroHPMediator = (function (_super) {
        __extends(HeroHPMediator, _super);
        function HeroHPMediator(viewComponent) {
            var _this = _super.call(this, HeroHPMediator.NAME, viewComponent) || this;
            _this.fresh_yb();
            if (mx.MX_COMMON.IN_GUIDE == 2) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    if (_this.view.can_up) {
                        _this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    else {
                        _this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                        _this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                }
                else {
                    _this.view.c_g.addEventListener(eui.UIEvent.MOVE, _this.mx_test, _this);
                }
            }
            return _this;
        }
        HeroHPMediator.prototype.mx_test = function (event) {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            if (this.view.can_up) {
                this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
            }
        };
        Object.defineProperty(HeroHPMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroHPMediator.prototype.onRemove = function () {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        HeroHPMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
            ];
        };
        HeroHPMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    view.set_hp_num();
                    break;
                default:
                    break;
            }
        };
        HeroHPMediator.prototype.fresh_yb = function () {
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            this.view.yb_n_t.text = "" + dproxy.get_currency("ybi");
            this.view.havecoin_g.addChildAt(mx.Tools.draw_cirsiderec(0, 0, 50 + (this.view.yb_n_t.text.length) * 11, 28, 0x8C70C4), 0);
        };
        HeroHPMediator.NAME = "HeroHPMediator";
        return HeroHPMediator;
    }(puremvc.Mediator));
    mx.HeroHPMediator = HeroHPMediator;
    __reflect(HeroHPMediator.prototype, "mx.HeroHPMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroHPMediator.js.map
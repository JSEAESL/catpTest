/**
 *   @author wxw
 *   @date 2017.10.24
 *   @desc 教室主界面
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
    var HZClassroomScreen = (function (_super) {
        __extends(HZClassroomScreen, _super);
        function HZClassroomScreen(cd) {
            return _super.call(this, cd) || this;
        }
        HZClassroomScreen.mx_support = function () {
            return ["assets.hz_classroom"];
        };
        Object.defineProperty(HZClassroomScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HZClassroomScreen.prototype.init_view = function () {
            var view = this;
            view.classname_p.source = "jsbti" + this.proxy.taifu_type + "_png";
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HZClassroomScreenMediator(view));
        };
        HZClassroomScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            this.proxy.taifu_type = null;
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HLYScreen.S_NAME);
        };
        HZClassroomScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HZClassroomScreenMediator.NAME);
        };
        HZClassroomScreen.S_NAME = "HZClassroomScreen";
        return HZClassroomScreen;
    }(mx.BasicView));
    mx.HZClassroomScreen = HZClassroomScreen;
    __reflect(HZClassroomScreen.prototype, "mx.HZClassroomScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HZClassroomScreen.js.map
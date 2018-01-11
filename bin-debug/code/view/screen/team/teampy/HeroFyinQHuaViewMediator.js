/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 界面Mediator
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
    var HeroFyinQHuaViewMediator = (function (_super) {
        __extends(HeroFyinQHuaViewMediator, _super);
        function HeroFyinQHuaViewMediator(viewComponent) {
            return _super.call(this, HeroFyinQHuaViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeroFyinQHuaViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroFyinQHuaViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CHERO,
            ];
        };
        HeroFyinQHuaViewMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CHERO:
                    view.show_item();
                    break;
                default:
                    break;
            }
        };
        HeroFyinQHuaViewMediator.NAME = "HeroFyinQHuaViewMediator";
        return HeroFyinQHuaViewMediator;
    }(puremvc.Mediator));
    mx.HeroFyinQHuaViewMediator = HeroFyinQHuaViewMediator;
    __reflect(HeroFyinQHuaViewMediator.prototype, "mx.HeroFyinQHuaViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroFyinQHuaViewMediator.js.map
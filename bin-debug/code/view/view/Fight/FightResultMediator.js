/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var FightResultMediator = (function (_super) {
        __extends(FightResultMediator, _super);
        function FightResultMediator(viewComponent) {
            return _super.call(this, FightResultMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(FightResultMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        FightResultMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        FightResultMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    var jproxy = (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
                    view.jl_ts.visible = Number(jproxy.jjc_qq_lq) == 0;
                    var ef = view.jjc_g.getChildByName("gstangxiao");
                    if (ef) {
                        //ef.removeEventListener("mc_over", this.mc_over, this);
                        ef.on_remove();
                    }
                    ef = null;
                    break;
            }
        };
        FightResultMediator.NAME = "FightResultMediator";
        return FightResultMediator;
    }(puremvc.Mediator));
    mx.FightResultMediator = FightResultMediator;
    __reflect(FightResultMediator.prototype, "mx.FightResultMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FightResultMediator.js.map
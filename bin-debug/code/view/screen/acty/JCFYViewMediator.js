/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc 妖狐降世mediator
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
    var JCFYViewMediator = (function (_super) {
        __extends(JCFYViewMediator, _super);
        function JCFYViewMediator(viewComponent) {
            return _super.call(this, JCFYViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(JCFYViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JCFYViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.FRESH_YHTASKLIST
            ];
        };
        JCFYViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    if (notification.getType() == "hyjs") {
                        view.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_YHTASKLIST:
                    view.show_list(true);
                    break;
            }
        };
        JCFYViewMediator.NAME = "JCFYViewMediator";
        return JCFYViewMediator;
    }(puremvc.Mediator));
    mx.JCFYViewMediator = JCFYViewMediator;
    __reflect(JCFYViewMediator.prototype, "mx.JCFYViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JCFYViewMediator.js.map
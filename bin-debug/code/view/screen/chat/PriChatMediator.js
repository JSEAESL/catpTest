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
 * mx@2016/08/21
 */
var mx;
(function (mx) {
    var PriChatMediator = (function (_super) {
        __extends(PriChatMediator, _super);
        function PriChatMediator(viewComponent) {
            return _super.call(this, PriChatMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(PriChatMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        PriChatMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_WEB_CONST.WEB_NEW_MSG,
                mx.MX_WEB_CONST.WEB_NEW_PRI,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        PriChatMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var type = notification.getType();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_WEB_CONST.WEB_NEW_MSG:
                    view.fresh_msg(type);
                    break;
                case mx.MX_WEB_CONST.WEB_NEW_PRI:
                    view.fresh_tab(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (type) {
                        view.fresh_list(type);
                    }
                    else {
                        view.fresh_type_msg();
                    }
                    break;
            }
        };
        PriChatMediator.NAME = "PriChatMediator";
        return PriChatMediator;
    }(puremvc.Mediator));
    mx.PriChatMediator = PriChatMediator;
    __reflect(PriChatMediator.prototype, "mx.PriChatMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PriChatMediator.js.map
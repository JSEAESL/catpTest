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
    var ChatUIMediator = (function (_super) {
        __extends(ChatUIMediator, _super);
        function ChatUIMediator(viewComponent) {
            return _super.call(this, ChatUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ChatUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ChatUIMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_WEB_CONST.WEB_NEW_MSG,
                mx.MX_WEB_CONST.WEB_NEW_PRI
            ];
        };
        ChatUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_WEB_CONST.WEB_NEW_MSG:
                    this.view.set_new_data(data);
                    break;
                case mx.MX_WEB_CONST.WEB_NEW_PRI:
                    this.view.show_pri_tip();
                    break;
            }
        };
        ChatUIMediator.NAME = "ChatUIMediator";
        return ChatUIMediator;
    }(puremvc.Mediator));
    mx.ChatUIMediator = ChatUIMediator;
    __reflect(ChatUIMediator.prototype, "mx.ChatUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ChatUIMediator.js.map
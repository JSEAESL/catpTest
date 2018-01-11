/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc mediator
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
    var ChatLyznViewMediator = (function (_super) {
        __extends(ChatLyznViewMediator, _super);
        function ChatLyznViewMediator(viewComponent) {
            return _super.call(this, ChatLyznViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ChatLyznViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ChatLyznViewMediator.prototype.listNotificationInterests = function () {
            return [
                //MX_NOTICE.CHAT_ZINV_LY,
                mx.MX_NOTICE.CLOSE_CHATLYZN,
            ];
        };
        ChatLyznViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CHAT_ZINV_LY:
                    var proxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME);
                    for (var i in view.adata) {
                        if (view.adata[i].id == proxy.chat_zinv_info.id) {
                            view.adata.splice(i, 1);
                            break;
                        }
                    }
                    view.show_list();
                    view.fresh_page();
                    break;
                case mx.MX_NOTICE.CLOSE_CHATLYZN:
                    view.close_self();
                    break;
            }
        };
        ChatLyznViewMediator.NAME = "ChatLyznViewMediator";
        return ChatLyznViewMediator;
    }(puremvc.Mediator));
    mx.ChatLyznViewMediator = ChatLyznViewMediator;
    __reflect(ChatLyznViewMediator.prototype, "mx.ChatLyznViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ChatLyznViewMediator.js.map
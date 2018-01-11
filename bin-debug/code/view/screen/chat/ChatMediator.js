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
    var ChatMediator = (function (_super) {
        __extends(ChatMediator, _super);
        function ChatMediator(viewComponent) {
            return _super.call(this, ChatMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ChatMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ChatMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_WEB_CONST.WEB_NEW_MSG,
                mx.MX_WEB_CONST.WEB_NEW_PRI,
                mx.MX_NOTICE.CHAT_LIANYIN_FRESH,
                mx.MX_NOTICE.UNION_APPLY,
                mx.MX_NOTICE.SHOW_ALERT,
                mx.MX_NOTICE.JUBAO_POP,
                mx.MX_NOTICE.PINGBI_NEWS,
            ];
        };
        ChatMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var type = notification.getType();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_WEB_CONST.WEB_NEW_MSG:
                case mx.MX_NOTICE.CHAT_LIANYIN_FRESH:
                case mx.MX_NOTICE.UNION_APPLY:
                    view.fresh_msg(type);
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    this.czfl();
                    break;
                case mx.MX_WEB_CONST.WEB_NEW_PRI:
                    view.show_pri_tip();
                case mx.MX_NOTICE.PINGBI_NEWS:
                    view.pingbi();
                    break;
                case mx.MX_NOTICE.JUBAO_POP:
                    view.add_jubao(data);
                    break;
            }
        };
        ChatMediator.prototype.czfl = function () {
            var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var cd = lproxy.fl;
            if (!cd) {
                return;
            }
            var mid = cd.id;
            lproxy.fl = null;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": mid,
                "type": 8
            });
        };
        ChatMediator.NAME = "ChatMediator";
        return ChatMediator;
    }(puremvc.Mediator));
    mx.ChatMediator = ChatMediator;
    __reflect(ChatMediator.prototype, "mx.ChatMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ChatMediator.js.map
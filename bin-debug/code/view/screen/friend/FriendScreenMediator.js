/**
 *   @author wf
 *   @date 2016.11.29
 *   @desc 好友主界面mediator
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
    var FriendScreenMediator = (function (_super) {
        __extends(FriendScreenMediator, _super);
        function FriendScreenMediator(viewComponent) {
            return _super.call(this, FriendScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(FriendScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        FriendScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_FRIEND,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.CALL_JS_FUNCTION,
            ];
        };
        FriendScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_FRIEND:
                    if (this.view.ftype != 5 || data) {
                        this.view.fresh_tab();
                        this.view.update_list();
                    }
                    else if (this.view.ftype == 5) {
                        this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FRIEND_SQ_DATA,
                            "type": view.ftype,
                            "page": view.proxy['page' + this.view.ftype],
                            "skip": true
                        });
                    }
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    switch (Number(data)) {
                        case 2007:
                        case 2008:
                        case 2009:
                        case 2021:
                            var fproxy = (this.facade.retrieveProxy(mx.FriendProxy.NAME));
                            fproxy.buy_gift_finish(data);
                            break;
                    }
                    break;
                case mx.MX_NOTICE.CALL_JS_FUNCTION:
                    if (data.name == "share_game") {
                        mx.Tools.share_game(data.param);
                    }
                    break;
            }
        };
        FriendScreenMediator.NAME = "FriendScreenMediator";
        return FriendScreenMediator;
    }(puremvc.Mediator));
    mx.FriendScreenMediator = FriendScreenMediator;
    __reflect(FriendScreenMediator.prototype, "mx.FriendScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FriendScreenMediator.js.map
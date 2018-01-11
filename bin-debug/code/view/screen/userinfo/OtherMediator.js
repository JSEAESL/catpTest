/**
 *   @author wf
 *   @date 2016.12.27
 *   @desc 其他用戶信息
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
    var OtherMediator = (function (_super) {
        __extends(OtherMediator, _super);
        function OtherMediator(viewComponent) {
            return _super.call(this, OtherMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(OtherMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        OtherMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_FRIEND,
                mx.MX_NOTICE.HEIMINGDAN
            ];
        };
        OtherMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var info = gProxy.info;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_FRIEND:
                    if (view.flag) {
                        return;
                    }
                    info.apply = 1;
                    view.friend_b.set_ssres('trxxhysqzhong_png');
                    break;
                case mx.MX_NOTICE.HEIMINGDAN:
                    if (data) {
                        mx.Tools.jiechu_hmdan(info.user_id);
                    }
                    else {
                        mx.Tools.add_hmdan(info.user_id);
                    }
                    view.fresh_pinbi();
                    break;
            }
        };
        OtherMediator.NAME = "OtherMediator";
        return OtherMediator;
    }(puremvc.Mediator));
    mx.OtherMediator = OtherMediator;
    __reflect(OtherMediator.prototype, "mx.OtherMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=OtherMediator.js.map
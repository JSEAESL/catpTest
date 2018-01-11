/**
 *   @author qianjun
 *   @date 2017.3.13
 *   @desc
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
    var NvHuangKaQuanViewMediator = (function (_super) {
        __extends(NvHuangKaQuanViewMediator, _super);
        function NvHuangKaQuanViewMediator(viewComponent) {
            return _super.call(this, NvHuangKaQuanViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(NvHuangKaQuanViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        NvHuangKaQuanViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.NHKQ_CZ_SUC
            ];
        };
        NvHuangKaQuanViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                case mx.MX_NOTICE.NHKQ_CZ_SUC:
                    view.fresh_view();
                    break;
            }
        };
        NvHuangKaQuanViewMediator.NAME = "NvHuangKaQuanViewMediator";
        return NvHuangKaQuanViewMediator;
    }(puremvc.Mediator));
    mx.NvHuangKaQuanViewMediator = NvHuangKaQuanViewMediator;
    __reflect(NvHuangKaQuanViewMediator.prototype, "mx.NvHuangKaQuanViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=NvHuangKaQuanViewMediator.js.map
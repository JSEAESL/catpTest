/**
 @author cy
 *   @date 2017.8.24
 *   @desc 倒计时
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
    var DJSTipMediator = (function (_super) {
        __extends(DJSTipMediator, _super);
        function DJSTipMediator(viewComponent) {
            var _this = _super.call(this, DJSTipMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(DJSTipMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        DJSTipMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.TIME_TICK
            ];
        };
        DJSTipMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.TIME_TICK:
                    this.init_view(data);
                    break;
            }
        };
        DJSTipMediator.prototype.init_view = function (data) {
            var view = this.view;
            var delay = data ? data.delay : 0;
            var c_data = view.adata;
            var content = c_data.data;
            c_data.djs -= delay;
            var res_time = mx.Tools.format_second(c_data.djs);
            var str = mx.Tools.format(content.text, res_time);
            view.time_t.textFlow = mx.Tools.setKeywordColor2(str, content.cor);
            if (c_data.djs <= 0) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.REMOVE_UI);
            }
        };
        DJSTipMediator.NAME = "DJSTipMediator";
        return DJSTipMediator;
    }(puremvc.Mediator));
    mx.DJSTipMediator = DJSTipMediator;
    __reflect(DJSTipMediator.prototype, "mx.DJSTipMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DJSTipMediator.js.map
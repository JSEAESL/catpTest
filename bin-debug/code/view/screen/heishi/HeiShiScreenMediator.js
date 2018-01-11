/**
 @author qianjun
 *   @date 2016.10.9
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
    var HeiShiScreenMediator = (function (_super) {
        __extends(HeiShiScreenMediator, _super);
        function HeiShiScreenMediator(viewComponent) {
            var _this = _super.call(this, HeiShiScreenMediator.NAME, viewComponent) || this;
            _this.cur_type = 1; //1未婚子女 2出嫁子女 3私生子
            _this.pageitem = 4; //每页条目数
            _this.setpage = false; //翻页请求
            return _this;
        }
        Object.defineProperty(HeiShiScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeiShiScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        HeiShiScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_hsb();
                    view.fresh_ybao();
                    break;
            }
        };
        HeiShiScreenMediator.NAME = "HeiShiScreenMediator";
        return HeiShiScreenMediator;
    }(puremvc.Mediator));
    mx.HeiShiScreenMediator = HeiShiScreenMediator;
    __reflect(HeiShiScreenMediator.prototype, "mx.HeiShiScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiScreenMediator.js.map
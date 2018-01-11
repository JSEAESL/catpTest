/**
 *   @author qianjun
 *   @date 2017.1.5
 *   @desc 黑名单view
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
    var HmdanView = (function (_super) {
        __extends(HmdanView, _super);
        function HmdanView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HmdanView.mx_support = function () {
            return ["assets.user_hmdan"];
        };
        HmdanView.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HmdanViewMediator(this));
            this.user_list.itemRenderer = mx.HmdanRender;
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            this.fresh_list();
        };
        Object.defineProperty(HmdanView.prototype, "gProxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.GameProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HmdanView.prototype.fresh_list = function () {
            this.user_list.dataProvider = new eui.ArrayCollection(this.gProxy.hmd_info);
        };
        HmdanView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.user_list.dataProvider = null;
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HmdanViewMediator.NAME);
        };
        HmdanView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HmdanView.S_NAME);
        };
        HmdanView.S_NAME = "HmdanView";
        return HmdanView;
    }(mx.BasicView));
    mx.HmdanView = HmdanView;
    __reflect(HmdanView.prototype, "mx.HmdanView");
})(mx || (mx = {}));
//# sourceMappingURL=HmdanView.js.map
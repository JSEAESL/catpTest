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
 * @cy/2017.4.24
 *  选择加入方式alert
 */
var mx;
(function (mx) {
    var UnionFengMianAlert = (function (_super) {
        __extends(UnionFengMianAlert, _super);
        function UnionFengMianAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionFengMianAlert.mx_support = function () {
            return ["assets.jz_fengmian"];
        };
        UnionFengMianAlert.prototype.init_view_by_type = function () {
            this.qianwang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
        };
        UnionFengMianAlert.prototype.xiugai_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            uProxy.screen_page = 0;
            uProxy.union_list = [];
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.UnionScreen.S_NAME);
        };
        UnionFengMianAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.qianwang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
        };
        UnionFengMianAlert.S_NAME = "UnionFengMianAlert";
        return UnionFengMianAlert;
    }(mx.AlertView));
    mx.UnionFengMianAlert = UnionFengMianAlert;
    __reflect(UnionFengMianAlert.prototype, "mx.UnionFengMianAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionFengMianAlert.js.map
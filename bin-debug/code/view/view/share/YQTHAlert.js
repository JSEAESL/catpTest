/**
*   @author cy
*   @date 2017.8.7
*   @desc 邀请土豪弹窗
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
    var YQTHAlert = (function (_super) {
        __extends(YQTHAlert, _super);
        function YQTHAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YQTHAlert.mx_support = function () {
            return ["assets.yqth", "api.YQTH"];
        };
        YQTHAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.YQTHAlertMediator(this));
            this.th_list.itemRenderer = mx.YQTHRender;
            this.fresh_pop();
        };
        YQTHAlert.prototype.fresh_pop = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var dProxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var arr = [];
            var cd = dProxy.ybnli_info;
            for (var i = 0; i < 20; ++i) {
                if (cd[i]) {
                    arr.push(cd[i]);
                }
                else {
                    arr.push({ "empty": true });
                }
            }
            this.page_t.text = dProxy.ybnli_page + "/" + dProxy.ybnli_total;
            this.th_list.dataProvider = new eui.ArrayCollection(arr);
        };
        YQTHAlert.prototype.on_remove = function () {
            mx.ApplicationFacade.getInstance().removeMediator(mx.YQTHAlertMediator.NAME);
            this.th_list.dataProvider = null;
        };
        YQTHAlert.S_NAME = "YQTHAlert";
        return YQTHAlert;
    }(mx.AlertView));
    mx.YQTHAlert = YQTHAlert;
    __reflect(YQTHAlert.prototype, "mx.YQTHAlert");
})(mx || (mx = {}));
//# sourceMappingURL=YQTHAlert.js.map
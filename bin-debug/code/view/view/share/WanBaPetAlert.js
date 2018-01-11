/**
*   @author cy
*   @date 2017.10.19
*   @desc 玩吧宠物
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
    var WanBaPetAlert = (function (_super) {
        __extends(WanBaPetAlert, _super);
        function WanBaPetAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WanBaPetAlert.mx_support = function () {
            return ["assets.wb_pet"];
        };
        WanBaPetAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.WanBaPetAlertMediator(this));
            this.award_list.itemRenderer = mx.WanBaPetRender;
            this.title_t.text = mx.Lang.wbpet05;
            this.fresh_view();
        };
        WanBaPetAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var arr = [];
            for (var k = 1; k <= 3; k++) {
                if (k == 1 && gproxy.wbpet_lq.indexOf(1) >= 0) {
                    continue;
                }
                arr.push({ "id": k, "state": gproxy.wbpet_hongdian[k] });
            }
            this.award_list.dataProvider = new eui.ArrayCollection(arr);
        };
        WanBaPetAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.WanBaPetAlertMediator.NAME);
        };
        WanBaPetAlert.prototype.close_self = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, WanBaPetAlert.S_NAME);
            this.award_list.dataProvider = null;
        };
        WanBaPetAlert.S_NAME = "WanBaPetAlert";
        return WanBaPetAlert;
    }(mx.AlertView));
    mx.WanBaPetAlert = WanBaPetAlert;
    __reflect(WanBaPetAlert.prototype, "mx.WanBaPetAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaPetAlert.js.map
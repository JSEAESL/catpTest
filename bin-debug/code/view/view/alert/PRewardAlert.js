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
*   @author mx
*   @date 2015.1.3
*   @desc 通用奖励弹窗
**/
var mx;
(function (mx) {
    var PRewardAlert = (function (_super) {
        __extends(PRewardAlert, _super);
        function PRewardAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PRewardAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_pa_ok":
                    tar = this.close_b;
                    break;
            }
            return tar;
        };
        PRewardAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.PRewardAlertMediator(this));
            this.item_list.itemRenderer = mx.GNumRender;
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.close_b.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
                }
            }
        };
        PRewardAlert.prototype.mx_test2 = function (event) {
            this.close_b.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        PRewardAlert.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.NEXT_AWARD);
        };
        PRewardAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.close_b.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_ALERT);
            facade.removeMediator(mx.PRewardAlertMediator.NAME);
        };
        PRewardAlert.S_NAME = "PRewardAlert";
        return PRewardAlert;
    }(mx.AlertView));
    mx.PRewardAlert = PRewardAlert;
    __reflect(PRewardAlert.prototype, "mx.PRewardAlert");
})(mx || (mx = {}));
//# sourceMappingURL=PRewardAlert.js.map
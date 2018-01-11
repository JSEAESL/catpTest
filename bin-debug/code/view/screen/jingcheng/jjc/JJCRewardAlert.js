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
 * @cy/2017.3.13
 *  jjc编队alert
 */
var mx;
(function (mx) {
    var JJCRewardAlert = (function (_super) {
        __extends(JJCRewardAlert, _super);
        function JJCRewardAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCRewardAlert.mx_support = function () {
            return ["assets.jjc_reward"];
        };
        JJCRewardAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JJCRewardAlertMediator(this));
        };
        JJCRewardAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JJCRewardAlertMediator.NAME);
            this.award_list.dataProvider = null;
        };
        JJCRewardAlert.S_NAME = "JJCRewardAlert";
        return JJCRewardAlert;
    }(mx.AlertView));
    mx.JJCRewardAlert = JJCRewardAlert;
    __reflect(JJCRewardAlert.prototype, "mx.JJCRewardAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCRewardAlert.js.map
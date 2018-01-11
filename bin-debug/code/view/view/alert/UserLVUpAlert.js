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
*   @author cy
*   @date 2016.12.15
*   @desc 女王升级弹窗
**/
var mx;
(function (mx) {
    var UserLVUpAlert = (function (_super) {
        __extends(UserLVUpAlert, _super);
        function UserLVUpAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserLVUpAlert.mx_support = function () {
            return ["assets.levelup"];
        };
        UserLVUpAlert.prototype.init_view_by_type = function () {
            var zg = new mx.GeneralEffect("rwjl");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            var info = this.adata.info;
            this.new_t.text = info.newlv + "";
        };
        UserLVUpAlert.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, UserLVUpAlert.S_NAME);
            if (this.adata.mode == 'fight') {
                //有后续剧情
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_ALERT);
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CHECK_NEWMODULAR);
        };
        UserLVUpAlert.S_NAME = "UserLVUpAlert";
        return UserLVUpAlert;
    }(mx.AlertView));
    mx.UserLVUpAlert = UserLVUpAlert;
    __reflect(UserLVUpAlert.prototype, "mx.UserLVUpAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UserLVUpAlert.js.map
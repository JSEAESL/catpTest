/**
*   @author cy
*   @date 2017.11.7
*   @desc 九字真言
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
    var TeamZhenYanAlert = (function (_super) {
        __extends(TeamZhenYanAlert, _super);
        function TeamZhenYanAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamZhenYanAlert.mx_support = function () {
            return ["assets.teamzy", "api.JIUZICOST"];
        };
        TeamZhenYanAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.TeamZhenYanAlertMediator(this));
        };
        TeamZhenYanAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TeamZhenYanAlertMediator.NAME);
        };
        TeamZhenYanAlert.S_NAME = "TeamZhenYanAlert";
        return TeamZhenYanAlert;
    }(mx.AlertView));
    mx.TeamZhenYanAlert = TeamZhenYanAlert;
    __reflect(TeamZhenYanAlert.prototype, "mx.TeamZhenYanAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TeamZhenYanAlert.js.map
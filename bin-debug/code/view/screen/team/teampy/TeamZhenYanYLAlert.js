/**
*   @author cy
*   @date 2017.11.8
*   @desc 九字真言预览
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
    var TeamZhenYanYLAlert = (function (_super) {
        __extends(TeamZhenYanYLAlert, _super);
        function TeamZhenYanYLAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamZhenYanYLAlert.mx_support = function () {
            return ["assets.teamzyyl"];
        };
        TeamZhenYanYLAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            var hero_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd);
            this.name_t.text = mx.Tools.format(mx.Lang.h0108, hero_info.hero_name);
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.JIUZIADD);
            var arr = [];
            for (var k in apis) {
                if (Number(apis[k].is_open)) {
                    arr.push({
                        "hero_id": cd,
                        "id": Number(k) + 1
                    });
                }
            }
            this.yl_list.itemRenderer = mx.TeamZhenYanRender;
            this.yl_list.dataProvider = new eui.ArrayCollection(arr);
        };
        TeamZhenYanYLAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.yl_list.dataProvider = null;
        };
        TeamZhenYanYLAlert.S_NAME = "TeamZhenYanYLAlert";
        return TeamZhenYanYLAlert;
    }(mx.AlertView));
    mx.TeamZhenYanYLAlert = TeamZhenYanYLAlert;
    __reflect(TeamZhenYanYLAlert.prototype, "mx.TeamZhenYanYLAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TeamZhenYanYLAlert.js.map
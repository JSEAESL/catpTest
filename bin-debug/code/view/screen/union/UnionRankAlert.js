/**
 *   @author cy
 *   @date 2017.4.28
 *   @desc 家族排行
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
    var UnionRankAlert = (function (_super) {
        __extends(UnionRankAlert, _super);
        function UnionRankAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionRankAlert.mx_support = function () {
            return ["assets.jz_rank", "data.3526"];
        };
        UnionRankAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionRankAlertMediator(this));
        };
        UnionRankAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionRankAlertMediator.NAME);
        };
        UnionRankAlert.S_NAME = "UnionRankAlert";
        return UnionRankAlert;
    }(mx.AlertView));
    mx.UnionRankAlert = UnionRankAlert;
    __reflect(UnionRankAlert.prototype, "mx.UnionRankAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionRankAlert.js.map
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
 * @cy/2017.8.8
 *  家族详情alert
 */
var mx;
(function (mx) {
    var UnionDetailAlert = (function (_super) {
        __extends(UnionDetailAlert, _super);
        function UnionDetailAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionDetailAlert.mx_support = function () {
            return ["assets.jz_detail"];
        };
        UnionDetailAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionDetailAlertMediator(this));
        };
        UnionDetailAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionDetailAlertMediator.NAME);
        };
        UnionDetailAlert.S_NAME = "UnionDetailAlert";
        return UnionDetailAlert;
    }(mx.AlertView));
    mx.UnionDetailAlert = UnionDetailAlert;
    __reflect(UnionDetailAlert.prototype, "mx.UnionDetailAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionDetailAlert.js.map
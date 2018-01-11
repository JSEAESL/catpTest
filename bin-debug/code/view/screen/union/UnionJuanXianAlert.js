/**
 *   @author cy
 *   @date 2017.4.27
 *   @desc 捐献弹窗
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
    var UnionJuanXianAlert = (function (_super) {
        __extends(UnionJuanXianAlert, _super);
        function UnionJuanXianAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionJuanXianAlert.mx_support = function () {
            return ["assets.jz_donate"];
        };
        UnionJuanXianAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionJuanXianAlertMediator(this));
        };
        UnionJuanXianAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionJuanXianAlertMediator.NAME);
        };
        UnionJuanXianAlert.S_NAME = "UnionJuanXianAlert";
        return UnionJuanXianAlert;
    }(mx.AlertView));
    mx.UnionJuanXianAlert = UnionJuanXianAlert;
    __reflect(UnionJuanXianAlert.prototype, "mx.UnionJuanXianAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionJuanXianAlert.js.map
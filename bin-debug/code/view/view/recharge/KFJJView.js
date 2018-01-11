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
 * @cy/2017.2.27
 *  开服基金alert
 */
var mx;
(function (mx) {
    var KFJJView = (function (_super) {
        __extends(KFJJView, _super);
        function KFJJView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.stateflag = 3;
            return _this;
        }
        KFJJView.mx_support = function () {
            return ["assets.acty_jijin", "api.ACTRECHARGE"];
        };
        KFJJView.prototype.init_view_by_type = function () {
            var view = this;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.KFJJMediator(view));
        };
        KFJJView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.KFJJMediator.NAME);
        };
        KFJJView.S_NAME = "KFJJView";
        return KFJJView;
    }(mx.AlertView));
    mx.KFJJView = KFJJView;
    __reflect(KFJJView.prototype, "mx.KFJJView");
})(mx || (mx = {}));
//# sourceMappingURL=KFJJView.js.map
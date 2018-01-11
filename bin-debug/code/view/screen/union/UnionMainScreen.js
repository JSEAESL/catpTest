/**
 *   @author cy
 *   @date 2017.4.19
 *   @desc 家族主界面
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
    var UnionMainScreen = (function (_super) {
        __extends(UnionMainScreen, _super);
        function UnionMainScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionMainScreen.mx_support = function () {
            return ["assets.jz_main", "assets.jz_public", "api.GHZHIWEI", "api.GHEXP", "api.GHRENSHU"];
        };
        UnionMainScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionMainScreenMediator(this));
        };
        UnionMainScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionMainScreenMediator.NAME);
        };
        UnionMainScreen.S_NAME = "UnionMainScreen";
        return UnionMainScreen;
    }(mx.BasicView));
    mx.UnionMainScreen = UnionMainScreen;
    __reflect(UnionMainScreen.prototype, "mx.UnionMainScreen");
})(mx || (mx = {}));
//# sourceMappingURL=UnionMainScreen.js.map
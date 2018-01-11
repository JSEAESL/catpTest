/**
 *   @author cy
 *   @date 2017.4.18
 *   @desc 无家族主界面
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
    var UnionScreen = (function (_super) {
        __extends(UnionScreen, _super);
        function UnionScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionScreen.mx_support = function () {
            return ["assets.jz_screen", "assets.jz_public", "data.3526", "data.3521"];
        };
        UnionScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionScreenMediator(this));
        };
        UnionScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionScreenMediator.NAME);
        };
        UnionScreen.S_NAME = "UnionScreen";
        return UnionScreen;
    }(mx.BasicView));
    mx.UnionScreen = UnionScreen;
    __reflect(UnionScreen.prototype, "mx.UnionScreen");
})(mx || (mx = {}));
//# sourceMappingURL=UnionScreen.js.map
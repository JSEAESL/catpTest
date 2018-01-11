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
    var UnionJuanXianScreen = (function (_super) {
        __extends(UnionJuanXianScreen, _super);
        function UnionJuanXianScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionJuanXianScreen.mx_support = function () {
            return ["assets.jz_juanxian"];
        };
        UnionJuanXianScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionJuanXianScreenMediator(this));
        };
        UnionJuanXianScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionJuanXianScreenMediator.NAME);
        };
        UnionJuanXianScreen.S_NAME = "UnionJuanXianScreen";
        return UnionJuanXianScreen;
    }(mx.BasicView));
    mx.UnionJuanXianScreen = UnionJuanXianScreen;
    __reflect(UnionJuanXianScreen.prototype, "mx.UnionJuanXianScreen");
})(mx || (mx = {}));
//# sourceMappingURL=UnionJuanXianScreen.js.map
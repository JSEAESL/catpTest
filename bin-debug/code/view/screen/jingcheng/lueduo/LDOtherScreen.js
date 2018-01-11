/**
 *   @author mx
 *   @date 2017.1.5
 *   @desc 掠夺己方主界面
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
    var LDOtherScreen = (function (_super) {
        __extends(LDOtherScreen, _super);
        function LDOtherScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDOtherScreen.mx_support = function () {
            return ["assets.ldother", "api.QINMI", "api.JINJI", "api.TAIMIAO"];
        };
        LDOtherScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.LDOtherMediator(this));
        };
        LDOtherScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.LDOtherMediator.NAME);
        };
        LDOtherScreen.S_NAME = "LDOtherScreen";
        LDOtherScreen.M_NAME = "LDMainScreen";
        return LDOtherScreen;
    }(mx.BasicView));
    mx.LDOtherScreen = LDOtherScreen;
    __reflect(LDOtherScreen.prototype, "mx.LDOtherScreen");
})(mx || (mx = {}));
//# sourceMappingURL=LDOtherScreen.js.map
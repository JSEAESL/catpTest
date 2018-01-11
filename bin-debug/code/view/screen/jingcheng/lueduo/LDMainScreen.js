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
    var LDMainScreen = (function (_super) {
        __extends(LDMainScreen, _super);
        function LDMainScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDMainScreen.mx_support = function () {
            return ["assets.ldmain", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.EQUIP", "api.QUALITYADD", "api.STARADD", "data.3110"];
        };
        LDMainScreen.prototype.init_view = function () {
            this.hero_list.itemRenderer = mx.TeamHeroRender2;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.LDMainMediator(this));
        };
        LDMainScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.LDMainMediator.NAME);
        };
        LDMainScreen.S_NAME = "LDMainScreen";
        return LDMainScreen;
    }(mx.BasicView));
    mx.LDMainScreen = LDMainScreen;
    __reflect(LDMainScreen.prototype, "mx.LDMainScreen");
})(mx || (mx = {}));
//# sourceMappingURL=LDMainScreen.js.map
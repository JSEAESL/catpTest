/**
 *   @author cy
 *   @date 20157.3.13
 *   @desc jjc主界面
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
    var JJCMainScreen = (function (_super) {
        __extends(JJCMainScreen, _super);
        function JJCMainScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCMainScreen.mx_support = function () {
            return ["assets.jjc", "assets.jjc_res", "api.JJCCOST", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.EQUIP", "api.QUALITYADD", "api.STARADD", "api.JJCAWARD", "data.3401"];
        };
        JJCMainScreen.prototype.init_view = function () {
            this.target_list.itemRenderer = mx.JJCDRRender;
            this.hero_list.itemRenderer = mx.TeamHeroRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JJCMainMediator(this));
        };
        JJCMainScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JJCMainMediator.NAME);
        };
        JJCMainScreen.S_NAME = "JJCMainScreen";
        return JJCMainScreen;
    }(mx.BasicView));
    mx.JJCMainScreen = JJCMainScreen;
    __reflect(JJCMainScreen.prototype, "mx.JJCMainScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JJCMainScreen.js.map
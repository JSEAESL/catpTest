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
var UILogin = (function (_super) {
    __extends(UILogin, _super);
    function UILogin() {
        var _this = _super.call(this) || this;
        _this.skinName = "UILogin_eui";
        return _this;
    }
    UILogin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameStart, this);
    };
    UILogin.prototype.GameStart = function (e) {
        SceneUtil.getInstance().goGame();
    };
    UILogin.prototype.disponse = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GameStart, this);
    };
    return UILogin;
}(Widget));
__reflect(UILogin.prototype, "UILogin");
//# sourceMappingURL=UILogin.js.map
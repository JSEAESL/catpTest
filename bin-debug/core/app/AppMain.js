var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AppMain = (function () {
    function AppMain() {
    }
    AppMain.Start = function (_root) {
        if (null == this._ins) {
            this._ins = new AppMain();
        }
        this._ins.root = _root;
        this._ins.start();
    };
    AppMain.prototype.loadOnlyLoadGroup = function (n, loadEndCall) {
        var _this = this;
        if (loadEndCall === void 0) { loadEndCall = null; }
        ResUtils.getInstance().loadGroupWithPro(n, function () {
            if (loadEndCall != null) {
                loadEndCall.call(_this);
            }
        }, null, this);
    };
    AppMain.prototype.start = function () {
        //old Enter
        //GameConfig.stage
        // SceneUtil.getInstance().setCurrentRoot(this.root)
        // SceneUtil.getInstance().goLoginUi();
        var _this = this;
        //new Enter
        if (RES.isGroupLoaded("loginui")) {
            this.initApp();
        }
        else {
            this.loadOnlyLoadGroup("loginui", function () {
                _this.initApp();
            });
        }
    };
    AppMain.prototype.initApp = function () {
        //初始化UIStage
        console.log("initApp");
        var appContainer = new mx.AppContainer();
        GameConfig.stage.addChild(appContainer);
        //初始化MVC结构
        mx.ApplicationFacade.getInstance().startUp(appContainer);
    };
    return AppMain;
}());
__reflect(AppMain.prototype, "AppMain");
//# sourceMappingURL=AppMain.js.map
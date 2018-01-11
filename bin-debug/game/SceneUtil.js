var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneUtil = (function () {
    function SceneUtil() {
        this.showUIList = [];
        //egret.startTick(this.onTicker, this);
    }
    //单例
    SceneUtil.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SceneUtil();
        }
        return this._instance;
    };
    SceneUtil.prototype.setCurrentRoot = function (dim) {
        this._root = dim;
    };
    //得到当前的ui
    SceneUtil.prototype.getCurrentUi = function () {
        return this._currentUi;
    };
    SceneUtil.prototype.goGame = function () {
        this.showUi(new UIGame());
    };
    SceneUtil.prototype.goLoginUi = function () {
        var _this = this;
        if (RES.isGroupLoaded("loginui")) {
            this.showUi(new UILogin());
        }
        else {
            this.loadOnlyLoadGroup("loginui", function () {
                _this.showUi(new UILogin());
            });
        }
    };
    SceneUtil.prototype.showUIResult = function (reData) {
        var ui = new UIResult();
        this.addUi(ui);
        ui.setResultData(reData);
        ui.playGroup();
    };
    SceneUtil.prototype.addUi = function (ui, part) {
        if (part === void 0) { part = null; }
        this.showUIList.push(ui);
        if (!part) {
            part = this._root;
        }
        part.addChild(ui);
    };
    SceneUtil.prototype.removeUi = function (ui) {
        var index = this.showUIList.indexOf(ui);
        this.showUIList.splice(index, 1);
        if (null != ui.parent) {
            ui.parent.removeChild(ui);
        }
        ui.disponse();
    };
    //移除当前ui
    SceneUtil.prototype.removeCurrUi = function () {
        if (this._currentUi != null) {
            this._currentUi.parent.removeChild(this._currentUi);
            this._currentUi.disponse();
        }
    };
    SceneUtil.prototype.showUi = function (ui) {
        this.removeCurrUi();
        this._currentUi = ui;
        this._root.addChild(this._currentUi);
    };
    SceneUtil.prototype.loadOnlyLoadGroup = function (n, loadEndCall) {
        var _this = this;
        if (loadEndCall === void 0) { loadEndCall = null; }
        ResUtils.getInstance().loadGroupWithPro(n, function () {
            if (loadEndCall != null) {
                loadEndCall.call(_this);
            }
        }, null, this);
    };
    SceneUtil._instance = null;
    return SceneUtil;
}());
__reflect(SceneUtil.prototype, "SceneUtil");
//# sourceMappingURL=SceneUtil.js.map
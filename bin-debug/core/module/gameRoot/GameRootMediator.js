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
    var GameRootMediator = (function (_super) {
        __extends(GameRootMediator, _super);
        function GameRootMediator(viewComponent) {
            return _super.call(this, GameRootMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(GameRootMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GameRootMediator.prototype.listNotificationInterests = function () {
            return [
                //SIGN_NAME.ENTER_GAME_ROOT,
                UIGame.UPDATA,
                UIGame.UPDATA_CAT,
                UIGame.UPDATA_CAT_Bir,
                UIGame.GAME_Cat_Lose,
                UIGame.GAME_Win,
                UIGame.GAME_Lose,
                UIGame.RE_START_GAME
            ];
        };
        GameRootMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case UIGame.RE_START_GAME:
                    this.reStarGame();
                    break;
                case UIGame.UPDATA:
                    this.UpdataData(data);
                    break;
                case UIGame.UPDATA_CAT:
                    this.UpdataCat(data);
                    break;
                case UIGame.UPDATA_CAT_Bir:
                    this.UpdataCatBir(data);
                    break;
                case UIGame.GAME_Cat_Lose:
                    this.catLose(data);
                    break;
                case UIGame.GAME_Win:
                    this.showWin(data);
                    break;
                case UIGame.GAME_Lose:
                    this.showLose(data);
                    break;
            }
        };
        GameRootMediator.prototype.catLose = function (e) {
            this.view.catLose(e.data);
        };
        GameRootMediator.prototype.showWait = function () {
            this.view.wait.visible = true;
        };
        GameRootMediator.prototype.hideWait = function () {
            this.view.wait.visible = false;
        };
        GameRootMediator.prototype.showWin = function (e) {
            this.showWait();
            var data = e.data;
            this.sendNotification(mx.SIGN_NAME.GAME_RESULT_RUN, data);
            //SceneUtil.getInstance().showUIResult(data);
        };
        GameRootMediator.prototype.showLose = function (e) {
            this.showWait();
            var data = e.data;
            this.sendNotification(mx.SIGN_NAME.GAME_RESULT_RUN, data);
        };
        GameRootMediator.prototype.init = function () {
            this.initGame();
            var gProxy = (this.facade.retrieveProxy(mx.GameModelProxy.NAME));
            gProxy.updataCat();
            //GameModel.Ins.updataCat();
        };
        GameRootMediator.prototype.clickHandler = function () {
            //this.sendNotification(SIGN_NAME.ENTER_GAME_ROOT);
        };
        GameRootMediator.prototype.addEvent = function () {
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            // GlobalDispatcher.Ins.addEventListener(,,this);
            this.view.restart_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
        };
        GameRootMediator.prototype.reStarGame = function (e) {
            if (e === void 0) { e = null; }
            var gProxy = (this.facade.retrieveProxy(mx.GameModelProxy.NAME));
            gProxy.reSetData();
            //GameModel.Ins.reSetData();
            this.initGame();
            gProxy.updataCat();
            //GameModel.Ins.updataCat();
        };
        GameRootMediator.prototype.UpdataCat = function (e) {
            var pointdata = e.data;
            this.view.UpdataCat(pointdata);
        };
        GameRootMediator.prototype.UpdataCatBir = function (e) {
            var pointdata = e.data;
            this.view.UpdataCatBir(pointdata);
        };
        GameRootMediator.prototype.initGame = function (e) {
            if (e === void 0) { e = null; }
            this.hideWait();
            var gProxy = (this.facade.retrieveProxy(mx.GameModelProxy.NAME));
            var data = gProxy.reSetData();
            var dataMax = gProxy.pointMax;
            var vo;
            this.view.score_t.text = gProxy.nowStep + "";
            for (var i = 0; i < dataMax; i++) {
                vo = data.get(i);
                this.view.updataPoint(vo);
            }
            this.view.cat.reStart();
            this.view.cat1.reStart();
        };
        GameRootMediator.prototype.UpdataData = function (e) {
            var gProxy = (this.facade.retrieveProxy(mx.GameModelProxy.NAME));
            this.view.score_t.text = gProxy.nowStep + "";
            var data = e.data;
            this.view.updataPoint(data);
        };
        GameRootMediator.prototype.removeEvent = function () {
            //this.view.button_b.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)
        };
        GameRootMediator.prototype.removeOther = function () {
        };
        GameRootMediator.NAME = "GameRootMediator";
        return GameRootMediator;
    }(BasicMediator));
    mx.GameRootMediator = GameRootMediator;
    __reflect(GameRootMediator.prototype, "mx.GameRootMediator");
})(mx || (mx = {}));
//# sourceMappingURL=GameRootMediator.js.map
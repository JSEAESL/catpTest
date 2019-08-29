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
    var GameResultMediator = (function (_super) {
        __extends(GameResultMediator, _super);
        function GameResultMediator(viewComponent) {
            return _super.call(this, GameResultMediator.NAME, viewComponent) || this;
            //this.addEvent();
        }
        Object.defineProperty(GameResultMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GameResultMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        GameResultMediator.prototype.reStarGame = function (e) {
            console.log("reStarGame");
            this.sendNotification(UIGame.RE_START_GAME);
        };
        GameResultMediator.prototype.setResultData = function (resultData) {
            this.mData = resultData;
            this.updataView();
        };
        GameResultMediator.prototype.updataView = function () {
            if (null != this.mData) {
                this.view.scoreLabel.text = this.mData.score + "";
                if (this.mData.state) {
                    this.view.currentState = "win";
                }
                else {
                    this.view.currentState = "lose";
                }
            }
            this.view.heightScoreLabel.text = 0 + "";
            var temp = egret.localStorage.getItem("WinStep");
            if (temp) {
                var winStep = parseInt(temp);
                if (winStep != 0 && winStep != NaN) {
                    this.view.heightScoreLabel.text = 100 - winStep + "";
                }
            }
            this.addEvent();
        };
        GameResultMediator.prototype.addEvent = function () {
            this.view.againImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
            this.view.againImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
        };
        GameResultMediator.prototype.removeEvent = function () {
            this.view.againImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
        };
        GameResultMediator.NAME = "GameResultMediator";
        return GameResultMediator;
    }(BasicMediator));
    mx.GameResultMediator = GameResultMediator;
    __reflect(GameResultMediator.prototype, "mx.GameResultMediator");
})(mx || (mx = {}));
//# sourceMappingURL=GameResultMediator.js.map
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
    var GameResult = (function (_super) {
        __extends(GameResult, _super);
        function GameResult(cd) {
            var _this = _super.call(this, cd) || this;
            _this.skinName = GameResult.NAME + "Skin";
            return _this;
        }
        GameResult.prototype.onAddTostage = function () {
            console.log("GameStart>>>onAddTostage");
            var facade = mx.ApplicationFacade.getInstance();
            var med = new mx.GameResultMediator(this);
            facade.registerMediator(med);
            med.setResultData(this.adata);
            this.x = 0.5 * (GameConfig.stageWidth - this.width);
            this.y = 0.5 * (GameConfig.stageHeight - this.height);
        };
        GameResult.prototype.onRmovestage = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.GameResultMediator.NAME);
        };
        GameResult.NAME = "GameResult";
        return GameResult;
    }(BasicComponent));
    mx.GameResult = GameResult;
    __reflect(GameResult.prototype, "mx.GameResult");
})(mx || (mx = {}));
//# sourceMappingURL=GameResult.js.map
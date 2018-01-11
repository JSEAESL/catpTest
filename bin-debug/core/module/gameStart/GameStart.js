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
    var GameStart = (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            var _this = _super.call(this) || this;
            _this.skinName = GameStart.NAME + "Skin";
            return _this;
        }
        GameStart.prototype.onAddTostage = function () {
            console.log("GameStart>>>onAddTostage");
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.GameStartMediator(this));
        };
        GameStart.prototype.onRmovestage = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.GameStartMediator.NAME);
        };
        GameStart.NAME = "GameStart";
        return GameStart;
    }(BasicComponent));
    mx.GameStart = GameStart;
    __reflect(GameStart.prototype, "mx.GameStart");
})(mx || (mx = {}));
//# sourceMappingURL=GameStart.js.map
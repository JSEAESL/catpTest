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
    var GameStartMediator = (function (_super) {
        __extends(GameStartMediator, _super);
        function GameStartMediator(viewComponent) {
            return _super.call(this, GameStartMediator.NAME, viewComponent) || this;
            //this.addEvent();
        }
        Object.defineProperty(GameStartMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GameStartMediator.prototype.listNotificationInterests = function () {
            return [
                mx.SIGN_NAME.ENTER_GAME_ROOT,
            ];
        };
        GameStartMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.SIGN_NAME.ENTER_GAME_ROOT:
                    this.sendNotification(mx.ApplicationMediator.APP_VIEW_CHANGE, { "viewName": "GameRoot" });
                    break;
            }
        };
        GameStartMediator.prototype.clickHandler = function () {
            this.sendNotification(mx.SIGN_NAME.ENTER_GAME_ROOT);
        };
        GameStartMediator.prototype.addEvent = function () {
            this.view.button_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        GameStartMediator.prototype.removeEvent = function () {
            this.view.button_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        GameStartMediator.NAME = "GameStartMediator";
        return GameStartMediator;
    }(BasicMediator));
    mx.GameStartMediator = GameStartMediator;
    __reflect(GameStartMediator.prototype, "mx.GameStartMediator");
})(mx || (mx = {}));
//# sourceMappingURL=GameStartMediator.js.map
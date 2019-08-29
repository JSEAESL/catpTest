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
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            var _this = _super.call(this) || this;
            _this.initElement();
            return _this;
        }
        AppContainer.prototype.initElement = function () {
            var g_arr = ["bg_g", "alert_g"];
            for (var k in g_arr) {
                var c_g = new eui.Group();
                c_g.percentWidth = 100;
                c_g.touchEnabled = false;
                c_g.height = GameConfig.stageHeight;
                c_g.verticalCenter = 0;
                this.addChild(c_g);
                this[g_arr[k]] = c_g;
            }
            this.addList = [];
        };
        AppContainer.prototype.enterGame = function () {
            console.log("enterGame");
            this.change_view("GameStart");
        };
        AppContainer.prototype.add_view = function (viewName, data) {
            var c_class = egret.getDefinitionByName("mx." + viewName);
            if (c_class) {
                var screen_1 = new c_class(data);
                this.alert_g.addChild(screen_1);
                this.addList.push(screen_1);
            }
        };
        AppContainer.prototype.clean_Add = function () {
            for (var k in this.addList) {
                if (this.addList[k] && this.addList[k].parent) {
                    this.addList[k].parent.removeChild(this.addList[k]);
                }
            }
        };
        AppContainer.prototype.cleanNowView = function () {
            if (this.nowView && this.nowView.parent) {
                this.nowView.parent.removeChild(this.nowView);
            }
            this.clean_Add();
        };
        AppContainer.prototype.change_view = function (viewName, data) {
            this.cleanNowView();
            var c_class = egret.getDefinitionByName("mx." + viewName);
            if (c_class) {
                var screen_2 = new c_class(data);
                this.nowView = screen_2;
                this.bg_g.addChild(screen_2);
            }
        };
        return AppContainer;
    }(eui.UILayer));
    mx.AppContainer = AppContainer;
    __reflect(AppContainer.prototype, "mx.AppContainer");
})(mx || (mx = {}));
//# sourceMappingURL=AppContainer.js.map
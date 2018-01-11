/**
*   @author qianjun
*   @date 2016.9.5
*   @desc 背包界面
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
    var PackageScreen = (function (_super) {
        __extends(PackageScreen, _super);
        function PackageScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PackageScreen.mx_support = function () {
            return [
                "assets.pack",
                "api.EQUIP", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.QUALITYADD", "api.STARADD", "api.EQUIPOBTAIN", "api.STAGE", "api.ITEMAWARDS"
            ];
        };
        PackageScreen.prototype.init_view = function () {
            var view = this;
            this.back_b.set_ssres("back_png");
            // this.tli_add_b.set_ssres("add_png");
            this.coin_add_b.set_ssres("add_png");
            this.use_b.set_ssres("syong_png");
            this.sell_b.set_ssres("mchu_png");
            // 注册背包界面Mediator
            mx.ApplicationFacade.getInstance().registerMediator(new mx.PackageScreenMediator(view));
        };
        PackageScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.PackageScreenMediator.NAME);
        };
        PackageScreen.S_NAME = "PackageScreen";
        return PackageScreen;
    }(mx.BasicView));
    mx.PackageScreen = PackageScreen;
    __reflect(PackageScreen.prototype, "mx.PackageScreen");
})(mx || (mx = {}));
//# sourceMappingURL=PackageScreen.js.map
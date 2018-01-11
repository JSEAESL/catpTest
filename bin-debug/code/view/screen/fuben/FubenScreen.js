/**
*   @author mx,qianjun
*   @date 2016.9.8
*   @desc 劇情
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
    var FubenScreen = (function (_super) {
        __extends(FubenScreen, _super);
        function FubenScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenScreen.mx_support = function () {
            return [
                "assets.fuben",
                "api.STARADD", "api.STAGE", "api.BATTLE", "api.EQUIP", "api.RESETFBPRICE", "api.QUALITYADD", "api.SKILLNEW", "api.SKILLNEWGROUP",
                "data.1401"
            ];
        };
        FubenScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_fb_jy"://精英FB
                    tar = this.type_list.getChildAt(1);
                    break;
            }
            return tar;
        };
        FubenScreen.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.FubenScreenMediator(this));
        };
        FubenScreen.prototype.fresh_screen = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
        };
        FubenScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.FubenScreenMediator.NAME);
        };
        FubenScreen.S_NAME = "FubenScreen";
        return FubenScreen;
    }(mx.BasicView));
    mx.FubenScreen = FubenScreen;
    __reflect(FubenScreen.prototype, "mx.FubenScreen");
})(mx || (mx = {}));
//# sourceMappingURL=FubenScreen.js.map
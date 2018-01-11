/**
*   @author mx
*   @date 2015.1.3
*   @desc 团队主界面
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
    var TeamScreen = (function (_super) {
        __extends(TeamScreen, _super);
        function TeamScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamScreen.mx_support = function () {
            return ["assets.teammain", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.QUALITYADD", "api.STARADD", "api.HOUGONGUPLEVEL", "api.HOUGONGBUFF", "data.2109", "data.2111", "data.1742"];
        };
        TeamScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_bd_l2"://编队-站位2
                    tar = this.hero_list.getChildAt(3);
                    tar = tar.select_b;
                    tar.y -= 15;
                    break;
                case "s_mr_hl1":
                    tar = this.hero_list.getChildAt(4);
                    break;
                case "s_bd_l4"://第四个侍从
                    tar = this.hero_list.getChildAt(1);
                    tar = tar.select_b;
                    break;
                case "s_mr_dh"://兑换
                    tar = this.dhuan_b;
                    break;
                case "s_mr_yl"://侍从一览
                    tar = this.bdui_b;
                    break;
                case "s_mr_zw":
                    tar = this.zwei_b;
                    break;
            }
            return tar;
        };
        TeamScreen.prototype.init_view = function () {
            //this.tabmenu.set_sindex(2);
            this.hero_list.itemRenderer = mx.HeroQueueRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TeamScreenMediator(this));
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
        };
        TeamScreen.prototype.back_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var p_name = TeamScreen.P_NAME;
            if (p_name) {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                TeamScreen.P_NAME = null;
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
            }
        };
        TeamScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            // this.tabmenu.on_remove();
            // this.topinfo.on_remove();
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TeamScreenMediator.NAME);
        };
        TeamScreen.S_NAME = "TeamScreen";
        return TeamScreen;
    }(mx.BasicView));
    mx.TeamScreen = TeamScreen;
    __reflect(TeamScreen.prototype, "mx.TeamScreen");
})(mx || (mx = {}));
//# sourceMappingURL=TeamScreen.js.map
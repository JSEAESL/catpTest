/**
*   @author mx
*   @date 2015.1.3
*   @desc 兑换英雄
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
    var TeamDHScreen = (function (_super) {
        __extends(TeamDHScreen, _super);
        function TeamDHScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamDHScreen.mx_support = function () {
            return ["assets.teamdh", "api.EQUIP", "api.EQUIPOBTAIN", "api.STAGE"];
        };
        TeamDHScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_dh_l1":
                    tar = this.hero_list.getChildAt(0);
                    break;
            }
            return tar;
        };
        TeamDHScreen.prototype.init_view = function () {
            this.back_b.set_ssres("back_png");
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero_list.itemRenderer = mx.TeamDHHeroRender;
            this.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_cscreen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TeamDHMediator(this));
        };
        TeamDHScreen.prototype.fresh_cscreen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            hproxy.reset_dh_info(); //临时处理，每次都刷新兑换列表
            var list = this.hero_list;
            if (hproxy.dh_info.length) {
                var old = list.scrollV;
                list.dataProvider = new eui.ArrayCollection(hproxy.dh_info);
                list.validateNow();
                list.scrollV = old;
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME, "param": { "shijian": { 'msg_id': 200 } }
                });
            }
        };
        TeamDHScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero_list.dataProvider = null;
            this.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TeamDHMediator.NAME);
        };
        TeamDHScreen.prototype.btn_click = function (evt) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamScreen.S_NAME);
        };
        TeamDHScreen.prototype.onTabChange = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var c_d = e.item;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HeroInfoView.S_NAME,
                "param": {
                    "hero": c_d.id,
                    "type": 'not',
                    "need": c_d.need,
                    "now": c_d.now,
                    "coin": c_d.coin
                },
            });
        };
        TeamDHScreen.S_NAME = "TeamDHScreen";
        return TeamDHScreen;
    }(mx.BasicView));
    mx.TeamDHScreen = TeamDHScreen;
    __reflect(TeamDHScreen.prototype, "mx.TeamDHScreen");
})(mx || (mx = {}));
//# sourceMappingURL=TeamDHScreen.js.map
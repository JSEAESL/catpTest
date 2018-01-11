/**
 * @cy/2016.9.13
 * 全部剧情界面
 */
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
    var AllJuqingScreen = (function (_super) {
        __extends(AllJuqingScreen, _super);
        function AllJuqingScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AllJuqingScreen.mx_support = function () {
            return ["assets.teamlas", "data.1502"];
        };
        AllJuqingScreen.prototype.init_view = function () {
            this.back_b.set_ssres("back_png");
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.juqing_list.itemRenderer = mx.JuQingAllRender;
            this.juqing_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_screen();
        };
        AllJuqingScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_data = hProxy.juqing.concat();
            var ids = [];
            for (var k in c_data) {
                ids.push(c_data[k].mid);
            }
            var temp = mx.ApiTool.getAPINodes(mx.MX_APINAME.HERO, "UnitType", "Hero");
            for (var k in temp) {
                if (ids.indexOf(temp[k].id) < 0) {
                    c_data.push({ "id": c_data.length + 1, "mid": temp[k].id, "status": 3 });
                }
            }
            this.juqing_list.dataProvider = new eui.ArrayCollection(c_data);
        };
        AllJuqingScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.juqing_list.dataProvider = null;
            this.juqing_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        AllJuqingScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                    break;
            }
        };
        AllJuqingScreen.prototype.onTabChange = function (e) {
            var c_d = e.item;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.item.status) {
                case 3://没有这个英雄
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0049 });
                    break;
                case 0: //恋爱中
                case 1://已入后宫
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HERO_YUEHUI_STATE, "mid": e.item.mid
                    });
                    break;
                case 2://缘分已尽
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0050 });
                    break;
            }
        };
        AllJuqingScreen.S_NAME = "AllJuqingScreen";
        AllJuqingScreen.M_NAME = "TeamScreen";
        return AllJuqingScreen;
    }(mx.BasicView));
    mx.AllJuqingScreen = AllJuqingScreen;
    __reflect(AllJuqingScreen.prototype, "mx.AllJuqingScreen");
})(mx || (mx = {}));
//# sourceMappingURL=QuanbuJuqingScreen.js.map
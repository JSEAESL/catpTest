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
/**
 * @author dingyunfeng
 * @date 2018.1.2
 * 推广员主界面
 */
var mx;
(function (mx) {
    var TuiGuangYuanView = (function (_super) {
        __extends(TuiGuangYuanView, _super);
        function TuiGuangYuanView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuiGuangYuanView.mx_support = function () {
            return ["assets.tgyuan"];
        };
        TuiGuangYuanView.prototype.init_view_by_type = function () {
            var view = this;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            var arr = [
                { "down": "tgmrtguang_png" },
                { "down": "tghyczhang_png" }
            ];
            this.tab_list.dataProvider = new eui.ArrayCollection(arr);
            this.tab_list.selectedIndex = 0;
            this.tab_g0.visible = this.tab_list.selectedIndex == 0;
            this.tab_g1.visible = this.tab_list.selectedIndex == 1;
            this.item_list.itemRenderer = mx.GNumRender;
            var item_arr = [];
            var awards = [
                { "type": 1, "num": 20000, "item_id": 2025 },
                { "type": 4, "num": 3, "item_id": 2000 },
            ];
            for (var i in awards) {
                var unit = awards[i];
                item_arr.push({
                    "bg": "tgitemkuang_png",
                    "id": unit.item_id,
                    "type": unit.type,
                    "num": unit.num,
                    "di": true,
                    "no_num": true,
                    "chicun": 90,
                    "top": 97,
                    "di_cor": 0xE7A576,
                    "di_size": 20,
                    "width": 90
                });
            }
            this.item_list.dataProvider = new eui.ArrayCollection(item_arr);
            this.pl_list.itemRenderer = mx.TgFriendRender;
            this.fx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TuiGuangYuanViewMediator(this));
            this.fresh_view();
        };
        TuiGuangYuanView.prototype.share_click = function () {
            //自定义分享，传参OPENMODE="wxtgy"、tg_user_id=Main.user_id
        };
        TuiGuangYuanView.prototype.fresh_view = function () {
            var pl_arr = [];
            for (var i = 1; i < 10; i++) {
                pl_arr.push({
                    "id": i,
                    "award": 3 * i - 15,
                    "name": "容嬷嬷！拿针来！",
                    "lv": 20,
                    "isfriend": false,
                });
            }
            this.pl_list.dataProvider = new eui.ArrayCollection(pl_arr);
        };
        TuiGuangYuanView.prototype.tab_click = function (e) {
            this.tab_g0.visible = e.itemIndex == 0;
            this.tab_g1.visible = e.itemIndex == 1;
        };
        TuiGuangYuanView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuiGuangYuanViewMediator.NAME);
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
        };
        TuiGuangYuanView.S_NAME = "TuiGuangYuanView";
        return TuiGuangYuanView;
    }(mx.AlertView));
    mx.TuiGuangYuanView = TuiGuangYuanView;
    __reflect(TuiGuangYuanView.prototype, "mx.TuiGuangYuanView");
})(mx || (mx = {}));
//# sourceMappingURL=TuiGuangYuanView.js.map
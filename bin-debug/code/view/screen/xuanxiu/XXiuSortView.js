/**
 * @author daiqi
 * @date 2017.5.18
 * 奖励一览类别弹窗
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
    var XXiuSortView = (function (_super) {
        __extends(XXiuSortView, _super);
        function XXiuSortView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuSortView.prototype.init_view = function () {
            var view = this;
            view.types = ["ALL", "STRENGTH", "AGILITY", "INTELLIGENCE"];
            view.type_list.dataProvider = new eui.ArrayCollection(mx.Lang.te004);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.type_list.selectedIndex = this.types.indexOf(this.adata);
        };
        XXiuSortView.prototype.set_skinname = function () {
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["TeamSortViewSkin"];
            }
            else {
                this.skinName = RES.getRes("TeamSortViewSkin_exml");
            }
        };
        XXiuSortView.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.HERO_SORT, this.types[e.itemIndex]);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XXiuSortView.S_NAME);
        };
        XXiuSortView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            if (view.type_list) {
                view.type_list.dataProvider = null;
                view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            }
        };
        XXiuSortView.S_NAME = "XXiuSortView";
        return XXiuSortView;
    }(mx.BasicView));
    mx.XXiuSortView = XXiuSortView;
    __reflect(XXiuSortView.prototype, "mx.XXiuSortView");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuSortView.js.map
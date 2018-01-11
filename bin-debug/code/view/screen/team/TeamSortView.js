/**
*   @author mx
*   @date 2015.1.3
*   @desc 通用彈窗
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
    var TeamSortView = (function (_super) {
        __extends(TeamSortView, _super);
        function TeamSortView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamSortView.prototype.init_view = function () {
            var view = this;
            view.types = ["ALL", "STRENGTH", "AGILITY", "INTELLIGENCE"];
            view.type_list.dataProvider = new eui.ArrayCollection(mx.Lang.te004);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.type_list.selectedIndex = this.types.indexOf(this.adata);
        };
        TeamSortView.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.HERO_SORT, this.types[e.itemIndex]);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, TeamSortView.S_NAME);
        };
        TeamSortView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            if (view.type_list) {
                view.type_list.dataProvider = null;
                view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            }
        };
        TeamSortView.S_NAME = "TeamSortView";
        return TeamSortView;
    }(mx.BasicView));
    mx.TeamSortView = TeamSortView;
    __reflect(TeamSortView.prototype, "mx.TeamSortView");
})(mx || (mx = {}));
//# sourceMappingURL=TeamSortView.js.map
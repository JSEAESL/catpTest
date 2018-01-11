/**
*   @author qianjun、mx
*   @date 2016.8.29
*   @desc 经验+英雄选择弹窗
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
    var ExpSelectHeroPop = (function (_super) {
        __extends(ExpSelectHeroPop, _super);
        function ExpSelectHeroPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpSelectHeroPop.mx_support = function () {
            return ["assets.expselect"];
        };
        ExpSelectHeroPop.prototype.init_view_by_type = function () {
            var cd = this.adata;
            var view = this;
            var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            var hero_data = [];
            hero_data = hproxy.heroes;
            var exp_arr = [];
            for (var key in hero_data) {
                exp_arr.push({
                    "hero_info": hero_data[key],
                    "item_id": cd.item_id,
                    "has": cd.has,
                });
            }
            view.hero_list.itemRenderer = mx.ExpSelectHeroRender;
            view.hero_list.dataProvider = new eui.ArrayCollection(exp_arr);
        };
        ExpSelectHeroPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hero_list.dataProvider = null;
        };
        ExpSelectHeroPop.S_NAME = "ExpSelectHeroPop";
        return ExpSelectHeroPop;
    }(mx.AlertView));
    mx.ExpSelectHeroPop = ExpSelectHeroPop;
    __reflect(ExpSelectHeroPop.prototype, "mx.ExpSelectHeroPop");
})(mx || (mx = {}));
//# sourceMappingURL=ExpSelectHeroPop.js.map
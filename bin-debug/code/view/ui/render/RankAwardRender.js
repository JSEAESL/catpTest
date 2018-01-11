/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 在GeneralRender的基础上，添加名字显示，在slt皮肤下而外添加选中框
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
    var RankAwardRender = (function (_super) {
        __extends(RankAwardRender, _super);
        function RankAwardRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankAwardRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.award_list.dataProvider = null;
        };
        RankAwardRender.prototype.init_render = function () {
            this.award_list.itemRenderer = mx.GNumRender;
            this.dataChanged();
        };
        RankAwardRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.rank_t.text = mx.Tools.format(mx.Lang.j0023, data.rank);
            this.award_list.dataProvider = new eui.ArrayCollection(data.arr);
        };
        return RankAwardRender;
    }(mx.BasicRender));
    mx.RankAwardRender = RankAwardRender;
    __reflect(RankAwardRender.prototype, "mx.RankAwardRender");
})(mx || (mx = {}));
//# sourceMappingURL=RankAwardRender.js.map
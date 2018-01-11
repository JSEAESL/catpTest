/**
 *   @author qianjun
 *   @date 2016.8.29
 *   @desc 魂魄获取render
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
    var ChapterItemRender = (function (_super) {
        __extends(ChapterItemRender, _super);
        function ChapterItemRender() {
            var _this = _super.call(this) || this;
            _this.height = 198;
            return _this;
        }
        ChapterItemRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.namebg.source = data.type == 1 ? 'ptzjie_png' : 'ptzjie_png';
            this.suo_p.visible = data.suo;
        };
        return ChapterItemRender;
    }(mx.BasicRender));
    mx.ChapterItemRender = ChapterItemRender;
    __reflect(ChapterItemRender.prototype, "mx.ChapterItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChapterItemRender.js.map
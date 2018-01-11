/**
 *   @author cy
 *   @date 2017.4.25
 *   @desc 家族日志render
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
    var UnionLogRender = (function (_super) {
        __extends(UnionLogRender, _super);
        function UnionLogRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionLogRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.text_list.dataProvider = null;
        };
        UnionLogRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.text_list.dataProvider = new eui.ArrayCollection(data.arr);
            this.riqi_t.text = data.date.split("-")[0] + mx.Lang.yue + data.date.split("-")[1] + mx.Lang.ri;
        };
        return UnionLogRender;
    }(mx.BasicRender));
    mx.UnionLogRender = UnionLogRender;
    __reflect(UnionLogRender.prototype, "mx.UnionLogRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionLogRender.js.map
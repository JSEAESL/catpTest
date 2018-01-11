/**
* 自定义基本佈局-無佈局
* mx@16/08/29
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
    var MXNoLayout = (function (_super) {
        __extends(MXNoLayout, _super);
        function MXNoLayout() {
            return _super.call(this) || this;
        }
        MXNoLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
        };
        MXNoLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
        };
        Object.defineProperty(MXNoLayout.prototype, "useVirtualLayout", {
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        return MXNoLayout;
    }(eui.LayoutBase));
    mx.MXNoLayout = MXNoLayout;
    __reflect(MXNoLayout.prototype, "mx.MXNoLayout");
})(mx || (mx = {}));
//# sourceMappingURL=MXNoLayout.js.map
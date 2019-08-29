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
var Widget = (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        return _super.call(this) || this;
    }
    Widget.prototype.disponse = function () {
    };
    Widget.prototype.setParent = function (parent) {
        parent.addChild(this);
        return this;
    };
    Widget.prototype.setPosition = function (px, py) {
        this.x = px;
        this.y = py;
        return this;
    };
    Widget.prototype.playGroup = function () {
    };
    Widget.prototype.update = function (timeStamp) {
    };
    return Widget;
}(eui.Component));
__reflect(Widget.prototype, "Widget");
//# sourceMappingURL=Widget.js.map
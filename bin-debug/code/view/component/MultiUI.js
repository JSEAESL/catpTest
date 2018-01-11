/**
* mx
* 通用数目可变多UI组件，用于显示英雄星星
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
    var MultiUI = (function (_super) {
        __extends(MultiUI, _super);
        function MultiUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiUI.prototype.init_multiui = function (data) {
            this.cnum = data.num;
            this.cres = data.res;
            this.ctotal = data.total || this.cnum;
            this.cstyle = data.style || "sp";
            this.gap = data.gap;
            this.align = data.align;
            this.create_multiui();
        };
        MultiUI.prototype.create_multiui = function () {
            var layout;
            switch (this.cstyle) {
                case "sp"://水平
                    layout = new eui.HorizontalLayout();
                    layout.horizontalAlign = this.align || egret.HorizontalAlign.CENTER;
                    layout.gap = this.gap || 0; //默认改为0
                    break;
                case "cz"://垂直
                    layout = new eui.VerticalLayout();
                    layout.verticalAlign = this.align || egret.VerticalAlign.MIDDLE;
                    layout.gap = this.gap || 6;
                    break;
                default:
                    break;
            }
            this.layout = layout;
            this.removeChildren();
            for (var i = 1; i <= this.ctotal; i++) {
                var res = this.cres + (i <= this.cnum ? "" : "2") + "_png";
                var ui = new eui.Image(res);
                this.addChild(ui);
            }
        };
        return MultiUI;
    }(eui.Group));
    mx.MultiUI = MultiUI;
    __reflect(MultiUI.prototype, "mx.MultiUI");
})(mx || (mx = {}));
//# sourceMappingURL=MultiUI.js.map
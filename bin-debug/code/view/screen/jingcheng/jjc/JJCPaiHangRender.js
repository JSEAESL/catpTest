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
 * @qj/17.3.13
 * 排行榜render
 */
var mx;
(function (mx) {
    var JJCPaiHangRender = (function (_super) {
        __extends(JJCPaiHangRender, _super);
        function JJCPaiHangRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCPaiHangRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (data.type == 1) {
                this.avatar.source = data.avatar;
                this.height = 80;
            }
            else {
                RES.getResByUrl(data.avatar, function (e) {
                    this.avatar.source = e;
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(0xff0000);
                    shape.graphics.drawCircle(98 + 23, 40, 29);
                    shape.graphics.endFill();
                    this.addChild(shape);
                    this.avatar.mask = shape;
                }, this, RES.ResourceItem.TYPE_IMAGE);
                this.height = 80;
            }
        };
        return JJCPaiHangRender;
    }(mx.BasicRender));
    mx.JJCPaiHangRender = JJCPaiHangRender;
    __reflect(JJCPaiHangRender.prototype, "mx.JJCPaiHangRender");
})(mx || (mx = {}));
//# sourceMappingURL=JJCPaiHangRender.js.map
/**
 *   @author wf
 *   @date 2017.2.7
 *   @desc 调戏档位render
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
    var RateRender = (function (_super) {
        __extends(RateRender, _super);
        function RateRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RateRender.prototype.init_render = function () {
            var view = this;
            view.axin.x = view.width / 2;
            view.axin.y = view.height / 2;
            view.axin.anchorOffsetX = view.width / 2;
            view.axin.anchorOffsetY = view.height / 2;
            this.dataChanged();
        };
        RateRender.prototype.on_remove = function (evt) {
            egret.Tween.removeTweens(this.axin);
        };
        RateRender.prototype.show_ani = function () {
            var view = this;
            var d = this.data;
            var isRate = d.reverse ? d.max - this.itemIndex <= d.rate : this.itemIndex < d.rate;
            if (d && isRate) {
                egret.Tween.get(view.axin, { "loop": true }).to({ "scaleX": 1.14, "scaleY": 1.14 }, 200)
                    .to({ "scaleX": 0.94, "scaleY": 0.94 }, 200).to({ "scaleX": 1.1, "scaleY": 1.1 }, 200)
                    .to({ "scaleX": 0.94, "scaleY": 0.94 }, 200).to({ "scaleX": 1, "scaleY": 1 }, 200)
                    .to({ "scaleX": 1, "scaleY": 1 }, 3000);
            }
            else {
                egret.Tween.removeTweens(view.axin);
            }
        };
        RateRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.visible = d.reverse ? d.max - this.itemIndex <= d.rate : this.itemIndex < d.rate;
            if (!this.visible) {
                egret.Tween.removeTweens(this.axin);
            }
            this.show_ani();
        };
        return RateRender;
    }(mx.BasicRender));
    mx.RateRender = RateRender;
    __reflect(RateRender.prototype, "mx.RateRender");
})(mx || (mx = {}));
//# sourceMappingURL=RateRender.js.map
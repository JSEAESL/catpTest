/**7
 *   @author mx
 *   @date 2014.12.28
 *   @desc 英雄基本render、包含背景底，头像，背景框
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
    var HeroBaseRender = (function (_super) {
        __extends(HeroBaseRender, _super);
        function HeroBaseRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroBaseRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var qlv = Number(data.quality);
            this.hero_bgk.source = "herobg" + qlv + "_png";
            this.hero_tx.source = mx.Tools.get_mn_res(data.mid, "monstx");
            if (mx.AppConfig.GameTag != "WX") {
                var shape = new egret.Shape();
                shape.graphics.beginFill(0xff0000);
                shape.graphics.drawCircle(24, 24, 24);
                shape.graphics.drawCircle(96, 24, 24);
                shape.graphics.drawCircle(24, 96, 24);
                shape.graphics.drawCircle(96, 96, 24);
                shape.graphics.drawRect(24, 0, 72, 120);
                shape.graphics.drawRect(0, 24, 120, 72);
                shape.graphics.endFill();
                this.addChild(shape);
                this.hero_tx.mask = shape;
            }
            var cdj = 1;
            if (qlv) {
                var pj = [2, 4, 7, 12, 15, 99];
                for (var i = 0; i < 5; i++) {
                    if (qlv < pj[i]) {
                        cdj = i + 1;
                        break;
                    }
                }
            }
            else {
                cdj = 0;
                mx.Tools.mx_grayfy(this);
            }
            this.hero_bg.source = "herobg-" + cdj + "_png";
            if (data.hui) {
                mx.Tools.mx_grayfy(this);
            }
            if (data.chicun) {
                this.scaleX = this.scaleY = data.chicun / this.width;
            }
            this.slt.visible = false;
            if (data.fate_slt) {
                this.slt.visible = true;
            }
        };
        return HeroBaseRender;
    }(mx.BasicRender));
    mx.HeroBaseRender = HeroBaseRender;
    __reflect(HeroBaseRender.prototype, "mx.HeroBaseRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeroBaseRender.js.map
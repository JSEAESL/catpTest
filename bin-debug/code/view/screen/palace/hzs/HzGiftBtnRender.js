/**
 *   @author wf
 *   @date 2016.10.10
 *   @desc 皇子结缘礼盒按钮render
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
    var HzGiftBtnRender = (function (_super) {
        __extends(HzGiftBtnRender, _super);
        function HzGiftBtnRender() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
            // this.skinName = "ui/HzGiftBtnRenderSkin.exml";
        }
        HzGiftBtnRender.prototype.createCompleteEvent = function (e) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.dataChanged();
        };
        HzGiftBtnRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.bg.set_ssres("pli_btn_png");
            this.name_p.source = "pli_" + d.id + "_png";
            if (d.index == 0) {
                this.bg.set_ssres("zgpldchen_png");
                this.name_p.source = "zgpli_" + d.id + "_png";
            }
        };
        return HzGiftBtnRender;
    }(mx.BasicRender));
    mx.HzGiftBtnRender = HzGiftBtnRender;
    __reflect(HzGiftBtnRender.prototype, "mx.HzGiftBtnRender");
})(mx || (mx = {}));
//# sourceMappingURL=HzGiftBtnRender.js.map
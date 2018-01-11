/**
* qianjun 2016.9.20
* 换装界面  dingyunfeng
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
    var HuanZhuangScreen = (function (_super) {
        __extends(HuanZhuangScreen, _super);
        function HuanZhuangScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HuanZhuangScreen.mx_support = function () {
            return ['assets.zs_suit', "api.HZTASK", "data.1601"];
        };
        HuanZhuangScreen.prototype.init_view = function () {
            var view = this;
            view.btn_list.itemRenderer = mx.SSButtonRender;
            view.item_list.itemRenderer = mx.ClothesRender;
            this.xx_ui.set_scale(0.8);
            this.hide_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HuanZhuangScreenMediator(this));
        };
        HuanZhuangScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.end_tween();
            this.bj_ui.on_remove();
            this.xx_ui.on_remove();
            this.hide_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HuanZhuangScreenMediator.NAME);
        };
        HuanZhuangScreen.prototype.tap_click = function (evt) {
            switch (evt.currentTarget) {
                case this.hide_b:
                    if (this.clothes_g.right >= -100) {
                        egret.Tween.get(this.xx_ui).to({ "horizontalCenter": -75 }, 350).to({ "horizontalCenter": 0, "alpha": 1 }, 250);
                        egret.Tween.get(this.clothes_g).to({ "right": -408 }, 600).call(this.end_tween, this);
                    }
                    else {
                        egret.Tween.get(this.xx_ui).to({ "horizontalCenter": -75 }, 350).to({ "horizontalCenter": -150, "alpha": 1 }, 250);
                        egret.Tween.get(this.clothes_g).to({ "right": -40 }, 600).call(this.end_tween, this);
                    }
                    this.hide_b.touchEnabled = false;
                    break;
            }
        };
        HuanZhuangScreen.prototype.end_tween = function () {
            egret.Tween.removeTweens(this.clothes_g);
            egret.Tween.removeTweens(this.xx_ui);
            if (this.clothes_g.right >= -100) {
                this.hide_b.set_ssres("fz_sjaniu_png");
            }
            else {
                this.hide_b.set_ssres("fz_zkaniu_png");
            }
            this.hide_b.touchEnabled = true;
        };
        HuanZhuangScreen.S_NAME = "HuanZhuangScreen";
        return HuanZhuangScreen;
    }(mx.BasicView));
    mx.HuanZhuangScreen = HuanZhuangScreen;
    __reflect(HuanZhuangScreen.prototype, "mx.HuanZhuangScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HuanZhuangScreen.js.map
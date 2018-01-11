/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 侍从礼包中的图标，包括品质、星级、“力敏智”
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
    var HeroGiftRender = (function (_super) {
        __extends(HeroGiftRender, _super);
        function HeroGiftRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroGiftRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        HeroGiftRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var chicun_temp = data.chicun;
            data.chicun = 0;
            this.hero.data = data;
            var param = {
                'num': data.star,
                'res': "pinzhixing",
            };
            this.hero_xingji.init_multiui(param);
            this.hero_type.visible = true;
            if (!data.htype) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid);
                data.htype = api.HeroType;
            }
            switch (data.htype) {
                case "STRENGTH"://攻击
                    this.hero_type.source = "li_png";
                    break;
                case "AGILITY"://守御
                    this.hero_type.source = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    this.hero_type.source = "zhi_png";
                    break;
                default:
                    break;
            }
            //类型可以不显示
            if (data.notype) {
                this.hero_type.visible = false;
                return;
            }
            if (chicun_temp) {
                this.scaleX = this.scaleY = chicun_temp / this.width;
            }
        };
        HeroGiftRender.prototype.btn_click = function (evt) {
            var data = this.data;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CHECK_HERO_INFO, data.mid);
        };
        return HeroGiftRender;
    }(mx.BasicRender));
    mx.HeroGiftRender = HeroGiftRender;
    __reflect(HeroGiftRender.prototype, "mx.HeroGiftRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeroGiftRender.js.map
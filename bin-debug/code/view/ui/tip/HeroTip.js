/**
*   @author mx
*   @date 2015.1.3
*   @副本英雄tip提示
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
    var HeroTip = (function (_super) {
        __extends(HeroTip, _super);
        function HeroTip(cd) {
            return _super.call(this, cd) || this;
        }
        HeroTip.prototype.pre_init = function () {
            this.percentHeight = 100;
            this.init_view();
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var data = this.adata;
            data.tip_w = this.tip_g.width;
            data.tip_h = this.tip_g.height;
            var p = mx.Tools.locate_tip(data);
            this.tip_g.x = p.x;
            if (p.x == 0) {
                this.tip_g.horizontalCenter = 0;
            }
            this.tip_g.y = p.y;
        };
        HeroTip.prototype.init_view = function () {
            var cd = this.adata.args;
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
            this.desc_t.text = hero.Description || "";
            var qlv = Number(cd.quality);
            if (cd.tab == "monstx") {
                var res = mx.Tools.get_mn_res(cd.mid, "monstx");
                this.Hero.data = {
                    "mid": cd.mid,
                    "chicun": 45,
                    "tab": "monstx",
                    "quality": qlv
                };
            }
            else {
                this.Hero.data = {
                    "mid": cd.mid,
                    "type": 7,
                    "chicun": 45,
                    "quality": qlv
                };
            }
            var arr = [{ "text": hero.hero_name + " " }];
            if (qlv > 1) {
                var pj = [2, 4, 7, 12, 15, 99];
                var cl = [0x5fc217, 0x14b4fc, 0xce56ee, 0xfc7704, 0xf1211e];
                for (var i = 0; i < 5; i++) {
                    if (qlv == pj[i]) {
                        break;
                    }
                    else if (qlv < pj[i + 1]) {
                        arr.push({
                            "text": "+" + (qlv - pj[i]),
                            "textColor": cl[i],
                        });
                        break;
                    }
                }
            }
            this.name_t.textFlow = arr;
            var arr2 = [{ "text": mx.Tools.format(mx.Lang.bh001, cd.lv) + " " }];
            if (cd.boss) {
                arr2.push({
                    "text": mx.Lang.bh002, "style": { "textColor": 0xfb672d }
                });
            }
            this.atr_t.textFlow = arr2;
        };
        HeroTip.prototype.btn_click = function (e) {
            this.on_remove();
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.REMOVE_UI);
        };
        HeroTip.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        return HeroTip;
    }(mx.BasicView));
    mx.HeroTip = HeroTip;
    __reflect(HeroTip.prototype, "mx.HeroTip");
})(mx || (mx = {}));
//# sourceMappingURL=HeroTip.js.map
/**
* @cy/2016.8.29
* 英雄编队renderer
*/
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
    var HeroQueueRender = (function (_super) {
        __extends(HeroQueueRender, _super);
        function HeroQueueRender() {
            var _this = _super.call(this) || this;
            _this.height = Math.min(400, mx.Tools.screen_height - 440);
            return _this;
        }
        HeroQueueRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.select_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.render_click, this);
        };
        HeroQueueRender.prototype.init_render = function () {
            this.clv_t.text = mx.Tools.format(mx.Lang.bh001, "");
            this.select_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.render_click, this);
            this.dataChanged();
        };
        HeroQueueRender.prototype.dataChanged = function () {
            var cdata = this.data;
            if (!cdata || !this.skin) {
                return;
            }
            var str;
            switch (this.itemIndex) {
                case 0:
                    str = "zwwy_png";
                    break;
                case 1:
                    str = "zwsi_png";
                    break;
                case 2:
                    str = "zwsan_png";
                    break;
                case 3:
                    str = "zwer_png";
                    break;
                case 4:
                    str = "zwyi_png";
                    break;
            }
            this.zhanwei_id.source = str;
            var c_d = Number(this.data.mid);
            if (c_d != 0) {
                this.hero_p.source = mx.Tools.get_mn_res(c_d, "dh");
                this.hero_p.visible = true;
                var facade = mx.ApplicationFacade.getInstance();
                var proxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                var heroes = proxy.heroes;
                var lv = void 0, k = void 0;
                for (k in heroes) {
                    if (Number(heroes[k].mid) == c_d) {
                        lv = heroes[k].level;
                        break;
                    }
                }
                var param = {
                    'num': heroes[k].star,
                    'res': "pinzhixing",
                    'gap': (140 - mx.MX_COMMON.HP_LEVEL * 21) / (mx.MX_COMMON.HP_LEVEL - 1),
                    'align': egret.HorizontalAlign.LEFT
                };
                this.hero_xingji.init_multiui(param);
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", c_d);
                switch (api.HeroType) {
                    case "STRENGTH"://攻击
                        this.htype.source = "li_png";
                        break;
                    case "AGILITY"://守御
                        this.htype.source = "min_png";
                        break;
                    case "INTELLIGENCE"://辅助
                        this.htype.source = "zhi_png";
                        break;
                    default:
                        break;
                }
                //品质相关
                var quality = Number(this.data.quality);
                var color = mx.Tools.cal_quality_cor(quality);
                var bg = 1;
                if (quality == 1) {
                    bg = 1;
                }
                else if (quality < 4) {
                    bg = 2;
                }
                else if (quality < 7) {
                    bg = 3;
                }
                else if (quality < 12) {
                    bg = 4;
                }
                else {
                    bg = 5;
                } //黄：efc504  红：ff4b4b 
                this.pinzhi_bg.source = "bdpz" + bg + "_png";
                this.name_t.textColor = color;
                this.name_t.text = api.hero_name + mx.Lang.j0024[quality - 1];
                this.lv_t.text = "" + lv; //读hero数据
                this.lv_g.visible = true;
                this.select_b.set_ssres("bdsren_png");
                this.di_p.visible = this.fgxian_p.visible = true;
            }
            else {
                this.hero_p.source = "mryzi_png";
                this.lv_g.visible = false;
                this.select_b.set_ssres("bdjren_png");
                this.di_p.visible = this.fgxian_p.visible = false;
            }
            var b0 = Math.max(740 - mx.Tools.screen_height, 0) + 26;
            this.lv_g.bottom = 0;
            this.select_b.bottom = 1.5 * (b0 + 55 + 36);
            this.zhanwei_id.bottom = 1.5 * (b0 + 55 + 36 + 28 + 8);
        };
        HeroQueueRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.data.mid != 0) {
                facade.sendNotification(mx.MX_NOTICE.XZHEN_QUEHERO, this.data.id);
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.XZHEN_QUEHERO, -1);
            }
        };
        HeroQueueRender.prototype.render_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.data.mid != 0) {
                mx.HeroTrainScreen.P_NAME = mx.TeamScreen.S_NAME;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CHERO_INFO,
                    "id": this.data.id,
                });
            }
        };
        return HeroQueueRender;
    }(mx.BasicRender));
    mx.HeroQueueRender = HeroQueueRender;
    __reflect(HeroQueueRender.prototype, "mx.HeroQueueRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeroQueueRender.js.map
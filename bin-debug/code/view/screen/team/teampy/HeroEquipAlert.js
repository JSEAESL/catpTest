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
 * @cy/2016.9.5
 *  装备alert
 */
var mx;
(function (mx) {
    var HeroEquipAlert = (function (_super) {
        __extends(HeroEquipAlert, _super);
        function HeroEquipAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroEquipAlert.mx_support = function () {
            return ["assets.heroequip"];
        };
        HeroEquipAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_zb_zb":
                    tar = this.queding_b;
                    break;
            }
            return tar;
        };
        HeroEquipAlert.prototype.init_view = function () {
            var view = this;
            view.queding_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_pop();
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                view.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            }
        };
        HeroEquipAlert.prototype.mx_test2 = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HeroEquipAlert.prototype.fresh_pop = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var Pproxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var str = mx.Tools.format(mx.Lang.h0037, Pproxy.get_item_num(this.adata.id));
            this.num_t.text = str;
            this.item.data = { "id": this.adata.id, "type": 4, "no_tip": true };
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", this.adata.id);
            this.set_shuxing(api);
            this.name_t.text = api.name;
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var chero = Hproxy.get_chero_info();
            var mnlv = Number(chero.level);
            var zblv = Number(api.LevelRequirement);
            var ctype = this.adata.etype;
            if (data) {
                ctype = mnlv >= zblv ? 2 : 5;
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeroZBAlert.S_NAME
                });
            }
            switch (ctype) {
                case 0://已装备
                    this.queding_b.set_ssres("qdanlan_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0038 + zblv, "style": { "textColor": 0x6bb011 } }
                    ];
                    break;
                case 1://无装备，该装备可合成，但不满足合成条件
                    this.queding_b.set_ssres("hcgsaniu_png");
                    if (mnlv >= zblv) {
                        this.shuoming_t.textFlow = [
                            { "text": mx.Lang.h0039, "style": { "textColor": 0x6bb011 } }
                        ];
                    }
                    else {
                        this.shuoming_t.textFlow = [
                            { "text": mx.Lang.h0038 + zblv, "style": { "textColor": 0xf84345 } }
                        ];
                    }
                    break;
                case 2://可装备
                    this.queding_b.set_ssres("zbaniu_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0039, "style": { "textColor": 0x6bb011 } }
                    ];
                    break;
                case 3://无装备，该装备可合成，满足合成条件
                    this.queding_b.set_ssres("hcgsaniu_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0039, "style": { "textColor": 0x6bb011 } }
                    ];
                    break;
                case 4://无装备，该装备不可合成
                    this.queding_b.set_ssres("hqtjanlan_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0039, "style": { "textColor": 0x6bb011 } }
                    ];
                    break;
                case 5://等级不足，可合成
                    this.queding_b.set_ssres("hcgsaniu_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0038 + zblv, "style": { "textColor": 0xf84345 } }
                    ];
                    break;
                case 6://等级不足，不可合成
                    this.queding_b.set_ssres("hqtjanlan_png");
                    this.shuoming_t.textFlow = [
                        { "text": mx.Lang.h0038 + zblv, "style": { "textColor": 0xf84345 } }
                    ];
                    break;
            }
        };
        HeroEquipAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.queding_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        HeroEquipAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_hero = Hproxy.get_chero_info();
            switch (evt.currentTarget) {
                case view.queding_b:
                    switch (this.adata.etype) {
                        case 0://已装备
                            break;
                        case 1: //可合成，但不满足条件
                        case 3: //可合成。且能合成
                        case 5://可合成，等级不足
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.EquipHechengAlert.S_NAME, "param": this.adata.id
                            });
                            break;
                        case 2://可装备
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_HERO_EQUIP, "id": c_hero.id, "equip": this.adata.id
                            });
                            break;
                        case 4: //不可合成，显示获取途径，需求数量为1，设置需求数目1
                        case 6://不可合成，等级不足
                            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                            fproxy.set_sd_tar_info(this.adata.id, 1);
                            break;
                    }
                    break;
                case view.bg_rect:
                case view.close_b:
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroEquipAlert.S_NAME);
        };
        HeroEquipAlert.prototype.set_shuxing = function (api) {
            var shuxing = [
                "AD", "AGI", "AP", "ARM", "ARMP", "CDR", "CRIT", "DODG", "HEAL", "HIT", "HP", "HPS",
                "INT", "LFS", "MCRIT", "MP", "MPS", "MR", "MRI", "SILR", "SKL", "STR"
            ];
            var str = [];
            for (var k in shuxing) {
                var c_num = api[shuxing[k]];
                if (c_num > 0) {
                    if (shuxing[k] == "HEAL") {
                        c_num = c_num + "%";
                    }
                    str.push({ "text": mx.Lang.zbsx1[k] + "  ", "style": { "textColor": 0x7054A0 } }, { "text": c_num, "style": { "textColor": 0x918f8e, "bold": true } }, { "text": "\n", "style": { "textColor": 0x6bb011, "bold": true } } //附魔属性
                    );
                }
            }
            this.miaoshu_t.textFlow = str;
        };
        HeroEquipAlert.S_NAME = "HeroEquipAlert";
        return HeroEquipAlert;
    }(mx.BasicView));
    mx.HeroEquipAlert = HeroEquipAlert;
    __reflect(HeroEquipAlert.prototype, "mx.HeroEquipAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroEquipAlert.js.map
/**
*   @author cy、mx
*   @date 2016.10.8
*   @desc vip特权彈窗
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
    var VipUI = (function (_super) {
        __extends(VipUI, _super);
        function VipUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VipUI.prototype.pre_init = function () {
            this.fresh_pop();
        };
        VipUI.prototype.set_data = function (data) {
            this.adata = data;
            this.fresh_pop();
        };
        VipUI.prototype.fresh_pop = function () {
            if (typeof this.adata == "undefined" || !this.skin) {
                return;
            }
            if (this.adata > 15 || this.adata < 1) {
                this.visible = false;
                return;
            }
            this.visible = true;
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.VIP);
            this.sm_t.text = '· ' + mx.Tools.format(mx.Lang.r0006, Number(api[this.adata].Recharge), this.adata);
            this.libao_t.text = mx.Tools.format(mx.Lang.bh000, this.adata);
            var key = [
                "DiamondWorship",
                "SkillUpgradeCDReset",
                "MultipleMidas",
                "CrusadeMoneyBonus",
                "RaidGoldBonus",
                "RaidTodolistCoinBonus",
                "Midas",
                "FreeRaid",
                "RaidWithDiamond",
                "MagicSoulBox",
                "PVPCDReset",
                "MaxSkillPoints",
                "CrusadeChestBonusValid",
                "WorshipTimes",
                "GuildHeroDispatchLimit",
                "RaidTenFunction",
                "ItemOne-Click-Upgrade",
                "EliteReset",
                "PVPBuy",
                "BuyVitMax",
                "lvtoupai",
                "LotteryCDReset",
                "Feizi_limit",
            ];
            var arr = [];
            if (this.adata > 1) {
                arr.push('· ' + mx.Tools.format(mx.Lang.r0010, this.adata - 1));
            }
            for (var k in key) {
                var c_key_n = Number(api[this.adata][key[k]]);
                var c_key = key[k];
                var bool1 = c_key_n > 0;
                var str = "";
                if (c_key_n == 1 && this.adata > 0 && Number(api[this.adata - 1][c_key]) == 0) {
                    if (this.adata == 2 && c_key == "SkillUpgradeCDReset" || c_key == "MultipleMidas") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 2 && c_key == "EliteReset") {
                        str = mx.Lang.r0011 + mx.Lang.r0009;
                    }
                    else if (this.adata == 3 && c_key == "PVPCDReset") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 4 && c_key == "RaidTenFunction") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 6 && c_key == "RaidTodolistCoinBonus") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 7 && c_key == "ItemOne-Click-Upgrade") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 8 && c_key == "LotteryCDReset") {
                        str = mx.Lang.r0007[k];
                    }
                    else if (this.adata == 9 && c_key == "DiamondWorship") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 10 && c_key == "MagicSoulBox") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else if (this.adata == 13 && c_key == "CrusadeChestBonusValid") {
                        str = mx.Lang.r0007[k] + mx.Lang.r0009;
                    }
                    else {
                        str = mx.Tools.format(mx.Lang.r0007[k], 1);
                    }
                }
                else if (bool1 && this.adata == 0) {
                    str = mx.Tools.format(mx.Lang.r0007[k], c_key_n);
                }
                else if (bool1 && this.adata > 0 && Number(api[this.adata - 1][c_key]) != c_key_n) {
                    str = mx.Tools.format(mx.Lang.r0007[k], c_key_n);
                }
                if (str != "") {
                    str = '· ' + str;
                    arr.push(str);
                }
            }
            this.tequan_list.dataProvider = new eui.ArrayCollection(arr);
            this.tequan_scro.touchEnabled = false;
            this.tequan_scro.touchChildren = false;
            this.taozhuang_p.touchEnabled = true;
            var libao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIPLIBAO, "id", this.adata);
            if (!libao_api || libao_api.reward1 == "0") {
                this.taozhuang_g.width = 0;
                this.tzname_g.visible = false;
                this.taozhuang_p.visible = false;
            }
            if (libao_api) {
                if (!(libao_api.reward1 == "0")) {
                    this.taozhuang_p.visible = true;
                    switch (this.adata) {
                        case 1:
                        case 4:
                        case 7:
                        case 10:
                        case 13:
                        case 15:
                            if (this.adata == 13 || this.adata == 15) {
                                this.taozhuang_p.scaleX = this.taozhuang_p.scaleY = 0.4;
                                this.taozhuang_p.bottom = 165;
                                this.taozhuang_p.right = 180;
                            }
                            else {
                                this.taozhuang_p.scaleX = this.taozhuang_p.scaleY = 0.45;
                                this.taozhuang_p.bottom = 130;
                                this.taozhuang_p.right = 160;
                                if (this.adata == 7) {
                                    this.taozhuang_p.right = 138;
                                }
                            }
                            this.taozhuang_p.source = "viptz" + this.adata + "_png";
                            this.tzname_p.source = "tzname" + this.adata + "_png";
                            break;
                    }
                    this.taozhuang_g.width = 470;
                    this.tzname_g.visible = true;
                }
                this.yuanbao_t.text = "x" + libao_api.reward2;
                this.yinbi_t.text = "x" + libao_api.reward3;
            }
        };
        VipUI.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.tequan_list.dataProvider = null;
        };
        return VipUI;
    }(mx.BasicUI));
    mx.VipUI = VipUI;
    __reflect(VipUI.prototype, "mx.VipUI");
})(mx || (mx = {}));
//# sourceMappingURL=VipUI.js.map
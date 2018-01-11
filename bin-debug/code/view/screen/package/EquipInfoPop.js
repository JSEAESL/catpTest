/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 装备详细属性弹窗
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
    var EquipInfoPop = (function (_super) {
        __extends(EquipInfoPop, _super);
        function EquipInfoPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EquipInfoPop.mx_support = function () {
            return ["assets.equip_info"];
        };
        EquipInfoPop.prototype.init_view_by_type = function () {
            this.title.text = mx.Lang.zbsx;
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ok_click, this);
            var cd = this.adata;
            var size = 24;
            var font = mx.MX_COMMON.DFT_FONT;
            var str = [];
            var t;
            //物品信息
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            this.equip.data = {
                "id": cd.item_id,
                "type": 4,
                "notip": true,
                "chicun": 90
            };
            this.equip_name_t.text = item.name;
            //字段
            var arr = [
                "AD", "AGI", "AP", "ARM", "ARMP", "CDR", "CRIT", "DODG", "HEAL", "HIT",
                "HP", "HPS", "INT", "LFS", "MCRIT", "MP", "MPS", "MR", "MRI", "SIL",
                "SKILL", "STR"
            ];
            //字段对应
            var c_arr = mx.Lang.zbsx1;
            //详细属性
            for (var key in arr) {
                t = arr[key];
                var v = parseFloat(item[t]);
                if (v) {
                    var str2 = v;
                    if (t == "HEAL") {
                        str2 += "%";
                    }
                    str.push({ text: c_arr[key], style: { "size": size, "textColor": 0x7054A0, "fontFamily": font } }, { text: "  " + str2 + "\n", style: { "size": size, "textColor": 0x7054A0, "fontFamily": font } });
                }
            }
            this.shuxing_t.textFlow = str;
            item = null;
        };
        EquipInfoPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ok_click, this);
        };
        EquipInfoPop.prototype.ok_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            fproxy.set_sd_tar_info(cd.item_id);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, EquipInfoPop.S_NAME);
        };
        EquipInfoPop.S_NAME = "EquipInfoPop";
        return EquipInfoPop;
    }(mx.AlertView));
    mx.EquipInfoPop = EquipInfoPop;
    __reflect(EquipInfoPop.prototype, "mx.EquipInfoPop");
})(mx || (mx = {}));
//# sourceMappingURL=EquipInfoPop.js.map
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
 * @cy/2016.9.6
 *  装备合成alert
 */
var mx;
(function (mx) {
    var EquipHechengAlert = (function (_super) {
        __extends(EquipHechengAlert, _super);
        function EquipHechengAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EquipHechengAlert.mx_support = function () {
            return ["assets.heroequip"];
        };
        EquipHechengAlert.prototype.init_view = function () {
            var view = this;
            view.hecheng_b.set_ssres("hcaniu_png");
            view.back_b.set_ssres("tyclose_png");
            view.tree_list = [this.adata];
            view.hecheng_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hechengshu_list.itemRenderer = mx.GeneralRender;
            view.hechengshu_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_cview();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.EquipHchMediator(this));
        };
        EquipHechengAlert.prototype.fresh_cview = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            this.hengxian1_p.visible = false;
            this.hengxian2_p.visible = false;
            if (data) {
                this.tree_list.pop();
            }
            if (!this.tree_list.length) {
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, EquipHechengAlert.S_NAME);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeroZBAlert.S_NAME,
                    "param": "hch",
                });
                return;
            }
            var c_item = this.tree_list[this.tree_list.length - 1];
            var arr2 = [];
            var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", String(c_item));
            var proxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            if (!zb) {
                this.tree_list.pop();
                var prev = this.tree_list[this.tree_list.length - 1];
                var need = 0;
                var papi = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", prev);
                for (var i = 1; i <= 4; i++) {
                    var component = papi["Component" + i];
                    if (component == c_item) {
                        need = Number(papi["Component" + i + "Count"]);
                        break;
                    }
                }
                var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                fproxy.set_sd_tar_info(c_item, need);
            }
            else {
                this.item_t.text = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", c_item).name;
                this.item.data = { "id": c_item, "type": 4, "no_tip": true };
                for (var i = 1; i <= 4; i++) {
                    var component = Number(zb["Component" + i]);
                    if (component == 0) {
                        continue;
                    }
                    var num = Number(zb["Component" + i + "Count"]) || 1;
                    var have = proxy.get_item_num(component);
                    var txt = have + "/" + num;
                    var textcolor = have >= num ? 0x00ff00 : 0xff0000;
                    var font = have < num ? "publicred_fnt" : "public_fnt";
                    arr2.push({
                        "id": component,
                        "num": txt,
                        "type": 4,
                        "no_tip": true,
                        "textcolor": textcolor,
                        "fnt": font
                    });
                }
                this.cost_t.text = "" + proxy.cal_hecheng_cost([{ "id": c_item, "num": 1 }], 0);
                this.hechengshu_list.dataProvider = new eui.ArrayCollection(arr2);
                if (arr2.length == 1) {
                    this.hengxian_p.width = 0;
                    this.shuxian_p.height = 43;
                }
                if (arr2.length == 2) {
                    this.hengxian_p.width = 90;
                    this.shuxian_p.height = 47;
                    this.hengxian_p.horizontalCenter = 0;
                }
                if (arr2.length == 3) {
                    this.shuxian_p.height = 43;
                    this.hengxian1_p.visible = true;
                    this.hengxian1_p.horizontalCenter = 54;
                    this.hengxian_p.horizontalCenter = -54;
                }
                if (arr2.length == 4) {
                    this.shuxian_p.height = 47;
                    this.hengxian1_p.horizontalCenter = 62;
                    this.hengxian2_p.horizontalCenter = -62;
                    this.hengxian1_p.visible = true;
                    this.hengxian2_p.visible = true;
                }
                this.jiedian_list.dataProvider = new eui.ArrayCollection(arr2);
            }
        };
        EquipHechengAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hecheng_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hechengshu_list.dataProvider = null;
            this.hechengshu_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.EquipHchMediator.NAME);
        };
        EquipHechengAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.bg_rect:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, EquipHechengAlert.S_NAME);
                    break;
                case view.hecheng_b:
                    var pproxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                    pproxy.equip_hecheng_scene = "EquipHechengAlert";
                    var c_item = this.tree_list[this.tree_list.length - 1];
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PACK_EQUIP_HECHENG, "id": c_item
                    });
                    break;
                case view.back_b:
                    if (this.tree_list.length > 1) {
                        this.tree_list.pop();
                        this.fresh_cview();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, EquipHechengAlert.S_NAME);
                    }
                    break;
            }
        };
        EquipHechengAlert.prototype.onTabChange = function (e) {
            switch (e.currentTarget) {
                case this.hechengshu_list:
                    var c_item = this.tree_list[this.tree_list.length - 1];
                    var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", String(c_item));
                    if (zb) {
                        this.tree_list.push(e.item.id);
                    }
                    this.fresh_cview();
                    break;
            }
        };
        EquipHechengAlert.S_NAME = "EquipHechengAlert";
        return EquipHechengAlert;
    }(mx.BasicView));
    mx.EquipHechengAlert = EquipHechengAlert;
    __reflect(EquipHechengAlert.prototype, "mx.EquipHechengAlert");
})(mx || (mx = {}));
//# sourceMappingURL=EquipHechengAlert.js.map
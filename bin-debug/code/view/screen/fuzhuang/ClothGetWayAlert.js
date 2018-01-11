/**
*   @author cy
*   @date 2017.4.10
*   @desc 服装获得途径弹窗
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
    var ClothGetWayAlert = (function (_super) {
        __extends(ClothGetWayAlert, _super);
        function ClothGetWayAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClothGetWayAlert.mx_support = function () {
            return ["assets.zs_getway"];
        };
        ClothGetWayAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata.item_id;
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var num = pProxy.get_item_num(cd);
            this.num_t.text = mx.Lang.num + "：" + num;
            var api;
            api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd);
            this.name_t.text = api.name;
            this.tar.data = {
                "id": cd,
                "type": 4,
                "notip": true,
                "chicun": 90
            };
            this.way_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.way_click, this);
            var arr;
            if (this.adata.type == "liandan") {
                arr = [{ "bg": "ycsdgmai_png" }];
                if (cd >= 3043 && cd <= 3046) {
                    arr.push({ "bg": "jyjqdluo_png" });
                }
            }
            else if (this.adata.type == "hougonguplevel") {
                arr = [
                    { "bg": "xq_png" },
                    { "bg": "tjjylhe_png" },
                    { "bg": "yjpc_png" },
                    { "bg": "jfssshen_png" }
                ];
            }
            else if (this.adata.type == "fuzhuang") {
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPOBTAIN, "id", cd);
                var way = String(api.path3).split("|");
                arr = [];
                if (way.indexOf("5") >= 0 || way.indexOf("1") >= 0) {
                    arr.push({ "bg": "scgm_png" });
                }
                if (way.indexOf("7") >= 0) {
                    arr.push({ "bg": "yjpc_png" });
                }
                if (way.indexOf("8") >= 0) {
                    arr.push({ "bg": "jfssshen_png" });
                }
                if (way.indexOf("3") >= 0 || way.indexOf("4") >= 0) {
                    arr.push({ "bg": "xq_png" });
                }
            }
            this.way_list.itemRenderer = mx.SSButtonRender;
            this.way_list.dataProvider = new eui.ArrayCollection(arr);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        ClothGetWayAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.way_list.dataProvider = null;
            this.way_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.way_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
        };
        ClothGetWayAlert.prototype.way_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.item.bg) {
                case "scgm_png"://购买
                    var a_d = {
                        "param": {
                            "item": this.adata.item_id,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ClothGetWayAlert.S_NAME);
                    break;
                case "yjpc_png": //乐妓捧场
                case "jfssshen_png"://教坊司赎身
                    var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    wproxy.jfs_tab = 0;
                    switch (this.adata.type) {
                        case "fuzhuang":
                            mx.JFSSYScreen.P_NAME = mx.HuanZhuangScreen.S_NAME;
                            break;
                        case "hougonguplevel":
                            mx.JFSSYScreen.P_NAME = mx.PalaceScreen.S_NAME;
                            break;
                        default:
                            mx.JFSSYScreen.P_NAME = null;
                            break;
                    }
                    var net = [{
                            "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                        }, {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.JFSSYScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case "ycsdgmai_png"://药材商店
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_TEGONG_SHOP, "act_id": 20 });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ClothGetWayAlert.S_NAME);
                    break;
                case "jyjqdluo_png"://精英剧情（3-7）
                    var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.set_stage_type(2);
                    fProxy.set_stage_id(0);
                    fProxy.cur_stage = 0;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.FubenScreen.S_NAME);
                    break;
                case "tjjylhe_png"://结缘礼盒
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fz037 });
                    break;
            }
        };
        ClothGetWayAlert.S_NAME = "ClothGetWayAlert";
        return ClothGetWayAlert;
    }(mx.AlertView));
    mx.ClothGetWayAlert = ClothGetWayAlert;
    __reflect(ClothGetWayAlert.prototype, "mx.ClothGetWayAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ClothGetWayAlert.js.map
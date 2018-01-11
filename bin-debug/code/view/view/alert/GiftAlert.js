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
*   @author mx
*   @date 2015.1.3
*   @desc 通用奖励弹窗
**/
var mx;
(function (mx) {
    var GiftAlert = (function (_super) {
        __extends(GiftAlert, _super);
        function GiftAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GiftAlert.mx_support = function () {
            return ["assets.gift", "api.ITEMAWARDS", "api.EQUIP"];
        };
        GiftAlert.prototype.init_view_by_type = function () {
            var data = this.adata || {};
            var gifts = mx.ApiTool.getAPINodes(mx.MX_APINAME.ITEMAWARDS, "item", data);
            var sourceArr = [];
            for (var k in gifts) {
                var type = gifts[k].a_type;
                var id0 = gifts[k].id;
                var id = gifts[k].a_id;
                var num = gifts[k].num;
                var info = void 0;
                var equip_id = void 0; //用于查询已拥有的数量
                var name_1;
                if (type == 4) {
                    this.tip_t.text = mx.Lang.p0122;
                    info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", id);
                    equip_id = id;
                }
                else if (type == 7) {
                    this.tip_t.text = mx.Lang.p0125;
                    info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", id);
                    equip_id = info.equip_id;
                }
                var owned = 0;
                var pProxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
                owned = pProxy.get_item_num(equip_id);
                var need = 0;
                //类型为（碎片|魂石）的道具
                if (type == 4 && (info.Category == 4 || info.Category == 6)) {
                    for (var i = 1; i <= 4; i++) {
                        var craft = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "Component" + i, equip_id);
                        if (craft) {
                            var str = "Component" + i + "Count";
                            need = craft[str];
                            break;
                        }
                    }
                }
                sourceArr.push({
                    "gift_id": data,
                    "id0": id0,
                    "type": type,
                    "id": id,
                    "num": num,
                    "info": info,
                    "owned": owned,
                    "need": need,
                });
            }
            this.gift_list.dataProvider = new eui.ArrayCollection(sourceArr);
            this.gift_list.itemRenderer = mx.GiftAlertRender;
        };
        GiftAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.gift_list.dataProvider = null;
        };
        GiftAlert.S_NAME = "GiftAlert";
        return GiftAlert;
    }(mx.AlertView));
    mx.GiftAlert = GiftAlert;
    __reflect(GiftAlert.prototype, "mx.GiftAlert");
})(mx || (mx = {}));
//# sourceMappingURL=GiftAlert.js.map
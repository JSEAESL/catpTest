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
 * @mx/2017.05.11
 * 储秀宫技能筛选
 */
var mx;
(function (mx) {
    var CxgSelectAlert = (function (_super) {
        __extends(CxgSelectAlert, _super);
        function CxgSelectAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CxgSelectAlert.mx_support = function () {
            return ["assets.cxg_select", "api.ZINVSKILL"];
        };
        CxgSelectAlert.prototype.init_view_by_type = function () {
            var c_index = 1;
            var tar_id = this.adata;
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.ZINVSKILL);
            var length = apis.length;
            var arr = [];
            for (var i = 1; i <= length; i++) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", i);
                arr.push({
                    "id": api.id,
                    "sid": i,
                    "sname": api.name,
                    "desc": api.desc
                });
                if (tar_id && api.id == tar_id) {
                    c_index = i;
                }
            }
            arr.unshift({
                "id": 0,
                "sid": 0,
                "sname": mx.Lang.cxg017,
                "desc": ""
            });
            this.jn_list.dataProvider = new eui.ArrayCollection(arr);
            this.jn_list.selectedIndex = c_index;
            this.jn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.qd_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qd_click, this);
            this.fresh_view(c_index);
        };
        CxgSelectAlert.prototype.onTabChange = function (e) {
            this.fresh_view(e.item.sid);
        };
        CxgSelectAlert.prototype.fresh_view = function (c_index) {
            if (c_index) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", c_index);
                this.name_t.text = api.name + ":";
                this.desc_t.text = api.desc;
                this.skill_p.source = "znskill" + api.id + "_png";
            }
            else {
                this.name_t.text = "";
                this.desc_t.text = "";
                this.skill_p.source = "";
            }
        };
        CxgSelectAlert.prototype.qd_click = function (evt) {
            var c_item = this.jn_list.selectedItem;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CXG_JN_SLT, c_item.id);
            this.close_self();
        };
        CxgSelectAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.qd_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.qd_click, this);
            this.jn_list.dataProvider = null;
            this.jn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        CxgSelectAlert.S_NAME = "CxgSelectAlert";
        return CxgSelectAlert;
    }(mx.AlertView));
    mx.CxgSelectAlert = CxgSelectAlert;
    __reflect(CxgSelectAlert.prototype, "mx.CxgSelectAlert");
})(mx || (mx = {}));
//# sourceMappingURL=CxgSelectAlert.js.map
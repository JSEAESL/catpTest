/**
 *   @author cy
 *   @date 2017.1.18
 *   @desc 恩客记录弹窗
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
    var EnKeAlert = (function (_super) {
        __extends(EnKeAlert, _super);
        function EnKeAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EnKeAlert.mx_support = function () {
            return ["assets.jfs_enke"];
        };
        EnKeAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var feizi = wproxy.get_cur_mn();
            this.ekjl_t.text = mx.Lang.jfs24;
            var arr = [];
            for (var k in this.adata) {
                var data = this.adata[k];
                var str = [];
                str.push({ "text": data.name, "style": { "underline": true, "textColor": mx.Tools.num2color(200) } });
                var str2 = mx.Tools.format(mx.Lang.jfs25, feizi.name, data.add_renqi);
                var color = mx.Tools.num2color(feizi.meili);
                str = str.concat(mx.Tools.setKeywordColor2(str2, [color]));
                arr.push({
                    "tx": "tx70_" + (data.avatar || 1) + "_png",
                    "rq": mx.Tools.format_time(data.time, "nyrsfm"),
                    "jl": str,
                    "id": data.user_id
                });
            }
            this.jl_list.dataProvider = new eui.ArrayCollection(arr);
            if (!arr.length) {
                this.ekkb_p.visible = true;
            }
            else {
                this.ekkb_p.visible = false;
            }
            this.jl_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        EnKeAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.jl_list.dataProvider = null;
            this.jl_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        EnKeAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_PLAYER_INFO,
                "other_id": e.item.id
            });
        };
        EnKeAlert.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, EnKeAlert.S_NAME);
        };
        EnKeAlert.S_NAME = "EnKeAlert";
        return EnKeAlert;
    }(mx.AlertView));
    mx.EnKeAlert = EnKeAlert;
    __reflect(EnKeAlert.prototype, "mx.EnKeAlert");
})(mx || (mx = {}));
//# sourceMappingURL=EnKeAlert.js.map
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
 * @author cy
 * @date 2017.10.24
 * 祈福
 */
var mx;
(function (mx) {
    var QiFuAlert = (function (_super) {
        __extends(QiFuAlert, _super);
        function QiFuAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QiFuAlert.mx_support = function () {
            return ["assets.nhqf", "api.QIFUAWARD", "data.2845"];
        };
        QiFuAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.fuqian_list.itemRenderer = mx.QiFuRender;
            view.bide_list.itemRenderer = mx.GNumRender;
            view.gailv_list.itemRenderer = mx.GNumRender;
            view.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.fuqian_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.QiFuAlertMediator(this));
            this.fresh_view();
        };
        QiFuAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var qifu_api = mx.ApiTool.getAPI(mx.MX_APINAME.QIFULEVEL);
            if (Number(gproxy.qifu_data.qifu) == 0) {
                view.fun_b.set_ssres("qfaniu_png");
                view.fun_b.set_tsres("tishi_png");
                view.ts_t.text = mx.Lang.qifu002;
            }
            else if (Number(gproxy.qifu_data.qifu) > qifu_api.length - 1) {
                view.fun_b.visible = false;
                view.ts_t.text = mx.Lang.qifu001;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.QIFULEVEL, "level", Number(gproxy.qifu_data.qifu) + 1);
                if (Number(gproxy.qifu_data.pay_today) >= Number(api.pay_num)) {
                    view.fun_b.set_ssres("qfaniu_png");
                    view.fun_b.set_tsres("tishi_png");
                    view.ts_t.text = mx.Lang.qifu002;
                }
                else {
                    view.fun_b.set_ssres("czhqfu_png");
                    view.fun_b.set_tsres(null);
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.QIFULEVEL, "level", Number(gproxy.qifu_data.qifu));
                    view.ts_t.text = mx.Tools.format(mx.Lang.qifu003, gproxy.qifu_data.pay_today - Number(api2.pay_num), Number(api.pay_num) - Number(api2.pay_num));
                }
            }
            var arr = gproxy.qifu_log;
            view.fuqian_list.dataProvider = new eui.ArrayCollection(arr);
            var qifu = Number(gproxy.qifu_data.qifu) + 1;
            this.bide_p.source = "bcqfu_png";
            this.gailv_p.source = "bcqfglhd_png";
            if (qifu > 9) {
                qifu = 1;
                this.bide_p.source = "xcqfu_png";
                this.gailv_p.source = "xcqfglhd_png";
            }
            var bide_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.QIFUAWARD, "key_id", 1, "level", qifu);
            var gail_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.QIFUAWARD, "key_id", 2, "level", qifu);
            var arr1 = [];
            var arr2 = [];
            for (var k in bide_apis) {
                arr1.push({
                    "id": bide_apis[k].item_id,
                    "type": bide_apis[k].type,
                    "num": bide_apis[k].num,
                    "chicun": 53,
                    "no_num": true,
                    "top": 56,
                    "di_cor": 0x4C416A,
                    "di_size": 12,
                });
            }
            for (var j in gail_apis) {
                arr2.push({
                    "id": gail_apis[j].item_id,
                    "type": gail_apis[j].type,
                    "num": gail_apis[j].num,
                    "chicun": 53,
                    "no_num": true,
                    "top": 56,
                    "di_cor": 0x4C416A,
                    "di_size": 12,
                });
            }
            view.bide_list.dataProvider = new eui.ArrayCollection(arr1);
            view.gailv_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        QiFuAlert.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.fun_b.res_name == "qfaniu_png") {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_QIFU });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
            }
        };
        QiFuAlert.prototype.tab_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var str = e.item.name == gproxy.user_name ? mx.Lang.qifu006 : mx.Lang.qifu005;
            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        QiFuAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.QiFuAlertMediator.NAME);
            view.fuqian_list.dataProvider = null;
            view.bide_list.dataProvider = null;
            view.gailv_list.dataProvider = null;
            view.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.fuqian_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
        };
        QiFuAlert.S_NAME = "QiFuAlert";
        return QiFuAlert;
    }(mx.AlertView));
    mx.QiFuAlert = QiFuAlert;
    __reflect(QiFuAlert.prototype, "mx.QiFuAlert");
})(mx || (mx = {}));
//# sourceMappingURL=QiFuAlert.js.map
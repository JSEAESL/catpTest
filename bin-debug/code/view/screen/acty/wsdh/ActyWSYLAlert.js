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
 * @date 2017.11.23
 *
 */
var mx;
(function (mx) {
    var ActyWSYLAlert = (function (_super) {
        __extends(ActyWSYLAlert, _super);
        function ActyWSYLAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyWSYLAlert.mx_support = function () {
            return ["assets.acty_wushuang_yl", "api.WUSDUIHUAN", "api.WUSBUY"];
        };
        ActyWSYLAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var arr = [];
            var apis;
            if (this.adata == 1) {
                this.title_p.top = 34;
                this.title_p.source = "wsyldh_png";
                this.ts_p.source = "wsyltixing_png";
                this.ts_p.top = 65;
                this.ts_p.left = 11;
                this.item_list.itemRenderer = mx.ActyWSDHRender;
                arr = mx.ApiTool.getAPI(mx.MX_APINAME.WUSDUIHUAN);
            }
            else {
                this.title_p.top = 24;
                this.title_p.source = "wsyljlyl_png";
                this.ts_p.source = "wsylkhdyxjl_png";
                this.ts_p.top = 58;
                this.ts_p.left = 19;
                this.item_list.itemRenderer = mx.ActyWSYLRender;
                arr = mx.ApiTool.getAPI(mx.MX_APINAME.WUSBUY);
            }
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
        };
        ActyWSYLAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
        };
        ActyWSYLAlert.S_NAME = "ActyWSYLAlert";
        return ActyWSYLAlert;
    }(mx.AlertView));
    mx.ActyWSYLAlert = ActyWSYLAlert;
    __reflect(ActyWSYLAlert.prototype, "mx.ActyWSYLAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSYLAlert.js.map
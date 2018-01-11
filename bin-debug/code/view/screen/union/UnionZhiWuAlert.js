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
 * @cy/2017.4.25
 *  选择职务alert
 */
var mx;
(function (mx) {
    var UnionZhiWuAlert = (function (_super) {
        __extends(UnionZhiWuAlert, _super);
        function UnionZhiWuAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionZhiWuAlert.mx_support = function () {
            return ["assets.jz_zhiwu"];
        };
        UnionZhiWuAlert.prototype.init_view_by_type = function () {
            var uProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.UnionProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GHZHIWEI, "level", uProxy.lv3);
            this.guanli_list.itemRenderer = mx.UnionZhiWuRender;
            this.putong_list.itemRenderer = mx.UnionZhiWuRender;
            var arr1 = [];
            var arr2 = [];
            var arr = ["yguan_png", "xguan_png", "hjun_png", "qjun_png"];
            var cor1 = 0x6db050;
            var cor2 = 0x8968C5;
            arr1.push({
                "id": 1,
                "bg": "zzhang_png",
                "text": "1/1",
                "cor": cor1
            });
            arr1.push({
                "id": 2,
                "bg": "fzzhang_png",
                "text": uProxy.union_fuzuzhang + "/" + api.name1,
                "cor": uProxy.union_fuzuzhang < Number(api.name1) ? cor2 : cor1
            });
            for (var k = 0; k < 4; k++) {
                arr2.push({
                    "id": k + 3,
                    "bg": arr[k],
                    "text": uProxy.union_rongyuzw[k] + "/" + api["name" + (k + 2)],
                    "cor": uProxy.union_rongyuzw[k] < Number(api["name" + (k + 2)]) ? cor2 : cor1
                });
            }
            arr2.push({
                "id": 0,
                "bg": "cyuan_png",
                "text": uProxy.union_member - 1 - uProxy.union_fuzuzhang - uProxy.union_zhanglao,
                "cor": cor2
            });
            this.guanli_list.dataProvider = new eui.ArrayCollection(arr1);
            this.putong_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        UnionZhiWuAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.guanli_list.dataProvider = null;
            this.putong_list.dataProvider = null;
        };
        UnionZhiWuAlert.S_NAME = "UnionZhiWuAlert";
        return UnionZhiWuAlert;
    }(mx.AlertView));
    mx.UnionZhiWuAlert = UnionZhiWuAlert;
    __reflect(UnionZhiWuAlert.prototype, "mx.UnionZhiWuAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionZhiWuAlert.js.map
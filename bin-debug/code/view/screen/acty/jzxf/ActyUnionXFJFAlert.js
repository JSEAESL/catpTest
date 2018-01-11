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
 * @date 2017.11.18
 * 家族消费\
 */
var mx;
(function (mx) {
    var ActyUnionXFJFAlert = (function (_super) {
        __extends(ActyUnionXFJFAlert, _super);
        function ActyUnionXFJFAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyUnionXFJFAlert.mx_support = function () {
            return ["assets.jzxf_jf"];
        };
        ActyUnionXFJFAlert.prototype.init_view_by_type = function () {
            var data = this.adata;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GONGHUIXIAOHAOJIFEN, "id", data);
            this.jf_t.text = "" + api.jifen;
            var arr = [{
                    "itembg": "jxjfwpkuang_png",
                    "chicun": 80,
                    "di_cor": 0x595D90,
                    "top": 87,
                    "width": 80,
                    "no_num": true,
                    "num": api.num,
                    "type": api.award_type,
                    "id": api.award_id,
                    "di_size": 20,
                }];
            this.item_list.itemRenderer = mx.GNumRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
        };
        ActyUnionXFJFAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
        };
        ActyUnionXFJFAlert.S_NAME = "ActyUnionXFJFAlert";
        return ActyUnionXFJFAlert;
    }(mx.AlertView));
    mx.ActyUnionXFJFAlert = ActyUnionXFJFAlert;
    __reflect(ActyUnionXFJFAlert.prototype, "mx.ActyUnionXFJFAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyUnionXFJFAlert.js.map
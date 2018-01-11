/**
*   @author mx
*   @date 2015.1.3
*   @物品tip提示
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
    var BloodTip = (function (_super) {
        __extends(BloodTip, _super);
        function BloodTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BloodTip.prototype.init_view = function () {
            var cd = this.adata;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.XUETONGTIP, "wenhua", cd.wenhua, "daishu", cd.daishu);
            if (!api) {
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.XUETONGTIP, "wenhua", 1, "daishu", 0);
            }
            /*
            let name = api.name;
            let desc = api.desc;
            let common_xt = [1, 3, 4];//中原、扶桑、神话
            if (common_xt.indexOf(cd.wenhua) > -1) {
                api = ApiTool.getAPINode(MX_APINAME.HEROXUETONG, "h_id", cd.mid);
                desc += "。\n" + (api ? Tools.format(Lang.zsjn10, api.note, api.desc) : Lang.zsjn09);
            }*/
            this.name_t.text = api.name;
            this.desc_t.text = api.desc;
        };
        return BloodTip;
    }(mx.HeroTip));
    mx.BloodTip = BloodTip;
    __reflect(BloodTip.prototype, "mx.BloodTip");
})(mx || (mx = {}));
//# sourceMappingURL=BloodTip.js.map
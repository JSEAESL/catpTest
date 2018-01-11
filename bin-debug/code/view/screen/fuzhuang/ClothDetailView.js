/**
* cy/2016.9.20
* dingyunfeng/2017.11.8
* 服装详细属性
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
    var ClothDetailView = (function (_super) {
        __extends(ClothDetailView, _super);
        function ClothDetailView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClothDetailView.mx_support = function () {
            return ["assets.zs_shuxing", "api.CLOTHOBTAIN"];
        };
        ClothDetailView.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.ClothDetailViewMediator(this));
            this.xx_ui.set_scale(0.5);
            this.fresh_view();
        };
        ClothDetailView.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var cProxy = (facade.retrieveProxy(mx.ClothesProxy.NAME));
            //服装的数据可以存在proxy，这里读id
            var id = this.adata.id || 1001;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", id);
            if (!api) {
                id = 1001;
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", id);
            }
            var lx = api.type;
            this.xx_ui.set_avatar(id);
            var tag1 = String(api.add_type).split("|");
            var tag2 = String(api.add_num).split("|");
            var arr = [];
            for (var k in tag1) {
                arr[tag1[k]] = tag2[k];
            }
            this.life.text = Number(arr["HP"]) ? arr["HP"] : 0;
            this.armor.text = Number(arr["DF"]) ? arr["DF"] : 0;
            this.attact.text = Number(arr["AD"]) ? arr["AD"] : 0;
            //this.cname_t.text = api.name;
            this.miaoshu_t.textFlow = [
                { "text": '【' + api.name + '】: ', "style": { "textColor": 0xCA4EA4 } },
                { "text": api.desc, "style": { "textColor": 0x9765B5 } },
            ];
        };
        ClothDetailView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.xx_ui.on_remove();
            mx.ApplicationFacade.getInstance().removeMediator(mx.ClothDetailViewMediator.NAME);
        };
        ClothDetailView.S_NAME = "ClothDetailView";
        return ClothDetailView;
    }(mx.AlertView));
    mx.ClothDetailView = ClothDetailView;
    __reflect(ClothDetailView.prototype, "mx.ClothDetailView");
})(mx || (mx = {}));
//# sourceMappingURL=ClothDetailView.js.map
/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 在GeneralRender的基础上，添加名字显示，在slt皮肤下而外添加选中框
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
    var GNumRender = (function (_super) {
        __extends(GNumRender, _super);
        function GNumRender() {
            var _this = _super.call(this) || this;
            _this.width = 90;
            return _this;
        }
        GNumRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.item.data = data;
            if (data.storenum) {
                this.storenum = data.storenum;
            }
            if (data.show_str) {
                this.name_t.text = data.str;
            }
            else if (data.num) {
                if (data.type == mx.MX_COMMON.CTYPE_HERO) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.id);
                    this.name_t.text = api.hero_name;
                }
                else {
                    this.name_t.text = "x" + mx.Tools.num2str(data.num);
                    this.storenum = data.num;
                }
            }
            if (data.usehave) {
                this.num_t.text = "0/" + this.storenum;
                this.name_t.visible = false;
                this.num_t.visible = true;
            }
            if (data.changeusehave >= 0) {
                this.num_t.text = data.changeusehave + "/" + this.storenum;
                this.name_t.visible = false;
                this.num_t.visible = true;
            }
            if (data.di_cor) {
                this.name_t.textColor = data.di_cor;
            }
            if (data.di_size) {
                this.name_t.size = data.di_size;
            }
            if (data.top) {
                this.name_t.top = this.num_t.top = data.top;
            }
            if (data.width) {
                this.width = data.width;
            }
            if (data.height) {
                this.height = data.height;
            }
            if (data.namefontfamily) {
                this.name_t.fontFamily = data.namefontfamily;
            }
            if (data.itemtop) {
                this.item.top = data.itemtop;
            }
            if (data.chicun) {
                this.slt_p.width = data.chicun + 14;
                this.slt_p.height = data.chicun + 14;
            }
        };
        return GNumRender;
    }(mx.BasicRender));
    mx.GNumRender = GNumRender;
    __reflect(GNumRender.prototype, "mx.GNumRender");
})(mx || (mx = {}));
//# sourceMappingURL=GNumRender.js.map
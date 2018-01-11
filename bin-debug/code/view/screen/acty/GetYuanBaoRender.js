/**
 *   @author hxj
 *   @date 2017.9.22
 *   @desc 招财猫获奖记录render
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
    var GetYuanBaoRender = (function (_super) {
        __extends(GetYuanBaoRender, _super);
        function GetYuanBaoRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GetYuanBaoRender.prototype.init_render = function () {
            this.get_t.text = mx.Lang.hd029;
            this.dataChanged();
        };
        GetYuanBaoRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            this.const_g.visible = cd.name ? true : false;
            this.name_t.text = cd.name ? cd.name : "";
            this.num_bt.text = cd.num ? cd.num : "";
            this.line_p.visible = cd.noLine ? false : true;
        };
        return GetYuanBaoRender;
    }(mx.BasicRender));
    mx.GetYuanBaoRender = GetYuanBaoRender;
    __reflect(GetYuanBaoRender.prototype, "mx.GetYuanBaoRender");
})(mx || (mx = {}));
//# sourceMappingURL=GetYuanBaoRender.js.map
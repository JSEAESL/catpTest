/**
 *   @author qianjun
 *   @date 2014.12.28
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
    var YbyqjlRender = (function (_super) {
        __extends(YbyqjlRender, _super);
        function YbyqjlRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YbyqjlRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            //"to_id":"3","name":"ss","avatar":"http:\/\/sssssssss","lq":"1"
            var view = this;
            var cd = data.data;
            //公共部分
            view.no_t.text = data.idx;
            if (data.empty) {
                view.full_g.visible = false;
                view.empty_g.visible = true;
                view.ybao.visible = view.ybao_t.visible = true;
                return;
            }
            if (cd.avatar && cd.avatar.indexOf("http") > -1) {
                mx.Tools.url_image(cd.avatar, { "width": 128, "view": this.avatar });
            }
            else {
                var skey = "tx70_" + cd.avatar + "_png";
                if (!RES.hasRes(skey)) {
                    skey = "tx70_1_png";
                }
                this.avatar.source = skey;
            }
            view.full_g.visible = true;
            view.empty_g.visible = false;
            view.ybao.visible = view.ybao_t.visible = view.klq.visible = Number(cd.lq) == 1;
            view.lq.visible = view.have_lq.visible = Number(cd.lq) == 2;
        };
        return YbyqjlRender;
    }(mx.BasicRender));
    mx.YbyqjlRender = YbyqjlRender;
    __reflect(YbyqjlRender.prototype, "mx.YbyqjlRender");
})(mx || (mx = {}));
//# sourceMappingURL=YbyqjlRender.js.map
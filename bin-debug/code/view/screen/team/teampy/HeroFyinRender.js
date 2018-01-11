/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 侍从封印render
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
    var HeroFyinRender = (function (_super) {
        __extends(HeroFyinRender, _super);
        function HeroFyinRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroFyinRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.fy_p.source = "scfyin" + data.icon + "_png";
            view.level_bt.text = data.level + "";
            view.suo_p.visible = false;
            if (data.suo) {
                mx.Tools.mx_grayfy(view.fy_p);
                view.level_bt.text = '1';
                view.suo_p.visible = true;
            }
        };
        return HeroFyinRender;
    }(mx.BasicRender));
    mx.HeroFyinRender = HeroFyinRender;
    __reflect(HeroFyinRender.prototype, "mx.HeroFyinRender");
})(mx || (mx = {}));
//# sourceMappingURL=HeroFyinRender.js.map
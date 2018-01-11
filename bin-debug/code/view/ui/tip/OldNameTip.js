/**
*   @author hxj
*   @date 2017.8.25
*   @曾用名tip
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
    var OldNameTip = (function (_super) {
        __extends(OldNameTip, _super);
        function OldNameTip(cd) {
            return _super.call(this, cd) || this;
        }
        OldNameTip.prototype.init_view = function () {
            var cd = this.adata;
            this.initial_name.text = mx.Lang.xgs28 + cd.initial_name;
            this.old_name.text = mx.Lang.xgs29;
            this.oldName_t.text = this.format(cd.old_name);
            this.bg.height = this.text_g.height + 14;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
        };
        OldNameTip.prototype.format = function (name) {
            var res = "";
            for (var k in name) {
                res += name[k].name + '\n';
            }
            return res;
        };
        return OldNameTip;
    }(mx.HeroTip));
    mx.OldNameTip = OldNameTip;
    __reflect(OldNameTip.prototype, "mx.OldNameTip");
})(mx || (mx = {}));
//# sourceMappingURL=OldNameTip.js.map
/**
 *   @author cy
 *   @date 2017.8.11
 *   @desc YQTHRender
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
    var YQTHRender = (function (_super) {
        __extends(YQTHRender, _super);
        function YQTHRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YQTHRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.g_g.visible = true;
            if (data.empty) {
                this.g_g.visible = false;
                this.di_p.source = "xwydai_png";
                return;
            }
            this.di_p.source = "yqthlist_png";
            this.name_t.text = data.name;
            this.cz_t.text = mx.Lang.r0031;
            this.num_t.text = data.pay_num;
            data.dang_id = Math.min(12, data.dang_id);
            this.zwth_p.source = "zwth" + data.dang_id + "_png";
            if (data.avatar.indexOf("http") > -1) {
                RES.getResByUrl(data.avatar, function (e) {
                    this.avatar_p.source = e;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                var skey = "tx70_" + data.avatar + "_png";
                if (!RES.hasRes(skey)) {
                    skey = "tx70_1_png";
                }
                this.avatar_p.source = skey;
            }
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(31, 31, 31);
            shape.graphics.endFill();
            this.addChild(shape);
            shape.x = 15;
            shape.y = 13;
            this.avatar_p.mask = shape;
        };
        return YQTHRender;
    }(mx.BasicRender));
    mx.YQTHRender = YQTHRender;
    __reflect(YQTHRender.prototype, "mx.YQTHRender");
})(mx || (mx = {}));
//# sourceMappingURL=YQTHRender.js.map
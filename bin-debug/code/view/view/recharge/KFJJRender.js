/**
 *   @author cy
 *   @date 2017.2.28
 *   @desc 在线礼包render
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
    var KFJJRender = (function (_super) {
        __extends(KFJJRender, _super);
        function KFJJRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KFJJRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var lv_brr = ["xejb", "xsjb", "xsijb", "xwjb", "xljb", "xqjb", "xjjb"];
            var yb = lv_brr[data.id] + "_png";
            this.dj_t.text = "lv" + data.need_arr + mx.Lang.p0150;
            this.dj_g.visible = this.ylq_p.visible = this.klq_p.visible = false;
            switch (data.state) {
                case 0: //未领取
                case 3: //等级不足
                case 4://未买
                    this.dj_g.visible = true;
                    break;
                case 1://已领取
                    this.ylq_p.visible = true;
                    break;
                case 2://可领取
                    this.klq_p.visible = true;
                    var zg2 = new mx.GeneralEffect("xxgxiao");
                    this.ef_g.addChild(zg2);
                    zg2.scaleY = 0.7;
                    zg2.scaleX = 0.6;
                    zg2.play_by_times(-1);
                    break;
            }
            this.yb_p.source = yb;
        };
        return KFJJRender;
    }(mx.BasicRender));
    mx.KFJJRender = KFJJRender;
    __reflect(KFJJRender.prototype, "mx.KFJJRender");
})(mx || (mx = {}));
//# sourceMappingURL=KFJJRender.js.map
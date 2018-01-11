/**
 *   @author cy
 *   @date 2017.7.7
 *   @desc 排行榜render
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
    var UnionRankRender = (function (_super) {
        __extends(UnionRankRender, _super);
        function UnionRankRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionRankRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        UnionRankRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionRankRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.UnionDetailAlert.S_NAME,
                "param": this.data,
            });
        };
        UnionRankRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.currentState = this.skin.currentState = data.state;
            this.paiming_bt.visible = this.pmdi_p.visible = this.paiming_p.visible = false;
            var index = data.index;
            var arr = ["jzpyi_png", "jzper_png", "jzpsan_png"];
            if (index <= 2) {
                this.paiming_p.visible = true;
                this.paiming_p.source = arr[index - 1];
            }
            else {
                this.paiming_bt.visible = this.pmdi_p.visible = true;
                this.paiming_bt.text = index + "";
            }
            this.jzm_t.text = "Lv." + data.level + " " + data.name;
            this.num_t.text = data.ren + "/" + data.maxren;
            this.hz_p.source = "jzhz" + data.logo + "_png";
        };
        return UnionRankRender;
    }(mx.BasicRender));
    mx.UnionRankRender = UnionRankRender;
    __reflect(UnionRankRender.prototype, "mx.UnionRankRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionRankRender.js.map
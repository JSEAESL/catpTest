/**
 *   @author cy
 *   @date 2017.11.14
 *   @desc tujian render
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
    var TuJianPLRenser = (function (_super) {
        __extends(TuJianPLRenser, _super);
        function TuJianPLRenser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianPLRenser.prototype.init_render = function () {
            this.dz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        TuJianPLRenser.prototype.on_remove = function (evt) {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            _super.prototype.on_remove.call(this);
            this.dz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TuJianPLRenser.prototype.btn_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_TUJIAN_PZAN,
                "id": this.data.id
            });
        };
        TuJianPLRenser.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.avatar.source = "tx70_" + data.avatar + "_png";
            this.name_t.text = data.name;
            this.pl_t.text = data.content;
            this.num_t.text = "" + data.liked;
            var res = Number(data.user_liked) == 1 ? "plzan4_png" : "plzan3_png";
            this.dz_b.set_ssres(res);
        };
        return TuJianPLRenser;
    }(mx.BasicRender));
    mx.TuJianPLRenser = TuJianPLRenser;
    __reflect(TuJianPLRenser.prototype, "mx.TuJianPLRenser");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianPLRenser.js.map
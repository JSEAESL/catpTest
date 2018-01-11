/**
 *   @author gaojing、mx
 *   @date 2017.12.12
 *   @desc 红颜薄命
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
    var HzsHybmView = (function (_super) {
        __extends(HzsHybmView, _super);
        function HzsHybmView(data) {
            return _super.call(this, data) || this;
        }
        HzsHybmView.mx_support = function () {
            return ["assets.palace_hzsuo_lyin_lx"];
        };
        HzsHybmView.prototype.init_view_by_type = function () {
            this.adata = this.adata || {};
            var cdata = this.adata;
            cdata.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
            cdata.sdata_ok = {
                "t": mx.MX_NETS.CS_DR_JFS,
                "id": cdata.id,
            };
        };
        HzsHybmView.S_NAME = "HzsHybmView";
        return HzsHybmView;
    }(mx.AlertView));
    mx.HzsHybmView = HzsHybmView;
    __reflect(HzsHybmView.prototype, "mx.HzsHybmView");
})(mx || (mx = {}));
//# sourceMappingURL=HzsHybmView.js.map
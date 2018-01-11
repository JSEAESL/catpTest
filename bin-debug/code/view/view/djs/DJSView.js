/**
*   @author mx
*   @date 2015.1.3
*   @desc 购买通用彈窗
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
    var DJSView = (function (_super) {
        __extends(DJSView, _super);
        function DJSView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DJSView.mx_support = function () {
            return ["assets.djs", "api.GOLDHAND"];
        };
        DJSView.prototype.init_view = function () {
            this.buy_b.set_ssres("djsgmai_png");
            this.qbuy_b.set_ssres("gmtlqxiao_png");
            this.sycs_t.text = mx.Lang.a0003;
            this.name_t.text = mx.Lang.ybi;
            this.msg_g.visible = false;
            this.msg_g.touchEnabled = false;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.DJSViewMediator(this));
        };
        DJSView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.DJSViewMediator.NAME);
        };
        DJSView.S_NAME = "DJSView";
        return DJSView;
    }(mx.BasicView));
    mx.DJSView = DJSView;
    __reflect(DJSView.prototype, "mx.DJSView");
})(mx || (mx = {}));
//# sourceMappingURL=DJSView.js.map
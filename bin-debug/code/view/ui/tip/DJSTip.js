/**
*   @author cy
*   @date 2017.8.24
*   @倒计时tip提示
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
    var DJSTip = (function (_super) {
        __extends(DJSTip, _super);
        function DJSTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DJSTip.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.DJSTipMediator(this));
        };
        DJSTip.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.DJSTipMediator.NAME);
        };
        return DJSTip;
    }(mx.HeroTip));
    mx.DJSTip = DJSTip;
    __reflect(DJSTip.prototype, "mx.DJSTip");
})(mx || (mx = {}));
//# sourceMappingURL=DJSTip.js.map
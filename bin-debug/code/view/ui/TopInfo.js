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
/**
 * mx@2016/08/21
 */
var mx;
(function (mx) {
    var TopInfo = (function (_super) {
        __extends(TopInfo, _super);
        function TopInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopInfo.prototype.pre_init = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TopInfoMediator(this));
        };
        TopInfo.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TopInfoMediator.NAME);
            this.removeChildren();
        };
        return TopInfo;
    }(mx.BasicUI));
    mx.TopInfo = TopInfo;
    __reflect(TopInfo.prototype, "mx.TopInfo");
})(mx || (mx = {}));
//# sourceMappingURL=TopInfo.js.map
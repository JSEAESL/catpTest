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
var GlobalDispatcher = (function (_super) {
    __extends(GlobalDispatcher, _super);
    function GlobalDispatcher() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GlobalDispatcher, "Ins", {
        get: function () {
            if (null == this._ins) {
                this._ins = new GlobalDispatcher();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalDispatcher;
}(egret.EventDispatcher));
__reflect(GlobalDispatcher.prototype, "GlobalDispatcher");
//# sourceMappingURL=GlobalDispatcher.js.map
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
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelPrepCommand.prototype.execute = function (notification) {
            this.facade.registerProxy(new mx.GameModelProxy());
        };
        return ModelPrepCommand;
    }(puremvc.SimpleCommand));
    mx.ModelPrepCommand = ModelPrepCommand;
    __reflect(ModelPrepCommand.prototype, "mx.ModelPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ModelPrepCommand.js.map
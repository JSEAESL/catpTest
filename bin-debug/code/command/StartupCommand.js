/**
*   @author zen
*   @date 2014.12.28
*   @desc StartupCommand 启动命令,项目启动后用于初始化M,V,C 命令
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
    var StartupCommand = (function (_super) {
        __extends(StartupCommand, _super);
        function StartupCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //携带的消息会依次传递给子消息
        StartupCommand.prototype.initializeMacroCommand = function () {
            this.addSubCommand(mx.ModelPrepCommand);
            this.addSubCommand(mx.ViewPrepCommand);
            this.addSubCommand(mx.ControllerPrepCommand);
        };
        return StartupCommand;
    }(puremvc.MacroCommand));
    mx.StartupCommand = StartupCommand;
    __reflect(StartupCommand.prototype, "mx.StartupCommand");
})(mx || (mx = {}));
//# sourceMappingURL=StartupCommand.js.map
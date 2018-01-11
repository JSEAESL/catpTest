/**
*   @author zen
*   @date 2014.12.28
*   @desc 显示层命令,V层只注册跟容器的mediator

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
    var ViewPrepCommand = (function (_super) {
        __extends(ViewPrepCommand, _super);
        function ViewPrepCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ViewPrepCommand.prototype.execute = function (notification) {
            var main = notification.getBody();
            this.facade.registerMediator(new mx.ApplicationMediator(main));
        };
        return ViewPrepCommand;
    }(puremvc.SimpleCommand));
    mx.ViewPrepCommand = ViewPrepCommand;
    __reflect(ViewPrepCommand.prototype, "mx.ViewPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ViewPrepCommand.js.map
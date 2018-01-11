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
*   @author mx
*   @date 2016.05.23
*   @desc 控制层命令, 注册所有command
**/
var mx;
(function (mx) {
    var ControllerPrepCommand = (function (_super) {
        __extends(ControllerPrepCommand, _super);
        function ControllerPrepCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ControllerPrepCommand.prototype.execute = function (notification) {
            (new mx.NetCommand()).register();
            (new mx.GameCommand()).register();
            (new mx.SignCommand()).register();
            (new mx.DataCommand()).register();
            (new mx.CxgCommand()).register();
            (new mx.MailCommand()).register();
            (new mx.HeroCommand()).register();
            (new mx.PackCommand()).register();
            (new mx.XXiuCommand()).register();
            (new mx.FubenCommand()).register();
            (new mx.ClothesCommand()).register();
            (new mx.YXDianCommand()).register();
            (new mx.HzsuoCommand()).register();
            (new mx.XqinCommand()).register();
            (new mx.TempleCommand()).register();
            (new mx.GuideCommand()).register();
            (new mx.ShopCommand()).register();
            (new mx.FriendCommand()).register();
            (new mx.ActyCommand()).register();
            (new mx.WaiJiaoCommand()).register();
            (new mx.LueDuoCommand()).register();
            (new mx.JingJiCommand()).register();
            (new mx.UnionCommand()).register();
            (new mx.SysCommand()).register();
            (new mx.XGSCommand()).register();
            (new mx.HeiShiCommand()).register();
            (new mx.HZClassCommand()).register();
        };
        return ControllerPrepCommand;
    }(puremvc.SimpleCommand));
    mx.ControllerPrepCommand = ControllerPrepCommand;
    __reflect(ControllerPrepCommand.prototype, "mx.ControllerPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ControllerPrepCommand.js.map
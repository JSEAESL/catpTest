/**
*   @author mx
*   @date 2016.05.23
*   @desc 数据层命令,注册所有的model
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
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelPrepCommand.prototype.execute = function (notification) {
            this.facade.registerProxy(new mx.DataProxy());
            this.facade.registerProxy(new mx.GameProxy());
            this.facade.registerProxy(new mx.SignProxy());
            this.facade.registerProxy(new mx.MailProxy());
            this.facade.registerProxy(new mx.HeroProxy());
            this.facade.registerProxy(new mx.PackProxy());
            this.facade.registerProxy(new mx.XXiuProxy());
            this.facade.registerProxy(new mx.FubenProxy());
            this.facade.registerProxy(new mx.ClothesProxy());
            this.facade.registerProxy(new mx.PalaceProxy());
            this.facade.registerProxy(new mx.CXGongProxy());
            this.facade.registerProxy(new mx.XqinProxy());
            this.facade.registerProxy(new mx.AVGProxy());
            this.facade.registerProxy(new mx.TempleProxy());
            this.facade.registerProxy(new mx.GuideProxy());
            this.facade.registerProxy(new mx.ShopProxy());
            this.facade.registerProxy(new mx.FriendProxy());
            this.facade.registerProxy(new mx.ActyProxy());
            this.facade.registerProxy(new mx.WaiJiaoProxy());
            this.facade.registerProxy(new mx.LueDuoProxy());
            this.facade.registerProxy(new mx.JingJiProxy());
            this.facade.registerProxy(new mx.UnionProxy());
            this.facade.registerProxy(new mx.ChatProxy()); //聊天数据
            this.facade.registerProxy(new mx.SystemProxy()); //系统数据管理
            this.facade.registerProxy(new mx.XGSProxy());
            this.facade.registerProxy(new mx.HeiShiProxy());
        };
        return ModelPrepCommand;
    }(puremvc.SimpleCommand));
    mx.ModelPrepCommand = ModelPrepCommand;
    __reflect(ModelPrepCommand.prototype, "mx.ModelPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ModelPrepCommand.js.map
/**
 * mx
 * 用户数据处理
 * 2015/1/27.
 */
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
    var GuideCommand = (function (_super) {
        __extends(GuideCommand, _super);
        function GuideCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GuideCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NOTICE.CHECK_GUIDE, GuideCommand);
            this.facade.registerCommand(mx.MX_NOTICE.NEXT_GUIDE, GuideCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SKIP_GUIDE, GuideCommand);
            this.facade.registerCommand(mx.MX_NOTICE.COMP_GUIDE, GuideCommand);
            this.facade.registerCommand(mx.MX_NOTICE.OPEN_GUIDE, GuideCommand);
            this.facade.registerCommand(mx.MX_NOTICE.GET_GUIDE, GuideCommand);
        };
        GuideCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var gProxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.CHECK_GUIDE:
                    gProxy.check_guide(data);
                    break;
                case mx.MX_NOTICE.GET_GUIDE:
                    gProxy.get_guide(data);
                    break;
                case mx.MX_NOTICE.NEXT_GUIDE:
                    gProxy.next_guide(data);
                    break;
                case mx.MX_NOTICE.SKIP_GUIDE:
                    gProxy.skip_guide(data);
                    break;
                case mx.MX_NOTICE.COMP_GUIDE:
                    gProxy.comp_guide(data);
                    break;
                case mx.MX_NOTICE.OPEN_GUIDE:
                    gProxy.open_guide(data);
                    break;
            }
        };
        GuideCommand.NAME = "GuideCommand";
        return GuideCommand;
    }(puremvc.SimpleCommand));
    mx.GuideCommand = GuideCommand;
    __reflect(GuideCommand.prototype, "mx.GuideCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GuideCommand.js.map
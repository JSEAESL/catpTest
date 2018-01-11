/**
 * wf
 * 太庙网络请求
 * 2016/11/17.
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
    var TempleCommand = (function (_super) {
        __extends(TempleCommand, _super);
        function TempleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TempleCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_TEMPLE_JIBAI, TempleCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JIBAI_AWARD, TempleCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TEMPLE_HZHUANG, TempleCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TEMPLE_HZHUANG_TJ, TempleCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHECK_TEMPLE_FIGHT, TempleCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TEMPLE_JINJI, TempleCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SET_TEMPLE_TEST, TempleCommand);
            this.facade.registerCommand(mx.MX_NOTICE.TEMPLE_HZHUANG_FINISH, TempleCommand);
        };
        TempleCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var tproxy = (this.facade.retrieveProxy(mx.TempleProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_TEMPLE_JIBAI:
                    tproxy.set_can_jibai(data);
                    break;
                case mx.MX_NETS.SC_JIBAI_AWARD:
                    tproxy.jibai_award_cb(data);
                    break;
                case mx.MX_NETS.SC_TEMPLE_HZHUANG:
                    tproxy.hz_finish_cb(data);
                    break;
                case mx.MX_NETS.SC_TEMPLE_HZHUANG_TJ:
                    //tproxy.temple_tuijian_clothes(data);
                    break;
                case mx.MX_NETS.SC_CHECK_TEMPLE_FIGHT:
                    tproxy.check_temple_fight(data);
                    break;
                case mx.MX_NOTICE.SET_TEMPLE_TEST:
                    tproxy.set_test_type(data);
                    break;
                case mx.MX_NOTICE.TEMPLE_HZHUANG_FINISH:
                    tproxy.score_finish(data);
                    break;
                case mx.MX_NETS.SC_TEMPLE_JINJI:
                    tproxy.jinji_cb(data);
            }
        };
        TempleCommand.NAME = "TempleCommand";
        return TempleCommand;
    }(puremvc.SimpleCommand));
    mx.TempleCommand = TempleCommand;
    __reflect(TempleCommand.prototype, "mx.TempleCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TempleCommand.js.map
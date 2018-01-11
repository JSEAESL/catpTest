/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var JingChengMediator = (function (_super) {
        __extends(JingChengMediator, _super);
        function JingChengMediator(viewComponent) {
            var _this = _super.call(this, JingChengMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        JingChengMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.view.g_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        JingChengMediator.prototype.mx_test = function (event) {
            this.view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        Object.defineProperty(JingChengMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JingChengMediator.prototype.onRemove = function () {
            this.view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        JingChengMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.FRESH_WB_SHARE,
                mx.MX_NOTICE.NEW_XIAOHONGDIAN,
            ];
        };
        JingChengMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.FRESH_WB_SHARE:
                    this.view.wb_show();
                    break;
                case mx.MX_NOTICE.NEW_XIAOHONGDIAN:
                    this.view.new_tishi();
                    break;
                default:
                    break;
            }
        };
        JingChengMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_jc_xgs"://相国寺
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSScreen.S_NAME);
                    break;
                case "s_jc_jjc"://竞技场
                    // let jproxy : JingJiProxy = <JingJiProxy><any>this.facade.retrieveProxy(JingJiProxy.NAME);
                    // jproxy.jj_flag = true;
                    // let net = [{
                    //     "t": MX_NETS.CS_QUEUE_INFO,
                    //     "team_id": 11
                    // }];
                    // this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname" : JJCMainScreen.S_NAME,
                    //     "param" : {"net" : net}
                    // });
                    break;
            }
        };
        JingChengMediator.NAME = "JingChengMediator";
        return JingChengMediator;
    }(puremvc.Mediator));
    mx.JingChengMediator = JingChengMediator;
    __reflect(JingChengMediator.prototype, "mx.JingChengMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JingChengMediator.js.map
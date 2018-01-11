/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 引导界面Mediator
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
    var GuideSelectMediator = (function (_super) {
        __extends(GuideSelectMediator, _super);
        function GuideSelectMediator(viewComponent) {
            var _this = _super.call(this, GuideSelectMediator.NAME, viewComponent) || this;
            // if(window && window["mx_gid"] && MX_COMMON.SHOW_WB_GIFT){//优先打开玩吧礼包
            //     this.sendNotification(MX_NOTICE.CS_GET_DATA, {
            //         "t": MX_NETS.CS_WANBA_GIFT,
            //         "libao" : window["mx_gid"]
            //     });
            // }else{
            //     this.sendNotification(MX_NOTICE.CHECK_GUIDE);//打开引导
            // }
            _this.sendNotification(mx.MX_NOTICE.CHECK_GUIDE); //打开引导
            return _this;
        }
        Object.defineProperty(GuideSelectMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        GuideSelectMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.WB_GIFT_SHOW
            ];
        };
        GuideSelectMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.WB_GIFT_SHOW:
                    this.sendNotification(mx.MX_NOTICE.CHECK_GUIDE); //打开引导
                    break;
                default:
                    break;
            }
        };
        GuideSelectMediator.prototype.show_guide = function (data) {
            switch (data) {
                case "j_wc"://完成选择妃子
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
                case "j_hf"://跳过显示，直接发送消息
                    this.view.set_view(true);
                    break;
            }
        };
        GuideSelectMediator.NAME = "GuideSelectMediator";
        return GuideSelectMediator;
    }(puremvc.Mediator));
    mx.GuideSelectMediator = GuideSelectMediator;
    __reflect(GuideSelectMediator.prototype, "mx.GuideSelectMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GuideSelectMediator.js.map
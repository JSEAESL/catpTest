/**
 @author qianjun
 *   @date 2016.10.9
 *   @desc mediator
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
    var JuqingScreenMediator = (function (_super) {
        __extends(JuqingScreenMediator, _super);
        function JuqingScreenMediator(viewComponent) {
            return _super.call(this, JuqingScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(JuqingScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JuqingScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.FRESH_JQ_SS,
                mx.MX_NOTICE.JUBEN_YLI_LQ,
                mx.MX_NOTICE.FRESH_FUBEN,
                mx.MX_NOTICE.SHOW_ALERT,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER,
                mx.MX_NOTICE.FRESH_FUBEN_STAGE,
                mx.MX_NOTICE.CHAPTER_OPEN,
            ];
        };
        JuqingScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    var proxy = view.fproxy;
                    view.cur_chapter = proxy.cur_chapter;
                    view.cur_max_chpter = Number(proxy.juqing_info.max);
                    view.fresh_right();
                    view.fresh_list();
                    view.check_jump();
                    break;
                case mx.MX_NOTICE.FRESH_JQ_SS:
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JuqingXunshiAlert.S_NAME);
                    view.fresh_right();
                    break;
                case mx.MX_NOTICE.JUBEN_YLI_LQ:
                    view.fresh_right();
                    break;
                case mx.MX_NOTICE.FRESH_FUBEN:
                    view.fresh_right();
                    view.fresh_list();
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    view.show_avg();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER:
                    view.kai_new_chapter = true;
                    view.fresh_bottom();
                    break;
                case mx.MX_NOTICE.FRESH_FUBEN_STAGE:
                    view.fresh_list();
                    break;
                case mx.MX_NOTICE.CHAPTER_OPEN:
                    if (view.kai_new_chapter) {
                        view.kai_new_chapter = false;
                        view.unlock_chapter();
                    }
                    else {
                        view.go_to_task();
                    }
                    break;
            }
        };
        JuqingScreenMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "v_fb_tz"://挑战
                    var view = this.view;
                    var fproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": view.arr_temp[0],
                            "type": "zhandou_before",
                        }
                    });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JuqingTzAlert.S_NAME);
                    break;
                case "v_rw_gb":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskReward.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        JuqingScreenMediator.NAME = "JuqingScreenMediator";
        return JuqingScreenMediator;
    }(puremvc.Mediator));
    mx.JuqingScreenMediator = JuqingScreenMediator;
    __reflect(JuqingScreenMediator.prototype, "mx.JuqingScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JuqingScreenMediator.js.map
/**
 @author cy
 *   @date 2016.12.1
 *   @desc 任务弹窗mediator
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
    var TaskViewMediator = (function (_super) {
        __extends(TaskViewMediator, _super);
        function TaskViewMediator(viewComponent) {
            var _this = _super.call(this, TaskViewMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TaskViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TaskViewMediator.prototype.onRemove = function () {
            this.view.ef_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        TaskViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.TASK_EF,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        TaskViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.TASK_EF:
                    view.show_ef();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.AVG_END:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    break;
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_pop();
                    break;
            }
        };
        TaskViewMediator.prototype.show_guide = function (gkey) {
            var tar = this.view.task_list.getChildAt(0);
            var item = tar.data;
            var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
            switch (gkey) {
                case "v_rw_jl"://第一次领取奖励
                    tar.fun_b.dispatchEvent(evt);
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    break;
                case "v_rw_qwjq"://第一次主线任务剧情
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_rw", "touch": "v_rw_qwfb"
                    });
                    tar.fun_b.dispatchEvent(evt);
                    break;
                case "v_rw_qwfb"://第一次任务打副本
                    tar.fun_b.dispatchEvent(evt);
                    break;
            }
        };
        TaskViewMediator.prototype.init_view = function () {
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                this.view.ef_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            }
        };
        TaskViewMediator.prototype.mx_test = function (event) {
            this.view.ef_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        TaskViewMediator.NAME = "TaskViewMediator";
        return TaskViewMediator;
    }(puremvc.Mediator));
    mx.TaskViewMediator = TaskViewMediator;
    __reflect(TaskViewMediator.prototype, "mx.TaskViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TaskViewMediator.js.map
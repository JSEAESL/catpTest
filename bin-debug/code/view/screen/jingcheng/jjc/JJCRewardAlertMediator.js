/**
 *   @author cy
 *   @date 2017.3.13
 *   @desc jjc编队 Mediator
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
    var JJCRewardAlertMediator = (function (_super) {
        __extends(JJCRewardAlertMediator, _super);
        function JJCRewardAlertMediator(viewComponent) {
            var _this = _super.call(this, JJCRewardAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JJCRewardAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JJCRewardAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        JJCRewardAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    if (type == mx.JJCRewardAlert.S_NAME) {
                        this.init_view();
                    }
                    break;
            }
        };
        Object.defineProperty(JJCRewardAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JJCRewardAlertMediator.prototype.init_view = function () {
            var view = this.view;
            var proxy = this.proxy;
            var max_rank = proxy.max_rank;
            var lq_id = proxy.lq_state;
            var arr = [];
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.JJCAWARD);
            var index = -1;
            for (var k in apis) {
                var state = 0; //未达成
                if (Number(max_rank) <= Number(apis[k].rank)) {
                    if (Number(apis[k].id) >= Number(lq_id)) {
                        state = 2; //已领取
                    }
                    else if (Number(apis[k].id) == Number(lq_id) - 1) {
                        state = 1; //已达成可领取
                        index = Number(k);
                    }
                    else {
                        state = 3; //待领取
                    }
                }
                arr.push({
                    "id": Number(apis[k].id),
                    "state": state,
                    "num": apis[k].num,
                    "rank": apis[k].rank,
                });
            }
            view.award_list.itemRenderer = mx.JJCRewardRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
            view.award_list.validateNow();
            if (index > 8) {
                view.award_s.viewport.scrollV = (index - 7) * 75;
            }
            view.rank_t.text = max_rank;
        };
        JJCRewardAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.award_list.dataProvider = null;
        };
        JJCRewardAlertMediator.NAME = "JJCRewardAlertMediator";
        return JJCRewardAlertMediator;
    }(puremvc.Mediator));
    mx.JJCRewardAlertMediator = JJCRewardAlertMediator;
    __reflect(JJCRewardAlertMediator.prototype, "mx.JJCRewardAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JJCRewardAlertMediator.js.map
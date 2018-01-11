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
 * @cy/2017.3.13
 *  jjc编队alert
 */
var mx;
(function (mx) {
    var JJCQueAlert = (function (_super) {
        __extends(JJCQueAlert, _super);
        function JJCQueAlert(data) {
            var _this = _super.call(this, data) || this;
            _this.type = data;
            return _this;
        }
        JJCQueAlert.mx_support = function () {
            return ["assets.jjc_que", "data.2109"];
        };
        JJCQueAlert.prototype.init_view_by_type = function () {
            this.enemy_list.itemRenderer = this.hero_list.itemRenderer = this.mine_list.itemRenderer = mx.TeamHeroRender;
            var hProxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME);
            var tid = 0;
            switch (this.type) {
                case 1:
                    tid = 12;
                    break;
                case 2:
                    tid = 11;
                    break;
                case 3:
                    tid = 1;
                    break;
            }
            this.prev_buzhen = mx.FightTools.object_clone(hProxy.get_buzhen(tid));
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JJCQueAlertMediator(this));
        };
        JJCQueAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JJCQueAlertMediator.NAME);
        };
        JJCQueAlert.prototype.close_self = function () {
            var hProxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME);
            var facade = mx.ApplicationFacade.getInstance();
            var tid = 0;
            switch (this.type) {
                case 1:
                    tid = 12;
                    break;
                case 2:
                    tid = 11;
                    break;
                case 3:
                    tid = 1;
                    break;
            }
            hProxy.set_buzhen(this.prev_buzhen, tid);
            for (var i = 1; i < 7; ++i) {
                if (!this.prev_buzhen[i]) {
                    this.prev_buzhen[i] = null;
                }
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_BUZHEN_INFO,
                "team_id": tid,
                "zhanwei": JSON.stringify(this.prev_buzhen)
            });
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, JJCQueAlert.S_NAME);
        };
        JJCQueAlert.S_NAME = "JJCQueAlert";
        JJCQueAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return JJCQueAlert;
    }(mx.AlertView));
    mx.JJCQueAlert = JJCQueAlert;
    __reflect(JJCQueAlert.prototype, "mx.JJCQueAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCQueAlert.js.map
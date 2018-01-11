/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 兑换Mediator
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
    var TeamDHMediator = (function (_super) {
        __extends(TeamDHMediator, _super);
        function TeamDHMediator(viewComponent) {
            var _this = _super.call(this, TeamDHMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TeamDHMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TeamDHMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        TeamDHMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (notification.getType() == mx.TeamDHScreen.S_NAME) {
                    }
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    this.view.fresh_cscreen();
                    break;
                default:
                    break;
            }
        };
        TeamDHMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            var tar;
            switch (gkey) {
                case "s_dh_l1"://点击第一个美男
                    tar = view.hero_list.getChildAt(0);
                    var c_d = tar.data;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroInfoView.S_NAME,
                        "param": {
                            "hero": c_d.id,
                            "type": 'not',
                            "need": c_d.need,
                            "now": c_d.now,
                            "coin": c_d.coin
                        },
                    });
                    break;
                case "v_av_ok"://确定兑换
                    tar = view.hero_list.getChildAt(0);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AlertView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHERO_LHSDH,
                        "mid": tar.data.id,
                    });
                    break;
                case "v_xxh_qd"://获得鬼谷子跳回团队
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XXiuHeroAlert.S_NAME);
                    if (mx.MX_COMMON.IN_GUIDE == 1) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamScreen.S_NAME);
                    }
                    else if (mx.MX_COMMON.IN_GUIDE == 2) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                    break;
                default:
                    break;
            }
        };
        TeamDHMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                var view = this.view;
                var tar = view.hero_list.getChildAt(0);
                if (tar) {
                    var data = tar.data;
                    if (data && Number(data.id) == 4) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        return;
                    }
                }
                this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
            }
        };
        TeamDHMediator.NAME = "TeamDHMediator";
        return TeamDHMediator;
    }(puremvc.Mediator));
    mx.TeamDHMediator = TeamDHMediator;
    __reflect(TeamDHMediator.prototype, "mx.TeamDHMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TeamDHMediator.js.map
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
    var PalaceMediator = (function (_super) {
        __extends(PalaceMediator, _super);
        function PalaceMediator(viewComponent) {
            return _super.call(this, PalaceMediator.NAME, viewComponent) || this;
        }
        PalaceMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.AVG_END,
            ];
        };
        PalaceMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.AVG_END://难产剧情结束
                    if (type == "ld" || type == "ldzn") {
                        this.czfl(); //处置俘虏
                    }
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                    break;
                default:
                    break;
            }
        };
        PalaceMediator.prototype.czfl = function () {
            var proxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var cd = proxy.fl;
            if (!cd) {
                return;
            }
            var mid = cd.id;
            proxy.fl = null;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": mid,
                "type": 8
            });
        };
        PalaceMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_hg_yxd"://养心殿
                    var net1 = [
                        {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }
                    ];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.YXDianScreen.S_NAME,
                        "param": { "net": net1 }
                    });
                    break;
                case "s_hg_xq"://省亲
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XQBYuanScreen.S_NAME);
                    break;
                case "s_hg_hzs"://皇子所
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
                case "s_hg_zxd"://储秀宫
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_CXG_DATA });
                    break;
                case "s_m_mr":
                    var net = [
                        {
                            "t": mx.MX_NETS.CS_HERO_LIST
                        },
                        {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        },
                        {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "1|2|3|4|5|6"
                        }
                    ];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TeamScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        PalaceMediator.NAME = "PalaceMediator";
        return PalaceMediator;
    }(puremvc.Mediator));
    mx.PalaceMediator = PalaceMediator;
    __reflect(PalaceMediator.prototype, "mx.PalaceMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PalaceMediator.js.map
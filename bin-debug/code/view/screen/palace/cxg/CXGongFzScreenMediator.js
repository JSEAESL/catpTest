/**
 @author mx wf
 *   @date 2016.10.9
 *   @desc 储秀宫妃子信息
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
    var CXGFeiZiInfoMediator = (function (_super) {
        __extends(CXGFeiZiInfoMediator, _super);
        function CXGFeiZiInfoMediator(viewComponent) {
            return _super.call(this, CXGFeiZiInfoMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(CXGFeiZiInfoMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        CXGFeiZiInfoMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CXG_XPIN_SUC,
                mx.MX_NOTICE.SHOW_ALERT,
                mx.MX_NOTICE.NAME_CIMING,
                mx.MX_NOTICE.AVG_END,
            ];
        };
        CXGFeiZiInfoMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.CXG_XPIN_SUC:
                    view.xpin_suc(data);
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    if (mx.AppConfig.PREV_SCENE_ID == mx.LDOtherScreen.S_NAME) {
                        if (lproxy.ld_type) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                't': mx.MX_NETS.CS_LUEDUO_OTHER,
                                'type': lproxy.ld_type + 1,
                                'page': lproxy["ldpage" + (lproxy.ld_type + 1)]
                            });
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherScreen.S_NAME);
                        }
                    }
                    else if (mx.AppConfig.PREV_SCENE_ID == mx.ChatScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ChatScreen.S_NAME);
                    }
                    else {
                        lproxy.check_fl();
                    }
                    break;
                case mx.MX_NOTICE.NAME_CIMING:
                    var fz = view.feizi.data;
                    view.name_t.text = (fz.xing + data || '');
                    fz.name = data;
                    break;
                case mx.MX_NOTICE.AVG_END:
                    this.czfl();
                    break;
            }
        };
        CXGFeiZiInfoMediator.prototype.czfl = function () {
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
        CXGFeiZiInfoMediator.NAME = "CXGFeiZiInfoMediator";
        return CXGFeiZiInfoMediator;
    }(puremvc.Mediator));
    mx.CXGFeiZiInfoMediator = CXGFeiZiInfoMediator;
    __reflect(CXGFeiZiInfoMediator.prototype, "mx.CXGFeiZiInfoMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=CXGongFzScreenMediator.js.map
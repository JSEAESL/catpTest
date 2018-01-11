/**
 @author wf
 *   @date 2016.10.9
 *   @desc 皇子所mediator
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
    var ShiJianScreenMediator = (function (_super) {
        __extends(ShiJianScreenMediator, _super);
        function ShiJianScreenMediator(viewComponent) {
            return _super.call(this, ShiJianScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ShiJianScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ShiJianScreenMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        ShiJianScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var proxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.SJ_SBING_CLEAR:
                    var sb_info = proxy.sjian_info;
                    for (var i in sb_info.siwang) {
                        var unit = sb_info.siwang[i];
                        if (unit.a_id == data) {
                            sb_info.siwang.splice(i, 1);
                            break;
                        }
                    }
                    this.view.show_list();
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    switch (Number(data)) {
                        case 2026:
                        case 2027:
                        case 2028:
                        case 2029:
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShiJianCiYaoView.S_NAME, "param": proxy.cur_sel_sbzn });
                            break;
                    }
                    break;
                case mx.MX_NOTICE.SJ_SBING_UPDATE:
                    var info = proxy.sjian_info;
                    for (var i in info.sb) {
                        var unit = info.sb[i];
                        if (typeof unit.id == 'undefined') {
                            if (unit.zinv_id == data.zinv_id) {
                                info.sb[i].sb_level = data.up.sb_level;
                                if (Number(data.up.sb_level) == 0) {
                                    info.sb.splice(i, 1);
                                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ShiJianCiYaoView.S_NAME);
                                }
                                break;
                            }
                        }
                        else {
                            if (unit.id == data.id) {
                                info.sb[i].sb_level = data.up.sb_level;
                                if (Number(data.up.sb_level) == 0) {
                                    info.sb.splice(i, 1);
                                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ShiJianCiYaoView.S_NAME);
                                }
                                break;
                            }
                        }
                    }
                    this.view.show_list();
                    break;
                case mx.MX_NOTICE.SJ_SBING_FRESH:
                case mx.MX_NOTICE.UPDATE_SJIAN_LYIN:
                    this.view.show_list();
                    break;
                default:
                    break;
            }
        };
        ShiJianScreenMediator.NAME = "ShiJianScreenMediator";
        return ShiJianScreenMediator;
    }(puremvc.Mediator));
    mx.ShiJianScreenMediator = ShiJianScreenMediator;
    __reflect(ShiJianScreenMediator.prototype, "mx.ShiJianScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianScreenMediator.js.map
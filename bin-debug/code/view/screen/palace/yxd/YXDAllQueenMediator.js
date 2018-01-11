/**
 @author cy
 *   @date 2016.11.3
 *   @desc 养心殿-一览
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
    var YXDAllQueenMediator = (function (_super) {
        __extends(YXDAllQueenMediator, _super);
        function YXDAllQueenMediator(viewComponent) {
            return _super.call(this, YXDAllQueenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(YXDAllQueenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YXDAllQueenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        YXDAllQueenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.RECORD_SCROLLV,
                mx.MX_NOTICE.FRESH_FZ_LIST,
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        YXDAllQueenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.RECORD_SCROLLV:
                    //let proxy = <PalaceProxy><any> this.facade.retrieveProxy(PalaceProxy.NAME);
                    this.proxy.scrollv = view.all_s.viewport.scrollV;
                    break;
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    view.fresh_cheroes();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        YXDAllQueenMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_yxd_fl1":
                    var view = this.view;
                    var tar = view.all_list.getChildAt(0);
                    var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    tar.dispatchEvent(evt);
                    break;
                case "s_yxd_tg":
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "s_fz_syd":
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var c_mn = pproxy.get_curr_mn();
                    var item_id = 2018;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_SCDJ,
                        "id": c_mn.id,
                        "item_id": item_id,
                        "zinv_id": 0
                    });
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    var net = [{
                            "t": mx.MX_NETS.CS_HG_SHIJIAN,
                            "type": 1
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        YXDAllQueenMediator.NAME = "YXDAllQueenMediator";
        return YXDAllQueenMediator;
    }(puremvc.Mediator));
    mx.YXDAllQueenMediator = YXDAllQueenMediator;
    __reflect(YXDAllQueenMediator.prototype, "mx.YXDAllQueenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDAllQueenMediator.js.map
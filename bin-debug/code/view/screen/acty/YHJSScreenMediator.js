/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc 妖狐降世mediator
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
    var YHJSScreenMediator = (function (_super) {
        __extends(YHJSScreenMediator, _super);
        function YHJSScreenMediator(viewComponent) {
            return _super.call(this, YHJSScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(YHJSScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YHJSScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.FRESH_YHJINDU,
                mx.MX_NOTICE.YIWEI_YAOHU,
                mx.MX_NOTICE.PACK_ITEMS_BACK
            ];
        };
        YHJSScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_TIME:
                    if (notification.getType() == "hyjs") {
                        view.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_YHJINDU:
                    view.fresh_jindu();
                    break;
                case mx.MX_NOTICE.YIWEI_YAOHU:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XXiuHeroAlert.S_NAME,
                        "param": {
                            "id": 307,
                        }
                    });
                    view.fshen_g.visible = true;
                    view.fresh_jindu();
                    break;
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    if (view.fshen_g.visible) {
                        view.proxy.yaohu_tiaozhuan = true;
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CHERO_INFO,
                            "id": view.proxy.yaohu_shicong_id,
                        });
                        break;
                    }
            }
        };
        YHJSScreenMediator.NAME = "YHJSScreenMediator";
        return YHJSScreenMediator;
    }(puremvc.Mediator));
    mx.YHJSScreenMediator = YHJSScreenMediator;
    __reflect(YHJSScreenMediator.prototype, "mx.YHJSScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YHJSScreenMediator.js.map
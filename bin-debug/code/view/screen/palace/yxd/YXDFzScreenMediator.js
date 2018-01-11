/**
 @author mx
 *   @date 2016.10.9
 *   @desc 养心殿-侍寝
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
    var YXDFzScreenMediator = (function (_super) {
        __extends(YXDFzScreenMediator, _super);
        function YXDFzScreenMediator(viewComponent) {
            var _this = _super.call(this, YXDFzScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(YXDFzScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YXDFzScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        YXDFzScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.FRESH_WEIFEN,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.RENLIANRONGHE,
                mx.MX_NOTICE.FRESH_FZ_LIST,
                mx.MX_NOTICE.HUAPI_SUCC,
                mx.MX_NOTICE.AVG_END
            ];
        };
        YXDFzScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2000) {
                        view.fresh_ltp_num();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_WEIFEN:
                    view.fresh_weifen();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    var ctype = notification.getType();
                    if (ctype == mx.YXDFzScreen.S_NAME) {
                        view.fresh_screen();
                        view.fresh_weifen();
                    }
                    break;
                case mx.MX_NOTICE.RENLIANRONGHE:
                    view.init_lh();
                    break;
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    if (data == 'die_fz') {
                        view.open_die_fz();
                    }
                    else {
                        view.fresh_ltp_num();
                    }
                    break;
                case mx.MX_NOTICE.HUAPI_SUCC:
                    view.init_lh();
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.DieFzView.S_NAME);
                    break;
                case mx.MX_NOTICE.AVG_END:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    break;
            }
        };
        YXDFzScreenMediator.prototype.show_guide = function (gkey) {
            var list = this.view.fzcz_list;
            var evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
            var tar;
            switch (gkey) {
                case "s_fz_dj"://赏赐道具
                    tar = list.getChildAt(1);
                    evt.item = tar.data;
                    list.dispatchEvent(evt);
                    // this.sendNotification(MX_NOTICE.SKIP_GUIDE, {
                    //     "gkey": "m_hzs", "touch": "s_m_hg"
                    // });//跳到皇子引导
                    // let net = [{
                    //     "t": MX_NETS.CS_HG_SHIJIAN,
                    //     "type": 1
                    // }];
                    // this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname" : PalaceScreen.S_NAME,
                    //     "param" : {"net" : net}
                    // });
                    break;
                case "s_fz_tw"://自动探望
                    tar = list.getChildAt(0);
                    evt.item = tar.data;
                    list.dispatchEvent(evt);
                    break;
                case "s_fz_fh"://返回养心殿
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, { "sname": mx.YXDianScreen.S_NAME, "param": { "tab": "all" } });
                    break;
            }
        };
        YXDFzScreenMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.view.fzcz_list.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        YXDFzScreenMediator.prototype.mx_test = function (event) {
            this.view.fzcz_list.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        YXDFzScreenMediator.NAME = "YXDFzScreenMediator";
        return YXDFzScreenMediator;
    }(puremvc.Mediator));
    mx.YXDFzScreenMediator = YXDFzScreenMediator;
    __reflect(YXDFzScreenMediator.prototype, "mx.YXDFzScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDFzScreenMediator.js.map
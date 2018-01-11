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
    var YXDGiftMediator = (function (_super) {
        __extends(YXDGiftMediator, _super);
        function YXDGiftMediator(viewComponent) {
            var _this = _super.call(this, YXDGiftMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(YXDGiftMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YXDGiftMediator.prototype.onRemove = function () {
            this.view.item_list.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        YXDGiftMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        YXDGiftMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    view.fresh_view(data);
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.AVG_END://AVG播放结束。
                    if (mx.MX_COMMON.IN_GUIDE) {
                        var net = [{
                                "t": mx.MX_NETS.CS_HG_SHIJIAN,
                                "type": 1
                            }];
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.PalaceScreen.S_NAME,
                            "param": { "net": net }
                        });
                        // this.sendNotification(MX_NOTICE.GET_GUIDE);
                    }
                    else {
                        if (this.view.use_syd) {
                            var net = [{
                                    "t": mx.MX_NETS.CS_HG_SHIJIAN,
                                    "type": 1
                                }];
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                "sname": mx.PalaceScreen.S_NAME,
                                "param": { "net": net }
                            });
                        }
                        else if (notification.getType() == "scdj") {
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                        }
                    }
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_currency();
                    break;
            }
        };
        YXDGiftMediator.prototype.show_guide = function (gkey) {
            var list, tar;
            switch (gkey) {
                case "s_fz_syd"://赏赐道具
                    list = this.view.item_list;
                    tar = list.getChildAt(0);
                    var cd = tar.data;
                    if (cd.num) {
                        var evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                        evt.item = cd;
                        list.dispatchEvent(evt);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                    break;
                case "v_av_ok"://确定使用速孕丹
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AlertView.S_NAME);
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var c_mn = pproxy.get_curr_mn();
                    list = this.view.item_list;
                    tar = list.getChildAt(0);
                    var item = tar.data;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_SCDJ,
                        "id": c_mn.id,
                        "item_id": item.cid,
                        "zinv_id": 0
                    });
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    // if(MX_COMMON.IN_GUIDE){
                    //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, PalaceScreen.S_NAME);
                    // }
                    break;
                case "s_fz_fh"://后宫主页
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
        YXDGiftMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.view.item_list.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        YXDGiftMediator.prototype.mx_test = function (event) {
            this.view.item_list.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        YXDGiftMediator.NAME = "YXDGiftMediator";
        return YXDGiftMediator;
    }(puremvc.Mediator));
    mx.YXDGiftMediator = YXDGiftMediator;
    __reflect(YXDGiftMediator.prototype, "mx.YXDGiftMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDGiftMediator.js.map
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
    var YXDShiQinMediator = (function (_super) {
        __extends(YXDShiQinMediator, _super);
        function YXDShiQinMediator(viewComponent) {
            var _this = _super.call(this, YXDShiQinMediator.NAME, viewComponent) || this;
            _this.can_skip_guide = true;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(YXDShiQinMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YXDShiQinMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        YXDShiQinMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_FZ_LIST,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.YXDALLQUEEN_CREATED,
                mx.MX_NOTICE.PAGE_CHANGE,
            ];
        };
        YXDShiQinMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    if (view.isTx) {
                        view.fresh_friend_hg();
                        break;
                    }
                    view.fresh_shiqin_list(data);
                    if (mx.MX_COMMON.IN_GUIDE) {
                        var mns = this.proxy.get_mn_list("notype"); //获取所有妃子
                        if (!mns.length) {
                            this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        }
                    }
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.AVG_END:
                    view.fresh_shiqin_list();
                    break;
                case mx.MX_NOTICE.YXDALLQUEEN_CREATED:
                    this.can_skip_guide = false;
                    break;
                case mx.MX_NOTICE.PAGE_CHANGE:
                    if (view.isTx || view.isLD) {
                        view.set_tx_page();
                    }
                    break;
            }
        };
        YXDShiQinMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_yxd_l1"://侍寝第一个妃子
                    var view = this.view;
                    var tar = view.pageui.list0.getChildAt(0);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_SHIQIN,
                        "id": Number(tar.data.id),
                    });
                    break;
                case "j_yxd_m"://约会回到主页
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        YXDShiQinMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                var view = this.view;
                var dp = view.pageui.list0.dataProvider;
                if (!dp.length) {
                    var mns = this.proxy.get_mn_list("notype");
                    if (mns.length) {
                        var mn = mns[0];
                        if (mn.status == 2 || mn.status == 3 || mn.status == 4) {
                            //探望过了就进入胎果引导
                            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
                            var sydan_num = pproxy.get_item_num(2000);
                            if (sydan_num <= 3) {
                                this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                                    "gkey": "m_yxd", "touch": "s_fz_fh"
                                });
                                view.yxd_need_change_tab = true;
                            }
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                                "gkey": "m_yxd", "touch": "s_yxd_l1", "gid": 54
                            });
                        }
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                }
            }
        };
        YXDShiQinMediator.NAME = "YXDShiQinMediator";
        return YXDShiQinMediator;
    }(puremvc.Mediator));
    mx.YXDShiQinMediator = YXDShiQinMediator;
    __reflect(YXDShiQinMediator.prototype, "mx.YXDShiQinMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDShiQinMediator.js.map
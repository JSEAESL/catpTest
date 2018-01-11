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
 * cy@2016/08/19
 * daiqi-2017-7-6
 */
var mx;
(function (mx) {
    var MainTabMenuMediator = (function (_super) {
        __extends(MainTabMenuMediator, _super);
        function MainTabMenuMediator(viewComponent) {
            var _this = _super.call(this, MainTabMenuMediator.NAME, viewComponent) || this;
            _this.init_view();
            _this.init_listener();
            _this.sendNotification(mx.MX_NOTICE.TABMENU_CREATED);
            return _this;
        }
        Object.defineProperty(MainTabMenuMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        MainTabMenuMediator.prototype.onRemove = function () {
            MainTabMenuMediator.TAB_CREATED = false;
            var view = this.view;
            view.tab_list.dataProvider = null;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        MainTabMenuMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.NEW_TISHI_MSG,
                mx.MX_NOTICE.NEW_XIAOHONGDIAN,
            ];
        };
        MainTabMenuMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    if (this.new_msg) {
                        this.new_msg = false;
                        this.init_view();
                    }
                    this.check_xuanxiu();
                    break;
                case mx.MX_NOTICE.NEW_TISHI_MSG: //新的提示消息
                case mx.MX_NOTICE.NEW_XIAOHONGDIAN://新的提示消息
                    this.new_msg = true;
                    break;
            }
        };
        MainTabMenuMediator.prototype.show_guide = function (gkey) {
            var net = [];
            switch (gkey) {
                case "s_mt_xx":
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME);
                    break;
                case "s_mt_jc":
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.JingChengScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case "s_mt_hg":
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }, {
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
        MainTabMenuMediator.prototype.init_view = function () {
            var view = this.view;
            var list = view.tab_list;
            var arr = mx.MX_COMMON.MAIN_TAB.concat();
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.fresh_menu_tishi();
            var tishi = gproxy.tishi_data;
            var c_arr = [];
            for (var i = 0, ln = arr.length; i < ln; i++) {
                var cd = {
                    "bg": arr[i] + "_png",
                    "ts": tishi[arr[i]],
                };
                c_arr.push(cd);
            }
            list.dataProvider = null;
            list.dataProvider = new eui.ArrayCollection(c_arr);
            MainTabMenuMediator.TAB_CREATED = true;
            list.validateNow();
        };
        MainTabMenuMediator.prototype.check_xuanxiu = function () {
            var xproxy = this.facade.retrieveProxy(mx.XXiuProxy.NAME);
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var tishi = gproxy.tishi_data;
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            if (!tishi.xuxiu && (now_time >= xproxy.old_time + xproxy.ybicd)) {
                this.new_msg = true;
            }
            var server_time = now_time - xproxy.old_time + xproxy.server_xuanxiu_time;
            var now_hour = Number(new Date(server_time * 1000).getHours());
            var old_hour = Number(new Date(xproxy.server_xuanxiu_time * 1000).getHours());
            if (now_hour < old_hour) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_XXIU_INFO,
                    "skip": true
                });
            }
        };
        MainTabMenuMediator.prototype.init_listener = function () {
            this.view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        //仅当选中索引发生改变时触发
        MainTabMenuMediator.prototype.onTabChange = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var cd = e.item.bg;
            var net = [];
            switch (cd) {
                // case "main_png":
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, MainScreen.S_NAME);
                //     break;
                case "palace_png":
                    net = [
                        {
                            "t": mx.MX_NETS.CS_HG_SHIJIAN,
                            "type": 1
                        }, {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }
                    ];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                // case "mnan_png"://需要先请求道具，然后处理提示信息，在打开团队界面
                //     net = [
                //         {
                //             "t": MX_NETS.CS_INIT_SKILL
                //         }, {
                //             "t": MX_NETS.CS_PACK_TYPE_ITEM,
                //             "type": "1|2|3|4|5|6"
                //         }];
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                //         "sname" : TeamScreen.S_NAME,
                //         "param" : {"net" : net}
                //     });
                //     break;
                case "xuxiu_png":
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME);
                    break;
                case "risk_png":
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.JingChengScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                // case "shequn_png"://社交-好友
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, FriendScreen.S_NAME);
                //     break;
                case "cloth_png"://时装
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
                    break;
                case "union_png"://家族
                    mx.UnionScreen.P_NAME = mx.MainScreen.S_NAME;
                    mx.UnionMainScreen.P_NAME = mx.MainScreen.S_NAME;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_INIT,
                    });
                    break;
                case "shop_png"://商店
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                case "story_png":
                    var fProxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.cur_chapter = 1;
                    fProxy.cur_stage = 1;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_INFO,
                        'chapter': fProxy.cur_chapter
                    });
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
            }
        };
        MainTabMenuMediator.NAME = "MainTabMenuMediator";
        return MainTabMenuMediator;
    }(puremvc.Mediator));
    mx.MainTabMenuMediator = MainTabMenuMediator;
    __reflect(MainTabMenuMediator.prototype, "mx.MainTabMenuMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=MainTabMenuMediator.js.map
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
    var HZSuoScreenMediator = (function (_super) {
        __extends(HZSuoScreenMediator, _super);
        function HZSuoScreenMediator(viewComponent) {
            var _this = _super.call(this, HZSuoScreenMediator.NAME, viewComponent) || this;
            _this.cur_type = 1; //1未婚子女 2出嫁子女 3私生子
            _this.pageitem = 4; //每页条目数
            _this.setpage = false; //翻页请求
            _this.init_view();
            _this.init_listener();
            return _this;
        }
        Object.defineProperty(HZSuoScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HZSuoScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.hz_list.dataProvider = null;
            view.type_list.dataProvider = null;
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.add_pos, this);
        };
        HZSuoScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_HZS,
                mx.MX_NOTICE.SHOW_ALERT,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.AVG_END,
            ];
        };
        HZSuoScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.UPDATE_HZS:
                    if (this.setpage) {
                        this.setpage = false;
                        if (this.view.hz_scro.viewport) {
                            this.view.hz_scro.viewport.scrollV = 0;
                        }
                    }
                    this.show_items();
                    break;
                case mx.MX_NOTICE.SHOW_ALERT:
                    var wproxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    wproxy.dr_flag = false;
                    break;
                case mx.MX_NOTICE.AVG_END:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    break;
            }
        };
        HZSuoScreenMediator.prototype.show_guide = function (gkey) {
            var tar, cd;
            var proxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (gkey) {
                case "s_hz_js1": //皇子第1次加速
                case "s_hz_js2"://皇子第2次加速
                    tar = this.view.hz_list.getChildAt(0);
                    cd = tar.data;
                    proxy.cur_hzs_type = cd.type; //???
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HZS_SPEED, 'id': cd.id, 'jieduan': cd.zhuangtai
                    });
                    break;
                case "s_hz_cm"://第一个皇子赐名
                    tar = this.view.hz_list.getChildAt(0);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzEditPop.S_NAME,
                        param: { "type": 1, "data": tar.data }
                    });
                    break;
                case "s_hz_cf"://第一个皇子册封
                    tar = this.view.hz_list.getChildAt(0);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzEditPop.S_NAME,
                        param: { type: 2, data: tar.data }
                    });
                    break;
                case "s_hz_ly"://第一个皇子结缘
                    tar = this.view.hz_list.getChildAt(0);
                    cd = tar.data;
                    proxy.cur_zn_info = cd;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinLxPop.S_NAME, param: cd });
                    break;
                case "v_ly_l1"://向所有君主结缘。
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HzLyinLxPop.S_NAME);
                    tar = this.view.hz_list.getChildAt(0);
                    cd = tar.data;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzLyinPop.S_NAME,
                        param: { type: 1, data: cd }
                    });
                    break;
                case "v_hz_sy":
                case "v_hz_zd":
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "v_hz_nwf"://第一个皇子内务府
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HzLyinLxPop.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HZS_LIANYIN_NWF,
                        "id": proxy.cur_zn_info.id,
                        "hunpei": mx.Tools.random_guanzhi(),
                        "yindao": 1
                    });
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    break;
                case "s_hz_fh"://返回后宫主页
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_zxd", "touch": "s_m_hg"
                    });
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
                    break;
                case "s_hz_hd"://皇子互动
                    tar = this.view.hz_list.getChildAt(0);
                    var d = tar.data;
                    var state = Number(d.zhuangtai);
                    proxy.cur_zn_info = d;
                    proxy.hzhd_bg = mx.Tools.get_bb_res("znbg", state, d.avatar, Number(d.meili));
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": Number(d.id) + 1000,
                        "type": 10
                    });
                    break;
                case "s_zn_tw2":
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        'gkey': 'm_wxhz', 'touch': 's_m_hg'
                    });
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
                    break;
                case "v_pa_ok"://领取奖励
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PRewardAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "s_hzs_tx"://因为init_view里面已经处理了进入皇子所的逻辑
                    //this.sendNotification(MX_NOTICE.GET_GUIDE);
                    break;
            }
        };
        Object.defineProperty(HZSuoScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HZSuoScreenMediator.prototype.init_view = function () {
            var view = this.view;
            this.cur_type = this.proxy.cur_hzs_type;
            view.bottom_g.visible = this.cur_type == 1;
            view.type_list.selectedIndex = this.cur_type - 1;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.show_items();
            if (mx.MX_COMMON.IN_GUIDE) {
                if (view.hz_list.numChildren) {
                    var gproxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
                    var gapi = gproxy.get_curr_guide();
                    if (gapi && (gapi.jqid == 'm_wxhz' || gapi.jqid == 'm_hzszy' || gapi.jqid == "m_hzs")) {
                        this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        return;
                    }
                    else {
                        var hz = view.hz_list.getChildAt(0);
                        hz = hz.data;
                        if (hz.name && hz.name != "") {
                            this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                        }
                    }
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    return;
                }
                this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
        };
        HZSuoScreenMediator.prototype.init_listener = function () {
            var view = this.view;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add_pos, this);
        };
        HZSuoScreenMediator.prototype.set_page = function (e) {
            var view = this.view;
            var proxy = this.proxy;
            var type = this.cur_type;
            var page = proxy['hzs_page' + type];
            var total = Math.ceil(proxy['hzs_total' + type] / this.pageitem);
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                case view.prev_b:
                    newpage = e.currentTarget == view.sye_b ? 1 : Math.max(1, page - 1);
                    break;
                case view.wye_b:
                case view.next_b:
                    newpage = e.currentTarget == view.wye_b ? total : Math.min(total, page + 1);
                    break;
            }
            proxy['hzs_page' + type] = newpage;
            if (page == newpage) {
                return;
            }
            this.setpage = true;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZS_DATA, type: type, page: newpage });
        };
        HZSuoScreenMediator.prototype.add_pos = function (e) {
            var money = 200;
            var data = {
                name: mx.AlertView.S_NAME,
                param: {
                    notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                    sdata_ok: {
                        t: mx.MX_NETS.CS_HZS_KUOJIAN
                    },
                    notice_exit: mx.MX_NOTICE.CLOSE_POP,
                    sdata_exit: mx.AlertView.S_NAME,
                    param: mx.Tools.format(mx.Lang.hzs01, money),
                }
            };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, data);
        };
        HZSuoScreenMediator.prototype.type_click = function (e) {
            this.proxy.cur_hzs_type = this.cur_type = e.itemIndex + 1;
            this.show_items();
        };
        /*--------------皇子列表-------------*/
        HZSuoScreenMediator.prototype.show_items = function (settime) {
            if (settime === void 0) { settime = false; }
            var view = this.view;
            var type = this.cur_type;
            var proxy = this.proxy;
            var listdata = [];
            var now_time = Math.floor(new Date().getTime() / 1000);
            var list_data = proxy['hzs_list' + type][proxy['hzs_page' + type]];
            view.bottom_g.visible = type == 1;
            view.page_g.bottom = type == 1 ? 125 : 28;
            view.hz_scro.bottom = type == 1 ? 186 : 80;
            view.page_g.visible = proxy['hzs_total' + type] > 0;
            var totalpage = Math.ceil(proxy['hzs_total' + type] / this.pageitem);
            view.page_t.text = proxy['hzs_page' + type] + '/' + totalpage;
            //更新当前页时间显示
            for (var i = 0; i < list_data.length; i++) {
                var d = list_data[i];
                if (!d)
                    continue;
                if (type == 1 && d.zhuangtai < 3) {
                    //成长时间
                    var t = 0;
                    if (d.over_time) {
                        t = Number(d.over_time) - now_time;
                    }
                    d.growtime = 0;
                    if (d.zhuangtai < 2) {
                        d.growtime = d.zhuangtai == 0 ? t - 7200 : t;
                        if (d.growtime <= 0) {
                            d.zhuangtai = d.zhuangtai == 0 ? 1 : 2;
                            if (d.zhuangtai == 1) {
                                d.pingjia = 0;
                            }
                            this.sendNotification(mx.MX_NOTICE.SET_HZ_DATA, { id: d.id, zhuangtai: d.zhuangtai, pingjia: d.pingjia });
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZS_DATA, type: 1, page: this.proxy.hzs_page1 });
                        }
                    }
                    d.type = 1;
                    listdata.push(d);
                }
                else if (type == 2 && (d.zhuangtai >= 3 || d.zhuangtai == -1)) {
                    d.type = 2;
                    listdata.push(d);
                }
                else if (type == 3) {
                    d.type = 3;
                    listdata.push(d);
                }
            }
            if (listdata.length == 0 && !mx.MX_COMMON.IN_GUIDE) {
                if (view.no_tip) {
                    view.removeChildAt(view.numChildren - 1);
                    view.no_tip = null;
                }
                var png = "";
                var txt = "";
                switch (type) {
                    case 1:
                        png = "pu";
                        txt = mx.Lang.hzs74;
                        break;
                    case 2:
                        png = "pu";
                        txt = mx.Lang.hzs72;
                        break;
                    case 3:
                        png = "xiao";
                        txt = mx.Lang.hzs73;
                        break;
                }
                view.no_tip = new mx.EmptyTip({
                    "xdz": png,
                    "text": txt
                });
                view.addChild(view.no_tip);
                view.hz_list.dataProvider = null;
            }
            else {
                if (view.no_tip) {
                    view.removeChildAt(view.numChildren - 1);
                    view.no_tip = null;
                }
                view.hz_list.dataProvider = new eui.ArrayCollection(listdata);
                view.validateNow();
            }
            view.xwei_t.text = mx.Tools.format(mx.Lang.hzs06, proxy.hzs_total1, proxy.hzs_xwei);
            if (mx.AppConfig.PREV_SCENE_ID == mx.FriendScreen.S_NAME && proxy.target_hz) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    name: mx.HzLyinPop.S_NAME,
                    param: { type: 2, data: proxy.target_hz }
                });
                proxy.target_hz = null;
            }
        };
        HZSuoScreenMediator.NAME = "HZSuoScreenMediator";
        return HZSuoScreenMediator;
    }(puremvc.Mediator));
    mx.HZSuoScreenMediator = HZSuoScreenMediator;
    __reflect(HZSuoScreenMediator.prototype, "mx.HZSuoScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HZSuoScreenMediator.js.map
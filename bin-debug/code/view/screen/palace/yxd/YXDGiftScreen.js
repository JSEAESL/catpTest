/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿赏赐妃子道具
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
    var YXDGiftScreen = (function (_super) {
        __extends(YXDGiftScreen, _super);
        function YXDGiftScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.use_syd = false;
            return _this;
        }
        YXDGiftScreen.mx_support = function () {
            return ["assets.palace_yxdsc", "api.EQUIP"];
        };
        YXDGiftScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_fz_syd"://速孕丹
                    tar = this.item_list.getChildAt(0);
                    tar = tar.sc_b;
                    break;
                case "s_fz_fh"://返回到后宫首页。
                    tar = this.back_b;
                    break;
                default:
                    break;
            }
            return tar;
        };
        YXDGiftScreen.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ybao_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            this.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_currency();
            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
            var arr = [];
            var base = [];
            if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                base = [
                    { "id": 2018, "color": 0x57acfc, 'notsell': false },
                    { "id": 2026, "color": 0xff64b1 },
                    { "id": 2027, "color": 0xff64b1 },
                    { "id": 2028, "color": 0xff64b1 },
                    { "id": 2001, "color": 0x64c66b },
                    { "id": 2006, "color": 0xfaa013 },
                    { "id": 2003, "color": 0xdd59f5 },
                    { "id": 2002, "color": 0xff2e18 },
                    { "id": 2023, "color": 0xff64b1, 'notsell': false },
                ];
            }
            else {
                base = [
                    { "id": 2018, "color": 0x57acfc, 'notsell': false },
                    { "id": 3040, "color": 0x57acfc, 'notsell': false },
                    //{ "id": 3038, "color": 0xff64b1 },//返祖丹
                    { "id": 2010, "color": 0xff64b1 },
                    { "id": 2026, "color": 0xff64b1 },
                    { "id": 2027, "color": 0xff64b1 },
                    { "id": 2028, "color": 0xff64b1 },
                    { "id": 2001, "color": 0x64c66b },
                    { "id": 2006, "color": 0xfaa013 },
                    { "id": 2003, "color": 0xdd59f5 },
                    { "id": 2002, "color": 0xff2e18 },
                    { "id": 2023, "color": 0xff64b1, 'notsell': false },
                ];
            }
            for (var k in base) {
                var c_d = base[k];
                var cid = c_d.id;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', cid);
                //屏蔽妃子下毒功能
                if (cid == 2002) {
                    continue;
                }
                arr.push({
                    "cid": cid,
                    "item": "item" + cid + "_png",
                    "num": pproxy.get_item_num(cid),
                    "price": api.Buyprice2 || mx.Lang.wu,
                    "name": api.name,
                    "ncolor": 0xffffff,
                    "desc": api.Description,
                    "notsell": typeof c_d.notsell != 'undefined'
                });
            }
            this.item_data = new eui.ArrayCollection(arr);
            this.item_list.dataProvider = this.item_data;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.YXDGiftMediator(this));
        };
        YXDGiftScreen.prototype.fresh_currency = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            view.ybao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
        };
        YXDGiftScreen.prototype.fresh_view = function (data) {
            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
            var c_d = this.item_data.source;
            for (var k in c_d) {
                var cd = c_d[k];
                if (cd.cid == data) {
                    var new_n = pproxy.get_item_num(data);
                    if (new_n < cd.num) {
                        switch (data) {
                            case "2018":
                                this.use_syd = true;
                                break;
                        }
                    }
                    cd.num = new_n;
                }
            }
        };
        YXDGiftScreen.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var item = e.item;
            if (item.num) {
                var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                var c_mn = mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? pproxy.cur_zn_info : pproxy.get_curr_mn();
                var status_1 = mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? c_mn.zhuangtai : c_mn.status;
                status_1 = String(status_1).split("|");
                var yun_arr = ["2", "3", "4"]; //是否怀孕
                var huaiyun = false;
                for (var m in yun_arr) {
                    if (status_1.indexOf(yun_arr[m]) >= 0) {
                        huaiyun = true;
                        break;
                    }
                }
                switch (item.cid) {
                    case 2010://温情酒
                        if (huaiyun) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": c_mn,
                                    "sctype": "fz_hy",
                                    "item_id": item.cid,
                                }
                            });
                            return;
                        }
                        else if (status_1.indexOf("1") >= 0) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": c_mn,
                                    "sctype": "fz_sb",
                                    "item_id": item.cid //物品id
                                }
                            });
                            return;
                        }
                        else if (status_1.indexOf("6") >= 0) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": c_mn,
                                    "sctype": "fz_cp",
                                    "item_id": item.cid //物品id
                                }
                            });
                            return;
                        }
                        break;
                    case 2001://甘露丸
                        if (status_1.indexOf("1")) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": c_mn,
                                    "sctype": "fz_sb",
                                    "item_id": item.cid //物品id
                                }
                            });
                            return;
                        }
                        break;
                    case 2018://速孕仙丹
                        if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                            if (typeof (c_mn.hun_id) == 'undefined' || c_mn.hunpei == '') {
                                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs54 });
                                return;
                            }
                        }
                        if (!huaiyun) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": c_mn,
                                    "sctype": "fz_hy",
                                    "item_id": item.cid //物品id
                                }
                            });
                            return;
                        }
                        break;
                    case 2023://生育恢复丹
                        if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs54 });
                            return;
                        }
                        break;
                }
                //"{0}是{1}，确定要将它赐给{2}吗？"
                var str = mx.Tools.format(mx.Lang.sc000, item.name, item.desc, c_mn.name);
                var param = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_FZ_SCDJ,
                            "id": mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? 0 : c_mn.id,
                            "item_id": item.cid,
                            "zinv_id": mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? c_mn.id : 0,
                            "type": "scdj"
                        },
                        "param": str,
                    }
                };
                //facade.sendNotification(MX_NOTICE.HIDE_GUIDE);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, param);
            }
            else {
                if (item.notsell) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sc009 });
                }
                else {
                    var a_d = {
                        "param": {
                            "num": 1,
                            "item": item.cid,
                        }
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.BuyAlertView.S_NAME,
                        "param": a_d
                    });
                }
            }
        };
        YXDGiftScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.use_syd) {
                var net = [
                    {
                        "t": mx.MX_NETS.CS_HG_SHIJIAN,
                        "type": 1
                    }
                ];
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                    "sname": mx.PalaceScreen.S_NAME,
                    "param": { "net": net }
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
            }
        };
        YXDGiftScreen.prototype.buy_yb = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
        };
        YXDGiftScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ybao_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            this.item_list.dataProvider = null;
            this.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDGiftMediator.NAME);
        };
        YXDGiftScreen.S_NAME = "YXDGiftScreen";
        return YXDGiftScreen;
    }(mx.BasicView));
    mx.YXDGiftScreen = YXDGiftScreen;
    __reflect(YXDGiftScreen.prototype, "mx.YXDGiftScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YXDGiftScreen.js.map
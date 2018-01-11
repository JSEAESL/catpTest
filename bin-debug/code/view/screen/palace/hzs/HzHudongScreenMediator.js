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
    var HzHudongScreenMediator = (function (_super) {
        __extends(HzHudongScreenMediator, _super);
        function HzHudongScreenMediator(viewComponent) {
            var _this = _super.call(this, HzHudongScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            _this.init_listener();
            return _this;
        }
        Object.defineProperty(HzHudongScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HzHudongScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.HZS_GUANXI_CHANGED,
                mx.MX_NOTICE.HZS_PINGJIA_CHANGED,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.HZS_ZHUANGTAI_CHANGED
            ];
        };
        HzHudongScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2019) {
                        this.view.fresh_sswj_num();
                    }
                    break;
                case mx.MX_NOTICE.HZS_GUANXI_CHANGED:
                    this.view.fresh_guanxi();
                    this.view.fresh_caiyi(); //1.消耗四书五经2.关系变化(有太傅)
                    break;
                case mx.MX_NOTICE.HZS_PINGJIA_CHANGED:
                    view.fresh_pingjia(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    view.fresh_xgs();
                    break;
                case mx.MX_NOTICE.AVG_END:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        if (notification.getType() == "guide") {
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        }
                    }
                    else if (this.proxy.pingjia_change) {
                        this.proxy.pingjia_change = false;
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs76 });
                    }
                    break;
                case mx.MX_NOTICE.HZS_ZHUANGTAI_CHANGED:
                    view.fresh_bb_res();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        HzHudongScreenMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_zn_tw"://皇子第1次加速
                    var view = this.view;
                    var c_mn = view.c_mn;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HZS_TANWANG,
                        "zinv_id": c_mn.id,
                        "first": 1
                    });
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    break;
                case "s_zn_tw1":
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
                case "s_zn_tw3"://探望带三段提示后出一段剧情
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": 32,
                            "type": "guide",
                        }
                    });
                    break;
            }
        };
        Object.defineProperty(HzHudongScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HzHudongScreenMediator.prototype.init_view = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.view.guide_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        HzHudongScreenMediator.prototype.mx_test = function (event) {
            this.view.guide_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HzHudongScreenMediator.prototype.init_listener = function () {
            var view = this.view;
            view.hpei_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hzscz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.xgscz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        HzHudongScreenMediator.prototype.onTabChange = function (e) {
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            var view = this.view;
            var c_mn = view.c_mn;
            switch (e.item.bg) {
                case "znhdtwang_png": //探望
                case "znhdzjian_png":
                    if (c_mn.type == 3) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs56 });
                        return;
                    }
                    var num = pproxy.res_sswj;
                    if (num < 1 && Number(c_mn.zhuangtai) < 2) {
                        var a_d = {
                            "param": {
                                "item": 2019,
                            }
                        };
                        var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HZS_TANWANG,
                            "zinv_id": c_mn.id
                        });
                    }
                    break;
                case "znhdznv_png"://子女  
                    if (Number(c_mn.zhuangtai) < 2) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs65 });
                    }
                    else if (Number(c_mn.zhuangtai) == 2) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs66 });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_YXD_CHILDREN,
                            "id": 0,
                            "zinv_id": c_mn.id
                        });
                    }
                    break;
                case "scdjaniu_png"://赏赐道具
                    var net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.YXDGiftScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case "znhdlrpjia_png"://评价
                    if (Number(c_mn.zhuangtai) >= 2) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hzs61, c_mn.name) });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HZS_PINGJIA,
                            "zinv_id": c_mn.id
                        });
                    }
                    break;
                case "znhdhyzji_png"://红颜知己
                    if (Number(c_mn.zhuangtai) < 2) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs69 });
                    }
                    else if (Number(c_mn.zhuangtai) == 2 || (Number(c_mn.zhuangtai) > 2 && typeof (c_mn.hun_id) == 'undefined')) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs70 });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HZS_HYZJ,
                            "page": 1,
                            "zinv_id": c_mn.id
                        });
                    }
                    break;
                case "znhdlyjshe_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    ;
                    // this.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name"  : HzsLyjsView.S_NAME,
                    // });
                    break;
                case "zncfshao_png":
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XGSShiHaoPop.S_NAME,
                        "param": {
                            "id": c_mn.id,
                            "name": c_mn.name,
                            "meili": c_mn.meili,
                            "type": 1 //0:妃子、1:子女
                        }
                    });
                    break;
                case "zncfshhui_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.xgs09, mx.Lang.zn) });
                    break;
                case "yzfeng_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs20 });
                    break;
                case "yqzfeng_png":
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_XGS_YQZF,
                        "id": c_mn.id,
                    });
                    break;
                case "zfzhong_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs19 });
                    break;
                case "zsttai_png":
                    if (c_mn.sisheng == "0" || c_mn.sisheng == Main.USER_ID) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSLunHui.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs10 });
                    }
                    break;
                case "lhzhong_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs15 });
                    break;
                case "zstthui_png":
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs32 });
                    break;
            }
        };
        HzHudongScreenMediator.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var xproxy = (this.facade.retrieveProxy(mx.XGSProxy.NAME));
            var view = this.view;
            var c_mn = view.c_mn;
            switch (e.currentTarget) {
                case view.add_b://购买四书五经
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.BuyAlertView.S_NAME,
                        "param": {
                            "param": {
                                "item": 2019,
                            }
                        }
                    });
                    break;
                case view.hpei_t://跳转到其他用户界面，需要先发送请求
                    if (c_mn.zhuangtai == 3 && c_mn.hun_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.hun_id,
                        });
                    }
                    break;
                case view.back_b:
                    switch (view.type) {
                        case "hzs":
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                            break;
                        case "whgs":
                        case "lggs":
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSAllChild.S_NAME);
                            break;
                        case "hly":
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZClassroomScreen.S_NAME);
                            break;
                    }
                    break;
                case view.change_b:
                    var height = void 0;
                    var yy = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = view.h[0];
                        e.currentTarget.scaleY = -1;
                        yy = Math.max(view.jianjie_list.measuredHeight - height, 0);
                    }
                    else {
                        height = view.h[1];
                        e.currentTarget.scaleY = 1;
                        yy = 0;
                    }
                    view.jianjie_s.height = height;
                    view.jianjie_s.validateNow();
                    egret.Tween.get(view.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case view.ef_g://子女技能弹窗
                    var p_d = {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": (view.type == "hzs" || view.type == "hly") ? pproxy.cur_zn_info : xproxy.get_object()
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
            }
        };
        HzHudongScreenMediator.prototype.onRemove = function () {
            var wproxy = this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.setTx(false);
            var view = this.view;
            view.hpei_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.guide_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            view.jianjie_list.dataProvider = null;
            view.hzscz_list.dataProvider = null;
            view.hzscz_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        HzHudongScreenMediator.NAME = "HzHudongScreenMediator";
        return HzHudongScreenMediator;
    }(puremvc.Mediator));
    mx.HzHudongScreenMediator = HzHudongScreenMediator;
    __reflect(HzHudongScreenMediator.prototype, "mx.HzHudongScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HzHudongScreenMediator.js.map
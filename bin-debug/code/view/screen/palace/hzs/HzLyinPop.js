/**
 *   @author wf
 *   @date 2016.10.10
 *   @desc 皇子结缘界面
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
    var HzLyinPop = (function (_super) {
        __extends(HzLyinPop, _super);
        function HzLyinPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzLyinPop.mx_support = function () {
            return ["assets.palace_hzsuo_lyin"];
        };
        HzLyinPop.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_ly_ly"://向所有君主结缘
                    tar = this.lyin_b;
                    break;
            }
            return tar;
        };
        HzLyinPop.prototype.init_view = function () {
            var view = this;
            var type = this.adata.type;
            var d = this.adata.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            if (type == 1) {
                this.title_p.source = "syjzlyin_png";
            }
            else {
                this.title_p.source = "zdjzlyin_png";
            }
            if (HzLyinPop.stype) {
                facade.sendNotification(mx.MX_NOTICE.SET_PINLI, HzLyinPop.stype);
            }
            else {
                for (var i = 1; i <= 5; i++) {
                    var meili = proxy.hzs_gift[i][0].meili;
                    if (d.meili >= meili) {
                        facade.sendNotification(mx.MX_NOTICE.SET_PINLI, i);
                        break;
                    }
                    else if (i == 5) {
                        facade.sendNotification(mx.MX_NOTICE.SET_PINLI, 5);
                    }
                }
            }
            //type 1:所有君主结缘 2:指定君主结缘
            view.select_p.visible = true;
            view.title_t.text = type == 1 ? mx.Lang.hzs10 : mx.Lang.hzs09;
            view.lyin_b.horizontalCenter = type == 1 ? 165 : 210;
            view.idbg.visible = view.select_b.visible = view.id_et.visible = type == 2;
            view.id_et.text = mx.Lang.hzs13;
            if (mx.AppConfig.PREV_SCENE_ID == mx.FriendScreen.S_NAME && proxy.target_friend) {
                view.id_et.text = proxy.target_friend.name;
                view.id_et.textColor = 0xffffff;
                view.id_et.size = 19;
            }
            var name = d.xing + d.name;
            view.name_t.text = name.split('').join('\n');
            view.mli_t.text = mx.Lang.mli + '：' + d.meili;
            view.price_t.text = mx.Tools.format(mx.Lang.p0050, '999');
            view.ybao.left = view.price_t.left + view.price_t.width + 2;
            view.parent_t.text = (d.muzu.split('|')[1] == 1 ? mx.Lang.smu : mx.Lang.sfu) + '：' + d.muzu.split('|')[0];
            view.avatar.source = mx.Tools.get_zn_res(d.avatar, 'lh');
            view.avatar.scaleX = view.avatar.scaleY = 0.5;
            view.gift_list.itemRenderer = mx.GNumRender;
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.select_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzpli_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.id_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.id_et.addEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            view.yinbi_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
            facade.registerMediator(new mx.HzLyinPopMediator(this));
        };
        HzLyinPop.prototype.mx_test = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HzLyinPop.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var type = this.adata.type;
            var d = this.adata.data;
            var view = this;
            switch (e.currentTarget) {
                case view.lyin_b:
                    var to_id = type == 1 ? -1 : Number(view.id_et.text);
                    proxy.zhiding_user_id = to_id;
                    var choose = type == 1 && this.select_p.visible ? 1 : 0; //是否发送到结缘频道
                    if (mx.AppConfig.PREV_SCENE_ID == mx.FriendScreen.S_NAME && proxy.target_friend) {
                        to_id = proxy.target_friend.user_id;
                        proxy.target_friend = null;
                    }
                    var g_id = proxy.curr_gift[0].g_id;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        t: mx.MX_NETS.CS_HZS_LIANYIN,
                        id: d.id,
                        to: to_id,
                        pinli: g_id,
                        choose: choose
                    });
                    this.close_self();
                    break;
                case view.xzpli_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinGiftPop.S_NAME, param: { "meili": d.meili } });
                    break;
                case view.bg_rect:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.SET_PINLI, 1);
                    if (mx.AppConfig.CURR_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinLxPop.S_NAME, param: this.adata.data });
                    }
                    this.close_self();
                    if (mx.AppConfig.CURR_SCENE_ID == mx.ChatScreen.S_NAME) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CHAT_ZINV,
                        });
                    }
                    break;
                case view.select_b:
                    proxy.target_hz = d;
                    proxy.target_friend = null;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, { "sname": mx.FriendScreen.S_NAME, "param": "select" });
                    break;
                case view.yinbi_p:
                    if (!this.select_p.visible) {
                        var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
                        var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                        var g_id_1 = proxy.curr_gift[0].g_id;
                        var lower_pinli = false;
                        var data = view.adata.data;
                        if (g_id_1 > 1 && proxy.hzs_gift[g_id_1 - 1][0].meili <= data.meili) {
                            lower_pinli = true; //选择更低的礼盒
                        }
                        var res = lower_pinli
                            || data.meili >= mx.MX_WEB_CONST.WEB_HZS_MEILI
                            || gproxy.user_lv >= mx.MX_WEB_CONST.WEB_HZS_LEVEL
                            || gproxy.user_vip >= mx.MX_WEB_CONST.WEB_HZS_VIP;
                        if (!res) {
                            this.ts_p.visible = !this.ts_p.visible;
                            return;
                        }
                        if (mx.MX_WEB_CONST.WEB_HZS_COST > dproxy.get_currency("ybi")) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0036 });
                            return;
                        }
                    }
                    this.select_p.visible = !this.select_p.visible;
                    break;
            }
        };
        HzLyinPop.prototype.close_self = function () {
            HzLyinPop.stype = null;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HzLyinPop.S_NAME);
        };
        HzLyinPop.prototype.start_edit = function (e) {
            var view = this;
            if (view.id_et.text == mx.Lang.hzs13 || mx.AppConfig.PREV_SCENE_ID == mx.FriendScreen.S_NAME) {
                view.id_et.text = '';
                view.id_et.textColor = 0xffffff;
                view.id_et.size = 19;
            }
        };
        HzLyinPop.prototype.leave_edit = function (e) {
            var view = this;
            if (view.id_et.text == '') {
                view.id_et.text = mx.Lang.hzs13;
                view.id_et.textColor = 0xffffff;
                view.id_et.size = 19;
            }
            var pattern = /[0-9]+/g;
            var str = this.id_et.text;
            this.id_et.text = "";
            if (str == "" || !pattern.test(str)) {
                str = mx.Lang.hzs13;
            }
            this.id_et.text = str;
        };
        HzLyinPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.gift_list.dataProvider = null;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyin_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzpli_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.select_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.id_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.id_et.removeEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            view.yinbi_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HzLyinPopMediator.NAME);
        };
        HzLyinPop.S_NAME = "HzLyinPop";
        return HzLyinPop;
    }(mx.BasicView));
    mx.HzLyinPop = HzLyinPop;
    __reflect(HzLyinPop.prototype, "mx.HzLyinPop");
})(mx || (mx = {}));
//# sourceMappingURL=HzLyinPop.js.map
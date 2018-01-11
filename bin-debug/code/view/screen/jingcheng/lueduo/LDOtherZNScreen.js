/**
 *   @author mx wf
 *   @date 2017.1.5
 *   @desc 掠夺敌人弹窗
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
    var LDOtherZNScreen = (function (_super) {
        __extends(LDOtherZNScreen, _super);
        function LDOtherZNScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDOtherZNScreen.mx_support = function () {
            return ["assets.palace_yxd", "assets.palace_render"];
        };
        LDOtherZNScreen.prototype.init_view_by_type = function () {
            var view = this;
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.hero_list.itemRenderer = mx.FzItemRender;
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.fresh_screen();
        };
        LDOtherZNScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            this.max_num = Math.max(Math.ceil(lproxy.c_other_zn_total / 8), 1);
            var hero = lproxy.c_other_zn;
            this.page_t.text = lproxy.c_other_zn_page + "/" + this.max_num;
            var user = lproxy.get_cur_user();
            this.title_t.text = mx.Tools.format(mx.Lang.hg020, user.name);
            this.title_p.width = this.title_t.width + 150;
            this.hnum_t.text = mx.Lang.zn + "：" + lproxy.c_other_zn_total;
            var arr = [];
            for (var k in hero) {
                var c_mn = hero[k];
                var mnres = mx.Tools.get_zn_res(c_mn.avatar, "jq");
                var weifen = void 0;
                var name_1 = void 0;
                var meili = c_mn.meili;
                if (c_mn.name != "") {
                    name_1 = c_mn.xing + c_mn.name;
                }
                else {
                    var xingbie = Number(c_mn.sex) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                    name_1 = mx.Tools.num2chinese(c_mn.paiwei) + xingbie;
                }
                if (c_mn.fenghao != "") {
                    weifen = c_mn.fenghao;
                }
                else {
                    weifen = mx.Lang.ld044;
                }
                arr.push({
                    "id": c_mn.id,
                    "hero": mnres,
                    "avatar": c_mn.avatar,
                    "zongzu": c_mn.zongzu,
                    "fenghao": weifen,
                    "name": name_1,
                    "meili": meili,
                    "weifen": weifen,
                    "chongai": 0,
                    "dibg": "wfdchen_png",
                    "zibg": "cazdchen_png",
                    "namedi": false,
                    "res_time": 0,
                    "mlz_g": true,
                    "xihao": c_mn.xihao,
                    "skill": c_mn.skill,
                    "xingge": c_mn.xingge,
                    "sex": c_mn.sex,
                    "sisheng": c_mn.sishen,
                    "daishu": c_mn.daishu || "",
                    "caiyi_type": c_mn.caiyi_type,
                    "caiyi_num": c_mn.caiyi_num,
                    "muzu": c_mn.muzu,
                });
            }
            this.hero_list.dataProvider = new eui.ArrayCollection(arr);
            if (!arr.length) {
                //掠夺-子女界面：
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME,
                    "param": {
                        "shijian": { 'msg_id': 3007 },
                    }
                });
            }
        };
        LDOtherZNScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.hero_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
        };
        LDOtherZNScreen.prototype.hero_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            facade.sendNotification(mx.MX_NOTICE.SET_CXG_FZ, { 'data': e.item });
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": Number(e.item.id) + 1000,
                "type": 7
            });
        };
        LDOtherZNScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var page = Number(lproxy.c_other_zn_page);
            var c_d = lproxy.get_cur_user();
            switch (e.currentTarget) {
                case this.first_b:
                    page = 1;
                    break;
                case this.pre_b:
                    page = Math.max(1, page - 1);
                    break;
                case this.next_b:
                    page = Math.min(this.max_num, page + 1);
                    break;
                case this.last_b:
                    page = this.max_num;
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_OTHER_ZINV,
                "id": c_d.user_id,
                "page": page
            });
        };
        LDOtherZNScreen.prototype.back_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            if (LDOtherZNScreen.P_NAME) {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, LDOtherZNScreen.P_NAME);
                LDOtherZNScreen.P_NAME = null;
            }
            else if (lproxy.isLD) {
                if (mx.AppConfig.PREV_SCENE_ID == mx.ChatScreen.S_NAME) {
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                    return;
                }
                if (lproxy.ld_type) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_LUEDUO_OTHER,
                        'type': lproxy.ld_type + 1,
                        'page': lproxy["ldpage" + (lproxy.ld_type + 1)]
                    });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherScreen.S_NAME);
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.OtherScreen.S_NAME);
            }
        };
        LDOtherZNScreen.S_NAME = "LDOtherZNScreen";
        LDOtherZNScreen.M_NAME = "LDMainScreen";
        return LDOtherZNScreen;
    }(mx.AlertView));
    mx.LDOtherZNScreen = LDOtherZNScreen;
    __reflect(LDOtherZNScreen.prototype, "mx.LDOtherZNScreen");
})(mx || (mx = {}));
//# sourceMappingURL=LDOtherZNScreen.js.map
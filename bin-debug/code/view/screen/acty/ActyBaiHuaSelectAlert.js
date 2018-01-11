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
 * @author cy
 * @date 2017.9.23
 * 林中仙君宴会选择花仙
 */
var mx;
(function (mx) {
    var ActyBaiHuaSelectAlert = (function (_super) {
        __extends(ActyBaiHuaSelectAlert, _super);
        function ActyBaiHuaSelectAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_page = 1;
            return _this;
        }
        ActyBaiHuaSelectAlert.mx_support = function () {
            return ["assets.acty_select_zn", "assets.palace_render", "api.BAIHUARUXI"];
        };
        ActyBaiHuaSelectAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.hero_list.itemRenderer = mx.FzItemRender;
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.zn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            pproxy.sort_weifen();
            this.zn_data = pproxy.get_mn_list("notype");
            this.zn_data = this.zn_data.sort(function (a, b) {
                var x = Number(a.mid);
                var y = Number(b.mid);
                if (x < 900 && y < 900) {
                    var hero1 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", x);
                    var hero2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", y);
                    x = hero2 && hproxy.get_hero_by_mid(y) ? Number(hero2.Talent) : 0;
                    y = hero1 && hproxy.get_hero_by_mid(x) ? Number(hero1.Talent) : 0;
                    if (x == y) {
                        x = Number(a.mid);
                        y = Number(b.mid);
                    }
                }
                return x - y;
            });
            var shicong_num = 0;
            for (var k in this.zn_data) {
                var cd = this.zn_data[k];
                if (Number(cd.mid) < 900) {
                    var hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
                    if (hero_api) {
                        shicong_num++;
                    }
                }
            }
            this.kxnum_t.text = mx.Lang.xy00004 + shicong_num + "/" + this.zn_data.length;
            this.max_num = Math.ceil(this.zn_data.length / 8);
            this.fresh_list();
        };
        ActyBaiHuaSelectAlert.prototype.fresh_list = function () {
            this.page_t.text = this.cur_page + "/" + this.max_num;
            var arr = [];
            var data = this.zn_data.slice((this.cur_page - 1) * 8, this.cur_page * 8);
            for (var k in data) {
                var cd = data[k];
                var num = cd.meili || Math.round(Math.random() * 120);
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen) || 13);
                var mnres = void 0;
                if (Number(cd.mid) > 1000 || (Number(cd.mid == 308) && cd.huapi != '')) {
                    mnres = mx.Tools.get_zn_res(cd.avatar, "jq");
                }
                else {
                    mnres = mx.Tools.get_mn_res(cd.mid, "dh");
                }
                arr.push({
                    "id": cd.id,
                    "name": cd.name || "mx",
                    "namecolor": mx.Tools.num2color(num),
                    "meili": num,
                    "weifen": cd.sex == 1 ? api.weifeng : api.weifenb,
                    "weifen2": Number(cd.weifen),
                    "chongai": Number(cd.pet),
                    "hero": mnres,
                    "mid": Number(cd.mid),
                    "ren_lian": cd.ren_lian || "",
                    "huapi": cd.huapi,
                    "isxy": true
                });
                api = null;
            }
            this.hero_list.dataProvider = new eui.ArrayCollection(arr);
        };
        ActyBaiHuaSelectAlert.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var page = this.cur_page;
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
            if (this.cur_page == page) {
                return;
            }
            this.cur_page = page;
            this.fresh_list();
        };
        ActyBaiHuaSelectAlert.prototype.zn_click = function (e) {
            var hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", e.item.mid);
            var facade = mx.ApplicationFacade.getInstance();
            if (hero_api) {
                var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
                if (!hproxy.get_hero_by_mid(e.item.mid)) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0195 });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP, { "mid": e.item.mid });
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xy00012 });
            }
        };
        ActyBaiHuaSelectAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.hero_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.zn_click, this);
        };
        ActyBaiHuaSelectAlert.S_NAME = "ActyBaiHuaSelectAlert";
        return ActyBaiHuaSelectAlert;
    }(mx.AlertView));
    mx.ActyBaiHuaSelectAlert = ActyBaiHuaSelectAlert;
    __reflect(ActyBaiHuaSelectAlert.prototype, "mx.ActyBaiHuaSelectAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaSelectAlert.js.map
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
 * @author qianjun
 * @date 2017.8.23
 * 已去世妃子弹窗
 */
var mx;
(function (mx) {
    var DieFzView = (function (_super) {
        __extends(DieFzView, _super);
        function DieFzView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DieFzView.mx_support = function () {
            return ["assets.palace_fz_die", "assets.palace_render"];
        };
        DieFzView.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.DieFzViewMediator(this));
            var view = this;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.hero_list.itemRenderer = mx.FzItemRender;
            this.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.fresh_view();
        };
        DieFzView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, DieFzView.S_NAME);
        };
        DieFzView.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            var heroes = proxy["xgs_list0"];
            proxy.total_page = Math.ceil(Number(proxy.total_len) / 8); //每页四条数据
            var arr = [];
            for (var k in heroes) {
                var cd = heroes[k];
                var mnres = void 0;
                if (cd.mid >= 1000 || (Number(cd.mid == 308) && cd.huapi != '')) {
                    mnres = mx.Tools.get_zn_res(cd.avatar, "jq");
                }
                else if (cd.mid >= 300) {
                    mnres = mx.Tools.get_mn_res(cd.mid, "dh");
                }
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen_ini));
                arr.push({
                    "id": Number(cd.id),
                    "idx": 9,
                    "hero": mnres,
                    "name": cd.name,
                    "meili": Number(cd.meili),
                    "weifen": Number(cd.sex) == 1 ? api.weifeng : api.weifenb,
                    "chongai": Number(cd.pet),
                    "dibg": "lgmzdchen_png",
                    "mid": Number(cd.mid),
                    "namedi": true,
                    "avatar": cd.avatar
                });
            }
            this.page_t.text = proxy.cur_page[0] + "/" + proxy.total_page;
            this.hero_list.dataProvider = new eui.ArrayCollection(arr);
        };
        DieFzView.prototype.set_page = function (e) {
            var cur_page = this.proxy.cur_page[0];
            var total_page = this.proxy.total_page;
            var new_page;
            switch (e.currentTarget) {
                case this.first_b:
                    new_page = 1;
                    break;
                case this.pre_b:
                    new_page = Math.max(1, cur_page - 1);
                    break;
                case this.last_b:
                    new_page = total_page;
                    break;
                case this.next_b:
                    new_page = Math.min(total_page, cur_page + 1);
                    break;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (new_page != cur_page) {
                this.proxy.new_page = true;
                this.proxy.die_fz_select = true;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_XGS_FEIZI,
                    "page": new_page,
                    "size": 8
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs04 });
            }
        };
        DieFzView.prototype.hero_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var fz = proxy.get_curr_mn();
            var a_d2 = {
                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                "sdata_ok": {
                    "t": mx.MX_NETS.CS_GUIZU_HUAPI,
                    "id": fz.id,
                    "avatar": e.item.avatar,
                },
                "param": mx.Lang.gz0018
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        DieFzView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            this.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.hero_list.dataProvider = null;
            this.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.DieFzViewMediator.NAME);
            this.proxy.die_fz_select = false;
        };
        Object.defineProperty(DieFzView.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        DieFzView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.back_b:
                    this.close_self();
                    break;
            }
        };
        DieFzView.S_NAME = "DieFzView";
        return DieFzView;
    }(mx.BasicView));
    mx.DieFzView = DieFzView;
    __reflect(DieFzView.prototype, "mx.DieFzView");
})(mx || (mx = {}));
//# sourceMappingURL=DieFzView.js.map
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
 * 选择未婚子女弹窗
 */
var mx;
(function (mx) {
    var HeiShiSelectView = (function (_super) {
        __extends(HeiShiSelectView, _super);
        function HeiShiSelectView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiSelectView.mx_support = function () {
            return ["assets.market_select_zn", "assets.palace_render"];
        };
        HeiShiSelectView.prototype.init_view = function () {
            //ApplicationFacade.getInstance().registerMediator(new DieFzViewMediator(this));
            var view = this;
            var avatar = view.getChildAt(0);
            avatar.source = "s1613_jpg";
            view.num_g.visible = false;
            if (mx.AppConfig.CURR_SCENE_ID == mx.ActyXXGXXiuScreen.S_NAME) {
                avatar.source = "listBG_jpg";
                view.num_g.visible = true;
                this.num_t.text = mx.Lang.xxg08 + this.proxy.weihun_zn.length;
            }
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.hero_list.itemRenderer = mx.FzItemRender;
            this.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.cur_page = 1;
            this.total_page = Math.ceil(Number(this.proxy.weihun_zn.length) / 8); //每页8条数据
            this.fresh_view();
        };
        HeiShiSelectView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HeiShiSelectView.S_NAME);
        };
        HeiShiSelectView.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            var arr = proxy.get_page_data(this.cur_page, "_weihun_zn", 8);
            // let arr = [];
            // for (let k in heroes) {
            // 	let cd = heroes[k];
            // 	let mnres;
            // 	if (cd.mid >= 1000) {
            // 		mnres = Tools.get_zn_res(cd.avatar, "jq");
            // 	}
            // 	let api = ApiTool.getAPINode(MX_APINAME.JINJI, "id", Number(cd.weifen_ini));
            // 	arr.push({
            // 		"id": Number(cd.id),
            // 		"idx": 9,
            // 		"hero": mnres,
            // 		"name": cd.name,
            // 		"meili": Number(cd.meili),
            // 		"weifen": Number(cd.sex) == 1 ? api.weifeng : api.weifenb,
            // 		"chongai": Number(cd.pet),
            // 		"dibg": "lgmzdchen_png",
            // 		"mid": Number(cd.mid),
            // 		"namedi": true,
            // 		"avatar": cd.avatar
            // 	});
            // }
            this.page_t.text = this.cur_page + "/" + this.total_page;
            this.hero_list.dataProvider = new eui.ArrayCollection(arr);
        };
        HeiShiSelectView.prototype.set_page = function (e) {
            var cur_page = this.cur_page;
            var total_page = this.total_page;
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
            if (new_page != cur_page) {
                this.cur_page = new_page;
                this.fresh_view();
            }
        };
        HeiShiSelectView.prototype.hero_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            // let proxy = <PalaceProxy><any>(facade.retrieveProxy(PalaceProxy.NAME));
            // let fz = proxy.get_curr_mn();
            // let a_d2 : IAlert_D = {
            // 	"notice_ok"   : MX_NOTICE.CS_GET_DATA,
            // 	"sdata_ok"    : {
            // 		"t": MX_NETS.CS_GUIZU_HUAPI,
            // 		"id": fz.id,
            // 		"avatar": e.item.avatar,
            // 	},
            // 	"param"       : Lang.gz0018
            // };
            // let p_d : IPOP_D = {"name" : AlertView.S_NAME, "param" : a_d2};
            facade.sendNotification(mx.MX_NOTICE.HEISHI_SELECT_ZN, e.item);
            this.close_self();
        };
        HeiShiSelectView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            this.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.hero_list.dataProvider = null;
            this.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //ApplicationFacade.getInstance().removeMediator(DieFzViewMediator.NAME);	
        };
        Object.defineProperty(HeiShiSelectView.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeiShiSelectView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.back_b:
                    this.close_self();
                    break;
            }
        };
        HeiShiSelectView.S_NAME = "HeiShiSelectView";
        return HeiShiSelectView;
    }(mx.BasicView));
    mx.HeiShiSelectView = HeiShiSelectView;
    __reflect(HeiShiSelectView.prototype, "mx.HeiShiSelectView");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiSelectView.js.map
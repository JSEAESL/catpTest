/**
*   @author mx
*   @date 2015.1.3
*   @desc 冷宫主界面
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
    var LGongScreen = (function (_super) {
        __extends(LGongScreen, _super);
        function LGongScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LGongScreen.mx_support = function () {
            return ["assets.palace_lg", "assets.palace_render", "api.JINJI", "api.HEROHOUGONG", "api.XINGGE", "data.1901"];
        };
        LGongScreen.prototype.init_view = function () {
            //ApplicationFacade.getInstance().registerMediator(new LGongMediator(this));
            // this.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.hero_list.itemRenderer = FzItemRender;
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_heroes = pproxy.get_lgfz_list();
            if (c_heroes.length == 0) {
                this.hua_t.text = mx.Lang.hg042;
                this.ts_g.visible = true;
                //this.fanye_g.visible = false;
            }
            else {
                this.ts_g.visible = false;
                this.lgbg_p.source = "listBG_jpg";
                //this.fanye_g.visible = true;
            }
            this.max_num = Math.max(Math.ceil(c_heroes.length / 8), 1);
            this.hnum_t.text = c_heroes.length;
            this.lgfz_page = 1;
            var style = [];
            style["itemRenderer"] = mx.FzItemRender;
            style["layout_type"] = "TileLayout";
            style["layout_style"] = {};
            style["layout_style"]["requestedColumnCount"] = 4;
            style["layout_style"]["horizontalGap"] = 18;
            style["layout_style"]["verticalGap"] = 18;
            style["layout_style"]["requestedRowCount"] = 2;
            style["layout_style"]["paddingLeft"] = 15;
            style["layout_style"]["paddingRight"] = 15;
            this.pageui.set_style(style);
            this.fresh_screen();
        };
        LGongScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            // this.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.hero_list.dataProvider = null;
            //this.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.pageui.list0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.pageui.list1.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.pageui.list2.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            egret.Tween.removeTweens(this.ts_p);
            //ApplicationFacade.getInstance().removeMediator(LGongMediator.NAME);
        };
        LGongScreen.prototype.hero_click = function (e) {
            var c_id = e.item.id;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.set_curr_fzid(c_id);
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": e.item.mid,
                "type": 3
            });
        };
        LGongScreen.prototype.btn_click = function (e) {
            switch (e.currentTarget) {
                case this.back_b:
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
                    break;
            }
        };
        LGongScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var heroes = pproxy.get_lgfz_list();
            //this.page_t.text = this.lgfz_page + "/" + this.max_num;
            //let c_heroes = heroes.slice((this.lgfz_page - 1) * 8, Math.min(this.lgfz_page * 8, heroes.length))
            var c_heroes = heroes;
            var arr = [];
            for (var k in c_heroes) {
                var mnres = void 0;
                if (Number(c_heroes[k].mid == 308) && c_heroes[k].huapi != '') {
                    c_heroes[k].avatar = c_heroes[k].huapi;
                }
                if (Number(c_heroes[k].mid) > 1000 || (Number(c_heroes[k].mid == 308) && c_heroes[k].huapi != '')) {
                    mnres = mx.Tools.get_zn_res(c_heroes[k].avatar, "jq");
                }
                else {
                    mnres = mx.Tools.get_mn_res(c_heroes[k].mid, "dh");
                }
                arr.push({
                    "id": c_heroes[k].id,
                    "idx": 9,
                    "hero": mnres,
                    "name": c_heroes[k].name,
                    "meili": c_heroes[k].meili,
                    "weifen": "庶人",
                    "chongai": c_heroes[k].pet,
                    "dibg": "lgmzdchen_png",
                    "mid": c_heroes[k].mid,
                    "namedi": true
                });
            }
            this.pageui.set_data(arr, 8);
            this.pageui.list0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.pageui.list1.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.pageui.list2.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            //this.hero_list.dataProvider = new eui.ArrayCollection(arr);
            //this.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            if (c_heroes.length > 8) {
                //this.ts_p.visible = true;
                this.ts_p.visible = false;
                var yy = mx.Tools.screen_height - 190;
                this.ts_p.y = yy;
                egret.Tween.get(this.ts_p, { "loop": true }).to({ "y": yy - 20 }, 400).to({ "y": yy }, 400);
            }
            else {
                this.ts_p.visible = false;
            }
        };
        LGongScreen.S_NAME = "LGongScreen";
        return LGongScreen;
    }(mx.BasicView));
    mx.LGongScreen = LGongScreen;
    __reflect(LGongScreen.prototype, "mx.LGongScreen");
})(mx || (mx = {}));
//# sourceMappingURL=LGongScreen.js.map
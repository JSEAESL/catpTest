/**
*   @author cy
*   @date 2017.8.18
*   @desc 选择英雄弹窗
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
    var HeroSelectView = (function (_super) {
        __extends(HeroSelectView, _super);
        function HeroSelectView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "all";
            _this.mine_team = [];
            _this._flag = 0; //一览
            return _this;
        }
        HeroSelectView.mx_support = function () {
            return ["assets.team_all"];
        };
        HeroSelectView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_bd_l2"://编队-站位2
                    tar = this.hero_list.getChildAt(1);
                    break;
                case "v_bd_l3":
                    tar = this.hero_list.getChildAt(2);
                    break;
                case "v_bd_l4":
                    tar = this.hero_list.getChildAt(3);
                    break;
                case "v_bd_bc"://保存
                    tar = this.quere_b;
                    break;
            }
            return tar;
        };
        HeroSelectView.prototype.init_view_by_type = function () {
            var view = this;
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.shangzhen, this);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.change, this);
            view.quere_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quren_click, this);
            view.type_list.selectedIndex = 0;
            this.mine_team = this.adata.team.concat();
            this.old_team = this.adata.team.concat();
            this._flag = this.adata.type;
            view.hero_list.itemRenderer = this._flag == 0 ? mx.TeamHeroRender2 : mx.TeamHeroRender;
            view.title_p.source = this._flag == 0 ? "scylbti_png" : "xzscbti_png";
            view.di_p.source = this._flag == 0 ? "alertLbg_png" : "alertMbg_png";
            if (view.di_p.source == "alertMbg_png") {
                view.di_p.width = 614;
                view.di_p.height = 841;
                var rect = new egret.Rectangle(58, 77, 307, 163);
                view.di_p.scale9Grid = rect;
            }
            if (view.di_p.source == "alertLbg_png") {
                view.di_p.width = 693;
                view.di_p.height = 970;
                var rect = new egret.Rectangle(196, 68, 75, 40);
                view.di_p.scale9Grid = rect;
            }
            view.g_g.height = this._flag == 1 ? 784.5 : 748;
            view.g_g.width = this._flag == 1 ? 660 : 630;
            view.quere_b.visible = view.exit_b.visible = this._flag != 0;
            if (this._flag) {
                var layout = new eui.TileLayout();
                layout.requestedColumnCount = 3;
                layout.horizontalGap = 16;
                layout.verticalGap = 4;
                this.hero_list.layout = layout;
            }
            else {
                this.hero_s.bottom = 36;
            }
            this.fresh_data("all");
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeroSelectMediator(this));
        };
        HeroSelectView.prototype.fresh_data = function (type, style) {
            var view = this;
            this.type = type;
            var hProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            var c_arr = hProxy.get_heroes_by_type(type, "team");
            var arr = [];
            var chicun = this._flag == 0 ? 90 : 120;
            var size = this._flag == 0 ? 18 : 21;
            for (var j in c_arr) {
                var obj = {};
                for (var t in c_arr[j]) {
                    obj[t] = c_arr[j][t];
                }
                obj.team_xz = false;
                obj.chicun = chicun;
                obj.cor = 0x8478a1;
                obj.di_cor = 0x8478a1;
                obj.tuijian = true;
                obj.size = size;
                if (this._flag == 0) {
                    obj.hongdian = obj.ef;
                }
                else {
                    obj.ef = [0, 0, 0];
                }
                for (var k in this.mine_team) {
                    if (Number(this.mine_team[k]) == Number(c_arr[j].id)) {
                        obj.team_xz = this._flag == 1;
                        break;
                    }
                }
                arr.push(obj);
            }
            var scrollV = style ? 0 : view.hero_s.viewport.scrollV;
            view.hero_list.dataProvider = new eui.ArrayCollection(arr);
            view.hero_list.validateNow();
            view.hero_s.viewport.scrollV = Math.max(0, scrollV);
        };
        HeroSelectView.prototype.change = function (e) {
            var index = e.itemIndex;
            var arr = ["all", "AGILITY", "STRENGTH", "INTELLIGENCE"];
            this.fresh_data(arr[index], "revert");
        };
        HeroSelectView.prototype.shangzhen = function (e) {
            var view = this;
            var hero = e.item;
            if (!this._flag) {
                mx.HeroTrainScreen.P_NAME = mx.TeamScreen.S_NAME;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CHERO_INFO,
                    "id": hero.id,
                });
                return;
            }
            for (var k in this.mine_team) {
                if (Number(this.mine_team[k]) == Number(hero.id)) {
                    this.xiazhen(e);
                    return;
                }
            }
            if (this.mine_team.length < 5) {
                this.mine_team.push(Number(hero.id));
                this.fresh_render(Number(hero.id));
            }
            else {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0084 });
            }
        };
        HeroSelectView.prototype.xiazhen = function (e) {
            var view = this;
            if (this.mine_team.length <= 1) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0087 });
                return;
            }
            var hero = e.item;
            for (var k in this.mine_team) {
                if (Number(this.mine_team[k]) == Number(hero.id)) {
                    this.mine_team.splice(k, 1);
                    break;
                }
            }
            this.fresh_render(Number(hero.id));
        };
        HeroSelectView.prototype.fresh_render = function (id) {
            var dataProvider = this.hero_list.dataProvider;
            var index = 0;
            var newdata2;
            for (var k in dataProvider.source) {
                if (dataProvider.source[k].id == id) {
                    index = Number(k);
                    newdata2 = dataProvider.source[k];
                    break;
                }
            }
            newdata2.team_xz = !newdata2.team_xz;
            dataProvider.replaceItemAt(newdata2, index);
        };
        HeroSelectView.prototype.quren_click = function (evt) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.ADD_QUEHERO, this.mine_team);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroSelectView.S_NAME);
        };
        HeroSelectView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.type_list.dataProvider = null;
            view.hero_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.shangzhen, this);
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.change, this);
            view.quere_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quren_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroSelectMediator.NAME);
        };
        HeroSelectView.prototype.close_self = function (e) {
            if (this._flag && this.is_change()) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.CLOSE_POP,
                    "sdata_ok": HeroSelectView.S_NAME,
                    "param": mx.Lang.h0085
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroSelectView.S_NAME);
            }
        };
        HeroSelectView.prototype.is_change = function () {
            var res = false;
            var old = this.old_team;
            var new_arr = this.mine_team;
            if (old.length != new_arr.length) {
                return true;
            }
            for (var k in old) {
                if (new_arr.indexOf(old[k]) < 0) {
                    res = true;
                    break;
                }
            }
            return res;
        };
        HeroSelectView.S_NAME = "HeroSelectView";
        return HeroSelectView;
    }(mx.AlertView));
    mx.HeroSelectView = HeroSelectView;
    __reflect(HeroSelectView.prototype, "mx.HeroSelectView");
})(mx || (mx = {}));
//# sourceMappingURL=HeroSelectView.js.map
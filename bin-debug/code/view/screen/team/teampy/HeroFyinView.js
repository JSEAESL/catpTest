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
 * @qianjun/2016.9.6
 *  封印之力 alert
 */
var mx;
(function (mx) {
    var HeroFyinView = (function (_super) {
        __extends(HeroFyinView, _super);
        function HeroFyinView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.old_index = 0;
            return _this;
        }
        HeroFyinView.mx_support = function () {
            return ["assets.team_fy", "api.SOUL"];
        };
        Object.defineProperty(HeroFyinView.prototype, "hProxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeroFyinView.prototype.init_view = function () {
            var view = this;
            //初始化侍从的4个封印
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hero.mid);
            var fyin = info.fyin.split('|');
            var arr = [];
            for (var i in fyin) {
                //封印详细数据
                var unit = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", fyin[i]);
                arr.push({
                    "idx": Number(i) + 1,
                    "id": unit.id,
                    "kaiqi": unit.condition,
                    "value1": unit.EffectValue1,
                    "value2": unit.EffectValue2,
                    "growth1": unit.GrowthValue1,
                    "growth2": unit.GrowthValue2,
                    "icon": unit.type,
                    "desc": unit.desc,
                    "level": hero.fy_skill[unit.id].level,
                    "suo": Number(hero.quality) < Number(unit.condition),
                    "note": unit.note
                });
            }
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qhua_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fy_list.itemRenderer = mx.HeroFyinRender;
            view.fy_list.selectedIndex = 0;
            view.old_index = 0;
            view.fy_list.dataProvider = new eui.ArrayCollection(arr);
            view.fy_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.fresh_bottom(arr[0]);
            //ApplicationFacade.getInstance().registerMediator(new EquipHchMediator(this));
        };
        HeroFyinView.prototype.fresh_bottom = function (info) {
            var view = this;
            view.item_info = info;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            view.fy_p.source = "scfyin" + info.icon + "_png";
            view.fy_name.source = "scfyin" + info.icon + "name_png";
            //info.fy_skill[info.type]
            var level = hero.fy_skill[info.id].level;
            var quality = Number(hero.quality);
            view.level_bt.text = info.suo ? '1' : level + "";
            var value1 = Number(info.value1) + Number(info.growth1) * Math.max((level - 1), 0);
            var value2 = Number(info.value2) + Number(info.growth2) * Math.max((level - 1), 0);
            if (info.id == 5) {
                value1 = Number(value1.toFixed(2));
            }
            view.desc_t.text = mx.Tools.format(info.desc, value1, value2);
            var kaiqi = Number(info.kaiqi);
            view.qhua_b.visible = true;
            view.suo_g.visible = quality < kaiqi;
            if (view.suo_g.visible) {
                view.qhua_b.visible = false;
                var color = mx.Tools.cal_quality_cor(kaiqi);
                var unit = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", info.id);
                var str = mx.Tools.format(mx.Lang.scfy001, mx.Lang.j0022[kaiqi - 1]);
                view.suo_t.textFlow = mx.Tools.setKeywordColor2(str, [color]);
            }
        };
        HeroFyinView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qhua_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fy_list.dataProvider = null;
            view.fy_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            //ApplicationFacade.getInstance().removeMediator(EquipHchMediator.NAME);
        };
        HeroFyinView.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroFyinView.S_NAME);
                    break;
                case view.qhua_b:
                    //弹出强化弹窗
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroFyinQHuaView.S_NAME,
                        "param": view.item_info
                    });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroFyinView.S_NAME);
                    break;
            }
        };
        HeroFyinView.prototype.onTabChange = function (e) {
            var item = e.item;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (view.old_index == view.fy_list.selectedIndex && !item.suo) {
                //弹出强化弹窗
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeroFyinQHuaView.S_NAME,
                    "param": e.item
                });
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroFyinView.S_NAME);
            }
            else {
                view.old_index = e.itemIndex;
                this.fresh_bottom(item);
            }
        };
        HeroFyinView.S_NAME = "HeroFyinView";
        return HeroFyinView;
    }(mx.BasicView));
    mx.HeroFyinView = HeroFyinView;
    __reflect(HeroFyinView.prototype, "mx.HeroFyinView");
})(mx || (mx = {}));
//# sourceMappingURL=HeroFyinView.js.map
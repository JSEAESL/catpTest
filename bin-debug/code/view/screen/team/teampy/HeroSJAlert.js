/**
*   @author mx
*   @date 2015.1.3
*   @desc 英雄升级弹窗
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
    var HeroSJAlert = (function (_super) {
        __extends(HeroSJAlert, _super);
        function HeroSJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroSJAlert.mx_support = function () {
            return ["assets.teamsj"];
        };
        HeroSJAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.items_list.itemRenderer = mx.GNumRender;
            view.red_b.set_ssres("jhao_png");
            view.red_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            this.hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var cd = this.hProxy.get_chero_info();
            var obj = {};
            for (var k in cd) {
                obj[k] = cd[k];
            }
            obj.noxingji = true;
            obj.nolv = true;
            obj.width = 90;
            ////console.log(cd);
            this.hero.itemRenderer = mx.TeamHeroRender;
            this.hero.dataProvider = new eui.ArrayCollection([obj]);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
            this.name_t.text = api.hero_name;
            this.herolv_t.text = "Lv." + cd.level;
            if (api.hero_name.length == 3) {
                this.herolv_t.left = 277;
            }
            var param = {
                'num': cd.star,
                'total': cd.star,
                'res': 'mrpyxx',
                'style': 'sp',
                'gap': (180 - mx.MX_COMMON.HP_LEVEL * 24) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.VerticalAlign.TOP
            };
            this.heroxingji.init_multiui(param);
            this.c_lev = Number(cd.level);
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var level_info = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", gProxy.user_lv);
            this.c_max = Number(level_info.MaxHeroLevel);
            this.check_max_cnum();
            this.fresh_view();
        };
        HeroSJAlert.prototype.check_max_cnum = function () {
            if (this.c_max > this.c_lev) {
                var cd = this.hProxy.get_chero_info();
                var b_exp = [60, 300, 1500, 7500]; //道具经验值
                var b_ids = [169, 218, 290, 440]; //道具id
                var base = Number(cd.exp); //可以获得的经验。
                var facade = mx.ApplicationFacade.getInstance();
                var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                for (var a = 0; a < 4; a++) {
                    var num = pProxy.get_item_num(b_ids[a]);
                    if (num) {
                        base += num * b_exp[a];
                    }
                }
                this.c_num = this.c_max;
                for (var i = this.c_lev; i <= this.c_max; i++) {
                    var level = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", i);
                    if (base < level.hero_exp) {
                        this.c_num = Math.max(i, this.c_lev + 1);
                        break;
                    }
                }
            }
            else {
                this.c_num = this.c_lev;
                this.c_can = 0; //已经到达上限
            }
        };
        HeroSJAlert.prototype.fresh_view = function () {
            var view = this;
            view.lv_t.text = "" + this.c_num;
            var need = this.get_sj_items(); //同步修改c_can狀態
            switch (this.c_can) {
                case 0: //上限
                case 1://道具为0
                    view.ok_b.set_ssres("sjhui_png");
                    break;
                case 2: //道具不足
                case 3://道具充足
                    view.ok_b.set_ssres("sjshi_png");
                    break;
                default:
                    break;
            }
            this.items_list.dataProvider = new eui.ArrayCollection(need);
        };
        HeroSJAlert.prototype.get_sj_items = function () {
            var items = [];
            if (this.c_can == 0) {
                return items;
            }
            var b_exp = [60, 300, 1500, 7500]; //道具经验值
            var b_ids = [169, 218, 290, 440]; //道具id
            var b_item = []; //自己拥有数量
            var no_item = true;
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            for (var a = 0; a < 4; a++) {
                b_item[a] = pProxy.get_item_num(b_ids[a]);
                if (b_item[a]) {
                    no_item = false;
                }
            }
            if (no_item) {
                this.c_can = 1;
                return items;
            }
            this.c_can = 3;
            var result = this.hProxy.check_hero_sj(this.c_num);
            if (result.res) {
                for (var k in result.add_zb) {
                    items.push({
                        "type": 4,
                        "id": k,
                        "num": result.add_zb[k],
                        //"no" : this.c_can != 3,
                        "chicun": 80,
                        "no_num": true,
                        "di_cor": 0x987ADE,
                        "top": 90,
                        "di_size": 18
                    });
                }
            }
            else {
                this.c_can = 2;
                for (var k in b_item) {
                    if (b_item[k]) {
                        items.push({
                            "type": 4,
                            "id": b_ids[k],
                            "num": b_item[k],
                            //   "no" : this.c_can != 3,
                            "chicun": 80,
                            "no_num": true,
                            "di_cor": 0x987ADE,
                            "top": 90,
                            "di_size": 18,
                        });
                    }
                }
            }
            return items;
        };
        HeroSJAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.red_b://减少
                    if (this.c_num > this.c_lev + 1) {
                        this.c_num--;
                        this.fresh_view();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0017 });
                    }
                    break;
                case view.add_b:
                    if (this.c_num < this.c_max) {
                        this.c_num++;
                        this.fresh_view();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0018 });
                    }
                    break;
                case view.ok_b://升级
                    if (this.c_can == 3) {
                        var cd = this.hProxy.get_chero_info();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HERO_UPLV,
                            "id": cd.id,
                            "level": this.c_num,
                        });
                    }
                    else {
                        var str = void 0;
                        switch (this.c_can) {
                            case 0://不能超过女王等级
                                str = mx.Lang.h0018;
                                break;
                            case 1: //沒有物品
                            case 2://物品不足
                                str = mx.Lang.h0019;
                                break;
                            default:
                                break;
                        }
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        break;
                    }
                case view.bg_rect:
                case view.exit_b: //离开
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroSJAlert.S_NAME);
                    break;
                default:
                    break;
            }
        };
        HeroSJAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.red_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        HeroSJAlert.S_NAME = "HeroSJAlert";
        return HeroSJAlert;
    }(mx.AlertView));
    mx.HeroSJAlert = HeroSJAlert;
    __reflect(HeroSJAlert.prototype, "mx.HeroSJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroSJAlert.js.map
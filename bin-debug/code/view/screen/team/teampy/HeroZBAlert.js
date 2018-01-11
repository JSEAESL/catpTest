/**
*   @author mx
*   @date 2015.1.3
*   @desc 英雄装备弹窗
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
    var HeroZBAlert = (function (_super) {
        __extends(HeroZBAlert, _super);
        function HeroZBAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res_flag = ""; //不能升级原因
            return _this;
        }
        HeroZBAlert.mx_support = function () {
            return ["assets.teamzb", "api.SKILLNEW"];
        };
        HeroZBAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_zb_l1":
                    tar = this.items_list.getChildAt(4);
                    break;
                case "v_sjie":
                    tar = this.ok_b;
                    break;
            }
            return tar;
        };
        HeroZBAlert.prototype.init_view_by_type = function () {
            var view = this;
            //     view.zb_t.text = Lang.zb;
            view.items_list.itemRenderer = mx.EquipRender;
            view.items_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_pop();
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.MX_COMMON.IN_GUIDE) {
                var gproxy = facade.retrieveProxy(mx.GuideProxy.NAME);
                if (gproxy.check_guide_key("m_zb")) {
                    if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                        facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    else {
                        view.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
                    }
                }
            }
            facade.registerMediator(new mx.HeroZBMediator(this));
        };
        HeroZBAlert.prototype.mx_test2 = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HeroZBAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.ok_b://升阶
                    if (this.juexing_flag) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0082 });
                        return;
                    }
                    if (!this.full_flag) {
                        var arr = this._flag ? this.equips : this.need;
                        var temp = mx.Tools.obj2arr(arr);
                        if (!temp.length) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": this.res_flag });
                            return;
                        }
                        facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroZBAlert.S_NAME);
                        var p_d = {
                            "name": mx.JJXHAlert.S_NAME,
                            "param": { "arr": arr, "flag": this._flag }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else {
                        var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                        var c_hero = Hproxy.get_chero_info();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HERO_UPPZ, "id": c_hero.id
                        });
                    }
                    break;
                case view.bg_rect:
                case view.exit_b://离开
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroZBAlert.S_NAME);
                    break;
                default:
                    break;
            }
        };
        HeroZBAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var c_d = e.item;
            if (c_d.id == 0) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0080 });
                return;
            }
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_hero = Hproxy.get_chero_info();
            c_hero.zb_weizhi = e.itemIndex;
            var p_d = {
                "name": mx.HeroEquipAlert.S_NAME,
                "param": c_d
            };
            ////console.log(c_d)
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        HeroZBAlert.prototype.fresh_pop = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_hero = Hproxy.get_chero_info();
            this.items_list.dataProvider = new eui.ArrayCollection(c_hero.equip_info);
            this.check_jinjie();
            if (this._flag) {
                this.ok_b.set_ssres("zbjjie_png");
                this.jinjie_p.visible = true;
                this.jinjie_p.alpha = 1;
                egret.Tween.get(this.jinjie_p, { "loop": true }).to({ "alpha": 0 }, 800).to({ "alpha": 1 }, 800);
                if (mx.Tools.check_user_locals(mx.MX_COMMON.MX_JINJIE)) {
                    facade.sendNotification(mx.MX_NOTICE.OPEN_GUIDE, "sjie");
                }
            }
            else {
                this.jinjie_p.visible = false;
            }
            if (this.juexing_flag) {
                this.ok_b.set_ssres("jjhse_png");
                this.jinjie_p.visible = false;
            }
        };
        HeroZBAlert.prototype.check_jinjie = function () {
            this._flag = true; //可以进阶
            this.full_flag = true; //没有足够的进阶材料
            this.juexing_flag = false; //觉醒装备
            var facade = mx.ApplicationFacade.getInstance();
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_hero = Hproxy.get_chero_info();
            var arr = c_hero.equip_info.concat(); //返回的是新数组
            var target = 0; //需要升到的等级
            this.equips = {};
            this.need = {}; //自己尚未拥有但需要的物品
            for (var k in arr) {
                var type = arr[k].etype;
                var eid = arr[k].id;
                if (type != 0) {
                    this.full_flag = false;
                    this._flag = false;
                    this.res_flag = mx.Lang.h0088;
                }
                if (type == 2 || type == 4 || type == 6) {
                    this.add_zb(eid, 1);
                }
                else if (type == 3 || type == 1 || type == 5) {
                    this.check_zb(eid);
                }
                if (type == 5 || type == 6) {
                    var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", eid);
                    if (zb && target < Number(zb.LevelRequirement)) {
                        target = Number(zb.LevelRequirement);
                    }
                }
            }
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var lvapi = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", gProxy.user_lv);
            var maxlv = lvapi.MaxHeroLevel;
            if (maxlv < target) {
                this._flag = false;
                this.res_flag = mx.Lang.h0077;
            }
            else {
                if (target != 0 && !this.check_sj(target)) {
                    this._flag = false;
                    this.res_flag = mx.Lang.h0088;
                }
            }
            var Dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            for (var m in this.equips) {
                if (m !== "ybi") {
                    if (pProxy.get_item_num(Number(m)) < this.equips[m]) {
                        var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", m);
                        if (zb) {
                            this.check_zb(m, this.equips[m]);
                            this.equips[m] = pProxy.get_item_num(Number(m));
                        }
                    }
                }
            }
            for (var m in this.equips) {
                if (m == "ybi") {
                    var ybi = Dproxy.get_currency("ybi");
                    if (this.equips["ybi"] && this.equips["ybi"] > ybi) {
                        this._flag = false;
                        this.res_flag = mx.Lang.p0036;
                        this.need["ybi"] = this.equips["ybi"] - ybi;
                    }
                }
                else {
                    if (pProxy.get_item_num(Number(m)) < this.equips[m]) {
                        this._flag = false;
                        this.res_flag = mx.Lang.h0088;
                        this.need[m] = this.equips[m] - pProxy.get_item_num(Number(m));
                    }
                }
            }
        };
        HeroZBAlert.prototype.check_zb = function (x, num) {
            if (num === void 0) { num = 1; }
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", x);
            if (!zb) {
                this.add_zb(x, num);
            }
            else {
                var hnum = pProxy.get_item_num(x);
                var c_hum = Math.min(num, hnum);
                var c_need = num - c_hum; //还需要合成的数目
                this.add_zb("ybi", Number(zb.Expense) * c_need);
                //this.add_zb(x, c_need);
                if (c_need) {
                    for (var i = 1; i <= 4; i++) {
                        var component = Number(zb["Component" + i]);
                        if (component) {
                            var num_1 = Number(zb["Component" + i + "Count"]);
                            this.check_zb(component, num_1 * c_need);
                        }
                    }
                }
            }
        };
        HeroZBAlert.prototype.check_sj = function (lv) {
            var facade = mx.ApplicationFacade.getInstance();
            var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var result = Hproxy.check_hero_sj(lv);
            var res = result.res;
            if (!res) {
                this._flag = false;
                this.res_flag = mx.Lang.h0088;
            }
            this.need = result.need_zb;
            for (var k in result.add_zb) {
                this.add_zb(k, result.add_zb[k]);
            }
            return res;
        };
        HeroZBAlert.prototype.add_zb = function (x, num) {
            if (x == 0) {
                this.juexing_flag = true;
                return;
            }
            if (this.equips[x]) {
                this.equips[x] += num;
            }
            else {
                this.equips[x] = num;
            }
        };
        HeroZBAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.equips = null;
            this.need = null;
            this.items_list.dataProvider = null;
            this.items_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            egret.Tween.removeTweens(this.jinjie_p);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroZBMediator.NAME);
        };
        HeroZBAlert.S_NAME = "HeroZBAlert";
        return HeroZBAlert;
    }(mx.AlertView));
    mx.HeroZBAlert = HeroZBAlert;
    __reflect(HeroZBAlert.prototype, "mx.HeroZBAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HeroZBAlert.js.map
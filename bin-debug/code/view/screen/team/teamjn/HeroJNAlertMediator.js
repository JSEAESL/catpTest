/**
 *   @author qianjun、mx、cy
 *   @date 2016.8.29
 *   @desc 技能培养Mediator
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
    var HeroJNAlertMediator = (function (_super) {
        __extends(HeroJNAlertMediator, _super);
        function HeroJNAlertMediator(viewComponent) {
            var _this = _super.call(this, HeroJNAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        HeroJNAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_skill, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            this.fresh_yb();
            this.fresh_time();
            this.fresh_list();
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    view.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        HeroJNAlertMediator.prototype.mx_test = function (event) {
            this.view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HeroJNAlertMediator.prototype.close_self = function () {
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroJNAlert.S_NAME);
        };
        Object.defineProperty(HeroJNAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroJNAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.skill_list.dataProvider = null;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_skill, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_skill, this);
            view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        Object.defineProperty(HeroJNAlertMediator.prototype, "hproxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        /*------------------监听消息------------------*/
        HeroJNAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_TIME,
                mx.MX_NOTICE.HERO_SKILL_LVUP,
                mx.MX_NOTICE.BUY_SKILLPOINT_SUCCESS,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.FRESH_DJS,
                mx.MX_NOTICE.CURRENCY_CHANGED,
            ];
        };
        HeroJNAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    if (notification.getType() != "ybi") {
                        break;
                    }
                case mx.MX_NOTICE.FRESH_DJS://购买银币成功
                    this.fresh_yb();
                    this.fresh_list();
                    break;
                case mx.MX_NOTICE.FRESH_TIME:
                    if (notification.getType() == "skill") {
                        this.fresh_time();
                    }
                    break;
                case mx.MX_NOTICE.HERO_SKILL_LVUP:
                    this.fresh_list(data);
                    this.fresh_time();
                    //重新校验技能提示，购买了技能点，或者消耗了技能点
                    this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "jn" });
                    break;
                case mx.MX_NOTICE.BUY_SKILLPOINT_SUCCESS:
                    this.fresh_time();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                default:
                    break;
            }
        };
        HeroJNAlertMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "v_jn_l1"://技能升级
                    var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    var tar = this.view.skill_list.getChildAt(0);
                    tar = tar.levelup_b;
                    tar.dispatchEvent(evt);
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    break;
            }
        };
        /*-----------------时间文本刷新-------------------*/
        HeroJNAlertMediator.prototype.fresh_time = function () {
            var view = this.view;
            var info = this.hproxy.c_skill_info;
            var cold = Number(info.cold);
            var time = mx.Tools.format_second(cold);
            var text1;
            var text2 = mx.Tools.format(mx.Lang.j0005, time); //倒计时
            var num = info.num;
            var num_t;
            if (num) {
                view.buy_b.visible = false;
                // view.tip_bg.source = "ztlxiao_png";
                view.tip_g.width = 469;
                view.tip_g.left = 27;
                num_t = "  " + num + "  ";
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
                if (num >= Number(api.MaxSkillPoints)) {
                    text2 = mx.Lang.j0013;
                }
                else if (cold == 0) {
                    text2 = mx.Lang.j0014; //刷新中
                }
                api = null;
            }
            else {
                view.buy_b.visible = false;
                //   view.tip_bg.source = "ztlxiao_png";
                view.tip_g.width = 318;
                view.tip_g.right = 59;
                // text1 = Tools.format(Lang.j0002, time);
                text2 = "   " + mx.Tools.format(mx.Lang.j0002, time) + mx.Lang.j0012;
                num_t = " 0 ";
            }
            this.view.skillpoint_g.removeChildren();
            this.view.skillpoint_g.addChild(mx.Tools.draw_cirsiderec(0, 0, (num_t.length) * 11 - 10, 28, 0x8A6FC4));
            view.tip_t.textFlow = [
                { text: num_t, style: { "textColor": 0xffffff } },
            ];
            view.tip_t1.textFlow = [
                { text: text2 },
            ];
        };
        /*-----------------------升级成功后列表刷新----------------------*/
        HeroJNAlertMediator.prototype.fresh_list = function (data) {
            var view = this.view;
            var item_info = [];
            var chero = this.hproxy.get_chero_info();
            var cskills = chero.skills; //当前英雄技能
            var all_skills = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, 'CasterID', chero.mid); //英雄所有技能
            for (var j in all_skills) {
                var skill = all_skills[j]; //当前校验的技能
                var stype = skill.SkillName.split("_")[1];
                if (stype == 'atk') {
                    continue;
                }
                if (typeof skill.Awake != "undefined" && skill.Awake == "TRUE") {
                    continue;
                }
                var guangxiao = Number(skill.skill_id) == Number(data); //升级技能后回调显示光效
                var cskill = cskills[skill.skill_id];
                var skill_lv = skill.InitLevel;
                var kaiqi = 0; //未开启
                if (cskill) {
                    var cxx = Number(skill.Unlock);
                    skill_lv = Number(cskill.skill_level);
                    if (cxx <= Number(chero.star)) {
                        kaiqi = 1; //已开启
                    }
                    else if (skill_lv > 1) {
                        kaiqi = 2; //提前开启
                    }
                    if (skill_lv > chero.level) {
                        skill_lv = chero.level; //为测试方便，修正为显示到可能的最高级
                    }
                }
                item_info.push({
                    "hid": chero.id,
                    "skill_id": skill.skill_id,
                    "unlock": skill.Unlock,
                    "level": skill_lv,
                    "guangxiao": guangxiao || false,
                    "kaiqi": kaiqi
                });
            }
            all_skills = null;
            item_info.sort(function (a, b) {
                return a.unlock - b.unlock;
            });
            if (view.skill_scroll.viewport) {
                var old = view.skill_scroll.viewport.scrollV;
                view.skill_list.dataProvider = new eui.ArrayCollection(item_info);
                view.skill_list.validateNow();
                view.skill_scroll.viewport.scrollV = old;
            }
            else {
                view.skill_list.dataProvider = new eui.ArrayCollection(item_info);
            }
        };
        /*------------------------------购买技能--------------------------*/
        HeroJNAlertMediator.prototype.buy_skill = function () {
            this.hproxy.buy_skill();
        };
        HeroJNAlertMediator.prototype.fresh_yb = function () {
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            if (dproxy.get_currency("ybi") >= 10000)
                this.view.yb_n_t.text = "" + Math.floor((dproxy.get_currency("ybi") / 10000)) + mx.Lang.wan;
            else
                this.view.yb_n_t.text = "" + dproxy.get_currency("ybi");
            this.view.havecoin_g.addChild(mx.Tools.draw_cirsiderec(0, 0, 50 + (this.view.yb_n_t.text.length) * 11, 28, 0x8C70C4));
        };
        HeroJNAlertMediator.prototype.buy_yb = function (evt) {
            this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
        };
        HeroJNAlertMediator.NAME = "HeroJNAlertMediator";
        return HeroJNAlertMediator;
    }(puremvc.Mediator));
    mx.HeroJNAlertMediator = HeroJNAlertMediator;
    __reflect(HeroJNAlertMediator.prototype, "mx.HeroJNAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroJNAlertMediator.js.map
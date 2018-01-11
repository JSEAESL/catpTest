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
 * @cy/17.3.13
 * jjc敌人render
 */
var mx;
(function (mx) {
    var JJCDRRender = (function (_super) {
        __extends(JJCDRRender, _super);
        function JJCDRRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCDRRender.prototype.init_render = function () {
            this.dataChanged();
            this.tz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCDRRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.tz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCDRRender.prototype.btn_click = function (e) {
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            jproxy.cur_enemy = data;
            jproxy.cur_enemy.fuchou = false;
            switch (e.currentTarget) {
                case this.tz_b:
                    if (jproxy.my_chance <= 0) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jjc07 });
                    }
                    else if (jproxy.res_time > 0) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jjc08 });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.JJCQueAlert.S_NAME,
                            "param": 3
                        });
                    }
                    break;
                case this.tx_p:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JJCDetailAlert.S_NAME });
                    break;
            }
        };
        JJCDRRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.name_t.text = data.name;
            this.rank_t.text = mx.Lang.jjc04 + "：" + data.rank;
            this.vip_t.text = data.vip;
            this.lv_t.text = mx.Lang.dji + "：" + data.level;
            this.tx_p.source = "tx70_" + data.avatar + "_png";
            var zli = 0;
            var obj = {};
            for (var k in data.query) {
                var hero = data.query[k];
                obj.equip = hero.equip;
                obj.level = hero.hero_info.level;
                obj.mid = hero.hero_info.did;
                obj.quality = hero.hero_info.quality;
                obj.star = hero.hero_info.star;
                obj.skills = hero.skill;
                for (var t in hero.battle_soul) {
                    if (typeof hero.battle_soul[t].level == "undefined") {
                        hero.battle_soul[t] = { "level": hero.battle_soul[t] };
                    }
                }
                obj.fy_skill = hero.battle_soul;
                var nine_word = hero.nine_word || [0, 0, 0, 0, 0, 0, 0, 0, 0];
                zli += mx.FightTools.cal_fight_power(obj, null, data.dress, data.all_mid, nine_word);
            }
            this.zl_t.text = mx.Lang.zli + "：" + zli;
        };
        return JJCDRRender;
    }(mx.BasicRender));
    mx.JJCDRRender = JJCDRRender;
    __reflect(JJCDRRender.prototype, "mx.JJCDRRender");
})(mx || (mx = {}));
//# sourceMappingURL=JJCDRRender.js.map
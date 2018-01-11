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
 * @cy/2017.3.15
 *  jjc详情alert
 */
var mx;
(function (mx) {
    var JJCDetailAlert = (function (_super) {
        __extends(JJCDetailAlert, _super);
        function JJCDetailAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCDetailAlert.mx_support = function () {
            return ["assets.jjc_detail"];
        };
        JJCDetailAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            this.fc_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fuchou, this);
            var enemy = jproxy.cur_enemy;
            this.tx_p.source = "tx70_" + enemy.avatar + "_png";
            this.name_t.text = enemy.name;
            this.rank_t.text = enemy.rank;
            this.vip_t.text = enemy.vip;
            this.lv_t.text = "【Lv." + enemy.level + "】";
            var arr = [];
            this.hero_list.itemRenderer = mx.TeamHeroRender2;
            for (var k in enemy.query) {
                var info = enemy.query[k].hero_info;
                var obj = {};
                obj.mid = info.did;
                obj.quality = info.quality;
                obj.level = info.level;
                obj.star = info.star;
                obj.notype = true;
                obj.hero_name = true;
                obj.chicun = 96;
                obj.size = 16;
                obj.cor = 0x6e57a3;
                arr.push(obj);
            }
            arr.reverse();
            this.hero_list.dataProvider = new eui.ArrayCollection(arr);
            this.fc_b.visible = enemy.fuchou;
        };
        JJCDetailAlert.prototype.fuchou = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
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
        };
        JJCDetailAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hero_list.dataProvider = null;
            this.fc_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fuchou, this);
        };
        JJCDetailAlert.S_NAME = "JJCDetailAlert";
        return JJCDetailAlert;
    }(mx.AlertView));
    mx.JJCDetailAlert = JJCDetailAlert;
    __reflect(JJCDetailAlert.prototype, "mx.JJCDetailAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCDetailAlert.js.map
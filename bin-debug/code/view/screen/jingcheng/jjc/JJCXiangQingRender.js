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
 * @cy/17.3.29
 * jjc战报详情render
 */
var mx;
(function (mx) {
    var JJCXiangQingRender = (function (_super) {
        __extends(JJCXiangQingRender, _super);
        function JJCXiangQingRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCXiangQingRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hero.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCXiangQingRender.prototype.init_render = function () {
            this.hero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        JJCXiangQingRender.prototype.btn_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var data = this.data;
            if (typeof data.hero_id != 'undefined') {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CHERO_INFO,
                    "id": data.hero_id,
                });
            }
        };
        JJCXiangQingRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.currentState = this.skin.currentState = data.state;
            var obj = {
                "mid": data.dragon_id,
                "chicun": 90,
                "quality": data.quality,
            };
            this.hero.data = obj;
            var param = {
                'num': data.star,
                'res': 'pinzhixing',
                'gap': (90 - mx.MX_COMMON.HP_LEVEL * 24 * 0.8) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            this.xx.init_multiui(param);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.dragon_id);
            this.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level) + api.hero_name;
            this.zw_p.visible = !data.alive;
            this.demage.set_res({ "down": "dzqkjdtdchen_png" });
            this.damage_t.text = Math.floor(data.damage) + "";
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            var att_id = jproxy.cur_fight.user_id;
            var def_id = jproxy.cur_fight.to_id;
            var myself = (data.state == "att" && att_id == Number(Main.USER_ID)) || (data.state == "def" && def_id == Number(Main.USER_ID));
            var up = myself ? "dzqkjfjdtiao_png" : "dzqkdfjdtiao_png";
            this.demage.set_res({ "up": up });
            this.demage.value = Math.floor(data.damage / data.total * 100);
            this.demage.direction = data.state == "att" ? "ltr" : "rtl";
        };
        return JJCXiangQingRender;
    }(mx.BasicRender));
    mx.JJCXiangQingRender = JJCXiangQingRender;
    __reflect(JJCXiangQingRender.prototype, "mx.JJCXiangQingRender");
})(mx || (mx = {}));
//# sourceMappingURL=JJCXiangQingRender.js.map
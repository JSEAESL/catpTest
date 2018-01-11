/**
 *   @author qianjun、mx
 *   @date 2016.8.29
 *   @desc 技能培养render
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
    var SkillLevelUpRender = (function (_super) {
        __extends(SkillLevelUpRender, _super);
        function SkillLevelUpRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillLevelUpRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.levelup_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.levelup, this);
            this.skill_icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        };
        SkillLevelUpRender.prototype.init_render = function () {
            this.init_listener();
            this.dataChanged();
        };
        SkillLevelUpRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', data.skill_id);
            var lv = Number(data.level) - Number(api.InitLevel) + 1;
            this.skill_icon.source = "skill" + data.skill_id + "_png";
            switch (data.kaiqi) {
                case 0://未开启
                    this.xiaohao_g.visible = this.levelup_b.visible = false;
                    //  this.bg_p.source = "wjsdchen_png";
                    this.background_g.addChild(mx.Tools.draw_cirhornrec(0, 0, 469, 127, 10, 0xededed));
                    var str2 = mx.Tools.format(mx.Lang.j0028, api.SC_name, data.unlock);
                    var str3 = mx.Tools.format(mx.Lang.j0030, data.unlock);
                    this.desc_t.textFlow = mx.Tools.setKeywordColor2(str2, [0xf84345]);
                    this.desclv_t.textFlow = mx.Tools.setKeywordColor2(str3, [0xf84345]);
                    mx.Tools.mx_grayfy(this.skill_icon);
                    break;
                case 1://已开启
                    this.xiaohao_g.visible = this.levelup_b.visible = true;
                    //     this.bg_p.source = "jnkuang_png";
                    this.background_g.addChild(mx.Tools.draw_cirhornrec(0, 0, 469, 127, 10, 0xe2ddf6));
                    this.desc_t.text = mx.Tools.format(mx.Lang.j0028, api.SC_name);
                    this.desclv_t.text = mx.Tools.format(mx.Lang.j0029, lv);
                    mx.Tools.mx_grayfy(this.skill_icon, true);
                    mx.Tools.mx_grayfy(this.levelup_b, true);
                    break;
                case 2://提前开启
                    this.xiaohao_g.visible = false;
                    this.levelup_b.visible = true;
                    this.desc_t.text = mx.Tools.format(mx.Lang.j0028, api.SC_name);
                    this.desclv_t.text = mx.Tools.format(mx.Lang.j0029, lv);
                    this.background_g.addChild(mx.Tools.draw_cirhornrec(0, 0, 469, 127, 10, 0xededed));
                    //     this.goldbackground_g.addChild( Tools.draw_cirsiderec(0,0,103,30,0xbeb6de));
                    //  this.bg_p.source = "wjsdchen_png";
                    mx.Tools.mx_grayfy(this.skill_icon);
                    mx.Tools.mx_grayfy(this.levelup_b);
                    break;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            var chero = hproxy.get_chero_info();
            var has = dproxy.get_currency("ybi");
            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLUPCOST, 'id', data.level);
            if (!api2) {
                api2 = {
                    "price": 0
                };
            }
            var str = Number(chero.level) <= Number(data.level) ? "jhaniuh_png" : "jhanius_png";
            this.levelup_b.set_ssres(str);
            if (api2) {
                this.price_t.text = api2.price;
                this.price_t.textColor = 0xffffff;
                var has_1 = dproxy.get_currency("ybi");
                if (has_1 < Number(api2.price)) {
                    this.price_t.textColor = 0xf84345;
                }
            }
            if (this.xiaohao_g.visible) {
                this.goldbackground_g.removeChildren();
                this.goldbackground_g.addChild(mx.Tools.draw_cirsiderec(0, 0, this.price_t.text.length * 13 + 60, 30, 0xbeb6de));
            }
            if (data.guangxiao) {
                var zg = new mx.GeneralEffect("jnsj");
                this.ef_g.addChild(zg);
                zg.play_by_times(1);
            }
        };
        SkillLevelUpRender.prototype.init_listener = function () {
            this.levelup_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelup, this);
            this.skill_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        };
        SkillLevelUpRender.prototype.showTips = function (e) {
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": this.width,
                "h": this.height,
                "type": "tip_skill",
                "args": this.data,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        SkillLevelUpRender.prototype.levelup = function (evt) {
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            if (cd.kaiqi == 1) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_SKILL_LEVELUP,
                    "id": cd.hid,
                    "skill_id": cd.skill_id,
                });
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, 'skill_id', cd.skill_id);
                var cneed = Math.min(api.Unlock, 4);
                api = null;
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.j0027, cneed) });
            }
        };
        return SkillLevelUpRender;
    }(mx.BasicRender));
    mx.SkillLevelUpRender = SkillLevelUpRender;
    __reflect(SkillLevelUpRender.prototype, "mx.SkillLevelUpRender");
})(mx || (mx = {}));
//# sourceMappingURL=SkillLevelUpRender.js.map
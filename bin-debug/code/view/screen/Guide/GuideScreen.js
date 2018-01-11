/**
*   @author mx
*   @date 2016.10.9
*   @desc 引导主界面
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
    var GuideScreen = (function (_super) {
        __extends(GuideScreen, _super);
        function GuideScreen(data) {
            var _this = _super.call(this, data) || this;
            _this.touchEnabled = false;
            return _this;
        }
        GuideScreen.mx_support = function () {
            return ["assets.guide", "api.GUIDESTEP", "api.SOUND"];
        };
        GuideScreen.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.GuideMediator(this));
            this.msg_g.left = 80;
            this.tyuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
            this.bg0_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
            this.skip_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip_click, this);
            this.music_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);
            if (this.adata && this.adata.skip) {
                facade.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, this.adata);
                facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                return;
            }
            this.fresh_screen(this.adata);
        };
        GuideScreen.prototype.skip_click = function (e) {
            this.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME); //关闭战斗弹窗。
            facade.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
        };
        GuideScreen.prototype.rect_click = function (e) {
            this.visible = false; //点击之后隐藏当前引导，直到下一步引导出现
            var facade = mx.ApplicationFacade.getInstance();
            if (this.c_music) {
                this.c_music = null;
                facade.sendNotification(mx.MX_NOTICE.CLOSE_MUSIC, true);
            }
            var cd = this.adata;
            if (cd) {
                if (cd.gkey == "m_yxd" || cd.gkey == "m_rw" || cd.gkey == "m_hzs") {
                    mx.DataTool.getInstance().data_tool(cd.gkey + cd.id);
                }
                if (cd.next) {
                    facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                facade.sendNotification(mx.MX_NOTICE.GUIDE_INFO, cd.touchrect);
            }
        };
        GuideScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.tyuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
            this.bg0_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
            this.skip_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip_click, this);
            this.music_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);
            if (this.c_music) {
                this.c_music = null;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_MUSIC, true);
            }
            egret.Tween.removeTweens(this.next_p2);
            mx.ApplicationFacade.getInstance().removeMediator(mx.GuideMediator.NAME);
        };
        GuideScreen.prototype.fresh_screen = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            this.music_b.visible = false;
            this.msg_tip_g.touchEnabled = false;
            this.msg_tip_g.touchChildren = false;
            this.role_p.touchEnabled = false;
            if (!data) {
                this.visible = false;
                facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                return;
            }
            this.adata = data;
            this.visible = true;
            ////console.log("screen : ", data);
            this.avg_g.visible = this.msg_g.visible = false;
            this.msg_g.visible = this.skip_b.visible = this.adata.gkey == "ydzd"; //引导战斗时显示msg和跳过按钮
            if (data.touchrect) {
                var c_k = data.touchrect.split("_")[0];
                switch (c_k) {
                    case "v": //从弹窗获取引导位置。
                    case "s"://从场景获取引导位置。
                        facade.sendNotification(mx.MX_NOTICE.GUIDE_POS, data.touchrect); //获取引导位置。
                        break;
                    case "j"://没有点击直接发送消息。
                        this.rect_click();
                        break;
                    case "n"://全屏点击，然后发送消息
                        this.reset_pos();
                        break;
                }
            }
            else {
                this.reset_pos(); //不传参数时，全屏点击
            }
        };
        GuideScreen.prototype.reset_pos = function (pos) {
            this.reset_rect_g(pos); //重置响应区域
            if (pos) {
                this.ef_g.visible = true;
                this.reset_ef_g(); //添加引动点击动画
            }
            else {
                this.ef_g.visible = false;
                this.msg_g.y = mx.Tools.screen_height * 0.618;
            }
            this.reset_msg_g();
        };
        GuideScreen.prototype.play_music = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                "name": this.c_music, "type": "yuyin"
            });
        };
        GuideScreen.prototype.reset_msg_g = function () {
            var data = this.adata;
            if (data.msg && data.msg != "") {
                this.msg_g.visible = true;
            }
            else {
                return;
            }
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME));
            var str = data.msg;
            var cmk = '';
            if (str.indexOf("{10}") > -1) {
                str = str.replace("{10}", gproxy.slt_info.name);
                cmk = this.get_sound_name(data.sound_id);
            }
            else if (str.indexOf("{15}") > -1) {
                str = str.replace("{15}", gproxy.slt_info.rname);
            }
            else if (str.indexOf("{3}") > -1) {
                var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                var c_zn = void 0;
                if (pproxy['hzs_list1'] && pproxy['hzs_list1'][1] && pproxy['hzs_list1'][1][0]) {
                    c_zn = pproxy['hzs_list1'][1][0];
                }
                var csex = c_zn ? c_zn.sex : 1; //默认女
                if (csex == 1) {
                    str = str.replace("{3}", mx.Lang.hg046); //公主
                }
                else {
                    str = str.replace("{3}", mx.Lang.hg045); //皇子
                }
                cmk = this.get_sound_name(data.sound_id, 3, csex);
            }
            else if (str.indexOf("{7}") > -1) {
                var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                var c_zn = void 0;
                if (pproxy['hzs_list1'] && pproxy['hzs_list1'][1] && pproxy['hzs_list1'][1][0]) {
                    c_zn = pproxy['hzs_list1'][1][0];
                }
                var csex = c_zn ? c_zn.sex : 1; //默认女
                if (csex == 1) {
                    str = str.replace("{7}", mx.Lang.p0057); //公主
                }
                else {
                    str = str.replace("{7}", mx.Lang.p0056); //皇子
                }
            }
            else {
                cmk = this.get_sound_name(data.sound_id);
            }
            this.msg_t.text = str; //引导文本
            if (RES.hasRes(cmk + "_mp3")) {
                this.music_b.visible = true;
                this.c_music = cmk;
                this.play_music();
            }
        };
        GuideScreen.prototype.get_sound_name = function (sound_id, type, sex) {
            if (type === void 0) { type = 10; }
            var sid = 0;
            if (String(sound_id).indexOf(",") < 0 && String(sound_id).indexOf("_") < 0) {
                sid = Number(sound_id);
            }
            else {
                var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME));
                var sound_arr = sound_id.split(",");
                var arr1 = {};
                var tmp = void 0;
                for (var k in sound_arr) {
                    tmp = sound_arr[k].split("_");
                    arr1[tmp[1]] = tmp[0];
                }
                if (type == 10) {
                    sid = Number(arr1[gproxy.slt_role]);
                }
                else if (type == 3) {
                    if (sex) {
                        sid = Number(arr1[sex]);
                    }
                    else {
                        sid = Number(arr1[1]);
                    }
                }
                else {
                    sid = 1;
                }
            }
            var sound_name = mx.Tools.get_guide_sound(sid);
            return sound_name;
        };
        GuideScreen.prototype.reset_rect_g = function (pos) {
            var screen_width = 720;
            var screen_height = mx.Tools.screen_height;
            var rect = this.bg0_rect;
            if (!pos) {
                this.tyuan.visible = false;
                rect.visible = true;
                pos = { "x": 0, "y": 0, "width": 720, "height": screen_height };
            }
            else {
                this.tyuan.visible = true;
                rect.visible = false;
                pos.y += Math.ceil((pos.height - 150) / 2);
                pos.x += Math.ceil((pos.width - 150) / 2);
                pos.width = 150;
                pos.height = 150;
            }
            for (var k in pos) {
                rect[k] = pos[k]; //屏蔽没有宽高导致引导无法点击
                this.tyuan[k] = pos[k];
            }
            this.bg1_rect.height = rect.y < 0 ? 0 : rect.y; //上
            this.bg2_rect.y = this.bg3_rect.y = rect.y; //左右
            this.bg2_rect.height = this.bg3_rect.height = rect.height;
            this.bg2_rect.width = rect.x < 0 ? 0 : rect.x;
            this.bg3_rect.width = Math.max(0, screen_width - rect.x - rect.width);
            this.bg4_rect.y = rect.y + rect.height; //下
            this.bg4_rect.height = Math.max(0, screen_height - rect.y - rect.height); //下
            if (rect.y > screen_height * 2 / 3) {
                this.msg_g.y = rect.y - 180;
            }
            else {
                this.msg_g.y = screen_height * 0.618 + 100;
            }
        };
        GuideScreen.prototype.reset_ef_g = function () {
            var rect = this.bg0_rect;
            var basex = rect.x + rect.width * 0.5;
            var basey = rect.y + rect.height * 0.5;
            var ydef = this.ef_g.getChildByName("yddh");
            if (!ydef) {
                ydef = new mx.GeneralEffect("yddh");
                ydef.play_by_times(-1);
                ydef.name = "yddh";
                this.ef_g.addChild(ydef);
            }
            ydef.x = basex;
            ydef.y = basey;
            ydef.scaleX = ydef.scaleY = 1.5;
            var ef = this.ef_g.getChildByName("guide");
            if (!ef) {
                ef = new mx.GeneralEffect("dianji");
                ef.play_by_times(-1);
                ef.name = "guide";
                this.ef_g.addChild(ef);
            }
            if (basex > 480) {
                ef.x = basex - 20;
                ef.scaleX = -1;
            }
            else {
                ef.x = basex + 20;
                ef.scaleX = 1;
            }
            if (basey < mx.Tools.screen_height - 60) {
                ef.y = basey + 20;
            }
            else {
                ef.y = basey - 20;
            }
        };
        GuideScreen.S_NAME = "GuideScreen";
        return GuideScreen;
    }(mx.BasicView));
    mx.GuideScreen = GuideScreen;
    __reflect(GuideScreen.prototype, "mx.GuideScreen");
})(mx || (mx = {}));
//# sourceMappingURL=GuideScreen.js.map
/**
*   @author mx
*   @date 2015.1.3
*   @desc 人鱼简介
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
    var XueTongAlert = (function (_super) {
        __extends(XueTongAlert, _super);
        function XueTongAlert(cd) {
            var _this = _super.call(this, cd) || this;
            _this.hero2zn = {
                "304": 63401,
                "305": 63402,
                "306": 63403,
                "307": 63404,
            };
            _this.weiba_event = "";
            _this.event = "";
            return _this;
        }
        XueTongAlert.mx_support = function () {
            return ["assets.xuetong", "api.XUETONGTIP"];
        };
        XueTongAlert.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuetong_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.init_lh();
        };
        XueTongAlert.prototype.init_lh = function () {
            var c_mn = this.adata;
            var mid = Number(c_mn.mid);
            if (mid == 303) {
                this.title_p.source = "yjlong_png";
                this.bg.source = "s1610_jpg";
                this.jianjie_p.source = "yjlxxi_png";
                this.dg_g.horizontalCenter = this.dg_g.bottom = 0; //布局
                this.init_mn_dg();
            }
            else if (mid == 307) {
                this.title_p.source = "hysle_png";
                this.bg.source = "s1536_jpg";
                this.jianjie_p.source = "sljjie_png";
                this.dg_g.top = this.dg_g.bottom = this.dg_g.left = this.dg_g.right = 0; //布局
                this.huyao_sex = 'nanhu';
                if (mx.Tools.check_drgon()) {
                    this.init_hy_dg("nanhu");
                    this.init_hy_dg("nvhu");
                    this.weiba_play("nanhu");
                    this.weiba_play("nvhu");
                    this.event = "cxian_over";
                    this.huyao_nan.display.visible = true;
                    this.huyao_nan.animation.play("cxian", 1);
                    this.weiba_event = "cxian_over";
                    this.weiba_nan.display.visible = true;
                    this.weiba_nan.animation.play("cxian", 1);
                }
                else {
                    var p = new eui.Image("zn" + (this.hero2zn[this.adata.mid] + (this.huyao_sex == "nanhu" ? 1000 : 0)) + "_png");
                    p.y = 180;
                    this.dg_g.addChild(p);
                }
                //8s后转换
                this.timeout = egret.setTimeout(this.change_huyao, this, mx.Tools.check_drgon() ? 8000 : 4000, "nvhu");
            }
        };
        XueTongAlert.prototype.add_static_hy = function () {
            var str = "zn" + (this.hero2zn[this.adata.mid] + (this.huyao_sex == "nanhu" ? 1000 : 0)) + "_png";
            var p = this.dg_g.getChildAt(0);
            p.source = str;
            p.y = 180;
            this.dg_g.addChildAt(p, 0);
        };
        XueTongAlert.prototype.init_mn_dg = function () {
            if (this.dg_g.numChildren) {
                return;
            }
            if (mx.Tools.check_drgon()) {
                var armature = this.armature = mx.TweenTool.getInstance().get_dragon("zn54301", 2);
                var cdg = armature.display;
                this.dg_g.addChild(cdg);
                cdg.x = -90;
                cdg.y = -150;
                armature.animation.play();
            }
            else {
                this.dg_g.addChild(new eui.Image("zn54301_png"));
            }
        };
        XueTongAlert.prototype.init_hy_dg = function (name) {
            var armature = mx.TweenTool.getInstance().get_dragon(name, 2);
            this.dg_g.addChild(armature.display);
            armature.display.x = 360;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 0.8 * 1.5; //龙骨资源暂时放大
            armature.animation.timeScale = 1;
            armature.display.visible = name == "nanhu";
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.huyao_loop, this);
            armature.animation.play("zding", 0);
            name == "nanhu" ? this.huyao_nan = armature : this.huyao_nv = armature;
        };
        XueTongAlert.prototype.change_huyao = function (name) {
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            //烟雾
            var ef = new mx.GeneralEffect("yhywu");
            ef.play_by_times(1); //只播放一次
            ef.horizontalCenter = 0;
            ef.verticalCenter = 400;
            this.dg_g.addChild(ef);
            this.huyao_sex = name;
            //转为狐妖女
            if (name == "nvhu") {
                if (mx.Tools.check_drgon()) {
                    this.event = "xshi_over";
                    this.huyao_nan.animation.play("xshi", 1);
                    this.weiba_event = "xshi_over";
                    this.weiba_nan.animation.play("xshi", 1);
                    this.event = "cxian_over";
                    this.huyao_nv.display.visible = true;
                    this.huyao_nv.animation.play("cxian", 1);
                    this.weiba_event = "cxian_over";
                    this.weiba_nv.display.visible = true;
                    this.weiba_nv.animation.play("cxian", 1);
                }
                else {
                    this.add_static_hy();
                }
            }
            else {
                if (mx.Tools.check_drgon()) {
                    this.event = "xshi_over";
                    this.huyao_nv.animation.play("xshi", 1);
                    this.weiba_event = "xshi_over";
                    this.weiba_nv.animation.play("xshi", 1);
                    this.event = "cxian_over";
                    this.huyao_nan.display.visible = true;
                    this.huyao_nan.animation.play("cxian", 1);
                    this.weiba_event = "cxian_over";
                    this.weiba_nan.display.visible = true;
                    this.weiba_nan.animation.play("cxian", 1);
                }
                else {
                    this.add_static_hy();
                }
            }
            //8s后再次转换 
            this.timeout = egret.setTimeout(this.change_huyao, this, mx.Tools.check_drgon() ? 8000 : 4000, name == 'nvhu' ? "nanhu" : "nvhu");
        };
        XueTongAlert.prototype.weiba_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.weiba_nan : this.weiba_nv;
            switch (this.weiba_event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    //obj.animation.stop();
                    break;
            }
            this.weiba_event = "";
        };
        XueTongAlert.prototype.huyao_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.huyao_nan : this.huyao_nv;
            switch (this.event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    // obj.animation.stop();
                    break;
            }
            this.event = "";
        };
        XueTongAlert.prototype.weiba_play = function (name) {
            var armature = mx.TweenTool.getInstance().get_dragon(name + 9);
            this.dg_g.addChild(armature.display);
            armature.display.x = 225;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 0.8 * 1.5;
            armature.animation.timeScale = 1;
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.weiba_loop, this);
            armature.animation.play("zding", 0);
            armature.display.visible = false;
            name == "nanhu" ? this.weiba_nan = armature : this.weiba_nv = armature;
            var idx1 = this.dg_g.getChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display);
            var idx2 = this.dg_g.getChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display);
            if (idx1 < idx2) {
                this.dg_g.setChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display, idx2);
                this.dg_g.setChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display, idx1);
            }
        };
        XueTongAlert.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.target) {
                case this.back_b:
                    this.close_self();
                    break;
                case this.xuetong_rect:
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", this.adata.mid);
                    var wenhua = Number(api.wenhua);
                    var target = this.xuetong_rect;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "blood",
                        "wenhua": wenhua,
                        "daishu": 0
                    });
                    break;
            }
        };
        XueTongAlert.prototype.close_self = function () {
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuetong_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            this.huyao_nan = null;
            this.huyao_nv = null;
            this.weiba_nan = null;
            this.weiba_nv = null;
            if (mx.Tools.check_drgon() && this.armature) {
                this.armature.animation.stop();
                this.dg_g.removeChild(this.armature.display);
                this.armature = null;
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XueTongAlert.S_NAME);
        };
        XueTongAlert.S_NAME = "XueTongAlert";
        return XueTongAlert;
    }(mx.AlertView));
    mx.XueTongAlert = XueTongAlert;
    __reflect(XueTongAlert.prototype, "mx.XueTongAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XueTongAlert.js.map
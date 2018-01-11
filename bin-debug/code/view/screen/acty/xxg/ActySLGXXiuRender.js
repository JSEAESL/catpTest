/**
 *   @author cy
 *   @date 2017.10.17
 *   @desc 黑名单render
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
    var ActySLGXXiuRender = (function (_super) {
        __extends(ActySLGXXiuRender, _super);
        function ActySLGXXiuRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.djs = 0;
            _this.a_num = 1;
            return _this;
        }
        ActySLGXXiuRender.prototype.init_render = function () {
            this.dataChanged();
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.djs_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.lq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ActySLGXXiuRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.djs_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.lq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                this.timer = null;
            }
            this.remove_dragon();
        };
        ActySLGXXiuRender.prototype.TimerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.djs <= 1) {
                this.djs_g.visible = false;
                if (Number(data.state) == 1) {
                    var facade = mx.ApplicationFacade.getInstance();
                    var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
                    for (var k in aproxy.xxg_xxiu_info) {
                        if (aproxy.xxg_xxiu_info[k].zinv_id == data.zinv_id) {
                            aproxy.xxg_xxiu_info.splice(k, 1);
                            break;
                        }
                    }
                    facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                }
            }
            else {
                this.djs--;
                this.djs_t.text = mx.Tools.format_second(this.djs);
            }
        };
        ActySLGXXiuRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            switch (e.currentTarget) {
                case this.djs_b:
                    var money = Math.ceil(this.djs / 360);
                    var guan = aproxy.xxg_xxiu_tab == 1 ? mx.Lang.xxg19 : mx.Lang.xxg20;
                    var str = Number(this.data.result) == 2 ? mx.Tools.format(mx.Lang.xxg24, money) : mx.Tools.format(mx.Lang.xxg18, money, guan);
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            't': mx.MX_NETS.CS_XXG_QCCD,
                            "zinv_id": this.data.zinv_id,
                        },
                        "param": str
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case this.lq_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_XXG_LQJL,
                        "zinv_id": this.data.zinv_id,
                    });
                    break;
            }
        };
        ActySLGXXiuRender.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            switch (this.fun_b.res_name) {
                case "txznv_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_GET_ZN,
                        "type": 1,
                    });
                    break;
                case "cjcxuan_png":
                    aproxy.xxg_zi_tempdata = this.data;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_XXG_XXIU,
                        "type": 1,
                        "zinv_id": this.data.zinv_id,
                    });
                    break;
                case "cjfxuan_png":
                    aproxy.xxg_zi_tempdata = this.data;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_XXG_XXIU,
                        "type": 2,
                        "zinv_id": this.data.zinv_id,
                    });
                    break;
                case "rdjjian_png":
                    aproxy.xxg_zi_tempdata = this.data;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_XXG_XXIU,
                        "type": 3,
                        "zinv_id": this.data.zinv_id,
                    });
                    break;
            }
        };
        ActySLGXXiuRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            view.lj_g.visible = view.state_p.visible = view.fun_b.visible = view.djs_g.visible = false;
            view.mlz_g.visible = view.avatar.visible = view.name_t.visible = true;
            if (d.xwyd) {
                view.bg.source = "cxkwei_png";
                view.mlz_g.visible = view.avatar.visible = view.name_t.visible = false;
                view.fun_b.visible = true;
                view.fun_b.set_ssres("txznv_png");
                return;
            }
            view.state_p.visible = true;
            view.bg.source = 'cxg' + (this.itemIndex % 8 + 1) + '_png';
            if (d.shang || Number(d.result) == 0) {
                view.fun_b.visible = true;
                view.state_p.visible = false;
                var res = void 0;
                switch (aproxy.xxg_xxiu_tab) {
                    case 1:
                        res = "cjcxuan_png";
                        break;
                    case 2:
                        res = "cjfxuan_png";
                        break;
                    case 3:
                        res = "rdjjian_png";
                        break;
                }
                view.fun_b.set_ssres(res);
            }
            else if (aproxy.xxg_xxiu_tab == 3) {
                view.state_p.source = Number(d.result) >= 60 ? "lpai_png" : "lpzi_png";
                view.bg.source = Number(d.result) >= 60 ? view.bg.source : "lgpzi_png";
                if (Number(d.result) >= 60) {
                    this.lj_g.visible = true;
                    this.ylq_p.visible = !(Number(d.state) == 0);
                }
            }
            else {
                view.state_p.source = Number(d.result) == 1 ? "xfrxuan_png" : "xflxuan_png";
                view.bg.source = Number(d.result) == 1 ? view.bg.source : "lgpzi_png";
                if (Number(d.result) == 1) {
                    this.lj_g.visible = true;
                    this.ylq_p.visible = !(Number(d.state) == 0);
                }
            }
            if (this.lj_g.visible && !this.ylq_p.visible) {
                this.check_longgu();
            }
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(8, 220, 8);
            shape.graphics.drawCircle(86, 220, 8);
            shape.graphics.drawRect(0, 0, 96, 220);
            shape.graphics.drawRect(8, 0, 80, 228);
            shape.graphics.endFill();
            view.addChild(shape);
            shape.x = 2;
            shape.y = 1;
            view.avatar.mask = shape;
            view.avatar.source = mx.Tools.get_zn_res(d.avatar, 'jq');
            var meili = Number(d.meili);
            view.name_t.text = d.name.split('').join('\n');
            view.name_t.textColor = mx.Tools.num2color(meili);
            view.mli_t.text = meili + "";
            var now_time = Math.floor(new Date().getTime() / 1000);
            this.djs = Number(d.cd) - (now_time - aproxy.xxg_temp_time);
            this.djs_t.text = mx.Tools.format_second(this.djs);
            if (d.cd && Number(d.cd) > 0) {
                this.djs_g.visible = true;
                if (!this.timer) {
                    this.timer = new egret.Timer(1000);
                    this.timer.addEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                    this.timer.start();
                }
            }
            else if (Number(d.state) == 1 && aproxy.xxg_xxiu_tab != 3) {
                for (var k in aproxy.xxg_xxiu_info) {
                    if (aproxy.xxg_xxiu_info[k].zinv_id == d.zinv_id) {
                        aproxy.xxg_xxiu_info.splice(k, 1);
                        break;
                    }
                }
                facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
            }
        };
        ActySLGXXiuRender.prototype.check_longgu = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (mx.AppConfig.CURR_SCENE_ID == mx.ActyXXGXXiuScreen.S_NAME) {
                this.a_num = 0;
                var armature = mx.TweenTool.getInstance().get_dragon("xeczbxiang");
                armature.display.x = 27;
                armature.display.y = 26;
                armature.animation.play();
                armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                this.lj_g.addChild(armature.display);
                this.armature2 = armature;
            }
            else {
                this.remove_dragon();
            }
        };
        ActySLGXXiuRender.prototype.com_loop = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            dragonBones.WorldClock.clock.remove(this.armature2);
            this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            this.lj_g.removeChildAt(this.lj_g.numChildren - 1);
            this.check_longgu();
        };
        ActySLGXXiuRender.prototype.remove_dragon = function () {
            if (this.armature2) {
                dragonBones.WorldClock.clock.remove(this.armature2);
                this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            }
            this.armature2 = null;
        };
        return ActySLGXXiuRender;
    }(mx.BasicRender));
    mx.ActySLGXXiuRender = ActySLGXXiuRender;
    __reflect(ActySLGXXiuRender.prototype, "mx.ActySLGXXiuRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActySLGXXiuRender.js.map
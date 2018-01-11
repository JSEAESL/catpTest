/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 後宮使用，增大点击区域
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
    var LueDuoRender = (function (_super) {
        __extends(LueDuoRender, _super);
        function LueDuoRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LueDuoRender.prototype.init_render = function () {
            this.dataChanged();
            var view = this;
            view.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.head_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LueDuoRender.prototype.start_djs = function () {
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.start();
            }
        };
        LueDuoRender.prototype.start_djs2 = function () {
            if (!this.timer2) {
                this.timer2 = new egret.Timer(1000);
                this.timer2.addEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2.start();
            }
        };
        LueDuoRender.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            lproxy.set_cur_user(this.data);
            switch (e.currentTarget) {
                case view.head_b:
                    break;
                case view.fun_b:
                    if (this.djs_n) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_XIANGQ,
                            "id": this.data.user_id
                        });
                    }
                    else {
                        for (var k in this.data) {
                            lproxy.lueduo_target[k] = this.data[k];
                        }
                        lproxy.fight_type = "fight";
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                            "id": this.data.user_id
                        });
                    }
                    break;
            }
        };
        LueDuoRender.prototype.timerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.djs_n <= 0) {
                if (this.timer) {
                    this.timer.stop();
                    this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                    this.timer = null;
                }
            }
            else {
                this.djs_n--;
                this.xy_t.text = mx.Tools.format(mx.Lang.ld012, mx.Tools.format_second(this.djs_n));
            }
        };
        LueDuoRender.prototype.timerFunc2 = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.gsq_n <= 0) {
                if (this.timer2) {
                    this.timer2.stop();
                    this.timer2.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                    this.timer2 = null;
                }
                this.dataChanged();
                /*
                if (Number(data.haizi_num) > 0 || Number(data.edf_num) > 3) {//可以掠夺
                    this.zn_t.textFlow = [{ "text": Lang.ld088 }, { "text": Lang.ld079, "style": { "textColor": 0x60B7F3 } }];
                } else {
                    this.zn_t.textFlow = [{ "text": Lang.ld088 }, { "text": Lang.ld080, "style": { "textColor": 0xEB80BF } }];
                }
                */
            }
            else {
                this.gsq_n--;
                var str = mx.Tools.format(mx.Lang.ld077, data.guishu.name || "", mx.Tools.format_second(this.gsq_n));
                this.zn_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(200), 0x6eb55b]);
            }
        };
        LueDuoRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
            if (this.timer2) {
                this.timer2.stop();
                this.timer2.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2 = null;
            }
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.head_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LueDuoRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.name_t.text = d.name;
            view.vip_t.text = d.vip + '';
            view.lv_t.text = mx.Lang.dji + "：" + d.level;
            view.avatar.source = "tx78_" + d.avatar + "_png";
            view.gk_t.text = mx.Tools.format(mx.Lang.ld020, d.fangyu + '');
            view.qmd_t.text = d.qinmi + '';
            view.qmdu.left = view.name_t.left + view.name_t.width + 24;
            view.qmd_t.left = view.qmdu.left + 20 + 11;
            var fy = Number(d.fangyu);
            var hznum = Number(d.haizi_num);
            var fymax = 40 + 40 * Number(d.xian_level);
            this.data.fymax = fymax;
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (fy > fymax * 0.5 || this.data.guishu.name != gproxy.user_name) {
                view.fun_b.set_ssres('lduo_png');
            }
            else if (fy <= fymax * 0.5) {
                if (hznum > 0) {
                    view.fun_b.set_ssres('ldzinv_png');
                }
                else if (Number(this.data.edf_num) > 3) {
                    view.fun_b.set_ssres('ldfpin_png');
                }
                else {
                    view.fun_b.set_ssres('lduo_png');
                }
                if (Number(gproxy.user_xlv) < 9 || Number(this.data.xian_level) < 9) {
                    view.fun_b.set_ssres('lduo_png');
                }
            }
            var now_time = Math.floor(new Date().getTime() / 1000);
            var xy_state = now_time < Number(d.xiuyang);
            var bh_state = now_time < Number(d.baohu);
            if (xy_state) {
                this.djs_n = Number(this.data.xiuyang) - now_time;
                this.xy_t.text = mx.Tools.format(mx.Lang.ld012, mx.Tools.format_second(this.djs_n));
                view.avatar.source = 'tx78_shps_png';
                this.start_djs();
            }
            else if (fy < fymax * 0.5 && fy >= 0) {
                view.avatar.source = 'cjlian_png';
            }
            else {
                view.avatar.source = "tx78_" + d.avatar + "_png";
            }
            view.shps_p.visible = view.xy_t.visible = xy_state;
            //view.fun_b.visible = !xy_state;
            if (xy_state) {
                view.fun_b.set_ssres('xsldxq_png');
                view.zn_t.visible = false;
                view.lv_t.text = mx.Lang.ld068;
                view.gk_t.text = mx.Lang.ld069;
            }
            view.bao_p.visible = bh_state;
            if (this.data.guishu.time) {
                var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                this.gsq_n = Number(this.data.guishu.time) - (now_time - lproxy.fight_time);
                var str = mx.Tools.format(mx.Lang.ld077, this.data.guishu.name, mx.Tools.format_second(this.gsq_n));
                this.zn_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(200), 0x6eb55b]);
                this.start_djs2();
            }
            else if (Number(gproxy.user_xlv) < 9 || Number(this.data.xian_level) < 9) {
                this.zn_t.textFlow = [{ "text": mx.Lang.ld088 }, { "text": mx.Lang.ld080, "style": { "textColor": 0xEB80BF } }];
            }
            else if (hznum > 0 || Number(this.data.edf_num) > 3) {
                this.zn_t.textFlow = [{ "text": mx.Lang.ld088 }, { "text": mx.Lang.ld079, "style": { "textColor": 0x60B7F3 } }];
            }
            else {
                this.zn_t.textFlow = [{ "text": mx.Lang.ld088 }, { "text": mx.Lang.ld080, "style": { "textColor": 0xEB80BF } }];
            }
            if (bh_state && !xy_state) {
                view.fun_b.set_ssres('lduo_png');
                this.zn_t.textFlow = [{ "text": mx.Lang.ld088 }, { "text": mx.Lang.ld080, "style": { "textColor": 0xEB80BF } }];
            }
            //haizi_num=0&&edf_num<3&&fangyu=0山河破碎
            /*if(d.fangyu == 0 && d.haizi_num == 0 && d.edf_num < 3){
                view.fun_b.visible = false;
                view.avatar.source = "tx78_shps_png";
            }*/
        };
        return LueDuoRender;
    }(mx.BasicRender));
    mx.LueDuoRender = LueDuoRender;
    __reflect(LueDuoRender.prototype, "mx.LueDuoRender");
})(mx || (mx = {}));
//# sourceMappingURL=LueDuoRender.js.map
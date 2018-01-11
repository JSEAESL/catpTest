/**
 *   @author cy
 *   @date 2016.12.30
 *   @desc 养心殿妃子一览render
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
    var FPYLRender = (function (_super) {
        __extends(FPYLRender, _super);
        function FPYLRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FPYLRender.prototype.init_render = function () {
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.start();
            }
            this.wqj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hero_click, this);
            this.dataChanged();
        };
        FPYLRender.prototype.btn_click = function (e) {
            //温情酒 对话框
            var data = this.data;
            if (this.yun == false) {
                var str = mx.Tools.format(mx.Lang.hgwqj, data.hname);
                this.wqj_t.textFlow = mx.Tools.setKeywordColor2(str, [data.namecolor, 0xffe328]);
            }
            else {
                var str = mx.Tools.format(mx.Lang.hgwqjhy, data.hname);
                this.wqj_t.textFlow = mx.Tools.setKeywordColor2(str, [data.namecolor]);
            }
            this.wqj_g.visible = !this.wqj_g.visible;
        };
        FPYLRender.prototype.hero_click = function (e) {
            if (e.target == this.wqj_b) {
                return;
            }
            else if (this.wqj_g.visible) {
                this.wqj_g.visible = false;
                return;
            }
            var c_id = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.set_curr_mn(c_id.id);
            facade.sendNotification(mx.MX_NOTICE.RECORD_SCROLLV);
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": c_id.mid,
                "type": 1,
            });
        };
        FPYLRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.arr = data.status;
            this.yun = false;
            this.mulity = false; //是否是多状态
            this.djsdi_p.visible = this.djs_t.visible = false;
            var yun_arr = ["2", "3", "4"]; //是否怀孕
            for (var m in yun_arr) {
                if (this.arr.indexOf(yun_arr[m]) >= 0) {
                    this.yun = true;
                    break;
                }
            }
            this.set_text();
            this.set_state();
            this.wqj_b.visible = this.wqj_g.visible = this.wdjs_g.visible = false;
            var ctime = (new Date().getTime()) / 1000;
            var delay = Math.floor(ctime - data.time || 0);
            if (delay <= 0) {
                delay = 0;
            }
            this.wqj_res = Number(data.wqj_res) - delay;
            if (this.wqj_res > 0) {
                this.wqj_b.visible = this.wdjs_g.visible = true;
                this.set_wqj();
                this.wdjs_t.text = mx.Tools.format_second(this.wqj_res);
            }
            else {
                this.wqj_res = 0;
            }
            var top = 9;
            if (data.ren_lian && data.ren_lian != "") {
                mx.Tools.url_image(data.ren_lian, null, this.get_mnres, this);
                top = 1;
            }
            else {
                var nid = data.mid;
                if (data.avatar && data.avatar != "" && Number(data.avatar) > mx.MX_COMMON.SC_LH_MAX) {
                    nid = Number(data.avatar);
                }
                var mnres = mx.Tools.get_mn_res(nid, "tx");
                RES.getResAsync(mnres, this.get_mnres, this);
            }
            this.man_tx.top = top;
        };
        FPYLRender.prototype.get_mnres = function (td, key) {
            var view = this.man_tx;
            if (view && td) {
                if (key && mx.AppConfig.GameTag == "WX") {
                    view.source = key;
                }
                else {
                    view.source = td;
                }
                if (td.textureWidth > 200) {
                    view.width = 135;
                    view.height = Math.round(td.textureHeight * 135 / td.textureWidth);
                }
                else {
                    view.width = td.textureWidth;
                    view.height = td.textureHeight;
                }
            }
        };
        FPYLRender.prototype.set_wqj = function () {
            if (!this.timer2) {
                this.timer2 = new egret.Timer(1000);
                this.timer2.addEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2.start();
            }
        };
        FPYLRender.prototype.timerFunc2 = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.wqj_res <= 1) {
                this.wqj_b.visible = this.wqj_g.visible = this.wdjs_g.visible = false;
            }
            else {
                this.wqj_res--;
                this.wdjs_t.text = mx.Tools.format_second(this.wqj_res);
            }
        };
        FPYLRender.prototype.timerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.yun) {
                var facade = mx.ApplicationFacade.getInstance();
                var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                var c_mn = pproxy.get_curr_mn(this.data.id);
                data.res_time--;
                if (data.res_time <= 0) {
                    c_mn.status = 0;
                    var yun_arr = ["2", "3", "4"]; //是否怀孕
                    for (var m in yun_arr) {
                        if (this.arr.indexOf(yun_arr[m]) >= 0) {
                            this.yun = false;
                            this.arr.splice(this.arr.indexOf(yun_arr[m]), 1);
                            break;
                        }
                    }
                    if (this.arr.length) {
                        c_mn.status = this.arr.join("|");
                    }
                    this.set_text();
                    this.timer.stop();
                    this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                    this.timer = null;
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CHECK_HUAIYUN);
                }
                else {
                    if (Number(data.res_time)) {
                        this.djs = mx.Tools.format_second(data.res_time);
                    }
                }
                this.set_state();
            }
        };
        FPYLRender.prototype.set_text = function () {
            var data = this.data;
            this.status = [];
            if (Number(data.res_time)) {
                this.djs = mx.Tools.format_second(data.res_time);
            }
            if (this.arr.length == 1) {
                this.status = [{
                        "text": mx.Tools.status_to_str(Number(data.status), "fz"),
                        "style": { "textColor": mx.Tools.num2color(Number(data.status), true) }
                    }];
                if (Number(data.sb_level)) {
                    this.status = [{ "text": mx.Lang.ysjj, "style": { "underline": true, "textColor": mx.Tools.num2color(1, true) } }];
                }
            }
            else {
                this.mulity = true;
                var temp = ["2", "3", "4", "1", "6"]; //孕病撤牌
                for (var k in temp) {
                    if (this.arr.indexOf(temp[k]) >= 0) {
                        this.status.push({
                            "text": mx.Tools.status_to_str(Number(temp[k]), "fz"),
                            "style": { "textColor": mx.Tools.num2color(temp[k], true) }
                        });
                        this.status.push({
                            "text": " / ",
                        });
                    }
                }
                this.status.splice(this.status.length - 1, 1);
            }
        };
        FPYLRender.prototype.on_remove = function (evt) {
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
            this.wqj_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hero_click, this);
        };
        FPYLRender.prototype.set_state = function () {
            if (this.mulity) {
                if (this.data.res_time > 0) {
                    this.djsdi_p.visible = this.djs_t.visible = true;
                    this.djs_t.text = this.djs;
                }
                else {
                    var temp2 = ["1", "6"]; //速运咸蛋特殊处理
                    this.status = [];
                    for (var k in temp2) {
                        if (this.arr.indexOf(temp2[k]) >= 0) {
                            this.status.push({
                                "text": mx.Tools.status_to_str(Number(temp2[k]), "fz"),
                                "style": { "textColor": mx.Tools.num2color(temp2[k], true) }
                            });
                            this.status.push({
                                "text": " / ",
                            });
                        }
                    }
                    this.status.splice(this.status.length - 1, 1);
                }
            }
            else if (this.yun) {
                if (this.djs) {
                    this.status = [{
                            "text": mx.Tools.status_to_str(this.data.status, "fz") + " ",
                            "style": { "textColor": mx.Tools.num2color(Number(this.data.status), true), size: 22 }
                        }, {
                            "text": this.djs || "00:00:00",
                            "style": { "textColor": mx.Tools.num2color(Number(this.data.status), true), size: 20 }
                        }];
                }
                else {
                    this.status = [{
                            "text": mx.Tools.status_to_str(0, "fz"),
                            "style": { "textColor": mx.Tools.num2color(0, true) }
                        }];
                }
            }
            this.status_t.textFlow = this.status;
        };
        return FPYLRender;
    }(mx.BasicRender));
    mx.FPYLRender = FPYLRender;
    __reflect(FPYLRender.prototype, "mx.FPYLRender");
})(mx || (mx = {}));
//# sourceMappingURL=FPYLRender.js.map
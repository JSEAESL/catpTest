/**
 *   @author wxw qianjun
 *   @date 2017.11.7
 *   @desc 活动render
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
    var ActyRender = (function (_super) {
        __extends(ActyRender, _super);
        function ActyRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.time_type = ["xianshitag_png", "yongjiutag_png"];
            _this.textcolor = { '1': 0xFFFFFF, '2': 0x395E95, '4': 0xA44816, '5': 0xFFFFFF, '997': 0x71622B };
            return _this;
        }
        ActyRender.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        ActyRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ActyRender.prototype.btn_click = function (e) {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            // //console.log(this.get_time(aproxy.acty_time[13], "nyrsf", 2));
            if (d.popname && d.popname != "") {
                ////console.log(d.popname);
                switch (d.popname) {
                    case mx.YHJSScreen.S_NAME:
                        if (gproxy.huyao) {
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YHJSScreen.S_NAME);
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd057 });
                        }
                        break;
                    case mx.ShouChongLastAlert.S_NAME:
                        if (gproxy.last_pay) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShouChongLastAlert.S_NAME });
                            //facade.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_LAST_PAY });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0013 });
                        }
                        break;
                    case mx.ShouChongAlert.S_NAME:
                        if (Number(gproxy.user_sc) != 2) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": d.popname });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd058 });
                        }
                        break;
                    default:
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": d.popname });
                        break;
                }
            }
            else {
                if (d.acty_type) {
                    if (Number(d.acty_type) == 997) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.WxActyAlert.S_NAME,
                            "param": {
                                "type": d.acty_type
                            }
                        });
                    }
                    else if (Number(d.acty_type) == 6) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_WB_YBNL_YQJL });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_ACTY_DATA,
                            "key_id": Number(d.acty_type) - 1
                        });
                    }
                    // facade.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name": WxActyAlert.S_NAME,
                    //     "param": {
                    //         "type": d.acty_type
                    //     }
                    // })
                }
            }
        };
        ActyRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ActyRender.prototype.get_time = function (time, type, bq) {
            var timestart = mx.Tools.format_time(time.start, type, bq, true);
            var timeend = mx.Tools.format_time(time.end, type, bq, true);
            return timestart + ' - ' + timeend;
        };
        ActyRender.prototype.set_time = function () {
            if (!this.timer2) {
                this.timer2 = new egret.Timer(1000);
                this.timer2.addEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2.start();
            }
        };
        ActyRender.prototype.timerFunc2 = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.res--;
            this.dtime_t.text = mx.Tools.format_second2(this.res);
        };
        ActyRender.prototype.fresh_tuijian = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var cd = this.data;
            view.acty_g.visible = false;
            var cold = 0;
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var aproxy = (facade.retrieveProxy(mx.ActyProxy.NAME));
            switch (cd.popname) {
                case mx.ZLCBPaiHangAlert.S_NAME:
                    cold = gproxy.zlcb_res;
                    view.dtime_t.left = 500;
                    view.dtime_t.top = 169;
                    view.time_t.visible = view.acty_dsc.visible = false;
                    this.dtime_t.visible = true;
                    break;
                case mx.YHJSScreen.S_NAME:
                    cold = aproxy.yhu_res;
                    var ts = aproxy.hy_huodong_ts;
                    this.ts_p.visible = true;
                    this.ts_p.source = ts.ts ? "tishi_png" : (ts.lq ? null : "tishi3_png");
                    this.dtime_t.visible = true;
                    break;
                case mx.ShouChongLastAlert.S_NAME:
                    var now_time = Math.floor(new Date().getTime() / 1000);
                    if (aproxy.last_time) {
                        if (now_time > aproxy.last_time.start && now_time < aproxy.last_time.end) {
                            cold = aproxy.last_time.end - now_time;
                        }
                        else {
                            cold = 0;
                        }
                    }
                    else {
                        cold = 0;
                    }
                    this.dtime_t.top = 136;
                    this.dtime_t.left = 450;
                    this.dtime_t.textColor = cd.textcolor;
                    this.dtime_t.visible = true;
                    break;
            }
            if (this.dtime_t.visible) {
                if (cold > 86400) {
                    cold -= 86400;
                }
                this.res = cold;
                if (this.res > 0) {
                    this.set_time();
                }
                else {
                    this.res = 0;
                }
                this.dtime_t.text = mx.Tools.format_second2(this.res);
            }
        };
        ActyRender.prototype.fresh_xianshi = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var cd = this.data;
            var aproxy = (facade.retrieveProxy(mx.ActyProxy.NAME));
            view.acty_g.visible = true;
            view.actytype_p.source = 'xianshitag_png';
            view.acty_dsc.text = cd.desc;
            view.time_t.text = mx.Tools.format(mx.Lang.hd059, mx.Tools.format_time(aproxy.acty_time[cd.acty_type].start, 'yrsf', 2, true), mx.Tools.format_time(aproxy.acty_time[cd.acty_type].end, 'yrsf', 2, true)); //Tools.format();
            view.time_t.textColor = this.textcolor[cd.acty_type];
        };
        ActyRender.prototype.fresh_changqi = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var cd = this.data;
            var aproxy = (facade.retrieveProxy(mx.ActyProxy.NAME));
            view.acty_g.visible = true;
            view.actytype_p.source = 'yongjiutag_png';
            view.acty_dsc.text = Number(cd.acty_type) == 997 ? mx.Lang.hd027 : cd.desc;
            view.time_t.text = Number(cd.acty_type) && Number(cd.acty_type) != 6 ? mx.Lang.hd005 : '';
            view.time_t.textColor = this.textcolor[cd.acty_type];
        };
        ActyRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            this.ts_p.visible = false;
            this.dtime_t.visible = false;
            this.actytype_p.source = this.time_type[cd.curr_type - 2];
            this.actybg_p.source = cd.bg;
            this.time_t.text = cd.time;
            // this.time_t.textColor = cd.textcolor || 0x395E95;
            this.acty_dsc.text = cd.desc;
            this.acty_g.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            switch (cd.curr_type) {
                case 1:
                    this.fresh_tuijian();
                    break;
                case 2:
                    this.fresh_xianshi();
                    break;
                case 3:
                    this.fresh_changqi();
                    break;
            }
        };
        return ActyRender;
    }(mx.BasicRender));
    mx.ActyRender = ActyRender;
    __reflect(ActyRender.prototype, "mx.ActyRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActyRender.js.map
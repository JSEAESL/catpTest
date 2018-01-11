/**
*   @author mx
*   @date 2015.1.3
*   @desc 通用彈窗
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
    var AlertView = (function (_super) {
        __extends(AlertView, _super);
        function AlertView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AlertView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_av_ok"://确定按钮
                    tar = this.ok_b;
                    break;
            }
            return tar;
        };
        AlertView.prototype.init_view = function () {
            var cd = this.adata || {};
            if (this.ok_b) {
                if (cd.ok_b) {
                    this.ok_b.set_ssres(cd.ok_b);
                }
                this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            if (this.exit_b) {
                if (cd.exit_b) {
                    this.exit_b.set_ssres(cd.exit_b);
                }
                this.exit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            switch (cd.btn_n) {
                case 1:
                    this.ok_b.horizontalCenter = 0;
                    this.exit_b.visible = false;
                    break;
                case 0:
                    this.ok_b.visible = false;
                    this.exit_b.visible = false;
                    break;
            }
            if (this.bg_rect) {
                this.bg_rect.fillAlpha = 0.65;
                this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            if (this.close_b) {
                this.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            this.init_view_by_type();
        };
        AlertView.prototype.init_view_by_type = function () {
            var cd = this.adata;
            if (!cd) {
                return;
            }
            var str = cd.param;
            if (typeof str == "string") {
                this.str_t.text = str;
                var gb = void 0;
                if (cd.style) {
                    this.str_t.textAlign = cd.style.textAlign;
                    this.str_t.width = cd.style.width;
                }
            }
            else {
                this.str_t.textFlow = str; //设置富文本
                if (cd.style) {
                    this.str_t.size = cd.style.size;
                    this.str_t.width = cd.style.width;
                }
            }
            if (cd.czjsu) {
                this.timer = new egret.Timer(1000);
                var price = Math.ceil(cd.time * cd.price);
                this.str_t.textFlow = mx.Tools.setStrColor(mx.Lang.hzs02, [price + ''], [0xFF0000]);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.start();
            }
            if (cd.tishi) {
                this.tishi_p.source = cd.tishi;
                //console.log(cd.tishi)
            }
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GuideProxy.NAME);
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.ac_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        AlertView.prototype.mx_test = function (event) {
            this.ac_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        AlertView.prototype.close_self = function (e) {
            var c_class = this["__class__"];
            var c_arr = c_class.split(".");
            var cname = c_arr[1];
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, cname);
        };
        AlertView.prototype.btn_click = function (evt) {
            var view = this;
            var c_d = this.adata || {};
            var facade = mx.ApplicationFacade.getInstance();
            this.close_self();
            if (view.ok_b && evt.currentTarget == view.ok_b) {
                if (c_d.notice_ok) {
                    facade.sendNotification(c_d.notice_ok, c_d.sdata_ok);
                }
            }
            if (view.exit_b && evt.currentTarget == view.exit_b) {
                if (c_d.notice_exit) {
                    facade.sendNotification(c_d.notice_exit, c_d.sdata_exit, c_d.type_exit);
                }
            }
            if (view.bg_rect && evt.currentTarget == view.bg_rect) {
                if (c_d.notice_exit) {
                    facade.sendNotification(c_d.notice_exit, c_d.sdata_exit, c_d.type_exit);
                }
            }
            if (view.close_b && evt.currentTarget == view.close_b) {
                if (c_d.notice_exit) {
                    facade.sendNotification(c_d.notice_exit, c_d.sdata_exit, c_d.type_exit);
                }
            }
        };
        AlertView.prototype.timerFunc = function () {
            var cd = this.adata;
            if (cd.czjsu) {
                cd.time--;
                var hz = cd.hzdata;
                if (cd.time < 0 && Number(hz.zhuangtai) == 0) {
                    cd.time = 7200;
                    hz.zhuangtai = 1;
                    cd.sdata_ok.jieduan = 1;
                }
                else if (cd.time < 0) {
                    cd.time = 0;
                    this.timer.stop();
                }
                var price = Math.ceil(cd.time * cd.price);
                this.str_t.textFlow = mx.Tools.setStrColor(mx.Lang.hzs02, [price + ''], [0xFF0000]);
            }
        };
        AlertView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            if (this.ac_g) {
                this.ac_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            }
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
            if (this.ok_b) {
                this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            if (this.exit_b) {
                this.exit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            if (this.bg_rect) {
                this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            if (this.close_b) {
                this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
        };
        AlertView.S_NAME = "AlertView";
        return AlertView;
    }(mx.BasicView));
    mx.AlertView = AlertView;
    __reflect(AlertView.prototype, "mx.AlertView");
})(mx || (mx = {}));
//# sourceMappingURL=AlertView.js.map
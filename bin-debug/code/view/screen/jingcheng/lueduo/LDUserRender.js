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
    var LDUserRender = (function (_super) {
        __extends(LDUserRender, _super);
        function LDUserRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDUserRender.prototype.init_render = function () {
            this.dataChanged();
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LDUserRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var d = this.data;
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            if (d.qipao) {
                var c_d = lproxy.get_cur_user();
                lproxy.qingjia_id = this.data.user_id;
                lproxy.fuchou_id = c_d.jl_id;
                lproxy.fight_type = "help";
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_LUEDUO_CHECK,
                    "id": c_d.user_id
                });
                //facade.sendNotification(MX_NOTICE.CLOSE_POP, LDQJAlert.S_NAME);
            }
            else {
                lproxy.set_cur_user(this.data);
                lproxy.fight_type = "fight";
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                    "id": d.user_id
                });
            }
        };
        LDUserRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.name_t.text = d.name;
            view.vip_t.text = d.vip + '';
            view.lv_t.text = mx.Lang.dji + ': ' + d.level;
            view.qmdu_t.text = mx.Lang.qmdu + ': ' + d.qinmi;
            view.qmdu.left = view.qmdu_t.left + view.qmdu_t.width + 4;
            view.avatar.source = "tx78_" + d.avatar + "_png";
            var qj_gxi = [2, 3, 5];
            var gxibg = mx.Tools.qinmi_to_gxi(Number(d.qinmi));
            if (qj_gxi.indexOf(Number(d.guanxi)) >= 0) {
                view.gxibg.source = 'qjia_png';
            }
            else {
                view.gxibg.source = !d.guanxi ? 'lren_png' : gxibg;
            }
            view.gxibg.left = view.name_t.left + view.name_t.width + 8;
            view.fun_b.set_ssres('lduo_png');
            if (d.qipao) {
                view.fun_b.set_ssres("qyuan_png");
                if (d.yuanzhu) {
                    mx.Tools.mx_grayfy(view.fun_b);
                    this.startTalk();
                }
                else {
                    mx.Tools.mx_grayfy(view.fun_b, true);
                    view.qp_g.visible = false;
                }
            }
            else {
                view.qp_g.visible = false;
            }
        };
        LDUserRender.prototype.startTalk = function () {
            var view = this;
            view.qp_g.visible = true;
            if (!this.timer) {
                this.timer = new egret.Timer((9 + Math.ceil(Math.random() * 6)) * 1000);
            }
            else {
                return;
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.showTalk, this);
            this.timer.start();
            this.showTalk();
        };
        LDUserRender.prototype.showTalk = function () {
            var view = this;
            view.qp_g.visible = true;
            var arr = ["blnyci", "jrgli", "jrybang", "rxyshan"];
            var rand = Math.round(Math.random() * 3);
            view.dh_p.source = arr[rand] + "_png";
            egret.setTimeout(function () {
                if (view) {
                    view.qp_g.visible = false;
                }
            }, this, 5000);
        };
        LDUserRender.prototype.stopTalk = function () {
            this.qp_g.visible = false;
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.showTalk, this);
                this.timer = null;
            }
        };
        return LDUserRender;
    }(mx.BasicRender));
    mx.LDUserRender = LDUserRender;
    __reflect(LDUserRender.prototype, "mx.LDUserRender");
})(mx || (mx = {}));
//# sourceMappingURL=LDUserRender.js.map
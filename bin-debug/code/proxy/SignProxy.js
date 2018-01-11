/**
*   @author mx
*   @date 2015.2.25
*   @desc 签到数据管理
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
    var SignProxy = (function (_super) {
        __extends(SignProxy, _super);
        function SignProxy() {
            return _super.call(this, SignProxy.NAME) || this;
        }
        SignProxy.prototype.init_sign_info = function (data) {
            if (data.state == 1) {
                this.count = Number(data.count);
                this.has_sign = data.has_sign == 1;
                this.kind = data.kind;
                this.begin = data.begin;
                this.end = data.end;
                this.day = data.day;
                this.bu_q = data.bu_q;
                this.sign_box = data.box;
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.DailySignAlert.S_NAME
                });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        SignProxy.prototype.sign_cb = function (data) {
            var str;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (data.state) {
                case 1://签到过了
                    str = mx.Lang.s0000;
                    gproxy.set_tishi('qdao', false);
                    break;
                case 2://签到次数已满
                    str = mx.Lang.s0001;
                    return;
                case 3://成功
                    this.count++;
                    this.has_sign = true;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SIGN);
                    gproxy.set_tishi('qdao', false);
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        SignProxy.prototype.get_sign_cycle = function () {
            var s = mx.Tools.format_time(this.begin, "yr");
            var e = mx.Tools.format_time(this.end, "yr");
            return s + "--" + e;
        };
        SignProxy.prototype.buqian_cb = function (data) {
            var str;
            switch (data.state) {
                case 1://今天还没签到
                    str = mx.Lang.s0002;
                    break;
                case 2://不能补签
                    str = mx.Lang.s0001;
                    return;
                case 3://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 4://成功
                    this.count = data.count;
                    this.bu_q++;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SIGN);
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        SignProxy.prototype.sign_box_cb = function (data) {
            var str = '';
            switch (data.state) {
                case 0://签到次数不足
                    str = mx.Lang.err01;
                    break;
                case 1://签到次数不足
                    str = mx.Lang.s0006;
                    break;
                case 2://已领取
                    str = mx.Lang.qf0009;
                    break;
                case 3://成功
                    this.sign_box = null;
                    this.sign_box = data.box;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SIGN);
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        SignProxy.NAME = "SignProxy";
        return SignProxy;
    }(puremvc.Proxy));
    mx.SignProxy = SignProxy;
    __reflect(SignProxy.prototype, "mx.SignProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=SignProxy.js.map
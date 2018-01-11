/**
*   @author mx qianjun
*   @date 2015.1.3
*   @desc 邮件主界面 改成弹窗
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
    var MailView = (function (_super) {
        __extends(MailView, _super);
        function MailView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailView.mx_support = function () {
            return ["assets.mail"];
        };
        MailView.prototype.init_view = function () {
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            gproxy.prev_mail = 0;
            var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.MailProxy.NAME));
            this.clear_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.exit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yjydu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.mail_list.itemRenderer = mx.MailRender;
            this.fresh_pop();
        };
        MailView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.mail_list.dataProvider = null;
            this.clear_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.exit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yjydu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        MailView.prototype.fresh_pop = function () {
            var view = this;
            var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.MailProxy.NAME));
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            gproxy.set_tishi('mail', false);
            if (proxy.mails && proxy.mails.length) {
                for (var i = 0; i < proxy.mails.length; i++) {
                    if (proxy.mails[i].state == 0) {
                        gproxy.set_tishi('mail', true);
                    }
                }
                view.mail_list.dataProvider = new eui.ArrayCollection(proxy.mails);
                view.mail_list.visible = true;
                view.nomail_g.visible = false;
                view.clear_b.visible = true;
                view.yjydu_b.visible = true;
            }
            else {
                view.mail_list.visible = false;
                view.nomail_g.visible = true;
                view.no_text.text = mx.Lang.mail_null;
                view.clear_b.visible = false;
                view.yjydu_b.visible = false;
            }
        };
        MailView.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.MailProxy.NAME));
            switch (evt.currentTarget) {
                case view.clear_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CLEAR_READ,
                    });
                    break;
                case view.yjydu_b:
                    if (proxy.have_gift) {
                        var data = {
                            name: mx.AlertView.S_NAME,
                            param: {
                                notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                                sdata_ok: {
                                    t: mx.MX_NETS.CS_LINGQU_ALL,
                                },
                                notice_exit: mx.MX_NOTICE.CLOSE_POP,
                                sdata_exit: mx.AlertView.S_NAME,
                                param: mx.Lang.m0011
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, data);
                        var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                        gproxy.prev_mail = 2;
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LINGQU_ALL,
                        });
                    }
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, MailView.S_NAME);
                    break;
            }
        };
        MailView.S_NAME = "MailView";
        return MailView;
    }(mx.BasicView));
    mx.MailView = MailView;
    __reflect(MailView.prototype, "mx.MailView");
})(mx || (mx = {}));
//# sourceMappingURL=MailView.js.map
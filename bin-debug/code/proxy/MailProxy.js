/**
*   @author mx
*   @date 2015.2.25
*   @desc 游戏货币，道具数据管理
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
    var MailProxy = (function (_super) {
        __extends(MailProxy, _super);
        function MailProxy() {
            var _this = _super.call(this, MailProxy.NAME) || this;
            _this.have_gift = false;
            return _this;
        }
        MailProxy.prototype.init_mail_info = function (data) {
            this.mails = data.mail;
            this.have_gift = false;
            for (var i in this.mails) {
                if (Number(this.mails[i].type) == 4 || Number(this.mails[i].type) == 3) {
                    this.have_gift = true;
                    break;
                }
            }
            this.mails.sort(function (a, b) {
                return Number(b.time) - Number(a.time);
            });
            //mxdebug-临时处理
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (Number(gproxy.user_lv) >= mx.MX_COMMON.JIAQUN_YOUJIAN && gproxy.tishi_data.qqqun) {
                this.mails.unshift({
                    "content": "一键加官方QQ群拿礼包咯！",
                    "state": !this.isread ? "0" : "1",
                    "time": Math.floor(new Date().getTime() / 1000),
                    "type": 44
                });
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME });
        };
        MailProxy.prototype.read_mail_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://沒有对应的邮件
                    str = mx.Lang.m0000;
                    this.c_mid = 0;
                    break;
                case 1: //礼包邮件
                case 2://文字邮件
                    var p_d = {
                        "name": mx.MailAlert.S_NAME,
                        "param": data,
                    };
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.MailView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    if (data.state == 2) {
                        this.check_mail_tishi();
                    }
                    break;
                default:
                    this.c_mid = 0;
                    str = mx.Lang.p0007;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        MailProxy.prototype.check_mail_tishi = function () {
            var new_mail = false;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            if (typeof this.c_mid != "undefined") {
                for (var i = 0; i < this.mails.length; i++) {
                    var d = this.mails[i];
                    if (d.id == this.c_mid) {
                        d.state = 1;
                    }
                    else if (d.state == 0) {
                        new_mail = true;
                    }
                }
            }
            gproxy.set_tishi('mail', new_mail);
        };
        MailProxy.prototype.delete_mail_by_id = function (flag) {
            var mails = this.mails;
            for (var i = 0, ln = mails.length; i < ln; i++) {
                if (mails[i].id == this.c_mid) {
                    mails.splice(i, 1);
                    break;
                }
            }
            this.c_mid = null;
            if (flag) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME });
            }
        };
        MailProxy.prototype.del_mail_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://非文字郵件不能刪除
                    str = mx.Lang.m0001;
                    break;
                case 1://刪除成功
                    this.delete_mail_by_id(true);
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        MailProxy.prototype.mail_reward_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://已经领取过了
                    str = mx.Lang.p0014;
                    break;
                case 1://领取成功
                    str = mx.Lang.p0016;
                    this.check_mail_tishi();
                    this.delete_mail_by_id(false);
                    return;
                case 2://背包空间不足
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        MailProxy.prototype.cdkey_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不存在
                    str = mx.Lang.m0002;
                    break;
                case 1://已经被使用过了
                    str = mx.Lang.m0003;
                    break;
                case 2://已经领取过了
                    str = mx.Lang.p0014;
                    break;
                case 3://没有对应的礼包
                    str = mx.Lang.m0004;
                    break;
                case 5://已添加至邮件
                    str = mx.Lang.m0005;
                    var gProxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    gProxy.set_tishi('mail', true);
                    break;
                case 6:
                    str = mx.Lang.m0013;
                    break;
                case 4: //添加邮件失败
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        MailProxy.prototype.lingqu_all = function (data) {
            var str;
            switch (data.state) {
                case 0://没有可领取的奖励
                    str = mx.Lang.m0012;
                    break;
                case 1://成功
                    if (!this.have_gift) {
                        for (var i = 0; i < this.mails.length; i++) {
                            this.mails[i].state = this.mails[i].state == 2 ? 2 : 1;
                        }
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.MailView.S_NAME);
                    }
                    this.check_mail_tishi();
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        MailProxy.prototype.clear_read = function (data) {
            this.delEle(this.mails);
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.m0007 });
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME });
        };
        MailProxy.prototype.delEle = function (arr) {
            for (var i = 0, flag = true, len = arr.length; i < len; flag ? i++ : i) {
                if (arr[i] && arr[i].state == 1) {
                    arr.splice(i, 1);
                    flag = false;
                }
                else {
                    flag = true;
                }
            }
        };
        MailProxy.NAME = "MailProxy";
        return MailProxy;
    }(puremvc.Proxy));
    mx.MailProxy = MailProxy;
    __reflect(MailProxy.prototype, "mx.MailProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=MailProxy.js.map
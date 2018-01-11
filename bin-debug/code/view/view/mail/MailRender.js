/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 邮件render
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
    var MailRender = (function (_super) {
        __extends(MailRender, _super);
        function MailRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.read_mail, this);
        };
        MailRender.prototype.init_render = function () {
            this.dataChanged();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.read_mail, this);
        };
        MailRender.prototype.read_mail = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var mproxy = (facade.retrieveProxy(mx.MailProxy.NAME));
            if (this.data.type == 44) {
                mproxy.mails[0].state = 1;
                mproxy.isread = true;
                var p_d = {
                    "name": mx.MailAlert.S_NAME,
                    "param": {
                        "awards": [
                            { "id": "0", "shuliang": "50000", "type": "1" },
                            { "id": "0", "shuliang": "60", "type": "2" },
                            { "id": "2000", "shuliang": "5", "type": "4" }
                        ],
                        "mesg": {
                            "title": "一键加官方QQ群拿礼包咯！",
                            "text": "点击加群一键加入官方QQ交流群，四海九洲的女皇玩家都会在这里交流游戏~~另外！划重点啦！官方QQ群正在火热发放【游戏礼包激活码】！加群后在群公告内的【加群大礼包】可获得,激活码可在游戏内的首页【活动】中兑换丰厚奖励！"
                        },
                        "type": 44
                    },
                };
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.MailView.S_NAME);
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                var param = {
                    "t": mx.MX_NETS.CS_READ_MAIL,
                    "id": this.data.id,
                };
                mproxy.c_mid = this.data.id;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
            }
        };
        MailRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.title_t.text = data.content;
            this.time_t.text = mx.Lang.m0006 + mx.Tools.format_time(parseInt(data.time), 'nyr');
            this.gift.visible = false;
            if (data.state == '1') {
                this.icon.source = "ydu_png";
                this.time_t.textColor = this.title_t.textColor = 0xa5a4a4;
                this.new_mail.visible = false;
            }
            else if (data.state == '2') {
                this.icon.source = "tstbiao_png";
                this.title_t.textColor = 0xff4b4b;
                this.new_mail.visible = false;
            }
            else {
                this.time_t.textColor = this.title_t.textColor = 0x4C416A;
                this.new_mail.source = "xyjian_png";
                switch (Number(data.type)) {
                    case 2://公告
                        this.icon.source = "ggtbiao_png";
                        break;
                    case 1://邮件
                        if (Number(data.kind) == 1) {
                            this.icon.source = "gwtbiao_png";
                        }
                        else {
                            this.icon.source = "sxtbiao_png";
                        }
                        break;
                    case 3: //物资
                    case 4: //礼包
                    case 5://加群邮件
                        this.icon.source = Number(data.type) == 3 ? "wztbiao_png" : "lbtbiao_png";
                        this.gift.visible = true;
                        this.new_mail.source = "klqu_png";
                        break;
                    case 44://临时加群邮件
                        this.icon.source = "gwtbiao_png";
                        break;
                }
                this.new_mail.visible = true;
            }
        };
        return MailRender;
    }(mx.BasicRender));
    mx.MailRender = MailRender;
    __reflect(MailRender.prototype, "mx.MailRender");
})(mx || (mx = {}));
//# sourceMappingURL=MailRender.js.map
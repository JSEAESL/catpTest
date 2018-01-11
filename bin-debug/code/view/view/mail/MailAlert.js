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
    var MailAlert = (function (_super) {
        __extends(MailAlert, _super);
        function MailAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailAlert.mx_support = function () {
            return ["assets.mailalert"];
        };
        MailAlert.prototype.init_view_by_type = function () {
            this.addqq_b.set_ssres("djjqun_png");
            this.zdle_b.set_ssres("zdle_btn_png");
            this.del_b.set_ssres("schu_png");
            this.del_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addqq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zdle_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.exit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.name_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var c_d = this.adata;
            this.title_t.text = c_d.mesg.title;
            this.con_t.text = "       " + c_d.mesg.text;
            var title_length = 15 * c_d.mesg.title.length + 20;
            this.flower_left.horizontalCenter = -title_length;
            this.flower_right.horizontalCenter = title_length;
            if (c_d.awards) {
                this.bg.source = "alertMbg_png";
                this.bg.width = 614;
                this.bg.height = 841;
                var rect = new egret.Rectangle(58, 77, 307, 163);
                this.bg.scale9Grid = rect;
                this.awards_g.visible = true;
                this.btn_g.visible = false;
                this.from_g.visible = false;
                this.item_list.itemRenderer = mx.GNumRender;
                for (var k in c_d.awards) {
                    c_d.awards[k].no_num = true;
                    c_d.awards[k].top = 100;
                    c_d.awards[k].chicun = 90;
                    c_d.awards[k].width = 90;
                    c_d.awards[k].di_size = 20;
                    c_d.awards[k].height = 120;
                    c_d.awards[k].di_cor = 0x6E57A3;
                }
                if (c_d.awards.length > 5) {
                    var new_l = new eui.TileLayout();
                    new_l.horizontalGap = 18;
                    new_l.verticalGap = 18;
                    new_l.requestedColumnCount = 5;
                    new_l.paddingTop = 7.5;
                    this.item_list.layout = new_l;
                    this.item_scro.bottom = 111;
                    this.get_b.bottom = 40;
                    this.hq_p.bottom = 111 + 138 * Math.ceil(c_d.awards.length / 5) - 10.5 + 4.5;
                    this.bg.height = 790 + 20 * Math.ceil(c_d.awards.length / 5);
                }
                this.item_list.dataProvider = new eui.ArrayCollection(c_d.awards);
                if (c_d.mail) {
                    this.get_b.set_ssres("yjlqaniu_png");
                }
                //来源头像
                if (c_d.feizi_info) {
                    this.from_g.visible = true;
                    this.show_fztx();
                    //调整from_g的位置
                    if (this.con_t.textHeight <= 204) {
                        var lay = this.text_g.layout;
                        lay.gap = 310 - this.con_t.textHeight - 111;
                    }
                }
                if (c_d.type && c_d.type == 44) {
                    this.get_b.set_ssres("djjqun_png");
                }
                else if (c_d.mesg.title == "女皇加群邀请函") {
                    this.get_b.set_ssres("djjqun_png");
                }
            }
            else {
                this.bg.source = "alertMbg_png";
                this.bg.width = 614;
                this.bg.height = 841;
                var rect = new egret.Rectangle(58, 77, 307, 163);
                this.bg.scale9Grid = rect;
                this.awards_g.visible = false;
                this.btn_g.visible = true;
                this.hq_p.bottom = 147;
                // from_id  大于0，表示用户id,小于0表示妃子id
                // from_id大于0时，必定有name和avatar
                // from_id小于0时，没有name和avatar参数，表示妃子已死亡
                // 有name和avatar表示妃子信息
                if (!c_d.mesg.from_id) {
                    this.from_g.visible = true;
                    this.xin.visible = false;
                    if (c_d.mesg.title.indexOf("掠夺") > -1) {
                        this.avatar.source = "a1201_png";
                        this.avatar.scaleX = 74 / 317;
                        this.avatar.scaleY = 74 / 317;
                        this.avatar.mask = new egret.Rectangle(0, 0, 720, 106 / this.avatar.scaleY);
                        this.name_t.text = "来自：柳意";
                        this.avatar.verticalCenter = 49.5;
                    }
                    else if (c_d.mesg.title.indexOf("水月庵的来信") > -1) {
                        this.avatar.source = "a1603_png";
                        this.avatar.scaleX = 74 / 354;
                        this.avatar.scaleY = 74 / 354;
                        this.avatar.mask = new egret.Rectangle(0, 0, 720, 106 / this.avatar.scaleY);
                        this.name_t.text = "来自：绝情师太";
                        this.avatar.verticalCenter = 49.5;
                    }
                }
                else {
                    var from_id = Number(c_d.mesg.from_id);
                    this.from_g.visible = true;
                    this.xin.visible = from_id < 0;
                    if (from_id < 0) {
                        this.show_fztx();
                    }
                    else if (from_id > 0) {
                        //用户
                        this.name_t.textFlow = [
                            { text: mx.Lang.m0008 },
                            { text: c_d.mesg.name, style: { "underline": true, "textColor": 0xFF2222 } },
                        ];
                        this.avatar.source = "tx70_" + c_d.mesg.avatar + "_png";
                        //this.avatar.scaleX = 74 / 98;
                        //this.avatar.scaleY = 74 / 98;
                        this.avatar.right = 22;
                        this.avatar.verticalCenter = 15;
                        this.xin.visible = false;
                    }
                    this.xin.right = this.name_t.textWidth + this.name_t.right + 6;
                }
                //调整from_g的位置
                if (this.con_t.textHeight <= 136) {
                    var lay = this.text_g.layout;
                    lay.gap = 1.5 * (207 - this.con_t.textHeight - 74);
                }
            }
        };
        MailAlert.prototype.show_fztx = function () {
            var c_d = this.adata.feizi_info;
            if (c_d.length == 0) {
                this.name_t.textFlow = [
                    { text: mx.Lang.m0008 },
                    { text: mx.Lang.m0009, style: { "textColor": 0xb8babb, "underline": true } },
                ];
                this.avatar.source = "fznmi_png";
            }
            else {
                var nid = c_d.mid;
                if (c_d.avatar && c_d.avatar != "" && Number(c_d.avatar) > mx.MX_COMMON.SC_LH_MAX) {
                    nid = Number(c_d.avatar);
                }
                this.avatar.source = mx.Tools.get_mn_res(nid, "tx");
                this.avatar.scaleX = 74 / mx.MX_COMMON.SC_TX_W;
                this.avatar.scaleY = 74 / mx.MX_COMMON.SC_TX_W;
                this.name_t.textFlow = [
                    { text: mx.Lang.m0008 },
                    { text: c_d.name, style: { "underline": true, "textColor": mx.Tools.num2color(Number(c_d.meili)) } },
                ];
            }
        };
        MailAlert.prototype.btn_click = function (evt) {
            var view = this;
            var c_d = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var flag = false;
            switch (evt.currentTarget) {
                case view.get_b://領取奖励
                    if (c_d.type && c_d.type == 44) {
                        var mproxy_1 = (facade.retrieveProxy(mx.MailProxy.NAME));
                        mproxy_1.mails.shift();
                        var gproxy_1 = facade.retrieveProxy(mx.GameProxy.NAME);
                        gproxy_1.tishi_data.qqqun = false;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_QQ_RECORD });
                        mx.Tools.add_qq();
                        break;
                    }
                    var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                    gproxy.prev_mail = 1;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_MAIL_REWARD,
                        "id": c_d.mail_id,
                    });
                    if (c_d.mesg.title == "女皇加群邀请函") {
                        mx.Tools.add_qq2();
                    }
                    break;
                case view.del_b://刪除邮件
                    var mproxy = (facade.retrieveProxy(mx.MailProxy.NAME));
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_DELETE_MAIL,
                        "id": mproxy.c_mid,
                    });
                    break;
                case view.addqq_b://加群
                    mx.Tools.add_qq();
                    break;
                case view.name_t:
                    var from_id = Number(c_d.mesg.from_id);
                    if (!from_id) {
                        return;
                    }
                    if (from_id < 0 && c_d.mesg.title.indexOf("国殇") == -1) {
                        if (this.avatar.source == "fznmi_png") {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.m0010 });
                        }
                        else {
                            var fproxy = (facade.retrieveProxy(mx.FriendProxy.NAME));
                            var fd = fproxy.get_curr_tx_friend();
                            if (fd) {
                                var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                                wproxy.setCurrFz(c_d.feizi_info);
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                    "name": mx.AVGView.S_NAME,
                                    "param": {
                                        "cd": c_d.feizi_info,
                                        "type": "tiaoxi",
                                        "title": mx.Lang.tx011,
                                        "cshu": Number(c_d.wqj),
                                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                                        "sdata_exit": mx.AVGView.S_NAME
                                    }
                                });
                            }
                            else {
                                //facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.m0010}); 
                            }
                        }
                    }
                    else if (from_id > 0) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": from_id,
                        });
                    }
                    else {
                    }
                    return;
                default:
                    flag = true;
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, MailAlert.S_NAME);
            if (flag) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME });
            }
        };
        MailAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            this.del_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addqq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zdle_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.exit_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.name_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        MailAlert.S_NAME = "MailAlert";
        return MailAlert;
    }(mx.AlertView));
    mx.MailAlert = MailAlert;
    __reflect(MailAlert.prototype, "mx.MailAlert");
})(mx || (mx = {}));
//# sourceMappingURL=MailAlert.js.map
/**
 *   @author mx
 *   @date 2017.11.12
 *   @desc 聊天render(联姻)
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
    var ChatLianyinRender = (function (_super) {
        __extends(ChatLianyinRender, _super);
        function ChatLianyinRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatLianyinRender.prototype.init_render = function () {
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.kjia_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tyi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jjue_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ChatLianyinRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var cproxy = (facade.retrieveProxy(mx.ChatProxy.NAME));
            var cd = this.data;
            if (evt.currentTarget == this.avatar_b) {
                if (Main.USER_ID != cd.user_id) {
                    facade.sendNotification(mx.MX_NOTICE.JUBAO_POP, this.itemIndex);
                }
            }
            else {
                cproxy.kanjia_lyzn_data = null;
                cproxy.kanjia_lyzn_data = this.data;
                if (evt.currentTarget == this.tyi_b) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHAT_KANJIA_AGREE,
                        "id": cd.other.kjia_id,
                    });
                }
                else if (evt.currentTarget == this.jjue_b) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHAT_KANJIA_JUJUE,
                        "id": cd.other.kjia_id,
                    });
                }
                else if (evt.currentTarget == this.kjia_b) {
                    if (Number(this.data.other.pinli == 5)) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kj06 });
                        return;
                    }
                    cproxy.chat_lyzn_data = this.data;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": this.data.other.mid,
                        "type": 12
                    });
                }
                else if (evt.currentTarget == this.ok_b) {
                    cproxy.pinli_selected = this.data.other.pinli;
                    cproxy.zinv_selected = this.data.other;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": this.data.other.mid,
                        "type": 11
                    });
                }
            }
        };
        ChatLianyinRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.kjia_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tyi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jjue_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ChatLianyinRender.prototype.dataChanged = function () {
            if (!this.skin || !this.data) {
                return;
            }
            var cd = this.data;
            if (this.data.other.type == "lyin_kjia") {
                this.fresh_pub();
            }
            else {
                this.fresh_lyin();
            }
        };
        Object.defineProperty(ChatLianyinRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ChatLianyinRender.prototype.set_baseInfo = function () {
            var cd = this.data;
            this.avatar_b.source = cd.user_avatar ? "tx70_" + cd.user_avatar + "_png" : "xdzlttxiang_png";
            if (cd.user_avatar) {
                this.avatar_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            this.vip_t.text = "" + cd.user_vip;
            this.lv_t.text = mx.Tools.format(mx.Lang.bh001, cd.user_lv);
            var time = mx.Tools.format_time(cd.time, "sf", 2);
            if (cd.user_id == Number(Main.USER_ID)) {
                this.name_t.textFlow = [{ "text": time, "style": { "textColor": 0xAC6EB3 } }, { "text": "  " + cd.user_name }];
            }
            else {
                this.name_t.textFlow = [{ "text": "" + cd.user_name + "  " }, { "text": time, "style": { "textColor": 0xAC6EB3 } }];
            }
        };
        ChatLianyinRender.prototype.fresh_pub = function () {
            var cd = this.data;
            if (cd.user_id == Main.USER_ID) {
                this.currentState = this.skin.currentState = "me"; //自己
            }
            else {
                this.currentState = this.skin.currentState = "other"; //别人
            }
            var content = cd.content;
            if (typeof content == "string") {
                this.con_t.text = "" + content;
            }
            else {
                this.con_t.textFlow = content;
            }
            var t = this.proxy.cal_label_size(content, null);
            this.con_t.width = t.width;
            this.con_t.height = t.height;
            this.con_g.width = this.con_bg.width = this.con_t.width + 54;
            this.con_g.height = this.con_bg.height = this.con_t.height + 35;
            //砍价
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            if (this.data.other) {
                if (this.data.other.type == 'lyin_kjia' && this.data.other.user_name == gproxy.user_name) {
                    this.currentState = this.skin.currentState = "kanjia";
                    var shixiao = this.data.other.shixiao;
                    if (shixiao) {
                        this.tyi_b.visible = false;
                        switch (shixiao) {
                            case 1:
                                this.jjue_b.set_ssres("ltytyi_png");
                                break;
                            case -1:
                                this.jjue_b.set_ssres("ltyjjue_png");
                                break;
                        }
                    }
                    else {
                        this.tyi_b.set_ssres("kjtyi_png");
                        this.jjue_b.set_ssres("kjjjue_png");
                    }
                    //设为“mx6”后，this.con_t就没了
                    if (typeof content == "string") {
                        this.con_t.text = "" + content;
                    }
                    else {
                        this.con_t.textFlow = content;
                    }
                    t = this.proxy.cal_label_size(content, 'lyin_kjia');
                    this.con_t.width = t.width;
                    this.con_t.height = t.height;
                    this.con_g.width = this.con_bg.width = 480;
                    this.con_g.height = this.con_bg.height = 150;
                }
            }
            this.set_baseInfo();
        };
        ChatLianyinRender.prototype.fresh_lyin = function () {
            if (this.data.user_id == Main.USER_ID) {
                this.currentState = this.skin.currentState = "lianyin_me"; //自己
            }
            else {
                this.currentState = this.skin.currentState = "lianyin_other"; //别人
                this.ok_b.set_ssres("ltckan_png");
            }
            this.con_g.width = this.con_bg.width = 450;
            this.con_g.height = this.con_bg.height = 130;
            var cd = this.data;
            this.avatar_p.source = mx.Tools.get_zn_res(cd.other.avatar, "tx"); //"zntx" + cd.other.avatar + "_png";
            this.hname_t.text = cd.other.hname;
            this.hname_t.textColor = mx.Tools.num2color(cd.other.meili);
            this.meili_t.text = mx.Lang.mli + "：" + cd.other.meili;
            var isSelf = cd.user_id == Number(Main.USER_ID);
            var hname_t = new eui.Label(this.hname_t.text);
            hname_t.fontFamily = mx.MX_COMMON.DFT_FONT;
            hname_t.size = 22;
            hname_t.bold = true;
            this.pinli_g.left = (isSelf ? 140 : 140) + hname_t.textWidth + 20;
            var jneng1, jneng2, cor1, cor2;
            cor1 = cor2 = 0xB4B1B5;
            if (Number(cd.other.skill[0]) <= 0) {
                jneng1 = mx.Lang.hzs75;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.other.skill[0]);
                jneng1 = api.name;
            }
            if (jneng1 != mx.Lang.hzs75) {
                cor1 = 0x72bd6a;
            }
            if (Number(cd.other.skill[1]) <= 0) {
                jneng2 = mx.Lang.hzs75;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.other.skill[1]);
                jneng2 = api.name;
            }
            if (jneng2 != mx.Lang.hzs75) {
                cor2 = 0x72bd6a;
            }
            this.skill_t.textFlow = [
                { "text": mx.Lang.jineng + mx.Lang.hg040 + "：" },
                { "text": jneng1 + "\n", "style": { "textColor": cor1 } },
                { "text": mx.Lang.jineng + mx.Tools.num2chinese(2) + "：" },
                { "text": jneng2, "style": { "textColor": cor2 } },
            ];
            var pinli_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.PINLI, "g_id", cd.other.pinli);
            var pinli_name = "";
            for (var k in pinli_api) {
                if (pinli_api[k].name) {
                    pinli_name = pinli_api[k].name;
                    break;
                }
            }
            this.pinli_t.text = pinli_name;
            this.set_baseInfo();
        };
        return ChatLianyinRender;
    }(mx.BasicRender));
    mx.ChatLianyinRender = ChatLianyinRender;
    __reflect(ChatLianyinRender.prototype, "mx.ChatLianyinRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChatLianyinRender.js.map
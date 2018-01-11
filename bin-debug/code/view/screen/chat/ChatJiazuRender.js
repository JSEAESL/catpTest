/**
 *   @author mx
 *   @date 2017.11.12
 *   @desc 聊天render(家族)
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
    var ChatJiazuRender = (function (_super) {
        __extends(ChatJiazuRender, _super);
        function ChatJiazuRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatJiazuRender.prototype.init_render = function () {
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ccxq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ChatJiazuRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var cproxy = (facade.retrieveProxy(mx.ChatProxy.NAME));
            var cd = this.data;
            if (evt.currentTarget == this.avatar_b) {
                if (Main.USER_ID != cd.user_id) {
                    facade.sendNotification(mx.MX_NOTICE.JUBAO_POP, this.itemIndex);
                }
            }
            else {
                if (evt.currentTarget == this.ok_b) {
                    var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
                    switch (evt.currentTarget.res_name) {
                        case "sqjru_png":
                        case "zjsqing_png":
                            uProxy.target_gh_id = this.data.other.union_id;
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_UNION_SHENQ,
                                "gh_id": this.data.other.union_id,
                            });
                            break;
                        case "cxsqing_png":
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_UNION_CHEXIAO,
                                "gh_id": this.data.other.union_id,
                            });
                            break;
                    }
                }
                else if (evt.currentTarget == this.ccxq_b) {
                    var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    if (this.data.other.target.user_id == Number(Main.USER_ID)) {
                        var a_d2 = {
                            "param": mx.Lang.jz202
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        return;
                    }
                    lproxy.set_cur_user(this.data.other.target);
                    lproxy.fight_type = "fight";
                    lproxy.qiuyuan_target = this.data.user_id;
                    for (var k in this.data) {
                        lproxy.lueduo_target[k] = this.data.other.target[k];
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                        "id": this.data.other.target.user_id
                    });
                }
            }
        };
        ChatJiazuRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ccxq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ChatJiazuRender.prototype.dataChanged = function () {
            if (!this.skin || !this.data) {
                return;
            }
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            var data = this.data;
            if (data.other && data.other.type == "union_zhaomu") {
                this.currentState = this.skin.currentState = "zhaomu";
            }
            else if (data.other && data.other.type == "qiuyuan") {
                this.currentState = this.skin.currentState = data.user_id == Main.USER_ID ? "help_me" : "help_other";
            }
            else if (data.user_id == Main.USER_ID) {
                this.currentState = this.skin.currentState = "me"; //自己
            }
            else {
                this.currentState = this.skin.currentState = "other"; //别人
            }
            if (data.content) {
                this.fresh_union();
            }
        };
        Object.defineProperty(ChatJiazuRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ChatJiazuRender.prototype.set_baseInfo = function () {
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
        ChatJiazuRender.prototype.fresh_union = function () {
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var content = cd.content.concat();
            if (typeof content == "string") {
                this.con_t.text = "" + content;
            }
            else {
                content.splice(0, 2);
                this.con_t.textFlow = content;
            }
            var cproxy = facade.retrieveProxy(mx.ChatProxy.NAME);
            var t = cproxy.cal_label_size(content, cd.other.type);
            this.con_t.width = t.width;
            this.con_t.height = t.height;
            switch (cd.other.type) {
                case "union_zhaomu":
                    this.con_g.width = this.con_bg.width = 480;
                    this.con_g.height = this.con_bg.height = 160;
                    break;
                case "qiuyuan":
                    this.con_g.width = this.con_bg.width = t.width + 46;
                    this.con_g.height = this.con_bg.height = 235;
                    break;
                default:
                    this.con_g.width = this.con_bg.width = t.width + 54;
                    this.con_g.height = this.con_bg.height = t.height + 35;
                    break;
            }
            var arr = ["sqjru_png", "zjsqing_png", "cxsqing_png"];
            var uproxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            var source = arr[cd.other.union_kind];
            if (uproxy.sq_list.indexOf(String(cd.other.union_id)) >= 0) {
                source = arr[2];
            }
            this.ok_b.set_ssres(source);
            if (cd.other.type == "qiuyuan") {
                var target = cd.other.target;
                this.avatar_p.source = "tx70_" + target.avatar + "_png";
                this.zl_t.text = mx.Lang.jz204 + cd.other.target_zhanli;
                this.tname_t.text = target.name;
                this.tlv_t.text = mx.Tools.format(mx.Lang.bh001, target.level);
            }
            this.set_baseInfo();
        };
        return ChatJiazuRender;
    }(mx.BasicRender));
    mx.ChatJiazuRender = ChatJiazuRender;
    __reflect(ChatJiazuRender.prototype, "mx.ChatJiazuRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChatJiazuRender.js.map
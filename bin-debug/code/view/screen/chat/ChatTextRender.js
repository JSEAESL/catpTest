/**
 *   @author mx
 *   @date 2017.11.12
 *   @desc 聊天render(纯文本)，用于世界、私聊
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
    var ChatTextRender = (function (_super) {
        __extends(ChatTextRender, _super);
        function ChatTextRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatTextRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            if (evt.currentTarget == this.avatar_b) {
                if (Main.USER_ID != cd.user_id) {
                    facade.sendNotification(mx.MX_NOTICE.JUBAO_POP, this.itemIndex);
                }
            }
        };
        ChatTextRender.prototype.dataChanged = function () {
            if (!this.skin || !this.data) {
                return;
            }
            this.fresh_pub();
        };
        Object.defineProperty(ChatTextRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ChatTextRender.prototype.set_baseInfo = function () {
            var cd = this.data;
            this.avatar_b.source = cd.user_avatar ? "tx70_" + cd.user_avatar + "_png" : "xdzlttxiang_png";
            if (cd.user_avatar) {
                this.avatar_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            }
            this.avatar_b.width = this.avatar_b.height = 91;
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
        ChatTextRender.prototype.fresh_pub = function () {
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
            this.set_baseInfo();
        };
        return ChatTextRender;
    }(mx.BasicRender));
    mx.ChatTextRender = ChatTextRender;
    __reflect(ChatTextRender.prototype, "mx.ChatTextRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChatTextRender.js.map
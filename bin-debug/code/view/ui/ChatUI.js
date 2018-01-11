/**
 * mx@2016/08/21
 * 聊天滚动条
 */
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
    var ChatUI = (function (_super) {
        __extends(ChatUI, _super);
        function ChatUI() {
            return _super.call(this) || this;
        }
        ChatUI.prototype.pre_init = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ChatUIMediator(this));
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.check_msg();
            this.show_pri_tip();
        };
        ChatUI.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.WebTool.ERROR_TYPE) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang["weberror" + mx.WebTool.ERROR_TYPE] });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ChatScreen.S_NAME);
            }
        };
        ChatUI.prototype.show_pri_tip = function () {
            var cproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME);
            this.priTip_p.visible = mx.Tools.obj2arr(cproxy.unread_pri_num).length ? true : false;
        };
        ChatUI.prototype.check_msg = function () {
            var _this = this;
            if (this.is_show) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var cproxy = facade.retrieveProxy(mx.ChatProxy.NAME);
            var cdata = cproxy.last_chat;
            if (cdata && (!mx.Tools.in_hmd(cdata.user_id) || cdata.type == mx.MX_WEB_CONST.MX_WEB_CT_YIN)) {
                if (typeof cdata.content == "string") {
                    var tf = [
                        { "text": cdata.user_name, "style": { "textColor": 0xff4b4b } },
                        { "text": " : " + cdata.content }
                    ];
                    this.label_t.textFlow = tf;
                }
                else {
                    this.label_t.textFlow = cdata.content;
                }
            }
            else {
                this.label_t.text = mx.Lang.p0111;
            }
            this.is_show = true;
            this.label_t.x = 600;
            var pw = this.label_t.textWidth;
            egret.Tween.removeTweens(this.label_t);
            egret.Tween.get(this.label_t).to({ "x": -pw }, (600 + pw) * 10).call(function () {
                _this.is_show = false;
                _this.check_msg();
            }, this);
        };
        ChatUI.prototype.set_new_data = function (data) {
            this.check_msg();
        };
        ChatUI.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ChatUIMediator.NAME);
            egret.Tween.removeTweens(this.label_t);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeChildren();
        };
        return ChatUI;
    }(mx.BasicUI));
    mx.ChatUI = ChatUI;
    __reflect(ChatUI.prototype, "mx.ChatUI");
})(mx || (mx = {}));
//# sourceMappingURL=ChatUI.js.map
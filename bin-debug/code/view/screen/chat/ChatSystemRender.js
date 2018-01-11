/**
 *   @author hxj、mx
 *   @date 2017.11.12
 *   @desc 聊天render(系统)
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
    var ChatSystemRender = (function (_super) {
        __extends(ChatSystemRender, _super);
        function ChatSystemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatSystemRender.prototype.dataChanged = function () {
            if (!this.skin || !this.data) {
                return;
            }
            var cd = this.data;
            this.fresh_sys();
        };
        ChatSystemRender.prototype.fresh_sys = function () {
            var cd = this.data.content;
            if (typeof cd == "string") {
                this.sys_t.text = cd;
            }
            else {
                this.sys_t.textFlow = cd;
            }
            var t = this.proxy.cal_label_size(cd, "system");
            this.sys_t.width = t.width;
            this.sys_t.height = t.height;
            this.height = t.height + 68;
        };
        Object.defineProperty(ChatSystemRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        return ChatSystemRender;
    }(mx.BasicRender));
    mx.ChatSystemRender = ChatSystemRender;
    __reflect(ChatSystemRender.prototype, "mx.ChatSystemRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChatSystemRender.js.map
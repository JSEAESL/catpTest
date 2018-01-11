/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 聊天结缘子女弹窗
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
    var ChatLyzinvView = (function (_super) {
        __extends(ChatLyzinvView, _super);
        function ChatLyzinvView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_page = 0;
            _this.total_page = 0;
            return _this;
        }
        /*--------------组件---------------*/
        ChatLyzinvView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            ////console.log(cd);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            this.fresh_page();
        };
        ChatLyzinvView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ChatLyzinvView.S_NAME);
        };
        /*------------页数点击-------------*/
        ChatLyzinvView.prototype.page_click = function (evt) {
            var view = this;
            if (this.cur_page == 0) {
                return;
            }
            switch (evt.currentTarget) {
                case view.prev_b:
                    --this.cur_page;
                    break;
                case view.next_b:
                    ++this.cur_page;
                    break;
                case view.head_btn:
                    this.cur_page = 1;
                    break;
                case view.tail_btn:
                    this.cur_page = this.total_page;
                    break;
            }
            this.fresh_page();
        };
        /*----------显示页数-------*/
        ChatLyzinvView.prototype.fresh_page = function () {
            var view = this;
            var cur = this.cur_page;
            var total = this.total_page;
            if (cur > total) {
                this.cur_page = total;
            }
            else if (cur < 1) {
                this.cur_page = 1;
            }
            view.page_t.text = this.cur_page + "/" + this.total_page;
        };
        ChatLyzinvView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
        };
        ChatLyzinvView.S_NAME = "ChatLyzinvView";
        return ChatLyzinvView;
    }(mx.BasicView));
    mx.ChatLyzinvView = ChatLyzinvView;
    __reflect(ChatLyzinvView.prototype, "mx.ChatLyzinvView");
})(mx || (mx = {}));
//# sourceMappingURL=ChatLyzinvView.js.map
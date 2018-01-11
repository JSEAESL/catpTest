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
    var ChatLyznView = (function (_super) {
        __extends(ChatLyznView, _super);
        function ChatLyznView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_page = 0;
            _this.total_page = 0;
            return _this;
        }
        ChatLyznView.mx_support = function () {
            return ["assets.chat_zinv_alert", "api.ZINVSKILL"];
        };
        /*--------------组件---------------*/
        ChatLyznView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            this.cur_page = this.total_page = 0;
            if (cd.length) {
                var proxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME);
                var pinli = mx.ApiTool.getAPI(mx.MX_APINAME.PINLI);
                proxy.hzs_gift = [];
                for (var i = 0; i < pinli.length; i++) {
                    var d = pinli[i];
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', d.item_id);
                    if (api) {
                        d.price = api.Buyprice2;
                    }
                    if (!proxy.hzs_gift[d.g_id]) {
                        proxy.hzs_gift[d.g_id] = [];
                    }
                    if (proxy.hzs_gift[d.g_id][0] && proxy.hzs_gift[d.g_id][0].name) {
                        d.name = proxy.hzs_gift[d.g_id][0].name;
                    }
                    proxy.hzs_gift[d.g_id].push(d);
                }
                this.cur_page = 1;
            }
            this.show_list();
            this.fresh_page();
            facade.registerMediator(new mx.ChatLyznViewMediator(this));
        };
        ChatLyznView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ChatLyznView.S_NAME);
        };
        ChatLyznView.prototype.show_list = function () {
            var view = this;
            var cd = this.adata;
            if (cd.length) {
                var arr = [];
                this.total_page = Math.max(Math.ceil(cd.length / 3), 1);
                this.cur_page = Math.min(this.total_page, this.cur_page);
                for (var i = (this.cur_page - 1) * 3; i < this.cur_page * 3; ++i) {
                    if (cd[i]) {
                        arr.push(cd[i]);
                    }
                }
                view.zinv_list.itemRenderer = mx.ChatLyznRender;
                view.zinv_list.dataProvider = new eui.ArrayCollection(arr);
                view.zinv_list.validateNow();
            }
            else {
                this.zinv_list.dataProvider = null;
                this.cur_page = this.total_page = 1;
            }
        };
        /*------------页数点击-------------*/
        ChatLyznView.prototype.page_click = function (evt) {
            var view = this;
            if (this.cur_page == 0) {
                return;
            }
            switch (evt.currentTarget) {
                case view.prev_b:
                    if (this.cur_page == 1)
                        return;
                    --this.cur_page;
                    break;
                case view.next_b:
                    if (this.cur_page == this.total_page)
                        return;
                    ++this.cur_page;
                    break;
                case view.head_btn:
                    this.cur_page = 1;
                    break;
                case view.tail_btn:
                    this.cur_page = this.total_page;
                    break;
            }
            this.show_list();
            this.fresh_page();
        };
        /*----------显示页数-------*/
        ChatLyznView.prototype.fresh_page = function () {
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
        ChatLyznView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.zinv_list.dataProvider = null;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ChatLyznViewMediator.NAME);
        };
        ChatLyznView.S_NAME = "ChatLyznView";
        return ChatLyznView;
    }(mx.BasicView));
    mx.ChatLyznView = ChatLyznView;
    __reflect(ChatLyznView.prototype, "mx.ChatLyznView");
})(mx || (mx = {}));
//# sourceMappingURL=ChatLyznView.js.map
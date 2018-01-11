/**
 *   @author wf
 *   @date 2017.1.5
 *   @desc 调戏主界面
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
    var TiaoXiScreen = (function (_super) {
        __extends(TiaoXiScreen, _super);
        function TiaoXiScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pagenum = 5; //每页显示条目数量
            return _this;
        }
        TiaoXiScreen.mx_support = function () {
            return ["assets.friend", "api.JINJI", "api.QINMI", "api.HEROHOUGONG", "data.2904", "data.1701"];
        };
        TiaoXiScreen.prototype.set_skinname = function () {
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["FriendScreenSkin"];
            }
            else {
                this.skinName = RES.getRes("FriendScreenSkin_exml");
            }
        };
        TiaoXiScreen.prototype.init_view = function () {
            var view = this;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.setTx(true);
            view.title.source = 'xztxdxiang_png';
            view.tab_g.visible = view.bottom_g.visible = false;
            view.page_g.bottom = 30;
            view.f_scro.bottom = 100;
            view.f_scro.top = 109;
            if (mx.AppConfig.PREV_SCENE_ID == mx.OtherScreen.S_NAME) {
                if (fproxy.hylist[fproxy.hypage]) {
                    this.update_list();
                }
                else {
                    var currpage = fproxy.hypage;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_TX_FRIEND_DATA,
                        "page": currpage,
                        "skip": true
                    });
                }
            }
            else {
                this.update_list();
            }
            view.f_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.registerMediator(new mx.TiaoXiMediator(this));
        };
        Object.defineProperty(TiaoXiScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.FriendProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        TiaoXiScreen.prototype.update_list = function () {
            var view = this;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            view.page_t.text = fproxy.hypage + '/' + Math.ceil(fproxy.hytotal / this.pagenum);
            view.page_g.visible = fproxy.hytotal > 0;
            view.add_b.visible = fproxy.hytotal <= 0;
            view.tjian_b.visible = false;
            if (fproxy.hytotal <= 0) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME,
                    "param": { "shijian": { 'msg_id': 110 } }
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            }
            view.f_list.itemRenderer = mx.FriendItemRender;
            view.f_list.dataProvider = new eui.ArrayCollection(fproxy.hylist[fproxy.hypage]);
        };
        TiaoXiScreen.prototype.list_click = function (e) {
            this.proxy.set_curr_friend({ "idx": e.itemIndex });
        };
        TiaoXiScreen.prototype.set_page = function (e) {
            var view = this;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            var total = Math.ceil(fproxy.hytotal / this.pagenum);
            var page = fproxy.hypage;
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                    newpage = 1;
                    break;
                case view.wye_b:
                    newpage = total;
                    break;
                case view.prev_b:
                    newpage = Math.max(1, page - 1);
                    break;
                case view.next_b:
                    newpage = Math.min(total, page + 1);
                    break;
            }
            if (page == newpage) {
                return;
            }
            if (fproxy.hylist[newpage]) {
                fproxy.set_curr_page({ "page": newpage });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_TX_FRIEND_DATA,
                    "page": newpage,
                    "skip": true
                });
            }
        };
        TiaoXiScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.setTx(false);
            switch (e.currentTarget) {
                case view.back_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
                    var p_name = TiaoXiScreen.P_NAME;
                    if (p_name) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                        TiaoXiScreen.P_NAME = null;
                    }
                    break;
                case view.add_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.FriendScreen.S_NAME);
                    break;
            }
        };
        TiaoXiScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.f_list.dataProvider = null;
            view.f_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TiaoXiMediator.NAME);
        };
        TiaoXiScreen.S_NAME = "TiaoXiScreen";
        TiaoXiScreen.P_NAME = "MainScreen";
        return TiaoXiScreen;
    }(mx.BasicView));
    mx.TiaoXiScreen = TiaoXiScreen;
    __reflect(TiaoXiScreen.prototype, "mx.TiaoXiScreen");
})(mx || (mx = {}));
//# sourceMappingURL=TiaoXiScreen.js.map
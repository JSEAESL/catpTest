/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 添加桌面
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
    var ShareFeiziView = (function (_super) {
        __extends(ShareFeiziView, _super);
        function ShareFeiziView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareFeiziView.mx_support = function () {
            return ["assets.share_feizi", "data.3706"];
        };
        /*--------------组件---------------*/
        ShareFeiziView.prototype.init_view = function () {
            var view = this;
            view.yqing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yqing2_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            //光效
            var ef = new mx.GeneralEffect("cklhgxiao");
            ef.play_by_times(-1);
            ef.bottom = 12;
            ef.left = 46;
            ef.name = 'cklhgxiao';
            ef.touchEnabled = false;
            this.g2_g.addChild(ef);
            mx.DataTool.getInstance().data_tool("SFEIZI_OPEN");
        };
        ShareFeiziView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ShareFeiziView.S_NAME);
        };
        ShareFeiziView.prototype.btn_click = function (e) {
            var _this = this;
            if (this.in_wait) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
            var proxy = facade.retrieveProxy(mx.PackProxy.NAME);
            var view = this;
            switch (e.currentTarget) {
                case view.yqing_b://需要先判断物品数目,需要先获取背包数据
                    if (Number(dproxy.share_fz_info.get1) == 0) {
                        var c_n = proxy.get_item_num(2024);
                        if (c_n) {
                            mx.DataTool.getInstance().data_tool("SFEIZI_CLICK1");
                            this.in_wait = true;
                            this.tid = egret.setTimeout(function () {
                                _this.in_wait = false;
                                if (window && window["share_zsfz"]) {
                                    window["share_zsfz"](Main.USER_ID, 1);
                                }
                            }, this, 500);
                        }
                        else {
                            var a_d2 = {
                                "notice_ok": mx.MX_NOTICE.SCENE_CHANGE,
                                "sdata_ok": mx.WxActyScreen.S_NAME,
                                "param": mx.Lang.fx006
                            };
                            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fx004 });
                    }
                    break;
                case view.yqing2_b:
                    if (Number(dproxy.share_fz_info.get2) == 0) {
                        var c_n2 = proxy.get_item_num(2025);
                        if (c_n2) {
                            mx.DataTool.getInstance().data_tool("SFEIZI_CLICK2");
                            this.in_wait = true;
                            this.tid2 = egret.setTimeout(function () {
                                _this.in_wait = false;
                                if (window && window["share_zsfz"]) {
                                    window["share_zsfz"](Main.USER_ID, 2);
                                }
                            }, this, 500);
                        }
                        else {
                            if (mx.AppConfig.check_not_support("addtable")) {
                                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ADD_TABLE_REWARD });
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AlertView.S_NAME, "param": {
                                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                                        "sdata_ok": { "name": mx.AddTableView.S_NAME },
                                        "param": mx.Lang.fx005
                                    } });
                            }
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fx004 });
                    }
                    break;
                case view.ckan_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShareFeiziYiLanView.S_NAME });
                    break;
                default:
                    this.close_self();
                    break;
            }
        };
        ShareFeiziView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var ef = this.g2_g.getChildByName("cklhgxiao");
            if (ef) {
                ef.on_remove();
            }
            ef = null;
            view.yqing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yqing2_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
            if (this.tid2) {
                egret.clearTimeout(this.tid2);
                this.tid2 = null;
            }
        };
        ShareFeiziView.S_NAME = "ShareFeiziView";
        return ShareFeiziView;
    }(mx.BasicView));
    mx.ShareFeiziView = ShareFeiziView;
    __reflect(ShareFeiziView.prototype, "mx.ShareFeiziView");
})(mx || (mx = {}));
//# sourceMappingURL=ShareFeiziView.js.map
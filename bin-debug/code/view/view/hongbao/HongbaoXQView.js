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
/**
 * @qianjun 2017-7-4
 * 2016.9.6
 *  红包alert
 */
var mx;
(function (mx) {
    var HongbaoXQView = (function (_super) {
        __extends(HongbaoXQView, _super);
        function HongbaoXQView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HongbaoXQView.mx_support = function () {
            return ["assets.hbxq"];
        };
        Object.defineProperty(HongbaoXQView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return facade.retrieveProxy(mx.GameProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        HongbaoXQView.prototype.init_view = function () {
            var view = this;
            if (window && window["removeLoading"]) {
                window["removeLoading"]();
                Main.MEMBER_ID = window["mid"];
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.HongbaoXQViewMediator(this));
            view.ljlq_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dkyxi_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_view();
        };
        HongbaoXQView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.ljlq_p:
                    if (view.ser_info) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HONGBAO_LQ, 'id': mx.AppConfig.HB_ID, 'to_id': view.ser_info.user_id, "flag": false });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hb004 });
                    }
                    break;
                case view.dkyxi_p:
                    if (!view.ser_info) {
                        this.gproxy.hongbao_create = true;
                    }
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.StartScreen.S_NAME);
                    break;
                case view.change_t:
                    if (view.ser_info) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HongbaoXuanFuView.S_NAME });
                    }
                    else {
                        this.gproxy.hongbao_create = true;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.StartScreen.S_NAME);
                    }
                    break;
            }
        };
        HongbaoXQView.prototype.fresh_view = function () {
            var view = this;
            var data = this.gproxy.hb_mode_data;
            if (Number(data.state == 1)) {
                //红包领完
                view.state_t.text = mx.Lang.hb009;
                view.num_t.text = '';
                view.yb_p.visible = view.fsong_g.visible = view.lq_g.visible = false;
            }
            else if (Number(data.state == 3)) {
                view.state_t.text = mx.Lang.hb010;
                view.state_t.left = 130;
                view.num_t.text = '';
                view.yb_p.visible = view.fsong_g.visible = view.lq_g.visible = false;
            }
            else {
                //抢到的红包数量
                view.state_t.text = mx.Lang.hb011;
                view.yb_p.visible = view.fsong_g.visible = view.lq_g.visible = true;
                view.num_t.text = "x" + data.award.shuliang;
                //到期时间
                var time = data.deadline; //new Date().getTime() / 1000;
                view.time_t.text = mx.Tools.format(mx.Lang.hb001, mx.Tools.format_time(time, "nyr"));
                //默认角色
                if (data.fuwuqi) {
                    view.fresh_user_info(data.fuwuqi[0]);
                }
                else {
                    view.ser_info = null;
                    view.ser_t.text = "";
                    view.change_t.textFlow = [{ "text": "创建角色", "style": { "underline": true } }];
                }
            }
            view.sming_t.text = mx.Lang.hb002;
            view.show_list();
        };
        HongbaoXQView.prototype.fresh_user_info = function (data) {
            var view = this;
            view.ser_info = data;
            view.ser_t.text = "微信" + data.sid + "区  " + data.name;
            view.change_t.textFlow = [{ "text": "修改", "style": { "underline": true } }];
        };
        HongbaoXQView.prototype.show_list = function () {
            var view = this;
            var data = this.gproxy.hb_mode_data.data;
            var arr = [];
            for (var i in data) {
                var unit = data[i];
                arr.push({
                    "tx": "tx78_9_png",
                    "name": "微信用户  " + unit.wx_name,
                    "time": mx.Tools.format_time(new Date().getTime() / 1000, "yrsfm"),
                    "num": "x" + unit.diamond,
                    "desc_t": "国库充实，后宫才幸福"
                });
            }
            view.hb_list.dataProvider = new eui.ArrayCollection(arr);
        };
        HongbaoXQView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hb_list.dataProvider = null;
            view.ljlq_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dkyxi_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HongbaoXQViewMediator.NAME);
        };
        HongbaoXQView.S_NAME = "HongbaoXQView";
        return HongbaoXQView;
    }(mx.BasicView));
    mx.HongbaoXQView = HongbaoXQView;
    __reflect(HongbaoXQView.prototype, "mx.HongbaoXQView");
})(mx || (mx = {}));
//# sourceMappingURL=HongbaoXQView.js.map
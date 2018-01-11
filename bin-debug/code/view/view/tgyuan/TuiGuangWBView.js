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
 *  @dingyunfeng
 *  2018-1-4
 *  推广系统外部
 */
var mx;
(function (mx) {
    var TuiGuangWBView = (function (_super) {
        __extends(TuiGuangWBView, _super);
        function TuiGuangWBView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.url = "https://nh.hdyouxi.com/gong3_wxtest/index.php/Tuiguang/tuiguang_out";
            _this.awards = [
                [
                    { "type": 4, "num": 5, "item_id": 2000, "icon": "" },
                    { "type": 4, "num": 5, "item_id": 2019, "icon": "" },
                    { "type": 2, "num": 50, "item_id": 0, "icon": "" },
                    { "type": 1, "num": 50000, "item_id": 2025, "icon": "" },
                    { "type": 2, "num": 100, "item_id": 0, "icon": "" },
                    { "type": 4, "num": 1, "item_id": 2025, "icon": "ipx_png" },
                ],
                [
                    { "type": 4, "num": 5, "item_id": 2000, "icon": "" },
                    { "type": 4, "num": 5, "item_id": 2019, "icon": "" },
                    { "type": 2, "num": 50, "item_id": 0, "icon": "" },
                    { "type": 1, "num": 50000, "item_id": 2025, "icon": "" },
                    { "type": 2, "num": 100, "item_id": 0, "icon": "" },
                    { "type": 4, "num": 1, "item_id": 2025, "icon": "ipx_png" },
                ],
                [
                    { "type": 4, "num": 5, "item_id": 2000, "icon": "" },
                    { "type": 4, "num": 5, "item_id": 2019, "icon": "" },
                    { "type": 2, "num": 50, "item_id": 0, "icon": "" },
                    { "type": 1, "num": 50000, "item_id": 2025, "icon": "" },
                    { "type": 2, "num": 100, "item_id": 0, "icon": "" },
                    { "type": 4, "num": 1, "item_id": 2025, "icon": "ipx_png" },
                ]
            ];
            _this.state = 0; //平台状态
            return _this;
        }
        TuiGuangWBView.mx_support = function () {
            return ["assets.tgyuanwb"];
        };
        Object.defineProperty(TuiGuangWBView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return facade.retrieveProxy(mx.GameProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        TuiGuangWBView.prototype.init_view = function () {
            var view = this;
            if (window && window["removeLoading"]) {
                window["removeLoading"]();
                Main.MEMBER_ID = window["mid"];
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.TuiGuangWBViewMediator(this));
            var item_arr = [];
            for (var i in this.awards) {
                var unit = this.awards[0][i];
                item_arr.push({
                    "bg": "tgitemkuang_png",
                    "id": unit.item_id,
                    "type": unit.type,
                    "num": unit.num,
                    "di": true,
                    "no_num": true,
                    "chicun": 90,
                    "top": 94,
                    "di_cor": 0xFFEBDD,
                    "di_size": 20,
                    "width": 90,
                    "icon": unit.icon
                });
            }
            for (var i = 0; i <= 5; i++) {
                this["item_list" + i].itemRenderer = mx.GNumRender;
                var item = [];
                item.push(item_arr[i]);
                this["item_list" + i].dataProvider = new eui.ArrayCollection(item);
            }
            this.cj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dkyxi_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sc.bounces = false; //禁用回弹 
            //this.fresh_view();
            var url = "https://nh.hdyouxi.com/gong3_wxtest/index.php/Tuiguang/tuiguang_out";
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            var request = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            var fdata = new egret.URLVariables();
            fdata.variables = { "member_id": 32 };
            request.data = fdata;
            loader.load(request);
        };
        TuiGuangWBView.prototype.onPostComplete = function (event) {
            var e_data = event.currentTarget.data;
            var c_data = JSON.parse(e_data);
            this.fresh_data(c_data);
        };
        TuiGuangWBView.prototype.fresh_data = function (data) {
            if (data.has) {
                this.state = 1;
            }
            else if (data.all) {
                this.state = 2;
            }
            else {
                this.state = 3;
            }
        };
        TuiGuangWBView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
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
                case this.cj_b:
                    facade.sendNotification(mx.MX_NOTICE.ZHUANPAN_START, 5); //临时接口，应后端查询结果
                    break;
            }
        };
        TuiGuangWBView.prototype.zhuanpan = function (tar) {
            egret.Tween.get(this.cj_b).to({ rotation: tar * 60 + 360 * 10 }, 300 / 6 * tar + 3000, egret.Ease.sineOut);
        };
        TuiGuangWBView.prototype.award = function (item) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TGAwardAlert.S_NAME,
                "param": { "award": this.awards[item], "lv": this.adata.lv + 5, "name": this.adata.name }
            });
        };
        TuiGuangWBView.prototype.fresh_view = function () {
            var view = this;
            var data = { "state": 3, "fuwuqi": [{ "sid": 1, "name": "青" }, { "sid": 2, "name": "绿" }, { "sid": 3, "name": "大" }] }; //this.gproxy.hb_mode_data;//区服消息
            if (Number(data.state == 1)) {
                this.state = 1; //禁止抽奖
            }
            else if (Number(data.state == 2)) {
                //区服默认自己 ： 分享者 ？
            }
            else {
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
            view.sming_t.text = mx.Lang.tgy005;
            view.show_list();
        };
        TuiGuangWBView.prototype.fresh_user_info = function (data) {
            var view = this;
            view.ser_info = data;
            view.ser_t.text = "微信" + data.sid + "区  " + data.name;
            view.change_t.textFlow = [{ "text": "修改", "style": { "underline": true } }];
        };
        TuiGuangWBView.prototype.show_list = function () {
            var view = this;
            var data = [
                { "wx_name": "六六六", "diamond": 50 },
                { "wx_name": "六六六", "diamond": 50 },
                { "wx_name": "六六六", "diamond": 50 },
                { "wx_name": "六六六", "diamond": 50 }
            ]; //this.gproxy.hb_mode_data.data;//从该界面抽奖的玩家列表
            var arr = [];
            for (var i in data) {
                var unit = data[i];
                arr.push({
                    "tx": "tx78_9_png",
                    "name": "微信用户  " + unit.wx_name,
                    "time": mx.Tools.format_time(new Date().getTime() / 1000, "nyr"),
                    "num": "x" + unit.diamond,
                });
            }
            view.hb_list.dataProvider = new eui.ArrayCollection(arr);
        };
        TuiGuangWBView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hb_list.dataProvider = null;
            egret.Tween.removeTweens(this.cj_b);
            view.dkyxi_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuiGuangWBViewMediator.NAME);
        };
        TuiGuangWBView.S_NAME = "TuiGuangWBView";
        return TuiGuangWBView;
    }(mx.BasicView));
    mx.TuiGuangWBView = TuiGuangWBView;
    __reflect(TuiGuangWBView.prototype, "mx.TuiGuangWBView");
})(mx || (mx = {}));
//# sourceMappingURL=TuiGuangWBView.js.map
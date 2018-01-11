/**
   @author qianjun、dingyunfeng
*   @date 2016.9.5
*   @desc 换装+评分界面mediator
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
    var HuanZhuangScreenMediator = (function (_super) {
        __extends(HuanZhuangScreenMediator, _super);
        function HuanZhuangScreenMediator(viewComponent) {
            var _this = _super.call(this, HuanZhuangScreenMediator.NAME, viewComponent) || this;
            _this.zli = 0;
            _this.search_state = false;
            /*--------------展示物品-------------*/
            _this.clothes = []; //希望显示的服装
            _this.init_view();
            return _this;
        }
        Object.defineProperty(HuanZhuangScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HuanZhuangScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.btn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.search.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.tag1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
            view.tag2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
            egret.Tween.removeTweens(view.state);
            view.item_list.dataProvider = null;
            view.btn_list.dataProvider = null;
            if (!this.cproxy.baocun_cloth) {
                this.cproxy.set_base_dress();
            }
        };
        HuanZhuangScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CLOTHES_ON_CHANGED,
                mx.MX_NOTICE.GET_CLOTHES_BY_TYPE,
                mx.MX_NOTICE.PACK_ITEMS_BACK,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.CLOTH_SHAIXUAN,
                mx.MX_NOTICE.CLOTH_SEARCH,
            ];
        };
        HuanZhuangScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.CLOTHES_ON_CHANGED:
                    //this.cproxy.baocun_cloth = false;//换装直接保存，不再需点击选好了按钮
                    this.saveclothes();
                    this.avatar_update(true);
                    break;
                case mx.MX_NOTICE.GET_CLOTHES_BY_TYPE:
                    this.show_items("stop");
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE); //需等待回调显示引导
                    break;
                case mx.MX_NOTICE.CLOTH_SEARCH:
                    this.clothes = notification.getBody().cloth;
                    this.search_state = true;
                    this.cproxy.set_oldpos(0);
                    this.show_items("stop");
                    break;
                default:
                    break;
            }
        };
        Object.defineProperty(HuanZhuangScreenMediator.prototype, "cproxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HuanZhuangScreenMediator.prototype.init_view = function () {
            var view = this.view;
            this.cproxy.new_props = {};
            this.cproxy.old_props = {};
            //初始化顶部跳转按钮
            var t_arr = [
                { "bg": "shoping_png" },
            ];
            view.btn_list.dataProvider = new eui.ArrayCollection(t_arr);
            view.btn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.tag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
            view.tag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
            if (!this.cproxy.baocun_cloth) {
                this.cproxy.copy_base_dress();
            }
            this.cproxy.baocun_cloth = false;
            this.avatar_update();
        };
        HuanZhuangScreenMediator.prototype.saveclothes = function () {
            var proxy = this.cproxy;
            var temp = "";
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var dress = this.cproxy.dressed_data;
            for (var key in dress) {
                temp += temp == "" ? dress[key].id : "|" + dress[key].id;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", this.cproxy.xxkid);
            var tag1 = String(api.add_type).split("|");
            var tag2 = String(api.add_num).split("|");
            var arr = [];
            for (var k in tag1) {
                arr[tag1[k]] = tag2[k];
            }
            this.cproxy.set_fz_zhanli(arr);
            this.cproxy.new_zli = this.zli;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_CLOTH_REPLACE_DRESSED,
                "dressed": temp
            });
        };
        /*----------------点击事件---------------*/
        HuanZhuangScreenMediator.prototype.btn_click = function (e) {
            var c_n = e.item.bg;
            switch (c_n) {
                case "shoping_png":
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, { "sname": mx.ClothShopScreen.S_NAME });
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
            }
        };
        HuanZhuangScreenMediator.prototype.type_click = function (evt) {
            var view = this.view;
            this.cproxy.set_oldpos(1);
            view.item_list.dataProvider = null;
            this.search_state = false; //打破搜索状态
            //处理移动
            var action = evt.currentTarget.x;
            //交换颜色
            if (action != view.state.x) {
                var tempColor = view.tag1.textColor;
                view.tag1.textColor = view.tag2.textColor;
                view.tag2.textColor = tempColor;
            }
            var type = 1;
            switch (evt.currentTarget) {
                case view.tag1:
                    type = 1;
                    view.search.visible = true;
                    break;
                case view.tag2:
                    type = 2;
                    view.search.visible = false;
                    break;
            }
            //缓动&发消息拿数据
            egret.Tween.get(view.state).to({ "x": action }, 200);
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_CLOTH_GET_BY_TYPE,
                "type": type
            });
        };
        /*----------------------更新形象----------------------*/
        HuanZhuangScreenMediator.prototype.avatar_update = function (change) {
            var view = this.view;
            //展示形象
            var cproxy = this.facade.retrieveProxy(mx.ClothesProxy.NAME);
            var c_aid = cproxy.xxkid || 1001;
            view.xx_ui.set_avatar(c_aid);
            var c_bid = cproxy.bjkid || 2009;
            view.bj_ui.set_bjk(c_bid);
            //刷新物品
            this.cproxy.set_oldpos(view.item_scro.viewport.scrollV);
            this.show_items();
        };
        HuanZhuangScreenMediator.prototype.show_items = function (stop) {
            var view = this.view;
            var cproxy = this.cproxy;
            var item_arr = [];
            var cur_clothes = cproxy.cur_type_clothes;
            var cur_type = cproxy.cur_type;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            //服务端用户数对应类型数据
            var type = [];
            //搜索or类型
            if (!this.search_state) {
                this.clothes = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTH, 'type', this.cproxy.cur_type);
            }
            var check = mx.Tools.arr2obj(this.clothes, "id");
            var have_clothes = [];
            var new_clothes = [];
            for (var i in cur_clothes) {
                if (check[cur_clothes[i].cloth_id]) {
                    if (cur_clothes[i].new) {
                        new_clothes.push(Number(cur_clothes[i].cloth_id));
                    }
                    else {
                        have_clothes.push(Number(cur_clothes[i].cloth_id));
                    }
                }
            }
            //物品赋值   排序：new,hava,all
            //new
            var no_tip = false;
            if (cproxy.cur_type == 2) {
                no_tip = true;
            }
            var count = 0;
            for (var i = 0; i < new_clothes.length; i++) {
                var flag = false;
                if (cproxy.xxkid == new_clothes[i] || cproxy.bjkid == new_clothes[i]) {
                    flag = true;
                }
                item_arr.push({
                    "no": count + 1,
                    "id": new_clothes[i],
                    "type": cproxy.cur_type,
                    "on_body": flag,
                    "new": true,
                    "has": true,
                    "no_tip": no_tip
                });
                count++;
            }
            //have
            for (var i = 0; i < have_clothes.length; i++) {
                var flag = false;
                if (cproxy.xxkid == have_clothes[i] || cproxy.bjkid == have_clothes[i]) {
                    flag = true;
                }
                item_arr.push({
                    "no": count + 1,
                    "id": have_clothes[i],
                    "type": cproxy.cur_type,
                    "on_body": flag,
                    "new": false,
                    "has": true,
                    "no_tip": no_tip
                });
                count++;
            }
            //all
            if (cproxy.cur_type == 2) {
                for (var i = 0; i < this.clothes.length; i++) {
                    var id = this.clothes[i].id;
                    var flag = false;
                    if (have_clothes.indexOf(id) >= 0 || new_clothes.indexOf(id) >= 0) {
                        continue;
                    }
                    item_arr.push({
                        "no": count + 1,
                        "id": id,
                        "type": cproxy.cur_type,
                        "on_body": flag,
                        "new": false,
                        "has": false,
                        "no_tip": no_tip
                    });
                    count++;
                }
            }
            if (typeof stop != "undefined") {
                if (stop == "stop") {
                    view.item_scro.stopAnimation();
                }
                else if (stop == "select" && !item_arr.length) {
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fz026 });
                }
            }
            view.item_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.item_list.validateNow();
            view.item_scro.viewport.scrollV = cproxy.oldpos;
            if (!item_arr.length) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fz028 });
            }
        };
        HuanZhuangScreenMediator.prototype.tap_click = function (evt) {
            var view = this.view;
            switch (evt.currentTarget) {
                case view.back_b:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fzts3 });
                        return;
                    }
                    switch (mx.AppConfig.PREV_SCENE_ID) {
                        case mx.JuQingLAScreen.S_NAME:
                            this.cproxy.set_date_task(false);
                            this.cproxy.set_temple_test(false);
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                            break;
                        default:
                            this.cproxy.select_index = [];
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                            break;
                    }
                    break;
                case view.search:
                    if (this.cproxy.cur_type == 1) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.ClothSearchAlert.S_NAME,
                        });
                    }
                    break;
            }
        };
        HuanZhuangScreenMediator.NAME = "HuanZhuangScreenMediator";
        return HuanZhuangScreenMediator;
    }(puremvc.Mediator));
    mx.HuanZhuangScreenMediator = HuanZhuangScreenMediator;
    __reflect(HuanZhuangScreenMediator.prototype, "mx.HuanZhuangScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HuanZhuangScreenMediator.js.map
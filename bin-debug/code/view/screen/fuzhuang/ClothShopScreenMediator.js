/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var ClothShopScreenMediator = (function (_super) {
        __extends(ClothShopScreenMediator, _super);
        function ClothShopScreenMediator(viewComponent) {
            var _this = _super.call(this, ClothShopScreenMediator.NAME, viewComponent) || this;
            _this.click_state = false;
            _this.height = 700;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(ClothShopScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ClothShopScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
        };
        ClothShopScreenMediator.prototype.pre_move = function (evt) {
            var view = this;
            if (evt.localY < 0 || evt.localY > this.height) {
                return;
            }
            view.click_state = true;
            view.start_t = egret.getTimer(); //点击起始时间
            view.start_x = evt.stageX; //点击起始位置
            view.pre_x = evt.stageX; //上一次响应的位置
            //点击开始时屏蔽所有点击
            view.view.b_g.touchChildren = false; //按钮组不可点击
        };
        Object.defineProperty(ClothShopScreenMediator.prototype, "cproxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ClothShopScreenMediator.prototype.show_move = function (evt) {
            if (evt.localY < 0 || evt.localY > this.height) {
                this.check_move(evt);
                return;
            }
            var view = this.view;
            var dis = evt.stageX - this.pre_x;
            view.move_apos(dis);
            this.pre_x = evt.stageX;
        };
        ClothShopScreenMediator.prototype.check_move = function (evt) {
            var view = this.view;
            if (!this.click_state) {
                return;
            }
            this.click_state = false;
            var now_t = egret.getTimer();
            var dis = evt.stageX - this.start_x;
            var id = view.clothes[view.dress].id;
            if (Math.abs(dis) < 40) {
                if (now_t - this.start_t < 200) {
                    var p_d = {
                        "name": mx.ClothDetailView.S_NAME,
                        "param": {
                            "id": id
                        }
                    };
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                }
                //点击结束时恢复所有点击
                view.b_g.touchChildren = true;
                view.reset_apos(0); //重置形象位置
            }
            else {
                view.reset_apos(dis);
            }
        };
        ClothShopScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CLOTHES_ON_CHANGED,
            ];
        };
        ClothShopScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var Hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CLOTHES_ON_CHANGED:
                    view.my_clothes[data.cloth_id] = data.id;
                    view.fresh_info();
                    break;
                default:
                    break;
            }
        };
        ClothShopScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
        };
        ClothShopScreenMediator.prototype.show_use_pjcyd = function () {
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            var c_num = pProxy.get_item_num(2004);
            if (c_num) {
                var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                var cd = hProxy.get_chero_info();
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_USE_PJCYD, "mid": cd.mid },
                        "param": mx.Tools.format(mx.Lang.h0066, c_num),
                    }
                });
            }
            else {
                var p_d = {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": { "param": { "item": 2004 } }
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        ClothShopScreenMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            if (view.move_mode) {
                return;
            }
            switch (evt.currentTarget) {
                case view.buy_b:
                    var id = view.clothes[view.dress].id;
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ClothBuyAlert.S_NAME,
                        "param": {
                            "id": id,
                        }
                    });
                    break;
                case view.back_b:
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
                    break;
                case view.left_b:
                    view.reset_apos(1);
                    break;
                case view.right_b:
                    view.reset_apos(-1);
                    break;
            }
        };
        ClothShopScreenMediator.NAME = "ClothShopScreenMediator";
        return ClothShopScreenMediator;
    }(puremvc.Mediator));
    mx.ClothShopScreenMediator = ClothShopScreenMediator;
    __reflect(ClothShopScreenMediator.prototype, "mx.ClothShopScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ClothShopScreenMediator.js.map
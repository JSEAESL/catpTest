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
 * @chenyu、qianjun、mx
 * 2016.12.19
 * 玉娇龙升星（6,6,30）
 */
var mx;
(function (mx) {
    var ShouChongLastAlert = (function (_super) {
        __extends(ShouChongLastAlert, _super);
        function ShouChongLastAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShouChongLastAlert.mx_support = function () {
            return ["assets.schong_last", "assets.zn54301_d", "api.CZLEIJIAWARD"];
        };
        ShouChongLastAlert.prototype.init_view_by_type = function () {
            this.box_list.itemRenderer = mx.SchongBoxRender;
            this.qwcz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_recharge, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_hero, this);
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_hero, this);
            this.sm_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.closesm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.lqjl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ylq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.ShouChongLastAlertMediator(this));
            //龙骨
            if (mx.Tools.check_drgon()) {
                var armature = mx.TweenTool.getInstance().get_dragon("zn54301", 2);
                armature.display.x = 150;
                //armature.display.y = 350;
                //armature.display.scaleX = 0.55;
                //armature.display.scaleY = 0.55;
                //测试
                armature.display.y = 480;
                armature.display.scaleX = 0.9;
                armature.display.scaleY = 0.9;
                armature.animation.timeScale = 0.7;
                armature.animation.play();
                this.ef_g.addChild(armature.display);
                this.armature = armature;
            }
            else {
                var p = new eui.Image("zn54301_png");
                p.scaleX = p.scaleY = 0.65;
                this.ef_g.addChild(p);
            }
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            this.box_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            //时间
            var start_t = aproxy.last_time && aproxy.last_time.start || 0;
            var end_t = aproxy.last_time && aproxy.last_time.end || 0;
            var timestart = mx.Tools.format_time(start_t, "yrsf", 2, true); //.split(Lang.ri)[0] + Lang.ri;
            var timeend = mx.Tools.format_time(end_t, "yrsf", 2, true); //.split(Lang.ri)[0] + Lang.ri;
            this.time_t.text = timestart + ' - ' + timeend;
            this.sm_g.visible = false;
            this.fresh_view();
        };
        ShouChongLastAlert.prototype.show_hero = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            var cd = hproxy.get_hero_by_mid(303);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HeroInfoView.S_NAME,
                "param": {
                    "hero": cd || 303,
                    "type": cd ? 'haveget' : 'not',
                    "shuxing": true
                },
            });
        };
        ShouChongLastAlert.prototype.onTabChange = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.wdc) {
                var target = view.box_list.getChildAt(e.itemIndex);
                var point = target.parent.localToGlobal(target.x, target.y);
                facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                    "x": point.x + 154,
                    "y": point.y,
                    "w": target.width,
                    "h": target.height,
                    "type": "items",
                    "items": e.item.awards,
                    "name": mx.Tools.format(mx.Lang.s0007, e.item.dangci),
                });
            }
            else if (e.item.ylq) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.qf0009
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_LAST_PAY_BOX,
                    "id": e.item.id,
                });
            }
        };
        ShouChongLastAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var box_arr = [];
            //活动期间第一次 第二次 第三次充值额度
            var award = aproxy.last_pay_award;
            //let award = [1,0,1];
            var lq_flag = false; //是否有可领取
            if (award) {
                for (var k = 1; k <= 3; k++) {
                    var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.CZLEIJIAWARD, "baoxiang", k);
                    box_arr.push({
                        "id": k,
                        "awards": apis,
                        "wdc": Number(award[k - 1]) == 0,
                        "ylq": Number(award[k - 1]) == 1
                    });
                    if (!lq_flag) {
                        lq_flag = Number(award[k - 1]) == 2;
                    }
                }
                //都已领取 关闭弹窗
                if (Number(award[0]) == 1 && Number(award[1]) == 1 && Number(award[2]) == 1) {
                    view.ylq_g.visible = true;
                    view.ylq_p.visible = false;
                    view.qwcz_b.visible = view.lqjl_b.visible = false;
                    var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                    gproxy.last_pay = false;
                    facade.sendNotification(mx.MX_NOTICE.FRESH_RIGHT, "last_pay");
                    this.close_self();
                }
            }
            view.box_list.dataProvider = new eui.ArrayCollection(box_arr);
            view.qwcz_b.visible = view.lqjl_b.visible = view.ylq_g.visible = false;
            switch (aproxy.five_flag) {
                case 0://今日五点后
                    if (lq_flag) {
                        view.lqjl_b.visible = true;
                    }
                    else {
                        view.ylq_g.visible = true;
                    }
                    break;
                case 1://今日五点前
                    if (lq_flag) {
                        view.lqjl_b.visible = true;
                    }
                    else {
                        view.qwcz_b.visible = true;
                    }
                    break;
                default:
                    if (lq_flag) {
                        view.lqjl_b.visible = true;
                    }
                    else {
                        view.qwcz_b.visible = true;
                    }
                    break;
            }
        };
        ShouChongLastAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.qwcz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_recharge, this);
            this.box_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_hero, this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_hero, this);
            this.sm_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.closesm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.lqjl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ylq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (mx.Tools.check_drgon() && this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.animation.stop();
                this.ef_g.removeChild(this.armature.display);
                this.armature = null;
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.ShouChongLastAlertMediator.NAME);
        };
        ShouChongLastAlert.prototype.show_avg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "type": "ry"
                }
            });
        };
        ShouChongLastAlert.prototype.show_recharge = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
            this.close_self();
        };
        ShouChongLastAlert.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.exit_b:
                    this.close_self();
                    break;
                case this.sm_b:
                    this.sm_g.visible = !this.sm_g.visible;
                    break;
                case this.closesm_b:
                case this.sm_rect:
                    this.sm_g.visible = false;
                    break;
                case this.lqjl_b:
                    var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
                    var award = aproxy.last_pay_award;
                    for (var i = 0; i < 3; i++) {
                        if (Number(award[i]) == 2) {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_LAST_PAY_BOX,
                                "id": i + 1,
                            });
                            break;
                        }
                    }
                    break;
                case this.ylq_b:
                    var str = this.ylq_p.visible ? mx.Lang.r0036 : mx.Lang.hd007;
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                    break;
            }
        };
        ShouChongLastAlert.S_NAME = "ShouChongLastAlert";
        ShouChongLastAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return ShouChongLastAlert;
    }(mx.AlertView));
    mx.ShouChongLastAlert = ShouChongLastAlert;
    __reflect(ShouChongLastAlert.prototype, "mx.ShouChongLastAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShouChongLastAlert.js.map
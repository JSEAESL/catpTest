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
 * @cy、qianjun、mx
 * 2016.12.19
 * 循环充值alert
 */
var mx;
(function (mx) {
    var ShouChongLoopAlert = (function (_super) {
        __extends(ShouChongLoopAlert, _super);
        function ShouChongLoopAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_jindu = 1;
            _this.cur_idx = 0;
            return _this;
        }
        ShouChongLoopAlert.mx_support = function () {
            return ["assets.schong_last", "assets.schong_loop", "assets.zn54301_d", "api.LOOPMINPAY"];
        };
        ShouChongLoopAlert.prototype.init_view_by_type = function () {
            this.mnan_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.closesm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ylq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.box_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.award_list.itemRenderer = mx.SchongAwardRender;
            this.box_list.itemRenderer = mx.SchongLoopBoxRender;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.ShouChongLoopAlertMediator(this));
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            //时间
            var time = aproxy.acty_time['17'];
            var timestart = mx.Tools.format_time(time.start, "yrsf", 2, true); //.split(Lang.ri)[0] + Lang.ri;
            var timeend = mx.Tools.format_time(time.end, "yrsf", 2, true); //.split(Lang.ri)[0] + Lang.ri;
            this.time_t.text = timestart + ' - ' + timeend;
            this.sm_g.visible = false;
            this.fresh_view();
        };
        ShouChongLoopAlert.prototype.show_hero = function (mid) {
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            var cd = hproxy.get_hero_by_mid(mid);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HeroInfoView.S_NAME,
                "param": {
                    "hero": cd || mid,
                    "type": cd ? 'haveget' : 'not',
                    "shuxing": true
                },
            });
        };
        ShouChongLoopAlert.prototype.onTabChange = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var cd = e.item;
            if (cd.wdc) {
                if (cd.id == cd.total && 0) {
                    this.show_hero('30'); //侍从弹窗 这期牛魔王
                }
                else {
                    var target = view.box_list.getChildAt(Math.min(e.itemIndex, 3));
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x - 70,
                        "y": point.y - 86,
                        "w": 70,
                        "h": 80,
                        "type": "items",
                        "items": cd.awards,
                        "name": mx.Tools.format(mx.Lang.s0007, cd.dangci),
                    });
                }
            }
            else if (cd.ylq) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.qf0009
                });
            }
            else if (!cd.wdc && !cd.ylq) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_CZ_LOOP_BOX,
                    "key_id": cd.id,
                });
            }
        };
        ShouChongLoopAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            //活动期间充值
            var lq = aproxy.cz_loop_data.lq;
            var pay = aproxy.cz_loop_data.pay;
            var time = aproxy.cz_loop_data.time;
            view.cur_jindu = 1;
            //当前充值进度
            var box_arr = [];
            var len = 6;
            var idx = 0;
            var jindu = 0;
            var now = Math.floor(new Date().getTime() / 1000);
            //筛选合格的充值数据
            for (var k = 1; k <= len; ++k) {
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOOPMINPAY, "baoxiang", k);
                var num_1 = 0;
                for (var i = idx; i < pay.length; ++i) {
                    num_1 = Number(pay[i]);
                    this.cur_idx = i;
                    idx = i + 1;
                    var deadline = Number(time[view.cur_idx]) || 0;
                    if (num_1 >= Number(apis[0].jindu)) {
                        view.cur_jindu = (++jindu);
                        break;
                    }
                    else if (now > deadline) {
                        view.cur_jindu = Math.min(view.cur_jindu + 1, len);
                    }
                }
                box_arr.push({
                    "id": k,
                    "awards": apis,
                    "wdc": num_1 < Number(apis[0].jindu),
                    "ylq": lq.indexOf(k) > -1,
                    "total": len
                });
            }
            //时间比对
            // if(time.length){
            //     let now = Math.floor(new Date().getTime() / 1000);
            //     let deadline = Number(time[view.cur_idx]);
            //     if(now > deadline){
            //         view.cur_jindu = Math.min(view.cur_jindu + 1,len);
            //         view.cur_idx += 1;
            //     }
            // }
            //提示
            var baoxiang_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOOPMINPAY, "baoxiang", view.cur_jindu);
            var num = Number(pay[view.cur_idx]) || 0;
            var desc = Math.max(0, (Number(baoxiang_api[0].jindu) - num) * 10);
            if (desc <= 0) {
                view.yb_t.text = "";
                view.ts_p.source = "yczwlqtshi_png";
            }
            else {
                view.yb_t.text = desc + "";
                view.ts_p.source = "tyxedbczwben_png";
            }
            //奖励显示
            var award_arr = [];
            for (var i in baoxiang_api) {
                var obj = baoxiang_api[i];
                award_arr.push({
                    "type": obj.award_type,
                    "id": obj.item_id,
                    "num": obj.num,
                    "di": true,
                    "chicun": 60
                });
            }
            view.award_list.dataProvider = new eui.ArrayCollection(award_arr);
            //按钮显示
            var str = "";
            //充值未达成
            if (desc > 0) {
                str = "tyxeqwczhi_png";
            }
            else {
                if (lq.indexOf(view.cur_jindu) == -1) {
                    str = "tyxelqjli_png"; //可领取奖励
                }
                else {
                    str = "tyjljrylqu_png"; //已领取奖励
                }
            }
            view.ylq_b.set_ssres(str);
            //底部宝箱
            view.box_list.dataProvider = new eui.ArrayCollection(box_arr);
            if (len > 3) {
                view.box_list.height = 67;
                var layout = new mx.MXArithmeticLayout({
                    "width": 58,
                    "height": 67,
                    "desc": 4,
                    "type": "spe"
                });
                view.box_list.layout = layout;
            }
        };
        ShouChongLoopAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.box_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.mnan_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.closesm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ylq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ShouChongLoopAlertMediator.NAME);
        };
        ShouChongLoopAlert.prototype.show_avg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "type": "ry"
                }
            });
        };
        ShouChongLoopAlert.prototype.show_recharge = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
            this.close_self();
        };
        ShouChongLoopAlert.prototype.btn_click = function (evt) {
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
                case this.mnan_p:
                    this.show_hero('30');
                    break;
                case this.ylq_b:
                    var str = this.ylq_b.res_name;
                    switch (str) {
                        case "tyxeqwczhi_png"://充值去                            
                            this.close_self();
                            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                            break;
                        case "tyxelqjli_png"://领取                            
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_CZ_LOOP_BOX,
                                "key_id": this.cur_jindu,
                            });
                            break;
                        case "tyjljrylqu_png"://今日已领取                            
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0014 });
                            break;
                    }
                    break;
            }
        };
        ShouChongLoopAlert.S_NAME = "ShouChongLoopAlert";
        return ShouChongLoopAlert;
    }(mx.AlertView));
    mx.ShouChongLoopAlert = ShouChongLoopAlert;
    __reflect(ShouChongLoopAlert.prototype, "mx.ShouChongLoopAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShouChongLoopAlert.js.map
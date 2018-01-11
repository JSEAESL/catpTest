/**
*   @author mx
*   @date 2015.1.3
*   @desc 选秀弹窗
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
    var XXiuAlert = (function (_super) {
        __extends(XXiuAlert, _super);
        function XXiuAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuAlert.mx_support = function () {
            return ["assets.xx_alert", "api.EQUIP", "api.PICKVIP"];
        };
        XXiuAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_xxa_one": //选秀一次
                case "v_xxa_one2":
                    tar = this.ok_b;
                    break;
                default:
                    break;
            }
            return tar;
        };
        XXiuAlert.prototype.init_view_by_type = function () {
            var cd = this.adata;
            this.skin.currentState = cd.type;
            switch (cd.type) {
                case "gsws"://国士无双
                    this.init_gsws();
                    break;
                case "flcj"://风流才俊
                    this.init_flcj();
                    break;
                case "ppjz"://翩翩君子
                    this.init_ppjz();
                    break;
            }
            this.ten_t.text = "" + cd.ten;
            this.award_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this); //说明
            this.ten_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this); //十连
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XXiuAlertMediator(this));
        };
        XXiuAlert.prototype.init_gsws = function () {
            this.award_b.set_ssres("wsgsgdsming_png");
            this.exit_b.set_ssres("wsgsgbcha_png");
            this.one_t.text = "" + this.adata.one;
            this.bj_ts.visible = false;
            this.bj_t.visible = false;
            this.one_t.visible = true;
            var time = mx.AppConfig.get_day_mode();
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PICKVIP, "id", time);
            this.name_p.source = mx.Tools.get_mn_res(api.hero, "name");
            this.hero3_p.source = mx.Tools.get_mn_res(api.hero, "lh");
            //this.hero3_p.mask = this.rect3;
            mx.TweenTool.getInstance().breath_tween(this.hero3_p);
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", api.hero);
            var param = {
                'num': hero.InitialStars,
                'total': mx.MX_COMMON.HP_LEVEL,
                'res': 'mrpyxx',
                'style': 'cz',
                'gap': (120 - mx.MX_COMMON.HP_LEVEL * 18) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.VerticalAlign.TOP
            };
            this.hero_xx.init_multiui(param);
            this.hp_list.layout = new mx.MXNoLayout();
            this.hp_list.itemRenderer = mx.XXiugswsRender;
            var arr = [];
            for (var i = 1; i < 4; i++) {
                var sid = api["soul" + i];
                var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "equip_id", sid);
                var temp_arr = { "id": hapi.equip_id, "type": 4, "chicun": 120, "item_id": hapi.id };
                arr.push(temp_arr);
            }
            this.hp_list.dataProvider = new eui.ArrayCollection(arr);
            this.hp_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hp_click, this);
            this.detail_g.visible = false;
            this.detail_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero3_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XXiuAlert.prototype.hp_click = function (e) {
            var item = e.item.item_id;
            var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", item);
            var target = this.hp_list.getChildAt(this.hp_list.selectedIndex);
            var point = target.parent.localToGlobal(target.x, target.y);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                "x": point.x,
                "y": point.y,
                "w": target.width,
                "h": target.height,
                "id": hapi.equip_id,
                "type": mx.MX_COMMON.CTYPE_ITEM,
            });
        };
        XXiuAlert.prototype.init_ppjz = function () {
            this.exit_b.set_ssres("ppjzgbcha_png");
            this.ppfl_g.swapChildren(this.hero1_p, this.hero2_p);
            this.bj_ts.visible = false;
            this.init_ppfl();
        };
        XXiuAlert.prototype.init_flcj = function () {
            this.exit_b.set_ssres("flcjgbcha_png");
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            var bz = Number(proxy.xxrecord.bizhong);
            this.flcj_bt.text = (9 - bz) % 10 + "";
            if (bz == 9 || !proxy.xxrecord.diamond || Number(proxy.xxrecord.diamond) == 0) {
                this.center_p.source = "bcbdscong_png";
                this.flcj_bt.visible = false;
            }
            //是否半价
            if (proxy.ybcd > 0) {
                this.bj_t.visible = this.bj_ts.visible = this.bj_xian.visible = (proxy.half == 1);
            }
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            if (proxy.xxrecord.Tendiamond && Number(proxy.xxrecord.Tendiamond) > 0) {
                this.shilian_p.source = " ";
            }
            this.init_ppfl();
        };
        XXiuAlert.prototype.init_ppfl = function () {
            this.ppfl_g.mask = this.ppfl_rect;
            //this.hero1_p.mask = new egret.Rectangle(0, 0, 0, 20);
            //this.hero1_p.mask = new egret.Rectangle(0, 0, 0, 20);
            mx.TweenTool.getInstance().breath_tween(this.hero1_p);
            mx.TweenTool.getInstance().breath_tween(this.hero2_p, false);
            this.award_b.set_ssres("flcjjlylan_png");
            this.hero1_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hero2_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //   this.xxiu_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //   this.xxiu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_free();
            this.fresh_time();
        };
        XXiuAlert.prototype.fresh_free = function () {
            var view = this;
            var cd = view.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            switch (cd.type) {
                case "flcj"://风流美男
                    if (hproxy.ybcd > 0) {
                        view.one_t.text = "288";
                        view.one_t.textColor = 0xffffff;
                        view.mfts_p.visible = false;
                        this.fresh_yb = true;
                    }
                    else {
                        view.one_t.text = mx.Lang.p0023;
                        view.one_t.textColor = 0x4bd43c;
                        view.mfts_p.visible = true;
                        this.fresh_yb = false;
                    }
                    break;
                case "ppjz"://翩翩君子
                    view.ybimf_t.text = mx.Lang.p0023 + hproxy.ybimf + "/5"; //免费银币倒计时
                    if (hproxy.ybimf > 0) {
                        if (hproxy.ybicd > 0) {
                            view.one_t.text = "10000";
                            view.one_t.textColor = 0xffffff;
                            view.mfts_p.visible = false;
                            view.cd_g.visible = true;
                            this.fresh_ybi = true;
                        }
                        else {
                            view.one_t.text = mx.Lang.p0023;
                            view.one_t.textColor = 0x4bd43c;
                            view.mfts_p.visible = true;
                            view.cd_g.visible = false;
                            this.fresh_ybi = false;
                        }
                    }
                    else {
                        view.one_t.text = "10000";
                        view.one_t.textColor = 0xffffff;
                        view.mfts_p.visible = false;
                        view.cd_g.visible = false;
                        this.fresh_ybi = false;
                    }
                default:
                    break;
            }
        };
        XXiuAlert.prototype.fresh_time = function () {
            var view = this;
            var cd = view.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            switch (cd.type) {
                case "flcj"://风流美男//免费元宝倒计时
                    if (hproxy.ybcd > 0) {
                        view.mfts_p.visible = false;
                    }
                    else if (this.fresh_yb) {
                        this.fresh_free();
                    }
                    break;
                case "ppjz"://翩翩君子//免费银币倒计时
                    if (hproxy.ybicd > 0) {
                        var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                        if (gproxy.user_lv < 50 && gproxy.user_vip < 8) {
                            var timestr = mx.Tools.format_second(hproxy.ybicd);
                            view.cd_t.textFlow = [
                                { "text": timestr + mx.Lang.xx003, "style": { "textColor": 0xffe431 } },
                                { "text": mx.Lang.p0023, "style": { "textColor": 0x4bd43c } },
                            ];
                            view.mfts_p.visible = false;
                        }
                        else {
                            hproxy.ybicd = 0;
                            this.fresh_free();
                        }
                    }
                    else if (this.fresh_ybi) {
                        this.fresh_free();
                    }
                    break;
                default:
                    break;
            }
        };
        XXiuAlert.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.ok_b://买一次
                    this.check_num(true);
                    break;
                case view.ten_b://买十次
                    this.check_num(false);
                    break;
                case view.award_b://点击奖励一览/游戏说明按钮
                    if (this.adata.type != "gsws") {
                        var p_d = {
                            "name": mx.XXiuAwardAlert.S_NAME,
                            "param": {
                                "type": this.adata.type
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else {
                        this.detail_g.visible = true;
                    }
                    break;
                case view.detail_rect:
                    this.detail_g.visible = false;
                    break;
                case view.hero3_p:
                    var time = mx.AppConfig.get_day_mode();
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PICKVIP, "id", time);
                    facade.sendNotification(mx.MX_NOTICE.CHECK_HERO_INFO, api.hero);
                    break;
                case view.hero1_rect:
                    this.isone = true;
                    //  this.init_palert();
                    break;
                case view.hero2_rect:
                    this.isone = false;
                    //   this.init_palert();
                    break;
                /*  case view.xxiu_b://选秀
                      this.check_num(this.isone);
                      break;*/
                /* case view.xxiu_rect:
                     egret.Tween.removeTweens(view.xxiu1_p.mask);
                     egret.Tween.removeTweens(view.xxiu2_p.mask);
                     view.xxiu_g.visible = false;
                     break;*/
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XXiuAlert.S_NAME);
                    break;
            }
        };
        XXiuAlert.prototype.init_palert = function () {
            var view = this;
            //   view.xxiu_g.visible = true;
            var cd = this.adata.param;
            view.xxiu_t.text = this.isone ? view.one_t.text : view.ten_t.text;
            view.xxiu_t.textColor = view.xxiu_t.text == mx.Lang.p0023 ? 0x4bd43c : 0xffffff;
            //  view.xxiu_b.set_ssres(this.isone ? "wsxxyci_png" : "wsxxsci_png");
            /*  view.xxiu1_p.source = this.adata.type + "_" + (this.isone ? 1 : 10) + "_1_png";
              view.xxiu2_p.source = this.adata.type + "_" + (this.isone ? 1 : 10) + "_2_png";
  
              view.xxiu1_p.mask.width = 0;
              view.xxiu2_p.mask.width = 0;
              egret.Tween.get(view.xxiu1_p.mask).to({ "width": 312 }, 2000).call(this.x2p_tween, this);
         */
        };
        /*   private x2p_tween(): void {
               egret.Tween.get(this.xxiu2_p.mask).to({ "width": 312 }, 2000);
           }
   */
        XXiuAlert.prototype.check_num = function (isone) {
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var c_num = dproxy.get_currency(this.adata.type == "ppjz" ? "ybi" : "ybao");
            var cd = this.adata.param;
            if (isone) {
                var proxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
                if (c_num < cd.one && (proxy.ybimf <= 0 || proxy.ybicd > 0)) {
                    this.show_recharge();
                }
                else {
                    switch (this.adata.type) {
                        case "ppjz"://银币
                            cd.type = 3;
                            break;
                        case "flcj"://元宝
                            cd.type = 1;
                            break;
                        default:
                            break;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                }
            }
            else {
                if (c_num < cd.ten) {
                    this.show_recharge();
                }
                else {
                    switch (this.adata.type) {
                        case "ppjz"://银币
                            cd.type = 4;
                            break;
                        case "flcj"://元宝
                            cd.type = 2;
                            break;
                        case "gsws"://大量元宝
                            cd.type = 1;
                            break;
                        default:
                            break;
                    }
                    if (cd.type != 4) {
                        cd.xh = true;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                }
            }
        };
        XXiuAlert.prototype.show_recharge = function () {
            var a_d = {
                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                "param": mx.Lang.a0006
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        XXiuAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.ten_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
            view.award_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view); //说明
            if (view.adata.type == "gsws") {
                egret.Tween.removeTweens(view.hero3_p);
                view.detail_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
                view.hero3_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
                view.hp_list.dataProvider = null;
                view.hp_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, view.hp_click, view);
            }
            else {
                /*      egret.Tween.removeTweens(view.xxiu1_p.mask);
                      egret.Tween.removeTweens(view.xxiu1_p.mask);*/
                egret.Tween.removeTweens(view.hero1_p);
                egret.Tween.removeTweens(view.hero2_p);
                view.hero1_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
                view.hero2_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
                //    view.xxiu_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
                //   view.xxiu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.XXiuAlertMediator.NAME);
        };
        XXiuAlert.S_NAME = "XXiuAlert";
        return XXiuAlert;
    }(mx.AlertView));
    mx.XXiuAlert = XXiuAlert;
    __reflect(XXiuAlert.prototype, "mx.XXiuAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuAlert.js.map
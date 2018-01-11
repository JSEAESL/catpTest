/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿主界面
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
    var YXDianScreen = (function (_super) {
        __extends(YXDianScreen, _super);
        function YXDianScreen(cd) {
            var _this = _super.call(this, cd) || this;
            _this.cur_type = 0;
            _this.typename = ["sqwzi", "fpylan"];
            _this.isTx = false;
            _this.isLD = false;
            _this.yxd_created = false;
            return _this;
        }
        YXDianScreen.mx_support = function () {
            return [
                "assets.palace_yxd", "assets.palace_render",
                "api.JINJI", "api.ZINVSKILL", "api.HEROHOUGONG", "api.AVG"
            ];
        };
        YXDianScreen.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var fproxy = (facade.retrieveProxy(mx.FriendProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            this.isTx = wproxy.isTx;
            this.isLD = lproxy.isLD;
            this.uis_vs.top = this.isTx || this.isLD ? 80 : 203;
            this.hnum_g.visible = this.hnum_di.visible = !this.isTx && !this.isLD;
            if (this.isTx) {
                var fd = fproxy.get_curr_tx_friend();
                view.tab_list.visible = false;
                view.title.source = "trenhg_png";
                view.title.top = 12;
            }
            else if (lproxy.isLD) {
                var user = lproxy.get_cur_user();
                view.tab_list.visible = view.title.visible = false;
                view.title_t.text = mx.Tools.format(mx.Lang.tx001, user.name);
                view.title_t.visible = true;
            }
            var item_arr = [];
            for (var i = 0; i < this.typename.length; i++) {
                if (this.typename[i] != "") {
                    item_arr.push({
                        "word": this.typename[i] + '0_png',
                        "word2": this.typename[i] + '1_png',
                    });
                }
            }
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.tab_list.selectedIndex = 0;
            if (this.adata && this.adata.tab && this.adata.tab == "all") {
                this.cur_type = view.tab_list.selectedIndex = 1;
            }
            else if (mx.AppConfig.PREV_SCENE_ID == mx.YXDFzScreen.S_NAME && !lproxy.isLD) {
                this.cur_type = view.tab_list.selectedIndex = 1;
            }
            this.change_tab();
            this.fresh_ltp_num();
            this.fresh_fz_num();
            var isTx = wproxy.isTx;
            var isLD = lproxy.isLD;
            if (isTx) {
                view.ltp_g.visible = false;
                this.sming_b.visible = wproxy.friend_kw <= 0;
            }
            else if (isLD) {
                view.ltp_g.visible = false;
                this.sming_b.visible = wproxy.friend_kw <= 0;
            }
            this.hzsts_g.visible = this.rect.touchEnabled = false;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hnum_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.init_ani();
            facade.registerMediator(new mx.YXDianMediator(this));
            this.yxd_created = true;
            if (mx.MX_COMMON.IN_GUIDE) {
                if (this.yxd_created) {
                    if (this.sq_ui.yxd_need_change_tab) {
                        this.do_tab_click(1);
                    }
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
            }
        };
        YXDianScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_yxd_l1"://养心殿
                    tar = this.sq_ui.get_guide_pos(gkey);
                    break;
                case "s_yxd_fp":
                    tar = this.tab_list.getChildAt(1);
                    break;
                case "s_yxd_fl1":
                    tar = this.all_ui.get_guide_pos(gkey);
                    break;
                case "s_yxd_tg":
                    tar = this.all_ui.get_guide_pos(gkey);
                    break;
                default:
                    break;
            }
            return tar;
        };
        YXDianScreen.prototype.do_tab_click = function (type) {
            this.cur_type = type;
            this.tab_list.selectedIndex = type;
            this.change_tab();
            this.fresh_fz_num(true);
        };
        YXDianScreen.prototype.tab_click = function (e) {
            this.do_tab_click(e.itemIndex);
        };
        YXDianScreen.prototype.change_tab = function () {
            this.sq_ui.visible = this.cur_type == 0;
            this.all_ui.visible = this.cur_type == 1;
        };
        YXDianScreen.prototype.fresh_ltp_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (pproxy.res_ltp) {
                this.ltp_t.text = mx.Tools.format(mx.Lang.hg013, pproxy.res_ltp.num);
            }
        };
        YXDianScreen.prototype.fresh_fz_num = function (skip) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.isTx || this.isLD) {
                var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                this.hnum_t.text = mx.Tools.format(mx.Lang.hg012, wproxy.hg_num + '');
            }
            else {
                var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                var mns = pproxy.get_mn_list("notype");
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
                var max_num = 0;
                var all_num = Number(api.Feizi_limit);
                if (this.tab_list.selectedIndex == 1) {
                    max_num = mns.length;
                }
                else {
                    for (var k in mns) {
                        if (Number(mns[k].status) == 0 && typeof mns[k].sb_level != "undefined" && Number(mns[k].sb_level) == 0) {
                            max_num++;
                        }
                    }
                    all_num = mns.length;
                }
                //侍寝妃子：当前可侍寝妃子/妃子总数。
                this.hnum_t.textFlow = [
                    { "text": mx.Lang.hg130[this.tab_list.selectedIndex] },
                    { "text": max_num + "", "style": { "textColor": all_num < max_num ? 0xfa913c : 0xffffff } },
                    { "text": "/" + all_num },
                ];
                this.sming_b.visible = pproxy.res_hzs <= 0;
            }
        };
        YXDianScreen.prototype.init_ani = function () {
            var _this = this;
            this.ef.removeChildren();
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.x = 80;
            flower_v.y = 180;
            flower_v.play_by_times(-1);
            this.ef.addChild(flower_v);
            this.ef.scaleX = this.ef.scaleY = 1.5;
            egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.x = 200;
                flower_v1.y = 240;
                flower_v1.play_by_times(-1);
                _this.ef.addChild(flower_v1);
            }, this, 1000);
            egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.x = 360;
                flower_v2.y = 200;
                flower_v2.play_by_times(-1);
                _this.ef.addChild(flower_v2);
            }, this, 2000);
        };
        YXDianScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            switch (evt.currentTarget) {
                case this.back_b:
                    if (YXDianScreen.P_NAME) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, YXDianScreen.P_NAME);
                        YXDianScreen.P_NAME = null;
                    }
                    else if (this.isTx) {
                        wproxy.setTx(false);
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                    }
                    else if (lproxy.isLD) {
                        if (mx.AppConfig.PREV_SCENE_ID == mx.ChatScreen.S_NAME) {
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                        }
                        else if (lproxy.ld_type) {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                't': mx.MX_NETS.CS_LUEDUO_OTHER,
                                'type': lproxy.ld_type + 1,
                                'page': lproxy["ldpage" + (lproxy.ld_type + 1)]
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherScreen.S_NAME);
                        }
                    }
                    else {
                        var net = [{
                                "t": mx.MX_NETS.CS_HG_SHIJIAN,
                                "type": 1
                            }];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.PalaceScreen.S_NAME,
                            "param": { "net": net }
                        });
                    }
                    break;
                case view.add_b://购买绿头牌
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip || 0);
                    var a_d = {
                        "param": {
                            "res_n": pproxy.res_ltp.res,
                            "max_n": api.lvtoupai,
                            "item": 2000,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.sming_b:
                    view.hzsts_g.visible = !view.hzsts_g.visible;
                    view.rect.touchEnabled = view.hzsts_g.visible;
                    break;
                case view.rect:
                    view.hzsts_g.visible = false;
                    view.rect.touchEnabled = false;
                    break;
                case view.hnum_g:
                    var flow = [];
                    var target = evt.currentTarget;
                    var apis = mx.ApiTool.getAPI(mx.MX_APINAME.VIP);
                    var v_api = void 0, cor = void 0;
                    for (var k in apis) {
                        v_api = apis[k];
                        cor = Number(gproxy.user_vip) >= Number(k) ? 0x5bb351 : 0xb5b4b4;
                        var now_limit = Number(v_api.Feizi_limit);
                        if (Number(k) == 0) {
                            flow.push({ "text": mx.Tools.format(mx.Lang.p0141, k, now_limit), "style": { "textColor": cor } });
                            flow.push({ "text": "\n" });
                        }
                        else {
                            var pre_limit = Number(apis[Number(k) - 1].Feizi_limit);
                            if (now_limit != pre_limit) {
                                flow.push({ "text": mx.Tools.format(mx.Lang.p0141, k, now_limit), "style": { "textColor": cor } });
                                flow.push({ "text": "\n" });
                            }
                        }
                    }
                    flow.pop();
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "text",
                        "flow": flow,
                    });
                    break;
            }
        };
        YXDianScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sq_ui.on_remove();
            this.all_ui.on_remove();
            this.tab_list.dataProvider = null;
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sming_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            this.hnum_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDianMediator.NAME);
        };
        YXDianScreen.S_NAME = "YXDianScreen";
        return YXDianScreen;
    }(mx.BasicView));
    mx.YXDianScreen = YXDianScreen;
    __reflect(YXDianScreen.prototype, "mx.YXDianScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YXDianScreen.js.map
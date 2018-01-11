/**
 *   @author qianjun
 *   @date 2016.8.29
 *   @desc 魂魄获取render
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
    var HunpoGetWayRender = (function (_super) {
        __extends(HunpoGetWayRender, _super);
        function HunpoGetWayRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HunpoGetWayRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        HunpoGetWayRender.prototype.init_dl = function () {
            var view = this;
            var cd = this.data;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.stage_id);
            view.name_g.visible = true;
            view.name_t.text = mx.Tools.format(mx.Lang.fb001, api.ChapterID);
            view.desc_t.text = api.StageName;
            this.fresh_fuben_g();
        };
        HunpoGetWayRender.prototype.fresh_fuben_g = function () {
            if (!this.data) {
                return;
            }
            var view = this;
            var cd = this.data;
            if (cd.hecheng) {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.stage_id);
            var diff = parseInt(api.Difficulty) == 1; //普通副本
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            var astate = fproxy.astate;
            var acd = astate[cd.stage_id];
            if (acd.kaiqi == 0) {
                view.type_p.source = diff ? "fbptbqianhse_png" : "fbjybqianhse_png";
                this.bg.source = "xxdkuanghse_png";
                view.pass_p.visible = true;
                this.name_t.textColor = this.desc_t.textColor = 0x717171;
            }
            else if (diff) {
                view.fuben_g.visible = true;
                view.fuben_g.height = 29;
                view.pass_t.text = ""; //不显示次数
                view.type_p.source = "fbptbqian_png";
                view.fun_b.set_ssres("sdxcandban_png"); //粉色点击
                view.fun_t.text = mx.Tools.format(mx.Lang.fb025, fproxy.sdtype > 1 ? 10 : 1);
                this.name_t.textColor = this.desc_t.textColor = 0x926566;
            }
            else {
                this.name_t.textColor = this.desc_t.textColor = 0x926566;
                view.fuben_g.visible = true;
                view.type_p.source = "fbjybqian_png";
                view.fuben_g.height = 48;
                view.pass_t.text = "(" + acd.cishu + "/3)";
                if (Number(acd.cishu)) {
                    view.fun_b.set_ssres("sdxcandban_png"); //粉色点击
                    view.fun_t.text = mx.Tools.format(mx.Lang.fb025, fproxy.sdtype > 1 ? 3 : 1);
                }
                else {
                    view.fun_b.set_ssres("schdtjczhi_png"); //重置
                    view.fun_t.text = "";
                }
            }
        };
        HunpoGetWayRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this; //默认不显示副本信息
            view.name_g.visible = view.fuben_g.visible = view.pass_p.visible = false;
            var cd = data;
            switch (cd.style) {
                case "hunpo"://魂魄
                    this.init_dl();
                    break;
                case "equip"://装备
                    if (cd.hecheng) {
                        this.desc_middle_style(mx.Lang.p0062);
                    }
                    else if (cd.other) {
                        var model_id_1 = Number(cd.stage_id);
                        this.desc_middle_style(mx.Lang.p0121[model_id_1 - 5]);
                    }
                    else {
                        this.init_dl();
                    }
                    break;
                case "cailiao"://材料不能由副本掉落
                    var model_id = Number(cd.stage_id);
                    this.desc_middle_style(mx.Lang.p0068[model_id - 1]);
                    break;
                default:
                    if (cd.other) {
                        var model_id_2 = Number(cd.stage_id);
                        this.desc_middle_style(mx.Lang.p0121[model_id_2 - 5]);
                    }
                    break;
            }
        };
        HunpoGetWayRender.prototype.desc_middle_style = function (str) {
            var view = this.desc_t;
            view.text = str;
            view.size = 20;
            view.verticalCenter = 0;
            view.left = 132;
        };
        HunpoGetWayRender.prototype.btn_click = function (evt) {
            var view = this;
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            if (cd.style == "cailiao") {
                var model_id = Number(cd.stage_id);
                var msg = void 0, jump = void 0;
                switch (Number(cd.stage_id)) {
                    case 1:
                    case 6:
                        msg = mx.MX_NOTICE.CS_GET_DATA;
                        jump = {
                            "t": mx.MX_NETS.CS_SHOP_INFO
                        };
                        break;
                    case 2://取消太庙
                        break;
                    case 3:
                    case 4:
                        var net = [{
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11",
                            }];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.PalaceScreen.S_NAME,
                            "param": { "net": net }
                        });
                        return;
                    case 5:
                        msg = mx.MX_NOTICE.POP_VIEW;
                        jump = {
                            "name": mx.BuyAlertView.S_NAME,
                            "param": cd.item_id
                        };
                        break;
                    case 7:
                        msg = mx.MX_NOTICE.SCENE_CHANGE;
                        jump = mx.JFSScreen.S_NAME;
                        break;
                    default:
                        return;
                }
                facade.sendNotification(msg, jump);
            }
            else {
                if (cd.hecheng) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", cd.id);
                    if (api) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.EquipHechengAlert.S_NAME, "param": cd.id
                        });
                    }
                }
                else if (cd.other) {
                    switch (Number(cd.stage_id)) {
                        case 5://副本掉落
                            var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                            fProxy.cur_chapter = 1;
                            fProxy.cur_stage = 1;
                            fProxy.set_jump(false);
                            fProxy.set_pop_jump(false);
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_JUQING_INFO,
                                'chapter': fProxy.cur_chapter
                            });
                            break;
                        case 6://翩翩君子
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME, "ppjz");
                            break;
                        case 7://风流才俊
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME, "flcj");
                            break;
                        case 8://国士无双
                            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                            if (gproxy.user_lv >= 11) {
                                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME, "gsws");
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xx000 });
                            }
                            break;
                    }
                }
                else {
                    var astate = proxy.astate;
                    var acd = astate[cd.stage_id];
                    if (!view.fuben_g.visible) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb030 });
                    }
                    else if (evt.target != this.fuben_g && evt.target.parent != this.fuben_g) {
                        proxy.set_jump(true);
                        proxy.set_pop_jump(true);
                        proxy.set_stage_id(cd.stage_id);
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.stage_id);
                        var obj = {
                            "1402": {
                                "t": mx.MX_NETS.CS_FUBEN_STAGE_LIST,
                                "chapter": api.ChapterID,
                                "difficult": api.Difficulty,
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.FubenScreen.S_NAME,
                            "param": { "net": obj }
                        });
                    }
                    else if (view.fun_t.text == "") {
                        var pid = Math.min(parseInt(acd.purchase) + 1, mx.MX_COMMON.MAX_FB_RESET);
                        var info = mx.ApiTool.getAPINode(mx.MX_APINAME.RESETFBPRICE, 'id', pid);
                        var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                        var vipapi = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
                        if (pid > vipapi.EliteReset) {
                            if (gproxy.user_vip < 15) {
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                    "name": mx.AlertView.S_NAME,
                                    "param": {
                                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                        "param": mx.Lang.fb005,
                                    }
                                });
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                    "name": mx.AlertView.S_NAME,
                                    "param": {
                                        "param": mx.Lang.fb033,
                                    }
                                });
                            }
                        }
                        else {
                            var p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": { "t": mx.MX_NETS.CS_FUBEN_CHONGZHI, "stage": cd.stage_id },
                                    "param": mx.Tools.format(mx.Lang.fb012, info.price, acd.purchase),
                                }
                            };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        }
                    }
                    else if (Number(acd.state) < 3) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb035 });
                    }
                    else {
                        proxy.cur_stage = cd.stage_id;
                        facade.sendNotification(mx.MX_NOTICE.FUBEN_SAODANG);
                    }
                }
            }
        };
        HunpoGetWayRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        return HunpoGetWayRender;
    }(mx.BasicRender));
    mx.HunpoGetWayRender = HunpoGetWayRender;
    __reflect(HunpoGetWayRender.prototype, "mx.HunpoGetWayRender");
})(mx || (mx = {}));
//# sourceMappingURL=HunpoGetWayRender.js.map
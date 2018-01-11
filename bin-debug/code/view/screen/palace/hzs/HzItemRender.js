/**
 *   @author wf、qianjun、mx
 *   @date 2016.10.9
 *   @desc 皇子所列表render
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
    var HzItemRender = (function (_super) {
        __extends(HzItemRender, _super);
        function HzItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.cming_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jsu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hdong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cfeng_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyin_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyzzhi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hpei_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pyms_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.twang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zhuangtai_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.state_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
        };
        HzItemRender.prototype.init_render = function () {
            var view = this;
            view.cming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jsu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hdong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cfeng_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyzzhi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hpei_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pyms_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.twang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zhuangtai_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.state_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.start();
            }
            this.dataChanged();
        };
        HzItemRender.prototype.timerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var state = Number(data.zhuangtai);
            this.time1_t.visible = state <= 1;
            if (data.type == 1) {
                if (data.growtime >= 0) {
                    data.growtime--;
                    this.time1_t.textFlow = [
                        { "text": mx.Lang.hzs07 + '：', "style": { "textColor": 0xa07d7a } },
                        { "text": mx.Tools.format_second(data.growtime, true), "style": { "textColor": 0x7ea45d } }
                    ];
                }
                else if (state < 2) {
                    var facade = mx.ApplicationFacade.getInstance();
                    var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        t: mx.MX_NETS.CS_HZS_DATA,
                        type: 1,
                        page: proxy.hzs_page1
                    });
                }
                data.res--;
                this.time2_t.text = mx.Tools.format_second(data.res, true);
                this.time2_t.visible = data.res > 0 ? true : false;
            }
            else {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
        };
        HzItemRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            proxy.cur_hzs_type = d.type;
            switch (e.currentTarget) {
                case view.jsu_b://成长加速
                    if (d.over_time == 0) {
                        return;
                    }
                    var now_time = Math.floor(new Date().getTime() / 1000);
                    var res_time = Number(d.over_time) - now_time;
                    var t = d.zhuangtai == 0 ? res_time - 7200 : res_time;
                    var money = Math.ceil(t / 60);
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.AlertView.S_NAME,
                        param: {
                            notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                            sdata_ok: {
                                't': mx.MX_NETS.CS_HZS_SPEED, 'id': d.id, 'jieduan': d.zhuangtai
                            },
                            czjsu: true,
                            price: 1 / 60,
                            time: t,
                            hzdata: d,
                            param: mx.Tools.format(mx.Lang.hzs02, money),
                        }
                    });
                    break;
                case view.cming_b://赐名
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzEditPop.S_NAME,
                        param: { type: 1, data: this.data }
                    });
                    break;
                case view.cfeng_b://册封
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzEditPop.S_NAME,
                        param: { type: 2, data: this.data }
                    });
                    break;
                case view.lyin_b://结缘
                    var flag = false;
                    for (var i in this.data.skill) {
                        if (Number(this.data.skill[i]) == 23) {
                            flag = true;
                            if (this.data.daishu) {
                                var xuetong = this.data.daishu.split("_");
                                if (Number(xuetong[0]) == 3 && Number(xuetong[1]) <= 3) {
                                    flag = false;
                                }
                            }
                            break;
                        }
                    }
                    if (flag) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzsHybmView.S_NAME, param: this.data });
                    }
                    else {
                        if (Number(d.sb_level) != 0) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs81 });
                            return;
                        }
                        proxy.cur_zn_info = d;
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinLxPop.S_NAME, param: d });
                    }
                    break;
                case view.lyzzhi_b://结缘终止
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.AlertView.S_NAME,
                        param: {
                            notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                            sdata_ok: {
                                t: mx.MX_NETS.CS_HZS_LIANYIN_STOP,
                                id: this.data.id,
                            },
                            param: mx.Lang.hzs42
                        }
                    });
                    break;
                case view.hpei_t://跳转到婚配对象
                    if (d.hun_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": d.hun_id,
                        });
                        break;
                    }
                    break;
                case view.pyms_t:
                    if (d.pianyi_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": d.pianyi_id,
                        });
                        break;
                    }
                    break;
                case view.twang: //探望子女
                case view.hdong_b://互动
                    var state = Number(d.zhuangtai);
                    if (state == -1 || state == 7) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs45 });
                        return;
                    }
                    // if(d.type == 3){
                    //     //(state < 3 || (state > 3 && d.hunpei == ''))
                    //     //未婚的沧海遗珠子女无法召见
                    //     facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.hzs56});
                    //     return;   
                    // }
                    proxy.cur_zn_info = null;
                    proxy.cur_zn_info = d;
                    proxy.hzhd_bg = mx.Tools.get_bb_res("znbg", state, d.avatar, Number(d.meili));
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": Number(d.id) + 1000,
                        "type": 10
                    });
                    break;
                case view.zhuangtai_t:
                case view.state_t:
                    if (String(d.status).split("|").indexOf("1") >= 0) {
                        var point = this.localToGlobal(e.currentTarget.x, e.currentTarget.y);
                        var p_d = {
                            "x": point.x,
                            "y": point.y,
                            "w": e.currentTarget.width,
                            "h": e.currentTarget.height,
                            "type": "ysjj",
                        };
                        facade.sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
                    }
                    break;
            }
        };
        HzItemRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var state = Number(d.zhuangtai);
            var isChild = state < 2 && state >= 0;
            var isSingle = state < 3 && state >= 0;
            var isSisheng = !(typeof d.pianyi_name == "undefined");
            var hasName = d.name != "";
            var hasFhao = d.fenghao != "";
            view.whznv_g.visible = d.type == 1;
            view.cjznv_g.visible = d.type == 2;
            view.name_t.text = view.name2_t.text = hasName ? (d.xing + d.name) : mx.Lang.hzs05;
            view.name_t.textColor = view.name2_t.textColor = hasName && !isChild ? mx.Tools.num2color(d.meili) : 0x9C86A5;
            view.mli_t.textFlow = view.mli2_t.textFlow = [
                { "text": mx.Lang.mli + '：', "style": { "textColor": 0xCA4EA4 } },
                { "text": d.meili || "???", "style": { "textColor": 0xC18AB0 } }
            ];
            view.avatar.source = mx.Tools.get_bb_res("tx", state, d.avatar, d.meili);
            var firstfour = view.avatar.source[0] + view.avatar.source[1] + view.avatar.source[2] + view.avatar.source[3];
            switch (firstfour) {
                case "zntt":
                case "bbtx":
                    view.avatar.top = 10;
                    break;
            }
            view.hsxyzhong_p.visible = false;
            view.slgxxiu_p.visible = false;
            //关系 126 240(65) 262 - 64未婚  279 366(66) 387 -65出嫁
            var show = !(d.type == 3 || (d.type == 1 && !isChild));
            if (show) {
                var flag = d.type == 1;
                view.guanxi_t.left = flag ? 188 : 391;
                view.guanxi_xin.left = flag ? 385 : 518;
                view.guanxi_desc.left = flag ? 417 : 549;
                view.guanxi_t.top = flag ? 103 : 104;
                view.guanxi_xin.top = flag ? 104 : 105;
                view.guanxi_desc.top = flag ? 100 : 101;
                var guanxi = "";
                var xin = Number(d.guanxi);
                var num = Math.min(Math.floor(xin / 50), 3);
                var guanhuai = Math.min(num * 50, 150);
                if (xin < 0) {
                    guanhuai = -100;
                    num = -1;
                }
                var xin_arr = ["hzsssxin", "hzsssxin", "hzsqjxin", "hzsrmxin", "hzszqxin"];
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUANXI, "guanhuaizhi", guanhuai);
                guanxi = api.guanxi;
                view.guanxi_xin.source = xin_arr[num + 1] + "_png";
                view.guanxi_t.textFlow = [
                    { "text": mx.Lang.gxi + '：', "style": { "textColor": 0xCA4EA4 } },
                    { "text": d.guanxi || "999", "style": { "textColor": 0xC18AB0 } }
                ];
                view.guanxi_desc.text = guanxi;
            }
            else {
                view.guanxi_t.visible = view.guanxi_xin.visible = view.guanxi_desc.visible = false;
            }
            if (d.type == 1) {
                if (typeof d.hei_res != 'undefined') {
                    d.res = d.hei_res;
                }
                view.hpei_t.visible = false;
                //未成年子女显示为评价。（没有评价时时显示为？？？）成年子女显示为性格
                var xg_info = void 0;
                if (isChild) {
                    xg_info = mx.ApiTool.getAPINode(mx.MX_APINAME.PINGJIA, "id", d.pingjia);
                    view.pingjia_t.textFlow = [
                        { "text": (isChild ? mx.Lang.pjia : mx.Lang.xge) + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": isChild ? (xg_info ? xg_info.keyword : "???") : (xg_info ? xg_info.xingge : "???"), "style": { "textColor": 0xC18AB0 } }
                    ];
                }
                else {
                    // xg_info = ApiTool.getAPINode(MX_APINAME.XINGGE, "xingge_id", d.xingge);
                    view.pingjia_t.textFlow = [
                        { "text": mx.Lang.mli + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": d.meili, "style": { "textColor": 0xC18AB0 } }
                    ];
                    view.guanxi_t.visible = true;
                    view.guanxi_t.left = 189;
                    var name1 = void 0, name2 = void 0;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", d.skill[0]);
                    if (api) {
                        name1 = api.name;
                    }
                    else {
                        name1 = mx.Lang.hzs75;
                    }
                    view.guanxi_t.textFlow = [
                        { "text": mx.Lang.jineng + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": name1, "style": { "textColor": api ? 0x5DA01C : 0xA0A0A0 } }
                    ];
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", d.skill[1]);
                    if (api2) {
                        name2 = api2.name;
                    }
                    else {
                        name2 = mx.Lang.hzs75;
                    }
                    view.mli_t.textFlow = [
                        { "text": mx.Lang.jineng + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": name2, "style": { "textColor": api2 ? 0x5DA01C : 0xA0A0A0 } }
                    ];
                }
                //未婚子女
                view.rank_t.text = mx.Tools.num2chinese(d.paiwei) + (d.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04);
                view.rank_t.text = hasFhao ? d.fenghao : view.rank_t.text;
                view.rank_t.left = view.name_t.left + view.name_t.width + 26;
                view.tagbg_p.left = view.name_t.left + view.name_t.width + 7;
                view.tagbg_p.width = view.rank_t.width + 38;
                //view.parent_t.text = (d.muzu.split('|')[1] == 1 ? Lang.smu : Lang.sfu) + ': ' + d.muzu.split('|')[0];
                view.time1_t.textFlow = [
                    { "text": mx.Lang.hzs07 + '：', "style": { "textColor": 0xCA4EA4 } },
                    { "text": mx.Tools.format_second(d.growtime, true), "style": { "textColor": 0x5DA01C } }
                ];
                // view.time1_t.textFlow = Tools.setStrColor(Lang.hzs07, [Tools.format_second(d.growtime, true)], [0x739d4c]);
                if (d.res < 0) {
                    d.res = null;
                }
                else {
                    view.time2_t.text = mx.Tools.format_second(d.res, true);
                }
                view.time1_t.visible = state <= 1;
                view.time2_t.visible = d.res ? true : false;
                view.mli_t.visible = !isChild; //魅力屏蔽
                view.jsu_b.visible = isChild;
                view.cming_b.visible = !hasName;
                view.cfeng_b.visible = !isChild && !hasFhao && hasName;
                view.lyin_b.visible = hasFhao && state == 2 && !d.res;
                view.lyzzhi_b.visible = d.res ? true : false;
                view.hdong_b.visible = !(view.lyin_b.visible || view.lyzzhi_b.visible);
                if (typeof d.hei_res != 'undefined') {
                    view.lyzzhi_b.visible = false;
                    view.hsxyzhong_p.visible = true;
                }
                if (Number(d.sb_level) && Number(d.zhuangtai) >= 0) {
                    // view.zhuangtai_t.textFlow = [{ "text": Lang.ysjj, "style": { "underline": true, "textColor": Tools.num2color(1, true) } }];
                    // view.zhuangtai_t.touchEnabled = true;
                    view.ysjj_p.visible = true;
                }
                else {
                    //皇子所未婚子女不再显示健康状态，只显示病\阳寿将尽的负面状态。（因为没有病/阳寿将尽就是健康，没必要显示）
                    // view.zhuangtai_t.textColor = 0x9c86a5;
                    // view.zhuangtai_t.text = Tools.status_to_str(0, "fz");
                    view.zhuangtai_t.text = "";
                    view.zhuangtai_t.touchEnabled = false;
                }
                if (view.lyin_b.visible && d.xuanxiu) {
                    view.slgxxiu_p.visible = true;
                    if (Number(d.xuanxiu.result) == 2 || (Number(d.xuanxiu.key_id) == 3 && Number(d.xuanxiu.result) < 60 && Number(d.xuanxiu.result) > 0)) {
                        view.slgxxiu_p.source = "sllxuanhzs_png";
                    }
                    else {
                        view.lyin_b.visible = false;
                        switch (Number(d.xuanxiu.key_id)) {
                            case 1:
                                view.slgxxiu_p.source = "slcxuanhzs_png";
                                break;
                            case 2:
                                view.slgxxiu_p.source = "slfxuanhzs_png";
                                break;
                            case 3:
                                view.slgxxiu_p.source = "sldxuanhzs_png";
                                break;
                        }
                    }
                }
            }
            else {
                view.hpei_t.visible = true;
                //出嫁子女 沧海遗珠
                view.cjznv_g.visible = true;
                view.whznv_g.visible = false;
                view.cshen_t.textFlow = [
                    { "text": mx.Lang.cshen + '：', "style": { "textColor": 0xCA4EA4 } },
                    { "text": d.fenghao || (mx.Tools.num2chinese(d.paiwei) + (d.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04)), "style": { "textColor": 0xC18AB0 } }
                ];
                var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", d.xingge);
                view.xingge_t.textFlow = [
                    { "text": mx.Lang.xge + '：', "style": { "textColor": 0xCA4EA4 } },
                    { "text": xg_api ? xg_api.xingge : "???", "style": { "textColor": 0xC18AB0 } }
                ];
                var arr = [];
                arr.push({ "text": mx.Lang.ztai + "：", "style": { "textColor": 0xCA4EA4 } });
                if (!d.status) {
                    d.status = (state == -1 || state == 7) ? 5 : 0; //去世||健康
                }
                var status_1 = String(d.status).split("|");
                if (status_1.length == 1) {
                    if (Number(d.sb_level) && Number(d.zhuangtai) >= 0) {
                        arr.push({
                            "text": mx.Tools.status_to_str(1, "fz"),
                            "style": { "textColor": mx.Tools.num2color(1, true) }
                        });
                    }
                    else {
                        arr.push({
                            "text": mx.Tools.status_to_str(Number(d.status), "fz"),
                            "style": { "textColor": mx.Tools.num2color(Number(d.status), true) }
                        });
                    }
                }
                else {
                    var temp = ["2", "3", "4", "1"]; //孕病撤牌
                    for (var k in temp) {
                        if (status_1.indexOf(temp[k]) >= 0) {
                            arr.push({
                                "text": mx.Tools.status_to_str(Number(temp[k]), "fz"),
                                "style": { "textColor": mx.Tools.num2color(temp[k], true) }
                            });
                            arr.push({
                                "text": " / ",
                            });
                        }
                    }
                    arr.splice(arr.length - 1, 1);
                }
                view.state_t.textFlow = arr;
                if (d.type == 3) {
                    view.pyms_t.visible = true;
                    view.pyms_t.textFlow = [
                        { "text": mx.Lang.pyms + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": d.pianyi_name, "style": { "textColor": 0xFF295B, "underline": true } }
                    ];
                    //未成年子女显示为评价。（没有评价时时显示为？？？）成年子女显示为性格
                    var xg_api_1;
                    if (isChild) {
                        xg_api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.PINGJIA, "id", d.pingjia);
                    }
                    else {
                        xg_api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", d.xingge);
                    }
                    view.xingge_t.textFlow = [
                        { "text": (isChild ? mx.Lang.pjia : mx.Lang.xge) + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": isChild ? (xg_api_1 ? xg_api_1.keyword : "???") : (xg_api_1 ? xg_api_1.xingge : "???"), "style": { "textColor": 0xC18AB0 } }
                    ];
                }
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(d.weifen));
                //view.wfen_t.text = Lang.wfen + ': ' + (api ? (d.sex == 1 ? api.weifeng : api.weifenb) : Lang.wu);
                if (state == 4) {
                    view.hpei_t.textFlow = [
                        { "text": mx.Lang.hpei + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": d.hunpei == mx.Lang.xxg23 ? d.hunpei : d.hunpei + mx.Lang.hzs46 + (d.sex == 1 ? mx.Lang.hgnw7 : mx.Lang.hgnw5), "style": { "textColor": 0xC18AB0 } }
                    ];
                }
                else if (state == 5 || state == 7) {
                    view.hpei_t.textFlow = [
                        { "text": mx.Lang.jju + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": (state == 5 ? mx.Lang.hzs51 : mx.Lang.hzs52), "style": { "textColor": 0x9c86a5 } }
                    ];
                }
                else {
                    var flag = d.hunpei == "";
                    view.hpei_t.textFlow = [
                        { "text": mx.Lang.hpei + '：', "style": { "textColor": 0xCA4EA4 } },
                        { "text": flag ? mx.Lang.swhp : d.hunpei, "style": { "textColor": flag ? 0x9c86a5 : 0xC18AB0, "underline": !flag } }
                    ];
                }
                //view.zu_t.text = (d.muzu.split('|')[1] == 1 ? Lang.smu : Lang.sfu) + ': ' + d.muzu.split('|')[0];
            }
            this.show_tag();
        };
        HzItemRender.prototype.show_tag = function () {
            var d = this.data;
            var tag_arr = [];
            var tag;
            switch (d.sisheng) {
                case "0":
                    break;
                case Main.USER_ID:
                    tag = "ssz_png";
                    break;
                default://既不是亲生，也不是私生，即为野孩子
                    tag = "yzz_png";
                    break;
            }
            if (tag) {
                tag_arr.push({
                    "tag": tag,
                });
            }
            if (d.zhuan == 1 || d.zhuan == 3) {
                tag_arr.push({
                    "tag": "zsbqian_png",
                });
            }
            this.tag_list.dataProvider = new eui.ArrayCollection(tag_arr);
        };
        return HzItemRender;
    }(mx.BasicRender));
    mx.HzItemRender = HzItemRender;
    __reflect(HzItemRender.prototype, "mx.HzItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=HzItemRender.js.map
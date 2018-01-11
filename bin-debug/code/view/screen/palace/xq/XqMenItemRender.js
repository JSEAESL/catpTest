/**
 *   @author qianjun、mx
 *   @date 2016.10.9
 *   @desc 省亲妃子render
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
    var XqMenItemRender = (function (_super) {
        __extends(XqMenItemRender, _super);
        function XqMenItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.wenzi_count = 0;
            _this._timer = null;
            _this.round = 0;
            _this.show_round = 0;
            return _this;
        }
        XqMenItemRender.prototype.init_render = function () {
            var view = this;
            view.send_gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.go1_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xz_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hunpei_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.man_tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add_mc, this);
            this.dataChanged();
        };
        Object.defineProperty(XqMenItemRender.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XqMenItemRender.prototype, "xproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.XqinProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XqMenItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                this._timer = null;
            }
            this.send_gift_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hunpei_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.go1_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xz_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.man_tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.add_mc, this);
        };
        XqMenItemRender.prototype.add_mc = function (e) {
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var xproxy = this.xproxy;
            if (data.suo) {
                if (data.idx > 11) {
                    var price = {
                        "1": 100,
                        "2": 300,
                        "3": 500
                    };
                    var param = data.need;
                    var des = data.param;
                    var type = xproxy.cur_type;
                    xproxy.suo_idx = data.idx;
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": (des + 12) == data.idx ? mx.MX_NOTICE.CS_GET_DATA : mx.MX_NOTICE.CLOSE_POP,
                            "sdata_ok": (des + 12) == data.idx ? { "t": mx.MX_NETS.CS_XQ_ADD_MC, "type": type - 1 } : mx.AlertView.S_NAME,
                            "param": (des + 12) == data.idx ? mx.Tools.format(mx.Lang.xq028, price[param.toString()]) : mx.Tools.format(mx.Lang.xq029, price[(des + 1).toString()])
                        }
                    });
                }
                else if (data.idx > 8) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_VIP_LIBAOSTATE });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.xq025, (data.need + mx.Lang.dji)) });
                }
            }
            else if (data.empty && Number(data.cishu) < 3) {
                var msg = void 0, param = void 0;
                if (xproxy.cur_type == 1) {
                    if (e.target == this.xz_btn) {
                        return;
                    }
                    var pproxy = this.proxy;
                    pproxy.sort_weifen();
                    msg = mx.MX_NOTICE.POP_VIEW;
                    param = {
                        "name": mx.SelectFZView.S_NAME,
                        "param": {
                            "data": pproxy.get_mn_list("xinqing"),
                            "type": xproxy.cur_type,
                            "idx": data.idx
                        }
                    };
                }
                else {
                    msg = mx.MX_NOTICE.CS_GET_DATA;
                    param = { "t": mx.MX_NETS.CS_YXD_XQ_CJZN, "page_id": 1 };
                    xproxy.zn_idx = data.idx;
                }
                facade.sendNotification(msg, param);
            }
        };
        XqMenItemRender.prototype.TimerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var xproxy = this.xproxy;
            var time = xproxy.fz_xq_info[data.index].time;
            if (time > 0) {
                this.time_t.text = mx.Tools.format_second(time);
            }
            else {
                if (this._timer) {
                    this._timer.stop();
                    this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                    this._timer = null;
                }
                this.time_t.text = "";
                //身份 大于1000为二代妃 省亲  小于1000为英雄美男 出游
                this.go1_btn.set_ssres("fhgzhong_png");
            }
        };
        XqMenItemRender.prototype.btn_click = function (e) {
            var view = this;
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var msg = "";
            var param = {};
            var pproxy = this.proxy;
            var xproxy = this.xproxy;
            var type = xproxy.cur_type;
            switch (e.currentTarget) {
                case view.man_tx:
                    if (data.prepare) {
                        var field = data.type == 1 ? data.y_id : data.zinv_id;
                        for (var i in xproxy.xz_fz_info) {
                            if (xproxy.xz_fz_info[i].id == field) {
                                xproxy.xz_fz_info.splice(Number(i), 1);
                                break;
                            }
                        }
                        facade.sendNotification(mx.MX_NOTICE.SELECT_FZ);
                    }
                    break;
                case view.xz_btn://选择子女/妃子
                    if (xproxy.cur_type == 1) {
                        pproxy.sort_weifen();
                        msg = mx.MX_NOTICE.POP_VIEW;
                        param = {
                            "name": mx.SelectFZView.S_NAME,
                            "param": {
                                "data": pproxy.get_mn_list("xinqing"),
                                "type": xproxy.cur_type,
                                "idx": data.idx
                            }
                        };
                    }
                    else {
                        msg = mx.MX_NOTICE.CS_GET_DATA;
                        param = { "t": mx.MX_NETS.CS_YXD_XQ_CJZN, "page_id": 1 };
                        xproxy.zn_idx = data.idx;
                    }
                    break;
                case view.go1_btn:
                    var str = view.go1_btn.res_name;
                    switch (str) {
                        case "xqzhong_png": //省亲cd
                        case "gxzhong_png":
                            msg = mx.MX_NOTICE.POP_VIEW;
                            var price = Math.ceil((Math.floor((Number(data.time)) / 60)) / 5);
                            param = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": { "t": mx.MX_NETS.CS_YXD_XQ_FRESH_CD, "id": type == 1 ? data.y_id : data.zinv_id, "type": type - 1 },
                                    "param": mx.Tools.format(type == 1 ? mx.Lang.xq003 : mx.Lang.xq044, price)
                                }
                            };
                            break;
                        case "hjxqin_png"://妃子省亲
                            msg = mx.MX_NOTICE.CS_GET_DATA;
                            param = {
                                "t": mx.MX_NETS.CS_YXD_FZ_XQ,
                                "id": this.data.y_id,
                                "biaoji": this.data.idx
                            };
                            pproxy.set_feizi_mid(parseInt(this.data.mid));
                            break;
                        case "yqhjia_png"://子女归省  
                            msg = mx.MX_NOTICE.CS_GET_DATA;
                            param = {
                                "t": mx.MX_NETS.CS_YXD_ZN_XQ,
                                "zinv_id": this.data.zinv_id,
                                "biaoji": this.data.idx
                            };
                            break;
                        case "fhgzhong_png":
                        case "hqlwu_png":
                            //返回宫中领取奖励
                            msg = mx.MX_NOTICE.CS_GET_DATA;
                            param = {
                                "t": mx.MX_NETS.CS_YXD_FZ_LQ_GIFT,
                                "id": type == 1 ? data.y_id : data.zinv_id,
                                "type": type - 1
                            };
                            break;
                    }
                    break;
                case view.send_gift_btn://赠送礼物
                    msg = mx.MX_NOTICE.POP_VIEW;
                    var info = void 0;
                    if (typeof this.data.zinv_info == 'undefined') {
                        var zn_arr = mx.Tools.arr2obj(xproxy.zinv_info, 'id');
                        info = zn_arr[view.data.zinv_id];
                    }
                    else {
                        info = this.data.zinv_info;
                    }
                    xproxy.send_zn_info = info;
                    param = {
                        "name": mx.XQSendGiftView.S_NAME,
                        "param": {
                            "data": info
                        }
                    };
                    break;
                default:
                    msg = mx.MX_NOTICE.CS_GET_DATA;
                    switch (e.currentTarget) {
                        case this.hunpei_t:
                            if (data.hun_id) {
                                param = {
                                    "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": data.hun_id,
                                };
                            }
                            break;
                    }
                    break;
            }
            facade.sendNotification(msg, param);
            e.stopPropagation();
        };
        XqMenItemRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            this.full_g.visible = this.empty_g.visible = this.suo_g.visible = false;
            this.ybao.visible = false;
            var type = this.xproxy.cur_type;
            if (data.suo) {
                this.suo_g.visible = true;
                this.bg.source = type == 1 ? "tqlist_png" : "zngxlbiao_png";
                this.mc_bg.visible = type == 1;
                // 6-8等级  12-14元宝 9-11vip
                var str = "";
                var need = void 0;
                if (data.idx <= 11) {
                    str = mx.Lang.xq025;
                    need = (data.idx < 9 ? "LV." : "VIP") + data.need;
                }
                else {
                    str = mx.Lang.fz052;
                    switch (data.idx) {
                        case 12:
                            need = 100;
                            break;
                        case 13:
                            need = 300;
                            break;
                        case 14:
                            need = 500;
                            break;
                    }
                    this.ybao.visible = false;
                }
                this.suo_t.text = mx.Tools.format(str, need);
                return;
            }
            if (data.empty) {
                this.bg.source = type == 1 ? "tqlist_png" : "zngxlbiao_png";
                this.empty_g.visible = true;
                this.mc.visible = type == 1;
                this.mc.source = "fzxqmche_png";
                this.xz_btn.set_ssres(type == 1 ? "xzfzanniu_png" : "xzznv_png");
                this.xz_btn.right = 20;
                this.cishu_t.textFlow = [
                    { "text": "剩余次数：", "style": { "textColor": 0xa07d7a, "bold": true } },
                    { "text": (3 - Number(data.cishu)) + "/3", "style": { "textColor": 0x7ea45d, "bold": true } }
                ];
                if (Number(data.cishu) >= 3) {
                    this.ts.source = type == 1 ? "cjxzztshi_png" : "";
                    this.mc.source = type == 1 ? "fzxqmchui_png" : "";
                    this.bg.source = type == 1 ? "tqlist_png" : "xzzgdian_png";
                    this.cishu_t.text = "";
                    this.xz_btn.visible = false;
                }
                return;
            }
            /*----------公有部分------------*/
            this.full_g.visible = true;
            this.public_text();
            /*--------------妃子省亲---------------*/
            //准备
            view.send_gift_btn.visible = type == 2;
            //送礼按钮隐藏 省亲按钮位置调整
            view.go1_btn.right = type == 1 ? 24 : 24;
            view.go1_btn.top = type == 1 ? 58 : 35;
            if (data.prepare) {
                //显示回宫妃子头像+马车内背景图
                view.bg.source = type == 1 ? "fzxqmcslbiao_png" : "zngxlbiao_png";
                view.go1_btn.set_ssres(type == 1 ? "hjxqin_png" : "yqhjia_png");
            }
            else if (type == 1) {
                //显示省亲中妃子头像+回家背景图
                view.bg.source = "fzxqzlbiao_png";
            }
            else if (type == 2) {
                view.bg.source = "zngxlbiao_png";
            }
            //省亲中
            if (data.time > 0) {
                if (!this._timer) {
                    this._timer = new egret.Timer(1000);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                    this._timer.start();
                }
                this.time_t.text = mx.Tools.format_second(data.time);
                this.time_t.right = type == 1 ? 12 : 16;
                this.time_t.top = type == 1 ? 41 : 21;
                view.go1_btn.top = type == 1 ? 95 : 43;
                view.send_gift_btn.top = 113;
                view.go1_btn.set_ssres(type == 1 ? "xqzhong_png" : "gxzhong_png");
            }
            else if (data.time <= 0) {
                view.time_t.text = "";
                view.go1_btn.set_ssres(type == 1 ? "fhgzhong_png" : "hqlwu_png");
                if (type == 1) {
                    view.go1_btn.right = 20;
                }
            }
        };
        //公有资源变化
        XqMenItemRender.prototype.public_text = function () {
            var view = this;
            var type = this.xproxy.cur_type;
            var data;
            var name;
            //  //console.log(this.data)
            if (type == 1) {
                data = this.proxy.get_curr_mn(view.data.y_id);
                name = data.name;
            }
            else {
                data = this.data.zinv_info;
                //    //console.log(data)
                if (typeof data.xing == 'undefined') {
                    name = data.name;
                }
                else {
                    name = data.xing + data.name;
                }
            }
            view.man_tx.mask = new egret.Rectangle(0, 0, 480, 470);
            var src = "";
            var mid = Number(data.mid);
            src = mx.Tools.get_zn_res(data.avatar, "tx");
            view.man_tx.source = src;
            if (1) {
                view.man_tx.scaleX = view.man_tx.scaleY = 0.90;
                view.man_tx.bottom = 17;
                view.man_tx.left = 10;
            }
            if (data.hunpei) {
                view.hunpei_t.textFlow = [
                    { "text": mx.Lang.hpei + '：', "style": { "textColor": 0xa07d7a, "bold": true } },
                    { "text": data.hunpei, "style": { "textColor": 0xff4b4b, "bold": true } }
                ];
                view.name_t.top = 10;
                view.hunpei_t.top = 46;
                view.get_t.top = 76;
                view.item_scro.top = 76;
                view.time_t.top = 10;
                view.state_t.top = 44;
                view.state_t.right = 20;
                view.tagbg_p.top = 9;
                view.weifen_t.top = 16;
                view.send_gift_btn.top = 113;
            }
            //姓名
            view.name_t.text = name;
            view.name_t.textColor = mx.Tools.num2color(data.meili);
            //位分
            var weifen = type == 1 ? data.weifen : data.weifen2;
            if (type == 2 && typeof data.weifen2 == 'undefined') {
                weifen = data.weifen;
            }
            if (weifen) {
                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, 'id', weifen);
                view.weifen_t.text = "" + (parseInt(data.sex) == 1 ? info.weifeng : info.weifenb) + "";
            }
            else {
                view.weifen_t.text = "" + mx.Lang.wu + "";
            }
            //可获得物品
            var awards = mx.ApiTool.getAPINodes(mx.MX_APINAME.HOMEAWARD, 'type', type, 'g_id', weifen);
            //let awards = [{"type" : 1 ,"item_id" : 0 , "num" : 50}];
            var a_arr = [];
            var temp_arr = [];
            for (var i in awards) {
                var unit = awards[i];
                if (temp_arr.indexOf(unit.item) == -1) {
                    a_arr.push({
                        "type": 4,
                        "id": unit.item,
                        "di": true,
                        "chicun": 80,
                    });
                    temp_arr.push(unit.item);
                }
            }
            view.item_list.itemRenderer = mx.GenTipRender;
            view.item_list.dataProvider = new eui.ArrayCollection(a_arr);
            //状态
            var arr = [];
            var status = String(data.status).split("|");
            if (status.length == 1) {
                if (Number(data.status) == 0) {
                    view.state_t.text = "";
                    return;
                }
                arr.push({
                    "text": mx.Tools.status_to_str(Number(data.status), "xq"),
                    "style": { "textColor": mx.Tools.num2color(Number(data.status), true) }
                });
            }
            else {
                var temp = ["2", "3", "4", "1"]; //孕病
                for (var k in temp) {
                    if (status.indexOf(temp[k]) >= 0) {
                        arr.push({
                            "text": mx.Tools.status_to_str(Number(temp[k]), "xq"),
                            "style": { "textColor": mx.Tools.num2color(temp[k], true) }
                        });
                        arr.push({
                            "text": " / ",
                        });
                    }
                }
                arr.splice(arr.length - 1, 1);
            }
            //  view.state_t.textFlow = arr;
        };
        return XqMenItemRender;
    }(mx.BasicRender));
    mx.XqMenItemRender = XqMenItemRender;
    __reflect(XqMenItemRender.prototype, "mx.XqMenItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=XqMenItemRender.js.map
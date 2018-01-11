/**
*   @author qianjun
*   @date 2016.11.23
*   @desc 黑市数据管理
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
    var HeiShiProxy = (function (_super) {
        __extends(HeiShiProxy, _super);
        function HeiShiProxy() {
            var _this = _super.call(this, HeiShiProxy.NAME) || this;
            /*------------------黑市卖家获取自己未婚子女-----------------*/
            _this._weihun_zn = [];
            /*------------------黑市买家入口-----------------*/
            _this.paixu_guize = 0;
            _this.sxuan_guize = {
                "meili": 0,
                "xuetong": 0,
                "skill": 0
            };
            _this.init_buy_data = false;
            return _this;
        }
        Object.defineProperty(HeiShiProxy.prototype, "cur_hsb", {
            /*------------当前紫晶币数量------------*/
            get: function () {
                var dProxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                return dProxy.get_currency("zjb");
            },
            enumerable: true,
            configurable: true
        });
        HeiShiProxy.prototype.get_heishibi = function (data) {
            this.sendNotification(mx.MX_NOTICE.FRESH_HEISHI_DH);
        };
        /*------------------紫晶币兑换元宝-----------------*/
        HeiShiProxy.prototype.dh_hsb_cb = function (data) {
            if (Number(data.state)) {
                this.sendNotification(mx.MX_NOTICE.FRESH_HEISHI_DH);
                //界面随10126消息刷新
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hs0031 });
            }
        };
        Object.defineProperty(HeiShiProxy.prototype, "hs_sell_arr", {
            get: function () {
                return this._hs_sell_arr;
            },
            enumerable: true,
            configurable: true
        });
        HeiShiProxy.prototype.hs_sell_zn = function (data) {
            this._hs_sell_arr = [];
            switch (Number(data.state)) {
                case 0:
                    this._hs_sell_arr = [];
                    break;
                case 1:
                    this._hs_sell_arr = data.data;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeiShiSellScreen.S_NAME);
        };
        Object.defineProperty(HeiShiProxy.prototype, "weihun_zn", {
            get: function () {
                return this._weihun_zn;
            },
            enumerable: true,
            configurable: true
        });
        HeiShiProxy.prototype.set_weihun_zn = function () {
            this._weihun_zn = [];
        };
        HeiShiProxy.prototype.hs_weihun_zn = function (data) {
            this._weihun_zn = [];
            for (var i in data.data) {
                var unit = data.data[i];
                if (Number(unit.meili) >= 80 || mx.AppConfig.CURR_SCENE_ID == mx.ActyXXGXXiuScreen.S_NAME) {
                    this._weihun_zn.push(unit);
                }
            }
            if (this._weihun_zn.length) {
                this._weihun_zn.sort(function (a, b) {
                    return Number(b.meili) - Number(a.meili);
                });
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HeiShiSelectView.S_NAME });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hs0007 });
            }
        };
        HeiShiProxy.prototype.get_page_data = function (page, arr_ziduan, num) {
            var arr = this[arr_ziduan];
            var page_data = [];
            if (page) {
                for (var i = (page - 1) * num; i < page * num; ++i) {
                    if (arr[i]) {
                        //feizi[i].id = i;
                        if (arr_ziduan == '_weihun_zn') {
                            arr[i].weifen = arr[i].fenghao;
                            arr[i].dibg = "wfdchen_png";
                        }
                        page_data.push(arr[i]);
                    }
                }
            }
            else {
                page_data = arr;
            }
            //1为二代妃 2为美男
            return page_data;
        };
        /*------------------黑市卖家挂上自己的子女-----------------*/
        HeiShiProxy.prototype.hs_gua_zn = function (data) {
            var str = "";
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.hs0009;
                    break;
                case 2:
                    str = mx.Lang.hs0009;
                    break;
                case 3:
                    str = mx.Lang.hs0010;
                    break;
                case 4:
                    str = mx.Lang.hs0011;
                    break;
                case 5:
                    str = mx.Lang.hs0012;
                    break;
                case 6:
                    str = mx.Lang.hs0013;
                    break;
                case 7:
                    //成功
                    str = mx.Lang.hzs31;
                    //魅力档次定保护费 保底价格
                    var unit = void 0;
                    if (this._weihun_zn.length) {
                        for (var i in this._weihun_zn) {
                            if (Number(this._weihun_zn[i].id) == Number(data.zinv_id)) {
                                unit = this._weihun_zn[i];
                                break;
                            }
                        }
                    }
                    else {
                        unit = this._jump_zinv_info;
                        //this.sendNotification(MX_NOTICE.SET_HZ_DATA, {id : unit.id, hei_res : 172800});
                    }
                    this._hs_sell_arr.push({
                        "id": unit.id,
                        "meili": unit.meili,
                        "avatar": unit.avatar,
                        "xing": unit.xing,
                        "name": unit.name,
                        "skill": unit.skill,
                        "daishu": unit.daishu,
                        "wenhua": unit.wenhua,
                        "res_time": 172800,
                        "jiage": data.price,
                        "zhuangtai": unit.zhuangtai,
                        "fenghao": unit.fenghao,
                        "sb_level": unit.sb_level,
                        "sex": unit.sex,
                    });
                    this.sendNotification(mx.MX_NOTICE.FRESH_SELL_SCREEN, "add");
                    break;
                case 8:
                    str = mx.Lang.hs0014;
                    break;
                case 9:
                    str = mx.Lang.hs0015;
                    break;
                case 10://红颜薄命
                    str = mx.Lang.hs0033;
                    break;
                case 12:
                    str = mx.Lang.hs0036;
                    break;
                case 11:
                    str = mx.Lang.hzs85;
                    break;
            }
            if (str != "") {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        /*------------------黑市卖家取消子女寻缘-----------------*/
        HeiShiProxy.prototype.hs_xy_end = function (data) {
            var str = "";
            switch (Number(data.state)) {
                case 0:
                    str = mx.Lang.hs0020;
                    break;
                case 1:
                    str = mx.Lang.hs0017;
                    if (this._hs_sell_arr.length) {
                        var index = -1;
                        for (var i in this._hs_sell_arr) {
                            if (Number(this._hs_sell_arr[i].id) == Number(data.zinv_id)) {
                                index = Number(i);
                                break;
                            }
                        }
                        this._hs_sell_arr.splice(index, 1);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_SELL_SCREEN);
                    break;
            }
            if (str != "") {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        Object.defineProperty(HeiShiProxy.prototype, "hs_buy_arr", {
            get: function () {
                return this._hs_buy_arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeiShiProxy.prototype, "buy_page", {
            get: function () {
                return this._buy_page;
            },
            enumerable: true,
            configurable: true
        });
        HeiShiProxy.prototype.hs_buy_data = function (data) {
            switch (Number(data.state)) {
                case 0:
                    this._hs_buy_arr = [];
                    break;
                case 1:
                    this._hs_buy_arr = data.data;
                    this._buy_page = {
                        "cur_page": Number(data.page_id),
                        "total_page": Math.ceil(Number(data.total) / 4)
                    };
                    break;
            }
            if (this.init_buy_data) {
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeiShiBuyScreen.S_NAME);
                this.init_buy_data = false;
            }
            else {
                this.sendNotification(mx.MX_NOTICE.FRESH_HEISHI_BUY_SCREEN);
            }
        };
        HeiShiProxy.prototype.hs_buy_zn = function (data) {
            var str = "";
            switch (Number(data.state)) {
                case 0://已经被人买走了
                    str = mx.Lang.hs0020;
                    break;
                case 1:
                    str = mx.Lang.err01;
                    break;
                case 2://子女不是未婚成年状态
                    str = mx.Lang.hs0021;
                    break;
                case 3://自己的孩子不能下聘
                    str = mx.Lang.hs0022;
                    break;
                case 4://后宫人数已达上限
                    str = mx.Lang.hs0023;
                    break;
                case 5://紫晶币不足
                    //str = Lang.hs0003;
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                        "sdata_ok": { "name": mx.ShopAlert.S_NAME, "param": 1 },
                        "param": mx.Lang.hs0003
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 6:
                    //成功
                    str = mx.Lang.hs0024;
                    data.feizi.status = 0;
                    data.feizi.haizi = 0;
                    this.sendNotification(mx.MX_NOTICE.YXD_ADD_MN, data.feizi);
                    //刷新
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_BUY_DATA,
                        'page_id': 1
                    });
                    //子女简介更新下按钮
                    this.sendNotification(mx.MX_NOTICE.HS_ZN_JIANJIE_FRSH, data.feizi);
                    break;
            }
            if (str != "") {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        Object.defineProperty(HeiShiProxy.prototype, "jump_zinv_info", {
            get: function () {
                return this._jump_zinv_info;
            },
            enumerable: true,
            configurable: true
        });
        HeiShiProxy.prototype.set_jump_zinv = function (data) {
            this._jump_zinv_info = null;
            this._jump_zinv_info = data;
        };
        HeiShiProxy.NAME = "HeiShiProxy";
        return HeiShiProxy;
    }(puremvc.Proxy));
    mx.HeiShiProxy = HeiShiProxy;
    __reflect(HeiShiProxy.prototype, "mx.HeiShiProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiProxy.js.map
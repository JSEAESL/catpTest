/**
 *   @author wf
 *   @date 2016.11.29
 *   @desc 好友主界面
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
    var FriendScreen = (function (_super) {
        __extends(FriendScreen, _super);
        function FriendScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.can_tj = true;
            _this.typename = ["", "hylbzi", "hysqing"]; //tab按钮组：结缘亲家，仇人，好友列表，好友申请
            _this.c_type = [1, 2, 5]; //类型按钮组
            _this.ftype = 1; //列表类型
            _this.pre_type = 2; //上一个列表类型
            _this.pagenum = 4; //每页显示条目数量
            _this.isTx = false; //從調戲跳轉來
            _this.isSelsct = false; //皇子所跳轉來
            return _this;
        }
        FriendScreen.mx_support = function () {
            return ["assets.friend", "api.QINMI", "api.JINJI", "api.HEROHOUGONG", "data.2905", "data.2601", "data.2608", "data.1301"];
        };
        FriendScreen.prototype.init_view = function () {
            var view = this;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.AppConfig.MXTag.indexOf("h5") > -1) {
                this.typename[0] = "qqhyou";
            }
            else if (mx.AppConfig.MXTag.indexOf("wx") > -1) {
                this.typename[0] = "wxhyou";
            }
            else {
                this.typename[0] = "qqhyou"; //默认
            }
            if (mx.AppConfig.PREV_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                this.isSelsct = true;
                this.typename = ["lyqjzi", "", "hylbzi", ""]; //tab按钮组：结缘亲家，好友列表
                this.ftype = 2;
            }
            this.fresh_tab();
            view.tab_list.selectedIndex = 0;
            if (this.isSelsct) {
                view.tab_list.selectedIndex = 1;
                view.tab_list.horizontalCenter = -160;
            }
            this.isTx = mx.AppConfig.PREV_SCENE_ID == mx.TiaoXiScreen.S_NAME;
            if (this.isTx) {
                this.ftype = 3;
                //view.tjian_b.visible = false;
            }
            if (mx.AppConfig.PREV_SCENE_ID == mx.OtherScreen.S_NAME) {
                if (fproxy.currtype != 3) {
                    view.tab_list.selectedIndex = this.c_type.indexOf(fproxy.currtype);
                }
                else {
                    view.tab_list.selectedIndex = 1;
                }
                this.ftype = fproxy.currtype;
                if (fproxy['list' + this.ftype][fproxy['page' + this.ftype]]) {
                    this.update_list();
                }
                else {
                    var currpage = fproxy['page' + this.ftype];
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FRIEND_DATA,
                        "type": this.ftype,
                        "page": currpage,
                        "skip": true
                    });
                }
            }
            else {
                this.update_list();
            }
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.f_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.search_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fresh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tjian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yjbf_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yjlq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.registerMediator(new mx.FriendScreenMediator(this));
        };
        Object.defineProperty(FriendScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.FriendProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FriendScreen.prototype.fresh_tab = function () {
            var view = this;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            var item_arr = [];
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            for (var k in this.typename) {
                var tishi = false;
                var type = this.c_type[k];
                switch (type) {
                    case 1:
                        //tishi = fproxy.shouli_flag[1];
                        break;
                    case 2:
                        tishi = fproxy.shouli_flag[0];
                        break;
                    case 4:
                        tishi = false;
                        break;
                    case 5:
                        tishi = fproxy.list5[1] && fproxy.list5[1][0];
                        gproxy.tishi_data.f_apply = tishi;
                        tishi = false;
                        break;
                }
                if (this.typename[k] != "") {
                    item_arr.push({
                        "type": type,
                        "word": this.typename[k] + '_png',
                        "word2": this.typename[k] + '2_png',
                        "tishi": tishi
                    });
                }
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
        };
        FriendScreen.prototype.update_list = function () {
            var view = this;
            var fproxy = this.proxy;
            var type = this.ftype;
            var facade = mx.ApplicationFacade.getInstance();
            if (fproxy.tw_list) {
                fproxy.total1 = fproxy.tw_list.length;
            }
            else {
                fproxy.total1 = 0;
            }
            this.yjlq_b.horizontalCenter = -175;
            if (type != 3) {
                view.page_t.text = fproxy['page' + type] + '/' + Math.ceil(fproxy['total' + type] / this.pagenum);
                view.page_g.visible = fproxy['total' + type] > 0;
                if (fproxy['total' + type] <= 0 && type != 1) {
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME,
                        "param": { "shijian": { 'msg_id': 104 + type } }
                    });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
                }
                switch (type) {
                    case 1://亲家
                        this.yjlq_b.horizontalCenter = 0;
                        this.yjlq_b.set_ssres(fproxy.shouli_flag[1] ? "yjlqu_png" : "yjlqhui_png");
                        this.yjlq_b.set_tsres(fproxy.shouli_flag[1] ? "tishi_png" : null, { "right": -10, "top": -10 });
                        // this.yjbf_b.set_ssres(fproxy.baifang1 ? "yjbfang_png" : "yjbfhui_png");
                        this.yjbf_b.visible = false;
                        view.f_scro.top = 255;
                        break;
                    case 2://好友
                        this.yjlq_b.visible = this.yjbf_b.visible = true;
                        this.yjlq_b.set_ssres(fproxy.shouli_flag[0] ? "yjlqu_png" : "yjlqhui_png");
                        this.yjlq_b.set_tsres(fproxy.shouli_flag[0] ? "tishi_png" : null, { "right": -10, "top": -10 });
                        this.yjbf_b.set_ssres(fproxy.baifang2 ? "yjbfang_png" : "yjbfhui_png");
                        view.f_scro.top = 225;
                        break;
                    default:
                        view.f_scro.top = 230;
                        break;
                }
            }
            else {
                view.page_g.visible = false;
                view.f_scro.top = 105;
            }
            view.sqnumbg.visible = view.sqnum_t.visible = fproxy.total5 > 0;
            view.sqnum_t.text = Math.min(99, fproxy.total5) + '';
            if (this.adata && this.adata == "select") {
                view.sqnumbg.visible = view.sqnum_t.visible = false;
            }
            view.search_b.visible = view.tjian_b.visible = type == 5;
            view.fresh_b.visible = type == 3;
            view.bottom_g.visible = view.tab_g.visible = type != 3;
            view.title.source = type != 3 ? 'twsjiao_png' : 'tjhybti_png';
            view.f_scro.bottom = type != 3 ? 195 : 150;
            view.yj_g.visible = type == 1 || type == 2;
            var src = fproxy['list' + type][fproxy['page' + type]];
            var arr = [];
            for (var i in src) {
                if (src[i].user_id == Main.USER_ID) {
                    continue;
                }
                arr.push(src[i]);
            }
            if (type == 1 && !this.isSelsct) {
                view.f_list.itemRenderer = mx.TwFriendItemRender;
                //特殊处理
                if (!fproxy.tw_list) {
                    if (window && window["getRelation"]) {
                        window["getRelation"]();
                        return;
                    }
                    else {
                        fproxy.tw_list = [];
                        /*
                        fproxy.tw_list = [
                            {
                                "openid":"B7A5203FE9F37938FD85FD2AB4BAE966",
                                "picture":"http://q.qlogo.cn/qqapp/1106537164/8D27A27950B511D9920E20247CED74D0/"
                            },
                            {
                                "openid":"1698004F8AF65C59844AFEC29EE7AC1C",
                                "picture":"http://q.qlogo.cn/qqapp/1106537164/8D27A27950B511D9920E20247CED74D0/"
                            }
                        ]
                        fproxy.tw_list = Tools.arr2obj(fproxy.tw_list,"openid");
                        facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
                            "t": MX_NETS.CS_SDK_TWINFO,
                            "openidList": "B7A5203FE9F37938FD85FD2AB4BAE966|1698004F8AF65C59844AFEC29EE7AC1C",//lv|me
                        })
                        */
                    }
                }
                var cpage = fproxy['page' + type];
                arr = fproxy.tw_list.slice((cpage - 1) * fproxy.tw_page_size, cpage * fproxy.tw_page_size);
                if (arr.length) {
                    view.page_g.visible = true;
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
                }
                else {
                    view.page_g.visible = false;
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME,
                        "param": { "shijian": { 'msg_id': this.typename[0] == "qqhyou" ? 112 : 113 } }
                    });
                }
            }
            else {
                view.f_list.itemRenderer = mx.FriendItemRender;
            }
            view.f_list.dataProvider = new eui.ArrayCollection(arr);
            if (this.isSelsct) {
                view.f_scro.top = 230;
                view.title.source = "zdjzlyin_png";
                view.bottom_g.visible = false;
            }
        };
        FriendScreen.prototype.tab_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            this.pre_type = this.ftype;
            this.ftype = e.item ? e.item.type : e;
            this.proxy.set_curr_friend({ "type": this.ftype });
            this.update_list();
        };
        FriendScreen.prototype.list_click = function (e) {
            this.proxy.set_curr_friend({ "idx": e.itemIndex, "type": this.ftype });
        };
        FriendScreen.prototype.set_page = function (e) {
            var view = this;
            var type = this.ftype;
            var fproxy = this.proxy;
            var facade = mx.ApplicationFacade.getInstance();
            var total = Math.ceil(fproxy['total' + type] / this.pagenum);
            var page = fproxy['page' + type];
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                    newpage = 1;
                    break;
                case view.wye_b:
                    newpage = total;
                    break;
                case view.prev_b:
                    newpage = Math.max(1, page - 1);
                    break;
                case view.next_b:
                    newpage = Math.min(total, page + 1);
                    break;
            }
            if (page == newpage) {
                return;
            }
            var notice = type != 5 ? mx.MX_NETS.CS_FRIEND_DATA : mx.MX_NETS.CS_FRIEND_SQ_DATA;
            if (type == 1) {
                fproxy["page" + type] = newpage;
                facade.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
            }
            else if (fproxy['list' + type][newpage]) {
                fproxy.set_curr_page({ "page": newpage, "type": this.ftype });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": notice,
                    "type": type,
                    "page": newpage,
                    "skip": true
                });
            }
        };
        FriendScreen.prototype.btn_click = function (e) {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = this.proxy;
            switch (e.currentTarget) {
                case view.search_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendAddView.S_NAME });
                    break;
                case view.fresh_b:
                    if (this.can_tj) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_TX_FRIEND_TUIJIAN,
                            "skip": true
                        });
                        this.can_tj = false;
                        this.tjtime = egret.setTimeout(function () {
                            _this.can_tj = true;
                            egret.clearTimeout(_this.tjtime);
                        }, this, 3000);
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err02 });
                    }
                    break;
                case view.tjian_b:
                    this.tab_click(3);
                    break;
                case view.back_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
                    switch (mx.AppConfig.PREV_SCENE_ID) {
                        case mx.OtherScreen.S_NAME:
                        case mx.YXDianScreen.S_NAME:
                        case mx.PriChatScreen.S_NAME:
                            if (this.isSelsct) {
                                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                            }
                            else {
                                var p_name = FriendScreen.P_NAME;
                                if (p_name) {
                                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                                    FriendScreen.P_NAME = null;
                                }
                                else {
                                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                                }
                            }
                            break;
                        default:
                            if (this.ftype == 3 && !this.isTx) {
                                this.tab_click(this.pre_type);
                                return;
                            }
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.AppConfig.PREV_SCENE_ID);
                            break;
                    }
                    var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
                    wproxy.setTx(false);
                    fproxy.tw_list = null;
                    break;
                case view.yjbf_b:
                    if (view.yjbf_b.res_name == "yjbfhui_png") {
                        if (fproxy['total' + this.ftype]) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hy042, mx.Lang.hy047[2 - this.ftype]) });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hy048, mx.Lang.hy047[2 - this.ftype]) });
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FREIEND_YJBAIF,
                            "type": this.ftype == 2 ? 1 : 2
                        });
                    }
                    break;
                case view.yjlq_b:
                    if (view.yjlq_b.res_name == "yjlqhui_png") {
                        if (fproxy['total' + this.ftype]) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hy041, mx.Lang.hy047[2 - this.ftype]) });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hy048, mx.Lang.hy047[2 - this.ftype]) });
                        }
                    }
                    else {
                        if (this.ftype == 1) {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SDK_TWYJ,
                            });
                        }
                        else {
                            var dproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
                            if (500 - dproxy.get_currency("tili") < fproxy.slmax - fproxy["shouli" + this.ftype]) {
                                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_CHECK_YJSL,
                                    "type": this.ftype == 2 ? 1 : 2
                                });
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_FREIEND_YJSL,
                                    "type": this.ftype == 2 ? 1 : 2
                                });
                            }
                        }
                    }
                    break;
            }
        };
        FriendScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var lproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.LueDuoProxy.NAME));
            lproxy.setLD(false);
            egret.clearTimeout(this.tjtime);
            view.f_list.dataProvider = null;
            view.tab_list.dataProvider = null;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.f_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.search_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fresh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tjian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yjbf_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yjlq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.FriendScreenMediator.NAME);
        };
        FriendScreen.S_NAME = "FriendScreen";
        return FriendScreen;
    }(mx.BasicView));
    mx.FriendScreen = FriendScreen;
    __reflect(FriendScreen.prototype, "mx.FriendScreen");
})(mx || (mx = {}));
//# sourceMappingURL=FriendScreen.js.map
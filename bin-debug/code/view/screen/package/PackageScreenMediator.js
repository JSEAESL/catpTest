/**
   @author qianjun
*   @date 2016.9.5
*   @desc 背包界面mediator
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
    var PackageScreenMediator = (function (_super) {
        __extends(PackageScreenMediator, _super);
        function PackageScreenMediator(viewComponent) {
            var _this = _super.call(this, PackageScreenMediator.NAME, viewComponent) || this;
            //1零件2图纸3合成品4魂魄5消耗品6碎片 1,2,3都属于装备，获取装备的时候，传1|2|3
            _this._type = ["5", "4", "9|10"]; //["5", "1|2|3", "4", "9|10", "6"];//类型按钮组
            _this._ctype = ["tab_xhp", "tab_hp", "tab_cl"]; //["tab_xhp", "tab_zb", "tab_hp", "tab_cl", "tab_sp"];//类型按钮组
            _this._cur_type = "";
            _this._cur_page = 1;
            _this._total_page = 1;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(PackageScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PackageScreenMediator.prototype, "packproxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PackProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        PackageScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.coin_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.tli_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sell_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.use_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.type_btn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.type_btn_list.dataProvider = null;
            view.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.item_click, this);
            view.item_list.dataProvider = null;
        };
        PackageScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.PACK_ITEMS_BACK,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        PackageScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    var ntype = notification.getType();
                    switch (ntype) {
                        case "1|2|3|6":
                            this._cur_type = "1|2|3";
                            break;
                        case "1|2|6":
                            this._cur_type = "6";
                            break;
                        default:
                            this._cur_type = ntype;
                            break;
                    }
                    this.fresh_view();
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    this.fresh_view(false);
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    this.fresh_huobi();
                    break;
                default:
                    break;
            }
        };
        PackageScreenMediator.prototype.init_view = function () {
            var view = this.view;
            //初始化货币
            this.fresh_huobi();
            //初始化类型按钮组
            var item_arr = [];
            for (var k in this._type) {
                var type = this._type[k];
                item_arr.push({
                    "up": this._ctype[k] + "0_png",
                    "down": this._ctype[k] + "1_png",
                    "type": type,
                });
            }
            view.type_btn_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.type_btn_list.selectedIndex = 0;
            view.type_btn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this._cur_type = this._type[0];
            view.item_list.itemRenderer = mx.GeneralSltRender;
            view.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.item_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sell_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.use_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.coin_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.tli_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_view();
        };
        /*---------游戏货币显示--------*/
        PackageScreenMediator.prototype.fresh_huobi = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            // view.tli_t.text = dproxy.get_currency("tili") + "/" + (60 + gProxy.user_lv);
            view.coin_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
        };
        /*---------类型按钮切换--------*/
        PackageScreenMediator.prototype.type_click = function (e) {
            var c_n = e.item.type;
            if (this._cur_type == c_n) {
                return;
            }
            this._cur_type = c_n;
            this._cur_page = 1;
            var view = this.view;
            var str = "";
            var ctype = c_n;
            switch (c_n) {
                case "5":
                    str = "syong_png";
                    break;
                case "4":
                case "7":
                case "9|10":
                    str = "xqaniu_png";
                    break;
                case "6":
                    str = "hcheng_png";
                    ctype = "1|2|6";
                    break;
                case "1|2|3"://额外获取碎片
                    str = "xqaniu_png";
                    ctype = "1|2|3|6";
                    break;
            }
            view.use_b.set_ssres(str);
            this.packproxy.check_pack_type_item(ctype, "packtab");
        };
        /*------界面刷新，包括类型按钮，翻页按钮----*/
        PackageScreenMediator.prototype.fresh_view = function (tab) {
            if (tab === void 0) { tab = true; }
            var data = this.packproxy.get_pack_type_item(this._cur_type);
            var view = this.view;
            var list = view.item_list;
            if (!(data && data.length)) {
                list.dataProvider = null;
                view.page_g.visible = false;
                view.bottom_g.visible = false;
                //1零件2图纸3合成品4魂魄5消耗品6碎片 1,2,3都属于装备，获取装备的时候，传1|2|3
                var str = void 0, tx = "";
                switch (this._cur_type) {
                    case "5":
                        str = mx.Lang.p0084;
                        tx = "xiao";
                        break;
                    case "1|2|3":
                        str = mx.Lang.p0085;
                        tx = "pu";
                        break;
                    case "4":
                        str = mx.Lang.p0086;
                        tx = "tshi";
                        break;
                    case "9|10":
                        str = mx.Lang.p0087;
                        tx = "xiao";
                        break;
                    case "6":
                        str = mx.Lang.p0088;
                        tx = "tshi";
                        break;
                }
                if (view.no_tip) {
                    view.removeChildAt(view.numChildren - 1);
                    view.no_tip = null;
                }
                view.no_tip = new mx.EmptyTip({
                    "xdz": tx,
                    "text": str,
                });
                view.addChild(view.no_tip);
                return;
            }
            if (view.no_tip) {
                view.removeChildAt(view.numChildren - 1);
                view.no_tip = null;
            }
            view.bottom_g.visible = true;
            view.page_g.visible = true;
            //显示页数
            var page_count = 16; //固定为16个
            this._total_page = Math.ceil(data.length / page_count);
            this.fresh_page();
            var item_d = this.get_item_page_data(data, this._cur_page, page_count);
            item_d.forEach(function (value) {
                value.id = value.item_id;
                value.type = 4;
            });
            //初始化列表数据
            list.dataProvider = new eui.ArrayCollection(item_d);
            if (tab) {
                list.selectedIndex = 0;
                this.fresh_bottom_data(item_d[0]);
            }
            else {
                var pre_d = view.bottom_item.data; //上次的物品
                var s_d = list.selectedItem;
                if (s_d) {
                    if (pre_d.id == s_d.id) {
                        this.fresh_bottom_data(s_d);
                    }
                    else {
                        list.selectedIndex = 0;
                        this.fresh_bottom_data(item_d[0]);
                    }
                }
                else {
                    list.selectedIndex = 0;
                    this.fresh_bottom_data(item_d[0]);
                }
            }
        };
        //单页截取长度处理
        PackageScreenMediator.prototype.get_item_page_data = function (data, page, page_count) {
            return data.slice((page - 1) * page_count, page * page_count);
        };
        /*----------显示页数-------*/
        PackageScreenMediator.prototype.fresh_page = function () {
            var view = this.view;
            var cur = this._cur_page;
            var total = this._total_page;
            if (cur > total) {
                this._cur_page = total;
            }
            else if (cur < 1) {
                this._cur_page = 1;
            }
            view.page_t.text = this._cur_page + "/" + this._total_page;
        };
        PackageScreenMediator.prototype.fresh_bottom_data = function (data) {
            var view = this.view;
            //获取物品信息
            view.bottom_item.data = data;
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", data.item_id);
            view.desc_t.textFlow = [
                { text: item.name + "\n", style: { "size": 24, "textColor": 0x8b3536 } },
                { text: item.Description, style: { "size": 21, "textColor": 0x9b6d6e } },
            ];
            view.sell_b.visible = true;
            view.coin_icon.visible = true;
            if (parseInt(item.Sellprice) > 0) {
                view.price_t.text = mx.Tools.format(mx.Lang.p0050, item.Sellprice);
                view.coin_icon.left = view.price_t.left + view.price_t.width + 2;
            }
            else {
                view.price_t.text = mx.Lang.p0090;
                view.sell_b.visible = false;
                view.coin_icon.visible = false;
            }
            view.use_b.visible = true;
            if (this._cur_type == this._type[0]) {
                if (!parseInt(item.Exp) && !parseInt(item.Vitality)) {
                    var libao = mx.ApiTool.getAPINode(mx.MX_APINAME.ITEMAWARDS, "item", data.item_id);
                    if (!libao) {
                        view.use_b.visible = false;
                    }
                }
            }
        };
        PackageScreenMediator.prototype.item_click = function (e) {
            var view = this.view;
            this.fresh_bottom_data(e.item);
        };
        PackageScreenMediator.prototype.show_use = function (d) {
            var t = this._type;
            switch (this._cur_type) {
                case t[0]://消耗品
                    var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", d.item_id);
                    var libao = mx.ApiTool.getAPINode(mx.MX_APINAME.ITEMAWARDS, "item", d.item_id);
                    //礼包特殊物品
                    if (libao) {
                        if (libao.type == 1) {
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.PackUseItemView.S_NAME,
                                "param": {
                                    "item_id": d.item_id,
                                    "has": parseInt(d.num),
                                    "style": "uselb",
                                }
                            });
                        }
                        else if (libao.type == 2) {
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.GiftAlert.S_NAME,
                                "param": d.item_id
                            });
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_PACK_LIBAO_USE,
                                "num": 1,
                                "item_id": d.item_id,
                            });
                        }
                    }
                    else if (parseInt(item.Exp) > 0) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.ExpSelectHeroPop.S_NAME,
                            "param": {
                                "item_id": d.item_id,
                                "has": parseInt(d.num),
                            }
                        });
                    }
                    else if (parseInt(item.Vitality) > 0) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.PackUseItemView.S_NAME,
                            "param": {
                                "item_id": d.item_id,
                                "has": parseInt(d.num),
                                "style": "use",
                            }
                        });
                    }
                    break;
                case t[1]://装备详情弹窗                            
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.EquipInfoPop.S_NAME,
                        "param": {
                            "item_id": d.item_id,
                        }
                    });
                    break;
                case t[2]://魂魄
                    var fproxy = (this.facade.retrieveProxy(mx.FubenProxy.NAME));
                    fproxy.set_sd_tar_info(d.item_id);
                    break;
                case t[3]://材料
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.GetWayView.S_NAME,
                        "param": {
                            "item_id": d.item_id,
                            "style": "cailiao",
                        }
                    });
                    break;
                case t[4]://碎片合成弹窗                            
                    this.packproxy.equip_hecheng_scene = "PackageScreen";
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.SuipianHechengPop.S_NAME,
                        "param": {
                            "suipian_id": d.item_id,
                            "has": parseInt(d.num),
                        }
                    });
                    break;
                default:
                    break;
            }
        };
        PackageScreenMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var d = view.bottom_item.data;
            switch (evt.currentTarget) {
                case view.back_b:
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
                case view.use_b:
                    this.show_use(d);
                    break;
                case view.sell_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.PackSellItemView.S_NAME,
                        "param": {
                            "item_id": d.item_id,
                            "has": parseInt(d.num),
                            "style": "sell",
                        }
                    });
                    break;
                case view.coin_add_b:
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
                /*case view.tli_add_b:
                    this.sendNotification(MX_NOTICE.SHOW_BUY_TILI, "tili");
                    break;*/
                case view.prev_b:
                    if (this._cur_page > 1) {
                        --this._cur_page;
                        this.fresh_view();
                    }
                    break;
                case view.next_b:
                    if (this._cur_page < this._total_page) {
                        ++this._cur_page;
                        this.fresh_view();
                    }
                    break;
                default:
                    break;
            }
        };
        PackageScreenMediator.NAME = "PackageScreenMediator";
        return PackageScreenMediator;
    }(puremvc.Mediator));
    mx.PackageScreenMediator = PackageScreenMediator;
    __reflect(PackageScreenMediator.prototype, "mx.PackageScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PackageScreenMediator.js.map
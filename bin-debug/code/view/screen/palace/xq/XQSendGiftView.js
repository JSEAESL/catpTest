/**
 *   @author qianjun wf
 *   @date 2016.8.29
 *   @desc 赠送礼物弹窗
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
    var XQSendGiftView = (function (_super) {
        __extends(XQSendGiftView, _super);
        function XQSendGiftView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.use_syd = false;
            return _this;
        }
        XQSendGiftView.mx_support = function () {
            return ["assets.palace_yxdsc", "api.EQUIP"];
        };
        XQSendGiftView.prototype.set_skinname = function () {
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["YXDGiftScreenSkin"];
            }
            else {
                this.skinName = RES.getRes("YXDGiftScreenSkin_exml");
            }
        };
        XQSendGiftView.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            this.ybao_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            this.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_currency();
            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
            var arr = [];
            var base = [
                { "id": 2018, "color": 0x57acfc, 'notsell': false },
                { "id": 2026, "color": 0xff64b1 },
                { "id": 2027, "color": 0xff64b1 },
                { "id": 2028, "color": 0xff64b1 },
                { "id": 2001, "color": 0x64c66b },
                { "id": 2006, "color": 0xfaa013 },
                { "id": 2003, "color": 0xdd59f5 },
                { "id": 2002, "color": 0xff2e18 },
                { "id": 2023, "color": 0xff64b1, 'notsell': false },
            ];
            for (var k in base) {
                var c_d = base[k];
                var cid = c_d.id;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', cid);
                arr.push({
                    "cid": cid,
                    "item": "item" + cid + "_png",
                    "num": pproxy.get_item_num(cid),
                    "price": api.Buyprice2 || mx.Lang.wu,
                    "name": api.name,
                    "ncolor": 0xffffff,
                    "desc": api.Description,
                    "notsell": typeof c_d.notsell != 'undefined'
                });
            }
            this.item_data = new eui.ArrayCollection(arr);
            this.item_list.dataProvider = this.item_data;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XQSendGiftViewMediator(this));
        };
        XQSendGiftView.prototype.fresh_currency = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            view.ybao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
        };
        XQSendGiftView.prototype.fresh_view = function (data) {
            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME);
            var c_d = this.item_data.source;
            for (var k in c_d) {
                var cd = c_d[k];
                if (cd.cid == data) {
                    var new_n = pproxy.get_item_num(data);
                    if (new_n < cd.num) {
                        switch (data) {
                            case "2018":
                                this.use_syd = true;
                                break;
                        }
                    }
                    cd.num = new_n;
                }
            }
        };
        XQSendGiftView.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var item = e.item;
            if (item.num) {
                var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                var c_mn = this.adata.data;
                var status_1 = c_mn.status;
                status_1 = String(status_1).split("|");
                var yun_arr = ["2", "3", "4"]; //是否怀孕
                var huiyun = false;
                for (var m in yun_arr) {
                    if (status_1.indexOf(yun_arr[m]) >= 0) {
                        huiyun = true;
                        break;
                    }
                }
                switch (item.cid) {
                    case 2001://甘露丸
                        if (status_1.indexOf("1") < 0 && Number(c_mn.sb_level) == 0) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": "scdj",
                                    "cd": {
                                        "mn": c_mn,
                                        "sctype": "fz_sb",
                                        "item_id": item.cid //物品id
                                    }
                                }
                            });
                            return;
                        }
                        break;
                    case 2018://速孕仙丹
                        if (c_mn.hunpei == '') {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs54 });
                            return;
                        }
                        break;
                }
                //"{0}是{1}，确定要将它赐给{2}吗？"
                var str = mx.Tools.format(mx.Lang.sc000, item.name, item.desc, c_mn.name);
                var param = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_FZ_SCDJ,
                            "id": 0,
                            "item_id": item.cid,
                            "zinv_id": c_mn.id
                        },
                        "param": str,
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, param);
            }
            else {
                if (item.cid == 2018 || item.cid == 2023) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sc009 });
                }
                else {
                    var a_d = {
                        "param": {
                            "num": 1,
                            "item": item.cid,
                        }
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.BuyAlertView.S_NAME,
                        "param": a_d
                    });
                }
            }
        };
        XQSendGiftView.prototype.close_self = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XQSendGiftView.S_NAME);
        };
        XQSendGiftView.prototype.buy_yb = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
        };
        XQSendGiftView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            this.ybao_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            this.item_list.dataProvider = null;
            this.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.XQSendGiftViewMediator.NAME);
        };
        XQSendGiftView.S_NAME = "XQSendGiftView";
        return XQSendGiftView;
    }(mx.BasicView));
    mx.XQSendGiftView = XQSendGiftView;
    __reflect(XQSendGiftView.prototype, "mx.XQSendGiftView");
})(mx || (mx = {}));
//# sourceMappingURL=XQSendGiftView.js.map
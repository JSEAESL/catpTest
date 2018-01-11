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
 * @qianjun 2017-7-4
 * 2016.9.6
 *  红包alert
 */
var mx;
(function (mx) {
    var HongbaoJiluView = (function (_super) {
        __extends(HongbaoJiluView, _super);
        function HongbaoJiluView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HongbaoJiluView.mx_support = function () {
            return ["assets.hbjlu"];
        };
        Object.defineProperty(HongbaoJiluView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return facade.retrieveProxy(mx.GameProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        HongbaoJiluView.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.HongbaoJiluViewMediator(this));
            this.gproxy.hb_flag = true;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.type_list.selectedIndex = 0;
            view.cur_type = 1;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.item_list.itemRenderer = mx.HongbaojiluRender;
            view.empty_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.charge, this);
            this.show_list();
        };
        HongbaoJiluView.prototype.charge = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
        };
        HongbaoJiluView.prototype.show_list = function () {
            var view = this;
            var type = Number(view.cur_type);
            var arr = [];
            var data = [];
            if (type == 1) {
                //收到的
                data = this.gproxy.rec_hb;
                for (var i in data) {
                    arr.push({
                        "type": type,
                        "num": data[i].diamond,
                        "time": data[i].time,
                        "name": "微信" + data[i].sender_area + "区   " + data[i].sender_name,
                        "sign": Number(data[i].sign),
                        "state": 0,
                        "send_id": data[i].sender_id
                    });
                }
            }
            else {
                //发出的
                data = this.gproxy.send_hb;
                for (var i in data) {
                    arr.push({
                        "type": type,
                        "num": data[i].total,
                        "time": data[i].time,
                        "id": data[i].id
                    });
                }
            }
            if (arr.length) {
                view.empty_g.visible = false;
                view.item_list.dataProvider = new eui.ArrayCollection(arr);
            }
            else {
                view.item_list.dataProvider = null;
                view.empty_g.visible = type == 2;
                view.empty_t.textFlow = [{ "text": "获得分享的红包", "style": { "underline": true } }];
            }
        };
        HongbaoJiluView.prototype.type_click = function (e) {
            if (this.cur_type == e.item.type) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            this.cur_type = e.item.type;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": this.cur_type == 1 ? mx.MX_NETS.CS_HONGBAO_RECINFO : mx.MX_NETS.CS_HONGBAO_SENDINFO });
        };
        HongbaoJiluView.prototype.show_hb = function () {
            var view = this;
            var item = view.item_list.selectedItem;
            var log = this.gproxy.send_hb_detail.data;
            item.log = [];
            item.total = this.gproxy.send_hb_detail.total;
            item.remain = this.gproxy.send_hb_detail.remain;
            if (log) {
                log.sort(function (a, b) {
                    return Number(b.time) - Number(a.time);
                });
                for (var i in log) {
                    item.log.push({
                        "tx": "tx78_9_png",
                        "name": "微信用户  " + (log[i].wx_name.length > 3 ? log[i].wx_name.substr(0, 3) + "..." : log[i].wx_name),
                        "time": mx.Tools.format_time(log[i].time, "nyrsf"),
                        "num": "x" + log[i].diamond,
                        "new": Number(i) == 0
                    });
                }
            }
            var obj = view.item_list.getElementAt(view.item_list.selectedIndex);
            obj.fresh_log();
        };
        HongbaoJiluView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.type_list.dataProvider = null;
            view.item_list.dataProvider = null;
            view.cur_type = 1;
            this.gproxy.hb_flag = false;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.empty_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.charge, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HongbaoJiluViewMediator.NAME);
        };
        HongbaoJiluView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HongbaoJiluView.S_NAME);
        };
        HongbaoJiluView.S_NAME = "HongbaoJiluView";
        return HongbaoJiluView;
    }(mx.BasicView));
    mx.HongbaoJiluView = HongbaoJiluView;
    __reflect(HongbaoJiluView.prototype, "mx.HongbaoJiluView");
})(mx || (mx = {}));
//# sourceMappingURL=HongbaoJiluView.js.map
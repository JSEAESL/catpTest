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
 * @cy、daiqi-2017-7-4
 * 2016.9.6
 *  签到alert
 */
var mx;
(function (mx) {
    var DailySignAlert = (function (_super) {
        __extends(DailySignAlert, _super);
        function DailySignAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DailySignAlert.mx_support = function () {
            return ["api.SIGNAWARD", "api.SIGNLEIJIAWARD", "assets.sign"];
        };
        DailySignAlert.prototype.init_view_by_type = function () {
            var view = this;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.DailySignAlertMediator(this));
            view.sign_list.itemRenderer = mx.DailySignRender;
            view.sign_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.box_list.itemRenderer = mx.SignBoxRender;
            view.box_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBoxChange, this);
            this.fresh_pop();
        };
        DailySignAlert.prototype.fresh_pop = function (data) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var sProxy = (facade.retrieveProxy(mx.SignProxy.NAME));
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.SIGNAWARD, "kind", sProxy.kind);
            //1银币2元宝3体力4item5女王经验6美男经验7英雄8技能点
            //累计签到 可补签
            var days = [5, 11, 16, 24, 31];
            days[4] = api.length;
            view.leiji_t.text = sProxy.count + "";
            view.need_t.text = '0';
            for (var i in days) {
                if (sProxy.count < days[i]) {
                    view.need_t.text = days[i] - sProxy.count + "";
                    break;
                }
            }
            var ready_flag = false; //今日是否已经签到的标志位,用于判断补签总次数
            var arr = [];
            for (var k in api) {
                var state = 0; //无、已领取、补签
                if (Number(k) <= sProxy.day - 1) {
                    if (Number(k) <= sProxy.count - 1) {
                        state = 1; //已领取
                    }
                    else if (Number(k) == sProxy.count) {
                        if (!sProxy.has_sign) {
                            state = 2; //今日签到
                            ready_flag = true;
                        }
                        else {
                            state = 3; //补签
                        }
                    }
                }
                var unit = {
                    "item": api[k],
                    "state": state,
                    "vip": mx.Tools.format(mx.Lang.bh000, api[k].vip),
                    "shangdi": Number(api[k].vip) > 0,
                    "jiangli": "x" + api[k].num,
                    "type": api[k].type
                };
                arr.push(unit);
            }
            view.sign_list.dataProvider = new eui.ArrayCollection(arr);
            /*api = [];
            api = null;
            arr = [];
            arr = null;*/
            view.buqian_t.text = (ready_flag ? (sProxy.day - sProxy.count - 1) : (sProxy.day - sProxy.count)) + "";
            //box_list
            view.box_list.width = 381;
            view.box_list.height = 153;
            var layout = new mx.MXArithmeticLayout({
                "width": 87,
                "height": 98,
                "desc": 43,
                "type": "desc"
            });
            //宝箱进度
            var box_arr = [];
            for (var k = 1; k <= 5; k++) {
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.SIGNLEIJIAWARD, "baoxiang", k);
                // let t_arr = [0,3,6,9,12];
                // let source = proxy.all_qifu >= t_arr[k] ? "fdai_png" : "fdhui_png";
                // box_arr.push({
                //     "id" : k,
                //     "dangci" : apis[0].dangci,
                //     "awards" : apis,
                //     "bg" : source,
                //     "wdc" : proxy.all_qifu < t_arr[k],
                //     "ylq" : proxy.qifu_box[k - 1] != 0
                // })
                var jindu = days[k - 1];
                box_arr.push({
                    "id": k,
                    "dangci": jindu,
                    "awards": apis,
                    "jindu_bg": sProxy.count < jindu ? ("lq" + jindu + "hui_png") : ("lq" + jindu + "_png"),
                    "bg": sProxy.count < jindu ? ("lqlhhui_png") : ("lqlh" + k + "_png"),
                    "wdc": (sProxy.count < jindu),
                    "ylq": sProxy.sign_box[k - 1] != 0
                });
            }
            view.box_list.dataProvider = new eui.ArrayCollection(box_arr);
            view.box_list.layout = layout;
            view.box_list.itemRenderer = mx.SignBoxRender;
            var col = Math.floor(sProxy.count / 4);
            if (col >= 1) {
                var row_temp = 0;
                switch (col) {
                    case 1:
                        row_temp = 156;
                        break;
                    case 2:
                        row_temp = 313;
                        break;
                    case 3:
                        row_temp = 480;
                        break;
                    case 4:
                        row_temp = 643;
                        break;
                    case 5:
                        row_temp = 799;
                        break;
                    case 6:
                    case 7:
                    case 8:
                        row_temp = 885;
                        break;
                }
                // view.sign_list.validateNow();
                view.sign_g.scrollV = row_temp;
            }
        };
        DailySignAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sign_list.dataProvider = null;
            this.sign_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.box_list.dataProvider = null;
            this.box_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBoxChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.DailySignAlertMediator.NAME);
        };
        DailySignAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.item.state) {
                case 2://今日签到
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SIGN });
                    break;
                case 3://补签
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_BUQIAN },
                        "param": mx.Lang.p0069
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
            }
        };
        DailySignAlert.prototype.onBoxChange = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.wdc) {
                var target = view.box_list.getChildAt(e.itemIndex);
                var point = target.parent.localToGlobal(target.x, target.y);
                facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                    "x": point.x,
                    "y": point.y,
                    "w": target.width,
                    "h": target.height,
                    "type": "items",
                    "items": e.item.awards,
                    "name": mx.Tools.format(mx.Lang.s0005, e.item.dangci),
                });
            }
            else if (e.item.ylq) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.qf0009
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_SIGN_BOX,
                    "box": e.item.id,
                });
            }
        };
        DailySignAlert.S_NAME = "DailySignAlert";
        return DailySignAlert;
    }(mx.AlertView));
    mx.DailySignAlert = DailySignAlert;
    __reflect(DailySignAlert.prototype, "mx.DailySignAlert");
})(mx || (mx = {}));
//# sourceMappingURL=DailySignAlert.js.map
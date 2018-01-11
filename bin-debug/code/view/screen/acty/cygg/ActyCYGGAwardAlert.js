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
 * @author cy
 * @date 2017.11.29
 * 财源滚滚
 */
var mx;
(function (mx) {
    var ActyCYGGAwardAlert = (function (_super) {
        __extends(ActyCYGGAwardAlert, _super);
        function ActyCYGGAwardAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.t_flag = false;
            return _this;
        }
        ActyCYGGAwardAlert.prototype.init_view_by_type = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActyCYGGAwardAlertMediator(this));
            var arr = [];
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.CYGGAWARD);
            for (var k in apis) {
                arr.push(1);
            }
            this.item_list.itemRenderer = mx.ActyCYGGRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
            this.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        ActyCYGGAwardAlert.prototype.show_ef = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.ts_p.visible = false;
            var list = this.item_list;
            var ln = list.numChildren;
            var arr1 = [];
            var arr2 = {};
            for (var k = 1; k <= ln; k++) {
                arr1.push(k);
            }
            arr2[aproxy.tar_cygg_index] = aproxy.cygg_award;
            arr1.splice(arr1.indexOf(aproxy.cygg_award), 1);
            for (var j = 0; j < ln; j++) {
                if (j != aproxy.tar_cygg_index) {
                    var rand_index = Math.floor(Math.random() * arr1.length);
                    arr2[j] = arr1[rand_index];
                    arr1.splice(rand_index, 1);
                }
            }
            var award = list.getChildAt(aproxy.tar_cygg_index);
            award.show_award(arr2[aproxy.tar_cygg_index]);
            var timeid1 = egret.setTimeout(function (arg) {
                for (var i = 1; i <= ln; i++) {
                    if (i != aproxy.tar_cygg_index + 1) {
                        var item = list.getChildAt(i - 1);
                        item.show_award(arr2[i - 1]);
                    }
                }
            }, this, 1500, "egret"); //先播放0.5s光效
            var timeid2 = egret.setTimeout(function (arg) {
                this.show_award();
            }, this, 4000, "egret"); //先播放0.5s光效
        };
        ActyCYGGAwardAlert.prototype.button_click = function (e) {
            this.show_award();
        };
        ActyCYGGAwardAlert.prototype.show_award = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            if (aproxy.cygg_award_arr.length) {
                var p_d2 = {
                    "name": mx.XXiuResAlert.S_NAME,
                    "param": {
                        "items": aproxy.cygg_award_arr.concat(),
                        "type": 9,
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                aproxy.cygg_award_arr = [];
            }
            this.close_self();
        };
        ActyCYGGAwardAlert.prototype.onTabChange = function (e) {
            if (this.t_flag) {
                return;
            }
            this.t_flag = true;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            aproxy.tar_cygg_index = e.itemIndex;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_ACT_CYGG_CHOU
            });
        };
        ActyCYGGAwardAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            this.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyCYGGAwardAlertMediator.NAME);
        };
        ActyCYGGAwardAlert.S_NAME = "ActyCYGGAwardAlert";
        return ActyCYGGAwardAlert;
    }(mx.AlertView));
    mx.ActyCYGGAwardAlert = ActyCYGGAwardAlert;
    __reflect(ActyCYGGAwardAlert.prototype, "mx.ActyCYGGAwardAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyCYGGAwardAlert.js.map
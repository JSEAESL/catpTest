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
 * @gaojing、mx
 * /2017.12.25
 * 离线补偿
 */
var mx;
(function (mx) {
    var LixianView = (function (_super) {
        __extends(LixianView, _super);
        function LixianView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.xishu = {
                "1": {
                    '3': 0.5,
                    '4': 0.5,
                    '5': 1,
                },
                "2": {
                    '1': 0.5,
                    '2': 0.5,
                    '4': 0.5,
                },
                "3": {
                    '3': 0.5,
                    '1': 0.5,
                    '2': 0.5,
                },
            };
            _this.cur_day = 1;
            return _this;
        }
        LixianView.mx_support = function () {
            return ["assets.lixian", "api.ACTHUODONG"];
        };
        LixianView.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            view.item_list.itemRenderer = mx.LixianListRender;
            this.proxy.lixian_view = 0;
            var time = this.proxy.lixian_data.res;
            this.time_t.text = mx.Tools.format_second2(time);
            if (!this.lixian_timer) {
                this.lixian_timer = new egret.Timer(1000);
                this.lixian_timer.addEventListener(egret.TimerEvent.TIMER, this.lixian_timerFunc, this);
                this.lixian_timer.start();
            }
            this.check_day();
            this.show_list();
            facade.registerMediator(new mx.LixianViewMediator(this));
        };
        LixianView.prototype.lixian_timerFunc = function () {
            --this.proxy.lixian_data.res;
            var time = this.proxy.lixian_data.res;
            this.time_t.text = mx.Tools.format_second2(time);
            this.check_day();
        };
        Object.defineProperty(LixianView.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        LixianView.prototype.check_day = function () {
            var info = this.proxy.lixian_data;
            var time = info.res;
            var old = this.cur_day;
            var new_day;
            if (time < 259200 && time >= 172800) {
                new_day = 1;
            }
            else if (time < 172800 && time >= 86400) {
                new_day = 2;
            }
            else if (time < 86400) {
                new_day = 3;
            }
            this.cur_day = new_day;
            if (new_day > old) {
                this.show_list();
            }
        };
        LixianView.prototype.show_list = function (newType) {
            if (newType === void 0) { newType = false; }
            var view = this;
            var info = this.proxy.lixian_data;
            var arr = [];
            //当前第几天
            for (var i = 1; i <= 3; i++) {
                var awards = [];
                for (var j in info.awards) {
                    var unit = info.awards[j];
                    if (typeof this.xishu[i][unit.type] != 'undefined') {
                        awards.push({
                            'award_type': unit.type,
                            'item_id': unit.id,
                            'num': Math.round(unit.shuliang * this.xishu[i][unit.type])
                        });
                    }
                }
                arr.push({
                    'type': 1,
                    'awards': awards,
                    'group': i,
                    'log': info.lq,
                    'open': true,
                    'day': this.cur_day
                });
            }
            var old = view.item_scro.viewport.scrollV;
            view.item_list.dataProvider = new eui.ArrayCollection(arr);
            view.item_list.validateNow();
            if (newType) {
                view.item_scro.viewport.scrollV = old;
            }
        };
        LixianView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            if (this.lixian_timer) {
                this.lixian_timer.stop();
                this.lixian_timer.removeEventListener(egret.TimerEvent.TIMER, this.lixian_timerFunc, this);
                this.lixian_timer = null;
            }
            this.proxy.lixian_view = 1;
            mx.ApplicationFacade.getInstance().removeMediator(mx.LixianViewMediator.NAME);
        };
        LixianView.S_NAME = "LixianView";
        return LixianView;
    }(mx.AlertView));
    mx.LixianView = LixianView;
    __reflect(LixianView.prototype, "mx.LixianView");
})(mx || (mx = {}));
//# sourceMappingURL=LixianView.js.map
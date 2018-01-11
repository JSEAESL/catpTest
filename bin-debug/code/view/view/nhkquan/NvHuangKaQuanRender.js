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
 * @qj/17.3.13
 * 排行榜render
 */
var mx;
(function (mx) {
    var NvHuangKaQuanRender = (function (_super) {
        __extends(NvHuangKaQuanRender, _super);
        function NvHuangKaQuanRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timer = null;
            _this.desc = 0;
            return _this;
        }
        NvHuangKaQuanRender.prototype.init_render = function () {
            var view = this;
            view.item_list1.itemRenderer = mx.NhkqAwardRender;
            view.item_list2.itemRenderer = mx.NhkqAwardRender;
            this.dataChanged();
            view.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cz_click, this);
            //view.type.addEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
        };
        NvHuangKaQuanRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                this._timer = null;
            }
            //this.type.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.type_click, this);
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cz_click, this);
        };
        NvHuangKaQuanRender.prototype.type_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.NhkqKtAwardView.S_NAME,
                "param": this.data.id
            });
        };
        NvHuangKaQuanRender.prototype.cz_click = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (view.get_b.res_name) {
                case 'nhktlqu_png':
                case 'nkxf_png':
                    var charge_id = 0;
                    switch (this.data.id) {
                        case 1:
                            charge_id = 1;
                            break;
                        case 2:
                            charge_id = 9;
                            break;
                        case 3:
                            charge_id = 19;
                            break;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CHECK_RECHARGE, charge_id);
                    break;
                case 'nklq_png':
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_NHKQ_LQ,
                        "key_id": this.data.id,
                    });
                    break;
            }
        };
        NvHuangKaQuanRender.prototype.TimerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var view = this;
            if (this.data.id == 1 || this.data.id == 3) {
                --this.desc;
                if (this.desc > 0) {
                    this.time_t.text = mx.Tools.format_second2(this.desc);
                }
                else {
                    if (this._timer) {
                        this._timer.stop();
                        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                        this._timer = null;
                    }
                    view.get_b.visible = true;
                    view.time_g.visible = false;
                    gproxy.nhkq_data.lq[this.data.id - 1] = 0;
                    this.fresh_item();
                    if (gproxy.nhkq_data.res[0] > 0) {
                        view.get_b.set_ssres('nklq_png');
                    }
                    else {
                        view.sming_t.text = mx.Lang.wkt;
                        view.get_b.set_ssres('nhktlqu_png');
                    }
                }
            }
            else if (this.data.id == 2) {
                --this.data.time;
                if (this.data.time > 0) {
                    this.time_t.text = mx.Tools.format_second2(this.data.time);
                }
                else {
                    if (this._timer) {
                        this._timer.stop();
                        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                        this._timer = null;
                    }
                    view.get_b.visible = true;
                    view.time_g.visible = false;
                    gproxy.nhkq_data.lq[1] = 0;
                    this.fresh_item();
                    if (gproxy.nhkq_data.res[1] > 0) {
                        view.get_b.set_ssres('nklq_png');
                    }
                    else {
                        view.sming_t.text = mx.Lang.wkt;
                        view.get_b.set_ssres('nhktlqu_png');
                    }
                }
            }
        };
        NvHuangKaQuanRender.prototype.fresh_item = function () {
            var view = this;
            var data = this.data;
            var arr1 = [], arr2 = [];
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            for (var i in data.award_once) {
                var unit = data.award_once[i];
                arr1.push({
                    "id": unit.id,
                    "type": unit.type,
                    "num": unit.num
                });
            }
            view.item_list1.dataProvider = new eui.ArrayCollection(arr1);
            for (var i in data.award) {
                var unit = data.award[i];
                arr2.push({
                    "id": unit.id,
                    "type": unit.type,
                    "num": unit.num,
                    "ylq": gproxy.nhkq_data.lq[this.data.id - 1] == 1
                });
            }
            view.item_list2.dataProvider = new eui.ArrayCollection(arr2);
        };
        NvHuangKaQuanRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.type.source = "nhk" + data.id + "_png";
            if (data.id == 2) {
                view.hde2.source = "yunkmz_png";
            }
            else {
                view.hde2.source = "ykmr_png";
            }
            var str = "";
            view.get_b.visible = true;
            view.time_g.visible = false;
            if (data.deadline <= 0) {
                str = "nhktlqu_png";
                view.sming_t.text = mx.Lang.wkt;
            }
            else {
                //剩余天数 截止日期
                var day = void 0;
                //let day = Tools.format_second2(data.deadline).split('天');
                if (Number(data.deadline) < 86400) {
                    day = '0';
                }
                else {
                    day = mx.Tools.format_second2(data.deadline).split('天')[0];
                }
                var ctime = new Date().getTime() / 1000;
                var date = mx.Tools.format_time(ctime + data.deadline, 'nyr');
                view.sming_t.text = mx.Tools.format(mx.Lang.nhkq002, mx.Lang.nhkq001[data.id - 1], day, date);
                if (data.ylq) {
                    if (data.id == 1 || data.id == 3) {
                        if (Number(day) < (data.id == 1 ? 330 : 30)) {
                            str = "nkxf_png";
                        }
                        else {
                            var today = new Date(new Date().setHours(0, 0, 0, 0));
                            var timestamp2 = Date.parse(today.toString());
                            this.desc = Math.ceil((timestamp2 / 1000 + 86400) - (new Date().getTime() / 1000));
                            view.time_g.visible = true;
                            view.get_b.visible = false;
                            if (!this._timer) {
                                this._timer = new egret.Timer(1000);
                                this._timer.addEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                                this._timer.start();
                            }
                            view.time_t.text = mx.Tools.format_second2(this.desc);
                        }
                    }
                    else if (data.id == 2) {
                        if (data.time > 0) {
                            view.time_g.visible = true;
                            view.get_b.visible = false;
                            if (!this._timer) {
                                this._timer = new egret.Timer(1000);
                                this._timer.addEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                                this._timer.start();
                            }
                            view.time_t.text = mx.Tools.format_second2(data.time);
                        }
                        else {
                            str = "nkxf_png";
                        }
                    }
                }
                else {
                    str = "nklq_png";
                }
            }
            view.get_b.set_ssres(str);
            view.get_b.set_tsres(str == 'nklq_png' ? 'tishi_png' : null);
            this.fresh_item();
        };
        return NvHuangKaQuanRender;
    }(mx.BasicRender));
    mx.NvHuangKaQuanRender = NvHuangKaQuanRender;
    __reflect(NvHuangKaQuanRender.prototype, "mx.NvHuangKaQuanRender");
})(mx || (mx = {}));
//# sourceMappingURL=NvHuangKaQuanRender.js.map
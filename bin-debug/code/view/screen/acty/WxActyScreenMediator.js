/**
 *   @author wxw qianjun
 *   @date 2017.11.15
 *   @desc 活动主界面mediator
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
    var WxActyScreenMediator = (function (_super) {
        __extends(WxActyScreenMediator, _super);
        function WxActyScreenMediator(viewComponent) {
            var _this = _super.call(this, WxActyScreenMediator.NAME, viewComponent) || this;
            _this.xy_arr = {
                "yzha": { "3": { "x": -35, "y": 85 }, "4": { "x": 17, "y": 45 } },
                "mbai": { "1": { "x": -8, "y": 122 }, "2": { "x": -92, "y": 108 }, "3": { "x": 0, "y": 70 }, "4": { "x": 83, "y": -42 } }
            };
            _this.move_mode = false;
            _this.show_items();
            return _this;
        }
        Object.defineProperty(WxActyScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        WxActyScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_ACTY,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.FRESH_SHIHE,
                mx.MX_NOTICE.FRESH_CAT,
                mx.MX_NOTICE.FRESH_RIGHT
            ];
        };
        WxActyScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_ACTY:
                    this.show_items(data ? true : false);
                    this.check_tishi();
                    view.fresh_view();
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    this.check_tishi();
                    break;
                case mx.MX_NOTICE.FRESH_SHIHE:
                    this.fresh_shihe(data);
                    break;
                case mx.MX_NOTICE.FRESH_RIGHT:
                    view.fresh_view();
                    break;
            }
        };
        WxActyScreenMediator.prototype.check_tishi = function () {
            var view = this.view;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy.set_tishi('acty', this.proxy.acty_tishi);
            var tishi = this.proxy.get_acty_tishi();
            var t_obj = {
                "1": "sign",
                "2": "level",
                "3": "recharge",
                "4": "daily_pay",
                "5": "total_use",
                "15": "cat",
                "16": "leiji_sign",
                "997": "yongjiu_pay",
            };
            //  for (let i: number = 0; i < view.tab_list.numElements; i++) {
            //     let item: any = view.tab_list.dataProvider.getItemAt(i);
            //     if (item) {
            //         item.tishi = tishi[t_obj[item.type]] ? 'gthao_png' : '';
            //     }
            // }
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            if (view.ctype == 998 && dproxy.shihe_res) {
                dproxy.shihe_res--;
                if (dproxy.shihe_res <= 0) {
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_INIT_SHIHE
                    });
                }
            }
        };
        Object.defineProperty(WxActyScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        WxActyScreenMediator.prototype.onRemove = function () {
            this.view.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.view.tl_sp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
        };
        WxActyScreenMediator.prototype.show_mc = function () {
            var view = this.view;
            for (var i = 1; i <= 4; ++i) {
                var ef = new mx.GeneralEffect("ybao" + i);
                ef.play_by_times(-1);
                ef.horizontalCenter = this.xy_arr["mbai"][i].x;
                ef.verticalCenter = this.xy_arr["mbai"][i].y;
                ef.name = "ybao" + i;
            }
            egret.setTimeout(function () {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_AWARD);
            }, this, 3000);
        };
        WxActyScreenMediator.prototype.fresh_shihe = function (data) {
            var view = this.view;
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            // view.shihe_g.visible = true;
            view.tl_sp.minimum = 0; //定义最小值
            view.tl_sp.maximum = dproxy.shihe_tili; //定义最大值
            var sli_obj = {
                "up": "dxbar_png",
                "down": "dxbarbg_png",
                "middle": "slider_png",
                "jiugong_up": [12, 0, 478, 24],
                "thumbposition": -24,
            };
            view.tl_sp.set_res(sli_obj);
            view.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            view.addEventListener(egret.TouchEvent.TOUCH_END, this.remove_move, this);
            view.tl_sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            if (!data) {
                if (!view.tl_sp.value) {
                    var va = dproxy.shihe_tili ? 1 : 0;
                    view.qcsl_t.text = "" + va;
                    view.tl_sp.init_value(va);
                }
            }
            else {
                var va = 0;
                view.tl_sp.init_value(va);
                view.qcsl_t.text = "" + va;
            }
            view.ccsl_t.text = Number(dproxy.shihe_tili) + "/" + Number(dproxy.shihe_max);
        };
        WxActyScreenMediator.prototype.pre_move = function (evt) {
            var view = this.view;
            this.start_x = evt.stageX;
            var target = view.tl_sp;
            target.thumb.horizontalCenter = this.start_x - 340;
            target.set_value();
            target.set_mask();
            view.qcsl_t.text = target.value;
            this.move_mode = true;
        };
        WxActyScreenMediator.prototype.remove_move = function (evt) {
            this.move_mode = false;
        };
        WxActyScreenMediator.prototype.changeHandler = function (evt) {
            var view = this.view;
            var target = view.tl_sp;
            if (this.move_mode && Math.abs(target.thumb.horizontalCenter) <= target.width / 2) {
                var newx = evt.stageX;
                var mv = newx - this.start_x;
                this.start_x = evt.stageX;
                target.thumb.horizontalCenter += mv;
                target.set_value();
                target.set_mask();
            }
            view.qcsl_t.text = target.value;
        };
        /*--------------刷新列表-------------*/
        WxActyScreenMediator.prototype.show_items = function (newType) {
            var _this = this;
            if (newType === void 0) { newType = false; }
            var view = this.view;
            var type = view.ctype;
            var list = this.proxy.acty_list[type];
            var adata = this.proxy.acty_data;
            var getidx = 0;
            switch (type) {
                case 1:
                    if (!adata.has_sign && adata.sign_count < 7) {
                        getidx = Math.min(list.length - 4, adata.sign_count);
                    }
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    for (var i = 0; i < list.length; i++) {
                        var d = list[i];
                        switch (type) {
                            case 2:
                                if (d.group <= adata.level && d.log.indexOf(d.group + '') < 0) {
                                    getidx = Math.min(list.length - 4, i);
                                    i = list.length;
                                }
                                break;
                            case 3:
                                if (d.group <= adata.total_pay && d.log.indexOf(d.group + '') < 0) {
                                    getidx = Math.min(3, i);
                                    i = list.length;
                                }
                                break;
                            case 4:
                                if (d.group <= adata.pay_daily && d.log.indexOf(d.group + '') < 0) {
                                    getidx = Math.min(0, i);
                                    i = list.length;
                                }
                                break;
                            case 5:
                                if (d.group <= adata.total_use && d.log.indexOf(d.group + '') < 0) {
                                    getidx = Math.min(4, i);
                                    i = list.length;
                                }
                                break;
                        }
                    }
                    break;
                case 16:
                    var awards = this.proxy.leiji_sign_award[0];
                    if (awards && awards[0].leixing == 1) {
                        getidx = Math.min(awards[0].act_id - 1, list.length - 4);
                    }
                    view.fresh_baoxiang();
                    break;
                case 997:
                    for (var i = 0; i < list.length; i++) {
                        var d = list[i];
                        if (!d.log && d.group <= this.proxy.yongjiu_pay) {
                            getidx = Math.min(list.length - 4, i);
                            i = list.length;
                        }
                    }
                    break;
            }
            if (getidx > 0) {
                var aproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME);
                if (aproxy.target_acty) {
                    if (aproxy.target_acty == type) {
                        egret.setTimeout(function () {
                            _this.update_scro(getidx);
                        }, this, 300);
                    }
                    else {
                        return;
                    }
                }
                else {
                    egret.setTimeout(function () {
                        _this.update_scro(getidx);
                    }, this, 300);
                }
            }
            if (!newType) {
            }
        };
        WxActyScreenMediator.prototype.update_scro = function (idx) {
        };
        WxActyScreenMediator.NAME = "WxActyScreenMediator";
        return WxActyScreenMediator;
    }(puremvc.Mediator));
    mx.WxActyScreenMediator = WxActyScreenMediator;
    __reflect(WxActyScreenMediator.prototype, "mx.WxActyScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=WxActyScreenMediator.js.map
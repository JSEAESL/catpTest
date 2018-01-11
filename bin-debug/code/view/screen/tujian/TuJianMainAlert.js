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
 * @cy/2017.11.13
 *  图鉴封面
 */
var mx;
(function (mx) {
    var TuJianMainAlert = (function (_super) {
        __extends(TuJianMainAlert, _super);
        function TuJianMainAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.meili_arr = [0];
            _this.sex_arr = [0];
            return _this;
        }
        TuJianMainAlert.mx_support = function () {
            return ["assets.tujian_main"];
        };
        TuJianMainAlert.prototype.init_view_by_type = function () {
            this.sx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.fz_list.itemRenderer = mx.TuJianRender;
            this.sx_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.queding_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.quxiao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.mli_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.sex_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange2, this);
            this.fz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange3, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TuJianMainAlertMediator(this));
            this.fresh_list();
            this.fresh_list2(1);
            this.fresh_list2(2);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var t_info = this.adata.type == 1 ? pproxy.hz_tujian_info : pproxy.feizi_tujian_info;
            var info = t_info[pproxy.xuetong_arr[this.adata.index]];
            this.sc_t.text = info.jindu + "%";
            var num = 0;
            for (var k in info.info) {
                if (Number(info.info[k]) != -1) {
                    num++;
                }
            }
            this.num_t.text = num + "/" + info.info.length;
            this.title_p.source = this.adata.type == 1 ? "tjbths" + pproxy.xuetong_arr[this.adata.index] + "_png" : "tjbtmr" + pproxy.xuetong_arr[this.adata.index] + "_png";
        };
        TuJianMainAlert.prototype.fresh_list = function (flag) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            this.sx_g.visible = false;
            var t_info = this.adata.type == 1 ? pproxy.hz_tujian_info : pproxy.feizi_tujian_info;
            var zan_info = this.adata.type == 1 ? pproxy.zn_like : pproxy.fz_like;
            var info = t_info[pproxy.xuetong_arr[this.adata.index]];
            var arr = [];
            var mlxd_arr = [0, 60, 80, 100, 200];
            var meili_arr = this.meili_arr;
            var sex_arr = this.sex_arr;
            if (info) {
                for (var k in info.info) {
                    var lihui = info.ids[k] + "";
                    var ml_res = false; //魅力是否符合
                    for (var t in meili_arr) {
                        if (meili_arr[t] == 0) {
                            ml_res = true;
                        }
                        else {
                            if (Number(lihui) < 900) {
                                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", lihui);
                                if (api && Number(api.charm) < mlxd_arr[meili_arr[t]] && Number(api.charm) >= mlxd_arr[meili_arr[t] - 1]) {
                                    ml_res = true;
                                }
                            }
                            else {
                                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.LIHUI, "lihui", lihui);
                                if (api && Number(api.meili) == meili_arr[t]) {
                                    ml_res = true;
                                }
                            }
                        }
                    }
                    var sex_res = false; //性别是否符合
                    for (var t in sex_arr) {
                        if (sex_arr[t] == 0) {
                            sex_res = true;
                        }
                        else {
                            if (Number(lihui) < 900) {
                                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", lihui);
                                if (api && Number(api.Gender) == sex_arr[t]) {
                                    sex_res = true;
                                }
                            }
                            else {
                                var sex = lihui[lihui.length - 4];
                                if (Number(sex) == sex_arr[t]) {
                                    sex_res = true;
                                }
                            }
                        }
                    }
                    if (sex_res && ml_res) {
                        arr.push({
                            "id": Number(lihui),
                            "state": Number(info.info[k]),
                            "zan": zan_info ? (zan_info[lihui] || 0) : 0
                        });
                    }
                }
            }
            this.fz_list.dataProvider = new eui.ArrayCollection(arr);
            if (flag) {
                var scrollv = this.fz_list.scrollV;
                this.fz_list.validateNow();
                if (scrollv) {
                    this.fz_list.scrollV = scrollv;
                }
            }
        };
        TuJianMainAlert.prototype.fresh_render = function () {
        };
        TuJianMainAlert.prototype.fresh_list2 = function (type) {
            var arr = [];
            if (type == 1) {
                arr.push({
                    "di": this.meili_arr.indexOf(0) >= 0 ? "tjsxbtndown_png" : "tjsxbtn_png",
                    "zi": this.meili_arr.indexOf(0) >= 0 ? "tjquandown_png" : "tjquan_png",
                });
                for (var k = 1; k < 5; k++) {
                    arr.push({
                        "di": this.meili_arr.indexOf(k) >= 0 ? "tjsxbtndown_png" : "tjsxbtn_png",
                        "zi": this.meili_arr.indexOf(k) >= 0 ? "tjmldown" + k + "_png" : "tjml" + k + "_png",
                    });
                }
                this.mli_list.dataProvider = new eui.ArrayCollection(arr);
            }
            else {
                arr.push({
                    "di": this.sex_arr.indexOf(0) >= 0 ? "tjsxbtndown_png" : "tjsxbtn_png",
                    "zi": this.sex_arr.indexOf(0) >= 0 ? "tjquandown_png" : "tjquan_png",
                });
                for (var k = 1; k < 3; k++) {
                    arr.push({
                        "di": this.sex_arr.indexOf(k) >= 0 ? "tjsxbtndown_png" : "tjsxbtn_png",
                        "zi": this.sex_arr.indexOf(k) >= 0 ? "tjxbiedown" + k + "_png" : "tjxbie" + k + "_png",
                    });
                }
                this.sex_list.dataProvider = new eui.ArrayCollection(arr);
            }
        };
        TuJianMainAlert.prototype.xiugai_click = function (evt) {
            switch (evt.currentTarget) {
                case this.sx_b:
                    this.sx_g.visible = true;
                    break;
                case this.sx_rect:
                case this.quxiao_b:
                    this.sx_g.visible = false;
                    break;
                case this.queding_b:
                    this.fresh_list();
                    break;
            }
        };
        TuJianMainAlert.prototype.onTabChange = function (e) {
            if (e.itemIndex == 0) {
                this.meili_arr = [0];
            }
            else {
                if (this.meili_arr.indexOf(0) >= 0) {
                    this.meili_arr.splice(this.meili_arr.indexOf(0), 1);
                }
                if (this.meili_arr.indexOf(e.itemIndex) < 0) {
                    this.meili_arr.push(e.itemIndex);
                }
                else if (this.meili_arr.length > 1) {
                    this.meili_arr.splice(this.meili_arr.indexOf(e.itemIndex), 1);
                }
                if (this.meili_arr.length >= 4) {
                    this.meili_arr = [0];
                }
            }
            this.fresh_list2(1);
        };
        TuJianMainAlert.prototype.onTabChange2 = function (e) {
            if (e.itemIndex == 0) {
                this.sex_arr = [0];
            }
            else {
                if (this.sex_arr.indexOf(0) >= 0) {
                    this.sex_arr.splice(this.sex_arr.indexOf(0), 1);
                }
                if (this.sex_arr.indexOf(e.itemIndex) < 0) {
                    this.sex_arr.push(e.itemIndex);
                }
                else if (this.sex_arr.length > 1) {
                    this.sex_arr.splice(this.sex_arr.indexOf(e.itemIndex), 1);
                }
                if (this.sex_arr.length >= 2) {
                    this.sex_arr = [0];
                }
            }
            this.fresh_list2(2);
        };
        TuJianMainAlert.prototype.onTabChange3 = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            pproxy.target_lihui = {
                "data": e.item,
                "type": this.adata.type
            };
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_TUJIAN_DETAIL,
                "type": this.adata.type,
                "avatar": e.item.id
            });
        };
        TuJianMainAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.sx_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.queding_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.quxiao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.mli_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.mli_list.dataProvider = null;
            this.sex_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange2, this);
            this.sex_list.dataProvider = null;
            this.fz_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange3, this);
            this.fz_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuJianMainAlertMediator.NAME);
        };
        TuJianMainAlert.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, TuJianMainAlert.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TuJianSelectAlert.S_NAME,
                "param": this.adata.type
            });
        };
        TuJianMainAlert.S_NAME = "TuJianMainAlert";
        TuJianMainAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return TuJianMainAlert;
    }(mx.AlertView));
    mx.TuJianMainAlert = TuJianMainAlert;
    __reflect(TuJianMainAlert.prototype, "mx.TuJianMainAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianMainAlert.js.map
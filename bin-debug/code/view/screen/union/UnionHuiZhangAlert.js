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
 * @cy/2017.4.19
 *  选择徽章alert
 */
var mx;
(function (mx) {
    var UnionHuiZhangAlert = (function (_super) {
        __extends(UnionHuiZhangAlert, _super);
        function UnionHuiZhangAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionHuiZhangAlert.mx_support = function () {
            return ["assets.jz_huizhang", "api.GONGHUIHUIZHANG"];
        };
        UnionHuiZhangAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            this.queren_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.huizhang_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.name_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.name_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.gonggao_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str2, this);
            this.gonggao_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end2, this);
            this.huizhang_list.visible = true;
            this.name_g.visible = this.gonggao_g.visible = false;
            switch (this.adata) {
                case 1://选择
                    this.g_g.width = 632;
                    this.g_g.height = 550;
                    // this.title_p.top = 10;
                    this.title_p.source = "xgjzhzbti_png";
                    this.ok_g.visible = false;
                    this.huizhang_s.bottom = 70;
                    break;
                case 2://修改
                    this.g_g.width = 632;
                    this.g_g.height = 593;
                    this.title_p.source = "xgjzhzbti_png";
                    this.ok_g.visible = true;
                    this.ok_g.bottom = 67;
                    break;
                case 3://重命名
                    this.g_g.width = 629;
                    this.g_g.height = 416;
                    this.title_p.source = "xgjzmctbi_png";
                    this.ok_g.visible = true;
                    this.huizhang_list.visible = false;
                    this.ok_g.bottom = 59;
                    this.ok_p.source = "xgjzmcjge_png";
                    this.name_g.visible = true;
                    break;
                case 4://公告
                    this.g_g.width = 629;
                    this.g_g.height = 416;
                    this.huizhang_list.visible = false;
                    this.gonggao_g.visible = true;
                    this.title_p.source = "xgjzggao_png";
                    this.ok_g.visible = true;
                    this.ok_g.bottom = 7;
                    this.queren_b.visible = true;
                    this.ok_p.visible = false;
                    this.gonggao_ed.text = uProxy.gonggao;
                    this.num_t.text = this.gonggao_ed.text.length + "/50";
                    break;
            }
            var arr = [];
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.GONGHUIHUIZHANG);
            for (var i = 1; i <= apis.length; i++) {
                arr.push({
                    "huizhang": "jzhz" + i + "_png",
                    "text": apis[i - 1].name
                });
            }
            this.huizhang_list.dataProvider = new eui.ArrayCollection(arr);
            this.huizhang_list.selectedIndex = uProxy.cur_huizhang - 1;
        };
        UnionHuiZhangAlert.prototype.type_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.UnionProxy.NAME));
            if (this.adata == 1) {
                uProxy.cur_huizhang = e.itemIndex + 1;
                facade.sendNotification(mx.MX_NOTICE.UNION_HUIZHANG);
            }
        };
        UnionHuiZhangAlert.prototype.xiugai_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.UnionProxy.NAME));
            var p_d;
            switch (this.adata) {
                case 2:
                    if (uProxy.my_zhiwu == 1) {
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_UNION_LOG, "logo": this.huizhang_list.selectedIndex + 1 },
                                "param": mx.Lang.jz020
                            }
                        };
                    }
                    else {
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.SHOW_TOP_UI,
                                "sdata_ok": {
                                    "text": mx.Lang.jz062
                                },
                                "param": mx.Lang.jz061
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, UnionHuiZhangAlert.S_NAME);
                    }
                    break;
                case 3:
                    this.check_str();
                    return;
                case 4:
                    this.check_str2();
                    return;
            }
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        UnionHuiZhangAlert.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = this.name_ed.text;
            var temp = mx.Tools.check_str_str(str);
            mx.MGTool.get_str(1, temp).then(function (value) {
                _this.name_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str != "") {
                    var p_d = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_UNION_RENAME, "name": _this.name_ed.text },
                            "param": mx.Lang.jz026
                        }
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                }
            }, function () {
                _this.name_ed.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        UnionHuiZhangAlert.prototype.init_str = function (e) {
            var view = this;
            view.name_ed.text = "";
        };
        UnionHuiZhangAlert.prototype.check_end = function (e) {
            var view = this;
            var str = view.name_ed.text;
            // view.name_ed.text = Tools.check_msg(str, "name");
            var temp = mx.Tools.check_str_str(str);
            if (temp == "") {
                view.name_ed.text = "";
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz002 });
            }
            //this.jz_name = view.name_ed.text;
        };
        UnionHuiZhangAlert.prototype.check_end2 = function () {
            var view = this;
            var str = view.gonggao_ed.text;
            view.num_t.text = view.gonggao_ed.text.length + "/50";
        };
        UnionHuiZhangAlert.prototype.init_str2 = function (e) {
            var view = this;
            //view.gonggao_ed.text = "";
            //view.num_t.text = "0/50";
        };
        UnionHuiZhangAlert.prototype.check_str2 = function () {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = view.gonggao_ed.text;
            mx.MGTool.get_str(6, str).then(function (value) {
                _this.gonggao_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str != "") {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_GONGGAO,
                        "content": _this.gonggao_ed.text
                    });
                    _this.close_self();
                }
                view.num_t.text = view.gonggao_ed.text.length + "/50";
            }, function () {
                _this.gonggao_ed.text = '';
                view.num_t.text = view.gonggao_ed.text.length + "/50";
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
            //view.gonggao_ed.text = Tools.check_msg(str, "name");
        };
        UnionHuiZhangAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.huizhang_list.dataProvider = null;
            this.huizhang_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.queren_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.name_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.name_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.gonggao_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str2, this);
            this.gonggao_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end2, this);
        };
        UnionHuiZhangAlert.S_NAME = "UnionHuiZhangAlert";
        return UnionHuiZhangAlert;
    }(mx.AlertView));
    mx.UnionHuiZhangAlert = UnionHuiZhangAlert;
    __reflect(UnionHuiZhangAlert.prototype, "mx.UnionHuiZhangAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionHuiZhangAlert.js.map
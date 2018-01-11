/**
*   @author qianjun，mx
*   @date 2016.8.29
*   @desc 物品（英雄魂魄）获取途径弹窗
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
    var GetWayView = (function (_super) {
        __extends(GetWayView, _super);
        function GetWayView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.target_num = 0;
            return _this;
        }
        GetWayView.mx_support = function () {
            return ["assets.getway", "api.STAGE", "api.EQUIP", "api.EQUIPOBTAIN", "api.VIP", "api.RESETFBPRICE"];
        };
        GetWayView.prototype.init_view = function () {
            this.get_list.itemRenderer = mx.HunpoGetWayRender;
            this.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.opt1_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            this.opt2_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            this.sd_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            this.opt_g.visible = false;
            if (this.adata) {
                this.fresh_view();
            }
            mx.ApplicationFacade.getInstance().registerMediator(new mx.GetWayMediator(this));
        };
        GetWayView.prototype.set_data = function (data) {
            this.adata = data;
            if (this.skin) {
                this.fresh_view();
            }
        };
        GetWayView.prototype.sd_click = function (evt) {
            this.opt_g.visible = !this.opt_g.visible;
            switch (evt.currentTarget) {
                case this.opt1_t://1次被点击
                    if (this.sd_type == 2 || this.sd_type == 3) {
                        this.fresh_sd_type(2);
                    }
                    else {
                        this.fresh_sd_type(1);
                    }
                    break;
                case this.opt2_t://多次被点击
                    if (this.sd_type == 2 || this.sd_type == 3) {
                        this.fresh_sd_type(3);
                    }
                    else {
                        this.fresh_sd_type(10);
                    }
                    break;
            }
        };
        GetWayView.prototype.fresh_sd_type = function (type) {
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            this.sd_type = type;
            switch (type) {
                case 0://不由副本掉落
                    this.sd_p.source = "";
                    this.sd_bg.source = "";
                    this.get_scr.top = 240;
                    break;
                case 1://普通1次
                    this.sd_bg.width = 260;
                    this.sd_p.source = "xzsd1_png";
                    this.opt2_t.text = mx.Tools.format(mx.Lang.fb025, 10);
                    fproxy.sdtype = 1;
                    break;
                case 2://精英1次
                    this.sd_bg.width = 260;
                    this.sd_p.source = "xzsd1_png";
                    this.opt2_t.text = mx.Tools.format(mx.Lang.fb025, 3);
                    fproxy.sdtype = 1;
                    break;
                case 3://精英多次
                    this.sd_bg.width = 260;
                    this.sd_p.source = "xzsd3_png";
                    this.opt2_t.text = mx.Tools.format(mx.Lang.fb025, 3);
                    fproxy.sdtype = 3;
                    break;
                case 10://普通多次
                    this.sd_bg.width = 274;
                    this.sd_p.source = "xzsd10_png";
                    this.opt2_t.text = mx.Tools.format(mx.Lang.fb025, 10);
                    fproxy.sdtype = 10;
                    break;
            }
            if (type) {
                this.sd_bg.source = "dropdown_png";
                this.get_scr.top = 250;
                this.target_num = fproxy.sdtype;
                this.fresh_list();
            }
        };
        GetWayView.prototype.fresh_list = function () {
            var list = this.get_list;
            var ln = list.numChildren;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            fproxy.sdtype = this.target_num;
            for (var i = 0; i < ln; i++) {
                var item = list.getChildAt(i);
                item.fresh_fuben_g();
            }
        };
        GetWayView.prototype.check_path1 = function (temp, item_info) {
            temp = String(temp);
            if (!temp || temp == "" || temp == "0") {
                this.fresh_sd_type(0);
                return;
            }
            var isjy = false;
            var cd = this.adata;
            var way = temp.split("|");
            for (var i = 0; i < way.length; i++) {
                var stageid = way[i];
                if (Number(stageid) > 9999) {
                    isjy = true;
                }
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stageid);
                if (api) {
                    item_info.push({
                        "id": i,
                        "stage_id": stageid,
                        "style": cd.style
                    });
                }
            }
            this.fresh_sd_type(isjy ? 3 : 10);
        };
        GetWayView.prototype.check_path3 = function (temp, item_info) {
            var cd = this.adata;
            temp = String(temp);
            var way = temp.split("|");
            for (var i = 0; i < way.length; i++) {
                item_info.push({
                    "id": i,
                    "stage_id": way[i],
                    "style": cd.style,
                    "item_id": cd.item_id,
                });
            }
        };
        GetWayView.prototype.check_path2 = function (temp, item_info) {
            var cd = this.adata;
            var str;
            temp = String(temp);
            var way = temp.split("|");
            for (var i = 0; i < way.length; i++) {
                switch (Number(way[i])) {
                    case 0:
                        break;
                    case 1://合成
                        item_info.push({
                            "id": cd.item_id,
                            "style": cd.style,
                            "hecheng": true
                        });
                        break;
                    case 2://竞技场商店
                        str = mx.Lang.p0063;
                        break;
                    case 3://远征商店
                        str = mx.Lang.p0064;
                        break;
                    case 4://魂魄不由关卡掉落
                        str = mx.Lang.p0065;
                        break;
                    default:
                        item_info.push({
                            "id": cd.item_id,
                            "stage_id": way[i],
                            "other": true
                        });
                        break;
                }
            }
            if (str) {
                this.unique_t.visible = true;
                this.unique_t.text = str;
            }
        };
        GetWayView.prototype.fresh_num = function () {
            var cd = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var pkproxy = facade.retrieveProxy(mx.PackProxy.NAME);
            var has = pkproxy.get_item_num(cd.item_id);
            this.num_t.text = "" + has;
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            var tar_info = fproxy.sd_tar_info;
            this.num_t.textColor = 0x7054A0;
            if (tar_info && tar_info.tar_need) {
                this.num_t.text = "(" + has + "/" + tar_info.tar_need + ")";
                this.num_t.textColor = has >= tar_info.tar_need ? 0x64b73f : 0xff4b4b;
            }
        };
        GetWayView.prototype.fresh_view = function () {
            var cd = this.adata;
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            this.tar.data = {
                "id": cd.item_id,
                "type": 4,
                "notip": true,
                "chicun": 90
            };
            this.name_t.text = item.name;
            this.fresh_num();
            this.fresh_sd_type(0); //不从副本掉落不显示
            var item_info = [];
            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPOBTAIN, "id", cd.item_id);
            switch (cd.style) {
                case "hunpo"://魂魄获取 
                    var arr = [
                        { "text": item.name + " " },
                        { "text": mx.Lang.hunpo, "style": { "textColor": 0xd696f8 } }
                    ];
                    this.name_t.textFlow = arr;
                    this.check_path1(api2.path1, item_info);
                    break;
                case "equip"://装备获取
                    this.check_path1(api2.path1, item_info);
                    break;
                case "cailiao"://时装材料
                    this.check_path3(api2.path3, item_info);
                    break;
            }
            this.check_path2(api2.path2, item_info);
            this.get_list.dataProvider = new eui.ArrayCollection(item_info);
        };
        GetWayView.prototype.close = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, GetWayView.S_NAME);
        };
        GetWayView.prototype.on_remove = function () {
            this.get_list.dataProvider = null;
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.opt1_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            this.opt2_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            this.sd_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sd_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            fproxy.sd_tar_info = null;
            facade.removeMediator(mx.GetWayMediator.NAME);
        };
        GetWayView.S_NAME = "GetWayView";
        return GetWayView;
    }(mx.BasicView));
    mx.GetWayView = GetWayView;
    __reflect(GetWayView.prototype, "mx.GetWayView");
})(mx || (mx = {}));
//# sourceMappingURL=GetWayView.js.map
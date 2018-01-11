/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 省亲归来
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
    var XQGuiLaiView = (function (_super) {
        __extends(XQGuiLaiView, _super);
        function XQGuiLaiView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 1;
            return _this;
        }
        XQGuiLaiView.mx_support = function () {
            return ["assets.palace_xqin_lq"];
        };
        XQGuiLaiView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_cy_jl"://出游
                    tar = this.lq_btn;
                    break;
            }
            return tar;
        };
        XQGuiLaiView.prototype.init_view = function () {
            var cd = this.adata;
            var view = this;
            view.back_b.set_ssres("back_png");
            view.lq_btn.set_ssres("xqinlqu_png");
            //标题名和对话内容
            var name, res = "";
            view.man.source = cd.shenfen == 2 ? mx.Tools.get_mn_res(cd.avatar, "lh") : mx.Tools.get_zn_res(cd.avatar, "lh");
            view.man.scaleX = view.man.scaleY = 0.4;
            var man_mask = new egret.Shape();
            man_mask.graphics.beginFill(0xff00ff);
            man_mask.graphics.drawRect(0, 0, 288, 400);
            man_mask.graphics.endFill();
            man_mask.x = 216;
            man_mask.y = 280;
            view.addChild(man_mask);
            view.man.mask = man_mask;
            view.db_bg.source = "hdlwdban_png";
            var dialog = "";
            switch (cd.shenfen) {
                case 1:
                    name = mx.Lang.xq012;
                    view.bg.source = "s607_jpg";
                    dialog = mx.Lang.xq015;
                    break;
                case 2:
                    name = mx.Lang.xq013;
                    // res = "cylwu_png"; 
                    view.bg.source = "s607_jpg";
                    dialog = mx.Lang["xq0" + (Math.floor(Math.random() * 2) + 23)];
                    break;
                case 3:
                    name = mx.Lang.xq014;
                    view.bg.source = "s605_jpg";
                    dialog = mx.Lang["xq0" + (Math.floor(Math.random() * 4) + 19)];
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(0xff0000);
                    shape.graphics.drawCircle(8, 220, 8);
                    shape.graphics.drawCircle(86, 220, 8);
                    shape.graphics.drawRect(0, 0, 96, 220);
                    shape.graphics.drawRect(8, 0, 80, 228);
                    shape.graphics.endFill();
                    view.zinv_g.visible = true;
                    view.zinv_g.addChild(shape);
                    shape.x = 1;
                    shape.y = 1;
                    // view.man.top = 25;
                    view.man_bg.source = "cxg" + (Math.round(Math.random() * 7 + 1)) + "_png";
                    view.man.scaleX = view.man.scaleY = 1;
                    view.man.source = mx.Tools.get_zn_res(cd.avatar, 'jq');
                    view.man.mask = shape;
                    //res = "gxlwu_png";
                    view.db_bg.source = "znhdlwdban_png";
                    break;
            }
            switch (cd.field) {
                case 1:
                    res = "xqlwu_png";
                    break;
                case 2:
                    res = "gxlwu_png";
                    break;
            }
            view.name_t.text = name;
            view.title.source = res;
            //对话
            //子女归省、美男出游
            view.dialog_t.text = dialog;
            //物品图标
            var arr = [];
            var dProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
            var item = dProxy.get_xq_reward();
            for (var k in item) {
                var c_d = item[k]; //type：id*sl
                var info = mx.Tools.get_item_info(c_d.type, c_d.id);
                arr.push({
                    "chicun": 90,
                    "type": c_d.type,
                    "id": c_d.id,
                    "desc": "x" + info.name,
                    "di": true,
                    "num": c_d.shuliang,
                });
            }
            this.item_list.itemRenderer = mx.GenTipRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
            this.item_list.validateNow();
            view.init_listener();
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        XQGuiLaiView.prototype.mx_test = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        XQGuiLaiView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, XQGuiLaiView.S_NAME);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_AWARD);
        };
        XQGuiLaiView.prototype.lq = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_AWARD);
            this.close_self();
        };
        XQGuiLaiView.prototype.init_listener = function () {
            var view = this;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.lq_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lq, this);
        };
        XQGuiLaiView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.lq_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.lq, this);
        };
        XQGuiLaiView.S_NAME = "XQGuiLaiView";
        XQGuiLaiView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return XQGuiLaiView;
    }(mx.BasicView));
    mx.XQGuiLaiView = XQGuiLaiView;
    __reflect(XQGuiLaiView.prototype, "mx.XQGuiLaiView");
})(mx || (mx = {}));
//# sourceMappingURL=XQGuiLaiView.js.map
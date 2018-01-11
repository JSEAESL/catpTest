/**
*   @author hxj
*   @date 2017.10.29
*   @desc 后宫一角主界面
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
    var HGYiJiaoScreen = (function (_super) {
        __extends(HGYiJiaoScreen, _super);
        function HGYiJiaoScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HGYiJiaoScreen.mx_support = function () {
            return ["assets.palace_hgyj"];
        };
        HGYiJiaoScreen.prototype.init_view = function () {
            this.npc_name.text = mx.Lang.hg123;
            this.npc_t.text = mx.Lang.hg124;
            this.caozuo_list.itemRenderer = mx.SSButtonRender;
            this.caozuo_list.dataProvider = new eui.ArrayCollection([
                { "bg": "qlgong_png" },
                { "bg": "qqfgong_png" }
            ]);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.caozuo_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.caozuo_click, this);
        };
        HGYiJiaoScreen.prototype.caozuo_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var net;
            switch (e.item.bg) {
                case "qlgong_png"://去冷宫
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LGongScreen.S_NAME);
                    break;
                case "qqfgong_png"://去囚凤宫
                    // net = [{
                    //     "t": MX_NETS.CS_PACK_TYPE_ITEM,
                    //     "type": "11"
                    // }];
                    // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname": QFGongScreen.S_NAME,
                    //     "param": { "net": net }
                    // });
                    break;
            }
        };
        HGYiJiaoScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    var net = [{
                            "t": mx.MX_NETS.CS_HG_SHIJIAN,
                            "type": 2
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        HGYiJiaoScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.caozuo_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.caozuo_click, this);
            this.caozuo_list.dataProvider = null;
        };
        HGYiJiaoScreen.S_NAME = "HGYiJiaoScreen";
        return HGYiJiaoScreen;
    }(mx.BasicView));
    mx.HGYiJiaoScreen = HGYiJiaoScreen;
    __reflect(HGYiJiaoScreen.prototype, "mx.HGYiJiaoScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HGYiJiaoScreen.js.map
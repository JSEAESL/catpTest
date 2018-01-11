/**
 *   @author wf、mx
 *   @date 2016.10.10
 *   @desc 皇子结缘类型选择
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
    var HzLyinLxPop = (function (_super) {
        __extends(HzLyinLxPop, _super);
        function HzLyinLxPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzLyinLxPop.mx_support = function () {
            return ["assets.palace_hzsuo_lyin_lx"];
        };
        HzLyinLxPop.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_hz_sy":
                    tar = this.lyall_b;
                    break;
                case "v_hz_zd":
                    tar = this.lyzding_b;
                    break;
                case "v_hz_nwf"://第一次加速
                    tar = this.nwfapai_b;
                    break;
            }
            return tar;
        };
        HzLyinLxPop.prototype.init_view = function () {
            var view = this;
            //this.scaleX = this.scaleY = 1.2;
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyall_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyzding_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.nwfapai_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.drjfs_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.hsxyuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.MX_COMMON.IN_GUIDE) {
                this.bg.height = this.c_g.height = 500;
                this.drjfs_b.visible = false;
                //this.hsxyuan_b.visible = false;
                this.nwfapai_b.top = 324;
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        HzLyinLxPop.prototype.mx_test = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HzLyinLxPop.prototype.btn_click = function (e) {
            var view = this;
            var d = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HzLyinLxPop.S_NAME);
            switch (e.currentTarget) {
                case view.lyall_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzLyinPop.S_NAME,
                        param: { type: 1, data: d }
                    });
                    break;
                case view.lyzding_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        name: mx.HzLyinPop.S_NAME,
                        param: { type: 2, data: d }
                    });
                    break;
                case view.nwfapai_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AlertView.S_NAME, "param": {
                            "param": mx.Lang.hgnw10,
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_HZS_LIANYIN_NWF,
                                "id": d.id,
                                "hunpei": mx.Tools.random_guanzhi()
                            },
                            "notice_exit": mx.MX_NOTICE.POP_VIEW,
                            "sdata_exit": { name: HzLyinLxPop.S_NAME, param: d }
                        } });
                    break;
                case view.drjfs_b://打入教坊司
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.AlertView.S_NAME, "param": {
                            "param": mx.Lang.jfs33,
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_DR_JFS,
                                "id": d.id,
                            },
                            "notice_exit": mx.MX_NOTICE.POP_VIEW,
                            "sdata_exit": { name: HzLyinLxPop.S_NAME, param: d }
                        } });
                    break;
            }
        };
        HzLyinLxPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyall_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lyzding_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.nwfapai_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.drjfs_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.hsxyuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
        };
        HzLyinLxPop.S_NAME = "HzLyinLxPop";
        return HzLyinLxPop;
    }(mx.BasicView));
    mx.HzLyinLxPop = HzLyinLxPop;
    __reflect(HzLyinLxPop.prototype, "mx.HzLyinLxPop");
})(mx || (mx = {}));
//# sourceMappingURL=HzLyinLxPop.js.map
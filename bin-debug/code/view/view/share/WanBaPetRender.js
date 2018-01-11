/**
 *   @author cy
 *   @date 2017.10.19
 *   @desc WanBaPetRender
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
    var WanBaPetRender = (function (_super) {
        __extends(WanBaPetRender, _super);
        function WanBaPetRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WanBaPetRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_sm, this);
            this.tg_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        WanBaPetRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_sm, this);
            this.tg_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        WanBaPetRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.tg_p:
                    this.sm_p.visible = !this.sm_p.visible;
                    break;
                case this.fun_b:
                    switch (this.fun_b.res_name) {
                        case "qcljqwang_png":
                            if (this.data.id == 2) {
                                var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                                fproxy.set_stage_type(1);
                                fproxy.set_jump(false);
                                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.FubenScreen.S_NAME);
                            }
                            else {
                                var net = [{
                                        "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                        "type": "11",
                                    }];
                                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                    "sname": mx.PalaceScreen.S_NAME,
                                    "param": { "net": net }
                                });
                            }
                            break;
                        case "qclqjli_png":
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_WANBA_PETLQ, "act_id": this.data.id });
                            break;
                        case "qcylqu_png":
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd009 });
                            break;
                    }
                    break;
            }
        };
        WanBaPetRender.prototype.close_sm = function (e) {
            if (e.target != this.tg_p) {
                this.sm_p.visible = false;
            }
        };
        WanBaPetRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.sm_p.visible = false;
            var award_num;
            switch (data.id) {
                case 1:
                    award_num = 100;
                    break;
                case 2:
                    award_num = 50;
                    break;
                case 3:
                    award_num = 50;
                    break;
            }
            this.num_t.text = mx.Lang.wbpet00 + "x" + award_num;
            var res;
            var flow = [{ "text": mx.Lang["wbpet0" + data.id] }];
            switch (data.state) {
                case 0:
                    var facade = mx.ApplicationFacade.getInstance();
                    var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                    var info = data.id == 2 ? gproxy.day_task_info[5] : gproxy.day_task_info[23];
                    var finish_cond = data.id == 2 ? 10 : 3;
                    var now_cond = info ? info.cond : finish_cond;
                    flow.push({ "text": " [" + now_cond + "/" + finish_cond + "]", "style": { "textColor": 0xff4B4B } });
                    res = "qcljqwang_png";
                    break;
                case 1:
                    flow.push({ "text": mx.Lang.t0003, "style": { "textColor": 0x8DB17B } });
                    res = "qclqjli_png";
                    break;
                case 2:
                    flow.push({ "text": mx.Lang.t0003, "style": { "textColor": 0x8DB17B } });
                    res = "qcylqu_png";
                    break;
            }
            this.sm_t.textFlow = flow;
            this.fun_b.set_ssres(res);
        };
        return WanBaPetRender;
    }(mx.BasicRender));
    mx.WanBaPetRender = WanBaPetRender;
    __reflect(WanBaPetRender.prototype, "mx.WanBaPetRender");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaPetRender.js.map
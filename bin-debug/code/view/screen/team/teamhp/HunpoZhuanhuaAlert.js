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
 * @author cy
 * @date 2017.10.31
 * 神秘魂魄转化弹窗
 */
var mx;
(function (mx) {
    var HunpoZhuanhuaAlert = (function (_super) {
        __extends(HunpoZhuanhuaAlert, _super);
        function HunpoZhuanhuaAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.move_mode = false;
            return _this;
        }
        HunpoZhuanhuaAlert.mx_support = function () {
            return ["assets.team_hpzh", "api.HERO"];
        };
        HunpoZhuanhuaAlert.prototype.init_view_by_type = function () {
            var cd = this.adata;
            var equip_id = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid).equip_id;
            this.target_hp.data = { "type": 4, "id": equip_id, };
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = facade.retrieveProxy(mx.PackProxy.NAME);
            if (cd.max) {
                this.max_num = cd.max;
            }
            else {
                this.max_num = pProxy.get_item_num(617); //617:神秘魂魄
            }
            this.init_splider();
            this.smhp_num.text = this.target_num.text = this.own_num.text = this.hdong_sli.value + "/" + this.max_num;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.plus_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            this.minus_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            this.zhuanhua_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zhuanhua_click, this);
            this.smhp_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hp_click, this);
        };
        HunpoZhuanhuaAlert.prototype.hp_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.smhp_p:
                    var target = this.smhp_p;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    var p_d = {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "id": 617,
                        "type": mx.MX_COMMON.CTYPE_ITEM,
                    };
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
                    break;
            }
        };
        HunpoZhuanhuaAlert.prototype.init_splider = function () {
            var sli_obj = {
                "up": "sellbar_png",
                "down": "hpzhjddchen_png",
                "middle": "djcshkuai_png",
                "jiugong_up": [4, 4, 215, 7],
                "jiugong_down": [4, 4, 215, 7],
                "thumbposition": -24,
                "highlightstartx": 71,
                "highlightheight": 15
            };
            this.hdong_sli.set_res(sli_obj);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_END, this.remove_move, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.hdong_sli.minimum = 0;
            this.hdong_sli.maximum = this.max_num;
            this.hdong_sli.init_value(0);
        };
        HunpoZhuanhuaAlert.prototype.remove_move = function (evt) {
            this.move_mode = false;
        };
        HunpoZhuanhuaAlert.prototype.pre_move = function (evt) {
            var view = this;
            this.start_x = evt.stageX;
            var target = view.hdong_sli;
            target.thumb.horizontalCenter = this.start_x - 240;
            target.set_value();
            target.set_mask();
            this.show_num(target.value);
            this.move_mode = true;
        };
        HunpoZhuanhuaAlert.prototype.changeHandler = function (evt) {
            var view = this;
            var target = view.hdong_sli;
            if (this.move_mode && Math.abs(target.thumb.horizontalCenter) <= target.width / 2) {
                var newx = evt.stageX;
                var mv = newx - this.start_x;
                this.start_x = evt.stageX;
                target.thumb.horizontalCenter += mv;
                target.set_value();
                target.set_mask();
            }
            this.show_num(target.value);
        };
        HunpoZhuanhuaAlert.prototype.num_click = function (e) {
            var num;
            switch (e.currentTarget) {
                case this.minus_b:
                    num = Math.max(this.hdong_sli.value - 1, 0);
                    break;
                case this.plus_b:
                    num = Math.min(this.hdong_sli.value + 1, this.max_num);
                    break;
            }
            this.hdong_sli.init_value(num);
            this.show_num(num);
        };
        HunpoZhuanhuaAlert.prototype.show_num = function (n1) {
            this.smhp_num.text = this.target_num.text = this.own_num.text = this.hdong_sli.value + "/" + this.max_num;
        };
        HunpoZhuanhuaAlert.prototype.zhuanhua_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var num = this.hdong_sli.value;
            if (num > 0) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_HUNPO_ZHUANHUA,
                    "mid": this.adata.mid,
                    "num": num,
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0194 });
            }
        };
        HunpoZhuanhuaAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.plus_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            this.minus_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.num_click, this);
            this.zhuanhua_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.zhuanhua_click, this);
        };
        HunpoZhuanhuaAlert.S_NAME = "HunpoZhuanhuaAlert";
        return HunpoZhuanhuaAlert;
    }(mx.AlertView));
    mx.HunpoZhuanhuaAlert = HunpoZhuanhuaAlert;
    __reflect(HunpoZhuanhuaAlert.prototype, "mx.HunpoZhuanhuaAlert");
})(mx || (mx = {}));
//# sourceMappingURL=HunpoZhuanhuaAlert.js.map
/**
*   @author mx
*   @date 2015.1.3
*   @desc 自定義progressbar, 支持指定資源，和文本
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
    var MXProbar = (function (_super) {
        __extends(MXProbar, _super);
        function MXProbar() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        MXProbar.prototype.on_remove = function (evt) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
        };
        MXProbar.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["BProSkin"];
            }
            else {
                this.skinName = RES.getRes("BProSkin_exml");
            }
        };
        MXProbar.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.init_bar();
        };
        MXProbar.prototype.init_bar = function () {
            this.text_change();
            this.res_change();
            this.txt_style_change();
        };
        MXProbar.prototype.res_change = function () {
            if (this.skin) {
                var cd = this.res_d;
                this.thumb1.source = null;
                this.thumb2.source = null;
                if (cd) {
                    if (cd.up) {
                        this.thumb.source = cd.up;
                    }
                    if (cd.down) {
                        this.bg.source = cd.down;
                    }
                    if (cd.curr) {
                        this.set_text(cd.curr, cd.all);
                    }
                    if (cd.jiugong_up) {
                        this.jiugong_up = cd.jiugong_up;
                        this.jiugong_up_change();
                    }
                    if (cd.jiugong_down) {
                        this.jiugong_down = cd.jiugong_down;
                        this.jiugong_down_change();
                    }
                }
            }
        };
        MXProbar.prototype.change_hp_pos = function () {
            this.thumb.percentWidth = 96 / 104 * 100;
            this.thumb.x = 4;
        };
        MXProbar.prototype.change_mp_pos = function () {
            this.thumb.percentWidth = 95 / 104 * 100;
            this.thumb.x = 5;
        };
        MXProbar.prototype.set_res = function (res) {
            this.res_d = res;
            this.res_change();
        };
        MXProbar.prototype.set_text = function (curr, all) {
            this.c_c = Number(curr);
            this.c_a = Number(all) || 100;
            this.text_change();
        };
        MXProbar.prototype.set_label_size = function (size) {
            this.pro_t.size = size;
        };
        MXProbar.prototype.set_txt_style = function (d) {
            this.txt_d = d;
            this.txt_style_change();
        };
        MXProbar.prototype.txt_style_change = function () {
            if (!this.skin) {
                return;
            }
            var cd = this.txt_d;
            if (cd) {
                for (var k in cd) {
                    this.pro_t[k] = cd[k];
                }
            }
            else {
                cd = null;
            }
        };
        MXProbar.prototype.text_change = function () {
            if (!this.skin) {
                return;
            }
            if (typeof this.c_c != "undefined") {
                this.pro_t.text = this.c_c + "/" + this.c_a;
                this.value = this.c_c / this.c_a * 100;
            }
        };
        MXProbar.prototype.jiugong_down_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.jiugong_down) {
                var t = this.jiugong_down;
                this.bg.scale9Grid = new egret.Rectangle(t[0], t[1], t[2], t[3]);
            }
        };
        MXProbar.prototype.jiugong_up_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.jiugong_up) {
                var t = this.jiugong_up;
                this.thumb.scale9Grid = new egret.Rectangle(t[0], t[1], t[2], t[3]);
            }
        };
        //变色
        MXProbar.prototype.change_gross_bar = function (style, value, total, cur_jindu) {
            if (cur_jindu === void 0) { cur_jindu = 0; }
            var view = this;
            switch (style) {
                case 1://预期增加的经验为紫色 不超过本等级
                    this.pro_t.text = value + "/" + total;
                    view.thumb1.source = "fyzsdchen_png";
                    view.thumb1.mask = new egret.Rectangle(0, 0, value / total * 293, this.thumb1.height);
                    break;
                case 2://超出当前等级后，原已有经验的部分为浅蓝色 超出当前等级后的预期增加经验与已有经验重合的部分为深蓝色
                    if (Number(cur_jindu) >= value) {
                        view.set_res({ 'up': "fysldchen_png" });
                    }
                    else {
                        view.set_res({ 'up': "fyqldchen_png" });
                    }
                    this.value = cur_jindu / total * 100;
                    this.pro_t.text = value + "/" + total;
                    view.thumb1.source = "fyzsdchen_png";
                    view.thumb1.mask = new egret.Rectangle(0, 0, value / total * 293, this.thumb1.height);
                    //view.set_text(value,total);
                    break;
                case 3://经验白光
                    view.thumb2.source = "dingguang_png";
                    view.thumb2.y = -6;
                    view.thumb2.x = -6;
                    egret.Tween.get(view.thumb2).to({ "x": value / total * 327 - 8 }, value / total * this.slideDuration);
                    if (value >= 99) {
                        view.thumb2.alpha = 0;
                    }
                    break;
            }
        };
        return MXProbar;
    }(eui.ProgressBar));
    mx.MXProbar = MXProbar;
    __reflect(MXProbar.prototype, "mx.MXProbar");
})(mx || (mx = {}));
//# sourceMappingURL=MXProbar.js.map
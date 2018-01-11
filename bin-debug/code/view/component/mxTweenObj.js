/*
* Author: MuXing
* Date: 2015-2-12
* 通用动画特效，需提前加载资源
*/
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
(function (mx_1) {
    var mxTweenObj = (function (_super) {
        __extends(mxTweenObj, _super);
        function mxTweenObj(mx) {
            var _this = _super.call(this) || this;
            _this.o_type = mx.o_type;
            _this.o_param = mx.o_param;
            _this.t_type = mx.t_type;
            _this.t_param = mx.t_param;
            _this.c_time = mx.c_time || 500;
            _this.init_param();
            return _this;
        }
        mxTweenObj.prototype.init_param = function () {
            switch (this.t_type) {
                case "bse"://贝塞尔曲线,需要终点和参照点
                    this.bse_ex = this.t_param.ex; //>0
                    this.bse_ey = this.t_param.ey || 0;
                    this.bse_ax = this.t_param.ax || this.t_param.ex * 0.5;
                    if (this.t_param.ay) {
                        this.bse_ay = this.t_param.ay;
                    }
                    else {
                        this.bse_ay = 0 - Math.abs(this.bse_ex);
                    }
                    break;
                case "vertical":
                    this.bse_ex = this.t_param.ex; //>0
                    this.bse_ey = this.t_param.ey || 0;
                    this.bse_ax = this.t_param.ax || this.t_param.ex * 0.5;
                    if (this.t_param.ay) {
                        this.bse_ay = this.t_param.ay;
                    }
                    else {
                        this.bse_ay = 0 - Math.abs(this.bse_ex);
                    }
                    break;
                case "zx":
                    this.bse_ex = this.t_param.ex; //>0
                    this.bse_ey = this.t_param.ey || 0;
                    break;
                default:
                    break;
            }
            var c_t, str, font = "";
            switch (this.o_type) {
                case "miss":
                    str = "miss";
                    font = "sub_blood_fnt";
                    c_t = new eui.BitmapLabel(str);
                    c_t.font = font;
                    break;
                case "label":
                    str = "+" + this.o_param;
                    font = "add_ybi_fnt";
                    c_t = new eui.BitmapLabel(str);
                    c_t.font = font;
                    break;
                case "blabel":
                    if (this.o_param < 0) {
                        str = this.o_param;
                        font = "sub_blood_fnt";
                    }
                    else {
                        str = "+" + this.o_param;
                        font = "add_blood_fnt";
                    }
                    c_t = new eui.BitmapLabel(str);
                    c_t.font = font;
                    break;
                case "image":
                    c_t = new eui.Image(this.o_param + "_png");
                    break;
                case "mc":
                    c_t = new mx_1.GeneralEffect(this.o_param);
                    c_t.play_by_times(-1);
                    break;
                default:
                    break;
            }
            c_t.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.c_obj = c_t;
            this.addChild(c_t);
        };
        mxTweenObj.prototype.onAddToStage = function (event) {
            switch (this.o_type) {
                case "image":
                    this.c_obj.anchorOffsetX = this.c_obj.width / 2;
                    this.c_obj.anchorOffsetY = this.c_obj.height / 2;
                    break;
            }
            this.c_obj.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.c_tween = egret.Tween.get(this).to({ mx: 1 }, this.c_time);
            this.c_tween.call(this.on_remove, this);
        };
        Object.defineProperty(mxTweenObj.prototype, "mx", {
            get: function () {
                return 0;
            },
            set: function (v) {
                switch (this.t_type) {
                    case "bse"://贝塞尔运动
                        this.c_obj.x = 2 * v * (1 - v) * this.bse_ax + v * v * this.bse_ex;
                        this.c_obj.y = 2 * v * (1 - v) * this.bse_ay + v * v * this.bse_ey;
                        var tan = 0 - (this.bse_ay - 2 * this.bse_ay * v + this.bse_ey * v) /
                            (this.bse_ax - 2 * this.bse_ax * v + this.bse_ex * v);
                        var c_r = 0 - Math.atan(tan) / Math.PI * 180;
                        this.c_obj.rotation = c_r;
                        break;
                    case "vertical":
                        this.c_obj.x = 2 * v * (1 - v) * this.bse_ax + v * v * this.bse_ex;
                        this.c_obj.y = 4 * v * (1 - v) * this.bse_ay + v * v * this.bse_ey;
                        break;
                    case "zx":
                        this.c_obj.x = v * this.bse_ex;
                        this.c_obj.y = v * this.bse_ey;
                        break;
                    default:
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        mxTweenObj.prototype.on_remove = function () {
            egret.Tween.removeTweens(this);
            this.c_tween = null;
            if (this.c_obj) {
                this.c_obj.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
                this.c_obj = null;
            }
            this.removeChildren();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        mxTweenObj.prototype.mx_play = function () {
            if (this.c_tween) {
                this.c_tween.setPaused(false);
            }
            if (this.c_obj && this.c_obj.mx_play) {
                this.c_obj.mx_play();
            }
        };
        mxTweenObj.prototype.mx_stop = function () {
            if (this.c_tween) {
                this.c_tween.setPaused(true);
            }
            if (this.c_obj && this.c_obj.mx_stop) {
                this.c_obj.mx_stop();
            }
        };
        return mxTweenObj;
    }(egret.DisplayObjectContainer));
    mx_1.mxTweenObj = mxTweenObj;
    __reflect(mxTweenObj.prototype, "mx.mxTweenObj");
})(mx || (mx = {}));
//# sourceMappingURL=mxTweenObj.js.map
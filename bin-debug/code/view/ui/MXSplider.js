/**
*   @author cy
*   @date 2017.9.12
*   @desc 自定義splider, 支持指定資源，和文本 遮罩资源
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
    var MXSplider = (function (_super) {
        __extends(MXSplider, _super);
        function MXSplider() {
            var _this = _super.call(this) || this;
            _this.move_mode = false;
            return _this;
        }
        MXSplider.prototype.addchange = function (evt) {
            this.move_mode = true;
        };
        MXSplider.prototype.removechange = function (evt) {
            this.move_mode = false;
        };
        MXSplider.prototype.pre_init = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addchange, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removechange, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removechange, this);
            this.res_change();
        };
        MXSplider.prototype.res_change = function () {
            this.highlightstartx = 0;
            if (this.skin) {
                var cd = this.res_d;
                if (cd) {
                    if (cd.up) {
                        this.trackHighlight.source = cd.up;
                    }
                    if (cd.down) {
                        this.track.source = cd.down;
                    }
                    if (cd.middle) {
                        this.thumb.source = cd.middle;
                    }
                    if (cd.thumbposition) {
                        this.thumb.verticalCenter = cd.thumbposition;
                    }
                    if (cd.highlightstartx) {
                        this.highlightstartx = cd.highlightstartx;
                    }
                    if (cd.highlightheight) {
                        this.trackHighlight.height = cd.highlightheight;
                    }
                    if (cd.highlightwidth) {
                        this.trackHighlight.width = cd.highlightwidth;
                    }
                    if (cd.trackwidth) {
                        this.track.width = cd.trackwidth;
                    }
                    if (cd.trackheight) {
                        this.track.height = cd.trackheight;
                    }
                    if (cd.jiugong_up) {
                        this.jiugong_up = cd.jiugong_up;
                        this.jiugong_up_change();
                    }
                    this.thumb.horizontalCenter = 0 - (this.width / 2);
                    this.init_value(this.value);
                }
            }
        };
        MXSplider.prototype.jiugong_up_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.jiugong_up) {
                var t = this.jiugong_up;
                this.trackHighlight.scale9Grid = new egret.Rectangle(t[0], t[1], t[2], t[3]);
            }
        };
        MXSplider.prototype.set_res = function (res) {
            this.res_d = res;
            this.res_change();
        };
        MXSplider.prototype.set_value = function () {
            if (this.skin) {
                this.thumb.horizontalCenter = Math.max(this.thumb.horizontalCenter, 0 - (this.width / 2));
                this.thumb.horizontalCenter = Math.min(this.thumb.horizontalCenter, (this.width / 2));
                var per = this.thumb.horizontalCenter / this.width * 100 + 50; //当前进度百分比    
                this.value = per / 100 * (this.maximum - this.minimum) + this.minimum;
                this.value = Math.max(this.value, this.minimum);
                this.value = Math.min(this.value, this.maximum);
            }
        };
        MXSplider.prototype.set_mask = function () {
            if (this.skin) {
                var per = (this.value - this.minimum) / (this.maximum - this.minimum);
                //   this.trackHighlight.mask = new egret.Rectangle(Math.max(this.highlightstartx), 0, this.width * per, this.height);
                //  this.trackHighlight.mask = Tools.draw_cirhornrec(Math.max(this.highlightstartx,0),  0,this.width, 12, 6, 0xDED5F2 );
                if (this.maximum > 0) {
                    this.trackHighlight.width = this.width * per;
                }
                else {
                    this.trackHighlight.width = 0;
                }
                this.value = Math.floor(this.value);
            }
        };
        MXSplider.prototype.init_value = function (value) {
            this.value = value;
            if (this.skin) {
                var cd = this.res_d;
                this.value = Math.max(this.value, this.minimum);
                this.value = Math.min(this.value, this.maximum);
                var per = (this.value - this.minimum) / (this.maximum - this.minimum) - 0.5;
                this.thumb.horizontalCenter = this.width * per;
                this.set_mask();
            }
        };
        MXSplider.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addchange, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.removechange, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removechange, this);
        };
        return MXSplider;
    }(mx.BasicUI));
    mx.MXSplider = MXSplider;
    __reflect(MXSplider.prototype, "mx.MXSplider");
})(mx || (mx = {}));
//# sourceMappingURL=MXSplider.js.map
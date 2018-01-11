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
*   @author qianjun
*   @date 2015.1.3
*   @desc 自定義Hsplider, 支持指定資源，和文本
**/ var mx;
(function (mx) {
    var MXHSplider = (function (_super) {
        __extends(MXHSplider, _super);
        function MXHSplider() {
            var _this = _super.call(this) || this;
            _this.once(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        MXHSplider.prototype.on_remove = function (evt) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeChildren();
        };
        MXHSplider.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["PackSellSliderSkin"];
            }
            else {
                this.skinName = RES.getRes("PackSellSliderSkin_exml");
            }
        };
        MXHSplider.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            if (this.parent) {
                this.init_bar();
            }
        };
        MXHSplider.prototype.init_bar = function () {
            this.res_change();
        };
        MXHSplider.prototype.res_change = function () {
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
        MXHSplider.prototype.set_res = function (res) {
            this.res_d = res;
            this.res_change();
        };
        MXHSplider.prototype.jiugong_down_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.jiugong_down) {
                var t = this.jiugong_down;
                this.track.scale9Grid = new egret.Rectangle(t[0], t[1], t[2], t[3]);
            }
        };
        MXHSplider.prototype.jiugong_up_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.jiugong_up) {
                var t = this.jiugong_up;
                this.trackHighlight.scale9Grid = new egret.Rectangle(t[0], t[1], t[2], t[3]);
            }
        };
        return MXHSplider;
    }(eui.HSlider));
    mx.MXHSplider = MXHSplider;
    __reflect(MXHSplider.prototype, "mx.MXHSplider");
})(mx || (mx = {}));
//# sourceMappingURL=MXHSplider.js.map
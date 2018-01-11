/**
*   @author mx
*   @date 2015.1.3
*   @desc 自定義button，支持点击缩小。Single-Scale-button
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
    var SSButton = (function (_super) {
        __extends(SSButton, _super);
        function SSButton() {
            var _this = _super.call(this) || this;
            _this.res_name = "";
            _this.ts_name = "";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        SSButton.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["SSButtonSkin"];
            }
            else {
                this.skinName = RES.getRes("SSButtonSkin_exml");
            }
        };
        SSButton.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.res_change();
            this.ts_change();
        };
        SSButton.prototype.res_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.res_name == "" && this.label != "" && this.label != "按钮") {
                this.res_name = this.label;
            }
            if (this.res_name && this.res_name != "") {
                var res = RES.getRes(this.res_name);
                if (res) {
                    this.res_loaded(res);
                }
                else {
                    RES.getResAsync(this.res_name, this.res_loaded, this);
                }
            }
        };
        SSButton.prototype.res_loaded = function (res, key) {
            if (res && this.b_up) {
                this.b_up.source = res;
                this.b_up.anchorOffsetX = res.textureWidth / 2;
                this.b_up.anchorOffsetY = res.textureHeight / 2;
                this.width = Math.max(this.width, res.textureWidth);
                this.height = Math.max(this.height, res.textureHeight);
            }
        };
        SSButton.prototype.ts_change = function () {
            if (!this.skin) {
                return;
            }
            if (typeof this.ts_name != "undefined") {
                this.ts.source = this.ts_name;
            }
            var pos = this.ts_pos;
            if (pos) {
                for (var k in pos) {
                    this.ts[k] = pos[k];
                }
                this.ts_pos = null;
            }
        };
        SSButton.prototype.set_ssres = function (res) {
            this.res_name = res;
            this.res_change();
        };
        SSButton.prototype.set_tsres = function (res, pos) {
            if (res === void 0) { res = ""; }
            this.ts_name = res;
            this.ts_pos = pos;
            this.ts_change();
        };
        SSButton.prototype.on_remove = function (evt) {
            _super.prototype.buttonReleased.call(this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeChildren();
        };
        return SSButton;
    }(eui.Button));
    mx.SSButton = SSButton;
    __reflect(SSButton.prototype, "mx.SSButton");
})(mx || (mx = {}));
//# sourceMappingURL=SSButton.js.map
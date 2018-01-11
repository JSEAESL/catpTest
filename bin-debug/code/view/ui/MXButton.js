/**
*   @author hxj、mx
*   @date 2017.10.23
*   @desc 自定義button，支持点击缩小。
          label格式：bg_png|key_png（可在皮肤中指定）
                    bg_png|{"text":"xxx","size":111,"..."}（只能在代码中指定）
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
    var MXButton = (function (_super) {
        __extends(MXButton, _super);
        function MXButton() {
            var _this = _super.call(this) || this;
            _this.bg_name = "";
            _this.key_name = "";
            _this.ts_name = "";
            _this.once(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        MXButton.prototype.on_remove = function (evt) {
            _super.prototype.buttonReleased.call(this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeChildren();
        };
        MXButton.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["MXButtonSkin"];
            }
            else {
                this.skinName = RES.getRes("MXButtonSkin_exml");
            }
        };
        MXButton.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            if (this.parent) {
                this.res_change();
                this.ts_change();
            }
        };
        MXButton.prototype.add_key = function () {
            if (this.key_name.default) {
                this.key.horizontalCenter = 0;
                this.key.verticalCenter = -2;
                delete this.key_name.default;
            }
            for (var k in this.key_name) {
                this.key[k] = this.key_name[k];
            }
            this.c_g.addChild(this.key);
        };
        MXButton.prototype.res_change = function () {
            if (!this.skin) {
                return;
            }
            if (this.bg_name == "" && this.label != "" && this.label != "按钮") {
                var res = this.label.split('|');
                this.bg_name = res[0];
                this.key_name = res[1];
            }
            if (this.bg_name && this.bg_name != "") {
                var res = RES.getRes(this.bg_name);
                if (res) {
                    this.bg_loaded(res);
                }
                else {
                    RES.getResAsync(this.bg_name, this.bg_loaded, this);
                }
            }
            if (this.key_name && this.key_name != "") {
                if (this.key_name.text) {
                    if (!this.key) {
                        this.key = new eui.Label;
                        this.add_key();
                    }
                    else {
                        this.key.text = this.key_name.text;
                    }
                }
                else {
                    var res = RES.getRes(this.key_name);
                    if (!this.key) {
                        this.key = new eui.Image;
                        this.add_key();
                    }
                    if (res) {
                        this.key_loaded(res);
                    }
                    else {
                        RES.getResAsync(this.key_name, this.key_loaded, this);
                    }
                }
            }
        };
        MXButton.prototype.bg_loaded = function (res) {
            if (res && this.bg) {
                this.bg.source = res;
                this.width = Math.max(this.width, res.textureWidth);
                this.height = Math.max(this.height, res.textureHeight);
            }
        };
        MXButton.prototype.key_loaded = function (res) {
            if (res && this.key) {
                this.key.source = res;
            }
        };
        MXButton.prototype.ts_change = function () {
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
        MXButton.prototype.set_ssres = function (bg, key) {
            this.bg_name = bg;
            this.key_name = key;
            this.res_change();
        };
        MXButton.prototype.set_tsres = function (res, pos) {
            if (res === void 0) { res = ""; }
            this.ts_name = res;
            this.ts_pos = pos;
            this.ts_change();
        };
        return MXButton;
    }(eui.Button));
    mx.MXButton = MXButton;
    __reflect(MXButton.prototype, "mx.MXButton");
})(mx || (mx = {}));
//# sourceMappingURL=MXButton.js.map
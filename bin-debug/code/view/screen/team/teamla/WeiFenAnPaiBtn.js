/**
 * @cy/2016.10.18
 *  位分btn
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
(function (mx) {
    var WeiFenAnPaiBtn = (function (_super) {
        __extends(WeiFenAnPaiBtn, _super);
        function WeiFenAnPaiBtn() {
            var _this = _super.call(this) || this;
            _this.once(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        WeiFenAnPaiBtn.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            if (mx.AppConfig.GameTag == "WX") {
                this.skinName = mx.MX_SKIN["WeiFenAnPaiBtnSkin"];
            }
            else {
                this.skinName = RES.getRes("WeiFenAnPaiBtnSkin_exml");
            }
        };
        WeiFenAnPaiBtn.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.res_change();
        };
        WeiFenAnPaiBtn.prototype.res_change = function () {
            if (this.skin && this.data) {
                this.fw_p.source = this.data.res;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", this.data.name);
                this.fw_t.text = api["weifen" + this.data.sex];
            }
        };
        WeiFenAnPaiBtn.prototype.set_weifen = function (data) {
            this.data = data;
            this.res_change();
        };
        WeiFenAnPaiBtn.prototype.on_remove = function (evt) {
            _super.prototype.buttonReleased.call(this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeChildren();
        };
        return WeiFenAnPaiBtn;
    }(eui.Button));
    mx.WeiFenAnPaiBtn = WeiFenAnPaiBtn;
    __reflect(WeiFenAnPaiBtn.prototype, "mx.WeiFenAnPaiBtn");
})(mx || (mx = {}));
//# sourceMappingURL=WeiFenAnPaiBtn.js.map
/**7
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 扫荡成果render
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
    var SaoDangResultRender = (function (_super) {
        __extends(SaoDangResultRender, _super);
        function SaoDangResultRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 0;
            return _this;
        }
        SaoDangResultRender.prototype.init_render = function () {
            this.visible = false;
            this.jl_g.visible = this.award_list.visible = false;
            this.award_list.itemRenderer = mx.GenTipRender;
            this.time1 = this.time2 = null;
            this.dataChanged();
        };
        SaoDangResultRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.mx_clear();
        };
        SaoDangResultRender.prototype.mx_clear = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.step2, this);
                this.timer = null;
            }
            if (this.time1) {
                egret.clearTimeout(this.time1);
            }
            if (this.time2) {
                egret.clearTimeout(this.time2);
            }
            this.time1 = this.time2 = null;
            this.award_scro.stopAnimation();
            egret.Tween.removeTweens(this.award_scro.viewport);
            this.award_list.dataProvider = null;
        };
        SaoDangResultRender.prototype.final_state = function () {
            this.visible = true;
            this.jl_g.visible = this.award_list.visible = true;
            this.mx_clear();
            var data = this.data;
            for (var i = 0; i < data.award.length; i++) {
                data.award[i].ani = false;
            }
            this.award_list.dataProvider = new eui.ArrayCollection(data.award);
        };
        SaoDangResultRender.prototype.startPlay = function () {
            var _this = this;
            var view = this;
            view.visible = true;
            this.time1 = egret.setTimeout(function () {
                _this.step1();
            }, this, 300);
        };
        SaoDangResultRender.prototype.step1 = function () {
            var _this = this;
            this.jl_g.visible = true;
            this.time2 = egret.setTimeout(function () {
                _this.num = 0;
                _this.timer = new egret.Timer(125, _this.data.award.length);
                _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.step2, _this);
                _this.timer.start();
            }, this, 300);
        };
        SaoDangResultRender.prototype.step2 = function () {
            this.num++;
            var view = this;
            view.award_list.visible = true;
            var item = view.award_list.getElementAt(this.num - 1);
            if (item) {
                if (this.num >= 6 && view.award_scro.viewport) {
                    var newpos = (this.num - 5) * 70;
                    egret.Tween.get(view.award_scro.viewport, { "loop": false }).to({ "scrollH": newpos }, 100);
                }
                item.startPlay();
            }
        };
        SaoDangResultRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.jl_t.text = mx.Lang.sdjl;
            view.num_t.text = mx.Tools.format(mx.Lang.fb027, data.id);
            view.exp_t.text = "+" + data.exp;
            view.ybi_t.text = "+" + data.ybi;
            for (var i = 0; i < data.award.length; i++) {
                data.award[i].ani = true;
            }
            view.award_list.dataProvider = new eui.ArrayCollection(data.award);
        };
        return SaoDangResultRender;
    }(mx.BasicRender));
    mx.SaoDangResultRender = SaoDangResultRender;
    __reflect(SaoDangResultRender.prototype, "mx.SaoDangResultRender");
})(mx || (mx = {}));
//# sourceMappingURL=SaoDangResultRender.js.map
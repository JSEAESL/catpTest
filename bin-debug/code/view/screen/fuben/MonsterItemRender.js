/**7
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 怪物render 60x60 在herobase的基础上添加星级和BOSS标签
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
    var MonsterItemRender = (function (_super) {
        __extends(MonsterItemRender, _super);
        function MonsterItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MonsterItemRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            this.dataChanged();
        };
        MonsterItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        };
        MonsterItemRender.prototype.showTips = function (e) {
            if (this.data.no_tip) {
                return;
            }
            var cd = this.data;
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": this.width,
                "h": this.height,
                "args": cd,
                "type": "monster",
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        MonsterItemRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.hero.data = data;
            var param = {
                'num': data.star,
                'res': 'pzxing',
                'gap': (90 - mx.MX_COMMON.HP_LEVEL * 30) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            this.hero_xingji.init_multiui(param);
            this.boss.visible = data.boss;
        };
        return MonsterItemRender;
    }(mx.BasicRender));
    mx.MonsterItemRender = MonsterItemRender;
    __reflect(MonsterItemRender.prototype, "mx.MonsterItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=MonsterItemRender.js.map
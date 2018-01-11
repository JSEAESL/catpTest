/**
 *   @author qianjun
 *   @date 2017.8.25
 *   @desc  小额充值奖励宝箱render
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
    var SchongLoopBoxRender = (function (_super) {
        __extends(SchongLoopBoxRender, _super);
        function SchongLoopBoxRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SchongLoopBoxRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var str = "";
            if (cd.id == cd.total) {
                str = cd.total > 4 ? "xdwzzhong_png" : "ddwzzhong_png";
            }
            else {
                str = cd.total > 4 ? ("xdw" + cd.id + "_png") : ("ddw" + cd.id + "_png");
            }
            this.bxiang_p.source = str;
            this.ylq_p.visible = cd.ylq;
            this.ylq_p.top = cd.id < 6 ? 14 : 19;
            // if(cd.wdc){
            //     Tools.mx_grayfy(this.bxiang_p);
            // }
            if (!cd.wdc && !cd.ylq && (cd.id < cd.total)) {
                this.add_dragon_play();
            }
            this.width = cd.total > 4 ? 58 : 70;
            this.height = cd.total > 4 ? 67 : 80;
        };
        SchongLoopBoxRender.prototype.add_dragon_play = function () {
            var armature = mx.TweenTool.getInstance().get_dragon("xeczbxiang");
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            armature.animation.play();
            this.ef_g.addChild(armature.display);
            this.armature = armature;
        };
        SchongLoopBoxRender.prototype.com_loop = function () {
            if (this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                this.ef_g.removeChildren();
                this.add_dragon_play();
            }
        };
        SchongLoopBoxRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this.armature) {
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            this.armature = null;
            this.removeChildren();
        };
        return SchongLoopBoxRender;
    }(mx.BasicRender));
    mx.SchongLoopBoxRender = SchongLoopBoxRender;
    __reflect(SchongLoopBoxRender.prototype, "mx.SchongLoopBoxRender");
})(mx || (mx = {}));
//# sourceMappingURL=SchongLoopBoxRender.js.map
/**
 *   @author cy
 *   @date 2017.8.25
 *   @desc 累计签到奖励宝箱render
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
    var SignBoxRender = (function (_super) {
        __extends(SignBoxRender, _super);
        function SignBoxRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SignBoxRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            // if(!d.ylq && !d.wdc){
            //     let ef = new GeneralEffect("cklhgxiao");
            //     ef.play_by_times(-1);
            //     this.ef_g.addChild(ef);
            //     ef.top = 55;
            //     ef.scaleY = ef.scaleX = 0.7;
            // }
            this.fd_b.set_ssres(d.bg);
            this.ylq_p.visible = d.ylq;
            this.jindu_p.source = d.jindu_bg;
            if (!d.wdc && !d.ylq) {
                this.add_dragon_play();
            }
        };
        SignBoxRender.prototype.add_dragon_play = function () {
            var armature = mx.TweenTool.getInstance().get_dragon("lqjxtbiao");
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            armature.animation.play();
            this.ef_g.addChild(armature.display);
            this.armature = armature;
        };
        SignBoxRender.prototype.com_loop = function () {
            if (this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                this.ef_g.removeChildren();
                this.add_dragon_play();
            }
        };
        SignBoxRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this.armature) {
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            this.armature = null;
            this.removeChildren();
        };
        return SignBoxRender;
    }(mx.BasicRender));
    mx.SignBoxRender = SignBoxRender;
    __reflect(SignBoxRender.prototype, "mx.SignBoxRender");
})(mx || (mx = {}));
//# sourceMappingURL=SignBoxRender.js.map
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
    var SchongBoxRender = (function (_super) {
        __extends(SchongBoxRender, _super);
        function SchongBoxRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SchongBoxRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            this.ylq_p.visible = cd.ylq;
            this.jindu_p.source = "xecz" + cd.id + "_png";
            if (cd.wdc) {
                mx.Tools.mx_grayfy(this.bxiang_p);
            }
            if (!cd.wdc && !cd.ylq) {
                //this.add_dragon_play();
            }
        };
        // private add_dragon_play(){
        //     let armature = TweenTool.getInstance().get_dragon("xeczbxiang");
        //     armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
        //     armature.animation.play();
        //     this.ef_g.addChild(armature.display);
        //     this.armature = armature;
        // }
        // private com_loop() : void{
        //     if(this.armature){
        //         dragonBones.WorldClock.clock.remove(this.armature);
        //         this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
        //         this.ef_g.removeChildren();
        //         this.add_dragon_play();
        //     }
        // }
        SchongBoxRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            // if(this.armature){
            //     this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            //     dragonBones.WorldClock.clock.remove(this.armature);
            // }
            // this.armature = null;
            this.removeChildren();
        };
        return SchongBoxRender;
    }(mx.BasicRender));
    mx.SchongBoxRender = SchongBoxRender;
    __reflect(SchongBoxRender.prototype, "mx.SchongBoxRender");
})(mx || (mx = {}));
//# sourceMappingURL=SchongBoxRender.js.map
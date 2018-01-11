/**
 *   @author qianjun
 *   @date 2017.12.12
 *   @desc 活动列表条目render
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
    var JuqingStageRender = (function (_super) {
        __extends(JuqingStageRender, _super);
        function JuqingStageRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuqingStageRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (mx.Tools.check_drgon() && this.armature) {
                this.armature.animation.stop();
                this.ef_g.removeChild(this.armature.display);
                this.armature = null;
            }
        };
        JuqingStageRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.chapter_p.source = "jq" + cd.chapter + "_png";
            view.stage_p.source = "jq" + cd.order_id + "_png";
            mx.Tools.mx_grayfy(this, cd.kaiqi);
            view.di_p.source = cd.juqing ? "jqgka_png" : "zdgka_png";
            if (cd.kaiqi) {
                if (Number(cd.pass) > 0) {
                    view.xing.visible = true;
                    view.di_p.source = 'ytgka_png';
                    var param = {
                        'num': Number(cd.pass),
                        'res': 'tgwjxing',
                        'cnum': 3,
                        'gap': -8,
                        'align': egret.HorizontalAlign.LEFT
                    };
                    view.xing.init_multiui(param);
                }
                else {
                    view.xing.visible = false;
                }
                if (cd.new) {
                    //光效
                    var armature = mx.TweenTool.getInstance().get_dragon(cd.juqing ? "jqgktbiao" : "zdgktbiao");
                    var cdg = armature.display;
                    cdg.x = cdg.width / 2;
                    cdg.y = cd.juqing ? (cdg.height / 2 + 20) : cdg.height / 2;
                    cdg.name = cd.juqing ? "jqgktbiao" : "zdgktbiao";
                    if (!this.ef_g.getChildByName(cdg.name)) {
                        this.ef_g.addChild(cdg);
                        armature.animation.play();
                        this.armature = armature;
                    }
                    var list = view.parent;
                    list.validateNow();
                }
                else {
                    if (mx.Tools.check_drgon() && this.armature) {
                        this.armature.animation.stop();
                        this.ef_g.removeChild(this.armature.display);
                        this.armature = null;
                    }
                }
            }
        };
        return JuqingStageRender;
    }(mx.BasicRender));
    mx.JuqingStageRender = JuqingStageRender;
    __reflect(JuqingStageRender.prototype, "mx.JuqingStageRender");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingStageRender.js.map
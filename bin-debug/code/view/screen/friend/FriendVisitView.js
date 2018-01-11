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
 *   @author gaojing、mx
 *   @date 2017.12.25
 *   @desc 好友拜访奖励弹框
 **/
var mx;
(function (mx) {
    var FriendVisitView = (function (_super) {
        __extends(FriendVisitView, _super);
        function FriendVisitView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendVisitView.mx_support = function () {
            return ["assets.friend_alert"];
        };
        FriendVisitView.prototype.init_view_by_type = function () {
            var view = this;
            var data = this.adata;
            this.init_ani();
            view.qmdu_t.text = mx.Lang.qmdu + "+" + data.qmzj;
            view.sming_t.text = data.name;
        };
        FriendVisitView.prototype.init_ani = function () {
            var _this = this;
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.x = 10;
            flower_v.y = 70;
            flower_v.play_by_times(-1);
            this.ef_g.addChild(flower_v);
            var flower_v0 = new mx.GeneralEffect("flower_v");
            flower_v0.x = 70;
            flower_v0.y = 10;
            flower_v0.play_by_times(-1);
            this.ef_g.addChild(flower_v0);
            egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.x = 170;
                flower_v1.y = 50;
                flower_v1.play_by_times(-1);
                _this.ef_g.addChild(flower_v1);
            }, this, 1000);
            egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.x = 260;
                flower_v2.y = 80;
                flower_v2.play_by_times(-1);
                _this.ef_g.addChild(flower_v2);
            }, this, 2000);
            var star = new mx.GeneralEffect("xxgxiao");
            star.scaleX = star.scaleY = 2;
            star.x = 35;
            star.y = 60;
            star.play_by_times(-1);
            this.ef_g.addChild(star);
        };
        FriendVisitView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.ef_g.removeChildren();
        };
        FriendVisitView.S_NAME = "FriendVisitView";
        return FriendVisitView;
    }(mx.AlertView));
    mx.FriendVisitView = FriendVisitView;
    __reflect(FriendVisitView.prototype, "mx.FriendVisitView");
})(mx || (mx = {}));
//# sourceMappingURL=FriendVisitView.js.map
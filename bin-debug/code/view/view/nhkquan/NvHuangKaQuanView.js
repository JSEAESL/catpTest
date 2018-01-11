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
 * @qianjun/2017.3.24
 *  排行榜
 */
var mx;
(function (mx) {
    var NvHuangKaQuanView = (function (_super) {
        __extends(NvHuangKaQuanView, _super);
        function NvHuangKaQuanView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.move = true;
            _this.cur_type = 1;
            _this.move_mode = false;
            _this.aid_arr = [2, 0, 1];
            _this.mid_arr = {};
            _this.award_once = [
                [{ 'id': 0, 'type': 2, 'num': 250 }],
                [{ 'id': 2000, 'type': 4, 'num': 20 }, { 'id': 2010, 'type': 4, 'num': 1 }, { 'id': 2018, 'type': 4, 'num': 1 }],
                [{ 'id': 0, 'type': 2, 'num': 3680 }]
            ];
            _this.award = [[{ 'id': 0, 'type': 2, 'num': 120 }], [{ 'id': 2000, 'type': 4, 'num': 10 }, { 'id': 2019, 'type': 4, 'num': 5 }, { 'id': 2018, 'type': 4, 'num': 1 }], [{ 'id': 0, 'type': 2, 'num': 120 }]];
            return _this;
        }
        NvHuangKaQuanView.mx_support = function () {
            return ["assets.nhkquan"];
        };
        NvHuangKaQuanView.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.NvHuangKaQuanViewMediator(this));
            var view = this;
            view.tab_list.selectedIndex = 0;
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xFFC125);
            shape.graphics.drawRect(15, 38, 290, 2);
            shape.graphics.endFill();
            view.tab_g.addChild(shape);
            this.cur_type = view.tab_list.selectedIndex;
            this.item_list0.itemRenderer = mx.NvHuangKaQuanRender;
            this.item_list1.itemRenderer = mx.NvHuangKaQuanRender;
            this.item_list2.itemRenderer = mx.NvHuangKaQuanRender;
            var info = this.gproxy.nhkq_data;
            var temp = [1, 2, 0];
            for (var i = 0; i < 3; ++i) {
                var arr = [];
                arr.push({
                    "id": i + 1,
                    "award_once": this.award_once[i],
                    "award": this.award[i],
                    'ylq': Number(info.lq[i]) == 1,
                    'deadline': Number(info.res[i]),
                    'time': i == 1 ? Number(info.next) : 0
                });
                this["item_list" + i].dataProvider = new eui.ArrayCollection(arr);
            }
            this.avatar1.alpha = this.avatar2.alpha = 0;
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_change, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tab_move, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tab_move, this);
            view.fresh_view();
        };
        NvHuangKaQuanView.prototype.show_ani2 = function (e) {
            var view = this.avatar2.getChildAt(0);
            this.show_ani(view, e);
        };
        NvHuangKaQuanView.prototype.show_ani1 = function (e) {
            var view = this.avatar1.getChildAt(0);
            this.show_ani(view, e);
        };
        NvHuangKaQuanView.prototype.show_ani3 = function (e) {
            var view = this.avatar0.getChildAt(0);
            this.show_ani(view, e);
        };
        NvHuangKaQuanView.prototype.show_ani = function (view, e) {
            view.height = e.textureHeight;
            if (view.source == e) {
                return;
            }
            egret.Tween.removeTweens(view);
            view.source = e;
            //TweenTool.getInstance().breath_tween(view);
        };
        NvHuangKaQuanView.prototype.pre_move = function (evt) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            this.start_x = evt.stageX; //点击起始位置
            this.pre_x = evt.stageX; //上一次响应的位置
            //点击开始时屏蔽所有点击
            view.next_b.touchEnabled = false; //返回
            view.pre_b.touchEnabled = false; //向左翻页
            //view.right_b.touchChildren = false;
        };
        NvHuangKaQuanView.prototype.show_move = function (evt) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            var dis = evt.stageX - this.pre_x;
            view.move_apos(dis);
            this.pre_x = evt.stageX;
            // else{
            // 	 //点击开始时屏蔽所有点击
            //  	view.back_b.touchEnabled = true;//返回
            //     view.left_b.touchEnabled = true;//向左翻页
            // 	this.bottom_g.touchChildren = true;
            // 	return;
            // }
        };
        NvHuangKaQuanView.prototype.check_move = function (evt) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            ;
            var now_t = egret.getTimer();
            var dis = evt.stageX - this.start_x;
            if (Math.abs(dis) < 20) {
                //点击结束时恢复所有点击
                view.next_b.touchEnabled = true; //返回
                view.pre_b.touchEnabled = true; //向左翻页
                //this.right_b.touchChildren = true;
                view.reset_apos(0); //重置形象位置
            }
            else {
                view.reset_apos(dis);
            }
        };
        NvHuangKaQuanView.prototype.reset_apos = function (n) {
            if (this._timeout) {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
            }
            if (this.move_mode) {
                return;
            }
            var view = this;
            var pos = [-707, 13, 733];
            if (n == 0) {
                for (var i = 0; i < 3; i++) {
                    var aid = this.aid_arr[i];
                    var avatar = view["avatar" + aid];
                    avatar.x = pos[i];
                }
            }
            else if (n > 0) {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到右边
                var mavatar = view["avatar" + mid];
                var dx = 720 - mavatar.x;
                egret.Tween.get(mavatar).to({ "x": 180, "alpha": 0 }, dx * 0.25).to({ "x": pos[2] }, dx * 1.5 * 0.75)
                    .call(this.reset_mode, this, [-1]);
                var lid = this.aid_arr[0]; //左侧滑到中间。
                var lavatar = view["avatar" + lid];
                egret.Tween.get(lavatar).to({ "x": 0, 'alpha': 0 }, dx * 0.8).to({ "x": pos[1], 'alpha': 1 }, dx * 1.5 * 0.2);
                var rid = this.aid_arr[2]; //右侧
                var ravatar = view["avatar" + rid];
                ravatar.x = pos[0];
            }
            else {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到左边
                var mavatar = view["avatar" + mid];
                var dx = 720 + mavatar.x;
                egret.Tween.get(mavatar).to({ "x": 0, 'alpha': 0 }, dx * 0.2).to({ "x": pos[0] }, dx * 1.5 * 0.8).call(this.reset_mode, this, [1]);
                var rid = this.aid_arr[2]; //右侧滑到中间。
                var ravatar = view["avatar" + rid];
                egret.Tween.get(ravatar).to({ "x": 160, 'alpha': 0 }, dx * 0.8).to({ "x": pos[1], 'alpha': 1 }, dx * 1.5 * 0.2);
                var lid = this.aid_arr[0]; //左侧
                var lavatar = view["avatar" + lid];
                lavatar.x = pos[1];
            }
        };
        NvHuangKaQuanView.prototype.move_apos = function (n) {
            if (this.move_mode) {
                return;
            }
            var view = this;
            for (var i = 0; i < 3; i++) {
                var aid = this.aid_arr[i];
                var avatar = view["avatar" + aid];
                avatar.x += n;
            }
        };
        NvHuangKaQuanView.prototype.reset_mode = function (data) {
            if (data < 0) {
                this.aid_arr.unshift(this.aid_arr.pop());
            }
            else {
                this.aid_arr.push(this.aid_arr.shift());
            }
            var middle = this.aid_arr[1];
            this.cur_type = middle;
            this.next_b.touchEnabled = true; //返回
            this.pre_b.touchEnabled = true; //向左翻页
            //this.right_b.touchChildren = true;
            this.move_mode = false;
            this.fresh_view();
            // if (Tools.can_local_s) {//可以存储
            // 	var cstate: any = egret.localStorage.getItem(MX_COMMON.MX_ZY_LOG);
            // 	if (!cstate ) {//未存储过
            // 		egret.localStorage.setItem(MX_COMMON.MX_ZY_LOG, "open");
            // 	}
            // }
        };
        NvHuangKaQuanView.prototype.tab_change = function (e) {
            var k = this.aid_arr.indexOf(e.itemIndex);
            if (k == 2) {
                this.reset_apos(-1);
            }
            else if (k == 0) {
                this.reset_apos(1);
            }
        };
        NvHuangKaQuanView.prototype.tab_move = function (e) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            switch (e.currentTarget) {
                case view.pre_b:
                    this.reset_apos(1);
                    break;
                case view.next_b:
                    this.reset_apos(-1);
                    break;
            }
        };
        Object.defineProperty(NvHuangKaQuanView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.GameProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        NvHuangKaQuanView.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var arr2 = [];
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            view.tab_list.selectedIndex = this.aid_arr[1];
            var arr = [];
            var info = this.gproxy.nhkq_data;
            var i = this.aid_arr[1];
            arr.push({
                "id": i + 1,
                "award_once": this.award_once[i],
                "award": this.award[i],
                'ylq': Number(info.lq[i]) == 1,
                'deadline': Number(info.res[i]),
                'time': i == 1 ? Number(info.next) : 0
            });
            view["item_list" + i].dataProvider = new eui.ArrayCollection(arr);
            view["item_list" + i].itemRenderer = mx.NvHuangKaQuanRender;
            view["item_list" + i].validateNow();
        };
        // private add_dragon_play() {
        //     // let armature = TweenTool.getInstance().get_dragon("ktdltbiao");
        //     // armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
        //     // armature.animation.play();
        //     // let cdg = armature.display;
        //     // cdg.x = 100;
        //     // cdg.y = 45;
        //     // this.ef_g.addChild(armature.display);
        //     // this.armature = armature;
        // }
        // private com_loop(): void {
        //     // if (this.armature) {
        //     //     dragonBones.WorldClock.clock.remove(this.armature);
        //     //     this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
        //     //     this.ef_g.removeChildren();
        //     //     this.add_dragon_play();
        //     // }
        // }
        NvHuangKaQuanView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            if (this.armature) {
                this.armature.animation.stop();
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_change, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tab_move, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tab_move, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.NvHuangKaQuanViewMediator.NAME);
        };
        NvHuangKaQuanView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, NvHuangKaQuanView.S_NAME);
        };
        NvHuangKaQuanView.S_NAME = "NvHuangKaQuanView";
        return NvHuangKaQuanView;
    }(mx.AlertView));
    mx.NvHuangKaQuanView = NvHuangKaQuanView;
    __reflect(NvHuangKaQuanView.prototype, "mx.NvHuangKaQuanView");
})(mx || (mx = {}));
//# sourceMappingURL=NvHuangKaQuanView.js.map
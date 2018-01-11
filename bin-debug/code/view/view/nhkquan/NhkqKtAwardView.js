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
 *
 */
var mx;
(function (mx) {
    var NhkqKtAwardView = (function (_super) {
        __extends(NhkqKtAwardView, _super);
        function NhkqKtAwardView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.move = true;
            _this.cur_type = 1;
            _this.mid_arr = {};
            _this.award = {
                '1': [{ 'id': 0, 'type': 2, 'num': 250 }],
                '2': [{ 'id': 2000, 'type': 4, 'num': 20 }, { 'id': 2010, 'type': 4, 'num': 1 }, { 'id': 2018, 'type': 4, 'num': 1 }],
                '3': [{ 'id': 0, 'type': 2, 'num': 3680 }]
            };
            _this.move_mode = false;
            _this.aid_arr = [];
            _this.sming_arr = {
                '2': "yksm_png",
                '3': "nhkqtcnksm_png",
                '1': 'yksming_png'
            };
            return _this;
        }
        NhkqKtAwardView.mx_support = function () {
            return ["assets.nhkquan_award"];
        };
        NhkqKtAwardView.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.NhkqKtAwardViewMediator(this));
            var view = this;
            this.move_mode = false;
            this.cur_type = this.adata;
            switch (this.cur_type) {
                case 1:
                    this.aid_arr = [3, 1, 2];
                    break;
                case 2:
                    this.aid_arr = [1, 2, 3];
                    break;
                case 3:
                    this.aid_arr = [2, 3, 1];
                    break;
            }
            this.mid_arr = {
                "1": "tcyka_png",
                "2": "tcyunka_png",
                "3": "tcnka_png"
            };
            var arr = [-321, 80, 480];
            for (var i = 0; i < 3; i++) {
                var aid = this.aid_arr[i];
                var c_g = view["avatar" + aid];
                c_g.x = arr[i];
                c_g.alpha = aid == this.cur_type ? 1 : 0;
                egret.Tween.removeTweens(c_g);
                var str = this.mid_arr[aid];
                var res = RES.getRes(str);
                if (res) {
                    this.show_ani(c_g.getChildAt(0), res);
                }
                else {
                    RES.getResAsync(str, this["show_ani" + aid], this);
                }
            }
            view.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cz_click, this);
            view.fresh_view();
        };
        NhkqKtAwardView.prototype.show_ani2 = function (e) {
            var view = this.avatar2.getChildAt(0);
            this.show_ani(view, e);
        };
        NhkqKtAwardView.prototype.show_ani1 = function (e) {
            var view = this.avatar1.getChildAt(0);
            this.show_ani(view, e);
        };
        NhkqKtAwardView.prototype.show_ani3 = function (e) {
            var view = this.avatar0.getChildAt(0);
            this.show_ani(view, e);
        };
        NhkqKtAwardView.prototype.show_ani = function (view, e) {
            view.height = e.textureHeight;
            if (view.source == e) {
                return;
            }
            egret.Tween.removeTweens(view);
            view.source = e;
            //TweenTool.getInstance().breath_tween(view);
        };
        Object.defineProperty(NhkqKtAwardView.prototype, "gproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.GameProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        NhkqKtAwardView.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            view.sming_p.source = this.sming_arr[this.cur_type];
            view.item_list.dataProvider = new eui.ArrayCollection(this.award[this.cur_type]);
            view.item_list.itemRenderer = mx.NhkqAwardRender;
            var str = "";
            var data = this.gproxy.nhkq_data;
            if (data.res[this.cur_type - 1] <= 0) {
                str = "nhtcktlq_png";
            }
            else {
                str = "nhktylqu_png";
            }
            view.get_b.set_ssres(str);
        };
        NhkqKtAwardView.prototype.pre_move = function (evt) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            this.start_x = evt.stageX; //点击起始位置
            this.pre_x = evt.stageX; //上一次响应的位置
            //点击开始时屏蔽所有点击
            view.back_b.touchEnabled = false; //返回
            view.left_b.touchEnabled = false; //向左翻页
            view.right_b.touchChildren = false;
        };
        NhkqKtAwardView.prototype.show_move = function (evt) {
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
        NhkqKtAwardView.prototype.check_move = function (evt) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            ;
            var now_t = egret.getTimer();
            var dis = evt.stageX - this.start_x;
            if (Math.abs(dis) < 20) {
                //点击结束时恢复所有点击
                view.back_b.touchEnabled = true; //返回
                view.left_b.touchEnabled = true; //向左翻页
                this.right_b.touchChildren = true;
                view.reset_apos(0); //重置形象位置
            }
            else {
                view.reset_apos(dis);
            }
        };
        NhkqKtAwardView.prototype.reset_apos = function (n) {
            if (this._timeout) {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
            }
            if (this.move_mode) {
                return;
            }
            var view = this;
            if (n == 0) {
                var pos = [-321, 80, 480];
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
                var dx = 480 - mavatar.x;
                egret.Tween.get(mavatar).to({ "x": 180, "alpha": 0 }, dx * 1.5 * 0.25).to({ "x": 480 }, dx * 1.5 * 0.75)
                    .call(this.reset_mode, this, [-1]);
                var lid = this.aid_arr[0]; //左侧滑到中间。
                var lavatar = view["avatar" + lid];
                egret.Tween.get(lavatar).to({ "x": 0, 'alpha': 0 }, dx * 1.5 * 0.8).to({ "x": 80, 'alpha': 1 }, dx * 1.5 * 0.2);
                var rid = this.aid_arr[2]; //右侧
                var ravatar = view["avatar" + rid];
                ravatar.x = -321;
            }
            else {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到左边
                var mavatar = view["avatar" + mid];
                var dx = 480 + mavatar.x;
                egret.Tween.get(mavatar).to({ "x": 0, 'alpha': 0 }, dx * 1.5 * 0.2).to({ "x": -321 }, dx * 1.5 * 0.8).call(this.reset_mode, this, [1]);
                var rid = this.aid_arr[2]; //右侧滑到中间。
                var ravatar = view["avatar" + rid];
                egret.Tween.get(ravatar).to({ "x": 160, 'alpha': 0 }, dx * 1.5 * 0.8).to({ "x": 80, 'alpha': 1 }, dx * 1.5 * 0.2);
                var lid = this.aid_arr[0]; //左侧
                var lavatar = view["avatar" + lid];
                lavatar.x = 480;
            }
        };
        NhkqKtAwardView.prototype.move_apos = function (n) {
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
        NhkqKtAwardView.prototype.reset_mode = function (data) {
            if (data < 0) {
                this.aid_arr.unshift(this.aid_arr.pop());
            }
            else {
                this.aid_arr.push(this.aid_arr.shift());
            }
            var middle = this.aid_arr[1];
            this.cur_type = middle;
            this.back_b.touchEnabled = true; //返回
            this.left_b.touchEnabled = true; //向左翻页
            this.right_b.touchChildren = true;
            this.move_mode = false;
            this.fresh_view();
            // if (Tools.can_local_s) {//可以存储
            // 	var cstate: any = egret.localStorage.getItem(MX_COMMON.MX_ZY_LOG);
            // 	if (!cstate ) {//未存储过
            // 		egret.localStorage.setItem(MX_COMMON.MX_ZY_LOG, "open");
            // 	}
            // }
        };
        NhkqKtAwardView.prototype.btn_click = function (e) {
            var view = this;
            if (view.move_mode) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.left_b:
                    view.reset_apos(-1);
                    break;
                case view.right_b:
                    view.reset_apos(1);
                    break;
            }
        };
        NhkqKtAwardView.prototype.cz_click = function () {
            var view = this;
            if (view.move_mode) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            switch (view.get_b.res_name) {
                case 'nhktylqu_png':
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.nhkq004, mx.Lang.nhkq001[this.cur_type - 1]) });
                    break;
                case 'nhtcktlq_png':
                    var charge_id = 0;
                    switch (this.cur_type) {
                        case 1:
                            charge_id = 1;
                            break;
                        case 2:
                            charge_id = 9;
                            break;
                        case 3:
                            charge_id = 19;
                            break;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CHECK_RECHARGE, charge_id);
                    break;
            }
        };
        NhkqKtAwardView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            for (var i = 0; i < 3; i++) {
                var c_g = view["avatar" + i];
                egret.Tween.removeTweens(c_g);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.NhkqKtAwardViewMediator.NAME);
            view.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cz_click, this);
        };
        NhkqKtAwardView.prototype.close_self = function () {
            if (this.move_mode) {
                return;
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, NhkqKtAwardView.S_NAME);
        };
        NhkqKtAwardView.S_NAME = "NhkqKtAwardView";
        return NhkqKtAwardView;
    }(mx.AlertView));
    mx.NhkqKtAwardView = NhkqKtAwardView;
    __reflect(NhkqKtAwardView.prototype, "mx.NhkqKtAwardView");
})(mx || (mx = {}));
//# sourceMappingURL=NhkqKtAwardView.js.map
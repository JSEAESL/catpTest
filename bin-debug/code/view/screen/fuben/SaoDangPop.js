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
 *   @author qianjun
 *   @date 2016.8.29
 *   @desc 副本挑战弹窗
 **/
var mx;
(function (mx) {
    var SaoDangPop = (function (_super) {
        __extends(SaoDangPop, _super);
        function SaoDangPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SaoDangPop.mx_support = function () {
            return ["assets.fubenalert"];
        };
        SaoDangPop.prototype.init_view = function () {
            var view = this;
            var data = this.adata;
            view.result_list.itemRenderer = mx.SaoDangResultRender;
            view.extra_list.itemRenderer = mx.GenTipRender;
            view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.exit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.again_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            this.tar_info = fproxy.sd_tar_info;
            if (this.tar_info) {
                this.tar_g.visible = true;
                this.init_tar_info();
                this.main_scro.top = 220;
            }
            else {
                this.tar_g.visible = false;
                this.main_scro.top = 72;
            }
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', fproxy.cur_stage);
            var difficult = Number(stage.Difficulty) == 2; //1 简单 2精英
            if (difficult) {
                view.again_b.visible = false;
                view.exit_b.horizontalCenter = 0;
            }
            else {
                var sd_type = fproxy.sdtype;
                if (sd_type == 1) {
                    view.again_b.set_ssres("sdzcsdang_png");
                }
                else {
                    view.again_b.set_ssres("sdzssci_png");
                }
            }
            this.fresh_cview(data);
            facade.registerMediator(new mx.SaoDangMediator(this));
        };
        SaoDangPop.prototype.init_tar_info = function () {
            var view = this;
            var tar_info = this.tar_info;
            var tar_id = tar_info.tar_id; //目标物品id
            var tar_need = tar_info.tar_need; //需要多少个
            view.tar.data = {
                "id": tar_id,
                "type": 4,
                "notip": true,
                "chicun": 90
            };
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", tar_id);
            if (item.Category == 4) {
                var arr = [
                    { "text": item.name + " " },
                    { "text": mx.Lang.hunpo, "style": { "textColor": 0xd696f8 } }
                ];
                view.name_t.textFlow = arr;
            }
            else {
                view.name_t.text = item.name;
            }
            this.cur_t.text = "";
            this.fresh_num_t();
        };
        SaoDangPop.prototype.fresh_num_t = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var tar_info = this.tar_info;
            var tar_id = tar_info.tar_id; //目标物品id
            var tar_need = tar_info.tar_need; //需要多少个
            var pproxy = facade.retrieveProxy(mx.PackProxy.NAME);
            var has = pproxy.get_item_num(tar_id);
            if (tar_need) {
                view.num_t.text = "(" + has + "/" + tar_need + ")";
                view.num_t.textColor = has >= tar_need ? 0x64b73f : 0xff4b4b;
                var need = Math.max(0, tar_need - has);
                view.res_t.textFlow = mx.Tools.setStrColor(mx.Lang.fb029, [need], [0xff4b4b]);
            }
            else {
                view.res_t.text = "";
                view.num_t.text = "" + has;
                view.num_t.textColor = 0x9e88a3;
            }
        };
        SaoDangPop.prototype.fresh_tar_info = function () {
            this.cur_t.textFlow = mx.Tools.setStrColor(mx.Lang.fb028, [this.tar_num], [0x78c847]); //本次获得多少
            this.fresh_num_t();
        };
        SaoDangPop.prototype.fresh_cview = function (cd) {
            var data = this.adata = cd;
            var view = this;
            view.cur_t.text = "";
            view.touchEnabled = view.in_scroll = false;
            view.extra_list.dataProvider = null;
            view.extra_t.text = "";
            view.extra_g.visible = false;
            view.extra_g.top = 243 + 201 * (data.awards.length - 1); //render占据的位置
            view.main_scro.touchEnabled = view.main_scro.touchChildren = false;
            //按顺序显示内容
            this.tar_num = 0;
            this.play_count = 1;
            this.timer = new egret.Timer(300, 3);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.start();
        };
        SaoDangPop.prototype.timerFunc = function () {
            var view = this;
            var data = view.adata.extra;
            switch (this.play_count) {
                case 1://显示扫荡结果
                    this.init_award_list();
                    break;
                case 2://显示额外奖励                 
                    var zg = new mx.GeneralEffect("rwjl");
                    zg.play_by_times(2);
                    zg.x = 150;
                    zg.y = 45;
                    view.ef_g.addChild(zg);
                    view.extratips.visible = data.length ? false : true;
                    view.extra_g.visible = true;
                    break;
                case 3:
                    this.finally_state();
                    break;
            }
            ++this.play_count;
        };
        SaoDangPop.prototype.finally_state = function () {
            var view = this;
            var data = view.adata.extra;
            view.extra_g.visible = true;
            view.extratips.visible = data.length ? false : true;
            var wln = view.adata.awards.length;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FubenProxy.NAME);
            if (wln < fproxy.sdtype) {
                this.tishi_t.text = mx.Tools.format(mx.Lang.fb034, wln);
            }
            else {
                this.tishi_t.text = "";
            }
            var tar_info = this.tar_info;
            if (data.length) {
                for (var i = 0; i < data.length; i++) {
                    var cd = data[i];
                    cd.chicun = 90;
                    if (tar_info && tar_info.tar_id + "" == cd.id + "") {
                        this.tar_num += cd.shuliang;
                    }
                }
                view.extra_t.text = mx.Lang.fb018;
                view.extra_list.dataProvider = new eui.ArrayCollection(data);
            }
            else {
                view.extra_list.dataProvider = null;
            }
            view.main_scro.touchEnabled = view.main_scro.touchChildren = true;
            if (this.timer) {
                view.timer.stop();
                view.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                view.timer = null;
            }
            view.touchEnabled = view.in_scroll = false;
            if (tar_info) {
                this.fresh_tar_info();
            }
        };
        SaoDangPop.prototype.btn_click = function (e) {
            if (this.in_scroll) {
                this.show_result();
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.again_b://再次扫
                    facade.sendNotification(mx.MX_NOTICE.FUBEN_SAODANG);
                    this.mx_clear();
                    break;
                case this://被电击后加快扫荡
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, SaoDangPop.S_NAME);
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    dproxy.check_lv_up(); //???
                    break;
            }
        };
        SaoDangPop.prototype.init_award_list = function () {
            var _this = this;
            var view = this;
            var data = view.adata.awards;
            var tar_info = this.tar_info;
            var arr = [];
            var award = [];
            var exp, ybi;
            for (var i = 0, l = data.length; i < l; ++i) {
                award = [];
                for (var key in data[i]) {
                    var temp = data[i][key];
                    switch (temp.type) {
                        case 5:
                            exp = temp.shuliang;
                            break;
                        case 1:
                            ybi = temp.shuliang;
                            break;
                        case 4:
                            award.push({
                                "id": temp.id,
                                "type": 4,
                                "num": temp.shuliang,
                                "no_tip": true,
                                "chicun": 90
                            });
                            if (tar_info && temp.id + "" == tar_info.tar_id + "") {
                                this.tar_num += temp.shuliang;
                            }
                            break;
                    }
                }
                arr.push({
                    "id": i + 1,
                    "exp": exp,
                    "ybi": ybi,
                    "award": award
                });
            }
            view.result_list.dataProvider = new eui.ArrayCollection(arr);
            this.timer.stop(); //暂停外部延迟播放
            this.play_count2 = 0;
            var max_award = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].award.length > max_award) {
                    max_award = arr[i].award.length;
                }
            }
            view.touchEnabled = view.in_scroll = true; //滑动中
            this.time1 = egret.setTimeout(function () {
                _this.startRoll(max_award);
            }, this, 250);
        };
        SaoDangPop.prototype.startRoll = function (len) {
            this.timerFunc2();
            this.timer2 = new egret.Timer(1800 + (len - 5) * 125, this.adata.awards.length);
            this.timer2.addEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
            this.timer2.start();
        };
        SaoDangPop.prototype.timerFunc2 = function () {
            var _this = this;
            ++this.play_count2;
            if (this.play_count2 > this.adata.awards.length) {
                this.timer2.stop();
                this.timer2.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2 = null;
                this.timer.start();
                return;
            }
            var item = this.result_list.getChildAt(this.play_count2 - 1);
            item.startPlay();
            this.time2 = egret.setTimeout(function () {
                _this.updateScroll();
            }, this, 1400);
        };
        SaoDangPop.prototype.updateScroll = function () {
            var ln = this.adata.awards.length;
            if (ln > 1) {
                var view = this;
                var newpos = Math.max(0, (this.play_count2 - 1) * 134 - 116);
                if (this.tar_info) {
                    newpos += 68;
                }
                egret.Tween.get(view.main_scro.viewport, { "loop": false }).to({ "scrollV": 1.5 * newpos }, 400);
            }
        };
        SaoDangPop.prototype.show_result = function () {
            this.mx_clear();
            var list = this.result_list;
            var ln = list.numChildren;
            for (var i = 0; i < ln; i++) {
                var item = list.getChildAt(i);
                item.final_state();
            }
            if (ln > 1) {
                var newpos = Math.max(0, (ln - 1) * 134 - 80);
                if (this.tar_info) {
                    newpos += 68;
                }
                egret.Tween.get(this.main_scro.viewport).to({ "scrollV": 1.5 * newpos }, 1000);
            }
            this.finally_state();
        };
        SaoDangPop.prototype.mx_clear = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
            if (this.timer2) {
                this.timer2.stop();
                this.timer2.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc2, this);
                this.timer2 = null;
            }
            if (this.time1) {
                egret.clearTimeout(this.time1);
            }
            if (this.time2) {
                egret.clearTimeout(this.time2);
            }
            this.time1 = this.time2 = null;
            var view = this;
            view.main_scro.stopAnimation();
            egret.Tween.removeTweens(view.main_scro.viewport);
        };
        SaoDangPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.mx_clear();
            this.result_list.dataProvider = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.exit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.again_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.SaoDangMediator.NAME);
        };
        SaoDangPop.S_NAME = "SaoDangPop";
        return SaoDangPop;
    }(mx.BasicView));
    mx.SaoDangPop = SaoDangPop;
    __reflect(SaoDangPop.prototype, "mx.SaoDangPop");
})(mx || (mx = {}));
//# sourceMappingURL=SaoDangPop.js.map
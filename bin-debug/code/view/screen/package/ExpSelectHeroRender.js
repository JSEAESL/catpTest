/**7
 *   @author qianjun、mx
 *   @date 20169.6
 *   @desc ExpSelectHeroRender
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
    var ExpSelectHeroRender = (function (_super) {
        __extends(ExpSelectHeroRender, _super);
        function ExpSelectHeroRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._flag = "";
            return _this;
        }
        ExpSelectHeroRender.prototype.init_listener = function () {
            var view = this;
            view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            view.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            view.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.end, this);
            view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.clear, this);
        };
        ExpSelectHeroRender.prototype.init_render = function () {
            this.init_listener();
            this.exp_bar.set_res({ "up": "wmztai_png", "down": "ymztai_png" });
            this.num = 1;
            this.dataChanged();
        };
        ExpSelectHeroRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            view.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            view.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.end, this);
            view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.clear, this);
            if (view._timeout_) {
                view._timeout_.stop();
                view._timeout_.removeEventListener(egret.TimerEvent.TIMER, view.timerFunc, view);
                egret.clearTimeout(view._timeout_);
                view._timeout_ = null;
            }
            if (view._timer) {
                egret.clearTimeout(view._timer);
                view._timer = null;
            }
        };
        ExpSelectHeroRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var temp = cd.hero_info;
            var level = parseInt(temp.level);
            var level_info = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", level + 1);
            //现有经验，下一等级经验
            var cur_exp = parseInt(temp.exp);
            var next_exp = level_info ? parseInt(level_info.hero_exp) : cur_exp;
            level_info = null;
            //基础信息，用于还原和初始化
            this.base_info = {
                "hero_info": temp,
                "level": level,
                "cur_exp": cur_exp,
                "next_exp": next_exp,
                "exp_percent": Math.round(cur_exp / next_exp * 100),
            };
            //记录会变化的属性
            this._cur_exp = cur_exp;
            this._next_exp = next_exp;
            this._level = level;
            //经验道具物品信息
            var hero = this.base_info; //英雄基础信息
            //玩家当前等级和英雄等级上限判断
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", gproxy.user_lv);
            if (parseInt(info.MaxHeroLevel) > hero.level) {
                this.max.visible = false;
                this.exp_bar.value = hero.exp_percent;
            }
            else {
                this.max.visible = true;
                this.exp_bar.value = 100;
            }
            info = null;
            if (hero.level) {
                this.hero_lv.text = mx.Tools.format(mx.Lang.bh001, hero.level);
            }
            //英雄品质，头像，星级，等级，类型显示
            this.hero_bg.source = "herobg" + temp.quality + "_png";
            var cdj = 1;
            var qlv = Number(temp.quality);
            if (qlv) {
                var pj = [2, 4, 7, 12, 15, 99];
                for (var i = 0; i < 5; i++) {
                    if (qlv < pj[i]) {
                        cdj = i + 1;
                        break;
                    }
                }
            }
            this.hero_di.source = "herobg-" + cdj + "_png";
            this.hero_tx.source = mx.Tools.get_mn_res(temp.mid, "monstx");
            this.hero_tx.mask = this.hero_rect;
            var param = {
                'num': temp.star,
                'res': 'pzxing',
                'gap': (126 - mx.MX_COMMON.HP_LEVEL * 20) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            var name_info = mx.Tools.get_item_info(7, temp.mid) || {};
            this.name_t.text = (name_info.name || name_info.hero_name);
            this.hero_xingji.init_multiui(param);
            var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", temp.mid);
            if (!hapi) {
                console.log(mx.Lang.h0011);
                return;
            }
            this.htype.visible = true;
            switch (hapi.HeroType) {
                case "STRENGTH"://攻击
                    this.htype.source = "li_png";
                    break;
                case "AGILITY"://守御
                    this.htype.source = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    this.htype.source = "zhi_png";
                    break;
                default:
                    break;
            }
            hapi = null;
        };
        //单次点击
        ExpSelectHeroRender.prototype.btn_click = function (e) {
            var view = this;
            if (view.max.visible) {
                return;
            }
            if (view._flag == "click") {
                this.num = 1;
                this.show();
                this.send();
                this.clear();
            }
        };
        //长按开始
        ExpSelectHeroRender.prototype.begin = function (evt) {
            var view = this;
            if (view.max.visible) {
                return;
            }
            view._flag = "click";
            this._timer = egret.setTimeout(this.set_time, this, 750); //长按0.75秒
        };
        //延迟启动计时器，200ms一次
        ExpSelectHeroRender.prototype.set_time = function () {
            egret.clearTimeout(this._timer);
            this._flag = "push";
            this._timer = null;
            this._timeout_ = new egret.Timer(200);
            this._timeout_.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timeout_.start();
        };
        //数目累加
        ExpSelectHeroRender.prototype.timerFunc = function () {
            var view = this;
            var cd = this.data;
            if (this.num < cd.has) {
                ++this.num;
            }
            else {
                return;
            }
            this.show();
        };
        //随着数目变化播放动画效果
        ExpSelectHeroRender.prototype.show = function () {
            //定位播放动画
            var view = this;
            view.num_t.visible = true;
            view.num_t.text = "+" + this.num;
            //更改经验条
            var cd = this.data;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            this._cur_exp += parseInt(api.Exp) * this.num;
            api = null;
            if (this._cur_exp >= this._next_exp) {
                this._level += 1;
                this.hero_lv.text = mx.Tools.format(mx.Lang.bh001, this._level);
                var level_info = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", this._level);
                this._next_exp = parseInt(level_info.hero_exp);
                this._cur_exp -= this._next_exp;
                level_info = null;
            }
            var new_exp = Math.round(this._cur_exp / this._next_exp * 100);
            this.exp_bar.value = new_exp;
        };
        //触摸结束，发送消息，重置界面
        ExpSelectHeroRender.prototype.end = function (evt) {
            var view = this;
            if (view._flag == "push") {
                this.send();
                this.clear();
            }
        };
        //确认弹窗并发送消息
        ExpSelectHeroRender.prototype.send = function () {
            var cd = this.data;
            var p_d = {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": {
                        "t": mx.MX_NETS.CS_PACK_USE_EXP_ITEM,
                        "item_id": cd.item_id,
                        "num": this.num,
                        "id": cd.hero_info.id
                    },
                    "param": mx.Tools.format(mx.Lang.p0037, this.num),
                }
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        //重置界面
        ExpSelectHeroRender.prototype.clear = function () {
            var view = this;
            if (view._timeout_) {
                view._timeout_.stop();
                view._timeout_.removeEventListener(egret.TimerEvent.TIMER, view.timerFunc, view);
                egret.clearTimeout(view._timeout_);
                view._timeout_ = null;
            }
            if (view._timer) {
                egret.clearTimeout(view._timer);
                view._timer = null;
            }
            this.num = 1;
            view.num_t.visible = false;
            //英雄等级，经验条重置
            var cd = view.data;
            var hero = cd.hero_info;
            //还原变化的属性
            this._cur_exp = this.base_info.cur_exp;
            this._next_exp = this.base_info.next_exp;
            this._level = this.base_info.level;
            view.hero_lv.text = mx.Tools.format(mx.Lang.bh001, this._level);
            view.exp_bar.value = this.base_info.exp_percent;
            view._flag = "";
        };
        return ExpSelectHeroRender;
    }(mx.BasicRender));
    mx.ExpSelectHeroRender = ExpSelectHeroRender;
    __reflect(ExpSelectHeroRender.prototype, "mx.ExpSelectHeroRender");
})(mx || (mx = {}));
//# sourceMappingURL=ExpSelectHeroRender.js.map
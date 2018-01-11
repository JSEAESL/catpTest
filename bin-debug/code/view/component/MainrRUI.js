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
/*
 * Author: mx
 * Date: 2016-07-23
 * 主页右侧图标，兼容龙骨等
 */
var mx;
(function (mx) {
    var MainrRUI = (function (_super) {
        __extends(MainrRUI, _super);
        function MainrRUI(data, mdata, extra) {
            var _this = _super.call(this) || this;
            _this.fg = "";
            _this.name = data;
            _this.mdata = mdata;
            _this.type = extra && typeof extra.type != "undefined" ? extra.type : true; //有无光效，默认有
            _this.ts = extra && typeof extra.ts != "undefined" ? extra.ts : false; //有无红点，默认无
            _this.width = 67;
            _this.height = 67;
            _this.init_mdata();
            return _this;
        }
        MainrRUI.prototype.init_mdata = function () {
            var cd = this.name;
            switch (cd) {
                case "scry"://首充人鱼
                    this.init_scry();
                    break;
                case "hyjs"://狐妖降世
                    this.init_hyjs(cd);
                    break;
                case "task"://任务
                    this.init_task();
                    break;
                case "tjzm": //添加桌面
                case "mfyb": //免费元宝
                case "zfxtbiao": //周分享
                case "ybnltbiao": //元宝奴隶
                case "yqth": //元宝奴隶
                case "zsbjtbiao": //玩吧 cover
                case "guoqing": //国庆合集
                case "lianghongyu": //梁红玉
                case "xxg": //上龙国选秀
                case "liandan": //炼丹奇缘
                case "sqtchu"://收起游戏
                    this.init_hyjs(cd);
                    break;
                case "zyj"://中元节
                    this.init_zyj();
                    break;
                case "last_pay"://小额充值
                    this.init_last_pay();
                    break;
                case "xunhuan_pay":
                    this.init_xunhuan_cz();
                    break;
            }
        };
        MainrRUI.prototype.init_xunhuan_cz = function () {
            var ssb = new mx.SSButton();
            ssb.set_ssres("xeczhi_png");
            this.addChild(ssb);
        };
        MainrRUI.prototype.init_last_pay = function () {
            var ssb = new mx.SSButton();
            ssb.set_ssres("lxxeczhi_png");
            this.addChild(ssb);
            var ef2 = new mx.GeneralEffect("schong_qpao");
            ef2.play_by_times(-1);
            ef2.left = 30;
            ef2.top = 50;
            this.addChild(ef2);
        };
        MainrRUI.prototype.init_zyj = function () {
            var ef1 = new mx.GeneralEffect("gmghuo");
            ef1.left = 34;
            ef1.top = 62;
            ef1.play_by_times(-1);
            this.addChild(ef1);
        };
        MainrRUI.prototype.init_scry = function () {
            var ef1 = new mx.GeneralEffect("schong_mc1");
            ef1.left = 34;
            ef1.top = 62;
            ef1.play_by_times(-1);
            this.addChild(ef1);
            var ef2 = new mx.GeneralEffect("schong_qpao");
            ef2.play_by_times(-1);
            ef2.left = 30;
            ef2.top = 50;
            this.addChild(ef2);
        };
        MainrRUI.prototype.init_hyjs = function (type) {
            var lg, x, y, res;
            switch (type) {
                case "hyjs":
                    //lg = "yhjshi";
                    x = 15;
                    y = 40;
                    res = "hyjshi_main_png";
                    //this.fg = "yhjshi2";
                    this.fgx = 18;
                    this.fgy = 45;
                    break;
                case "tjzm":
                    res = "xjdzmtbiao_png";
                    this.fg = "scyltbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "mfyb":
                    res = "fmybtbiao_png";
                    this.fg = "fmybtbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "zfxtbiao":
                    res = "zfxtbiao_png";
                    this.fg = "zfxtbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "ybnltbiao":
                    res = "ybnltbiao_png";
                    this.fg = "ybnltbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "yqth":
                    res = "thxhban_png";
                    this.type = false;
                    break;
                case "liandan":
                    res = "ldqiyuan_png";
                    this.fg = "ldqytbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    this.ts = !egret.localStorage.getItem("liandan" + Main.USER_ID);
                    break;
                case "zsbjtbiao":
                    res = "zsbjtbiao_png";
                    this.fg = "zsbjtbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "guoqing":
                    res = "bhsyan_png";
                    this.fg = "bhsytbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    var zg5 = new mx.GeneralEffect("linzhongguang");
                    this.addChild(zg5);
                    zg5.x = 34;
                    zg5.y = 10;
                    zg5.play_by_times(-1);
                    var zg = new mx.GeneralEffect("bhsyhdtb");
                    this.addChild(zg);
                    zg.x = 4;
                    zg.y = -4;
                    zg.play_by_times(-1);
                    break;
                case "lianghongyu":
                    res = "lhyhdong_png";
                    this.fg = "lhytbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    break;
                case "xxg":
                    res = "slgxfeim_png";
                    this.fg = "slgxftbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    if (mx.Tools.can_local_s && mx.Tools.check_user_locals(mx.MX_COMMON.MX_XXG_LOG, false)) {
                        this.ts = true;
                    }
                    break;
                case "sqtchu":
                    res = "sqtchu_png";
                    /*
                    this.fg = "ldqytbiao";
                    this.fgx = 31;
                    this.fgy = 34;
                    */
                    break;
            }
            if (lg) {
                var armature = mx.TweenTool.getInstance().get_dragon(lg);
                armature.display.x = x;
                armature.display.y = y;
                armature.animation.play();
                this.addChild(armature.display);
                this.armature = armature;
            }
            var ssb = new mx.SSButton();
            ssb.set_ssres(res);
            ssb.set_tsres(this.ts ? "tishi_png" : null);
            ssb.x = -30;
            this.addChild(ssb);
            if (this.fg) {
                this.init_fg();
            }
        };
        MainrRUI.prototype.init_fg = function () {
            var armature = mx.TweenTool.getInstance().get_dragon(this.fg);
            armature.display.x = this.fgx;
            armature.display.y = this.fgy;
            armature.animation.play();
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            this.addChild(armature.display);
            this.armature2 = armature;
        };
        MainrRUI.prototype.com_loop = function () {
            dragonBones.WorldClock.clock.remove(this.armature2);
            this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            this.removeChildAt(this.numChildren - 1);
            this.init_fg();
        };
        MainrRUI.prototype.init_task = function () {
            var task;
            var data = this.mdata.task_data;
            if (this.mdata && this.mdata.task) {
                task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", this.mdata.task[0]);
            }
            var back = new eui.Image; //文字背景图片
            back.name = "back";
            this.addChild(back);
            var group_g = new eui.Group;
            group_g.x = 40;
            group_g.y = 19;
            var content_t = new eui.Label; //会改变的文字内容
            content_t.name = "content";
            content_t.fontFamily = mx.MX_COMMON.DFT_FONT;
            content_t.textColor = 0xFFFFFF;
            content_t.bold = true;
            content_t.size = 20;
            content_t.verticalCenter = -2;
            content_t.left = 62;
            content_t.text = task ? task.name : null;
            back.width = task ? content_t.left + content_t.width + 15 : null;
            group_g.addChild(content_t);
            var whao = new eui.Image;
            whao.name = "whao";
            whao.source = RES.getRes("klqrwwhao_png"); //符号
            whao.bottom = 4;
            whao.left = 42;
            group_g.addChild(whao);
            back.source = data ? 'jqxsdchen_png' : '';
            back.visible = group_g.visible = data ? true : false;
            back.x = 44;
            back.y = 22;
            var task_p = new mx.SSButton();
            task_p.set_ssres("task_png");
            this.addChild(task_p); //任务图片
            this.startShake();
            this.addChild(group_g);
            this.set_mdata_ui(this.mdata);
            this.fresh_task_ui();
        };
        MainrRUI.prototype.set_mdata_ui = function (data) {
            if (data && data.task) {
                this.conttext = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", data.task[0]).name;
            }
            this.tasks = data.task_data;
        };
        MainrRUI.prototype.fresh_task_ui = function () {
            var all_group = this.getChildAt(2);
            var content_t = all_group.getChildByName("content");
            var whao = all_group.getChildByName("whao");
            var back = this.getChildByName("back");
            var flag = false;
            for (var i in this.tasks) {
                var task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", this.tasks[i].task_id);
                if (this.tasks[i].state == 1) {
                    if (task.step1_id == 0 || this.tasks[i].juqing == 1) {
                        flag = true;
                        this.conttext = task.name; //有已完成的任务，则获取已完成的任务的名称
                        break;
                    }
                }
            }
            content_t.text = this.conttext;
            back.width = content_t.text ? content_t.left + content_t.width + 15 : null;
            if (content_t.text) {
                whao.source = flag ? 'klqrwgthao_png' : 'klqrwwhao_png'; //感叹号、问号
            }
            else {
                whao.source = "";
            }
        };
        MainrRUI.prototype.startShake = function () {
            egret.Tween.get(this, { "loop": true }).to({ "scaleX": 1.06, "scaleY": 1.06 }, 200)
                .to({ "scaleX": 0.98, "scaleY": 0.98 }, 200).to({ "scaleX": 1.04, "scaleY": 1.04 }, 200)
                .to({ "scaleX": 0.98, "scaleY": 0.98 }, 200).to({ "scaleX": 1, "scaleY": 1 }, 200)
                .to({ "scaleX": 1, "scaleY": 1 }, 3000);
        };
        MainrRUI.prototype.on_remove = function () {
            if (this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            if (this.armature2) {
                dragonBones.WorldClock.clock.remove(this.armature2);
                this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            }
            egret.Tween.removeTweens(this);
            this.removeChildren();
        };
        return MainrRUI;
    }(eui.Component));
    mx.MainrRUI = MainrRUI;
    __reflect(MainrRUI.prototype, "mx.MainrRUI");
})(mx || (mx = {}));
//# sourceMappingURL=MainrRUI.js.map
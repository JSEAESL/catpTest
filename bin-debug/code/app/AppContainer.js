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
 *   @author mx
 *   @date 2014.12.28
 *   @desc view层viewroot,用于界面变换
 **/
var mx;
(function (mx) {
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            var _this = _super.call(this) || this;
            _this.popedView = {};
            var s_h = egret.MainContext.instance.stage.stageHeight;
            var g_arr = ["_screen_g", "_pop_g", "_guide_g", "_top_g"];
            for (var k in g_arr) {
                var c_g = new eui.Group();
                c_g.percentWidth = 100;
                c_g.touchEnabled = false;
                c_g.height = Math.min(s_h, mx.MX_COMMON.GS_HEIGHT);
                c_g.verticalCenter = 0;
                _this.addChild(c_g);
                _this[g_arr[k]] = c_g;
            }
            _this._top_g.visible = false;
            var h_2 = (s_h + mx.MX_COMMON.GS_HEIGHT) / 2;
            var top_p = new eui.Image();
            top_p.source = "zhezhaoimage_png";
            top_p.bottom = h_2;
            top_p.scaleY = -1;
            _this.addChild(top_p);
            var bottom_p = new eui.Image();
            bottom_p.source = "zhezhaoimage_png";
            bottom_p.top = h_2;
            _this.addChild(bottom_p);
            var m_p = new eui.Image();
            m_p.source = "mainbg_jpg";
            m_p.verticalCenter = 0;
            _this.addChildAt(m_p, 0);
            var rect = new eui.Rect();
            rect.percentWidth = rect.percentHeight = 100;
            rect.fillColor = 0x000000;
            rect.alpha = 0.2;
            _this._top_g.addChild(rect);
            var mc = new mx.GeneralEffect("loading");
            mc.set_retain(true);
            mc.gotoAndStop(0);
            mc.x = 320;
            mc.y = mx.Tools.screen_height / 2;
            _this._top_g.addChild(mc);
            _this._wait_mc = mc;
            return _this;
        }
        AppContainer.prototype.show_wiat_mc = function () {
            if (this._mcing) {
                return;
            }
            this._mcnum = 0;
            this._mcing = true;
            this._top_g.visible = true;
            this._wait_mc.play_by_times(-1);
            this._timeid = egret.setInterval(this.check_close_mc, this, 500);
        };
        AppContainer.prototype.check_close_mc = function (self) {
            if (self === void 0) { self = true; }
            if (self) {
                this._mcnum++;
            }
            if (this._mcing || !this._mcnum) {
                return;
            }
            if (this._timeid) {
                egret.clearInterval(this._timeid);
            }
            this._wait_mc.mx_stop();
            this._top_g.visible = false;
        };
        AppContainer.prototype.set_close_mc = function () {
            this._mcing = false;
            this.check_close_mc(false);
        };
        AppContainer.prototype.remove_guide = function () {
            mx.MX_COMMON.IN_GUIDE = 0;
            var view = this._guide_g.getChildByName(mx.GuideScreen.S_NAME);
            if (view) {
                this._guide_g.removeChild(view);
                this.close_view(view, mx.GuideScreen.S_NAME);
            }
        };
        AppContainer.prototype.get_guide_pos = function (data) {
            var arr = data.split("_");
            var view;
            if (arr[0] == "s") {
                view = this._screen_g.getChildAt(0);
            }
            else if (arr[0] == "v" && this._pop_g.numChildren) {
                view = this._pop_g.getChildAt(this._pop_g.numChildren - 1); //最上面的弹窗
            }
            else {
                return null;
            }
            view.validateNow(); //获取引导点需要立刻刷新，否则位置会不对
            if (view.get_guide_pos) {
                return view.get_guide_pos(data);
            }
            return null;
        };
        AppContainer.prototype.show_guide_view = function (data) {
            var view = this._guide_g.getChildByName(mx.GuideScreen.S_NAME);
            if (!view) {
                var cd = {
                    "type": "guide",
                    "name": mx.GuideScreen.S_NAME,
                    "param": data,
                };
                mx.PreloadTool.getInstance().mx_preload(cd); //加载引导
            }
            else {
                view.fresh_screen(data);
            }
        };
        AppContainer.prototype.hide_guide = function () {
            this._guide_g.visible = false;
        };
        AppContainer.prototype.show_guide = function () {
            this._guide_g.visible = true;
        };
        AppContainer.prototype.show_top_ui = function (data) {
            var ui;
            switch (data.type) {
                case "djs":
                    ui = new mx.DJSUI(data);
                    break;
                case "mc":
                    ui = new mx.GeneralEffect(data.mc);
                    if (data.times) {
                        ui.play_by_times(data.times);
                    }
                    break;
                case "image":
                    ui = this._guide_g.getChildByName("tximage");
                    if (ui) {
                        this._guide_g.removeChild(ui);
                    }
                    ui = new eui.Image(data.image);
                    ui.name = "tximage";
                    break;
                case "txt":
                    var str = data.txt || "mx";
                    if (str.length > 60) {
                        str = str.substr(0, 60);
                    }
                    ui = this._guide_g.getChildByName("txtui");
                    if (!ui) {
                        ui = new eui.Label();
                        ui.name = "txtui";
                        ui.size = 20;
                        ui.width = 480;
                        ui.multiline = true;
                        ui.font = mx.MX_COMMON.DFT_FONT;
                        ui.text = str;
                        ui.textColor = 0x000000;
                    }
                    else {
                        ui.text += "\n" + str;
                    }
                    break;
                case 'aixin':
                    ui = new mx.GeneralEffect("aixin");
                    ui.x = data.stageX;
                    ui.y = data.stageY;
                    ui.scaleX = ui.scaleY = 2;
                    ui.play_by_times(1);
                    break;
                default:
                    ui = new mx.ToastUI(data);
                    break;
            }
            ui.touchEnabled = ui.touchChildren = false;
            ui.alpha = data.alpha || ui.alpha;
            var pos = data.pos || { "horizontalCenter": 0, "verticalCenter": 0 };
            mx.Tools.fixed_screen(pos, 0);
            for (var k in pos) {
                ui[k] = pos[k];
            }
            var num = this._guide_g.numChildren; //放在引导的下一层
            this._guide_g.addChildAt(ui, Math.max(0, num - 1));
        };
        AppContainer.prototype.show_ui = function (data) {
            var c_ui;
            var c_parent;
            switch (data.type + "") {
                case "7": //副本英雄tip
                case "monster"://怪物
                    c_ui = new mx.HeroTip(data);
                    break;
                case "4": //物品
                case "1": //银币
                case "2": //元宝
                case "3": //体力
                case "5": //女王经验
                case "11"://紫晶币
                    c_ui = new mx.ItemTip(data);
                    break;
                case "tip_skill"://技能
                    c_ui = new mx.SkillTip(data);
                    break;
                case "aura"://光环
                    c_ui = new mx.AuraTip(data);
                    break;
                case "getway"://获取途径
                    c_ui = new mx.GetWayView(data);
                    c_ui.horizontalCenter = c_ui.verticalCenter = 0;
                    break;
                case "10"://头像tip
                    c_ui = new mx.TouXiangTip(data);
                    break;
                case "ysjj"://阳寿将尽tip
                    c_ui = new mx.YSJJTip(data);
                    break;
                case "wqj"://温情酒
                    c_ui = new mx.WqjTip(data);
                    break;
                case "qiuyuan":
                    c_ui = new mx.QiuYuanTip(data);
                    break;
                case "zinvTag":
                    c_ui = new mx.ZinvTagTip(data);
                    break;
                case "items":
                    c_ui = new mx.ItemsTip(data);
                    break;
                case "oldName":
                    c_ui = new mx.OldNameTip(data);
                    break;
                case "djs":
                    c_ui = new mx.DJSTip(data);
                    break;
                case "blood":
                    c_ui = new mx.BloodTip(data);
                    break;
                case "text":
                    c_ui = new mx.TextTip(data);
                    break;
                default:
                    ////console.warn("unknown UI in MX_NOTICE.SHOW_UI");
                    return;
            }
            if (this._pop_g.numChildren) {
                c_parent = this._pop_g.getChildAt(this._pop_g.numChildren - 1);
            }
            else {
                c_parent = this._screen_g;
            }
            c_parent.addChild(c_ui);
        };
        AppContainer.prototype.remove_ui = function () {
            var c_parent;
            var screen_num = this._screen_g.numChildren;
            if (screen_num == 1) {
                c_parent = this._pop_g.getChildAt(this._pop_g.numChildren - 1);
            }
            else {
                c_parent = this._screen_g;
            }
            c_parent.removeChildAt(c_parent.numChildren - 1);
        };
        //----start----进度条相关----start----
        AppContainer.prototype.show_loading = function (data) {
            if (!this._loadview) {
                this._loadview = new mx.PopLoadView(data);
            }
            else {
                this._loadview.fresh_view(data);
            }
            this._pop_g.addChild(this._loadview);
        };
        AppContainer.prototype.hide_loading = function () {
            this._loadview.on_remove();
            if (this._pop_g.getChildByName(mx.PopLoadView.S_NAME)) {
                this._pop_g.removeChild(this._loadview);
            }
        };
        AppContainer.prototype.setProgress = function (data) {
            if (this._loadview) {
                this._loadview.setProgress(data.p, data.t);
            }
        };
        //----end----进度条相关----end----*/
        AppContainer.prototype.show_new_ui = function (data) {
            switch (data.type) {
                case "screen":
                    this.enterScreen(data);
                    break;
                case "view":
                    this.showPop(data);
                    break;
                case "guide":
                    var view = new mx.GuideScreen(data.param);
                    this._guide_g.addChild(view);
                    break;
            }
            this.check_pop_screen_g();
        };
        //----start----弹窗相关----start----
        AppContainer.prototype.pre_pop = function (data) {
            var pop_name = data.name;
            var c_pop = this.popedView[pop_name];
            if (pop_name == "FightView") {
                mx.PreloadTool.getInstance().recover_dyn_group(pop_name, true);
            }
            else if (pop_name == "ShopAlert" && data.param == 2) {
                this.check_pop();
            }
            else if (c_pop) {
                var facade = mx.ApplicationFacade.getInstance();
                facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data.param, pop_name);
                if (c_pop.fresh_pop) {
                    c_pop.fresh_pop(data.param);
                    ////console.info("不在使用的方法，请在mediator中监听消息处理", pop_name);
                    return;
                }
                else {
                    return;
                }
            }
            if (pop_name != "HouGongSJView") {
                this._screen_g.touchChildren = this._pop_g.touchChildren = false;
            }
            data.type = "view";
            mx.PreloadTool.getInstance().mx_preload(data); //加载弹窗
        };
        AppContainer.prototype.add_pop = function (c_pop, cd) {
            c_pop.verticalCenter = 0;
            c_pop.horizontalCenter = 0;
            var c_class = egret.getDefinitionByName("mx." + c_pop.name);
            if (!c_class.V_MODE || c_class.V_MODE != mx.MX_COMMON.VM_ALL_ALERT) {
                if (!mx.MX_COMMON.IN_GUIDE && mx.AppConfig.GameTag != "WX") {
                    c_pop.addEventListener(mx.MX_COMMON.MX_CREATED, this.show_pop_scale, this);
                }
            }
            this._pop_g.addChild(c_pop);
        };
        AppContainer.prototype.show_pop_scale = function () {
            var c_pop = this._pop_g.getChildAt(this._pop_g.numChildren - 1);
            c_pop.removeEventListener(mx.MX_COMMON.MX_CREATED, this.show_pop_scale, this);
            var view = c_pop.getChildAt(1); //底层有rect,上层包装成一个group
            var oldx = view.scaleX;
            view.scaleX = view.scaleY = oldx / 2;
            egret.Tween.get(view).to({ "scaleX": oldx, "scaleY": oldx }, 100);
            if (c_pop.numChildren > 2) {
                ////console.warn("请将弹窗包装成两层结构");
            }
        };
        AppContainer.prototype.check_pop = function () {
            for (var k in this.popedView) {
                if (k != mx.XQSendGiftView.S_NAME || k != mx.ShopAlert.S_NAME) {
                    this.closePop(k);
                }
            }
        };
        AppContainer.prototype.showPop = function (data) {
            var name = data.name;
            switch (name) {
                case "ShouChongAlert":
                    this.check_pop();
                    break;
                case "FightView":
                    var view = this.popedView[name];
                    if (view) {
                        var facade = mx.ApplicationFacade.getInstance();
                        facade.sendNotification(mx.MX_NOTICE.FRESH_CPOP, data.param, name);
                        return;
                    }
                    break;
            }
            var c_class = egret.getDefinitionByName("mx." + name);
            if (c_class) {
                var c_pop = new c_class(data.param);
                this.popedView[name] = c_pop;
                c_pop.name = name;
                this.add_pop(c_pop, data);
            }
        };
        AppContainer.prototype.closePop = function (screenName) {
            var c_screen = this.popedView[screenName];
            if (c_screen) {
                mx.PreloadTool.getInstance().recover_group(screenName);
                delete this.popedView[screenName];
                this._pop_g.removeChild(c_screen);
                this.check_pop_screen_g();
                this.close_view(c_screen, screenName);
            }
        };
        AppContainer.prototype.check_pop_screen_g = function () {
            this._pop_g.touchChildren = true;
            if (!this._pop_g.numChildren) {
                this._screen_g.touchChildren = true;
            }
            else if (this._pop_g.numChildren == 1) {
                var pop = this._pop_g.getChildAt(0);
                if (pop.name == "HouGongSJView") {
                    this._screen_g.touchChildren = true;
                }
            }
        };
        AppContainer.prototype.close_view = function (c_screen, screenName) {
            c_screen.removeChildren();
            c_screen = null;
        };
        //----end----弹窗相关----end----
        //----start----场景相关----start----
        AppContainer.prototype.pre_screen = function (data, data2) {
            if (data) {
                if (mx.AppConfig.CURR_SCENE_ID == data) {
                    var c_screen = this._screen_g.getChildAt(0);
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, data2, data);
                    if (c_screen.fresh_screen) {
                        c_screen.fresh_screen(data2);
                        ////console.info("不在支持fresh_screen方法，请在mediator中监听FRESH_CSCREEN", data);
                    }
                    return;
                }
            }
            else {
                data = mx.AppConfig.PREV_SCENE_ID;
            }
            this._screen_g.touchChildren = this._pop_g.touchChildren = false;
            var cd = {
                "type": "screen",
                "name": data,
                "param": data2,
            };
            mx.PreloadTool.getInstance().mx_preload(cd);
        };
        AppContainer.prototype.enterScreen = function (data) {
            if (this._screen_g.numChildren) {
                var last_screen = this._screen_g.removeChildAt(0);
                this.close_view(last_screen, data.name);
                mx.PreloadTool.getInstance().recover_group(mx.AppConfig.CURR_SCENE_ID); //清理资源组
            }
            var newid = data.name;
            mx.AppConfig.PREV_SCENE_ID = mx.AppConfig.CURR_SCENE_ID;
            mx.AppConfig.CURR_SCENE_ID = newid;
            this.check_pop();
            var c_class = egret.getDefinitionByName("mx." + newid);
            if (c_class) {
                var screen_1 = new c_class(data.param);
                this._screen_g.addChild(screen_1);
            }
        };
        return AppContainer;
    }(eui.UILayer));
    mx.AppContainer = AppContainer;
    __reflect(AppContainer.prototype, "mx.AppContainer");
})(mx || (mx = {}));
//# sourceMappingURL=AppContainer.js.map
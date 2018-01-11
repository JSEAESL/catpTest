/**
*   @author wxw
*   @date 2017.11.14
*   @desc 约会界面
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
    var YueHuiScreen = (function (_super) {
        __extends(YueHuiScreen, _super);
        function YueHuiScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.guanxi = ["xllz1_png", "prxd1_png", "lqxy1_png"];
            _this.typenum = [0, 30, 50, 100];
            _this.yh_s = 0; //约会状态，1，2，3。
            return _this;
        }
        YueHuiScreen.mx_support = function () {
            return ["assets.teamyh", "api.HEROHOUGONG", "api.HERO", "api.XINGGE"];
        };
        YueHuiScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.YueHuiMediator(this));
            var eapi = mx.ApiTool.getAPI(mx.MX_APINAME.EQUIP);
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            this.cd = hProxy.get_chero_info();
            var chero = hProxy.get_chero_info(this.cd.id);
            var mid = chero.mid;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
            var api1 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", mid);
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", api.xingge);
            this.back_b.set_ssres("back_png");
            this.aiqingzhi_bar.set_res({ "up": "qmdbar_png", "down": "qmdbg_png" });
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_xsd_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yuehui_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.name_t.text = api1.hero_name;
            this.info_t.text = api1.Description;
            this.meili_t.text = api.charm;
            this.xingge_t.text = xg_api ? xg_api.xingge : "???";
            this.xuetong_t.text = mx.Lang.fzxt2[api.wenhua - 1];
            this.avatar.source = mx.Tools.get_mn_res(mid, "lh");
            this.nowlove = hProxy.initlove;
            this.zqmz = api.love;
            this.typenum[1] = Math.ceil(this.zqmz / 40) * 10;
            this.typenum[2] = Math.ceil(this.zqmz / 20) * 10;
            this.typenum[3] = this.zqmz;
            this.need1_t.text = mx.Tools.num2str(this.typenum[1]);
            this.need2_t.text = mx.Tools.num2str(this.typenum[2]);
            this.need3_t.text = mx.Tools.num2str(this.typenum[3]);
            this.aiqingzhi_bar.value = this.nowlove / this.zqmz * 100;
            if (this.nowlove == this.zqmz) {
                this.yuehui_b.set_ssres("srhgBTN_png");
            }
            this.aiqingzhi_t.text = this.nowlove + "/" + this.zqmz;
            mx.TweenTool.getInstance().breath_tween(this.avatar, true);
            for (var i = 1; i < 4; i++) {
                if (this.typenum[i] <= this.nowlove) {
                    this["xx" + i].source = "qmheart1_png";
                    this["guanxi" + i].source = this.guanxi[i - 1];
                    this.yh_s = i;
                }
            }
            this.fresh_xsd_num();
        };
        YueHuiScreen.prototype.fresh_xsd_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            this.xsdnum = hProxy.xsd_num;
            this.xsdnum_t.text = mx.Tools.num2str(this.xsdnum);
            var temp_text = mx.Lang.xiaohao;
            var a;
            for (var i = 1; i <= 3; i++) {
                if (this.typenum[i] - this.nowlove > 0) {
                    a = i;
                    break;
                }
            }
            if (this.typenum[3] == this.nowlove)
                a = 4;
            switch (a) {
                case 1:
                    this.xiaohao_t.text = temp_text + " " + (((this.typenum[1] - this.nowlove) / 10 - this.xsdnum) > 0 ? this.xsdnum : (this.typenum[1] - this.nowlove) / 10);
                    break;
                case 2:
                    this.xiaohao_t.text = temp_text + " " + (((this.typenum[2] - this.nowlove) / 10 - this.xsdnum) > 0 ? this.xsdnum : (this.typenum[2] - this.nowlove) / 10);
                    break;
                case 3:
                    this.xiaohao_t.text = temp_text + " " + (((this.typenum[3] - this.nowlove) / 10 - this.xsdnum) > 0 ? this.xsdnum : (this.typenum[3] - this.nowlove) / 10);
                    break;
                case 4:
                    this.xiaohao_t.text = temp_text + " " + "0";
                    break;
            }
        };
        YueHuiScreen.prototype.fresh_yuehui = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            this.nowlove = hProxy.love;
            this.aiqingzhi_bar.value = this.nowlove / this.zqmz * 100;
            this.aiqingzhi_t.text = this.nowlove + "/" + this.zqmz;
            if (this.nowlove == this.zqmz) {
                this.yuehui_b.set_ssres("srhgBTN_png");
            }
            var _loop_1 = function (i) {
                if (this_1.typenum[i] <= this_1.nowlove) {
                    this_1["xx" + i].source = "qmheart1_png";
                    this_1["guanxi" + i].source = this_1.guanxi[i - 1];
                    if (hProxy.initlove < this_1.typenum[i]) {
                        var view_1 = this_1;
                        this_1.shrink_tween(this_1["xx" + i]);
                        egret.setTimeout(function () {
                            view_1.openAVG(i);
                        }, this_1, 500);
                    }
                }
            };
            var this_1 = this;
            for (var i = 1; i < 4; i++) {
                _loop_1(i);
            }
            this.fresh_xsd_num();
        };
        YueHuiScreen.prototype.shrink_tween = function (image_p) {
            var w = image_p.width;
            var h = image_p.height;
            var ctween = egret.Tween.get(image_p, { "loop": true });
            var zw = w * 1.2;
            var zh = h * 1.2;
            var xw = w * 0.9;
            var xh = h * 0.9;
            ctween.to({ "height": zh, "width": zw }, 200)
                .to({ "height": xh, "width": xw }, 200);
        };
        YueHuiScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.yh_s = 0;
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_xsd_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yuehui_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.YueHuiMediator.NAME);
            egret.Tween.removeTweens(this.avatar);
            egret.Tween.removeTweens(this.xx1);
            egret.Tween.removeTweens(this.xx2);
            egret.Tween.removeTweens(this.xx3);
        };
        YueHuiScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHERO_INFO,
                        "id": this.cd.id,
                    });
                    break;
                case this.add_xsd_b://购买相思豆
                    var a_d = {
                        "param": {
                            "item": 3054,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case this.yuehui_b:
                    if (this.nowlove < this.zqmz) {
                        if (this.xsdnum > 0) {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_HERO_YUEHUI, "mid": this.cd.mid
                            });
                            this.yuehui_b.touchEnabled = false;
                            egret.setTimeout(function () {
                                this.yuehui_b.touchEnabled = true;
                            }, this, 500);
                        }
                        else {
                            var a_d_1 = {
                                "param": {
                                    "item": 3054,
                                }
                            };
                            var p_d_1 = { "name": mx.BuyAlertView.S_NAME, "param": a_d_1 };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d_1);
                        }
                    }
                    else {
                        // let hProxy: any = facade.retrieveProxy(HeroProxy.NAME);
                        // let cd: any = hProxy.get_chero_info();
                        // facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
                        //     "t": MX_NETS.CS_SHOURU,
                        //     "mid": this.cd.mid,
                        // });
                        var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                        var mid = hProxy.heroes[this.cd.id].mid;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HOUGONG_WEIFEN,
                            "mid": mid
                        });
                    }
                    break;
            }
        };
        //打开剧情弹窗
        YueHuiScreen.prototype.openAVG = function (id) {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var hero = hProxy.get_chero_info(this.cd.id);
            if (id) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AVGView.S_NAME,
                    "param": {
                        "cid": id,
                        "type": "lianai",
                        "mid": hero.mid,
                    },
                });
            }
        };
        YueHuiScreen.S_NAME = "YueHuiScreen";
        YueHuiScreen.M_NAME = "TeamScreen";
        return YueHuiScreen;
    }(mx.BasicView));
    mx.YueHuiScreen = YueHuiScreen;
    __reflect(YueHuiScreen.prototype, "mx.YueHuiScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YueHuiScreen.js.map
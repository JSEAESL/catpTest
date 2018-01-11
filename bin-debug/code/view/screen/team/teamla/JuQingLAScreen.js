/**
 * @cy/2016.9.13
 * 剧情恋爱界面
 */
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
    var JuQingLAScreen = (function (_super) {
        __extends(JuQingLAScreen, _super);
        function JuQingLAScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuQingLAScreen.mx_support = function () {
            return ["assets.teamla", "api.HEROHOUGONG", "api.WEIFENG"];
        };
        JuQingLAScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_yh_l1":
                    tar = this.juqing_list.getChildAt(0);
                    break;
                case "s_yh_l2":
                    tar = this.juqing_list.getChildAt(1);
                    break;
                case "s_yh_l3":
                    tar = this.juqing_list.getChildAt(2);
                    break;
                case "s_yh_hg"://收入后宫
                    tar = this.srhg_b;
                    break;
            }
            return tar;
        };
        JuQingLAScreen.prototype.init_view = function () {
            this.srhg_b.set_ssres("srhgong_png");
            this.qtjq_b.set_ssres("qtjqing_png");
            this.back_b.set_ssres("back_png");
            this.aiqingzhi_bar.set_res({ "up": "yhjdtiao_png", "down": "yhjddchen_png" });
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.srhg_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qtjq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.juqing_list.itemRenderer = mx.JuQingLARender;
            this.juqing_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_screen("init");
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JuQingLAMediator(this));
        };
        JuQingLAScreen.prototype.fresh_screen = function (data) {
            this.hg_s = 1;
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            this.cd = hProxy.yuehui;
            var chero = hProxy.get_chero_info(this.cd.id);
            var mid = chero.mid;
            this.avatar.source = mx.Tools.get_mn_res(mid, "lh");
            this.avatar.mask = new egret.Rectangle(0, 0, 480, 450);
            var api1 = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", mid);
            this.name_t.text = api1.hero_name;
            this.aqz = 0;
            var nums = { "1": 100, "2": 80, "3": 50, "4": 20 };
            var c_num = 80; //第一个默认开启
            var arr = [];
            var dian = true;
            for (var i = 0; i < 3; i++) {
                var jd = 0; //0:未解鎖
                var c_pj = Number(this.cd["point" + (i + 1)]);
                if (c_pj && nums[c_pj] >= 80) {
                    jd = 2; //2：有評分
                }
                else if (c_num >= 80) {
                    jd = 1; //1：沒有評分
                }
                c_num = nums[c_pj] || 0;
                if (i) {
                    dian = Number(this.cd["point" + i]) <= 2 && Number(this.cd["point" + i]) != 0;
                }
                arr.push({
                    "mid": mid,
                    "state": jd,
                    "pj": c_pj,
                    "fj": c_num,
                    "dian": dian,
                    "title": mx.Tools.format(mx.Lang.h0065, api1.hero_name, "" + (i + 1))
                });
                this.aqz += c_num;
            }
            this.juqing_list.dataProvider = new eui.ArrayCollection(arr);
            this.aiqingzhi_bar.value = this.aqz / 300 * 100;
            this.aiqingzhi_t.text = this.aqz + "/300";
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
            var love_need = api ? api.love || 80 : 80;
            var str = mx.Tools.format(mx.Lang.h0046, love_need);
            this.aqzneed_t.text = str;
            switch (this.cd.status.toString()) {
                case "0": //爱情中
                case "3"://破镜重圆后难度增加
                    this.yrhg_b.visible = false;
                    this.srhg_b.visible = true;
                    if (this.aqz < love_need) {
                        mx.Tools.mx_grayfy(this.srhg_b);
                    }
                    else {
                        this.hg_s = 2;
                        mx.Tools.mx_grayfy(this.srhg_b, true);
                    }
                    break;
                case "1"://已收入后宫
                    this.hg_s = 3;
                    this.yrhg_b.visible = true;
                    this.srhg_b.visible = false;
                    break;
            }
            if (mx.MX_COMMON.IN_GUIDE && !data) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
        };
        JuQingLAScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.srhg_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qtjq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.juqing_list.dataProvider = null;
            this.juqing_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JuQingLAMediator.NAME);
        };
        JuQingLAScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHERO_INFO,
                        "id": this.cd.id,
                    });
                    break;
                case this.srhg_b:
                    var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                    var chero = hProxy.get_chero_info(this.cd.id);
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", chero.mid);
                    var love_need = api ? Number(api.love) || 80 : 80;
                    if (this.aqz >= love_need) {
                        var mid = hProxy.heroes[this.cd.id].mid;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HOUGONG_WEIFEN,
                            "mid": mid
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0047 });
                    }
                    break;
                case this.qtjq_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_ALL_JUQING
                    });
                    break;
            }
        };
        //打开剧情弹窗
        JuQingLAScreen.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var hero = hProxy.get_chero_info(this.cd.id);
            if (e.item.dian) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AVGView.S_NAME,
                    "param": {
                        "cid": 1 + e.itemIndex,
                        "type": "lianai",
                        "mid": hero.mid,
                    },
                });
            }
        };
        JuQingLAScreen.S_NAME = "JuQingLAScreen";
        JuQingLAScreen.M_NAME = "TeamScreen";
        return JuQingLAScreen;
    }(mx.BasicView));
    mx.JuQingLAScreen = JuQingLAScreen;
    __reflect(JuQingLAScreen.prototype, "mx.JuQingLAScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JuQingLAScreen.js.map
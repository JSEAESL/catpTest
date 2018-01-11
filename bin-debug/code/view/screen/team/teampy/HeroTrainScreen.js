/**
*   @author mx
*   @date 2015.1.3
*   @desc 美男培养主界面
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
    var HeroTrainScreen = (function (_super) {
        __extends(HeroTrainScreen, _super);
        function HeroTrainScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeroTrainScreen.mx_support = function () {
            return ["assets.teampy", "api.EQUIP", "api.HEROFATE", "api.EQUIPOBTAIN", "api.STAGE", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.STARADD", "api.QUALITYADD"];
        };
        HeroTrainScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_py_zb"://装备
                    tar = this.fun_list.getChildAt(1);
                    break;
                case "s_py_yh"://美男培养，约会
                    tar = this.fun_list.getChildAt(4);
                    break;
                case "s_py_fh"://返回
                    tar = this.back_b;
                    break;
                case "s_py_jn"://技能
                    tar = this.fun_list.getChildAt(2);
                    break;
                case "s_py_tp"://突破
                    tar = this.fun_list.getChildAt(3);
                    break;
            }
            return tar;
        };
        HeroTrainScreen.prototype.init_view = function () {
            this.aid_arr = [0, 1, 2];
            this.fresh_screen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeroTrainMediator(this));
        };
        HeroTrainScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            for (var i = 0; i < 3; i++) {
                var c_g = view["avatar" + i];
                var avatar = view.getChildAt(0);
                egret.Tween.removeTweens(c_g);
                egret.Tween.removeTweens(avatar);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroTrainMediator.NAME);
        };
        HeroTrainScreen.prototype.fresh_screen = function (fresh) {
            this.move_mode = false;
            var view = this;
            var hProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            var cd = hProxy.get_chero_info();
            var mid_arr = [hProxy.next_hero_mid(-1), cd.mid, hProxy.next_hero_mid(1)]; //三個形象
            for (var i = 0; i < 3; i++) {
                var aid = this.aid_arr[i];
                var c_g = view["avatar" + aid];
                egret.Tween.removeTweens(c_g);
                var str = mx.Tools.get_mn_res(mid_arr[i], "lh");
                var res = RES.getRes(str);
                if (res) {
                    this.show_ani(c_g.getChildAt(0), res);
                }
                else {
                    RES.getResAsync(str, this["show_ani" + aid], this);
                }
            }
            this.fresh_info(cd);
            this.fresh_view();
            this.fresh_list();
        };
        HeroTrainScreen.prototype.move_apos = function (n) {
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
        HeroTrainScreen.prototype.reset_mode = function (data) {
            var hProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            hProxy.fresh_hero(data);
            if (data < 0) {
                var rid = this.aid_arr[2]; //右侧直接放到左侧。
                var ravatar = this["avatar" + rid];
                ravatar.x = -786;
                this.aid_arr.unshift(this.aid_arr.pop());
            }
            else {
                var lid = this.aid_arr[0]; //左侧放到右侧。
                var lavatar = this["avatar" + lid];
                lavatar.x = 786;
                this.aid_arr.push(this.aid_arr.shift());
            }
            this.ef_g.touchEnabled = true;
            this.ef_g.touchEnabled = true; //放大镜
            this.back_b.touchEnabled = true; //返回
            this.left_b.touchEnabled = true; //向左翻页
            this.right_b.touchEnabled = true; //向右翻页
            this.fun_list.touchEnabled = true; //底部菜单
            this.fun_list.touchChildren = true;
        };
        HeroTrainScreen.prototype.reset_apos = function (n) {
            if (this.move_mode) {
                return;
            }
            var view = this;
            if (n == 0) {
                var pos = [-786, 0, 786];
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
                var dx = 786 - mavatar.x;
                egret.Tween.get(mavatar).to({ "x": 786 }, dx * mx.MX_COMMON.MX_SPERDIS)
                    .call(this.reset_mode, this, [-1]);
                var lid = this.aid_arr[0]; //左侧滑到中间。
                var lavatar = view["avatar" + lid];
                egret.Tween.get(lavatar).to({ "x": 0 }, dx * mx.MX_COMMON.MX_SPERDIS);
                var rid = this.aid_arr[2]; //右侧
                var ravatar = view["avatar" + rid];
                ravatar.x = -786;
            }
            else {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到左边
                var mavatar = view["avatar" + mid];
                var dx = 786 + mavatar.x;
                egret.Tween.get(mavatar).to({ "x": -786 }, dx * mx.MX_COMMON.MX_SPERDIS)
                    .call(this.reset_mode, this, [1]);
                var rid = this.aid_arr[2]; //右侧滑到中间。
                var ravatar = view["avatar" + rid];
                egret.Tween.get(ravatar).to({ "x": 0 }, dx * mx.MX_COMMON.MX_SPERDIS);
                var lid = this.aid_arr[0]; //左侧
                var lavatar = view["avatar" + lid];
                lavatar.x = 786;
            }
        };
        HeroTrainScreen.prototype.fresh_info = function (cd) {
            var view = this;
            var hero_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
            switch (hero_base.HeroType) {
                case "STRENGTH"://守御
                    view.type.text = mx.Lang.h0068[2];
                    break;
                case "AGILITY"://攻击
                    view.type.text = mx.Lang.h0068[0];
                    break;
                case "INTELLIGENCE"://辅助
                    view.type.text = mx.Lang.h0068[1];
                    break;
            }
            //资质
            switch (hero_base.Talent) {
                case 1://普通
                    view.talent.text = mx.Lang.xy00001[0];
                    break;
                case 2://优秀
                    view.talent.text = mx.Lang.xy00001[1];
                    break;
                case 3://珍稀
                    view.talent.text = mx.Lang.xy00001[2];
                    break;
            }
        };
        HeroTrainScreen.prototype.show_ani2 = function (e) {
            var view = this.avatar2.getChildAt(0);
            this.show_ani(view, e);
        };
        HeroTrainScreen.prototype.show_ani1 = function (e) {
            var view = this.avatar1.getChildAt(0);
            this.show_ani(view, e);
        };
        HeroTrainScreen.prototype.show_ani0 = function (e) {
            var view = this.avatar0.getChildAt(0);
            this.show_ani(view, e);
        };
        HeroTrainScreen.prototype.show_ani = function (view, e) {
            view.height = e.textureHeight;
            if (view.source == e) {
                return;
            }
            egret.Tween.removeTweens(view);
            view.source = e;
            mx.TweenTool.getInstance().breath_tween(view);
        };
        HeroTrainScreen.prototype.fresh_view = function () {
            var view = this;
            var hProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            var cd = hProxy.get_chero_info();
            view.zl_t.text = "" + mx.FightTools.cal_fight_power(cd);
            if (hProxy.teams[1]) {
                if (hProxy.teams[1].indexOf(cd.id) > -1 || hProxy.teams[1].indexOf(Number(cd.id)) > -1) {
                    hProxy.cal_chuzhan_zhanli();
                }
            }
            view.lv_t.text = "" + cd.level;
            //品质相关
            var quality = Number(cd.quality);
            var color = mx.Tools.cal_quality_cor(quality);
            this.pinzhi_t.textColor = color;
            var hero_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
            this.pinzhi_t.text = hero_base.hero_name + mx.Lang.j0024[quality - 1];
            var param = {
                'num': cd.star,
                "total": mx.MX_COMMON.HP_LEVEL,
                'res': 'mrpyxx',
                'gap': (180 - mx.MX_COMMON.HP_LEVEL * 24) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.HorizontalAlign.LEFT
            };
            view.pzx.init_multiui(param);
            var info = mx.FightTools.cal_hero_prop(cd);
            var shuxing = mx.Lang.h0083;
            var str = [];
            var style2 = { "size": 22, "textColor": 0x815b50, };
            var style3 = { "size": 22, "textColor": 0x72ad1c, };
            for (var k in shuxing) {
                var t = info[shuxing[k]] || "0";
                var temp = t.split("+");
                if (temp.length > 1) {
                    str.push({ text: temp[0], style: style2 }, { text: " +" + temp[1] + "\n", style: style3 });
                }
                else {
                    str.push({ text: temp[0] + "\n", style: style2 });
                }
            }
            this.xx_t.textFlow = str;
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
        };
        HeroTrainScreen.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var obj = {
                "sj": { "bg": "sj_png" },
                //"zb": { "bg": "zb_png", "ts": false },//装备
                "hp": { "bg": "hp_png", "ts": false },
                "jn": { "bg": "jn_png", "ts": false },
            };
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var cd = hProxy.get_chero_info();
            // switch (Number(cd.la)) {
            //    case 0://恋爱中
            //     case 3://已使用过破镜重圆
            //         this.engagementcondition_p.set_ssres("la_png");
            //         this.engagementcondition_p.label="la_png";
            //         break;
            //     case 1://后宫玩法
            //         this.engagementcondition_p.set_ssres("yrhg_png");
            //             this.engagementcondition_p.label="yrhg_png";
            //         break;
            //     case 2://情缘尽，购买破镜重圆。
            //         this.engagementcondition_p.set_ssres("pjcy_png");
            //                    this.engagementcondition_p.label="pjcy_png";
            //         break;
            // }
            // if(cd.mid == 55 || cd.mid == 56 || cd.mid == 57){
            //     //obj.la.bg = "yhzwkqi_png";//暂未开放
            //     this.engagementcondition_p.set_ssres("yhzwkqi_png");
            //     this.engagementcondition_p.label="yhzwkqi_png";
            // }
            this.engagementcondition_p.set_ssres("syzshi_png"); //首页展示
            this.engagementcondition_p.label = "syzshi_png";
            var ef = cd.ef;
            // if (ef[0]) {//是否有可穿戴装备
            //     obj.zb.ts = true;
            // }
            if (ef[1]) {
                obj.jn.ts = true;
            }
            if (ef[2]) {
                obj.hp.ts = true;
            }
            // if (ef[3]) {//是否可升星
            //     obj.jiuzi.ts = true;
            // }
            this.fun_list.dataProvider = new eui.ArrayCollection(mx.Tools.obj2arr(obj));
        };
        HeroTrainScreen.S_NAME = "HeroTrainScreen";
        HeroTrainScreen.M_NAME = "TeamScreen";
        return HeroTrainScreen;
    }(mx.BasicView));
    mx.HeroTrainScreen = HeroTrainScreen;
    __reflect(HeroTrainScreen.prototype, "mx.HeroTrainScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HeroTrainScreen.js.map
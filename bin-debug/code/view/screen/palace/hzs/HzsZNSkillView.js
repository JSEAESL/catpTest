/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 皇子所子女技能
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
    var HzsZNSkillView = (function (_super) {
        __extends(HzsZNSkillView, _super);
        function HzsZNSkillView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.daishu = 0;
            _this.wenhua = 1;
            _this.info_arr = {
                "fenghao": "sfen_png",
                // "xuetong": "znxuetong_png",//血统
                "muzu": "",
            };
            return _this;
        }
        HzsZNSkillView.mx_support = function () {
            return ["assets.palace_hzsuo_skill", "api.HEROXUETONG", "api.HEROHOUGONG", "api.RONGMAO", "api.XIHAO"];
        };
        //专属种族及技能
        // private zsjn_g:eui.Group;
        // private zsjn_t: eui.Label;
        // private zsjn_desc: eui.Label;
        // private caiyi_list: eui.List;
        // private caiyi_arr: any = [
        //     "znchayi_png", "znqiyi_png",     //茶，棋
        //     "znqinyi_png", "znwudao_png",    //琴，舞
        //     "znshejian_png", "znjianshu_png",//射，剑
        //     "znxunshou_png", "znmashu_png",  //驯，马
        //     "znshifu_png", "znshufa_png",    //诗，书
        //     "znzhusuan_png", "zntianwen_png",//算，天
        // ];
        // private caiyi_desc: any = ["znbuhui_png", "znrumen_png", "znshulian_png", "znjingtong_png", "znzongshi_png",]//不会，入门，熟练，精通，宗师
        // private num_color: any = [0x9588B9, 0x6AA845, 0xFF4B4B, 0x307CD4, 0xD3950D]
        HzsZNSkillView.prototype.init_view_by_type = function () {
            var view = this;
            var cd = this.adata;
            //背景
            // let whq = Tools.get_fz_whq(cd);
            // let bg = "";
            // switch (whq) {
            //     case 5://人鱼
            //         bg = "znjnryu_png";
            //         break;
            //     case 7://鬼族
            //         bg = "znjngzu_png";
            //         break;
            //     case 11://天使
            //         bg = "znjntshi_png";
            //         break;
            //     case 12://吸血鬼
            //         bg = "znjnxxgui_png";
            //         break;
            //     default://狐妖、中原
            //         bg = "znjndefault_png";
            //         break;
            // }
            // // view.mn_bg.source = bg;
            //头像
            var state = Number(cd.zhuangtai);
            if (typeof cd.mid == 'undefined' || (Number(cd.mid) >= 1000) || (Number(cd.mid) == 308 && cd.huapi != "")) {
                this.get_mnres(mx.Tools.get_bb_res("lh", state, cd.avatar, cd.meili));
            }
            else {
                this.get_mnres(mx.Tools.get_mn_res(cd.mid, "lh"));
            }
            if (cd.mid >= 900 && cd.ren_lian && cd.ren_lian != "") {
                mx.Tools.url_image(cd.ren_lian, null, this.get_mnres, this);
            }
            //列传
            /*
            1.判断子女的宗族。显示为：{8}之子/女（需要判定子女性别）
            2.判断容貌。
            3.性格判断。根据性格调用评价关键词pingjia中的keyword。显示为：为人XXXX
            4.爱好判定。喜好从以下几个喜好中随机。
            */
            //名字
            var name = cd.name == "" ? (mx.Tools.num2chinese(cd.paiwei) + (cd.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04)) : cd.name;
            view.name_t.text = name;
            var xuetong = mx.Tools.get_xuetong_info(cd);
            view.xuetong_t.text = xuetong.str;
            view.wenhua = xuetong.wenhua;
            view.daishu = xuetong.daishu;
            var namecolor = 0x4C416A;
            if (state >= 2 || typeof state == 'undefined') {
                namecolor = mx.Tools.num2color(cd.meili);
            }
            var desc_arr = [
                { "text": name, "style": { "textColor": namecolor } },
                { "text": "，", "style": { "textColor": 0x4C416A } }
            ];
            if (typeof cd.mid == 'undefined' || Number(cd.mid) >= 1000) {
                //1.判断子女的宗族。显示为：{8}之子/女（需要判定子女性别）
                desc_arr.push({ "text": this.muzu.name, "style": { "textColor": 0xFF0000 } });
                desc_arr.push({ "text": Number(cd.sex) == 1 ? mx.Lang.hzs78 : mx.Lang.hzs77, "style": { "textColor": 0x4C416A } });
                if (state >= 2 || !state) {
                    var id = this.get_mili_id(cd.meili);
                    var rongmao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.RONGMAO, "id", id);
                    desc_arr.push({ "text": (Number(cd.sex) == 1 ? rongmao_api.desc_2 : rongmao_api.desc_1) + "，", "style": { "textColor": 0x4C416A } });
                    //3.性格判断。根据性格调用评价关键词pingjia中的keyword。显示为：为人XXXX
                    var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", cd.xingge);
                    desc_arr.push({ "text": mx.Lang.hzs79 + (xg_api ? xg_api.xingge : "???") + "，", "style": { "textColor": 0x4C416A } });
                    //4.爱好判定。喜好从以下几个喜好中随机。
                    var aihao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XIHAO, "id", cd.xihao);
                    desc_arr.push({ "text": mx.Lang.hzs80 + aihao_api.xihao + "。", "style": { "textColor": 0x4C416A } });
                }
            }
            else {
                //1.出身
                var mn_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", cd.mid);
                if (!mn_api) {
                    var xi_hao = mx.ApiTool.getAPINode(mx.MX_APINAME.XIHAO, "id", cd.xihao);
                    mn_api = {
                        "chushen": mx.Lang.zssj,
                        "xingge": cd.xingge,
                        "xihao": xi_hao.xihao
                    };
                }
                desc_arr.push({ "text": mn_api.chushen + "，", "style": { "textColor": 0x4C416A } });
                //2.判断容貌。
                var id = this.get_mili_id(cd.meili);
                var rongmao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.RONGMAO, "id", id);
                desc_arr.push({ "text": (Number(cd.sex) == 1 ? rongmao_api.desc_2 : rongmao_api.desc_1) + "，", "style": { "textColor": 0x4C416A } });
                //3.性格判断。根据性格调用评价关键词pingjia中的keyword。显示为：为人XXXX
                var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", mn_api.xingge);
                desc_arr.push({ "text": mx.Lang.hzs79 + (xg_api ? xg_api.xingge : "???") + "，", "style": { "textColor": 0x4C416A } });
                //4.爱好判定。喜好从以下几个喜好中随机。
                desc_arr.push({ "text": mx.Lang.hzs80 + mn_api.xihao + "。", "style": { "textColor": 0x4C416A } });
            }
            this.desc_t.textFlow = desc_arr;
            //信息
            var info_arr = [];
            for (var k in this.info_arr) {
                var key = void 0;
                var val = void 0;
                switch (k) {
                    case "muzu":
                        if (this.muzu) {
                            key = this.muzu.sex == 1 ? "smu_png" : "sfu_png";
                            val = this.muzu.name;
                        }
                        break;
                    // case "xuetong":
                    //     key = this.info_arr[k];
                    //     val = Tools.get_xuetong_info(cd).str;
                    //     break;
                    case "fenghao":
                        key = this.info_arr[k];
                        if (!cd.mid || Number(cd.mid) >= 1000) {
                            if (cd.fenghao) {
                                val = cd.fenghao;
                            }
                            else if (cd.paiwei) {
                                val = mx.Tools.num2chinese(cd.paiwei) + (Number(cd.sex) == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04);
                            }
                            else if (cd.chushen) {
                                val = cd.chushen;
                            }
                        }
                        else {
                            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", cd.mid);
                            val = api2 ? api2.chushen : mx.Lang.zssj;
                        }
                        break;
                    case "meili":
                        if (state == -1 || state >= 2) {
                            key = this.info_arr[k];
                            val = cd[k];
                        }
                        break;
                }
                if (key) {
                    info_arr.push({ "key": key, "val": val });
                }
            }
            ////console.log(info_arr)
            this.info_list.dataProvider = new eui.ArrayCollection(info_arr);
            //技能
            var skill_arr = [];
            for (var i in cd.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(cd.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.skill[i]);
                    name_1 = api.name;
                    desc = api.desc;
                }
                skill_arr.push({
                    "key": "znjn" + (Number(i) + 1) + "_png",
                    "name": name_1,
                    "namecolor": name_1 == mx.Lang.hzs75 ? 0xAC9EB4 : 0x9766B5,
                    "desc": desc,
                });
            }
            if (!cd.skill) {
                for (var i = 0; i < 2; i++) {
                    skill_arr.push({
                        "key": "znjn" + (Number(i) + 1) + "_png",
                        "name": mx.Lang.wu,
                        "namecolor": name == mx.Lang.hzs75 ? 0xAC9EB4 : 0x9766B5,
                        "desc": mx.Lang.wu,
                    });
                }
            }
            if (skill_arr.length) {
                view.skill_list.dataProvider = new eui.ArrayCollection(skill_arr);
            }
            else {
                this.jn_g.removeChildAt(0);
            }
            //专属技能
            // let zsjn;
            // if (cd.daishu) {
            //     let xuetong = cd.daishu.split("_");
            //     let index = xuetong[1];
            //     if (index <= 3) {
            //         zsjn = ApiTool.getAPINode(MX_APINAME.HEROXUETONG, "daishu_id", xuetong[0]);
            //     }
            // } else {
            //     zsjn = ApiTool.getAPINode(MX_APINAME.HEROXUETONG, "h_id", cd.mid);
            // }
            /*
            switch (Number(cd.mid)) {
                case 308://鬼族
                    lang = Lang.zsjn01;
                    break;
                case 309://鬼族
                    lang = Lang.zsjn02;
                    break;
                case 303://人鱼
                    lang = Lang.zsjn03;
                    break;
                case 304://狐妖
                case 305://狐妖
                case 306://狐妖
                case 307://狐妖
                    lang = Lang.zsjn04;
                    break;
                case 42://亚瑟
                    lang = Lang.zsjn05;
                    break;
                case 55://百花仙子
                    lang = Lang.zsjn06;
                    break;
                case 56://林中仙
                    lang = Lang.zsjn07;
                    break;
                case 57://吸血鬼
                    lang = Lang.zsjn08;
                    break;
                default:
                    if (cd.daishu) {
                        let xuetong = cd.daishu.split("_");
                        let index = xuetong[1];
                        if (index >= 4) {
                            break;
                        }
                        let daishu = Tools.n2s_2(xuetong[0], 2);
                        lang = Lang["zsjn" + daishu];
                    }
                    break;
            }
            */
            // if (zsjn && zsjn.desc) {//zsjn.desc天使、恶魔没有专属技能
            //     this.zsjn_t.text = "【" + zsjn.note + "】";
            //     this.zsjn_desc.text = zsjn.desc;
            //     this.zsjn_t.textColor = 0x9766B5;
            //     this.zsjn_desc.textColor = 0x9588B9;
            // } else {
            //     //this.jn_g.removeChildAt(1);
            //     this.jn_g.removeChild(this.zsjn_g)
            //     if (!this.jn_g.numChildren) {//既没有技能也没有专属技能，移除“技能”部分
            //         this.c_g.removeChildAt(0);
            //     }
            // }
            //才艺
            // let caiyi_arr = [];
            // for (var i in this.caiyi_arr) {
            //     caiyi_arr.push({
            //         "type": i,
            //         "key": this.caiyi_arr[i],
            //         "num": 0,
            //         "numcolor": this.num_color[0],
            //         "desc": this.caiyi_desc[0],
            //     })
            // }
            // if (!cd.mid || Number(cd.mid) >= 1000) {
            //     let type = Number(cd.caiyi_type);
            //     if (type) {
            //         let num = Number(cd.caiyi_num);
            //         let xin = Math.min(Math.floor(num / 50), 4);
            //         caiyi_arr[type - 1].num = num;
            //         caiyi_arr[type - 1].numcolor = this.num_color[xin];
            //         caiyi_arr[type - 1].desc = this.caiyi_desc[xin];
            //     }
            // } else {
            //     for (var j = 1; j <= 2; j++) {//侍从妃子有2个才艺
            //         let type = Number(cd["caiyi" + j + "_type"]);//才艺类型
            //         if (type) {
            //             let num = Number(cd["caiyi" + j + "_num"]);//才艺值
            //             let xin = Math.min(Math.floor(num / 50), 4);
            //             caiyi_arr[type - 1].num = num;
            //             caiyi_arr[type - 1].numcolor = this.num_color[xin];
            //             caiyi_arr[type - 1].desc = this.caiyi_desc[xin];
            //         }
            //     }
            // }
            // this.caiyi_list.dataProvider = new eui.ArrayCollection(caiyi_arr);
            this.xuetong_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xuetong_click, this);
        };
        HzsZNSkillView.prototype.xuetong_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.xuetong_g:
                    var target = this.xuetong_g;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "blood",
                        "wenhua": this.wenhua,
                        "daishu": this.daishu,
                    });
                    break;
            }
        };
        Object.defineProperty(HzsZNSkillView.prototype, "muzu", {
            get: function () {
                if (this.adata.muzu) {
                    var m = this.adata.muzu.split('|');
                    var name_2 = m[0];
                    var sex = Number(m[1]);
                    return { "sex": sex, "name": name_2 };
                }
                else if (this.adata.zongzu) {
                    return { "sex": 1, "name": "黄|小姐" };
                }
                else {
                    return { "sex": 0, "name": mx.Lang.wu };
                }
            },
            enumerable: true,
            configurable: true
        });
        HzsZNSkillView.prototype.get_mnres = function (td) {
            var view = this.mn_tx;
            if (view && td) {
                view.source = td;
            }
        };
        HzsZNSkillView.prototype.get_mili_id = function (mli) {
            var id;
            mli = Math.min(mli, 108);
            if (mli < 40) {
                id = 1;
            }
            else if (mli < 60) {
                id = 2;
            }
            else {
                id = Math.floor((Number(mli) - 60) / 10) + 3;
            }
            return id;
        };
        HzsZNSkillView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            this.xuetong_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xuetong_click, this);
            view.skill_list.dataProvider = null;
        };
        HzsZNSkillView.S_NAME = "HzsZNSkillView";
        return HzsZNSkillView;
    }(mx.AlertView));
    mx.HzsZNSkillView = HzsZNSkillView;
    __reflect(HzsZNSkillView.prototype, "mx.HzsZNSkillView");
})(mx || (mx = {}));
//# sourceMappingURL=HzsZNSkillView.js.map
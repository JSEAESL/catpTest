/**
*   @author mx qianjun
*   @date 2015.1.3
*   @desc 养心殿妃嫔子女列表
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
    var YXDChildScreen = (function (_super) {
        __extends(YXDChildScreen, _super);
        function YXDChildScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YXDChildScreen.mx_support = function () {
            return ["assets.palace_yxdzn"];
        };
        //子女状态-1去世0婴儿1幼儿2成年3出嫁4和亲给内务府5打入教坊司6:被掠夺7：教坊司中死亡8：掠夺处死，9：囚凤宫
        YXDChildScreen.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //this.tag_list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.tag_click,this);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn;
            switch (mx.AppConfig.PREV_SCENE_ID) {
                case mx.HzHudongScreen.S_NAME:
                    c_mn = pproxy.cur_zn_info;
                    break;
                case mx.YXDFzScreen.S_NAME:
                    c_mn = pproxy.get_curr_mn();
                    break;
                case mx.XGSQueen.S_NAME:
                    var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
                    c_mn = xproxy.get_object();
                    break;
            }
            this.name_t.text = mx.Tools.format(mx.Lang.hg020, c_mn.name);
            if (c_mn.name == "") {
                this.name_t.text = mx.Tools.format(mx.Lang.hg020, mx.Tools.num2chinese(c_mn.paiwei) + (c_mn.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04));
            }
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var user_sex = gproxy.user_sex; //1女2男
            var arr = [];
            var zinv = pproxy.zinv; //proxy数据
            for (var k in zinv) {
                var cd = zinv[k] || {};
                if (cd) {
                    var muzu = void 0;
                    var fuzu = void 0;
                    if (user_sex == 1) {
                        muzu = gproxy.user_name;
                        fuzu = cd.muzu.split("|")[0];
                        if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                            muzu = pproxy.cur_zn_info.hunpei;
                        }
                    }
                    else {
                        fuzu = gproxy.user_name;
                        muzu = cd.muzu.split("|")[0];
                        if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                            fuzu = pproxy.cur_zn_info.hunpei;
                        }
                    }
                    var shuzi = mx.Tools.num2chinese(cd.paiwei);
                    var weifen = Number(cd.sex) == 1 ? shuzi + mx.Lang.hzs04 : shuzi + mx.Lang.hzs03;
                    var mlz = cd.meili;
                    var namecolor = mx.Tools.num2color(mlz);
                    var hunpei = cd.hunpei || mx.Lang.wu;
                    var state = Number(cd.zhuangtai);
                    var avatar = mx.Tools.get_bb_res('tx', state, cd.avatar);
                    var zt = mx.Tools.status_to_str(state, "hz");
                    var status_color = 0xa47374; //成年、出嫁、和亲、教坊司、健康
                    switch (state) {
                        case 4://和亲给内务府
                            var str = cd.sex == 1 ? mx.Lang.hzs46 + mx.Lang.hgnw7 : mx.Lang.hzs46 + mx.Lang.hgnw5;
                            hunpei = cd.hunpei + str;
                            break;
                        case -1: //死亡
                        case 7: //在教坊司中死亡
                        case 8://掠夺处死
                            status_color = 0xa2a2a2;
                            break;
                        case 0://嬰兒
                            status_color = 0xfe78aa;
                            namecolor = 0xa04f50;
                            mlz = "???";
                            break;
                        case 1://幼兒
                            status_color = 0xfe78aa;
                            namecolor = 0xa04f50;
                            mlz = "???";
                            break;
                    }
                    var flow = [];
                    if (Number(cd.zhuangtai) != 3) {
                        flow.push({
                            "text": zt,
                            "style": { "textColor": status_color }
                        });
                    }
                    else {
                        var status_1 = String(cd.status).split("|");
                        if (status_1.length == 1) {
                            flow.push({
                                "text": mx.Tools.status_to_str(Number(cd.status), "fz"),
                                "style": { "textColor": mx.Tools.num2color(Number(cd.status), true) }
                            });
                            if (Number(cd.sb_level)) {
                                flow = [{ "text": mx.Lang.ysjj, "style": { "underline": true, "textColor": mx.Tools.num2color(1, true) } }];
                            }
                        }
                        else {
                            var temp = ["2", "3", "4", "1", "6"]; //孕病撤牌
                            for (var k_1 in temp) {
                                if (status_1.indexOf(temp[k_1]) >= 0) {
                                    flow.push({
                                        "text": mx.Tools.status_to_str(Number(temp[k_1]), "fz"),
                                        "style": { "textColor": mx.Tools.num2color(temp[k_1], true) }
                                    });
                                    flow.push({
                                        "text": " / ",
                                        "style": { "textColor": 0xbdb2b4 }
                                    });
                                }
                            }
                            flow.splice(flow.length - 1, 1);
                        }
                    }
                    var tag_arr = [];
                    var tag = void 0;
                    var type = void 0;
                    switch (cd.sisheng) {
                        case "0":
                            tag = "qsz_png";
                            type = 1;
                            break;
                        case Main.USER_ID:
                            tag = "ssz_png";
                            type = 2;
                            break;
                        default://既不是亲生，也不是私生，即为野孩子（相国寺中不收录野孩子）
                            tag = "yzz_png";
                            type = 3;
                            break;
                    }
                    if (tag) {
                        tag_arr.push({
                            "tag": tag,
                            "type": type
                        });
                    }
                    if (cd.zhuan == 1 || cd.zhuan == 3) {
                        tag_arr.push({
                            "tag": "zsbqian_png",
                            "type": 4
                        });
                    }
                    arr.push({
                        "id": cd.id || 0,
                        "ml": mlz,
                        "hname": cd.name || mx.Lang.hg023,
                        "ncolor": namecolor,
                        "pw": weifen,
                        "fh": cd.fenghao || mx.Lang.wu,
                        "mz": muzu,
                        "fz": fuzu,
                        "hunpei": hunpei,
                        "sr": mx.Tools.format_time(cd.shengri, "nyr").substr(2),
                        "zhuangtai": flow,
                        "state": cd.zhuangtai,
                        "zt": zt,
                        "zcolor": status_color,
                        "tx": avatar,
                        "sex": cd.sex,
                        "sisheng": cd.sisheng,
                        "avatar": cd.avatar,
                        "info": cd,
                        "tag": new eui.ArrayCollection(tag_arr)
                    });
                }
            }
            this.all_list.dataProvider = new eui.ArrayCollection(arr);
            this.all_list.itemRenderer = mx.YXDChildRender;
            if (!arr.length) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME, "param": {
                        "shijian": {
                            'msg_id': 201,
                            "name": c_mn.name == "" ? mx.Tools.num2chinese(c_mn.paiwei) + (c_mn.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04) : c_mn.name,
                            "meili": c_mn.meili,
                        }
                    }
                });
            }
        };
        YXDChildScreen.prototype.btn_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.AppConfig.PREV_SCENE_ID);
        };
        YXDChildScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.all_list.dataProvider = null;
        };
        YXDChildScreen.S_NAME = "YXDChildScreen";
        return YXDChildScreen;
    }(mx.BasicView));
    mx.YXDChildScreen = YXDChildScreen;
    __reflect(YXDChildScreen.prototype, "mx.YXDChildScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YXDChildScreen.js.map
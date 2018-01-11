/**
 *   @author cy
 *   @date 2016.11.7
 *   @desc 后宫事件
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
    var HouGongSJView = (function (_super) {
        __extends(HouGongSJView, _super);
        function HouGongSJView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HouGongSJView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_sj_hz"://选皇子
                    var cd = this.adata.shijian;
                    var msg = Number(cd.msg_id);
                    if (msg == 1) {
                        tar = this.btn_list.getChildAt(1);
                    }
                    else {
                        tar = this.btn_list.getChildAt(0);
                        tar.width = 110;
                        tar.height = 42;
                    }
                    break;
                case "v_hg_hzcs":
                    tar = this.btn_list;
                    break;
            }
            return tar;
        };
        HouGongSJView.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HGongSJMediator(this));
            this.btn_list.itemRenderer = mx.SSButtonRender;
            this.btn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.check_shijian, this);
            this.fresh_pop(this.adata);
        };
        HouGongSJView.prototype.fresh_pop = function (data) {
            this.remove_tween();
            this.adata = data;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var cd = this.adata.shijian;
            var msg = Number(cd.msg_id);
            var c_data = pproxy.get_curr_mn(cd.id);
            if (c_data && cd.id) {
                if (c_data.jia && msg != 8 && msg != 3 && msg != 4) {
                    return;
                }
            }
            var t_arr = [];
            var str;
            var str2 = "";
            var weifen;
            var api, xinxi, temp, lang, temp_str;
            switch (msg) {
                case 1://1难产
                    this.xdz_p.source = "xdzi-huang_png";
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg027, weifen, c_data.name);
                    t_arr = [
                        { "bg": "bpfei_png" },
                        { "bg": "bhsi_png" }
                    ];
                    break;
                case 2://2怀孕
                    this.xdz_p.source = "xdzi-xiao_png";
                    if (!c_data) {
                        return;
                    }
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg028, weifen, c_data.name);
                    break;
                case 3://3自缢
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", xinxi[1]);
                    weifen = Number(xinxi[3]) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg029, weifen, xinxi[0]);
                    if (c_data) {
                        c_data.status = 5;
                    }
                    else {
                        c_data = { "meili": xinxi[2] };
                    }
                    break;
                case 4://4冷宫妃子死亡
                    this.xdz_p.source = "xdzi-huang_png";
                    //c_data = pproxy.get_curr_lgfz(cd.id);
                    //c_data.status = 5;
                    str2 = mx.Tools.format(mx.Lang.hg030, cd.name);
                    break;
                case 5://5生育1子
                    this.xdz_p.source = "xdzi-xiao_png";
                    //c_data.status = 0;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    if (mx.MX_COMMON.IN_GUIDE) {
                        var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME);
                        c_data.name = gproxy.slt_info.name;
                    }
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg040, mx.Lang.hg045);
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 6://6子女成年
                    this.xdz_p.source = "xdzi-pu_png";
                    break;
                case 7://7被打胎
                    this.xdz_p.source = "xdzi-huang_png";
                    //c_data.status = 2;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg033, weifen, c_data.name);
                    break;
                case 8://8妃子生病
                    this.xdz_p.source = "xdzi-huang_png";
                    //c_data.status = 1;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg034, weifen, c_data.name);
                    break;
                case 9://9流产(怀孕状态被打入冷宫）
                    this.xdz_p.source = "xdzi-huang_png";
                    c_data = pproxy.get_curr_lgfz(cd.id);
                    if (!c_data || c_data.jia) {
                        return;
                    }
                    pproxy.res_hzs++;
                    str2 = mx.Tools.format(mx.Lang.hg035, c_data.name);
                    break;
                case 10://被打胎
                    pproxy.res_hzs++;
                    this.xdz_p.source = "xdzi-huang_png";
                    //c_data.status = 2;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg033, weifen, c_data.name);
                    break;
                case 11://保胎
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg065, c_data.name, c_data.name, xinxi[0]);
                    c_data = { "meili": c_data.meili, "meili2": c_data.meili, "meili3": xinxi[1] };
                    break;
                case 12://被毒死
                    this.xdz_p.source = "xdzi-huang_png";
                    c_data.status = 5;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    str2 = mx.Tools.format(mx.Lang.hg048, weifen, c_data.name);
                    break;
                case 13://1女
                    this.xdz_p.source = "xdzi-xiao_png";
                    //c_data.status = 0;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg040, mx.Lang.hg046);
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 14://龙凤
                    this.xdz_p.source = "xdzi-xiao_png";
                    //c_data.status = 0;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg111 : mx.Lang.hg047;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name);
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 15://2男
                    this.xdz_p.source = "xdzi-xiao_png";
                    //c_data.status = 0;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg043, mx.Lang.hg045);
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 16://2女
                    this.xdz_p.source = "xdzi-xiao_png";
                    //c_data.status = 0;//????
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg043, mx.Lang.hg046);
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 17://3男
                    this.xdz_p.source = "xdzi-xiao_png";
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg044, mx.Lang.hg045);
                    str2 += mx.Lang.hg050;
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 18://3女
                    this.xdz_p.source = "xdzi-xiao_png";
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg044, mx.Lang.hg046);
                    str2 += mx.Lang.hg050;
                    c_data.meili2 = 0x53A4E3;
                    t_arr = [
                        { "bg": "ckan_png" }
                    ];
                    break;
                case 20://子女成年
                    xinxi = cd.str.split(",");
                    str2 = mx.Lang.hg051;
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 21://子女位分改变
                    xinxi = cd.str.split(",");
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", xinxi[4]);
                    weifen = Number(xinxi[3]) == 1 ? api.weifeng : api.weifenb;
                    lang = Number(xinxi[4]) > Number(xinxi[1]) ? mx.Lang.hg062 : mx.Lang.hg052;
                    str2 = mx.Tools.format(lang, xinxi[0], weifen, xinxi[5]);
                    c_data = { "meili": xinxi[2], "meili2": 200 };
                    this.xdz_p.source = "xdzi-pu_png";
                    break;
                case 22://生一个男
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg040, mx.Lang.hg045);
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 23://生一个女
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg040, mx.Lang.hg046);
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 24://龙凤胎
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg054, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 25://生2个男
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg043, mx.Lang.hg045);
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 26://生2个女
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg043, mx.Lang.hg046);
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 27://生3个男
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg044, mx.Lang.hg045);
                    str2 += mx.Lang.hg050;
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 28://生3个女
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg053, xinxi[0], mx.Lang.hg044, mx.Lang.hg046);
                    str2 += mx.Lang.hg050;
                    c_data = { "meili": xinxi[1] };
                    this.xdz_p.source = "xdzi-xiao_png";
                    break;
                case 29://子女被冷宫
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg055, xinxi[0], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200 };
                    this.xdz_p.source = "xdzi-huang_png";
                    break;
                case 30://子女自缢
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg056, xinxi[0], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200 };
                    this.xdz_p.source = "xdzi-huang_png";
                    break;
                case 31://子女被赐死（宫斗事件）
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg057, xinxi[0], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200 };
                    this.xdz_p.source = "xdzi-huang_png";
                    break;
                case 32://子女被毒死
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg058, xinxi[2], xinxi[0]);
                    c_data = { "meili2": xinxi[1], "meili": 200 };
                    this.xdz_p.source = "xdzi-huang_png";
                    break;
                case 33://子女接出冷宫
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg059, xinxi[2], xinxi[0], xinxi[0]);
                    c_data = { "meili2": xinxi[1], "meili": 200, "meili3": xinxi[1] };
                    break;
                case 34://子女生病
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg060, xinxi[0], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200 };
                    break;
                case 35://子女怀孕
                    this.xdz_p.source = "xdzi-xiao_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg061, xinxi[0], xinxi[0]);
                    c_data = { "meili": xinxi[1], "meili2": xinxi[1] };
                    break;
                case 36://赐字
                    this.xdz_p.source = "xdzi-xiao_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg063, xinxi[0], xinxi[2], xinxi[0], xinxi[3]);
                    c_data = { "meili": xinxi[1], "meili2": 200, "meili3": xinxi[1] };
                    break;
                case 37://取消赐字
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg064, xinxi[2], xinxi[0]);
                    c_data = { "meili": 200, "meili2": xinxi[1] };
                    break;
                case 38://子女给别人下毒
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg067, xinxi[0], xinxi[4], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200, "meili3": xinxi[3] };
                    break;
                case 39://子女难产
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    lang = Number(xinxi[3] == 1) ? mx.Lang.hg070 : mx.Lang.hg071;
                    str2 = mx.Tools.format(lang, xinxi[0], xinxi[2], xinxi[0]);
                    c_data = { "meili": xinxi[1], "meili2": 200, "meili3": xinxi[1] };
                    break;
                case 40://子女被打胎
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg066, xinxi[4], xinxi[0], xinxi[0], xinxi[4]);
                    c_data = { "meili": 200, "meili2": xinxi[1], "meili3": xinxi[1], "meili4": 200 };
                    break;
                case 41://子女打胎成功    
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg068, xinxi[0], xinxi[4], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200, "meili3": xinxi[3] };
                    break;
                case 42://子女打胎失败
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg072, xinxi[0], xinxi[4], xinxi[2]);
                    c_data = { "meili": xinxi[1], "meili2": 200, "meili3": xinxi[3] };
                    break;
                case 43://子女保胎成功
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg069, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 50://妃子私通怀孕
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg076, xinxi[0], xinxi[1]);
                    c_data = { "meili": 200, "meili2": xinxi[2] };
                    break;
                case 51://妃子私通生育
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg077, xinxi[0], xinxi[1]);
                    c_data = { "meili": 200, "meili2": xinxi[2], "meili3": 200, "meili4": xinxi[2] };
                    break;
                case 52://私生子成年
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg078, xinxi[0]);
                    c_data = { "meili": 200, "meili2": 200 };
                    break;
                case 53://私生子内务府和亲
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg079, xinxi[1], xinxi[0]);
                    c_data = { "meili": 200, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 54://私生子其他玩家和亲
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg080, xinxi[1], xinxi[0]);
                    c_data = { "meili": 200, "meili2": xinxi[2] };
                    break;
                case 55://私生子打入教坊司
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg081, xinxi[1], xinxi[0]);
                    c_data = { "meili": xinxi[2], "meili2": 200 };
                    break;
                case 57://调戏失败且战败，调戏方 
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg084, xinxi[0], xinxi[1]);
                    c_data = { "meili": 200, "meili2": xinxi[2] };
                    break;
                case 58://调戏失败且战败，被调戏方 
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.hg083, xinxi[0], xinxi[1]);
                    c_data = { "meili": 200, "meili2": xinxi[2], "meili3": xinxi[2], "meili4": 200 };
                    break;
                case 72://私通生一个男、
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg040, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 73://私通生一个女
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg040, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 74://私通生 龙凤胎
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg107 : mx.Lang.hg085;
                    str2 = mx.Tools.format(temp_str, xinxi[1], xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 75://私通生2个男
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg043, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 76://私通生2个女
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg043, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 77://私通生3个男
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg044, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 78://私通生3个女
                    this.xdz_p.source = "xdzi-pu_png";
                    xinxi = cd.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg044, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0x53A4E3, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 60://教坊司的私生子死亡
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.jfs36, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 61://教坊司的亲生子死亡
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(mx.Lang.jfs37, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 81://命悬一线
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    str2 = mx.Tools.format(mx.Lang.hg086, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    t_arr = [
                        { "bg": "tyqxiao_png" },
                        { "bg": "tyqren_png" },
                    ];
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = 5;
                    }
                    break;
                case 82://生病消息
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    var jieduan = Number(xinxi[xinxi.length - 1]) - 1;
                    var temp_1 = mx.Lang.hg0870[jieduan];
                    str2 = mx.Tools.format(temp_1, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = Number(xinxi[xinxi.length - 1]);
                    }
                    break;
                case 83://自然痊愈
                    this.xdz_p.source = "xdzi-xiao_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    temp_1 = mx.Lang["hg088" + Math.floor(Math.random() * 2)];
                    str2 = mx.Tools.format(temp_1, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = 0;
                    }
                    break;
                case 84://寿终正寝
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    temp_1 = mx.Lang.hg0890;
                    str2 = mx.Tools.format(temp_1, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = 0;
                        pproxy.mn_d[cd.id].status = 5;
                    }
                    break;
                case 85://医治痊愈
                    this.xdz_p.source = "xdzi-xiao_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    str2 = mx.Tools.format(mx.Lang.hg090, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = 0;
                    }
                    break;
                case 86://生病死亡
                    this.xdz_p.source = "xdzi-huang_png";
                    xinxi = cd.str.split(",");
                    weifen = this.cal_weifen(xinxi);
                    temp_1 = mx.Lang.hg0910;
                    str2 = mx.Tools.format(temp_1, weifen, xinxi[2]);
                    c_data = { "meili": xinxi[4] };
                    if (Number(xinxi[0]) != 0 && pproxy.mn_d[cd.id]) {
                        pproxy.mn_d[cd.id].sb_level = 5;
                        pproxy.mn_d[cd.id].status = 5;
                    }
                    break;
                case 87://祸不单行
                    this.xdz_p.source = "xdzi-huang_png";
                    temp_1 = mx.Lang.hg108;
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(temp_1, xinxi[0], xinxi[2]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 88://告诉自己 躲毒
                    this.xdz_p.source = "xdzi-huang_png";
                    temp_1 = mx.Lang.hg109;
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(temp_1, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 89://宗族 躲毒
                    this.xdz_p.source = "xdzi-huang_png";
                    temp_1 = mx.Lang.hg110;
                    xinxi = cd.str.split(",");
                    str2 = mx.Tools.format(temp_1, xinxi[0]);
                    c_data = { "meili": xinxi[1] };
                    break;
                case 100://无妃子  
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.hg041;
                    break;
                case 101://皇子所无未婚皇子
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.hg036;
                    break;
                case 102://皇子所无已婚皇子
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.hg037;
                    break;
                case 103://储秀宫世界选秀为空
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.hg038;
                    break;
                case 104://储秀宫结缘请求为空
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.hg039;
                    break;
                case -103://世界选秀，没有找到指定技能
                    this.xdz_p.source = "xdzi-tshi_png";
                    var jnid = cd.jn_id;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", jnid);
                    str = mx.Tools.setStrColor(mx.Lang.hg0380, [api.name], [0x76a75e]);
                    t_arr = [
                        { "bg": "cxgcxjneng_png" },
                        { "bg": "cxgqxsxuan_png" } //取消筛选
                    ];
                    break;
                case 105://好友结缘亲家为空
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.hy017;
                    break;
                case 106://好友列表为空
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.hy016;
                    break;
                case 108://好友仇家为空
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.hy019;
                    break;
                case 109://好友申请为空
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.hy018;
                    break;
                case 110://调戏好友为空
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.hy024;
                    break;
                case 111://囚凤宫为空
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.qfg01;
                    break;
                case 112://平台QQ好友
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Tools.format(mx.Lang.hy050, mx.Lang.hy049[1]);
                    break;
                case 113://平台微信好友
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Tools.format(mx.Lang.hy050, mx.Lang.hy049[0]);
                    break;
                case 200://美男兑换界面全部兑换好了
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.h0074;
                    break;
                case 201://子女列表为空
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Tools.format(mx.Lang.hg073, cd.name);
                    c_data = { "meili": cd.meili };
                    break;
                case 3000://教坊司首界面：
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.jfs26;
                    break;
                case 3001://教坊司首界面：：
                    this.xdz_p.source = "zlbtxiang_png";
                    str2 = mx.Lang.jfs28;
                    break;
                case 3002://教坊司首界面：：
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.jfs29;
                    break;
                case 3003://恩客-记录界面：
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.jfs27;
                    break;
                case 3004://掠夺-仇人界面：
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.ld053;
                    break;
                case 3005://掠夺-记录界面
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.ld052;
                    break;
                case 3006://掠夺-亲家界面
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.ld054;
                    break;
                case 3007://掠夺-子女界面
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.ld055;
                    break;
                case 3008://掠夺-后宫界面
                    this.xdz_p.source = "xdzi-pu_png";
                    str2 = mx.Lang.ld056;
                    break;
                case 3009://掠夺-陌生人界面
                    this.xdz_p.source = "xdzi-xiao_png";
                    str2 = mx.Lang.ld059;
                    break;
                case 4010://家族--申请
                    this.xdz_p.source = "xyzi_png";
                    str2 = mx.Lang.jz069;
                    break;
                case 4011://家族--搜索
                    this.xdz_p.source = "xyzi_png";
                    str2 = mx.Lang.jz092;
                    break;
                case 4012://家族--申请列表
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.jz211;
                    break;
                case 4013://上龙国--复选
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.xxg25;
                    break;
                case 4014://上龙国--殿选
                    this.xdz_p.source = "xdzi-tshi_png";
                    str2 = mx.Lang.xxg26;
                    break;
                default:
                    return;
            }
            this.bg.visible = cd.msg_id <= 100 && cd.msg_id > 0;
            this.btn_list.visible = cd.msg_id <= 100; //非事件消息
            var meili = c_data ? Number(c_data.meili) : 50;
            var cor = meili > 300 ? meili : mx.Tools.num2color(meili); //部分指定颜色
            var cor2 = c_data && c_data.meili2 ? mx.Tools.num2color(c_data.meili2) : cor;
            if (c_data && c_data.meili2 && c_data.meili2 > 300) {
                cor2 = c_data.meili2;
            }
            var cor3 = c_data && c_data.meili3 ? mx.Tools.num2color(c_data.meili3) : cor;
            var cor4 = c_data && c_data.meili4 ? mx.Tools.num2color(c_data.meili4) : cor;
            var arr = [cor, cor2, cor3, cor4];
            str = str || mx.Tools.setKeywordColor2(str2, arr);
            if (cd.time && Number(cd.time)) {
                var date = new Date(Number(cd.time) * 1000);
                var timestr = mx.Tools.format(mx.Lang.hg096, date.getMonth() + 1, date.getDate(), date.getHours());
                str.push({
                    "text": "\n" + timestr,
                    "style": { "textColor": 0xF669B2 }
                });
            }
            this.hua_t.textFlow = str;
            switch (msg) {
                case 5: //生子
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 72: //私通生子
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                    this.currentState = this.skin.currentState = "tg";
                    this.bg.fillAlpha = 0.5;
                    var timeid1 = egret.setTimeout(function (arg) {
                        var zg2 = new mx.GeneralEffect("tgxr");
                        this.c_g.addChildAt(zg2, 4);
                        zg2.x = 375;
                        zg2.y = 180;
                        zg2.play_by_times(-1);
                        zg2.alpha = 0;
                        zg2.scaleY = zg2.scaleX = 0.5 * 1.5; //龙骨资源暂时放大       
                        egret.Tween.get(zg2).to({ "alpha": 1, "scaleY": 1.5, "scaleX": 1.5 }, 560); //圣旨一秒淡入
                    }, this, 760, "egret"); //
                    var zg = new mx.GeneralEffect("tgcs");
                    this.c_g.addChild(zg);
                    zg.x = 345;
                    zg.y = 165;
                    zg.scaleX = zg.scaleY = 1.5; //龙骨资源暂时放大
                    zg.play_by_times(1);
                    if (Number(xinxi[xinxi.length - 1]) == 11) {
                        this.di_p.source = "tscstsdchen_png";
                    }
                    else {
                        this.di_p.source = "hzcstsdchen_png";
                    }
                    break;
                default:
                    this.currentState = this.skin.currentState = "all";
                    this.bg.fillAlpha = 0.2;
                    this.hua_t.validateNow();
                    if (this.hua_t.text.length < 26) {
                        this.sc.height = 100;
                    }
                    else {
                        this.sc.height = 122;
                    }
                    break;
            }
            this.btn_list.dataProvider = new eui.ArrayCollection(t_arr);
            if (t_arr.length == 1) {
                this.btn_list.width = 218;
            }
            else if (t_arr.length == 2) {
                this.btn_list.width = 526;
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                var in_yxd = false;
                // if(MX_COMMON.IN_GUIDE == 1 && msg == 1){//3.0-引导难产
                //     in_yxd = true;
                // }
                if (mx.MX_COMMON.IN_GUIDE && (msg == 5 || msg >= 13 && msg <= 18)) {
                    in_yxd = true;
                }
                if (in_yxd) {
                    if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                        facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    }
                    else {
                        this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
                    }
                }
            }
        };
        HouGongSJView.prototype.mx_test2 = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HouGongSJView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.tag_list.dataProvider = null;
            this.btn_list.dataProvider = null;
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            this.btn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HGongSJMediator.NAME);
            this.remove_tween();
        };
        HouGongSJView.prototype.remove_tween = function () {
            var tar2 = this.c_g.getChildByName("tgcs");
            var tar = this.c_g.getChildByName("tgxr");
            if (tar) {
                egret.Tween.removeTweens(tar);
                tar.on_remove();
                this.c_g.removeChild(tar);
            }
            if (tar2) {
                egret.Tween.removeTweens(tar2);
                tar2.on_remove();
                this.c_g.removeChild(tar2);
            }
        };
        HouGongSJView.prototype.onTabChange = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata.shijian;
            switch (e.item.bg) {
                case "bpfei_png"://保嫔妃
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_NANCHAN,
                        "id": cd.id,
                        "answer": 1
                    });
                    this.check_next();
                    break;
                case "bhsi_png"://保皇嗣
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_NANCHAN,
                        "id": cd.id,
                        "answer": 2
                    });
                    this.check_next();
                    break;
                case "ckan_png"://查看(皇子所)
                    var paproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                    paproxy.cur_hzs_type = 1;
                    paproxy.hzs_page1 = 1;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
                case "tyqren_png"://使用培元丹
                    var xinxi = cd.str.split(",");
                    var notice = mx.MX_NOTICE.CS_GET_DATA;
                    var s_data = {
                        "t": mx.MX_NETS.CS_FZ_SCDJ,
                        "id": xinxi[0] == 0 ? 0 : cd.id,
                        "item_id": 2026,
                        "zinv_id": xinxi[0] == 0 ? cd.id : 0
                    };
                    var pproxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                    if (pproxy.get_item_num(2026)) {
                        facade.sendNotification(notice, s_data);
                    }
                    else {
                        var param = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": notice,
                                "sdata_ok": s_data,
                                "param": mx.Lang.hg093,
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, param);
                    }
                    break;
                case "tyqxiao_png"://取消
                    break;
                case "cxgcxjneng_png"://重选技能
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HouGongSJView.S_NAME);
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.CxgSelectAlert.S_NAME,
                        "param": cd.jn_id
                    });
                    break;
                case "cxgqxsxuan_png"://取消筛选
                    facade.sendNotification(mx.MX_NOTICE.CXG_JN_SLT, 0);
                    break;
            }
        };
        HouGongSJView.prototype.check_shijian = function (evt) {
            var msg_id = this.adata.shijian.msg_id;
            if (msg_id > 100 || msg_id == 1) {
                return; //非事件消息
            }
            this.check_next();
        };
        HouGongSJView.prototype.check_next = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (pproxy.shijian.length) {
                pproxy.check_shijian();
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HouGongSJView.S_NAME);
            }
        };
        //xinxi:  type,weifen,name,sex,meili,jieduan,id
        HouGongSJView.prototype.cal_weifen = function (xinxi) {
            var type = Number(xinxi[0]);
            var sex = Number(xinxi[3]);
            var weifen;
            if (type == 0) {
                weifen = xinxi[1];
                if (weifen == "") {
                    var shenfen = sex == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                    weifen = mx.Tools.num2chinese(xinxi[5]) + shenfen;
                }
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", xinxi[1]);
                weifen = sex == 1 ? api.weifeng : api.weifenb;
            }
            return weifen;
        };
        HouGongSJView.S_NAME = "HouGongSJView";
        HouGongSJView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return HouGongSJView;
    }(mx.AlertView));
    mx.HouGongSJView = HouGongSJView;
    __reflect(HouGongSJView.prototype, "mx.HouGongSJView");
})(mx || (mx = {}));
//# sourceMappingURL=HouGongSJView.js.map
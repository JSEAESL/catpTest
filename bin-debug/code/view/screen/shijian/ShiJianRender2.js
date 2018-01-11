/**
 *   @author hxj
 *   @date 2017.11.15
 *   @desc 事件render
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
    var ShiJianRender2 = (function (_super) {
        __extends(ShiJianRender2, _super);
        function ShiJianRender2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShiJianRender2.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.btn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            this.avatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        Object.defineProperty(ShiJianRender2.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ShiJianRender2.prototype.init_render = function () {
            this.btn_list.itemRenderer = mx.SSButtonRender;
            this.btn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            this.avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ShiJianRender2.prototype.delete_shijian = function () {
            var cd = this.data;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                "id": cd.id,
                "msg_id": cd.msg_id,
                "type": cd.type,
            });
        };
        ShiJianRender2.prototype.list_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            switch (e.item.bg) {
                case "sjccha_png"://彻查
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "checha",
                            "msg_id": cd.msg_id,
                            "cd": cd,
                        }
                    });
                    break;
                case "sjdrlgong_png"://打入冷宫
                    switch (cd.yuangao.pos) {
                        case 0:
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sjian021 });
                            break;
                        case 1:
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_YXD_LENGGONG,
                                "id": cd.yuangao.y_id
                            });
                            this.delete_shijian();
                            break;
                        case 2:
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sjian022 });
                            break;
                    }
                    break;
                case "sjzdle_png"://知道了
                    this.delete_shijian();
                    break;
                case "sjckan_png":
                    this.delete_shijian();
                    var net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.HZSuoScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        ShiJianRender2.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            switch (e.currentTarget) {
                case this.avatar:
                    break;
            }
        };
        ShiJianRender2.prototype.dataChanged = function () {
            var c_data = this.data;
            if (!c_data || !this.skin) {
                return;
            }
            //头像
            if (Number(c_data.msg_id) == 96) {
                this.avatar.source = "bbtx1_png";
            }
            else {
                if (c_data.yuangao) {
                    this.avatar.source = mx.Tools.get_zn_res(c_data.yuangao.avatar, "tx");
                }
                else {
                    this.avatar.source = mx.Tools.get_zn_res(c_data.avatar, "tx");
                }
            }
            //描述
            var desc;
            switch (Number(c_data.msg_id)) {
                case 92:
                case 93:
                    desc = mx.Tools.format(mx.Lang.shijian[c_data.msg_id], mx.Tools.get_mn_wf(c_data), c_data.name);
                    desc = mx.Tools.setKeywordColor2(desc, [mx.Tools.num2color(c_data.meili)]);
                    break;
                case 94:
                case 95:
                    var yuangao = c_data.yuangao;
                    var weifen2 = { "weifen": yuangao.weifen, "sex": yuangao.sex };
                    desc = mx.Tools.format(mx.Lang.shijian[c_data.msg_id], mx.Tools.get_mn_wf(weifen2), yuangao.name, mx.Tools.get_mn_wf(c_data), c_data.name);
                    desc = mx.Tools.setKeywordColor2(desc, [mx.Tools.num2color(yuangao.meili), mx.Tools.num2color(c_data.meili)]);
                    break;
                case 96:
                    //皇子出生查看
                    desc = this.get_chushen_str();
                    break;
            }
            this.desc_t.textFlow = desc;
            //按钮
            var btn_arr;
            switch (Number(c_data.msg_id)) {
                case 92:
                case 93:
                    btn_arr = [{ "bg": "sjccha_png" }, { "bg": "sjzdle_png" }];
                    break;
                case 94:
                case 95:
                    btn_arr = [{ "bg": "sjdrlgong_png" }, { "bg": "sjzdle_png" }];
                    break;
                case 96:
                    btn_arr = [{ "bg": "sjckan_png" }, { "bg": "sjzdle_png" }];
                    break;
            }
            this.btn_list.dataProvider = new eui.ArrayCollection(btn_arr);
        };
        ShiJianRender2.prototype.get_chushen_str = function () {
            var c_data = this.data;
            var str;
            var str2 = "";
            var weifen;
            var api, xinxi, temp, lang, temp_str;
            switch (Number(c_data.msg_type)) {
                case 5://5生育1子
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg040, mx.Lang.hg045);
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 13://1女
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg040, mx.Lang.hg046);
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 14://龙凤
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg111 : mx.Lang.hg047;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name);
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 15://2男
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg043, mx.Lang.hg045);
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 16://2女
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg043, mx.Lang.hg046);
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 17://3男
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg044, mx.Lang.hg045);
                    str2 += mx.Lang.hg050;
                    c_data.meili2 = 0xf7a02e;
                    break;
                case 18://3女
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_data.weifen);
                    weifen = Number(c_data.sex) == 1 ? api.weifeng : api.weifenb;
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg105 : mx.Lang.hg031;
                    str2 = mx.Tools.format(temp_str, weifen, c_data.name, mx.Lang.hg044, mx.Lang.hg046);
                    str2 += mx.Lang.hg050;
                    c_data.meili2 = 0xf7a02e;
                    ;
                    break;
                case 72://私通生一个男、
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg040, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 73://私通生一个女
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg040, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 74://私通生 龙凤胎
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg107 : mx.Lang.hg085;
                    str2 = mx.Tools.format(temp_str, xinxi[1], xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 75://私通生2个男
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg043, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 76://私通生2个女
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg043, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 77://私通生3个男
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg044, mx.Lang.hg045, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                case 78://私通生3个女
                    xinxi = c_data.str.split(",");
                    temp_str = Number(xinxi[xinxi.length - 1]) == 11 ? mx.Lang.hg106 : mx.Lang.hg082;
                    str2 = mx.Tools.format(temp_str, xinxi[1], mx.Lang.hg044, mx.Lang.hg046, xinxi[0]);
                    c_data = { "meili": 0xf7a02e, "meili2": xinxi[2], "meili3": 200 };
                    break;
                default:
                    return;
            }
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
            return str;
        };
        return ShiJianRender2;
    }(mx.BasicRender));
    mx.ShiJianRender2 = ShiJianRender2;
    __reflect(ShiJianRender2.prototype, "mx.ShiJianRender2");
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianRender2.js.map
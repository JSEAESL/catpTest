/**
 *   @author hxj
 *   @date 2017.7.10
 *   @desc 相国寺子女render
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
    var XGSChildRender = (function (_super) {
        __extends(XGSChildRender, _super);
        function XGSChildRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSChildRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.tag_list.dataProvider = null;
            this.result_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.all_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        Object.defineProperty(XGSChildRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSChildRender.prototype.init_render = function () {
            this.result_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.all_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cur_zn_type = this.proxy.cur_xgs_type;
            this.dataChanged();
        };
        XGSChildRender.prototype.btn_click = function (e) {
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            switch (e.currentTarget) {
                case this.result_t:
                    if (d.hun_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            " t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": d.hun_id,
                        });
                    }
                    break;
                case this.all_g:
                    proxy.set_cur_id(d.id);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": Number(d.id) + 1000,
                        "type": 10,
                    });
                    break;
            }
        };
        XGSChildRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var state = Number(d.zhuangtai);
            var isChild = state < 2 && state >= 0;
            var isSisheng = !(typeof d.pianyi_name == "undefined");
            var hasName = d.name != "";
            var hasFhao = d.fenghao != "";
            //标签列表，[亲|私|野]+(转)
            this.show_tag();
            //头像
            this.avatar.source = mx.Tools.get_bb_res("tx", state, d.avatar);
            //姓名
            this.name_t.text = hasName ? (d.xing + d.name) : mx.Lang.hzs05;
            this.name_t.textColor = hasName && !isChild ? mx.Tools.num2color(d.meili) : 0x9C86A5;
            //谥号
            var shihao = this.proxy.get_shihao(d.id);
            this.shihao_t.textFlow = [
                { "text": mx.Lang.shihao + "：", "style": { "textColor": 0xca4ea4 } },
                { "text": shihao, "style": { "textColor": 0xf59343 } }
            ];
            //魅力
            /* this.meili_t.textFlow = [
                 { "text": Lang.mli + '：', "style": { "textColor": 0xca4ea4 } },
                 { "text": d.meili || "???", "style": { "textColor": 0x9c86a5 } }
             ];*/
            //关系
            var guanxi = "";
            var xin = Number(d.guanxi);
            var num = Math.min(Math.floor(xin / 50), 3);
            var guanhuai = Math.min(num * 50, 150);
            if (xin < 0) {
                guanhuai = -100;
                num = -1;
            }
            var xin_arr = ["hzsssxin", "hzsssxin", "hzsqjxin", "hzsrmxin", "hzszqxin"];
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUANXI, "guanhuaizhi", guanhuai);
            guanxi = api.guanxi;
            this.guanxi_xin.source = xin_arr[num + 1] + "_png";
            this.guanxi_t.textFlow = [
                { "text": mx.Lang.gxi + '：', "style": { "textColor": 0xca4ea4 } },
                { "text": d.guanxi || "999", "style": { "textColor": 0x9c86a5, "size": 22 } }
            ];
            this.guanxi_desc.text = guanxi;
            //性格
            api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", d.xingge);
            this.xg_t.textFlow = [
                { "text": mx.Lang.xge + '：', "style": { "textColor": 0xca4ea4 } },
                { "text": api ? api.xingge : "???", "style": { "textColor": 0x9c86a5 } }
            ];
            //离宫子女
            //出身
            this.cshen_t.textFlow = [
                { "text": mx.Lang.cshen + '：', "style": { "textColor": 0xca4ea4 } },
                { "text": d.fenghao || (mx.Tools.num2chinese(d.paiwei) + (Number(d.sex) == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04)), "style": { "textColor": 0x9c86a5 } }
            ];
            //结局
            switch (this.cur_zn_type) {
                case 1://未婚
                    var str = void 0;
                    if (d.key_id) {
                        str = mx.Lang["fzjj" + d.key_id];
                    }
                    else if (state == 7) {
                        str = mx.Lang["fzjj" + 19];
                    }
                    else if (state == 8) {
                        str = mx.Lang["fzjj" + 15];
                    }
                    else {
                        str = "无疾而终";
                    }
                    this.result_t.textFlow = [
                        { "text": mx.Lang.jju + '：', "style": { "textColor": 0xca4ea4 } },
                        { "text": str, "style": { "textColor": 0x9c86a5 } }
                    ];
                    break;
                case 2://已婚
                    this.result_t.textFlow = [
                        { "text": mx.Lang.hpei + '：', "style": { "textColor": 0xca4ea4 } },
                        { "text": d.hunpei, "style": { "textColor": 0xFF0000, "underline": true } }
                    ];
                    break;
            }
        };
        XGSChildRender.prototype.show_tag = function () {
            var d = this.data;
            var tag_arr = [];
            var tag;
            switch (d.sisheng) {
                case "0"://此处亲生 不显示
                    break;
                case Main.USER_ID:
                    tag = "ssz_png";
                    break;
                default://既不是亲生，也不是私生，即为野孩子（相国寺中不收录野孩子）
                    tag = "yzz_png";
                    break;
            }
            if (tag) {
                tag_arr.push({
                    "tag": tag,
                });
            }
            if (d.zhuan == 1 || d.zhuan == 3) {
                tag_arr.push({
                    "tag": "zsbqian_png",
                });
            }
            this.tag_list.dataProvider = new eui.ArrayCollection(tag_arr);
        };
        return XGSChildRender;
    }(mx.BasicRender));
    mx.XGSChildRender = XGSChildRender;
    __reflect(XGSChildRender.prototype, "mx.XGSChildRender");
})(mx || (mx = {}));
//# sourceMappingURL=XGSChildRender.js.map
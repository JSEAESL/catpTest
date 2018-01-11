/**
 *   @author cy
 *   @date 2017.3.2
 *   @desc 掠夺详情弹窗
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
    var LDXQAlert = (function (_super) {
        __extends(LDXQAlert, _super);
        function LDXQAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDXQAlert.prototype.init_view_by_type = function () {
            this.fresh_pop();
        };
        LDXQAlert.prototype.fresh_pop = function () {
            var arr = [];
            var data = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var user = lproxy.get_cur_user();
            this.title_t.text = mx.Tools.format(mx.Lang.ld070, user.name);
            var state;
            var str;
            var now_time = Math.floor(new Date().getTime() / 1000);
            var time;
            var shijian;
            var user_c = mx.Tools.num2color(150);
            for (var k in data) {
                var d = data[k];
                str = [];
                time = Math.max(0, now_time - Number(d.time));
                if (time < 3600) {
                    shijian = Math.floor(time / 60) + mx.Lang.ld042;
                }
                else if (time < 3600 * 24) {
                    shijian = Math.floor(time / 3600) + mx.Lang.ld041;
                }
                else if (time < 3600 * 24 * 7) {
                    shijian = Math.floor(time / (3600 * 24)) + mx.Lang.ld040;
                }
                else {
                    shijian = 1 + mx.Lang.ld039;
                }
                if (Number(d.jieguo)) {
                    state = "sbqian_png";
                    var str2 = mx.Tools.format(mx.Lang.ld073, shijian, user.name);
                    str = mx.Tools.setKeywordColor2(str2, [0x58bf71, user_c]);
                }
                else {
                    state = "bbqian_png";
                    var str2 = void 0, info = void 0, shenfen = void 0, name_1 = void 0, carr = void 0;
                    switch (Number(d.type)) {
                        case -1: //-1，没有被掠夺妃子或者子女 
                        case 2: //掠夺到子女是自己的私生子
                        case 4: //掠夺到养心殿妃子是自己私生子
                        case 5://掠夺到冷宫妃子是自己私生子
                            str2 = mx.Tools.format(mx.Lang.ld071, shijian, d.self_fangyu, d.qinmi, user.name);
                            str = mx.Tools.setKeywordColor2(str2, [0x58bf71, user_c]);
                            break;
                        case 0://0，被掠夺子女 子女-（排名，性别）或者封号，姓名（可能为没有值）
                            info = d.str.split(",");
                            if (info.length == 4) {
                                var xingbie = Number(info[1]) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                                shenfen = mx.Tools.num2chinese(Number(info[0])) + xingbie;
                                name_1 = info[2];
                            }
                            else {
                                shenfen = info[0];
                                name_1 = info[1];
                            }
                            str2 = mx.Tools.format(mx.Lang.ld072, shijian, user.name, shenfen, name_1, d.self_fangyu, d.qinmi);
                            carr = [0x58bf71, user_c, mx.Tools.num2color(Number(info[info.length - 1]))];
                            str = mx.Tools.setKeywordColor2(str2, carr);
                            break;
                        case 1: //1被掠夺妃子 妃子-赐字，位分，名字，性别
                        case 3:
                            info = d.str.split(",");
                            shenfen = info[0];
                            name_1 = info[2];
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", info[1]);
                            if (Number(info[3]) == 1) {
                                shenfen += api.weifeng;
                            }
                            else {
                                shenfen += api.weifenb;
                            }
                            str2 = mx.Tools.format(mx.Lang.ld072, shijian, user.name, shenfen, name_1, d.self_fangyu, d.qinmi);
                            carr = [0x58bf71, user_c, mx.Tools.num2color(info[info.length - 1])];
                            str = mx.Tools.setKeywordColor2(str2, carr);
                            break;
                    }
                }
                var other_user = [
                    { "text": "lv." + d.level + " " },
                    { "text": d.name, "style": { "underline": true, "textColor": mx.Tools.num2color(200) } }
                ];
                str = other_user.concat(str);
                arr.push({
                    "id": k,
                    "avatar": d.avatar,
                    "state": state,
                    "text": str,
                    "vip": d.vip,
                    "from_id": d.from_id,
                    "xq": true,
                    "name": d.name
                });
            }
            this.xq_list.itemRenderer = mx.LDRecordRender;
            this.xq_list.dataProvider = new eui.ArrayCollection(arr);
            this.xq_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        LDXQAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            //lproxy.lueduo_target = this.adata[e.item.id];
        };
        LDXQAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.xq_list.dataProvider = null;
            this.xq_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        LDXQAlert.S_NAME = "LDXQAlert";
        return LDXQAlert;
    }(mx.AlertView));
    mx.LDXQAlert = LDXQAlert;
    __reflect(LDXQAlert.prototype, "mx.LDXQAlert");
})(mx || (mx = {}));
//# sourceMappingURL=LDXQAlert.js.map
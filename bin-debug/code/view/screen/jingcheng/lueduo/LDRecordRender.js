/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 後宮使用，增大点击区域
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
    var LDRecordRender = (function (_super) {
        __extends(LDRecordRender, _super);
        function LDRecordRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDRecordRender.prototype.init_render = function () {
            this.dataChanged();
            this.fchou_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qiuyuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.desc_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LDRecordRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.fchou_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qiuyuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.desc_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LDRecordRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var d = this.data;
            var obj = { "user_id": d.from_id, "jl_id": d.id, "name": d.name };
            lproxy.set_cur_user(obj);
            var now_time = Math.floor(new Date().getTime() / 1000);
            var xy_state = now_time < Number(d.xiuyang);
            switch (e.currentTarget) {
                case this.fchou_b://复仇
                    if (d.xq) {
                        return;
                    }
                    if (xy_state) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld074 });
                        break;
                    }
                    lproxy.fight_type = "revenge";
                    lproxy.fuchou_id = d.id;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                        "id": d.from_id
                    });
                    break;
                case this.avatar://信息
                    if (d.xq) {
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PLAYER_INFO,
                        "other_id": d.from_id
                    });
                    break;
                case this.desc_t://
                    if (d.xq) {
                        lproxy.fight_type = "fight";
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_LUEDUO_TRXQ,
                            "id": d.from_id
                        });
                    }
                    break;
                case this.qiuyuan_b:
                    var point = this.qiuyuan_b.parent.localToGlobal(this.qiuyuan_b.x, this.qiuyuan_b.y);
                    var p_d = {
                        "x": point.x - 30,
                        "y": point.y,
                        "w": this.qiuyuan_b.width,
                        "h": this.qiuyuan_b.height,
                        "type": "qiuyuan",
                        "index": this.itemIndex,
                        "data": d
                    };
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
                    break;
            }
        };
        LDRecordRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.vip_t.text = d.vip + '';
            view.avatar.source = "tx78_" + d.avatar + "_png";
            if (d.xq) {
                view.state_p.source = d.state;
                view.desc_t.textFlow = d.text;
                view.bg.source = "xzqjlist_png";
                this.width = 394;
                this.btn_g.visible = false;
                this.dec_s.right = 28;
            }
            else {
                view.bg.source = "ldjlzylist_png";
                this.width = 670;
                this.btn_g.visible = true;
                this.dec_s.right = 180;
                if (Number(d.fchou)) {
                    mx.Tools.mx_grayfy(view.fchou_b);
                    view.fchou_b.touchEnabled = false;
                }
                else {
                    mx.Tools.mx_grayfy(view.fchou_b, true);
                    view.fchou_b.touchEnabled = true;
                }
                var str = [];
                var now_time = Math.floor(new Date().getTime() / 1000);
                var time = Math.max(0, now_time - Number(d.time));
                var shijian = void 0;
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
                    view.state_p.source = "sbqian_png";
                    var str2 = mx.Tools.format(mx.Lang.ld038, shijian);
                    str = mx.Tools.setKeywordColor2(str2, [0x58bf71]);
                }
                else {
                    view.state_p.source = "bbqian_png";
                    var str2 = void 0, info = void 0, shenfen = void 0, name_1, carr = void 0;
                    switch (Number(d.type)) {
                        case -1: //-1，没有被掠夺妃子或者子女 
                        case 2: //掠夺到子女是自己的私生子
                        case 4: //掠夺到养心殿妃子是自己私生子
                        case 5://掠夺到冷宫妃子是自己私生子
                            str2 = mx.Tools.format(mx.Lang.ld036, shijian, d.self_fangyu, d.qinmi);
                            str = mx.Tools.setKeywordColor2(str2, [0x58bf71]);
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
                            str2 = mx.Tools.format(mx.Lang.ld037, shijian, shenfen, name_1, d.self_fangyu, d.qinmi);
                            carr = [0x58bf71, mx.Tools.num2color(Number(info[info.length - 1]))];
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
                            str2 = mx.Tools.format(mx.Lang.ld037, shijian, shenfen, name_1, d.self_fangyu, d.qinmi);
                            carr = [0x58bf71, mx.Tools.num2color(info[info.length - 1])];
                            str = mx.Tools.setKeywordColor2(str2, carr);
                            break;
                    }
                }
                var other_user = [
                    { "text": "lv." + d.level + " " },
                    { "text": d.name, "style": { "underline": true, "textColor": mx.Tools.num2color(200) } }
                ];
                str = other_user.concat(str);
                view.desc_t.textFlow = str;
            }
        };
        return LDRecordRender;
    }(mx.BasicRender));
    mx.LDRecordRender = LDRecordRender;
    __reflect(LDRecordRender.prototype, "mx.LDRecordRender");
})(mx || (mx = {}));
//# sourceMappingURL=LDRecordRender.js.map
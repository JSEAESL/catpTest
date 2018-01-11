/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var AVGMediator = (function (_super) {
        __extends(AVGMediator, _super);
        function AVGMediator(viewComponent) {
            return _super.call(this, AVGMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(AVGMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        AVGMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.AVG_FRESH,
                mx.MX_NOTICE.CONTINUE_GD_LG
            ];
        };
        AVGMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2037) {
                        this.fresh_wqj();
                    }
                    break;
                case mx.MX_NOTICE.AVG_FRESH:
                    var type = notification.getType();
                    switch (type) {
                        case mx.MX_AVG_CONST.AVG_T_GDSJ://宫斗事件
                            this.fresh_gdsj(data);
                            break;
                        case mx.MX_AVG_CONST.AVG_T_JYSJ://教育事件
                            this.fresh_jysj(data);
                            break;
                        case mx.MX_AVG_CONST.AVG_T_FRESH_GD://刷新宫斗事件选择
                            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                            var gd = pproxy.gd_event;
                            gd.sid = 0;
                            break;
                        case mx.MX_AVG_CONST.AVG_T_NH_JFS://教育事件
                            this.fresh_jfs(data);
                            break;
                        case mx.MX_AVG_CONST.AVG_T_GZ://鬼胎选择
                            this.fresh_guitai(data);
                            break;
                        case mx.MX_AVG_CONST.AVG_T_CHECHA://彻查
                            this.fresh_checha(data);
                            break;
                        default://直接关闭
                            view.opt_g.visible = false;
                            view.show_next();
                            break;
                    }
                    break;
                case mx.MX_NOTICE.CONTINUE_GD_LG:
                    view.show_gdsj_alert(view.temp_info.astr, view.temp_info.send_d);
                    break;
            }
        };
        AVGMediator.prototype.guizu_huapi_not = function (data) {
            var mid = Number(data.mid);
            return (mid < 1000 && mid != 308) || (mid == 308 && data.huapi == '');
        };
        AVGMediator.prototype.fresh_guitai = function (data) {
            var view = this.view;
            view.ok_b.visible = true;
            view.opt_g.visible = false;
            var c_d = this.view.adata.cd;
            var aproxy = (this.facade.retrieveProxy(mx.AVGProxy.NAME));
            for (var i = 19; i < 21; ++i) {
                var gzapis = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGSELECT, "id", i);
                var temp_avatar = gzapis.avatar;
                if (gzapis.avatar == "{10}") {
                    if (this.guizu_huapi_not(c_d)) {
                        temp_avatar = Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE;
                    }
                    else {
                        temp_avatar = Number(c_d.avatar);
                    }
                }
                var name_1 = gzapis.uname;
                if (gzapis.uname == "{10}") {
                    name_1 = c_d.name;
                }
                aproxy.avg_jqs.push({
                    "uname": name_1,
                    "content": gzapis.content,
                    "avatar": temp_avatar,
                    "scene": gzapis.scene,
                    "scene_p": "s" + gzapis.scene + "_jpg",
                    "role_p": Number(c_d.mid) == 309 ? mx.Tools.get_mn_res(c_d.mid, "lh") : mx.Tools.get_zn_res(temp_avatar, "lh")
                });
            }
            view.jqs = aproxy.avg_jqs;
            view.cur_step = 0;
            view.show_next();
        };
        AVGMediator.prototype.fresh_jysj = function (data) {
            var view = this.view;
            view.ok_b.visible = true;
            view.opt_g.visible = false;
            var c_d = data; //id及pet
            //子女立绘
            var state = Number(c_d.zhuangtai);
            view.role.source = mx.Tools.get_bb_res("lh", state, c_d.avatar, c_d.meili);
            if (c_d.name && c_d.name != "") {
                view.r_name_t.text = c_d.name;
                view.namebg_p.visible = true;
            }
            else {
                view.r_name_t.text = "";
                view.namebg_p.visible = false;
            }
            view.con_t.text = view.format_cw(mx.Tools.format(mx.Lang.hzs60, mx.Lang.hg009), "zinv"); //内容
            view.no_skip = false;
        };
        AVGMediator.prototype.fresh_jfs = function (data) {
            var view = this.view;
            view.ok_b.visible = true;
            view.opt_g.visible = false;
            var type = "nhjfs" + (data - 1);
            var wjapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", type);
            var aproxy = (this.facade.retrieveProxy(mx.AVGProxy.NAME));
            for (var k in wjapis) {
                var wjapi = wjapis[k];
                aproxy.avg_jqs.push({
                    "uname": wjapi.uname,
                    "content": wjapi.content,
                    "avatar": wjapi.avatar,
                    "scene": wjapi.scene,
                    "scene_p": "s" + wjapi.scene + "_jpg",
                });
            }
            for (var j in aproxy.avg_jqs) {
                var api = aproxy.avg_jqs[j];
                var avatar_arr = String(api.avatar).split("_"); //剧情里可能有表情。
                var avatar = Number(avatar_arr[0]); //美男，子女，npc
                api.role_p = "a" + avatar + "_png";
                if (avatar_arr[1]) {
                    var bq = "a" + api.avatar + "_png";
                    api.bq_p = bq;
                }
            }
            view.jqs = aproxy.avg_jqs;
            view.cur_step = 0;
        };
        AVGMediator.prototype.fresh_gdsj = function (data) {
            var view = this.view;
            view.ok_b.visible = true;
            view.opt_g.visible = false;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            var gd = pproxy.gd_event;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GDSHJ, "id", gd.sj_id);
            var c_d = mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? pproxy.cur_zn_info : pproxy.get_curr_mn(data.id);
            view.r_name_t.text = c_d.name; //话语者
            if (Number(c_d.mid) < 1000) {
                if (Number(c_d.mid) >= 900) {
                    view.init_zsfz_tx(c_d);
                }
                else {
                    view.init_yxfz_tx(c_d);
                }
            }
            else {
                view.init_yxfz_tx(c_d);
            }
            var sid = gd.sid;
            var str = api["respon" + sid];
            var change_pet = str.indexOf("{1}") >= 0 ? data.change_pet1 : data.change_pet2;
            str = str.replace("{5}", change_pet + "");
            view.con_t.text = view.format_cw(str, "shiqin", gd.beigao); //内容
            view.no_skip = false;
            //接子女技能触发
            if (view.adata.skill) {
                var skill_api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", view.adata.skill[0].id);
                var ask_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", skill_api.avg_id);
                if (ask_api) {
                    var aproxy = (this.facade.retrieveProxy(mx.AVGProxy.NAME));
                    for (var i in ask_api) {
                        var ava = void 0, name_2 = void 0;
                        if (ask_api[i].avatar == '{10}') {
                            ava = Number(skill_api.id) == 20 ? (view.adata.skill[0].jiangmen.from_avatar) : (c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE);
                        }
                        else {
                            ava = ask_api[i].avatar;
                        }
                        if (ask_api[i].uname == '{10}') {
                            name_2 = Number(skill_api.id) == 20 ? view.adata.skill[0].jiangmen.from_name : c_d.name;
                        }
                        else {
                            name_2 = ask_api[i].uname;
                        }
                    }
                    view.jqs = aproxy.avg_jqs;
                    view.cur_step = 1;
                    view.adata.len = Number(skill_api.id) == 20 ? 1 : ask_api.length + 1;
                }
            }
        };
        AVGMediator.prototype.fresh_wqj = function () {
            var view = this.view;
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            view.adata.cshu = wproxy.txcshu;
            view.txi_b.set_ssres(view.adata.cshu > 0 ? 'txi_png' : 'txhui_png');
            if (view.adata.cshu > 0) {
                if (!view.txlove.visible) {
                    mx.TweenTool.getInstance().get_tween(view.txlove, "wqj", true);
                }
            }
            else {
                egret.Tween.removeTweens(view.txlove);
            }
            view.txlove.visible = view.adata.cshu > 0;
        };
        AVGMediator.prototype.fresh_checha = function (data) {
            var view = this.view;
            view.next_p.visible = view.ok_b.visible = true;
            view.opt_g.visible = false;
            var cd = this.view.adata;
            var weifen = mx.Tools.get_mn_wf(cd.cd);
            var name = cd.cd.name; //被害
            var weifen0 = mx.Tools.get_mn_wf(data);
            var name0 = data.name; //凶手
            var str = mx.Tools.format(mx.Lang[cd.type][cd.msg_id][3], weifen, name, name0) + mx.Tools.format(mx.Lang[cd.type].pos[data.pos], weifen0);
            var aproxy = (this.facade.retrieveProxy(mx.AVGProxy.NAME));
            aproxy.avg_jqs = [];
            var scene; //不同的事件类型使用不同的场景
            switch (Number(cd.msg_id)) {
                case 92://鹤顶红
                    scene = 1302;
                    break;
                case 93://散神草
                    scene = 1705;
                    break;
            }
            aproxy.avg_jqs.push({
                "uname": mx.Lang.ly,
                "content": str,
                "avatar": 1201,
                "scene": scene,
            });
            aproxy.avg_jqs.push({
                "uname": mx.Lang.p0139,
                "content": mx.Tools.format(mx.Lang[cd.type].end, data.sex == 1 ? mx.Lang.p0057 : mx.Lang.p0056),
                "avatar": "1_1",
                "scene": scene,
            });
            aproxy.format_avg(aproxy.avg_jqs, cd.type);
            view.jqs = aproxy.avg_jqs;
            view.cur_step = 0;
            view.show_next();
        };
        AVGMediator.NAME = "AVGMediator";
        return AVGMediator;
    }(puremvc.Mediator));
    mx.AVGMediator = AVGMediator;
    __reflect(AVGMediator.prototype, "mx.AVGMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=AVGMediator.js.map
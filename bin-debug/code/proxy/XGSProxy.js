/**
*   @author hxj
*   @date 2017.7.5
*   @desc 相国寺数据处理
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
    var XGSProxy = (function (_super) {
        __extends(XGSProxy, _super);
        function XGSProxy() {
            var _this = _super.call(this, XGSProxy.NAME) || this;
            _this.new_page = true; //下一个数据页是否是新页
            _this.xgs_list0 = []; //妃子
            _this.xgs_list1 = []; //未婚子女
            _this.xgs_list2 = []; //离宫（已婚）子女
            _this.cur_id = -1;
            _this.total_page = 0;
            _this.cur_page = [0, 0, 0]; //为每一个type记录一个“当前页”
            _this.total_len = 0;
            _this.cur_xgs_type = -1; //当前列表的类型，0：妃子、1：未婚子女、2：离宫子女
            _this.die_fz_select = false;
            return _this;
        }
        XGSProxy.prototype.set_page = function (data, type) {
            if (this.new_page) {
                this.new_page = false;
                this["xgs_list" + type] = data.data;
                this.total_page = Math.ceil(Number(data.total) / 4); //每页四条数据
                this.cur_page[type] = Math.min(data.page, this.total_page);
                this.total_len = Number(data.total);
                this.cur_xgs_type = type;
                if (this.die_fz_select) {
                    this.die_fz_select = false;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST, "die_fz");
                }
            }
        };
        XGSProxy.prototype.set_cur_id = function (id) {
            this.cur_id = Number(id);
        };
        XGSProxy.prototype.get_object = function (id) {
            id = id ? Number(id) : this.cur_id;
            var list = this["xgs_list" + this.cur_xgs_type];
            for (var k in list) {
                if (list[k].id == id) {
                    return list[k];
                }
            }
            return null;
        };
        XGSProxy.prototype.zfwf_cb = function (data) {
            if (data.state == 4) {
                var cd = this.get_object();
                cd.weifen = data.weifen;
                //刷新界面
                var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                pproxy.add_jianjie(21, data.weifen);
                this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                //追封位分成功后，弹出赐封谥号
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.WeiFenAlert.S_NAME);
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.XGSShiHaoPop.S_NAME,
                    "param": {
                        "id": cd.id,
                        "name": cd.name,
                        "meili": cd.meili,
                        "type": this.cur_xgs_type == 0 ? 0 : 1 //0:妃子、1:子女
                    }
                });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.xgs_zfwf[data.state]
                });
            }
        };
        XGSProxy.prototype.cfsh_cb = function (data) {
            if (data.state == 5) {
                this.get_object(data.id).shihao = data.shihao;
                //刷新界面
                var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                pproxy.add_jianjie(20, "");
                this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                //赐封谥号成功后，弹出圣旨
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XGSShiHaoPop.S_NAME);
                var p_d = {
                    "name": mx.ShengZhiAlert.S_NAME,
                    "param": { "name": "", "shihao": "", "type": 10 }
                };
                p_d.param.shihao = data.shihao;
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.xgs_cfsh[data.state]
                });
            }
        };
        XGSProxy.prototype.yqzf_cb = function (data) {
            switch (data.state) {
                case 7://成功
                    var cur_object = this.get_object(data.id);
                    cur_object.shihao = "1";
                    //刷新界面
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "text": mx.Tools.format(mx.Lang.xgs14, cur_object.hunpei)
                    });
                    break;
                case 5://相国寺建成之前死亡的已婚子女，无法追封
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Lang.xgs_yqzf[5],
                        }
                    });
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "text": mx.Lang.xgs_yqzf[data.state]
                    });
                    break;
            }
        };
        XGSProxy.prototype.zstt_cb = function (data) {
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs_zstt[data.state] });
            switch (Number(data.type)) {
                case 1: //随便投个人家
                case 2://投胎成阿猫阿狗
                    this.new_page = true;
                    //直接跳转到子女列表
                    var net = [{
                            "t": mx.MX_NETS.CS_XGS_ZINV,
                            "page": Math.min(this.cur_page[this.cur_xgs_type], Math.ceil((this.total_len - 1 / 4))),
                            "type": 2 - this.cur_xgs_type
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.XGSAllChild.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 3:
                    var zhuan = Number(this.get_object().zhuan);
                    this.get_object().zhuan = zhuan + 2;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HzHudongScreen.S_NAME);
                    break;
            }
        };
        XGSProxy.prototype.get_shihao = function (id) {
            var cd = this.get_object(id);
            var shihao;
            switch (this.cur_xgs_type) {
                case 0:
                    if (cd.shihao != "") {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen));
                        shihao = cd.shihao + (Number(cd.sex) == 1 ? api.weifeng : api.weifenb);
                    }
                    else {
                        shihao = mx.Lang.wu;
                    }
                    break;
                case 1:
                    shihao = cd.shihao == "" ? mx.Lang.wu : cd.shihao;
                    break;
                case 2:
                    shihao = cd.shihao.split('|');
                    if (shihao.length == 2) {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(shihao[1]));
                        shihao = shihao[0] + (Number(cd.sex) == 1 ? api.weifeng : api.weifenb);
                    }
                    else {
                        shihao = mx.Lang.wu;
                    }
                    break;
            }
            return shihao;
        };
        XGSProxy.prototype.reset = function () {
            this.cur_id = -1;
            this.cur_page = [0, 0, 0];
            this.new_page = true;
            this.cur_xgs_type = -1;
            this.total_len = 0;
            this.total_page = 0;
        };
        XGSProxy.prototype.init_oldName = function (data) {
            this.gai_num = Number(data.gai_num);
            if (data.chushi_name) {
                this.initial_name = data.chushi_name.name;
                this.old_name = data.old_name;
            }
            if (mx.AppConfig.CURR_SCENE_ID == mx.XGSScreen.S_NAME) {
                var t = Math.floor(new Date().getTime() / 1000);
                t = 3 - Math.floor((t - Number(data.time)) / (60 * 60 * 24)); //3天内无法再次改名
                if (t > 0) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "xgs_rename",
                            "wait": t,
                        }
                    });
                }
                else if (this.gai_num == 0) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "xgs_rename",
                            "num": 0,
                        }
                    });
                }
                else if (this.gai_num > 0) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "xgs_rename",
                            "num": this.gai_num,
                            "notice_ok": mx.MX_NOTICE.POP_VIEW,
                            "sdata_ok": { "name": mx.XGSRenamePop.S_NAME },
                        }
                    });
                }
            }
        };
        XGSProxy.prototype.rename_cb = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var str;
            switch (data.state) {
                case 0://更改昵称成功
                    var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
                    gproxy.user_name = data.name;
                    //圣旨
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XGSRenamePop.S_NAME);
                    var param = { "name": data.name, "type": 11 };
                    if (mx.MX_COMMON.IN_GUIDE) {
                        param.notice_exit = mx.MX_NOTICE.SCENE_CHANGE,
                            param.sdata_exit = { "sname": mx.MainScreen.S_NAME };
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": param
                    });
                    return;
                case 1:
                    str = mx.Lang.xgs24;
                    break;
                case 2:
                    str = mx.Lang.xgs25;
                    break;
                case 3:
                    str = mx.Lang.st006;
                    break;
                case 4:
                    str = mx.Lang.st008;
                    break;
                case 5:
                    str = mx.Lang.xgs30;
                    break;
                case 6:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_XGS_RENAME,
                            "name": data.name2,
                            "free": mx.MX_COMMON.IN_GUIDE ? 1 : 0,
                        },
                        "param": mx.Tools.format(mx.Lang.xgs38, data.name, data.name2)
                    };
                    var p_d2 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    return;
            }
            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        XGSProxy.NAME = "XGSProxy";
        return XGSProxy;
    }(puremvc.Proxy));
    mx.XGSProxy = XGSProxy;
    __reflect(XGSProxy.prototype, "mx.XGSProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XGSProxy.js.map
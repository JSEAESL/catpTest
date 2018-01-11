/**
 *   @author mx
 *   @date 2016.11.28
 *   @desc 引导proxy
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
    var GuideProxy = (function (_super) {
        __extends(GuideProxy, _super);
        function GuideProxy() {
            var _this = _super.call(this, GuideProxy.NAME) || this;
            _this.sr_info = {
                "310": { "name": "路易", "res": 122401, "rname": "弗兰", 'sex': 2 },
                "313": { "name": "云泽", "res": 42402, "rname": "云冉", 'sex': 2 },
                "311": { "name": "若华", "res": 72402, "rname": "南风", 'sex': 2 },
                "312": { "name": "花独绝", "res": 82302, "rname": "薄言", 'sex': 2 },
                "314": { "name": "思恒", "res": 42301, "rname": "薄风", 'sex': 2 },
                "315": { "name": "莉莉娅", "res": 121401, "rname": "露西", 'sex': 1 },
                "316": { "name": "无梦", "res": 71401, "rname": "锦儿", 'sex': 1 },
                "317": { "name": "花独艳", "res": 81401, "rname": "花语心", 'sex': 1 },
                "318": { "name": "怜采", "res": 51301, "rname": "怜柔", 'sex': 1 },
                "319": { "name": "锦瑟", "res": 41402, "rname": "寒儿", 'sex': 1 },
            };
            return _this;
        }
        GuideProxy.prototype.init_guide_info = function (data, slt) {
            this.start_id = data || 0;
            this.slt_role = slt || 310;
            //重校验起始段id，同一引导组没有完成，则从该组的第一个引导段开始。
            if (this.start_id) {
                var c_s_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.start_id);
                if (c_s_api) {
                    var s_s_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "gid", c_s_api.gid);
                    this.c_guide_id = s_s_api.id;
                    this.form_guide_id();
                    s_s_api = null;
                    if (this.start_id == 1) {
                        this.start_id = 0;
                    }
                }
                c_s_api = null;
            }
        };
        GuideProxy.prototype.form_guide_id = function () {
            if (this.c_guide_id < 100) {
                mx.MX_COMMON.IN_GUIDE = 5;
            }
            else {
                mx.MX_COMMON.IN_GUIDE = 10;
            }
        };
        Object.defineProperty(GuideProxy.prototype, "slt_info", {
            get: function () {
                return this.sr_info[this.slt_role]; //默认是小棒子
            },
            enumerable: true,
            configurable: true
        });
        GuideProxy.prototype.get_curr_guide = function () {
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.c_guide_id);
            if (!api) {
                return null;
            }
            return api;
        };
        GuideProxy.prototype.get_curr_guide_step = function () {
            return this.c_steps;
        };
        GuideProxy.prototype.check_guide = function (data) {
            if (!mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.c_guide_id);
            if (!api) {
                this.sendNotification(mx.MX_NOTICE.REMOVE_GUIDE);
                return;
            }
            if (api.jqid == "m_hzszy" && mx.AppConfig.CURR_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                this.skip_guide({
                    "gkey": "m_hzszy", "touch": "s_hg_hzs"
                });
                this.get_guide();
            }
            else {
                if (api.scene != mx.AppConfig.CURR_SCENE_ID) {
                    api = null;
                    return;
                }
            }
            switch (api.type) {
                case 1://AVG,结束后发送next_guide消息。
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": api.jqid,
                            "type": "guide",
                            "notice_ok": mx.MX_NOTICE.NEXT_GUIDE,
                        }
                    });
                    break;
                case 2://战斗
                    if (api.jqid == "ydzd") {
                        this.sendNotification(mx.MX_NOTICE.SHOW_GUIDE);
                    }
                    else {
                        this.show_fight(api);
                    }
                    break;
                case 3://步骤引导
                    if (!this.c_steps) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_GUIDE);
                    }
                    break;
            }
            api = null;
        };
        GuideProxy.prototype.check_guide_key = function (key) {
            var res = false;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.c_guide_id);
            if (api && api.jqid == key) {
                res = true;
            }
            api = null;
            return res;
        };
        GuideProxy.prototype.check_guide_by_key = function (key) {
            var res = false;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "jqid", key);
            if (api.id < this.c_guide_id) {
                res = true;
            }
            api = null;
            return res;
        };
        GuideProxy.prototype.skip_guide = function (data) {
            if (!mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            if (data) {
                var gkey = data.gkey;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "jqid", gkey);
                this.c_guide_id = data.gid || api.id;
                ////console.log("skip_guide : " + this.c_guide_id);
                if (data.skip) {
                    this.form_guide_id();
                }
                if (api.type == 1) {
                    this.sendNotification(mx.MX_NOTICE.SHOW_GUIDE); //关闭已经打开的引导
                    this.check_guide();
                    api = null;
                    return;
                }
                api = null;
                this.c_steps = mx.ApiTool.getAPINodes(mx.MX_APINAME.GUIDESTEP, "gkey", gkey);
                if (data.touch) {
                    while (this.c_steps.length) {
                        var capi = this.c_steps.shift();
                        if (capi.touchrect == data.touch) {
                            break;
                        }
                    }
                }
            }
            else {
                this.c_steps.shift();
            }
            if (!this.c_steps.length) {
                this.next_guide();
            }
        };
        GuideProxy.prototype.get_guide = function (data) {
            if (!this.c_guide_id || !mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.c_guide_id);
            if (!api) {
                this.sendNotification(mx.MX_NOTICE.REMOVE_GUIDE);
                return;
            }
            if (!this.c_steps) {
                this.c_steps = mx.ApiTool.getAPINodes(mx.MX_APINAME.GUIDESTEP, "gkey", api.jqid);
                if (!this.c_steps) {
                    return;
                }
                if (api.type == 2) {
                    this.show_fight(api);
                    return;
                }
            }
            api = null;
            var capi = this.c_steps.shift();
            // //console.log('=======  guide proxy ====');
            // //console.log(capi);
            if (capi) {
                ////console.log("proxy : ",capi);
                this.sendNotification(mx.MX_NOTICE.SHOW_GUIDE, capi);
            }
            else {
                this.next_guide();
            }
        };
        GuideProxy.prototype.show_fight = function (api) {
            switch (api.jqid) {
                case "ydzd":
                    mx.FightTools.init_yindao_fight(1);
                    break;
                case "bwzd":
                    mx.FightTools.init_yindao_fight(2);
                    break;
                case "bwzd2":
                    mx.FightTools.init_yindao_fight(3);
                    break;
            }
        };
        GuideProxy.prototype.check_g_dt = function () {
            if (this.c_guide_id > this.start_id) {
                var r_id = this.c_guide_id + 1;
                this.start_id = Math.max(this.start_id, this.c_guide_id);
                mx.DataTool.getInstance().data_tool(mx.MX_DL_CONST.DL_EVT_GUIDE + r_id);
            }
        };
        GuideProxy.prototype.next_guide = function (data) {
            this.comp_guide(data);
            this.c_steps = null;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "id", this.c_guide_id);
            if (api) {
                this.c_guide_id++;
                ////console.log("next_guide " + this.c_guide_id);
                this.check_guide();
            }
            else {
                this.sendNotification(mx.MX_NOTICE.REMOVE_GUIDE);
            }
            api = null;
        };
        //完成当前引导，设计到数据变化的引导需要提前改变服务端记录
        GuideProxy.prototype.comp_guide = function (data) {
            ////console.log("comp_guide : ",this.c_guide_id);
            var info = { "t": mx.MX_NETS.CS_GUIDE_STEP, "yd_id": this.c_guide_id };
            if (data) {
                for (var k in data) {
                    info[k] = data[k];
                    if (k == "slt") {
                        this.slt_role = data[k];
                    }
                }
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, info);
            // if(this.c_guide_id == 54){//删除新手妃子
            //     let proxy = <PalaceProxy><any> this.facade.retrieveProxy(PalaceProxy.NAME);
            //     proxy.del_guide_fz();
            // }
            this.check_g_dt();
        };
        GuideProxy.prototype.open_guide = function (data) {
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUIDEINFO, "jqid", data);
            if (api) {
                this.c_guide_id = api.id;
                ////console.log("open_guide " + this.c_guide_id);
                this.form_guide_id();
                this.check_guide();
            }
            api = null;
        };
        GuideProxy.NAME = "GuideProxy";
        return GuideProxy;
    }(puremvc.Proxy));
    mx.GuideProxy = GuideProxy;
    __reflect(GuideProxy.prototype, "mx.GuideProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GuideProxy.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * mx
 * 预加载处理，加載資源，靜態表和網絡數據
 **/
var mx;
(function (mx) {
    var PreloadTool = (function () {
        function PreloadTool() {
            this.loadIndex = 0;
            this.DYN_GNUM = {};
            this.facade = mx.ApplicationFacade.getInstance();
        }
        PreloadTool.getInstance = function () {
            if (!PreloadTool.instance) {
                PreloadTool.instance = new PreloadTool();
            }
            return PreloadTool.instance;
        };
        PreloadTool.prototype.mx_preload = function (data) {
            var screen = data.name;
            if (this.loadScreen) {
                mx.DataTool.getInstance().data_tool(mx.MX_DL_CONST.DL_EVT_2LOAD, {
                    "view": this.loadScreen + "/" + screen
                });
                ////console.info("禁止同时进行2项预加载，请检查：", this.loadScreen, screen);
                return;
            }
            this.loadIndex = 0;
            this.loadScreen = screen; //当前加载的UI名
            this.obj = data; //需要提供的附加参数
            //动态数据表，动态网络数据（可携带参数），预加载列表[assets,api,data]，动态资源组。
            this.loadAssets = this.load_arr(screen);
            this.check_pre_net(); //检查动态预加载数据
            this.check_pre_api(); //检查动态静态表
            this.mx_time = 0; //重置记录时间。
            if (screen != mx.PopLoadView.S_NAME) {
                if (screen == mx.StartScreen.S_NAME) {
                    var online = ["wb", "h5", "h5_dev"];
                    if (online.indexOf(mx.AppConfig.MXTag) < 0) {
                        this.loadAssets.push("data.1001");
                    }
                }
                else if (screen == mx.MainScreen.S_NAME) {
                    if (window && window["mx_debug"]) {
                        var debug_arr = window["mx_debug"];
                        if (debug_arr.indexOf("wbvip") > -1) {
                            this.loadAssets.push("data.3718");
                        }
                    }
                    if (window && window["isQQCW"]) {
                        this.loadAssets.push("data.3720");
                    }
                }
                if (this.loadAssets.length) {
                    this.facade.sendNotification(mx.MX_NOTICE.SHOW_LOADING, this.loadScreen);
                    this.mx_time = egret.getTimer();
                }
            }
            //处理合并data类
            var newAssets = [];
            var packdata = [];
            for (var d in this.loadAssets) {
                var v = this.loadAssets[d];
                var k = v.split('.')[0];
                switch (k) {
                    case 'data':
                        packdata.push(v.split('.')[1]);
                        break;
                    default:
                        newAssets.push(v);
                }
            }
            if (packdata.length < 2) {
                //不改
            }
            else {
                if (this.obj.param && this.obj.param) {
                    var net_d = this.obj.param.net;
                    for (var k in net_d) {
                        var c_k = net_d[k];
                        var c_idx = packdata.indexOf(c_k.t);
                        if (c_idx > -1) {
                            packdata.splice(c_idx, 1);
                            newAssets.push("data." + c_k.t);
                        }
                    }
                }
                var packdata_copy = packdata.concat();
                for (var m in packdata_copy) {
                    if (!mx.NetLoader.check_load2(packdata_copy[m])) {
                        var c_idx = packdata.indexOf(packdata_copy[m]);
                        if (c_idx > -1) {
                            packdata.splice(c_idx, 1);
                        }
                    }
                }
                if (packdata.length) {
                    newAssets.push('pack.' + packdata.join('-'));
                }
                this.loadAssets = newAssets;
            }
            this.loadMax = this.loadAssets.length + 1;
            this.load_next();
        };
        PreloadTool.prototype.check_pre_net = function () {
            if (this.obj.param) {
                var data = this.obj.param.net; //{t1:{},t2:{}},或者[{},{}]，推荐使用后者
                if (data) {
                    for (var k in data) {
                        this.loadAssets.unshift("data." + data[k].t);
                    }
                }
            }
        };
        PreloadTool.prototype.check_pre_api = function () {
            var proxy = this.facade.retrieveProxy(mx.SystemProxy.NAME);
            var arr = proxy.get_pre_api(this.obj); //obj是参数
            this.loadAssets = arr.concat(this.loadAssets);
        };
        PreloadTool.prototype.check_dynamic_group = function () {
            var proxy = this.facade.retrieveProxy(mx.SystemProxy.NAME);
            var arr = proxy.get_dyn_arr(this.obj); //obj是参数
            this.DYN_GNUM[this.loadScreen] = this.DYN_GNUM[this.loadScreen] || 1;
            if (arr.length) {
                var gname = this.loadScreen + this.DYN_GNUM[this.loadScreen];
                RES.createGroup(gname, arr);
                this.loadAssets.push("assets." + gname);
                this.DYN_GNUM[this.loadScreen]++;
                this.load_next();
            }
            else {
                this.pre_complete();
            }
        };
        PreloadTool.prototype.load_arr = function (screen) {
            var larr = [];
            var c_class = egret.getDefinitionByName("mx." + screen);
            if (c_class && c_class.mx_support) {
                larr = c_class.mx_support();
            }
            return larr.concat();
        };
        PreloadTool.prototype.recover_group = function (name) {
            var depends = this.load_arr(name);
            var depends2 = this.load_arr(mx.AppConfig.CURR_SCENE_ID);
            var arr;
            for (var i = 0; i < depends.length; i++) {
                arr = depends[i].split(".");
                if (arr[0] == "assets") {
                    if (mx.AppConfig.holdRes.indexOf(arr[1]) == -1) {
                        RES.destroyRes(arr[1]);
                    }
                }
                else if (arr[0] == "api") {
                    if (depends2.indexOf(depends[i]) > -1) {
                        continue;
                    }
                    if (mx.AppConfig.holdRes.indexOf(arr[1]) == -1) {
                        mx.APITool.CLEAR_API(arr[1]);
                    }
                }
            }
            this.recover_dyn_group(name);
        };
        PreloadTool.prototype.recover_dyn_group = function (name, set) {
            var cd = this.DYN_GNUM[name];
            if (cd) {
                if (name == mx.FightView.S_NAME) {
                    var zyz = RES.getGroupByName(name + (cd - 1));
                    for (var k in zyz) {
                        var cres = zyz[k];
                        var reg = new RegExp("^monstx[0-9]*_png$");
                        if (!reg.test(cres.name)) {
                            RES.destroyRes(cres.name);
                        }
                    }
                }
                else {
                    var a = RES.destroyRes(name + (cd - 1));
                    //console.log(name + (cd - 1), RES.getGroupByName(name + (cd - 1)));
                }
            }
        };
        PreloadTool.prototype.load_next = function () {
            if (this.loadIndex < this.loadAssets.length) {
                this.facade.sendNotification(mx.MX_NOTICE.TOTAL_PROGRESS, {
                    "p": this.loadIndex + 1, "t": this.loadMax + 1
                });
                this.preload(this.loadAssets[this.loadIndex++]);
            }
            else if (this.loadIndex < this.loadMax) {
                this.check_dynamic_group();
            }
            else {
                this.pre_complete();
            }
        };
        PreloadTool.prototype.pre_complete = function () {
            var facade = this.facade;
            //关闭进度弹窗。
            if (this.loadScreen != mx.PopLoadView.S_NAME) {
                if (this.mx_time) {
                    var mx_delay = egret.getTimer() - this.mx_time;
                    if (mx_delay > 3000) {
                        mx.DataTool.getInstance().data_tool(mx.MX_DL_CONST.DL_EVT_PRE3S, {
                            "time": mx_delay, "scene": this.loadScreen
                        });
                    }
                }
                this.loadScreen = null; //清除可以开始下一个预加载
                if (this.loadAssets.length) {
                    facade.sendNotification(mx.MX_NOTICE.HIDE_LOADING);
                }
                facade.sendNotification(mx.MX_NOTICE.LOAD_COMPLETE, this.obj);
            }
            else {
                if (!mx.Lang) {
                    mx.Lang = mx.ApiTool.getAPI(mx.MX_APINAME.MXLang);
                }
                this.loadScreen = null;
                facade.sendNotification(mx.MX_NOTICE.CLIENT_INITED);
            }
        };
        PreloadTool.prototype.preload = function (asset) {
            var arr = asset.split(".");
            var newtype = arr[0];
            //console.log(asset);
            switch (newtype) {
                case "assets":
                    this.loadRes(arr[1]);
                    break;
                case "data":
                    var t = arr[1];
                    this.loadData(t);
                    break;
                case 'pack':
                    this.loadPackData(arr[1]);
                    break;
                case "api":
                    this.loadApi(arr[1]);
                    break;
            }
        };
        //加载美术资源
        PreloadTool.prototype.loadRes = function (group) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(group);
        };
        PreloadTool.prototype.onResourceLoadComplete = function (evt) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.load_next();
        };
        PreloadTool.prototype.onItemLoadError = function (event) {
            console.warn(event.resItem.name);
        };
        PreloadTool.prototype.onResourceProgress = function (event) {
            //console.warn(event.resItem.name);
        };
        PreloadTool.prototype.onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.load_next();
        };
        //网络数据预处理
        PreloadTool.prototype.loadData = function (info) {
            var c_param = this.obj.param;
            var cparam = { "t": info };
            if (c_param && c_param.net) {
                for (var i in c_param.net) {
                    var cnet = c_param.net[i];
                    if (info == cnet.t) {
                        cparam = cnet;
                        break;
                    }
                }
                if (Number(info) == 1301) {
                    var ptype = cparam.type;
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    cparam.type = pProxy.check_pack_type_item2(ptype, cparam.stype);
                    if (typeof cparam.type == "undefined") {
                        this.load_next();
                        return;
                    }
                }
            }
            var l_d = {
                "type": "pnet",
                "param": cparam,
                "cb": this.on_get_data,
                "m": this
            };
            var mx_loader = mx.NetLoader.GET_MX_LOADER();
            mx_loader.reset_loader(l_d);
        };
        PreloadTool.prototype.loadPackData = function (t) {
            var c_param = this.obj.param;
            var cparam = { "t": 6666, "pt": t };
            var l_d = {
                "type": "pnet",
                "param": cparam,
                "cb": this.on_get_data,
                "m": this
            };
            var mx_loader = mx.NetLoader.GET_MX_LOADER();
            mx_loader.reset_loader(l_d);
        };
        //加载成功
        PreloadTool.prototype.on_get_data = function (str) {
            if (!str || str == "") {
            }
            this.load_next();
        };
        //加载json文件
        PreloadTool.prototype.loadApi = function (info) {
            var c_json;
            if (mx.MX_APINAME) {
                c_json = mx.ApiTool.getAPI(mx.MX_APINAME[info]);
            }
            if (!c_json) {
                this.load_json(info, this.on_get_json);
            }
            else {
                this.load_next();
            }
        };
        PreloadTool.prototype.load_json = function (str, cb) {
            var mx_loader = mx.NetLoader.GET_MX_LOADER();
            var l_d = {
                "type": "json",
                "param": str,
                "cb": cb,
                "m": this
            };
            mx_loader.reset_loader(l_d);
        };
        PreloadTool.prototype.on_get_json = function (str) {
            if (!str || str == "") {
                return;
            }
            mx.ApiTool.add_json(str);
            this.load_next();
        };
        return PreloadTool;
    }());
    mx.PreloadTool = PreloadTool;
    __reflect(PreloadTool.prototype, "mx.PreloadTool");
})(mx || (mx = {}));
//# sourceMappingURL=PreloadTool.js.map
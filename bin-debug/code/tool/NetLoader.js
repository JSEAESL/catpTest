var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
*   @author muxing
*   @date 2015-6-9
*   @desc 自包装loader
**/
var mx;
(function (mx) {
    var NetLoader = (function () {
        function NetLoader() {
            this._id = NetLoader.LOAD_ID++;
            if (!NetLoader.NET_RECORD) {
                NetLoader.REST_RECORD();
            }
        }
        NetLoader.GET_MX_LOADER = function () {
            if (!NetLoader.MX_LOADERS) {
                NetLoader.MX_LOADERS = [];
            }
            if (NetLoader.MX_LOADERS.length) {
                return NetLoader.MX_LOADERS.pop();
            }
            else {
                return new NetLoader();
            }
        };
        NetLoader.prototype.reset_loader = function (data) {
            this._send_n = 0;
            this._waitnum = 0;
            this._type = data.type;
            this._load_d = data.param;
            this._load_cb = data.cb;
            this._load_m = data.m;
            this.check_load();
        };
        NetLoader.REST_RECORD = function () {
            NetLoader.NET_RECORD = {
                "1111": { "update": 0, "delay": 180000 },
                "1103": { "update": 0, "delay": 0 },
                "1701": { "update": 0, "delay": 0 },
                "2403": { "update": 0, "delay": 0 },
                "2601": { "update": 0, "delay": 120000 },
                "2904": { "update": 0, "delay": 120000 },
                "2905": { "update": 0, "delay": 60000 },
                "2701": { "update": 0, "delay": 0 },
                "2001": { "update": 0, "delay": 0 },
                //"2101" : {"update" : 0, "delay" : 0},//英雄列表
                "1602": { "update": 0, "delay": 0 },
                "2801": { "update": 0, "delay": 300000 },
                "2802": { "update": 0, "delay": 0 },
                "2501": { "update": 0, "delay": 0 },
                "1001": { "update": 0, "delay": 0 },
                "3714": { "update": 0, "delay": 180000 },
                "3718": { "update": 0, "delay": 0 },
                "2125": { "update": 0, "delay": 0 },
                "4501": { "update": 0, "delay": 0 },
                "2510": { "update": 0, "delay": 0 },
            };
        };
        NetLoader.check_load2 = function (t_num) {
            var c_record = NetLoader.NET_RECORD[t_num];
            if (c_record) {
                var ct = egret.getTimer(); //当前已经启动的毫秒数
                if (c_record.update) {
                    if (c_record.delay) {
                        if (ct > c_record.update + c_record.delay) {
                            c_record.update = ct;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    c_record.update = ct;
                }
            }
            return true;
        };
        NetLoader.prototype.check_load = function () {
            if (this._type == "net" || this._type == "pnet") {
                if (!this._load_d.skip) {
                    var t_num = this._load_d.t;
                    if (!NetLoader.check_load2(t_num)) {
                        if (this._load_cb) {
                            this._load_cb.call(this._load_m);
                        }
                        this.clearloader();
                        return;
                    }
                }
                if (Number(this._load_d.t) != 1111) {
                    var ckey = mx.Tools.o2s(this._load_d);
                    if (NetLoader.DO_NET_RECORD[ckey]) {
                        ////console.log("同一请求，已经在请求中，不可再次请求",this._load_d.t);
                        if (this._load_cb) {
                            this._load_cb.call(this._load_m);
                        }
                        this.clearloader(); //这种情况不存在预加载中，不需要处理回调
                        return;
                    }
                    else {
                        NetLoader.DO_NET_RECORD[ckey] = 1;
                    }
                }
            }
            this.do_load();
        };
        NetLoader.prototype.do_load = function () {
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, this.on_getdata_back, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.on_net_io_error, this);
            for (var i = 1; i <= 3; i++) {
                var cloader = this["_loader" + i];
                if (!cloader) {
                    this["_loader" + i] = loader;
                    loader["name"] = "_loader" + i;
                    break;
                }
            }
            var urlreq = new egret.URLRequest(this.geturl());
            switch (this._type) {
                case "json"://静态表
                    urlreq.method = egret.URLRequestMethod.GET;
                    break;
                case "net"://网络请求
                    if (this._load_d && this._load_d.t && Number(this._load_d.t) != 1111 && !this._timeid) {
                        this._timeid = egret.setInterval(this.check_wait, this, 500);
                    }
                case "pnet"://预加载过
                    urlreq.method = egret.URLRequestMethod.POST;
                    var fdata = new egret.URLVariables();
                    var fv = {
                        "member_id": Main.MEMBER_ID,
                        "ct": new Date().getTime(),
                        "key": Main.MEMBEK_ID,
                    };
                    for (var k in this._load_d) {
                        fv[k] = this._load_d[k];
                    }
                    if (Main.USER_ID) {
                        fv["user_id"] = Main.USER_ID;
                    }
                    if (Main.SER_ID) {
                        fv["sid"] = Main.SER_ID;
                    }
                    //cs加密校验
                    var obj = {};
                    //排序下
                    obj = this.objKeySort(fv);
                    var str = "";
                    for (var i in obj) {
                        str += (i + "=" + encodeURIComponent(obj[i]) + '&');
                    }
                    fv["h5_sign"] = mx.mxmd5.hex_md5(str + mx.MX_COMMON.MX_CS_KEY); //md5.hex_md5();
                    fdata.variables = fv;
                    urlreq.data = fdata;
                    break;
            }
            loader.load(urlreq);
        };
        NetLoader.prototype.objKeySort = function (obj) {
            var newkey = Object.keys(obj).sort();
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) {
                newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
            }
            return newObj; //返回排好序的新对象
        };
        NetLoader.prototype.check_wait = function () {
            if (!this._waitnum) {
                NetLoader.IN_WAIT++;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SET_WAIT, true);
            }
            this._waitnum++;
            if (this._waitnum >= 18) {
                mx.Tools.mxalert(mx.Lang.neterror + "///////");
                var ckey = mx.Tools.o2s(this._load_d);
                if (NetLoader.DO_NET_RECORD[ckey]) {
                    delete NetLoader.DO_NET_RECORD[ckey]; //清除正在请求的记录
                }
                this.clearloader();
                return;
            }
            if (this._waitnum % 6 == 0 && !this._load_d.xh) {
                console.log("同一请求超时，新建请求进行尝试", this._load_d.t);
                this.do_load();
            }
        };
        NetLoader.prototype.geturl = function () {
            var url = "";
            switch (this._type) {
                case "json"://静态表
                    if (this._load_d == "JSONVER") {
                        url = mx.AppConfig.JSON_PATH + this._load_d + ".json";
                        if (mx.AppConfig.GameTag != "WX") {
                            url += "?v=" + mx.AppConfig.VERSION;
                        }
                    }
                    else {
                        var api = mx.MX_APINAME[this._load_d]; //jong控制项
                        if (api) {
                            url = mx.AppConfig.JSON_PATH + this._load_d + ".json";
                            if (mx.AppConfig.GameTag != "WX") {
                                url += "?v=" + api.ver;
                            }
                        }
                        else {
                            ////console.warn("不存在的静态表 ： " + this._load_d);
                        }
                    }
                    break;
                case "net": //网络请求
                case "pnet"://网络请求
                    url = mx.AppConfig.SERVER_ADD; //服务器地址
                    break;
                default:
                    break;
            }
            return url;
        };
        NetLoader.prototype.on_getdata_back = function (event) {
            var c_data = event.currentTarget.data;
            switch (this._type) {
                case "json"://静态表
                    if (c_data[0] != "{") {
                        console.warn(this._load_d);
                    }
                    this._load_cb.call(this._load_m, c_data);
                    break;
                case "net":
                case "pnet"://预加载过
                    this.on_net_data_back(c_data);
                    break;
            }
            this.clearloader();
        };
        NetLoader.prototype.on_net_data_back = function (data) {
            var ckey = mx.Tools.o2s(this._load_d);
            if (!NetLoader.DO_NET_RECORD[ckey] && Number(this._load_d.t) != 1111) {
                ////console.log("同一请求，已经接收数据，不再次处理",this._load_d.t);
                return;
            }
            delete NetLoader.DO_NET_RECORD[ckey]; //清除正在请求的记录,有返回数据清除记录
            if (data) {
                if (data.charAt(0) != "{" || data.charAt(data.length - 1) != "}") {
                    mx.Tools.mxalert(mx.Lang.jsonerror);
                }
                else {
                    var c_data = JSON.parse(data);
                    this.parser_data(c_data);
                }
            }
            if (this._load_cb) {
                this._load_cb.call(this._load_m);
            }
        };
        NetLoader.prototype.parser_data = function (c_data) {
            var ret = c_data.ret || 0;
            var facade = mx.ApplicationFacade.getInstance();
            switch (ret) {
                case 1://接受成功
                    var alldata = c_data.data;
                    if (alldata) {
                        if (!alldata.length) {
                            alldata = [alldata]; //转成数组
                        }
                        for (var key in alldata) {
                            var c_d = alldata[key];
                            if (!c_d) {
                                continue;
                            }
                            if (c_d.t) {
                                if (Number(c_d.t) == 6666) {
                                    //处理合并数据
                                    var msgs = c_d.data;
                                    for (var d in msgs) {
                                        this.parser_data(msgs[d]);
                                    }
                                }
                                else {
                                    facade.sendNotification(c_d.t + "_1", c_d);
                                }
                            }
                        }
                    }
                    break;
                case -1://服务器连接错误
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.neterror1 });
                    break;
                case -2://系统维护中，请等待更新完成
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.neterror2 });
                    break;
                case -3://陛下，{0}功能正在维护中，请待开放后在使用哦~
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.neterror2, "") });
                    break;
                case -4://玩家数据变化（运营扣除）
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Lang.neterror + "----",
                            "notice_ok": mx.MX_NOTICE.GAME_LOGOUT,
                            "sdata_ok": true,
                            "notice_exit": mx.MX_NOTICE.GAME_LOGOUT,
                            "sdata_exit": true,
                        }
                    });
                    break;
                case -5://玩家被封号，不能进行任何操作 
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.neterror6 });
                    break;
                default:
                    if (c_data && c_data.msg && c_data.msg == "repeat login") {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "param": mx.Lang.neterror3,
                                "notice_ok": mx.MX_NOTICE.GAME_LOGOUT,
                                "sdata_ok": true,
                                "notice_exit": mx.MX_NOTICE.GAME_LOGOUT,
                                "sdata_exit": true,
                            }
                        });
                        break;
                    }
                    mx.Tools.mxalert(mx.Lang.neterror + "=====");
                    break;
            }
        };
        NetLoader.prototype.clear_loader = function () {
            for (var i = 1; i <= 3; i++) {
                var cloader = this["_loader" + i];
                if (cloader) {
                    cloader.removeEventListener(egret.Event.COMPLETE, this.on_getdata_back, this);
                    cloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.on_net_io_error, this);
                    cloader = null;
                    this["_loader" + i] = null;
                }
            }
        };
        NetLoader.prototype.clearloader = function () {
            this.clear_loader();
            this._type = null;
            this._load_d = null;
            this._load_cb = null;
            this._load_m = null;
            if (this._timeid) {
                egret.clearInterval(this._timeid);
                this._timeid = null;
            }
            if (this._waitnum) {
                NetLoader.IN_WAIT--;
                if (!NetLoader.IN_WAIT) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SET_WAIT, false);
                }
            }
            NetLoader.MX_LOADERS.push(this);
        };
        NetLoader.prototype.on_net_io_error = function (evt) {
            if (this._send_n++ < NetLoader.RESEND_MAX) {
                this.do_load();
            }
            else {
                /*if(this._load_cb){
                    this._load_cb.call(this._load_m, Lang.p0003);
                }*/
                this.clearloader();
                mx.Tools.mxalert(mx.Lang.neterror + "+++++");
            }
        };
        NetLoader.IN_WAIT = 0;
        NetLoader.LOAD_ID = 0;
        NetLoader.RESEND_MAX = 2; //最大尝试次数
        NetLoader.DO_NET_RECORD = {}; //网络请求记录
        return NetLoader;
    }());
    mx.NetLoader = NetLoader;
    __reflect(NetLoader.prototype, "mx.NetLoader");
})(mx || (mx = {}));
//# sourceMappingURL=NetLoader.js.map
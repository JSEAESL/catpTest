/**
 *   @author mx
 *   @date 2015.1.21
 *   @desc 添加静态表的工具。
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var APITool = (function () {
        function APITool() {
            APITool.formatList = [];
        }
        APITool.getInstance = function () {
            if (!APITool.instance) {
                APITool.instance = new APITool();
            }
            return APITool.instance;
        };
        APITool.CLEAR_API = function (info) {
            /*let cname = MX_APINAME[info].jkey;
            //console.log(info + " delete " + cname);
            let arr = APITool.formatList[cname];
            for(let k in arr){
                delete arr[k];
            }
            APITool.formatList[cname] = [];
            APITool.formatList[cname] = null;
            delete APITool.formatList[cname];*/
        };
        //添加配置文件
        APITool.prototype.add_json = function (str) {
            var arr = str.split("||");
            var ln = arr.length;
            if (ln > 1) {
                APITool.formatList["config"] = true;
            }
            for (var i = 0; i < ln; i++) {
                var content = arr[i];
                if (content.length) {
                    this.add_s_json(content);
                }
            }
        };
        APITool.prototype.add_s_json = function (str) {
            if (!str) {
                ////console.log("静态表为空");
            }
            var obj = JSON.parse(str);
            var c_d = obj.data || obj; //2维数组||1维数组
            var base = c_d && c_d[0] || ""; //表头
            if (typeof base == "object") {
                var arr = [];
                for (var i = 1, ln = c_d.length; i < ln; i++) {
                    var cd = c_d[i]; //当前数据源
                    var c_obj = {};
                    for (var k in base) {
                        var key = base[k];
                        var val = cd[k];
                        var reg = new RegExp("^[0-9]*$");
                        if (reg.test(val)) {
                            val = Number(val);
                        }
                        else {
                            var reg2 = new RegExp("^[ ]+|[ ]+$");
                            if (reg2.test(val)) {
                                val = val.replace(reg2, "");
                            }
                            if (reg2.test(val)) {
                                val = val.replace(reg2, "");
                            }
                        }
                        c_obj[key] = val;
                    }
                    arr.push(c_obj);
                }
                APITool.formatList[obj.name] = arr;
                if (obj.name == "JSONVER") {
                    mx.MX_APINAME = mx.Tools.arr2obj(arr, "name");
                }
            }
            else {
                ////console.log(obj.name + " >>>> : " + typeof base);
                APITool.formatList[obj.name] = c_d;
            }
        };
        //获取API数据
        APITool.prototype.getAPI = function (api) {
            if (api) {
                var apiname = api.jkey;
                return APITool.formatList[apiname];
            }
        };
        /**
        * 获取节点数据 ！！！注意，api数据是本地存数数据，只可以读，不可以写入！！！！
        * @param apiname:静态表名，att：查询的属性名，val：查询的属性值
        **/
        APITool.prototype.getAPINode = function (base, att, val, att2, val2) {
            var tmp = null;
            var apiname = base.jkey;
            var api = APITool.formatList[apiname];
            if (api) {
                var idx = 0;
                var ln = api.length;
                while (idx < ln) {
                    tmp = api[idx];
                    idx++;
                    if (tmp.hasOwnProperty(att) && tmp[att] == val) {
                        if (att2 && (!tmp.hasOwnProperty(att2) || tmp[att2] != val2)) {
                            continue;
                        }
                        return tmp; //FightTools.object_clone(tmp);
                    }
                }
            }
            else {
                ////console.log(apiname + "静态表丢失");
            }
            return null;
        };
        //获取同KEY的多个数据
        APITool.prototype.getAPINodes = function (base, att, val, att2, val2) {
            if (!base) {
                return null;
            }
            var tmp = null;
            var result;
            var apiname = base.jkey;
            var api = APITool.formatList[apiname];
            if (api) {
                var idx = 0;
                var ln = api.length;
                while (idx < api.length) {
                    tmp = api[idx];
                    idx++;
                    if (tmp.hasOwnProperty(att) && tmp[att] == val) {
                        if (att2 && (!tmp.hasOwnProperty(att2) || tmp[att2] != val2)) {
                            continue;
                        }
                        result = result || [];
                        result.push(tmp); //result.push(FightTools.object_clone(tmp));
                    }
                }
            }
            return result;
        };
        return APITool;
    }());
    mx.APITool = APITool;
    __reflect(APITool.prototype, "mx.APITool");
    mx.ApiTool = APITool.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=APITool.js.map
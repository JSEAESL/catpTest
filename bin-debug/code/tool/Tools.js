/**
* @author mx
* @date 2015.02.04
* @desc 我是传说中的基本工具类
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var MXTools = (function () {
        function MXTools() {
            this.hero2zn = {
                "300": 32302,
                "301": 12306,
                "302": 32401,
                "303": 54301,
                "304": 63401,
                "305": 63402,
                "306": 63403,
                "307": 64404,
                "308": 73301,
                "309": 74301,
                "310": 122401,
                "311": 72402,
                "312": 82302,
                "313": 42402,
                "314": 42301,
                "315": 121401,
                "316": 71401,
                "317": 81401,
                "318": 51301,
                "319": 41402,
                "900": 13401,
                "901": 14401,
            };
        }
        MXTools.getInstance = function () {
            if (!MXTools.instance) {
                MXTools.instance = new MXTools();
            }
            return MXTools.instance;
        };
        MXTools.prototype.get_c_zllb = function (lbid) {
            var now_time = new Date(Number(new Date().getTime()) + 8 * 3600 * 1000); //当前时间戳*1000
            var now_y = now_time.getUTCFullYear();
            var now_m = Number(now_time.getUTCMonth()) + 1;
            var tstr = now_y + "-" + this.n2s_2(now_m, 2);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.RECHARGE, "id", lbid);
            var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.CHARGELIBAO, "libao_id", tstr, "price", api.money);
            if (Number(lbid) == 10) {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.CHARGELIBAO, "price", api.money);
            }
            if (!apis) {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.CHARGELIBAO, "libao_id", "2017-03", "price", api.money);
            }
            return apis;
        };
        //将时间戳转换为字符串 1993-12-15 04:04:04
        MXTools.prototype.format_time = function (sec, type, bq, ch) {
            if (type === void 0) { type = "nyrsfm"; }
            if (bq === void 0) { bq = 2; }
            if (ch === void 0) { ch = false; }
            var date = sec ? new Date(sec * 1000) : new Date();
            var num = {
                "n": date.getFullYear(),
                "y": date.getMonth() + 1,
                "r": date.getDate(),
                "s": date.getHours(),
                "f": date.getMinutes(),
                "m": date.getSeconds() //秒
            };
            var str = "";
            for (var i = 0, ln = type.length; i < ln; i++) {
                var c = type[i];
                switch (c) {
                    case "y":
                        if (str != "") {
                            str += ch ? mx.Lang.nian : "-";
                        }
                        break;
                    case "r":
                        if (str != "") {
                            str += ch ? mx.Lang.yue : "-";
                        }
                        break;
                    case "s":
                        if (str != "") {
                            str += ch ? mx.Lang.ri : "  ";
                        }
                        break;
                    case "f":
                    case "m":
                        if (str != "") {
                            str += ":";
                        }
                        break;
                }
                str += this.n2s_2(num[c], bq);
            }
            return str;
        };
        MXTools.prototype.n2s_2 = function (m, bq) {
            var n = m.toString();
            while (n.length < bq) {
                n = "0" + n;
            }
            return n;
        };
        /**
         * 時間差轉化為 xx天00小时00分00秒|00-00:00:00
         *
         * @param   sec [必须参数]
         * @param   type [可选参数] 小写的字母表示不需要补全 [1分9秒]，大写字母表示需要补全 [01分09秒]
         *              rsfm: 返回值的格式是 x天x小时x分x秒
         *              sfm: 返回值的格式是 x小时x分x秒
         * @param   ch  [可选参数]是否需要返回中文
         *
         * @returns string xx天00小时00分00秒|00-00:00:00
         */
        MXTools.prototype.format_second1 = function (sec, type, ch) {
            if (sec === void 0) { sec = 0; }
            if (type === void 0) { type = "rsfm"; }
            if (ch === void 0) { ch = true; }
            var days, hours, minutes, seconds;
            if (type.length >= 4) {
                days = Math.floor(sec / 86400);
                hours = Math.floor(sec % 86400 / 3600);
                minutes = Math.floor(sec % 3600 / 60);
                seconds = sec % 60;
            }
            else if (type.length >= 3) {
                hours = Math.floor(sec / 3600);
                minutes = Math.floor(sec % 3600 / 60);
                seconds = sec % 60;
            }
            else if (type.length >= 2) {
                minutes = Math.floor(sec / 60);
                seconds = sec % 60;
            }
            else if (type.length >= 1) {
                seconds = sec;
            }
            var d = '', h = '', m = '', s = '';
            var hz;
            for (var i = 0, ln = type.length; i < ln; i++) {
                var c = type[i];
                switch (c) {
                    case "r":
                        if (days <= 0) {
                            d = '';
                        }
                        else {
                            hz = ch ? mx.Lang.tian : "-";
                            d = days + hz;
                        }
                        break;
                    case "R":
                        hz = ch ? mx.Lang.tian : "-";
                        d = days + hz;
                        break;
                    case "s":
                        if (type.length == 3 && hours <= 0) {
                            h = '';
                        }
                        else {
                            hz = ch ? mx.Lang.shi : ":";
                            h = hours + hz;
                        }
                        break;
                    case "S":
                        hz = ch ? mx.Lang.shi : ":";
                        if (hours <= 10) {
                            h = "0" + hours + hz;
                        }
                        else {
                            h = hours + hz;
                        }
                        break;
                    case "f":
                        if (type.length == 2 && minutes <= 0) {
                            m = '';
                        }
                        else {
                            hz = ch ? mx.Lang.fen : ":";
                            m = minutes + hz;
                        }
                        break;
                    case "F":
                        hz = ch ? mx.Lang.fen : ":";
                        if (minutes <= 10) {
                            m = "0" + minutes + hz;
                        }
                        else {
                            m = minutes + hz;
                        }
                        break;
                    case "m":
                        if (type.length == 1 && seconds <= 0) {
                            s = '';
                        }
                        else {
                            hz = ch ? mx.Lang.miao : "";
                            s = seconds + hz;
                        }
                        break;
                    case "M":
                        hz = ch ? mx.Lang.miao : "";
                        if (seconds <= 10) {
                            s = "0" + seconds + hz;
                        }
                        else {
                            s = seconds + hz;
                        }
                        break;
                }
            }
            return d + h + m + s;
        };
        //時間差轉化為 00:00:00
        MXTools.prototype.format_second = function (sec, full) {
            if (full === void 0) { full = false; }
            if (sec <= 0) {
                return "00:00:00";
            }
            var hours = Math.floor(sec / 3600);
            var minutes = Math.floor(sec % 3600 / 60);
            var seconds = sec % 60;
            var h, m, s;
            if (hours == 0 && !full) {
                h = "";
            }
            else {
                h = (hours < 10 ? "0" : "") + hours + ":";
            }
            m = (minutes < 10 ? "0" : "") + minutes + ":";
            s = (seconds < 10 ? "0" : "") + seconds;
            return h + m + s;
        };
        //時間差轉化為 xx天00小时00分00秒
        MXTools.prototype.format_second2 = function (sec, full) {
            if (full === void 0) { full = false; }
            if (sec <= 0) {
                return "0小时0分0秒";
            }
            var days = Math.floor(sec / 86400);
            var hours = Math.floor((sec % 86400) / 3600);
            var minutes = Math.floor(sec % 3600 / 60);
            var seconds = sec % 60;
            var d, h, m, s;
            if (days == 0) {
                d = "";
            }
            else {
                d = days + "天";
            }
            if (hours == 0 && !full) {
                h = "";
            }
            else {
                h = (hours < 10 ? "0" : "") + hours + "时";
            }
            m = (minutes < 10 ? "0" : "") + minutes + "分";
            s = (seconds < 10 ? "0" : "") + seconds + "秒";
            return d + h + m + s;
        };
        //-----------------格式转换相关---------------------------------------
        MXTools.prototype.o2s = function (data) {
            var rstr = "";
            for (var key in data) {
                rstr += key + "/" + encodeURIComponent(data[key]) + "/";
            }
            return rstr;
        };
        MXTools.prototype.check_num_str = function (str, max) {
            if (max === void 0) { max = 0; }
            str = str.replace(/[^0-9]+/g, ''); //每次变化都会刷新
            var n = Number(str);
            if (max && n > max) {
                n = max;
            }
            n = n || "";
            return n.toString();
        };
        MXTools.prototype.check_str_str = function (str, max) {
            if (max === void 0) { max = 0; }
            str = str.replace(/[0-9]+/g, ''); //每次变化都会刷新
            return str;
        };
        //先替換关键字，然后填色
        MXTools.prototype.setStrColor = function (word, keyword, color) {
            if (word.indexOf("{0}") < 0) {
                return [{ text: word }];
            }
            var i = 1;
            for (i; i < 10; i++) {
                var re = new RegExp('\\{' + i + '\\}', 'gm');
                word = word.replace(re, "{0}");
            }
            var arr = word.split("{0}");
            var wordarr = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    wordarr.push({ text: arr[i] });
                }
                var kw = keyword[i];
                if (typeof kw != "undefined") {
                    var c_c = void 0;
                    if (color) {
                        c_c = i < color.length ? color[i] : color[0];
                    }
                    else {
                        c_c = 0xB00000;
                    }
                    wordarr.push({ text: kw + "", style: { textColor: c_c } });
                }
            }
            return wordarr;
        };
        //先替換关键字，然后填色并改变大小
        MXTools.prototype.setStrColorSize = function (word, keyword, color, size) {
            if (word.indexOf("{0}") < 0) {
                return [{ text: word }];
            }
            var i = 1;
            for (i; i < 10; i++) {
                var re = new RegExp('\\{' + i + '\\}', 'gm');
                word = word.replace(re, "{0}");
            }
            var arr = word.split("{0}");
            var wordarr = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    wordarr.push({ text: arr[i] });
                }
                var kw = keyword[i];
                if (typeof kw != "undefined") {
                    var c_c = void 0;
                    var c_s = void 0;
                    if (color) {
                        c_c = i < color.length ? color[i] : color[0];
                    }
                    else {
                        c_c = 0xB00000;
                    }
                    if (size) {
                        c_s = i < size.length ? size[i] : size[0];
                    }
                    else {
                        c_s = 26;
                    }
                    wordarr.push({ text: kw + "", style: { textColor: c_c, size: c_s } });
                }
            }
            return wordarr;
        };
        //将标记部分的字符串着色后以textflow形式返回，标记示例："hello {0world0}! See {1you1}!"
        MXTools.prototype.setKeywordColor2 = function (word, color) {
            var keyarr = [];
            for (var i = 0; i < 10; i++) {
                var re = new RegExp('\\{' + i + '.*' + i + '\\}', 'gm');
                if (word.search(re) == -1) {
                    break;
                }
                var t = word.match(re)[0];
                var n = t.replace("{" + i, "");
                n = n.replace(i + "}", "");
                keyarr.push(n);
                word = word.replace(t, "{" + i + "}");
            }
            return this.setStrColor(word, keyarr, color);
        };
        //格式化字符串 Lang.format("{0}，你好，你喜欢吃{1}吗？", "小明" ,"棒棒糖");
        MXTools.prototype.format = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                for (var i = 0; i < args.length; i++) {
                    var re = new RegExp('\\{' + i + '\\}', 'gm');
                    var rps = typeof args[i] == "undefined" ? "" : args[i].toString();
                    str = str.replace(re, rps);
                }
            }
            return str;
        };
        MXTools.prototype.arr2obj = function (arr, key) {
            var obj = {};
            var ln = arr.length;
            if (ln) {
                for (var i = 0; i < ln; i++) {
                    var cd = arr[i];
                    obj[cd[key]] = cd;
                }
            }
            return obj;
        };
        MXTools.prototype.obj2arr = function (obj) {
            var arr = [];
            for (var k in obj) {
                arr.push(obj[k]);
            }
            return arr;
        };
        MXTools.prototype.sort_array = function (arr, key, type) {
            for (var i = 0, len = arr.length; i < len - 1; i++) {
                var flag = 0;
                for (var j = 0; j < len - i - 1; j++) {
                    if (type == 2) {
                        if (arr[j][key] > arr[j + 1][key]) {
                            var temp = [];
                            temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                            flag = 1;
                        }
                    }
                    else {
                        if (arr[j][key] < arr[j + 1][key]) {
                            var temp = [];
                            temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                            flag = 1;
                        }
                    }
                }
                if (!flag)
                    break;
            }
            var b = [].concat(arr);
            return b;
        };
        MXTools.prototype.num2color = function (n, status) {
            if (status === void 0) { status = false; }
            n = Number(n);
            if ((n == -1 || n == 7) && status) {
                return 0xa0a0a0; //死亡
            }
            else if ((n == 0 || n == 5) && status) {
                return 0x9c86a5; //正常
            }
            else if (n == 1 && status) {
                return 0xfe3d3d; //病
            }
            else if ((n <= 4 || n == 7) && status) {
                return 0x5eb95c; //孕,难产
            }
            else if (n < 80) {
                return 0x97807c;
            }
            else if (n < 85) {
                return 0x5bb351;
            }
            else if (n < 90) {
                return 0x34a0f3;
            }
            else if (n < 95) {
                return 0xb34bd9;
            }
            else if (n < 100) {
                return 0xff4b4b;
            }
            else if (n < 120) {
                return 0xfebd04;
            }
            else {
                return 0xff4b4b;
            }
        };
        MXTools.prototype.num2str = function (n) {
            var num = n ? Number(n) : 0;
            if (num < 100000) {
                return "" + num;
            }
            else if (num < 100000000) {
                return Math.floor(num / 10000) + mx.Lang.p0054;
            }
            else {
                return Math.floor(num / 100000000) + mx.Lang.p00540;
            }
        };
        MXTools.prototype.num2chinese = function (n) {
            var numstr = n ? String(n) : '0';
            var numword = mx.Lang.numword;
            var unitword = mx.Lang.unitword;
            var a = numstr.replace(/(^0*)/g, "").split(".");
            var re = "";
            var k = 0;
            if (n == 1) {
                return numword[10];
            }
            for (var i = a[0].length - 1; i >= 0; i--) {
                switch (k) {
                    case 0:
                        re = unitword[0] + re;
                        break;
                    case 4:
                        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                            re = unitword[4] + re;
                        break;
                    case 8:
                        re = unitword[5] + re;
                        unitword[0] = unitword[5];
                        k = 0;
                        break;
                }
                if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                    re = numword[0] + re;
                if (a[0].charAt(i) != 0)
                    re = numword[a[0].charAt(i)] + unitword[k % 4] + re;
                k++;
            }
            if (re.indexOf(numword[1] + unitword[1]) == 0) {
                re = re.replace(numword[1] + unitword[1], unitword[1]);
            }
            return re;
        };
        //随机名字
        MXTools.prototype.random_name = function () {
            var names = mx.ApiTool.getAPI(mx.MX_APINAME.PNAME);
            var xing = names.xing;
            var xln = xing.length;
            var ming = names.ming;
            var mln = ming.length;
            var ming2 = names.ming2;
            var mln2 = ming2.length;
            var x1 = xing[Math.floor(Math.random() * xln)];
            var m1 = ming[Math.floor(Math.random() * mln)];
            var m2 = ming2[Math.floor(Math.random() * mln2)];
            var m3 = ming2[Math.floor(Math.random() * mln2)];
            return x1 + m1 + m2 + m3;
        };
        //随机子女名
        MXTools.prototype.random_child_name = function (sex) {
            if (sex === void 0) { sex = 1; }
            var names = mx.ApiTool.getAPI(mx.MX_APINAME.ZINVQUMING);
            var center = names.center_name;
            var boy = names.male_name;
            var girl = names.female_name;
            var rand1 = Math.floor(Math.random() * center.length);
            var rand2 = Math.floor(Math.random() * boy.length);
            var rand3 = Math.floor(Math.random() * girl.length);
            return center[rand1] + (sex == 1 ? girl[rand3] : boy[rand2]);
        };
        //随机官职
        MXTools.prototype.random_guanzhi = function () {
            var guanzhi = mx.ApiTool.getAPI(mx.MX_APINAME.GUANZHI);
            var rand = Math.floor(Math.random() * guanzhi.length);
            return guanzhi[rand];
        };
        //随机封号
        MXTools.prototype.random_fenghao = function () {
            var fenghao = mx.ApiTool.getAPI(mx.MX_APINAME.FENGHAO);
            var rand = Math.floor(Math.random() * fenghao.length);
            return fenghao[rand];
        };
        //随机谥号（前缀）妃子：type=FZSHIHAO 子女：type=ZNSHIHAO，子女没有part3
        MXTools.prototype.random_shihao = function (type) {
            var shihao = mx.ApiTool.getAPI(mx.MX_APINAME[type]);
            var rand1 = Math.floor(Math.random() * shihao.part1.length);
            var rand2 = Math.floor(Math.random() * shihao.part2.length);
            var rand3 = type == "FZSHIHAO" ? Math.floor(Math.random() * shihao.part3.length) : null;
            return shihao.part1[rand1] + shihao.part2[rand2] + (type == "FZSHIHAO" ? shihao.part3[rand3] : "");
        };
        // ~！@#￥%……&（）——+·=-{}|“”：《》？、。，‘’；【】、·~!@#$%^&()_-`[]\;'|:",./?><↑↓←→
        // 封号和谥号只能中文
        // 创建角色，子女命名，家族创建命名，赐字支持中文，英文，符号: ~！@#￥%……&（）——+·=-{}|“”：《》？、。，‘’；【】、·~!@#$%^&()_-`[]\;'|:",./?><↑↓←→
        MXTools.prototype.check_name_form = function (str, type) {
            if (type === void 0) { type = "notype"; }
            var facade = mx.ApplicationFacade.getInstance();
            if (str && str != "") {
                var reg = void 0;
                var st = void 0;
                switch (type) {
                    case "zw":
                        reg = new RegExp("^[\u4e00-\u9fa5]+$", "g");
                        st = mx.Lang.st004;
                        break;
                    default:
                        reg = new RegExp("^[\u4e00-\u9fa5!-)+-/:-~↑↓←→！￥……（）·“”：《》？、。，‘’；【】、——]+$", "g"); //new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$", "g");
                        st = mx.Lang.st015;
                        break;
                }
                if (reg.test(str)) {
                    return true;
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": st });
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.st014 });
            }
            return false;
        };
        //敏感字校验
        MXTools.prototype.check_msg = function (name, type, no) {
            if (type === void 0) { type = "msg"; }
            name = name.replace(/\s/g, ""); //过滤空格
            if (no) {
                return name;
            }
            var map2 = this.get_MGZ_MAP();
            var words2 = mx.Tools.check(map2, name);
            var ln2 = words2.length;
            for (var i = 0; i < ln2; i++) {
                var reg = new RegExp(words2[i], "g"); //创建正则RegExp对象
                name = name.replace(reg, "*");
            }
            return name;
        };
        MXTools.prototype.get_mgz = function (name) {
            var map = this.get_MGZ_MAP();
            var words = mx.Tools.check(map, name);
            return words;
        };
        MXTools.prototype.buildMap = function (wordList) {
            var result = [];
            var count = wordList.length;
            for (var i = 0; i < count; ++i) {
                var map = result;
                var word = wordList[i];
                for (var j = 0; j <= word.length; ++j) {
                    if (map["undone"]) {
                        delete map["undone"];
                    }
                    var ch = word.charAt(j);
                    if (j == word.length) {
                        map["empty"] = "true";
                    }
                    else if (typeof (map[ch]) == "undefined") {
                        map[ch] = { "undone": true };
                        map = map[ch];
                    }
                    else if (typeof (map[ch]) != "undefined") {
                        map = map[ch];
                    }
                }
            }
            return result;
        };
        MXTools.prototype.check = function (map, content) {
            var result = [];
            var count = content.length;
            var stack = [];
            var point = map;
            for (var i = 0; i <= count; ++i) {
                var ch = content.charAt(i);
                var item = point[ch];
                if (typeof item == "undefined") {
                    if (point["empty"] && stack.length > 0) {
                        result.push(stack.join(""));
                        i = i - stack.length;
                    }
                    stack = [];
                    point = map;
                }
                else if (ch != "") {
                    stack.push(ch);
                    point = item;
                }
            }
            return result;
        };
        MXTools.prototype.get_MGZ_MAP = function () {
            if (!this.MGZ_MAP) {
                this.MGZ_MAP = this.buildMap(mx.ApiTool.getAPI(mx.MX_APINAME.MGZ));
            }
            return this.MGZ_MAP;
        };
        MXTools.prototype.add_qq = function () {
            if (window && window["mx_add_qq"]) {
                window["mx_add_qq"]();
            }
        };
        MXTools.prototype.add_qq2 = function () {
            if (window && window["mx_add_qq2"]) {
                window["mx_add_qq2"]();
            }
        };
        Object.defineProperty(MXTools.prototype, "screen_height", {
            get: function () {
                return Math.min(egret.MainContext.instance.stage.stageHeight, mx.MX_COMMON.GS_HEIGHT);
            },
            enumerable: true,
            configurable: true
        });
        MXTools.prototype.fixed_screen = function (c_m, bl) {
            if (bl === void 0) { bl = 2; }
            if (c_m && typeof c_m.y == "number") {
                var s_h = egret.MainContext.instance.stage.stageHeight;
                if (s_h > mx.MX_COMMON.GS_HEIGHT) {
                    c_m.y -= (s_h - mx.MX_COMMON.GS_HEIGHT) / 2;
                }
                else if (bl) {
                    c_m.y += (s_h - mx.MX_COMMON.GS_HEIGHT) / bl;
                }
                c_m.y = Math.round(c_m.y);
            }
        };
        MXTools.prototype.get_item_res = function (type, id) {
            var res = "item169_png";
            switch (Number(type)) {
                case 1://银币
                    res = "dyb_png";
                    break;
                case 2://元宝
                    res = "ybao_png";
                    break;
                case 3://体力
                    res = "tl_png";
                    break;
                case 4://item
                    if (id == 2033) {
                        id = 2013;
                    }
                    var str = "item" + id + "_png";
                    var item = this.get_item_info(type, id);
                    if (item.Category == 4) {
                        var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, 'equip_id', id);
                        if (hero) {
                            str = this.get_mn_res(hero.id, "monstx");
                        }
                        else {
                            //console.warn("不存在的灵魂石 ：" + id);
                        }
                    }
                    if (RES.hasRes(str)) {
                        res = str;
                    }
                    break;
                case 5://女王经验
                    res = "nwjy_png";
                    break;
                case 6://美男经验
                    res = "";
                    break;
                case 7://英雄
                    res = this.get_mn_res(id, "monstx");
                    break;
                case 9://服装
                    res = "i_" + id + "_png";
                    break;
                case 10://70头像
                    res = "tx70_" + id + "_png";
                    break;
                case 110://78头像
                    res = "tx78_" + id + "_png";
                    break;
                case 11://紫晶币
                    res = 'zjb120_png';
                    break;
            }
            return res;
        };
        MXTools.prototype.get_item_info = function (type, id) {
            var res = {};
            switch (Number(type)) {
                case 1://银币
                    res = { "name": mx.Lang.ybi, "Description": mx.Lang.ybims };
                    break;
                case 2://元宝
                    res = { "name": mx.Lang.ybao, "Description": mx.Lang.ybaoms };
                    break;
                case 3://体力
                    res = { "name": mx.Lang.tili, "Description": mx.Lang.tilims };
                    break;
                case 4://item
                    res = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", id);
                    break;
                case 5://女王经验
                    res = { "name": mx.Lang.nwjy, "Description": mx.Lang.nwjyms };
                    break;
                case 6://美男经验
                    res = "";
                    break;
                case 7://英雄
                    res = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", id);
                    break;
                case 9://服装
                    res = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", id);
                    break;
                case 10: //头像
                case 110:
                    res = { "name": mx.Lang["tx_" + id] };
                    break;
                case 11://紫晶币
                    res = { "name": mx.Lang.hs0034, "Description": mx.Lang.r0040 };
                    break;
                default:
                    res = null;
                    break;
            }
            return res;
        };
        MXTools.prototype.get_zn_res = function (mid, type) {
            mid = Number(mid);
            var str;
            var c_wh = Math.floor(mid / 10000) || 1;
            switch (type) {
                case "lh"://立绘
                    str = "zn" + mid + "_png";
                    if (!RES.hasRes(str)) {
                        str = "zn" + (mid - mid % 100 + 1) + "_png";
                    }
                    break;
                case "jq": //翻牌子
                case "tx"://头像
                    str = "zn" + type + mid + "_png";
                    if (!RES.hasRes(str)) {
                        str = "zn" + type + (mid - mid % 100 + 1) + "_png";
                    }
                    break;
                case "ttx": //最女青年时期头像
                case "tlh"://子女青年时期立绘
                    var c_z_wh = Math.floor(mid / 1000);
                    str = "zn" + type + c_z_wh + "01_png";
                    if (c_z_wh == 11) {
                        var c_ml_n = Math.floor(mid % 1000 / 100); //取第三位魅力段
                        if (c_ml_n == 4) {
                            str = "zn" + type + c_z_wh + "02_png";
                        }
                        else if (c_ml_n == 3) {
                            str = "zn" + type + c_z_wh + "03_png";
                        }
                    }
                    break;
            }
            return str;
        };
        MXTools.prototype.get_mn_res = function (mid, type) {
            var res;
            mid = Number(mid);
            switch (type) {
                case "lh"://立绘 480*644
                    if (mid >= 300 && mid < 1000 && mid != 307) {
                        var new_id = this.hero2zn[mid];
                        if (mid >= 902 && mid <= 906) {
                            new_id = mid + 10399;
                        }
                        else if (mid >= 907 && mid <= 913) {
                            new_id = mid + 11394;
                        }
                        return this.get_zn_res(new_id, "lh");
                    }
                    if (mid < 2000) {
                        res = "a" + (mx.MX_COMMON.SC_LH_BASE + mid) + "_png";
                        if (mid == 307) {
                            //侍从神乐特殊
                            var rand = Math.random();
                            if (rand < 0.5) {
                                res = "a" + (mx.MX_COMMON.SC_LH_BASE + mid + 1000) + "_png";
                            }
                        }
                    }
                    else {
                        res = "a" + mid + "_png";
                    }
                    if (!RES.hasRes(res)) {
                        res = "a9001_png";
                    }
                    break;
                case "dh"://兑换 96*400 用于兑换、编队、养心殿
                    if (mid >= 300 && mid < 1000) {
                        var new_id = this.hero2zn[mid];
                        if (mid >= 304 && mid <= 307) {
                            new_id = this.hero2zn[307];
                        }
                        else if (mid >= 310 && mid <= 319) {
                            new_id = this.hero2zn[mid];
                        }
                        else if (mid >= 902 && mid <= 906) {
                            new_id = mid + 10399;
                        }
                        else if (mid >= 907 && mid <= 913) {
                            new_id = mid + 11394;
                        }
                        return this.get_zn_res(new_id, "jq");
                    }
                    res = "mnan" + mid + "_png";
                    break;
                case "name":
                    res = "hname" + mid + "_png";
                    break;
                case "role"://龙骨动画
                    res = "role" + mid;
                    if (!RES.hasRes(res + "_tex_png")) {
                        res = "role1";
                    }
                    break;
                case "arole":
                    res = "arole" + mid;
                    if (!RES.hasRes(res + "_tex_png")) {
                        res = "arole1";
                    }
                    break;
                case "tx"://统一为110 * 126
                    type = "sctx";
                case "monster"://怪物
                    if (mid > 303 && mid < 308) {
                        mid = 307;
                    }
                    else if (mid >= 300 && mid < 10000) {
                        var new_id = this.hero2zn[mid];
                        if (mid >= 902 && mid <= 906) {
                            new_id = mid + 10399;
                        }
                        else if (mid >= 907 && mid <= 913) {
                            new_id = mid + 11394;
                        }
                        return this.get_zn_res(new_id, "tx");
                    }
                    else if (mid > 11000) {
                        return this.get_zn_res(mid, "tx");
                    }
                    res = type + mid + "_png";
                    if (!RES.hasRes(res)) {
                        res = type + "1_png";
                    }
                    break;
                case "monstx":// 怪物头像
                    res = type + mid + "_png";
                    if (!RES.hasRes(res)) {
                        res = type + "1_png";
                    }
                    break;
                case "big_ef":
                    if (Number(mid) < 10) {
                        res = 'eff_ult_0' + mid;
                    }
                    else {
                        res = 'eff_ult_' + mid;
                    }
                    if (!RES.hasRes(res + "_json")) {
                        res = "eff_ult_01";
                    }
                    break;
                case "bigsound":
                    res = "big" + mid + "_sound";
                    if (!RES.hasRes(res + "_mp3")) {
                        res = "big1_sound";
                    }
                    break;
                case "big_yuyin":
                    res = "sczd_" + mid + "_1";
                    if (!RES.hasRes(res + "_mp3")) {
                        res = null;
                    }
                    break;
                case "role_die":
                    res = "sczd_" + mid + "_2";
                    if (!RES.hasRes(res + "_mp3")) {
                        res = null;
                    }
                    break;
                case "role_yuyin":
                    var rid = Math.floor(Math.random() * 5) + 1;
                    res = "fzdj_" + mid + "_" + rid;
                    if (!RES.hasRes(res + "_mp3")) {
                        res = null;
                    }
                    break;
            }
            return res;
        };
        MXTools.prototype.get_xuetong_info = function (data) {
            var c_mn = data;
            var mid = Number(c_mn.mid);
            var index = 0;
            var lang;
            var str;
            var daishu = 0;
            var wenhua = 1;
            switch (mid) {
                case 308: //鬼族
                case 309:
                    wenhua = 7;
                    lang = mx.Lang.fzxt01;
                    break;
                case 303://人鱼
                    wenhua = 5;
                    lang = mx.Lang.fzxt03;
                    break;
                case 304: //狐妖
                case 305: //狐妖
                case 306: //狐妖
                case 307://狐妖
                    wenhua = 6;
                    lang = mx.Lang.fzxt04;
                    break;
                case 42://亚瑟
                    wenhua = 2;
                    lang = mx.Lang.fzxt05;
                    break;
                case 55://百花仙子
                    wenhua = 8;
                    lang = mx.Lang.fzxt06;
                    break;
                case 56://林中仙君
                    wenhua = 9;
                    lang = mx.Lang.fzxt07;
                    break;
                case 57://吸血鬼
                    wenhua = 12;
                    lang = mx.Lang.fzxt08;
                    break;
                default:
                    if (c_mn.daishu) {
                        var xuetong = c_mn.daishu.split("_");
                        index = xuetong[1];
                        var daishu2 = mx.Tools.n2s_2(xuetong[0], 2);
                        lang = mx.Lang["fzxt" + daishu2];
                        var wenhua_arr = [1, 7, 7, 5, 6, 2, 8, 9, 12, 11];
                        wenhua = wenhua_arr[xuetong[0]];
                    }
                    break;
            }
            if (lang) {
                str = lang[index];
                daishu = index;
            }
            else {
                var wenhua2 = 1;
                if (mid <= 300) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
                    wenhua2 = Number(api.wenhua);
                }
                else {
                    wenhua2 = Math.floor(c_mn.avatar / 10000) || 1;
                }
                wenhua = wenhua2;
                daishu = 0;
                str = mx.Lang.fzxt2[wenhua - 1];
            }
            var info = { "daishu": daishu, "wenhua": wenhua, "str": str };
            return info;
        };
        MXTools.prototype.get_bb_res = function (type, state, avatar, meili) {
            var res = "";
            avatar = Number(avatar);
            var wh = Math.floor(avatar / 10000);
            switch (type) {
                case "tx"://头像
                    switch (state) {
                        case 0://婴儿
                            res = "bbtx" + (wh < 5 ? "1" : wh) + "_png";
                            break;
                        case 1://青年
                            res = this.get_zn_res(avatar, 'ttx');
                            break;
                        default://成年
                            res = this.get_zn_res(avatar, "tx");
                            break;
                    }
                    break;
                case "lh"://立绘
                    switch (state) {
                        case 0://婴儿
                            res = "bblh" + (wh < 5 ? "1" : wh) + "_png";
                            break;
                        case 1://青年
                            res = this.get_zn_res(avatar, 'tlh');
                            break;
                        default://成年
                            res = this.get_zn_res(avatar, "lh");
                            break;
                    }
                    break;
                case "znbg"://子女互动背景
                    if (wh == 11) {
                        res = "s1707_jpg";
                    }
                    else if (wh == 7) {
                        res = "s1515_jpg";
                    }
                    else if (wh == 8) {
                        res = "s1703_jpg";
                    }
                    else if (wh == 9) {
                        res = "s1704_jpg";
                    }
                    else if (wh == 12) {
                        res = "s1706_jpg";
                    }
                    else if (wh < 5 || wh == 6) {
                        if (state <= 1) {
                            res = "s702_jpg";
                        }
                        else {
                            var str = [];
                            if (meili < 81) {
                                str = ['507', '604', '610'];
                            }
                            else {
                                str = ['1605', '1606', '1607', '1609'];
                            }
                            var rid = Math.floor(Math.random() * str.length);
                            res = "s" + str[rid] + "_jpg";
                        }
                    }
                    else if (state > 1) {
                        var str = ['1610', '1538'];
                        var rid = Math.floor(Math.random() * str.length);
                        res = "s" + str[rid] + "_jpg";
                    }
                    else {
                        res = "s912_jpg";
                    }
                    break;
                case "fzbg"://妃子操作背景
                    if (wh == 11) {
                        res = "s1707_jpg";
                    }
                    else if (wh < 5 || wh == 6) {
                        res = "s1608_jpg";
                    }
                    else if (wh == 8) {
                        res = "s1703_jpg";
                    }
                    else if (wh == 9) {
                        res = "s1704_jpg";
                    }
                    else if (wh == 12) {
                        res = "s1706_jpg";
                    }
                    else {
                        res = "s1538_jpg";
                    }
                    break;
            }
            return res;
        };
        MXTools.prototype.status_to_str = function (n, type) {
            switch (type) {
                case "fz"://妃子
                    switch (n) {
                        case 1:
                            return mx.Lang.ztlx[2]; //病
                        case 0:
                            return mx.Lang.ztlx[1]; //健康
                        case -1:
                            return mx.Lang.ztlx[0]; //被打胎
                        case 5:
                            return mx.Lang.ztlx[6]; //已去世
                        case 6:
                            return mx.Lang.ztlx[7]; //撤牌
                        default:
                            return mx.Lang.ztlx[3]; //孕
                    }
                case "hz"://皇子
                    switch (n) {
                        case 1:
                            return mx.Lang.ztlx[10]; //幼年
                        case -1:
                        case 7:
                        case 8:
                            return mx.Lang.ztlx[6]; //已去世
                        case 0:
                            return mx.Lang.ztlx[11]; //婴儿
                        case 10:
                            return mx.Lang.ztlx[12]; //冷宫
                        default:
                            return mx.Lang.ztlx[9]; //成年
                    }
                case "xq"://省亲
                    switch (n) {
                        case 1:
                            return mx.Lang.ztlx[2]; //病
                        case 0:
                        case -1:
                        case 6:
                            return "";
                        default:
                            return mx.Lang.ztlx[3]; //孕
                    }
            }
        };
        MXTools.prototype.qinmi_to_gxi = function (qinmi) {
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.QINMI);
            var i = 6;
            if (api) {
                api.sort(function (a, b) {
                    return b.qinmi - a.qinmi;
                });
                for (i = 0; i < api.length; i++) {
                    if (qinmi >= api[i].qinmi) {
                        break;
                    }
                }
            }
            api = null;
            return 'gxi' + Math.min(10, i) + '_png';
        };
        MXTools.prototype.mx_grayfy = function (view, recover, matrix) {
            if (matrix === void 0) { matrix = mx.MX_GRAY_MATRIX; }
            if (recover) {
                view.filters = [];
            }
            else {
                view.filters = [new egret.ColorMatrixFilter(matrix)];
            }
        };
        Object.defineProperty(MXTools.prototype, "MAXLEVEL", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MXTools.prototype, "can_local_s", {
            get: function () {
                if (typeof this._can_ls == "undefined") {
                    this._can_ls = egret.localStorage.setItem("MX_TEST", "MX_TEST");
                }
                return this._can_ls;
            },
            enumerable: true,
            configurable: true
        });
        MXTools.prototype.check_user_locals = function (key, type) {
            if (type === void 0) { type = true; }
            var rlt = false;
            if (this.can_local_s) {
                var record = egret.localStorage.getItem(key);
                if (!record || record == "") {
                    record = "";
                    rlt = true;
                }
                else {
                    var arr2 = record.split("_");
                    if (arr2.indexOf(Main.USER_ID.toString()) < 0) {
                        rlt = true;
                    }
                }
                if (rlt && type) {
                    egret.localStorage.setItem(key, record + Main.USER_ID + "_");
                }
            }
            return rlt;
        };
        MXTools.prototype.get_mn_wf = function (hero, type) {
            if (type === void 0) { type = "yxd"; }
            var key;
            if (type == 'yxd') {
                var weifen = void 0;
                if (typeof hero.weifen2 != 'undefined') {
                    weifen = hero.weifen2;
                }
                else {
                    weifen = hero.weifen || 13;
                }
                key = weifen;
                var sex = Number(hero.sex) == 1;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", key);
                return sex ? api.weifeng : api.weifenb;
            }
            else {
                key = hero.fenghao;
                return key;
            }
        };
        //容错，报错采集器
        MXTools.prototype.error_catch = function (eMsg, eUrl, eLine) {
            this.mxalert("============>抓到一个报错:" + eUrl + "文件的第" + eLine + "行出错，报错内容为" + eMsg);
            return true;
        };
        MXTools.prototype.locate_tip = function (c_d) {
            switch (c_d.type + "") {
                case "10":
                    c_d.x += 30;
                    c_d.y -= c_d.tip_h;
                    return c_d;
                case "ysjj":
                    c_d.x -= 250;
                    c_d.y += c_d.h;
                    return c_d;
                case "qiuyuan":
                    c_d.x -= 20;
                    c_d.y -= c_d.tip_h;
                    return c_d;
            }
            if (c_d.x + c_d.w / 2 > 240) {
                if (c_d.tip_w < c_d.x - 5) {
                    c_d.x = c_d.x - c_d.tip_w - 5;
                }
                else {
                    c_d.x = 0;
                }
            }
            else {
                if (c_d.tip_w + c_d.x + c_d.w < 475) {
                    c_d.x = c_d.x + c_d.w + 5;
                }
                else {
                    c_d.x = 0;
                }
            }
            if (c_d.x == 0) {
                if (c_d.y + c_d.h + c_d.tip_h < mx.Tools.screen_height - 5) {
                    c_d.y = c_d.y + c_d.h + 5;
                }
                else {
                    c_d.y = c_d.y - 5 - c_d.tip_h;
                }
            }
            else {
                if (c_d.y + c_d.tip_h < mx.Tools.screen_height) {
                    c_d.y = c_d.y;
                }
                else {
                    c_d.y = c_d.y - c_d.tip_h;
                }
            }
            mx.Tools.fixed_screen(c_d);
            return c_d;
        };
        MXTools.prototype.get_jianjie = function (sex, id) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var jianjie = pproxy.jianjie;
            var arr = [];
            for (var k in jianjie) {
                if (jianjie[k]) {
                    var msg = jianjie[k].msg;
                    var key_id = Number(jianjie[k].key_id);
                    switch (key_id) {
                        case 6:
                        case 21:
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", msg);
                            msg = Number(sex) == 1 ? api.weifeng : api.weifenb;
                            break;
                        case 20:
                            var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
                            msg = xproxy.get_shihao(id);
                            break;
                        case 22:
                        case 23:
                            msg = msg.split('|');
                            break;
                    }
                    if (key_id == 22 || key_id == 23) {
                        msg = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], msg[0], msg[1]);
                    }
                    else {
                        msg = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], msg);
                    }
                    msg = mx.Tools.setKeywordColor2(msg, [mx.Tools.num2color(200)]);
                    var time = mx.Tools.format_time(jianjie[k].time, "nyr");
                    arr.push({
                        "data": time,
                        "jianjie": msg
                    });
                }
            }
            return arr;
        };
        MXTools.prototype.mxalert = function (msg) {
            switch (mx.AppConfig.MXTag) {
                case "wb":
                    if (window && window["mx_show_tip"]) {
                        window["mx_show_tip"](msg);
                    }
                    break;
                default:
                    if (mx.AppConfig.GameTag == "WX") {
                        mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
                    }
                    else {
                        alert(msg);
                    }
                    break;
            }
        };
        MXTools.prototype.debug_mode = function (str) {
            var arr = str.split("@");
            switch (arr[1]) {
                case "face"://人脸识别
                    if (window && window["check_local_images"]) {
                        window["check_local_images"]();
                    }
                    break;
                default:
                    if (window && window["QQ_sdk_test"]) {
                        window["QQ_sdk_test"](Main.USER_ID, arr[1]);
                    }
                    break;
            }
        };
        MXTools.prototype.view2base64 = function (view, rect) {
            var rect64 = rect || new egret.Rectangle(0, 0, 480, mx.Tools.screen_height);
            var rt = new egret.RenderTexture;
            rt.drawToTexture(view, rect64);
            //jpeg 黑色底衬，数据量更小，png透明底衬
            var base64 = rt.toDataURL("image/jpeg", rect64); //"image/jpeg"
            return base64;
        };
        MXTools.prototype.base64str = function (data) {
            var base64 = "";
            base64 = data;
            if (base64.indexOf(";base64,") == -1) {
                var imageType = "image/png"; //default value
                if (base64.charAt(0) === '/') {
                    imageType = "image/jpeg";
                }
                else if (base64.charAt(0) === 'R') {
                    imageType = "image/gif";
                }
                else if (base64.charAt(0) === 'i') {
                    imageType = "image/png";
                }
                base64 = "data:" + imageType + ";base64," + base64;
            }
            return base64;
        };
        MXTools.prototype.base64_image = function (data, callback) {
            var base64 = this.base64str(data);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                "type": "txt", "txt": base64.length + " " + base64
            });
            var img = new Image();
            img.src = base64;
            img.crossOrigin = '*';
            img["avaliable"] = true;
            img.onload = function () {
                var texture = new egret.Texture();
                var bitmapdata = new egret.BitmapData(img);
                texture.bitmapData = bitmapdata;
                if (callback) {
                    callback(texture);
                }
                else {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "type": "image", "image": texture
                    });
                }
            };
        };
        MXTools.prototype.url_image = function (url, data, callback, obj) {
            var _this = this;
            data = data || {};
            if (data.type == "head50") {
                url = url.slice(0, -2) + "100";
            }
            var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            mx.MGTool.check_image(1, url).then(function (value) {
                if (value.mg == 2) {
                    RES.getResByUrl(url, function (texture) {
                        var view = data.view;
                        if (view) {
                            view.source = texture;
                            if (data.width) {
                                view.width = data.width;
                                view.height = Math.round(texture.textureHeight / texture.textureWidth * data.width);
                            }
                            if (data.height) {
                                view.height = data.height;
                                view.width = Math.round(texture.textureWidth / texture.textureHeight * data.height);
                            }
                        }
                        else if (callback && obj) {
                            callback.call(obj, texture);
                            //obj.callback(texture);
                        }
                        else {
                            /*ApplicationFacade.getInstance().sendNotification(MX_NOTICE.SHOW_TOP_UI, {
                                "type" : "image", "image" : texture
                            });*/
                        }
                    }, _this, RES.ResourceItem.TYPE_IMAGE);
                }
                else {
                    var view = data.view;
                    view.source = _this.get_item_res(110, Number(gProxy.user_avatar));
                    if (data.width) {
                        view.width = data.width;
                        view.height = data.width;
                    }
                    if (data.height) {
                        view.height = data.height;
                        view.width = data.height;
                    }
                }
            }, function () {
                var view = data.view;
                view.source = _this.get_item_res(110, Number(gProxy.user_avatar));
                if (data.width) {
                    view.width = data.width;
                    view.height = data.width;
                }
                if (data.height) {
                    view.height = data.height;
                    view.width = data.height;
                }
            });
        };
        MXTools.prototype.renlian_change = function (data, fz) {
            if (fz.mid >= 900 && fz.mid < 1000 && fz.ren_lian && fz.ren_lian != "") {
                this.url_image(fz.ren_lian, data);
            }
            else {
                if (data.type == 'yxd') {
                    data.view.set_lh(0 - fz.mid);
                }
                else {
                    data.view.source = this.get_mn_res(fz.mid, "lh");
                }
                //
            }
        };
        MXTools.prototype.check_drgon = function () {
            var ret = !!window["WebGLRenderingContext"];
            return ret;
        };
        MXTools.prototype.check_version = function (ver) {
            if (ver && ver != "") {
                var old_v = mx.AppConfig.VERSION;
                if (ver != mx.AppConfig.VERSION) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Tools.format(mx.Lang.version, old_v, ver),
                            "notice_ok": mx.MX_NOTICE.GAME_LOGOUT,
                            "sdata_ok": true,
                        }
                    });
                }
            }
        };
        MXTools.prototype.get_fz_whq = function (fz) {
            var whq;
            var mid = Number(fz.mid);
            if (mid < 900) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
                whq = api.wenhua;
                api = null;
            }
            else if (mid < 1000) {
                whq = 1;
            }
            else {
                whq = Math.floor(Number(fz.avatar) / 10000);
                if (fz.daishu && fz.daishu != "") {
                    var arr = fz.daishu.split("_");
                    if (arr[0] == "1" || arr[0] == "2") {
                        whq = 7;
                    }
                }
            }
            return whq;
        };
        //添加黑名单
        MXTools.prototype.add_hmdan = function (user_id, lang) {
            if (lang === void 0) { lang = mx.Lang.hmdan03; }
            user_id = Number(user_id);
            var facade = mx.ApplicationFacade.getInstance();
            var cProxy = (facade.retrieveProxy(mx.ChatProxy.NAME));
            cProxy.remove_pri(user_id); //移除私聊
            var hmdan = egret.localStorage.getItem("hmdan");
            if (!hmdan || hmdan == "") {
                var str = JSON.stringify([]);
                egret.localStorage.setItem("hmdan", str);
            }
            var arr = JSON.parse(localStorage.getItem("hmdan"));
            if (arr.indexOf(user_id) == -1) {
                arr.push(user_id);
                localStorage.setItem("hmdan", JSON.stringify(arr));
                var a_d2 = {
                    "param": lang,
                    "btn_n": 1
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return true;
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan01 });
                return false;
            }
        };
        //解除黑名单
        MXTools.prototype.jiechu_hmdan = function (user_id) {
            user_id = Number(user_id);
            var facade = mx.ApplicationFacade.getInstance();
            var hmdan = egret.localStorage.getItem("hmdan");
            var arr = JSON.parse(localStorage.getItem("hmdan"));
            var idx = arr.indexOf(user_id);
            if (idx > -1) {
                arr.splice(idx, 1);
                localStorage.setItem("hmdan", JSON.stringify(arr));
                var a_d2 = {
                    "param": mx.Lang.hmdan05
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return true;
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan06 });
                return false;
            }
        };
        //判断是否在黑名单
        MXTools.prototype.in_hmd = function (user_id) {
            var hmdan = egret.localStorage.getItem("hmdan");
            var in_pinbi = false;
            if (!hmdan || hmdan == "") {
                var str = JSON.stringify([]);
                egret.localStorage.setItem("hmdan", str);
            }
            else {
                var arr = JSON.parse(hmdan);
                if (arr.indexOf(user_id) > -1) {
                    in_pinbi = true;
                }
            }
            return in_pinbi;
        };
        //打开私聊
        MXTools.prototype.open_pri_chat = function (data) {
            var facade = mx.ApplicationFacade.getInstance();
            var cproxy = (facade.retrieveProxy(mx.ChatProxy.NAME));
            cproxy.sort_pri(); //重排私聊对象
            if (data) {
                cproxy.add_pri({
                    "user_id": data.user_id,
                    "user_avatar": data.avatar,
                    "user_name": data.name
                });
            }
            else {
                cproxy.cur_pri_index = cproxy.pri_list.length > 0 ? 0 : -1; //默认第一个为当前私聊对象
            }
            mx.PriChatScreen.P_NAME = mx.AppConfig.CURR_SCENE_ID;
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PriChatScreen.S_NAME);
        };
        MXTools.prototype.check_view_state = function (view, type) {
            if (type === void 0) { type = "screen"; }
            var sopen = false;
            var c_con = egret.MainContext.instance.stage; //舞台;
            c_con = c_con.getChildAt(0); //Main;
            c_con = c_con.getChildAt(0); //AppContainer;
            switch (type) {
                case "screen"://场景
                    c_con = c_con._screen_g;
                    break;
                case "alert"://弹窗
                    c_con = c_con._pop_g;
                    break;
            }
            var cview = c_con.getChildByName(view);
            if (cview) {
                sopen = true;
            }
            return sopen;
        };
        MXTools.prototype.check_fate = function (target_fate, hero_arr) {
            var res = true;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROFATE, "id", target_fate);
            if (!api) {
                return false;
            }
            var need_id = [];
            need_id.push(Number(api.h_id));
            for (var i = 1; i <= 4; i++) {
                if (Number(api["hero" + i]) != 0) {
                    need_id.push(Number(api["hero" + i]));
                }
            }
            if (hero_arr) {
                for (var k in hero_arr) {
                    hero_arr[k] = Number(hero_arr[k]);
                }
            }
            for (var j in need_id) {
                var result = hero_arr ? hero_arr.indexOf(need_id[j]) >= 0 : hproxy.get_hero_by_mid(need_id[j]);
                if (!result) {
                    res = false;
                    break;
                }
            }
            return res;
        };
        MXTools.prototype.check_jiuzi = function (target) {
            var res = true;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIKAIQI, "id", target);
            if (!api) {
                return false;
            }
            var jiuzi = mx.ApiTool.getAPINode(mx.MX_APINAME.JIUZIADD, "type", api.jiuzi);
            if (Number(jiuzi.is_open) == 0) {
                return false;
            }
            var hero = hproxy.get_hero_by_mid(api.hero_id);
            var hero_info = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", api.hero_id);
            var need_hero = String(api.open_hero).split("|");
            var need_star = String(api.open_star).split("|");
            var need_quality = String(api.open_quality).split("|");
            var need_jiuzi = String(api.open_jiuzi_type).split("|");
            var need_jiuzilv = String(api.jiuzi_level).split("|");
            var need_fy = Number(api.open_fenyin);
            var fyin = String(hero_info.fyin).split('|');
            var now_fy = 0;
            for (var i in fyin) {
                //封印详细数据
                var unit = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUL, "id", fyin[i]);
                if (Number(hero.quality) >= Number(unit.condition)) {
                    if (hero.fy_skill[unit.id]) {
                        now_fy += Number(hero.fy_skill[unit.id].level);
                    }
                    else {
                        now_fy++;
                    }
                }
            }
            if (now_fy < need_fy) {
                return false;
            }
            for (var k in need_hero) {
                var n_hero = Number(need_hero[k]) == 0 ? hero : hproxy.get_hero_by_mid(need_hero[k]);
                if (!n_hero) {
                    res = false;
                    break;
                }
                if (Number(need_star[k]) > Number(n_hero.star)) {
                    res = false;
                    break;
                }
                if (Number(need_quality[k]) > Number(n_hero.quality)) {
                    res = false;
                    break;
                }
                if (Number(need_jiuzi[k]) != 0 && Number(need_jiuzilv[k]) > Number(n_hero.nine_word[Number(need_jiuzi[k]) - 1]) - 1) {
                    res = false;
                    break;
                }
            }
            return res;
        };
        MXTools.prototype.cal_quality_cor = function (quality) {
            var color;
            if (quality == 1) {
                color = 0x6a698c; //白
            }
            else if (quality < 4) {
                color = 0x41850f; //绿
            }
            else if (quality < 7) {
                color = 0x2e7cd6; //蓝
            }
            else if (quality < 12) {
                color = 0xba49a5; //紫
            }
            else {
                color = 0xd49600; //橙
            } //黄：efc504  红：ff4b4b
            return color;
        };
        MXTools.prototype.show_recharge = function () {
            var a_d = {
                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                "param": mx.Lang.a0006
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        MXTools.prototype.draw_cirsiderec = function (startx, starty, width, height, color) {
            var smallwidth = width - height;
            var halfheight = height / 2;
            var myShape = new egret.Shape();
            myShape.graphics.beginFill(color);
            myShape.graphics.drawRect(startx + halfheight, starty, smallwidth, height);
            myShape.graphics.drawCircle(startx + halfheight, starty + halfheight, halfheight);
            myShape.graphics.drawCircle(startx + smallwidth + halfheight, starty + halfheight, halfheight);
            myShape.graphics.endFill();
            return myShape;
        };
        MXTools.prototype.draw_cirhornrec = function (startx, starty, width, height, radii, color) {
            var smallwidth = width - 2 * radii;
            var smallheight = height - 2 * radii;
            var middleheight = height - radii;
            var middlewidth = width - radii;
            var myShape = new egret.Shape();
            myShape.graphics.beginFill(color);
            myShape.graphics.drawRect(startx, radii + starty, radii, smallheight);
            myShape.graphics.drawRect(radii + starty, startx, smallwidth, height);
            myShape.graphics.drawRect(middlewidth + startx, starty + radii, radii, smallheight);
            myShape.graphics.drawCircle(startx + radii, starty + radii, radii);
            myShape.graphics.drawCircle(startx + radii, middleheight + starty, radii);
            myShape.graphics.drawCircle(middlewidth + startx, starty + radii, radii);
            myShape.graphics.drawCircle(middlewidth + startx, middleheight + starty, radii);
            myShape.graphics.endFill();
            return myShape;
        };
        MXTools.prototype.get_guide_sound = function (id) {
            var sound = mx.ApiTool.getAPINode(mx.MX_APINAME.SOUND, "id", id);
            var sound_name = sound.mp3_id;
            return sound_name;
        };
        //播放按钮音效
        MXTools.prototype.play_music = function (c_music) {
            if (RES.hasRes(c_music + "_mp3")) {
                var facade = mx.ApplicationFacade.getInstance();
                facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                    "name": c_music, "type": "ef"
                });
            }
        };
        MXTools.prototype.jiami = function (sl, die_num, stage_id) {
            //私key
            var key = 'nvbx0dhg';
            //拼接
            var str = '';
            str += this.get_str(3);
            str += sl[0];
            str += sl[1];
            str += this.get_str(2);
            str += sl[2];
            str += sl[3];
            str += this.get_str(5);
            str += (die_num + '');
            str += this.get_str(6);
            str += (stage_id + '');
            var sign = [];
            for (var i = 0; i < str.length; ++i) {
                var code = '';
                var j = i % 8;
                var keycode = key.substr(j, 1);
                var datacode = keycode.charCodeAt(0) ^ str[i].charCodeAt(0);
                sign.push(datacode);
            }
            return sign;
        };
        MXTools.prototype.get_str = function (len) {
            var str = '';
            var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            for (var i = 0; i < len; ++i) {
                var rid = Math.floor(Math.random() * arr.length);
                str += arr[rid];
            }
            arr = [];
            return str;
        };
        MXTools.prototype.check_share = function () {
            var type = mx.AppConfig.MXTag.split("_")[0];
            if (["h5", "wxgame"].indexOf(type) > -1) {
                return true;
            }
            else {
                return false;
            }
        };
        MXTools.prototype.share_game = function (data) {
            var type = mx.AppConfig.MXTag.split("_")[0];
            switch (type) {
                case "h5":
                    if (window && window["share_game"]) {
                        window["share_game"](data.stype, data.uid, data.param);
                    }
                    break;
                case "wxgame":
                    break;
            }
        };
        return MXTools;
    }());
    mx.MXTools = MXTools;
    __reflect(MXTools.prototype, "mx.MXTools");
    mx.Tools = MXTools.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=Tools.js.map
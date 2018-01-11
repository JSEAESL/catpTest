/**
 *   @author qianjun
 *   @date 2015.1.21
 *   @desc 敏感字 敏感图片校验工具类
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mx;
(function (mx) {
    var CheckStrImgTool = (function () {
        function CheckStrImgTool() {
            //文本类检测接口：
            //http://uic.gamesafe.qq.com/uiccgi.cgi?accounttype=1&account=375308806&gameid=2104&platid=0&world=0&busi_sign=TXdvfekr243230zS2Rd5&cmd=2&callbackdata=test&textcategory=1&text=uictext
            this.param = ["accounttype", "account", "gameid", "platid", "world", "busi_sign", "cmd", "callbackdata", "textcategory"];
        }
        CheckStrImgTool.getInstance = function () {
            if (!CheckStrImgTool.instance) {
                CheckStrImgTool.instance = new CheckStrImgTool();
            }
            return CheckStrImgTool.instance;
        };
        //cmd 图片业务：1 文本业务：2 文本中获取联系方式：3
        //textcategory 角色名结果汇聚：1  用户签名结果采集：2  用户描述结果采集：3  用户发言消息结果采集：4  标题：5  内容：6   其它内容的采集：7
        //text 文本内容
        CheckStrImgTool.prototype.check_str = function (cmd, textcategory, text) {
            return __awaiter(this, void 0, void 0, function () {
                var platid, str, url, append_str, request;
                return __generator(this, function (_a) {
                    platid = 2;
                    str = egret.Capabilities.os;
                    if (str == 'iOS') {
                        platid = 0;
                    }
                    else if (str == 'Android') {
                        platid = 1;
                    }
                    else {
                        platid = 2;
                    }
                    this.platid = platid;
                    url = "https://uic.gamesafe.qq.com/uiccgi.cgi";
                    append_str = "?accounttype=1&account=" + Main.OPEN_ID + "&gameid=2644&platid=" + this.platid + "&world=" + Main.SER_ID + "&busi_sign=21N3vlc9QW05JYDId6v4&cmd=" + cmd + "&callbackdata=test&textcategory=" + textcategory + "&text=" + text;
                    request = new egret.HttpRequest();
                    url += append_str;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            request.responseType = "json";
                            request.open(url, egret.HttpMethod.GET);
                            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request.send();
                            request.addEventListener(egret.Event.COMPLETE, function () {
                                return resolve(request.response);
                            }, this);
                        })];
                });
            });
        };
        CheckStrImgTool.prototype.get_str = function (textcategory, text) {
            return __awaiter(this, void 0, void 0, function () {
                var facade, str, ret_data, obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            facade = mx.ApplicationFacade.getInstance();
                            str = '';
                            return [4 /*yield*/, this.check_str(2, textcategory, text)];
                        case 1:
                            ret_data = _a.sent();
                            obj = {};
                            obj.mg = false;
                            if (ret_data.ret == 0) {
                                str = ret_data.data.msg;
                                if (Number(ret_data.data.text_check_ret) == 1) {
                                    obj.mg = true;
                                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc001 });
                                }
                            }
                            else {
                                str = text; //'';//临时屏蔽校验
                                //facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.wbjc002 });
                            }
                            obj.str = str;
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        CheckStrImgTool.prototype.check_image = function (piccategory, image_url) {
            return __awaiter(this, void 0, void 0, function () {
                var facade, ret_data, obj, explain;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            facade = mx.ApplicationFacade.getInstance();
                            return [4 /*yield*/, this.get_image(piccategory, image_url)];
                        case 1:
                            ret_data = _a.sent();
                            obj = {};
                            obj.mg = 0;
                            if (ret_data.ret == 0) {
                                // str = ret_data.data.msg;
                                obj.mg = Number(ret_data.data.pic_check_ret_);
                                if (obj.mg == 1) {
                                    explain = '';
                                    switch (Number(ret_data.data.pic_check_ret_type_)) {
                                        case 10001:
                                            explain = '广告';
                                            break;
                                        case 20001:
                                            explain = '政治';
                                            break;
                                        case 20002:
                                            explain = '色情';
                                            break;
                                        case 20006:
                                            explain = '违法犯罪';
                                            break;
                                        case 20008:
                                            explain = '期诈';
                                            break;
                                        case 20013:
                                            explain = '版权问题';
                                            break;
                                        case 20107:
                                            explain = '领导人头像';
                                            break;
                                    }
                                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.wbjc004, explain) });
                                }
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc003 });
                            }
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        CheckStrImgTool.prototype.get_image = function (piccategory, image_url) {
            return __awaiter(this, void 0, void 0, function () {
                var platid, str, url, append_str, request;
                return __generator(this, function (_a) {
                    platid = 2;
                    str = egret.Capabilities.os;
                    if (str == 'iOS') {
                        platid = 0;
                    }
                    else if (str == 'Android') {
                        platid = 1;
                    }
                    else {
                        platid = 2;
                    }
                    this.platid = platid;
                    url = "https://uic.gamesafe.qq.com/uiccgi.cgi";
                    append_str = "?accounttype=1&account=" + Main.USER_ID + "&gameid=2644&platid=" + this.platid + "&world=" + Main.SER_ID + "&busi_sign=21N3vlc9QW05JYDId6v4&cmd=1&callbackdata=test&piccategory=" + piccategory + "&picurl=" + image_url;
                    request = new egret.HttpRequest();
                    url += append_str;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            request.responseType = "json";
                            request.open(url, egret.HttpMethod.GET);
                            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request.send();
                            request.addEventListener(egret.Event.COMPLETE, function () {
                                return resolve(request.response);
                            }, this);
                        })];
                });
            });
        };
        return CheckStrImgTool;
    }());
    mx.CheckStrImgTool = CheckStrImgTool;
    __reflect(CheckStrImgTool.prototype, "mx.CheckStrImgTool");
    mx.MGTool = CheckStrImgTool.getInstance();
})(mx || (mx = {}));
//# sourceMappingURL=CheckStrImgTool.js.map
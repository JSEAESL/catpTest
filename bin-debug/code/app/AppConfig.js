/**
 * mx@2016/05/24
 * 项目基本配置
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var AppConfig = (function () {
        function AppConfig() {
        }
        Object.defineProperty(AppConfig, "holdRes", {
            /*config中包含的静态表
            "api.TASK",//任务
            "api.RECHARGE",//充值
            "api.SYSTEMLOG",//系统记录
            "api.OPEN",//开启
            "api.TILIPRICE",//体力价格
            "api.LEVEL",//等级
            "api.HERO",//侍从
            "api.HEROSTARS",//升星召唤价格
            "api.TAIMIAO",//太庙-仙品
            "api.HEROFATE",//英雄缘分
            */
            get: function () {
                return ["public", "load", "main", "recharge", "GUIDEINFO", "EQUIP", "LOADSTR", "JSONVER", "SKILL"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "GameTag", {
            get: function () {
                return Main.GameTag || window["MXGameTag"] || "h5";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "MXTag", {
            get: function () {
                return Main.MXTag || window["MXTag"] || "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "OPENMODE", {
            get: function () {
                return Main.OPENMODE || window["OPENMODE"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "HB_ID", {
            get: function () {
                return Main.HB_ID || window["hb_id"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "FROM_ID", {
            get: function () {
                return Main.FROM_ID || window["from_id"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "SERVER_ADD", {
            get: function () {
                switch (AppConfig.MXTag) {
                    case "yace":
                        return "https://gd3.hdyouxi.com/gong3_yace/index.php/Index/api";
                    case "h5": //h5版本
                    case "wxgame": //微信游戏版
                    default:
                        if (Number(Main.SER_ID) == 3) {
                            return "https://nh.hdyouxi.com/gong3_wxtest/wending/index.php/Index/api";
                        }
                        else {
                            return "https://nh.hdyouxi.com/gong3_wxtest/index.php/Index/api";
                        }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "JSON_PATH", {
            get: function () {
                if (window && window["MX_JSONPATH"]) {
                    return window["MX_JSONPATH"];
                }
                switch (AppConfig.MXTag) {
                    case "wxdevp"://微信手机版
                        return "wxjson/";
                    case "h5":
                        return "https://s.hdyouxi.com/gong3_h5test/json/";
                    case "h5_dev":
                        return "https://s.hdyouxi.com/gong3_h5dev/json/";
                    case "yace":
                        return "https://s.hdyouxi.com/gong3_st/json/";
                    default:
                        return "https://nh.hdyouxi.com/gong3_wxtest/json/json2/";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "WEBS_ADD", {
            get: function () {
                switch (AppConfig.MXTag) {
                    default://正式版本
                        return "wss://wss_gong3_test.nibaguai.com/ws";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "VERSION", {
            get: function () {
                return Main.VERSION || window["MX_VERSION"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "RESPATH", {
            get: function () {
                return Main.RESPATH || window["MX_RESPATH"] || "resource/";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig, "RESBASE", {
            get: function () {
                return Main.RESBASE || window["MX_RESBASE"] || "base/";
            },
            enumerable: true,
            configurable: true
        });
        AppConfig.get_time_mode = function (check) {
            if (check || !this.time_mode) {
                var now = new Date();
                var hh = now.getHours();
                if (hh >= 5 && hh < 18) {
                    this.time_mode = mx.MX_COMMON.TIME_DAY;
                }
                else {
                    this.time_mode = mx.MX_COMMON.TIME_NIGHT;
                }
            }
            return this.time_mode;
        };
        AppConfig.get_day_mode = function (check) {
            if (check || !this.day_mode) {
                var now_time = new Date(Number(new Date().getTime()) + 8 * 3600 * 1000); //当前时间戳*1000
                var now_y = now_time.getUTCFullYear();
                var now_m = Number(now_time.getUTCMonth()) + 1;
                var now_d = now_time.getUTCDate();
                this.day_mode = now_y + "-" + now_m + "-" + now_d;
            }
            return this.day_mode;
        };
        AppConfig.check_not_support = function (type) {
            var spt = false;
            return spt;
        };
        AppConfig.check_open_acty = function () {
            var res;
            if (window && window["mx_acty_time"]) {
                var arr = window["mx_acty_time"];
                var now = new Date().getTime();
                now /= 1000;
                if (now >= arr[0] && now <= arr[1]) {
                    res = "s1706_jpg";
                }
            }
            return res;
        };
        return AppConfig;
    }());
    mx.AppConfig = AppConfig;
    __reflect(AppConfig.prototype, "mx.AppConfig");
})(mx || (mx = {}));
//# sourceMappingURL=AppConfig.js.map
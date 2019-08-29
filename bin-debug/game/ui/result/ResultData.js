var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResultData = (function () {
    function ResultData() {
        this._state = false;
        this._step = 0;
    }
    ResultData.creatData = function (state, step) {
        var result = new ResultData();
        result._state = state;
        if (state && !egret.localStorage.getItem("WinStep")) {
            egret.localStorage.setItem("WinStep", step + "");
        }
        else if (state) {
            var winStep = parseInt(egret.localStorage.getItem("WinStep"));
            if (step < winStep) {
                egret.localStorage.setItem("WinStep", step + "");
            }
        }
        result._step = step;
        return result;
    };
    Object.defineProperty(ResultData.prototype, "score", {
        get: function () {
            if (!this._state) {
                return 0;
            }
            return 100 - this._step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultData.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    return ResultData;
}());
__reflect(ResultData.prototype, "ResultData");
//# sourceMappingURL=ResultData.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资源加载工具类，
 * 支持多个resource.json文件加载
 */
var ResJsonUtils = (function () {
    /**
     * 构造函数
     */
    function ResJsonUtils() {
        this._configs = new Array();
    }
    // 	//加载多个资源文件
    // ResJsonUtils.getInstance().addConfig("resource/test.json","resource/");
    // ResJsonUtils.getInstance().addConfig("resource/test2.json","resource/");
    // ResJsonUtils.getInstance().loadConfig(this.onConfigComplete, this);
    ResJsonUtils.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ResJsonUtils();
        }
        return this.instance;
    };
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    ResJsonUtils.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    ResJsonUtils.prototype.loadConfig = function ($onConfigComplete, $onConfigCompleteTarget) {
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载
     */
    ResJsonUtils.prototype.loadNextConfig = function () {
        //加载完成
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    /**
     * 加载完成
     * @param event
     */
    ResJsonUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    return ResJsonUtils;
}());
__reflect(ResJsonUtils.prototype, "ResJsonUtils");
//# sourceMappingURL=ResJsonUtils.js.map
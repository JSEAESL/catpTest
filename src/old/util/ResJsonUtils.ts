/**
 * 资源加载工具类，
 * 支持多个resource.json文件加载
 */
class ResJsonUtils  {
    private static instance:ResJsonUtils;
    private _configs: Array<any>;
    private _onConfigComplete: Function;
    private _onConfigCompleteTarget: any;

// 	//加载多个资源文件
// ResJsonUtils.getInstance().addConfig("resource/test.json","resource/");
// ResJsonUtils.getInstance().addConfig("resource/test2.json","resource/");
// ResJsonUtils.getInstance().loadConfig(this.onConfigComplete, this);

    public static getInstance():ResJsonUtils{
        if(this.instance == null){
            this.instance = new ResJsonUtils();
        }
        return this.instance;
    }
    
    /**
     * 构造函数
     */
    public constructor() {
        this._configs = new Array<any>();
    }

    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addConfig(jsonPath: string,filePath: string): void {
        this._configs.push([jsonPath,filePath]);
    }

    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig($onConfigComplete: Function,$onConfigCompleteTarget: any): void {
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.loadNextConfig();
    }

    /**
     * 加载
     */
    private loadNextConfig(): void {
        //加载完成
        if(this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }

        var arr: any = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        RES.loadConfig(arr[0],arr[1]);
    }

    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        this.loadNextConfig();
    }
}
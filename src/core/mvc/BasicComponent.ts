class BasicComponent extends eui.Component {
	 public adata;//protected adata;

        public constructor(cd ?: any) {
            super();

            if(cd){
                this.adata = cd;
            }
            // let c_class = this["__class__"] as string;
            // let c_arr = c_class.split(".");
            // this.name = c_arr[1];
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.addEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
        }
        
        private _onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
            this.onAddTostage()
            //this.set_skinname();
        }

        protected onAddTostage():void
        {

        }

        protected onRmovestage():void
        {

        }

        // //通用的绑定皮肤方法，子类可覆盖
        // protected set_skinname() : void{
        //     let cname = this.name;
        //     // if(AppConfig.GameTag == "WX"){//微信使用另一套机制
        //     //     let skinname = cname + "Skin";
        //     //     this.skinName = MX_SKIN[skinname];
        //     // }else{
        //     this.skinName = RES.getRes(cname + "Skin_exml");//默认使用立刻获取的方式
        //     //}
        // }
        private mx_created(event:eui.UIEvent):void{
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
            this.pre_init();
        }
        //子类初始化操作
        protected pre_init() : void{}
        protected on_remove() : void{
            this.onRmovestage();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
        }
}

module mx {
    export class AppContainer extends eui.UILayer {

        public constructor() {
            super();
            this.initElement();            
        }

        private bg_g : eui.Group;
        private initElement():void
        {
            let g_arr = ["bg_g"];
            for(let k in g_arr){
                let c_g = new eui.Group();
                c_g.percentWidth = 100;
                c_g.touchEnabled = false;
                c_g.height = GameConfig.stageHeight
                c_g.verticalCenter = 0;
                this.addChild(c_g);
                this[g_arr[k]] = c_g;
            }
            this.addList = [];
        }

        public enterGame():void
        {
            console.log("enterGame");
            this.change_view("GameStart");
        }
        private addList:any[]
        public add_view(viewName:any):void
        {
           let c_class = egret.getDefinitionByName("mx." + viewName);
            if (c_class) {
                let screen: any = <eui.Component><any>new c_class(viewName.param);
                this.bg_g.addChild(screen);
                this.addList.push(screen);
            }
        }

        private cleanNowView():void
        {
            if(this.nowView && this.nowView.parent)
            {
                this.nowView.parent.removeChild(this.nowView);
            }
            for(var k in this.addList)
            {
                if(this.addList[k] && this.addList[k].parent)
                {
                    this.addList[k].parent.removeChild(this.addList[k]);
                }
            }
        }

        private nowView:BasicComponent;
        public change_view(viewName:any):void
        {
            this.cleanNowView();
            let c_class = egret.getDefinitionByName("mx." + viewName);
            if (c_class) {
                let screen: any = <BasicComponent><any>new c_class(viewName.param);
                this.nowView = screen 
                this.bg_g.addChild(screen);
            }
        }
        
    }
}
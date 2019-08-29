class ResultData {
	private _state:boolean = false;
	private _step:number = 0;

	public constructor() 
	{
	}

	public static creatData(state:boolean,step:number):ResultData
	{
		var result:ResultData = new ResultData();
		result._state = state;

		if(state && !egret.localStorage.getItem("WinStep"))
		{
			egret.localStorage.setItem("WinStep",step + "");
		}else if(state)
		{
			var winStep:number =  parseInt(egret.localStorage.getItem("WinStep"))
			if(step<winStep)
			{
				egret.localStorage.setItem("WinStep",step + "");
			}
		}

		result._step = step;
		return result;
	}

	public get score():number
	{
		if(!this._state)
		{
			return 0
		}
		return 100 - this._step; 
	}

	public get state():boolean
	{
		return this._state;
	}

}
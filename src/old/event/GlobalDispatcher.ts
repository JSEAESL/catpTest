class GlobalDispatcher extends egret.EventDispatcher
{
	private static _ins:GlobalDispatcher;
	public static get Ins():GlobalDispatcher
	{
		if(null == this._ins)
		{
			this._ins = new GlobalDispatcher();
		}
		return this._ins;
	}

	public constructor() 
	{
		super();
	}
}
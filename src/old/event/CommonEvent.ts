class CommonEvent extends egret.Event{
	private _data:any;
	public constructor(type:string, data:any = null,bubbles:boolean=false, cancelable:boolean=false) {
		super(type,bubbles,cancelable);
		this._data = data;
	}

	public get data():any
	{
		return this._data;
	}

}
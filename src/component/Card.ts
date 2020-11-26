class Card extends egret.Sprite{
    constructor(){
        super();
    }
    /**cardKey:卡牌位置，控制排列用*/
    public cardKey:number;

    /**cardValue:卡牌的值或名稱，控制兩次點擊是否一樣*/
    public cardValue:string;

    /**cardStatus:卡牌的狀態，"cardFace":正面狀態、"cardBack":反面狀態、"resolved":永久正面*/
    public cardStatus:string;

    /**cardInside:卡牌內插圖 */
    public cardbody:egret.Bitmap;
    public cardInside:egret.Bitmap;

    /**SetData:設定卡牌內容 */
    public SetData(){
            /**設定初始值 */
            this.cardbody = new egret.Bitmap(RES.getRes(this.cardStatus+'_png'));
            this.cardbody.scaleX =0.5;
            this.cardbody.scaleY =0.5;
            this.cardbody.touchEnabled = true;

            this.cardInside = new egret.Bitmap(RES.getRes(this.cardValue+'_png'));
            this.cardInside.x =this.cardInside.width /2;
            this.cardInside.y =this.cardInside.height /2;
            this.cardInside.scaleX = 0.8;
            this.cardInside.scaleY =0.8;
            this.cardInside.anchorOffsetX = this.cardInside.width /2;
            this.cardInside.anchorOffsetY = this.cardInside.height /2;

            this.addChild(this.cardbody);
            this.addChild(this.cardInside);
            /**翻牌效果 */
        if (this.cardStatus==="cardFace") {
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);

            this.cardbody.texture = RES.getRes(this.cardStatus+'_png');
  
            this.addChild(this.cardbody);
            this.addChild(this.cardInside);

        } else if (this.cardStatus==="cardBack"){
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);

            this.cardbody.texture = RES.getRes(this.cardStatus+'_png');
  
            this.addChild(this.cardbody);
            
        }else if(this.cardStatus==="resolved"){
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);
            this.cardbody.texture = RES.getRes("cardFace_png");
            this.addChild(this.cardbody);
            this.addChild(this.cardInside);
        }
    }
}
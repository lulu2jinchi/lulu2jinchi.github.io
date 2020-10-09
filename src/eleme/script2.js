
var app = new Vue({
    el: "#app",
    data: {
        list: [
            {
                name: '10块香辣鸡翅',
                priceO: 60,
                price: 49,
                num: 0,
                pic: 'pic7.jpg',
                miaoshu: '香辣多汁，口感鲜美。十块香辣鸡翅。',
                isRecommended: false,
            },
            {
                name: '堡堡双人套餐T',
                priceO: 112.5,
                price: 84,
                num: 0,
                pic: 'pic8.jpg',
                miaoshu: '香辣鸡腿堡1个+新奥尔良烤鸡腿堡1个+2块香辣鸡翅+2块新奥尔良烤翅+土豆泥+鸡米花+红豆派+可乐+九珍一杯。',
                isRecommended: false,

            },
            {
                name: '六味小吃桶T',
                priceO: 88.5,
                price: 69,
                num: 0,
                pic: 'pic9.jpg',
                miaoshu: '4块烤翅+2块辣翅+1块原味鸡+5块黄金鸡块+1份劲爆鸡米花+红豆派+可乐+九珍一杯。',
                isRecommended: false,

            }
        ],
        leibie:[
        "新品上市",
        "桶",
        "串串 / 卤味",
        "K记饭桶",
        "美味汉堡 / 卷",
        "潮汉堡",
        "原味鸡",
        "鸡翅 / 鸡排",
        "小食 / 配餐",
        "甜品 / 冰淇淋",
        "炸鸡 / 啤酒",
        "缤纷饮料",
        "K咖啡",
        "儿童套餐",
        "量贩分享装",],
      
        comment: '味道是很不错的',
        isCartShow: false,
        
    },
    methods: {
        plusclick: function(item) {
            console.log(item);
            item.num++;
            
        },
        minusclick: function(item) {
            console.log(item);
            item.num--;
           
            
        },
        cartClick: function() {
            this.isCartShow = !this.isCartShow;
            console.log(this.isCartShow);
            if(this.allNum==0)
            this.isCartShow = false;
        },

        deleteClick: function(){
            for(let i=0;i<this.list.length;i++)
            this.list[i].num=0;
        
        }
    },
    computed:{
        allNum:function(){
            let allNum = 0;
            for(let i=0;i<this.list.length;i++){
            allNum += this.list[i].num;
            }
            return allNum;
        },
        allPrice:function(){
            let allPrice = 0;
            let single=[];
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].num==0){
                    single[i] = 0;
                }
                else if(this.list[i].num==1){
                    single[i] = this.list[i].price;
                }
                else{
                    single[i] = this.list[i].price+this.list[i].priceO*(this.list[i].num-1);
                }
            allPrice += single[i];
            }
            return allPrice;
        },
        allPriceO:function(){
            let allPriceO = 0;
            for(let i=0;i<this.list.length;i++){
            allPriceO += this.list[i].priceO*this.list[i].num;
            }
            return allPriceO;
        },
        chajia:function(){
            let chajia = 0;
            chajia=this.allPriceO-this.allPrice;
            return chajia;
        },
    }

});


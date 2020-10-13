const app = new Vue(
    {
        el: '#app',
        data: {
            // num: 0,
            show0: "",
            // show: "",
            // cal: 0,
            isFirst: true,
            result: "",
            leftNum: '',
            rightNum: '',
            op: null,
        },
        methods: {
            typetoinput(param) {
                if (this.isFirst) {
                    this.leftNum += param;
                    this.show0 += param;
                    // this.result = this.leftNum;
                } else {
                    this.rightNum += param;
                    this.show0 += param;
                    // this.result = this.rightNum;

                }
            },

            clear() {
                this.show0 = '';
                this.result='';
                this.leftNum='';
                this.rightNum='';
                isFirst = true;
            },

            back() {
                let str = this.show0;
                this.show0 = str.substring(0, str.length - 1);
            },
            value(op) {
                this.op = op;
                this.show0 += op;
                this.isFirst = false;
            },
            inputCal() {
                if (this.op === '+') {
                    this.result = parseFloat(this.leftNum) + parseFloat(this.rightNum);
                }
                if (this.op === '-') {
                    this.result = parseFloat(this.leftNum) - parseFloat(this.rightNum);
                    // this.result = this.leftNum - this.rightNum;
                }
                if (this.op === 'x') {
                    this.result = parseFloat(this.leftNum) * parseFloat(this.rightNum);
                }
                if (this.op === '÷') {
                    this.result = parseFloat(this.leftNum) / parseFloat(this.rightNum);
                }
                this.isFirst = true; 
               
                console.log(this.leftNum);
                console.log(this.rightNum);
                console.log(this.result);
                console.log(this.isFirst);
                console.log(this.op);
                this.rightNum='';
                this.leftNum = this.result;
                // this.show0 = this.result;

            }

        },
        mounted() { },
        computed: {


        },




    }
)
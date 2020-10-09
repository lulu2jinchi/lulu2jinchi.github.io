const app = new Vue(
    {
        el: '#app',
        data: {
            word: 'start',
            typeword: 'type "start"',
            type: '',
            isRight: null,
            num: 0,
            isfirst: false,
            notfirst: true,
            max: 0,
            iswin: false,
            time: 60,
            timeid: null,

        },
        methods: {
            rightOrNot: function () {
                if (this.word === this.type) {
                    let arr = ['javascript', 'stewardess', 'zephyr', 'sphinx', 'australia', 'integration', 'difficult', 'editor', 'suburban', 'assuming', 'obstinance', 'duck', 'ethnicity', 'wombat', 'monopoly', 'literally', 'ironic', 'irregardless', 'colonel', 'nonplussed', 'disinterested', 'enormity', 'lieutenant', 'seven', 'keyboard', 'juice', 'lazy', 'touch', 'destination', 'visual', 'asset', 'choir', 'dvorak', 'node', 'deno', 'yarn', 'template', 'index', 'ignore', 'social', 'distance', 'quarantine', 'typewriter', 'flagfalls', 'polyphony', 'skeuomorphism', 'help', 'socket', 'now', 'minimum', 'language', 'when', 'pillow', 'python', 'snake', 'banana', 'word', 'acceleration', 'googol', 'duffles', 'fluffy', 'daddy', 'people', 'which', 'number', 'oh', 'yeah', 'why', 'markup', 'markdown', 'typerapp', 'soundboard', 'shots', 'pug', 'jade', 'normalize', 'parcel', 'bundler', 'glob', 'blob', 'google', 'apple', 'microsoft', 'yahoo', 'duckduckgo', 'bing', 'firefox', 'brave', 'flutter', 'native', 'progressive', 'terminal', 'command', 'mask', 'studio', 'capitals', 'gist', 'github', 'penguin', 'isthmus', 'antarctic', 'anathema',];
                    let i = Math.floor(Math.random() * 100);
                    this.word = arr[i];
                    this.typeword = 'type "' + this.word + '"';
                    this.isRight = true;
                    this.type = '';
                    this.num++;
                    this.isfirst = true;
                    this.notfirst = false;
                    console.log(this.max);
                    if (this.num > this.max) {
                        this.max = this.num;
                        localStorage.setItem('key', this.max);
                    }
                }
                console.log(this.type);
                if (this.type == 'star' && !this.timeid) {
                    console.log('#### deng deng')
                    this.time = 60;
                    this.iswin = false;
                    this.timeid = setInterval(this.timeCal, 1000);
                    this.num = 0;
                }

            },
            timeCal: function () {
                if (this.word != 'start') {
                    this.time--;

                    if (this.time <= 0) {
                        clearInterval(this.timeid);
                        this.timeid = null;
                        this.isfirst = false;
                        this.notfirst = true;
                        this.iswin = true;
                        this.word = 'start';
                        this.typeword = 'type "start"';
                        this.type = '';
                    };

                }
            },

        },

        mounted() {
            // this.timeid = setInterval(this.timeCal, 1000);
            this.max = localStorage.getItem('key');
            console.log(this.time);


        },
    })

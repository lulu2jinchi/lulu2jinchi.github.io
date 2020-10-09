let newsList = [];
let newsSearchList = [];
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

let request = new XMLHttpRequest();
request.open('GET', 'http://127.0.0.1:5000/news_list', true);
request.send();
request.onreadystatechange = () => {
    // console.log('当前的请求状态是：' + request.readyState);
    if (request.readyState === 4) {
        // console.log('请求已经完成了');
        // console.log(JSON.parse(request.responseText));
        JSON.parse(request.responseText).forEach(
            n => {
                newsList.push(n);
            }
        );
    }
};

const app = new Vue(
    {
        el: '#app',
        mounted() {
            document.addEventListener("selectionchange", () => {
                this.isWordTranslated = true;
                let selObj = window.getSelection();
                let txt = selObj.toString();
                this.word = txt;
                console.log(this.word);
                if (!txt) {
                    this.isWordTranslated = false;
                    return;
                }
                let wordTranslationAddress = "http://127.0.0.1:5000/dict/" + txt;
                console.log(wordTranslationAddress);
                let request3 = new XMLHttpRequest();
                request3.open('GET', wordTranslationAddress, true);
                request3.send();
                request3.onreadystatechange = () => {
                    // console.log('当前的请求状态是：' + request3.readyState);
                    if (request3.readyState === 4) {
                        // console.log('请求已经完成了');
                        // console.log(request3.responseText);
                        // console.log(JSON.parse(request3.responseText));
                        this.translations = JSON.parse(request3.responseText);
                        console.log(this.translations);

                    }
                };
            })
        },
        data: {
            news: newsList,
            // newsSearch: newsSearchList,
            newsText: "",
            isBoxHidden: true,
            isTextHidden: false,
            newsPic: "",
            newsPic2: "",
            title: "",
            title2: "",
            word: "",
            translations: "",
            isWordTranslated: false,
            isclicked: false,
            isSearched: false,
            input: "",
            // shouye: true,
            // sousuo: false,
        },
        methods: {
            newsOpen: function (item) { 
                let newsId = "http://127.0.0.1:5000/article/" + item.id;
                console.log(newsId);
                let request2 = new XMLHttpRequest();
                request2.open('GET', newsId, true);
                request2.send();
                request2.onreadystatechange = () => {
                    // console.log('当前的请求状态是：' + request2.readyState);
                    if (request2.readyState === 4) {
                        // console.log('请求已经完成了');
                        // console.log(request2.responseText);
                        // console.log(JSON.parse(request2.responseText));
                        this.newsText = request2.responseText;
                        this.newsPic = item.img;
                        this.title = item.title;
                    }
                };
                // console.log('请求已经发送了');
                this.isBoxHidden = false;
                this.isTextHidden = true;
            },
            searchArea: function () {
                this.isclicked = true;
            },
            inputArticle: function () {
                let input = document.getElementById("#input").value;
                console.log(input);
            },
            print: function (event) {
                this.news = [];
                console.log('news', this.news);
                // this.isBoxHidden = false;
                // this.shouye = false;
                // this.sousuo = true;
                // let inputtxt = this.value;
                console.log(event);
                this.input = event.target.value;
                if (this.input.trim() === '') {
                    return ;
                }
                console.log(this.input);
                let request4 = new XMLHttpRequest();
                // let searchQ = 'http://127.0.0.1:5000/news_list?q=rain';
                let searchQ = 'http://127.0.0.1:5000/news_list?q=' + this.input;
                console.log(searchQ);
                request4.open('GET', searchQ, true);
                request4.send();
                request4.onreadystatechange = () => {
                    // console.log('当前的请求状态是：' + request.readyState);
                    if (request4.readyState === 4) {
                        // console.log('请求已经完成了');
                        console.log(JSON.parse(request4.responseText));
                        //    newsSearchList=JSON.parse(request4.responseText);
                        JSON.parse(request4.responseText).forEach(
                            n => {
                                this.news.push(n);
                            }
                        );
                       
                    }
                };
            },
        },
    }
)
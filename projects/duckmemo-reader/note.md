常用的http请求方法

GET， 用来获取数据 （拿用户信息）

get /user/1

{
    'name':dsfafsd
    'age':dsafsadf
    'gender‘：sdafd
}

POST， 用来修改数据

post '/user/1' 'name:dsdfsaf'

{
    'status': 'success',
}
 //修改成功

{
    'status': 'failed',
    'message': '当前用户不允许修改',
}

//修改失败

PUT， 用来新增数据

'/user' 'name=sdafsadf&age=sfasdf&gender=sasfsafsf'

{
    'status':'failed'
    'message':'当前用户名已被占用'
}

DELETE, 用来删除数据

delete '/user/1' 

{
    'status': 'failed',
    'message': '当前用户已被锁定'
}

== 在判断相等的时候会自动转换类型，有时会产生意想不到的结果
=== 就是严格相等

json字符串变对象 JSON.parse
对象变 json 字符串 JSON.stringify

duckmemo 接口

/news_list
/news_list?q=<word>

/dict/<word>

/article/<id>

js 里基本类型以外的变量都是引用

# 基本类型

基本类型变量都直接表示值本身

数字，字符串，true false， undefined， null

/**
      * 发送http请求的步骤
      * 新建一个 XMLHttpRequest 对象
      * 设置这个请求的参数
      * 参数一 方法 
      */


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

<form method='POST'>
    <input name='username'/>
    <input name='password'>
    username=liao&passowrd=dsadfd
</form>
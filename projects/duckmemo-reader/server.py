import requests
from bs4 import BeautifulSoup

news_url = 'http://www.chinadaily.com.cn/china/governmentandpolicy'
resp = requests.get(news_url)
# print(resp.text)

soup = BeautifulSoup(resp.text)

news_list = []
for item in soup.select('.mb10.tw3_01_2'):
    href = item.select('.tw3_01_2_p > a')[0]['href']
    title = item.select('h4 > a')[0].text
    time = item.select('.tw3_01_2_t > b')[0].text
    img = item.select('a > img')[0]['src']
    result = {
        'href': href,
        'title': title,
        'time': time,
        'img': img,
        'id': href.split('/')[-1][0:-5]
    }
    news_list.append(result)

def unescape(in_str):
    """Unicode-unescape string with only some characters escaped."""
    in_str = in_str.encode('unicode-escape')   # bytes with all chars escaped (the original escapes have the backslash escaped)
    in_str = in_str.replace(b'\\\\u', b'\\u')  # unescape the \
    in_str = in_str.decode('unicode-escape')   # unescape unicode
    return in_str

def bing(word):
    result = []
    resp = requests.get('https://cn.bing.com/dict/search?q=' + word)
    soup = BeautifulSoup(resp.text)
    for pos_item in soup.select('.li_pos'):
        pos = pos_item.select('.pos_lin > .pos')[0].text
        for item in pos_item.select('.de_co'):
            result.append(
                {
                'pos': pos,
                'def': item.text
                }
            )
    return result

# print(bing('test'))

from flask import Flask
from flask import jsonify
from flask import request
import base64

app = Flask(__name__, 
    static_url_path='',
    static_folder='',
    )

@app.route('/news_list')
def news():
    q = request.args.get('q')
    if not q:
        return jsonify(news_list)
    else:
        resp = requests.get('http://newssearch.chinadaily.com.cn/rest/en/search?keywords=' + q + '&sort=dp&page=0&curType=story')
        resp = resp.json()
        result = []
        for item in resp['content']:
            idd = base64.b32encode(item['url'].encode('utf8')).decode('ascii')
            url = item['url']
            img = ''
            if item['images']:
                img = item['images'][0]['url']
            title = item['dupTitle']
            time = item['pubDateStr']
            result.append(
                {
                    'id': idd,
                    'href': url,
                    'title': title,
                    'img': img,
                    'time': time
                }
            )
        return jsonify(result)


@app.route('/dict/<word>')
def dict(word=''):
    return jsonify(bing(word))

@app.route('/article/<id>')
def article(id=''):
    print(id)
    if not '=' in id:
        url = ''
        for item in news_list:
            if id == item['id']:
                url = item['href']
                break
        url = 'http:' + url
    else:
        url = base64.b32decode(id.encode('ascii')).decode('ascii')
        print('##########url###########')
        print(url)
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text)
    result = ''
    for p in soup.select("#Content p"):
        result += str(p)
    return result

# 现在的服务器的接口基本上都是返回 json 格式的数据

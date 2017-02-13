/**
 * Created by pengfeng on 2017/2/8.
 */
import http from 'http'
import fs from 'fs'
import cheerio from 'cheerio'
import request from 'request'
import {URL} from './params';

let i = 0;
fecth(URL)     //主程序开始运行

function fecth(url) {
    return startSpider(url)
}

function startSpider(url) {
    http.get(url, (res)=> {
        let [html,titles] = ['', []];
        res.setEncoding('UTF-8');
        res.on('data',  (chunk) =>{
            html += chunk;
        });
        res.on('end', ()=> {
            const $ = cheerio.load(html); //采用cheerio模块解析html
            const time = $('.article-info a:first-child').next().text().trim();
            const news_item = {
                //获取文章的标题
                title: $('div.article-title a').text().trim(),
                //获取文章发布的时间
                Time: time,
                //获取当前文章的url
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                //获取供稿单位
                author: $('[title=供稿]').text().trim(),
                //i是用来判断获取了多少篇文章
                i: i = i + 1
            }
            console.log(news_item);     //打印新闻信息
            const news_title = $("div.article-title a").text().trim();

            savedContent($,news_title);  //存储每篇文章的内容及文章标题

            savedImg($,news_title);    //存储每篇文章的图片及图片标题


            //下一篇文章的url
            const nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            const str1 = nextLink.split('-') ;  //去除掉url后面的中文
            const str = encodeURI(str1[0]);
            //这是亮点之一,通过控制I,可以控制爬取多少篇文章.
            if (i <= 500) {
                fecth(str);
            }

        });

    }).on('error',  (err) =>{
        console.log(err);
    });
}

//该函数的作用：在本地存储所爬取的新闻内容资源
function savedContent($, news_title) {
    $('.article-content p').each((index, item) =>{
        let x = $(this).text();
        let y = x.substring(0, 2).trim();
        if (y == '') {
            x = x + '\n';
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8',  (err) =>{
                if (err) {
                    console.log(err);
                }
            });
        }
    })
}
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($,news_title) {
    $('.article-content img').each(function (index, item) {
        let img_title = $(this).parent().next().text().trim();  //获取图片的标题
        if(img_title.length>35||img_title==""){
            img_title="Null";}
        let img_filename = img_title + '.jpg';
        let img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,(err,res,body)=>{
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}

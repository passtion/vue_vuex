import asyncBusboy from 'async-busboy';
import fs from 'fs';
import uuid from 'uuid';
import _ from 'lodash';
import images from "images";
export default async function(ctx, next) {
    const {files, fields} = await asyncBusboy(ctx.req);
    // console.log(files)
    // console.log(fields)
    //取得表单文件
    const filePath = `${__dirname}/uploads`;
    const newName = uuid.v1();
    const file = _.values(files)[0]
    const fileH = file.mimeType.split('/')[1];
    const fileName = `${newName}.${fileH}`;
    const logFileName = `${newName}_log.${fileH}`;
    await fs.rename(file.path, `${filePath}/${fileName}`)
    images(`${filePath}/${fileName}`)                     //Load image from file
    //加载图像文件
        .size(150)                              //Geometric scaling the image to 400 pixels width
        //等比缩放图像到150像素宽
        // .draw(images("logo.png"), 10, 10)    //Drawn logo at coordinates (10,10)
        //在(10,10)处绘制Logo
        .save(`${filePath}/${logFileName}`, {               //Save the image to a file,whih quality 50
            quality : 100                           //保存图片到文件,图片质量为100
        });

    //取得表单数据
    let str = '';
    for(let key in fields){
        str +=fields[key];
    }
    const imgUrl = `http://${ctx.request.header['x-forwarded-host']}/uploads`;
    const params = str ? JSON.parse(str) : {} ;
    params.body.img = `${imgUrl}/${fileName}`;
    params.body.logo_img = `${imgUrl}/${logFileName}`;
    return params;
}
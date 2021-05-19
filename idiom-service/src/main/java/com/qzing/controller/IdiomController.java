package com.qzing.controller;

import com.qzing.entity.Cy;
import com.qzing.entity.Response;
import com.qzing.service.IdiomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author qzing
 * @ClassName: IdiomController
 * @projectName: idiom-service
 * @description: TODO
 * @date 2021/4/19 11:14
 */
@Controller
@RequestMapping("/idiom")
@Slf4j
public class IdiomController {
    @Autowired
    private IdiomService idiomService;
    @ResponseBody
    @RequestMapping("/getIdiomRandom")
    public Response getIdiomRandom(){
        Cy idiomRandom = idiomService.getIdiomRandom();
        log.info("随机获取一个成语：{}",idiomRandom);
        return Response.getMsg(idiomRandom);
    }
    @ResponseBody
    @RequestMapping("/getIdiomByHead")
    public Response getIdiomByHead(String head){
        Cy idiomRandom = idiomService.getIdiomByHead(head);
        if(idiomRandom==null){
            log.info("没有这个字开头的成语：{}",head);
            return Response.getMsg("211");
        }
        log.info("根据开头获取一个成语：{}",idiomRandom);
        return Response.getMsg(idiomRandom);
    }
    @ResponseBody
    @RequestMapping("/isPass")
    public Response isPass(String idiom){
        boolean exist = idiomService.isExist(idiom);
        log.info("{}该成语是否存在：{}",idiom,exist);
        return Response.getMsg(exist);
    }
}

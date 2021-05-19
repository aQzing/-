package com.qzing.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * @author qzing
 * @ClassName: Response
 * @projectName: idiom-service
 * @description: TODO
 * @date 2021/4/19 15:01
 */
@Data
@AllArgsConstructor
public class Response {
    private  Integer code;
    private  String desc;
    private Object data;
    public static Response getMsg(){
        return new Response(200,"请求成功！",null);
    }
    public static Response getMsg(Object data){
        return new Response(200,"请求成功！",data);
    }
    public static Response getMsg(Integer code,Object data){
        return new Response(code,"请求成功！",data);
    }
}

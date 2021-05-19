package com.qzing.service;

import com.qzing.dao.CyDao;
import com.qzing.entity.Cy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @author qzing
 * @ClassName: IdiomService
 * @projectName: idiom-service
 * @description: TODO
 * @date 2021/4/19 14:40
 */
@Service
public class IdiomService {
    @Autowired
    private CyDao cyDao;
    /**
     * 随机获取一个成语
     * @return
     */
    public Cy getIdiomRandom(){
        List<Cy> list = cyDao.selectAllCys();
        //随机获取一个
        Cy cy = list.get((int) (Math.random() * list.size()));
        return cy;
    }

    /**
     * 根据开头获取成语
     * @param head
     * @return
     */
    public Cy getIdiomByHead(String head){
        List<Cy> list = cyDao.selectCysByHead(head);
        Cy cy = null;
        if(list!=null&&list.size()>0){
            //随机获取一个
            cy = list.get((int) (Math.random() * list.size()));
        }
        return cy;
    }

    /**
     * 判断这个成语是否存在
     * @param idiom
     * @return
     */
    public boolean isExist(String idiom){
        List<Cy> list = cyDao.selectCysByHead(idiom);
        if(list!=null&&list.size()>0){
            return  true;
        }
        return  false;
    }
}

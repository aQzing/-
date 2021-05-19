package com.qzing.dao;

import com.qzing.entity.Cy;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CyDao {
    Cy selectByPrimaryKey(Double id);

    /**
     * 查询所有成语
     * @return
     */
    List<Cy> selectAllCys();

    /**
     * 查询指定开头的成语
     * @param head 开头的字
     * @return
     */
    List<Cy> selectCysByHead(String head);


}
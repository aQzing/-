package com.qzing;

import com.qzing.dao.CyDao;
import com.qzing.entity.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.annotation.Cacheable;

@SpringBootTest
class IdiomServiceApplicationTests {
    @Autowired
    private CyDao cyDao;
    @Test
    void contextLoads() {
       // System.out.println(cyDao.selectCysByHead("为").size());
       // System.out.println(Response.ok(cyDao.selectCysByHead("为")));

    }


}

package com.qzing;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.qzing.dao")
public class IdiomServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(IdiomServiceApplication.class, args);
    }

}

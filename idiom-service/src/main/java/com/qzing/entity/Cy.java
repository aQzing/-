package com.qzing.entity;

import java.io.Serializable;
import lombok.Data;

/**
 * cy
 * @author 
 */
@Data
public class Cy implements Serializable {
    /**
     * id
     */
    private Double id;

    /**
     * 成语名字
     */
    private String name;

    /**
     * 拼音
     */
    private String spell;

    /**
     * 解释
     */
    private String content;

    /**
     * 典故
     */
    private String derivation;

    /**
     * 举例
     */
    private String samples;

    private static final long serialVersionUID = 1L;
}
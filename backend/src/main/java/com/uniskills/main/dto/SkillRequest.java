package com.uniskills.main.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillRequest {
    private String name;
    private String type; // TEACH or LEARN
    private Long userId;

}


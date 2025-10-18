package com.uniskills.main.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class MeetingRequest {
    private Long mentor_id;
    private Long learner_id;
    private String title;
    private String description;
    private String meeting_link;
    private LocalDateTime scheduled_date;
    private int duration;
    private String status;
}

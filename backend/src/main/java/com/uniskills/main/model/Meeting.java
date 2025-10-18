package com.uniskills.main.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "meetings")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDateTime scheduledDate;
    private int duration;
    private String meetingLink;
    private String status; // PENDING, ACCEPTED, REJECTED

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "learner_id")
    private User learner;
}

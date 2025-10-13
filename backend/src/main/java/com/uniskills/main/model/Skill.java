package com.uniskills.main.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Python", "Guitar", "UI Design"
    private String type;        // "TEACH" or "LEARN"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Skill() {}

    public Skill(String name, String type, User user) {
        this.name = name;
        this.type = type;
        this.user = user;
    }
}


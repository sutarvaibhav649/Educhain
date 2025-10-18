package com.uniskills.main.repository;

import com.uniskills.main.model.Meeting;
import com.uniskills.main.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByMentorOrLearner(User mentor, User learner);
}

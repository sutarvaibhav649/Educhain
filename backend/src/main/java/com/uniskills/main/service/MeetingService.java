package com.uniskills.main.service;

import com.uniskills.main.dto.MeetingRequest;
import com.uniskills.main.model.Meeting;
import com.uniskills.main.model.User;
import com.uniskills.main.repository.MeetingRepository;
import com.uniskills.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

//    @Autowired
//    private JavaMailSender mailSender;

    public MeetingService(MeetingRepository meetingRepository, UserRepository userRepository) {
        this.meetingRepository = meetingRepository;
        this.userRepository = userRepository;
    }

    // Create a new meeting
    public Meeting createMeeting(MeetingRequest req) {
        User mentor = userRepository.findById(req.getMentor_id())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));
        User learner = userRepository.findById(req.getLearner_id())
                .orElseThrow(() -> new RuntimeException("Learner not found"));

        Meeting meeting = new Meeting();
        meeting.setMentor(mentor);
        meeting.setLearner(learner);
        meeting.setTitle(req.getTitle());
        meeting.setDescription(req.getDescription());
        meeting.setScheduledDate(req.getScheduled_date());
        meeting.setDuration(req.getDuration());
        meeting.setStatus(req.getStatus());
        if (req.getMeeting_link() == null || req.getMeeting_link().isEmpty()) {
            meeting.setMeetingLink("https://meet.jit.si/" + UUID.randomUUID());
        } else {
            meeting.setMeetingLink(req.getMeeting_link());
        }

        // Send email notification
//        sendMeetingNotification(savedMeeting, "New Meeting Scheduled",
//                "Your meeting has been scheduled on " + savedMeeting.getScheduledDate());

        return meetingRepository.save(meeting);
    }

    // Get all meetings of a user
    public List<Meeting> getUserMeetings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return meetingRepository.findByMentorOrLearner(user, user);
    }

    // Update meeting status
    public Meeting updateMeetingStatus(Long id, String status) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        meeting.setStatus(status.toUpperCase());

        // Email notification
//        sendMeetingNotification(updated, "Meeting Status Updated",
//                "Your meeting status is now: " + updated.getStatus());

        return meetingRepository.save(meeting);
    }

    // Reschedule meeting
    public Meeting rescheduleMeeting(Long id, LocalDateTime newDate, Integer duration) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        meeting.setScheduledDate(newDate);
        if (duration != null) meeting.setDuration(duration);

        // Email notification
//        sendMeetingNotification(updated, "Meeting Rescheduled",
//                "Your meeting has been rescheduled to: " + updated.getScheduledDate());

        return meetingRepository.save(meeting);
    }

    // Cancel meeting
    public Meeting cancelMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        meeting.setStatus("CANCELED");

        // Email notification
//        sendMeetingNotification(updated, "Meeting Canceled",
//                "Your meeting scheduled on " + updated.getScheduledDate() + " has been canceled.");

        return meetingRepository.save(meeting);
    }

    // Search / Filter meetings
    public List<Meeting> searchMeetings(Long mentorId, Long learnerId, String status, String fromDate, String toDate) {
        List<Meeting> meetings = meetingRepository.findAll();

        if (mentorId != null)
            meetings = meetings.stream().filter(m -> m.getMentor().getId().equals(mentorId)).collect(Collectors.toList());

        if (learnerId != null)
            meetings = meetings.stream().filter(m -> m.getLearner().getId().equals(learnerId)).collect(Collectors.toList());

        if (status != null)
            meetings = meetings.stream().filter(m -> m.getStatus().equalsIgnoreCase(status)).collect(Collectors.toList());

        if (fromDate != null) {
            LocalDateTime from = LocalDateTime.parse(fromDate);
            meetings = meetings.stream().filter(m -> !m.getScheduledDate().isBefore(from)).collect(Collectors.toList());
        }

        if (toDate != null) {
            LocalDateTime to = LocalDateTime.parse(toDate);
            meetings = meetings.stream().filter(m -> !m.getScheduledDate().isAfter(to)).collect(Collectors.toList());
        }

        return meetings;
    }

    // Helper: Send email notification
//    private void sendMeetingNotification(Meeting meeting, String subject, String message) {
//        try {
//            SimpleMailMessage mail = new SimpleMailMessage();
//            mail.setTo(meeting.getMentor().getEmail(), meeting.getLearner().getEmail());
//            mail.setSubject(subject);
//            mail.setText(message);
//            mailSender.send(mail);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    // Get meeting by ID (used in controller)
    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
    }

    // Save meeting (used in controller)
    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }
}

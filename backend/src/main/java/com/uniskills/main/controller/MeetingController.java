package com.uniskills.main.controller;

import com.uniskills.main.dto.MeetingRequest;
import com.uniskills.main.model.Meeting;
import com.uniskills.main.repository.MeetingRepository;
import com.uniskills.main.repository.UserRepository;
import com.uniskills.main.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin
public class MeetingController {

    private final MeetingService meetingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    // Create a new meeting
    @PostMapping
    public ResponseEntity<?> createMeeting(@RequestBody MeetingRequest meetingRequest) {
        try {
            Meeting meeting = meetingService.createMeeting(meetingRequest);
            return ResponseEntity.ok(Map.of(
                    "message", "Meeting created successfully",
                    "meeting", meeting
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all meetings of a user
    @GetMapping("/user/{userId}")
    public List<Meeting> getUserMeetings(@PathVariable Long userId) {
        return meetingService.getUserMeetings(userId);
    }

    // Update meeting status (ACCEPTED, REJECTED, COMPLETED)
    @PutMapping("/{id}/status")
    public Meeting updateMeetingStatus(@PathVariable Long id, @RequestParam String status) {
        return meetingService.updateMeetingStatus(id, status);
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleMeeting(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Meeting meeting = meetingService.getMeetingById(id);

            if (updates.containsKey("scheduled_date")) {
                meeting.setScheduledDate(LocalDateTime.parse((String) updates.get("scheduled_date")));
            }

            if (updates.containsKey("duration")) {
                // Map may return Integer or Double depending on JSON parser
                Object dur = updates.get("duration");
                if (dur instanceof Integer) {
                    meeting.setDuration((Integer) dur);
                } else if (dur instanceof Number) {
                    meeting.setDuration(((Number) dur).intValue());
                }
            }

            Meeting updated = meetingService.saveMeeting(meeting);
            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }


}

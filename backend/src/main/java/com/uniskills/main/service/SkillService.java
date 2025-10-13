package com.uniskills.main.service;


import com.uniskills.main.dto.SkillRequest;
import com.uniskills.main.model.Skill;
import com.uniskills.main.model.User;
import com.uniskills.main.repository.SkillRepository;
import com.uniskills.main.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public Skill addSkill(SkillRequest req) {
        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = new Skill(req.getName(),req.getType(), user);
        return skillRepository.save(skill);
    }

    public List<Skill> getUserSkills(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return skillRepository.findByUser(user);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}


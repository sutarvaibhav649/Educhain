package com.uniskills.main.controller;


import com.uniskills.main.dto.SkillRequest;
import com.uniskills.main.model.Skill;
import com.uniskills.main.service.SkillService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public Skill addSkill(@RequestBody SkillRequest request) {
        return skillService.addSkill(request);
    }

    @GetMapping("/user/{userId}")
    public List<Skill> getUserSkills(@PathVariable Long userId) {
        return skillService.getUserSkills(userId);
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable Long id, @RequestBody SkillRequest request) {
        return skillService.updateSkill(id, request);
    }


    @GetMapping("/search")
    public List<Skill> searchSkills(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String type) {
        return skillService.searchSkills(name, type);
    }
}


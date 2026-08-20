package fr.eni.classeo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RoleTestController {

    @GetMapping("/student/test")
    public String student(Authentication authentication) {
        return "User: " + authentication.getName()
                + " | Authorities: " + authentication.getAuthorities();
    }

    @GetMapping("/teacher/test")
    public String teacher(Authentication authentication) {
        return "User: " + authentication.getName()
                + " | Authorities: " + authentication.getAuthorities();
    }

    @GetMapping("/admin/test")
    public String admin(Authentication authentication) {
        return "User: " + authentication.getName()
                + " | Authorities: " + authentication.getAuthorities();
    }
}
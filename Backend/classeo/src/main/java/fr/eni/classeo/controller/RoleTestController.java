package fr.eni.classeo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RoleTestController {

    @GetMapping("/student/test")
    public ResponseEntity<String> student() {
        return ResponseEntity.ok("Student access granted");
    }

    @GetMapping("/teacher/test")
    public ResponseEntity<String> teacher() {
        return ResponseEntity.ok("Teacher access granted");
    }

    @GetMapping("/admin/test")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("Admin access granted");
    }
}
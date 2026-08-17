package fr.eni.classeo.controller;

import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Utilisateur> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Utilisateur getUserById(
            @PathVariable Integer id
    ) {
        return userService.getUserById(id);
    }
}
package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursPlanifieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/enseignants")
public class FormateurController {

    private CoursPlanifieService coursPlanifieService;

    @GetMapping("{enseignantId}/cours")
    public ResponseEntity<?> getCoursByFormateurId(@PathVariable Integer enseignantId) {
        return ResponseEntity.ok(coursPlanifieService.listeCoursParFormateur(enseignantId));
    }
}

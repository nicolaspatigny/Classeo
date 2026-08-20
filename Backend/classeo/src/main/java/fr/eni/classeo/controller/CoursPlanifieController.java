package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursPlanifieService;

import fr.eni.classeo.dto.CoursPlanifieDto;
import fr.eni.classeo.dto.CoursPlanifiePostDto;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class CoursPlanifieController {

    private CoursPlanifieService coursPlanifieService;

    @GetMapping("/cours-promotions")
    public ResponseEntity<?> listeCoursPromotion() {

        return ResponseEntity.ok(coursPlanifieService.listeCoursPromotion());
    }

    @GetMapping("/seances")
    public ResponseEntity<?> listeCoursPlanifie(){
        return ResponseEntity.ok(coursPlanifieService.listeCoursPlanifie());
    }

    @GetMapping("/seances/{id}")
    public ResponseEntity<?> getCoursPlanifieById(@PathVariable int id) {
        return ResponseEntity.ok(coursPlanifieService.getCoursPlanifieById(id));
    }

    @GetMapping("/cours-eleves")
    public ResponseEntity<?> listeCoursEleves() {
        return ResponseEntity.ok(coursPlanifieService.listeCoursEleves());
    }

    @GetMapping("/cours-enseignants")
    public ResponseEntity<?> listeCoursEnseignant() {
        return ResponseEntity.ok(coursPlanifieService.listeCoursFormateur());
    }

    @DeleteMapping("/seances/{id}")
    public ResponseEntity<?> deleteCoursPlanifie(@PathVariable int id) {

        try {
            coursPlanifieService.deleteCoursPlanifie(id);
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/seances")
    public ResponseEntity<CoursPlanifieDto> addCoursPlanifie(@RequestBody CoursPlanifiePostDto coursPlanifiePostDto) {
        CoursPlanifieDto created = coursPlanifieService.addCoursPlanifie(coursPlanifiePostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

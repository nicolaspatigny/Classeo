package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursService;
import fr.eni.classeo.bll.NoteService;
import fr.eni.classeo.bo.Cours;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cours")
public class CoursController {

    private CoursService coursService;

    private NoteService noteService;

    @GetMapping
    public ResponseEntity<?> listeCours(){
        return ResponseEntity.ok(coursService.listeCours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCours(@PathVariable Integer id){
        try {
            Cours cours = coursService.getCoursById(id);
            if (cours == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cours introuvable");
            }
            return ResponseEntity.ok(cours);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{coursId}/seances")
    public ResponseEntity<?> getSeancesByCoursId(@PathVariable Integer coursId){
        return ResponseEntity.ok(coursService.listeCoursPlanifieParCoursId(coursId));
    }

    @GetMapping("/{coursId}/notes")
    public ResponseEntity<?> getNotesByCoursId(@PathVariable Integer coursId){
        return ResponseEntity.ok(noteService.findAllByCourseId(coursId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCours(
            @PathVariable Integer id,
            @RequestBody Cours cours) {

        try {
            coursService.updateCours(id, cours);
            return ResponseEntity.ok(cours);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCours(@PathVariable Integer id) {

        try {
            coursService.deleteCours(id);
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

}

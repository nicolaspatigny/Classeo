package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CursusService;
import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.bo.Filiere;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cursus")
public class CursusController {

    private CursusService cursusService;

    @GetMapping
    public ResponseEntity<?> listeCursus() {
        final List<Cursus> cursus = cursusService.listeCursus();
        if (cursus == null || cursus.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cursus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCursusById(@PathVariable Integer id) {
        try {
            Cursus cursus = cursusService.getCursusById(id);
            if (cursus == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Filière introuvable");
            }
            return ResponseEntity.ok(cursus);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

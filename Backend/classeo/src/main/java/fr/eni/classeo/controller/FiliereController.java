package fr.eni.classeo.controller;

import fr.eni.classeo.bll.FiliereService;
import fr.eni.classeo.bo.Filiere;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/filieres")
public class FiliereController {

    private FiliereService filiereService;

    @GetMapping
    public ResponseEntity<?> listeFilieres(){
        final List<Filiere> filieres = filiereService.listeFilieres();
        if(filieres == null || filieres.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(filieres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFiliereById(@PathVariable Integer id) { // 3. Spring convertit directement en Integer
        try {
            Filiere filiere = filiereService.filiereById(id);
            if (filiere == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Filière introuvable");
            }
            return ResponseEntity.ok(filiere);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addFiliere(@Valid @RequestBody Filiere filiere){
        try {
            filiereService.addFiliere(filiere);
            return ResponseEntity.ok(filiere);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFiliere(
            @PathVariable Integer id,
            @Valid @RequestBody Filiere filiere) {

        try {
            filiereService.updateFiliere(id, filiere);
            return ResponseEntity.ok(filiere);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFiliere(@PathVariable Integer id) {

        try {
            filiereService.deleteFiliere(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}

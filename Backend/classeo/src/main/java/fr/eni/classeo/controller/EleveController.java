package fr.eni.classeo.controller;

import fr.eni.classeo.bll.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/eleves")
public class EleveController {

    private NoteService noteService;

    @GetMapping("/{eleveId}/notes")
    public ResponseEntity<?> getNotes(@PathVariable("eleveId") Integer eleveId){
        return ResponseEntity.ok(noteService.findAllByEleveId(eleveId));
    }
}

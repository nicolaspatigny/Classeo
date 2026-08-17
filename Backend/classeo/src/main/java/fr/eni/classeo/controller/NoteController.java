package fr.eni.classeo.controller;

import fr.eni.classeo.bll.NoteService;
import fr.eni.classeo.bo.Note;
import fr.eni.classeo.dto.NotePostDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RequestMapping("/api/notes")
@RestController
public class NoteController {

    private NoteService noteService;

    @GetMapping
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(noteService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody NotePostDto note){
        try {
            noteService.addNote(note);
            return ResponseEntity.ok(note);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
}

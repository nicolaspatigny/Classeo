package fr.eni.classeo.bll;

import fr.eni.classeo.bo.*;
import fr.eni.classeo.dal.CoursRepository;
import fr.eni.classeo.dal.NoteRepository;
import fr.eni.classeo.dal.user.EleveRepository;
import fr.eni.classeo.dto.NoteDto;
import fr.eni.classeo.dto.NotePostDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;

    private CoursRepository coursRepository;

    private EleveRepository eleveRepository;

    @Override
    public List<NoteDto> findAll() {
        return noteRepository.findAll().stream()
                .map(n-> new NoteDto(n.getId(),
                        n.getNote(),
                        n.getEleve().getId(),
                        n.getCours().getId()))
                .toList();
    }

    @Override
    public List<NoteDto> findAllByEleveId(Integer eleveId) {
        return noteRepository.findAllByEleveId(eleveId).stream()
                .map(n-> new NoteDto(n.getId(),
                        n.getNote(),
                        n.getEleve().getId(),
                        n.getCours().getId()))
                .toList();
    }

    @Override
    public List<NoteDto> findAllByCourseId(Integer coursId) {
        return noteRepository.findAllByCoursId(coursId).stream()
                .map(n-> new NoteDto(n.getId(),
                        n.getNote(),
                        n.getEleve().getId(),
                        n.getCours().getId()))
                .toList();
    }

    @Override
    public void addNote(NotePostDto note) {
        if(note == null){
            throw new RuntimeException("Aucun note n'est renseigné'");
        }
        if(note.getCoursId() == null){
            throw new RuntimeException("Cours n'est pas renseigné'");
        }
        Cours cours = coursRepository.findById(note.getCoursId())
                .orElseThrow(() -> new RuntimeException("Cours n'existe pas"));

        if(note.getEleveId() == null){
            throw new RuntimeException("Eleve n'est pas renseigné'");
        }
        Eleve eleve = eleveRepository.findById(note.getEleveId())
                .orElseThrow(() -> new RuntimeException("Eleve n'existe pas"));

        Note noteToSave = Note.builder()
                .eleve(eleve)
                .note(note.getNote())
                .cours(cours)
                .build();
        noteRepository.save(noteToSave);
    }
}

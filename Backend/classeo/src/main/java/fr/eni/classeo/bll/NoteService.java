package fr.eni.classeo.bll;


import fr.eni.classeo.dto.NoteDto;
import fr.eni.classeo.dto.NotePostDto;

import java.util.List;

public interface NoteService {

    List<NoteDto> findAll();

    List<NoteDto> findAllByEleveId(Integer eleveId);

    List<NoteDto> findAllByCourseId(Integer courseId);

    void addNote(NotePostDto notePostDto);

    void updateNote(Integer id, NotePostDto note);

    void deleteNote(Integer id);
}

package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {

    List<Note> findAllByEleveId(Integer eleveId);

    List<Note> findAllByCoursId(Integer coursId);


}

package fr.eni.classeo.controller;


import fr.eni.classeo.bll.SalleService;
import fr.eni.classeo.bo.Salle;
import fr.eni.classeo.dto.SalleDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/salles")
public class SalleController {

    private SalleService salleService;

    @GetMapping
    public ResponseEntity<List<SalleDto>> getSalles(){
        return ResponseEntity.ok(salleService.findAllSalles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalleDto> getSalle(@PathVariable Integer id){
        return ResponseEntity.ok(salleService.findByIdSalle(id));
    }
}

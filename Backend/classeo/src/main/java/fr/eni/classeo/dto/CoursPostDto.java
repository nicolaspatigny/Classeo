package fr.eni.classeo.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursPostDto {

    @NotNull
    @NotBlank
    private String nom;

    @Nullable
    private Integer promotionId;
}

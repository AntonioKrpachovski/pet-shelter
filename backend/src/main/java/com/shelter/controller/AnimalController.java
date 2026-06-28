package com.shelter.controller;

import com.shelter.model.Animal;
import com.shelter.repository.AnimalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    public List<Animal> getAnimals(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) Boolean available) {

        if (species != null && available != null) {
            return animalRepository.findBySpeciesAndAvailable(species, available);
        } else if (species != null) {
            return animalRepository.findBySpecies(species);
        } else if (available != null) {
            return animalRepository.findByAvailable(available);
        }
        return animalRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimal(@PathVariable String id) {
        return animalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Animal> createAnimal(@Valid @RequestBody Animal animal) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animalRepository.save(animal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable String id, @Valid @RequestBody Animal animal) {
        return animalRepository.findById(id).map(existing -> {
            animal.setId(id);
            return ResponseEntity.ok(animalRepository.save(animal));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable String id) {
        if (!animalRepository.existsById(id)) return ResponseEntity.notFound().build();
        animalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/seed")
    public ResponseEntity<Map<String, Object>> seed() {
        animalRepository.deleteAll();
        List<Animal> animals = List.of(
            new Animal("Мацко", "cat", "Домашна", 2, "Мирна и љубезна мачка, сака прегратки.", "", true),
            new Animal("Рекс", "dog", "Германска Овчарка", 4, "Активно и лојално куче, одлично за семејства.", "", true),
            new Animal("Белка", "dog", "Лабрадор", 1, "Млада и игрива, сака деца.", "", true),
            new Animal("Цицо", "cat", "Персиска", 3, "Елегантна мачка со долга крзна.", "", true),
            new Animal("Шарко", "dog", "Мешанец", 5, "Верен пријател кој бара дом.", "", true),
            new Animal("Луна", "cat", "Сијамска", 2, "Знатижелна и паметна мачка.", "", true)
        );
        animalRepository.saveAll(animals);
        return ResponseEntity.ok(Map.of("message", "Seeded " + animals.size() + " animals"));
    }
}

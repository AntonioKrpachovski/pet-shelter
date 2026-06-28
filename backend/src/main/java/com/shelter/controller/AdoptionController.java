package com.shelter.controller;

import com.shelter.model.AdoptionRequest;
import com.shelter.model.Animal;
import com.shelter.repository.AdoptionRepository;
import com.shelter.repository.AnimalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "*")
public class AdoptionController {

    @Autowired
    private AdoptionRepository adoptionRepository;
    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    public List<AdoptionRequest> getAdoptions(@RequestParam(required = false) String status) {
        if (status != null) return adoptionRepository.findByStatus(status);
        return adoptionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createAdoption(@Valid @RequestBody AdoptionRequest request) {
        Animal animal = animalRepository.findById(request.getAnimalId()).orElse(null);
        if (animal == null) return ResponseEntity.badRequest().body(Map.of("error", "Животното не постои"));
        if (!animal.isAvailable()) return ResponseEntity.badRequest().body(Map.of("error", "Животното веќе е посвоено"));
        AdoptionRequest saved = adoptionRepository.save(request);
        animal.setAvailable(false);
        animalRepository.save(animal);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        if (!List.of("approved", "rejected", "pending").contains(newStatus))
            return ResponseEntity.badRequest().body(Map.of("error", "Невалиден статус"));
        return adoptionRepository.findById(id).map(adoption -> {
            String oldStatus = adoption.getStatus();
            adoption.setStatus(newStatus);
            adoptionRepository.save(adoption);
            if ("rejected".equals(newStatus) && !"rejected".equals(oldStatus)) {
                animalRepository.findById(adoption.getAnimalId()).ifPresent(animal -> {
                    animal.setAvailable(true);
                    animalRepository.save(animal);
                });
            }
            return ResponseEntity.ok(adoption);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoption(@PathVariable String id) {
        if (!adoptionRepository.existsById(id)) return ResponseEntity.notFound().build();
        adoptionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

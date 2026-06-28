package com.shelter.repository;

import com.shelter.model.Animal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends MongoRepository<Animal, String> {
    List<Animal> findByAvailable(boolean available);
    List<Animal> findBySpecies(String species);
    List<Animal> findBySpeciesAndAvailable(String species, boolean available);
}

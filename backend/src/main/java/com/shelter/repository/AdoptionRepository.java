package com.shelter.repository;

import com.shelter.model.AdoptionRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRepository extends MongoRepository<AdoptionRequest, String> {
    List<AdoptionRequest> findByStatus(String status);
    List<AdoptionRequest> findByAnimalId(String animalId);
}

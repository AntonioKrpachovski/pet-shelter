package com.shelter.repository;

import com.shelter.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<ContactMessage, String> {
    List<ContactMessage> findByRead(boolean read);
}

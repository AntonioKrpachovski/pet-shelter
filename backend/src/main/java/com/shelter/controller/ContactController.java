package com.shelter.controller;

import com.shelter.model.ContactMessage;
import com.shelter.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping
    public List<ContactMessage> getMessages(@RequestParam(required = false) Boolean read) {
        if (read != null) return contactRepository.findByRead(read);
        return contactRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ContactMessage> sendMessage(@Valid @RequestBody ContactMessage message) {
        message.setRead(false);
        return ResponseEntity.status(HttpStatus.CREATED).body(contactRepository.save(message));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable String id) {
        return contactRepository.findById(id).map(msg -> {
            msg.setRead(true);
            return ResponseEntity.ok(contactRepository.save(msg));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String id) {
        if (!contactRepository.existsById(id)) return ResponseEntity.notFound().build();
        contactRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

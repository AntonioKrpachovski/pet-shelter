package com.shelter.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "adoptions")
public class AdoptionRequest {

    @Id
    private String id;

    @NotBlank
    private String animalId;

    @NotBlank
    private String applicantName;

    @NotBlank @Email
    private String applicantEmail;

    @NotBlank
    private String applicantPhone;

    private String message;

    private String status = "pending";

    public AdoptionRequest() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAnimalId() { return animalId; }
    public void setAnimalId(String animalId) { this.animalId = animalId; }
    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }
    public String getApplicantEmail() { return applicantEmail; }
    public void setApplicantEmail(String applicantEmail) { this.applicantEmail = applicantEmail; }
    public String getApplicantPhone() { return applicantPhone; }
    public void setApplicantPhone(String applicantPhone) { this.applicantPhone = applicantPhone; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

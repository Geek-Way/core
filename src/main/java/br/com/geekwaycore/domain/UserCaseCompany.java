package br.com.geekwaycore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A UserCaseCompany.
 */
@Entity
@Table(name = "user_case_company")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserCaseCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type_clone")
    private String typeClone;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "score")
    private Integer score;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content")
    private String content;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "feedback")
    private String feedback;

    @Column(name = "dev_status")
    private String devStatus;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "dev_notes")
    private String devNotes;

    @Column(name = "feedback_status")
    private String feedbackStatus;

    @Column(name = "link_project")
    private String linkProject;

    @Column(name = "deadline")
    private Instant deadline;

    @ManyToOne
    @JsonIgnoreProperties(value = "userCaseCompanies", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "userCaseCompanies", allowSetters = true)
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeClone() {
        return typeClone;
    }

    public UserCaseCompany typeClone(String typeClone) {
        this.typeClone = typeClone;
        return this;
    }

    public void setTypeClone(String typeClone) {
        this.typeClone = typeClone;
    }

    public String getName() {
        return name;
    }

    public UserCaseCompany name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public UserCaseCompany description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getScore() {
        return score;
    }

    public UserCaseCompany score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getContent() {
        return content;
    }

    public UserCaseCompany content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFeedback() {
        return feedback;
    }

    public UserCaseCompany feedback(String feedback) {
        this.feedback = feedback;
        return this;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getDevStatus() {
        return devStatus;
    }

    public UserCaseCompany devStatus(String devStatus) {
        this.devStatus = devStatus;
        return this;
    }

    public void setDevStatus(String devStatus) {
        this.devStatus = devStatus;
    }

    public String getDevNotes() {
        return devNotes;
    }

    public UserCaseCompany devNotes(String devNotes) {
        this.devNotes = devNotes;
        return this;
    }

    public void setDevNotes(String devNotes) {
        this.devNotes = devNotes;
    }

    public String getFeedbackStatus() {
        return feedbackStatus;
    }

    public UserCaseCompany feedbackStatus(String feedbackStatus) {
        this.feedbackStatus = feedbackStatus;
        return this;
    }

    public void setFeedbackStatus(String feedbackStatus) {
        this.feedbackStatus = feedbackStatus;
    }

    public String getLinkProject() {
        return linkProject;
    }

    public UserCaseCompany linkProject(String linkProject) {
        this.linkProject = linkProject;
        return this;
    }

    public void setLinkProject(String linkProject) {
        this.linkProject = linkProject;
    }

    public Instant getDeadline() {
        return deadline;
    }

    public UserCaseCompany deadline(Instant deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(Instant deadline) {
        this.deadline = deadline;
    }

    public User getUser() {
        return user;
    }

    public UserCaseCompany user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Company getCompany() {
        return company;
    }

    public UserCaseCompany company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserCaseCompany)) {
            return false;
        }
        return id != null && id.equals(((UserCaseCompany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserCaseCompany{" +
            "id=" + getId() +
            ", typeClone='" + getTypeClone() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", score=" + getScore() +
            ", content='" + getContent() + "'" +
            ", feedback='" + getFeedback() + "'" +
            ", devStatus='" + getDevStatus() + "'" +
            ", devNotes='" + getDevNotes() + "'" +
            ", feedbackStatus='" + getFeedbackStatus() + "'" +
            ", linkProject='" + getLinkProject() + "'" +
            ", deadline='" + getDeadline() + "'" +
            "}";
    }
}

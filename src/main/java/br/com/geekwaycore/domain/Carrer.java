package br.com.geekwaycore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Carrer.
 */
@Entity
@Table(name = "carrer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Carrer implements Serializable {

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

    @Column(name = "score_level")
    private String scoreLevel;

    @OneToOne
    @JoinColumn(unique = true)
    private VocationalTest vocationalTest;

    @ManyToOne
    @JsonIgnoreProperties(value = "carrers", allowSetters = true)
    private User user;

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

    public Carrer typeClone(String typeClone) {
        this.typeClone = typeClone;
        return this;
    }

    public void setTypeClone(String typeClone) {
        this.typeClone = typeClone;
    }

    public String getName() {
        return name;
    }

    public Carrer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Carrer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getScore() {
        return score;
    }

    public Carrer score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getScoreLevel() {
        return scoreLevel;
    }

    public Carrer scoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
        return this;
    }

    public void setScoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
    }

    public VocationalTest getVocationalTest() {
        return vocationalTest;
    }

    public Carrer vocationalTest(VocationalTest vocationalTest) {
        this.vocationalTest = vocationalTest;
        return this;
    }

    public void setVocationalTest(VocationalTest vocationalTest) {
        this.vocationalTest = vocationalTest;
    }

    public User getUser() {
        return user;
    }

    public Carrer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carrer)) {
            return false;
        }
        return id != null && id.equals(((Carrer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Carrer{" +
            "id=" + getId() +
            ", typeClone='" + getTypeClone() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", score=" + getScore() +
            ", scoreLevel='" + getScoreLevel() + "'" +
            "}";
    }
}

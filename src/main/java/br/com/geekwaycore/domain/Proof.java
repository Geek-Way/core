package br.com.geekwaycore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Proof.
 */
@Entity
@Table(name = "proof")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proof implements Serializable {

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

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content")
    private String content;

    @Column(name = "status")
    private String status;

    @Column(name = "qone_quest")
    private String qoneQuest;

    @Column(name = "qone_asr")
    private String qoneAsr;

    @Column(name = "qone_opt")
    private String qoneOpt;

    @Column(name = "qone_usr")
    private String qoneUsr;

    @Column(name = "qtwo_quest")
    private String qtwoQuest;

    @Column(name = "qtwo_asr")
    private String qtwoAsr;

    @Column(name = "qtwo_opt")
    private String qtwoOpt;

    @Column(name = "qtwo_usr")
    private String qtwoUsr;

    @Column(name = "qtre_quest")
    private String qtreQuest;

    @Column(name = "qtre_asr")
    private String qtreAsr;

    @Column(name = "qtre_opt")
    private String qtreOpt;

    @Column(name = "qtre_usr")
    private String qtreUsr;

    @ManyToOne
    @JsonIgnoreProperties(value = "proofs", allowSetters = true)
    private Carrer carrer;

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

    public Proof typeClone(String typeClone) {
        this.typeClone = typeClone;
        return this;
    }

    public void setTypeClone(String typeClone) {
        this.typeClone = typeClone;
    }

    public String getName() {
        return name;
    }

    public Proof name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Proof description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getScore() {
        return score;
    }

    public Proof score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getScoreLevel() {
        return scoreLevel;
    }

    public Proof scoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
        return this;
    }

    public void setScoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
    }

    public String getContent() {
        return content;
    }

    public Proof content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public Proof status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQoneQuest() {
        return qoneQuest;
    }

    public Proof qoneQuest(String qoneQuest) {
        this.qoneQuest = qoneQuest;
        return this;
    }

    public void setQoneQuest(String qoneQuest) {
        this.qoneQuest = qoneQuest;
    }

    public String getQoneAsr() {
        return qoneAsr;
    }

    public Proof qoneAsr(String qoneAsr) {
        this.qoneAsr = qoneAsr;
        return this;
    }

    public void setQoneAsr(String qoneAsr) {
        this.qoneAsr = qoneAsr;
    }

    public String getQoneOpt() {
        return qoneOpt;
    }

    public Proof qoneOpt(String qoneOpt) {
        this.qoneOpt = qoneOpt;
        return this;
    }

    public void setQoneOpt(String qoneOpt) {
        this.qoneOpt = qoneOpt;
    }

    public String getQoneUsr() {
        return qoneUsr;
    }

    public Proof qoneUsr(String qoneUsr) {
        this.qoneUsr = qoneUsr;
        return this;
    }

    public void setQoneUsr(String qoneUsr) {
        this.qoneUsr = qoneUsr;
    }

    public String getQtwoQuest() {
        return qtwoQuest;
    }

    public Proof qtwoQuest(String qtwoQuest) {
        this.qtwoQuest = qtwoQuest;
        return this;
    }

    public void setQtwoQuest(String qtwoQuest) {
        this.qtwoQuest = qtwoQuest;
    }

    public String getQtwoAsr() {
        return qtwoAsr;
    }

    public Proof qtwoAsr(String qtwoAsr) {
        this.qtwoAsr = qtwoAsr;
        return this;
    }

    public void setQtwoAsr(String qtwoAsr) {
        this.qtwoAsr = qtwoAsr;
    }

    public String getQtwoOpt() {
        return qtwoOpt;
    }

    public Proof qtwoOpt(String qtwoOpt) {
        this.qtwoOpt = qtwoOpt;
        return this;
    }

    public void setQtwoOpt(String qtwoOpt) {
        this.qtwoOpt = qtwoOpt;
    }

    public String getQtwoUsr() {
        return qtwoUsr;
    }

    public Proof qtwoUsr(String qtwoUsr) {
        this.qtwoUsr = qtwoUsr;
        return this;
    }

    public void setQtwoUsr(String qtwoUsr) {
        this.qtwoUsr = qtwoUsr;
    }

    public String getQtreQuest() {
        return qtreQuest;
    }

    public Proof qtreQuest(String qtreQuest) {
        this.qtreQuest = qtreQuest;
        return this;
    }

    public void setQtreQuest(String qtreQuest) {
        this.qtreQuest = qtreQuest;
    }

    public String getQtreAsr() {
        return qtreAsr;
    }

    public Proof qtreAsr(String qtreAsr) {
        this.qtreAsr = qtreAsr;
        return this;
    }

    public void setQtreAsr(String qtreAsr) {
        this.qtreAsr = qtreAsr;
    }

    public String getQtreOpt() {
        return qtreOpt;
    }

    public Proof qtreOpt(String qtreOpt) {
        this.qtreOpt = qtreOpt;
        return this;
    }

    public void setQtreOpt(String qtreOpt) {
        this.qtreOpt = qtreOpt;
    }

    public String getQtreUsr() {
        return qtreUsr;
    }

    public Proof qtreUsr(String qtreUsr) {
        this.qtreUsr = qtreUsr;
        return this;
    }

    public void setQtreUsr(String qtreUsr) {
        this.qtreUsr = qtreUsr;
    }

    public Carrer getCarrer() {
        return carrer;
    }

    public Proof carrer(Carrer carrer) {
        this.carrer = carrer;
        return this;
    }

    public void setCarrer(Carrer carrer) {
        this.carrer = carrer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proof)) {
            return false;
        }
        return id != null && id.equals(((Proof) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proof{" +
            "id=" + getId() +
            ", typeClone='" + getTypeClone() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", score=" + getScore() +
            ", scoreLevel='" + getScoreLevel() + "'" +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            ", qoneQuest='" + getQoneQuest() + "'" +
            ", qoneAsr='" + getQoneAsr() + "'" +
            ", qoneOpt='" + getQoneOpt() + "'" +
            ", qoneUsr='" + getQoneUsr() + "'" +
            ", qtwoQuest='" + getQtwoQuest() + "'" +
            ", qtwoAsr='" + getQtwoAsr() + "'" +
            ", qtwoOpt='" + getQtwoOpt() + "'" +
            ", qtwoUsr='" + getQtwoUsr() + "'" +
            ", qtreQuest='" + getQtreQuest() + "'" +
            ", qtreAsr='" + getQtreAsr() + "'" +
            ", qtreOpt='" + getQtreOpt() + "'" +
            ", qtreUsr='" + getQtreUsr() + "'" +
            "}";
    }
}

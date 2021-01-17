package br.com.geekwaycore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Course implements Serializable {

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

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "viewed")
    private Boolean viewed;

    @ManyToOne
    @JsonIgnoreProperties(value = "courses", allowSetters = true)
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

    public Course typeClone(String typeClone) {
        this.typeClone = typeClone;
        return this;
    }

    public void setTypeClone(String typeClone) {
        this.typeClone = typeClone;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getScore() {
        return score;
    }

    public Course score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getScoreLevel() {
        return scoreLevel;
    }

    public Course scoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
        return this;
    }

    public void setScoreLevel(String scoreLevel) {
        this.scoreLevel = scoreLevel;
    }

    public String getContent() {
        return content;
    }

    public Course content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public Course videoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
        return this;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Boolean isViewed() {
        return viewed;
    }

    public Course viewed(Boolean viewed) {
        this.viewed = viewed;
        return this;
    }

    public void setViewed(Boolean viewed) {
        this.viewed = viewed;
    }

    public Carrer getCarrer() {
        return carrer;
    }

    public Course carrer(Carrer carrer) {
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
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", typeClone='" + getTypeClone() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", score=" + getScore() +
            ", scoreLevel='" + getScoreLevel() + "'" +
            ", content='" + getContent() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            ", viewed='" + isViewed() + "'" +
            "}";
    }
}

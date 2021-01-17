package br.com.geekwaycore.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A VocationalTest.
 */
@Entity
@Table(name = "vocational_test")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class VocationalTest implements Serializable {

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

    @Column(name = "status")
    private String status;

    @Column(name = "carrer")
    private String carrer;

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

    public VocationalTest typeClone(String typeClone) {
        this.typeClone = typeClone;
        return this;
    }

    public void setTypeClone(String typeClone) {
        this.typeClone = typeClone;
    }

    public String getName() {
        return name;
    }

    public VocationalTest name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public VocationalTest description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public VocationalTest status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCarrer() {
        return carrer;
    }

    public VocationalTest carrer(String carrer) {
        this.carrer = carrer;
        return this;
    }

    public void setCarrer(String carrer) {
        this.carrer = carrer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VocationalTest)) {
            return false;
        }
        return id != null && id.equals(((VocationalTest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VocationalTest{" +
            "id=" + getId() +
            ", typeClone='" + getTypeClone() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", carrer='" + getCarrer() + "'" +
            "}";
    }
}

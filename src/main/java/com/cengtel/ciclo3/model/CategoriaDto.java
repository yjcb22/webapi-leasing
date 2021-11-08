/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author yeison
 */
@Entity
@Table(name="category")
public class CategoriaDto implements Serializable {
    private static final long serialVersionUID = 1L;
    
    public CategoriaDto() {
        
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    @Column(name="id_Category")
    private Integer id;
    private String name;
    private String description;
    /**
     * https://www.baeldung.com/jpa-cascade-types
     * CascadeType.ALL propagates all operations — including Hibernate-specific ones — from a parent to a child entity.
     * The persist operation makes a transient instance persistent. Cascade Type PERSIST propagates the persist operation 
     * from a parent to a child entity. When we save the person entity, the address entity will also get saved.
     * 
     */
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private List<FincaDto> farms;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<FincaDto> getFarms() {
        return farms;
    }

    public void setFarms(List<FincaDto> farms) {
        this.farms = farms;
    }
    
    

    @Override
    public String toString() {
        return "CategoryDto{" + "id=" + id + ", name=" + name + ", description=" + description + '}';
    }    
}

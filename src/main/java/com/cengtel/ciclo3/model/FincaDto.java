/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;


/**
 *
 * @author yeison
 */
@Entity
@Table(name="farm")
public class FincaDto implements Serializable {
    private static final long serialVersionUID = 1L;
    
    public FincaDto(){
        
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_Farm")
    private Integer id;
    private String name;
    private String address;
    private int extension;    
    private String description;
    
    
    @ManyToOne
    @JoinColumn(name="id_Category", referencedColumnName = "id_Category")
    @JsonIgnoreProperties("farms") //prevent infinite loop in Json    
    private CategoriaDto category;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "farm")
    @JsonIgnoreProperties({"farm","client"})
    private List<MensajeDto> messages;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "farm")
    @JsonIgnoreProperties({"farm","client"})    
    private List<ReservaDto> reservations;
    
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getExtension() {
        return extension;
    }

    public void setExtension(int extension) {
        this.extension = extension;
    }

    public CategoriaDto getCategory() {
        return category;
    }

    public void setCategory(CategoriaDto category) {
        this.category = category;
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

    public List<ReservaDto> getReservations() {
        return reservations;
    }

    public void setReservations(List<ReservaDto> reservations) {
        this.reservations = reservations;
    }

    public List<MensajeDto> getMessages() {
        return messages;
    }

    public void setMessages(List<MensajeDto> messages) {
        this.messages = messages;
    }

    @Override
    public String toString() {
        return "FincaDto{" + "id=" + id + ", address=" + address + ", extension=" + extension + ", name=" + name + ", description=" + description + ", category=" + category + '}';
    }
    
    
    
  
}

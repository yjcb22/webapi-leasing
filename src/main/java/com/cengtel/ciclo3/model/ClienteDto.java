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
@Table(name="client")
public class ClienteDto implements Serializable {
    private static final long serialVersionUID = 1L;
    
    public ClienteDto(){
        
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_Client")
    private Integer idClient;
    private String email;
    private String password;
    private String name;
    private int age;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "client")
    @JsonIgnoreProperties("client")
    List<MensajeDto> messages;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "client")
    @JsonIgnoreProperties("client")
    List<ReservaDto> reservations;
    
  

    public Integer getIdClient() {
        return idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        return "ClienteDto{" + "id=" + idClient + ", email=" + email + ", password=" + password + ", age=" + age + ", name=" + name + '}';
    }   
    
}

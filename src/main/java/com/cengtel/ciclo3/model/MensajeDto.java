/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;


/**
 *
 * @author yeison
 */
@Entity
@Table(name="message")
public class MensajeDto implements Serializable{
    private static final long serialVersionUID = 1L;
    
    public MensajeDto(){
        
    }
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_Message")
    private Integer idMessage;
    private String messageText;
    
    @ManyToOne
    @JoinColumn(name="id_Farm", referencedColumnName = "id_Farm")
    @JsonIgnoreProperties({"messages","client","reservations"})
    private FincaDto farm;
    
    @ManyToOne
    @JoinColumn(name="id_Client", referencedColumnName = "id_Client")
    @JsonIgnoreProperties({"messages","client","reservations"})
    private ClienteDto client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public FincaDto getFarm() {
        return farm;
    }

    public void setFarm(FincaDto farm) {
        this.farm = farm;
    }

    public ClienteDto getClient() {
        return client;
    }

    public void setClient(ClienteDto client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "MensajeDto{" + "id=" + idMessage + ", messageText=" + messageText + ", farm=" + farm + ", client=" + client + '}';
    } 
}

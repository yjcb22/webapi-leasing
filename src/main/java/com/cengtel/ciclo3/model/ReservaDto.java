/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;


/**
 *
 * @author yeison
 */
@Entity
@Table(name="reservation")
public class ReservaDto implements Serializable {
    private static final long serialVersionUID = 1L;
    
    public ReservaDto(){
        
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_Reservation")
    private int idReservation;
    private Date startDate;
    private Date devolutionDate;
    private String status;
    //private String creationDate;
    
    @ManyToOne
    @JoinColumn(name="id_Farm", referencedColumnName = "id_Farm")    
    @JsonIgnoreProperties({"reservations"})
    private FincaDto farm;
    
    @ManyToOne
    @JoinColumn(name="id_Client", referencedColumnName = "id_Client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private ClienteDto client;
    
    private String score;

    public int getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(int idReservation) {
        this.idReservation = idReservation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "ReservaDto{" + "idReservation=" + idReservation + ", startDate=" + startDate + ", devolutionDate=" + devolutionDate + ", status=" + status + ", farm=" + farm + ", client=" + client + ", score=" + score + '}';
    }    
}

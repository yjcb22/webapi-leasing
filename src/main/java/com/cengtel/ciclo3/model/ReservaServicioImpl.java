/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yeison
 */
@Service
public class ReservaServicioImpl implements ReservaServicio {

    @Autowired
    private ReservaDao reservaDao;

    @Override
    public List<ReservaDto> listarReservas() {
        return (List<ReservaDto>) reservaDao.findAll();
    }

    @Override
    public ReservaDto guardarReserva(ReservaDto reserva) {
        return reservaDao.save(reserva);
    }

    @Override
    public ReservaDto actualizarReserva(ReservaDto reserva) {
        ReservaDto reservaTmp = reservaDao.findById(reserva.getIdReservation()).orElse(null);
        //Verificar si el cliente ya existe
        if (reservaTmp != null) {
            //Agregar los nuevos valores
            if(reserva.getStartDate() != null){
                reservaTmp.setStartDate(reserva.getStartDate());
            }
            if(reserva.getDevolutionDate() != null){
                reservaTmp.setDevolutionDate(reserva.getDevolutionDate());
            }
            if(reserva.getClient() != null){
                reservaTmp.setClient(reserva.getClient());
            }
            if(reserva.getFarm() != null){
                reservaTmp.setFarm(reserva.getFarm());
            }
        }
        return reservaDao.save(reservaTmp);
    }

    @Override
    public boolean borrarReserva(ReservaDto reservation) {
        ReservaDto reserva = reservaDao.findById(reservation.getIdReservation()).orElse(null);
        if (reserva != null) {
            reservaDao.delete(reservation);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public ReservaDto encontrarReservaPorId(ReservaDto reserva) {
        return reservaDao.findById(reserva.getIdReservation()).orElse(null);
    }

}

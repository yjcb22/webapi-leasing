/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import com.cengtel.ciclo3.model.reportes.ContadorClientes;
import com.cengtel.ciclo3.model.reportes.ReporteReservaCompletadaCancelada;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yeison
 */
@Service
public class ReservaServicioImpl implements ReservaServicio {

    /**
     * Access to the CRUD
     */
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
            if (reserva.getStartDate() != null) {
                reservaTmp.setStartDate(reserva.getStartDate());
            }
            if (reserva.getDevolutionDate() != null) {
                reservaTmp.setDevolutionDate(reserva.getDevolutionDate());
            }
            if (reserva.getClient() != null) {
                reservaTmp.setClient(reserva.getClient());
            }
            if (reserva.getFarm() != null) {
                reservaTmp.setFarm(reserva.getFarm());
            }
            if (reserva.getStatus()!= null) {
                reservaTmp.setStatus(reserva.getStatus());
            }
            if (reserva.getScore()!= null) {
                reservaTmp.setScore(reserva.getScore());
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

    @Override
    public ReporteReservaCompletadaCancelada listarReservasCompletasVsCancelada() {

        List<ReservaDto> rCompletas = reservaDao.findAllByStatus("completed");
        List<ReservaDto> rCanceladas = reservaDao.findAllByStatus("cancelled");
        int numeroCompletadas = rCompletas.size();
        int numeroCanceladas = rCanceladas.size();
        return new ReporteReservaCompletadaCancelada(numeroCompletadas, numeroCanceladas);        
    }

    @Override
    public List<ContadorClientes> obtenerTopClientesConReservas() {
        List<ContadorClientes> res = new ArrayList<>();
        List<Object[]> report = reservaDao.countTotalReservationsByClient();
        for (Object[] objects : report) {
            res.add(new ContadorClientes((Long) objects[1], (ClienteDto) objects[0]));
        }
        return res;
    }

    @Override
    public List<ReservaDto> listarReservasPorFechas(String start, String end) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = new Date();
        Date endDate = new Date();
        try {
            startDate = format.parse(start);
            endDate = format.parse(end);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }

        if (startDate.before(endDate)) {
            return reservaDao.findAllByStartDateAfterAndStartDateBefore(startDate, endDate);
        } else {
            return new ArrayList<>();
        }
    }

}

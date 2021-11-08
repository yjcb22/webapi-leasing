/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.controller;

import com.cengtel.ciclo3.model.reportes.ReporteReservaCompletadaCancelada;
import com.cengtel.ciclo3.model.ReservaDto;
import com.cengtel.ciclo3.model.ReservaServicio;
import com.cengtel.ciclo3.model.reportes.ContadorClientes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author yeison
 */
@RestController
@RequestMapping("/api/Reservation")
public class ControladorReserva {
    @Autowired
    private ReservaServicio reservaServicio;
    
    @GetMapping("/all")
    public List<ReservaDto> apiMostrarReserva(){
        return reservaServicio.listarReservas();
    }
    
    @GetMapping("/{id}")
    public ReservaDto obtenerReservaPorId(@PathVariable("id") int reservaId){
        ReservaDto reserva = new ReservaDto();
        reserva.setIdReservation(reservaId);
        return reservaServicio.encontrarReservaPorId(reserva);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public ReservaDto actualizarReserva(@RequestBody ReservaDto reserva){        
        return reservaServicio.actualizarReserva(reserva);        
    }

    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public ReservaDto apiGuardarReserva(@RequestBody ReservaDto reserva){        
        return reservaServicio.guardarReserva(reserva);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarReserva(@PathVariable("id") int reservaId){
        ReservaDto reserva = new ReservaDto();
        reserva.setIdReservation(reservaId);
        return reservaServicio.borrarReserva(reserva);        
    } 
    
    @GetMapping("/report-status")
    public ReporteReservaCompletadaCancelada mostrarReporteCompleteVsCancelled(){
        
        return reservaServicio.listarReservasCompletasVsCancelada();
    }
    
    @GetMapping("/report-clients")
    public List<ContadorClientes> obtenerTopClientesPorReserva(){
        return reservaServicio.obtenerTopClientesConReservas();
    }
    
    @GetMapping("/report-dates/{start}/{end}")
    public List<ReservaDto> obtenerReservasPorFechas(@PathVariable("start") String start, @PathVariable("end") String end){
        return reservaServicio.listarReservasPorFechas(start, end);
    }
}

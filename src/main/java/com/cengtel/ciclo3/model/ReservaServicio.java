/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import com.cengtel.ciclo3.model.reportes.ContadorClientes;
import com.cengtel.ciclo3.model.reportes.ReporteReservaCompletadaCancelada;
import java.util.Date;
import java.util.List;

/**
 *
 * @author yeison
 */
public interface ReservaServicio {
    public List<ReservaDto> listarReservas();
    public ReservaDto guardarReserva(ReservaDto reserva);
    public ReservaDto actualizarReserva(ReservaDto reserva);
    public boolean borrarReserva(ReservaDto reserva);
    public ReservaDto encontrarReservaPorId(ReservaDto reserva);  
    public ReporteReservaCompletadaCancelada listarReservasCompletasVsCancelada();
    public List<ContadorClientes> obtenerTopClientesConReservas();
    public List<ReservaDto> listarReservasPorFechas(String start, String End);
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import java.util.List;

/**
 *
 * @author yeison
 */
public interface MensajeServicio {
    public List<MensajeDto> listarMensajes();
    public MensajeDto guardarMensaje(MensajeDto mensaje);
    public MensajeDto actualizarMensaje(MensajeDto mensaje);
    public boolean borrarMensaje(MensajeDto mensaje);
    public MensajeDto encontrarMensajePorId(MensajeDto mensaje); 
}

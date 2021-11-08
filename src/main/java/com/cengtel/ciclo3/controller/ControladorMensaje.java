/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.controller;

import com.cengtel.ciclo3.model.MensajeDto;
import com.cengtel.ciclo3.model.FincaDto;
import com.cengtel.ciclo3.model.MensajeDto;
import com.cengtel.ciclo3.model.MensajeServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yeison
 */
@RestController
@RequestMapping("/api/Message")
public class ControladorMensaje {
    @Autowired
    private MensajeServicio mensajeServicio;
    
    @GetMapping("/all")
    public List<MensajeDto> apiMostrarMensaje(){
        return mensajeServicio.listarMensajes();
    }
    
    @GetMapping("/{id}")
    public MensajeDto obtenerMensajePorId(@PathVariable("id") int mensajeId){
        MensajeDto mensaje = new MensajeDto();
        mensaje.setIdMessage(mensajeId);
        return mensajeServicio.encontrarMensajePorId(mensaje);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public MensajeDto actualizarMensaje(@RequestBody MensajeDto mensaje){
        return mensajeServicio.actualizarMensaje(mensaje);        
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public MensajeDto apiGuardarFinca(@RequestBody MensajeDto mensaje){
        return mensajeServicio.guardarMensaje(mensaje);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarMensaje(@PathVariable("id") int mensajeId){
        MensajeDto mensaje = new MensajeDto();
        mensaje.setIdMessage(mensajeId);
        return mensajeServicio.borrarMensaje(mensaje);        
    }     
}

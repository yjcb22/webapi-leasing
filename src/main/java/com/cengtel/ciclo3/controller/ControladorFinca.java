/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.controller;

import com.cengtel.ciclo3.model.FincaDto;
import com.cengtel.ciclo3.model.FincaDto;
import com.cengtel.ciclo3.model.FincaDto;
import com.cengtel.ciclo3.model.FincaServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author yeison
 */
@RestController
@RequestMapping("/api/Farm")
public class ControladorFinca {
    @Autowired
    private FincaServicio fincaServicio;
    
    @GetMapping("/all")
    public List<FincaDto> apiMostrarFinca(){
        return fincaServicio.listarFincas();
    }
    
    @GetMapping("/{id}")
    public FincaDto obtenerFincaPorId(@PathVariable("id") int fincaId){
        FincaDto finca = new FincaDto();
        finca.setId(fincaId);
        return fincaServicio.encontrarFincaPorId(finca);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public FincaDto actualizarFinca(@RequestBody FincaDto finca){
        return fincaServicio.actualizarFinca(finca);        
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public FincaDto apiGuardarFinca(@RequestBody FincaDto finca){
        return fincaServicio.guardarFinca(finca);
    }   
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarFinca(@PathVariable("id") int fincaId){
        FincaDto finca = new FincaDto();
        finca.setId(fincaId);
        return fincaServicio.borrarFinca(finca);        
    } 
}

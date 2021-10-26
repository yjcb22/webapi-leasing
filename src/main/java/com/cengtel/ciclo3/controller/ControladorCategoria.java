/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.controller;

import com.cengtel.ciclo3.model.CategoriaDto;
import com.cengtel.ciclo3.model.CategoriaServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author yeison
 */
@RestController
@RequestMapping("/api/Category")
public class ControladorCategoria {
    @Autowired
    private CategoriaServicio categoriaServicio;
    
    @GetMapping("/all")
    public List<CategoriaDto> apiMostrarCategoria(){
        return categoriaServicio.listarCategorias();
    }
    
    @GetMapping("/{id}")
    public CategoriaDto obtenerCategoriaPorId(@PathVariable("id") int categoriaId){
        CategoriaDto categoria = new CategoriaDto();
        categoria.setId(categoriaId);
        return categoriaServicio.encontrarCategoriaPorId(categoria);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDto actualizarCategoria(@RequestBody CategoriaDto categoria){
        return categoriaServicio.actualizarCategoria(categoria);        
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDto apiGuardarCategoria(@RequestBody CategoriaDto categoria){
        return categoriaServicio.guardarCategoria(categoria);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarCategoria(@PathVariable("id") int categoriaId){
        CategoriaDto categoria = new CategoriaDto();
        categoria.setId(categoriaId);
        return categoriaServicio.borrarCategoria(categoria);        
    }   
}

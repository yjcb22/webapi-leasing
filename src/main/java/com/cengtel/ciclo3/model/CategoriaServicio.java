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
public interface CategoriaServicio {
    public List<CategoriaDto> listarCategorias();
    public CategoriaDto guardarCategoria(CategoriaDto category);
    public CategoriaDto actualizarCategoria(CategoriaDto category);
    public boolean borrarCategoria(CategoriaDto category);
    public CategoriaDto encontrarCategoriaPorId(CategoriaDto category);        
}

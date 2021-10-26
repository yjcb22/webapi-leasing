/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author yeison
 */
public interface FincaDao extends CrudRepository<FincaDto, Integer> {
    
}

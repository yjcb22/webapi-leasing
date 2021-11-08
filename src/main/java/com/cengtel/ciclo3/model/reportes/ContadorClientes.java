/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model.reportes;

import com.cengtel.ciclo3.model.ClienteDto;

/**
 *
 * @author yeison
 */
public class ContadorClientes {
    private Long total;
    private ClienteDto client;

    public ContadorClientes() {
    }

    public ContadorClientes(Long total, ClienteDto client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public ClienteDto getClient() {
        return client;
    }

    public void setClient(ClienteDto client) {
        this.client = client;
    }
    
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model.reportes;

/**
 *
 * @author yeison
 */
public class ReporteReservaCompletadaCancelada {
    
    private int completed;
    private int cancelled;

    public ReporteReservaCompletadaCancelada() {
    }

    public ReporteReservaCompletadaCancelada(int reservasCompletadas, int reservasCanceladas) {
        this.completed = reservasCompletadas;
        this.cancelled = reservasCanceladas;
    }
    

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCancelled() {
        return cancelled;
    }

    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }
    
    
    
}

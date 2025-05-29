
package com.senac.lanchonete.controller;

import com.senac.lanchonete.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class CadastroController {
    @Autowired
    private CadastroService cadastroService;
    
    @GetMapping ("/")
    public String inicio() {
        return "index";
    }
    
    @GetMapping("/cadastro")
    public String exibirFormulario() {
        return "pedido";
    }
    
    @GetMapping("/lista")
    public String lista() {
        return "pedido";
    }
}

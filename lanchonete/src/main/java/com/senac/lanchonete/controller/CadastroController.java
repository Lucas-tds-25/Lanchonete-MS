
package com.senac.lanchonete.controller;

import com.senac.lanchonete.model.Cadastro;
import com.senac.lanchonete.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller

public class CadastroController {
    @Autowired
    private CadastroService cadastroService;
    
    @GetMapping ("/")
    public String inicio() {
        return "index";
    }
    
    @GetMapping("/cadastro")
    public String exibirFormulario(Model model) {
        model.addAttribute("cadastro", new Cadastro());
        return "pedido";
    }
    
    @PostMapping ("/gravar")
    public String processarFormulario(@ModelAttribute Cadastro cadastro) {
        cadastroService.salvar(cadastro);
        return "redirect:/pedido";
    }
    
    @GetMapping("/lista")
    public String lista() {
        return "pedido";
    }
}

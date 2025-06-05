
package com.senac.lanchonete.controller;

import com.senac.lanchonete.model.Cadastro;
import com.senac.lanchonete.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
// @RequestMapping("/cadastro")
@RequestMapping("")

public class CadastroController {
    @Autowired
    private CadastroService cadastroService;
    
//    @GetMapping ("/")
//    public String inicio() {
//        return "index";
//    }
    
    @GetMapping("/")
    public String inicio(Model model) {
        model.addAttribute("cadastro", new Cadastro()); // ESSENCIAL
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
        return "redirect:/cadastro/lista";
    }
    
    @GetMapping("/lista")
    public String lista(Model model) {
        model.addAttribute("cadastros", cadastroService.listarTodos());
        return "pedido";
    }
    
    @GetMapping ("/alterar/{id}")
    public String alterar (@PathVariable int id, Model model) {
        model.addAttribute("cadastro", cadastroService.buscarPorId(id));
        return "pedido";
    }
    
    @GetMapping ("/excluir/{id}")
    public String excluir(@PathVariable int id) {
        cadastroService.excluir(id);
        return "redirect:/cadastro/lista";
    }
}

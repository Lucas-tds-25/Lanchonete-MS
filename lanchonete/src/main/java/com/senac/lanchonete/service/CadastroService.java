
package com.senac.lanchonete.service;

import com.senac.lanchonete.model.Cadastro;
import com.senac.lanchonete.repository.CadastroRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class CadastroService {
    @Autowired
    private CadastroRepository cadastroRepository;
    
    public Cadastro salvar (Cadastro cadastro) {
        return cadastroRepository.save(cadastro);
    }
    
    public List<Cadastro> listarTodos() {
        return cadastroRepository.findAll();
    }
    
    public Cadastro buscarPorId(int id) {
        return cadastroRepository.findById(id).orElse(null);
    }
    
    public void excluir (int id) {
        cadastroRepository.deleteById(id);
    }
}

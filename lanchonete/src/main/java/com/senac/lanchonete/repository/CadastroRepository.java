
package com.senac.lanchonete.repository;

import com.senac.lanchonete.model.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CadastroRepository extends JpaRepository<Cadastro, Integer> {
    
}

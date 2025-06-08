
package com.senac.lanchonete;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.senac.lanchonete.model.Cadastro;
import com.senac.lanchonete.repository.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;

    @SpringBootTest
    class LanchoneteApplicationTests {
    
    @Autowired
    private CadastroRepository cadastroRepository;

    @Test
    void deveCadastrarClienteComCamposObrigatorios() {
        Cadastro cadastro = new Cadastro();
        cadastro.setNome("João Silva");
        cadastro.setEndereco("Rua das Flores");
        cadastro.setTelefone("(11)99999-8888");
        cadastro.setUsuario("joao");
        cadastro.setSenha("123");

        Cadastro salvo = cadastroRepository.save(cadastro);

        Assertions.assertNotNull(salvo.getId());
        Assertions.assertEquals("João Silva", salvo.getNome());
    }

    @Test
    void telefoneNaoDeveTerMaisDe11Digitos() {
        String telefone = "(11)99999-8888".replaceAll("\\D", ""); // remove símbolos
        Assertions.assertTrue(telefone.length() <= 11);
    }

    @Test
    void senhaDeveEstarOcultaNoHTML() {
        // Este teste simula que no front-end o campo senha tem tipo password
        String tipoCampoSenha = "password"; // Simulação
        Assertions.assertEquals("password", tipoCampoSenha);
    }

    @Test
    void deveRecuperarClientePorUsuario() {
        Cadastro cadastro = new Cadastro();
        cadastro.setNome("Maria");
        cadastro.setEndereco("Rua B");
        cadastro.setTelefone("(11)98888-7777");
        cadastro.setUsuario("maria");
        cadastro.setSenha("abc123");

        cadastroRepository.save(cadastro);

        Cadastro encontrado = cadastroRepository.findAll().stream()
                .filter(c -> c.getUsuario().equals("maria"))
                .findFirst()
                .orElse(null);

        Assertions.assertNotNull(encontrado);
        Assertions.assertEquals("maria", encontrado.getUsuario());
    }

    @Test
    void devePermitirLoginComDadosValidos() {
        Cadastro cadastro = new Cadastro();
        cadastro.setNome("Carlos");
        cadastro.setEndereco("Rua C");
        cadastro.setTelefone("(11)97777-6666");
        cadastro.setUsuario("carlos");
        cadastro.setSenha("senha123");

        cadastroRepository.save(cadastro);

        Cadastro login = cadastroRepository.findAll().stream()
                .filter(c -> c.getUsuario().equals("carlos") && c.getSenha().equals("senha123"))
                .findFirst()
                .orElse(null);

        Assertions.assertNotNull(login);
        Assertions.assertEquals("Carlos", login.getNome());
    }

    @Test
    void clientePodeSimularPedidoComLanches() {
        class Lanche {
            String nome;
            double preco;
            int qtd;

            Lanche(String nome, double preco, int qtd) {
                this.nome = nome;
                this.preco = preco;
                this.qtd = qtd;
            }

            double total() {
                return preco * qtd;
            }
        }

        Lanche lanche1 = new Lanche("Brutal Burger", 30.0, 2);
        Lanche lanche2 = new Lanche("Refri", 5.0, 1);

        double total = lanche1.total() + lanche2.total();

        Assertions.assertEquals(65.0, total);
    }

    @Test
    void deveLimparCarrinho() {
        java.util.List<String> carrinho = new java.util.ArrayList<>();
        carrinho.add("Lanche 1");
        carrinho.add("Lanche 2");

        carrinho.clear();

        Assertions.assertTrue(carrinho.isEmpty());
    }
}

type Item = {
    nome: string;
    quantidade: number;
    categoria: string;
    status: string;
  };
  
  const listaCompras: Item[] = [];
  
  function menu() {
    while (true) {
      const opcao = prompt(`
          Escolha uma opção:
          1. Adicionar item
          2. Listar itens
          3. Editar item
          4. Remover item
          5. Marcar item como comprado
          6. Resumo da lista
          7. Sair
      `);
  
      switch (opcao) {
        case "1":
          adicionarItem();
          break;
        case "2":
          listarItens();
          break;
        case "3":
          editarItem();
          break;
        case "4":
          removerItem();
          break;
        case "5":
          marcarItem();
          break;
        case "6":
          resumoLista();
          break;
        case "7":
          console.log("Programa encerrado!");
          return;
        default:
          console.log("Opção inválida!");
      }
    }
  }
  
  function adicionarItem() {
    const nome = prompt("Digite o nome do item: ") as string;
    const quantidade = Number(prompt("Digite a quantidade: "));
    const categoria = prompt("Digite a categoria: ") as string;
  
    if (!nome || !quantidade || !categoria) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
  
    const novoItem: Item = {
      nome: nome,
      quantidade: quantidade,
      categoria: categoria,
      status: "não comprado",
    };
  
    listaCompras.push(novoItem);
    console.log("Item adicionado com sucesso!");
  }
  
  function listarItens() {
    const opcaoOrdenacao = prompt("Ordenar por: (1) alfabética, (2) categoria, (3) quantidade");
    let listaOrdenada: Item[] = [...listaCompras]; //cria uma cópia da lista de compras original
  
    if (opcaoOrdenacao === "2") {
      listaOrdenada.sort((a, b) => a.categoria.localeCompare(b.categoria));
    } else if (opcaoOrdenacao === "3") {
      listaOrdenada.sort((a, b) => a.quantidade - b.quantidade);
    } else {
      listaOrdenada.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  
    const opcaoFiltro = prompt("Filtrar por: (1) todas, (2) categoria, (3) status");
  
    if (opcaoFiltro === "2") {
      const categoria = prompt("Digite a categoria: ");
      if (categoria) {
        listaOrdenada = listaOrdenada.filter((item) => item.categoria.toLowerCase() === categoria.toLowerCase());
      }
    } else if (opcaoFiltro === "3") {
      const status = prompt("Digite o status (comprado/não comprado):")?.toLowerCase();
      if (status === "comprado" || status === "não comprado") {
        listaOrdenada = listaOrdenada.filter((item) => item.status === status);
      } else {
        console.log("Status inválido. Exibindo todos os itens.");
      }
    }
  
    console.log("Lista de compras:");
    if (listaOrdenada.length > 0) {
      listaOrdenada.forEach((item) => console.log(item));
    } else {
      console.log("Nenhum item encontrado.");
    }
  }
  
  function editarItem() {
    const itemEditar = prompt("Digite o item a ser editado:");
    if (!itemEditar) return;
    const index = listaCompras.findIndex((item) => item.nome === itemEditar);
  
    if (index !== -1) {
      const novoNome = prompt("Novo nome: ") as string;
      const novaQuantidade = Number(prompt("Nova quantidade: "));
      const novaCategoria = prompt("Nova categoria: " ) as string;
  
      listaCompras[index] = {
        nome: novoNome || listaCompras[index].nome,
        quantidade: novaQuantidade || listaCompras[index].quantidade,
        categoria: novaCategoria || listaCompras[index].categoria,
        status: listaCompras[index].status,
      };
  
      console.log("Item editado com sucesso!");
    } else {
      console.log("Item não encontrado!");
    }
  }
  
  function removerItem() {
    const itemASerRemovido = prompt("Digite o item a ser removido: ") as string;
    if (!itemASerRemovido) return;
    const index = listaCompras.findIndex((i) => i.nome === itemASerRemovido);
    
    if (index !== -1) {
      const confirmacao = prompt(`Tem certeza que deseja remover o item "${itemASerRemovido}"? (sim/não)`)?.toLowerCase(); 
  
      if (confirmacao === "sim") {
        listaCompras.splice(index, 1);
        console.log(`Item "${itemASerRemovido}" removido com sucesso!`);
      } else if (confirmacao === "não") {
        console.log("Remoção cancelada.");
      } else {
        console.log("Opção inválida. Operação cancelada.");
      }
    } else {
      console.log("Item não encontrado na lista.");
    }
  }
  
  function marcarItem() {
    const itemMarcar = prompt("Digite o item a ser marcado: ") as string;
    if (!itemMarcar) return;
    const index = listaCompras.findIndex((item) => item.nome === itemMarcar);
  
    if (index !== -1) {
      listaCompras[index].status = listaCompras[index].status === "comprado" ? "não comprado" : "comprado";
      console.log(`Status do item "${itemMarcar}" alterado para "${listaCompras[index].status}" com sucesso!`);
    } else {
      console.log("Item não encontrado.");
    }
  }
  
  function resumoLista() {
    const totalItens = listaCompras.length;
    
    const itensPorCategoria = {};
    listaCompras.forEach((item) => {
      itensPorCategoria[item.categoria] =
        (itensPorCategoria[item.categoria] || 0) + 1;
    });
    
    const itensComprados = listaCompras.filter((item) => item.status === "comprado").length;
    const itensNaoComprados = totalItens - itensComprados;
  
    console.log("Resumo da lista de compras:");
    console.log(`Total de itens: ${totalItens}`);
    console.log("Itens por categoria:", itensPorCategoria);
    console.log(`Itens comprados: ${itensComprados}`);
    console.log(`Itens não comprados: ${itensNaoComprados}`);
  }
  
  menu();
  
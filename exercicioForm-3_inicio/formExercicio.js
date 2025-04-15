// formExercicio.js

document.addEventListener("DOMContentLoaded", () => {
    // Guardar referências aos elementos
    const form = document.getElementById("newItemForm");
    const button = document.getElementById("showForm");
    const list = document.querySelector("ul");
    const input = document.getElementById("itemDescription");
    const h2 = document.querySelector("h2");

    let lastDeletedItem = null; // Para guardar o último item eliminado (para Ctrl+Z)

    // 1 - Esconder o formulário ao carregar a página
    form.classList.add("hide");

    // 2 - Mostrar o formulário e esconder o botão ao clicar em "New Item"
    button.addEventListener("click", () => {
        form.classList.remove("hide");
        form.classList.add("show");
        button.style.display = "none";
        input.focus();
    });

    // 3 - Adicionar novo item à lista ao submeter o formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede comportamento padrão do formulário
        const value = input.value.trim(); // Remove espaços antes e depois
        if (value !== "") {
            const newItem = document.createElement("li"); // Cria novo <li>
            newItem.textContent = value;
            list.appendChild(newItem); // Adiciona à lista
            input.value = ""; // Limpa campo
            form.classList.remove("show"); // Esconde o form
            form.classList.add("hide");
            button.style.display = "block"; // Mostra o botão novamente
            updateCount(); // Atualiza contagem de itens
        }
    });

    // 4 - Ao clicar num item da lista
    list.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            const item = e.target;
            if (item.classList.contains("complete")) {
                // Se já estiver completo, guarda e remove
                lastDeletedItem = item.cloneNode(true);
                item.remove();
            } else {
                // Caso contrário, marca como completo e move para o fim
                item.classList.add("complete");
                list.appendChild(item);
            }
            updateCount();
        }
    });

    // 5 - Atualizar número de itens por comprar
    function updateCount() {
        const items = list.querySelectorAll("li:not(.complete)"); // Só os não completos
        let span = h2.querySelector("span");
        if (!span) {
            span = document.createElement("span");
            h2.appendChild(span); // Cria o <span> se não existir
        }
        span.textContent = items.length; // Mostra número de itens por comprar
    }

    updateCount(); // Atualiza contagem no início

    // 6 - Repor último item eliminado com Ctrl+Z ou Cmd+Z
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "z" && lastDeletedItem) {
            list.appendChild(lastDeletedItem);
            lastDeletedItem = null;
            updateCount();
        }
    });
});
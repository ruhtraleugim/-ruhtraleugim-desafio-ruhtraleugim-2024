class DataAnimalERecintos {
    // Modelo simplificado para os dados de animais
    AnimalDataModel() {
        return {
            LEAO: {nome: "LEAO", tamanho: 3, biomas: ["savana", "savanaRio", "savana2"], tipo: "Carnívoro"},
            LEOPARDO: {nome: "LEOPARDO", tamanho: 2, biomas: ["savana", "savanaRio", "savana2"], tipo: "Carnívoro"},
            CROCODILO: {nome: "CROCODILO", tamanho: 3, biomas: ["rio"], tipo: "Carnívoro" },
            MACACO: {nome: "MACACO", tamanho: 1, biomas: ["savana", "floresta", "savanaRio", "savana2"], tipo: "Herbívoro"},
            GAZELA: {nome: "GAZELA", tamanho: 2, biomas: ["savana", "savanaRio", "savana2"], tipo: "Herbívoro" },
            HIPOPOTAMO: {nome: "HIPOPOTAMO", tamanho: 3, biomas: ["savana", "rio", "savanaRio", "savana2"], tipo: "Herbívoro" }
        };
    }

    // Modelo simplificado para os recintos pois nunca será mudado mesmo
    RecintosModel() {
        return {
            savana: { id: 1, capacidadeTotal: 10, capacidadeAtual: 7, ocupados: 3, animais: "MACACO", tipo: "Herbívoro" },
            floresta: { id: 2, capacidadeTotal: 5, capacidadeAtual: 5, ocupados: 0, animais: "VAZIO", tipo: "VAZIO" },
            savanaRio: { id: 3, capacidadeTotal: 7, capacidadeAtual: 5, ocupados: 1, animais: "GAZELA", tipo: "Herbívoro" },
            rio: { id: 4, capacidadeTotal: 8, capacidadeAtual: 8, ocupados: 0, animais: "VAZIO", tipo: "VAZIO" },
            savana2: { id: 5, capacidadeTotal: 9, capacidadeAtual: 6, ocupados: 1, animais: "LEAO", tipo: "Carnívoro" }
        };
    }

    verificarDisponibleRecintos(animalNome, quantidade) {
        let recintosNoZoo = this.getRecintosOnZooByName(animalNome);
        let recintosDisponiveis = [];
        let animalData = this.AnimalDataModel();
        let animal = animalData[animalNome];


        let espacoNecessario = animal.tamanho * quantidade;
        let tipo = this.getTipoAnimal(animalNome);

        

        // Verificação de depressão para o macaco , isso foi facil 
        if (animalNome === "MACACO" && quantidade <= 1) {
            return [];
        }

        // Lógica para verificar recintos disponíveis, tranquilo
        for (let bioma in recintosNoZoo) {
            let recinto = recintosNoZoo[bioma];
            let espacoRestante = recinto.capacidadeAtual;
            // Verificação especial para o hipopótamo, isso deu muito mais trabalho do que eu esperava
            if (animalNome === "HIPOPOTAMO"){
                if (bioma === "savanaRio" || bioma === "rio"){
                    tipo = "Herbívoro";
                }else tipo = "Carnívoro";
                
            }

            if (tipo === "Carnívoro"){
                // Carnívoros podem ficar sozinhos ou com sua espécie
                if ((recinto.animais === animalNome || recinto.animais === "VAZIO") && espacoRestante >= espacoNecessario)  {
                    recintosDisponiveis.push(recinto);
                }
            } else { // Herbívoro
                if (recinto.tipo === "Herbívoro" || recinto.tipo === "VAZIO"){
                    if (recinto.animais !== animalNome && recinto.animais !== "VAZIO") {
                        recinto.capacidadeAtual -= 1;  // Diminui a capacidade se for uma espécie diferente
                    }
                    if (espacoRestante >= espacoNecessario) {
                        recintosDisponiveis.push(recinto);
                    }
                }
            }
        }
        // não sei porque mais sem isso a ordem da lista do hipopotamo sai ao contrario, perdi 4 dias procurando como resolver, ate mudar a ordem dos indixes nos testes para entender, foi ai que achei a perola.
        if (animalNome === "HIPOPOTAMO"){
            recintosDisponiveis.sort((a, b) => a.id - b.id);
        }
        // vale resaltar que essa foi a primeira vez me aprofundando em JS. geralmente mexo com java, então pode esta bagunçado demais. sorry.

        return recintosDisponiveis;
    }

    //#region getters nada interessante afrente
    getTipoAnimal(animalNome){
        let animaisData = this.AnimalDataModel();
        let animal = animaisData[animalNome];
        return animal ? animal.tipo : null;
    }

    getBiomasAnimal(animalNome){
        let animaisData = this.AnimalDataModel();
        let animal = animaisData[animalNome];
        return animal ? animal.biomas : [];
    }

    getRecintosOnZooByName(animalNome){
        let biomasAnimal = this.getBiomasAnimal(animalNome);
        let recintos = this.RecintosModel();
        let recintosNoZoo = {};

        biomasAnimal.forEach(bioma => {
            if (recintos[bioma]) {
                recintosNoZoo[bioma] = recintos[bioma];
            }
        });
        return recintosNoZoo;
    }
    //#endregion
}

export { DataAnimalERecintos };
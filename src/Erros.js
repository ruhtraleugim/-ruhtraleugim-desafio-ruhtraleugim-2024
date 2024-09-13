import { DataAnimalERecintos } from "./DataAnimalERecintos.js";

class Erros{
    verificarValidadeNomeAnimal(animal) {
        let dataAnimalERecintos = new DataAnimalERecintos();
        let animalData = dataAnimalERecintos.AnimalDataModel()[animal];

        if (animalData) {
            return {};
        } else {
            return {erro: "Animal inválido", recintosViaveis: null};
        }
    }

    verificarValidadeQuantidadeAnimal(quantidade) {
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        } else {
            return {}; 
        }
    }

}

export { Erros };

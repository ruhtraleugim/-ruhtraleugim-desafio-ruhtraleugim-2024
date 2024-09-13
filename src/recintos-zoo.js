import { Erros } from "./Erros.js";
import { DataAnimalERecintos } from "./DataAnimalERecintos.js";

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const erros = new Erros();
        const data = new DataAnimalERecintos();

        let validadeNome = erros.verificarValidadeNomeAnimal(animal);
        if (validadeNome.erro) {
            return validadeNome;
        }

        let validadeQuantidade = erros.verificarValidadeQuantidadeAnimal(quantidade);
        if (validadeQuantidade.erro) {
            return validadeQuantidade;
        }

        let recintosDisponiveis = data.verificarDisponibleRecintos(animal, quantidade);
        let espacoNecessario = this.analisaEspaco(animal, quantidade);

        if (recintosDisponiveis.length > 0) {
            let recintosFormatados = recintosDisponiveis.map(recinto => {
                let espacoRestante = recinto.capacidadeAtual - espacoNecessario;
                return `Recinto ${recinto.id} (espaço livre: ${espacoRestante} total: ${recinto.capacidadeTotal})`;
            });

            return {
                recintosViaveis: recintosFormatados
            };
        } else {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: null
            };
        }
    }

    analisaEspaco(animalNome, quantidade) {
        const data = new DataAnimalERecintos();

        let animalData = data.AnimalDataModel()[animalNome];
        if (!animalData) return 0;

        let espacoNecessario = animalData.tamanho * quantidade;
        return espacoNecessario;
    }
}

export { RecintosZoo };

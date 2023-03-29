import { useStore } from "@/store";
import { AliasGame } from "@/game";

export function useSave () {
    function saveGame () {
        const { game } = useStore()
        const data = JSON.stringify(game.value)
        localStorage.setItem('alias-game', data)
    }

    function loadGame () {
        const { game } = useStore()

        const data = localStorage.getItem('alias-game')
        if (data) {
            game.value = AliasGame.importGame(data)
        }
    }

    return {
        saveGame,
        loadGame
    }
}

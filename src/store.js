import {ref} from "vue";
import { AliasGame } from './game'

const game = ref(null)
export function useStore () {
    function initGame (teamsCount = 2, playerNames = '', timer = 90) {
        game.value = new AliasGame(teamsCount, playerNames, timer)
    }

    return  {
        game,
        initGame
    }
}

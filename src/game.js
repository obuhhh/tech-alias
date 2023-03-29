import { words } from './dictionary'
import { useSave } from '@/composables'
const { saveGame } = useSave()

class Player {
    constructor (name) {
        this.name = name
        this.score = 0
    }
}

class Team {
    constructor (name, players = []) {
        this.name = name
        this.players = players
        this.currentPlayer = null
        this.round = 0
    }

    get score () {
        return this.players.reduce((acc, player) => acc + player.score, 0)
    }

    nextPlayer () {
        const currentPlayerIndex = this.players.indexOf(this.currentPlayer)
        this.currentPlayer = this.players[currentPlayerIndex + 1] || this.players[0]
    }
}

export class AliasGame {
    constructor (teamsCount = 2, playerNames = '', roundTime = 5) {
        this._state = 'idle'

        this.roundCallback = null
        this.roundTime = roundTime
        this.timer = roundTime

        this.words = words
        this.currentWord = null
        this.roundWords = {}

        this.teams = []
        this.currentTeam = null
        this.initTeams(teamsCount, playerNames)
    }

    get state () {
        return {
            idle: this._state === 'idle',
            round: this._state === 'round',
            roundEnd: this._state === 'roundEnd'
        }
    }

    get guestedWords () {
        return Object.keys(this.roundWords).filter(word => this.roundWords[word])
    }

    initTeams (teamsCount = 2, playerNames = '') {
        const players = playerNames.split(',').map(name => name.trim())
        const teamSizes = getTeamSizesByPlayersCount(players.length, teamsCount)

        teamSizes.forEach((teamSize, index) => {
            const team = new Team(`Team ${index + 1}`, getRandomPlayersFromArrayByCount(players, teamSize).map(name => new Player(name)))
            this.teams.push(team)
        })
    }

    switchTeam () {
        const currentTeamIndex = this.teams.indexOf(this.currentTeam)
        this.currentTeam = this.teams[currentTeamIndex + 1] || this.teams[0]
    }

    nextWord () {
        if (this.state.roundEnd || !this.words.length) {
            return this.endRound()
        }
        this.currentWord = this.words.splice(Math.floor(Math.random() * this.words.length), 1)[0]
        saveGame(this)
    }

    wordGuessed () {
        this.roundWords[this.currentWord] = true
        this.nextWord()
    }

    wordNotGuessed () {
        this.roundWords[this.currentWord] = false
        this.nextWord()
    }

    endRound () {
        this._state = 'idle'
        this.currentTeam.currentPlayer.score += this.guestedWords.length
        this.roundCallback()
        this.words.push(...Object.keys(this.roundWords).filter(word => !this.roundWords[word]))
    }

    prepareRound () {
        this.roundWords = {}
        this.timer = this.roundTime
        this.switchTeam()
        this.currentTeam.round++
        this.currentTeam.nextPlayer()
    }

    startRound (endCallback) {
        this._state = 'round'
        this.roundCallback = endCallback
        this.nextWord()

        const interval = setInterval(() => {
            this.timer--

            if (this.timer === 0) {
                this._state = 'roundEnd'
                clearInterval(interval)
            }
        }, 1000)
    }

    static importGame (jsonData) {
        const data = JSON.parse(jsonData)
        const game = new AliasGame(data.teams.length, '', data.roundTime)
        game._state = 'idle'
        game.timer = data.timer
        game.words = data.words
        game.currentWord = data.currentWord
        game.roundWords = data.roundWords

        game.teams = data.teams.map(t => {
            const players = t.players.map(pl => {
                const player = new Player(pl.name)
                player.score = pl.score
                return player
            })

            const team = new Team(t.name, players)
            team.round = t.round

            if (t.currentPlayer) {
                team.currentPlayer = players.find(pl => pl.name === t.currentPlayer.name)
            }

            return team
        })

        if (data.currentTeam) {
            game.currentTeam = game.teams.find(team => team.name === data.currentTeam.name)
        }

        return game
    }
}

function getTeamSizesByPlayersCount (playersCount, teamCount) {
    const teamSizes = []
    let rest = playersCount
    for (let i = 0; i < teamCount; i++) {
        const teamSize = Math.floor(rest / (teamCount - i))
        teamSizes.push(teamSize)
        rest -= teamSize
    }
    return teamSizes
}
function getRandomPlayersFromArrayByCount (list, count) {
    const players = []
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * list.length)
        players.push(list[randomIndex])
        list.splice(randomIndex, 1)
    }
    return players
}

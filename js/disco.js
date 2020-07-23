const disco = `%c

██████  ██ ███████  ██████  ██████  ██  
██   ██ ██ ██      ██      ██    ██ ██  
██   ██ ██ ███████ ██      ██    ██ ██  
██   ██ ██      ██ ██      ██    ██     
██████  ██ ███████  ██████  ██████  ██  
                                        `
const moves = [
    '＼(^‿^")／', '┌("‾.‾)┐', '＼(^‿^")／', '┌("‾.‾)┐',
    '＼(^‿^")／', '┌("‾.‾)┐', '＼(^‿^")／', '┌("‾.‾)┐',
    'ƪ(‾.‾“)┐', '┌("‾.‾)ʃ', 'ƪ(‾.‾“)┐', '┌("‾.‾)ʃ',
    'ƪ(˘⌣˘“)┐', '┌(“˘⌣˘)ʃ', 'ƪ(˘⌣˘“)ʃ', '┌(‾⌣‾“)┐',
]
const colours = ['red', 'blue', 'green', 'orange', 'cyan', 'magenta']
const [millisecondsPerMinute, beatsPerMinute] = [60000, 130]
const tempo = Math.floor(millisecondsPerMinute/beatsPerMinute)
const dance = (() => {
    let currentMove = 0
    let currentColour = 0
    const executeMove = (move, colour) => {
        console.clear()
        console.log(disco, 'color: yellow; background-color: black;')
        console.log(`%c ${move}`, `color: ${colour}; font-size: 40px; font-weight: bold;`)
        if (currentMove === moves.length) currentMove = 0
        if (currentColour === colours.length) currentColour = 0
    }
    setInterval(() => {
        executeMove(moves[currentMove++], colours[currentColour++])
    }, tempo)
})()
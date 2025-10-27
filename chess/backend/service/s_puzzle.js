
import { puzzle } from "../db/puzzle";


export async function retrieveDailyPuzzle(){

    let link = "https://lichess.org/api/puzzle/daily"

    try{
        
        const daily_puzzle =  await curl.get(link);
    
        const puzzle = new puzzle({
        pgn: daily_puzzle.game.pgn,
        answer: daily_puzzle.game.solution,
        date: daily_puzzle.game.createdAt,
        rating: daily_puzzle.game.rating
    })

    return await puzzle.save()

    }
    catch (Error) {
        console.log(`Error retrieving daily puzzle: ${ Error }`)
    }
    
}

async function get_all_puzzles(
    query = [],
    { sortBy = "createdAt", sortOrder = 'descending' } = {},
) {
    return await puzzle.find(query).sort( { [sortBy]: sortOrder})
}

export async function list_all_puzzles(options){
    return get_all_puzzles({}, options)
}

export async function getPuzzleByID(puzzleId){
    return await puzzle.findById(puzzleId) 
}


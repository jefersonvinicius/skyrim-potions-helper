import { selectPotions } from "./app/core/select-potions.js"



async function main() {
    const ingredients = [
        {ingredient: "Blue Dartwing", amount: 1},
        {ingredient: "Nordic Barnacle", amount: 1},
        {ingredient: "Abecean Longfin", amount: 1}
    ]
    
    const result = selectPotions({ingredients})

    console.table(result)
}

main()
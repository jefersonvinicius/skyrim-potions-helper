import potions from './potions.json' assert {type: 'json'}

function ingredientsMatches(potionIngredients, ingredients) {
    return ingredients.filter(({ingredient}) => potionIngredients.includes(ingredient))
}

export function selectPotions({ingredients = []}) {
    const result = []
    Object.entries(potions).forEach(([potion, potionIngredients]) => {
        const matched = ingredientsMatches(potionIngredients, ingredients)
        if (matched.length > 1) {
            result.push({potion, ingredients: matched.map(m => m.ingredient)})
        }
    })
    return result;
}
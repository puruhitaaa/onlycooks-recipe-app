import { formatDistance } from 'date-fns'
import { useState } from 'react'
import { IRecipe } from '../../types/recipe'
import { IUser } from '../../types/user'
import ExploreItem from '../ExploreItem'

interface Props {
  recipes: IRecipe[]
}

export default function Explore({ recipes }: Props) {
  return (
    <>
      <div className='max-w-7xl mx-auto p-5 space-y-16 xl:space-y-10'>
        {recipes.map((recipe) => (
          <ExploreItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  )
}

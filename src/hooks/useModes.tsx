import create from 'zustand'

type Modes = {
  isExploreMode: boolean
  toggleExploreMode: () => void
}

export const useModes = create<Modes>((set, get) => ({
  isExploreMode: JSON.parse(localStorage.getItem('is-explore-mode') || 'false'),
  toggleExploreMode: () => {
    const isExploreMode = get().isExploreMode

    if (isExploreMode) {
      localStorage.removeItem('is-explore-mode')
    } else {
      localStorage.setItem('is-explore-mode', JSON.stringify(true))
    }

    set((state) => ({ isExploreMode: !state.isExploreMode }))
  },
}))

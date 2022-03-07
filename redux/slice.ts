import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from './store'
import { emojiMenus } from './sample_data'

type ValueOf<T> = T[keyof T]
export interface SelectorState {
  items: {
    available: typeof emojiMenus
    selected: typeof emojiMenus
  }
  option: {
    showTitle: boolean
    titles: [string, string]
    search: boolean
    onlyOne: boolean
    selectedItems: boolean
    itemSize: string
    width: number
    height: number
  }
}

const half = Math.floor(emojiMenus.length / 2)
const initialState: SelectorState = {
  items: {
    available: emojiMenus.slice(0, half),
    selected: emojiMenus.slice(half),
  },
  option: {
    showTitle: true,
    titles: ['available options', 'selected options'],
    search: true,
    onlyOne: true,
    selectedItems: true,
    itemSize: 's',
    width: 171,
    height: 300,
  },
}

export const selectorSlice = createSlice({
  name: 'selector',
  initialState,
  reducers: {
    resetItems: (state) => {
      state.items = initialState.items
    },
    moveToAvailable: (state, action: PayloadAction<number[]>) => {
      for (const id of action.payload) {
        const targetIdx = state.items.selected.findIndex((v) => v.id === id)
        state.items.available.push(state.items.selected[targetIdx])
        state.items.available.splice(targetIdx, 1)
      }
    },
    moveToSelected: (state, action: PayloadAction<number[]>) => {
      for (const id of action.payload) {
        const targetIdx = state.items.available.findIndex((v) => v.id === id)
        state.items.selected.push(state.items.available[targetIdx])
        state.items.selected.splice(targetIdx, 1)
      }
    },
    moveAllToAvailable: (state) => {
      state.items = {
        available: emojiMenus,
        selected: [],
      }
    },
    moveAllToSelected: (state) => {
      state.items = {
        available: [],
        selected: emojiMenus,
      }
    },
    updateOption: (
      state,
      action: PayloadAction<{
        key: keyof SelectorState['option']
        value: ValueOf<SelectorState['option']>
      }>
    ) => {
      state.option = {
        ...state.option,
        [action.payload.key]: action.payload.value,
      }
    },
  },
})

export const {
  resetItems,
  moveAllToAvailable,
  moveAllToSelected,
  moveToAvailable,
  moveToSelected,
  updateOption,
} = selectorSlice.actions
export const selectSelector = (state: AppState) => state.selector
export default selectorSlice.reducer

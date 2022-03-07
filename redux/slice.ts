import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from './store'

export interface SelectorState {
  items: {
    available: any[]
    selected: any[]
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

type OptionType = SelectorState['option']

const initialState: SelectorState = {
  items: {
    available: [],
    selected: [],
  },
  option: {
    showTitle: true,
    titles: ['avilable options', 'selected options'],
    search: true,
    onlyOne: true,
    selectedItems: true,
    itemSize: 's',
    width: 171,
    height: 171,
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
    dragAndDrop: (
      state,
      action: PayloadAction<{
        items: keyof SelectorState['items']
        from: number
        to: number
      }>
    ) => {
      const { items, from, to } = action.payload
      const selectedItems = state.items[items]
      ;[selectedItems[from], selectedItems[to]] = [
        selectedItems[to],
        selectedItems[from],
      ]
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

export const {} = selectorSlice.actions
export const selectSelector = (state: AppState) => state.selector
export default selectorSlice.reducer

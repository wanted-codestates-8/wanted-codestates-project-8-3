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
    updateOption: (state, action: PayloadAction<OptionType>) => {
      state.option = action.payload
    },
  },
})

export const {} = selectorSlice.actions
export const selectSelector = (state: AppState) => state.selector
export default selectorSlice.reducer

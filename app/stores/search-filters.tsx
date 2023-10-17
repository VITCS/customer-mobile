import * as React from "react"

// context to store attributes and values selected in object structure
type SearchFiltersContextType = {
  attributes: Record<string, Record<string, any>>
  updateFilters: (attribute: string, value: any, selected: boolean) => void
  clearAll: () => any
}

export const SearchFiltersContext = React.createContext<SearchFiltersContextType>({
  attributes: {},
  updateFilters: () => {
  },
  clearAll: () => true,
})

export const SearchFiltersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [attributes, setAttributes] = React.useState<SearchFiltersContextType["attributes"]>({})

  const updateAttributes = (attribute: string, value: any, selected: boolean) => {
    setAttributes((prev) => {
      // remove value from attribute if already selected
      let updatedCurrentAttribute = prev[attribute]
      // const isValueAlreadySelected = updateAttributes?.[value]
      console.log("prev", selected)

      if (selected) {
        updatedCurrentAttribute = {
          ...prev[attribute],
          [value]: true,
        }
      } else {
        const { [value]: _, ...rest } = prev[attribute]
        updatedCurrentAttribute = rest
      }

      console.log("updated ", updatedCurrentAttribute)

      return {
        ...prev,
        [attribute]: updatedCurrentAttribute,
      }
    })
  }

  const clearAll = React.useCallback(() => {
    setAttributes({})
  }, [setAttributes])

  return (
    <SearchFiltersContext.Provider
      value={{
        attributes,
        updateFilters: updateAttributes,
        clearAll,
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  )
}

/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { SearchProductsLambdaDocument } from "../graphql/generated/graphql"
import { apiSdk } from "../utils/api"

export const getMinMaxPrices = (priceRange) => {
  const flatendValues = priceRange.flatMap((price) => {
    return price.split("-")
  })
  const onlyNumbers = flatendValues.map((val) => parseInt(val))
  const sortedValues = onlyNumbers?.sort()
  return {
    minPrice: sortedValues[0],
    maxPrice: sortedValues[sortedValues.length - 1],
  }
}

const filterKeyMappings = {
  brand: "brandLine",
  ProdCategory: "prodCategory",
}

export class ProductsConnector {
  async onSearch(state, queryConfig) {
    try {
      const { searchTerm, current, filters, sort, sortList, resultsPerPage } = state
      const { deliveryAddress } = queryConfig
      let priceRange = []
      const fieldFilters = []
      let sortFilters = { direction: 'asc', field: 'prodFullName' };  // default value

      if (sortList && sortList.length > 0) {
        sortFilters.direction = sortList[0].direction;
        sortFilters.field = sortList[0].field;
      }
      filters.forEach((eachFilter) => {
        const { field, values, type } = eachFilter
        const fieldKey = filterKeyMappings[field] || field
        if (fieldKey === "price") {
          priceRange = values
          return
        }
        const conditionType = type === "any" ? "eq" : type

        values.forEach((eachFilterValue) => {
          fieldFilters.push({
            [fieldKey]: {
              [conditionType]: eachFilterValue,
            },
          })
        })
      })
      const { minPrice, maxPrice } = getMinMaxPrices(priceRange)
      // const operation = graphqlOperation(searchProductsLambda, {
      //   limit: resultsPerPage,
      //   // distance: 10,
      //   // lat: deliveryAddress?.lat,
      //   // lon: deliveryAddress?.lon,
      //   maxPrice,
      //   minPrice,
      //   filter: {
      //     and: fieldFilters,
      //   },
      // });
      // const { data } = await graphql(operation);
      const { data } = await apiSdk.request(SearchProductsLambdaDocument, {
        limit: resultsPerPage,
        // distance: 10,
        // lat: deliveryAddress?.lat,
        // lon: deliveryAddress?.lon,
        maxPrice,
        minPrice,
        filter: {
          and: fieldFilters,
        },
        sort: sortFilters
      })
      const {
        items = [],
        nextToken = null,
        total = 0,
        // brand = [],
        ...facets
      } = data?.searchProductsLambda || {}
      const formattedResults =
        items?.map((item) => ({
          ...item,
          url: `/product/${item.id}`,
        })) || []

      const computedFacets: Record<string, any> = {}
      if (data?.searchProductsLambda?.items.length > 0) {
        computedFacets.price = [
          {
            isFilterable: false,
            data: [
              {
                value: "1-20",
                count: "",
              },
              {
                value: "20-50",
                count: "",
              },
              {
                value: "50-100",
                count: "",
              },
            ],
          },
        ]
      }
      Object.keys(facets).forEach((key) => {
        computedFacets[key] = [
          {
            data: facets[key].map(({ key, doc_count }) => ({
              value: key,
              count: doc_count,
            })),
          },
        ]
      })

      return {
        results: formattedResults,
        // facets: {
        //   brandLine: [
        //     {
        //       data: brand?.map((eachBrandCount) => ({
        //         value: eachBrandCount.key,
        //         count: eachBrandCount.doc_count,
        //       })),
        //     },
        //   ],
        // },
        facets: computedFacets,
        totalResults: total || 0,
        totalPages: total / resultsPerPage,
      }
    } catch (error) {
      console.log("elastic search error", error)
    }
  }

  async onAutocomplete(state, queryConfig) {
    // autocomplete is not needed for now
  }

  onResultClick(params) {
    console.log("perform a call to the API to highlight a result has been clicked")
  }

  onAutocompleteResultClick(params) {
    console.log("perform a call to the API to highlight an autocomplete result has been clicked")
  }
}

export default {}

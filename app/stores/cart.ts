import { useCallback, useMemo } from "react"
import {
  CartShipment,
  CustomerAddress,
  CustomerProfile,
  DeliveryAddress,
  ListCartsQuery,
  Product,
  useCreateCartMutation,
  useCreateCartShipmentMutation,
  useDeleteCartShipmentMutation,
  useGetCartByUserIdQuery,
  useGetCartIdsQuery,
  useGetCartQuery,
  useGetDeliveryAddressInitQuery,
  useUpdateCartShipmentMutation,
} from "../graphql/generated/graphql"
import { getCartInvalidFlag } from "../hooks/cart"
import { apiSdk, getUserId } from "../utils/api"
import { generateUniquUID } from "../utils/generate"
import { useLoggedInUser } from "./auth"

export type IStateAddress = Pick<
  CustomerAddress,
  | "id"
  | "addrLine1"
  | "addrLine2"
  | "addrState"
  | "city"
  | "country"
  | "latitude"
  | "longitude"
  | "postCode"
>

export type IStateCustomerProfile = Pick<
  CustomerProfile,
  "userId" | "orderLineitemReplacement" | "subscribeToNotification"
>

type LocalCart = ListCartsQuery["listCarts"]["items"][0]

export type IcustomWhiteListedShipments = Array<{
  storeId: string
  productId: string
}>

export const useDeliveryAddress = () => {
  const userId = useLoggedInUser()
  const { data, isError, isLoading } = useGetDeliveryAddressInitQuery(
    apiSdk,
    {
      userId,
    },
    {
      enabled: userId?.length > 0,
      cacheTime: 0
    },
  )
  return { data: data?.getCustomerProfile?.deliveryToAddress, isError, isLoading }
}

export const useCartId = () => {
  const userId = useLoggedInUser()
  const { data: listData } = useGetCartByUserIdQuery(apiSdk, {
    userId: userId,
  })
  // console.log(" list data : ",listData)
  const topCartId = useMemo(() => {
    return listData?.getCartByUserId?.items?.[0]?.id
  }, [listData])

  return topCartId
}

export const useCart = () => {
  const cartId = useCartId()
  const { data } = useGetCartQuery(
    apiSdk,
    {
      id: cartId,
    },
    {
      enabled: cartId?.length > 0,
    },
  )
  return data?.getCart
}

export const filterCartWithPartial = (
  source: LocalCart["cartShipment"]["items"],
  filter: IcustomWhiteListedShipments,
) => {
  let filteredShipments: LocalCart["cartShipment"]["items"] = []

  if (filter?.length > 0) {
    filter.forEach((com) => {
      const storefound = source?.find((r) => r.assignedStoreId === com.storeId)

      if (storefound) {
        const lineItems = storefound?.lineItems.filter((line) => {
          return line.productId === com.productId
        })

        filteredShipments.push({
          ...storefound,
          lineItems: lineItems,
        })
      }
    })
  } else {
    filteredShipments = source
  }

  console.log("partial shipment are ", filteredShipments)
  return filteredShipments
}

export type ProcessProductInput = {
  product: Pick<Product, "id" | "prodFullName" | "prodShortDesc">
  // operation: "add" | "remove"
  unitPrice: string
  quantity: number
} & Pick<CartShipment, "assignedStoreId" | "assignedStoreName"> & {
  flexibleBuy?: boolean
  removeExisingProductReferences?: boolean
  deliveryAddress: DeliveryAddress
}

export const useCartApi = () => {
  const cart = useCart()

  const { data: deliveryAddressRoot } = useDeliveryAddress()
  const { mutateAsync: createCartMutate } = useCreateCartMutation(apiSdk)

  // const { mutateAsync: updateCartMutate } = useUpdateCartMutation(apiSdk)
  const { mutateAsync: createCartShipmentMutate } = useCreateCartShipmentMutation(apiSdk)
  const { mutateAsync: deleteCartShipmentMutation } = useDeleteCartShipmentMutation(apiSdk)
  const { mutateAsync: updateCartShipmentMutate } = useUpdateCartShipmentMutation(apiSdk)
  //const { mutateAsync: deleteCartShipmentMutate } = useDeleteCartShipmentMutation(apiSdk)
  // const processProductOld = useCallback(
  //   (input: ProcessProductInput) => {
  //     const {
  //       product,
  //       assignedStoreId,
  //       quantity,
  //       assignedStoreName,
  //       flexibleBuy,
  //       removeExisingProductReferences,
  //     } = input
  //     const { id: productId, prodFullName, prodShortDesc } = product

  //     if (!productId) {
  //       console.log("Line items is empty")
  //       return
  //     }
  //     console.log("removeExisingProductReferences", removeExisingProductReferences)
  //     let newCart = cart

  //     if (removeExisingProductReferences) {
  //       // newCart = await dispatch?.cart?.discardProduct({
  //       //   product: {
  //       //     id: productId,
  //       //   },
  //       // })
  //       // console.log("after delete ", newCart.cartShipment.item)
  //     }

  //     let deliveryAddress = {
  //       ...deliveryAddressRoot,
  //       id: undefined,
  //     }
  //     // delete deliveryAddress?.id
  //     const lineItem: LineItem = {
  //       productId,
  //       prodShortDesc,
  //       productName: prodFullName,
  //       size: 100,
  //       uom: 100,
  //       qtyPurchased: quantity,
  //       unitPrice: "60.8",
  //       totalPrice: "60.8",
  //     }
  //     const isThereCartAlready = !!newCart?.id

  //     if (!isThereCartAlready || flexibleBuy) {
  //       // create new cart

  //       const newShipment: CartShipmentInput = {
  //         assignedStoreId,
  //         lineItems: [lineItem],
  //         deliveryAddress,
  //         assignedStoreName: assignedStoreName,
  //       }

  //       const userId = getUserId() || generateUniquUID()
  //       const newCart: CreateCartInput = {
  //         userId,
  //         cartShipment: [newShipment],
  //         anonymousId: userId,
  //         belongsTo: "",
  //       }
  //       if (flexibleBuy) {
  //         storage.set(FLEXIBLE_CART_KEY, JSON.stringify(newCart))
  //       } else {
  //         createCartMutate({ input: newCart })
  //       }
  //     } else {
  //       console.log("cart already exists")
  //       const exisitingShipments = newCart?.cartShipment?.items
  //       const isThisStoreAlreadyAdded = exisitingShipments?.find(
  //         (shipment) => shipment?.assignedStoreId === assignedStoreId,
  //       )

  //       if (isThisStoreAlreadyAdded) {
  //         console.log("store already exits")
  //         const isThisProdcutAdded = isThisStoreAlreadyAdded.lineItems?.find(
  //           (item) => item.productId === lineItem.productId,
  //         )
  //         console.log("isThisProdcutAdded", isThisProdcutAdded)
  //         let newLineItems: CartShipment["lineItems"]

  //         if (isThisProdcutAdded) {
  //           console.log("product already exits")

  //           newLineItems = isThisStoreAlreadyAdded.lineItems.map((item) => {
  //             if (item.productId === lineItem.productId) {
  //               item.qtyPurchased = quantity
  //             }
  //             return item
  //           })
  //         } else {
  //           console.log("store doesn't exits")

  //           // # TODO: remove shipments with empty lineitems and remove cart with empty shipments
  //           // add new line item to same array
  //           newLineItems = [...isThisStoreAlreadyAdded.lineItems, lineItem]
  //         }

  //         if (newLineItems?.every((r) => r.qtyPurchased === 0)) {
  //           deleteCartShipmentMutation({
  //             input: {
  //               id: isThisStoreAlreadyAdded.id,
  //             },
  //           })
  //         } else {
  //           updateCartShipmentMutate({
  //             input: {
  //               id: isThisStoreAlreadyAdded.id,
  //               lineItems: newLineItems,
  //             },
  //           })
  //         }
  //       } else {
  //         createCartShipmentMutate({
  //           input: {
  //             assignedStoreId,
  //             assignedStoreName,
  //             lineItems: [lineItem],
  //             cartId: cart.id,
  //             deliveryAddress,
  //           },
  //         })
  //       }
  //     }
  //   },
  //   [cart],
  // )

  // const queryClient = useQueryClient()
  const discardProduct = useCallback((product: ProcessProductInput["product"]) => {
    const { id: productId } = product
    if (!productId) {
      console.log("Line items is empty")
      return Promise.resolve()
    }
    const cartShipmentsWithProduct = cart?.cartShipment?.items?.filter((shipment) => {
      return shipment?.lineItems?.find((line) => line.productId === productId)
    })
    if (cartShipmentsWithProduct?.length > 0) {
      const updateOps = cartShipmentsWithProduct.map((shipment) => {
        const newlineItems = shipment.lineItems.filter((line) => {
          return line.productId !== productId
        })
        return updateCartShipmentMutate({
          input: {
            id: shipment.id,
            lineItems: newlineItems,
          },
        })
      })
      return Promise.all(updateOps)
    }
    return Promise.resolve()
  }, [])
  const deliveryAddress = useMemo(() => {
    const { id, ...rest } = deliveryAddressRoot || { id: "" }
    return {
      ...rest,
    }
  }, [deliveryAddressRoot])
  const processProduct = useCallback(
    async (input: ProcessProductInput) => {
      const {
        removeExisingProductReferences,
        product,
        quantity,
        assignedStoreId,
        assignedStoreName,
        deliveryAddress,
        unitPrice,
      } = input
      const { id, prodFullName, prodShortDesc } = product
      console.log("Cart details", cart);
      if (!cart) {
        console.log("in create");
        createCartMutate({
          input: {
            userId: getUserId() || generateUniquUID(),
            cartShipment: [
              {
                assignedStoreId,
                assignedStoreName,
                lineItems: [
                  {
                    productId: id,
                    qtyPurchased: quantity,
                    unitPrice,
                    productName: prodFullName,
                  },
                ],
                deliveryAddress: deliveryAddress,
              },
            ],
          },
        })
      } else {
        console.log("in update");
        if (removeExisingProductReferences) {
          await discardProduct(product)
        }
        const currentShipments = cart.cartShipment.items
        console.log(" currentShipments : ", currentShipments)
        const thisStoreAlreadyAddedReference = currentShipments.find(
          (shipment) => shipment?.assignedStoreId === assignedStoreId,
        )
        const newLineItem = {
          productId: id,
          qtyPurchased: quantity,
          unitPrice,
          productName: prodFullName,
          itemInvalid: false
        }

        if (thisStoreAlreadyAddedReference) {
          let updatedLineItems = thisStoreAlreadyAddedReference.lineItems
          const thisProductAlreadyAddedReference = thisStoreAlreadyAddedReference?.lineItems?.find(
            (li) => li.productId === id,
          )

          if (thisProductAlreadyAddedReference) {
            if (quantity === 0) {
              updatedLineItems = thisStoreAlreadyAddedReference.lineItems.filter(
                (li) => li.productId !== id,
              )
            }
            updatedLineItems = updatedLineItems.map((oldLi) => {
              return {
                ...oldLi,
                qtyPurchased: quantity,
                itemInvalid: false
              }
            })
          } else {
            updatedLineItems.push(newLineItem)
          }
          if (updatedLineItems?.every((r) => r.qtyPurchased === 0)) {
            deleteCartShipmentMutation({
              input: {
                id: thisStoreAlreadyAddedReference.id,
              },
            })
          } else {
            console.log("updatedLineItems", updatedLineItems)
            updateCartShipmentMutate({
              input: {
                id: thisStoreAlreadyAddedReference.id,
                lineItems: updatedLineItems,
              },
            })
          }
        } else {
          //console.log("delivery address is ", Object.keys(deliveryAddress))
          // deliveryAddress object without id
          // const { data: deliveryAddressRoot } = useDeliveryAddress()
          // console.log("deliveryAddressRoot address is ", Object.keys(deliveryAddressRoot))
          createCartShipmentMutate({
            input: {
              assignedStoreId,
              assignedStoreName,
              cartId: cart.id,
              deliveryAddress: deliveryAddress,
              lineItems: [newLineItem],
            },
          })
        }
      }
      console.log("after");
    },
    [cart, deliveryAddressRoot],
  )

  return {
    cart,
    processProduct,
  }
}

export type ICart = ListCartsQuery["listCarts"]["items"][0]

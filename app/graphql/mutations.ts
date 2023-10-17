/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMerchantUser = /* GraphQL */ `
  mutation CreateMerchantUser($input: CreateMerchantUserInput!) {
    createMerchantUser(input: $input) {
      userId
      fullName
      email
      phoneNumber
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateMerchantUser = /* GraphQL */ `
  mutation UpdateMerchantUser($input: UpdateMerchantUserInput!) {
    updateMerchantUser(input: $input) {
      userId
      fullName
      email
      phoneNumber
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteMerchantUser = /* GraphQL */ `
  mutation DeleteMerchantUser($input: DeleteMerchantUserInput!) {
    deleteMerchantUser(input: $input) {
      userId
      fullName
      email
      phoneNumber
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createMerchantAccount = /* GraphQL */ `
  mutation CreateMerchantAccount($input: CreateMerchantAccountInput!) {
    createMerchantAccount(input: $input) {
      id
      companyName
      contactName
      contactPhoneNumber
      contactEmail
      billingAddress {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      accountStatus
      accountStatusReason
      approvedAt
      approvedBy
      Stores {
        nextToken
      }
      ownerId
      Owner {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateMerchantAccount = /* GraphQL */ `
  mutation UpdateMerchantAccount($input: UpdateMerchantAccountInput!) {
    updateMerchantAccount(input: $input) {
      id
      companyName
      contactName
      contactPhoneNumber
      contactEmail
      billingAddress {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      accountStatus
      accountStatusReason
      approvedAt
      approvedBy
      Stores {
        nextToken
      }
      ownerId
      Owner {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteMerchantAccount = /* GraphQL */ `
  mutation DeleteMerchantAccount($input: DeleteMerchantAccountInput!) {
    deleteMerchantAccount(input: $input) {
      id
      companyName
      contactName
      contactPhoneNumber
      contactEmail
      billingAddress {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      accountStatus
      accountStatusReason
      approvedAt
      approvedBy
      Stores {
        nextToken
      }
      ownerId
      Owner {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createStore = /* GraphQL */ `
  mutation CreateStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
      storeNumber
      storeName
      address {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeStatus
      statusReason
      statusUpdatedAt
      statusUpdatedBy
      storePhotos
      storePhoneNumber
      storeEmail
      businessHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      deliveryHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      storeClosing
      orderFulfilling
      deliveryScope {
        serviceArea
        MinOrderSize
        deliveryType
      }
      giftWrapping
      carriersAllowed
      specialProdCat
      createdAt
      updatedAt
    }
  }
`
export const updateStore = /* GraphQL */ `
  mutation UpdateStore($input: UpdateStoreInput!) {
    updateStore(input: $input) {
      id
      storeNumber
      storeName
      address {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeStatus
      statusReason
      statusUpdatedAt
      statusUpdatedBy
      storePhotos
      storePhoneNumber
      storeEmail
      businessHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      deliveryHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      storeClosing
      orderFulfilling
      deliveryScope {
        serviceArea
        MinOrderSize
        deliveryType
      }
      giftWrapping
      carriersAllowed
      specialProdCat
      createdAt
      updatedAt
    }
  }
`
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore($input: DeleteStoreInput!) {
    deleteStore(input: $input) {
      id
      storeNumber
      storeName
      address {
        addrLine1
        addrLine2
        addrLine3
        city
        state
        country
        postCode
        latitude
        longitude
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeStatus
      statusReason
      statusUpdatedAt
      statusUpdatedBy
      storePhotos
      storePhoneNumber
      storeEmail
      businessHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      deliveryHours {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
      storeClosing
      orderFulfilling
      deliveryScope {
        serviceArea
        MinOrderSize
        deliveryType
      }
      giftWrapping
      carriersAllowed
      specialProdCat
      createdAt
      updatedAt
    }
  }
`
export const createStorePayments = /* GraphQL */ `
  mutation CreateStorePayments($input: CreateStorePaymentsInput!) {
    createStorePayments(input: $input) {
      id
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      paymentGateway
      paymentOptions
      merPaymentAccDetails
      createdAt
      updatedAt
    }
  }
`
export const updateStorePayments = /* GraphQL */ `
  mutation UpdateStorePayments($input: UpdateStorePaymentsInput!) {
    updateStorePayments(input: $input) {
      id
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      paymentGateway
      paymentOptions
      merPaymentAccDetails
      createdAt
      updatedAt
    }
  }
`
export const deleteStorePayments = /* GraphQL */ `
  mutation DeleteStorePayments($input: DeleteStorePaymentsInput!) {
    deleteStorePayments(input: $input) {
      id
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      paymentGateway
      paymentOptions
      merPaymentAccDetails
      createdAt
      updatedAt
    }
  }
`
export const createMerchantUserGroup = /* GraphQL */ `
  mutation CreateMerchantUserGroup($input: CreateMerchantUserGroupInput!) {
    createMerchantUserGroup(input: $input) {
      id
      userId
      merchantUser {
        userId
        fullName
        email
        phoneNumber
        merchantAccountId
        createdAt
        updatedAt
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      store {
        id
        storeNumber
        storeName
        merchantAccountId
        storeStatus
        statusReason
        statusUpdatedAt
        statusUpdatedBy
        storePhotos
        storePhoneNumber
        storeEmail
        storeClosing
        orderFulfilling
        giftWrapping
        carriersAllowed
        specialProdCat
        createdAt
        updatedAt
      }
      group
      createdAt
      updatedAt
    }
  }
`
export const updateMerchantUserGroup = /* GraphQL */ `
  mutation UpdateMerchantUserGroup($input: UpdateMerchantUserGroupInput!) {
    updateMerchantUserGroup(input: $input) {
      id
      userId
      merchantUser {
        userId
        fullName
        email
        phoneNumber
        merchantAccountId
        createdAt
        updatedAt
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      store {
        id
        storeNumber
        storeName
        merchantAccountId
        storeStatus
        statusReason
        statusUpdatedAt
        statusUpdatedBy
        storePhotos
        storePhoneNumber
        storeEmail
        storeClosing
        orderFulfilling
        giftWrapping
        carriersAllowed
        specialProdCat
        createdAt
        updatedAt
      }
      group
      createdAt
      updatedAt
    }
  }
`
export const deleteMerchantUserGroup = /* GraphQL */ `
  mutation DeleteMerchantUserGroup($input: DeleteMerchantUserGroupInput!) {
    deleteMerchantUserGroup(input: $input) {
      id
      userId
      merchantUser {
        userId
        fullName
        email
        phoneNumber
        merchantAccountId
        createdAt
        updatedAt
      }
      merchantAccountId
      merchantAccount {
        id
        companyName
        contactName
        contactPhoneNumber
        contactEmail
        accountStatus
        accountStatusReason
        approvedAt
        approvedBy
        ownerId
        createdAt
        updatedAt
      }
      storeId
      store {
        id
        storeNumber
        storeName
        merchantAccountId
        storeStatus
        statusReason
        statusUpdatedAt
        statusUpdatedBy
        storePhotos
        storePhoneNumber
        storeEmail
        storeClosing
        orderFulfilling
        giftWrapping
        carriersAllowed
        specialProdCat
        createdAt
        updatedAt
      }
      group
      createdAt
      updatedAt
    }
  }
`

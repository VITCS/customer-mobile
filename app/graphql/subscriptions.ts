/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMerchantUser = /* GraphQL */ `
  subscription OnCreateMerchantUser {
    onCreateMerchantUser {
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
export const onUpdateMerchantUser = /* GraphQL */ `
  subscription OnUpdateMerchantUser {
    onUpdateMerchantUser {
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
export const onDeleteMerchantUser = /* GraphQL */ `
  subscription OnDeleteMerchantUser {
    onDeleteMerchantUser {
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
export const onCreateMerchantAccount = /* GraphQL */ `
  subscription OnCreateMerchantAccount {
    onCreateMerchantAccount {
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
export const onUpdateMerchantAccount = /* GraphQL */ `
  subscription OnUpdateMerchantAccount {
    onUpdateMerchantAccount {
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
export const onDeleteMerchantAccount = /* GraphQL */ `
  subscription OnDeleteMerchantAccount {
    onDeleteMerchantAccount {
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
export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
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
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
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
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
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
export const onCreateStorePayments = /* GraphQL */ `
  subscription OnCreateStorePayments {
    onCreateStorePayments {
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
export const onUpdateStorePayments = /* GraphQL */ `
  subscription OnUpdateStorePayments {
    onUpdateStorePayments {
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
export const onDeleteStorePayments = /* GraphQL */ `
  subscription OnDeleteStorePayments {
    onDeleteStorePayments {
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
export const onCreateMerchantUserGroup = /* GraphQL */ `
  subscription OnCreateMerchantUserGroup {
    onCreateMerchantUserGroup {
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
export const onUpdateMerchantUserGroup = /* GraphQL */ `
  subscription OnUpdateMerchantUserGroup {
    onUpdateMerchantUserGroup {
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
export const onDeleteMerchantUserGroup = /* GraphQL */ `
  subscription OnDeleteMerchantUserGroup {
    onDeleteMerchantUserGroup {
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

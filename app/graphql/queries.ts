/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMerchantUser = /* GraphQL */ `
  query GetMerchantUser($userId: ID!) {
    getMerchantUser(userId: $userId) {
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
export const listMerchantUsers = /* GraphQL */ `
  query ListMerchantUsers(
    $userId: ID
    $filter: ModelMerchantUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMerchantUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        fullName
        email
        phoneNumber
        merchantAccountId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getMerchantAccount = /* GraphQL */ `
  query GetMerchantAccount($id: ID!) {
    getMerchantAccount(id: $id) {
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
export const listMerchantAccounts = /* GraphQL */ `
  query ListMerchantAccounts(
    $filter: ModelMerchantAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMerchantAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
export const listStores = /* GraphQL */ `
  query ListStores($filter: ModelStoreFilterInput, $limit: Int, $nextToken: String) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        # storeNumber
        storeName
        # merchantAccountId
        # storeStatus
        # statusReason
        # statusUpdatedAt
        # statusUpdatedBy
        # storePhotos
        # storePhoneNumber
        # storeEmail
        # storeClosing
        # orderFulfilling
        # giftWrapping
        # carriersAllowed
        # specialProdCat
        # createdAt
        # updatedAt
      }
      nextToken
    }
  }
`
export const getStorePayments = /* GraphQL */ `
  query GetStorePayments($id: ID!) {
    getStorePayments(id: $id) {
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
export const listStorePayments = /* GraphQL */ `
  query ListStorePayments($filter: ModelStorePaymentsFilterInput, $limit: Int, $nextToken: String) {
    listStorePayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        merchantAccountId
        storeId
        paymentGateway
        paymentOptions
        merPaymentAccDetails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getMerchantUserGroup = /* GraphQL */ `
  query GetMerchantUserGroup($id: ID!) {
    getMerchantUserGroup(id: $id) {
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
export const listMerchantUserGroups = /* GraphQL */ `
  query ListMerchantUserGroups(
    $filter: ModelMerchantUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMerchantUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        merchantAccountId
        storeId
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const merchantUserByEmail = /* GraphQL */ `
  query MerchantUserByEmail(
    $email: AWSEmail
    $sortDirection: ModelSortDirection
    $filter: ModelMerchantUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    merchantUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        fullName
        email
        phoneNumber
        merchantAccountId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const merchantAccountByAccountStatus = /* GraphQL */ `
  query MerchantAccountByAccountStatus(
    $accountStatus: MerchantAccountStatus
    $sortDirection: ModelSortDirection
    $filter: ModelMerchantAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    merchantAccountByAccountStatus(
      accountStatus: $accountStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`
export const storeByMerchantAccountId = /* GraphQL */ `
  query StoreByMerchantAccountId(
    $merchantAccountId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storeByMerchantAccountId(
      merchantAccountId: $merchantAccountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`
export const storeByStatus = /* GraphQL */ `
  query StoreByStatus(
    $storeStatus: StoreStatus
    $sortDirection: ModelSortDirection
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    StoreByStatus(
      storeStatus: $storeStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`
export const storePaymentsByMerchantAccountId = /* GraphQL */ `
  query StorePaymentsByMerchantAccountId(
    $merchantAccountId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStorePaymentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storePaymentsByMerchantAccountId(
      merchantAccountId: $merchantAccountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        merchantAccountId
        storeId
        paymentGateway
        paymentOptions
        merPaymentAccDetails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const merchantUserGroupByMerchantAccountId = /* GraphQL */ `
  query MerchantUserGroupByMerchantAccountId(
    $merchantAccountId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMerchantUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    merchantUserGroupByMerchantAccountId(
      merchantAccountId: $merchantAccountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        merchantAccountId
        storeId
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const merchantUserGroupByUserId = /* GraphQL */ `
  query MerchantUserGroupByUserId(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMerchantUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    merchantUserGroupByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        merchantAccountId
        storeId
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const merchantUserGroupByStoreId = /* GraphQL */ `
  query MerchantUserGroupByStoreId(
    $storeId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMerchantUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    merchantUserGroupByStoreId(
      storeId: $storeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        merchantAccountId
        storeId
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const searchStores = /* GraphQL */ `
  query SearchStores(
    $filter: SearchableStoreFilterInput
    $sort: SearchableStoreSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchStores(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken, from: $from) {
      items {
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
      nextToken
      total
    }
  }
`

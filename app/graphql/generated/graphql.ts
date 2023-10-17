import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSDateTime: any;
  AWSEmail: any;
};













export type Address = {
  __typename?: 'Address';
  addrLine1: Scalars['String'];
  addrLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export enum AddressType {
  Custom = 'Custom',
  Home = 'Home',
  Work = 'Work'
}

export type AggRes = {
  __typename?: 'AggRes';
  doc_count?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
};

export type CarouselData = {
  __typename?: 'CarouselData';
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tags>>>;
};

export type Cart = {
  __typename?: 'Cart';
  anonymousId?: Maybe<Scalars['ID']>;
  belongsTo?: Maybe<Scalars['String']>;
  cartShipment?: Maybe<ModelCartShipmentConnection>;
  channel?: Maybe<Scalars['String']>;
  closedAt: Scalars['AWSDateTime'];
  createdAt: Scalars['AWSDateTime'];
  /**
   *   id: ID
   * ####################################################################################################################### storeId: String!
   * ####################################################################################################################### storeName: ID
   * ####################################################################################################################### deliveryMode: String
   * ####################################################################################################################### cartItem: [CartItem]
   * ####################################################################################################################### deliveryAddress: DeliveryAddress
   * ####################################################################################################################### userId: ID
   * ####################################################################################################################### customerProfile: CustomerProfile
   * ####################################################################################################################### createdAt: AWSDateTime!
   * ####################################################################################################################### updatedAt: AWSDateTime!
   */
  id?: Maybe<Scalars['ID']>;
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CartShipment = {
  __typename?: 'CartShipment';
  actionType?: Maybe<Scalars['String']>;
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  cartId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['AWSDateTime'];
  deliveryAddress?: Maybe<DeliveryAddress>;
  deliveryTip?: Maybe<Scalars['Float']>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lineItems?: Maybe<Array<Maybe<LineItem>>>;
  serviceCharge?: Maybe<Scalars['Float']>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistory>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['AWSDateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CartShipmentInput = {
  actionType?: Maybe<Scalars['String']>;
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

/**
 *   type CartItem {
 * ####################################################################################################################### 	cartItemId: ID!
 * ####################################################################################################################### 	productId: String!
 * ####################################################################################################################### 	productName: String
 * ####################################################################################################################### 	quantity: Int
 * ####################################################################################################################### 	webPrice: Float
 * ####################################################################################################################### 	mrp: Float
 * ####################################################################################################################### }
 * ####################################################################################################################### input CartItemInput {
 * ####################################################################################################################### 	cartItemId: ID
 * ####################################################################################################################### 	productId: String!
 * ####################################################################################################################### 	productName: String!
 * ####################################################################################################################### 	quantity: Int!
 * ####################################################################################################################### 	webPrice: Float!
 * ####################################################################################################################### 	mrp: Float!
 * ####################################################################################################################### }
 */
export enum ContactCategory {
  Colleagues = 'Colleagues',
  Custom = 'Custom',
  Customers = 'Customers',
  Employees = 'Employees',
  Family = 'Family',
  Friends = 'Friends',
  Mentor = 'Mentor',
  Partners = 'Partners',
  Self = 'Self'
}

export type CreateCartInput = {
  anonymousId?: Maybe<Scalars['ID']>;
  belongsTo?: Maybe<Scalars['String']>;
  cartShipment?: Maybe<Array<Maybe<CartShipmentInput>>>;
  channel?: Maybe<Scalars['String']>;
  closedAt?: Maybe<Scalars['AWSDateTime']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  id?: Maybe<Scalars['ID']>;
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreateCartShipmentInput = {
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  cartId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreateCustomerAddressInput = {
  addrLine1: Scalars['String'];
  addrLine2?: Maybe<Scalars['String']>;
  addrState?: Maybe<Scalars['String']>;
  addressType?: Maybe<AddressType>;
  city: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  customType?: Maybe<Scalars['String']>;
  customerContactId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instructions?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  markDefault?: Maybe<Scalars['Boolean']>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type CreateCustomerContactAddressOccasionInput = {
  CustomerAddressInput?: Maybe<Array<Maybe<CreateCustomerAddressInput>>>;
  CustomerContactInput?: Maybe<CreateCustomerContactInput>;
  CustomerOccasionInput?: Maybe<Array<Maybe<CreateCustomerOccasionInput>>>;
};

export type CreateCustomerContactInput = {
  addressType?: Maybe<Scalars['String']>;
  contactCategory?: Maybe<ContactCategory>;
  contactCustomType?: Maybe<Scalars['String']>;
  defaultAddressId?: Maybe<Scalars['ID']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  occasionReminderContact?: Maybe<Scalars['Boolean']>;
  phoneNumber: Scalars['String'];
  userId?: Maybe<Scalars['ID']>;
};

export type CreateCustomerOccasionInput = {
  customerContactId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  occasionDate?: Maybe<Scalars['String']>;
  occasionTitle?: Maybe<Scalars['String']>;
  reminder?: Maybe<Scalars['Boolean']>;
};

export type CreateCustomerPaymentInput = {
  bankName?: Maybe<Scalars['String']>;
  cardDefault?: Maybe<Scalars['Boolean']>;
  cardHolderName?: Maybe<Scalars['String']>;
  cardNumber?: Maybe<Scalars['String']>;
  expDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  postalCode?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreateCustomerProfileInput = {
  customerId?: Maybe<Scalars['String']>;
  customerRes?: Maybe<Scalars['String']>;
  deliverToAddress?: Maybe<CreateCustomerAddressInput>;
  deliveryTo?: Maybe<Scalars['Boolean']>;
  deliveryToId?: Maybe<Scalars['ID']>;
  email: Scalars['AWSEmail'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  occasionReminderProfile?: Maybe<Scalars['Boolean']>;
  orderLineitemReplacement?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  subscribeToNotification?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
};

export type CreateDeviceTokenInput = {
  deviceToken?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  userPool?: Maybe<UserPool>;
  userType?: Maybe<UserType>;
};

export type CreateOrderInput = {
  cartId?: Maybe<Scalars['ID']>;
  channel?: Maybe<Scalars['String']>;
  closedAt?: Maybe<Scalars['AWSDateTime']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  id?: Maybe<Scalars['ID']>;
  orderShipment?: Maybe<Array<Maybe<OrderShipmentInput>>>;
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreatePaymentInput = {
  amount?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instrument?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['AWSDate']>;
  paymentReference?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  settlementDate?: Maybe<Scalars['AWSDate']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type CreatePaymentIntentInput = {
  currency?: Maybe<Scalars['String']>;
  paymentMethodType?: Maybe<Scalars['String']>;
  totalAmount?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateShipmentInput = {
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export type CreateUserSocial = {
  __typename?: 'CreateUserSocial';
  customerAddress?: Maybe<CustomerAddress>;
  customerContact?: Maybe<CustomerContact>;
  customerProfile?: Maybe<CustomerProfile>;
};

export type CreateUserSocialInput = {
  createCustomerAddressInput?: Maybe<CreateCustomerAddressInput>;
  createCustomerContactInput?: Maybe<CreateCustomerContactInput>;
  createCustomerProfileInput?: Maybe<CreateCustomerProfileInput>;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  addrLine1: Scalars['String'];
  addrLine2?: Maybe<Scalars['String']>;
  addrState?: Maybe<Scalars['String']>;
  addressType?: Maybe<AddressType>;
  city: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  customType?: Maybe<Scalars['String']>;
  customerContact?: Maybe<CustomerContact>;
  customerContactId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instructions?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  markDefault?: Maybe<Scalars['Boolean']>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
};

export type CustomerContact = {
  __typename?: 'CustomerContact';
  addressType?: Maybe<Scalars['String']>;
  contactCategory?: Maybe<ContactCategory>;
  contactCustomType?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  customerProfile?: Maybe<CustomerProfile>;
  defaultAddressId?: Maybe<Scalars['ID']>;
  deliveryAddress?: Maybe<ModelCustomerAddressConnection>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  occasionReminderContact?: Maybe<Scalars['Boolean']>;
  occasions?: Maybe<ModelCustomerOccasionConnection>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  userId?: Maybe<Scalars['ID']>;
};


export type CustomerContactDeliveryAddressArgs = {
  filter?: Maybe<ModelCustomerAddressFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type CustomerContactOccasionsArgs = {
  filter?: Maybe<ModelCustomerOccasionFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};

export type CustomerContactAddressOccasion = {
  __typename?: 'CustomerContactAddressOccasion';
  customerAddress?: Maybe<ModelCustomerAddressConnection>;
  customerContact?: Maybe<CustomerContact>;
  customerOccasion?: Maybe<ModelCustomerOccasionConnection>;
};

export type CustomerOccasion = {
  __typename?: 'CustomerOccasion';
  createdAt: Scalars['AWSDateTime'];
  customerContact?: Maybe<CustomerContact>;
  customerContactId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  occasionDate?: Maybe<Scalars['String']>;
  occasionTitle?: Maybe<Scalars['String']>;
  reminder?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['AWSDateTime'];
};

export type CustomerPayment = {
  __typename?: 'CustomerPayment';
  bankName?: Maybe<Scalars['String']>;
  cardDefault?: Maybe<Scalars['Boolean']>;
  cardHolderName?: Maybe<Scalars['String']>;
  cardNumber?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  customerProfile?: Maybe<CustomerProfile>;
  expDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  postalCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  userId?: Maybe<Scalars['ID']>;
};

export type CustomerProfile = {
  __typename?: 'CustomerProfile';
  createdAt: Scalars['AWSDateTime'];
  customerContact?: Maybe<ModelCustomerContactConnection>;
  customerId?: Maybe<Scalars['String']>;
  customerRes?: Maybe<Scalars['String']>;
  deliveryTo?: Maybe<Scalars['Boolean']>;
  deliveryToAddress?: Maybe<CustomerAddress>;
  deliveryToId?: Maybe<Scalars['ID']>;
  email: Scalars['AWSEmail'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  occasionReminderProfile?: Maybe<Scalars['Boolean']>;
  orderLineitemReplacement?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  subscribeToNotification?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['AWSDateTime'];
  userId: Scalars['ID'];
};


export type CustomerProfileCustomerContactArgs = {
  filter?: Maybe<ModelCustomerContactFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};

export type DefaultPayment = {
  __typename?: 'DefaultPayment';
  customer?: Maybe<Scalars['String']>;
  defaultPaymentMethod?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
};

export type DefaultPaymentMethodInput = {
  customer?: Maybe<Scalars['String']>;
  defaultPaymentMethod?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
};

export type DeleteCartInput = {
  id: Scalars['ID'];
};

export type DeleteCartShipmentInput = {
  id: Scalars['ID'];
};

export type DeleteCustomerAddressInput = {
  id: Scalars['ID'];
};

export type DeleteCustomerContactInput = {
  id: Scalars['ID'];
};

export type DeleteCustomerOccasionInput = {
  id: Scalars['ID'];
};

export type DeleteCustomerPaymentInput = {
  id: Scalars['ID'];
};

export type DeleteCustomerProfileInput = {
  id: Scalars['ID'];
};

export type DeleteDeviceTokenInput = {
  deviceToken: Scalars['ID'];
};

export type DeleteOrderInput = {
  id: Scalars['ID'];
};

export type DeletePayment = {
  __typename?: 'DeletePayment';
  paymentMethodId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeletePaymentInput = {
  id: Scalars['ID'];
};

export type DeletePaymentMethodInput = {
  paymentMethodId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeletePhoto = {
  fileName: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteShipmentInput = {
  id: Scalars['ID'];
};

export enum Delivery {
  DeliveryLocal = 'Delivery_Local',
  ShippingInState = 'Shipping_In_State',
  ShippingOutOfState = 'Shipping_Out_Of_State'
}

export type DeliveryAddress = {
  __typename?: 'DeliveryAddress';
  addrLine1?: Maybe<Scalars['String']>;
  addrLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type DeliveryAddressInput = {
  addrLine1?: Maybe<Scalars['String']>;
  addrLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type DeliveryScope = {
  __typename?: 'DeliveryScope';
  MinOrderSize?: Maybe<Scalars['Int']>;
  deliveryType?: Maybe<Array<Maybe<DeliveryType>>>;
  serviceArea?: Maybe<Scalars['Int']>;
};

export enum DeliveryType {
  Both = 'Both',
  DeliveryPartner = 'Delivery_Partner',
  OwnDriver = 'Own_Driver'
}

export type DeviceToken = {
  __typename?: 'DeviceToken';
  createdAt: Scalars['AWSDateTime'];
  deviceToken?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['AWSDateTime'];
  user?: Maybe<CustomerProfile>;
  userId?: Maybe<Scalars['ID']>;
  userPool?: Maybe<UserPool>;
  userType?: Maybe<UserType>;
};

export type Discount = {
  __typename?: 'Discount';
  DiscountType?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
};

export type DiscountInput = {
  DiscountType?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
};

export enum GiftWrapping {
  Free = 'Free',
  NotAvailable = 'Not_available',
  PaidService = 'Paid_Service'
}

export enum Gifting {
  Business = 'Business',
  Personal = 'Personal'
}

export type Holiday = {
  __typename?: 'Holiday';
  Description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['AWSDate']>;
  startDate?: Maybe<Scalars['AWSDate']>;
};

export type LineItem = {
  __typename?: 'LineItem';
  charges?: Maybe<Array<Maybe<ServiceCharge>>>;
  discounts?: Maybe<Array<Maybe<Discount>>>;
  id?: Maybe<Scalars['ID']>;
  itemInvalid?: Maybe<Scalars['Boolean']>;
  prodCategory?: Maybe<Scalars['String']>;
  prodShortDesc?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  qtyPurchased?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  storeItemDesc?: Maybe<Scalars['String']>;
  storeItemId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<Maybe<Tax>>>;
  totalPrice?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['Int']>;
};

export type LineItemInput = {
  charges?: Maybe<Array<Maybe<ServiceChargeInput>>>;
  discounts?: Maybe<Array<Maybe<DiscountInput>>>;
  itemInvalid?: Maybe<Scalars['Boolean']>;
  prodCategory?: Maybe<Scalars['String']>;
  prodShortDesc?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  qtyPurchased?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  storeItemDesc?: Maybe<Scalars['String']>;
  storeItemId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<Maybe<TaxInput>>>;
  totalPrice?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['Int']>;
};

export type ModelAddressTypeFilterInput = {
  eq?: Maybe<AddressType>;
  ne?: Maybe<AddressType>;
};

export type ModelBooleanFilterInput = {
  eq?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
};

export type ModelCarouselDataConnection = {
  __typename?: 'ModelCarouselDataConnection';
  items?: Maybe<Array<Maybe<CarouselData>>>;
};

export type ModelCartConnection = {
  __typename?: 'ModelCartConnection';
  items?: Maybe<Array<Maybe<Cart>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCartFilterInput = {
  and?: Maybe<Array<Maybe<ModelCartFilterInput>>>;
  cartItemId?: Maybe<ModelIdFilterInput>;
  deliveryMode?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  mrp?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelCartFilterInput>;
  or?: Maybe<Array<Maybe<ModelCartFilterInput>>>;
  productId?: Maybe<ModelStringFilterInput>;
  productName?: Maybe<ModelStringFilterInput>;
  quantity?: Maybe<ModelStringFilterInput>;
  storeId?: Maybe<ModelStringFilterInput>;
  storeName?: Maybe<ModelIdFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
  webPrice?: Maybe<ModelStringFilterInput>;
};

export type ModelCartShipmentConnection = {
  __typename?: 'ModelCartShipmentConnection';
  items?: Maybe<Array<Maybe<CartShipment>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCartShipmentFilterInput = {
  and?: Maybe<Array<Maybe<ModelCartShipmentFilterInput>>>;
  assignedStoreId?: Maybe<ModelIdFilterInput>;
  assignedStoreName?: Maybe<ModelStringFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  deliveryType?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelCartShipmentFilterInput>;
  or?: Maybe<Array<Maybe<ModelCartShipmentFilterInput>>>;
  shipmentStatus?: Maybe<ModelShipmentStatusFilterInput>;
  subTotalAmount?: Maybe<ModelFloatFilterInput>;
  subTotalDeliveryCharges?: Maybe<ModelFloatFilterInput>;
  subTotalDiscount?: Maybe<ModelFloatFilterInput>;
  subTotalProductAmount?: Maybe<ModelFloatFilterInput>;
  subTotalTax?: Maybe<ModelFloatFilterInput>;
  subTotalTipAmount?: Maybe<ModelFloatFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  updatedBy?: Maybe<ModelStringFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelContactCategoryFilterInput = {
  eq?: Maybe<ContactCategory>;
  ne?: Maybe<ContactCategory>;
};

export type ModelCustomerAddressConnection = {
  __typename?: 'ModelCustomerAddressConnection';
  items?: Maybe<Array<Maybe<CustomerAddress>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCustomerAddressFilterInput = {
  addrLine1?: Maybe<ModelStringFilterInput>;
  addrLine2?: Maybe<ModelStringFilterInput>;
  addressType?: Maybe<ModelAddressTypeFilterInput>;
  and?: Maybe<Array<Maybe<ModelCustomerAddressFilterInput>>>;
  city?: Maybe<ModelStringFilterInput>;
  customerContactId?: Maybe<ModelIdFilterInput>;
  firstName?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  instructions?: Maybe<ModelStringFilterInput>;
  lastName?: Maybe<ModelStringFilterInput>;
  latitude?: Maybe<ModelFloatFilterInput>;
  longitude?: Maybe<ModelFloatFilterInput>;
  markDefault?: Maybe<ModelBooleanFilterInput>;
  middleName?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelCustomerAddressFilterInput>;
  or?: Maybe<Array<Maybe<ModelCustomerAddressFilterInput>>>;
  phoneNumber?: Maybe<ModelStringFilterInput>;
  postCode?: Maybe<ModelStringFilterInput>;
  state?: Maybe<ModelStringFilterInput>;
};

export type ModelCustomerContactConnection = {
  __typename?: 'ModelCustomerContactConnection';
  items?: Maybe<Array<Maybe<CustomerContact>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCustomerContactFilterInput = {
  and?: Maybe<Array<Maybe<ModelCustomerContactFilterInput>>>;
  contactCategory?: Maybe<ModelContactCategoryFilterInput>;
  firstName?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  lastName?: Maybe<ModelStringFilterInput>;
  middleName?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelCustomerContactFilterInput>;
  occasionReminderContact?: Maybe<ModelBooleanFilterInput>;
  or?: Maybe<Array<Maybe<ModelCustomerContactFilterInput>>>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelCustomerOccasionConnection = {
  __typename?: 'ModelCustomerOccasionConnection';
  items?: Maybe<Array<Maybe<CustomerOccasion>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCustomerOccasionFilterInput = {
  and?: Maybe<Array<Maybe<ModelCustomerOccasionFilterInput>>>;
  customerContactId?: Maybe<ModelIdFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelCustomerOccasionFilterInput>;
  occasionDate?: Maybe<ModelStringFilterInput>;
  occasionTitle?: Maybe<ModelStringFilterInput>;
  or?: Maybe<Array<Maybe<ModelCustomerOccasionFilterInput>>>;
  reminder?: Maybe<ModelBooleanFilterInput>;
};

export type ModelCustomerPaymentConnection = {
  __typename?: 'ModelCustomerPaymentConnection';
  items?: Maybe<Array<Maybe<CustomerPayment>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCustomerPaymentFilterInput = {
  and?: Maybe<Array<Maybe<ModelCustomerPaymentFilterInput>>>;
  bankName?: Maybe<ModelStringFilterInput>;
  cardDefault?: Maybe<ModelBooleanFilterInput>;
  cardHolderName?: Maybe<ModelStringFilterInput>;
  cardNumber?: Maybe<ModelStringFilterInput>;
  expDate?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelCustomerPaymentFilterInput>;
  or?: Maybe<Array<Maybe<ModelCustomerPaymentFilterInput>>>;
  postalCode?: Maybe<ModelStringFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelCustomerProfileConnection = {
  __typename?: 'ModelCustomerProfileConnection';
  items?: Maybe<Array<Maybe<CustomerProfile>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelCustomerProfileFilterInput = {
  and?: Maybe<Array<Maybe<ModelCustomerProfileFilterInput>>>;
  deliveryToId?: Maybe<ModelIdFilterInput>;
  email?: Maybe<ModelStringFilterInput>;
  firstName?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  lastName?: Maybe<ModelStringFilterInput>;
  middleName?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelCustomerProfileFilterInput>;
  occasionReminderProfile?: Maybe<ModelBooleanFilterInput>;
  or?: Maybe<Array<Maybe<ModelCustomerProfileFilterInput>>>;
  orderLineitemReplacement?: Maybe<ModelBooleanFilterInput>;
  phoneNumber?: Maybe<ModelStringFilterInput>;
  profileImage?: Maybe<ModelStringFilterInput>;
  subscribeToNotification?: Maybe<ModelBooleanFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelDateFilterInput = {
  beginsWith?: Maybe<Scalars['AWSDateTime']>;
  between?: Maybe<Array<Maybe<Scalars['AWSDateTime']>>>;
  contains?: Maybe<Scalars['AWSDateTime']>;
  eq?: Maybe<Scalars['AWSDateTime']>;
  ge?: Maybe<Scalars['AWSDateTime']>;
  gt?: Maybe<Scalars['AWSDateTime']>;
  le?: Maybe<Scalars['AWSDateTime']>;
  lt?: Maybe<Scalars['AWSDateTime']>;
  ne?: Maybe<Scalars['AWSDateTime']>;
  notContains?: Maybe<Scalars['AWSDateTime']>;
};

export type ModelDeviceTokenConnection = {
  __typename?: 'ModelDeviceTokenConnection';
  items?: Maybe<Array<Maybe<DeviceToken>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelDeviceTokenFilterInput = {
  and?: Maybe<Array<Maybe<ModelDeviceTokenFilterInput>>>;
  deviceToken?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelDeviceTokenFilterInput>;
  or?: Maybe<Array<Maybe<ModelDeviceTokenFilterInput>>>;
  userId?: Maybe<ModelIdFilterInput>;
  userPool?: Maybe<ModelUserPoolFilterInput>;
  userType?: Maybe<ModelUserTypeFilterInput>;
};

export type ModelFloatFilterInput = {
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
  eq?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
};

export type ModelIdFilterInput = {
  beginsWith?: Maybe<Scalars['ID']>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contains?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ne?: Maybe<Scalars['ID']>;
  notContains?: Maybe<Scalars['ID']>;
};

export type ModelIntFilterInput = {
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
  eq?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
};

export type ModelOrderConnection = {
  __typename?: 'ModelOrderConnection';
  items?: Maybe<Array<Maybe<Order>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelOrderFilterInput = {
  and?: Maybe<Array<Maybe<ModelOrderFilterInput>>>;
  cartId?: Maybe<ModelIdFilterInput>;
  channel?: Maybe<ModelStringFilterInput>;
  closedAt?: Maybe<ModelStringFilterInput>;
  createdAt?: Maybe<ModelDateFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelOrderFilterInput>;
  or?: Maybe<Array<Maybe<ModelOrderFilterInput>>>;
  orderStatus?: Maybe<ModelOrderStatusFilterInput>;
  totalAmount?: Maybe<ModelFloatFilterInput>;
  totalDeliveryCharges?: Maybe<ModelFloatFilterInput>;
  totalDiscount?: Maybe<ModelFloatFilterInput>;
  totalProductAmount?: Maybe<ModelFloatFilterInput>;
  totalTaxAmount?: Maybe<ModelFloatFilterInput>;
  totalTipAmount?: Maybe<ModelFloatFilterInput>;
  transactionId?: Maybe<ModelStringFilterInput>;
  userAgent?: Maybe<ModelStringFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelOrderShipmentConnection = {
  __typename?: 'ModelOrderShipmentConnection';
  items?: Maybe<Array<Maybe<OrderShipment>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelOrderShipmentFilterInput = {
  and?: Maybe<Array<Maybe<ModelCartShipmentFilterInput>>>;
  assignedStoreId?: Maybe<ModelIdFilterInput>;
  assignedStoreName?: Maybe<ModelStringFilterInput>;
  createdAt?: Maybe<ModelDateFilterInput>;
  deliveryType?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelCartShipmentFilterInput>;
  or?: Maybe<Array<Maybe<ModelCartShipmentFilterInput>>>;
  scheduledDeliveryDt?: Maybe<ModelIdFilterInput>;
  scheduledTimeSlot?: Maybe<ModelIdFilterInput>;
  shipmentStatus?: Maybe<ModelShipmentStatusFilterInput>;
  subTotalAmount?: Maybe<ModelFloatFilterInput>;
  subTotalDeliveryCharges?: Maybe<ModelFloatFilterInput>;
  subTotalDiscount?: Maybe<ModelFloatFilterInput>;
  subTotalProductAmount?: Maybe<ModelFloatFilterInput>;
  subTotalTax?: Maybe<ModelFloatFilterInput>;
  subTotalTipAmount?: Maybe<ModelFloatFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  updatedBy?: Maybe<ModelStringFilterInput>;
  userId?: Maybe<ModelIdFilterInput>;
};

export type ModelOrderStatusFilterInput = {
  eq?: Maybe<OrderStatus>;
  ne?: Maybe<OrderStatus>;
};

export type ModelPaymentConnection = {
  __typename?: 'ModelPaymentConnection';
  items?: Maybe<Array<Maybe<Payment>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelPaymentFilterInput = {
  amount?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelPaymentFilterInput>>>;
  id?: Maybe<ModelIdFilterInput>;
  instrument?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelPaymentFilterInput>;
  or?: Maybe<Array<Maybe<ModelPaymentFilterInput>>>;
  paymentDate?: Maybe<ModelStringFilterInput>;
  paymentReference?: Maybe<ModelStringFilterInput>;
  paymentType?: Maybe<ModelStringFilterInput>;
  settlementDate?: Maybe<ModelStringFilterInput>;
  transactionId?: Maybe<ModelStringFilterInput>;
};

export type ModelPriceAndAvailabilityConnection = {
  __typename?: 'ModelPriceAndAvailabilityConnection';
  items?: Maybe<Array<Maybe<PriceAndAvailability>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelPriceAndAvailabilityFilterInput = {
  and?: Maybe<Array<Maybe<ModelPriceAndAvailabilityFilterInput>>>;
  avlQuantity?: Maybe<ModelFloatFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  isAvailableForOnline?: Maybe<ModelBooleanFilterInput>;
  merchantAccountId?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelPriceAndAvailabilityFilterInput>;
  or?: Maybe<Array<Maybe<ModelPriceAndAvailabilityFilterInput>>>;
  price?: Maybe<ModelFloatFilterInput>;
  priceUpdatedTime?: Maybe<ModelStringFilterInput>;
  prodId?: Maybe<ModelIdFilterInput>;
  splPrice?: Maybe<ModelFloatFilterInput>;
  splPriceEndDate?: Maybe<ModelStringFilterInput>;
  storeId?: Maybe<ModelIdFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
};

export type ModelProductConnection = {
  __typename?: 'ModelProductConnection';
  items?: Maybe<Array<Maybe<Product>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelProductFilterInput = {
  Vintage?: Maybe<ModelStringFilterInput>;
  abv?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelProductFilterInput>>>;
  brandLine?: Maybe<ModelStringFilterInput>;
  container?: Maybe<ModelStringFilterInput>;
  country?: Maybe<ModelStringFilterInput>;
  flavour?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  imageFile?: Maybe<ModelStringFilterInput>;
  images?: Maybe<ModelStringFilterInput>;
  manufacturer?: Maybe<ModelStringFilterInput>;
  not?: Maybe<ModelProductFilterInput>;
  or?: Maybe<Array<Maybe<ModelProductFilterInput>>>;
  otherUOM?: Maybe<ModelIdFilterInput>;
  otherUPC?: Maybe<ModelStringFilterInput>;
  prodCategory?: Maybe<ModelStringFilterInput>;
  prodCategoryRef?: Maybe<ModelStringFilterInput>;
  prodFullName?: Maybe<ModelStringFilterInput>;
  prodLongDesc?: Maybe<ModelStringFilterInput>;
  prodMajor?: Maybe<ModelStringFilterInput>;
  prodMinor?: Maybe<ModelStringFilterInput>;
  prodName?: Maybe<ModelStringFilterInput>;
  prodShortDesc?: Maybe<ModelStringFilterInput>;
  region?: Maybe<ModelStringFilterInput>;
  size?: Maybe<ModelStringFilterInput>;
  sweetness?: Maybe<ModelStringFilterInput>;
  tags?: Maybe<ModelStringFilterInput>;
  uom?: Maybe<ModelStringFilterInput>;
  upc?: Maybe<ModelStringFilterInput>;
  vintageKey?: Maybe<ModelStringFilterInput>;
  winery?: Maybe<ModelStringFilterInput>;
};

export type ModelSearchAddressConnection = {
  __typename?: 'ModelSearchAddressConnection';
  items?: Maybe<Array<Maybe<SearchAddress>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelShipmentConnection = {
  __typename?: 'ModelShipmentConnection';
  items?: Maybe<Array<Maybe<Shipment>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelShipmentFilterInput = {
  and?: Maybe<Array<Maybe<ModelShipmentFilterInput>>>;
  assignedStoreId?: Maybe<ModelIdFilterInput>;
  assignedStoreName?: Maybe<ModelStringFilterInput>;
  deliveryType?: Maybe<ModelStringFilterInput>;
  id?: Maybe<ModelIdFilterInput>;
  not?: Maybe<ModelShipmentFilterInput>;
  or?: Maybe<Array<Maybe<ModelShipmentFilterInput>>>;
  shipmentStatus?: Maybe<ModelShipmentStatusFilterInput>;
  subTotalAmount?: Maybe<ModelFloatFilterInput>;
  subTotalDeliveryCharges?: Maybe<ModelFloatFilterInput>;
  subTotalDiscount?: Maybe<ModelFloatFilterInput>;
  subTotalProductAmount?: Maybe<ModelFloatFilterInput>;
  subTotalTax?: Maybe<ModelFloatFilterInput>;
  subTotalTipAmount?: Maybe<ModelFloatFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  updatedBy?: Maybe<ModelStringFilterInput>;
};

export type ModelShipmentStatusFilterInput = {
  eq?: Maybe<ShipmentStatus>;
  ne?: Maybe<ShipmentStatus>;
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ModelStringFilterInput = {
  beginsWith?: Maybe<Scalars['String']>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
  contains?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
};

export type ModelUserPoolFilterInput = {
  eq?: Maybe<UserPool>;
  ne?: Maybe<UserPool>;
};

export type ModelUserTypeFilterInput = {
  eq?: Maybe<UserType>;
  ne?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrder?: Maybe<Order>;
  calculateTax?: Maybe<ModelOrderShipmentConnection>;
  checkoutWrapper?: Maybe<CheckoutWrapperOutput>;
  createCart?: Maybe<Cart>;
  createCartShipment?: Maybe<CartShipment>;
  createCustomerAddress?: Maybe<CustomerAddress>;
  createCustomerContact?: Maybe<CustomerContact>;
  createCustomerContactAddressOccasion?: Maybe<CustomerContactAddressOccasion>;
  createCustomerOccasion?: Maybe<CustomerOccasion>;
  createCustomerPayment?: Maybe<CustomerPayment>;
  createCustomerProfile?: Maybe<CustomerProfile>;
  createDeviceToken?: Maybe<DeviceToken>;
  createOrder?: Maybe<Order>;
  createPayment?: Maybe<Payment>;
  createPaymentIntent?: Maybe<PaymentIntent>;
  createShipment?: Maybe<Shipment>;
  createUserSocial?: Maybe<CreateUserSocial>;
  createUserWest?: Maybe<Scalars['String']>;
  defaultPaymentMethod?: Maybe<DefaultPayment>;
  deleteCart?: Maybe<Cart>;
  deleteCartShipment?: Maybe<CartShipment>;
  deleteCustomerAddress?: Maybe<CustomerAddress>;
  deleteCustomerContact?: Maybe<CustomerContact>;
  deleteCustomerOccasion?: Maybe<CustomerOccasion>;
  deleteCustomerPayment?: Maybe<CustomerPayment>;
  deleteCustomerProfile?: Maybe<CustomerProfile>;
  deleteDeviceToken?: Maybe<DeviceToken>;
  deleteOrder?: Maybe<Order>;
  deletePayment?: Maybe<Payment>;
  deletePaymentMethod?: Maybe<DeletePayment>;
  deletePhoto?: Maybe<Scalars['String']>;
  deleteShipment?: Maybe<Shipment>;
  getPDFDownload?: Maybe<Scalars['String']>;
  paymentMethodsList?: Maybe<PaymentMethods>;
  rejectionNotificationUpdate?: Maybe<OrderShipment>;
  saveCustomerCard?: Maybe<SaveCard>;
  updateCart?: Maybe<Cart>;
  updateCartShipment?: Maybe<CartShipment>;
  updateCustomerAddress?: Maybe<CustomerAddress>;
  updateCustomerAddressesDefault?: Maybe<CustomerAddress>;
  updateCustomerContact?: Maybe<CustomerContact>;
  updateCustomerOccasion?: Maybe<CustomerOccasion>;
  updateCustomerPayment?: Maybe<CustomerPayment>;
  updateCustomerProfile?: Maybe<CustomerProfile>;
  updateDeviceToken?: Maybe<DeviceToken>;
  updateOccasionsReminder?: Maybe<CustomerOccasion>;
  updateOrder?: Maybe<Order>;
  updateOrderShipment?: Maybe<OrderShipment>;
  updateOrderShipmentNotification?: Maybe<OrderShipment>;
  updatePayment?: Maybe<Payment>;
  updateShipment?: Maybe<Shipment>;
  updateUserWest?: Maybe<Scalars['String']>;
  validateURL?: Maybe<ValidateUrl>;
};


export type MutationAddOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCalculateTaxArgs = {
  input?: Maybe<Array<Maybe<OrderShipmentInput>>>;
};


export type MutationCheckoutWrapperArgs = {
  createPaymentIntentInput?: Maybe<CheckoutPaymentIntentInput>;
  customerProfileInput?: Maybe<Scalars['ID']>;
  getCartId?: Maybe<Scalars['ID']>;
  paymentMethodsListInput?: Maybe<CheckoutPaymentMethodsListInput>;
  searchStoreInput?: Maybe<CheckoutSearchStoreInput>;
  taxInput?: Maybe<CheckoutTaxInput>;
};


export type MutationCreateCartArgs = {
  input: CreateCartInput;
};


export type MutationCreateCartShipmentArgs = {
  input: CreateCartShipmentInput;
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateCustomerAddressInput;
};


export type MutationCreateCustomerContactArgs = {
  input: CreateCustomerContactInput;
};


export type MutationCreateCustomerContactAddressOccasionArgs = {
  input: CreateCustomerContactAddressOccasionInput;
};


export type MutationCreateCustomerOccasionArgs = {
  input: CreateCustomerOccasionInput;
};


export type MutationCreateCustomerPaymentArgs = {
  input: CreateCustomerPaymentInput;
};


export type MutationCreateCustomerProfileArgs = {
  input: CreateCustomerProfileInput;
};


export type MutationCreateDeviceTokenArgs = {
  input: CreateDeviceTokenInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePaymentIntentArgs = {
  input: CreatePaymentIntentInput;
};


export type MutationCreateShipmentArgs = {
  input: CreateShipmentInput;
};


export type MutationCreateUserSocialArgs = {
  input: CreateUserSocialInput;
};


export type MutationCreateUserWestArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDefaultPaymentMethodArgs = {
  input: DefaultPaymentMethodInput;
};


export type MutationDeleteCartArgs = {
  input: DeleteCartInput;
};


export type MutationDeleteCartShipmentArgs = {
  input: DeleteCartShipmentInput;
};


export type MutationDeleteCustomerAddressArgs = {
  input: DeleteCustomerAddressInput;
};


export type MutationDeleteCustomerContactArgs = {
  input: DeleteCustomerContactInput;
};


export type MutationDeleteCustomerOccasionArgs = {
  input: DeleteCustomerOccasionInput;
};


export type MutationDeleteCustomerPaymentArgs = {
  input: DeleteCustomerPaymentInput;
};


export type MutationDeleteCustomerProfileArgs = {
  input: DeleteCustomerProfileInput;
};


export type MutationDeleteDeviceTokenArgs = {
  input: DeleteDeviceTokenInput;
};


export type MutationDeleteOrderArgs = {
  input: DeleteOrderInput;
};


export type MutationDeletePaymentArgs = {
  input: DeletePaymentInput;
};


export type MutationDeletePaymentMethodArgs = {
  input: DeletePaymentMethodInput;
};


export type MutationDeletePhotoArgs = {
  input?: Maybe<DeletePhoto>;
};


export type MutationDeleteShipmentArgs = {
  input: DeleteShipmentInput;
};


export type MutationGetPdfDownloadArgs = {
  shipmentId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationPaymentMethodsListArgs = {
  input: PaymentMethodsListInput;
};


export type MutationRejectionNotificationUpdateArgs = {
  input: UpdateOrderShipmentInput;
};


export type MutationSaveCustomerCardArgs = {
  input: SaveCardInput;
};


export type MutationUpdateCartArgs = {
  input: UpdateCartInput;
};


export type MutationUpdateCartShipmentArgs = {
  input: UpdateCartShipmentInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateCustomerAddressInput;
};


export type MutationUpdateCustomerAddressesDefaultArgs = {
  input: UpdateCustomerAddressesDefaultInput;
};


export type MutationUpdateCustomerContactArgs = {
  input: UpdateCustomerContactInput;
};


export type MutationUpdateCustomerOccasionArgs = {
  input: UpdateCustomerOccasionInput;
};


export type MutationUpdateCustomerPaymentArgs = {
  input: UpdateCustomerPaymentInput;
};


export type MutationUpdateCustomerProfileArgs = {
  input: UpdateCustomerProfileInput;
};


export type MutationUpdateDeviceTokenArgs = {
  input: UpdateDeviceTokenInput;
};


export type MutationUpdateOccasionsReminderArgs = {
  input: UpdateOccasionsReminderInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdateOrderShipmentArgs = {
  input: UpdateOrderShipmentInput;
};


export type MutationUpdateOrderShipmentNotificationArgs = {
  input: UpdateOrderShipmentInput;
};


export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


export type MutationUpdateShipmentArgs = {
  input: UpdateShipmentInput;
};


export type MutationUpdateUserWestArgs = {
  email?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  username: Scalars['String'];
};


export type MutationValidateUrlArgs = {
  input: ValidateUrlInput;
};

export type Order = {
  __typename?: 'Order';
  cartId?: Maybe<Scalars['ID']>;
  channel?: Maybe<Scalars['String']>;
  closedAt: Scalars['AWSDateTime'];
  createdAt: Scalars['AWSDateTime'];
  id?: Maybe<Scalars['ID']>;
  orderShipment?: Maybe<ModelOrderShipmentConnection>;
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type OrderFulfilling = {
  __typename?: 'OrderFulfilling';
  delivery?: Maybe<Array<Maybe<Delivery>>>;
  gifting?: Maybe<Gifting>;
  pickUp?: Maybe<Array<Maybe<PickUp>>>;
};

export type OrderLineItem = {
  __typename?: 'OrderLineItem';
  charges?: Maybe<Array<Maybe<ServiceCharge>>>;
  discounts?: Maybe<Array<Maybe<Discount>>>;
  id?: Maybe<Scalars['ID']>;
  prodCategory?: Maybe<Scalars['String']>;
  prodShortDesc?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  qtyPurchased?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Array<Maybe<Tax>>>;
  totalPrice?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['Int']>;
};

export type OrderLineItemInput = {
  charges?: Maybe<Array<Maybe<ServiceChargeInput>>>;
  discounts?: Maybe<Array<Maybe<DiscountInput>>>;
  id?: Maybe<Scalars['ID']>;
  itemInvalid?: Maybe<Scalars['Boolean']>;
  prodCategory?: Maybe<Scalars['String']>;
  prodShortDesc?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  qtyPurchased?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  storeItemDesc?: Maybe<Scalars['String']>;
  storeItemId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<Maybe<TaxInput>>>;
  totalPrice?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['Int']>;
};

export type OrderShipment = {
  __typename?: 'OrderShipment';
  actionType?: Maybe<Scalars['String']>;
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  calculatedTax?: Maybe<Scalars['Float']>;
  createdAt: Scalars['AWSDateTime'];
  deliveryAddress?: Maybe<DeliveryAddress>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isUpdated?: Maybe<Scalars['Boolean']>;
  orderId?: Maybe<Scalars['ID']>;
  orderLineItems?: Maybe<Array<Maybe<OrderLineItem>>>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentIntentRes?: Maybe<Scalars['String']>;
  rejectionMsg?: Maybe<Scalars['String']>;
  scheduledDeliveryDt?: Maybe<Scalars['String']>;
  scheduledTimeSlot?: Maybe<Scalars['String']>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistory>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type OrderShipmentInput = {
  actionType?: Maybe<Scalars['String']>;
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isUpdated?: Maybe<Scalars['Boolean']>;
  orderId?: Maybe<Scalars['ID']>;
  orderLineItems?: Maybe<Array<Maybe<OrderLineItemInput>>>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentIntentRes?: Maybe<Scalars['String']>;
  scheduledDeliveryDt?: Maybe<Scalars['String']>;
  scheduledTimeSlot?: Maybe<Scalars['String']>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  storeAddress?: Maybe<StoreAddressInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export enum OrderStatus {
  Cancelled = 'Cancelled',
  Created = 'Created',
  Fulfilled = 'Fulfilled',
  Open = 'Open',
  PartialFulfilled = 'Partial_Fulfilled'
}

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  id?: Maybe<Scalars['ID']>;
  instrument?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['AWSDate']>;
  paymentReference?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  settlementDate?: Maybe<Scalars['AWSDate']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  clientSecret?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
};

export type PaymentMethods = {
  __typename?: 'PaymentMethods';
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  paymentMethods?: Maybe<Scalars['String']>;
};

export type PaymentMethodsListInput = {
  customerId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
};

export enum PickUp {
  CurbSide = 'Curb_Side',
  InStore = 'In_Store',
  NotAvailable = 'Not_available'
}

export type PriceAndAvailability = {
  __typename?: 'PriceAndAvailability';
  avlQuantity?: Maybe<Scalars['Float']>;
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  isAvailableForOnline?: Maybe<Scalars['Boolean']>;
  merchantAccountId: Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
  priceUpdatedTime?: Maybe<Scalars['AWSDateTime']>;
  prodId: Scalars['ID'];
  splPrice?: Maybe<Scalars['Float']>;
  splPriceEndDate?: Maybe<Scalars['AWSDateTime']>;
  storeId: Scalars['ID'];
  storeItemDesc?: Maybe<Scalars['String']>;
  storeItemId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
};

/**
 *  ##################
 * ################################################################################################Custom additions for Product
 * ################################################################################################Product Master Database
 */
export type Product = {
  __typename?: 'Product';
  Vintage?: Maybe<Scalars['String']>;
  abv?: Maybe<Scalars['String']>;
  brandLine?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  flavour?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageFile?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer?: Maybe<Scalars['String']>;
  otherUOM?: Maybe<Array<Maybe<Scalars['ID']>>>;
  otherUPC?: Maybe<Array<Maybe<Scalars['String']>>>;
  prodCategory: Scalars['String'];
  prodCategoryRef: Scalars['String'];
  prodFullName: Scalars['String'];
  prodLongDesc: Scalars['String'];
  prodMajor: Scalars['String'];
  prodMinor: Scalars['String'];
  prodName: Scalars['String'];
  prodShortDesc: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  sweetness?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  uom?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  vintageKey?: Maybe<Scalars['String']>;
  winery?: Maybe<Scalars['String']>;
};

export type ProductNew = {
  __typename?: 'ProductNew';
  Vintage?: Maybe<Scalars['String']>;
  abv?: Maybe<Scalars['String']>;
  brandLine?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  flavour?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageFile?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer?: Maybe<Scalars['String']>;
  otherUOM?: Maybe<Array<Maybe<Scalars['ID']>>>;
  otherUPC?: Maybe<Array<Maybe<Scalars['String']>>>;
  price?: Maybe<Scalars['Float']>;
  prodCategory: Scalars['String'];
  prodCategoryRef: Scalars['String'];
  prodFullName: Scalars['String'];
  prodLongDesc: Scalars['String'];
  prodMajor: Scalars['String'];
  prodMinor: Scalars['String'];
  prodName: Scalars['String'];
  prodShortDesc: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  sweetness?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  uom?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  vintageKey?: Maybe<Scalars['String']>;
  winery?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  CustomerAddressByCustomerContactId?: Maybe<ModelCustomerAddressConnection>;
  CustomerCartByCustomerCartId?: Maybe<ModelOrderConnection>;
  CustomerContactsByCustomerProfileId?: Maybe<ModelCustomerContactConnection>;
  CustomerOccasionByCustomerContactId?: Maybe<ModelCustomerOccasionConnection>;
  CustomerPaymentByCustomerProfileId?: Maybe<ModelCustomerPaymentConnection>;
  customerUserByEmail?: Maybe<ModelCustomerProfileConnection>;
  customerUserByPhoneNumber?: Maybe<ModelCustomerProfileConnection>;
  customerUserByUserId?: Maybe<ModelCustomerProfileConnection>;
  deviceTokenByUserId?: Maybe<ModelDeviceTokenConnection>;
  getCarouselData?: Maybe<CarouselData>;
  getCart?: Maybe<Cart>;
  getCartByUserId?: Maybe<ModelCartConnection>;
  getCartShipment?: Maybe<CartShipment>;
  getCustomerAddress?: Maybe<CustomerAddress>;
  getCustomerContact?: Maybe<CustomerContact>;
  getCustomerOccasion?: Maybe<CustomerOccasion>;
  getCustomerPayment?: Maybe<CustomerPayment>;
  /**
   *   getOrderByUserId(
   * ### 	userId: ID!,
   * ### 	filter: ModelOrderFilterInput,
   * ### 	limit: Int,
   * ### 	nextToken: String
   * ### ): ModelOrderConnection
   */
  getCustomerProfile?: Maybe<CustomerProfile>;
  getDeviceToken?: Maybe<DeviceToken>;
  getOrder?: Maybe<Order>;
  getOrderByUserId?: Maybe<ModelOrderConnection>;
  getOrderShipment?: Maybe<OrderShipment>;
  getPayment?: Maybe<Payment>;
  getS3SignedURL?: Maybe<S3signedUrl>;
  getShipment?: Maybe<Shipment>;
  getStore?: Maybe<Store>;
  listCarouselData?: Maybe<ModelCarouselDataConnection>;
  listCartShipments?: Maybe<ModelCartShipmentConnection>;
  listCarts?: Maybe<ModelCartConnection>;
  listCustomerAddresss?: Maybe<ModelCustomerAddressConnection>;
  listCustomerContacts?: Maybe<ModelCustomerContactConnection>;
  listCustomerOccasions?: Maybe<ModelCustomerOccasionConnection>;
  listCustomerPayments?: Maybe<ModelCustomerPaymentConnection>;
  listCustomerProfiles?: Maybe<ModelCustomerProfileConnection>;
  listDeviceTokens?: Maybe<ModelDeviceTokenConnection>;
  listOrderShipmentByStoreId?: Maybe<ModelOrderShipmentConnection>;
  listOrderShipments?: Maybe<ModelOrderShipmentConnection>;
  listOrderShipmentsByUserId?: Maybe<ModelOrderShipmentConnection>;
  listOrders?: Maybe<ModelOrderConnection>;
  listOrdersByUserId?: Maybe<ModelOrderConnection>;
  listPayments?: Maybe<ModelPaymentConnection>;
  listShipments?: Maybe<ModelShipmentConnection>;
  searchAddress?: Maybe<ModelSearchAddressConnection>;
  searchPriceAndAvailabilitys?: Maybe<SearchablePriceAndAvailabilityConnection>;
  searchProducts?: Maybe<SearchableProductConnection>;
  searchProductsLambda?: Maybe<SearchableProductConnectionNew>;
  searchStore?: Maybe<SearchableStoreConnection>;
  searchStores?: Maybe<SearchableStoreConnection>;
  userIdByDevicetoken?: Maybe<ModelDeviceTokenConnection>;
};


export type QueryCustomerAddressByCustomerContactIdArgs = {
  filter?: Maybe<ModelCustomerAddressFilterInput>;
  id?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryCustomerCartByCustomerCartIdArgs = {
  filter?: Maybe<ModelOrderFilterInput>;
  id?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryCustomerContactsByCustomerProfileIdArgs = {
  filter?: Maybe<ModelCustomerContactFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryCustomerOccasionByCustomerContactIdArgs = {
  filter?: Maybe<ModelCustomerOccasionFilterInput>;
  id?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryCustomerPaymentByCustomerProfileIdArgs = {
  filter?: Maybe<ModelCustomerPaymentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryCustomerUserByEmailArgs = {
  email?: Maybe<Scalars['AWSEmail']>;
  filter?: Maybe<ModelCustomerProfileFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryCustomerUserByPhoneNumberArgs = {
  filter?: Maybe<ModelCustomerProfileFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryCustomerUserByUserIdArgs = {
  filter?: Maybe<ModelCustomerProfileFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryDeviceTokenByUserIdArgs = {
  deviceToken?: Maybe<Scalars['ID']>;
  filter?: Maybe<ModelDeviceTokenFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
};


export type QueryGetCarouselDataArgs = {
  promoName: Scalars['String'];
};


export type QueryGetCartArgs = {
  id: Scalars['ID'];
};


export type QueryGetCartByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetCartShipmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type QueryGetCustomerContactArgs = {
  id: Scalars['ID'];
};


export type QueryGetCustomerOccasionArgs = {
  id: Scalars['ID'];
};


export type QueryGetCustomerPaymentArgs = {
  id: Scalars['ID'];
};


export type QueryGetCustomerProfileArgs = {
  userId: Scalars['ID'];
};


export type QueryGetDeviceTokenArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetOrderShipmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetPaymentArgs = {
  id: Scalars['ID'];
};


export type QueryGetS3SignedUrlArgs = {
  contentType: Scalars['String'];
  fileName: Scalars['String'];
  requestType: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryGetShipmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetStoreArgs = {
  id: Scalars['ID'];
};


export type QueryListCartShipmentsArgs = {
  filter?: Maybe<ModelCartShipmentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCartsArgs = {
  filter?: Maybe<ModelCartFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCustomerAddresssArgs = {
  filter?: Maybe<ModelCustomerAddressFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCustomerContactsArgs = {
  filter?: Maybe<ModelCustomerContactFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCustomerOccasionsArgs = {
  filter?: Maybe<ModelCustomerOccasionFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCustomerPaymentsArgs = {
  filter?: Maybe<ModelCustomerPaymentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListCustomerProfilesArgs = {
  filter?: Maybe<ModelCustomerProfileFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListDeviceTokensArgs = {
  filter?: Maybe<ModelDeviceTokenFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListOrderShipmentByStoreIdArgs = {
  storeId: Scalars['ID'];
};


export type QueryListOrderShipmentsArgs = {
  filter?: Maybe<ModelOrderShipmentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListOrderShipmentsByUserIdArgs = {
  filter?: Maybe<ModelOrderShipmentFilterInput>;
  userId: Scalars['ID'];
};


export type QueryListOrdersArgs = {
  filter?: Maybe<ModelOrderFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListOrdersByUserIdArgs = {
  filter?: Maybe<ModelOrderFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type QueryListPaymentsArgs = {
  filter?: Maybe<ModelPaymentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListShipmentsArgs = {
  filter?: Maybe<ModelShipmentFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QuerySearchAddressArgs = {
  input: SearchAddressInput;
};


export type QuerySearchPriceAndAvailabilitysArgs = {
  distance?: Maybe<Scalars['Int']>;
  filter?: Maybe<SearchablePriceAndAvailabilityFilterInput>;
  from?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Int']>;
  lon?: Maybe<Scalars['Float']>;
  nextToken?: Maybe<Scalars['String']>;
  sort?: Maybe<SearchablePriceAndAvailabilitySortInput>;
};


export type QuerySearchProductsArgs = {
  filter?: Maybe<SearchableProductFilterInput>;
  from?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sort?: Maybe<SearchableProductSortInput>;
};


export type QuerySearchProductsLambdaArgs = {
  distance?: Maybe<Scalars['Int']>;
  filter?: Maybe<SearchableProductFilterInput>;
  from?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Int']>;
  lon?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  merchantAccountId?: Maybe<Scalars['String']>;
  minPrice?: Maybe<Scalars['Float']>;
  nextToken?: Maybe<Scalars['String']>;
  sort?: Maybe<SearchableProductSortInput>;
};


export type QuerySearchStoreArgs = {
  distance: Scalars['Int'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};


export type QuerySearchStoresArgs = {
  distance: Scalars['Int'];
  filter?: Maybe<SearchableStoreFilterInput>;
  from?: Maybe<Scalars['Int']>;
  lat: Scalars['Float'];
  limit?: Maybe<Scalars['Int']>;
  lon: Scalars['Float'];
  nextToken?: Maybe<Scalars['String']>;
  sort?: Maybe<SearchableStoreSortInput>;
};


export type QueryUserIdByDevicetokenArgs = {
  filter?: Maybe<ModelDeviceTokenFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<ModelSortDirection>;
  userId?: Maybe<Scalars['ID']>;
};

export type SaveCard = {
  __typename?: 'SaveCard';
  setUpIntent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type SaveCardInput = {
  setUpIntent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type SearchAddress = {
  __typename?: 'SearchAddress';
  city?: Maybe<Scalars['String']>;
  entries?: Maybe<Scalars['Int']>;
  secondary?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street_line?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type SearchAddressInput = {
  includeCities?: Maybe<Array<Maybe<Scalars['String']>>>;
  includeStates?: Maybe<Array<Maybe<Scalars['String']>>>;
  searchStr: Scalars['String'];
};

export type SearchableBooleanFilterInput = {
  eq?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
};

export type SearchableFloatFilterInput = {
  eq?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  range?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type SearchableIdFilterInput = {
  eq?: Maybe<Scalars['ID']>;
  exists?: Maybe<Scalars['Boolean']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  match?: Maybe<Scalars['ID']>;
  matchPhrase?: Maybe<Scalars['ID']>;
  matchPhrasePrefix?: Maybe<Scalars['ID']>;
  multiMatch?: Maybe<Scalars['ID']>;
  ne?: Maybe<Scalars['ID']>;
  range?: Maybe<Array<Maybe<Scalars['ID']>>>;
  regexp?: Maybe<Scalars['ID']>;
  wildcard?: Maybe<Scalars['ID']>;
};

export type SearchableIntFilterInput = {
  eq?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  range?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type SearchablePriceAndAvailabilityConnection = {
  __typename?: 'SearchablePriceAndAvailabilityConnection';
  items?: Maybe<Array<Maybe<PriceAndAvailability>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type SearchablePriceAndAvailabilityFilterInput = {
  and?: Maybe<Array<Maybe<SearchablePriceAndAvailabilityFilterInput>>>;
  avlQuantity?: Maybe<SearchableFloatFilterInput>;
  createdAt?: Maybe<SearchableStringFilterInput>;
  id?: Maybe<SearchableIdFilterInput>;
  isAvailableForOnline?: Maybe<Scalars['Boolean']>;
  merchantAccountId?: Maybe<SearchableIdFilterInput>;
  not?: Maybe<SearchablePriceAndAvailabilityFilterInput>;
  or?: Maybe<Array<Maybe<SearchablePriceAndAvailabilityFilterInput>>>;
  price?: Maybe<SearchableFloatFilterInput>;
  priceUpdatedTime?: Maybe<SearchableStringFilterInput>;
  prodId?: Maybe<SearchableIdFilterInput>;
  splPrice?: Maybe<SearchableFloatFilterInput>;
  splPriceEndDate?: Maybe<SearchableStringFilterInput>;
  storeId?: Maybe<SearchableIdFilterInput>;
  updatedAt?: Maybe<SearchableStringFilterInput>;
};

export type SearchablePriceAndAvailabilitySortInput = {
  direction?: Maybe<SearchableSortDirection>;
  field?: Maybe<SearchablePriceAndAvailabilitySortableFields>;
};

export enum SearchablePriceAndAvailabilitySortableFields {
  AvlQuantity = 'avlQuantity',
  CreatedAt = 'createdAt',
  Id = 'id',
  IsAvailableForOnline = 'isAvailableForOnline',
  MerchantAccountId = 'merchantAccountId',
  Price = 'price',
  PriceUpdatedTime = 'priceUpdatedTime',
  ProdId = 'prodId',
  SplPrice = 'splPrice',
  SplPriceEndDate = 'splPriceEndDate',
  StoreId = 'storeId',
  UpdatedAt = 'updatedAt'
}

export type SearchableProductConnection = {
  __typename?: 'SearchableProductConnection';
  ProdCategory?: Maybe<Array<Maybe<AggRes>>>;
  ProdFullName?: Maybe<Array<Maybe<AggRes>>>;
  ProdMajor?: Maybe<Array<Maybe<AggRes>>>;
  ProdMinor?: Maybe<Array<Maybe<AggRes>>>;
  brand?: Maybe<Array<Maybe<AggRes>>>;
  container?: Maybe<Array<Maybe<AggRes>>>;
  country?: Maybe<Array<Maybe<AggRes>>>;
  items?: Maybe<Array<Maybe<Product>>>;
  majorType?: Maybe<Array<Maybe<AggRes>>>;
  manufacturer?: Maybe<Array<Maybe<AggRes>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type SearchableProductConnectionNew = {
  __typename?: 'SearchableProductConnectionNew';
  ProdCategory?: Maybe<Array<Maybe<AggRes>>>;
  brand?: Maybe<Array<Maybe<AggRes>>>;
  container?: Maybe<Array<Maybe<AggRes>>>;
  country?: Maybe<Array<Maybe<AggRes>>>;
  items?: Maybe<Array<Maybe<ProductNew>>>;
  majorType?: Maybe<Array<Maybe<AggRes>>>;
  manufacturer?: Maybe<Array<Maybe<AggRes>>>;
  nextToken?: Maybe<Scalars['String']>;
  prodMajor?: Maybe<Array<Maybe<AggRes>>>;
  prodMinor?: Maybe<Array<Maybe<AggRes>>>;
  total?: Maybe<Scalars['Int']>;
};

export type SearchableProductFilterInput = {
  Vintage?: Maybe<SearchableStringFilterInput>;
  abv?: Maybe<SearchableStringFilterInput>;
  and?: Maybe<Array<Maybe<SearchableProductFilterInput>>>;
  brandLine?: Maybe<SearchableStringFilterInput>;
  container?: Maybe<SearchableStringFilterInput>;
  country?: Maybe<SearchableStringFilterInput>;
  flavour?: Maybe<SearchableStringFilterInput>;
  id?: Maybe<SearchableIdFilterInput>;
  imageFile?: Maybe<SearchableStringFilterInput>;
  images?: Maybe<SearchableStringFilterInput>;
  majorType?: Maybe<SearchableStringFilterInput>;
  manufacturer?: Maybe<SearchableStringFilterInput>;
  not?: Maybe<SearchableProductFilterInput>;
  or?: Maybe<Array<Maybe<SearchableProductFilterInput>>>;
  otherUOM?: Maybe<SearchableIdFilterInput>;
  otherUPC?: Maybe<SearchableStringFilterInput>;
  prodCategory?: Maybe<SearchableStringFilterInput>;
  prodCategoryRef?: Maybe<SearchableStringFilterInput>;
  prodFullName?: Maybe<SearchableStringFilterInput>;
  prodLongDesc?: Maybe<SearchableStringFilterInput>;
  prodMajor?: Maybe<SearchableStringFilterInput>;
  prodMinor?: Maybe<SearchableStringFilterInput>;
  prodName?: Maybe<SearchableStringFilterInput>;
  prodShortDesc?: Maybe<SearchableStringFilterInput>;
  region?: Maybe<SearchableStringFilterInput>;
  size?: Maybe<SearchableStringFilterInput>;
  sweetness?: Maybe<SearchableStringFilterInput>;
  tags?: Maybe<SearchableStringFilterInput>;
  uom?: Maybe<SearchableStringFilterInput>;
  upc?: Maybe<SearchableStringFilterInput>;
  vintageKey?: Maybe<SearchableStringFilterInput>;
  winery?: Maybe<SearchableStringFilterInput>;
};

export type SearchableProductSortInput = {
  direction?: Maybe<SearchableSortDirection>;
  field?: Maybe<SearchableProductSortableFields>;
};

export enum SearchableProductSortableFields {
  Vintage = 'Vintage',
  Abv = 'abv',
  BrandLine = 'brandLine',
  Container = 'container',
  Country = 'country',
  Flavour = 'flavour',
  Id = 'id',
  ImageFile = 'imageFile',
  Images = 'images',
  Manufacturer = 'manufacturer',
  OtherUom = 'otherUOM',
  OtherUpc = 'otherUPC',
  ProdCategory = 'prodCategory',
  ProdCategoryRef = 'prodCategoryRef',
  ProdFullName = 'prodFullName',
  ProdLongDesc = 'prodLongDesc',
  ProdMajor = 'prodMajor',
  ProdMinor = 'prodMinor',
  ProdName = 'prodName',
  ProdShortDesc = 'prodShortDesc',
  Region = 'region',
  Size = 'size',
  Sweetness = 'sweetness',
  Tags = 'tags',
  Uom = 'uom',
  Upc = 'upc',
  VintageKey = 'vintageKey',
  Winery = 'winery'
}

export enum SearchableSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SearchableStoreConnection = {
  __typename?: 'SearchableStoreConnection';
  items?: Maybe<Array<Maybe<Store>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type SearchableStoreFilterInput = {
  address?: Maybe<SearchableStringFilterInput>;
  and?: Maybe<Array<Maybe<SearchableStoreFilterInput>>>;
  businessHours?: Maybe<SearchableStringFilterInput>;
  carriersAllowed?: Maybe<SearchableStringFilterInput>;
  deliveryHours?: Maybe<SearchableStringFilterInput>;
  deliveryScope?: Maybe<SearchableStringFilterInput>;
  giftWrapping?: Maybe<SearchableStringFilterInput>;
  holidays?: Maybe<SearchableStringFilterInput>;
  id?: Maybe<SearchableStringFilterInput>;
  isDeliveryPaused?: Maybe<ModelBooleanFilterInput>;
  isPaused?: Maybe<SearchableBooleanFilterInput>;
  isPickupPaused?: Maybe<ModelBooleanFilterInput>;
  isShippingPaused?: Maybe<ModelBooleanFilterInput>;
  not?: Maybe<SearchableStoreFilterInput>;
  or?: Maybe<Array<Maybe<SearchableStoreFilterInput>>>;
  orderFulfilling?: Maybe<SearchableStringFilterInput>;
  scheduleHours?: Maybe<SearchableStringFilterInput>;
  specialProdCat?: Maybe<SearchableStringFilterInput>;
  statusReason?: Maybe<SearchableStringFilterInput>;
  storeClosing?: Maybe<SearchableIntFilterInput>;
  storeEmail?: Maybe<SearchableStringFilterInput>;
  storeName?: Maybe<SearchableStringFilterInput>;
  storePhoneNumber?: Maybe<SearchableStringFilterInput>;
  storeRefId?: Maybe<SearchableStringFilterInput>;
  storeStatus?: Maybe<SearchableStringFilterInput>;
};

export type SearchableStoreSortInput = {
  direction?: Maybe<SearchableSortDirection>;
  field?: Maybe<SearchableStoreSortableFields>;
};

export enum SearchableStoreSortableFields {
  Address = 'address',
  BusinessHours = 'businessHours',
  CarriersAllowed = 'carriersAllowed',
  DeliveryHours = 'deliveryHours',
  DeliveryScope = 'deliveryScope',
  GiftWrapping = 'giftWrapping',
  Holidays = 'holidays',
  Id = 'id',
  OrderFulfilling = 'orderFulfilling',
  ScheduleHours = 'scheduleHours',
  SpecialProdCat = 'specialProdCat',
  StatusReason = 'statusReason',
  StoreClosing = 'storeClosing',
  StoreEmail = 'storeEmail',
  StoreName = 'storeName',
  StorePhoneNumber = 'storePhoneNumber',
  StoreRefId = 'storeRefId',
  StoreStatus = 'storeStatus'
}

export type SearchableStringFilterInput = {
  eq?: Maybe<Scalars['String']>;
  exists?: Maybe<Scalars['Boolean']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  match?: Maybe<Scalars['String']>;
  matchPhrase?: Maybe<Scalars['String']>;
  matchPhrasePrefix?: Maybe<Scalars['String']>;
  multiMatch?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  range?: Maybe<Array<Maybe<Scalars['String']>>>;
  regexp?: Maybe<Scalars['String']>;
  wildcard?: Maybe<Scalars['String']>;
};

export type ServiceChargeInput = {
  chargeAmount?: Maybe<Scalars['String']>;
  chargeType?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<Maybe<TaxInput>>>;
};

export type Shipment = {
  __typename?: 'Shipment';
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  deliveryAddress?: Maybe<DeliveryAddress>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lineItems?: Maybe<Array<Maybe<LineItem>>>;
  payment?: Maybe<Array<Maybe<Payment>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistory>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['AWSDateTime'];
  updatedBy?: Maybe<Scalars['String']>;
};

export type ShipmentStHistory = {
  __typename?: 'ShipmentStHistory';
  fromStatus?: Maybe<Scalars['String']>;
  toStatus?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export type ShipmentStHistoryInput = {
  fromStatus?: Maybe<Scalars['String']>;
  toStatus?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export enum ShipmentStatus {
  Accepted = 'Accepted',
  Billed = 'Billed',
  Cancelled = 'Cancelled',
  Delivered = 'Delivered',
  Dispatched = 'Dispatched',
  Packing = 'Packing',
  Picked = 'Picked',
  Placed = 'Placed',
  Rejected = 'Rejected',
  ShelfToCounter = 'ShelfToCounter',
  Shipped = 'Shipped'
}

export type Store = {
  __typename?: 'Store';
  address?: Maybe<Address>;
  businessHours?: Maybe<ServingHours>;
  carriersAllowed?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['AWSDateTime'];
  deliveryHours?: Maybe<ServingHours>;
  deliveryScope?: Maybe<DeliveryScope>;
  distance?: Maybe<Scalars['Float']>;
  giftWrapping?: Maybe<Array<Maybe<GiftWrapping>>>;
  holidays?: Maybe<Array<Maybe<Holiday>>>;
  id: Scalars['ID'];
  orderFulfilling?: Maybe<OrderFulfilling>;
  scheduleHours?: Maybe<DeliveryHrsSchedule>;
  specialProdCat?: Maybe<Array<Maybe<Scalars['String']>>>;
  statusReason?: Maybe<Scalars['String']>;
  statusUpdatedAt?: Maybe<Scalars['AWSDateTime']>;
  statusUpdatedBy?: Maybe<Scalars['String']>;
  storeClosing?: Maybe<Scalars['Int']>;
  storeEmail?: Maybe<Scalars['String']>;
  storeName: Scalars['String'];
  storePhoneNumber: Scalars['String'];
  storePhotos?: Maybe<Scalars['String']>;
  storeRefId?: Maybe<Scalars['String']>;
  storeStatus: StoreStatus;
  timeReq?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
};

export type StoreAddress = {
  __typename?: 'StoreAddress';
  addrLine1?: Maybe<Scalars['String']>;
  addrLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type StoreAddressInput = {
  addrLine1?: Maybe<Scalars['String']>;
  addrLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export enum StoreStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  New = 'NEW',
  Onhold = 'ONHOLD',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  onCreateCart?: Maybe<Cart>;
  onCreateCartShipment?: Maybe<CartShipment>;
  onCreateCustomerAddress?: Maybe<CustomerAddress>;
  onCreateCustomerContact?: Maybe<CustomerContact>;
  onCreateCustomerOccasion?: Maybe<CustomerOccasion>;
  onCreateCustomerPayment?: Maybe<CustomerPayment>;
  onCreateCustomerProfile?: Maybe<CustomerProfile>;
  onCreateDeviceToken?: Maybe<DeviceToken>;
  onCreateOrder?: Maybe<Order>;
  onCreatePayment?: Maybe<Payment>;
  onCreateShipment?: Maybe<Shipment>;
  onDeleteCart?: Maybe<Cart>;
  onDeleteCartShipment?: Maybe<CartShipment>;
  onDeleteCustomerAddress?: Maybe<CustomerAddress>;
  onDeleteCustomerContact?: Maybe<CustomerContact>;
  onDeleteCustomerOccasion?: Maybe<CustomerOccasion>;
  onDeleteCustomerPayment?: Maybe<CustomerPayment>;
  onDeleteCustomerProfile?: Maybe<CustomerProfile>;
  onDeleteDeviceToken?: Maybe<DeviceToken>;
  onDeleteOrder?: Maybe<Order>;
  onDeletePayment?: Maybe<Payment>;
  onDeleteShipment?: Maybe<Shipment>;
  onRejectionNotificationUpdate?: Maybe<OrderShipment>;
  onUpdateCart?: Maybe<Cart>;
  onUpdateCartShipment?: Maybe<CartShipment>;
  onUpdateCustomerAddress?: Maybe<CustomerAddress>;
  onUpdateCustomerContact?: Maybe<CustomerContact>;
  onUpdateCustomerOccasion?: Maybe<CustomerOccasion>;
  onUpdateCustomerPayment?: Maybe<CustomerPayment>;
  onUpdateCustomerProfile?: Maybe<CustomerProfile>;
  onUpdateDeviceToken?: Maybe<DeviceToken>;
  onUpdateOrder?: Maybe<Order>;
  onUpdateOrderShipmentNotification?: Maybe<OrderShipment>;
  onUpdatePayment?: Maybe<Payment>;
  onUpdateShipment?: Maybe<Shipment>;
};


export type SubscriptionOnRejectionNotificationUpdateArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionOnUpdateOrderShipmentNotificationArgs = {
  userId: Scalars['ID'];
};

export type Tags = {
  __typename?: 'Tags';
  Key?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['String']>;
};

export type Tax = {
  __typename?: 'Tax';
  amount?: Maybe<Scalars['Float']>;
  taxType?: Maybe<Scalars['String']>;
};

export type TaxInput = {
  amount?: Maybe<Scalars['Float']>;
  taxType?: Maybe<Scalars['String']>;
};

export type UpdateCartInput = {
  anonymousId?: Maybe<Scalars['ID']>;
  belongsTo?: Maybe<Scalars['String']>;
  cartShipment?: Maybe<Array<Maybe<CartShipmentInput>>>;
  channel?: Maybe<Scalars['String']>;
  closedAt?: Maybe<Scalars['AWSDateTime']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdateCartShipmentInput = {
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  cartId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdateCustomerAddressInput = {
  addrLine1?: Maybe<Scalars['String']>;
  addrLine2?: Maybe<Scalars['String']>;
  addrState?: Maybe<Scalars['String']>;
  addressType?: Maybe<AddressType>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  customType?: Maybe<Scalars['String']>;
  customerContactId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instructions?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  markDefault?: Maybe<Scalars['Boolean']>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type UpdateCustomerAddressesDefaultInput = {
  customerContactId: Scalars['String'];
  id: Scalars['String'];
  markDefault: Scalars['String'];
};

export type UpdateCustomerContactInput = {
  contactCategory?: Maybe<ContactCategory>;
  contactCustomType?: Maybe<Scalars['String']>;
  defaultAddressId?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  occasionReminderContact?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdateCustomerOccasionInput = {
  customerContactId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  occasionDate?: Maybe<Scalars['String']>;
  occasionTitle?: Maybe<Scalars['String']>;
  reminder?: Maybe<Scalars['Boolean']>;
};

export type UpdateCustomerPaymentInput = {
  bankName?: Maybe<Scalars['String']>;
  cardDefault?: Maybe<Scalars['Boolean']>;
  cardHolderName?: Maybe<Scalars['String']>;
  cardNumber?: Maybe<Scalars['String']>;
  expDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  postalCode?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdateCustomerProfileInput = {
  customerId?: Maybe<Scalars['String']>;
  customerRes?: Maybe<Scalars['String']>;
  deliveryToId?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['AWSEmail']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  occasionReminderProfile?: Maybe<Scalars['Boolean']>;
  orderLineitemReplacement?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  subscribeToNotification?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
};

export type UpdateDeviceTokenInput = {
  deviceToken?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['AWSDateTime'];
  userId?: Maybe<Scalars['ID']>;
  userPool?: Maybe<UserPool>;
  userType?: Maybe<UserType>;
};

export type UpdateOccasionsReminderInput = {
  customerContactId: Scalars['String'];
  reminder: Scalars['String'];
};

export type UpdateOrderInput = {
  cartId?: Maybe<Scalars['ID']>;
  channel?: Maybe<Scalars['String']>;
  closedAt?: Maybe<Scalars['AWSDateTime']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  orderShipment?: Maybe<Array<Maybe<OrderShipmentInput>>>;
  orderStatus?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  totalDeliveryCharges?: Maybe<Scalars['Float']>;
  totalDiscount?: Maybe<Scalars['Float']>;
  totalProductAmount?: Maybe<Scalars['Float']>;
  totalTaxAmount?: Maybe<Scalars['Float']>;
  totalTipAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['String']>;
  userAgent?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdateOrderShipmentInput = {
  actionType?: Maybe<Scalars['String']>;
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['AWSDateTime']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isUpdated?: Maybe<Scalars['Boolean']>;
  orderId?: Maybe<Scalars['ID']>;
  orderLineItems?: Maybe<Array<Maybe<OrderLineItemInput>>>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentIntentRes?: Maybe<Scalars['String']>;
  rejectionMsg?: Maybe<Scalars['String']>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UpdatePaymentInput = {
  amount?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instrument?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['AWSDate']>;
  paymentReference?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  settlementDate?: Maybe<Scalars['AWSDate']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type UpdateShipmentInput = {
  assignedStoreId?: Maybe<Scalars['ID']>;
  assignedStoreName?: Maybe<Scalars['String']>;
  deliveryAddress?: Maybe<DeliveryAddressInput>;
  deliveryType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>;
  shipmentStatus?: Maybe<ShipmentStatus>;
  statusHistory?: Maybe<ShipmentStHistoryInput>;
  subTotalAmount?: Maybe<Scalars['Float']>;
  subTotalDeliveryCharges?: Maybe<Scalars['Float']>;
  subTotalDiscount?: Maybe<Scalars['Float']>;
  subTotalProductAmount?: Maybe<Scalars['Float']>;
  subTotalTax?: Maybe<Scalars['Float']>;
  subTotalTipAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export enum UserPool {
  Customer = 'Customer',
  Delivery = 'Delivery',
  Merchant = 'Merchant',
  Operations = 'Operations'
}

export enum UserType {
  Anonymous = 'Anonymous',
  SignedIn = 'SignedIn'
}

export type ValidateUrl = {
  __typename?: 'ValidateURL';
  isValid?: Maybe<Scalars['Boolean']>;
};

export type ValidateUrlInput = {
  referralUrl?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
};

export type CheckoutPaymentIntentInput = {
  input?: Maybe<CreatePaymentIntentInput>;
};

export type CheckoutPaymentMethodsListInput = {
  input?: Maybe<PaymentMethodsListInput>;
};

export type CheckoutSearchStoreInput = {
  distance: Scalars['Int'];
  filter?: Maybe<SearchableStoreFilterInput>;
  from?: Maybe<Scalars['Int']>;
  lat: Scalars['Float'];
  limit?: Maybe<Scalars['Int']>;
  lon: Scalars['Float'];
  nextToken?: Maybe<Scalars['String']>;
  sort?: Maybe<SearchableStoreSortInput>;
};

export type CheckoutTaxInput = {
  input?: Maybe<Array<Maybe<OrderShipmentInput>>>;
};

export type CheckoutWrapperOutput = {
  __typename?: 'checkoutWrapperOutput';
  cart?: Maybe<Cart>;
  customerProfile?: Maybe<CustomerProfile>;
  paymentIntent?: Maybe<PaymentIntent>;
  paymentMethodsList?: Maybe<PaymentMethods>;
  stores?: Maybe<SearchableStoreConnection>;
  taxCalculation?: Maybe<ModelOrderShipmentConnection>;
};

export type DeliveryHrsSchedule = {
  __typename?: 'deliveryHrsSchedule';
  Fri?: Maybe<Scalars['String']>;
  Mon?: Maybe<Scalars['String']>;
  Sat?: Maybe<Scalars['String']>;
  Sun?: Maybe<Scalars['String']>;
  Thu?: Maybe<Scalars['String']>;
  Tue?: Maybe<Scalars['String']>;
  Wed?: Maybe<Scalars['String']>;
};

export type DeliveryHrsScheduleInput = {
  Fri?: Maybe<Scalars['String']>;
  Mon?: Maybe<Scalars['String']>;
  Sat?: Maybe<Scalars['String']>;
  Sun?: Maybe<Scalars['String']>;
  Thu?: Maybe<Scalars['String']>;
  Tue?: Maybe<Scalars['String']>;
  Wed?: Maybe<Scalars['String']>;
};

export type S3signedUrl = {
  __typename?: 's3signedURL';
  fileName?: Maybe<Scalars['String']>;
  signedURL?: Maybe<Scalars['String']>;
};

export type ServiceCharge = {
  __typename?: 'serviceCharge';
  chargeAmount?: Maybe<Scalars['String']>;
  chargeType?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<Maybe<Tax>>>;
};

export type ServingHours = {
  __typename?: 'servingHours';
  Fri?: Maybe<Array<Maybe<Scalars['String']>>>;
  Mon?: Maybe<Array<Maybe<Scalars['String']>>>;
  Sat?: Maybe<Array<Maybe<Scalars['String']>>>;
  Sun?: Maybe<Array<Maybe<Scalars['String']>>>;
  Thu?: Maybe<Array<Maybe<Scalars['String']>>>;
  Tue?: Maybe<Array<Maybe<Scalars['String']>>>;
  Wed?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateDeviceTokenMutationVariables = Exact<{
  input: CreateDeviceTokenInput;
}>;


export type CreateDeviceTokenMutation = { __typename?: 'Mutation', createDeviceToken?: Maybe<{ __typename?: 'DeviceToken', userId?: Maybe<string>, deviceToken?: Maybe<string> }> };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateCustomerProfileInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', userId: string, deliveryToId?: Maybe<string>, subscribeToNotification?: Maybe<boolean>, orderLineitemReplacement?: Maybe<boolean> }> };

export type GetCustomerProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetCustomerProfileQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string>, phoneNumber?: Maybe<string>, firstName: string, lastName: string, middleName?: Maybe<string>, email: any, userId: string, profileImage?: Maybe<string>, deliveryToId?: Maybe<string> }> };

export type DeleteCustomerAddressMutationVariables = Exact<{
  input: DeleteCustomerAddressInput;
}>;


export type DeleteCustomerAddressMutation = { __typename?: 'Mutation', deleteCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string> }> };

export type DeleteCustomerOccasionMutationVariables = Exact<{
  input: DeleteCustomerOccasionInput;
}>;


export type DeleteCustomerOccasionMutation = { __typename?: 'Mutation', deleteCustomerOccasion?: Maybe<{ __typename?: 'CustomerOccasion', id?: Maybe<string> }> };

export type DeleteCustomerContactMutationVariables = Exact<{
  input: DeleteCustomerContactInput;
}>;


export type DeleteCustomerContactMutation = { __typename?: 'Mutation', deleteCustomerContact?: Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string> }> };

export type SearchPriceAndAvailabilitysQueryVariables = Exact<{
  filter?: Maybe<SearchablePriceAndAvailabilityFilterInput>;
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  distance: Scalars['Int'];
}>;


export type SearchPriceAndAvailabilitysQuery = { __typename?: 'Query', searchPriceAndAvailabilitys?: Maybe<{ __typename?: 'SearchablePriceAndAvailabilityConnection', items?: Maybe<Array<Maybe<{ __typename?: 'PriceAndAvailability', id: string, storeId: string, price?: Maybe<number> }>>> }> };

export type SearchStoresQueryVariables = Exact<{
  filter?: Maybe<SearchableStoreFilterInput>;
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  distance: Scalars['Int'];
}>;


export type SearchStoresQuery = { __typename?: 'Query', searchStores?: Maybe<{ __typename?: 'SearchableStoreConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Store', id: string, storeName: string, address?: Maybe<{ __typename?: 'Address', addrLine1: string, addrLine2?: Maybe<string>, city: string, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string>, state?: Maybe<string> }>, deliveryScope?: Maybe<{ __typename?: 'DeliveryScope', deliveryType?: Maybe<Array<Maybe<DeliveryType>>> }> }>>> }> };

export type GetRecommendationsQueryVariables = Exact<{
  filter?: Maybe<SearchableProductFilterInput>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetRecommendationsQuery = { __typename?: 'Query', searchProducts?: Maybe<{ __typename?: 'SearchableProductConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Product', id: string, prodName: string, prodFullName: string, images?: Maybe<Array<Maybe<string>>>, prodCategory: string }>>> }> };

export type CreateCustomerContactWithRelationsMutationVariables = Exact<{
  input: CreateCustomerContactAddressOccasionInput;
}>;


export type CreateCustomerContactWithRelationsMutation = { __typename?: 'Mutation', createCustomerContactAddressOccasion?: Maybe<{ __typename?: 'CustomerContactAddressOccasion', customerContact?: Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string> }> }> };

export type UpdateCustomerContactMutationVariables = Exact<{
  input: UpdateCustomerContactInput;
}>;


export type UpdateCustomerContactMutation = { __typename?: 'Mutation', updateCustomerContact?: Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string> }> };

export type GetDeliveryContactsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetDeliveryContactsQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', customerContact?: Maybe<{ __typename?: 'ModelCustomerContactConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string>, firstName: string, lastName: string, middleName?: Maybe<string>, phoneNumber?: Maybe<string>, contactCustomType?: Maybe<string>, contactCategory?: Maybe<ContactCategory>, email?: Maybe<string>, occasions?: Maybe<{ __typename?: 'ModelCustomerOccasionConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerOccasion', id?: Maybe<string>, reminder?: Maybe<boolean>, occasionDate?: Maybe<string>, occasionTitle?: Maybe<string> }>>> }>, deliveryAddress?: Maybe<{ __typename?: 'ModelCustomerAddressConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string>, firstName?: Maybe<string>, middleName?: Maybe<string>, lastName?: Maybe<string>, addrLine1: string, addrLine2?: Maybe<string>, addrState?: Maybe<string>, country?: Maybe<string>, addressType?: Maybe<AddressType>, markDefault?: Maybe<boolean>, instructions?: Maybe<string> }>>> }> }>>> }> }> };

export type GetDeliveryContactNamesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetDeliveryContactNamesQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', customerContact?: Maybe<{ __typename?: 'ModelCustomerContactConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string>, firstName: string, lastName: string, middleName?: Maybe<string> }>>> }> }> };

export type UdpateCustomerContactMutationVariables = Exact<{
  input: UpdateCustomerContactInput;
}>;


export type UdpateCustomerContactMutation = { __typename?: 'Mutation', updateCustomerContact?: Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string> }> };

export type CreateOccasionMutationVariables = Exact<{
  input: CreateCustomerOccasionInput;
}>;


export type CreateOccasionMutation = { __typename?: 'Mutation', createCustomerOccasion?: Maybe<{ __typename?: 'CustomerOccasion', id?: Maybe<string> }> };

export type UpdateCustomerAddressMutationVariables = Exact<{
  input: UpdateCustomerAddressInput;
}>;


export type UpdateCustomerAddressMutation = { __typename?: 'Mutation', updateCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string> }> };

export type CreateCustomerAddressMutationVariables = Exact<{
  input: CreateCustomerAddressInput;
}>;


export type CreateCustomerAddressMutation = { __typename?: 'Mutation', createCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string> }> };

export type GetCustomerAddressQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCustomerAddressQuery = { __typename?: 'Query', getCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string>, latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1: string, addrLine2?: Maybe<string>, postCode?: Maybe<string>, addrState?: Maybe<string>, phoneNumber?: Maybe<string>, firstName?: Maybe<string>, customType?: Maybe<string>, addressType?: Maybe<AddressType>, markDefault?: Maybe<boolean>, city: string, country?: Maybe<string>, instructions?: Maybe<string>, lastName?: Maybe<string>, middleName?: Maybe<string> }> };

export type GetCustomerOccasionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCustomerOccasionQuery = { __typename?: 'Query', getCustomerOccasion?: Maybe<{ __typename?: 'CustomerOccasion', id?: Maybe<string>, occasionDate?: Maybe<string>, occasionTitle?: Maybe<string>, reminder?: Maybe<boolean> }> };

export type EditCustomerOccasionMutationVariables = Exact<{
  input: UpdateCustomerOccasionInput;
}>;


export type EditCustomerOccasionMutation = { __typename?: 'Mutation', updateCustomerOccasion?: Maybe<{ __typename?: 'CustomerOccasion', id?: Maybe<string> }> };

export type GetPrefilledValuesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetPrefilledValuesQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string>, lastName: string, firstName: string, middleName?: Maybe<string>, profileImage?: Maybe<string>, phoneNumber?: Maybe<string>, email: any }> };

export type EditUserProfileMutationVariables = Exact<{
  input: UpdateCustomerProfileInput;
}>;


export type EditUserProfileMutation = { __typename?: 'Mutation', updateCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string> }> };

export type SearchAddressQueryVariables = Exact<{
  input: SearchAddressInput;
}>;


export type SearchAddressQuery = { __typename?: 'Query', searchAddress?: Maybe<{ __typename?: 'ModelSearchAddressConnection', items?: Maybe<Array<Maybe<{ __typename?: 'SearchAddress', city?: Maybe<string>, secondary?: Maybe<string>, entries?: Maybe<number>, state?: Maybe<string>, street_line?: Maybe<string>, zipcode?: Maybe<string> }>>> }> };

export type ListOrdersByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
  filter?: Maybe<ModelOrderFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
}>;


export type ListOrdersByUserIdQuery = { __typename?: 'Query', listOrdersByUserId?: Maybe<{ __typename?: 'ModelOrderConnection', nextToken?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename?: 'Order', orderStatus?: Maybe<OrderStatus>, cartId?: Maybe<string>, channel?: Maybe<string>, createdAt: any, id?: Maybe<string>, totalAmount?: Maybe<number>, totalDeliveryCharges?: Maybe<number>, totalDiscount?: Maybe<number>, totalProductAmount?: Maybe<number>, totalTaxAmount?: Maybe<number>, totalTipAmount?: Maybe<number>, transactionId?: Maybe<string>, updatedAt?: Maybe<any>, userAgent?: Maybe<string>, userId?: Maybe<string>, orderShipment?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', nextToken?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', actionType?: Maybe<string>, assignedStoreId?: Maybe<string>, deliveryType?: Maybe<string>, shipmentStatus?: Maybe<ShipmentStatus>, assignedStoreName?: Maybe<string>, createdAt: any, rejectionMsg?: Maybe<string>, isUpdated?: Maybe<boolean>, id?: Maybe<string>, orderId?: Maybe<string>, subTotalAmount?: Maybe<number>, subTotalDeliveryCharges?: Maybe<number>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, subTotalTax?: Maybe<number>, subTotalTipAmount?: Maybe<number>, updatedAt?: Maybe<any>, updatedBy?: Maybe<string>, userId?: Maybe<string>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, city?: Maybe<string>, country?: Maybe<string>, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string>, state?: Maybe<string> }>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', id?: Maybe<string>, prodShortDesc?: Maybe<string>, productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, size?: Maybe<number>, totalPrice?: Maybe<string>, unitPrice?: Maybe<string>, uom?: Maybe<number> }>>>, statusHistory?: Maybe<{ __typename?: 'ShipmentStHistory', fromStatus?: Maybe<string>, toStatus?: Maybe<string>, updatedBy?: Maybe<string>, updatedAt?: Maybe<any> }> }>>> }> }>>> }> };

export type GetCartShipmentForOrderingViewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCartShipmentForOrderingViewQuery = { __typename?: 'Query', getCartShipment?: Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreName?: Maybe<string>, subTotalProductAmount?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }> }> };

export type ListShipmentsQueryVariables = Exact<{
  cartId: Scalars['ID'];
}>;


export type ListShipmentsQuery = { __typename?: 'Query', getCart?: Maybe<{ __typename?: 'Cart', cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreName?: Maybe<string>, subTotalProductAmount?: Maybe<number>, assignedStoreId?: Maybe<string>, deliveryType?: Maybe<string>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, prodShortDesc?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, size?: Maybe<number>, totalPrice?: Maybe<string>, unitPrice?: Maybe<string>, uom?: Maybe<number>, itemInvalid?: Maybe<boolean> }>>>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }> }>>> }> }> };

export type SearchStoresForTaxQueryVariables = Exact<{
  filter?: Maybe<SearchableStoreFilterInput>;
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  distance: Scalars['Int'];
}>;


export type SearchStoresForTaxQuery = { __typename?: 'Query', searchStores?: Maybe<{ __typename?: 'SearchableStoreConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Store', address?: Maybe<{ __typename?: 'Address', postCode?: Maybe<string>, state?: Maybe<string> }> }>>> }> };

export type GetOrderShipmentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrderShipmentQuery = { __typename?: 'Query', getOrderShipment?: Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', productName?: Maybe<string>, productId?: Maybe<string>, unitPrice?: Maybe<string>, qtyPurchased?: Maybe<number> }>>> }> };

export type UpdateOrderShipmentMutationVariables = Exact<{
  input: UpdateOrderShipmentInput;
}>;


export type UpdateOrderShipmentMutation = { __typename?: 'Mutation', updateOrderShipment?: Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, shipmentStatus?: Maybe<ShipmentStatus> }> };

export type GetPaymentMethodListMutationVariables = Exact<{
  input: PaymentMethodsListInput;
}>;


export type GetPaymentMethodListMutation = { __typename?: 'Mutation', paymentMethodsList?: Maybe<{ __typename?: 'PaymentMethods', paymentMethods?: Maybe<string>, defaultPaymentMethodId?: Maybe<string> }> };

export type GetDefaultPaymentMutationVariables = Exact<{
  input: PaymentMethodsListInput;
}>;


export type GetDefaultPaymentMutation = { __typename?: 'Mutation', paymentMethodsList?: Maybe<{ __typename?: 'PaymentMethods', defaultPaymentMethodId?: Maybe<string> }> };

export type GetProductQueryVariables = Exact<{
  filter?: Maybe<SearchableProductFilterInput>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetProductQuery = { __typename?: 'Query', searchProducts?: Maybe<{ __typename?: 'SearchableProductConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Product', id: string, prodName: string, prodFullName: string, images?: Maybe<Array<Maybe<string>>>, prodCategory: string, flavour?: Maybe<string>, abv?: Maybe<string>, prodMinor: string }>>> }> };

export type SearchProductsQueryVariables = Exact<{
  filter?: Maybe<SearchableProductFilterInput>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type SearchProductsQuery = { __typename?: 'Query', searchProducts?: Maybe<{ __typename?: 'SearchableProductConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Product', id: string, prodCategory: string, prodName: string, images?: Maybe<Array<Maybe<string>>>, prodFullName: string }>>> }> };

export type UpdateCustomerProfileMutationVariables = Exact<{
  input: UpdateCustomerProfileInput;
}>;


export type UpdateCustomerProfileMutation = { __typename?: 'Mutation', updateCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string> }> };

export type SearchProductsLambdaQueryVariables = Exact<{
  filter?: Maybe<SearchableProductFilterInput>;
  sort?: Maybe<SearchableProductSortInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  from?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
}>;


export type SearchProductsLambdaQuery = { __typename?: 'Query', searchProductsLambda?: Maybe<{ __typename?: 'SearchableProductConnectionNew', nextToken?: Maybe<string>, total?: Maybe<number>, items?: Maybe<Array<Maybe<{ __typename?: 'ProductNew', id: string, prodFullName: string, prodName: string, prodCategory: string, imageFile?: Maybe<string>, brandLine?: Maybe<string>, manufacturer?: Maybe<string>, prodMinor: string, region?: Maybe<string>, abv?: Maybe<string>, price?: Maybe<number> }>>>, brand?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, ProdCategory?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, manufacturer?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, prodMajor?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, prodMinor?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, majorType?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, country?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>>, container?: Maybe<Array<Maybe<{ __typename?: 'AggRes', key?: Maybe<string>, doc_count?: Maybe<number> }>>> }> };

export type GetProfileIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetProfileIdQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string>, userId: string, deliveryToId?: Maybe<string> }> };

export type GetProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', id?: Maybe<string>, phoneNumber?: Maybe<string>, firstName: string, lastName: string, middleName?: Maybe<string>, email: any, userId: string, profileImage?: Maybe<string>, deliveryToId?: Maybe<string>, subscribeToNotification?: Maybe<boolean>, orderLineitemReplacement?: Maybe<boolean> }> };

export type GetImageUrlQueryVariables = Exact<{
  type: Scalars['String'];
  fileName: Scalars['String'];
  userId: Scalars['String'];
  requestType: Scalars['String'];
}>;


export type GetImageUrlQuery = { __typename?: 'Query', getS3SignedURL?: Maybe<{ __typename?: 's3signedURL', signedURL?: Maybe<string>, fileName?: Maybe<string> }> };

export type ListAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllOrdersQuery = { __typename?: 'Query', listOrders?: Maybe<{ __typename?: 'ModelOrderConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Order', id?: Maybe<string>, orderStatus?: Maybe<OrderStatus>, userId?: Maybe<string>, totalAmount?: Maybe<number>, orderShipment?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, deliveryType?: Maybe<string>, assignedStoreId?: Maybe<string>, orderId?: Maybe<string>, assignedStoreName?: Maybe<string>, scheduledDeliveryDt?: Maybe<string>, scheduledTimeSlot?: Maybe<string>, updatedAt?: Maybe<any>, updatedBy?: Maybe<string>, subTotalAmount?: Maybe<number>, subTotalDeliveryCharges?: Maybe<number>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, subTotalTax?: Maybe<number>, subTotalTipAmount?: Maybe<number>, createdAt: any, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, country?: Maybe<string>, postCode?: Maybe<string> }>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', id?: Maybe<string>, productId?: Maybe<string>, productName?: Maybe<string>, prodShortDesc?: Maybe<string>, prodCategory?: Maybe<string>, size?: Maybe<number>, uom?: Maybe<number>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string> }>>> }>>> }> }>>> }> };

export type GetStripeCustomerIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetStripeCustomerIdQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', customerId?: Maybe<string> }> };

export type CartShipmentPartsFragment = { __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> };

export type CartPartsFragment = { __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> };

export type GetCartQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCartQuery = { __typename?: 'Query', getCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type ListCartsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<ModelCartFilterInput>;
}>;


export type ListCartsQuery = { __typename?: 'Query', listCarts?: Maybe<{ __typename?: 'ModelCartConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }>>> }> };

export type GetCartByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCartByUserIdQuery = { __typename?: 'Query', getCartByUserId?: Maybe<{ __typename?: 'ModelCartConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', cartId?: Maybe<string> }>>> }> }>>> }> };

export type GetCartIdsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<ModelCartFilterInput>;
}>;


export type GetCartIdsQuery = { __typename?: 'Query', listCarts?: Maybe<{ __typename?: 'ModelCartConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Cart', id?: Maybe<string> }>>> }> };

export type DeliveryAddressPartsFragment = { __typename?: 'CustomerAddress', id?: Maybe<string>, addrLine1: string, addrLine2?: Maybe<string>, addrState?: Maybe<string>, country?: Maybe<string>, city: string, customType?: Maybe<string>, markDefault?: Maybe<boolean>, firstName?: Maybe<string>, addressType?: Maybe<AddressType>, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string> };

export type GetDeliveryAddressInitQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetDeliveryAddressInitQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', deliveryToAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string>, addrLine1: string, addrLine2?: Maybe<string>, addrState?: Maybe<string>, country?: Maybe<string>, city: string, customType?: Maybe<string>, markDefault?: Maybe<boolean>, firstName?: Maybe<string>, addressType?: Maybe<AddressType>, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string> }>, customerContact?: Maybe<{ __typename?: 'ModelCustomerContactConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerContact', deliveryAddress?: Maybe<{ __typename?: 'ModelCustomerAddressConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerAddress', latitude?: Maybe<number>, longitude?: Maybe<number> }>>> }> }>>> }> }> };

export type GetDeliveryAddressQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetDeliveryAddressQuery = { __typename?: 'Query', getCustomerProfile?: Maybe<{ __typename?: 'CustomerProfile', deliveryToAddress?: Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string>, firstName?: Maybe<string>, middleName?: Maybe<string>, lastName?: Maybe<string>, addrLine1: string, addrLine2?: Maybe<string>, addrState?: Maybe<string>, country?: Maybe<string>, city: string, customType?: Maybe<string>, markDefault?: Maybe<boolean>, addressType?: Maybe<AddressType>, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string>, customerContact?: Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string>, firstName: string, middleName?: Maybe<string>, lastName: string }> }> }> };

export type CustomerContactsByCustomerProfileIdQueryVariables = Exact<{
  userID?: Maybe<Scalars['ID']>;
  filter?: Maybe<ModelCustomerContactFilterInput>;
}>;


export type CustomerContactsByCustomerProfileIdQuery = { __typename?: 'Query', CustomerContactsByCustomerProfileId?: Maybe<{ __typename?: 'ModelCustomerContactConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerContact', id?: Maybe<string>, contactCategory?: Maybe<ContactCategory>, contactCustomType?: Maybe<string>, defaultAddressId?: Maybe<string>, email?: Maybe<string>, firstName: string, phoneNumber?: Maybe<string>, deliveryAddress?: Maybe<{ __typename?: 'ModelCustomerAddressConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CustomerAddress', id?: Maybe<string>, addrLine1: string, addrLine2?: Maybe<string>, addrState?: Maybe<string>, country?: Maybe<string>, city: string, customType?: Maybe<string>, markDefault?: Maybe<boolean>, firstName?: Maybe<string>, addressType?: Maybe<AddressType>, latitude?: Maybe<number>, longitude?: Maybe<number>, postCode?: Maybe<string> }>>> }> }>>> }> };

export type CartProductsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CartProductsQuery = { __typename?: 'Query', getCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, totalAmount?: Maybe<number>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', id?: Maybe<string>, productId?: Maybe<string>, qtyPurchased?: Maybe<number>, productName?: Maybe<string>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type UpdateCartShipmentMutationVariables = Exact<{
  input: UpdateCartShipmentInput;
}>;


export type UpdateCartShipmentMutation = { __typename?: 'Mutation', updateCartShipment?: Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }> };

export type CreateCartShipmentMutationVariables = Exact<{
  input: CreateCartShipmentInput;
}>;


export type CreateCartShipmentMutation = { __typename?: 'Mutation', createCartShipment?: Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }> };

export type CreateCartMutationVariables = Exact<{
  input: CreateCartInput;
}>;


export type CreateCartMutation = { __typename?: 'Mutation', createCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type UpdateCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', updateCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type GetShipmentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetShipmentsQuery = { __typename?: 'Query', getCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type DeleteCartMutationVariables = Exact<{
  input: DeleteCartInput;
}>;


export type DeleteCartMutation = { __typename?: 'Mutation', deleteCart?: Maybe<{ __typename?: 'Cart', id?: Maybe<string>, cartShipment?: Maybe<{ __typename?: 'ModelCartShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }>>> }> }> };

export type OrderPartsFragment = { __typename?: 'Order', id?: Maybe<string>, orderStatus?: Maybe<OrderStatus>, userId?: Maybe<string>, totalAmount?: Maybe<number>, orderShipment?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, deliveryType?: Maybe<string>, assignedStoreId?: Maybe<string>, orderId?: Maybe<string>, assignedStoreName?: Maybe<string>, scheduledDeliveryDt?: Maybe<string>, scheduledTimeSlot?: Maybe<string>, updatedAt?: Maybe<any>, updatedBy?: Maybe<string>, subTotalAmount?: Maybe<number>, subTotalDeliveryCharges?: Maybe<number>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, subTotalTax?: Maybe<number>, subTotalTipAmount?: Maybe<number>, createdAt: any, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, country?: Maybe<string>, postCode?: Maybe<string> }>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', id?: Maybe<string>, productId?: Maybe<string>, productName?: Maybe<string>, prodShortDesc?: Maybe<string>, prodCategory?: Maybe<string>, size?: Maybe<number>, uom?: Maybe<number>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string> }>>> }>>> }> };

export type ListOrdersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<ModelOrderFilterInput>;
}>;


export type ListOrdersQuery = { __typename?: 'Query', listOrders?: Maybe<{ __typename?: 'ModelOrderConnection', items?: Maybe<Array<Maybe<{ __typename?: 'Order', id?: Maybe<string>, orderStatus?: Maybe<OrderStatus>, userId?: Maybe<string>, totalAmount?: Maybe<number>, orderShipment?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, deliveryType?: Maybe<string>, assignedStoreId?: Maybe<string>, orderId?: Maybe<string>, assignedStoreName?: Maybe<string>, scheduledDeliveryDt?: Maybe<string>, scheduledTimeSlot?: Maybe<string>, updatedAt?: Maybe<any>, updatedBy?: Maybe<string>, subTotalAmount?: Maybe<number>, subTotalDeliveryCharges?: Maybe<number>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, subTotalTax?: Maybe<number>, subTotalTipAmount?: Maybe<number>, createdAt: any, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, country?: Maybe<string>, postCode?: Maybe<string> }>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', id?: Maybe<string>, productId?: Maybe<string>, productName?: Maybe<string>, prodShortDesc?: Maybe<string>, prodCategory?: Maybe<string>, size?: Maybe<number>, uom?: Maybe<number>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string> }>>> }>>> }> }>>> }> };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: Maybe<{ __typename?: 'Order', id?: Maybe<string>, orderStatus?: Maybe<OrderStatus>, userId?: Maybe<string>, totalAmount?: Maybe<number>, orderShipment?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', id?: Maybe<string>, deliveryType?: Maybe<string>, assignedStoreId?: Maybe<string>, orderId?: Maybe<string>, assignedStoreName?: Maybe<string>, scheduledDeliveryDt?: Maybe<string>, scheduledTimeSlot?: Maybe<string>, updatedAt?: Maybe<any>, updatedBy?: Maybe<string>, subTotalAmount?: Maybe<number>, subTotalDeliveryCharges?: Maybe<number>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, subTotalTax?: Maybe<number>, subTotalTipAmount?: Maybe<number>, createdAt: any, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, country?: Maybe<string>, postCode?: Maybe<string> }>, orderLineItems?: Maybe<Array<Maybe<{ __typename?: 'OrderLineItem', id?: Maybe<string>, productId?: Maybe<string>, productName?: Maybe<string>, prodShortDesc?: Maybe<string>, prodCategory?: Maybe<string>, size?: Maybe<number>, uom?: Maybe<number>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string> }>>> }>>> }> }> };

export type DeleteCartShipmentMutationVariables = Exact<{
  input: DeleteCartShipmentInput;
}>;


export type DeleteCartShipmentMutation = { __typename?: 'Mutation', deleteCartShipment?: Maybe<{ __typename?: 'CartShipment', id?: Maybe<string>, assignedStoreId?: Maybe<string>, assignedStoreName?: Maybe<string>, deliveryType?: Maybe<string>, subTotalDiscount?: Maybe<number>, subTotalProductAmount?: Maybe<number>, serviceCharge?: Maybe<number>, subTotalTax?: Maybe<number>, deliveryAddress?: Maybe<{ __typename?: 'DeliveryAddress', latitude?: Maybe<number>, longitude?: Maybe<number>, addrLine1?: Maybe<string>, addrLine2?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string> }>, lineItems?: Maybe<Array<Maybe<{ __typename?: 'LineItem', productId?: Maybe<string>, productName?: Maybe<string>, qtyPurchased?: Maybe<number>, unitPrice?: Maybe<string>, totalPrice?: Maybe<string>, itemInvalid?: Maybe<boolean> }>>> }> };

export type CalculateTaxMutationVariables = Exact<{
  input?: Maybe<Array<Maybe<OrderShipmentInput>> | Maybe<OrderShipmentInput>>;
}>;


export type CalculateTaxMutation = { __typename?: 'Mutation', calculateTax?: Maybe<{ __typename?: 'ModelOrderShipmentConnection', items?: Maybe<Array<Maybe<{ __typename?: 'OrderShipment', calculatedTax?: Maybe<number>, assignedStoreId?: Maybe<string> }>>> }> };

export type CreatePaymentIntentMutationVariables = Exact<{
  input: CreatePaymentIntentInput;
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', createPaymentIntent?: Maybe<{ __typename?: 'PaymentIntent', publicKey?: Maybe<string>, clientSecret?: Maybe<string>, id?: Maybe<string> }> };

export const CartShipmentPartsFragmentDoc = `
    fragment cartShipmentParts on CartShipment {
  id
  assignedStoreId
  assignedStoreName
  deliveryType
  deliveryAddress {
    latitude
    longitude
    addrLine1
    addrLine2
    country
    state
    city
    postCode
  }
  lineItems {
    productId
    productName
    qtyPurchased
    unitPrice
    totalPrice
    itemInvalid
  }
  subTotalDiscount
  subTotalProductAmount
  serviceCharge
  subTotalTax
}
    `;
export const CartPartsFragmentDoc = `
    fragment cartParts on Cart {
  id
  cartShipment {
    items {
      ...cartShipmentParts
    }
  }
}
    ${CartShipmentPartsFragmentDoc}`;
export const DeliveryAddressPartsFragmentDoc = `
    fragment deliveryAddressParts on CustomerAddress {
  id
  addrLine1
  addrLine2
  addrState
  country
  city
  customType
  markDefault
  firstName
  addressType
  latitude
  longitude
  postCode
}
    `;
export const OrderPartsFragmentDoc = `
    fragment orderParts on Order {
  id
  orderStatus
  userId
  totalAmount
  orderShipment {
    items {
      id
      deliveryType
      assignedStoreId
      orderId
      deliveryType
      assignedStoreName
      scheduledDeliveryDt
      scheduledTimeSlot
      updatedAt
      updatedBy
      subTotalAmount
      subTotalDeliveryCharges
      subTotalDiscount
      subTotalProductAmount
      subTotalTax
      subTotalTipAmount
      createdAt
      deliveryAddress {
        latitude
        longitude
        addrLine1
        addrLine2
        city
        state
        country
        postCode
      }
      orderLineItems {
        id
        productId
        productName
        prodShortDesc
        prodCategory
        size
        uom
        qtyPurchased
        unitPrice
        totalPrice
      }
    }
  }
}
    `;
export const CreateDeviceTokenDocument = `
    mutation createDeviceToken($input: CreateDeviceTokenInput!) {
  createDeviceToken(input: $input) {
    userId
    deviceToken
  }
}
    `;
export const useCreateDeviceTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateDeviceTokenMutation, TError, CreateDeviceTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateDeviceTokenMutation, TError, CreateDeviceTokenMutationVariables, TContext>(
      ['createDeviceToken'],
      (variables?: CreateDeviceTokenMutationVariables) => fetcher<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>(client, CreateDeviceTokenDocument, variables, headers)(),
      options
    );
useCreateDeviceTokenMutation.fetcher = (client: GraphQLClient, variables: CreateDeviceTokenMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>(client, CreateDeviceTokenDocument, variables, headers);
export const UpdateUserDocument = `
    mutation updateUser($input: UpdateCustomerProfileInput!) {
  updateCustomerProfile(input: $input) {
    userId
    deliveryToId
    subscribeToNotification
    orderLineitemReplacement
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['updateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
useUpdateUserMutation.fetcher = (client: GraphQLClient, variables: UpdateUserMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers);
export const GetCustomerProfileDocument = `
    query getCustomerProfile($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    id
    phoneNumber
    firstName
    lastName
    middleName
    email
    userId
    profileImage
    deliveryToId
  }
}
    `;
export const useGetCustomerProfileQuery = <
      TData = GetCustomerProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCustomerProfileQueryVariables,
      options?: UseQueryOptions<GetCustomerProfileQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCustomerProfileQuery, TError, TData>(
      ['getCustomerProfile', variables],
      fetcher<GetCustomerProfileQuery, GetCustomerProfileQueryVariables>(client, GetCustomerProfileDocument, variables, headers),
      options
    );

useGetCustomerProfileQuery.getKey = (variables: GetCustomerProfileQueryVariables) => ['getCustomerProfile', variables];
;

useGetCustomerProfileQuery.fetcher = (client: GraphQLClient, variables: GetCustomerProfileQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCustomerProfileQuery, GetCustomerProfileQueryVariables>(client, GetCustomerProfileDocument, variables, headers);
export const DeleteCustomerAddressDocument = `
    mutation deleteCustomerAddress($input: DeleteCustomerAddressInput!) {
  deleteCustomerAddress(input: $input) {
    id
  }
}
    `;
export const useDeleteCustomerAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCustomerAddressMutation, TError, DeleteCustomerAddressMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCustomerAddressMutation, TError, DeleteCustomerAddressMutationVariables, TContext>(
      ['deleteCustomerAddress'],
      (variables?: DeleteCustomerAddressMutationVariables) => fetcher<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>(client, DeleteCustomerAddressDocument, variables, headers)(),
      options
    );
useDeleteCustomerAddressMutation.fetcher = (client: GraphQLClient, variables: DeleteCustomerAddressMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>(client, DeleteCustomerAddressDocument, variables, headers);
export const DeleteCustomerOccasionDocument = `
    mutation deleteCustomerOccasion($input: DeleteCustomerOccasionInput!) {
  deleteCustomerOccasion(input: $input) {
    id
  }
}
    `;
export const useDeleteCustomerOccasionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCustomerOccasionMutation, TError, DeleteCustomerOccasionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCustomerOccasionMutation, TError, DeleteCustomerOccasionMutationVariables, TContext>(
      ['deleteCustomerOccasion'],
      (variables?: DeleteCustomerOccasionMutationVariables) => fetcher<DeleteCustomerOccasionMutation, DeleteCustomerOccasionMutationVariables>(client, DeleteCustomerOccasionDocument, variables, headers)(),
      options
    );
useDeleteCustomerOccasionMutation.fetcher = (client: GraphQLClient, variables: DeleteCustomerOccasionMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCustomerOccasionMutation, DeleteCustomerOccasionMutationVariables>(client, DeleteCustomerOccasionDocument, variables, headers);
export const DeleteCustomerContactDocument = `
    mutation deleteCustomerContact($input: DeleteCustomerContactInput!) {
  deleteCustomerContact(input: $input) {
    id
  }
}
    `;
export const useDeleteCustomerContactMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCustomerContactMutation, TError, DeleteCustomerContactMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCustomerContactMutation, TError, DeleteCustomerContactMutationVariables, TContext>(
      ['deleteCustomerContact'],
      (variables?: DeleteCustomerContactMutationVariables) => fetcher<DeleteCustomerContactMutation, DeleteCustomerContactMutationVariables>(client, DeleteCustomerContactDocument, variables, headers)(),
      options
    );
useDeleteCustomerContactMutation.fetcher = (client: GraphQLClient, variables: DeleteCustomerContactMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCustomerContactMutation, DeleteCustomerContactMutationVariables>(client, DeleteCustomerContactDocument, variables, headers);
export const SearchPriceAndAvailabilitysDocument = `
    query searchPriceAndAvailabilitys($filter: SearchablePriceAndAvailabilityFilterInput, $lat: Float!, $lon: Float!, $distance: Int!) {
  searchPriceAndAvailabilitys(
    filter: $filter
    lat: $lat
    lon: $lon
    distance: $distance
  ) {
    items {
      id
      storeId
      price
    }
  }
}
    `;
export const useSearchPriceAndAvailabilitysQuery = <
      TData = SearchPriceAndAvailabilitysQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SearchPriceAndAvailabilitysQueryVariables,
      options?: UseQueryOptions<SearchPriceAndAvailabilitysQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchPriceAndAvailabilitysQuery, TError, TData>(
      ['searchPriceAndAvailabilitys', variables],
      fetcher<SearchPriceAndAvailabilitysQuery, SearchPriceAndAvailabilitysQueryVariables>(client, SearchPriceAndAvailabilitysDocument, variables, headers),
      options
    );

useSearchPriceAndAvailabilitysQuery.getKey = (variables: SearchPriceAndAvailabilitysQueryVariables) => ['searchPriceAndAvailabilitys', variables];
;

useSearchPriceAndAvailabilitysQuery.fetcher = (client: GraphQLClient, variables: SearchPriceAndAvailabilitysQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchPriceAndAvailabilitysQuery, SearchPriceAndAvailabilitysQueryVariables>(client, SearchPriceAndAvailabilitysDocument, variables, headers);
export const SearchStoresDocument = `
    query searchStores($filter: SearchableStoreFilterInput, $lat: Float!, $lon: Float!, $distance: Int!) {
  searchStores(filter: $filter, lat: $lat, lon: $lon, distance: $distance) {
    items {
      id
      storeName
      address {
        addrLine1
        addrLine2
        city
        latitude
        longitude
        postCode
        state
      }
      deliveryScope {
        deliveryType
      }
    }
  }
}
    `;
export const useSearchStoresQuery = <
      TData = SearchStoresQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SearchStoresQueryVariables,
      options?: UseQueryOptions<SearchStoresQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchStoresQuery, TError, TData>(
      ['searchStores', variables],
      fetcher<SearchStoresQuery, SearchStoresQueryVariables>(client, SearchStoresDocument, variables, headers),
      options
    );

useSearchStoresQuery.getKey = (variables: SearchStoresQueryVariables) => ['searchStores', variables];
;

useSearchStoresQuery.fetcher = (client: GraphQLClient, variables: SearchStoresQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchStoresQuery, SearchStoresQueryVariables>(client, SearchStoresDocument, variables, headers);
export const GetRecommendationsDocument = `
    query getRecommendations($filter: SearchableProductFilterInput, $limit: Int) {
  searchProducts(limit: $limit, filter: $filter) {
    items {
      id
      prodName
      prodFullName
      images
      prodCategory
    }
  }
}
    `;
export const useGetRecommendationsQuery = <
      TData = GetRecommendationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetRecommendationsQueryVariables,
      options?: UseQueryOptions<GetRecommendationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRecommendationsQuery, TError, TData>(
      variables === undefined ? ['getRecommendations'] : ['getRecommendations', variables],
      fetcher<GetRecommendationsQuery, GetRecommendationsQueryVariables>(client, GetRecommendationsDocument, variables, headers),
      options
    );

useGetRecommendationsQuery.getKey = (variables?: GetRecommendationsQueryVariables) => variables === undefined ? ['getRecommendations'] : ['getRecommendations', variables];
;

useGetRecommendationsQuery.fetcher = (client: GraphQLClient, variables?: GetRecommendationsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetRecommendationsQuery, GetRecommendationsQueryVariables>(client, GetRecommendationsDocument, variables, headers);
export const CreateCustomerContactWithRelationsDocument = `
    mutation createCustomerContactWithRelations($input: CreateCustomerContactAddressOccasionInput!) {
  createCustomerContactAddressOccasion(input: $input) {
    customerContact {
      id
    }
  }
}
    `;
export const useCreateCustomerContactWithRelationsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCustomerContactWithRelationsMutation, TError, CreateCustomerContactWithRelationsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCustomerContactWithRelationsMutation, TError, CreateCustomerContactWithRelationsMutationVariables, TContext>(
      ['createCustomerContactWithRelations'],
      (variables?: CreateCustomerContactWithRelationsMutationVariables) => fetcher<CreateCustomerContactWithRelationsMutation, CreateCustomerContactWithRelationsMutationVariables>(client, CreateCustomerContactWithRelationsDocument, variables, headers)(),
      options
    );
useCreateCustomerContactWithRelationsMutation.fetcher = (client: GraphQLClient, variables: CreateCustomerContactWithRelationsMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCustomerContactWithRelationsMutation, CreateCustomerContactWithRelationsMutationVariables>(client, CreateCustomerContactWithRelationsDocument, variables, headers);
export const UpdateCustomerContactDocument = `
    mutation updateCustomerContact($input: UpdateCustomerContactInput!) {
  updateCustomerContact(input: $input) {
    id
  }
}
    `;
export const useUpdateCustomerContactMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCustomerContactMutation, TError, UpdateCustomerContactMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCustomerContactMutation, TError, UpdateCustomerContactMutationVariables, TContext>(
      ['updateCustomerContact'],
      (variables?: UpdateCustomerContactMutationVariables) => fetcher<UpdateCustomerContactMutation, UpdateCustomerContactMutationVariables>(client, UpdateCustomerContactDocument, variables, headers)(),
      options
    );
useUpdateCustomerContactMutation.fetcher = (client: GraphQLClient, variables: UpdateCustomerContactMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCustomerContactMutation, UpdateCustomerContactMutationVariables>(client, UpdateCustomerContactDocument, variables, headers);
export const GetDeliveryContactsDocument = `
    query getDeliveryContacts($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    customerContact {
      items {
        id
        firstName
        lastName
        middleName
        phoneNumber
        contactCustomType
        contactCategory
        email
        occasions {
          items {
            id
            reminder
            occasionDate
            occasionTitle
          }
        }
        deliveryAddress {
          items {
            id
            firstName
            middleName
            lastName
            addrLine1
            addrLine2
            addrState
            country
            addressType
            markDefault
            instructions
          }
        }
      }
    }
  }
}
    `;
export const useGetDeliveryContactsQuery = <
      TData = GetDeliveryContactsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDeliveryContactsQueryVariables,
      options?: UseQueryOptions<GetDeliveryContactsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDeliveryContactsQuery, TError, TData>(
      ['getDeliveryContacts', variables],
      fetcher<GetDeliveryContactsQuery, GetDeliveryContactsQueryVariables>(client, GetDeliveryContactsDocument, variables, headers),
      options
    );

useGetDeliveryContactsQuery.getKey = (variables: GetDeliveryContactsQueryVariables) => ['getDeliveryContacts', variables];
;

useGetDeliveryContactsQuery.fetcher = (client: GraphQLClient, variables: GetDeliveryContactsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDeliveryContactsQuery, GetDeliveryContactsQueryVariables>(client, GetDeliveryContactsDocument, variables, headers);
export const GetDeliveryContactNamesDocument = `
    query getDeliveryContactNames($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    customerContact {
      items {
        id
        firstName
        lastName
        middleName
      }
    }
  }
}
    `;
export const useGetDeliveryContactNamesQuery = <
      TData = GetDeliveryContactNamesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDeliveryContactNamesQueryVariables,
      options?: UseQueryOptions<GetDeliveryContactNamesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDeliveryContactNamesQuery, TError, TData>(
      ['getDeliveryContactNames', variables],
      fetcher<GetDeliveryContactNamesQuery, GetDeliveryContactNamesQueryVariables>(client, GetDeliveryContactNamesDocument, variables, headers),
      options
    );

useGetDeliveryContactNamesQuery.getKey = (variables: GetDeliveryContactNamesQueryVariables) => ['getDeliveryContactNames', variables];
;

useGetDeliveryContactNamesQuery.fetcher = (client: GraphQLClient, variables: GetDeliveryContactNamesQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDeliveryContactNamesQuery, GetDeliveryContactNamesQueryVariables>(client, GetDeliveryContactNamesDocument, variables, headers);
export const UdpateCustomerContactDocument = `
    mutation udpateCustomerContact($input: UpdateCustomerContactInput!) {
  updateCustomerContact(input: $input) {
    id
  }
}
    `;
export const useUdpateCustomerContactMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UdpateCustomerContactMutation, TError, UdpateCustomerContactMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UdpateCustomerContactMutation, TError, UdpateCustomerContactMutationVariables, TContext>(
      ['udpateCustomerContact'],
      (variables?: UdpateCustomerContactMutationVariables) => fetcher<UdpateCustomerContactMutation, UdpateCustomerContactMutationVariables>(client, UdpateCustomerContactDocument, variables, headers)(),
      options
    );
useUdpateCustomerContactMutation.fetcher = (client: GraphQLClient, variables: UdpateCustomerContactMutationVariables, headers?: RequestInit['headers']) => fetcher<UdpateCustomerContactMutation, UdpateCustomerContactMutationVariables>(client, UdpateCustomerContactDocument, variables, headers);
export const CreateOccasionDocument = `
    mutation createOccasion($input: CreateCustomerOccasionInput!) {
  createCustomerOccasion(input: $input) {
    id
  }
}
    `;
export const useCreateOccasionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateOccasionMutation, TError, CreateOccasionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateOccasionMutation, TError, CreateOccasionMutationVariables, TContext>(
      ['createOccasion'],
      (variables?: CreateOccasionMutationVariables) => fetcher<CreateOccasionMutation, CreateOccasionMutationVariables>(client, CreateOccasionDocument, variables, headers)(),
      options
    );
useCreateOccasionMutation.fetcher = (client: GraphQLClient, variables: CreateOccasionMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateOccasionMutation, CreateOccasionMutationVariables>(client, CreateOccasionDocument, variables, headers);
export const UpdateCustomerAddressDocument = `
    mutation updateCustomerAddress($input: UpdateCustomerAddressInput!) {
  updateCustomerAddress(input: $input) {
    id
  }
}
    `;
export const useUpdateCustomerAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCustomerAddressMutation, TError, UpdateCustomerAddressMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCustomerAddressMutation, TError, UpdateCustomerAddressMutationVariables, TContext>(
      ['updateCustomerAddress'],
      (variables?: UpdateCustomerAddressMutationVariables) => fetcher<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>(client, UpdateCustomerAddressDocument, variables, headers)(),
      options
    );
useUpdateCustomerAddressMutation.fetcher = (client: GraphQLClient, variables: UpdateCustomerAddressMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>(client, UpdateCustomerAddressDocument, variables, headers);
export const CreateCustomerAddressDocument = `
    mutation createCustomerAddress($input: CreateCustomerAddressInput!) {
  createCustomerAddress(input: $input) {
    id
  }
}
    `;
export const useCreateCustomerAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCustomerAddressMutation, TError, CreateCustomerAddressMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCustomerAddressMutation, TError, CreateCustomerAddressMutationVariables, TContext>(
      ['createCustomerAddress'],
      (variables?: CreateCustomerAddressMutationVariables) => fetcher<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>(client, CreateCustomerAddressDocument, variables, headers)(),
      options
    );
useCreateCustomerAddressMutation.fetcher = (client: GraphQLClient, variables: CreateCustomerAddressMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>(client, CreateCustomerAddressDocument, variables, headers);
export const GetCustomerAddressDocument = `
    query getCustomerAddress($id: ID!) {
  getCustomerAddress(id: $id) {
    id
    latitude
    longitude
    addrLine1
    addrLine2
    postCode
    addrState
    phoneNumber
    firstName
    customType
    addressType
    markDefault
    latitude
    longitude
    city
    country
    instructions
    lastName
    middleName
  }
}
    `;
export const useGetCustomerAddressQuery = <
      TData = GetCustomerAddressQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCustomerAddressQueryVariables,
      options?: UseQueryOptions<GetCustomerAddressQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCustomerAddressQuery, TError, TData>(
      ['getCustomerAddress', variables],
      fetcher<GetCustomerAddressQuery, GetCustomerAddressQueryVariables>(client, GetCustomerAddressDocument, variables, headers),
      options
    );

useGetCustomerAddressQuery.getKey = (variables: GetCustomerAddressQueryVariables) => ['getCustomerAddress', variables];
;

useGetCustomerAddressQuery.fetcher = (client: GraphQLClient, variables: GetCustomerAddressQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCustomerAddressQuery, GetCustomerAddressQueryVariables>(client, GetCustomerAddressDocument, variables, headers);
export const GetCustomerOccasionDocument = `
    query getCustomerOccasion($id: ID!) {
  getCustomerOccasion(id: $id) {
    id
    occasionDate
    occasionTitle
    reminder
  }
}
    `;
export const useGetCustomerOccasionQuery = <
      TData = GetCustomerOccasionQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCustomerOccasionQueryVariables,
      options?: UseQueryOptions<GetCustomerOccasionQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCustomerOccasionQuery, TError, TData>(
      ['getCustomerOccasion', variables],
      fetcher<GetCustomerOccasionQuery, GetCustomerOccasionQueryVariables>(client, GetCustomerOccasionDocument, variables, headers),
      options
    );

useGetCustomerOccasionQuery.getKey = (variables: GetCustomerOccasionQueryVariables) => ['getCustomerOccasion', variables];
;

useGetCustomerOccasionQuery.fetcher = (client: GraphQLClient, variables: GetCustomerOccasionQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCustomerOccasionQuery, GetCustomerOccasionQueryVariables>(client, GetCustomerOccasionDocument, variables, headers);
export const EditCustomerOccasionDocument = `
    mutation editCustomerOccasion($input: UpdateCustomerOccasionInput!) {
  updateCustomerOccasion(input: $input) {
    id
  }
}
    `;
export const useEditCustomerOccasionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditCustomerOccasionMutation, TError, EditCustomerOccasionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditCustomerOccasionMutation, TError, EditCustomerOccasionMutationVariables, TContext>(
      ['editCustomerOccasion'],
      (variables?: EditCustomerOccasionMutationVariables) => fetcher<EditCustomerOccasionMutation, EditCustomerOccasionMutationVariables>(client, EditCustomerOccasionDocument, variables, headers)(),
      options
    );
useEditCustomerOccasionMutation.fetcher = (client: GraphQLClient, variables: EditCustomerOccasionMutationVariables, headers?: RequestInit['headers']) => fetcher<EditCustomerOccasionMutation, EditCustomerOccasionMutationVariables>(client, EditCustomerOccasionDocument, variables, headers);
export const GetPrefilledValuesDocument = `
    query getPrefilledValues($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    id
    lastName
    firstName
    middleName
    profileImage
    phoneNumber
    email
  }
}
    `;
export const useGetPrefilledValuesQuery = <
      TData = GetPrefilledValuesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPrefilledValuesQueryVariables,
      options?: UseQueryOptions<GetPrefilledValuesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPrefilledValuesQuery, TError, TData>(
      ['getPrefilledValues', variables],
      fetcher<GetPrefilledValuesQuery, GetPrefilledValuesQueryVariables>(client, GetPrefilledValuesDocument, variables, headers),
      options
    );

useGetPrefilledValuesQuery.getKey = (variables: GetPrefilledValuesQueryVariables) => ['getPrefilledValues', variables];
;

useGetPrefilledValuesQuery.fetcher = (client: GraphQLClient, variables: GetPrefilledValuesQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPrefilledValuesQuery, GetPrefilledValuesQueryVariables>(client, GetPrefilledValuesDocument, variables, headers);
export const EditUserProfileDocument = `
    mutation editUserProfile($input: UpdateCustomerProfileInput!) {
  updateCustomerProfile(input: $input) {
    id
  }
}
    `;
export const useEditUserProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditUserProfileMutation, TError, EditUserProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditUserProfileMutation, TError, EditUserProfileMutationVariables, TContext>(
      ['editUserProfile'],
      (variables?: EditUserProfileMutationVariables) => fetcher<EditUserProfileMutation, EditUserProfileMutationVariables>(client, EditUserProfileDocument, variables, headers)(),
      options
    );
useEditUserProfileMutation.fetcher = (client: GraphQLClient, variables: EditUserProfileMutationVariables, headers?: RequestInit['headers']) => fetcher<EditUserProfileMutation, EditUserProfileMutationVariables>(client, EditUserProfileDocument, variables, headers);
export const SearchAddressDocument = `
    query searchAddress($input: SearchAddressInput!) {
  searchAddress(input: $input) {
    items {
      city
      secondary
      entries
      state
      street_line
      zipcode
    }
  }
}
    `;
export const useSearchAddressQuery = <
      TData = SearchAddressQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SearchAddressQueryVariables,
      options?: UseQueryOptions<SearchAddressQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchAddressQuery, TError, TData>(
      ['searchAddress', variables],
      fetcher<SearchAddressQuery, SearchAddressQueryVariables>(client, SearchAddressDocument, variables, headers),
      options
    );

useSearchAddressQuery.getKey = (variables: SearchAddressQueryVariables) => ['searchAddress', variables];
;

useSearchAddressQuery.fetcher = (client: GraphQLClient, variables: SearchAddressQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchAddressQuery, SearchAddressQueryVariables>(client, SearchAddressDocument, variables, headers);
export const ListOrdersByUserIdDocument = `
    query listOrdersByUserId($userId: String!, $filter: ModelOrderFilterInput, $limit: Int, $nextToken: String) {
  listOrdersByUserId(
    userId: $userId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    nextToken
    items {
      orderStatus
      orderShipment {
        items {
          actionType
          assignedStoreId
          deliveryType
          shipmentStatus
          assignedStoreName
          createdAt
          rejectionMsg
          isUpdated
          deliveryAddress {
            addrLine1
            addrLine2
            city
            country
            latitude
            longitude
            postCode
            state
          }
          id
          orderId
          orderLineItems {
            id
            prodShortDesc
            productId
            productName
            qtyPurchased
            size
            totalPrice
            unitPrice
            uom
          }
          statusHistory {
            fromStatus
            toStatus
            updatedBy
            updatedAt
          }
          subTotalAmount
          subTotalDeliveryCharges
          subTotalDiscount
          subTotalProductAmount
          subTotalTax
          subTotalTipAmount
          updatedAt
          updatedBy
          userId
        }
        nextToken
      }
      cartId
      channel
      createdAt
      id
      totalAmount
      totalDeliveryCharges
      totalDiscount
      totalProductAmount
      totalTaxAmount
      totalTipAmount
      transactionId
      updatedAt
      userAgent
      userId
    }
  }
}
    `;
export const useListOrdersByUserIdQuery = <
      TData = ListOrdersByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ListOrdersByUserIdQueryVariables,
      options?: UseQueryOptions<ListOrdersByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListOrdersByUserIdQuery, TError, TData>(
      ['listOrdersByUserId', variables],
      fetcher<ListOrdersByUserIdQuery, ListOrdersByUserIdQueryVariables>(client, ListOrdersByUserIdDocument, variables, headers),
      options
    );

useListOrdersByUserIdQuery.getKey = (variables: ListOrdersByUserIdQueryVariables) => ['listOrdersByUserId', variables];
;

useListOrdersByUserIdQuery.fetcher = (client: GraphQLClient, variables: ListOrdersByUserIdQueryVariables, headers?: RequestInit['headers']) => fetcher<ListOrdersByUserIdQuery, ListOrdersByUserIdQueryVariables>(client, ListOrdersByUserIdDocument, variables, headers);
export const GetCartShipmentForOrderingViewDocument = `
    query getCartShipmentForOrderingView($id: ID!) {
  getCartShipment(id: $id) {
    id
    assignedStoreName
    deliveryAddress {
      latitude
      longitude
      addrLine1
      addrLine2
      country
      state
      city
      postCode
    }
    subTotalProductAmount
  }
}
    `;
export const useGetCartShipmentForOrderingViewQuery = <
      TData = GetCartShipmentForOrderingViewQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCartShipmentForOrderingViewQueryVariables,
      options?: UseQueryOptions<GetCartShipmentForOrderingViewQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCartShipmentForOrderingViewQuery, TError, TData>(
      ['getCartShipmentForOrderingView', variables],
      fetcher<GetCartShipmentForOrderingViewQuery, GetCartShipmentForOrderingViewQueryVariables>(client, GetCartShipmentForOrderingViewDocument, variables, headers),
      options
    );

useGetCartShipmentForOrderingViewQuery.getKey = (variables: GetCartShipmentForOrderingViewQueryVariables) => ['getCartShipmentForOrderingView', variables];
;

useGetCartShipmentForOrderingViewQuery.fetcher = (client: GraphQLClient, variables: GetCartShipmentForOrderingViewQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCartShipmentForOrderingViewQuery, GetCartShipmentForOrderingViewQueryVariables>(client, GetCartShipmentForOrderingViewDocument, variables, headers);
export const ListShipmentsDocument = `
    query listShipments($cartId: ID!) {
  getCart(id: $cartId) {
    cartShipment {
      items {
        id
        assignedStoreName
        subTotalProductAmount
        assignedStoreId
        deliveryType
        lineItems {
          productId
          prodShortDesc
          productName
          qtyPurchased
          size
          totalPrice
          unitPrice
          uom
          itemInvalid
        }
        deliveryAddress {
          latitude
          longitude
          addrLine1
          addrLine2
          country
          state
          city
          postCode
        }
      }
    }
  }
}
    `;
export const useListShipmentsQuery = <
      TData = ListShipmentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ListShipmentsQueryVariables,
      options?: UseQueryOptions<ListShipmentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListShipmentsQuery, TError, TData>(
      ['listShipments', variables],
      fetcher<ListShipmentsQuery, ListShipmentsQueryVariables>(client, ListShipmentsDocument, variables, headers),
      options
    );

useListShipmentsQuery.getKey = (variables: ListShipmentsQueryVariables) => ['listShipments', variables];
;

useListShipmentsQuery.fetcher = (client: GraphQLClient, variables: ListShipmentsQueryVariables, headers?: RequestInit['headers']) => fetcher<ListShipmentsQuery, ListShipmentsQueryVariables>(client, ListShipmentsDocument, variables, headers);
export const SearchStoresForTaxDocument = `
    query searchStoresForTax($filter: SearchableStoreFilterInput, $lat: Float!, $lon: Float!, $distance: Int!) {
  searchStores(distance: $distance, lat: $lat, lon: $lon, filter: $filter) {
    items {
      address {
        postCode
        state
      }
    }
  }
}
    `;
export const useSearchStoresForTaxQuery = <
      TData = SearchStoresForTaxQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SearchStoresForTaxQueryVariables,
      options?: UseQueryOptions<SearchStoresForTaxQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchStoresForTaxQuery, TError, TData>(
      ['searchStoresForTax', variables],
      fetcher<SearchStoresForTaxQuery, SearchStoresForTaxQueryVariables>(client, SearchStoresForTaxDocument, variables, headers),
      options
    );

useSearchStoresForTaxQuery.getKey = (variables: SearchStoresForTaxQueryVariables) => ['searchStoresForTax', variables];
;

useSearchStoresForTaxQuery.fetcher = (client: GraphQLClient, variables: SearchStoresForTaxQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchStoresForTaxQuery, SearchStoresForTaxQueryVariables>(client, SearchStoresForTaxDocument, variables, headers);
export const GetOrderShipmentDocument = `
    query getOrderShipment($id: ID!) {
  getOrderShipment(id: $id) {
    id
    orderLineItems {
      productName
      productId
      unitPrice
      qtyPurchased
    }
  }
}
    `;
export const useGetOrderShipmentQuery = <
      TData = GetOrderShipmentQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetOrderShipmentQueryVariables,
      options?: UseQueryOptions<GetOrderShipmentQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOrderShipmentQuery, TError, TData>(
      ['getOrderShipment', variables],
      fetcher<GetOrderShipmentQuery, GetOrderShipmentQueryVariables>(client, GetOrderShipmentDocument, variables, headers),
      options
    );

useGetOrderShipmentQuery.getKey = (variables: GetOrderShipmentQueryVariables) => ['getOrderShipment', variables];
;

useGetOrderShipmentQuery.fetcher = (client: GraphQLClient, variables: GetOrderShipmentQueryVariables, headers?: RequestInit['headers']) => fetcher<GetOrderShipmentQuery, GetOrderShipmentQueryVariables>(client, GetOrderShipmentDocument, variables, headers);
export const UpdateOrderShipmentDocument = `
    mutation updateOrderShipment($input: UpdateOrderShipmentInput!) {
  updateOrderShipment(input: $input) {
    id
    shipmentStatus
  }
}
    `;
export const useUpdateOrderShipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateOrderShipmentMutation, TError, UpdateOrderShipmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateOrderShipmentMutation, TError, UpdateOrderShipmentMutationVariables, TContext>(
      ['updateOrderShipment'],
      (variables?: UpdateOrderShipmentMutationVariables) => fetcher<UpdateOrderShipmentMutation, UpdateOrderShipmentMutationVariables>(client, UpdateOrderShipmentDocument, variables, headers)(),
      options
    );
useUpdateOrderShipmentMutation.fetcher = (client: GraphQLClient, variables: UpdateOrderShipmentMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateOrderShipmentMutation, UpdateOrderShipmentMutationVariables>(client, UpdateOrderShipmentDocument, variables, headers);
export const GetPaymentMethodListDocument = `
    mutation getPaymentMethodList($input: PaymentMethodsListInput!) {
  paymentMethodsList(input: $input) {
    paymentMethods
    defaultPaymentMethodId
  }
}
    `;
export const useGetPaymentMethodListMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetPaymentMethodListMutation, TError, GetPaymentMethodListMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetPaymentMethodListMutation, TError, GetPaymentMethodListMutationVariables, TContext>(
      ['getPaymentMethodList'],
      (variables?: GetPaymentMethodListMutationVariables) => fetcher<GetPaymentMethodListMutation, GetPaymentMethodListMutationVariables>(client, GetPaymentMethodListDocument, variables, headers)(),
      options
    );
useGetPaymentMethodListMutation.fetcher = (client: GraphQLClient, variables: GetPaymentMethodListMutationVariables, headers?: RequestInit['headers']) => fetcher<GetPaymentMethodListMutation, GetPaymentMethodListMutationVariables>(client, GetPaymentMethodListDocument, variables, headers);
export const GetDefaultPaymentDocument = `
    mutation getDefaultPayment($input: PaymentMethodsListInput!) {
  paymentMethodsList(input: $input) {
    defaultPaymentMethodId
  }
}
    `;
export const useGetDefaultPaymentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetDefaultPaymentMutation, TError, GetDefaultPaymentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetDefaultPaymentMutation, TError, GetDefaultPaymentMutationVariables, TContext>(
      ['getDefaultPayment'],
      (variables?: GetDefaultPaymentMutationVariables) => fetcher<GetDefaultPaymentMutation, GetDefaultPaymentMutationVariables>(client, GetDefaultPaymentDocument, variables, headers)(),
      options
    );
useGetDefaultPaymentMutation.fetcher = (client: GraphQLClient, variables: GetDefaultPaymentMutationVariables, headers?: RequestInit['headers']) => fetcher<GetDefaultPaymentMutation, GetDefaultPaymentMutationVariables>(client, GetDefaultPaymentDocument, variables, headers);
export const GetProductDocument = `
    query getProduct($filter: SearchableProductFilterInput, $limit: Int) {
  searchProducts(limit: $limit, filter: $filter) {
    items {
      id
      prodName
      prodFullName
      images
      prodCategory
      flavour
      abv
      prodMinor
    }
  }
}
    `;
export const useGetProductQuery = <
      TData = GetProductQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetProductQueryVariables,
      options?: UseQueryOptions<GetProductQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProductQuery, TError, TData>(
      variables === undefined ? ['getProduct'] : ['getProduct', variables],
      fetcher<GetProductQuery, GetProductQueryVariables>(client, GetProductDocument, variables, headers),
      options
    );

useGetProductQuery.getKey = (variables?: GetProductQueryVariables) => variables === undefined ? ['getProduct'] : ['getProduct', variables];
;

useGetProductQuery.fetcher = (client: GraphQLClient, variables?: GetProductQueryVariables, headers?: RequestInit['headers']) => fetcher<GetProductQuery, GetProductQueryVariables>(client, GetProductDocument, variables, headers);
export const SearchProductsDocument = `
    query searchProducts($filter: SearchableProductFilterInput, $limit: Int) {
  searchProducts(filter: $filter, limit: $limit) {
    items {
      id
      prodCategory
      prodName
      images
      prodFullName
    }
  }
}
    `;
export const useSearchProductsQuery = <
      TData = SearchProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SearchProductsQueryVariables,
      options?: UseQueryOptions<SearchProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchProductsQuery, TError, TData>(
      variables === undefined ? ['searchProducts'] : ['searchProducts', variables],
      fetcher<SearchProductsQuery, SearchProductsQueryVariables>(client, SearchProductsDocument, variables, headers),
      options
    );

useSearchProductsQuery.getKey = (variables?: SearchProductsQueryVariables) => variables === undefined ? ['searchProducts'] : ['searchProducts', variables];
;

useSearchProductsQuery.fetcher = (client: GraphQLClient, variables?: SearchProductsQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchProductsQuery, SearchProductsQueryVariables>(client, SearchProductsDocument, variables, headers);
export const UpdateCustomerProfileDocument = `
    mutation updateCustomerProfile($input: UpdateCustomerProfileInput!) {
  updateCustomerProfile(input: $input) {
    id
  }
}
    `;
export const useUpdateCustomerProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCustomerProfileMutation, TError, UpdateCustomerProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCustomerProfileMutation, TError, UpdateCustomerProfileMutationVariables, TContext>(
      ['updateCustomerProfile'],
      (variables?: UpdateCustomerProfileMutationVariables) => fetcher<UpdateCustomerProfileMutation, UpdateCustomerProfileMutationVariables>(client, UpdateCustomerProfileDocument, variables, headers)(),
      options
    );
useUpdateCustomerProfileMutation.fetcher = (client: GraphQLClient, variables: UpdateCustomerProfileMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCustomerProfileMutation, UpdateCustomerProfileMutationVariables>(client, UpdateCustomerProfileDocument, variables, headers);
export const SearchProductsLambdaDocument = `
    query searchProductsLambda($filter: SearchableProductFilterInput, $sort: SearchableProductSortInput, $limit: Int, $nextToken: String, $distance: Int, $from: Int, $lat: Float, $lon: Float, $maxPrice: Float, $minPrice: Float) {
  searchProductsLambda(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    distance: $distance
    from: $from
    lat: $lat
    lon: $lon
    maxPrice: $maxPrice
    minPrice: $minPrice
    sort: $sort
  ) {
    items {
      id
      prodFullName
      prodName
      prodCategory
      imageFile
      brandLine
      manufacturer
      prodMinor
      region
      abv
      price
    }
    nextToken
    brand {
      key
      doc_count
    }
    ProdCategory {
      key
      doc_count
    }
    manufacturer {
      key
      doc_count
    }
    prodMajor {
      key
      doc_count
    }
    prodMinor {
      key
      doc_count
    }
    majorType {
      key
      doc_count
    }
    country {
      key
      doc_count
    }
    container {
      key
      doc_count
    }
    total
  }
}
    `;
export const useSearchProductsLambdaQuery = <
      TData = SearchProductsLambdaQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SearchProductsLambdaQueryVariables,
      options?: UseQueryOptions<SearchProductsLambdaQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchProductsLambdaQuery, TError, TData>(
      variables === undefined ? ['searchProductsLambda'] : ['searchProductsLambda', variables],
      fetcher<SearchProductsLambdaQuery, SearchProductsLambdaQueryVariables>(client, SearchProductsLambdaDocument, variables, headers),
      options
    );

useSearchProductsLambdaQuery.getKey = (variables?: SearchProductsLambdaQueryVariables) => variables === undefined ? ['searchProductsLambda'] : ['searchProductsLambda', variables];
;

useSearchProductsLambdaQuery.fetcher = (client: GraphQLClient, variables?: SearchProductsLambdaQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchProductsLambdaQuery, SearchProductsLambdaQueryVariables>(client, SearchProductsLambdaDocument, variables, headers);
export const GetProfileIdDocument = `
    query getProfileID($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    id
    userId
    deliveryToId
  }
}
    `;
export const useGetProfileIdQuery = <
      TData = GetProfileIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetProfileIdQueryVariables,
      options?: UseQueryOptions<GetProfileIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProfileIdQuery, TError, TData>(
      ['getProfileID', variables],
      fetcher<GetProfileIdQuery, GetProfileIdQueryVariables>(client, GetProfileIdDocument, variables, headers),
      options
    );

useGetProfileIdQuery.getKey = (variables: GetProfileIdQueryVariables) => ['getProfileID', variables];
;

useGetProfileIdQuery.fetcher = (client: GraphQLClient, variables: GetProfileIdQueryVariables, headers?: RequestInit['headers']) => fetcher<GetProfileIdQuery, GetProfileIdQueryVariables>(client, GetProfileIdDocument, variables, headers);
export const GetProfileDocument = `
    query getProfile($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    id
    phoneNumber
    firstName
    lastName
    middleName
    email
    userId
    profileImage
    deliveryToId
    subscribeToNotification
    orderLineitemReplacement
  }
}
    `;
export const useGetProfileQuery = <
      TData = GetProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetProfileQueryVariables,
      options?: UseQueryOptions<GetProfileQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProfileQuery, TError, TData>(
      ['getProfile', variables],
      fetcher<GetProfileQuery, GetProfileQueryVariables>(client, GetProfileDocument, variables, headers),
      options
    );

useGetProfileQuery.getKey = (variables: GetProfileQueryVariables) => ['getProfile', variables];
;

useGetProfileQuery.fetcher = (client: GraphQLClient, variables: GetProfileQueryVariables, headers?: RequestInit['headers']) => fetcher<GetProfileQuery, GetProfileQueryVariables>(client, GetProfileDocument, variables, headers);
export const GetImageUrlDocument = `
    query getImageURL($type: String!, $fileName: String!, $userId: String!, $requestType: String!) {
  getS3SignedURL(
    contentType: $type
    fileName: $fileName
    userId: $userId
    requestType: $requestType
  ) {
    signedURL
    fileName
  }
}
    `;
export const useGetImageUrlQuery = <
      TData = GetImageUrlQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetImageUrlQueryVariables,
      options?: UseQueryOptions<GetImageUrlQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetImageUrlQuery, TError, TData>(
      ['getImageURL', variables],
      fetcher<GetImageUrlQuery, GetImageUrlQueryVariables>(client, GetImageUrlDocument, variables, headers),
      options
    );

useGetImageUrlQuery.getKey = (variables: GetImageUrlQueryVariables) => ['getImageURL', variables];
;

useGetImageUrlQuery.fetcher = (client: GraphQLClient, variables: GetImageUrlQueryVariables, headers?: RequestInit['headers']) => fetcher<GetImageUrlQuery, GetImageUrlQueryVariables>(client, GetImageUrlDocument, variables, headers);
export const ListAllOrdersDocument = `
    query listAllOrders {
  listOrders {
    items {
      ...orderParts
    }
  }
}
    ${OrderPartsFragmentDoc}`;
export const useListAllOrdersQuery = <
      TData = ListAllOrdersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListAllOrdersQueryVariables,
      options?: UseQueryOptions<ListAllOrdersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListAllOrdersQuery, TError, TData>(
      variables === undefined ? ['listAllOrders'] : ['listAllOrders', variables],
      fetcher<ListAllOrdersQuery, ListAllOrdersQueryVariables>(client, ListAllOrdersDocument, variables, headers),
      options
    );

useListAllOrdersQuery.getKey = (variables?: ListAllOrdersQueryVariables) => variables === undefined ? ['listAllOrders'] : ['listAllOrders', variables];
;

useListAllOrdersQuery.fetcher = (client: GraphQLClient, variables?: ListAllOrdersQueryVariables, headers?: RequestInit['headers']) => fetcher<ListAllOrdersQuery, ListAllOrdersQueryVariables>(client, ListAllOrdersDocument, variables, headers);
export const GetStripeCustomerIdDocument = `
    query getStripeCustomerId($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    customerId
  }
}
    `;
export const useGetStripeCustomerIdQuery = <
      TData = GetStripeCustomerIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetStripeCustomerIdQueryVariables,
      options?: UseQueryOptions<GetStripeCustomerIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetStripeCustomerIdQuery, TError, TData>(
      ['getStripeCustomerId', variables],
      fetcher<GetStripeCustomerIdQuery, GetStripeCustomerIdQueryVariables>(client, GetStripeCustomerIdDocument, variables, headers),
      options
    );

useGetStripeCustomerIdQuery.getKey = (variables: GetStripeCustomerIdQueryVariables) => ['getStripeCustomerId', variables];
;

useGetStripeCustomerIdQuery.fetcher = (client: GraphQLClient, variables: GetStripeCustomerIdQueryVariables, headers?: RequestInit['headers']) => fetcher<GetStripeCustomerIdQuery, GetStripeCustomerIdQueryVariables>(client, GetStripeCustomerIdDocument, variables, headers);
export const GetCartDocument = `
    query getCart($id: ID!) {
  getCart(id: $id) {
    ...cartParts
  }
}
    ${CartPartsFragmentDoc}`;
export const useGetCartQuery = <
      TData = GetCartQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCartQueryVariables,
      options?: UseQueryOptions<GetCartQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCartQuery, TError, TData>(
      ['getCart', variables],
      fetcher<GetCartQuery, GetCartQueryVariables>(client, GetCartDocument, variables, headers),
      options
    );

useGetCartQuery.getKey = (variables: GetCartQueryVariables) => ['getCart', variables];
;

useGetCartQuery.fetcher = (client: GraphQLClient, variables: GetCartQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCartQuery, GetCartQueryVariables>(client, GetCartDocument, variables, headers);
export const ListCartsDocument = `
    query listCarts($limit: Int, $filter: ModelCartFilterInput) {
  listCarts(limit: $limit, filter: $filter) {
    items {
      ...cartParts
    }
  }
}
    ${CartPartsFragmentDoc}`;
export const useListCartsQuery = <
      TData = ListCartsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListCartsQueryVariables,
      options?: UseQueryOptions<ListCartsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListCartsQuery, TError, TData>(
      variables === undefined ? ['listCarts'] : ['listCarts', variables],
      fetcher<ListCartsQuery, ListCartsQueryVariables>(client, ListCartsDocument, variables, headers),
      options
    );

useListCartsQuery.getKey = (variables?: ListCartsQueryVariables) => variables === undefined ? ['listCarts'] : ['listCarts', variables];
;

useListCartsQuery.fetcher = (client: GraphQLClient, variables?: ListCartsQueryVariables, headers?: RequestInit['headers']) => fetcher<ListCartsQuery, ListCartsQueryVariables>(client, ListCartsDocument, variables, headers);
export const GetCartByUserIdDocument = `
    query getCartByUserId($userId: String!) {
  getCartByUserId(userId: $userId) {
    items {
      id
      cartShipment {
        items {
          cartId
        }
      }
    }
  }
}
    `;
export const useGetCartByUserIdQuery = <
      TData = GetCartByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCartByUserIdQueryVariables,
      options?: UseQueryOptions<GetCartByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCartByUserIdQuery, TError, TData>(
      ['getCartByUserId', variables],
      fetcher<GetCartByUserIdQuery, GetCartByUserIdQueryVariables>(client, GetCartByUserIdDocument, variables, headers),
      options
    );

useGetCartByUserIdQuery.getKey = (variables: GetCartByUserIdQueryVariables) => ['getCartByUserId', variables];
;

useGetCartByUserIdQuery.fetcher = (client: GraphQLClient, variables: GetCartByUserIdQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCartByUserIdQuery, GetCartByUserIdQueryVariables>(client, GetCartByUserIdDocument, variables, headers);
export const GetCartIdsDocument = `
    query getCartIds($limit: Int, $filter: ModelCartFilterInput) {
  listCarts(limit: $limit, filter: $filter) {
    items {
      id
    }
  }
}
    `;
export const useGetCartIdsQuery = <
      TData = GetCartIdsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCartIdsQueryVariables,
      options?: UseQueryOptions<GetCartIdsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCartIdsQuery, TError, TData>(
      variables === undefined ? ['getCartIds'] : ['getCartIds', variables],
      fetcher<GetCartIdsQuery, GetCartIdsQueryVariables>(client, GetCartIdsDocument, variables, headers),
      options
    );

useGetCartIdsQuery.getKey = (variables?: GetCartIdsQueryVariables) => variables === undefined ? ['getCartIds'] : ['getCartIds', variables];
;

useGetCartIdsQuery.fetcher = (client: GraphQLClient, variables?: GetCartIdsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCartIdsQuery, GetCartIdsQueryVariables>(client, GetCartIdsDocument, variables, headers);
export const GetDeliveryAddressInitDocument = `
    query getDeliveryAddressInit($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    deliveryToAddress {
      ...deliveryAddressParts
    }
    customerContact {
      items {
        deliveryAddress {
          items {
            latitude
            longitude
          }
        }
      }
    }
  }
}
    ${DeliveryAddressPartsFragmentDoc}`;
export const useGetDeliveryAddressInitQuery = <
      TData = GetDeliveryAddressInitQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDeliveryAddressInitQueryVariables,
      options?: UseQueryOptions<GetDeliveryAddressInitQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDeliveryAddressInitQuery, TError, TData>(
      ['getDeliveryAddressInit', variables],
      fetcher<GetDeliveryAddressInitQuery, GetDeliveryAddressInitQueryVariables>(client, GetDeliveryAddressInitDocument, variables, headers),
      options
    );

useGetDeliveryAddressInitQuery.getKey = (variables: GetDeliveryAddressInitQueryVariables) => ['getDeliveryAddressInit', variables];
;

useGetDeliveryAddressInitQuery.fetcher = (client: GraphQLClient, variables: GetDeliveryAddressInitQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDeliveryAddressInitQuery, GetDeliveryAddressInitQueryVariables>(client, GetDeliveryAddressInitDocument, variables, headers);
export const GetDeliveryAddressDocument = `
    query getDeliveryAddress($userId: ID!) {
  getCustomerProfile(userId: $userId) {
    deliveryToAddress {
      ...deliveryAddressParts
      id
      firstName
      middleName
      lastName
      addrLine1
      addrLine2
      customerContact {
        id
        firstName
        middleName
        lastName
      }
    }
  }
}
    ${DeliveryAddressPartsFragmentDoc}`;
export const useGetDeliveryAddressQuery = <
      TData = GetDeliveryAddressQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDeliveryAddressQueryVariables,
      options?: UseQueryOptions<GetDeliveryAddressQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDeliveryAddressQuery, TError, TData>(
      ['getDeliveryAddress', variables],
      fetcher<GetDeliveryAddressQuery, GetDeliveryAddressQueryVariables>(client, GetDeliveryAddressDocument, variables, headers),
      options
    );

useGetDeliveryAddressQuery.getKey = (variables: GetDeliveryAddressQueryVariables) => ['getDeliveryAddress', variables];
;

useGetDeliveryAddressQuery.fetcher = (client: GraphQLClient, variables: GetDeliveryAddressQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDeliveryAddressQuery, GetDeliveryAddressQueryVariables>(client, GetDeliveryAddressDocument, variables, headers);
export const CustomerContactsByCustomerProfileIdDocument = `
    query CustomerContactsByCustomerProfileId($userID: ID, $filter: ModelCustomerContactFilterInput) {
  CustomerContactsByCustomerProfileId(filter: $filter, userId: $userID) {
    items {
      id
      contactCategory
      contactCustomType
      defaultAddressId
      email
      firstName
      id
      phoneNumber
      deliveryAddress {
        items {
          ...deliveryAddressParts
        }
      }
    }
  }
}
    ${DeliveryAddressPartsFragmentDoc}`;
export const useCustomerContactsByCustomerProfileIdQuery = <
      TData = CustomerContactsByCustomerProfileIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CustomerContactsByCustomerProfileIdQueryVariables,
      options?: UseQueryOptions<CustomerContactsByCustomerProfileIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CustomerContactsByCustomerProfileIdQuery, TError, TData>(
      variables === undefined ? ['CustomerContactsByCustomerProfileId'] : ['CustomerContactsByCustomerProfileId', variables],
      fetcher<CustomerContactsByCustomerProfileIdQuery, CustomerContactsByCustomerProfileIdQueryVariables>(client, CustomerContactsByCustomerProfileIdDocument, variables, headers),
      options
    );

useCustomerContactsByCustomerProfileIdQuery.getKey = (variables?: CustomerContactsByCustomerProfileIdQueryVariables) => variables === undefined ? ['CustomerContactsByCustomerProfileId'] : ['CustomerContactsByCustomerProfileId', variables];
;

useCustomerContactsByCustomerProfileIdQuery.fetcher = (client: GraphQLClient, variables?: CustomerContactsByCustomerProfileIdQueryVariables, headers?: RequestInit['headers']) => fetcher<CustomerContactsByCustomerProfileIdQuery, CustomerContactsByCustomerProfileIdQueryVariables>(client, CustomerContactsByCustomerProfileIdDocument, variables, headers);
export const CartProductsDocument = `
    query cartProducts($id: ID!) {
  getCart(id: $id) {
    id
    totalAmount
    cartShipment {
      items {
        id
        assignedStoreId
        lineItems {
          id
          productId
          qtyPurchased
          productName
          unitPrice
          totalPrice
          itemInvalid
        }
      }
    }
  }
}
    `;
export const useCartProductsQuery = <
      TData = CartProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CartProductsQueryVariables,
      options?: UseQueryOptions<CartProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CartProductsQuery, TError, TData>(
      ['cartProducts', variables],
      fetcher<CartProductsQuery, CartProductsQueryVariables>(client, CartProductsDocument, variables, headers),
      options
    );

useCartProductsQuery.getKey = (variables: CartProductsQueryVariables) => ['cartProducts', variables];
;

useCartProductsQuery.fetcher = (client: GraphQLClient, variables: CartProductsQueryVariables, headers?: RequestInit['headers']) => fetcher<CartProductsQuery, CartProductsQueryVariables>(client, CartProductsDocument, variables, headers);
export const UpdateCartShipmentDocument = `
    mutation updateCartShipment($input: UpdateCartShipmentInput!) {
  updateCartShipment(input: $input) {
    ...cartShipmentParts
  }
}
    ${CartShipmentPartsFragmentDoc}`;
export const useUpdateCartShipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCartShipmentMutation, TError, UpdateCartShipmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCartShipmentMutation, TError, UpdateCartShipmentMutationVariables, TContext>(
      ['updateCartShipment'],
      (variables?: UpdateCartShipmentMutationVariables) => fetcher<UpdateCartShipmentMutation, UpdateCartShipmentMutationVariables>(client, UpdateCartShipmentDocument, variables, headers)(),
      options
    );
useUpdateCartShipmentMutation.fetcher = (client: GraphQLClient, variables: UpdateCartShipmentMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCartShipmentMutation, UpdateCartShipmentMutationVariables>(client, UpdateCartShipmentDocument, variables, headers);
export const CreateCartShipmentDocument = `
    mutation createCartShipment($input: CreateCartShipmentInput!) {
  createCartShipment(input: $input) {
    ...cartShipmentParts
  }
}
    ${CartShipmentPartsFragmentDoc}`;
export const useCreateCartShipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCartShipmentMutation, TError, CreateCartShipmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCartShipmentMutation, TError, CreateCartShipmentMutationVariables, TContext>(
      ['createCartShipment'],
      (variables?: CreateCartShipmentMutationVariables) => fetcher<CreateCartShipmentMutation, CreateCartShipmentMutationVariables>(client, CreateCartShipmentDocument, variables, headers)(),
      options
    );
useCreateCartShipmentMutation.fetcher = (client: GraphQLClient, variables: CreateCartShipmentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCartShipmentMutation, CreateCartShipmentMutationVariables>(client, CreateCartShipmentDocument, variables, headers);
export const CreateCartDocument = `
    mutation createCart($input: CreateCartInput!) {
  createCart(input: $input) {
    ...cartParts
  }
}
    ${CartPartsFragmentDoc}`;
export const useCreateCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCartMutation, TError, CreateCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCartMutation, TError, CreateCartMutationVariables, TContext>(
      ['createCart'],
      (variables?: CreateCartMutationVariables) => fetcher<CreateCartMutation, CreateCartMutationVariables>(client, CreateCartDocument, variables, headers)(),
      options
    );
useCreateCartMutation.fetcher = (client: GraphQLClient, variables: CreateCartMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCartMutation, CreateCartMutationVariables>(client, CreateCartDocument, variables, headers);
export const UpdateCartDocument = `
    mutation updateCart($input: UpdateCartInput!) {
  updateCart(input: $input) {
    ...cartParts
  }
}
    ${CartPartsFragmentDoc}`;
export const useUpdateCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCartMutation, TError, UpdateCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCartMutation, TError, UpdateCartMutationVariables, TContext>(
      ['updateCart'],
      (variables?: UpdateCartMutationVariables) => fetcher<UpdateCartMutation, UpdateCartMutationVariables>(client, UpdateCartDocument, variables, headers)(),
      options
    );
useUpdateCartMutation.fetcher = (client: GraphQLClient, variables: UpdateCartMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCartMutation, UpdateCartMutationVariables>(client, UpdateCartDocument, variables, headers);
export const GetShipmentsDocument = `
    query getShipments($id: ID!) {
  getCart(id: $id) {
    id
    cartShipment {
      items {
        ...cartShipmentParts
      }
    }
  }
}
    ${CartShipmentPartsFragmentDoc}`;
export const useGetShipmentsQuery = <
      TData = GetShipmentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetShipmentsQueryVariables,
      options?: UseQueryOptions<GetShipmentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetShipmentsQuery, TError, TData>(
      ['getShipments', variables],
      fetcher<GetShipmentsQuery, GetShipmentsQueryVariables>(client, GetShipmentsDocument, variables, headers),
      options
    );

useGetShipmentsQuery.getKey = (variables: GetShipmentsQueryVariables) => ['getShipments', variables];
;

useGetShipmentsQuery.fetcher = (client: GraphQLClient, variables: GetShipmentsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetShipmentsQuery, GetShipmentsQueryVariables>(client, GetShipmentsDocument, variables, headers);
export const DeleteCartDocument = `
    mutation deleteCart($input: DeleteCartInput!) {
  deleteCart(input: $input) {
    ...cartParts
  }
}
    ${CartPartsFragmentDoc}`;
export const useDeleteCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCartMutation, TError, DeleteCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCartMutation, TError, DeleteCartMutationVariables, TContext>(
      ['deleteCart'],
      (variables?: DeleteCartMutationVariables) => fetcher<DeleteCartMutation, DeleteCartMutationVariables>(client, DeleteCartDocument, variables, headers)(),
      options
    );
useDeleteCartMutation.fetcher = (client: GraphQLClient, variables: DeleteCartMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCartMutation, DeleteCartMutationVariables>(client, DeleteCartDocument, variables, headers);
export const ListOrdersDocument = `
    query listOrders($limit: Int, $filter: ModelOrderFilterInput) {
  listOrders(limit: $limit, filter: $filter) {
    items {
      ...orderParts
    }
  }
}
    ${OrderPartsFragmentDoc}`;
export const useListOrdersQuery = <
      TData = ListOrdersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListOrdersQueryVariables,
      options?: UseQueryOptions<ListOrdersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListOrdersQuery, TError, TData>(
      variables === undefined ? ['listOrders'] : ['listOrders', variables],
      fetcher<ListOrdersQuery, ListOrdersQueryVariables>(client, ListOrdersDocument, variables, headers),
      options
    );

useListOrdersQuery.getKey = (variables?: ListOrdersQueryVariables) => variables === undefined ? ['listOrders'] : ['listOrders', variables];
;

useListOrdersQuery.fetcher = (client: GraphQLClient, variables?: ListOrdersQueryVariables, headers?: RequestInit['headers']) => fetcher<ListOrdersQuery, ListOrdersQueryVariables>(client, ListOrdersDocument, variables, headers);
export const CreateOrderDocument = `
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ...orderParts
  }
}
    ${OrderPartsFragmentDoc}`;
export const useCreateOrderMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>(
      ['createOrder'],
      (variables?: CreateOrderMutationVariables) => fetcher<CreateOrderMutation, CreateOrderMutationVariables>(client, CreateOrderDocument, variables, headers)(),
      options
    );
useCreateOrderMutation.fetcher = (client: GraphQLClient, variables: CreateOrderMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateOrderMutation, CreateOrderMutationVariables>(client, CreateOrderDocument, variables, headers);
export const DeleteCartShipmentDocument = `
    mutation deleteCartShipment($input: DeleteCartShipmentInput!) {
  deleteCartShipment(input: $input) {
    ...cartShipmentParts
  }
}
    ${CartShipmentPartsFragmentDoc}`;
export const useDeleteCartShipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCartShipmentMutation, TError, DeleteCartShipmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCartShipmentMutation, TError, DeleteCartShipmentMutationVariables, TContext>(
      ['deleteCartShipment'],
      (variables?: DeleteCartShipmentMutationVariables) => fetcher<DeleteCartShipmentMutation, DeleteCartShipmentMutationVariables>(client, DeleteCartShipmentDocument, variables, headers)(),
      options
    );
useDeleteCartShipmentMutation.fetcher = (client: GraphQLClient, variables: DeleteCartShipmentMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCartShipmentMutation, DeleteCartShipmentMutationVariables>(client, DeleteCartShipmentDocument, variables, headers);
export const CalculateTaxDocument = `
    mutation calculateTax($input: [OrderShipmentInput]) {
  calculateTax(input: $input) {
    items {
      calculatedTax
      assignedStoreId
    }
  }
}
    `;
export const useCalculateTaxMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CalculateTaxMutation, TError, CalculateTaxMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CalculateTaxMutation, TError, CalculateTaxMutationVariables, TContext>(
      ['calculateTax'],
      (variables?: CalculateTaxMutationVariables) => fetcher<CalculateTaxMutation, CalculateTaxMutationVariables>(client, CalculateTaxDocument, variables, headers)(),
      options
    );
useCalculateTaxMutation.fetcher = (client: GraphQLClient, variables?: CalculateTaxMutationVariables, headers?: RequestInit['headers']) => fetcher<CalculateTaxMutation, CalculateTaxMutationVariables>(client, CalculateTaxDocument, variables, headers);
export const CreatePaymentIntentDocument = `
    mutation createPaymentIntent($input: CreatePaymentIntentInput!) {
  createPaymentIntent(input: $input) {
    publicKey
    clientSecret
    id
  }
}
    `;
export const useCreatePaymentIntentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePaymentIntentMutation, TError, CreatePaymentIntentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePaymentIntentMutation, TError, CreatePaymentIntentMutationVariables, TContext>(
      ['createPaymentIntent'],
      (variables?: CreatePaymentIntentMutationVariables) => fetcher<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(client, CreatePaymentIntentDocument, variables, headers)(),
      options
    );
useCreatePaymentIntentMutation.fetcher = (client: GraphQLClient, variables: CreatePaymentIntentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(client, CreatePaymentIntentDocument, variables, headers);
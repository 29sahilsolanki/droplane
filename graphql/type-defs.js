export const typeDefs = /* GraphQL */ `
  # =========================
  # ENUMS
  # =========================

  enum Role {
    CUSTOMER
    VENDOR
    ADMIN
  }

  enum VendorStatus {
    PENDING
    APPROVED
    SUSPENDED
  }

  enum ProductStatus {
    DRAFT
    ACTIVE
    ARCHIVED
  }

  enum OrderStatus {
    PENDING
    PAID
    CANCELLED
    PARTIALLY_REFUNDED
    REFUNDED
  }

  enum FulfillmentStatus {
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
    REFUNDED
  }

  enum PayoutStatus {
    PENDING
    PROCESSING
    PAID
    FAILED
  }

  enum RefundStatus {
    PENDING
    SUCCEEDED
    FAILED
  }

  # =========================
  # USER
  # =========================

  type User {
    id: ID!
    auth0Id: String!
    email: String!
    name: String
    role: Role!

    vendor: Vendor
    addresses: [Address!]!
    orders: [Order!]!
    reviews: [Review!]!
    cart: Cart

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # VENDOR
  # =========================

  type Vendor {
    id: ID!
    userId: ID!
    user: User!

    storeName: String!
    slug: String!
    description: String
    logoUrl: String
    status: VendorStatus!
    commission: Float!

    products: [Product!]!
    subOrders: [VendorOrder!]!
    payouts: [Payout!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # CATEGORY
  # =========================

  type Category {
    id: ID!
    name: String!
    slug: String!

    parentId: ID
    parent: Category
    children: [Category!]!

    products: [Product!]!
  }

  # =========================
  # PRODUCT
  # =========================

  type Product {
    id: ID!
    vendorId: ID!
    vendor: Vendor!

    categoryId: ID
    category: Category

    title: String!
    slug: String!
    description: String!
    images: [String!]!
    status: ProductStatus!

    variants: [ProductVariant!]!
    reviews: [Review!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # PRODUCT VARIANT
  # =========================

  type ProductVariant {
    id: ID!
    productId: ID!
    product: Product!

    sku: String!
    title: String!
    price: Float!
    compareAt: Float
    stock: Int!

    orderItems: [OrderItem!]!
    cartItems: [CartItem!]!
  }

  # =========================
  # ADDRESS
  # =========================

  type Address {
    id: ID!
    userId: ID!
    user: User!

    fullName: String!
    line1: String!
    line2: String
    city: String!
    county: String
    postcode: String!
    country: String!
    phone: String
    isDefault: Boolean!
  }

  # =========================
  # CART
  # =========================

  type Cart {
    id: ID!
    userId: ID!
    user: User!

    items: [CartItem!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # CART ITEM
  # =========================

  type CartItem {
    id: ID!
    cartId: ID!
    cart: Cart!

    variantId: ID!
    variant: ProductVariant!

    quantity: Int!
  }

  # =========================
  # ORDER
  # =========================

  type Order {
    id: ID!
    userId: ID!
    user: User!

    shipName: String!
    shipLine1: String!
    shipLine2: String
    shipCity: String!
    shipPostcode: String!
    shipPhone: String

    currency: String!
    subtotal: Float!
    shippingTotal: Float!
    vatTotal: Float!
    totalAmount: Float!

    status: OrderStatus!
    paymentIntentId: String

    vendorOrders: [VendorOrder!]!
    refunds: [Refund!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # VENDOR ORDER
  # =========================

  type VendorOrder {
    id: ID!

    orderId: ID!
    order: Order!

    vendorId: ID!
    vendor: Vendor!

    payoutId: ID
    payout: Payout

    subtotal: Float!
    shippingCost: Float!
    commissionRate: Float!
    commissionFee: Float!
    netPayoutAmount: Float!

    fulfillmentStatus: FulfillmentStatus!

    trackingNumber: String

    items: [OrderItem!]!
    refunds: [Refund!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # ORDER ITEM
  # =========================

  type OrderItem {
    id: ID!

    vendorOrderId: ID!
    vendorOrder: VendorOrder!

    variantId: ID
    variant: ProductVariant

    productTitle: String!
    variantTitle: String!
    sku: String!

    quantity: Int!
    unitPrice: Float!
    totalPrice: Float!

    review: Review
  }

  # =========================
  # PAYOUT
  # =========================

  type Payout {
    id: ID!

    vendorId: ID!
    vendor: Vendor!

    amount: Float!
    status: PayoutStatus!
    reference: String

    vendorOrders: [VendorOrder!]!

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # REFUND
  # =========================

  type Refund {
    id: ID!

    orderId: ID!
    order: Order!

    vendorOrderId: ID
    vendorOrder: VendorOrder

    amount: Float!
    reason: String
    status: RefundStatus!
    providerRefundId: String

    createdAt: String!
    updatedAt: String!
  }

  # =========================
  # REVIEW
  # =========================

  type Review {
    id: ID!

    userId: ID!
    user: User!

    productId: ID!
    product: Product!

    orderItemId: ID
    orderItem: OrderItem

    rating: Int!
    comment: String

    createdAt: String!
  }

  # =========================
  # QUERIES & MUTATIONS
  # =========================

  input CreateUserInput {
    auth0Id: String!
    email: String!
    name: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

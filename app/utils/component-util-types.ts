export type IListItem = {
  id?: string
  index?: string
}
export type IGenericListItemOptions = {
  index?: string
  onEdit?: (item: IListItem) => any
  onDelete?: (item: IListItem) => any
}

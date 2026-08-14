import type { RoleApiResponse, Role } from './types'

export function toRole(item: RoleApiResponse): Role {
  return {
    id: item.id ?? null,
    title: item.title ?? null,
    color: item.color ?? null,
    sortOrder: item.sort_order ?? null,
  }
}

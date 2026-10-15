import type { RoleApiScheme, Role } from './types'

export function toRole(item: RoleApiScheme): Role {
  return {
    id: item.id ?? null,
    title: item.title ?? null,
    color: item.color ?? null,
    sortOrder: item.sort_order ?? null,
  }
}

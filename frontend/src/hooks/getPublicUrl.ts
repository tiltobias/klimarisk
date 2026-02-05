// find the public URL for a given path, taking into account the BASE_URL and ensuring no duplicate slashes
export const getPublicUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

// helper function

export function formatTimestamp(createdAt: string) {
  const now = new Date()
  const createdDate = new Date(createdAt)
  const diff = now.getTime() - createdDate.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 1) return `1 days ago`

  return createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function dangerHTML(html: string): string {
  const Div = document.createElement('div')
  Div.innerHTML = html
  return Div.textContent || Div.innerText || ''
}

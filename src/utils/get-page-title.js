import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Bgain CMS'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

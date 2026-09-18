export interface GitHubReleaseInfo {
  tagName: string
  zipUrl: string
  zipName: string
  publishedAt: string
  sha256?: string
  sizeBytes?: number
  sizeFormatted?: string
  htmlUrl?: string
  isNotFound?: boolean
  isPrivate?: boolean
}

interface CachedRelease {
  data: GitHubReleaseInfo
  timestamp: number
}

const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

export const useGitHubReleases = () => {
  const isFetching = ref(false)
  const error = ref<string | null>(null)

  const getCachedRelease = (repo: string): GitHubReleaseInfo | null => {
    if (import.meta.server) return null
    try {
      const raw = localStorage.getItem(`xophz_release_${repo}`)
      if (!raw) return null
      const parsed: CachedRelease = JSON.parse(raw)
      const isExpired = Date.now() - parsed.timestamp > CACHE_TTL_MS
      if (isExpired) {
        localStorage.removeItem(`xophz_release_${repo}`)
        return null
      }
      return parsed.data
    } catch {
      return null
    }
  }

  const setCachedRelease = (repo: string, data: GitHubReleaseInfo) => {
    if (import.meta.server) return
    try {
      const cacheObj: CachedRelease = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(`xophz_release_${repo}`, JSON.stringify(cacheObj))
    } catch {
      // Ignore quota errors
    }
  }

  const parseRepoCoordinates = (repo: string, repoUrl?: string): { org: string; repoName: string } => {
    let org = 'HalloftheGods'
    let repoName = repo

    if (repoUrl && repoUrl.includes('github.com/')) {
      const pathPart = repoUrl.split('github.com/')[1] || ''
      const parts = pathPart.split('/')
      if (parts.length >= 2) {
        org = parts[0]
        repoName = parts[1].replace(/\.git$/, '').replace(/\/+$/, '')
      }
    }

    return { org, repoName }
  }

  const fetchLatestRelease = async (
    repo: string,
    fallbackVersion = 'v26.9.6',
    repoUrl?: string
  ): Promise<GitHubReleaseInfo> => {
    const cached = getCachedRelease(repo)
    if (cached) return cached

    const { org, repoName } = parseRepoCoordinates(repo, repoUrl)

    const fallbackInfo: GitHubReleaseInfo = {
      tagName: fallbackVersion,
      zipUrl: `https://github.com/${org}/${repoName}/archive/refs/tags/${fallbackVersion}.zip`,
      zipName: `${repoName}-${fallbackVersion}.zip`,
      publishedAt: new Date().toISOString()
    }

    isFetching.value = true
    error.value = null

    try {
      const res = await fetch(`https://api.github.com/repos/${org}/${repoName}/releases/latest`, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      })

      if (res.status === 404) {
        try {
          const repoRes = await fetch(`https://api.github.com/repos/${org}/${repoName}`, {
            headers: { Accept: 'application/vnd.github.v3+json' }
          })
          if (repoRes.status === 404) {
            const privateInfo: GitHubReleaseInfo = {
              tagName: fallbackVersion,
              zipUrl: '',
              zipName: '',
              publishedAt: '',
              isNotFound: true,
              isPrivate: true
            }
            setCachedRelease(repo, privateInfo)
            return privateInfo
          }
        } catch {
          // Fall through to standard fallback
        }
      }

      if (!res.ok) {
        setCachedRelease(repo, fallbackInfo)
        return fallbackInfo
      }

      const release = await res.json()
      const tagName = release.tag_name || fallbackVersion
      const zipAsset = release.assets?.find((asset: { name: string; browser_download_url: string; digest?: string; size?: number }) =>
        asset.name.endsWith('.zip')
      )

      const rawDigest = zipAsset?.digest
      const sha256 = rawDigest ? rawDigest.replace(/^sha256:/i, '') : undefined
      const sizeBytes = zipAsset?.size
      const sizeFormatted = sizeBytes ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB` : undefined

      const releaseInfo: GitHubReleaseInfo = {
        tagName,
        zipUrl: zipAsset ? zipAsset.browser_download_url : `https://github.com/${org}/${repoName}/archive/refs/tags/${tagName}.zip`,
        zipName: zipAsset ? zipAsset.name : `${repoName}-${tagName}.zip`,
        publishedAt: release.published_at || new Date().toISOString(),
        sha256,
        sizeBytes,
        sizeFormatted,
        htmlUrl: release.html_url || `https://github.com/${org}/${repoName}/releases/tag/${tagName}`
      }

      setCachedRelease(repo, releaseInfo)
      return releaseInfo
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch release'
      setCachedRelease(repo, fallbackInfo)
      return fallbackInfo
    } finally {
      isFetching.value = false
    }
  }

  const triggerDownload = (url: string, filename?: string) => {
    if (import.meta.server) return
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename || url.split('/').pop() || 'download.zip')
    link.setAttribute('target', '_blank')
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    isFetching,
    error,
    fetchLatestRelease,
    triggerDownload
  }
}

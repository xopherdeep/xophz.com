export interface GitHubReleaseInfo {
  tagName: string
  zipUrl: string
  zipName: string
  publishedAt: string
  sha256?: string
  sizeBytes?: number
  sizeFormatted?: string
  htmlUrl?: string
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

  const fetchLatestRelease = async (
    repo: string,
    fallbackVersion = 'v26.9.6'
  ): Promise<GitHubReleaseInfo> => {
    const cached = getCachedRelease(repo)
    if (cached) return cached

    const fallbackInfo: GitHubReleaseInfo = {
      tagName: fallbackVersion,
      zipUrl: `https://github.com/HalloftheGods/${repo}/archive/refs/tags/${fallbackVersion}.zip`,
      zipName: `${repo}-${fallbackVersion}.zip`,
      publishedAt: new Date().toISOString()
    }

    isFetching.value = true
    error.value = null

    try {
      const res = await fetch(`https://api.github.com/repos/HalloftheGods/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      })

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
        zipUrl: zipAsset ? zipAsset.browser_download_url : `https://github.com/HalloftheGods/${repo}/archive/refs/tags/${tagName}.zip`,
        zipName: zipAsset ? zipAsset.name : `${repo}-${tagName}.zip`,
        publishedAt: release.published_at || new Date().toISOString(),
        sha256,
        sizeBytes,
        sizeFormatted,
        htmlUrl: release.html_url || `https://github.com/HalloftheGods/${repo}/releases/tag/${tagName}`
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

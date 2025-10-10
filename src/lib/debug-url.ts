// URL 构建调试工具
export function debugUrlConstruction(endpoint: string, params?: Record<string, string>) {
  console.log("🔍 [URL DEBUG]:", { endpoint, params })

  if (!params) {
    console.log("🔍 [URL DEBUG] :", endpoint)
    return endpoint
  }

  console.log("🔍 [URL DEBUG] URLSearchParams...")
  const searchParams = new URLSearchParams(params)
  const queryString = searchParams.toString()
  console.log("🔍 [URL DEBUG] QUERY:", queryString)

  const finalUrl = `${endpoint}?${queryString}`
  console.log("🔍 [URL DEBUG] URL:", finalUrl)

  // 检查是否有异常字符
  if (finalUrl.includes(";")) {
    console.error("🚨 [URL DEBUG]")
  }

  return finalUrl
}

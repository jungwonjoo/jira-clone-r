'use client'

// QueryClientProvider가 useContext를 사용하므로 'use client' 필요
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// QueryClient 생성 함수
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트에서 즉시 다시 가져오는 것을 방지하기 위해
        // staleTime을 0 이상으로 설정하는 것이 좋습니다
        staleTime: 60 * 1000, // 1분
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

// 서버/클라이언트 분리 로직
function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient()
  } else {
    // 브라우저: 기존 클라이언트가 없을 때만 새로 생성
    // 이는 React가 초기 렌더링 중에 suspend될 때 
    // 클라이언트를 다시 생성하지 않도록 하는 중요한 부분입니다
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

// Props 타입 정의
interface QueryProviderProps {
  children: React.ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  // 주의: useState를 사용하지 않는 이유는 
  // suspense boundary가 없을 때 React가 초기 렌더링에서 
  // 클라이언트를 버릴 수 있기 때문입니다
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
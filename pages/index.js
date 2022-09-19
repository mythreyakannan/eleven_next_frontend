
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push('/auth/sign-in')
}
}


export default HomePage;

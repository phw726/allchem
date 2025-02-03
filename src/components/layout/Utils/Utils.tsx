import { useRouter } from 'next/router'
import * as S from './Utils.styles'
import { IoPersonOutline } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa6'
import { FaRegBell, FaRegQuestionCircle } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'

const utilsItems = [
  { href: '/mypage', icon: IoPersonOutline },
  { href: '/basket', icon: FiShoppingCart },
  { href: '/likes', icon: FaRegHeart },
  { href: '/alarms', icon: FaRegBell },
  { href: '/contact', icon: FaRegQuestionCircle },
]

export default function Utils() {
  const router = useRouter()

  const isActive = (path: string) =>
    router.asPath.startsWith(path) ? 'active' : undefined

  return (
    <S.Utils>
      {utilsItems.map(({ href, icon: Icon }) => (
        <Link key={href} href={href} passHref>
          <S.UtilsItem className={isActive(href)}>
            <Icon />
          </S.UtilsItem>
        </Link>
      ))}
    </S.Utils>
  )
}

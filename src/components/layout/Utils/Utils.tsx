import { useRouter } from 'next/router'
import * as S from './Utils.styles'
import { IoPerson } from 'react-icons/io5'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegBell, FaRegQuestionCircle } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'

const utilsItems = [
  { href: '/mypage', icon: IoPerson },
  { href: '/basket', icon: FiShoppingCart },
  { href: '/likes', icon: AiFillHeart },
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

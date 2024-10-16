import CommunityCategory from '@/components/community/Category'
import Layout from '@/components/layout/Layout'
import ListBody from '@/components/layout/ListBody'
import ListHeader from '@/components/layout/ListHeader'
import { SearchButton } from '@/components/search/SearchForm/SearchForm.styles'
import styled from '@emotion/styled'
import Link from 'next/link'

const MOCK_POST = [
  {
    id: '1',
    title: 'Water',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt id voluptatem doloremque aliquam officia rem amet explicabo quam deleniti maxime modi excepturi in commodi eligendi, aut quis tempore consequatur minus.',
    date: '2024.5.4',
    user: 'phw726',
  },
  {
    id: '2',
    title: '배고파쉬불',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptas deserunt quasi ab quam dicta asperiores doloremque sed esse commodi! Excepturi temporibus quis repellendus, nobis architecto ipsum laborum. Quos ratione ducimus eos in eligendi dicta similique impedit harum excepturi magni cumque quisquam doloremque obcaecati, omnis laboriosam odit, ex id? Tempore repellat quae esse in quisquam temporibus perferendis et aut ipsa, eius, libero sed odit! Aliquid dolor perspiciatis at dolores ducimus praesentium tenetur ullam, doloremque, iure necessitatibus, dolorum et blanditiis provident. Illum quaerat a fugiat iste quam soluta in necessitatibus eos, harum dolore earum ex quos, voluptatum porro corporis nemo impedit',
    date: '2024.5.4',
    user: '124sd',
  },
  {
    id: '3',
    title: '집가고싶어짐',
    summary: 'about H2O',
    date: '2024.5.4',
    user: 'fs2',
  },

  // 추가 아이템들
]

export default function CommunityPage() {
  return (
    <Layout>
      <ListHeader category="Community" renderType="post" />
      <FormWrapper>
        <CommunityCategory />
        <SearchButton>
          <Link href="/community/post">Writing</Link>
        </SearchButton>
      </FormWrapper>
      {MOCK_POST.map(post => (
        <ListBody key={post.id} item={post} renderType="post" />
      ))}
    </Layout>
  )
}

/// POSTFORM 카테고리, 글쓰기버튼 추가 ///
const FormWrapper = styled.div`
  margin: 0 20px 10px;
  display: flex;
  justify-content: space-between;
`

import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import { useRouter } from 'next/router'
import { useCompoundData } from '../api/query/KOSHA/useCompoundData'
import CompoundDetailForm from '@/components/compound/CompoundDetail'

export default function CompoundDetailPage() {
  const router = useRouter()
  const { chemId } = router.query as { chemId: string }
  const { data, isLoading, error } = useCompoundData(chemId)

  const defaultData = {
    basicInfo: [],
    physicalProps: [],
    toxicProps: [],
  }

  return (
    <Layout>
      {isLoading && 'loading...'}

      <ListHeader
        renderType="compound"
        pageTitle={
          data?.basicInfo?.length > 1
            ? `${data?.basicInfo[0].itemDetail} ; ${data?.basicInfo[1].itemDetail}`
            : 'An error occurred. Please try again'
        }
      />

      {error && 'Error fetching data'}
      <CompoundDetailForm compoundData={data || defaultData} />
    </Layout>
  )
}

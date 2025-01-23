import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import { useRouter } from 'next/router'
import CompoundDetailForm from '@/components/compound/CompoundDetail'
import { useIUCLIDCompound } from '../api/iuclid6/useCompound'
import { ENDPOINT_STUDY_RECORDS } from '../api/iuclid6/endpoint'
import { useCompoundData } from '../api/kosha/useCompoundData'

const dossierId = '7d2fc287-88f7-49b3-87a2-258c60a3d6ca'
const studyType = ENDPOINT_STUDY_RECORDS.PH

export default function CompoundDetailPage() {
  const router = useRouter()
  const { chemId } = router.query as { chemId: string }
  const { data: KOSHA_DATA, isLoading, error } = useCompoundData(chemId)
  const { data: IUCLID_DATA } = useIUCLIDCompound({
    dossierId,
    studyType,
  })

  console.log('IUCLID_DATA', IUCLID_DATA)
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
          KOSHA_DATA?.basicInfo?.length > 1
            ? `${KOSHA_DATA?.basicInfo[0].itemDetail} ; ${KOSHA_DATA?.basicInfo[1].itemDetail}`
            : 'An error occurred. Please try again'
        }
      />

      {error && 'Error fetching data'}
      <CompoundDetailForm compoundData={KOSHA_DATA || defaultData} />
      {/* <CompoundDetailForm compoundData={IUCLID_DATA || defaultData} /> */}
    </Layout>
  )
}

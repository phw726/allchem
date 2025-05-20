import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import { useCompoundData } from '../api/kosha/useCompoundData'
import styled from '@emotion/styled'
import { useIuclidCompound } from '../api/iuclid6/useIuclidCompound'
import dynamic from 'next/dynamic'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { lazy, Suspense, useMemo } from 'react'
// import ListHeader from '@/components/layout/ListHeader'
import { TextLoading } from '@/components/common/Loading'

const dossierId = '7d2fc287-88f7-49b3-87a2-258c60a3d6ca'

const ListHeader = dynamic(() => import('@/components/layout/ListHeader'), {
  ssr: false,
  loading: () => <Skeleton width={'70%'} height={50} />,
})

const CompoundDetailForm = dynamic(
  () => import('@/components/compound/CompoundDetail'),
  { ssr: false },
)

// const CompoundDetailForm = lazy(
//   () => import('@/components/compound/CompoundDetail'),
// )

export default function CompoundDetailPage() {
  const router = useRouter()
  const { chemId } = router.query as { chemId: string }
  const {
    data: KOSHA_DATA,
    isLoadingBasicInfo: KoshaBasicLoading,
    isLoadingPhysicalProps: KoshaPhysicalLoading,
    isLoadingToxicProps: KoshaToxicLoading,
    error,
  } = useCompoundData(chemId)
  const {
    data: IUCLID_DATA,
    isLoadingBasicInfo: IUCLIDBasicLoading,
    isLoadingPhysicalProps: IUCLIDPhysicalLoading,
    isLoadingToxicProps: IUCLIDToxicLoading,
  } = useIuclidCompound({
    dossierId,
  })

  const defaultData = {
    basicInfo: [],
    physicalProps: [],
    toxicProps: [],
  }

  return (
    <Layout>
      <ListHeader
        renderType="compound"
        pageTitle={
          KoshaBasicLoading ? (
            <Skeleton width={'70%'} height={50} />
          ) : KOSHA_DATA?.basicInfo?.length > 1 ? (
            `${KOSHA_DATA?.basicInfo[0].itemDetail} ; ${KOSHA_DATA?.basicInfo[1].itemDetail}`
          ) : error ? (
            'An error occurred. Please try again'
          ) : (
            ''
          )
        }
      />

      <Wrapper>
        <CompoundWrapper>
          <SourceName>
            KOSHA
            <small>
              (Korea Occupational Safety & Health Agency; 한국산업안전보건공단)
            </small>
          </SourceName>
          <CompoundDetailForm
            compoundData={KOSHA_DATA || defaultData}
            isLoadingBasicInfo={KoshaBasicLoading}
            isLoadingPhysicalProps={KoshaPhysicalLoading}
            isLoadingToxicProps={KoshaToxicLoading}
          />
        </CompoundWrapper>
        <CompoundWrapper>
          <SourceName>
            ECHA<small>(European Chemicals Agency)</small> REACH Study Results
          </SourceName>
          <CompoundDetailForm
            compoundData={IUCLID_DATA || defaultData}
            isLoadingBasicInfo={IUCLIDBasicLoading}
            isLoadingPhysicalProps={IUCLIDPhysicalLoading}
            isLoadingToxicProps={IUCLIDToxicLoading}
          />
        </CompoundWrapper>
      </Wrapper>
      {error && 'Error fetching data'}
    </Layout>
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  /* gap: 15px; */
`
const CompoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(234, 232, 232);
`

const SourceName = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 0 20px 30px;
  padding: 10px 20px;
  color: white;
  font-family: monospace;
  /* background-color: #56a9ac; */
  background: linear-gradient(150deg, #539bd1 0%, #7dc9d1 100%);
  text-shadow: 4px 3px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  /* border: 2px dashed #56a9ac; */
  line-height: 1.4;

  small {
    font-size: 14px;
    font-weight: 500;
    color: #e4e4e4;
    text-shadow: none;
  }
`

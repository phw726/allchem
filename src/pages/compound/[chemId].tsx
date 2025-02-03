import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import { useRouter } from 'next/router'
import CompoundDetailForm from '@/components/compound/CompoundDetail'
import { useCompoundData } from '../api/kosha/useCompoundData'
import styled from '@emotion/styled'
import { useIuclidCompound } from '../api/iuclid6/useIuclidCompound'
import { CircleLoading, TextLoading } from '@/components/common/Loading'

const dossierId = '7d2fc287-88f7-49b3-87a2-258c60a3d6ca'

export default function CompoundDetailPage() {
  const router = useRouter()
  const { chemId } = router.query as { chemId: string }
  const {
    data: KOSHA_DATA,
    isLoading: IsKoshaLoading,
    error,
  } = useCompoundData(chemId)
  const {
    data: IUCLID_DATA,
    isLoadingBasicInfo,
    isLoadingPhysicalProps,
    isLoadingToxicProps,
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
      {IsKoshaLoading ? (
        <TextLoading />
      ) : (
        <>
          <ListHeader
            renderType="compound"
            pageTitle={
              KOSHA_DATA?.basicInfo?.length > 1
                ? `${KOSHA_DATA?.basicInfo[0].itemDetail} ; ${KOSHA_DATA?.basicInfo[1].itemDetail}`
                : 'An error occurred. Please try again'
            }
          />
          <Wrapper>
            <CompoundWrapper>
              <SourceName>
                KOSHA
                <small>
                  (Korea Occupational Safety & Health Agency;
                  한국산업안전보건공단)
                </small>
              </SourceName>
              <CompoundDetailForm compoundData={KOSHA_DATA || defaultData} />
            </CompoundWrapper>
            <CompoundWrapper>
              <SourceName>
                ECHA<small>(European Chemicals Agency)</small> REACH Study
                Results
              </SourceName>
              <CompoundDetailForm
                compoundData={IUCLID_DATA || defaultData}
                isLoadingBasicInfo={isLoadingBasicInfo}
                isLoadingPhysicalProps={isLoadingPhysicalProps}
                isLoadingToxicProps={isLoadingToxicProps}
              />
            </CompoundWrapper>
          </Wrapper>
        </>
      )}

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

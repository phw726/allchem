export type ResponseTemplateType<DataType> = {
  success: boolean
  message: string
  code: number
  data: DataType
}

export type PostCategoryType = 'Community' | 'Q&A'

// const userId = user?.userId || user?.uid

// type UserIdentity = { uid: string } | { userId: string }

export interface PostProps {
  postId: string
  userId: string
  uid: string ///firebase UID
  title: string
  email: string
  content: string
  createdAt: string
  updatedAt?: string
  category: PostCategoryType
  files?: string[]
}
export interface CommentProps {
  email?: string
  commentId?: string // 코멘트 Id
  postId: string // 게시글 Id
  userId: string // 현재 user Id
  uid?: string // firebase uid
  content: string
  createdAt: string
  updatedAt?: string
}

export interface LikeProps {
  likeId?: string
  postId: string
  userId: string
  uid?: string
  createdAt: string
}

export interface BookMarkProps {
  postId?: string
  userId?: string
  uid?: string
  createdAt?: string
}

export interface EffectLevel {
  uuid: string
  KeyResult: boolean
  Sex: { code: string }
  Endpoint: { code: string }
  EffectLevel: {
    lowerValue: number
    unit: { code: string }
  }
  cl: {
    lowerValue: number
    upperValue: number
  }
}

export interface StudyRecord {
  AdministrativeData?: {
    Endpoint?: { code: string }
    StudyResultType?: { code: string }
    PurposeFlag?: { code: string }
    Reliability?: { code: string }
  }
  DataSource?: {
    Reference?: string[]
  }
  MaterialsAndMethods?: {
    Guideline?: {
      uuid: string
      Qualifier?: { code: string }
      Guideline?: { code: string }
      Deviation?: { code: string }
    }[]
    GLPComplianceStatement?: { code: string }
    TestType?: { code: string }
    LimitTest?: { code: string }
    TestMaterials?: { TestMaterialInformation: string }
    TestAnimals?: {
      Species?: { code: string }
      Strain?: { code: string }
      Sex?: { code: string }
    }
    AdministrationExposure?: {
      RouteOfAdministration?: { code: string }
    }
  }
  ResultsAndDiscussion?: {
    EffectLevels?: EffectLevel[]
  }
  ApplicantSummaryAndConclusion?: {
    InterpretationOfResults?: { code: string }
  }
}

export type StudyRecordResponse = (
  | StudyRecord
  | { key: string; definition: string; parentKey: string }
)[]

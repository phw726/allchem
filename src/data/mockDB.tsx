export const mockChemDB = {
  id: 'mock-chemical-1',
  properties: [
    { name: '외관', value: '' },
    { name: '성상', value: '자료없음' },
    { name: '색상', value: '자료없음' },
    { name: '냄새', value: '무취' },
    { name: '냄새역치', value: '자료없음' },
    { name: 'pH', value: '6.2  (10% 용액)' },
    { name: '녹는점/어는점', value: '178~185 ℃' },
    { name: '초기 끓는점과 끓는점 범위', value: '자료없음' },
    { name: '인화점', value: '자료없음' },
    { name: '증발속도', value: '자료없음' },
    { name: '인화성(고체, 기체)', value: '자료없음' },
    { name: '인화 또는 폭발 범위의 상한/하한', value: '자료없음' },
    { name: '증기압', value: '0.00000176 ㎜Hg (25℃ (추정치))' },
    { name: '용해도', value: '215 g/100㎖ (20℃)' },
    { name: '증기밀도', value: '자료없음' },
    { name: '비중', value: '1.3' },
    { name: 'n-옥탄올/물분배계수 (Kow)', value: '-1.7' },
    { name: '자연발화온도', value: '자료없음' },
    { name: '분해온도', value: '자료없음' },
    { name: '점도', value: '자료없음' },
    { name: '분자량', value: '95.5' },
  ],
}

export const mockBasicInfo = {
  response: {
    body: {
      items: {
        item: [
          {
            ordrIdx: 1052,
            msdsItemNameKor: '물질명',
            itemDetail: '염산 구아니딘',
          },
          {
            ordrIdx: 1054,
            msdsItemNameKor: '이명(관용명)',
            itemDetail: 'Guanidinium chloride',
          },
        ],
      },
    },
  },
}

export const mockPhysicalProps = {
  response: {
    body: {
      items: {
        item: [
          { ordrIdx: 1164, msdsItemNameKor: '외관', itemDetail: '자료없음' },
          { ordrIdx: 1170, msdsItemNameKor: '냄새', itemDetail: '무취' },
          {
            ordrIdx: 1174,
            msdsItemNameKor: 'pH',
            itemDetail: '6.2 (10% 용액)',
          },
        ],
      },
    },
  },
}

export const mockToxicProps = {
  response: {
    body: {
      items: {
        item: [
          {
            ordrIdx: 1200,
            msdsItemNameKor: '분해온도',
            itemDetail: '자료없음',
          },
          { ordrIdx: 1204, msdsItemNameKor: '분자량', itemDetail: '95.5' },
        ],
      },
    },
  },
}

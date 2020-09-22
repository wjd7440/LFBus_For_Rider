export const transactionTypeTabArray = {
  DRM: {
    All: "전체",
    Charge: "충전",
    Order: "상점",
    Remittance: "송금",
    Exchange: "환전",
    Donation: "기부"
  },
  DNT: {
    All: "전체",
    Charge: "충전",
    Donation: "기부"
  }
};
export const transactionTypeTabName = (currency, transactionType) => {
  return transactionTypeTabArray[currency][transactionType];
};
export const transactionTypeArray = {
  DRM: {
    All: { name: "전체", icon: "", sign: " " },
    Charge: { name: "충전", icon: "coins", sign: " " },
    StoreOrder: { name: "상점", icon: "money-check-edit", sign: " " },
    MallOrder: { name: "쇼핑몰결제", icon: "money-check-edit", sign: " " },
    Remittance: { name: "송금", icon: "money-check-edit", sign: " " },
    Exchange: { name: "환전", icon: "money-check-edit", sign: " " },
    Donation: { name: "기부", icon: "money-check-edit", sign: " " }
  },
  DNT: {
    All: { name: "전체", icon: "", sign: "" },
    Charge: { name: "충전", icon: "coins", sign: " " },
    Donation: { name: "기부", icon: "coins", sign: " " }
  }
};
export const transactionTypeName = (currency, transactionType) => {
  return transactionTypeArray[currency][transactionType].name;
};

export const transactionTypeIcon = (currency, transactionType) => {
  return transactionTypeArray[currency][transactionType].icon;
};

export const transactionTypeSign = (currency, transactionType) => {
  return transactionTypeArray[currency][transactionType].sign;
};

export const roleName = role => {
  const roleArray = {
    Administrator: "운영자",
    Issuer: "발행인",
    Store: "가맹점",
    User: "사용자"
  };
  return roleArray[role];
};

export const confirmedName = confirmed => {
  const confirmedArray = {
    true: "유",
    false: "무"
  };
  return confirmedArray[confirmed];
};

export const blockedName = blocked => {
  const blockedArray = {
    true: "유",
    false: "무"
  };
  return blockedArray[blocked];
};

export const sexName = sex => {
  const sexArray = {
    M: "남성",
    F: "여성"
  };
  return sexArray[sex];
};

export const currencyName = currency => {
  const currencyArray = {
    DRM: "드림",
    DNT: "Point"
  };
  return currencyArray[currency];
};
export const currencyUnit = currency => {
  const currencyArray = {
    DRM: "드림",
    DNT: "P"
  };
  return currencyArray[currency];
};

export const commonStatusName = commonStatus => {
  const commonStatusArray = {
    S: "대기",
    C: "승인",
    D: "삭제"
  };
  return commonStatusArray[commonStatus];
};

export const pay_methodName = pay_method => {
  const pay_methodArray = {
    trans: "실시간 계좌이체",
    vbank: "가상계좌"
  };
  return pay_methodArray[pay_method];
};

export const bankNameArray = [
  { label: "카카오뱅크", value: "1" },
  { label: "국민은행", value: "2" },
  { label: "기업은행", value: "3" },
  { label: "농협은행", value: "4" },
  { label: "신한은행", value: "5" },
  { label: "산업은행", value: "6" },
  { label: "우리은행", value: "7" },
  { label: "한국씨티은행", value: "8" },
  { label: "하나은행", value: "9" },
  { label: "SC제일은행", value: "10" },
  { label: "경남은행", value: "11" },
  { label: "광주은행", value: "12" },
  { label: "대구은행", value: "13" },
  { label: "도이치은행", value: "14" },
  { label: "뱅크오프아메리카", value: "15" },
  { label: "부산은행", value: "16" },
  { label: "산림조합중앙회", value: "17" },
  { label: "저축은행", value: "18" },
  { label: "새마을금고", value: "19" },
  { label: "수협은행", value: "20" },
  { label: "신협중앙회", value: "21" },
  { label: "우체국", value: "22" },
  { label: "전북은행", value: "23" },
  { label: "제주은행", value: "24" },
  { label: "중국건설은행", value: "25" },
  { label: "중국공산은행", value: "26" },
  { label: "BNP파리바은행", value: "27" },
  { label: "HSBC은행", value: "28" },
  { label: "JP모간체이스은행", value: "29" },
  { label: "케이뱅크", value: "30" },
  { label: "카카오뱅크", value: "31" },
  { label: "중국건설", value: "32" }
];

export const bankName = bankCode => {
  return bankNameArray[bankCode];
};

export const certificationIamportUserCode = "imp67351930";

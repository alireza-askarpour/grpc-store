export type GetOTP = {
  mobile: string
}

export type CheckOTP = {
  mobile: string
  code: string
}

export type GetOTPResponse = {
  code: string
}

export type CheckOTPResponse = {
  accessToken: string
}

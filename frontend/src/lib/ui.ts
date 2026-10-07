export const cn=(...x:(string|false|null|undefined)[])=>x.filter(Boolean).join(" ");
export const apiError=(e:unknown)=>{const x=e as {response?:{data?:{message?:string}}};return x.response?.data?.message||"Something went wrong. Please try again."};

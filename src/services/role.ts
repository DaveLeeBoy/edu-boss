import request from "@/utils/request";

export const getRolePages = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/role/getRolePages",
    data
  });
};

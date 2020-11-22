import request from "@/utils/request";

export const getResourcePages = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data
  });
};

export const getAllcategory = (resourceId: any) => {
  return request({
    method: "GET",
    url: "/boss/resource/category/getAll",
    params: {
      resourceId
    }
  });
};

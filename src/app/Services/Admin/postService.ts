import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { omit } from "lodash";
import { Key } from "react";

import { ADMIN_POST_API_PATH } from "@constants/apis";
import { PostDraftDataType, PostFormDataType } from "@interfaces/Admin/postTypes";

import axiosInstance from "@utils/Http/axiosInstance";

const createPost = async (data: PostFormDataType) => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POSTS_PATH, {
    ...omit(data, "id"),
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const getPosts = async (query: IBaseListQuery) => {
  const response = await axiosInstance.get(ADMIN_POST_API_PATH.POSTS_PATH, { params: query });

  return response.data;
};

const updatePostById = async (id: number, data: PostFormDataType) => {
  const response = await axiosInstance.put(ADMIN_POST_API_PATH.POST_PATH(id), {
    ...omit(data, "id"),
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const createPostDraft = async (data: PostFormDataType): Promise<PostDraftDataType> => {
  const response = await axiosInstance.post(
    ADMIN_POST_API_PATH.POST_DRAFTS_PATH,
    Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== "" && v !== undefined)),
  );

  return response.data.data;
};

const getPostDrafts = async (query: IBaseListQuery): Promise<PostDraftDataType[]> => {
  const response = await axiosInstance.get(ADMIN_POST_API_PATH.POST_DRAFTS_PATH, { params: query });

  return response.data.data;
};

const publishPostById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POST_PUBLISH_PATH(id));

  return response.data.data;
};

const unPublishPostById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POST_UN_PUBLISH_PATH(id));

  return response.data.data;
};

const movePostToTopById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POST_MOVE_TO_TOP_PATH(id));

  return response.data.data;
};

export {
  createPost,
  createPostDraft,
  getPostDrafts,
  getPosts,
  movePostToTopById,
  publishPostById,
  unPublishPostById,
  updatePostById,
};
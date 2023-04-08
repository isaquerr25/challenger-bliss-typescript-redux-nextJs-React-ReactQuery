import axios from 'axios';
import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
} from '@tanstack/react-query';

export const api = axios.create({
  baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com',
});

type StatusResponse = {
  status: string;
};

type GetQuestionsListParams = {
  limit?: number;
  offset: number;
  filter: string | null;
};

type Choice = {
  choice: string;
  votes: number;
};

export type QuestionType = {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: Choice[];
};

export type QuestionListType = QuestionType[];

type PostShareEmailParameters = {
  destinationEmail: string;
  contentUrl: string;
};
type PutQuestionByIdParameters = {
  questionId: number;
  data?: QuestionType;
};

export const getHealthData = () =>
  api.get<StatusResponse>('/health').then((response) => response.data);

export const getQuestionsList: QueryFunction<
  QuestionListType,
  [string, GetQuestionsListParams]
> = ({ queryKey }) => {
  const [_, { limit = 10, offset = 0, filter }] = queryKey;

  return api
    .get('/questions', {
      params: {
        limit,
        offset,
        filter,
      },
    })
    .then((response) => response.data);
};

export const getQuestionById: QueryFunction<QuestionType, [string, number]> = ({
  queryKey,
}) => {
  const [_, id] = queryKey;
  return api
    .get<QuestionType>('/questions/' + id)
    .then((response) => response.data);
};

export const postShareEmail: QueryFunction<
  StatusResponse,
  [string, PostShareEmailParameters]
> = ({ queryKey }) => {
  const [_, { destinationEmail, contentUrl }] = queryKey;

  return api
    .post<StatusResponse>('/share', {
      destination_email: destinationEmail,
      content_url: contentUrl,
    })
    .then((response) => response.data);
};

export const putQuestionById: QueryFunction<
  QuestionType,
  [string, PutQuestionByIdParameters]
> = ({ queryKey }) => {
  const [_, { questionId, data }] = queryKey;

  return api
    .put<QuestionType>(`/questions/${questionId}`, {
      data,
    })
    .then((response) => response.data);
};

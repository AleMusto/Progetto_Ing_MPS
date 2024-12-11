import { ContentType } from '../../../shared/contracts/content-types';
interface ContentTypes {
    collectionType: ContentType[];
    singleType: ContentType[];
}
declare const useGetContentTypesQuery: import('@reduxjs/toolkit/dist/query/react/buildHooks').UseQuery<import('@reduxjs/toolkit/query').QueryDefinition<void, import('@reduxjs/toolkit/query').BaseQueryFn<string | import('../utils/baseQuery').QueryArguments, unknown, import('../utils/baseQuery').BaseQueryError>, never, ContentTypes, "adminApi">>;
export { useGetContentTypesQuery };

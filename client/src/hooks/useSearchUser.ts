import { searchUserApi, TSearchUserResultFromApi } from "@/api/user.api";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

type Args = {
  key: string
}

export default function useSearchUser({ key }: Args) {
  const { user: authUser } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(false);
  const [value, { isPending }] = useDebounce(key, 500);
  const [searchResult, setSearchResult] = useState<TSearchUserResultFromApi[]>(
    []
  );
  useEffect(() => {
    if (!!value) {
      setLoading(true);
      searchUserApi(value)
        .then(({ data }) => {
          setSearchResult(data.users.filter((u) => u.id !== authUser?.id));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value]);

  return {
    loading: loading || isPending(),
    searchResult
  }
}
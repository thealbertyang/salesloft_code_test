import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const usePeople = () => {
    const { data, error } = useSWR(`/api/people`, fetcher)
    return {
      people: data,
      isLoading: !error && !data,
      isError: error
    }
}

export default usePeople;
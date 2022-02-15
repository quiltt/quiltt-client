import { usePlaidItemUnlinkMutation } from '../../types/quiltt'

const usePlaidUnlink = (plaidItemId: string) => {
  const [unlink, { data, loading, error }] = usePlaidItemUnlinkMutation({
    variables: { id: plaidItemId },
    update: (cache, results) => {
      if (results?.data?.plaidItemDelete?.record) {
        cache.evict({
          id: cache.identify(results.data.plaidItemDelete.record),
        })
      }
    },
  })

  return { unlink, data, loading, error }
}

export default usePlaidUnlink

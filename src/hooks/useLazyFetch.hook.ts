import { ParsedUrlQueryInput, stringify } from 'querystring'
import { useCallback, useState } from 'react'

type DoFetchOptions = RequestInit & { params?: ParsedUrlQueryInput }

export default function useLazyFetch<T = any>(
  input: RequestInfo
): [
  (options?: DoFetchOptions) => void,
  T,
  { called: boolean; error: boolean }
] {
  const [data, setData] = useState(null)
  const [called, setCalled] = useState(false)
  const [error, setError] = useState(null)

  const doFetch = useCallback(
    (options?: DoFetchOptions) => {
      const { params } = options

      fetch(`${input}?${stringify(params)}`, options)
        .then(response => response.json())
        .then(data => {
          setData(data)
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          setCalled(true)
        })
    },
    [input]
  )

  return [doFetch, data, { called, error }]
}

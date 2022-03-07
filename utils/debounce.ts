export default function debounce(timing: number) {
  let debounceId: number | null = null

  return (callback: Function) => {
    if (debounceId) {
      clearTimeout(debounceId)
    }

    debounceId = setTimeout(callback, timing) as number
  }
}

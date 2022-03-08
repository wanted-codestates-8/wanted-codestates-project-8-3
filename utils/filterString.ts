export default function filterString(str: string) {
  const regex = /.*[0-9]/gi

  return regex.test(str)
}
